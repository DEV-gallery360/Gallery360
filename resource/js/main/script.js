//var docWidth = $("body").width();
//var headerH = $(".navbar").height();

/*
 * GNB 스크롤시 숨기기
var last_scroll_y = 0;
$(window).on('scroll.header_hidden', function() {
	var y = $(window).scrollTop();
	var calc = y - last_scroll_y;
	if (Math.abs(calc) <= 5) return;
	if (calc > 0 && y > $('#header').outerHeight()) {
		$('#header').addClass('hidden');
		$('body').addClass('header-hidden');
		$('#search_area').hide();
		$('#search_bg').hide();
	} else {
		$('#header').removeClass('hidden');
		$('body').removeClass('header-hidden');
	}
	last_scroll_y = y;
});
*/

$(window).on('scroll.pinter_scroll', function() {
	try{
		var $wrapper = $('#thum_wrapper'),
		$art = $('#this_month_art'),
		sc = $(window).scrollTop(),
		_padding_top = 70;
		var width = window.innerWidth;
		
		if (width < 1200) return false;
		
		var eleTop = $wrapper.offset().top - _padding_top;
		var eleBottom = ($wrapper.height() + eleTop) - $art.height();
		if (eleTop > sc && $art.css('position') == 'fixed') {
			$art.removeClass('main-content-fixed');
		}
		if (eleTop <= sc && eleBottom >= sc && $art.css('position') != 'fixed') {
			$art.addClass('main-content-fixed');
			$art.removeClass('main-content-fixed-end');
		}
		if (eleBottom <= sc && $art.css('position') == 'fixed') {
			$art.removeClass('main-content-fixed');
			$art.addClass('main-content-fixed-end');
		}
	}catch(e){}
	
});
$(window).resize(function() {
	//headerH = $(".navbar").height();
	//docWidth = $("body").width();
	var width = window.innerWidth;
	if (width < 1200) {
		$('#this_month_art').removeClass('main-content-fixed');
		$('#this_month_art').removeClass('main-content-fixed-end');
		$('#this_month_news').removeClass('main-content-fixed');
		$('#this_month_news').removeClass('main-content-fixed-end');
	}
	
	if (width >= 1200) {
		if ($('.mobile-menu-nav-wrap', '#top_content').hasClass('active')) {
			$(".m-navi-bg", '#top_content').click();
		}
	}
	
	if (width > 440) {
		$('#main_curie_icon').removeClass('hide');
    	$('#main_space_icon').removeClass('hide');
	}
	
	
})
$(".search-open").click(function(){
	$(".search-area").toggleClass("active");
	$(".search-open").toggleClass("active");
	$(".search-bg").toggleClass("active");
	$('#main_search_query').focus();
	return false;
});
$(".search-bg").click(function(){
	$(".search-area").removeClass("active");
	$(".search-bg").removeClass("active");
	$(".search-open").removeClass("active");
	return false;
});
$(".search-open.active").click(function(){
	$(".search-area").css("display","none");
	$(".search-bg").css("display","none");
	$(".search-open").removeClass("active");
	return false;
});

$(window).on("scroll", function () {
	var width = window.innerWidth;
	if (width > 440) return;
	
	var scroll_ck = $(document).height() - $(window).height() - 100;
    if ($(window).scrollTop() > scroll_ck) {
    	$('#main_curie_icon').addClass('hide');
    	$('#main_space_icon').addClass('hide');
    } else {
    	$('#main_curie_icon').removeClass('hide');
    	$('#main_space_icon').removeClass('hide');
    }
});

    /*
$(".search-open").click(function(){
	if ($(".search-area").css("display") == "block") {
		$(".search-area").css("display","none");
		$(".search-bg").css("display","none");
	} else {
		$(".search-area").css("display","block");
		$(".search-bg").css("display","block");
	}
	return false;
});
$(".search-bg").click(function(){
    $(".search-area").css("display","none");
    $(".search-bg").css("display","none");
	return false;
});
    */