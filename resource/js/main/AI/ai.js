

function gAIService(){
	this.selected_item = null;
	this.page_info = {
		type : 3, //1:최신순, 2:닉네임순, 3:랜덤정렬
		vr : {
			start : 0,
			perpage :12,
			complete : false
		}
	}
}

gAIService.prototype = {		

	init: function(){
		this._eventBind();
		this.setCarousel();
		this.loadRecommandList();
		this.loadRecommandList2();
		this.infiniteScroll();
		this.loadVRList();
		
		this.g_lang();
	},
	
	"g_lang" : function(){
		
		$(".g_lang_AI_1").html(g360.g_lang.AI_1);
		$(".g_lang_AI_2").html(g360.g_lang.AI_2);
		$(".g_lang_AI_3").html(g360.g_lang.AI_3);
		$(".g_lang_AI_4").html(g360.g_lang.AI_4);
		$(".g_lang_AI_5").html(g360.g_lang.AI_5);
		
		$(".g_lang_Random").html(g360.g_lang.Random);
		$(".g_lang_Latest").html(g360.g_lang.Latest);
		
	},
	
	_eventBind: function(){
		var _self = this;
		
		$("#btn_ai_write").on("click", function(){
			if (g360.login_check()){
				gAI.load_Curie_home();
			}else{
				g360.login_window_max();
				$("#p_login").click();
			}
			
			return false;
		});
		
		$("#btn_ai_write2").on("click", function(){
			if (g360.login_check()){
				ms.showSpace_ai_tab();
			}else{
				g360.login_window_max();
				$("#p_login").click();
			}
			
			return false;
		});
		
		
//		// 추천 보기
//		$('#vr_list_slider').on('click', function(e){
//			
//			if ($(e.target).hasClass('vr-thumb-wrapper') || $(e.target).closest('.vr-thumb-wrapper').length) {
//				var $img = $(e.target).closest('.vr-thumb-wrapper').find('.vr-thumb');
//			//	var img_id = $img.data('vrId');
//				var short_url = $img.attr("data-short-url");
//			//	g360.showVRDetail(img_id);
//				var url = g360.root_path + "/v/" + short_url;
//				window.open(url, null);
//			}
//		});
//		
//		// 목록에서 이미지 보기
//		$("#vr_body").on("click", '.pic', function(e){
//			
//			var short_url = $(e.target).attr("data-short-url");
//			var url = g360.root_path + "/v/" + short_url;
//			window.open(url, null);
//			
////			var img_id = $(e.target).data('vrId');
////			g360.showVRDetail(img_id);
//		});
		
		// 정렬
		$('#menu_vr_sort a').on('click', function(e){
			if ($(this).hasClass('selected')) return false;
			$('#menu_vr_sort a').removeClass('selected');
			$(this).addClass('selected');
			$('#btn_vr_sort').text($(this).text());
			$('#vr_list_wrapper').empty();
			_self.page_info.type = $(this).attr("data-order");
			
			_self.loadVRList();
			e.preventDefault();
		});
		
	},
	
	// VR 추천 리스트 가져오기
	loadRecommandList: function(){
		var _self = this;
		//var _url = g360.root_path + '/load_VRRoom_public.mon?start=0&perpage=10&ty=choice';
		var _url = g360.root_path + '/load_all_ai_public.mon?start=0&perpage=10';
		$.ajax({
			url: _url,
			success: function(data){
				_self.showRecommandList(data);
			},
			error: function(){
				g360.error_alert();
			}
		});
	},
	showRecommandList: function(data){
		var $list = $('#vr_list_slider');
		
		
		$.each(data, function(){
			if (this.totalcount != undefined) return true;
		//	var vr_img_src = g360.vr_img_path_new(this.dockey);
			
			var img_src = "";
		

						
//			date: "2019-03-31T12:53:38+09:00"
//				dockey: "ygkim@nh.com_20190331125338"
//				email: "ygkim@nh.com"
//				open_homepage: "T"
//				request_is_send_mail: false
//				request_select_img: "43"
//				request_send_mail: "ygkim@nh.com"
//				request_status: "2"
//				request_upload_img: "ygkim@nh.com_1729cb9004061ab3b8728fc87549820e.175983"
//				sortdate: "20190331125338"
//				suggest: "T"
			
			///artimage/dosa777@gmail.com/artRequest_AI/result/dosa777@gmail.com_20200804110414_out_water_small.png
			
			img_src = "/artimage/" + this.email + "/artRequest_AI/result/" + this.dockey + "_out_water_small.png";
			
			var email = this.email;
			var sfilename = this.dockey;
			var resultpath_water_full = g360.domain + "/artimage/" + email + "/artRequest_AI/result/" + sfilename + "_out_water.png";
			
			var source_path = g360.domain + "/artimage/" + email + "/artRequest_AI/expand/" + this.request_upload_img + "_small.jpg";
			var t_path = g360.domain + "/artimage/ai_sample/" + this.request_select_img + "_small.jpg";
			///artimage/ygkim@nh.com/artRequest_AI/result/ygkim@nh.com_20190331125727_out_water.png
			///background-image:url('/artimage/dosa777@gmail.com/artRequest_AI/expand/dosa777@gmail.com_0cfd03a199912afeddb41c52e5f16a38.3152953_small.jpg')
			
			//background-image:url('/artimage/ai_sample/73_small.jpg')
			
			var _html = '' 
			+ '<div class="item">'
            + '  <div class="row">'
            + '    <div class="col-md-12">'
            + '      <div class="rec-pic-area">'
            
            
            
            + '      <div id="ai_source" style="background-image:url('+source_path+')"></div>'
            + '      <div id="ai_target" style="background-image:url('+t_path+')"></div>'
            
            + "        <div class='vr-thumb-wrapper' style=\"background-size:cover ; background-repeat:no-repeat; background-image: url('"+img_src+"')\" onclick=\"g360.preview_img_direct3('Y', '"+resultpath_water_full+"', '"+email+"', '"+sfilename+"', '"+this.request_upload_img+"', '"+this.request_select_img+"')\">"
//	        + '          <img class="vr-thumb" src="'+img_src+'" data-vr-id="'+this.dockey+'" style="height:382px">'
	        + '          <div class="info-main-area">'
//	        + '            <h2>'+g360.textToHtml(this.title)+'</h2>'
//	        + '            <p>'+g360.textToHtml(this.host)+'</p>'
//	        + '            <div class="port-bottom">'
//	        + '              <span class="count">'
//	        + '                <img src="../img/icon-vr-view-count-w.png" class="icon_vr_view-count"> '+g360.numberComma(this.read)
//	        + '              </span>'
//	        + '              <span class="count">'
//	        + '                <img src="../img/icon-vr-my-collection.png" class="icon_vr_my-collection"> <span class="like-count">'+g360.numberComma(this.like) + '</span>'
//	        + '              </span>'
//	        + '            </div>'
	        + '          </div>'
	        + '        </div>'
	        
	        + '      </div>'
	        + '    </div>'
	        + '  </div>'
            + '</div>'
            
            $list.append(_html);
		});
		
		// 리스트 캐러셀
		$list.owlCarousel({
			loop: true,
			margin: 20,
			autoplay: true,
			autoplaySpeed: 1000,
			autoplayHoverPause: true,
			dotsEach: true,
			slideBy: 2,
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
	
	
	
	
	// VR 추천 리스트 가져오기
	loadRecommandList2: function(){
		var _self = this;
		//var _url = g360.root_path + '/load_VRRoom_public.mon?start=0&perpage=10&ty=choice';
		var _url = g360.root_path + '/load_all_ai_public_product.mon?start=0&perpage=10';
		$.ajax({
			url: _url,
			success: function(data){
				_self.showRecommandList2(data);
			},
			error: function(){
				g360.error_alert();
			}
		});
	},
	showRecommandList2: function(data){
		var $list = $('#vr_list_slider2');
		
		
		$.each(data, function(){
			if (this.totalcount != undefined) return true;
		//	var vr_img_src = g360.vr_img_path_new(this.dockey);
			
			var img_src = "";			
			img_src = "/main/AI/img/"+this.filename;;
			
//			var email = this.email;
//			var sfilename = this.dockey;
//			var resultpath_water_full = g360.domain + "/artimage/" + email + "/artRequest_AI/result/" + sfilename + "_out_water.png";
//			
//			var source_path = g360.domain + "/artimage/" + email + "/artRequest_AI/expand/" + this.request_upload_img + "_small.jpg";
//			var t_path = g360.domain + "/artimage/ai_sample/" + this.request_select_img + "_small.jpg";
//			
			var _html = '' 
			+ '<div class="item">'
            + '  <div class="row">'
            + '    <div class="col-md-12">'
            + '      <div class="rec-pic-area">'    
            
            + "        <div class='vr-thumb-wrapper' style=\"background-size:cover ; cursor:default; background-repeat:no-repeat; background-image: url('"+img_src+"')\" >"
	        + '          <div class="info-main-area">'
	        + '          </div>'
	        + '        </div>'
	        
	        + '      </div>'
	        + '    </div>'
	        + '  </div>'
            + '</div>'
            
            $list.append(_html);
		});
		
		// 리스트 캐러셀
		$list.owlCarousel({
			loop: true,
			margin: 20,
			autoplay: true,
			autoplaySpeed: 1000,
			autoplayHoverPause: true,
			dotsEach: true,
			slideBy: 1,
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	setCarousel : function() {
		var vr_data = [
			/*
			{
				id: 'xnejfdl02@hanmail.net_20190522130201_XXUEJ8W',
				title: '보는것과 보이는 것 - 오흥배 작가',
				img_path: '/img/vrgallery/sample_3.png',
				location: '아트벙커B39-H 전시장',
				subject: '오흥배 (Oh Heung bae) 개인전',
				comm: '21세기의 바니타스'
			},
			{
				id: 'namanuki@naver.com_20190524103847_G5EBDWV',
				title: 'Triangle, Square, Circle, Rectangle - (窓)',
				img_path: '/img/vrgallery/sample_1.png',
				location: 'Gallery360-C 전시장',
				subject: '남현욱 (Nam Hyun Wook) 개인전',
				comm: 'Triangle, Square, Circle, Rectangle'
			},
			{
				id: 'gallery360@gallery360.co.kr_20190522112459_ROY5YOJ',
				title: '백두산 아리랑',
				img_path: '/img/vrgallery/sample_6.jpg',
				location: 'Ponetive Space',
				subject: '박기수 화백 백두산 아리랑',
				comm: '산의 정기를 옮겨 놓은 듯한 마티에르의 향연'
			},
			{
				id: 'baiknong@hanmail.net_20190524110956_ZAUQKDW',
				title: '자 ∙ 모음 Series _문자예술의 시작',
				img_path: '/img/vrgallery/sample_4.png',
				location: 'Gallery360-B 전시장',
				subject: '한태상 (韓泰相) 개인전',
				comm: '자 ∙ 모음 Series / 해체된 한글 : 문자예술의 시작'
			}
			{
				id: 'aei97235@naver.com_20200113161558_KV2YT3E',
				img_path: '/img/vrgallery/sample_7.jpg',
				location: 'Gallery360_ J 전시장',
				subject: '우미란(Woo, Miran) 개인전',
				title: '해체와 조합',
				comm: '해체와 조합'
			},
			{
				id: 'tootgus1@gmail.com_20191015152257_8CWBCRW',
				img_path: '/img/vrgallery/sample_11.jpg',
				location: '아트벙커 B39_ A 전시장',				
				subject: '정현태(Jung Hyuntae) 개인전',
				title: 'Balance : 균형',
				comm: 'Balance : 균형'
			},
			{
				id: 'gallery360@gallery360.co.kr_20190805131115_QPMUP3W',
				img_path: '/img/vrgallery/sample_8.jpg',
				location: 'Gallery360_ H 전시장',				
				subject: '전유탁(Jeon yutak) 개인전',
				title: 'ALLOGDALLOG : 포름(fome)과 인식(認識)',
				comm: 'ALLOGDALLOG : 포름(fome)과 인식(認識)'
			},									
			
			{
				id: 'gallery360@gallery360.co.kr_20191120151555_87NHWA4',
				img_path: '/img/vrgallery/sample_12.jpg',
				location: 'Gallery The Chai',
				subject: '이선화(Lee, sunhwa) 개인전',
				title: 'Spiritual harmony \'생명순환\'',
				comm: 'Spiritual harmony \'생명순환\''
			},
			{
				id: 'gallery360@gallery360.co.kr_20191126214717_XKLZSCO',
				img_path: '/img/vrgallery/sample_13.jpg',
				location: 'Gallery360 - K 전시장',
				subject: '김영미(KIM Young - Mi) 개인전',
				title: '부조리한 인간들_ \'우화(寓話)\' 시리즈',
				comm: '부조리한 인간들_ \'우화(寓話)\' 시리즈'
			},		
			{
				id: 'seukyuoh@gmail.com_20200309144204_JDAVUOG',
				img_path: '/img/vrgallery/sample_14.jpg',
				location: 'Gallery360 - A 전시장',
				subject: '오승경(Seungkyung Oh) 개인전',
				title: '환상과 도피의 유토피아',
				comm: '환상과 도피의 유토피아'
			},	
			{
				id: 'mun321m@naver.com_20191118113105_CZUE42C',
				img_path: '/img/vrgallery/sample_9.jpg',
				location: 'Home_ A 전시장',				
				subject: '이문자(Lee munja) 개인전',
				title: '봄의 소리',
				comm: '봄의 소리'
			},
			*/
			{
				id: 'gallery360@gallery360.co.kr_20191205095123_H2JHELW',
				img_path: '/img/vrgallery/sample_10.jpg',
				location: 'Belarus minsk A&V Gallery',				
				subject: '이희춘 (Lee Hie Chun) 개인전',
				title: '몽유화원(夢遊花園) : 신의 정원',
				comm: '몽유화원(夢遊花園) : 신의 정원'
			}
		];
		
		vr_data = g360.arrayShuffle(vr_data);
		
		var _html = '';
		
		
	//	_html += "<div class='item'>";
		_html += "<div id='rental_main_layer'>";
		_html += "	<div id='rental_main_sub1'>";
		_html += "		<p id='rental_main_p1'>Gallery360 AI Curie</p>";
		_html += "		<p id='rental_main_p2'>";
		_html += "			<strong id='rental_main_p3'>Lead your life ";
		_html += "			<br class='m_none'>to Art</strong>";
		//_html += "			<br class='m_none'>a VR Exhibition</strong>";
		_html += "		</p>";		
//		_html += "     <a id='goservice' class='btn btn-cst btn-outline-light p-2 pr-4 pl-4 mt-5'>대관 서비스 보기</a>";
		
		_html += "	</div>";
		_html += "	<div id='block2' class='rental-video-wrapper' style='width: 100%; height: 800px;'>" +
				//" <img src='/main/rental/video/3.jpg'  alt=''  data-bgposition='center center' data-bgfit='cover' data-bgrepeat='no-repeat' data-bgparallax='off' class='rev-slidebg' data-no-retina>" +
				"	</div>";
		_html += "</div>";
	//	_html += "</div>";
		
		
//		$.each(vr_data, function(){
//			_html += 
//			'<div class="item" >' +
//	    	'  <div class="vr-v-01" style="height:700px; background-image:url(' + this.img_path + ');" data-id="' + this.id + '" data-title="' + this.title + '">' +
//    		'    <div class="slide-txt-wrap text-center">' +
//		    '      <h1>' + this.location + '</h1>' +
//		    '      <h2>' + this.subject + '</h2>' +
//		    '      <p>‘' + this.comm + '’</p>' +
//		    '      <a class="btn btn-cst btn-outline-light p-2 pr-4 pl-4 mt-5">VR 전시 감상하기</a>' +
//		    '    </div>' +
//		    '  </div>' +
//		    '</div>';
//		});
		
		
				
			
		
		
		
		$('#vr_slider2').html(_html);
		
	//	$("#block2").css("background-image", "none");
		
		$('#block2').vide({
			'mp4': '/main/AI/video/3',
			'poster': '/main/AI/video/3',
	    });
		
		
		$("#goservice").on("click", function(){
			var url = "https://www.gallery360.co.kr/v/8YRE7isG";
			
			window.open(url, null);
		});
		
		
//		// Main 캐러셀
//		$('#vr_slider').owlCarousel({
//			loop: false,
//			items: 1,
//			responsiveRefreshRate: 100,
//		//	autoplay: true,
//		//	autoplayTimeout : 14000,
//			//autoplaySpeed: 1000,
//			autoplayHoverPause: true
//		});
		
		$('#vr_slider .vr-v-01').on('click', function(e){			
			if (e.target.tagName == 'H2' || e.target.tagName == 'A') {
				var vr_id = $(this).data('id');
				var title = $(this).data('title');
				
				g360.popup_VR(title, vr_id);
			}
		});
	},
	infiniteScroll:function(){
		var _self = this;
		// 작품검색 InfiniteScroll 적용
		this.search_controller = new ScrollMagic.Controller();
		this.search_scene = new ScrollMagic.Scene({triggerElement:'#vr_list_loader', triggerHook:'onEnter', offset:-100}).addTo(_self.search_controller);
		this.search_scene.on('enter', function(e) {			
			var $grid = $('#vr_list_wrapper');
			var $loader = $('#vr_list_loader');
			if (_self.page_info.vr.complete) return;
			if (!$loader.hasClass('first') && !$loader.hasClass('active')) {
				$loader.addClass('active');				
				_self.getVRList().then(function(data){
					$.each(data, function(){_self._appendPictureEl($grid, this);});
					$loader.removeClass('active');
					
					
					$grid.imagesLoaded(function(){	
						//	$('#gallery_columns').css('opacity', 1);
						//	$('#gallery_columns').masonry();
							
							$grid.masonry('reloadItems');
							$grid.masonry('layout');

						});
				});
			}
		});
		
		// VR 전체 개수 표시
		$(window).off('resize.vr').on('resize.vr', function() {
			if (_self.pin_scene && _self.pin_scene.destroy) {_self.pin_scene.destroy(true);}
			
			if ($('#vr_scroll_pin_trigger').length == 0) {
				$(window).off('resize.art');
			} else {
				_self.pin_scene = new ScrollMagic.Scene({
					triggerElement:'#vr_scroll_pin_trigger', 
					triggerHook:'onLeave',
					offset: (window.innerWidth < 1200 ? -50 : -60)
				}).setPin('#vr_search_input_wrapper', {spacerClass:'container container-spacer'}).addTo(_self.search_controller);
			}
		});
		$(window).resize();
		
	},
	loadVRList:function(){
		var _self = this;
		var _html = '';
		var $grid = $('#vr_list_wrapper');
		var $loader = $('#vr_list_loader');
		
		$loader.addClass('first active');
		
		// 데이터 가져오기 초기화
		_self.page_info.vr.start = 0;
		_self.page_info.vr.complete = false;
		
		$grid.masonry();
		
		
		
		// 즐겨찾기 데이터 가져오기
		_self.getVRList().then(function(data){
			$.each(data, function(){_self._appendPictureEl($grid, this);});
			_self.search_scene.update();
			$loader.removeClass('first active');
			
			
			$grid.imagesLoaded(function(){	
				//	$('#gallery_columns').css('opacity', 1);
				//	$('#gallery_columns').masonry();
					
					$grid.masonry('reloadItems');
					$grid.masonry('layout');

				});
			
			
		}, function() {
			$loader.hide();
		});
	},
	getVRList:function(){
		var _self = this;
		//debugger;
		var url = g360.root_path + "/load_ai_public.mon?start=" + _self.page_info.vr.start + "&perpage="+_self.page_info.vr.perpage+"&ty=all&sort=" + _self.page_info.type;		
		return $.ajax({
			url : url,
			success : function(data){
				// 배열첫번째로 totalcount값이 내려옴
				if (data.length > 1) _self.page_info.vr.start += (data.length-1);
				
				// 카운트 셋팅
				$('#vr_list_loading_cnt').html(g360.numberComma(_self.page_info.vr.start));
				$('#vr_list_total_cnt').html(g360.numberComma(data[0].totalcount));
				
				
				// 마지막 페이지 체크
				if ((data.length-1) < _self.page_info.vr.perpage) {
					_self.page_info.vr.complete = true;
				}
			},
			error : function(e){
				g360.error_alert();
			}
		});
	},
	_appendPictureEl:function($wrapper, data_info){
		if (data_info.totalcount != undefined) return;
		//debugger;
		//var vr_img_src = "/vr/vr_data_"+data_info.templatecode+"/"+data_info.dockey+"/pano_f.jpg";
		//var vr_img_src = g360.vr_img_path_new(data_info.dockey);
		//var vr_img_src = data_info.service_image;
		
		var img_src = "/artimage/" + data_info.email + "/artRequest_AI/result/" + data_info.dockey + "_out_water_small.png";
		var email = data_info.email;
		var sfilename = data_info.dockey;
		var resultpath_water_full = g360.domain + "/artimage/" + email + "/artRequest_AI/result/" + sfilename + "_out_water.png";
		
		
//		var _html = ''
//		+ '<div class="col-lg-4 col-md-6" style="height:280px">'
//		+ "  <div class='vr-item-wrap' onclick=\"g360.preview_img_direct2('"+resultpath_water_full+"', '"+email+"', '"+sfilename+"')\">"
//		+ "    <div class='pic' style=\"width:380px; min-height:260px; background-size:cover ; background-repeat:no-repeat; background-image: url('"+img_src+"')\">"
//		+ '    </div>'
//		+ '    <div class="info">'
//		+ '    </div>'
//		+ '  </div>'
//		+ '</div>'; 
		
		
		
		var _html = ''
			+ '<div class="col-lg-4 col-md-6" >'
		//	+ '<div class="grid-item col-lg-3 col-md-4 col-sm-4 col-6">'
			+ "  <div class='vr-item-wrap' onclick=\"g360.preview_img_direct3('Y', '"+resultpath_water_full+"', '"+email+"', '"+sfilename+"', '"+data_info.request_upload_img+"', '"+data_info.request_select_img+"')\">"
			+ "    <div class='pic' >"
			+ '        <img src="'+img_src+'" data-vr-id="'+data_info.dockey+'" >'
			//+ '      <div class="vr-thumb-wrapper">'
			//+ '        <img class="vr-thumb" src="'+vr_img_src+'" data-vr-id="'+data_info.dockey+'" data-tmpl="'+data_info.templatecode+'">'
			//+ '      </div>'
			+ '    </div>'
			+ '    <div class="info" style="margin : 20px 0px 20px 0px">'
//			+ '      <h3>'+data_info.title+'</h3>'
//			+ '      <h4>'+data_info.host+'</h4>'
//			+ '      <div class="like-area">'
//			+ '        <span><img src="../img/icon-vr-view-count-b.svg" class="icon_vr_view-count_b"> '+g360.numberComma(data_info.read)+'</span>'
//			+ '        <span><img src="../img/icon-vr-collect-count-b.svg" class="icon_vr_collect-count_b"> <span class="like-count">'+g360.numberComma(data_info.like)+'</span></span>'
//			+ '      </div>'
			+ '    </div>'
			+ '  </div>'
			+ '</div>';
		
	//	$wrapper.append(_html);
		
		$div = $(_html);
		$wrapper.append($div).masonry('appended', $div);

	},
	
	
	
	"load_Curie_home" : function(){

		if (g360.login_check()){
			
//			g360.curie_intro_show();				
//			setTimeout("g360.close_popup2('image_preview3')", 2500);
			
			//curie_header
			g360.history_record("curie_header");g360.history_record("curie_header");
			
			//g360.scroll_Top();
			g360.body_scroll_hide();
			var url = g360.root_path + "/main/recommend/curie_recommand_home.jsp";
			$('#curie_header').addClass('active');
			$("#curie_wrapper").load(url, function(response, status, xhr){
				if (status == "error"){
					var msg = "Site Error : "; 
					g360.gAlert("Error", msg + xhr.status + " " + xhr.statusText , "red", "left");
				}
			});
			//g360.LoadPage_Content("body_content", url);
		}else{
			g360.login_window_max();
			$("#p_login").click();
			return false;
		}

	},
	
}

