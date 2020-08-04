$(function() {
    var pageDefault = {
        count: 181,
        pageCount: 20,
        pageCurrent: 2
    }
    if ($('#page').hasClass('page-less')) {
        $('#page').css('width', '700px')
    }
    pageDefault.total = Math.ceil(pageDefault.count/pageDefault.pageCount);
    console.log(pageDefault.total);
    $('.page').paging(pageDefault);
    $('.page').on('click', '.btn', function() {
        var val = $(this).data('value')
        if (typeof val == 'number') {
            pageDefault.pageCurrent = val;
            $('.page').paging(pageDefault, val);
        } else if (typeof val == 'string') {
            if (val == 'go') {
                var pageGo = parseInt($('#page-go').val());
                if (pageGo>0 && pageGo<=pageDefault.total) {
                    pageDefault.pageCurrent = pageGo;
                    console.log(typeof pageGo)
                    $('.page').paging(pageDefault, pageGo);
                }
            } else {
                if (val == 'up') {
                    if (pageDefault.pageCurrent != 1) {
                        $('.page').paging(pageDefault, val);
                        pageDefault.pageCurrent -= 1;
                    }
                } else {
                    if (pageDefault.pageCurrent-1 != pageDefault.total) {
                        $('.page').paging(pageDefault, val);
                        pageDefault.pageCurrent += 1;
                    }
                }
            }
        }
    })
})