var COMMON_DATA = {
    jiyan_URL: '', // 极验验证初始化url
    
}

// 防抖
function debounce(fn, delay, immediate) {
    let timer = null;
    return function() {
        const context = this;
        const args = arguments;

        return new Promise((resolve, reject) => {
            timer && clearTimeout(timer);

            if (immediate) {
                const doNow = !timer;

                timer = setTimeout(() => {
                    timer = null;
                }, delay);

                doNow && resolve(fn.apply(context, args));
            }
            else {
                timer = setTimeout(() => {
                    resolve(fn.apply(context, args));
                }, delay);
            }
        });
    };
}

// 监听滚动固定顶部导航栏
function showTop() {
    var top = $('body, html').scrollTop();
    if (top > 340) {
        $('#header').addClass('header-fixed');
    } else {
        $('#header').removeClass('header-fixed');
    }
}
window.onscroll = function() {
    showTop();
}

// 当页面高度不够时底部吸底
function footerBottom() {
    if ($(window).height() > $('body').height()) {
        $('.footer-common').addClass('footer-fixed')
    }
}

// tips 错误提示
function tips(text, time) {
    var tipsHtml = '<div class="tips-style"><div class="tips-main"><i class="iconfont">&#xe63f;</i> <span class="text">' + text + '</span></div></div>'
    $('body').append(tipsHtml);
    if (!time) {
        time = 3 * 1000
    }
    var tipsTimer = setTimeout(function () {
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
var isPageMiniDisable = function (current) {
    if (current == 1) $('.icon-left').addClass('disable');
    if (current == 28) $('.icon-right').addClass('disable');
}
$(function () {
    footerBottom()
    let current = parseInt($('#paging-mini-current').text());
    isPageMiniDisable(current);
    $('.icon-right').click(function () {
        if (current < 28) {
            if (current == 1) {
                $('.icon-left').removeClass('disable');
            }
            current++;
            $('#paging-mini-current').text(current);
            isPageMiniDisable(current);
        }
    });
    $('.icon-left').click(function () {
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
    $('.btn-login').click(function () {
        popLogin();
        jiyan('/register');
    });
    $('.qrcode-mask').find('a').on('click', function () {
        popLogin();
    })
    // 极验验证
    function jiyan(url) {
        $.ajax({
            url: url + (new Date()).getTime(), // 加随机数防止缓存
            type: "get",
            dataType: "json",
            success: function (data) {
                // 调用 initGeetest 初始化参数
                // 参数1：配置参数
                // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
                initGeetest({
                    gt: data.gt,
                    challenge: data.challenge,
                    new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
                    offline: !data.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
                    product: "float", // 产品形式，包括：float，popup
                    width: "100%"
                }, handler);
            }
        });
    }
    var handler = function (captchaObj) {
        $("#submit").click(function (e) {
            console.log(123)
            e.preventDefault();
            var result = captchaObj.getValidate();
            if (!result) {
                $("#notice").show();
                setTimeout(function () {
                    $("#notice").hide();
                }, 2000);
                e.preventDefault();
            }
        });
        // 将验证码加到id为captcha的元素里，同时会有三个input的值用于表单提交
        captchaObj.appendTo("#captcha");
        captchaObj.onReady(function () {
            $("#wait").hide();
        });
    };

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
    $('#zhanghao').blur(function () {
        if (!$(this).val()) {
            loginTips($(this), '请输入用户名');
        } else {
            loginTips($(this));
        }
    })
    $('#pasword').blur(function () {
        if (!$(this).val()) {
            loginTips($(this), '请输入密码');
        } else {
            loginTips($(this));
        }
    })

    // 遮罩层
    $('#mask').click(function () {
        popOff();
    });
    $('.pop-main').find('.close-icon').on('click', function () {
        popOff();
    })

    $('.login-toRegister').click(function () {
        $('#login-box').removeClass().addClass('register')
    })
    $('.login-header-right').click(function () {
        $('#login-box').removeClass().addClass('login')
    })

    // 搜索框select
    $('.select-option ul li').click(function () {
        if ($(this).hasClass('active')) {
            return;
        } else {
            $(this).addClass('active').siblings().removeClass('active');
            $('.select-text').text($(this).text());
        }
    })

    // 底部推荐
    $('.footer-links-title').click(function () {
        if ($('.footer-links').hasClass('footer-links-active')) {
            $('.footer-links').removeClass('footer-links-active')
        } else {
            $('.footer-links').addClass('footer-links-active')
        }
    })
    $('.footer-links-nav ul li').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active').siblings().removeClass();
            $('.footer-links-item ul:nth-child(' + ($(this).index() + 1) + ')').css('display', 'block').siblings().hide();
        }
    })

    // 素材举报report
    $('.report').on('click', function () {
        $('#report-box').show();
        $('#mask').show();
    })
    // 举报select
    function handleReportSelect() {
        $('#report-select-options').toggle().parent().toggleClass('selecting');
    }
    $('#report-select').on('click', function() {
        handleReportSelect();
    })
    $('#report-select-options li').on('click', function() {
        $('#report-select').val($(this).text());
        handleReportSelect();
    })
    
    // jquery ajax 错误处理
    $(document).ajaxError(
        //所有ajax请求异常的统一处理函数，处理
        function (event, xhr, options, exc) {
            if (xhr.status == 'undefined') {
                return;
            }
            switch (xhr.status) {
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