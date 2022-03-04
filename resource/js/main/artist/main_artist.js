

function gArtistMain(){	
	this.page_info = {
		type : 0, // 0:랜덤, 1: 최신순, 2: 닉넴임 오름차순, 3: 이름순
		artist : {
			start : 0,
			perpage : 12,
			complete : false
		},
		search : {
			start : 0,
			perpage : 20,
			complete : false
		}
	}
}

gArtistMain.prototype = {		

	"init" : function(){
		var _self = this;
		
		this._eventBind();
		this.infiniteScroll();
		this.loadArtistList();
		
		this.g_lang();
	},
	
	"g_lang" : function(){
		
		$(".g_lang_Artist_Detail_3").html(g360.g_lang.Artist_Detail_3);
		$(".g_lang_Random").html(g360.g_lang.Random);
		$(".g_lang_Latest").html(g360.g_lang.Latest);
		$(".g_lang_Artist_Detail_4").html(g360.g_lang.Artist_Detail_4);
		$(".g_lang_Search_Artist").attr("placeholder",g360.g_lang.Search_Artist);
	},
	
	"xClose" : function(){
		$("#main_artist_detail").hide();
		$("#main_artist").fadeIn(500);
	},
	
	_eventBind:function(){
		var _self = this;
		// 상세선택
		$('#artist_list_wrapper, #artist_search_list_wrapper').on('click', function(e){
			var $target = $(e.target);
			
			// favorite 아이콘
			if ($target.hasClass('btn-artist-favorite')) {
				var $favo = $(e.target);
				var img_id = $favo.data('artistId');
				var _is_del = $(e.target).hasClass('added');
				
				g360.setArtistCollection($favo.data('artistId'), _is_del, function(data){
					if (data.result == 'OK') {
						$favo[_is_del ? 'removeClass' : 'addClass']('added');
					} else {
						g360.error_alert();
						console.log('Error', data);
					}
				});
				return false;
			} 
			
			
			// 작가 선택
			if ($target.hasClass('pic') || $target.closest('.pic').length || $target.closest('.info').length) {
				var artist_id = '';
				if ($target.closest('.info').length) {
					artist_id = $target.closest('.info').prev().data('artistId');
				} else {
					artist_id = $target.closest('.pic').data('artistId');
				}
				g360.showArtistDetail(artist_id);
			}
		});
	
		// 정렬
		$('#artist_search_wrapper .dropdown-item').on('click', function(){
			var _btn = $(this).parent().prev(); 
			if (_btn.text() == $(this).text()) return false;
			_self.page_info.type = ($(this).data('order'));
			_btn.text($(this).text());
			_btn.click();
			$('#artist_list_wrapper').empty();
			_self.loadArtistList();
			return false;
		});
		
		// 검색
		$('#artist_search_txt').on('keydown', function(e){
			var txt = $(this).val();
			if (e.keyCode == 13) {
				if (txt.replace(/\s/g, '') == '') {
					g360.gAlert("Info","검색어를 입력하세요.", "blue", "top");
					return false;
				}
				txt = $.trim(txt);

				$('#artist_search_list_wrapper').empty();
				_self.page_info.search.start = 0;
				_self.searchArtist(txt);
			}
		});
		
	},
	
	// 작가 검색하기
	searchArtist:function(txt){
		// 즐겨찾기 데이터 가져오기
		var _self = this;
		var $grid = $('#artist_list_wrapper');
		var $search_grid = $('#artist_search_list_wrapper');
				
		_self.getSearchArtist(txt).then(function(data){
			if (data[0].totalcount == 0) {
				g360.gAlert("Info", g360.g_lang.Artist_Detail_5 , "blue", "top");
				return;
			}
			$.each(data, function(){_self._appendPictureEl($search_grid, this);});
			$grid.hide();
			$search_grid.show();
			//_self.search_scene.update();
			//$loader.removeClass('first active');
		}, function() {
			//$loader.hide();
		});
	},
	
	infiniteScroll:function(){
		var _self = this;
		// 작가검색 InfiniteScroll 적용
		this.search_controller = new ScrollMagic.Controller();
		this.search_scene = new ScrollMagic.Scene({triggerElement:'#artist_list_loader', triggerHook:'onEnter', offset:-100}).addTo(_self.search_controller);
		this.search_scene.on('enter', function(e) {
			var $grid = $('#artist_list_wrapper');
			var $loader = $('#artist_list_loader');
			if (_self.page_info.artist.complete) return;
			if (!$grid.is(':visible')) return;
			if (!$loader.hasClass('first') && !$loader.hasClass('active')) {
				$loader.addClass('active');
				_self.getArtistList().then(function(data){
					$.each(data, function(){_self._appendPictureEl($grid, this);});
					$loader.removeClass('active');
				});
			}
		});
	},
	loadArtistList:function(){
		var _self = this;
		var _html = '';
		var $grid = $('#artist_list_wrapper');
		var $loader = $('#artist_list_loader');
		
		$loader.addClass('first active');
		
		// 데이터 가져오기 초기화
		_self.page_info.artist.start = 0;
		_self.page_info.artist.complete = false;
		
		// 즐겨찾기 데이터 가져오기
		_self.getArtistList().then(function(data){
			$.each(data, function(){_self._appendPictureEl($grid, this);});
			_self.search_scene.update();
			$loader.removeClass('first active');
		}, function() {
			$loader.hide();
		});
	},
	getArtistList:function(){
		var _self = this;
		var url = g360.root_path + "/load_artist_public.mon?start=" + _self.page_info.artist.start + "&perpage="+_self.page_info.artist.perpage+"&ty=" + _self.page_info.type;		
		return $.ajax({
			url : url,
			success : function(data){
				// 배열첫번째로 totalcount값이 내려옴
				if (data.length > 1) _self.page_info.artist.start += (data.length-1);
				
				/*
				// 카운트 셋팅
				$('#artist_list_loading_cnt').html(g360.numberComma(_self.page_info.artist.start));
				$('#artist_list_total_cnt').html(g360.numberComma(data[0].totalcount));
				*/
				
				// 마지막 페이지 체크
				if ((data.length-1) < _self.page_info.artist.perpage) {
					_self.page_info.artist.complete = true;
				}
			},
			error : function(e){
				g360.error_alert();
			}
		});
	},
	getSearchArtist:function(txt){
		var _self = this;
		var url = g360.root_path + "/search_artist_public.mon?q=" + encodeURIComponent(txt) + "&start=" + _self.page_info.search.start + "&perpage="+_self.page_info.search.perpage+"&ty=" + _self.page_info.type;		
		return $.ajax({
			url : url,
			success : function(data){
				// 배열첫번째로 totalcount값이 내려옴
				if (data.length > 1) _self.page_info.search.start += (data.length-1);
				
				/*
				// 카운트 셋팅
				$('#artist_list_loading_cnt').html(g360.numberComma(_self.page_info.artist.start));
				$('#artist_list_total_cnt').html(g360.numberComma(data[0].totalcount));
				*/
				
				// 마지막 페이지 체크
				if ((data.length-1) < _self.page_info.search.perpage) {
					_self.page_info.search.complete = true;
				}
			},
			error : function(e){
				g360.error_alert();
			}
		});
	},
	_appendPictureEl:function($wrapper, data_info){
		if (data_info.totalcount != undefined) return;
		
		var src_art = '';
		var src_artist = '';
		
		if (data_info.last_art_path) {
			src_art = g360.preview_img_path(data_info.email, data_info.last_art_path);
		}
		src_artist = g360.user_photo_gray_url(data_info.email);
		
		// 버전 정보 추가
		src_artist += (data_info.photo_list_version ? '?open&ver=' + data_info.photo_list_version : '');
		
		var _html = ''
		+ '<div class="col-lg-4 col-sm-6">'
	    + '  <div class="artist-item-wrap">'
	    + '    <div class="pic" data-artist-id="' + data_info.email + '">'
	    + '      <div class="artist-art-preview"><div class="img-cover" style="background-image:url(\'' + src_art + '\')"></div></div>'
	    + '      <div class="artist"><div class="img-cover" style="background-image:url(\'' + src_artist + '\')"></div></div>'
	    + '    </div>'
	    + '    <div class="info">'
	    + '      <h3>' + data_info.nickname + '</h3>'
	    + '      <h4>' + (typeof(data_info.name_eng) != "undefined" ? data_info.name_eng : "") + '</h4>'
	    + '      <div class="like-area">'
	    + '        <span><img src="../img/icon-artist-vr-count.svg" class="icon-artist-count">' + g360.numberComma(data_info.vr_count) + '</span>'
	    + '        <span><img src="../img/icon-artist-art-count.svg" class="icon-artist-count-b">' + g360.numberComma(data_info.art_count) + '</span>'
	    + '        <span class="float-right"><div class="btn-artist-favorite' + (data_info.myfavorite=='T' ? ' added' : '') + '" data-artist-id="' + data_info.email + '"></div></span>'
	    + '      </div>'
	    + '    </div>'
	    + '  </div>'
	    + '</div>';
		
		$wrapper.append(_html);
	}
	
}

