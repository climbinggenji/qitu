// 监听滚动固定顶部导航栏
window.addEventListener('scroll', function() {
    var top = $('body, html').scrollTop();
    if (top>340) {
        $('#header').addClass('header-fixed');
    } else {
        $('#header').removeClass('header-fixed');
    }
})

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
                $('.icon-left').removeClass('disable')
            }
            current++;
            $('#paging-mini-current').text(current);
            isPageMiniDisable(current);
        }
    });
    $('.icon-left').click(function() {
        if (current > 1) {
            if (current == 28) {
                $('.icon-right').removeClass('disable')
            }
            current--;
            $('#paging-mini-current').text(current);
            isPageMiniDisable(current);
        }
    });

    // 登录弹窗
    $('.btn-login').click(function() {
        $('#login-box').css('display', 'block');
        $('#mask').css('display', 'block');
    });
    $('.login-box-close').click(function() {
        $('#login-box').css('display', 'none');
        $('#mask').css('display', 'none');
    });
    // 遮罩层
    $('#mask').click(function() {
        $('#login-box').css('display', 'none');
        $('#mask').css('display', 'none');
        $('#report-box').hide();
    });
    $('.login-toRegister').click(function() {
        $('#login-box').removeClass().addClass('register')
    })
    $('.login-header-right').click(function() {
        $('#login-box').removeClass().addClass('login')
    })
    // 密码隐藏/显示
    $('.login-password').on('click', '.psw-hide', function() {
        $(this).removeClass('psw-hide').addClass('psw-on');
        $(this).html('&#xe608;')
        $(this).prev().attr('type', 'text');
    });
    $('.login-password').on('click','.psw-on', function() {
        $(this).removeClass('psw-on').addClass('psw-hide');
        $(this).html('&#xe606;')
        $(this).prev().attr('type', 'password');
    });
    // 登录滑块插件
    // $('#slide').slider({
    //     width: 320,
    //     height: 33,
    //     sliderBg:"#e8e8e8",// 滑块背景颜色
    //     color:"#333",// 文字颜色
    //     fontSize: 12, // 文字大小
    //     bgColor: "#33CC00", // 背景颜色
    //     textMsg: "请按住滑块，拖动到最右边", // 提示文字
    //     successMsg: "验证通过", // 验证成功提示文字
    //     successColor: "red", // 滑块验证成功提示文字颜色
    //     time: 400, // 返回时间
    //     callback: function(result) { // 回调函数，true(成功),false(失败)
    //         $("#result2").text(result);
    //     }
    // })

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
            $('.footer-links-item ul:nth-child('+($(this).index()+1)+')').css('display', 'block').siblings().css('display', 'none');
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
})

