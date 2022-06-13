
function gMainContent(){	
	
}

gMainContent.prototype = {		

	"init" : function(){
		var _self = this;
		
		this._eventBind();
		this.loadVrOfMonth();
		this.loadArtOfMonth();
		this.loadArtistOfMonth();
		//this.loadCuratorRec();
		this.loadRentalList();
		
		//this.loadSNS();
		
		//자동 업뎃
		//this.loadSNS2();
		
		this.partners_count();
		
		this.g_lang();
	},
	
	"g_lang" : function(){
	
		// - slider
		$(".g_lang_slider1_1").html(g360.g_lang.slider1_1);
		$(".g_lang_slider1_2").html(g360.g_lang.slider1_2);
		$(".g_lang_slider1_3").html(g360.g_lang.slider1_3);
		
		$(".g_lang_slider2_1").html(g360.g_lang.slider2_1);
		$(".g_lang_slider2_2").html(g360.g_lang.slider2_2);
		$(".g_lang_slider2_3").html(g360.g_lang.slider2_3);
		
		$(".g_lang_slider3_1").html(g360.g_lang.slider3_1);
		$(".g_lang_slider3_2").html(g360.g_lang.slider3_2);
		$(".g_lang_slider3_3").html(g360.g_lang.slider3_3);
		
		$(".g_lang_slider4_1").html(g360.g_lang.slider4_1);
		$(".g_lang_slider4_2").html(g360.g_lang.slider4_2);
		$(".g_lang_slider4_3").html(g360.g_lang.slider4_3);
		
		$(".g_lang_slider5_1").html(g360.g_lang.slider5_1);
		$(".g_lang_slider5_2").html(g360.g_lang.slider5_2);
		$(".g_lang_slider5_3").html(g360.g_lang.slider5_3);
		
		$(".g_lang_slider6_1").html(g360.g_lang.slider6_1);
		$(".g_lang_slider6_2").html(g360.g_lang.slider6_2);
		$(".g_lang_slider6_3").html(g360.g_lang.slider6_3);
		
		$(".g_lang_slider7_1").html(g360.g_lang.slider7_1);
		$(".g_lang_slider7_2").html(g360.g_lang.slider7_2);
		$(".g_lang_slider7_3").html(g360.g_lang.slider7_3);
		
		$(".g_lang_slider8_1").html(g360.g_lang.slider8_1);
		$(".g_lang_slider8_2").html(g360.g_lang.slider8_2);
		$(".g_lang_slider8_3").html(g360.g_lang.slider8_3);
		
		$(".g_lang_slider9_1").html(g360.g_lang.slider9_1);
		$(".g_lang_slider9_2").html(g360.g_lang.slider9_2);
		$(".g_lang_slider9_3").html(g360.g_lang.slider9_3);
		
		$(".g_lang_slider10_1").html(g360.g_lang.slider10_1);
		$(".g_lang_slider10_2").html(g360.g_lang.slider10_2);
		$(".g_lang_slider10_3").html(g360.g_lang.slider10_3);
		
		// - main
		$(".g_lang_Main_Content1").html(g360.g_lang.Main_Content1);
		$(".g_lang_Main_Content2").html(g360.g_lang.Main_Content2);
		$(".g_lang_Main_Content3").html(g360.g_lang.Main_Content3);
		$(".g_lang_Main_Content4").html(g360.g_lang.Main_Content4);
		$(".g_lang_Main_Content5").html(g360.g_lang.Main_Content5);
		$(".g_lang_Main_Content6").html(g360.g_lang.Main_Content6);
		$(".g_lang_Main_Content7").html(g360.g_lang.Main_Content7);
		$(".g_lang_Main_Content8").html(g360.g_lang.Main_Content8);
		$(".g_lang_Main_Content9").attr("placeholder",g360.g_lang.Main_Content9);
		$(".g_lang_Main_Content10").html(g360.g_lang.Main_Content10);
		$(".g_lang_Main_Content11").html(g360.g_lang.Main_Content11);
		$(".g_lang_Main_Content12").html(g360.g_lang.Main_Content12);
		$(".g_lang_Main_Content13").html(g360.g_lang.Main_Content13);
		$(".g_lang_Main_Content14").html(g360.g_lang.Main_Content14);
		$(".g_lang_Main_Content15").html(g360.g_lang.Main_Content15);
		
		$(".g_lang_Main_Content16").html(g360.g_lang.Main_Content16);
		$(".g_lang_Main_Content17").html(g360.g_lang.Main_Content17);
		$(".g_lang_Main_Content18").html(g360.g_lang.Main_Content18);
		$(".g_lang_Main_Content19").html(g360.g_lang.Main_Content19);
		$(".g_lang_Main_Content20").html(g360.g_lang.Main_Content20);
		$(".g_lang_Main_Content21").html(g360.g_lang.Main_Content21);
		$(".g_lang_Main_Content22").html(g360.g_lang.Main_Content22);
		
		$(".g_lang_Gallery360").html(g360.g_lang.Gallery360);
		$(".g_lang_Service_Guide").html(g360.g_lang.Service_Guide);
		$(".g_lang_Start").html(g360.g_lang.Start);
		
	},
	
	_eventBind: function(){
		var _self = this;
		
		// 메인 배너 캐러셀 랜덤 기능 적용
		//var banner = $('#main_slider').find('.item');
		var banner = $('#main_slider').find('.item').not('.banner-renewal');
		var random_banner = g360.arrayShuffle(banner);
		
		// 배너를 가장앞에 표시함
		var banner_arr = [];
		banner_arr.push($('#main_slider').find('.banner-renewal'));
		random_banner.each(function(){
			banner_arr.push(this);
		});
		
		$.each(banner_arr, function(){
			$('#main_slider').append(this)
		});	
		
		$('#main_slider').owlCarousel({
			loop: true,
			items: 1,
			responsiveRefreshRate: 100,
			autoplay: true,
			autoplaySpeed: 1000,
			autoplayHoverPause: true
			
		});
		

		/**
		 *  메인 배너 버튼 이벤트 Start
		 */
		var $ms = $('#main_slider');
		
		// 대관 리뉴얼 배너
		// D-Book 소개
		$ms.find('.banner-renewal .banner-btn').on('click', function(){
			g360.showNewsDetail(150);
		});
		
		// 갤러리360 동영상 소개
		$ms.find('.sl-welcome .banner-btn').on('click', function(){
			if (g360.g_lang.Lang == 'ko') {
				var video_src = 'https://www.gallery360.co.kr/intro/gallery360_kr_web.mp4';				
			} else {
				var video_src = 'https://www.gallery360.co.kr/intro/gallery360_en_web.mp4';
			}
			g360.showVideo(video_src);
		});
		
		// 내 공간에 작품 걸어보기
		$ms.find('.sl-myplace .banner-btn').on('click', function(){
			ms.showSpace();
		});
		
		// D-Book 소개
		$ms.find('.sl-dbook .banner-btn').on('click', function(){
			if (g360.g_lang.Lang == 'ko') {
				g360.showNewsDetail(65);				
			} else {
				g360.showNewsDetail(148);
			}
		});
		
		// 작가모집
		$ms.find('.sl-artist .banner-btn').on('click', function(){
			if (g360.login_check()) {
				g360.gAlert("Info",g360.g_lang.Main_content_Alert_1, "blue", "top");
			} else {
				$("#addMember").click();
			}
		});
		
		// AI 페인터
		$ms.find('.sl-curie .banner-btn').on('click', function(){
			if (g360.login_check()) {
				g360.aiPainter_Start(true);
			} else {
				g360.login_window_max();
				$("#p_login").click();
			}			
		});
		
		// 대관 서비스
		$ms.find('.sl-rent .banner-btn').on('click', function(){
			$("#btn_gnb_rental").click();
		});

		// 더콘테스트
		$ms.find('.sl-thecontest .banner-btn').on('click', function(){
			window.open('http://thecontest.co.kr/contest/contest_view.php?cnst_id=7970');
		});
		
		// 대관 무료체험신청
		$ms.find('.sl-trial .banner-btn').on('click', function(){
			g360.rentalOnedayTrial();
		});
		
		// 이음피움 박물관
		$ms.find('.sl-iumpium .banner-btn').on('click', function(){
			window.open('https://www.vrgallery360.co.kr/ga360tour/exhi/iumpium/MjAyMDEy/');
		});
		
		// 더콘테스트 VR
		$ms.find('.sl-thecontest-final .banner-btn').on('click', function(){
			window.open('https://www.gallery360.co.kr/rental/group_list.jsp?key=ltHdwE4qYMn');
		});
		
		// 프리미엄 대관 테마 이벤트
		$ms.find('.sl-rent-anniversary .banner-btn').on('click', function(){
			window.open('https://www.gallery360.co.kr/index.jsp?ty=link_news&id=143');
		});
		
		// 모꼬지 더콘테스트
		$ms.find('.sl-thecon-open-2022 .banner-btn').on('click', function(){
			g360.showNewsDetail(147);
		});
		
		
		
		/*
		// 매거진 신청
		$('.ves-02 .btn', '#main_slider').on('click', function(){
			_self.requestNewsletter();
		});
		
		*/
		
		
		
		
		

		
		
		
		
		// 메인하단 이벤트 링크
		$('#btn_bottom_req_newsletter').on('click', function(){
			_self.requestNewsletter();
		});
		
		// 메인하단 링크
		$('#btn_bottom_req_kakao').on('click', function(){
			window.open('https://pf.kakao.com/_tAWTT/chat');
		});
		
		
		// 상세선택
		$('#main_art').on('click', function(e){
			// favorite 아이콘
			
			if ($(e.target).hasClass('mycol')) {
				var $favo = $(e.target);
				var img_id = $favo.data('artId');
				var _is_del = $(e.target).hasClass('added');
				
				g360.setMyCollection($favo.data('artId'), _is_del, function(data){
					if (data.result == 'OK') {
						$favo[_is_del ? 'removeClass' : 'addClass']('added');
					} else {
						g360.error_alert();
						console.log('Error', data);
					}
				});
			} 
			
			// 작품 선택
			if (e.target.tagName == 'IMG' && $(e.target).hasClass('detail-preview')) {
				var img_id = $(e.target).data('artId');
				g360.showArtDetail(img_id);
			}
		
			if (e.target.tagName == 'SPAN'){
				g360.showArtistDetail($(e.target).attr("data"));
				return false;
			}
		});
		
		// VR상세보기
		$('#main_vr_slider').on('click', function(e){
			if ($(e.target).hasClass('vr-thumb-wrapper') || $(e.target).closest('.vr-thumb-wrapper').length) {
				var $img = $(e.target).closest('.vr-thumb-wrapper').find('.vr-thumb');
				var img_id = $img.data('vrId');
				g360.showVRDetail(img_id);
			}
		});
		
		// 큐레이터 추천
		$('#main_curator_rec').on('click', function(e){
			var $target = $(e.target);
			if ($target.closest('.cate-wrap').length) $target = $target.closest('.cate-wrap');
			var id = $target.data('bun');
			if (!id) return false;
			g360.showRecommandDetail(id);
		});
		
		// 추천 테마 더보기
		$('#main_theme_more').on('click', function(e){
			gTopMain.navBtnAction('recommand');
			return false;
		});
		
		$("#main_service_guide_go").on("click", function(e){
			gTopMain.navBtnAction('service');
			return false;
		});
		
		$("#main_service_guide_go2").on("click", function(e){
			//모바일
			gTopMain.navBtnAction('service');
			return false;
		});
		
		// 내공간 꾸미기
		$('#main_deco_link').on('click', function(e){
			ms.showSpace();
		});
		
		// Parallex scroll
		var parallex = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});

		var paral_1 = new ScrollMagic.Scene({triggerElement: ".section03"})
			.setTween(".section03 .parallex", {y: "80%", ease: Linear.easeNone})
			.addTo(parallex);
		
		var paral_2 = new ScrollMagic.Scene({triggerElement: ".section05"})
			.setTween(".section05 .parallex", {y: "80%", ease: Linear.easeNone})
			.addTo(parallex);
		
		var paral_3 = new ScrollMagic.Scene({triggerElement: ".section07"})
			.setTween(".section07 .parallex", {y: "80%", ease: Linear.easeNone})
			.addTo(parallex);

	},
	/*
	 * 큐레이터 추천
	 */
	loadCuratorRec : function(){
		var _self = this;
		var _url = g360.root_path + '/load_all_recommand.mon?start=0&perpage=5&opt=1';
		$.ajax({
			url: _url,
			success: function(data){
				var $list = $('#main_curator_rec');
				$.each(data, function(idx, val){
					if (this.totalcount) return true;
					if (typeof(this.select_item) != "undefined"){
						if (this.select_item.length == 0) return true;
						var $el = $( 
							'<div class="cate-wrap item" data-bun="' + this.bun + '">' +
							'  <div class="cate-wrap-inner"></div>' +
							'  <div class="back-area">' +
							'    <h2>' + this.title + '</h2>' +
							'    <span><img src="/img/icon-dash.png" alt=""></span>' +
							'    <p class="tagList">' +
							'      <em>' + this.tag + '</em>' +
							'    </p>' +
							'  </div>' +
							'</div>'
						);
						var art = this.select_item[0];
						$el.find('.cate-wrap-inner').css('background-image', 'url("' + g360.preview_img_path(art.email, art.dockey) + '")');
						$list.append($el);
					}
					
				});

				$list.owlCarousel({
					nav: false,
					margin: 10,
					dotsEach: true,
					responsiveRefreshRate: 100,
					responsive: {
						0:{
							items:2
						},
						600:{
							items:3
						},
						770:{
							items:4
						},
						1200: {
							items:5
						}
					}
				});
			},
			error: function(){
				
			}
		});
	},
	
	/**
	 * 렌탈 사용자
	 */
	"loadRentalList" : function(){
		var _self = this;

		/*
		// 서버에서 리스트를 가져와서 뿌려야 함
		var vr_list = [
		{
			"category" 		: "개인전",
			"lending_name"	: "이 땅의 에너지 &lt;Energy of the Earth&gt;",
			"organizer_name": "오기리",
			"short_url"		: "https://www.gallery360.co.kr/v/F4pM5VWp",
			"image"			: "/img/rental_landing/vr_slide/vr_slide_1.jpg"		
		},
		{
			"category" 		: "사진전",
			"lending_name"	: "부산진구꿈드림 동아리 사진전",
			"organizer_name": "부산진구 청소년지원센터",
			"short_url"		: "https://www.gallery360.co.kr/v/zzZFBjG2",
			"image"			: "/img/rental_landing/vr_slide/vr_slide_9.jpg"
		},
		{
			"category" 		: "디자인",
			"lending_name"	: "'제주를 담다, 디자인을 입다' 디자인 전시",
			"organizer_name": "제주특별자치도경제통상진흥원",
			"short_url"		: "https://www.gallery360.co.kr/v/4MrzTj6v",
			"image"			: "/img/rental_landing/vr_slide/vr_slide_11.jpg"

		},
		{
			"category" 		: "단체전",
			"lending_name"	: "'아티컨티뉴' 제휴작가 그룹전",
			"organizer_name": "갤러리 아트컨티뉴",
			"short_url"		: "https://www.gallery360.co.kr/v/GqPvxgGy",
			"image"			: "/img/rental_landing/vr_slide/vr_slide_10.jpg"
		},
		{
			"category" 		: "대학졸업전",
			"lending_name"	: "2020 RC 창보고:보고1",
			"organizer_name": "연세대학교 RC교육원",
			"short_url"		: "https://www.gallery360.co.kr/v/7bUHduUl",
			"image"			: "/img/rental_landing/vr_slide/vr_slide_5.jpg"
		},
		{
			"category" 		: "반려동물전시",
			"lending_name"	: "반려동물전",
			"organizer_name": "사진찍는 집사",
			"short_url"		: "https://www.gallery360.co.kr/v/s7Fs5uU0",
			"image"			: "/img/rental_landing/vr_slide/vr_slide_6.jpg"
		},
		{
			"category" 		: "캠페인",
			"lending_name"	: "'자원봉사 다짐' 캠페인 전시",
			"organizer_name": "부산광역시사회복지협의회",
			"short_url"		: "https://www.gallery360.co.kr/v/v74CkPjI",
			"image"			: "/img/rental_landing/vr_slide/vr_slide_12.jpg"
		}
		];
		/*/
		
		$.ajax({
			url: '/loadAll_lending.mon',
			success: function(res){
				var vr_list = res.lending;
				
				// VR 전시관 네비 및 슬라이드 만들기
				var $nav = $('#main_rental_slider_nav');
				var $slide = $('#main_rental_slider');
				$.each(vr_list, function(idx){
					var _category = '';
					var _lending_name = '';
					var _organizer_name = '';
					
					if (g360.g_lang.Lang == 'ko') {
						_category = this.category;
						_lending_name = this.lending_name;
						_organizer_name = this.organizer_name;
					} else {
						_category = this.category_en || this.category;
						_lending_name = this.lending_name_en || this.lending_name;
						_organizer_name = this.organizer_name_en || this.organizer_name;
					}
					
					
					var $nav_item = $('<li data-slide-idx="' + idx + '">#' + _category + '</li>');
					$nav.append($nav_item);

					var img_url = '/artimage/lending/' + this.image;
					var _html = 
						'<div class="item" data-slide="' + idx + '">' +
						'	<div class="imgbox" style="background-image:url(\'' + img_url + '\')">' +
						'		<div class="imgghost"></div>'+
						'	</div>'+
						'	<div class="slide-text-wrap">'+
						'		<span>' + _lending_name + ' / ' + _organizer_name + '</span>'+
						'	</div>'+
						'</div>';
					var $slide_item = $(_html);			
					$slide.append($slide_item);
				});
				$nav.find('li:eq(0)').addClass('on');
				
				
				$slide.owlCarousel({
					center: true,
				    items:1,
				    loop:true,
				    margin:50,
				    responsive:{
				        1200:{
				        	items:2,
				            margin:150
				        },
				        768:{
				        	items:2,
				        	margin:100
				        }
				    },
				    onDragged: function(e){
				    	_self.time_func = setTimeout(function(){
				    		var idx = $slide.find('.center .item').data('slide');
				    		$nav.find('li').removeClass('on');
				    		$nav.find('li:eq(' + idx + ')').addClass('on');
				    	}, 100);
				    }
				});
				
				
				// nav 이벤트
				$nav.find('li').on('click', function(){
					var $this = $(this);
					if ( $this.hasClass('on') ) return;
					
					
					clearTimeout(_self.time_func);
					
					$nav.find('li').removeClass('on');
					$this.addClass('on');
					var idx = $this.data('slide-idx');
					$slide.trigger('to.owl.carousel', [idx, 500]);
				});
				
				// URL 연결
				$slide.find('.item').on('click', function(e){
					if (!$(this).parent().hasClass('center')) return;
					
					var idx = $(this).data('slide');
					window.open(vr_list[idx].short_url);
				});
			}
			
		});
		
		
	},
	"loadSNS" : function(){
		var url = g360.root_path + "/load_sns_list.mon?start=0&perpage=10&" + new Date().getTime();
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
			
				var hx = "";
				var hx_mobile = "";
				
				for (var i = 1 ; i < data.length; i++){
					var spl = data[i];
					//var json = JSON.parse(spl.info);
					
					var url = "/artimage/SNS/" + spl.path;
					
					hx += "<div>";
					hx += "<div class='listing-wrap'>";
					hx += "		<div class='info-wrap'>";
					hx += "			<span class='pic'>";
					hx += "		         <img src='' alt=''>";
					hx += "         </span>";
					hx += "         <h3 onclick=\"gMainContent.open_url('"+spl.author_url+"')\">"+spl.author_name+"</h3>";
					hx += "         <p>#갤러리360</p>";
					hx += "	    </div>";
					hx += "     <div class='big-pic' onclick=\"gMainContent.open_url('"+spl.url+"')\">";
					hx += "			<img src='"+url+"' alt=''>";
					hx += "     </div>";
					hx += "     <p>";
			
					var title = spl.title;
					if (title.length > 100){
						title = title.substring(0,100);
					}
					hx += "        " + title;
					hx += "     </p>";
					hx += "</div>";
					hx += "</div>";
				
					if (i < 10){
						hx_mobile += "<div class='col-4'>";
						
						
						hx_mobile += "	<div class='pic sns-pic' onclick=\"gMainContent.open_url('"+spl.url+"')\" style=\"background-image:url('" + url + "')\">";
					//	if (json.thumbnail_height > 500){
					//	}else{
						//		hx_mobile += "		<img style='max-height:150px' src='"+json.thumbnail_url+"' alt=''>";
					//		hx_mobile += "		<img style='display:inline-block; width:100%; height:120px' src='"+spl.thumbnail_url+"' alt=''>";
					//	}
						
						hx_mobile += "  </div>";
						hx_mobile += "</div>";
					}

					
				}
						
				$("#sns_slide").html(hx);
				
				$("#sns_mobile").html(hx_mobile);
				
				
				$('#sns_slide').slick({
					  dots: false,
					  infinite: true,
					  speed: 1000,
					  slidesToShow: 1,
					  centerMode: true,
					  variableWidth: true
					});
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	"loadSNS2" : function(){
		var url = "https://graph.instagram.com/17841410131317149/media?fields=id,media_type,media_url,permalink,thumbnail_url,username,caption&access_token=IGQVJXRk5OZAXNYQmxFZAVctdTBuQkpjWlJIaTFfelNlanNua3V5elJfdEppVkdDX1EwcXBzcmpDLVpRWGV3Qms2aU44NlpmTFRTWlpRQnhkb0t4R1UzSTdYZAWRHRXQwVWwxdmlVT1ZA3";
		
		$.ajax({
			
			type:"GET",
			dataType:"json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				
				var contents = data.data;
				//console.log(contents);
				
				var hx = "";
				var hx_mobile = "";
				
				for (var i = 0 ; i < contents.length; i++){
					var spl = contents[i];
					
					
					hx += "<div>";
					hx += "<div class='listing-wrap'>";
					hx += "		<div class='info-wrap'>";
					hx += "			<span class='pic'>";
					hx += "		         <img src='' alt=''>";
					hx += "         </span>";
					hx += "         <h3 onclick=\"gMainContent.open_url('https://www.instagram.com/gallery360.inc/')\">gallery360.inc</h3>";
					hx += "         <p>#갤러리360</p>";
					hx += "	    </div>";
					hx += "     <div class='big-pic' onclick=\"gMainContent.open_url('"+spl.permalink+"')\">";
					hx += "			<img src='"+spl.media_url+"' alt=''>";
					hx += "     </div>";
					hx += "     <p>";
			
					hx += "        " + spl.caption;
					hx += "     </p>";
					hx += "</div>";
					hx += "</div>";
				
					if (i < 9){
						hx_mobile += "<div class='col-4'>";
						
						
						hx_mobile += "	<div class='pic sns-pic' onclick=\"gMainContent.open_url('"+spl.permalink+"')\" style=\"background-image:url('" + spl.media_url + "')\">";
					//	if (json.thumbnail_height > 500){
					//	}else{
						//		hx_mobile += "		<img style='max-height:150px' src='"+json.thumbnail_url+"' alt=''>";
					//		hx_mobile += "		<img style='display:inline-block; width:100%; height:120px' src='"+spl.thumbnail_url+"' alt=''>";
					//	}
						
						hx_mobile += "  </div>";
						hx_mobile += "</div>";
					}
					
					
				}	
				
				
				$("#sns_slide2").html(hx);
				
				$("#sns_mobile2").html(hx_mobile);
				
				$('#sns_slide2').slick({
					  dots: false,
					  infinite: true,
					  speed: 1000,
					  slidesToShow: 1,
					  centerMode: true,
					  variableWidth: true,
					  initialSlide: 1 //처음 보여지는 슬라이드 번호
					});
				
			},
			error : function(e){
				g360.error_alert();
			}

		})
		
	},
	
	
	"open_url" : function(url){
		window.open(url, null);
	},
	
	
	"partners_count" : function(){
		
		var url = g360.root_path + "/load_all_partners_count.mon";
		url += "?" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				$("#partners_count_dis").text(g360.comma(data.count));
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	loadVrOfMonth : function(){
		var _self = this;
	
		var _url = g360.root_path + '/load_all_vr_public.mon?start=0&perpage=12';
		var $list = $('#main_vr_slider');
		$.ajax({
			url: _url,
			success: function(data){
				$.each(data, function(){
					if (this.totalcount != undefined) return true;
					_self._appendVrEl($list, this);
				});
				
				if (data[0].totalcount == 0) {
					$('#vrgallery_wrapper').hide();
					//$list.before('<div style="text-align:center;">추천된 VR갤러리가 없습니다</div>');
					return;
				}
				// 리스트 캐러셀
				$list.owlCarousel({
					loop: true,
					margin: 20,
					autoplay: true,
					autoplaySpeed: 1000,
					autoplayHoverPause: true,
					dotsEach: true,
					responsiveRefreshRate: 100,
					responsive: {
						0:{
							items:1,
							center: true,
							nav: false
						},
						770:{
							items:2,
							nav: false
						},
						1380: {
							items:2,
							nav: true
						}
					}
				});
			},
			error: function(){
				g360.error_alert();
			}
		});
	},
	_appendVrEl: function($list, data){
		
		var vr_img_src = g360.vr_img_path_new(data.dockey);
		var _html = '' 
		+ '<div class="item">'
        + '  <div class="row">'
        + '    <div class="col-md-12">'
        + '      <div class="rec-pic-area">'
        
        + '        <div class="vr-thumb-wrapper">'
        + '          <img class="vr-thumb" src="'+vr_img_src+'" data-vr-id="'+data.dockey+'" data-tmpl="'+data.templatecode+'">'
        + '          <div class="info-main-area">'
        + '            <h2>'+data.title+'</h2>'
        + '            <p>'+data.nickname+'</p>'
        + '            <div class="port-bottom">'
        + '              <span class="count">'
        + '                <img src="../img/icon-vr-view-count-w.png" class="icon_vr_view-count"> '+g360.numberComma(data.read)
        + '              </span>'
        + '              <span class="count">'
        + '                <img src="../img/icon-vr-my-collection.png" class="icon_vr_my-collection"> <span class="like-count">'+g360.numberComma(data.like) + '</span>'
        + '              </span>'
        + '            </div>'
        + '          </div>'
        + '        </div>'
        
        + '      </div>'
        + '    </div>'
        + '  </div>'
        + '</div>'
        
        $list.append(_html);
	},
	loadArtOfMonth : function(){
		var _self = this;
		//메인이미지 가져오기 테스트 URL
		var _url = g360.root_path + "/monthly_image_list.mon";
		
		//var _url = g360.root_path + "/load_all_art_public.mon?start=0&perpage=10";
		
		var $grid = $('#main_art');
		
		$.ajax({
			type : "POST",
			url: _url,
			dataType : "json",
			success: function(data) {
				if (data.length == 0) return;
				
				var random_idx = _self.randomRange(1, data.length-1);
				
				// 리스트중 랜덤으로 좌측에 1개를 뿌린다
				$.each(data, function(idx, val){
					if (this.totalcount) return true;
					
					if (idx != random_idx) {
						_self._appendPictureEl($grid, this);
					} else {
						// 좌측 메인
						var _thumb = g360.preview_img_path(this.email, this.art_img_filename);
						_thumb = _thumb + "?open&ver=" + this.version;
						$('#main_art_left_img').css('background-image', 'url("' + _thumb + '")');					
						$('#main_art_left_title').html(g360.TextToHtml(this.art_title));
						$('#main_art_left_artist_name').html(g360.TextToHtml(this.art_artist));
						$('#main_art_left_artist_name').attr("data", this.email).css("cursor", "pointer");
						$('#main_art_left_artist_name').on("click", function(){														
							g360.showArtistDetail($(this).attr("data"));
							return false;
						});
						//$('#main_art_left_express').html(g360.TextToHtml(this.art_curator_express ? this.art_curator_express : this.art_express));
						$('#main_art_left_more, #main_art_left_img').on('click', function(){
							g360.showArtDetail(val.art_img_filename);
						});
						
					}
				});
				
			},
			error: function(){
				
			}
		}).then(function(){
			// 이미지 로딩이 완료되면 화면에 표시
			$grid.imagesLoaded(function(){
				$grid.masonry();
			});
		});
	},
	_appendPictureEl:function($wrapper, data_info){
		if (data_info.totalcount != undefined) return;
		var _url = g360.art_img_path(data_info.email, data_info.art_img_filename);
		var _thumb = g360.preview_img_path(data_info.email, data_info.art_img_filename);
		
		var $div = $('<div class="grid-item col-xl-6 col-lg-4 col-md-4 col-sm-4 col-6 p-mo-10"></div>');
		var $fig = $('<figure></figure>');
		var $img = $('<img class="detail-preview" draggable="false">')
				.attr('src', _thumb)
				.data('artId', data_info.art_img_filename)
				.data('url', _url)
				.data('width', parseInt(data_info.art_width) * 10)
				.data('height', parseInt(data_info.art_height) * 10)
				.data('ho', data_info.art_hosu)
				.data('artist', data_info.email);
		
		var $figcap = $('<figcaption></figcaption>');
		if (data_info.status == '3') {	// 판매완료 마킹 위치 변경
			$figcap.append('<div class="soldout-marking" title="원화 판매완료"></div>');
		}
		$figcap.append('<div class="mycol' + (data_info.myfavorite == 'T' ? ' added' : '') + '" data-art-id="' + data_info.art_img_filename + '"></div>')
				.append('<h2>' + data_info.art_title + '</h2>')
				.append('<p><span data='+data_info.email+' style="cursor:pointer">' + data_info.art_artist + '</span></p>')
				.append('<p class="text-muted">' + data_info.art_height + ' x ' + data_info.art_width + 'cm ' + (data_info.art_hosu != null ? '(' + data_info.art_hosu + '호)' : "" ) + '</p>');
		
		var $cost = "";
		if (typeof(data_info.opt != "undefined") && data_info.opt == "none"){
			$cost = $('<div class="cost-area"></div>')
			.append('<h2>'+g360.g_lang.Ask_Price+'</h2>');
		}else{
			var art_price = '';
			if (!data_info.art_ck1 && data_info.art_ck2) {
				// 이미지 구매만 있는 경우 이미지 가격으로 표시
				art_price = parseInt(data_info.art_price) * g360.image_sales_rate;
				art_price = g360.numberComma(art_price);
			} else {
				art_price = g360.numberComma(data_info.art_price);
			}
			$cost = $('<div class="cost-area"></div>')
			.append('<h2>₩ ' + art_price + '</h2>');
		}
		 
		
		// 아이콘 표시
		var $icon = $('<div class="icon-area"></div>');
		if (data_info.status == '3') {	// 판매완료
			//$fig.append('<div class="soldout-marking" title="원화 판매완료"></div>');
		} else {
			if (data_info.art_ck1) {
				$icon.append('<span><img src="../img/icon-artwork-original.svg" class="icon_artwork_original" title="원화구매 가능"></span>');
			}
		}
		if (data_info.art_ck2) {
			$icon.append('<span><img src="../img/icon-artwork-image.svg" class="icon_artwork_image" title="이미지구매 가능"></span>');					
		}
		if (data_info.vrinfo) {
			$icon.append('<span><img src="../img/icon-artwork-vr.svg" class="icon_artwork_vr" title="VR감상 가능"></span>');
		}
		$cost.append($icon);
				
		$fig.append($img).append($figcap).append($cost).appendTo($div);
		
		//$wrapper.append($div).masonry('appended', $div);
		$wrapper.append($div);
	},
	randomRange: function(n1, n2) {	//n1 하한값, n2 상한값
		return Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
	},
	loadArtistOfMonth: function(){
		var _self = this;
		var _url = g360.root_path + "/load_monthly_artist_public.mon";
		var $artist = $('#main_artist');
		
		$.ajax({
			url: _url,
			dataType: 'json',
			success: function(data){
				var _html = '';
				
				$.each(data, function(idx, val){
					var _img_src = g360.user_photo_gray_url(this.email);
					
					// 버전 정보 추가
					 _img_src += (this.photo_list_version ? '?open&ver=' + this.photo_list_version : '');
					 
					var $wrp = $('<div class="artist-pic-wrapper"/>');
					var $pic = $('<div class="artist-pic"/>').css('background-image', 'url("' + _img_src + '")');
					
					var $btn = $('<a class="btn btn-cst none btn-outline-light p-lg-2 pr-lg-5 pl-lg-5 pl-4 pr-4 p-2">'+g360.g_lang.Meet_Artist+'</a>');
					var $m_btn = $('<a class="btn btn-cst btn-outline-light m_btn_artist">'+g360.g_lang.Meet_Artist+'</a>');
					$btn.on('click', function(){
						g360.showArtistDetail(val.email);
					});
					$m_btn.on('click', function(){
						g360.showArtistDetail(val.email);
					});
					
					var $info = $('<div class="info-area">')
									.append('<h1>' + (this.summary ? escapeHTML(this.summary) : '') + '</h1>')
									.append('<p>' + this.nickname + (this.name_eng ? ' | ' + this.name_eng : '') + '</p>')
									.append($btn)
									.append($m_btn);
					
					$wrp.append($pic);
					
					var $box = $('<div class="art-box"/>');
					$box.append($wrp).append($info);					
					$artist.append($box);
				});
				
				$artist.slick({
					dots: true,
					infinite: true,
					speed: 1000,
					slidesToShow: 1,
					centerMode: true,
					variableWidth: true
				});
			}
		});
	},
	"requestNewsletter":function(){
		if (g360.login_check()) {
			var url = g360.root_path + "/news_letter_ok.mon";
			url += "?" + new Date().getTime();
			$.ajax({
				type : "GET",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(data){
					if (data.result == "OK"){
						g360.gAlert("Info",g360.g_lang.Main_content_Alert_2, "blue", "top");
					}
				},
				error : function(e){
					g360.error_alert();
				}
			});
		} else {
			g360.login_window_max();
			$("#p_login").click();
		}
	}
}

