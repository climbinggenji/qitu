var purchaseVal = {
    type: 0,
    price: 99
}
// vip类型
$('.purchase-tab-option').on('click', function() {
    if (!$(this).hasClass('active')) {
        purchaseVal.type = $(this).index();
        console.log(purchaseVal)
        $(this).addClass('active').siblings().removeClass('active');
        $('.purchase-type-box:eq('+ $(this).index() +')').show().siblings().hide();
    }
})
// 价格
$('.purchase-item').on('click', function() {
    if (!$(this).hasClass('active')) {
        $(this).addClass('active').siblings().removeClass('active');
        $('.purchase-type-box:eq('+ purchaseVal.type +')').find('.purchase-main>p>span').text($(this).find('.text-main>span').text());
    }
})