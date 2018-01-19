var utils = require('../../../utils/utils');
var log = require('../../../utils/log').getLogger('[CONSOLE] [INFORMATION]');

const
    MAIN_CITY = ['上海', '北京', '浙江', '广东'], // 要放在分布页上的一线城市的集合
    OTHER_CITY = ["陕西", "四川", "福建", "海南", "湖北", "江苏"], // 归类在'其他城市'的集合
    ROUNDS = ['种子轮', '天使轮', 'Pre-A/A/A+轮', 'Pre-B/B/B+轮', 'C轮', 'D轮', 'E轮', 'F上市前/战略投资', 'IPO上市/新三板', 'IPO上市后', '不明确'],
    ROUNDS_A = ['Pre-A轮', 'A轮', 'A+轮'],
    ROUNDS_B = ['Pre-B轮', 'B轮', 'B+轮'],
    ROUNDS_BEFORE_LIST = ['F上市前', '战略投资'],
    ROUNDS_ON_LIST = ['IPO上市', '新三板'],

    SUB_ROUNDS_A = 2,                   // ROUNDS_A 在 ROUNDS 中的下标
    SUB_ROUNDS_B = 3,                   // ROUNDS_B 在 ROUNDS 中的下标
    SUB_ROUNDS_BEFORE_LIST = 7,         // ROUNDS_BEFORE_LIST 在 ROUNDS 中的下标
    SUB_ROUNDS_ON_LIST = 8,             // ROUNDS_ON_LIST 在 ROUNDS 中的下标
    SUB_UNKNOWN = ROUNDS.length - 1,    // 其他融资轮在 ROUNDS 中的下标

    PERIOD_MONTH = 1,                   // 月度的请求值
    PERIOD_SEASON = 2,                  // 季度的请求值
    PERIOD_YEAR = 3;                    // 年度的请求值

/**
 * 对后台传回来的 data 进行处理
 * @param data          后台传过来的 data
 * @param period        周期的请求值
 * @returns {{ret}}     经过处理后的 data
 */
function processData(data, period) {
    data = updateData(data, period);

    // 构造数据返回格式
    var ret = {};
    ret.beg = data.beg;
    ret.trend = {
        'industry': trend_industry(data.trend.industry),
        'sub_industry': trend_sub_industry(data.trend.sub_industry),
        'round': trend_round(data.trend.round),
        'area': trend_area(data.trend.filter_city)
    };
    ret.distribution = {
        'sub_industry': dist_sub_industry(data.dist.sub_industry),
        'round': dist_round(data.dist.round),
        'area': dist_area(data.dist.filter_city),
        'province': dist_province(data.dist.location),
        'China': dist_China(data.dist.area)
    };

    ret = patchData(ret, period);
    log.info(ret);
    return ret;
}

/**
 * 这个函数是对 data 进行预处理，给 data 添加必要的字段
 * @param data                      传回来的数据
 * @param period                    周期的请求值
 * @returns {{trend: *, dist: *}}   预处理后的数据
 */
function updateData(data, period) {
    data.filter_city = filterCity(utils.deepCopy(data.area));

    var ret = {
            'trend': data,
            'dist': utils.deepCopy(data)

        },
        now = new Date(Date.now()),
        thisYear = now.getFullYear(),
        thisMonth = now.getMonth() + 1,
        remainder, itemYear, itemMonth;

    for (var key in ret.dist) {
        // location, beg 对象没有 month 属性，直接跳过就可以了
        if (key == 'location' || key == 'beg') continue;

        // 对每个对象都有 month 属性，需要对日期进行过滤
        ret.dist[key] = ret.dist[key].filter(function (item, index, array) {
            itemYear = parseInt(item.month.slice(0, 4));
            itemMonth = parseInt(item.month.slice(4));

            switch (period) {
                case PERIOD_MONTH:
                    return itemYear == thisYear && itemMonth == thisMonth;

                case PERIOD_SEASON:
                    // 这里要判断 item 的月份是否在当前日期的季度里
                    // 方法是先利用当前月份对3求余，余数不为0，则两个月份之差小于余数就表明在同一个季度里
                    // 如果余数为0，说明该月份是该季度的最后一个月份，取2即可
                    remainder = thisMonth % 3 == 0 ? 2 : thisMonth % 3 - 1;
                    return itemYear == thisYear && (thisMonth - itemMonth <= remainder);

                case PERIOD_YEAR:
                    return itemYear == thisYear;
            }

        });
    }

    var object, season;
    for (key in ret.trend) {
        if (key == 'location' || key == 'beg') continue;

        for (var i = 0; i < ret.trend[key].length; i++) {
            object = ret.trend[key][i];

            switch (period) {
                case PERIOD_SEASON:
                    itemYear = object.month.slice(0, 4);
                    season = Math.ceil(parseFloat(object.month.slice(4) / 3));
                    // 因为处理数据要对日期进行排序，如果换成字母 Q 排序会出错，故先用个相同的数字代替
                    // 等处理完了以后在修改回来
                    object.month = itemYear + '9' + season;
                    break;

                case PERIOD_YEAR:
                    object.month = object.month.slice(0, 4);
                    break;

                default:
                    // PERIOD_SEASON 的情况，直接返回即可
                    break;
            }
        }
    }

    return ret;
}

/**
 * 这个函数是对 data 处理完后再进行细节性修改的函数
 * @param data      要修改的数据
 * @param period    周期的请求值
 * @returns {*}     修改后的数据
 */
function patchData(data, period) {
    var months;
    if (period === PERIOD_SEASON) {
        for (var key in data.trend) {
            months = data.trend[key].month;

            for (var i = 0; i < months.length; i++) {
                months[i] = months[i].slice(0,4) + 'Q' + months[i].slice(5);
            }
        }
    }

    return data;
}

function trend_industry(data) {
    // 利用化归法，给 data 添加新的键，方便调用 regroupTrendBy 函数
    for (var i = 0, j = data.length; i < j; i++) {
        data[i].industry = 'key';
    }

    data = regroupTrendBy(data, 'industry');

    return {
        'month': data.month,
        'count': [{'融资数量': data.count[0].key}],
        'sum': [{'融资金额': data.sum[0].key}]
    }
}

function trend_sub_industry(data) {
    return regroupTrendBy(data, 'sub_industry');
}

function trend_round(data) {
    var round;
    for (var i = 0; i < data.length; i++) {
        round = data[i];

        // 根据融资轮的名字是否在对应数组中出现来对每个融资轮进行归类
        if (ROUNDS.indexOf(round.round) == -1) {
            if (ROUNDS_A.indexOf(round.round) > -1) {
                round.round = ROUNDS[SUB_ROUNDS_A];
            } else if (ROUNDS_B.indexOf(round.round) > -1) {
                round.round = ROUNDS[SUB_ROUNDS_B];
            } else if (ROUNDS_BEFORE_LIST.indexOf(round.round) > -1) {
                round.round = ROUNDS[SUB_ROUNDS_BEFORE_LIST];
            } else if (ROUNDS_ON_LIST.indexOf(round.round) > -1) {
                round.round = ROUNDS[SUB_ROUNDS_ON_LIST];
            } else {
                round.round = ROUNDS[SUB_UNKNOWN];
            }
        }
    }

    round = regroupTrendBy(data, 'round');

    // 定义排序的方法，根据 ROUNDS 数组中融资轮的顺序来对数组进行排列
    var sortByRounds = function (a, b) {
        return ROUNDS.indexOf(Object.keys(a)[0]) - ROUNDS.indexOf(Object.keys(b)[0]);
    };

    round.count.sort(sortByRounds);
    round.sum.sort(sortByRounds);

    return round;
}

function trend_area(data) {
    data = regroupTrendBy(data, 'location');
    for (var i = 0; i < data.count.length; i++) {
        if (Object.keys(data.count[i]).indexOf('其他') != -1) {
            data.count.push(data.count.splice(i, 1)[0]);
            data.sum.push(data.sum.splice(i, 1)[0]);
            break;
        }
    }

    return data;
}

function dist_sub_industry(data) {
    return regroupDistBy(data, 'sub_industry');
}

function dist_round(data) {
    var object = {
        'label': ROUNDS,
        'count': [],
        'sum': []
    };

    // 对每个 label 的值进行初始化，方便后面数据相加
    for (var i = 0; i < object.label.length; i++) {
        object.count[i] = 0;
        object.sum[i] = 0;
    }

    var subLabel, round;
    for (i = 0; i < data.length; i++) {
        round = data[i];

        // 找到每个融资轮在 ROUNDS 数组中对应的下标，没有的话就归类到'不明确'中
        if (ROUNDS.indexOf(round.round) > -1) {
            subLabel = ROUNDS.indexOf(round.round);
        } else if (ROUNDS_A.indexOf(round.round) > -1) {
            subLabel = SUB_ROUNDS_A;
        } else if (ROUNDS_B.indexOf(round.round) > -1) {
            subLabel = SUB_ROUNDS_B;
        } else if (ROUNDS_BEFORE_LIST.indexOf(round.round) > -1) {
            subLabel = SUB_ROUNDS_BEFORE_LIST;
        } else if (ROUNDS_ON_LIST.indexOf(round.round) > -1) {
            subLabel = SUB_ROUNDS_ON_LIST;
        } else {
            subLabel = SUB_UNKNOWN;
        }

        // 把对应的融资轮的数据和这个融资轮的数据相加
        object.count[subLabel] += parseInt(round.count);
        object.sum[subLabel] += parseInt(round.sum);
    }

    object.count = convertToPercentage(object.count);
    object.sum = convertToPercentage(object.sum);

    return object;
}

function dist_area(data) {
    var area = regroupDistBy(data, 'location');

    // 把'其他'城市的数据抽出来放到数组的末端
    var pushOthersToLast = function (object) {
        var sub = object.label.indexOf('其他');
        object.label.push(object.label.splice(sub, 1)[0]);
        object.percentage.push(object.percentage.splice(sub, 1)[0]);

        return object;
    };

    area.count = pushOthersToLast(area.count);
    area.sum = pushOthersToLast(area.sum);

    return area;
}

function dist_province(data) {
    var collection = {},
        total = {},
        object,
        subObject,
        province;

    // 先把相同省份的数据进行归类，每个省份包含了多个数据
    for (var i = 0; i < data.length; i++) {
        object = data[i];
        province = object.location;

        subObject = {
            'sub_industry': object.sub_industry,
            'count': object.count,
            'sum': object.sum
        };

        // 判断该省份是否已经出现过
        if (province in collection) {
            collection[province].push(subObject);
            total[province] = total[province] + parseInt(subObject.count);
        } else {
            collection[province] = [subObject];
            total[province] = parseInt(subObject.count);
        }
    }

    // 归类后再对每个省的数据进行整理，并计算该省份有多少个数据
    for (var key in collection) {
        collection[key] = regroupDistBy(collection[key], 'sub_industry');
        collection[key].total = total[key];
    }

    return collection;
}

function dist_China(data) {
    var allCity = MAIN_CITY.concat(OTHER_CITY),
        country = {},
        city,
        sum = 0;

    for (var i = 0; i < data.length; i++) {
        city = data[i];

        // 判断该城市是不是国内的城市，如果是国内的，则把数据保存下来
        // 如果是国外的，则什么都不用做
        if (allCity.indexOf(city.location) > -1) {
            country[city.location] = parseInt(city.sum);
            sum = sum + parseInt(city.sum);
        }
    }

    for (city in country) {
        country[city] = parseFloat((Math.round(country[city] / sum * 10000) / 100).toFixed(2));
    }

    return country;
}

/**
 * 这个函数是能够根据子对象的一个键(key)来对子对象的month, count, sum值进行重新整理
 *
 * 转换前的数据是这样的结构:
 * {sub_industry:[
 *    {month: "201610", count: "1", sum: "650", sub_industry: "游戏开发商"},
 *    {month: "201609", count: "2", sum: "1301", sub_industry: "其他游戏服务"},
 *    ...
 * ]}
 *
 * 转换后的数据是这样的结构:
 * {sub_industry: {
 *    month: ["201609", "201610", ...],
 *    count: [{
 *       游戏开发商: ["2", "1", "2"...],
 *       其他游戏服务: ["1", "1", "1"...],
 *       ...},
 *    sum:  [{
 *       游戏开发商: ["14307", "19509", "38888"],
 *       游戏综合服务: ["19509", "6000", "2000"]},
 *       ...},
 *    ...
 * }}
 * @param dataArray 传入的数据数组
 * @param key 行业的 key 值
 * @returns {{}}
 **/
function regroupTrendBy(dataArray, key) {

    var subObject, month = [], count = [], sum = [],
        subObjectCollection = {}, keyValue, indexOfMonth;

    // 这里先对数据的时间字段进行升序排列,然后按顺序放到新的数组里
    dataArray.sort(function (a, b) {
        return a.month - b.month;
    });

    //把所有数据的月份放到数组里,并进行去重,方便后面的比对
    for (var i = 0, j = dataArray.length; i < j; i++) {
        month.push(dataArray[i].month);
    }
    month = utils.distinct(month);

    for (i = 0, j = dataArray.length; i < j; i++) {
        subObject = dataArray[i];

        // 先取得子对象的key的键值,比如:"游戏开发商", "其他游戏服务"
        keyValue = subObject[key];

        // 判断这个key值在不在有没有在这个集合里面出现,没有则说明是新的集合
        if (!(keyValue in subObjectCollection)) {
            subObjectCollection[keyValue] = {
                'count': [],
                'sum': []
            };
        }

        // 获取当前数据的月份在数组中的位置
        indexOfMonth = month.indexOf(subObject.month);

        var objectArrayLength = subObjectCollection[keyValue].count.length;
        // 判断当前数据的月份与 month 数组的下标是否对应
        // 如果不对应说明中间有段时间没有数据,这段缺少的数据用0填充
        if (objectArrayLength <= indexOfMonth) {
            for (; objectArrayLength < indexOfMonth; objectArrayLength++) {
                subObjectCollection[keyValue].count.push(0);
                subObjectCollection[keyValue].sum.push(0);
            }

            subObjectCollection[keyValue].count.push(parseInt(subObject.count));
            subObjectCollection[keyValue].sum.push(parseInt(subObject.sum));
        } else {
            subObjectCollection[keyValue].count[indexOfMonth] += parseInt(subObject.count);
            subObjectCollection[keyValue].sum[indexOfMonth] += parseInt(subObject.sum);
        }
    }

    // 分类完后, 再根据key值来对count, sum重新分类
    for (keyValue in subObjectCollection) {
        subObject = subObjectCollection[keyValue];

        // 有些数据的最新数据是201609, 但是整体的最新数据是201612
        // 所以对两个数组长度进行比对, 如果小于 month 长度则用0填充
        if (subObject.count.length < month.length) {
            for (var l = subObject.count.length; l < month.length; l++) {
                subObject.count.push(0);
                subObject.sum.push(0);
            }
        }

        var oCount = {}, oSum = {};
        oCount[keyValue] = subObject.count;
        oSum[keyValue] = subObject.sum;

        count.push(oCount);
        sum.push(oSum);
    }

    return {
        'month': month,
        'count': count,
        'sum': sum
    };
}

/**
 * 这个函数是根据子对象的一个 label 把对应的 count 和 sum 按照顺序进行重新整理
 * 并把相同 label 的数据进行相加, 然后把对应的数据转换成百分比的形式
 *
 *  * 转换前的数据是这样的结构:
 * {sub_industry:[
 *    {month: "201610", count: "1", sum: "650", sub_industry: "游戏开发商"},
 *    {month: "201609", count: "2", sum: "1301", sub_industry: "其他游戏服务"},
 *    ...
 * ]}
 *
 * 转换后的数据是这样的结构:
 * sub_industry: {
 *   label: [ "游戏开发商", "游戏综合服务", "游戏发行及渠道", ... ],
 *   count: [ "57.58", "11.11", "9.09", ...],
 *   sum: [ "34.20", "17.52", "2.88", ...]
 * }, ...
 *
 * @param dataArray 传入的数据数组
 * @param label 行业的 label 名字
 * @returns {{}}
 */
function regroupDistBy(dataArray, label) {
    var object = {
        'count': {},
        'sum': {}
    };

    var data;
    for (var i = 0; i < dataArray.length; i++) {
        data = dataArray[i];

        // 判断该 label 的对象之前是否存在，object.count 和 object.sum 原理是一样的
        if (data[label] in object.count) {
            object.count[data[label]] += parseInt(data.count);
            object.sum[data[label]] += parseInt(data.sum);
        } else {
            object.count[data[label]] = parseInt(data.count);
            object.sum[data[label]] = parseInt(data.sum);
        }
    }

    var sortField = function (object) {
        // 把 label 的键依据对应的数据进行将序排列
        var sortKey = Object.keys(object).sort(function (a, b) {
            return object[b] - object[a];
        });

        // 排序后把 label 的键和值放进数组里
        var fieldArray = [], labelArray = [];
        for (i = 0; i < sortKey.length; i++) {
            labelArray.push(sortKey[i]);
            fieldArray.push(object[sortKey[i]]);
        }

        // 把数组里的数据转换成百分比
        fieldArray = convertToPercentage(fieldArray);

        return {
            'label': labelArray,
            'percentage': fieldArray
        };
    };

    object.count = sortField(object.count);
    object.sum = sortField(object.sum);

    return object;
}

/**
 * 把数组里的数据转换成百分比的形式
 * @param array 要转换的数组,里面的数据必须是Number
 * @returns {Array}  转换成百分比形式后的数组
 */
function convertToPercentage(array) {
    var sum = 0, num;
    for (var i = 0; i < array.length; i++) {
        sum += array[i];
    }

    for (i = 0; i < array.length; i++) {
        num = Math.round(array[i] / sum * 10000) / 100;
        array[i] = num.toFixed(2);
    }

    return array;
}

/**
 * 把国内主要的城市保留下来,把国内其他的城市放在一个集合里,并把国外的集合过滤掉
 * @param dataArray
 * @returns {Array}
 */
function filterCity(dataArray) {
    var city, array = [];
    for (var i = 0; i < dataArray.length; i++) {
        city = dataArray[i];
        if (OTHER_CITY.indexOf(city.location) > -1) {
            city.location = '其他';
            array.push(city);
        } else if (MAIN_CITY.indexOf(city.location) > -1) {
            array.push(city);
        }
    }

    return array;
}

module.exports = {
    'updateData': updateData,
    'processData': processData
};