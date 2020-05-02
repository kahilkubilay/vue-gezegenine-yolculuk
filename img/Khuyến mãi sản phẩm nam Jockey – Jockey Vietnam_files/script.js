$(document).ready(function(){
	AOS.init();
	$(window).scroll(function () { 
		if ($(this).scrollTop() > 100) {
			$('.scrollup').fadeIn();
		} else {
			$('.scrollup').fadeOut();
		}
	});
	$('.mb-search, .account-cart .love a').click(function(e){
		e.preventDefault();
		if($('.header-wrapper').hasClass('scroll-fixed')){
			$('.header-wrapper').removeClass('scroll-fixed');
		}
		$('.header-action').addClass('active');
	});
	$('.close-search-mb').click(function(){
		$('.header-action').removeClass('active');
	});
	$('.cart-add-bottom .continue').click(function(){
		$('.cart-add-info').removeClass('active');
	});
	// Header scroll
	var $window = $(window);
	var lastScrollTop = 0;
	var check_bottom = true;

	$window.scroll(function() {
		var st = $(this).scrollTop();
		if(!$('.header-action').hasClass('active') && check_bottom){
			if (st > lastScrollTop || st == 0){
				$(".header-wrapper").removeClass("scroll-fixed");	
			} else {
				$(".header-wrapper").addClass("scroll-fixed");		
			}
		}
		lastScrollTop = st;
	}).scroll();

	jQuery('.scrollup').click(function() {
		$('html, body').animate({
			scrollTop: 0
		}, 600);
		return false;
	});

	$('.tree-menu .has-child > a').click(function(e){
		e.preventDefault();
		$(this).parents('li').toggleClass('active');
		$(this).parents('li').find('ul.sub-menu').slideToggle('fast');
	});
	if($('.tree-menu').length > 0){
		$('.tree-menu .has-child').eq(0).children('a').click();
	}
	$('#owl-index').owlCarousel({
		loop:true,
		items:1,
		autoplay:true,
		autoplayTimeout:3000,
		autoplayHoverPause:true,
		nav: false,
		navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
	});
	$('#sliderproduct-mobile').owlCarousel({
		items:1,
		nav: false,
		dots: true,
		loop:true,
	});
	if($('#owl-product-index').length > 0){
		$('#owl-product-index').owlCarousel({
			dots: false,
			nav: true,
			navText: ['<i class="fas fa-angle-left"></i>','<i class="fas fa-angle-right"></i>'],
			responsive:{
				0:{
					items:2,
					margin:10
				},
				600:{
					items:3,
					margin:15
				},
				768:{
					items:4,
					margin:20
				},
				992:{
					items:5,
					margin:30
				}
			}
		});
	}
	$('#sizeModal .size-tab a').click(function(e){
		e.preventDefault();
		$(this).parent().addClass('active').siblings().removeClass('active');
		var link = $(this).attr('href');
		$('.size-contents .size-content-block').removeClass('active');
		$('.size-contents '+link).addClass('active');
	});
	$('#add-item-form .sizechart-btn, .product-recommend .sizechart-btn').click(function(e){
		e.preventDefault();
		var target = $(this).data('size');
		if(target == ""){
			$('#sizeModal .size-tab li:first-child a').click();
		}else{
			$('#sizeModal .size-tab a[href="#'+target+'"]').click();
		}
	});
	/*---------Menu Mobile-----------------*/
	$('#header-mobile-menu').click(function(e){
		$('body').toggleClass('open-menu');
		$(this).toggleClass('active');
		$('#mmenu').toggleClass('active');
	});
	$('.menu-nav-mobile-close').click(function(){
		$('body').removeClass('open-menu');
		$('#mmenu, #header-mobile-menu').removeClass('active');
	});
	$('span.icon-sub').click(function(e){
		if($(this).parent().hasClass('active')){
			$(this).parent().removeClass('active');
			//$(this).siblings('ul').slideUp();
		}
		else{
			$(this).parent().addClass('active');
			//$(this).siblings('ul').slideDown();
		}
	});
	$('#header-nav-mobile .back').click(function(){
		$(this).parent().parent().removeClass('active');
	});
	/*$('.account-cart .cart > a, .mb-cart > a, .cart-add-bottom a').click(function(e){
		e.preventDefault();
		$('.cart-add-info').removeClass('active');
		$.ajax({
			type:'GET',
			url: '/cart?view=mini',
			success: function(data){
				$('#mobile-cart').html(data);
				$('.account-cart .cart > a span').html(data.item_count);
				$('#mobile-cart').addClass('active');
				$('body').addClass('open-cart');
			}
		});
	});*/
	$(document).on('click','.close-nav-sidebar-new', function(){
		$('#mobile-cart, .mobile-filter').removeClass('active');
		$('body').removeClass('open-cart');
	});
	$('.cart-mobile-close').click(function(){
		$('#mobile-cart').removeClass('active');
		$('body').removeClass('open-cart');
	});
	$('#mobile-cart').on('click','.remove-item-cart a', function(e){
		e.preventDefault();
		var id = $(this).data('id');
		$.ajax({
			type:'POST',
			url: "/cart/change.js",
			data: "quantity=0&id=" + id,
			success: function(){
				$.ajax({
					type:'GET',
					url: '/cart?view=mini',
					success: function(data){
						console.log(data);
						$('#mobile-cart').html(data);
					}
				});
				$.getJSON('/cart.js', function(data){
					$('.account-cart .cart > a span').html(data.item_count);
				})
			}
		});
	});
	/*---------Product Quickview----------*/
	$('body').on('click','.btn-quickview',function(e){
		e.preventDefault();
		var handle = $(this).attr('data-link');
		var title = $(this).attr('data-title');
		$.ajax({
			url:handle +'?view=quickview',
			success:function(e){
				$('#quick-view-modal').html(e);
				if(title != undefined){
					$('#quick-view-modal').find('.swatch-element[data-value="'+title+'"]').click();
				}
				$('.quickview-trigger').click();
			}
		})
	});
	var check_quickview = false;
	$('#quick-view-modal').on('shown.bs.modal', function (e) {
		$('body').addClass('quickview-open');
		check_quickview = true;
	})
	$('#quick-view-modal').on('hidden.bs.modal', function (e) {
		$('body').removeClass('quickview-open');
		$('.zoomContainer').remove();
		check_quickview = false;
	})
	$('#sizeModal, #return-modal').on('shown.bs.modal', function (e) {
		if(check_quickview){
			$('body').removeClass('quickview-open');
		}
	})
	$('#sizeModal, #return-modal').on('hidden.bs.modal', function (e) {
		if(check_quickview){
			$('body').addClass('quickview-open');
		}
	})
	$('.related-loop_img .view-large a').click(function(e){
		e.preventDefault();
		var img = $(this).data('img');
		var txt = '<div class="modal-dialog"><div class="modal-content clearfix" role="document"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><svg viewBox="0 0 18 18"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 .7L.7 0 18 17.3l-.7.7L0 .7z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M18 .7l-.7-.7L0 17.3l.7.7L18 .7z"></path></svg></button><h4 class="modal-title title-quickview" >Phóng to</h4></div>';
		txt+= '<div class="products text-center"><img src="'+img+'" alt="Hình phóng to" /></div></div>';
		$('#quick-view-modal').html(txt);		
		$('.quickview-trigger').click();
	})
	$('.view-large-recommend').click(function(e){
		e.preventDefault();
		var img = $(this).parents('.product-recommend-img').find('.owl-item.active img').data('image');
		var txt = '<div class="modal-dialog"><div class="modal-content clearfix" role="document"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><svg viewBox="0 0 18 18"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 .7L.7 0 18 17.3l-.7.7L0 .7z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M18 .7l-.7-.7L0 17.3l.7.7L18 .7z"></path></svg></button><h4 class="modal-title title-quickview" >Phóng to</h4></div>';
		txt+= '<div class="products text-center"><img src="'+img+'" alt="Hình phóng to" /></div></div>';
		$('#quick-view-modal').html(txt);		
		$('.quickview-trigger').click();
	})
	$('.owl-product-thumb .owl-item img').click(function(){
		$(this).parents('.owl-product-thumb').next().find('a').click();
	});
	/*---------------ultimate search -------*/
	/* Search ultimate destop -mobile*/
	$('.ultimate-search, .topsearch').submit(function(e) {
		e.preventDefault();
		var q = $(this).find('input[name=q]').val(), str2 = '';
		var q_follow = 'product';
		/*var key2 = q.split(' ');
		for(i=0;i<key2.length;i++){
			str2 += '&&' + '(title:product**'+key2[i]+')';
		}
		str2=str2.replace('&&','');
		var query = encodeURIComponent(str2);*/
		if( !q ) {
			window.location = '/search?type='+ q_follow +'&q=*';
			return;
		}	else {
			var query = encodeURIComponent("(title:product**"+q+")");
			window.location = '/search?type=' + q_follow +'&q=filter=' + query;
			return;
		}
	});
	/******************/
	var $input = $('.ultimate-search input[type="text"], .topsearch input[type="text"]');
	$input.bind('keyup change paste propertychange', function() {
		var key = $(this).val(),
				$parent = $(this).parents('.wpo-wrapper-search'),
				$results = $(this).parents('.wpo-wrapper-search').find('.smart-search-wrapper');
		if(key.length > 0 ){
			$(this).attr('data-history', key);
			var q_follow = 'product',
					str = '', str2 = '';
			/*var key2 = key.split(' ');
			for(i=0;i<key2.length;i++){
				str2 += '&&' + '(title:product**'+key2[i]+')';
			}
			str2=str2.replace('&&','');*/
			str = '/search?q=filter='+ encodeURIComponent("(title:product**"+key+")") + '&view=smart';
			$.ajax({
				url: str,
				type: 'GET',
				async: true,
				success: function(data){
					$results.find('.resultsContent').html(data);
				}
			})
			$results.fadeIn();
		}else{
			$results.fadeOut();
		}
	})

	/*$('input[name="follow"]').on('change', function(){
		$('.ultimate-search input[type="text"]').trigger('change');
	})
	$('input[name="follow_mobile"]').on('change', function(){
		$('.ultimate-search input[type="text"]').trigger('change');
	})*/
	$('body').click(function(evt) {
		var target = evt.target;
		if (target.id !== 'ajaxSearchResults' && target.id !== 'inputSearchAuto') {
			$(".ajaxSearchResults").hide();
		}
		if (!$(target).closest('.cart-add-info').length && !$(target).closest('.btn-cart').length && !$(target).closest('.modal-buynow-trigger').length) {
			$('.cart-add-info').removeClass('active');
		}
	});
	$('body').on('click', '.topsearch input[type="text"]', function() {
		if ($(this).is(":focus")) {
			if ($(this).val() != '') {
				$("#ajaxSearchResults").show();
			}
		} else {

		}
	})

	$('.sub-menu [data-active]').parents('li').addClass('active');
	$(document).on("click",".color-item img",function(){
		var img = $(this).attr("data-img");
		var url = $(this).parent().attr("data-link");
		//$(this).parents('ul').find('li').removeClass('active');
		$(this).parents('li').addClass('active').siblings().removeClass('active');
		$(this).parents('.product-loop').find(".product-img img").attr("src",img);
		$(this).parents('.product-loop').find('.product-img a').attr('href',url);
		$(this).parents('.product-loop').find('.product-name a').attr('href',url);
	});
	$(document).on("mouseenter",".color-swatches .color-item", function() { 
		$(this).parents('.product-loop').addClass('has_hover');
		var img = $(this).find('img').attr("data-img");
		$(this).parents('.product-loop').find(".product-img img").attr("src",img);
	});
	$(document).on("mouseleave",".color-swatches .color-item", function() { 
		var img = $('.product-loop.has_hover .color-swatches .active img').attr("data-img");;
		$('.product-loop.has_hover .product-img img').attr("src",img);
		$('.product-loop').removeClass('has_hover');
	});
	$('.trigger-mail').click(function(e){
		e.preventDefault();
		FreshworksWidget('open');
	});
})
