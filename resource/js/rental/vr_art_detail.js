
function gVrArtDetail(){
	this.wrapper = $('#curie_detail_wrapper');
}

gVrArtDetail.prototype = {		

	"init" : function(id){
		var _self = this;
		this.getArtInfo(id).always(function(){
			_self.eventBind();
		});
	},
	
	"getArtInfo" : function(id){
		var _self = this;
		return $.ajax({
			url: g360.root_path + '/select_art_info_rental.mon?dockey=' + id,
			success: function(data){
				if (!data.dockey) {
					$('#nodetail_section').show();
					return;
				} else {
					$('#detail_section').show();
				}
				_self.cur_art_info = data;
				_self.drawArtInfo(data);
			} 
		});
	},
	"eventBind" : function(){
		var _self = this;
		
		// 음성 플레이
		_self.wrapper.find('.btn_sound').on('click', function(){
			if ($(this).hasClass('on')) {
				_self.audio.pause();
				if (g360.time_interval) clearInterval(g360.time_interval);
			} else {
				if (_self.audio.play) {
					top.g360.offsound_bg();
					_self.audio.play();
					_self.getAudioTime();
					g360.time_interval = setInterval(function(){_self.getAudioTime();}, 1000);
				} else {
					g360.gAlert("Error","지원되지 않는 브라우져입니다", "red", "left");
					return;
				}
			}
			$(this).toggleClass('on');
		});
		
		// 동영상 플레이
		_self.wrapper.find('.btn_video').on('click', function(){
			// 오디오 재생중이면 중지
			_self.stopAudio();
			
			var _email = _self.cur_art_info.art_mp4_filename.substring(0, _self.cur_art_info.art_mp4_filename.lastIndexOf('_'));
			var video_src = "https://www.gallery360.co.kr" + g360.video_path(_email, _self.cur_art_info.art_mp4_filename);
			
			g360.showVideo(video_src);
		});
		
		// 유튜브 플레이
		_self.wrapper.find('.btn_youtube').on('click', function(){
			// 오디오 재생중이면 중지
			_self.stopAudio();
			
			var src = _self.cur_art_info.art_yutube.replace(/youtu.be/g, 'www.youtube.com/embed');
			g360.showYoutube(src);
		});
		
		
		//작품 설명
		_self.wrapper.find('.view_slider').owlCarousel({
			items : 1,
			dots : true,
			mouseDrag : true,
			touchDrag : true,
			smartSpeed : 200,
			margin : 20,
			autoHeight: true
		});
		_self.wrapper.find('.view_slider').on('changed.owl.carousel', function(e){
			_self.wrapper.find('.curie_view_tab li').removeClass('on');
			_self.wrapper.find('.curie_view_tab li:eq(' + e.page.index + ')').addClass('on');
		});
		_self.wrapper.find('.curie_view_tab li').click(function(){
			_self.wrapper.find('.view_slider').trigger('to.owl.carousel', $(this).index());
		});
		
		// 작품 설명 스크롤
		$('.curie .view_slider .owl-item').mCustomScrollbar({				
			theme:"minimal-dark",
			mouseWheel:{ scrollAmount: 80 },

			//mouseWheel:{ preventDefault: false },
         	advanced:{
         		updateOnContentResize: true
         	}      
		});
		
		
		// 장바구니 --> 즐겨찾기 기능으로 변경(20.3.3)
		_self.wrapper.find('.btn_curie_buy').on('click', function(){
			//_self.saveCart();
			g360.setMyCollectionFromVRDetail(_self.cur_art_info.dockey, false, function(data){
				if (data.result == 'OK') {
					_self.showToastMsg('즐겨찾기에 추가되었습니다');
				} else {
					_self.showToastMsg('오류가 발생했습니다');
				}
			});
			return false;
		});
				
		// 확대보기
		$('#detail_art_btn_zoom').off('click').on('click', function(){
			$('#detail_background').addClass('zoom');
			$('#art_zoom_detail').empty();
			$('#art_zoom_wrapper').show();
			
			var img_url = g360.domain  + '/artimage/' + _self.cur_art_info.email + '/art/watermark/' + _self.cur_art_info.art_img_filename + '.jpg';
			
			var overlay = $('#art_zoom_detail'),
				loading = $('<img src="/img/BI_loading-2.gif" class="detail-loading">'),
				$panzoom = $('<img src="' + img_url + '" style="max-width:100%;">'),
				$range = $("#art_zoom_header .zoom-range");
				
			
			function init_panzoom() {
		        $panzoom.panzoom({
		        	$zoomRange: $range,
		            cursor: 'pointer',
		            startTransform: 'scale(1.7)',
		            minScale: 0.5,
		            maxScale: 3,
		            increment: 0.1,
		            rangeStep: 0.1
		        });
		        $panzoom.on('panzoompan', position_correction);
		        $panzoom.on('panzoomzoom', position_correction);
		        
		        
		        $(window).off('resize.panzoom_resize').on('resize.panzoom_resize', function() {
		            $panzoom.css('margin-top', parseInt((overlay.innerHeight() - $panzoom.outerHeight()) / 2, 10));
		            position_correction();
		        });
		        
		        
		        overlay.on('mousewheel', function(e) {
		            e.preventDefault();
		            var delta = e.delta || e.originalEvent.wheelDelta;
		            var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
		            $panzoom.panzoom('zoom', zoomOut);
		        });
		        
		    }
		    function position_correction() {
		        var pp = $panzoom.parent(), 
		        	p_h = pp.innerHeight(), 
		        	p_w = pp.innerWidth(), 
		        	m = $panzoom.panzoom('getMatrix'), 
		        	r = m[0], 
		        	x = m[4], 
		        	y = m[5], 
		        	h = $panzoom.height() * r, 
		        	w = $panzoom.width() * r, 
		        	t_x, 
		        	t_y;
		        if (w <= p_w) {
		            x = 0;
		        } else {
		            t_x = parseInt((w - p_w) / 2, 10);
		            if (x < -t_x) {
		                x = -t_x;
		            } else if (x > t_x) {
		                x = t_x;
		            }
		        }
		        if (h <= p_h) {
		            y = 0;
		        } else {
		            t_y = parseInt((h - p_h) / 2, 10);
		            if (y < -t_y) {
		                y = -t_y;
		            } else if (y > t_y) {
		                y = t_y;
		            }
		        }
		        $panzoom.panzoom('pan', x, y, {
		            silent: true
		        });
		    }
		    $range.hide();
		    overlay.append(loading);
		    $panzoom.css('opacity', '0');
		    $panzoom.css('transform', 'none').appendTo(overlay);
		    
		    // 구현부
		    $panzoom.on('load', function() {
		    	loading.remove();
		    	$range.show();
		    	$panzoom.css('margin-top', parseInt((overlay.innerHeight() - $panzoom.outerHeight()) / 2, 10));
		    	$panzoom.css('opacity', '1');
		    	init_panzoom();
		    });
		    $panzoom.on('error', function(){
		    	var $nothing = $('<div>상세이미지가 없습니다</div>');
		    	$nothing.css({
		    		'position': 'absolute',
		    		'top': '50%',
		    		'left': '50%',
		    		'transform': 'translate(-50%, -50%)',
		    		'color': '#fff',
		    		'font-size': '22px'
		    	});
		    	loading.remove();
		    	overlay.append($nothing);
		    });
		    
		    $(document).off('touchmove.zoom').on('touchmove.zoom', function(e) {});
		    
			return false;
		});
		
		$('#btn_art_zoom_close').off('click').on('click', function(){
			$('#detail_background').removeClass('zoom');
			$('#art_zoom_wrapper').hide();
			$('#art_zoom_detail').empty();
			$(window).off('resize.panzoom_resize');
			$(document).off('touchmove.zoom');
		});
		
		$('#art_preview, #art_preview_m').on('click', function(){
			$('#detail_art_btn_zoom').click();
		});
		$(window).off('resize.detail.art.preview').on('resize.detail.art.preview', function(){
			setTimeout(function(){
				var $more = $('#detail_art_btn_zoom');
				var $img = $('#art_preview');
								
				// 돋보기 위치 지정
				var more_top = $img.position().top + $img.height() - $more.height();
				var more_left = $img.position().left + $img.width() - $more.width();
				$more.css('top', more_top);
				$more.css('left', more_left);
				$more.show();
			}, 300);
		});
		
		$(document).off('keydown.detail.popup_close').on('keydown.detail.popup_close', function(e){
			if (e.keyCode == 27) {
				if ($('#art_zoom_wrapper').is(':visible')) {
					$('#btn_art_zoom_close').click();
				}
			}
		});
		
		$('.zoom-title').on('click', function(){
			$('#btn_art_zoom_close').click();
		});
		
	},
	"drawArtInfo" : function(data){
		var _self = this;
		var img_src = g360.preview_img_path(data.email, data.dockey);
		var size = "";
		if (data.art_hosu == null){
			var size = data.art_height + ' x ' + data.art_width + 'cm';
		}else{
			var size = data.art_height + ' x ' + data.art_width + 'cm(' + data.art_hosu + '호)';
		}
		
		
		if (data.art_mp3_filename) {
			_self.wrapper.find('.remain-time').text('');
			_self.wrapper.find('.btn_sound').show();
		
			var _email = data.art_mp3_filename.substring(0, data.art_mp3_filename.lastIndexOf('_'));
			var audio_src = "https://www.gallery360.co.kr" + g360.audio_path(_email, data.art_mp3_filename);
			var $audio = $('<audio></audio>');
			$audio.attr('src', audio_src);
			
			_self.wrapper.find('.btn_sound').append($audio);
			_self.audio = $audio.get(0);
			
			// 종료시 이벤트
			$audio.on('ended', function(){
				if (g360.time_interval) clearInterval(g360.time_interval);
				$('#curie_art_mp3').removeClass('on');
				_self.wrapper.find('.remain-time').text('');
			});
			
		}
		if (data.art_mp4_filename) {
			_self.wrapper.find('.btn_video').show();			
		}
		if (data.art_yutube) {
			_self.wrapper.find('.btn_youtube').show();
		}
		
		
		_self.wrapper.find('#vr_detail_info_title').text(g360.TextToHtml(data.art_title));
		_self.wrapper.find('#vr_detail_info_title').append('<span>' + g360.TextToHtml(data.nickname) + '&nbsp;&nbsp;|&nbsp;&nbsp;' + size + '</span>');
		_self.wrapper.find('.curie_view_info:eq(0)').html(g360.TextToHtml(data.art_express));
		_self.wrapper.find('.curie_view_info:eq(1)').html(g360.TextToHtml(data.art_curator_express));
		_self.wrapper.find('#art_preview, #art_preview_m').attr('src', img_src);
		
		_self.wrapper.find('.curie_img').imagesLoaded(function(){
			var $img = $('#art_preview');			
			var $more = $('#detail_art_btn_zoom');
			
			// 돋보기 위치 지정
			var more_top = $img.position().top + $img.height() - $more.height();
			var more_left = $img.position().left + $img.width() - $more.width();
			$more.css('top', more_top);
			$more.css('left', more_left);
			$more.show();
		});
	},
	"stopAudio" : function(){
		var _self = this;
		if (_self.wrapper.find('.btn_sound').hasClass('on')) {
			_self.audio.pause();
			if (g360.time_interval) clearInterval(g360.time_interval);
			_self.wrapper.find('.btn_sound').removeClass('on');
		}
	},
	"getAudioTime": function(){
		var _self = this;
		var total = parseInt(_self.audio.duration);
		var remain = _self.audio.duration - _self.audio.currentTime;
		remain = parseInt(remain);
		var m = parseInt(remain / 60);
		var s = remain - m * 60;
		
		_self.wrapper.find('.remain-time').text('- ' + m + ':' + (s < 10 ?'0'+s:s));
	},
	"saveCart":function(){
		var _self = this;
		
		if (g360.login_check()){
			if (_self.cur_art_info.status == '3') {
				_self.showToastMsg('구매가 불가능한 상품입니다');
				return;
			}
			
			if (g360.UserInfo.gubun != "normal"){
				_self.showToastMsg('작품 구매는 일반사용자 계정만 가능합니다');
				return;
			}	
			
			var sales_type = 'art';
					
			var cur_item = _self.cur_art_info;
			var url = g360.root_path + "/save_cart.mon";
			var cart = new Object();
			cart.unique_key = cur_item.dockey;
			cart.email = top.g360.UserInfo.email;
			cart.title = cur_item.art_title;
			cart.artist = cur_item.art_artist;
			cart.height = cur_item.art_height;
			cart.width = cur_item.art_width;
			cart.hosu = cur_item.art_hosu;
			cart.price = cur_item.art_price;
			
			cart.shipping_fee = cur_item.shipping_fee;
			cart.artist_email = cur_item.email;
			
			cart.sales_type = sales_type;
					
			
			var data = JSON.stringify(cart);
			$.ajax({
				type : "POST",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				data : data,
				url : url,
				success : function(res){
					if (res.result == "OK"){
						_self.showToastMsg('장바구니에 담겼습니다');
					}else{
						_self.showToastMsg('오류가 발생했습니다');
					}
					
				},
				error : function(e){
					_self.showToastMsg('저장중 오류가 발생했습니다');
				}
			})
		
		}else{
			_self.showToastMsg('로그인이 필요합니다');
		}
	},
	
	"showToastMsg":function(msg){
		var _self = this;
		
		var $msg = $('.toast-msg-wrapper');
		
		// 기존에 떠 있는 경우 삭제처리
		if ($msg.length) $msg.remove();
		
		
		$msg = $('<div class="toast-msg-wrapper"></div>');
		$msg.text(msg);
		$('body').append($msg);
		
		$msg.fadeIn();
		setTimeout(function(){
			$msg.fadeOut();
		}, 2000);
	}
}

