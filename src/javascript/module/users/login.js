define(function (require, exports, module) {
	module.exports = {
		'main' : function () {
			var canvas = document.getElementById('canvas');
            canvas.width = 1320;
            canvas.height = 640;
            var ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(0,605);
            ctx.bezierCurveTo(130,525,160,440,360,548);
            ctx.bezierCurveTo(500,610,665,700,900,486);
            ctx.bezierCurveTo(1070,340,1200,350,1320,460);
            ctx.lineTo(1320,640);
            ctx.lineTo(0,640);
            ctx.lineTo(0,605);
            ctx.fillStyle = "#4599b6";
            ctx.fill();
		}
	}
})