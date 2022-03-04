
/**
VR갤럴리 클릭시 조회수 +1 올리기
http://localhost:8080/vrgallery_read_count_add.mon?key=a@naver.com_20181128131412_EIREK9Z

VR갤러리 like count +1 올리기
http://localhost:8080/vrgallery_like_count_add.mon?key=a@naver.com_20181128131412_EIREK9Z



VR갤러리 favorite추가하기
http://localhost:8080/add_vr_mycollection.mon?dockey=a@naver.com_20181128131412_EIREK9Z&mod=add

VR갤러리 favorite삭제하기
http://localhost:8080/add_vr_mycollection.mon?dockey=a@naver.com_20181128131412_EIREK9Z&mod=delete
 */

function gVrGallery(){
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

gVrGallery.prototype = {		

	init: function(){
		this._eventBind();
		this.setCarousel();
		this.loadRecommandList();
		this.infiniteScroll();
		this.loadVRList();
		this.g_lang();
	},
	
	"g_lang" : function(){
	
		$(".g_lang_Recommend_VR").html(g360.g_lang.Recommend_VR);
		$(".g_lang_Random").html(g360.g_lang.Random);
		$(".g_lang_Latest").html(g360.g_lang.Latest);
		$(".g_lang_By_Nickname").html(g360.g_lang.By_Nickname);
		
	},
	
	_eventBind: function(){
		var _self = this;
		
		// 추천 보기
		$('#vr_list_slider').on('click', function(e){
			if ($(e.target).hasClass('vr-thumb-wrapper') || $(e.target).closest('.vr-thumb-wrapper').length) {
				var $img = $(e.target).closest('.vr-thumb-wrapper').find('.vr-thumb');
				var img_id = $img.data('vrId');
				g360.showVRDetail(img_id);
			}
		});
		
		// VR상세보기
		$("#vr_body").on("click", '.pic', function(e){
			var img_id = $(e.target).data('vrId');
			g360.showVRDetail(img_id);
		});
		
		// 정렬
		$('#menu_vr_sort a').on('click', function(e){
			
			if ($(this).hasClass('selected')) return false;
			$('#menu_vr_sort a').removeClass('selected');
			$(this).addClass('selected');
			$('#btn_vr_sort').text($(this).text());
			$('#vr_list_wrapper').empty();
			
			//sort가 빠져서 추가한다.
			var sort = $('#menu_vr_sort .selected').attr("data-order");
			_self.page_info.type = sort;
			/////////////////////////////////////
			
			_self.loadVRList();
			e.preventDefault();
		});
		
	},
	
	// VR 추천 리스트 가져오기
	loadRecommandList: function(){
		var _self = this;
		//var _url = g360.root_path + '/load_VRRoom_public.mon?start=0&perpage=10&ty=choice';
		var _url = g360.root_path + '/load_all_vr_public.mon?start=0&perpage=10';
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
			var vr_img_src = g360.vr_img_path_new(this.dockey);
			var _html = '' 
			+ '<div class="item">'
            + '  <div class="row">'
            + '    <div class="col-md-12">'
            + '      <div class="rec-pic-area">'
            
            + '        <div class="vr-thumb-wrapper">'
	        + '          <img class="vr-thumb" src="'+vr_img_src+'" data-vr-id="'+this.dockey+'" data-tmpl="'+this.templatecode+'">'
	        + '          <div class="info-main-area">'
	        + '            <h2>'+g360.textToHtml(this.title)+'</h2>'
	        + '            <p>'+g360.textToHtml(this.nickname)+'</p>'
	        + '            <div class="port-bottom">'
	        + '              <span class="count"><img src="../img/icon-vr-view-count-w.png" class="icon_vr_view-count"> ' + g360.numberComma(this.read) + '</span>'
	        + '              <span class="count"><img src="../img/icon-vr-my-collection.png" class="icon_vr_my-collection"> <span class="like-count">'+g360.numberComma(this.like) + '</span></span>'
	        + '            </div>'
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
			*/
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
		$.each(vr_data, function(){
			_html += 
			'<div class="item">' +
	    	'  <div class="vr-v-01" style="background-image:url(' + this.img_path + ');" data-id="' + this.id + '" data-title="' + this.title + '">' +
    		'    <div class="slide-txt-wrap text-center">' +
		    '      <h1>' + this.location + '</h1>' +
		    '      <h2>' + this.subject + '</h2>' +
		    '      <p>‘' + this.comm + '’</p>' +
		    '      <a class="btn btn-cst btn-outline-light p-2 pr-4 pl-4 mt-5">'+g360.g_lang.Enjoy_VR+'</a>' +
		    '    </div>' +
		    '  </div>' +
		    '</div>';
		});
		$('#vr_slider').html(_html);
		
		// Main 캐러셀
		$('#vr_slider').owlCarousel({
			loop: true,
			items: 1,
			responsiveRefreshRate: 100,
			autoplay: true,
			//autoplaySpeed: 1000,
			autoplayHoverPause: true
		});
		
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
		
		// 즐겨찾기 데이터 가져오기
		_self.getVRList().then(function(data){
			$.each(data, function(){_self._appendPictureEl($grid, this);});
			_self.search_scene.update();
			$loader.removeClass('first active');
		}, function() {
			$loader.hide();
		});
	},
	getVRList:function(){
		var _self = this;
		
		var url = g360.root_path + "/load_VRRoom_public.mon?start=" + _self.page_info.vr.start + "&perpage="+_self.page_info.vr.perpage+"&ty=all&sort=" + _self.page_info.type;		
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
		
		//var vr_img_src = "/vr/vr_data_"+data_info.templatecode+"/"+data_info.dockey+"/pano_f.jpg";
		var vr_img_src = g360.vr_img_path_new(data_info.dockey);
		var _html = ''
		+ '<div class="col-lg-4 col-md-6">'
		+ '  <div class="vr-item-wrap">'
		+ '    <div class="pic">'
		+ '        <img src="'+vr_img_src+'" data-vr-id="'+data_info.dockey+'" data-tmpl="'+data_info.templatecode+'">'
		//+ '      <div class="vr-thumb-wrapper">'
		//+ '        <img class="vr-thumb" src="'+vr_img_src+'" data-vr-id="'+data_info.dockey+'" data-tmpl="'+data_info.templatecode+'">'
		//+ '      </div>'
		+ '    </div>'
		+ '    <div class="info">'
		+ '      <h3>'+data_info.title+'</h3>'
		+ '      <h4>'+data_info.nickname+'</h4>'
		+ '      <div class="like-area">'
		+ '        <span><img src="../img/icon-vr-view-count-b.svg" class="icon_vr_view-count_b"> '+g360.numberComma(data_info.read)+'</span>'
		+ '        <span><img src="../img/icon-vr-collect-count-b.svg" class="icon_vr_collect-count_b"> <span class="like-count">'+g360.numberComma(data_info.like)+'</span></span>'
		+ '      </div>'
		+ '    </div>'
		+ '  </div>'
		+ '</div>'; 
		
		$wrapper.append(_html);

	}
	
}

