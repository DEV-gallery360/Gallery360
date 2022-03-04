
function gMainFavorite(){	
	this.page_info = {
		art : {
			initialized:false,
			start:0,
			perpage:20,
			complete:false
		},
		artist : {
			initialized:false,
			start:0,
			perpage:20,
			complete:false
		},
		vr : {
			initialized:false,
			start:0,
			perpage:20,
			complete:false
		}
	}
}

gMainFavorite.prototype = {		

	"init" : function(){
		this.ch_lang();
		var _self = this;
		
		this._eventBind();
		$('#mycollection_tab li:first-child').click();
	},
	
	"ch_lang" : function(){
		
		$(".g_lang_Artwork").text(g360.g_lang.Artwork);
		$(".g_lang_Artist").text(g360.g_lang.Artist);
		$(".g_lang_VR_Gallery").text(g360.g_lang.VR_Gallery);
		
		
	},
	
	_eventBind : function(){
		var _self = this;
		// 상단 탭 버튼
		$("#mycollection_tab li").on("click", function(event){
			if ($(this).hasClass('on')) return;
			$('.sub_header_tab li').removeClass('on');
			$(this).addClass('on');
			
			
			var id = $(this).attr('id');
			if (id == "favorite_art"){
				$('#mycol_artlist_wrapper').masonry();
				$('#mycol_art').show();
				$('#mycol_artist').hide();
				$('#mycol_vr').hide();
				
				if (!_self.page_info.art.initialized) {
					_self.loadMyCollectionArt().then(function(){
						_self.infiniteScroll('art', 'mycol_artlist_wrapper', 'mycol_artlist_loader', function(){_self.loadMyCollectionArt()});
					});
				} else {
					$('#mycol_artlist_wrapper').masonry('layout');
				}
				
			}else if (id == "favorite_artist"){
				$('#mycol_art').hide();
				$('#mycol_artist').show();
				$('#mycol_vr').hide();
				
				if (!_self.page_info.artist.initialized) {
					_self.loadMyCollectionArtist().then(function(){
						_self.infiniteScroll('art', 'mycol_artistlist_wrapper', 'mycol_artistlist_loader', function(){_self.loadMyCollectionArtist()});
					});
				}
			}else if (id == "favorite_vrgallery"){
				$('#mycol_art').hide();
				$('#mycol_artist').hide();
				$('#mycol_vr').show();
				
				if (!_self.page_info.vr.initialized) {
					_self.loadMyCollectionVr().then(function(){
						
					});
				}
			}
		});
		
		// 작품 favorite 제거
		$('#mycol_artlist_wrapper').on('click', function(e){
			// favorite 아이콘
			if ($(e.target).hasClass('mycol')) {
				var $favo = $(e.target);
				var img_id = $favo.data('artId');
				var _is_del = $(e.target).hasClass('added');
				
				g360.setMyCollection($favo.data('artId'), _is_del, function(data){
					if (data.result == 'OK') {
						// 목록에서 제거
						$('#mycol_artlist_wrapper').masonry('remove', $favo.closest('.grid-item')).masonry('layout');
						
						if ($('#mycol_artlist_wrapper .mycol').length == 0) {
							_self.loadMyCollectionArt();
						}
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
		
		// 작가 상세선택
		$('#mycol_artistlist_wrapper').on('click', function(e){
			var $target = $(e.target);
			
			// favorite 아이콘
			if ($target.hasClass('btn-artist-favorite')) {
				var $favo = $(e.target);
				var img_id = $favo.data('artistId');
				var _is_del = $(e.target).hasClass('added');
				
				g360.setArtistCollection($favo.data('artistId'), _is_del, function(data){
					if (data.result == 'OK') {
						$favo[_is_del ? 'removeClass' : 'addClass']('added');
						// 즐겨찾기에서는 Element 삭제 해야 함
						$target.closest('.artist-item-wrap').parent().remove();
						if ($('#mycol_artistlist_wrapper .btn-artist-favorite').length == 0) {
							_self.loadMyCollectionArtist();
						}
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
		
		// VR 상세선택
		$("#mycol_vrlist_wrapper").on("click", '.pic', function(e){
			var img_id = $(e.target).data('vrId');
			g360.showVRDetail(img_id);
		});
	},
	infiniteScroll : function(page, wrapper, loader, callback) {
		var _self = this;
		this.page_info[page].search_controller = new ScrollMagic.Controller();
		this.page_info[page].search_scene = new ScrollMagic.Scene({triggerElement:'#' + loader, triggerHook:'onEnter', offset:-100}).addTo(_self.page_info[page].search_controller);
		this.page_info[page].search_scene.on('enter', function(e) {
			var $grid = $('#' + wrapper);
			var $loader = $('#' + loader);
			if (_self.page_info[page].complete) return;
			if (!$loader.hasClass('active')) {
				//console.log(page + ':loading scroll');
				$loader.addClass('active');
				callback();
			}
		});
	},
	loadMyCollectionArt : function(){
		var _self = this;
		var url = g360.root_path + "/favorite_image_list.mon?start="+_self.page_info.art.start+"&perpage="+_self.page_info.art.perpage;
		var $grid = $('#mycol_artlist_wrapper');
		var $loader = $('#mycol_artlist_loader');
		
		return $.ajax({
			url : url,
			success: function(data){
				// 배열첫번째로 totalcount값이 내려옴	
				if (data.length > 1) _self.page_info.art.start += (data.length-1);
				
				// 마지막 페이지 체크
				if ((data.length-1) < _self.page_info.art.perpage) {
					_self.page_info.art.complete = true;
				}
								
				if (data[0].totalcount == 0) {
					$grid.html('<div class="no-list"><div class="center-middle">'+g360.g_lang.Nohave_favorite1+'</div></div>');
					$loader.removeClass('active');
				} else {
					$.each(data, function(){_self._appendPictureEl($grid, this);});
					
					// 이미지 로딩이 완료되면 화면에 표시
					$grid.imagesLoaded(function(){
						$loader.removeClass('active');
						$grid.masonry('layout');
					});
				}
				_self.page_info.art.initialized = true;
			},
			error: function(){
				_self.page_info.art.initialized = true;
			}
		});
	},
	
	_appendPictureEl:function($wrapper, data_info){
		if (data_info.totalcount != undefined) return;
		var _url = g360.art_img_path(data_info.email, data_info.art_img_filename);
		var _thumb = g360.preview_img_path(data_info.email, data_info.art_img_filename);
		
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
		$figcap.append('<div class="mycol added" data-art-id="' + data_info.art_img_filename + '"></div>')
					.append('<h2>' + data_info.art_title + '</h2>')
					.append('<p>' + data_info.art_artist + '</p>')
					.append('<p class="text-muted">' + data_info.art_height + ' x ' + data_info.art_width + 'cm ' + (data_info.art_hosu != null ? '(' + data_info.art_hosu + '호)' : "" ) + '</p>');
		
		var $cost = "";
		if (typeof(data_info.opt) != "undefined" && data_info.opt == "none"){
			$cost = $('<div class="cost-area"></div>')
			.append('<h2>'+g360.g_lang.Ask_Price+'</h2>');
		}else{
			var art_price = '';
			console.log(data_info);
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
//		var $cost = $('<div class="cost-area"></div>')
//					.append('<h2>₩ ' + g360.numberComma(data_info.art_price) + '</h2>');
		
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
		$wrapper.masonry('layout');
	},
	
	loadMyCollectionArtist : function(){
		var _self = this;
		var url = g360.root_path + "/favorite_artist_list.mon?start="+_self.page_info.artist.start+"&perpage="+_self.page_info.artist.perpage;
		var $grid = $('#mycol_artistlist_wrapper');
		var $loader = $('#mycol_artistlist_loader');
		
		return $.ajax({
			url : url,
			success: function(data){
				console.log(data);
				// 배열첫번째로 totalcount값이 내려옴	
				if (data.length > 1) _self.page_info.artist.start += (data.length-1);
				
				// 마지막 페이지 체크
				if ((data.length-1) < _self.page_info.artist.perpage) {
					_self.page_info.artist.complete = true;
				}
								
				if (data[0].totalcount == 0) {
					$grid.html('<div class="no-list"><div class="center-middle">'+g360.g_lang.Nohave_favorite2+'</div></div>');
					$loader.removeClass('active');
				} else {
					$.each(data, function(){_self._appendArtistEl($grid, this);});
					
					// 이미지 로딩이 완료되면 화면에 표시
					$grid.imagesLoaded(function(){
						$loader.removeClass('active');
					});
				}
				_self.page_info.artist.initialized = true;
			},
			error: function(){
				_self.page_info.artist.initialized = true;
			}
		});
	},
	
	_appendArtistEl: function($wrapper, data_info){
		if (data_info.totalcount != undefined) return;
		
		var src_art = ''
		var src_artist = '';
		
		if (data_info.last_art_path) {
			src_art = g360.preview_img_path(data_info.photoimage, data_info.last_art_path) 
		}
		src_artist = g360.user_photo_gray_url(data_info.photoimage);
		
		// 버전 정보 추가
		src_artist += (data_info.photo_list_version ? '?open&ver=' + data_info.photo_list_version : '');
		
		var _html = ''
		+ '<div class="col-lg-4 col-sm-6">'
	    + '  <div class="artist-item-wrap">'
	    + '    <div class="pic" data-artist-id="' + data_info.photoimage + '">'
	    + '      <div class="artist-art-preview"><div class="img-cover" style="background-image:url(\'' + src_art + '\')"></div></div>'
	    + '      <div class="artist"><div class="img-cover" style="background-image:url(\'' + src_artist + '\')"></div></div>'
	    + '    </div>'
	    + '    <div class="info">'
	    + '      <h3>' + data_info.nickname + '</h3>'
	    + '      <h4>' + data_info.name_eng + '</h4>'
	    + '      <div class="like-area">'
	    + '        <span><img src="../img/icon-artist-vr-count.svg" class="icon-artist-count">' + g360.numberComma(data_info.vr_count) + '</span>'
	    + '        <span><img src="../img/icon-artist-art-count.svg" class="icon-artist-count-b">' + g360.numberComma(data_info.art_count) + '</span>'
	    + '        <span class="float-right"><div class="btn-artist-favorite added" data-artist-id="' + data_info.photoimage + '"></div></span>'
	    + '      </div>'
	    + '    </div>'
	    + '  </div>'
	    + '</div>';
		
		$wrapper.append(_html);
	},
	
	loadMyCollectionVr : function(){
		var _self = this;
		var url = g360.root_path + "/favorite_vr_list.mon?start="+_self.page_info.vr.start+"&perpage="+_self.page_info.vr.perpage;
		var $grid = $('#mycol_vrlist_wrapper');
		var $loader = $('#mycol_vrlist_loader');
		
		return $.ajax({
			url : url,
			success: function(data){
				// 배열첫번째로 totalcount값이 내려옴	
				if (data.length > 1) _self.page_info.vr.start += (data.length-1);
				
				// 마지막 페이지 체크
				if ((data.length-1) < _self.page_info.vr.perpage) {
					_self.page_info.vr.complete = true;
				}
								
				if (data[0].totalcount == 0) {
					$grid.html('<div class="no-list"><div class="center-middle">'+g360.g_lang.Nohave_favorite3+'</div></div>');
					$loader.removeClass('active');
				} else {
					$.each(data, function(){_self._appendVrEl($grid, this);});
					
					// 이미지 로딩이 완료되면 화면에 표시
					$grid.imagesLoaded(function(){
						$loader.removeClass('active');
					});
				}
				_self.page_info.vr.initialized = true;
			},
			error: function(){
				_self.page_info.vr.initialized = true;
			}
		});
	},
	
	_appendVrEl:function($wrapper, data_info){
		if (data_info.totalcount != undefined) return;
		var vr_img_src = g360.vr_img_path_new(data_info.dockey);
		var _html = ''
		+ '<div class="col-lg-4 col-md-6">'
		+ '  <div class="vr-item-wrap">'
		+ '    <div class="pic">'
		+ '        <img src="'+vr_img_src+'" data-vr-id="'+data_info.dockey+'" data-tmpl="'+data_info.templatecode+'">'
		+ '    </div>'
		+ '    <div class="info">'
		+ '      <h3>'+ g360.textToHtml(data_info.title)+'</h3>'
		+ '      <h4>'+g360.textToHtml(data_info.nickname)+'</h4>'
		+ '      <div class="like-area">'
		+ '        <span><img src="../img/icon-vr-view-count-b.svg" class="icon_vr_view-count_b"> '+g360.numberComma(data_info.read)+'</span>'
		+ '        <span><img src="../img/icon-vr-collect-count-b.svg" class="icon_vr_collect-count_b"> '+g360.numberComma(data_info.like)+'</span>'
		+ '      </div>'
		+ '    </div>'
		+ '  </div>'
		+ '</div>'; 
		
		$wrapper.append(_html);

	}
}

