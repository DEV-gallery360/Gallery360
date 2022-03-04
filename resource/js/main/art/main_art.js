
function gArtMain(){	
	this.selected_item = null;
	this.page_info = {
		search : {
			query : {
				thema : "",  //풍경 또는 인물
				color : "",  //green 또는 blue 색상
				type : "",   //가로
				hosu : "",   //10호 에서 70호까지
				price : ""   //100만원 에서 500만원 까지
	 			
	 			//thema : "풍경-spl-인물",      //풍경 또는 인물
				//type : "2",                //가로
				//hosu : "10-spl-70",        //10호 에서 70호까지
				//price : "100-spl-500",     //100만원 에서 500만원 까지
	 			//color : "green-spl-blue"  //green 또는 blue 색상
			},
			start : 0,
			perpage : 20,
			complete : false
		}
	}
}

gArtMain.prototype = {		

	init:function(){
		this._eventBind();
		this.setRecommandList();
		this.infiniteScroll();
		$('#art_list_wrapper').masonry();
		this.loadSearch();
		
		this.g_lang();
	},
	
	"g_lang" : function(){
		
		$(".g_lang_Size").html(g360.g_lang.Size1);
		$(".g_lang_Theme").html(g360.g_lang.Theme);
		$(".g_lang_Color").html(g360.g_lang.Color);
		$(".g_lang_Form").html(g360.g_lang.Form);
		$(".g_lang_Purchase_Price").html(g360.g_lang.Purchase_Price);
		
		$(".g_lang_Scenery").html(g360.g_lang.Scenery);
		$(".g_lang_Character").html(g360.g_lang.Character);
		$(".g_lang_Still_Life").html(g360.g_lang.Still_Life);
		$(".g_lang_Animal").html(g360.g_lang.Animal);
		$(".g_lang_Abstract").html(g360.g_lang.Abstract);
		$(".g_lang_PopArt").html(g360.g_lang.PopArt);
		$(".g_lang_Object").html(g360.g_lang.Object);
		
		$(".g_lang_Square").html(g360.g_lang.Square);
		$(".g_lang_Horizontal").html(g360.g_lang.Horizontal);
		$(".g_lang_Vertical").html(g360.g_lang.Vertical);
		$(".g_lang_Circle").html(g360.g_lang.Circle);
		$(".g_lang_Set").html(g360.g_lang.Set);
		$(".g_lang_Install_Art").html(g360.g_lang.Install_Art);
		$(".g_lang_Media").html(g360.g_lang.Media);
		
		$(".g_lang_Direct_Input").html(g360.g_lang.Direct_Input);
		$(".g_lang_TurnOff_Setting").html(g360.g_lang.TurnOff_Setting);
		$(".g_lang_Random").html(g360.g_lang.Random);
		$(".g_lang_Latest").html(g360.g_lang.Latest);
		$(".g_lang_High_Price").html(g360.g_lang.High_Price);
		$(".g_lang_Low_Price").html(g360.g_lang.Low_Price);

		$(".g_lang_hosu1").html(g360.g_lang.Hosu1);
		$(".g_lang_hosu2").html(g360.g_lang.Hosu2);
		$(".g_lang_hosu3").html(g360.g_lang.Hosu3);
		$(".g_lang_hosu4").html(g360.g_lang.Hosu4);
		$(".g_lang_hosu5").html(g360.g_lang.Hosu5);
		
	},
	_eventBind:function(){
		var _self = this;
		
		// 정렬
		$('#menu_art_sort a').on('click', function(e){
			if ($(this).hasClass('selected')) return false;
			$('#menu_art_sort a').removeClass('selected');
			$(this).addClass('selected');
			$('#btn_art_sort').text($(this).text());
			_self.drawSearch();
			e.preventDefault();
		});
		
		// 상세선택
		$('#art_list_wrapper').on('click', function(e){
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
		});
				
		// 검색필터 버튼
		$('#main_art_search_parker button:not(".btn-price-search")').on('click', function() {
			var $wrapper = $('#main_art_search_parker'); 
			var $search = $wrapper.find('.search-filter-result');
			var search_key = $(this).data('searchKey');
			var search_text = $(this).data('searchText');
			var search_type = $(this).data('searchType');
			var $el = $search.find('.search-filter[data-search-key="'+search_key+'"]');
			
			if (!search_type) return;
			
			var $other = $(this).closest('.m_detail_search').length > 0 ? $wrapper.find('.parker-tb') : $wrapper.find('.m_detail_search');
			var $other_btn = $other.find('button[data-search-key="'+search_key+'"]');

			
			if ($(this).hasClass('active')) {
				$el.remove();
				$other_btn.removeClass('active');
			} else {
				
				if(g360.g_lang.Lang == "us"){
					if(search_text == "정방형") search_text = "Square";
					if(search_text == "가로형") search_text = "Horizontal";
					if(search_text == "세로형") search_text = "Vertical";
					if(search_text == "원형") search_text = "Circle";
					if(search_text == "셋트") search_text = "Set";
					if(search_text == "입체/설치") search_text = "Sculpture / Installation";
					if(search_text == "미디어") search_text = " Media";
					
					if(search_text == "풍경") search_text = " Scenery";
					if(search_text == "인물") search_text = " Character";
					if(search_text == "정물") search_text = " Still Life";
					if(search_text == "동물") search_text = " Animal";
					if(search_text == "추상") search_text = " Abstract";
					if(search_text == "팝아트") search_text = " Pop Art";
					if(search_text == "오브제") search_text = " Object";
					
					if(search_text == "1~10호") search_text = " ~46cm";
					if(search_text == "11~30호") search_text = " 47~73cm";
					if(search_text == "31~60호") search_text = " 74~97cm";
					if(search_text == "61~80호") search_text = " 98~112cm";
					if(search_text == "100호+") search_text = " 113cm~";
					
					
				}
				
				$('<div class="search-filter"' +
						' data-search-key="' + search_key + '"' +
						' data-search-type="' + search_type + '"' + '></div>')
					.append('<span>' + search_text + '<img src="../img/btn-aw-filter-delete.svg" class="btn_aw_filter_delete"></span>')
					.appendTo($search);
				$other_btn.addClass('active');
			}
			_self.drawSearch();
		});
		
		// 색상
		$('#main_art_search_parker .color-pick span').on('click', function() {
			var $wrapper = $('#main_art_search_parker'); 
			var $search = $wrapper.find('.search-filter-result');
			var search_key = $(this).data('searchKey');
			var search_text = $(this).data('searchText');
			var search_type = $(this).data('searchType');
			var $el = $search.find('.search-filter[data-search-key="'+search_key+'"]');
			
			var $other = $(this).closest('.m_detail_search').length > 0 ? $wrapper.find('.parker-tb') : $wrapper.find('.m_detail_search');
			var $other_btn = $other.find('span[data-search-key="'+search_key+'"]');
			
			if ($(this).hasClass('active')) {
				$el.remove();
				$other_btn.removeClass('active');
			} else {
				$('<div class="search-filter color"' +
						' data-search-key="' + search_key + '"' +
						' data-search-type="' + search_type + '"' + '></div>')
					.append('<span>' + search_text + '</span>')
					.appendTo($search)
					.css('backgroundColor', $(this).css('backgroundColor'));
				$other_btn.addClass('active');
			}
			$(this).toggleClass('active');
			_self.drawSearch();
		});
		
		// 금액 검색
		$('#main_art_price_search, #main_art_price_search_m').on('click', function(){
			var s_id;
			var e_id;
			if ($(this).attr('id') == 'main_art_price_search') {
				s_id = 'amount';
				e_id = 'amount2';
			} else {
				// 모바일 버튼
				s_id = 'amount_m';
				e_id = 'amount2_m';
			}
			
			var _start = $('#' + s_id).val().replace(/\D/g, '').replace(/\s*/g, '');
			var _end = $('#' + e_id).val().replace(/\D/g, '').replace(/\s*/g, '');
			
			if (_start == '') {
				g360.gAlert_focus("Error", g360.g_lang.MainArt_Alert1 , "red", "left", s_id);
				return;
			}
			
			if (_end == '') {
				g360.gAlert_focus("Error", g360.g_lang.MainArt_Alert1 , "red", "left", e_id);
				return;
			}
			
			if (isNaN(_start) || isNaN(_end)) {
				g360.gAlert("Error", g360.g_lang.MainArt_Alert2 , "red", "left");
				return;
			}
			
			_start = parseInt(_start, 10);
			_end = parseInt(_end, 10);
			if (_start > _end) {
				g360.gAlert("Error", g360.g_lang.MainArt_Alert3 , "red", "left");
				return;
			}
			
			// 모바일 페이지와 일반페이지에 값 넣어주기
			if ($(this).attr('id') == 'main_art_price_search') {
				$('#amount_m').val($('#amount').val());
				$('#amount2_m').val($('#amount2').val());
			} else {
				$('#amount').val($('#amount_m').val());
				$('#amount2').val($('#amount2_m').val());
			}
			
			var $wrapper = $('#main_art_search_parker'); 
			var $search = $wrapper.find('.search-filter-result');
			//var $search = $('#art_list_search_result'); 
			var search_key = _start + '-spl-' + _end + '';
			
			var search_text = '';
			//필터 검색시 아래 뜨는 가격버튼
			if(g360.g_lang.Lang == "ko"){
				search_text = g360.setWon(_start) + '~' + g360.setWon(_end);				
			}else{
				search_text = g360.comma(_start) + '~' + g360.comma(_end);				
			}
			var search_type = 'price';
			$wrapper.find('.search-filter[data-search-type="price"]').remove();
			$('<div class="search-filter"' +
					' data-search-key="' + search_key + '"' +
					' data-search-type="' + search_type + '"' + '></div>')
				.append('<span>' + search_text + '<img src="/img/btn-aw-filter-delete.svg" class="btn_aw_filter_delete"></span>')
				.appendTo($search);

			_self.drawSearch();
		});
		
		// 금액 키이벤트
		$('#amount, #amount2, #amount_m, #amount2_m').on('keydown', function(e){
			var k = e.keyCode;
			if (k == 8 || k == 46 || k == 98 || k == 100 || k == 102 || k == 104 ||
					(k >= 16 && k <= 18 ) ||
					(k >= 35 && k <= 40 ) ||
					(k >= 48 && k <= 57 ) ||
					(k >= 96 && k <= 105 ) ) {
			} else if (k == 13) {
				$('#main_art_price_search').click();
			} else {
				return false;
			}
		});
		
		// 금액 키이벤트
		$('#amount, #amount2, #amount_m, #amount2_m').on('keyup', function(e){
			var price = g360.numberComma($(this).val().replace(/\D/g, '').replace(/^0*/g, ''));
			
			if ($(this).attr('id') == 'amount' || $(this).attr('id') == 'amount_m') {
				$('#amount').val(price);
				$('#amount_m').val(price);
			}
			
			if ($(this).attr('id') == 'amount2' || $(this).attr('id') == 'amount2_m') {
				$('#amount2').val(price);
				$('#amount2_m').val(price);
			}
		});
		
		//모바일 금액버튼 이벤트
		$('.m_detail_search .btn-m-price').on('click', function(){
			var key = $(this).data('search-key');
			var _start = key.split('-spl-')[0];
			var _end = key.split('-spl-')[1];
			
			$('#amount_m').val(g360.numberComma(_start));
			$('#amount2_m').val(g360.numberComma(_end));
			
			$('#main_art_price_search_m').click();
		});
		
		
		
		// 전체해제
		$('#main_art_searchfilter_remove').on('click', function() {
			$('#main_art_search_parker button').removeClass('active');
			$('#main_art_search_parker span').removeClass('active');
			$('#main_art_search_parker .search-filter-result').empty();
			_self.drawSearch();
			return false;
		});
		
		// 필터 토큰
		$('#art_list_search_result, #m_art_list_search_result').on('click', function(e){
			var $el;
			if ( $(e.target).hasClass('search-filter') ) {
				$el = $(e.target);
			} else if ($(e.target).closest('.search-filter').length > 0) {
				$el = $(e.target).closest('.search-filter');
			} else {
				return;
			}
			
			// 검색필터 해제
			var _key = $el.data('searchKey');
			var _tn = $el.data('searchType') == 'color' ? 'span' : 'button';
			var $btn_filter = $('#main_art_search_parker ' + _tn + '[data-search-key="' + _key + '"]');
			$btn_filter.removeClass('active');
			//$el.remove();
			var $filters = $('#main_art_search_parker .search-filter[data-search-key="'+_key+'"]');
			$filters.remove();
			_self.drawSearch();
		});
		
		// 모바일 버튼 탭
		$('#m_art_btn_header li').on('click', function(){
			var $ul = $('#m_art_btn_header');
			var $this = $(this);
			if ($this.hasClass('on')) return;
			
			$ul.find('li').removeClass('on');
			$this.addClass('on');
			var wrapper = $this.data('wrapper');
			
			$ul.parent().find('.m_detail').hide();
			$ul.parent().find('.' + wrapper).show();
		});
	},
	setRecommandList:function(){		
		var _self = this;
		var _url = g360.root_path + "/monthly_image_list.mon";
		//var _url = g360.root_path + "/load_all_art_public.mon?start=0&perpage=10";
		var $list = $('#main_art_slider');
		$.ajax({
			url: _url,
			success: function(data){
				if (data.length == 0) return;
				
				data = g360.arrayShuffle(data);
				
				$.each(data, function(idx, val){
					if (this.totalcount) return true;
					var $el = $(
						'<div class="item" style="cursor:pointer;">' +
					    '  <div class="part">' +
					    '    <div class="container">' +
					    '      <div class="slide-txt-wrap">' +
					    '        <h1>' + this.art_title + '</h1>' +
					    '        <h2>' + this.art_artist + '</h2>' +
					    '        <p class="mt-5">' + (typeof(this.summary) != "undefined" ? this.summary : "") + '</p>' +
					    '        <a href="#" class="btn btn-cst btn-outline-light p-2 pr-4 pl-4 mt-5">'+g360.g_lang.Appreciation_Art+'</a>' +
					    '      </div>' +
					    '    </div>' +
					    '  </div>' +
				  	    '</div>');
					$el.find('.part').css('background-image', 'url("' + g360.art_expand_img_path(this.email, this.dockey) + "?open&ver="+this.version + '")');
					//$el.find('.btn').on('click', function(){
					//$el.find('.slide-txt-wrap').on('click', function(){
					$el.on('click', function(){
						g360.showArtDetail(val.dockey);
						return false;
					});
					$list.append($el);
					
					//최대 6개만 나오도록 처리
					if (idx > 4) return false;
				});
				$list.owlCarousel({
					loop: true,
					items: 1,
					responsiveRefreshRate: 100,
					autoplay: true,
					autoplaySpeed: 1000,
					autoplayHoverPause: true
				});
			},
			error: function(){
				
			}
		});
	},
	infiniteScroll:function(){
		var _self = this;
		// 작품검색 InfiniteScroll 적용
		this.search_controller = new ScrollMagic.Controller();
		this.search_scene = new ScrollMagic.Scene({triggerElement:'#art_list_loader', triggerHook:'onEnter', offset:-100}).addTo(_self.search_controller);
		this.search_scene.on('enter', function(e) {
			var $grid = $('#art_list_wrapper');
			var $loader = $('#art_list_loader');
			//if (_self.layer_frame.get(0).style.display == 'none' ||
					//$('#deco_tab_search').get(0).style.display == 'none') return;
			if (_self.page_info.search.complete) return;
			if (!$loader.hasClass('first') && !$loader.hasClass('active')) {
				//console.log('main art loading scroll');
				$loader.addClass('active');
				_self.getSearchList().then(function(data){
					if (data.length > 1) {
						$.each(data, function(){_self._appendPictureEl($grid, this);});
						
						// 이미지 로딩이 완료되면 화면에 표시
						$grid.imagesLoaded(function(){
							$loader.removeClass('active');
							$grid.masonry('layout');
						});
					} else {
						$loader.removeClass('active');
					}
				});
			}
		});
		
		$(window).off('resize.art').on('resize.art', function() {
			if (_self.pin_scene && _self.pin_scene.destroy) {_self.pin_scene.destroy(true);}
			
			if ($('#art_scroll_pin_trigger').length == 0) {
				$(window).off('resize.art');
			} else {
				_self.pin_scene = new ScrollMagic.Scene({
					triggerElement:'#art_scroll_pin_trigger', 
					triggerHook:'onLeave',
					offset: (window.innerWidth < 1200 ? -50 : -60)
				}).setPin('#art_search_input_wrapper', {spacerClass:'container container-spacer'}).addTo(_self.search_controller);
			}
		});
		$(window).resize();
	},
	
	// 검색 초기 로딩
	loadSearch:function() {
		var _self = this;
		var _html = '';
		var $grid = $('#art_list_wrapper');
		var $loader = $('#art_list_loader');
		if (_self.load_search_complete) return;
		
		$loader.addClass('first active');
		$grid.css('opacity', 0);
		
		// 즐겨찾기 데이터 가져오기 초기화
		_self.page_info.search.start = 0;
		_self.page_info.search.perpage = 20;
		_self.page_info.search.complete = false;
		//$grid.masonry('remove', $grid.find('.my-favo')).masonry('layout');
		
		// 즐겨찾기 데이터 가져오기
		_self.getSearchList().then(function(data){
			if (data.length > 1) {
				$.each(data, function(){
					_self._appendPictureEl($grid, this);
				});
			
				// 이미지 로딩이 완료되면 화면에 표시
				$grid.imagesLoaded(function(){
					_self.search_scene.update();
					$loader.removeClass('first active');
					$grid.masonry();
					$grid.css('opacity', 1);
					_self.page_info.search.perpage = 20;
					_self.load_search_complete = true;
				});
			} else {
				$loader.removeClass('first active');
				$grid.css('opacity', 1);
			}
		}, function() {
			$loader.hide();
		});
	},
	//작품 검색 하기
	getSearchList : function(){
		var _self = this;
		var sort = $('#menu_art_sort a.selected').data('sort');
		var query = $.extend({}, _self.page_info.search.query, true);
		query.start = _self.page_info.search.start;
		query.perpage = _self.page_info.search.perpage;
		query.sort = sort; 
		
		var data = JSON.stringify(query);
		/*
		var data = JSON.stringify({
			thema : "풍경-spl-인물",      //풍경 또는 인물
			type : "2",                //가로
			hosu : "10-spl-70",        //10호 에서 70호까지
			price : "100-spl-500",     //100만원 에서 500만원 까지
 			color : "green-spl-blue",  //green 또는 blue 색상
			start : _self.page_info.search.start,
			perpage : _self.page_info.search.perpage
			
		});
		*/
		
		var page = $('#art_list_search_result .search-filter').length ? 'load_image_select_option.mon' : 'all_image_list.mon'; 
		var url = g360.root_path + "/" + page + "?sort=" + sort + "&start=" + _self.page_info.search.start + "&perpage="+_self.page_info.search.perpage;		
		return $.ajax({
			type : "POST",
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				// 배열첫번째로 totalcount값이 내려옴
				if (data.length > 1) {
					_self.page_info.search.start += (data.length-1);
					
					// 전체 개수보다 가져온 데이터가 많으면 자른다
					if (data[0].totalcount < _self.page_info.search.start) {
						var over = _self.page_info.search.start - data[0].totalcount;
						_self.page_info.search.start -= over;
						data.splice(1, over); // 중복영역 자르기
					}
					
				}
				
				// 카운트 셋팅
				$('#art_list_loading_cnt').html(g360.numberComma(_self.page_info.search.start));
				$('#art_list_total_cnt').html(g360.numberComma(data[0].totalcount));
				
				if (data[0].totalcount == 0) {
					$('#art_list_nothing_text').text(g360.g_lang.MainArt_Alert4);
				} else {
					$('#art_list_nothing_text').text('');
				}
				
				// 마지막 페이지 체크
				if (data[0].totalcount <= _self.page_info.search.start) {
					_self.page_info.search.complete = true;
				}
				/*
				if ((data.length-1) < _self.page_info.search.perpage) {
					_self.page_info.search.complete = true;
				}
				*/
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	drawSearch:function(){
		var _self = this;
		var $grid = $('#art_list_wrapper');
		var $loader = $('#art_list_loader');
		
		_self.page_info.search.start = 0;
		_self.page_info.search.perpage = 20;
		_self.page_info.search.complete = false;
		$.each(_self.page_info.search.query, function(_key, _val) {
			_self.page_info.search.query[_key] = '';
		});
		
		$loader.addClass('active');
		$grid.masonry('remove', $grid.find('.grid-item')).masonry('layout');
		
		// Query 생성
		var $filters = $('#art_list_search_result .search-filter');
		$filters.each(function() {
			var _key = $(this).data('searchKey');
			var _type = $(this).data('searchType');
			if (_self.page_info.search.query[_type] == '') {
				_self.page_info.search.query[_type] = _key;
			} else {
				_self.page_info.search.query[_type] += '-spl-' + _key;
			}
		});
		
		_self.getSearchList().then(function(data){
			if (data.length > 1) {
				$.each(data, function(){_self._appendPictureEl($grid, this);});
				
				// 이미지 로딩이 완료되면 화면에 표시
				$grid.imagesLoaded(function(){
					$loader.removeClass('active');
					$grid.masonry('layout');
				});
			} else {
				$loader.removeClass('active');
			}
		});
	},
	_appendPictureEl:function($wrapper, data_info){
		//debugger;
		if (data_info.totalcount != undefined) return;
		var _url = g360.art_img_path(data_info.email, data_info.art_img_filename);
		//var _thumb = g360.preview_img_path(data_info.email, data_info.art_img_filename);
		var _thumb = g360.thumbnail_img_path(data_info.email, data_info.art_img_filename);
		_thumb = _thumb + "?open&ver=" + data_info.version;
		
		var $div = $('<div class="grid-item col-lg-3 col-md-4 col-sm-4 col-6"></div>');
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
			.append('<p>' + data_info.art_artist + '</p>')
			.append('<p class="text-muted">' + data_info.art_height + ' x ' + data_info.art_width + 'cm ' + (data_info.art_hosu != null && g360.g_lang.Lang =="ko" ? '(' + data_info.art_hosu + '호)' : "" ) + '</p>');
		
		var $cost = "";

		if (typeof(data_info.opt) != "undefined" && data_info.opt == "none"){
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
		
		$wrapper.append($div).masonry('appended', $div);
	}
}