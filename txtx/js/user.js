// 菜单栏切换
$('.user-menu>ul>li').on('click', function() {
    if (!$(this).hasClass('active')) {
        $('.provide-menu-list>li').removeClass('active');
        if ($(this).index() < 3) {
            $(this).addClass('active').siblings().removeClass('active');
            $('.main-content>div:eq('+ $(this).index() + ')').css('display', 'block').siblings().css('display', 'none');
        } else if ($(this).index() > 3) {
            $(this).addClass('active').siblings().removeClass('active');
            $('.main-content>div:eq('+ ($(this).index()-1) + ')').css('display', 'block').siblings().css('display', 'none');
        } else {
            $('.provide-menu-list').toggle();
        }
    }
})

$('.provide-menu-list>li').on('click', function() {
    if (!$(this).hasClass('active')) {
        $('.user-menu>ul>li').removeClass('active');
        $(this).addClass('active').siblings().removeClass('active');
        $('.provide-content').show().siblings().hide();
        $('.provide-content>div:eq('+ $(this).index() + ')').show().siblings().hide();
    }
})