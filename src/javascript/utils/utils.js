define(function(require, exports, module){

	module.exports = {

        /**
         * 安全获取某个对象较深的属性
         * //todo 增加数组兼容
         *
         * @param obj   对象 { main:{ data:{ person:{ name:"mike" } } } }
         * @param path  需要获取的属性路径 main.data.person.name
         * @returns {*} 例子: mike
         */
		'deepGet' : function(obj, path) {
			var arr = path.split('.');
            var key = arr[0];
            var def = arguments[2];

            //如果已经到最后一个属性,且属性有值,则返回值
            if (arr.length == 1 && obj[key] !== undefined) {
                return obj[key];
            }

            //如果属性不存在,则返回默认值
            if ( obj[key] == undefined ) {
                return  def ? def : undefined;
            }

            //递归下一层属性
            arr.shift();
            var string = arr.join('.');
            var object = obj[key];
            return this.deepGet(object, string, def);

		},

        /**
         * 为某个对象的深层属性安全赋值
         * //todo 兼容数组情况
         *
         * @param obj       对象     {data: { meta: { name:'', age:''} } }
         * @param str       路径     data.meta.name
         * @param value     赋值     "mike"
         * @returns {*}     例子: {data: { meta: { name:'mike', age:''} } }
         */
		'deepSet' : function(obj, str, value){
            var arr = str.split('.');
            var key = arr[0];

            //如果已经到最后一个属性,则赋值,并返回
            if (arr.length == 1){
                obj[key] = value;
                return obj;
            }

            //如果还没到最后一个属性,但当前属性不存在,则默认设成对象
            if (obj[key] == undefined) obj[key] = {};

            //将当前属性设成对象后, 仍不为object, 可能属性本身已有非object的值
            if (typeof obj[key] !== 'object') {
                throw EventException(str + " conflict"); //冲突
            }

            //递归下一层属性
            arr.shift();
            var string = arr.join('.');
            var object = obj[key];
            obj[key] = this.deepSet(object, string, value);
            return obj;
		}
	}
});