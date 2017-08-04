/**
 * Created by 夏天亦温暖 on 2017/7/20.
 */

window.onload=function () {
//配置上下文环境
    var canvas=document.getElementById('canvas');
    var context=canvas.getContext('2d');

    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

    context.fillStyle='rgba(200, 200, 200, 0.3)';
    context.strokeStyle='rgba(0,0,0,0.05)';
    context.lineWidth=0.5;

    //绘制圆

    var balls=[];//存放所有圆的数组;
    function createBall() {
        var x=Math.random()*canvas.width;
        var y=Math.random()*canvas.height;
        var r=Math.random()*15+0.01;//圆的半径范围[0.01,15.01]
        var vx=Math.random()*0.5*Math.pow(-1,Math.floor(Math.random()*2+1));//水平方向的速度范围[+-0.0,+-0.5]
        var vy=Math.random()*0.5*Math.pow(-1,Math.floor(Math.random()*2+1));//水平方向的速度范围[+-0.0,+-0.5]
        balls.push({
            x:x,
            y:y,
            r:r,
            vx:vx,
            vy:vy
        })
    }
//绘制圆的数量
    var num=20;
    for(var i=0;i<num;i++){
        createBall();
    }

//绘制每一帧的圆和线
    function render() {
        for(var k=0;k<num;k++){
            context.save();
            context.beginPath();
            context.arc(balls[k].x,balls[k].y,balls[k].r,0,Math.PI*2);
            context.fill();
            context.restore();
        }
        //遍历两个圆心之间的距离，临界值取为500，然后画线
        for(var i=0;i<num;i++){
            for(var j=i+1;j<num;j++){
                if(distance(balls[i],balls[j])<500){//如果两个圆之间的距离小于500，就开始画线
                    context.beginPath();
                    context.moveTo(balls[i].x,balls[i].y);
                    context.lineTo(balls[j].x,balls[j].y);
                    context.stroke();
                }
            }
        }

    }
    //两个圆心之间的距离函数
    function distance(point1,point2) {
        return Math.sqrt(Math.pow((point1.x-point2.x),2)+Math.pow((point1.y-point2.y),2));
    }
function move() {
    for(var k=0;k<num;k++){
        balls[k].x+=balls[k].vx;
        balls[k].y+=balls[k].vy;

        if(balls[k].x-balls[k].r>canvas.width){
            balls[k].x=0-balls[k].r;
        }
        if(balls[k].x+balls[k].r<0){
            balls[k].x=canvas.width+balls[k].r;
        }
        if(balls[k].y-balls[k].r>canvas.height){
            balls[k].y=0-balls[k].r;
        }
        if(balls[k].y+balls[k].r<0){
            balls[k].y=canvas.height+balls[k].r;
        }
    }
}


    (function loop() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        render();
        move();
        requestAnimationFrame(loop);
    })();


};
