
function gVrGalleryDetail(){
	this.other_cnt = 20;
	this.cur_vr_info = null;
	this.curid = "";
}

gVrGalleryDetail.prototype = {		

	"init" : function(id){
		
		//언어처리
		$(".g_lang_VR_Copyright").html(g360.g_lang.VR_Copyright);
		$(".g_lang_Posted_date").html(g360.g_lang.Posted_date);
		
		
		$("#art_zoom_wrapper .zoom-title").html(g360.g_lang.Zoom_In_Out);
		
		var _self = this;
		$('#detail_popup').scrollTop(0);
		this.cur_vr_info = id;
		
		this.loadVRInfo(id);
		this._eventBind();

		// 구글 통계 데이터 생성
		var link_path = g360.getLinkPath('link_vr', id);
		gtag('config', window.gtagkey, {'page_location':link_path});
	},
	
	"xClose" : function(){
		var _self = this;
		
		g360.isPopupVROpen = "F";
		
		$("#detail_background").fadeOut();
		$('#mobile_detail_back').hide();
		$('#detail_popup').removeClass('pushmenu-open').empty();
		g360.showBodyScroll();
		g360.offsound_bg();
		document.title = g360.main_title;
	},
	
	_eventBind : function(){
		var _self = this;
		
		$('#detail_btn_close').on('click', function(){
			_self.xClose();
		});
		
		// ESC 키 입력시 닫기 처리
		$(document).off('keydown.popup_close').on('keydown.popup_close', function(e){
			if (e.keyCode == 27) {
				// VR팝업을 띄워놓은 경우
				if ($('#vr_popup').is(':visible')) {
					g360.vr_popup_close();
				} else if ($('#art_zoom_wrapper').is(':visible')) {
					$('#btn_art_zoom_close').click();
				} else {
					if ($('#detail_background').hasClass('zoom')) return;
					_self.xClose();
				}
			}
		});
		
		
		$("#vr_detail_favo").on("click", function(){
			if ( $("#vr_detail_favo").hasClass('on') ) return;
			if (g360.login_check()){
				var url = g360.root_path + "/vrgallery_like_count_add.mon?key=" + gVRD.cur_vr_info.dockey;
				url += "&" + new Date().getTime();
				$.ajax({
					type : "GET",
					dataType : "json",
					contentType : "application/json; charset=utf-8",
					url : url,
					success : function(data){
						if (data.result == 'OK') {
							var pre_count = $("#detail_vr_cnt_favo").text();
							var count = parseInt(pre_count) + 1;
							$("#detail_vr_cnt_favo").text(count);
							$("#vr_detail_favo").addClass('on');
							
							// 바깥 영역 레이어 카운트 업데이트
							$('.vr-thumb[data-vr-id="' + gVRD.cur_vr_info.dockey + '"]').next('.info-main-area').find('.like-count').text(count);
							$('.pic img[data-vr-id="' + gVRD.cur_vr_info.dockey + '"]').closest('.vr-item-wrap').find('.like-count').text(count);
						} else if (data.result == 'DOUBLE') {
							$("#vr_detail_favo").addClass('on');
						} else {
							
						}
					},
					error : function(e){
						g360.error_alert();
					}
				});
			} else {
				g360.login_window_max();
				$("#p_login").click();
				return;
			}
		});
		
		
		// 레이어 닫기
		$('#detail_background').off('click').on('click', function() {
			if ($(this).hasClass('zoom')) return;
			_self.xClose();
		});
		
		// 모바일 뒤로가기 버튼
		$('#mobile_detail_back').off('click').on('click', function(){
			_self.xClose();
			$(this).hide();
		});
		
		// 즐겨찾기 버튼
		$('#detail_vr_btn_favo').on('click', function(){
			var _is_del = $(this).hasClass('added') ? true : false;			
			g360.setVRCollection(_self.cur_vr_info.dockey, _is_del, function(data){
				if (data.result == 'OK') {
					_self.checkVRCollection(!_is_del);
				} else {
					g360.error_alert();
					console.log('Error', data);
				}
			});
		});
		
		// 판매자 정보 상세 보기
		$('#detail_vr_artist_pic, .midea-body').on('click', function(e){
			_self.xClose();
			g360.showArtistDetail(_self.cur_vr_info.email);			
		});
		
		// 판매자의 다른 VR 클릭
		$('#detail_vr_list_slider').on('click', function(e){
			if ($(e.target).hasClass('vr-thumb-wrapper') || $(e.target).closest('.vr-thumb-wrapper').length) {
				var $img = $(e.target).closest('.vr-thumb-wrapper').find('.vr-thumb');
				var img_id = $img.data('vrId');
				g360.offsound_bg();
				g360.showVRDetail(img_id);
			}
		});
		
		// 판매자 다른 작품 클릭
		$('#detail_art_other').on('click', '.other-art', function(){
			var img_id = $(this).find('.preview').data('artId');
			g360.offsound_bg();
			g360.showArtDetail(img_id);
		});
	},
	
	loadVRInfo: function(id){
		var _self = this;
		var _url = g360.root_path + '/load_VRRoom_public_one.mon?dockey='+id;
		$.ajax({
			url:_url,
			success:function(data){
				_self.cur_vr_info = data;
				_self.showVRInfo(data);

				// 다른작품
				_self.loadVROtherList(data.email);
				_self.getArtistPicture(data.email);
			}
		});
	},
	showVRInfo: function(data){
		// 카운트 수 증가
		this.addViewCount(data.dockey);
		// VR 미리보기
		//var url = "/vr/template_sample/" + data.templatecode + "/gallery360.jsp?key="+data.dockey+"&category="+data.templatecode+"&height=100%";
		
		var url = g360.root_path + "/main/vr_gallery/gallery360.jsp?key=" + data.dockey +"&height=100%";
		
		var src_artist = g360.user_photo_url(data.email);
		
		// 버전 정보 추가
		src_artist += '?open&ver=' + (new Date()).getTime();
		
				
		setTimeout(function(){g360.LoadPage("detail_vr_preview", url);}, 500);
		
		var reg_date = data.sortdate.substring(0,4) + '.' + data.sortdate.substring(4,6) + '.' + data.sortdate.substring(6,8);  
		$('#detail_vr_title').prepend(g360.TextToHtml(data.title));
		$('#detail_vr_cnt_view').text(g360.numberComma(data.read));
		$('#detail_vr_cnt_favo').text(g360.numberComma(data.like));
		$('#detail_vr_reg_date').text(reg_date);
		if (data.myfavorite == 'T') {
			this.checkVRCollection(true);
		}
		$('#detail_vr_express').html(g360.TextToHtml(data.express));
		$('#detail_vr_artist_pic').append('<img src="'+src_artist+'">');
		$('#detail_vr_artist_info strong').text(g360.TextToHtml(data.nickname));
		$('#detail_vr_artist_info div').text(data.gubun == 'art' ? g360.g_lang.Artist : g360.g_lang.Art_consultant);
		$('#detail_vr_nickname').text(g360.TextToHtml(data.nickname) + g360.g_lang.s_VRGallery);
		$('#detail_art_nickname').text(g360.TextToHtml(data.nickname) + g360.g_lang.s_Artworks);
		//console.log(g360.g360.g_lang.s_VRGallery)
		
		// 공유하기
		$('#btn_vr_link').on('click', function(){
			var link_path = g360.getLinkPath('link_vr', data.dockey);
			g360.copyToClipboard(link_path);
		});
	},
	addViewCount:function(dockey){
		var _url = '/vrgallery_read_count_add.mon?key='+dockey;
		$.ajax({url: _url});
	},
	checkVRCollection:function(_is_added){
		var _self = this;
		var _btn = $('#detail_vr_btn_favo');
		$(_btn)[_is_added ? 'addClass' : 'removeClass']('added');
	},
	loadVROtherList: function(key){
		var _self = this;
		var _url = g360.root_path + '/load_VRRoom_public.mon?start=0&perpage=10&ty=artist&artist=' + key;
		$.ajax({
			url: _url,
			success: function(data){
				_self.showVROtherList(data);
			},
			error: function(){
				g360.error_alert();
			}
		});
	},
	showVROtherList:function(data){
		var $list = $('#detail_vr_list_slider');
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
	        + '            <h2>'+this.title+'</h2>'
	        + '            <p>'+this.nickname+'</p>'
	        + '            <div class="port-bottom">'
	        + '              <span class="count">'
	        + '                <img src="../img/icon-vr-view-count-w.png" class="icon_vr_view-count"> '+g360.numberComma(this.read)
	        + '              </span>'
	        + '              <span class="count">'
	        + '                <img src="../img/icon-vr-my-collection.png" class="icon_vr_my-collection">'+g360.numberComma(this.like)
	        + '              </span>'
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
			//loop: true,
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
					nav: false
				}
			}
		});
	},
	getArtistPicture: function(email){
		var _self = this;
		var url = g360.root_path + "/load_image_for_artist.mon?start=" + 0 + "&perpage=" + _self.other_cnt + "&email=" + email;
		return $.ajax({
			url : url,
			success : function(data){
				if ($.isArray(data)) {
					_self.drawArtistPicture(data);
				} else {
					return;
				}
			},
			error : function(e){
				//console.log("작가의 다른작품 데이터 처리중 오류가 발생하였습니다.");
				alert(g360.g_lang.Error_Alert1);
			}
		})
	},
	drawArtistPicture: function(data){
		var _self = this;
		var _cnt = 0;		
		var $wrapper = $('#detail_art_other');
		$.each(data, function(idx, val){
			if (this.totalcount != undefined) return true;
			var _thumb = g360.preview_img_path(this.email, this.art_img_filename);
			_thumb = _thumb + "?open&ver="+this.version;
			//var _thumb = g360.thumbnail_img_path(this.email, this.art_img_filename);
			var _s = this.file_width > this.file_height ? 'height' : 'width';
			var _title = this.art_title.replace(/[\t\r\n\\"']/g, '');
			var _html = '<div class="other-art"><div class="inner-a"><div class="inner-b">' +
							'<img src="' + _thumb + '" class="preview" style="' + _s + ':100%;" title="' +_title+ '" data-art-id="' + this.art_img_filename + '">' +
							'<p>' + _title + '</p>' +
						'</div></div></div>';
			$wrapper.append(_html);
		});
	}
}

