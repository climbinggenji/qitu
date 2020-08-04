// 菜单栏下拉收起
// $('.handle-provide-list').on('click', function() {
//     $('.provide-menu-list').toggle();
//     if ($(this).find('.arrow').hasClass('arrow-down')) {
//         $(this).find('.arrow').removeClass('arrow-down').addClass('arrow-up');
//     } else {
//         $(this).find('.arrow').removeClass('arrow-up').addClass('arrow-down');
//     }
// })
$('.handle-zijin-list').on('click', function() {
    $('.zijin-list').toggle();
    if ($(this).find('.arrow').hasClass('arrow-down')) {
        $(this).find('.arrow').removeClass('arrow-down').addClass('arrow-up');
    } else {
        $(this).find('.arrow').removeClass('arrow-up').addClass('arrow-down');
    }
})