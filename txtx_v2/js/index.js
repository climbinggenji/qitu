// 监听滚动固定顶部导航栏
window.addEventListener('scroll', function() {
    var top = $('body, html').scrollTop();
    if (top>340) {
        $('#header').addClass('header-fixed');
    } else {
        $('#header').removeClass('header-fixed');
    }
})
$(function() {
    // 轮播图
    var swiper_index = 0;
    swiperRun();
    var swiper_interval = setInterval( function() {
        swiperRun();
    }, 5000)
    $(".lazy").lazyload();
    function swiperRun() {
        $('.swiper-image .active').removeClass();
        $('.swiper-nav .active').removeClass();
        swiper_index += 1;
        if (swiper_index > 6) {
            swiper_index = 1;
        }
        $(".swiper-image a:nth-child(" + swiper_index + ")").addClass('active').css('opacity', 0).animate({opacity: 1});
        $(".swiper-nav ul li:nth-child(" + swiper_index + ")").addClass('active');
    }
    $('.swiper-nav ul li').hover(function() {
        if ($(this).index() + 1 != swiper_index) {
            swiper_index = $(this).index();
            swiperRun();
        }
    })
})