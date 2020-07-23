// 菜单栏切换
$('.user-menu>ul>li').on('click', function() {
    if (!$(this).hasClass('active')) {
        if ($(this).index() == 3) {
            $('.provide-menu-list').toggle();
        }
    }
})

// $('.provide-menu-list>li').on('click', function() {
//     if (!$(this).hasClass('active')) {
//         $('.user-menu>ul>li').removeClass('active');
//         $(this).addClass('active').siblings().removeClass('active');
//         $('.provide-content').show().siblings().hide();
//         $('.provide-content>div:eq('+ $(this).index() + ')').show().siblings().hide();
//     }
// })