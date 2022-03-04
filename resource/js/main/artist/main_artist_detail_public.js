function gArtistDetail(){
	this.top_id = 'artist';
	this.artist_art_init = false;
	this.artist_vr_init = false;
	this.page_info = {
		art : {
			start:0,
			perpage:10,
			complete:false
		},
		vr : {
			start:0,
			perpage:20,
			complete:false
		}
	};
}

gArtistDetail.prototype = {		

	"init" : function(id){
		$('#artist_pic_wrapper').css('opacity', 0);
		var _self = this;
		if (typeof(window.popup_ids) != "undefined"){
			window.popup_ids.push(this.top_id);
		}
		
		this.artist_key = id;
		this.infiniteScroll();
		this.loadArtistInfo(id);
		this._eventBind();
		
		
		// 스크롤 이벤트 관련 레이어가 펼쳐진 후 표시하기
		setTimeout(function(){
			$(window).resize();
			$('#artist_pic_wrapper').css('opacity', 1);
		}, 200);
	},
	
	"xClose" : function(){
		
		var _self = this;
		$("#detail_background").fadeOut();
		$('#detail_full_header').removeClass('active');
		$('#detail_full_popup').removeClass('pushmenu-open').empty();
		g360.hideFullBodyScroll();
		g360.showBodyScroll();
		
	},
	
	_eventBind: function(){
		var _self = this;
		// ESC 키 입력시 닫기 처리
		$(document).off('keydown.popup_full_close').on('keydown.popup_full_close', function(e){
			if (e.keyCode == 27) {
				if ($('#my_space_layer').is(':visible')) return;	// 내공간 작품걸기 레이어가 표시되고 있으면 예외처리함
				if (!$('#detail_popup').hasClass('pushmenu-open')) {
					if (window.popup_ids[window.popup_ids.length - 1] == _self.top_id) {
						_self.xClose();
						window.popup_ids.pop();
					}
				}
			}
		});
		
		// 닫기 버튼
		$('#detail_full_header').off('click').on('click', function(){
			_self.xClose();
		});
		
		// 탭 버튼
		$("#artist_tab a").on("click", function(e){
			var event_id = event.target.id;
			if ($("#"+event_id).hasClass('ov')) return;
			
			$("#artist_menu1").removeClass();
			$("#artist_menu2").removeClass();
			$("#artist_menu3").removeClass();
			
			$("#"+event_id).addClass("ov");
			
			if (event_id == "artist_menu1"){
				$("#artist_info1").show();
				$("#artist_info2").hide();
				$("#artist_info3").hide();
			}else if (event_id == "artist_menu2"){
				if (!_self.artist_art_init) {
					_self.loadArtistPicture(_self.artist_key).always(function(){
						_self.artist_art_init = true;
					});
				}
				$("#artist_info1").hide();
				$("#artist_info2").show();
				$("#artist_info3").hide();
				$('#artist_artlist_wrapper').masonry();
			}else if (event_id == "artist_menu3"){
				if (!_self.artist_vr_init) {
					_self.loadArtistVR(_self.artist_key).always(function(){
						_self.artist_vr_init = true;
					});
				}
				$("#artist_info1").hide();
				$("#artist_info2").hide();
				$("#artist_info3").show();
			}			
		});
		
		// 작품 상세보기
		$('#artist_artlist_wrapper').on('click', function(e){
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
		
		// VR상세보기
		$("#artist_info_vrlist").on("click", '.vr-thumb', function(e){
			var img_id = $(e.target).data('vrId');
			g360.showVRDetail(img_id);
		});
		
		
		
		// 스크롤 이벤트
		var artist_controller = new ScrollMagic.Controller({globalSceneOptions:{triggerHook:'onLeave', refreshInterval: 0}});

		// 작가사진 고정
		var pic_wrapper = $('#artist_pic_wrapper').get(0)
		_self.scene_1 = new ScrollMagic.Scene({triggerElement:pic_wrapper, offset:(window.innerWidth < 1200 ? -50 : -60)})
			.setPin(pic_wrapper)
			.addTo(artist_controller);

		// 메뉴 고정
		_self.scene_2 = new ScrollMagic.Scene({triggerElement:"#artist_tab", offset:(window.innerWidth < 1200 ? -50 : -60)})
			.setPin("#artist_tab")
			.addTo(artist_controller);
		
		/*
		var pic = $('.artist-pic-container').get(0);
		_self.scene_3 = new ScrollMagic.Scene({triggerElement: pic_wrapper, offset:-60})
			.setTween(pic, {y: "-10%", ease: Linear.easeNone})
		   	.addTo(artist_controller)
		   	.duration($(pic).outerHeight(true) + 50);
		*/
		
		$('#detail_full_popup').on('scroll', function(){
			_self.scene_1.refresh();
			_self.scene_2.refresh();
			//_self.scene_3.refresh();
		});
		  
		$(window).off('resize.artist').on('resize.artist', function() {
			if (_self.scene_1 && _self.scene_1.destroy) {_self.scene_1.destroy(true);}
			if (_self.scene_2 && _self.scene_2.destroy) {_self.scene_2.destroy(true);}
			//if (_self.scene_3 && _self.scene_3.destroy) {_self.scene_3.destroy(true);}
			
			if ($('#artist_pic_wrapper').length == 0) {
				$(window).off('resize.artist');
			} else {
				var pic_wrapper = $('#artist_pic_wrapper').get(0)
				_self.scene_1 = new ScrollMagic.Scene({triggerElement:pic_wrapper, offset:(window.innerWidth < 1200 ? -50 : -60)})
					.setPin(pic_wrapper)
					.addTo(artist_controller);

				// 메뉴 고정
				_self.scene_2 = new ScrollMagic.Scene({triggerElement:"#artist_tab", offset:(window.innerWidth < 1200 ? -50 : -60)})
					.setPin("#artist_tab")
					.addTo(artist_controller);
			}
		});
	},
	
	infiniteScroll:function(){
		var _self = this;
		// 작품검색 InfiniteScroll 적용
		this.search_controller = new ScrollMagic.Controller();
		this.search_scene = new ScrollMagic.Scene({triggerElement:'#artist_artlist_loader', triggerHook:'onEnter', offset:-100}).addTo(_self.search_controller);
		this.search_scene.on('enter', function(e) {
			var $grid = $('#artist_artlist_wrapper');
			var $loader = $('#artist_artlist_loader');
			//if (_self.layer_frame.get(0).style.display == 'none' ||
					//$('#deco_tab_search').get(0).style.display == 'none') return;
			if (!_self.artist_art_init || _self.page_info.art.complete) return;
			if (!$loader.hasClass('first') && !$loader.hasClass('active')) {
				$loader.addClass('active');
				_self.loadArtistPicture(_self.artist_key);
			}
		});
		
		/*
		// 검색 바 고정
		this.pin_scene = new ScrollMagic.Scene({
			triggerElement:'#art_scroll_pin_trigger', 
			triggerHook:'onLeave',
			offset:-60
		}).setPin('#art_search_input_wrapper', {spacerClass:'container container-spacer'}).addTo(_self.search_controller);
		
		$(window).off('resize.art').on('resize.art', function() {
			if (window.innerWidth < 1200) {
				_self.pin_scene.offset(-50);
			} else {
				_self.pin_scene.offset(-60);	
			}
		});
		$(window).resize();
		*/
	},
	
	// 작가 정보 불러오기
	loadArtistInfo : function(id){
		var _self = this;
		var _url = g360.root_path + '/load_artist_detail_public.mon?email='+id;
		$.ajax({
			url:_url,
			success:function(data){
				_self.cur_artist_info = data;
				_self.showArtistInfo(data);
			}
		});
	},
	showArtistInfo : function(data){
		var group, edu, career, sep;
		var src_artist = g360.user_photo_profile_gray_url(data.email);
		
		// 버전 정보 추가
		src_artist += (data.photo_profile_version ? '?open&ver=' + data.photo_profile_version : '');
		
		$('#artist_pic_wrapper').css('background-image', 'url(' + src_artist + ')');
		
		if (data.summary) {
			//$('#artist_info_pic').append('<div class="artist-summary"><h2>' + data.summary + '</h2></div>');
		}
		//$('#artist_info_name').text(data.name);
		$('#artist_info_name').text(data.nickname);
		$('#artist_info_ename').text(data.name_eng);
		$('#artist_info_birth').text(data.birth);
		$('#artist_info_content1 p').html(g360.TextToHtml(data.content));
		if (data.content2) {
			$('#artist_info_content2 p').html(g360.TextToHtml(data.content2));
		} else {
			$('#artist_info_content2').hide();
		}
		
		
		// 소속 및 단체
		group = '', sep = '';
		$.each(data.group, function(){
			group += sep;
			group += this.title;
			group += this.dept ? ' ' + this.dept : '';
			group += this.jobtitle ? ' ' + this.jobtitle : '';
			sep = '\n';
		});
		if (group == '') {group = '정보없음'};
		$('#artist_info_group p').html(g360.TextToHtml(group));
		
		// 학력
		edu = '', sep = '';
		$.each(data.education, function(){
			edu += sep;
			edu += this.end + '  ';
			edu += this.schoolname;
			edu += this.major ? '  ' + this.major : '';
			edu += this.level ? '  ' + this.level : '';
			edu += this.status;
			sep = '\n';
		});
		if (edu == '') {edu = '정보없음'};
		$('#artist_info_education p').html(g360.TextToHtml(edu));
		
		// 경력
		career = '', sep = '';
		if (!data.career) {
			career = '정보없음'
		} else {
			career = '<table class="artist-career-table">';
			career += '<colgroup><col style="width:$width$px;" /><col style="width:auto;" /></colgroup>';
			$.each(data.career, function(){
				career += '<tr>';
				career += '<td style="width:80px">' + this.term + '</td>';
			//	career += '<td>' + g360.escapeHTML(this.title) + '</td>';
				career += '<td>' + g360.TextToHtml(this.title) + '</td>';
				career += '</tr>';
				if (this.term) sep = 'T';
			});
			career += '</table>';
			career = career.replace(/\$width\$/g, (sep == 'T' ? '40' : '0'));
		};
		//$('#artist_info_career p').html(g360.escapeHTML(career).replace(/  /g, '&nbsp;&nbsp;'));
		$('#artist_info_career p').html(g360.TextToHtml(career));
		
		// 소장처 정보
		cert = '', sep = '';
		if (!data.cert) {
			cert = '정보없음'
		} else {
			cert = '<table class="artist-career-table">';
			cert += '<colgroup><col style="width:$width$px;" /><col style="width:auto;" /></colgroup>';
			$.each(data.cert, function(){
				cert += '<tr>';
			//	cert += '<td style="width:80px">' + this.term + '</td>';
			//	career += '<td>' + g360.escapeHTML(this.title) + '</td>';
				cert += '<td>' + g360.TextToHtml(this.certname) + '</td>';
				cert += '</tr>';
				if (this.term) sep = 'T';
			});
			cert += '</table>';
			cert = cert.replace(/\$width\$/g, (sep == 'T' ? '40' : '0'));
		};
		
		//$('#artist_info_career p').html(g360.escapeHTML(career).replace(/  /g, '&nbsp;&nbsp;'));
		$('#artist_info_cert p').html(g360.TextToHtml(cert));
		
		// 전시 및 프로젝트 경력
		display = '', sep = '';
		if (!data.display) {
			display = '정보없음'
		} else {
			display = '<table class="artist-career-table">';
			display += '<colgroup><col style="width:$width$px;" /><col style="width:auto;" /></colgroup>';
			$.each(data.display, function(){
				display += '<tr>';
				display += '<td style="width:80px">' + this.term + '</td>';
			//	career += '<td>' + g360.escapeHTML(this.title) + '</td>';
				display += '<td>' + g360.TextToHtml(this.title) + '</td>';
				display += '</tr>';
				if (this.term) sep = 'T';
			});
			display += '</table>';
			display = display.replace(/\$width\$/g, (sep == 'T' ? '40' : '0'));
		};
		//$('#artist_info_career p').html(g360.escapeHTML(career).replace(/  /g, '&nbsp;&nbsp;'));
		$('#artist_info_display p').html(g360.TextToHtml(display));
		
		
		
		
	},
	
	// 작품 불러오기
	loadArtistPicture : function(email){
		var _self = this;
		var url = g360.root_path + "/load_image_for_artist.mon?start=" + _self.page_info.art.start + "&perpage=" + _self.page_info.art.perpage + "&email=" + email;
		return $.ajax({
			url : url,
			success : function(data){
				// 배열첫번째로 totalcount값이 내려옴
				if (data.length > 1) _self.page_info.art.start += (data.length-1);
				
				// 마지막 페이지 체크
				if ((data.length-1) < _self.page_info.art.perpage) {
					_self.page_info.art.complete = true;
				}
				
				/*
				// 카운트 셋팅
				$('#art_list_loading_cnt').html(g360.numberComma(_self.page_info.search.start));
				$('#art_list_total_cnt').html(g360.numberComma(data[0].totalcount));
				
				if (data[0].totalcount == 0) {
					$('#art_list_nothing_text').text('검색된 작품이 없습니다');
				} else {
					$('#art_list_nothing_text').text('');
				}
				*/
				
				
				var $grid = $('#artist_artlist_wrapper');
				var $loader = $('#artist_artlist_loader');
				
				if (data[0].totalcount == 0) {
					$grid.html('<div class="no-list"><div class="center-middle">판매중인 작품이 없습니다.</div></div>');
				}
				
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
			},
			error : function(e){				
				console.log("작가의 다른작품 데이터 처리중 오류가 발생하였습니다.");
			}
		});
		
	},
	_appendPictureEl:function($wrapper, data_info){
		if (data_info.totalcount != undefined) return;
		var _url = g360.art_img_path(data_info.email, data_info.art_img_filename);
		var _thumb = g360.preview_img_path(data_info.email, data_info.art_img_filename);
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
					.append('<p class="text-muted">' + data_info.art_height + ' x ' + data_info.art_width + 'cm ' + (data_info.art_hosu != null ? '(' + data_info.art_hosu + '호)' : "" ) + '</p>');
			
		var $cost = $('<div class="cost-area"></div>')
					.append('<h2>₩ ' + g360.numberComma(data_info.art_price) + '</h2>');
		
		// 아이콘 표시
		var $icon = $('<div class="icon-area"></div>');
		if (data_info.status == '3') {	// 판매완료
			//$fig.append('<div class="soldout-marking" title="원화 판매완료"></div>');
		} else {
			$icon.append('<span><img src="../img/icon-artwork-original.svg" class="icon_artwork_original" title="원화구매 가능"></span>');
		}
		$icon.append('<span><img src="../img/icon-artwork-image.svg" class="icon_artwork_image" title="이미지구매 가능"></span>');		
		if (data_info.vrinfo) {
			$icon.append('<span><img src="../img/icon-artwork-vr.svg" class="icon_artwork_vr" title="VR감상 가능"></span>');
		}
		$cost.append($icon);
				
		$fig.append($img).append($figcap).append($cost).appendTo($div);
		
		$wrapper.append($div).masonry('appended', $div);
	},
	
	loadArtistVR : function(email){
		var _self = this;
		var _url = g360.root_path + '/load_VRRoom_public.mon?start=' + _self.page_info.vr.start + '&perpage=' + _self.page_info.vr.perpage + '&ty=artist&artist=' + email;
		return $.ajax({
			url: _url,
			success: function(data){
				var $list = $('#artist_info_vrlist');
				if (data.length > 1) {
					$.each(data, function(){
						if (this.totalcount) return true;
						var vr_img_src = g360.vr_img_path_new(this.dockey);
						var _html = '' 
			            + '<div class="col-md-6 mb-4">'
			            + '  <div class="rec-pic-area">'
			            
			            + '    <div class="vr-thumb-wrapper">'
				        + '      <img class="vr-thumb" src="'+vr_img_src+'" data-vr-id="'+this.dockey+'" data-tmpl="'+this.templatecode+'">'
				        + '      <div class="info-main-area">'
				        + '        <h2>'+this.title+'</h2>'
				        + '        <p>'+this.nickname+'</p>'
				        + '        <div class="port-bottom">'
				        + '          <span class="count">'
				        + '            <img src="../img/icon-vr-view-count-w.png" class="icon_vr_view-count"> '+g360.numberComma(this.read)
				        + '          </span>'
				        + '          <span class="count">'
				        + '            <img src="../img/icon-vr-my-collection.png" class="icon_vr_my-collection"> '+g360.numberComma(this.like)
				        + '          </span>'
				        + '        </div>'
				        + '      </div>'
				        + '    </div>'
				        
				        + '  </div>'
				        + '</div>';
						$list.append(_html);
					});
				} else {
					// 등록된 VR갤러리가 없습니다
					var _html = '<div class="no-list"><div class="center-middle">'+g360.g_lang.No_VR_Onging+'</div></div>';
					$list.append(_html);
				}
				
				
			},
			error: function(){
				g360.error_alert();
			}
		});
	}
}

