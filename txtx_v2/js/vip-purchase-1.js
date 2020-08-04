// 根据跳转方式切换默认选择的套餐
function getRequest() {
    var url = window.location.search;
    var theRequest = new Object();
    if (url.indexOf('?') != -1) {
        var str = url.substr(1);
        strs = str.split('&');
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
if (window.location.search) {
    request = getRequest();
    if (request.click_type) {
        ZHIFU_DATA.click_type = request.click_type;
    }
    $('.purchase-item:eq(' + (request.check - 1) + ')').addClass('active');
    // ZHIFU_DATA.pay_type = $('.purchase-item:eq(' + (request.check - 1) + ')').find('.text').text();
    ZHIFU_DATA.vip_id = $('.purchase-item:eq(' + (request.check - 1) + ')').find('.text').attr('attr-id');
    refeshLink(ZHIFU_DATA.erweima_URL);
} else {
    $('.purchase-item:eq(2)').addClass('active');
    // ZHIFU_DATA.pay_type = $('.purchase-item:eq(2)').find('.text').text();
    ZHIFU_DATA.vip_id = $('.purchase-item:eq(2)').find('.text').attr('attr-id');
    refeshLink(ZHIFU_DATA.erweima_URL);
}

// 微信二维码请求过度动画
function erweimaLoading(end) {
    var canvas = document.getElementById('qrcode-saomiao');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "#999999";
    ctx.fillRect(0, 0, 178, 178);
    ctx.clearRect(5, 5, 168, 168);
    ctx.clearRect(30, 0, 118, 178);
    ctx.clearRect(0, 30, 178, 118);
    var line = {
        x: 0,
        y: 35,
        width: 178,
        height: 4
    }

    function draw(line) {
        ctx.fillRect(line.x, line.y, line.width, line.height);
    }
    draw(line);
    var erweimaAnimate = setInterval(() => {
        line.y += 1
        if (line.y > 144) {
            line.y = 35;
        }
        ctx.clearRect(0, 30, 178, 118);
        draw(line)
    }, 12);
    if (end) {
        clearInterval(erweimaAnimate);
    }
}

// 切换套餐生成二维码及支付宝外链
$('.purchase-item').on('click', function () {
    if (!$(this).hasClass('active')) {
        let index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        ZHIFU_DATA.vip_id = $(this).find('.text').attr('attr-id');
        refeshLink(ZHIFU_DATA.erweima_URL);
    }
})

// 支付链接
function zhifubaoLink(url, params, target) {
    var tempform = document.createElement('form');
    tempform.action = url;
    tempform.method = 'post';
    tempform.style.display = 'none';
    if (target) {
        tempform.target = target
    }

    for (var x in params) {
        var opt = document.createElement("input");
        opt.name = x;
        opt.value = params[x];
        tempform.appendChild(opt);
    }
    var opt = document.createElement("input");
    opt.type = "submit";
    tempform.appendChild(opt);
    document.body.appendChild(tempform);
    tempform.submit();
    document.body.removeChild(tempform);
}
$('.tozhifubao').on('click', function () {
    zhifubaoLink(
        ZHIFU_DATA.zhifubao_URL,
        {
            vip_id: ZHIFU_DATA.vip_id,
            pay_type: ZHIFU_DATA.pay_type,
            click_type: ZHIFU_DATA.click_type
        },
        '_blank'
    );
})


// 二维码
function refeshLink(url) {
    $.ajax({
        type: 'POST',
        url: url,
        data: {
            vip_id: ZHIFU_DATA.vip_id,
            pay_type: ZHIFU_DATA.pay_type,
            click_type: ZHIFU_DATA.click_type
        },
        dataType: 'json',
        beforeSend: function () {
            // 发送请求前运行的函数
            $('#qrcode-img').empty();
            $('#qrcode-saomiao').show();
            erweimaLoading();
        },
        success: function (res) {
            // 请求成功
            // var data = JSON.parse(res);
            if (res.code == 200) {
                outputQRCod(res.src)
                // 延迟3秒查询订单
                store.wxOrderId = res.order_no;
                setTimeout(function () {
                    startFetching(ZHIFU_DATA.wxlunxun_URL);
                }, 3 * 1000)
            }
        },
        complete: function () {
            // 请求完成
            erweimaLoading(end = true);
            $('#qrcode-saomiao').hide();
        }
    })
}

// 轮询
var startFetching = function (url, delay) {
    var orderId = store.wxOrderId;
    if (!orderId) return;
    if (!delay) {
        delay = 3 * 1000;
    }

    if (store.timer) {
        clearInterval(store.timer);
    }

    store.startAt = (new Date()).getTime();
    store.timer = setInterval(function () {
        $.post(url, {
            order_no: orderId
        }, function (res) {
            // 查询到订单支付成功
            if (res.code === 200) {
                clearInterval(store.timer);

                // $('.success,#mask').show();

                // location.href = res.redirect_url;

                return;
            }

            var time = (new Date()).getTime();

            // 如果间隔超过5分钟，关闭轮询
            if (store.startAt && (time - store.startAt) > 1000 * 60 * 5) {
                clearInterval(store.timer);
            }
        });
    }, delay);
};

//中文字符处理
function toUtf8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

//生成二维码
function outputQRCod(txt) {
    //先清空
    $("#qrcode-img").empty();
    //中文格式转换
    var str = toUtf8(txt);
    //生成二维码
    $("#qrcode-img").qrcode({
        render: "table",
        width: 178,
        height: 178,
        text: str
    });
}