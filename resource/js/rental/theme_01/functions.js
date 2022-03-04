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

	// 스크롤 플러그인 등록
	
	
	
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
	$('#n0_path').on(ani_event_nm, function(){
		window.is_logo_draw_complete = true;
		
		// 로딩이 완료됐는지 확인 후 히든처리
		if (window.is_loading_complete) {
			gsap.fromTo('.loading-letters', {scale:1, opacity:1}, {
				scale: 0, 
				opacity: 0.3, 
				duration: 1,
				onComplete: function(){
					
				}
			});
			setTimeout(function(){
				$('html').scrollTop(0);
				$('.loader').fadeOut(300);
			    $('.side-menu').removeClass('opacity-0');
			    $('body').removeClass('overflow-hidden');
			    window.rs.countShow();
			}, 200);
		}
	});
	
	
	// 좌측 상단메뉴 클릭(모바일)
    var $mobile_menu = $('.mobile-menu-container');
    var m_tl = gsap.fromTo($mobile_menu, {y:-150, autoAlpha:0}, {y:0, autoAlpha:1, duration:0.3, ease:'none'});
    m_tl.pause();
    
    $('#nav_mobile_menu').on('click', function(){
    	var $this = $(this);
    	$this.toggleClass('act');
    	if ($this.hasClass('act')) {
    		$this.closest('.menu-container').addClass('menu-open');
    		m_tl.play();
    	} else {
    		$this.closest('.menu-container').removeClass('menu-open');
    		m_tl.reverse();
    	}
    });
    
    // 상단 메뉴 고정 (스크롤 시 숨기고, 올리면 다시 표시)
    var menu_fixed = gsap.from('#nav_menu', { 
    	yPercent: -100,
    	paused: true,
    	duration: 0.2
    }).progress(1);

	ScrollTrigger.create({
		start: "top top",
		end: 99999,
		onUpdate: function (st) {
			if (st.direction === -1) {
				// 메뉴표시
				menu_fixed.play();
			} else {
				// 메뉴숨김
				menu_fixed.reverse();
				if ($('#nav_mobile_menu').hasClass('act')) {
					$('#nav_mobile_menu').click();
				}
			}
		}
	});
		

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
		
		// 방문자 수 정보
		rs.setCounter();
		
		// 전시회 정보
		rs.setExhibitionInfo();
		
		// 작품 리스트
		rs.setArtList();
		
		// 작가 리스트
		//rs.setArtistList();
		
		// D-Book
		rs.setDbook();
		
		// 방명록
		rs.setVisitor();
		
		// Footer 정보
		rs.setFooter();
		

		//rs.hideLoading();
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
    
    
    /*--------------- 우측 상단메뉴 클릭 ---------------*/
    var sideMenuToggle = $(".dots");
    var sideMenu = $(".side-menu");
    
    sideMenuToggle.on("click", function () {
        $("body").addClass("overflow-hidden");
        sideMenu.addClass("side-menu-active");
        $(function () {
            setTimeout(function () {
                $("#close_side_menu").fadeIn(300);
            }, 300);
        });
    });
    $("#close_side_menu , .side-menu .btn-close").on("click", function () {
        $("body").removeClass("overflow-hidden");
        sideMenu.removeClass("side-menu-active");
        $("#close_side_menu").fadeOut(200);
    });
    $(document).keyup(function(e) {
        if (e.keyCode === 27) { // escape key maps to keycode `27`
            if (sideMenu.hasClass("side-menu-active")) {
                $("body").removeClass("overflow-hidden");
                sideMenu.removeClass("side-menu-active");
                $("#close_side_menu").fadeOut(200);
            }
        }
    });
    

    
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
	$('html, body').animate({
        scrollTop: 0
    }, 700);
	
	/*
	$('html').css('opacity', 0);
	$('html, body').scrollTop(0);
	location.reload();
	*/
}