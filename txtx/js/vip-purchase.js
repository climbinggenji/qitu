var purchaseVal = {
    type: 0,
    price: 99
}
$('.purchase-item').on('click', function() {
    if (!$(this).hasClass('active')) {
        $(this).addClass('active').siblings().removeClass('active');
        $('.purchase-type-box:eq('+ purchaseVal.type +')').find('.purchase-main>p>span').text($(this).find('.text-main>span').text());
    }
})