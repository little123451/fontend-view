define(function (require, exports, module) {
	module.exports = {
		'main' : function(){
            var canvas = document.getElementById('canvas');
            canvas.width = 1320;
            canvas.height = 640;
            var ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(0,120);
            ctx.lineTo(1120,640);
            ctx.lineTo(0,640);
            ctx.lineWidth=1;
            ctx.strokeStyle = "#66B8DE";
            ctx.stroke();
            ctx.fillStyle = '#66B8DE';
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(1320,0);
            ctx.lineTo(1320,640);
            ctx.lineTo(1120,640);
            ctx.lineTo(0,120);
            ctx.lineWidth=1;
            ctx.strokeStyle = "#7AC1DD";
            ctx.stroke();
            ctx.fillStyle = "#7AC1DD";
            ctx.closePath();
            ctx.fill();
		}
	}
});
