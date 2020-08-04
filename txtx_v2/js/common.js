// 防抖
function debounce(fn, delay, immediate) {
    let timer = null;
    return function () {
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
            } else {
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
window.onscroll = function () {
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
    });
    $('.qrcode-mask').find('a').on('click', function () {
        popLogin();
    })

    // 人机验证
    // var nc_token = ["CF_APP_1", (new Date()).getTime(), Math.random()].join(':');
    // var NC_Opt = {
    //     //声明滑动验证需要渲染的目标元素ID。
    //     renderTo: "#verify-slide",
    //     //应用类型标识。它和使用场景标识（scene字段）一起决定了滑动验证的业务场景与后端对应使用的策略模型。您可以在人机验证控制台的配置管理页签找到对应的appkey字段值，请务必正确填写。
    //     appkey: "FFFF0N00000000009553",
    //     //使用场景标识。它和应用类型标识（appkey字段）一起决定了滑动验证的业务场景与后端对应使用的策略模型。您可以在人机验证控制台的配置管理页签找到对应的scene值，请务必正确填写。
    //     scene: "nc_login",
    //     //滑动验证码的主键，请勿将该字段定义为固定值。确保每个用户每次打开页面时，其token值都是不同的。系统默认的格式为：”您的appkey”+”时间戳”+”随机数”。
    //     token: nc_token,
    //     //滑动条的宽度。
    //     customWidth: 300,
    //     //业务键字段，可为空。为便于线上问题的排查，建议您按照线上问题定位文档中推荐的方法配置该字段值。
    //     trans: {
    //         "key1": "code0"
    //     },
    //     //语言。PC端Web页面场景默认支持18国语言，详细配置方法请参见自定义文案与多语言文档。
    //     language: "cn",
    //     //是否启用。一般情况，保持默认值（true）即可。
    //     isEnabled: true,
    //     //内部网络请求的超时时间。一般情况建议保持默认值（3000ms）。
    //     timeout: 3000,
    //     //允许服务器超时重复次数，默认5次。超过重复次数后将触发报错。
    //     times: 5,
    //     //前端滑动验证通过时会触发该回调参数。您可以在该回调参数中将请求标识（token）、会话ID（sessionid）、签名串（sig）字段记录下来，随业务请求一同发送至您的服务端调用验签。
    //     callback: function (data) {
    //         window.console && console.log(nc_token)
    //         window.console && console.log(data.csessionid)
    //         window.console && console.log(data.sig)
    //     }
    // }
    // var nc = new noCaptcha(NC_Opt)
    
    //用于自定义文案。详细配置方法请参见自定义文案与多语言文档。
    // nc.upLang('cn', {
    //     _startTEXT: "请按住滑块，拖动到最右边",
    //     _yesTEXT: "验证通过",
    //     _error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
    //     _errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>"
    // })

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
    $('#password').blur(function () {
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
    $('#report-select').on('click', function () {
        handleReportSelect();
    })
    $('#report-select-options li').on('click', function () {
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