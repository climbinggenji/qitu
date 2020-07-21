(function ($) {
    jQuery.fn.paging = function (settings, val) {

        this.each(function () {
            // element-specific code here
            var current = settings.pageCurrent,
                count = settings.total;
            if (val) {
                switch (val) {
                    case 'up':
                        current -= 1
                        break;
                    case 'down':
                        current += 1
                        break;
                    case 'go':
                        current = settings.go;
                        break;
                    default:
                        current = val;
                        break;
                }
            }
            cleanPage();
            $('.page-list').append(updatePage(current, count));
        });

        return this;
    };

    function updatePage(pageCurrent, pageCount) {
        var pageHtml = "";
        if (pageCount > 7) {
            if (pageCurrent < 5) {
                for (var i = 0; i <= 5; i++) {
                    if (pageCurrent == i + 1) {
                        pageHtml += `<div class="btn btn-page active" data-value="${i+1}"> ${i+1} </div>`;
                    } else {
                        pageHtml += `<div class="btn btn-page" data-value="${i+1}"> ${i+1} </div>`;
                    }
                };
                pageHtml += `<div class="btn btn-page"> ... </div>`;
                pageHtml += `<div class="btn btn-page" data-value="${pageCount}"> ${pageCount} </div>`;
            } else if (pageCurrent > 5 && (pageCount - pageCurrent) < 5) {
                pageHtml += `<div class="btn btn-page" data-value="${1}"> ${1} </div>`;
                pageHtml += `<div class="btn btn-page"> ... </div>`;
                for (var i = pageCount-6; i < pageCount; i++) {
                    if (pageCurrent == i + 1) {
                        pageHtml += `<div class="btn btn-page active" data-value="${i+1}"> ${i+1} </div>`;
                    } else {
                        pageHtml += `<div class="btn btn-page" data-value="${i+1}"> ${i+1} </div>`;
                    }
                };
            } else {
                pageHtml += `<div class="btn btn-page" data-value="${1}"> ${1} </div>`;
                pageHtml += `<div class="btn btn-page"> ... </div>`;
                for (var i = pageCurrent-3; i < pageCurrent+2; i++) {
                    if (pageCurrent == i + 1) {
                        pageHtml += `<div class="btn btn-page active" data-value="${i+1}"> ${i+1} </div>`;
                    } else {
                        pageHtml += `<div class="btn btn-page" data-value="${i+1}"> ${i+1} </div>`;
                    }
                };
                pageHtml += `<div class="btn btn-page"> ... </div>`;
                pageHtml += `<div class="btn btn-page" data-value="${pageCount}"> ${pageCount} </div>`;
            }
        } else {
            for (var i = 0; i <= 6; i++) {
                if (pageCurrent == i + 1) {
                    pageHtml += `<div class="btn btn-page active" data-value="${i+1}"> ${i+1} </div>`;
                } else {
                    pageHtml += `<div class="btn btn-page" data-value="${i+1}"> ${i+1} </div>`;
                }
            };
        }
        // for (var i = 0; i < pageCount; i++) {
        //     if (pageCurrent < 5) {
        //         if (pageCurrent == i + 1) {
        //             pageHtml += `<div class="btn btn-page active" data-value="${i+1}"> ${i+1} </div>`;
        //         } else {
        //             pageHtml += `<div class="btn btn-page" data-value="${i+1}"> ${i+1} </div>`;
        //         }
        //     }
        // };
        return pageHtml;
    };

    function cleanPage() {
        $('.btn-page').each(function () {
            $(this).remove();
        });
    };
})(jQuery);