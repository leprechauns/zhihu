/**
 * Created by 夏天亦温暖 on 2017/7/20.
 */





$(function () {


    //点击注册、登录按钮时的效果
    $('.reg').click(function () {
        $('#reg').show();
        $('#log').hide();
        $('.center .index-tab .line').animate({
            'left':'18px'
        });
        $('.reg').css('color','rgb(15,136,235)');
        $('.log').css('color','#999');
    });

    $('.log').click(function () {
        $('#log').show();
        $('#reg').hide();
        $('.center .index-tab .line').animate({
            'left':'77px'
        });
        $('.log').css('color','rgb(15,136,235)');
        $('.reg').css('color','#999');
    });

    //对注册框进行注册验证并提交
    $('.reg-on').click(function () {

            $('.reg-box').validate({
                submitHandler : function (form) {
                    $(form).ajaxSubmit({
                        url: 'add.php',
                        type: 'POST',
                        beforeSubmit: function (formData, jqForm, options) {
                            $('.reg-box button').get(0).disabled=true;
                            $('.reg-box button').css('background','#999').css('border-color','#999');

                        },
                        success:function (responseText,statusText) {
                            $('.reg-box button').get(0).disabled=false;
                            $('.reg-box button').css('background','rgb(15,136,235)').css('border-color','rgb(15,136,235)');

                            $.cookie('user', $('#name').val());

                        }
                    })
                },
                showErrors:function (errorMap,errorList) {
                    this.defaultShowErrors();
                },
                // debug:true,
                errorClass:'errors',
                errorElement:'span',
                rules:{
                    name:{
                        required:true,
                        minlength:2,
                        remote : {
                            url : 'is_user.php',
                            type : 'POST',
                        },
                        // en:true,
                        // chinese:true,
                    },
                    tel:{
                        required:true,
                        telephone:true,
                    },
                    pass:{
                        required:true,
                        // rangelength:6-128,
                        minlength:6,

                    }
                },
                messages:{
                    name:{
                        required:'请填写姓名',
                        minlength:'姓名最短为2个汉字或3个英文字符',
                        remote : '帐号被占用！',
                        // en:'姓名最长为10个汉字或20个英文字符',
                        // chinese:'姓名最长为10个汉字或20个英文字符'
                    },
                    tel:{
                        required:'请填写手机号',
                        telephone:'请输入正确的手机号',
                    },
                    pass:{
                        required:'请填写密码',
                        // rangelength:'请输入{0}-{0}位密码'
                        minlength:'请输入不小于{0}位密码'
                    }
                }

            });





    });
//对登录框进行登录验证并提交
    $('.log-on').click(function () {

        $('.login-box').validate({
            // debug:true,
            submitHandler : function (form) {
                $(form).ajaxSubmit({
                    url : 'login.php',
                    type : 'POST',
                    beforeSubmit : function (formData, jqForm, options) {
                        $('.login-box button').get(0).disabled=true;
                        $('.login-box button').css('background','#999').css('border-color','#999');
                    },
                    success : function (responseText, statusText) {
                        if (responseText) {
                            $('.login-box button').get(0).disabled=false;
                            $('.login-box button').css('background','rgb(15,136,235)').css('border-color','rgb(15,136,235)');
                            $.cookie('user', $('#tel_log').val());
                            window.location.href='index.html';
                        }
                    },
                });
            },
            showErrors:function (errorMap,errorList) {
                this.defaultShowErrors();
            },
            errorClass:'errors',
            errorElement:'span',
            rules:{
                tel_log:{
                    required:true,
                    telephone:true,
                },
                pass_log:{
                    required:true,
                    minlength:6,
                    remote : {
                        url : 'login.php',
                        type : 'POST',
                        data : {
                            tel_log : function () {
                                return $('#tel_log').val();
                            },
                        },
                    },
                },

            },
            messages:{
                tel_log:{
                    required:'请填写手机号或邮箱',
                    telephone:'请输入正确的手机号',
                },
                pass_log:{
                    required:'请填写密码',
                    minlength : jQuery.format('密码不得小于{0}位！'),
                    remote : '帐号或密码不正确！',

                }
            }

        });
    });

















function getCanvas() {
    //配置上下文环境，制作背景画布canvas内容
    var canvas=document.getElementById('canvas');
    var context=canvas.getContext('2d');

    canvas.width=screen.availWidth;
    canvas.height=screen.availHeight;
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
    window.onload=function () {
        (function loop() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            render();
            move();
            requestAnimationFrame(loop);

        })();
    };
}


getCanvas();


});
