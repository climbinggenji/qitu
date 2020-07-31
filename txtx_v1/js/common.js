// 监听滚动固定顶部导航栏
window.addEventListener('scroll', function() {
    var top = $('body, html').scrollTop();
    if (top>340) {
        $('#header').addClass('header-fixed');
    } else {
        $('#header').removeClass('header-fixed');
    }
})

// tips 错误提示
function tips(text, time) {
    var tipsHtml = '<div class="tips-style"><div class="tips-main"><i class="iconfont">&#xe63f;</i> <span class="text">' + text + '</span></div></div>'
    $('body').append(tipsHtml);
    if (!time) {
        time = 3 * 1000
    }
    var tipsTimer = setTimeout(function() {
        $('.tips-style').remove();
        clearTimeout(tipsTimer);
    }, time);
}

// 登录弹窗
function popLogin() {
    $('#login-box').show();
    $('#mask').show();
}

// 关闭遮罩层  弹窗 公用类pop-main
function popOff() {
    $('.pop-main').hide();
    $('#mask').hide();
}

// 分页器mini
var isPageMiniDisable = function(current) {
    if (current == 1) $('.icon-left').addClass('disable');
    if (current == 28) $('.icon-right').addClass('disable');
}
$(function() {
    let current = parseInt($('#paging-mini-current').text());
    isPageMiniDisable(current);
    $('.icon-right').click(function() {
        if (current < 28) {
            if (current == 1) {
                $('.icon-left').removeClass('disable');
            }
            current++;
            $('#paging-mini-current').text(current);
            isPageMiniDisable(current);
        }
    });
    $('.icon-left').click(function() {
        if (current > 1) {
            if (current == 28) {
                $('.icon-right').removeClass('disable');
            }
            current--;
            $('#paging-mini-current').text(current);
            isPageMiniDisable(current);
        }
    });

    // 登录弹窗
    $('.btn-login').click(function() {
        popLogin()
    });
    $('.qrcode-mask').find('a').on('click', function() {
        popLogin();
    })
    // 登录验证
    function loginTips(select, text) {
        if (text) {
            select.siblings().css('opacity', '1');
            select.addClass('error');
            select.siblings().text(text);
        } else {
            select.siblings().css('opacity', '0');
            select.removeClass('error');
        }
    }
    $('#zhanghao').blur(function() {
        if (!$(this).val()) {
            loginTips($(this), '请输入用户名');
        } else {
            loginTips($(this));
        }
    })
    $('#pasword').blur(function() {
        if (!$(this).val()) {
            loginTips($(this), '请输入密码');
        } else {
            loginTips($(this));
        }
    })

    // 遮罩层
    $('#mask').click(function() {
        popOff();
    });
    $('.pop-main').find('.close-icon').on('click', function() {
        popOff();
    })

    $('.login-toRegister').click(function() {
        $('#login-box').removeClass().addClass('register')
    })
    $('.login-header-right').click(function() {
        $('#login-box').removeClass().addClass('login')
    })

    // 搜索框select
    $('.select-option ul li').click(function() {
        if ($(this).hasClass('active')) {
            return;
        } else {
            $(this).addClass('active').siblings().removeClass('active');
            $('.select-text').text($(this).text());
        }
    })

    // 底部推荐
    $('.footer-links-title').click(function() {
        if ($('.footer-links').hasClass('footer-links-active')) {
            $('.footer-links').removeClass('footer-links-active')
        } else {
            $('.footer-links').addClass('footer-links-active')
        }
    })
    $('.footer-links-nav ul li').click(function() {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active').siblings().removeClass();
            $('.footer-links-item ul:nth-child('+($(this).index()+1)+')').css('display', 'block').siblings().hide();
        }
    })

    // 素材举报report
    $('.report').on('click', function() {
        $('#report-box').show();
        $('#mask').show();
    })
    $('.report-btn-cancel').on('click', function() {
        $('#report-box').hide();
        $('#mask').hide();
    })

    // jqueryajax 错误处理
    $(document).ajaxError(
        //所有ajax请求异常的统一处理函数，处理
        function(event,xhr,options,exc ){
            if(xhr.status == 'undefined'){
                return;
            }
            switch(xhr.status){
                case 403:
                    // 未授权异常
                    console.log("系统拒绝：您没有访问权限。");
                    break;

                case 404:
                    console.log("您访问的资源不存在。");
                    break;

                default:
                    tips(xhr.statusText);
                    break;
            }
        }
    );
})

