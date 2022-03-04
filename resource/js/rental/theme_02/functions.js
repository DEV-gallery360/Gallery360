/*---------------------------------------------------------------------
    Gallery360 Rental Service
    

 ----------------------------------------------------------------------*/
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

(function($){
    "use strict";
    var $window = $(window);
    var body = $("body");
    var $root = $("html, body");
    var $menu = $('#nav_menu');	
	
    // 스크롤 이벤트
    /*
    $window.on("scroll", function () {
    	if (window.rs && window.rs.isVrLoadCompleted) {
    		
    		// 표시되는 위치 > 메인 화면이 모두 숨겨진 이후
    		var show_ck = $('#main_banner_area').height() - ($window.height() / 2);
    		var hide_ck = $(document).height() - $window.height() - 200;
    		var scroll = $window.scrollTop();
    		
    		if (scroll > show_ck && scroll < hide_ck) {
    			$('#vr_layer').addClass('show');
    		} else {
    			$('#vr_layer').removeClass('show');
    		}
    		
    	}
    });
    */
    $('body').on('contextmenu', function(){return false;});
        
    // 로딩 화면 완료 이벤트
	var ani_event_nm = whichAnimationEvent();
	$('#last_ani').on(ani_event_nm, function(){
		window.is_logo_draw_complete = true;
		
		// 로딩이 완료됐는지 확인 후 히든처리
		if (window.is_loading_complete) {
			gsap.fromTo('.loading-text-box', {scale:1, opacity:1}, {
				scale: 0.5, 
				opacity: 0.3, 
				duration: 1,
				delay: 0.3,
				onComplete: function(){
					
				}
			});
			setTimeout(function(){
				$('html').scrollTop(0);
				$('.loader').fadeOut(300);
			    $('.side-menu').removeClass('opacity-0');
			    $('body').removeClass('overflow-hidden');
			    setTimeout(function(){
			    	$('#main_visual').click();
			    }, 1000);
			    window.rs.countShow();
			}, 200);
		}
	});
	
	// 로고
	$('#logo').on('click', function(){
		goHome();
	});
	
	// 모바일 메뉴
    var $btn_m_menu = $('#btn_mobile_menu');
    //var m_tl = gsap.fromTo('#in_header', {yPercent:-100}, {yPercent:0, duration:0.3, ease:'none'});
    window.mobile_menu_tl = gsap.timeline();
    window.mobile_menu_tl.fromTo('#in_header', {y:-150, autoAlpha:0}, {y:0, autoAlpha:1, duration:0.3, ease:'none'});
    window.mobile_menu_tl.pause();
    
    $btn_m_menu.on('click', function(){
    	toggleMobileMenu();
	});
    
    // 화면 리사이즈 처리
    ScrollTrigger.matchMedia({
		'(min-width: 980px)': function(){
			toggleMobileMenu(true);
		}
    });
	
    // 상단 메뉴 고정 (스크롤 시 숨기고, 올리면 다시 표시)
    var menu_fixed = gsap.from('#header', { 
    	yPercent: -100,
    	paused: true,
    	duration: 0.1
    }).progress(1);
    var mobile_menu = gsap.from('#btn_mobile_menu', { 
    	y: -90,
    	paused: true,
    	duration: 0.33
    }).progress(1);

	ScrollTrigger.create({
		start: "top top",
		end: 99999,
		onUpdate: function (st) {
			if (st.direction === -1) {
				// 메뉴표시
				menu_fixed.play();
				mobile_menu.play();
			} else {
				// 메뉴숨김
				menu_fixed.reverse();
				mobile_menu.reverse();
			}
		}
	});
	
	// 헤더 처리
	ScrollTrigger.create({
		trigger: '.section1',
		start: 'bottom center',
		end: 'bottom top',
		onEnter: function(){
			$('#header').addClass('black');
			$('#btn_mobile_menu').addClass('black');
		},
		onLeaveBack: function(){
			if ($('#artist_detail_layer').is(':visible')) return;
			$('#header').removeClass('black');
			$('#btn_mobile_menu').removeClass('black');
		}
	});
	
	// 스크롤 최상단
	var $btn_top = $('.btn_top');
	var btn_top_tl = gsap.timeline();
	btn_top_tl.to($btn_top, {y:0});
	btn_top_tl.pause();
	ScrollTrigger.create({
		trigger: '#visitor',
		start: 'bottom-=100 bottom',
		end: 'bottom bottom',
		onEnter: function(){
			btn_top_tl.play();
		},
		onLeaveBack: function(){
			btn_top_tl.reverse();
		}
	});
	$btn_top.on('click', function(){
		$('html').scrollTop(0);
	});
	
	/*
	// VR표시
	$window.on("scroll", function () {
    	if (window.rs && window.rs.isVrLoadCompleted) {
    		var scroll_ck = $(document).height() - $(window).height() - 200;
    		if ($(window).scrollTop() > scroll_ck) {
    			$('#vr_layer').removeClass('show');
    		} else {
    			$('#vr_layer').addClass('show');
    		}
    	}
    });
	*/
    
	window.loadRentalInfo = function(sec_code){
	    //전체 대관 서비스 정보 불러오기
		var url = g360.root_path + "/load_rental_info_all.mon?rr=" + vr_key + (sec_code ? '&sec=' + sec_code : '');
		//rr : rental_roomkey
		//ak : art_key <== 이값이 공백일 경우 대관 전체 데이터를 로딩하고 값이 있을 경우 해당 작품의 방명록 데이터만 가져온다.
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(res){
				if (res.result == 'sec exist') {
    				showSecLayer();
    				return;
    			} else if (res.result == 'sec error') {
    				wrongSecCode();
    				return;
    			} else {
    				hideSecLayer();    				
    			}
				
				var rental_type = res.info.rental_type;
				if (!rental_type || rental_type == '') rental_type = '1';
				
				var url = g360.root_path + "/rental_text_check.mon?id="+rental_type;
				$.ajax({
					dataType : "json",
					contentType : "application/json; charset=utf-8",
					url : url,
					async : false,
					success : function(rental_txt){
						g360.rental_text = rental_txt;
						
						// 로딩 애니메이션이 끊기지 않도록 2.5초  후 부터 수행하도록 함
						setTimeout(function(){
							rentalInfoLoadComplete(res);
						}, 2500);
					},
					error : function(e){
						alert('서비스에 문제가 발생했습니다.\n관리자에게 문의해 주세요.');
					}
				});
				
			},
			error : function(e){
				alert('서비스에 문제가 발생했습니다.\n관리자에게 문의해 주세요.');
			}
		});
	}

	function rentalInfoLoadComplete(rental_info){
		// 임시로 로딩 완료처리
		//window.is_logo_draw_complete = true;
		
		window.rs = new RentalService(rental_info);
		
		//배경음악을 설정한다.
		g360.bgmusic = rental_info.bgmusic;
		
		// 타입별 폰트 설정
		rs.drawRentalText();
		
		// Others 그룹 셋팅
		rs.setGroupList();
		
		// VR 셋팅
		rs.setVR(5000);
		
		// 최상단 메인 설정
		rs.setMainSlide();
				
		// 전시회 정보
		rs.setExhibitionInfo();
		
		// 작품 리스트
		rs.setArtList();
		
		// 작가 리스트
		rs.setArtistList();
		
		// D-Book
		rs.setDbook();
		
		// 방명록
		rs.setVisitor();
		
		// Footer 정보
		rs.setFooter();
		
		//rs.hideLoading();
		setTimeout(function(){
			ScrollTrigger.refresh();			
		}, 1000);
	}
	
    // 브라우저별 애니메이션 종료 이벤트 체크
	function whichAnimationEvent() {
		var t,
			el = document.createElement("fakeelement");

		var animations = {
			"animation": "animationend",
			"OAnimation": "oAnimationEnd",
			"MozAnimation": "animationend",
			"WebkitAnimation": "webkitAnimationEnd"
		}

		for (t in animations) {
			if (el.style[t] !== undefined) {
				return animations[t];
			}
		}
	}
	
	loadRentalInfo();
    
})(jQuery);


function gosns(site_nm){
	if (rs.info.info[site_nm]) {
		window.open(rs.info.info[site_nm], '_blank');
	}
}
function showVR(){
	if (window.rs && window.rs.isVrLoadCompleted) {
		rs.showFullscreen();		
	} else {
		alert('VR을 로딩중입니다. 잠시 후 다시 시도하세요.');		
	}
}
function gotoScroll(id){
	// 화면 오버사이즈시 중앙에 위치시키기
	var over_size = window.innerHeight - $('#'+id).height();
	var offset = 0;
	if (over_size < 0) {
		offset = over_size / 2;
	}
	
	if (id == 'dbook') {
		if (window.innerWidth > 1200) offset = 100;
	}
	
	
	
	gsap.to(window, {
		duration: 0,
		scrollTo: {
			y: '#' + id,
			offsetY: offset 
		}
	});
}
function goHome(){	
	if ($('#artist_detail_layer').is(':visible')) {
		rs.closeArtistDetail();
	}
	$('html, body').animate({
        scrollTop: 0
    }, 700);
	
	/*
	$('html').css('opacity', 0);
	$('html, body').scrollTop(0);
	location.reload();
	*/
}
function toggleMobileMenu(force_close){
	var $btn_m_menu = $('#btn_mobile_menu');
	
	//리사이즈시 호출됨
	if (force_close) {
		if ($btn_m_menu.hasClass('close')) {
			$btn_m_menu.removeClass('close');
			window.mobile_menu_tl.reverse();
			if (!$('#art_detail_layer').is(':visible')){
				$('body').removeClass('overflow-hidden');
			}
		}
		return;
	}
	
	if ($btn_m_menu.hasClass('close')) {
		$btn_m_menu.removeClass('close');
		window.mobile_menu_tl.reverse();
		$('body').removeClass('overflow-hidden');
	} else {
		$btn_m_menu.addClass('close');
		window.mobile_menu_tl.play();
		gsap.to('#in_header', {duration:0.3, scrollTo:{y:0}});
		$('body').addClass('overflow-hidden');
	}	
}

