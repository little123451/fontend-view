/**
 * 这里放一些常用的工具类函数
 */

/**
 * 去除一维数组中的重复项
 * WARNING : 多维数组先看懂逻辑再使用
 *
 * @param array 需要去重的数组
 * @returns {Array}
 */
function distinct(array) {
    var collection = {}, cleanedArray = [];
    for (var i = 0; i < array.length; i++) {
        if (!collection[array[i]]) {
            collection[array[i]] = true;
            cleanedArray.push(array[i]);
        }
    }
    return cleanedArray;
}

function deepCopy(object) {
    if (typeof object === 'object') {
        if (Array.isArray(object)) {
            var newArray = [];
            for (var i = 0; i < object.length; i++) {
                newArray[i] = deepCopy(object[i]);
            }

            return newArray;
        } else {
            var newObj = {};
            for (var key in object) {
                newObj[key] = deepCopy(object[key]);
            }

            return newObj;
        }
    } else {
        return object;
    }
}

utils = {
    "distinct": distinct,
    "deepCopy": deepCopy
};

module.exports = utils;