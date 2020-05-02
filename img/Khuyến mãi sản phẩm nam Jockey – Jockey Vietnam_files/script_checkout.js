if(window.location.href.indexOf('checkout') != -1 ){
	var script=document.createElement('script');
	script.type='text/javascript';
	script.src='//jockeyvn.api.useinsider.com/ins.js?id=10004126';
	$("body").append(script);
	$(document).ajaxSuccess(function( event, xhr, settings ) {
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'UA-42798130-3');
	})
	var txt = $('.section-content-column p:nth-child(4)').text();
	var txt_id = $('.os-order-number').text();
	txt_id = txt_id.trim().split(' ');
	var id = txt_id[txt_id.length-1];
	if(txt.indexOf('Chuyển khoản') != -1){
		var html = '<p style="padding:5px 10px;background:rgb(247, 119, 5);color:#333;margin-top:10px;">Vui lòng chuyển khoản đến số tài khoản 0100100041720001, ngân hàng Thương mại Cổ phần Phương Đông (OCB), Chi nhánh TP.HCM. Với nội dung thanh toán "Thanh toan cho don hang '+id+'"</p>';
		$('.section-content-column').append(html);
	}
}