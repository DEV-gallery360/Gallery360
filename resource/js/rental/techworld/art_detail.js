function ArtDetail(){
	this.wrapper = $('#art_detail_wrapper');
	this.cur_id = '';
	this.cur_art_data = null;
	this.audio = null;
	this.is_vr = false; // VR화면에서 열었는지 여부
	this.use_3d = false;
	this.use_fyuse = false;
	this.use_img = true;
}

ArtDetail.prototype = {
	"init" : function(id, is_vr){
		var _self = this;
		_self.cur_id = id;
		
		this.getArtInfo(id).always(function(){
			_self.eventBind();
		});
		
		// VR에서 작품상세 오픈했는지 여부
		if (is_vr) {
			_self.is_vr = true;
			$('body').addClass('vr-detail');
			
			// VR 작품상세는 iframe에서 띄워지므로 이벤트 바인드를 새로 한다
			$('#review_all_layer').on('click', function(){
				$('#review_all_layer').hide();
				$('#review_all_list').cubeportfolio('destroy');
			});
		}
		
		g360.history_record_rental("art_detail_header");
	},
	"getArtInfo" : function(id){		
		var _self = this;
		return $.ajax({
			url: '/select_art_info_rental.mon?dockey=' + id,
			success: function(data){
				_self.cur_art_info = data;
				
				_self.drawArtInfo(data);
				
				/*
				var _tmp = $('<div></div>')
							.data('url', g360.preview_img_path(data.email, data.art_img_filename))
							.data('width', parseInt(data.art_width) * 10)
							.data('height', parseInt(data.art_height) * 10);
				*/
				//setTimeout(function(){_self._selectPicture(_tmp);}, 200);
			} 
		});
	},
	"hideArtDetail" : function(){
		var _self = this;
		$('#art_detail_layer').hide();
		if (g360.time_interval) clearInterval(g360.time_interval);
		_self.wrapper.empty();
		$('body').removeClass('overflow-hidden');
		
		// Fyuse 사용하는 경우 메모리 클리어 (전역 변수 처리)
		if (_self.use_fyuse) {
			FYU.removeAll();
		}
		
		$(window).off('resize.3d_check');
	},
	"eventBind" : function(){
		var _self = this;
		
		// 헤더 이벤트 처리
		$('#art_detail_header').off().on('click', function(){
			_self.hideArtDetail();
		});
		
		// 확대보기
		if (_self.use_img) {
			$('.curie_img img').on('click', function(){
				
				$('.blockui').addClass('opacity-9').show();
				
				var mz = g360.maxZindex();
				//var popup_index = parseInt($('#detail_popup').css('z-index'));
				//$('#detail_background').addClass('zoom').css('z-index', popup_index+1);
				$('#art_zoom_detail').empty();
				$('#art_zoom_wrapper').css('z-index', mz+1).show();
				
				var img_url = '/artimage/' + _self.cur_art_info.email + '/art/' + _self.cur_art_info.dockey;
				img_url += '?open&ver=' + _self.cur_art_info.version;
				
				
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
				//$('body').addClass('overflow-hidden');
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
				
				g360.history_record_rental("btn_art_zoom_close");
				return false;
			});
		}
		
		
		$('#btn_art_zoom_close').off('click').on('click', function(){
			$('.blockui').removeClass('opacity-9').hide();
			//$('body').removeClass('overflow-hidden');
			$('#art_zoom_wrapper').hide();
			$('#art_zoom_detail').empty();
			$(window).off('resize.panzoom_resize');
			$(document).off('touchmove.zoom');
		});
		
		if (_self.is_vr) {
			$('.zoom-title').on('click', function(){
				$('#btn_art_zoom_close').click();
			});
		}
		
		// ArtImgage
		_self.wrapper.find('.btn_artimg').on('click', function(){
			if ($(this).hasClass('on')) return;
			$('.curie_img img').show();
			$('#art3d_layer').hide();
			$('#fyuse_layer').hide();
			$('.curie_view').removeClass('art-3d');
			$(this).addClass('on');
			_self.wrapper.find('.btn_3d').removeClass('on');
			_self.wrapper.find('.btn_fyuse').removeClass('on');
		});
		
		// 3D
		_self.wrapper.find('.btn_3d').on('click', function(){
			if ($(this).hasClass('on')) return;
			if ($('#art3d_layer iframe').attr('src') == '') {
				// 부드러운 화면전환을 위해 setTimeout 설정
				setTimeout(function(){$('#art3d_layer iframe').attr('src', _self.d3_url);}, 500);
			}
			$('.curie_img img').hide();
			$('#art3d_layer').show();
			$('#fyuse_layer').hide();
			$('.curie_view').addClass('art-3d');
			$(this).addClass('on');
			_self.wrapper.find('.btn_artimg').removeClass('on');
			_self.wrapper.find('.btn_fyuse').removeClass('on');
		});
		
		// Fyuse
		_self.wrapper.find('.btn_fyuse').on('click', function(){
			if ($(this).hasClass('on')) return;
			$('.curie_img img').hide();
			$('#art3d_layer').hide();
			$('#fyuse_layer').show();
			$('.curie_view').removeClass('art-3d');
			// 퓨즈가 셋팅 안되어 있으면 셋팅
			if ($('#fyuse_layer').find('.fy_wrppr').length == 0) {
				FYU.add(_self.fyuse_id, "fyuse_layer", {
					intro: 2,	//0:표시 안함, 1:중앙, 2:하단
					nologo: 1,	//0:Fyuse로고 표시, 1:로고 표시 안함
					msg: '화면을 좌우로 움직여 보세요'
				});					
			}
			
			FYU.resizeAll();
			$(this).addClass('on');
			_self.wrapper.find('.btn_artimg').removeClass('on');
			_self.wrapper.find('.btn_3d').removeClass('on');
		});
		
		// 3D 또는 Fyuse 사용시 데스탑 화면 <-> 모바일 화면 전환되는 경우 처리
		if (_self.use_3d || _self.use_fyuse) {
			$(window).off('resize.3d_check').on('resize.3d_check', function(){
				
				
				// Mobile -> Descktop 전환체크
				if ( $('#curie_img_wrap').is(':visible') ) {
					
					if (_self.use_3d) {
						
						
						if ($('#m_curie_img_wrap').find('#art3d_layer').length > 0) {
							
							// 작은 창사이즈에서 3D 페이지를 전체보기로 띄우는 경우
							if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement) {
								$('.m_curie_img').show();
								return;
							}
							
							$('#curie_img_wrap').prepend($('#art3d_layer'));
							$('#art3d_layer').css('height', '');
						}
					}
					
					if (_self.use_fyuse) {
						if ($('#m_curie_img_wrap').find('#fyuse_layer').length > 0) {
							$('#curie_img_wrap').prepend($('#fyuse_layer'));
							$('#fyuse_layer').css('height', '');
						}
					}
					
				// Descktop -> Mobile 전환체크
				} else {

					if (_self.use_3d) {
						if ($('#curie_img_wrap').find('#art3d_layer').length > 0) {
							$('#m_curie_img_wrap').prepend($('#art3d_layer'));
							$('#art3d_layer').css('height', '500px');
						}
					}
					
					if (_self.use_fyuse) {
						if ($('#curie_img_wrap').find('#fyuse_layer').length > 0) {
							$('#m_curie_img_wrap').prepend($('#fyuse_layer'));
							$('#fyuse_layer').css('height', '500px');
						}
					}
				}
				
				
			});
		}
		
		// 방명록 동록하기
		_self.wrapper.find('.btn_review_register').on('click', function(){
			_self.showReviewLayer(_self.cur_id);
			g360.history_record_rental("art_review_close");
		});
		
		// 삭제하기
		$('#review_reg_layer .btn-popup-close').off().on('click', function(){
			_self.hideReviewLayer();
		});
		
		
		// 음성 플레이
		_self.wrapper.find('.btn_sound').on('click', function(){
			try {
				if ($(this).hasClass('on')) {
					if ($(this).hasClass('pause')) {
						_self.audio.play();
						_self.getAudioTime();
						g360.time_interval = setInterval(function(){_self.getAudioTime();}, 1000);
						$(this).removeClass('pause');
					} else {
						_self.audio.pause();
						if (g360.time_interval) clearInterval(g360.time_interval);
						$(this).addClass('pause');
					}
					
				} else {
					if (_self.audio.play) {
						_self.audio.play();
						_self.getAudioTime();
						g360.time_interval = setInterval(function(){_self.getAudioTime();}, 1000);
						$(this).addClass('on');
					} else {
						g360.gAlert("Error","지원되지 않는 브라우져입니다", "red", "left");
						return;
					}
				}
			}catch(ex){}
		});
		
		// 동영상 플레이
		_self.wrapper.find('.btn_video').on('click', function(){
			// 오디오 재생중이면 중지
			_self.stopAudio();
			
			var _email = _self.cur_art_info.art_mp4_filename.substring(0, _self.cur_art_info.art_mp4_filename.lastIndexOf('_'));
			var video_src = "https://www.gallery360.co.kr" + g360.video_path(_email, _self.cur_art_info.art_mp4_filename);
			//video_src = "https://www.gallery360.co.kr/artimage/mblue4444@gmail.com-spl-1560342398964/art_mp4/mblue4444@gmail.com-spl-1560342398964_ac15f5c62ea54f963aafa564b237fd03.15312012";
			//video_src = "/test/art_mp4/mblue4444@gmail.com-spl-1560342398964_ac15f5c62ea54f963aafa564b237fd03";
			g360.showVideo(video_src);
		});
		
		// 유튜브 플레이
		_self.wrapper.find('.btn_youtube').on('click', function(){
			// 오디오 재생중이면 중지
			_self.stopAudio();
			
			var src = _self.cur_art_info.art_yutube.replace(/youtu.be/g, 'www.youtube.com/embed');
			
			// 주소를 그대로 복사한 경우 아래 로직
			if (src.indexOf('/watch')) {
				src = src.replace(/\/watch\?v=/g, '/embed/');
				src = src.replace(/&.*$/g, '');
			}
			g360.showYoutube(src);
		});
		
		// 포트폴리오 클릭
		_self.wrapper.find('.btn_portfolio').on('click', function(){
			var url = g360.portfolio_path(_self.cur_art_info.email, _self.cur_art_info.art_portfolio);
			window.open(url);
		});
		
		// 탭 클릭
		_self.wrapper.find('.curie_view_tab li').on('click', function(){
			if ($(this).hasClass('on')) return;
			
			var idx = $(this).index();
			_self.wrapper.find('.curie_view_tab li').removeClass('on');
			_self.wrapper.find('.curie_view_tab li:eq(' + idx + ')').addClass('on');
			_self.wrapper.find('.curie_view_info').hide();
			_self.wrapper.find('.curie_view_info:eq(' + idx + ')').show();
			
			if (idx == 2) {
				_self.wrapper.find('.curie_link').show();
				if (!_self.review_init){
					_self.drawReview();
				}	
			} else {
				_self.wrapper.find('.curie_link').hide();
			}
		});
		
		// 방명록 전체보기 이벤트
		$('#art_review_more').on('click', function(){
			rs.loadReviewAll(_self.cur_id);
		});
		
		// 방명록 등록하기 이벤트 (방명록 레이어는 메인에 있으면 rentalservice js의 registerReview 함수를 공유한다)
		$('#art_review_submit').off().on('click', function(){
			var usernm = $.trim($('#art_review_name').val());
			var msg = $.trim($('#art_review_msg').val());
			var pass = $.trim($('#art_review_pass').val());
			
			
			
			if (usernm == '') {
				g360.showToastMsg('이름을 입력해주세요');
				//alert('이름을 입력해주세요');
				return false;
			}
			
			if (msg == '') {
				g360.showToastMsg('내용을 입력해주세요');
				//alert('내용을 입력해주세요');
				return false;
			}
			
			if (pass == '') {
				g360.showToastMsg('패스워드를 입력해주세요');
				//alert('패스워드를 입력해주세요');
				return false;
			}
			
			if ($('#art_review_pass').val().indexOf(' ') >= 0) {
				g360.showToastMsg('패스워드에는 공백을 입력할 수 없습니다');
				//alert('패스워드에는 공백을 입력할 수 없습니다');
				$('#art_review_pass').val('');
				$('#art_review_pass').focus();
				return false;
			}
					
			rs.registerReview(_self.cur_id);
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
	"drawArtInfo" : function(data){
		var _self = this;
		var genre = data.art_genre_etc ? data.art_genre.replace(/기타/g, '') + data.art_genre_etc : data.art_genre;
		var source = data.art_source_etc ? data.art_source.replace(/기타/g, '') + data.art_source_etc : data.art_source;
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
			_self.wrapper.find('.curie_top_btns').removeClass('no-btn');
			
			var _email = data.art_mp3_filename.substring(0, data.art_mp3_filename.lastIndexOf('_'));
			var audio_src = g360.audio_path(_email, data.art_mp3_filename);
			//audio_src = "/test/mblue4444@gmail.com-spl-1560342398964_dad65ea30d924796d2ecacd4ee23c2e4.231933.mp3";
			//audio_src = "https://www.gallery360.co.kr/artimage/mblue4444@gmail.com-spl-1560342398964/art_mp3/mblue4444@gmail.com-spl-1560342398964_dad65ea30d924796d2ecacd4ee23c2e4.231933";
			var $audio = $('<audio></audio>');
			$audio.attr('src', audio_src);
			
			_self.wrapper.find('.btn_sound').append($audio);
			_self.audio = $audio.get(0);
			
			// 종료시 이벤트
			$audio.on('ended', function(){
				if (g360.time_interval) clearInterval(g360.time_interval);
				_self.wrapper.find('.btn_sound').removeClass('on');
				_self.wrapper.find('.remain-time').text('');
			});
		}
		
		if (data.art_mp4_filename) {
			_self.wrapper.find('.btn_video').show();
			_self.wrapper.find('.curie_top_btns').removeClass('no-btn');
		}
		if (data.art_yutube) {
			_self.wrapper.find('.btn_youtube').show();
			_self.wrapper.find('.curie_top_btns').removeClass('no-btn');
		}
		if (data.art_portfolio) {
			_self.wrapper.find('.btn_portfolio').show();
			_self.wrapper.find('.curie_top_btns').removeClass('no-btn');
		}
			
		
		_self.wrapper.find('#curie_detail_info_title').text(g360.TextToHtml(data.art_title));
		_self.wrapper.find('.curie_right .info_size').text(size);
		_self.wrapper.find('.curie_info .info_author').text(g360.TextToHtml(data.art_artist));
		_self.wrapper.find('.curie_info .info_year').text(data.art_date_year);
		_self.wrapper.find('.curie_info .info_genre').text(g360.TextToHtml(genre));
		_self.wrapper.find('.curie_info .info_material').text(g360.TextToHtml(source));
		_self.wrapper.find('.curie_view_info:eq(0)').html(g360.textToHtml_Body(data.art_express));
		//_self.wrapper.find('.curie_view_info:eq(1)').html(g360.TextToHtml(data.art_curator_express));
		
		
		var $wrap_el;
		var is_mobile = false;
		
		if ($(window).outerWidth() > 1000) {
			$wrap_el = $('#curie_img_wrap');
		} else {
			is_mobile = true;
			$wrap_el = $('#m_curie_img_wrap');
		}
		

		/*
		 * 상세 화면 표시 조건
		 * 1. 3D 파일이 있는 경우 3D 표시
		 * 2. Fyuse 등록된 경우 Fyuse 표시 (URL잘못 입력한 경우는 패스)
		 * 3. 상세 이미지 표시
		 * 4. 3D와 Fyuse 두개 모두 사용하는 경우 3D를 우선으로 표시 하고 화면 전환할 수 있도록 버튼 표시
		 * 
		 * 상세 화면 표시 조건 변경 (201016)
		 * 1. 이미지 최우선 표시
		 * 2. 3D 또는 Fyuse 설정시 이미지 버튼과 3D, Fyuse 버튼 표시
		 */
		
		if (data.art_d3_filename) {
			var d3_url = "/3d/3d.jsp?key="+data.dockey;
			//$('.curie_img img').remove();
			$wrap_el.prepend('<div id="art3d_layer" class="art3d-layer" style="display:none;"></div>');
			$('#art3d_layer').append('<iframe src="" scrolling="no" frameborder="0" style="position:relative; height:100%; width:100%"></iframe>');
			if (is_mobile) {
				$('#art3d_layer').css('height', '500px');				
			}
			//$('.curie_view').addClass('art-3d');
			_self.d3_url = d3_url;
			_self.use_3d = true;
			//_self.use_img = false;
		}
		
		if (data.art_fuse) {
			var regex = /https:\/\/(?:www\.)?fyu\.se\/v\/(.*$)/i;
			var fyuse_url = data.art_fuse;
			var _match = fyuse_url.match(regex);
			
			// URL을 정상적으로 입력한 경우
			if (_match && _match.length == 2) {
				//$('.curie_img img').remove();
				$wrap_el.prepend('<div id="fyuse_layer" class="fyuse-layer" style="display:none;"></div>');
				
				if (is_mobile) {
					$('#fyuse_layer').css('height', '500px');					
				}

				_self.fyuse_id = _match[1];
				_self.use_fyuse = true;
				//_self.use_img = false;
			}
		}
		
		_self.wrapper.find('.curie_img img').attr('src', img_src);
		$('#curie_img_wrap img').addClass('animated-fast fadeInLeftCustom');
		$('#m_curie_img_wrap img').addClass('animated-fast fadeInLeft');
		
		if (_self.use_3d || _self.use_fyuse) {
			_self.wrapper.find('.btn_artimg').addClass('on').show();
			_self.wrapper.find('.curie_top_btns').removeClass('no-btn');

			if (_self.use_3d) {
				$('#art3d_layer').addClass('fadeInLeft animated-fast');
				_self.wrapper.find('.btn_3d').show();				
			}
			
			if (_self.use_fyuse) {
				$('#fyuse_layer').addClass('fadeInLeft animated-fast');
				_self.wrapper.find('.btn_fyuse').show();				
			}
		}
		
		/*
		// 3D와 Fyuse를 동시에 사용하는 경우 (이 때만 버튼 표시)
		if (_self.use_3d && _self.use_fyuse) {
			$('#art3d_layer').addClass('fadeInLeft animated-fast');
			$('#art3d_layer').show();
			$('#fyuse_layer').addClass('fadeInLeft animated-fast');
			
			_self.wrapper.find('.btn_3d').addClass('on').show();
			_self.wrapper.find('.btn_fyuse').show();
			_self.wrapper.find('.curie_top_btns').removeClass('no-btn');
			
		// 3D만 있는 경우
		} else if (_self.use_3d) {
			$('#art3d_layer').show();
			
		// Fyuse만 있는 경우
		} else if (_self.use_fyuse) {
			$('#fyuse_layer').show();
			FYU.add(_match[1], "fyuse_layer", {
				intro: 2,	//0:표시 안함, 1:중앙, 2:하단
	            nologo: 1,	//0:Fyuse로고 표시, 1:로고 표시 안함
	            msg: '화면을 좌우로 움직여 보세요'
			});
			
		// 상세이미지만 있는 경우
		} else {
			_self.wrapper.find('.curie_img img').attr('src', img_src);
		}
		*/

				
		
		if (data.art_artist && data.art_artist != '') {
			_self.wrapper.find('.curie_info .info_author').closest('dl').show();
		}
		if (data.art_date_year && data.art_date_year != '') {
			//테스크월드는 년도 사용안함
			//_self.wrapper.find('.curie_info .info_year').closest('dl').show();
		}
		if (genre != '') {
			_self.wrapper.find('.curie_info .info_genre').closest('dl').show();
		}
		if (source != '') {
			_self.wrapper.find('.curie_info .info_material').closest('dl').show();
		}
		
		// 작가 정보 그리기
		_self.drawArtistInfo(data.artkey.split('-')[0]);
		
		// 방명록 정보 그리기
		//_self.drawReview(data.artkey);
		
		// 작품 소개 레이어 표시
		_self.wrapper.find('.curie_view_info:eq(0)').show();
	},
	"drawArtistInfo": function(artist_key){
		var artist_info = rs.artistlist[artist_key];
		if (!artist_info) return;
		
		var _wrapper = $('#art_detail_artist_info');
		var _html = '';
		
		// 작가소개
		if (artist_info.content && $.trim(artist_info.content) != '') {
			_html =
				'<div class="artist_info_wrapper">' + g360.textToHtml_Body(artist_info.content) + '</div>';
			
			_wrapper.append(_html);
		}
		
		// 작가소개
		if (artist_info.content2 && $.trim(artist_info.content2) != '') {
			_html =
				'<div class="artist_info_wrapper">' + g360.textToHtml_Body(artist_info.content2) + '</div>';
			
			_wrapper.append(_html);
		}
		
		// 소속 및 단체
		if (artist_info.group && artist_info.group.length > 0) {
			_html =
				'<div class="artist_info_wrapper">' +
				'	<div class="artist_info_title"><img src="/img/rental/multiple-users.png"><span>소속 및 단체</span></div>' +
				'	<ul id="art_detail_artist_group" class="artist_info_content">' +
				'	</ul>' +
				'</div>';
			
			_wrapper.append(_html);
				
			$.each(artist_info.group, function(){
				var arr = [];
				if (this.title) arr.push(this.title);
				if (this.dept) arr.push(this.dept);
				if (this.jobtitle) arr.push(this.jobtitle);
				$('#art_detail_artist_group').append('<li>' + arr.join(' ') + '</li>');
			});
		}
		
		// 학력 정보
		if (artist_info.education && artist_info.education.length > 0) {
			_html =
				'<div class="artist_info_wrapper">' +
				'	<div class="artist_info_title"><img src="/img/rental/graduate.png"><span>학력 정보</span></div>' +
				'	<ul id="art_detail_artist_edu" class="artist_info_content">' +
				'	</ul>' +
				'</div>';
			
			_wrapper.append(_html);
				
			$.each(artist_info.education, function(){
				var arr = [];
				if (this.end) arr.push(this.end);
				if (this.schoolname) arr.push(this.schoolname);
				if (this.major) arr.push(this.major);
				if (this.level + this.status) arr.push(this.level + this.status);
				$('#art_detail_artist_edu').append('<li>' + arr.join(' ') + '</li>');
			});
		}
		
		// 수상 경력
		if (artist_info.career && artist_info.career.length > 0) {
			_html =
				'<div class="artist_info_wrapper">' +
				'	<div class="artist_info_title"><img src="/img/rental/trophy.png"><span>수상 경력</span></div>' +
				'	<ul id="art_detail_artist_career" class="artist_info_content">' +
				'	</ul>' +
				'</div>';
			
			_wrapper.append(_html);
				
			$.each(artist_info.career, function(){
				var arr = [];
				if (this.term) arr.push(this.term);
				if (this.title) arr.push(this.title);
				$('#art_detail_artist_career').append('<li>' + arr.join(' ') + '</li>');
			});
		}
		
		// 전시 경력
		if (artist_info.display && artist_info.display.length > 0) {
			_html = 
				'<div class="artist_info_wrapper">' +
				'	<div class="artist_info_title"><img src="/img/rental/medal.png"><span>전시 경력</span></div>' +
				'	<ul id="art_detail_artist_display" class="artist_info_content">' +
				'	</ul>' +
				'</div>';
			
			_wrapper.append(_html);
			
			$.each(artist_info.display, function(){
				var arr = [];
				if (this.term) arr.push(this.term);
				if (this.title) arr.push(this.title);
				$('#art_detail_artist_display').append('<li>' + arr.join(' ') + '</li>');
			});
		}
		
	},
	"drawReview": function(){
		var _self = this;
				
		// 기존에 정보가 있으면 비워주기
		$('#art_detail_visitor .testimonial-text p').mCustomScrollbar('destroy');
		$("#art_detail_visitor").trigger('destroy.owl.carousel');
		$("#art_detail_visitor").empty();
		
		// 방명록 불러오기
		var url = "/load_memo.mon?rr=" + rs.info.dockey + "&ak=" + _self.cur_id + "&start=0&perpage=10";
		$.ajax({
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(res){
				if (res.length > 1) {
					var data = res.splice(1);
					var _html = '';
					var _src = '';
					
					$.each(data, function(){
						_html = 
							'<div class="item">' +
							'	<div class="testimonial-wrapp">' +							
							'		<div class="testimonial-text">' +
							'			<div class="testimonial-del" onclick="rs.showPassDialog(\'' + this['_id']['$oid'] + '\', true)"></div>' +		
							'			<p class="bottom40">"<span>' + this.content.replace(/(?:\r\n|\r|\n)/g, '<br />') + '</span>"</p>' +
							'			<h4 class="darkcolor author-name">- ' + this.title + '</h4>' +
							'		</div>' +
							'	</div>' +
							'</div>';
						
						$("#art_detail_visitor").append(_html);
					});
					
					// 방명록 스크롤 처리
					$('#art_detail_visitor .testimonial-text p').mCustomScrollbar({				
						theme:"minimal-dark",
						mouseWheelPixels: 400,
						mouseWheel:{ preventDefault: false },
						autoExpandScrollbar: true,
					});
					
					// 특정 개수 이상이면 전체보기 버튼 표시
					if (res[0].totalcount > 10) {
						$('#art_review_more').show();
					}
					
					
					$("#art_detail_visitor").owlCarousel({
				        //items: 3,
				        autoplay: 2500,
				        autoplayHoverPause: true,
				        loop: false,
				        margin: 0,
				        dots: true,
				        nav: false,
				        dotsEach: true,
				        responsive: {
				        	1600: {
				        		//items: 3
				        		autoWidth: true
				        	},
				        	1441: {
				        		items: 1
				        	},
				            1281: {
				                items: 2
				            },
				            1001: {
				                items: 1
				            },
				            600: {
				                items: 2
				            },
				            320: {
				                items: 1
				            },
				        },
				        onInitialized: function(data){
				        	_self.review_init = true;
				        }
				    });

				} 
			},
			error : function(e){
				
			}
		});
	},
	"showReviewLayer" : function(id) {
		rs.showBlockUI();
		$('#art_review_name').val('');
		$('#art_review_msg').val('');
		$('#art_review_pass').val('');
		$('#review_reg_layer').show();
	},
	"hideReviewLayer" : function() {
		rs.hideBlockUI(true);
		$('#review_reg_layer').hide();
	},
	"getAudioTime": function(){
		var _self = this;
		var total = parseInt(_self.audio.duration);
		var remain = _self.audio.duration - _self.audio.currentTime;
		remain = parseInt(remain);
		var m = parseInt(remain / 60);
		var s = remain - m * 60;
		
		_self.wrapper.find('.remain-time').text('- ' + m + ':' + (s < 10 ?'0'+s:s));
	}
}