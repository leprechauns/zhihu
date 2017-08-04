/**
 * Created by 夏天亦温暖 on 2017/7/17.
 */

$(function () {
    //光标移入时改变边框颜色
    $('.question-title').bind({
        'focus':function () {
            $('.caption').addClass('is-focus')
        },
        'blur':function () {
            $('.caption').removeClass('is-focus')
        }
    });
    $('.topic').bind({
        'focus':function () {
            $('.add-topic').addClass('is-focus')
        },
        'blur':function () {
            $('.add-topic').removeClass('is-focus')
        }
    });

    $('.detailed').focus($(this).addClass('is-focus'));

   //调用ui的button方法，改变按钮样式
    $('.button').button();



//显示提交问题

    $.ajax({
        url: 'show_content.php',
        type: 'POST',
        success:function (response,status,xhr) {
            var json=$.parseJSON(response);
            var html='';
            var arr=[];
            var summary=[];
            $.each(json,function (index,value) {
                html+='<div class="from-point">'+'来自话题：'+value.point+'</div>'+'<h4>'+'</h4>'+'<h2>'+value.title+'</h2>'+'<div class="editor">'+ value.myEditor +'</div>'+'<div class="bottom"><span class="comment" data-id="'+ value.id+'">'+value.count+'条评论</span><span class="share">分享</span><span class="report">举报</span><span class="up">收起</span></div>'+'<div class="comment_list"></div>'+'<div class="cut"></div>';
            });
            $('.content').append(html);
            $.each($('.editor'),function (index,value) {
                arr[index]=$(value).html();
                summary[index]=arr[index].substr(0,155);
                if(summary[index].substring(154,155)=='<'){
                    summary[index].replacePos(summary[index],200,'');
                }
                if(summary[index].substring(153,155)=='</'){
                    summary[index]=replacePos(summary[index],200,'');
                    summary[index]=replacePos(summary[index],199,'');
                }
                if(arr[index].length>155){
                    summary[index]+=' . . . <span class="down">阅读全文</span>';
                    $(value).html(summary[index]);
                }
                $('.bottom .up').hide();
            });

            //委托绑定事件
           $.each($('.editor'),function (index,value) {
               $(this).on('click','.down',function () {
                   $('.editor').eq(index).html(arr[index]);
                   $(this).hide();
                   $('.bottom .up').eq(index).show();
               })
           });

            $.each($('.bottom'),function (index,value) {
                $(this).on('click','.up',function () {
                    $('.editor').eq(index).html(summary[index]);
                    $(this).hide();
                    $('.editor .down').eq(index).show();
                })
            });
            $.each($('.bottom'),function (index,value) {
                $(this).on('click','.comment',function () {

                    var comment_this=this;
                    if ($.cookie('user')) {
                        if (!$('.comment_list').eq(index).has('form').length) {
                            $.ajax({
                                url:'show_comment.php',
                                type:'POST',
                                data:{
                                    titleid:$(comment_this).attr('data-id'),
                                },
                                beforeSend:function (jqXHR,settings) {
                                    $('.comment_list').eq(index).append('<dl class="comment_load"><dd>正在加载评论</dd></dl>')

                                },
                                success:function (response,status) {
                                    $('.comment_list').eq(index).find('.comment_load').hide();
                                    var json_comment=$.parseJSON(response);
                                    var count=0;
                                    $.each(json_comment,function (index2,value) {
                                        count=value.count;
                                        $('.comment_list').eq(index).append('<dl class="comment_content"><dt>'+$.cookie('user')+'</dt><dd>'+value.comment+'</dd><dd class="date">'+value.date+'</dd></dl>')
                                    });
                                    $('.comment_list').eq(index).append('<dl><dd><span class="load_more">加载更多评论</span></dd></dl>');
                                    var page=2;
                                    if(page>count){
                                        $('.comment_list').eq(index).find('.load_more').off('click');
                                        $('.comment_list').eq(index).find('.load_more').hide();
                                    }
                                    $('.comment_list').eq(index).find('.load_more').button().on('click',function () {
                                        $('.comment_list').eq(index).find('.load_more').button('disable');
                                        $.ajax({
                                            url:'show_comment.php',
                                            type:'POST',
                                            data:{
                                                titleid:$(comment_this).attr('data-id'),
                                                page:page,
                                            },
                                            beforeSend:function (jqXHR,settings) {
                                                $('.comment_list').eq(index).find('.load_more').html('<img src="img/more_load.gif"/>');
                                            },

                                            success:function (response,status) {
                                                var json_comment_more=$.parseJSON(response);
                                                $.each(json_comment_more,function (index3,value) {
                                                    $('.comment_list').eq(index).find('.comment_content').last().after('<dl class="comment_content"><dt>'+$.cookie('user')+'</dt><dd>'+value.comment+'</dd><dd class="date">'+value.date+'</dd></dl>')
                                                });
                                                $('.comment_list').eq(index).find('.load_more').button('enable');
                                                $('.comment_list').eq(index).find('.load_more').html('加载更多评论');


                                                page++;
                                                if(page>count){
                                                    $('.comment_list').eq(index).find('.load_more').off('click');
                                                    $('.comment_list').eq(index).find('.load_more').hide();
                                                }

                                            },

                                        });
                                    });









                                    $('.comment_list').eq(index).css('display', 'block');
                                    $('.comment_list').eq(index).append('<form><dl class="comment_add"><dt><textarea name="comment"></textarea><input type="button" value="评论" /></dt><dd><input type="hidden" name="titleid" value="' + $(comment_this).attr('data-id') + '" /><input type="hidden" name="name" value="' + $.cookie('user') + '" /></dl></form>');
                                    $('.comment_list').eq(index).find('input[type=button]').button().click(function () {
                                        var _this = this;
                                        $('.comment_list').eq(index).find('form').ajaxSubmit({
                                            url: 'add_comment.php',
                                            type: 'POST',
                                            beforeSubmit: function (formData, jqForm, options) {
                                                $(_this).button('disable');

                                            },
                                            success: function (responseText, statusText) {
                                                if (responseText) {
                                                    $(_this).button('enable');
                                                    $('.comment_list').eq(index).find('form').resetForm();

                                                }
                                            }

                                        })
                                    })

                                }
                            });

                        }
                        if($('.comment_list').eq(index).is(':hidden')){
                            $('.comment_list').eq(index).show();
                        }else{
                            $('.comment_list').eq(index).hide();

                        }

                    }else{
                        window.location.href='reg-log.html';
                    }
                })


            });




        }

    });
    //调用对话框
    $('.question').click(function () {
        $('#question-show').dialog({
            autoOpen:true,
            modal:true,
            width:536,
            height:520,
            buttons:{
                '提交问题':function () {
                    $(this).submit();
                }
            }
        }).validate({
            // debug:true,
            submitHandler:function (form) {
              $(form).ajaxSubmit({
                  url:'add_content.php',
                  type: 'POST',
                  data:{
                      user:$.cookie('name')
                  },
                  beforeSubmit: function(formData, jqForm, options) {

                  },
                  success:function (responseText,statusText) {
                      $('#question-show').dialog('close');
                  }
              })
                 
            },
            showErrors:function (errorMap,errorList) {
                var errors=this.numberOfInvalids();
                if(errors>0){
                    $('#question-show').dialog('option','height',30*errors+520);
                }else{
                    $('#question-show').dialog('option','height',520);
                }
                this.defaultShowErrors();
            },
            errorClass:'my-error',
            highlight:function (element,errorClass) {
                $(element).css('border','none');
            },
            errorElement:'p',
            rules:{
                title:{
                    required:true,
                    minlength:2,
                    punctuation:true,
                },
                point:{
                    required:true,
                    minlength:2,
                    chinese:true
                }
            },
            messages:{
                title:{
                    required:'问题标题不能为空',
                    minlength:'字数太少了吧！',
                    punctuation:'你还没有给问题添加问号'
                },
                point:{
                    required:'至少添加一个话题',
                    minlength:'字数太少了吧！',
                    chinese:'至少添加一个话题'

                }
            }
            
        });
    });


    //调用富文本编辑器uEditor;
    var ue = UE.getEditor( 'myEditor', {
        autoHeightEnabled: true,
        autoFloatEnabled: true,
        toolbars:[[
            'bold','italic', '|','inserttitle','blockquote', 'insertorderedlist', 'insertunorderedlist', '|',
            'insertvideo','insertimage'

        ]]

    });







/*
    //插入文本编辑器
    // var editor = new UE.ui.Editor();
    // editor.render("myEditor");


    var ue = UE.getEditor( 'myEditor', {

        autoHeightEnabled: true,

        autoFloatEnabled: true,

        initialFrameWidth: 690,

        initialFrameHeight:483

    });
    */

});