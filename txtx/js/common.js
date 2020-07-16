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
        console.log(123)
        $('#login-box').css('display', 'block');
        $('#mask').css('display', 'block');
    });
    $('.login-box-close').click(function() {
        $('#login-box').css('display', 'none');
        $('#mask').css('display', 'none');
    });
    $('#mask').click(function() {
        $('#login-box').css('display', 'none');
        $('#mask').css('display', 'none');
    });
    $('.login-toRegister').click(function() {
        $('#login-box').removeClass().addClass('register')
    })
    $('.login-header-right').click(function() {
        $('#login-box').removeClass().addClass('login')
    })

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

    // 图片流
    $('.flex-images').flexImages({rowHeight: 240});
    $(".lazy").lazyload();
})

