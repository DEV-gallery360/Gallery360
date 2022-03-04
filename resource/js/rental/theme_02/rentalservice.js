function RentalService (rental_info){
	this.ART_FILTER_MAX_CNT = 8;	// 작가 최대 8명까지만 표시
	this.info = rental_info;
	this.isArtistInit = false;
	this.isCustomVR = false;
	this.artistlist = {};	// 중복제거된 작가 리스트
	this.artistlist_byemail = {};	// 이메일키로 찾는 변수
	this.duplCheck();
	this.artistListDrag = false;	// 아티스트 리스트를 드래그 중인지 확인
	
	this.changeTop = 0;
	this.ani_nm = [];
	
	this.use_3d = false;
	this.use_fyuse = false;
	this.use_img = true;
	this.cur_slide_pos = 0;
	
	this.init();
}


RentalService.prototype = {
		
	"init" : function(){
		var _self = this;
		_self.artDetailEvent();
		
		// 테마2번은 bootstrap.css를 사용안하기 때문에 jquery-confirm 함수를 재정의함
		g360.gAlert=function(info, msg){
		    g360.showToastMsg(msg);
		}
	},
	
	// 대관 타입별 텍스트를 표시한다
	"drawRentalText" : function(){
		if (!g360.rental_text) return;
		
		var rt = g360.rental_text;
		
		// 타입 4인 경우 기업정보를 기업으로 치환
		if (g360.rental_text.type == '4') {
			rt.tab1 = '기업';
		}
		
		// gnb메뉴
		$('.rental-txt-art').text(rt.rental_art.toUpperCase());
		$('.rental-txt-artist').text(rt.rental_artist.toUpperCase());
		//$('.rental-txt-visitor').text(rt.rental_visitor.toUpperCase());
		$('.rental-txt-group').text(rt.rental_group.toUpperCase());
		$('.rental-txt-count').text(rt.rental_count.toUpperCase());
		$('.rental-txt-express').text(rt.rental_express.toUpperCase());
		
		$('.cnt-label-art').text(rt.rental_art.toLowerCase());
		
		// art를 artworks로 치환
		var artworks = (g360.rental_text.type == '1' ? 'artworks' : rt.rental_art.toLowerCase());
		$('.rental-txt-art1').text(artworks);
		$('.rental-txt-art2').text(artworks.toUpperCase());

		
		// 작품상세
		$('.rental-txt-artist1').text(rt.rental_artist);
		
		// 작가 상세
		$('.rental-txt-tab1').text(rt.tab1);
		$('.rental-txt-tab2').text(rt.tab2);
		
		$('.rental-txt-tab1-c').text(this.appendTailText(rt.tab1));
		$('.rental-txt-tab2-c').text(this.appendTailText(rt.tab2));
		
						
	},
	"appendTailText" : function(str) {
		var final_code = str.charCodeAt(str.length - 1);
	    // 0 = 받침 없음, 그 외 = 받침 있음
	    var check = (final_code - 44032) % 28;
	    var append_text = (check !== 0 ? "을" : "를");
		return str + append_text;
	},	
	
	"getEmail" : function(email) {
		return email.substring(0, email.lastIndexOf("_"));
	},
	
	"duplCheck" : function() {
		// --------- artistlist와 imagelist의 중복제거 ---------
		var _self = this;
		
		// 이름 오름차순으로 정렬
		this.info.artistlist.sort(function(a,b){
			return (a.name > b.name ? 1: -1);
		});
		
		// 중복 작가 리스트 제거
		_self.artistlist = {};
		$.each(this.info.artistlist, function(){
			_self.artistlist[this.artistkey] = this;
		});
		this.info.artistlist = [];
		$.each(_self.artistlist, function() {
			_self.info.artistlist.push(this);
		});
		
		
		// 작가를 이메일로 찾을 수 있도록 변수 셋팅
		_self.artistlist_byemail = {};
    	$.each(this.info.artistlist, function(){
    		//artistkey[$.trim(this.name)] = this.artistkey;
    		_self.artistlist_byemail[this.email] = {
    			'artistkey' : this.artistkey,
    			'name' : this.name,
    			'name_eng' : this.name_eng
    		}
    	});
		
		// 커스텀VR 여부 판단해서 imagelist 구조 맞추기
		if (!this.info.imagelist[0].filekey) {
			this.isCustomVR = true;
			var imglist_arr = [];
			$.each(this.info.imagelist, function(){
				$.each(this, function(){
					$.each(this, function(){
						imglist_arr.push(this);
					});
				});
			});
			this.info.imagelist = imglist_arr;
		}
		
		// 중복 이미지 제거
		var duplck = {};
		$.each(this.info.imagelist, function(){
			duplck[this.filekey] = this;
		});
		this.info.imagelist = [];
		$.each(duplck, function() {
			_self.info.imagelist.push(this);
		});
	},
	
	"setGroupList" : function(){
		var _self = this;
		
		$('#nav_group').hide();
		$('#m_nav_group').hide();
		
		
		var group_code = this.info.info.group_code;
		if (group_code) {
			$('#nav_group').show();
			$('#m_nav_group').show();
		} else {
			return;
		}
		
		// 새로운 그룹 페이지를 레이어로 처리
		$('#nav_group, #m_nav_group').off().on('click', function(){
			if ($('#in_header').is(':visible')) {
				toggleMobileMenu(true);
			}
			_self.showGroupList(group_code);
			$('body').addClass('overflow-hidden');
			g360.history_record_rental("group_list_close");
		});
		
	},
	"setVR" : function(delay) {
		
		var _self = this;
		
		$('#vr_layer').show();
		
		$('#vr_layer .vr-subject').html(_self.info.title);
		
		/*
		ScrollTrigger.create({
			trigger: '#main_visual',
			start: 'top top',
			end: 'bottom center',
			onEnter: function(){
				if (_self.isVrLoadCompleted) {
					$('#vr_layer').removeClass('show');
				}
			},
			onEnterBack: function(){
				if (_self.isVrLoadCompleted) {
					$('#vr_layer').removeClass('show');
				}
			},
			onLeave: function(){
				if (_self.isVrLoadCompleted) {
					$('#vr_layer').addClass('show');
				}
			},
			onLeaveBack: function(){
				if (_self.isVrLoadCompleted) {
					$('#vr_layer').removeClass('show');					
				}
			}
		});
		*/
		
		ScrollTrigger.create({
			id: 'vr_show',
			trigger: '#visitor',
			start: 'top bottom',
			/*
			endTrigger: '#visitor',
			end: 'bottom top',
			*/
			onEnter: function(){
				if (_self.isVrLoadCompleted) {
					$('#vr_layer').removeClass('show');
				}
				$('#vr_layer').addClass('hidden');
			},
			onEnterBack: function(){
				if (_self.isVrLoadCompleted) {
					$('#vr_layer').removeClass('show');
				}
				$('#vr_layer').addClass('hidden');
			},
			onLeave: function(){
				if (_self.isVrLoadCompleted) {
					if (!$('#artist_detail_layer').is(':visible')) {
						$('#vr_layer').addClass('show');						
					}
				}
				$('#vr_layer').removeClass('hidden');
			},
			onLeaveBack: function(){
				if (_self.isVrLoadCompleted) {
					if (!$('#artist_detail_layer').is(':visible')) {
						$('#vr_layer').addClass('show');						
					}
				}
				$('#vr_layer').removeClass('hidden');
			}
		});
		_self.addAniName('vr_show');
		
	    
		setTimeout(function(){			
			window._pano = new Pano();
			_pano.init('vr_area', vr_key);
			$('#vr_layer').on('click', function(){
				_self.showFullscreen();
			});
		}, delay);
	    	    
	},
	"vrDetailBugFix" : function(){
		// VR 상세페이지에서 작품선택시 감싸고 있는 Wrapper Position값 재설정
		$('#krpano_iframe_IFRAME_HTML').parent().parent().parent().parent().addClass('ie-bugfix');
	},
	"showFullscreen" : function(){
		//alert('전체화면으로 전환됩니다');
		if ($('#in_header').is(':visible')) {
			toggleMobileMenu(true);
		}
				
		$('#vr_layer').off('click');
		
		if (g360.bgmusic != ""){
			_pano.krpano1.set('layer[snd2].visible', true);			
		}
		
		// 최상단 로고 표시
		_pano.krpano1.set('plugin[snd3].visible', true);
		
		_pano.krpano1.set('layer[skin_btn_show_icon].visible', true);
		
		
		// Fisheye Style 해제
		if (_pano.krpano1.get('view.distortion')) {
			_pano.krpano1.set('view.distortion', 0);
			_pano.krpano1.set('autorotate.tofov', 360);
			_pano.krpano1.set('autorotate.horizon', 0);
			_pano.krpano1.set('view.fov', 180);
			_pano.krpano1.call('lookto(0,0)');
		}
						
		
		
		// ios는 krpano 전체화면 지원되지 않음
		if (/iphone|ipad|mac os/i.test(navigator.userAgent)) {
			_pano.krpano1.set('layer[skin_btn_show_icon].visible', false);
			$('#vr_layer').addClass('ios-fullscreen');
			$('#btn_mobile_menu').css('opacity', 0);	// 모바일 메뉴 아이콘 안보이도록 처리함
			$('#header').hide();
			$('#btn_vr_back').show();
			_pano.soundcontrol(1);
			
			// Fisheye Style 해제
			if (_pano.krpano1.get('view.distortion')) {
				_pano.krpano1.set('view.distortion', 0);
				_pano.krpano1.set('autorotate.tofov', 360);
				_pano.krpano1.set('autorotate.horizon', 0);
				_pano.krpano1.set('view.fov', 180);
				_pano.krpano1.call('lookto(0,0)');
			}

			$('#btn_vr_back').off().on('click', function(){
				if (g360.bgmusic != ""){
					_pano.krpano1.set('layer[snd2].visible', false);			
				}
				_pano.krpano1.set('plugin[snd3].visible', false);
				$('#vr_layer').removeClass('ios-fullscreen');
				$('#btn_mobile_menu').css('opacity', 1);
				$('#header').show();
				$('#btn_vr_back').hide();
				_pano.soundcontrol(0);
				
				// Fisheye Style (PC only)
				if (!window.matchMedia('(max-width:979px)').matches) {
					_pano.krpano1.set('view.distortion', 1);
					_pano.krpano1.set('autorotate.tofov', 'off');
					_pano.krpano1.set('autorotate.horizon', 'off');
					_pano.krpano1.set('view.fov', 180);
					_pano.krpano1.call('lookto(0,90)');
				}
				
				$('#vr_layer').on('click', function(){
		    		rs.showFullscreen();
		    	});
			});
			
			return;
		}
		
		$('#vr_area').addClass('fullscreen');
		$('#vr_layer').find('.vr-area-upper').hide();
		//$('#vr_layer').find('.text-area').hide();
		$('#main-banner-area').hide();
		$('#header').hide();
		
		
		_pano.krpano1.set('fullscreen', true);
		
		
		// VR전체화면 - 작품상세 - 유튜브에서 전체화면 후 전체화면 해제 시 VR전체화면 해제 이벤트가 수행되지 않아 별도로 체크하는 로직 추가함
		// kakaotalk 웹뷰에서는 fullscreen 체크가 안되므로 처리하지 않음
		if (navigator.userAgent.indexOf('KAKAOTALK') >= 0) {
			
		} else {
			this.fs_check = setInterval(this.fullScreenCheck, 1000);
		}
	},
	"fullScreenCheck" : function() {
		if (document.fullscreen == false) {
			_pano.exitFullscreen();
			clearInterval(this.fs_check);
		}
	},
	"getMainImages" : function(){
		var _self = this;
		var max_size = 31;
		
		// 메인에 표시할 31개의 이미지를 생성
		// 1. 작가 이미지
		// 2. 작품 이미지
		// 3. 랜덤 복사
		// 4. 배열 랜덤 처리
		
		var imgs = [];
		
		// 1. 작가 이미지
		$.each(this.info.artistlist, function(idx, val){		
			if (this.photoimage_profile) {
				imgs.push(g360.user_photo_thum_url(this.email) + '?open&ver=' + this.photoimage_profile_version);
			}
			if (imgs.length >= max_size) return false;
		});
				
		// 2. 작품 이미지
		if (imgs.length < max_size) {
			$.each(this.info.imagelist, function(){
	    		var _email = _self.getEmail(this.filekey);
	    		var _src = g360.preview_img_path(_email, this.filekey);
	    		imgs.push(_src);
	    		
	    		if (imgs.length >= max_size) return false;
			});
		}
		
		// 3. 랜덤 복사
		if (imgs.length < max_size) {
			var imgs_length = imgs.length; 
			for (var i = imgs.length ; i<=max_size ; i++) {
				var random_idx = gsap.utils.random(0, imgs.length-1, 1);
				var copy_url = imgs[random_idx];
				imgs.push(copy_url);
			}
		}

		// 4. 배열 랜덤 처리
		return g360.arrayShuffle(imgs);
	},
	"setMainSlide" : function() {
		var _self = this;		
		var img_list = [];
		var auto_sec = 5;
		
		// 사용자가 선택한 image가 있는 경우 해당 이미지만 표시
		if (this.info.main_image && this.info.main_image.length > 0) {
			$.each(this.info.imagelist, function(){
				if ($.inArray(this.filekey, _self.info.main_image) != -1){
					img_list.push(this);					
				}
			});
		}
		
		// 선택한 이미지가 없으면 전체 이미지로 처리
		if (img_list.length == 0) {
			img_list = this.info.imagelist.slice();
		}
		
		// 이미지 리스트 랜덤 표시
		img_list = g360.arrayShuffle(img_list);
		
		
		var main_img = img_list[this.cur_slide_pos];
		var folder = _self.getEmail(main_img.filekey);
		var image_url = "/artimage/" + folder + "/art/1920/" + main_img.filekey + ".jpg";

		$('#main_image').css('background-image', 'url(' + image_url + ')');
		$('#main_art_artist').html(main_img.artist);
		$('#main_art_title').html(main_img.name);
		
		
		gsap.fromTo('#main_image', {opacity: 0.3}, {opacity: 1, duration: 2});
		gsap.fromTo('#main_art_artist', {
			yPercent: 100,
			autoAlpha: 1
		},{
			yPercent: 0,
			duration: 1
		});
		gsap.fromTo('#main_art_title', {
			yPercent: 100,
			autoAlpha: 1
		},{
			yPercent: 0,
			duration: 0.8,
			delay: 0.2
		});
		
		ScrollTrigger.create({
			trigger: '#main_visual',
			start: 'bottom top',
			onEnter: function(){
				if (window.main_auto_tl) {
					window.main_auto_tl.pause();
				}
			},
			onLeaveBack: function(){
				if (window.main_auto_tl) {
					window.main_auto_tl.progress(0).resume();
				}
			}
		});
		
		/*
		 * 로딩 완료된 후 자동 슬라이드 적용되도록 수정 $('#main_visual').click();으로 처리함
		// auto slide
		gsap.fromTo('.main-progress', {scaleX:0}, {scaleX:1, duration:auto_sec, ease:Linear.easeNone, onComplete: function(){
			$('#main_visual').click();			
		}});
		*/
		
		// 이미지 변경 버튼
		$('#main_visual').on('click', function(){
			if (window.main_ani) return;
			window.main_ani = true;
			
			if (gsap.getTweensOf('.main-progress')[0]) {
				gsap.getTweensOf('.main-progress')[0].kill();
			}
			gsap.set('.main-progress', {scaleX:0});
			
			_self.cur_slide_pos++;
			if (_self.cur_slide_pos > (img_list.length-1)) {
				_self.cur_slide_pos = 0;
			}
			
			// 텍스트 숨김
			$('#main_art_artist').css('visibility', 'hidden');
			$('#main_art_title').css('visibility', 'hidden');
			
			// 메인 애니메이션 효과
			$('#main_visua .main-img-ghostl').remove();
			var $ghost = $('<div class="main-img ghost"></div>');
			$ghost.css('background-image', $('#main_image').css('background-image'));
			$('#main_visual').append($ghost);
			
			
			
			var next_img = img_list[_self.cur_slide_pos];
			var folder = _self.getEmail(next_img.filekey);
			var next_url = "/artimage/" + folder + "/art/1920/" + next_img.filekey + ".jpg";
			
			var $main = $('#main_image');
			$main.css('background-image', 'url(' + next_url + ')');
			$('#main_art_artist').html(next_img.artist);
			$('#main_art_title').html(next_img.name);
			
			$main.imagesLoaded({background:true}, function(){
				gsap.set($main, {
					scale: 1.1,
					'clip-path': 'circle(0%)',
					'z-index': 2
				});
				var tl = gsap.timeline();
				
				tl.to($main, {
					//opacity: 1,
					scale: 1,
					'clip-path': 'circle(100%)',
					//ease: Power3.easeOut,
					duration: 2,
					onComplete: function(){
						$main.css('z-index', 0);
						$('.main-img.ghost').remove();
						window.main_ani = false;
						
						// auto slide
						window.main_auto_tl = gsap.timeline();
						window.main_auto_tl.fromTo('.main-progress', {scaleX:0}, {scaleX:1, duration:auto_sec, ease:Linear.easeNone, onComplete: function(){
							$('#main_visual').click();
						}});
					}
				})				
				.fromTo('#main_art_artist', {yPercent: 100,	autoAlpha: 1},{
					yPercent: 0,
					duration: 1
				}, '<')
				.fromTo('#main_art_title', {yPercent: 100, autoAlpha: 1},{
					yPercent: 0,
					duration: 0.8,
					delay: 0.2
				}, '<');
				
				/*
				gsap.to('.main-img.ghost', {
					//opacity: 0.5,
					transformOrigin: '0% 100%',
					scale: 0.9,
					rotate: -100,
					duration: 0.8,
					onComplete: function(){
						$(this['_targets'][0]).remove();
					}
				});
				*/				
				/*
				gsap.to('.main-img.ghost', {
					//opacity: 1,
					//scale: 0.8,
					//xPercent: -100,
					duration: 0.5,
					onComplete: function(){
						$(this['_targets'][0]).remove();
						window.main_ani = false;
					}
				});					
				*/
			});
			
			
			
			return false;
			
		});
	
		
		gsap.to('#main_image', {
			scrollTrigger: {
				trigger: '#main_visual',
				start: 'top top',
				end: 'bottom top',
				scrub: true,
				toggleActions: 'play none none reverse'
			},
			ease: Linear.easeNone,
			yPercent: 40
		});
		
		// 방명록
		gsap.to('.hello_bar', {
			scrollTrigger: {
				id: 'visitor_title',
				trigger: '#wrap',
				start: 'top top',
				end: 'bottom bottom',
				scrub: true,
				toggleActions: 'play none none reverse',
			},
			y: -500
			//yPercent: -1000
			/*
			y: function(){
				return ($('.hello_bar').width() - innerHeight) * -1;
			}
			*/
		});
		ScrollTrigger.create({
			trigger: '#about',
			start: 'top top',
			endTrigger: '#container',
			end: 'bottom bottom',
			onEnter: function(){
				if ($('#artist_detail_layer').is(':visible')) return;
				$('#visitor_layer').addClass('showtab');
			},
			onLeaveBack: function(){
				if ($('#artist_detail_layer').is(':visible')) return;
				$('#visitor_layer').removeClass('showtab');
			}
			
		});
		
		ScrollTrigger.create({
			trigger: '#visitor',
			start: 'top center',
			onEnter: function(){
				if ($('#artist_detail_layer').is(':visible')) return;
				$('#visitor_layer').removeClass('showtab');
			},
			onLeaveBack: function(){
				if ($('#artist_detail_layer').is(':visible')) return;
				$('#visitor_layer').addClass('showtab');
			}
		});
		
		_self.addAniName('visitor_title');
		
	},
	"getArtistLayerHeight" : function(){
		var clone =$('.artist-list-layer').clone();
		clone.addClass('ghost');
		$('body').append(clone);
		var height = clone.outerHeight();
		clone.remove();
		return height;
	},
	"setCounter" : function() {

		$('#main_title').html(this.info.title.replace(/_{3}/g, "<br>"));
		
		if (!g360.isMobile()) {
			// 스크롤에 따라 움직이는 애니메이션 처리
			ScrollTrigger.create({
				trigger: '#main_wrapper',
				start: 'top top',
				end : 'bottom bottom',
				pin : '#count_flex',
				pinType: 'fixed'
			});
		}
	},
	"countShow" : function(){
		// --------- 방문자 수 카운트 ---------
		var visitor_cnt = this.info.viewcount;
		var art_cnt = this.info.imagelist.length;
		
		$('#cnt_visitor').data('to', visitor_cnt).countTo({
			formatter: function(val){
				return g360.numberComma(val.toFixed());
			}
		});
		$('#cnt_art').data('to', art_cnt).countTo();
		
		$('#cnt_m_visitor').data('to', visitor_cnt).countTo({
			formatter: function(val){
				return g360.numberComma(val.toFixed());
			}
		});
		$('#cnt_m_art').data('to', art_cnt).countTo();
	},
	
	"setExhibitionInfo" : function() {
		var _self = this;
		// --------- 전시회 정보 ---------
		var wrap = $('#exhibition');
		var title = wrap.find('#exhi_title');
		var content = wrap.find('#exhi_content');
		var service_img = $('#service_img');
		var img_url = '';
		
		title.html(this.info.title.replace(/_{3}/g, "<br>"));
		content.html(this.info.express.replace(/\r\n|\n/g, '<br/>'));
		
		
		// 서비스 이미지 등록시 서비스 이미지를 뿌려주고 없으면 작품 중 1개를 랜덤으로 표시
		if (this.info.service_image) {
			img_url = this.info.service_image;
		} else {			    		
    		var random_idx = gsap.utils.random(0, this.info.imagelist.length-1, 1);
    		var img_obj = this.info.imagelist[random_idx];
    		var _email = this.getEmail(img_obj.filekey);
    		img_url = g360.preview_img_path(_email, img_obj.filekey);
		}
		service_img.css('background-image', 'url(' + img_url + ')');
		
		$('#service_m_img').attr('src', img_url);
		
		/*
		var t1 = $('#about .tilte-sec span:eq(0)');
		var t2 = $('#about .tilte-sec span:eq(1)');
		gsap.fromTo(t1, {xPercent: 100}, {
			scrollTrigger: {
				trigger: t1.get(0),
				start: 'top bottom',
				end: 'top center',
				scrub: true,
				toggleAction: 'play none none reverse'
			},
			xPercent: 0
		});
		gsap.fromTo(t2, {xPercent: -100}, {
			scrollTrigger: {
				trigger: t1.get(0),
				start: 'top bottom',
				end: 'top center',
				scrub: true,
				toggleAction: 'play none none reverse'
			},
			xPercent: 0
		});
		*/

		ScrollTrigger.saveStyles('#exhi_title, #service_img, #exhi_period, #exhi_content_wrap, #exhi_content');
		
		ScrollTrigger.matchMedia({
			'(min-width: 1200px)': function(){
				// 타이틀 스크롤 고정
				ScrollTrigger.create({
					id: 'exhi_title',
					trigger: '#exhi_content_wrap',
					start: 'top top',
					endTrigger: '#exhi_content',
					end: 'top top+=200',
					pin: '#exhi_title',
					pinSpacing: false
				});
				gsap.fromTo('#exhi_title', {opacity:0, y:100}, {
					scrollTrigger: {
						trigger: '#exhi_title',
						start: 'bottom bottom',
						endTrigger: '.box_sec2',
						end: 'bottom top',
						toggleActions: 'play none none reverse'
					},
					opacity:1,
					y:0
				});
				
			
				// 내용 애니메이션 효과
				gsap.fromTo('#exhi_content', {opacity:1, y: 100}, {
					scrollTrigger: {
						trigger: '#exhi_content',
						start: 'top bottom-=100',
						endTrigger: '.box_sec2',
						end: 'bottom top',
						toggleActions: 'play none none reverse'
					},
					opacity:1,
					y:0
				});
				/*
				gsap.fromTo('#exhi_content_wrap', {y: 500}, {
					scrollTrigger: {
						trigger: '#exhi_content_wrap',
						start: 'top bottom',
						end: 'top center',
						scrub: true,
						toggleActions: 'play none none reverse'
					},
					y:0
				});		
				*/
				service_img.imagesLoaded({background: true}, function(){
					
					// 메인 이미지 애니메이션 효과
					var eximg_tl = gsap.timeline({
						scrollTrigger: {
							trigger: '#service_img',
							start: 'top bottom-=100',
							endTrigger: '#exhibition',
							end: 'bottom top',
							toggleActions: 'play none none reverse'
						}
					});
					
					eximg_tl.fromTo('#service_img', {opacity:0}, {opacity:1})
							.fromTo('#exhi_period', {opacity:0, y:-300}, {opacity:1, y:0, duration:1.8}, '<0.5');
					
					
					// 매인 이미지 스크롤 고정
					ScrollTrigger.create({
						id: 'exhi_img',
						trigger: '#service_img',
						start: 'center center',
						endTrigger: '#exhibition',
						end: 'bottom bottom',
						pin: true,
						pinSpacing: false
					});
				});
			},
			'(max-width: 1199px)': function(){
				var st1 = ScrollTrigger.getById('exhi_title');
				var st2 = ScrollTrigger.getById('exhi_img');
				if (st1) st1.kill();
				if (st2) st2.kill();
			}
		});
		

		
		
		

	},
	
	"sortImageList" : function() {
		var _self = this;
		
		/*
		// 작가가 1명 이상인 경우 이미지 리스트를 소트한다.
		if (this.info.artistlist.length == 1) {
			return;
		}
		*/
		
		var artistkey = {};
		// artistkey로 json데이터를 생성
		$.each(this.info.artistlist, function(){
			artistkey[this.artistkey] = [];
		});
		// 작품 등록 후 작가 지운 경우 UNKOWN으로 등록
		artistkey['UNKNOWN'] = [];
		
		$.each(this.info.imagelist, function(){
			
			var _email = _self.getEmail(this.filekey);
			var img_artist_key = '';
			
			// 이미지의 artistkey를 구함
			if (_self.artistlist_byemail[_email]) {
				img_artist_key = _self.artistlist_byemail[_email].artistkey;
			} else {
				img_artist_key = 'UNKNOWN';
			}
			
			var json = this;
			json['artistkey'] = img_artist_key;
			
			// artistkey별로 작품 삽입
			artistkey[img_artist_key].push(json);
		});
		
		this.info.imagelist = [];
		$.each(this.info.artistlist, function(){
			var artist_json = this;
			artist_json.artlist = [];
			$.each(artistkey[this.artistkey], function(){
				artist_json.artlist.push(this);
				_self.info.imagelist.push(this);
			});
		});
		// 작가 삭제된 경우
		if (artistkey['UNKNOWN'].length) {
			$.each(artistkey['UNKNOWN'], function(){
				_self.info.imagelist.push(this);
			});
		}
		
	},
	"setArtList" : function() { 
    	var _self = this;
    	
    	_self.sortImageList();
    	
    	
    	// artistkey 필터링 셋팅
    	var $list = $('.name_tab');
    	var cnt = 0;
    	var _html = '';
    	
    	_html = '<a data-artistkey="all">전체보기</a>';
    	$.each(this.info.artistlist, function(){
    		_html += '<span class="artist-sepa"> / </span> <a data-artistkey="' + this.artistkey + '">' + $.trim(this.name) + '</a>';
   			cnt++;
    	});
    	
    	if (cnt > 1) {
    		$list.html(_html);
    		$list.find('a').on('click', function(){
    			_self.dispArtImage($(this).data('artistkey'));
    			return false;
    		});
    	}
    	
    	
    	this.dispArtImage('all');
	},
	
	"dispArtImage" : function(artistkey){
		// imagelist 셋팅   	
    	var $list = $('#art_list');
    	var cnt = 0;
    	var section_cnt = 0;
    	var $wrap, imagelist;
    	
    	var _self = this;
    	
    	$('.name_tab a.on').removeClass('on');
    	$('.name_tab a[data-artistkey="' + artistkey + '"]').addClass('on');
    	
    	var scroll_pos = $('html').scrollTop();
    	
    	$list.empty();
    	
    	// section에 5개씩 표시함
    	// 홀수 섹션은 4개씩...
    	if (artistkey == 'all') {
    		imagelist = this.info.imagelist;
    	} else {
    		imagelist = this.artistlist[artistkey].artlist;
    	}
    	
    	$.each(imagelist, function(idx, val){
    		cnt++;
    		
    		if (cnt == 1) {
        		$wrap = $('<div class="section"></div>');
        		$list.append($wrap);
        		section_cnt++;
        	}
    		
    		if (section_cnt%2) {
    			// 첫째줄은 4개
    			if (cnt == 4) cnt = 0; 
    		} else {
    			// 둘째줄은 5개
    			if (cnt == 5) cnt = 0;
    		}
    		
    			
    		var _email = _self.getEmail(this.filekey);
    		var _src = g360.preview_img_path(_email, this.filekey);
    		var artistkey = '';
    		
    		// 작가명
    		var artist_name = '';
    		if (_self.artistlist_byemail[_email]) {
    			artist_name = _self.artistlist_byemail[_email].name;
    			artistkey = _self.artistlist_byemail[_email].artistkey;
    		} else {
    			artist_name = this.artist;
    		}
    		
    		// artistlist에 마지막 작품 src저장 (작가 이미지 없는 경우 뿌려주기 위함)
    		if (_self.artistlist[artistkey]) {
    			_self.artistlist[artistkey].last_art_src = _src;
    		}
    		
    		var _html =
    			'<div class="art" data-artkey="' + this.filekey + '" data-artistkey="' + artistkey + '" style="background-image:url(' + _src + ')">' +
    			'	<div class="inner_art">' +
    			'		<div><h2>' + this.name + '</h2></div>' +
    			'		<div>by.' + artist_name + '</div>' +
    			'	</div>' +
    			'</div>';
    		$wrap.append(_html);
    	});
    	
    	$('html').scrollTop(scroll_pos);
    	$list.find('.art').on('click', function(){
    		_self.showArtDetail($(this).data('artkey'), $(this).data('artistkey'));
    	});
    	
    	$('#art_list .section:even').each(function(){
    		gsap.to(this, {
        		scrollTrigger: {
        			trigger: $(this).get(),
        			start: 'top bottom',
        			end: 'top top',
        			scrub: true,
        			toggleAction: 'play none none reverse'
        		},
        		x: function(){
        			return innerWidth * (5/100);
        		}
        	});
    	});
    	
    	$('#art_list .section:odd').each(function(){
    		gsap.to(this, {
        		scrollTrigger: {
        			trigger: $(this).get(),
        			start: 'top bottom',
        			end: 'top top',
        			scrub: true,
        			toggleAction: 'play none none reverse'
        		},
        		x: function(){
        			return innerWidth * (6/100) * -1;
        		}
        	});
    	});
    	
    	
    	
    	
    	
    	
    	
    	// 이미지가 로딩완료된 후
    	gsap.set('.art', {opacity:0});
    	$list.imagesLoaded( {background:'.art'}, function() {
    		var $filter = $('#artist_name');
    		
    		ScrollTrigger.matchMedia({
    			'(max-width: 767px)': function(){
    				$('.art').each(function(){
    					gsap.fromTo(this, {opacity:0, scale:0.9}, {
    						scrollTrigger: {
    							trigger: this,
    							start: 'center bottom'
    						},
    						scale: 1,
    						opacity:1
    					});
    				});
    			},
    			
    			'(min-width: 768px)': function(){
    				gsap.to('.art', {
    					scrollTrigger:{
    						trigger: '#art_list',
    						start: 'top bottom-=100'
    					},
    	    			opacity:1,
    	    			stagger:{
    	    				each: 0.05
    	    				//from: 'random'
    	    			}
    	    		});
    			},
    		});
    		
    		_self.animationRefresh();
    		
    		// 최초 로딩시에만 처리함
    		if ($('.loader').is(':visible')) {
    			_self.hideLoading();    			
    		}
    	});
	},
	
	"showArtDetail": function(artkey, artistkey){
		g360.history_record_rental('btn_art_close');
		
		var _self = this;
    	var _email = _self.getEmail(artkey);
		var _src = g360.preview_img_path(_email, artkey);
		var $img_wrap = $('.art_area');
		var $img_m_wrap = $('.art_m_area');
		
		//$('#art_detail_layer').find('.art_area img').attr('src', _src);
		
		gsap.set($img_wrap, {opacity: 0});
		gsap.set($img_m_wrap, {opacity: 0});
		$img_wrap.css('background-image', 'url(' + _src + ')');
		$img_m_wrap.attr('src', _src);
		$img_wrap.imagesLoaded({background:true}, function(){
			gsap.fromTo($img_wrap, {opacity:0}, {opacity:1});
			gsap.fromTo($img_m_wrap, {opacity:0}, {opacity:1});
		});
		
		$('body').addClass('overflow-hidden')
		
		// 열기전 초기화
//		gsap.set('#art_detail_subject', {opacity:0});
//		gsap.set('#art_detail_size', {opacity:0});
//		gsap.set('#art_detail_layer .info-wrap', {opacity:0});
//		gsap.set('#art_detail_layer .tab-container', {opacity:0});
//		gsap.set('#art_detail_layer .artist-img', {opacity:0});
//		gsap.set('#detail_gm_show', {y:100});

		var $btn_wrap = $('#art_detail_layer .media');
		$btn_wrap.find('.btn_3d').hide();
		$btn_wrap.find('.btn_sound').hide();
		$btn_wrap.find('.btn_video').hide();
		$btn_wrap.find('.btn_youtube').hide();
		$btn_wrap.find('.btn_portfolio').hide();
		$('.btn_v_more').hide();
		$('.go_prev').addClass('off');
		$('.go_next').addClass('off');
		
		
		var st_close = ScrollTrigger.getById('art_detail_btn_close');
		if (!st_close) {
			// 상단 메뉴 고정 (스크롤 시 숨기고, 올리면 다시 표시)
		    var close_fixed = gsap.from('#btn_art_close', { 
		    	y: -200,
		    	paused: true,
		    	duration: 0.3,
		    }).progress(1);

		    
			ScrollTrigger.create({
				id: 'art_detail_btn_close',
				scroller: '.art-detail-inner',
				trigger: '.W_in_con',
				start: "top top",
				end: 'bottom bottom',
				onUpdate: function (st) {
					if (st.direction === -1) {
						// 메뉴표시
						close_fixed.play();
					} else {
						// 메뉴숨김
						close_fixed.reverse();
					}
				}
			});
		}

		
		var st_nav = ScrollTrigger.getById('art_nav');
		if (!st_nav) {
			// 스크롤에 따라 네비게이션 버튼 숨김
			var art_nav_ani = gsap.timeline();
			art_nav_ani.to('.go_prev', {
				x: -200,
				opacity: 0,
				duration: 0.2
			}).to('.go_next', {
				x: 200,
				opacity: 0,
				duration: 0.2
			},'<').pause();
			
			ScrollTrigger.create({
				id: 'art_nav',
				scroller: '.art-detail-inner',
				trigger: '#art_detail_visitor',
				start: 'center bottom',
				onEnter: function(){
					if ( $('#art_detail_visitor > .owl-stage-outer').length ) {
						art_nav_ani.play();						
					}
				},
				onLeaveBack: function(){
					art_nav_ani.reverse();
				}
			});
		}
		

		_self.getArtInfo(artkey, artistkey);

	},
	
	"closeArtDetail": function(){
		
	},
	"getArtInfo" : function(id, artistkey){
		var _self = this;
		$.ajax({
			url: '/select_art_info_rental.mon?dockey=' + id,
			success: function(data){
				_self.cur_art_info = data;
				_self.drawArtInfo(data, artistkey);
				_self.setArtNav(id);
								
				// 닫기 처리 (이미지 다시 제자리로 돌리기)
				var $btn_close = $('#btn_art_close');
				$btn_close.on('click', function(){
					$btn_close.off();

					$('#art_detail_layer').hide();
					$('body').removeClass('overflow-hidden');
					
					
					if (_self.cur_art_info.art_mp3_filename) {
						if (g360.time_interval) clearInterval(g360.time_interval);
						g360.time_interval = null;
						var $audio = $('.btn_sound audio');
						var $wrapper = $('#art_detail_layer');
						$audio.attr('src', '');
						$wrapper.find('.btn_sound').removeClass('on pause');
						$wrapper.find('.remain-time').text('');
					}
					
					
					$(window).off('keydown.artclose');
					
					return false;
				});
				
				var st_close = ScrollTrigger.getById('art_detail_btn_close');
				st_close.refresh();
				$('.art-detail-inner').scrollTop(0);
				
				// ESC 이벤트
				$(window).off('keydown.artclose').on('keydown.artclose', function(e){
					if ($('#video_layer').is(':visible')) return;
					if ($('.blockui').is(':visible')) return;
					if (e.keyCode == 27) {
						if ($('.art-review-layer').is(':visible')) {
							// 작품에서 방명록 상세 표시한 경우
							_self.hideArtReview();
						} else if ($('#art_review_layer').hasClass('show')){ 						
							// 방명록 관련 애니메이션 수행중이면 리턴 처리
							if (_self.show_art_review_tl && _self.show_art_review_tl.isActive()) return;
							if (_self.hide_art_review_tl && _self.hide_art_review_tl.isActive()) return;
							_self.hideReviewArea();
						} else {
							$btn_close.click();							
						}
					}
				});
				

				
			} 
		});
	},
	"setArtNav": function(artkey){
		var _self = this;
		var cur_idx = 0;
		var imglist = this.info.imagelist; 
		
		$.each(imglist, function(idx, val){
			if (this.filekey == artkey) {
				cur_idx = idx;
			}
		});
		
		var $prev = $('.go_prev');
		var $next = $('.go_next');		
		$prev.removeClass('off');
		$next.removeClass('off');
		
		// 첫번째 이미지인 경우
		if (cur_idx == 0) {
			$prev.addClass('off');
		}
		
		// 마지막 이미지인 경우
		if (cur_idx == imglist.length-1) {
			$next.addClass('off');
		}
		
		$prev.off().on('click', function(){
			if ($(this).hasClass('off')) return false;
			var idx = cur_idx-1;
			var move_img = imglist[idx];
			_self.showArtDetail(move_img.filekey, move_img.artistkey);
			_self.hideReviewArea();
			return false;
		});
		
		$next.off().on('click', function(){
			if ($(this).hasClass('off')) return false;
			var idx = cur_idx+1;
			var move_img = imglist[idx];
			_self.showArtDetail(move_img.filekey, move_img.artistkey);
			_self.hideReviewArea();
			return false;
		});
	},
	"drawArtInfo": function(data, artistkey){
		var _self = this;
		var $wrapper = $('#art_detail_layer');
		
		
		var genre = data.art_genre_etc ? data.art_genre.replace(/기타/g, '') + data.art_genre_etc : data.art_genre;
		var source = data.art_source_etc ? data.art_source.replace(/기타/g, '') + data.art_source_etc : data.art_source;
		var img_src = g360.preview_img_path(data.email, data.dockey);
		var size = "";

		var $audio = $('.btn_sound audio');
		if (data.art_mp3_filename) {
			$wrapper.find('.remain-time').text('');
			$wrapper.find('.btn_sound').removeClass('on pause').show();
			
			
			var _email = data.art_mp3_filename.substring(0, data.art_mp3_filename.lastIndexOf('_'));
			var audio_src = g360.audio_path(_email, data.art_mp3_filename);
			$audio.attr('src', audio_src);
			
			_self.audio = $audio.get(0);
			
			// 종료시 이벤트
			$audio.off().on('ended', function(){
				if (g360.time_interval) clearInterval(g360.time_interval);
				g360.time_interval = null;
				$wrapper.find('.btn_sound').removeClass('on');
				$wrapper.find('.remain-time').text('');
			});
		} else {
			if (g360.time_interval) clearInterval(g360.time_interval);
			g360.time_interval = null;
			$audio.attr('src', '');
			$wrapper.find('.btn_sound').removeClass('on');
			$wrapper.find('.remain-time').text('');
		}
		
		if (data.art_mp4_filename) {
			$wrapper.find('.btn_video').show();
		}
		if (data.art_yutube) {
			$wrapper.find('.btn_youtube').show();
		}
		if (data.art_portfolio) {
			$wrapper.find('.btn_portfolio').show();
		}
		
		// 제목
		$wrapper.find('#art_detail_subject').text(g360.TextToHtml(data.art_title));
		
		// 사이즈
		$wrapper.find('.info-size').closest('li').hide();
		if (data.art_height && data.art_width && rs.info.info.rental_type == '1') {	//크기 정보가 있는 경우만 표시함
			if(data.art_genre=="조형"){
				size = data.art_height + ' x ' + data.art_width + ' x ' + data.art_height2 + 'cm';
			}else{
				if (data.art_hosu == null){
					size = data.art_height + 'cm X ' + data.art_width + 'cm';
				}else{
					size = data.art_height + 'cm X ' + data.art_width + 'cm (' + data.art_hosu + '호)';
				}
			}
			
			$wrapper.find('.info-size').text(size).closest('li').show();			
		}
		
		// 작가 사진 정보
		$('#art_detail_layer .artist-img').hide();
		if (_self.artistlist[artistkey]) {
			var artist_info = _self.artistlist[artistkey];
			if (artist_info.photoimage_profile) {
				var artist_url = g360.user_photo_thum_url(data.email) + '?open&ver=' + artist_info.photoimage_profile_version;
				
				$wrapper.find('.artist-img').css('background-image', 'url(' + artist_url + ')');
				$('#art_detail_layer .artist-img').show();
			}
		}
					
		// 작품정보
		$wrapper.find('.info-author').text('').closest('li').hide();
		$wrapper.find('.info-year').text('').closest('li').hide();
		$wrapper.find('.info-genre').text('').closest('li').hide();
		$wrapper.find('.info-material').text('').closest('li').hide();
		
		if (data.art_artist && data.art_artist != '') {
			$wrapper.find('.info-author').text(g360.TextToHtml(data.art_artist));
			$wrapper.find('.info-author').closest('li').show();
		}
		if (data.art_date_year && data.art_date_year != '') {
			$wrapper.find('.info-year').text(data.art_date_year);
			$wrapper.find('.info-year').closest('li').show();
		}
		if (genre != '' && g360.rental_text.art_jang) {
			$wrapper.find('.info-genre').text(g360.TextToHtml(genre));
			$wrapper.find('.info-genre').closest('li').show();
		}
		if (source != '' && g360.rental_text.art_material) {
			$wrapper.find('.info-material').text(g360.TextToHtml(source));
			$wrapper.find('.info-material').closest('li').show();
		}
		
		// 작품소개
		var $art_info = $('#art_detail_art_info');
		$art_info.empty().hide();
		$art_info.html(g360.textToHtml_Body(data.art_express));
		
		$art_info.show();
		
		//구매하기, 문의하기 버튼 추가, 투표하기 버튼 추가
		var vote_use = (rs.info.info.vote_use == 'T' && !isNaN(rs.info.info.vote_count) ? true : false);
		
		if ( data.sale_url || (data.purchase_req == 'Y') || vote_use) {
			var $btn_art_wrap = $('<div class="btn-art-wrap"></div>');
			$art_info.append($btn_art_wrap);
			
			// 작품 소개에 내용이 있으면 상단 border 추가
			if (data.art_express != '') {
				$btn_art_wrap.addClass('top-border');
			}
			

			// 문의하기
			if (data.purchase_req == 'Y') {
				var $btn_qna = $('<div class="btn_art_qna btn-art-bottom">문의하기</div>');
				$btn_art_wrap.append($btn_qna);
				
				$q_layer = $('#buy_qna_layer');
				$btn_qna.off().on('click', function(){
					rs.showBlockUI();
										
					$q_layer.find('.bqp-img img').attr('src', img_src);
					$q_layer.find('.bqp-name').text(g360.TextToHtml(data.art_title));
					$q_layer.find('.bqp-size').text(size);
					$q_layer.find('.bqp-maker').text(g360.TextToHtml(data.art_artist));
					$q_layer.find('.bqp-seller').text(g360.TextToHtml(rs.info.info.host));
					
					
					$q_layer.find('.buy-query-name').val('');
					$q_layer.find('.buy-query-email').val('');
					$q_layer.find('.buy-query-number').val('');
					$q_layer.find('.buy-query-stmt').val('');
					
					$q_layer.show(0).addClass('show');
					$q_layer.scrollTop(0);
				});
				$q_layer.find('.buy-query-close').off().on('click', function(){
					rs.hideBlockUI(true);
					$q_layer.removeClass('show').hide();
				});
				
				// 문의하기 버튼
				$('#btn_query_submit').off().on('click', function(){
					var q_nm = $.trim($q_layer.find('.buy-query-name').val());
					var q_email = $.trim($q_layer.find('.buy-query-email').val());
					var q_num = $.trim($q_layer.find('.buy-query-number').val());
					var q_msg = $.trim($q_layer.find('.buy-query-stmt').val());
					
					if (q_nm == '') {
						$q_layer.find('.buy-query-name').focus();
						g360.showToastMsg('이름을 입력하세요', 3000);
						return;
					}
					if (q_email == '') {
						$q_layer.find('.buy-query-email').focus();
						g360.showToastMsg('이메일을 입력하세요', 3000);
						return;
					}
					if (q_msg == '') {
						$q_layer.find('.buy-query-stmt').focus();
						g360.showToastMsg('문의글을 입력하세요', 3000);
						return;
					}
					
					var q_data = JSON.stringify({
						name : q_nm,
						email : q_email,
						number : q_num,
						msg : q_msg,
						dockey : _self.cur_art_info.dockey
					});
					
					
					var url = g360.root_path + "/Rental_purchase_send.mon"
					
					$.ajax({
						type: "POST",
						data: q_data,
						dataType: "json",
						contentType: "application/json; charset=utf-8",
						url: url,
						success: function(){
							g360.showToastMsg('문의글이 등록되었습니다.', 3000);
							rs.hideBlockUI(true);
							$q_layer.removeClass('show').hide();
						}
					});
				});
			}
			
			// 투표하기
			if (vote_use) {
				var $btn_vote = $('<div class="btn_art_vote btn-art-bottom">투표하기</div>');
				$btn_art_wrap.append($btn_vote);
				$btn_vote.on('click', function(){
					_self.showVoteLayer();
				});
			}
			
			
			//==============================================
			
			// 구매하기
			if (data.sale_url) {
				
				//ajax
				$.ajax({
					url: g360.root_path+"/add_option_check.mon",
					type: "POST",
					data: JSON.stringify({value:data.sale_selectbox}),
					contentType: "application/json",
					success: function(data2){
						
						//버튼 타입 체크
						var sel_type = "";
						sel_type = data2.res;
						
						var $btn_buy = $('<div class="btn_art_buy btn-art-bottom">'+sel_type+'</div>');
						$btn_art_wrap.append($btn_buy);
						$btn_buy.on('click', function(){
							window.open(data.sale_url);
						});
						
					},
					error: function(e) {
						alert("에러발생 (add_option_check)")
					}
				});
				
				
			}
			
		}
		
		/*
		// 작가소개
		var $artist_info = $('#art_detail_artist_info');
		$artist_info.empty().hide();
		_self.drawArtistInfo(artistkey);
		
		// 탭 표시
		$wrapper.find('.art-detail-tab li').hide();
		if ($.trim($art_info.text()) != '') {
			$wrapper.find('.art-detail-tab li:eq(0)').show();
		}
		if ($.trim($art_info.text()) != '') {
			$wrapper.find('.art-detail-tab li:eq(1)').show();
		}
		
		
		// 이벤트 작업
		if (!_self.tab_event) {
			$wrapper.find('.art-detail-tab li').on('click', function(){
				if ($(this).hasClass('on')) return;
				
				var tab_idx = $(this).index();
				if (tab_idx == 0) {
					_self.clickDetailTab('art');
				} else if (tab_idx == 1) {
					_self.clickDetailTab('artist');
				} else if (tab_idx == 2) {
					_self.clickDetailTab('review');
				}
				
				_self.tab_event = true;
			});
		}
		
		
		// 표시 작업
		if ($.trim($art_info.text()) != '') {
			_self.clickDetailTab('art');
		} else if ($.trim($art_info.text()) != '') {
			_self.clickDetailTab('artist');
		}
		*/
		
		var is_mobile = false;


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
		
		$('#art3d_layer iframe').attr('src', '');
		if (data.art_d3_filename) {
			$wrapper.find('.btn_3d').show();
			_self.d3_url = "/3d/3d.jsp?key="+data.dockey;;
			_self.use_3d = true;
		} else {
			_self.d3_url = '';
			_self.use_3d = false;
		}
				
				
		
//		window.art_detail_tl = gsap.timeline();
//		art_detail_tl
//			.fromTo('#art_detail_subject', {y:100, opacity:0}, {y:0, opacity:1, duration:0.5, overwrite:'auto'})
//			.fromTo('#art_detail_layer .artist-img', {opacity:0}, {opacity:0.8, duration:1, overwrite:'auto'}, '<0.2')
//			.fromTo('#art_detail_size', {y:100, opacity:0}, {y:0, opacity:1, duration:0.5, overwrite:'auto'}, '<')
//			.fromTo('#art_detail_layer .info-wrap', {y:60, opacity:0}, {y:0, opacity:1, duration:0.5, overwrite:'auto'}, '<0.2')
//			.fromTo('#detail_gm_show', {y:100}, {y:0, duration:0.5, overwrite:'auto'}, '<')
//			.fromTo('#art_detail_layer .tab-container', {opacity:0}, {opacity:1, duration:0.5, overwrite:'auto'}, '<0.2');
			
		$('#art_detail_layer').show();
		
		// 방명록 카운트 가져오기
		//this.getReviewCount();
		
		this.drawReview();
	},
	
	"drawReview" : function(){
		//기존에 정보가 있으면 비워주기
		if ($('#art_detail_visitor .mCustomScrollbar').length > 0) {
			$('#art_detail_visitor .mCustomScrollbar').mCustomScrollbar('destroy');
		} 
		
		$("#art_detail_visitor").trigger('destroy.owl.carousel');
		$("#art_detail_visitor").removeClass('owl-hidden');
		$("#art_detail_visitor").empty();
		
		// 방명록 불러오기
		var url = "/load_memo.mon?rr=" + this.info.dockey + "&ak=" + this.cur_art_info.dockey + "&start=0&perpage=10";
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
						var reviewkey = this['_id']['$oid'];
						_html = 
							'<div class="item">' +
							'	<div class="review-wrap">' +
							'		<div class="review-txt-wrap">' +
							'			<p class="review-content">' + this.content.replace(/(?:\r\n|\r|\n)/g, '<br />') + '</p>' +
							'			<div class="btn-remove" data-reviewkey="' + reviewkey + '" onclick="rs.showPassDialog(\'' + reviewkey + '\', true)"></div>' +
							'			<span class="author-name">- ' + this.title + '</span>' +
							'		</div>' +
							'	</div>' +
							'</div>';
						
						$("#art_detail_visitor").append(_html);
					});
					
					// 방명록 스크롤 처리
					if (!g360.isMobile()) {
						$('#art_detail_visitor .review-content').mCustomScrollbar({				
							theme:"minimal-dark",
							mouseWheelPixels: 150,
							mouseWheel:{ preventDefault: false },
							autoExpandScrollbar: true
						});						
					}
					
					// 특정 개수 이상이면 전체보기 버튼 표시
					if (res[0].totalcount > 10) {
						$('.btn_v_more').show();
					}
					
					
					$("#art_detail_visitor").owlCarousel({
				        loop: false,
				        margin: 20,
				        dots: true,
				        nav: false,
				        dotsEach: true,
				        responsive: {
				        	1200: {
				                items: 4
				            },
				        	600: {
				                items: 2
				            },
				            320: {
				                items: 1
				            },
				        }
				    });
				}
				
				var st_close = ScrollTrigger.getById('art_detail_btn_close');
				var st_nav = ScrollTrigger.getById('art_nav');
				st_close.refresh();
				st_nav.refresh();
			},
			error : function(e){
				
			}
		});
	},
	
	"getReviewCount": function(){
		var url = "/load_memo.mon?rr=" + this.info.dockey + "&ak=" + this.cur_art_info.dockey + "&start=0&perpage=1";
		$('#detail_gm_show').empty();
		$.ajax({
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(res){
				if (res.length > 0) {
					var _cnt = res[0].totalcount;
					if (_cnt == 0) return;
					
					_cnt = _cnt > 99 ? '99+' : _cnt;
					var _html = '<span id="review_cnt_badge" class="amt-gm" style="display:none;">' + _cnt + '</span>';
					$('#detail_gm_show').html(_html);
					
					if (window.art_detail_tl.isActive()){
						window.art_detail_tl.eventCallback('onComplete', function(){
							$('#review_cnt_badge').show();
							gsap.fromTo('#review_cnt_badge', {scale:0.3}, {scale:1});
						});
					} else {
						$('#review_cnt_badge').show();
						gsap.fromTo('#review_cnt_badge', {scale:0.3}, {scale:1});
					}
				}
			}
		});
	},
	
	"drawArtistInfo": function(artist_key){
		var _self = this;
		var rt = g360.rental_text;
		var artist_info = _self.artistlist[artist_key];
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
				'<div class="artist-note">Note</div>' +
				'<div class="artist_info_wrapper">' + g360.textToHtml_Body(artist_info.content2) + '</div>';
			
			_wrapper.append(_html);
		}
		
		// 소속 및 단체
		if (artist_info.group && artist_info.group.length > 0 && rt.group) {
			_html =
				'<div class="artist_info_wrapper">' +
				'	<div class="artist_info_title"><img src="/img/rental/multiple_users_w.png"><span>' + rt.group + '</span></div>' +
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
		if (artist_info.education && artist_info.education.length > 0 && rt.sch) {
			_html =
				'<div class="artist_info_wrapper">' +
				'	<div class="artist_info_title"><img src="/img/rental/graduate_w.png"><span>' + rt.sch + '</span></div>' +
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
		if (artist_info.career && artist_info.career.length > 0 && rt.prize) {
			_html =
				'<div class="artist_info_wrapper">' +
				'	<div class="artist_info_title"><img src="/img/rental/trophy_w.png"><span>' + rt.prize + '</span></div>' +
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
		if (artist_info.display && artist_info.display.length > 0 && rt.carr) {
			_html = 
				'<div class="artist_info_wrapper">' +
				'	<div class="artist_info_title"><img src="/img/rental/medal_w.png"><span>' + rt.carr + '</span></div>' +
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
	"clickDetailTab" : function(tab_name) {
		// 임시 방명록 작성 버튼
		if (tab_name == 'review') {
			this.showReviewArea();
			return;
		}
		
		var $art_info = $('#art_detail_art_info');
		var $artist_info = $('#art_detail_artist_info');
		var btn_sticky = ScrollTrigger.getById('btn_sticky');
		var tab_sticky = ScrollTrigger.getById('tab_sticky');
		var before_scrolltop = $('.text-container').scrollTop();
		
		// 고정 스크롤 상태인 경우 스크롤 이동처리를 위한 변수 셋팅
		var move_scroll = false;
		if ($('.art-detail-tab').hasClass('bg-fill')) {
			move_scroll = true;
		} 
		
		$('#tab_list li').removeClass('on');
		$('#tab_list li[data-tab="' + tab_name + '"]').addClass('on');
		
		var header_height = $('.btn-header').outerHeight() + $('.art-detail-tab').outerHeight();
		var parent_padding = parseInt($('.flex-item').css('padding-top')) + parseInt($('.flex-item').css('padding-bottom'));
		parent_padding += parseInt($('.text-container').css('padding-bottom'));
		var fit_height = window.innerHeight - header_height - parent_padding;
		
		
		
		
		// 탭의 길이 중 더 높은걸로 고정한다 (스크롤의 길이변화 대응)
		$art_info.css('height', 'auto');
		$artist_info.css('height', 'auto');
		var art_height = $art_info.height();
		var artist_height = $artist_info.height();
		if (art_height < artist_height) {
			//$art_info.height(artist_height);
			$art_info.height(art_height < fit_height ? (artist_height < fit_height ? artist_height : fit_height) : art_height);
		} else {
			//$artist_info.height(art_height);
			$artist_info.height(artist_height < fit_height ? (art_height < fit_height ? art_height : fit_height) : artist_height);
		}

		
		// 컨텐츠 표시하기
		if (tab_name == 'art') {
			$art_info.show();
			$artist_info.hide();
		} else if (tab_name == 'artist') {
			$art_info.hide();
			$artist_info.show();
		}
		
		// 탭을 이동해도 스크롤 변화가 없도록 조정한다
		if (tab_name == 'review') {
			gsap.to('.text-container', {
				scrollTo: 'max',
				duration: 0.3
			});
		} else {
			gsap.to('.text-container', {
				scrollTo: (move_scroll ? 'max' : before_scrolltop),
				duration: 0
			});			
		}
		
		
		
		
		// 버튼 고정 업데이트
		var btn_sticky = ScrollTrigger.getById('btn_sticky');
		var tab_sticky = ScrollTrigger.getById('tab_sticky');
		if (btn_sticky) {
			btn_sticky.refresh();
		}

		if (tab_sticky) {
			tab_sticky.refresh();
			
			// 고정으로 되어 있는 경우
			if (move_scroll) {
				var _top = (tab_name == 'art' ? $art_info : $artist_info).position().top;
				var header_height = $('.btn-header').outerHeight() + $('.art-detail-tab').outerHeight();
				var parent_top = parseInt($('.text-container').css('padding-top'));
				
				// 모바일인 경우 
				if (!window.matchMedia('(min-width:1200px)').matches) {
					parent_top += $('#m_art_detail_wrapper').outerHeight();
				}
				
				var scroll_top = _top - header_height + parent_top + 3;
				
				gsap.to('.text-container', {
					scrollTo:scroll_top,
					duration: 0.3
				});
			}
		}
	},
	
	"setArtistList" : function() {
		var _self = this;
		var $list = $('#artist_list');
    	var cnt = 0;
    	$.each(this.info.artistlist, function(){
    		var artist_name = $.trim(this.name);
    		var artist_name_eng = $.trim(this.name_eng);
    		if (artist_name == artist_name_eng) artist_name_eng = '';
    		
    		var _html = 
    			'<li data-artistkey="' + this.artistkey + '">' +
    			'	<div class="artist">' +
    			'		<p class="artist_name">' + artist_name + (artist_name_eng != '' ? '<span class="slash">/</span><span class="sub_name">' + artist_name_eng +  '</span>' : '') + '</p>' +
    			'	</div>' +
    			'</li>';
   			$list.append(_html);
   			cnt++;
    	});
    	
    	var artist_cnt = this.info.artistlist.length;
    	if (artist_cnt > 1) {
    		// 작가 상세페이지의 전체 참여작가 버튼
    		$('#artist_cnt').text('+ ' + (artist_cnt - 1));
    	} else {
    		// 작가 상세페이지 네비게이션 버튼 숨김처리
    		$('.pic-artist-nav').hide();
    		$('#quick').hide();
    	}
    	
    	
    	
    	// 마우스 오버시 작가 이미지 표시 
    	if (!g360.isMobile()) {
    		var $artist_layer = $('.main-artist-img');
    		$list.on('mouseenter', function(){
    			$artist_layer.show();
    		});
    		$list.on('mouseleave', function(){
    			$artist_layer.hide();
    		});
    		$list.on('mousemove', function(e){
    			$artist_layer.css('top', e.clientY + 20);
    			$artist_layer.css('left', e.clientX + 20);
    		});
    		
    		var $main_artist_img = $('.main-artist-img img');
    		$list.find('li').on('mouseenter', function(){
    			$main_artist_img.attr('src', '');
    			var artistkey = $(this).data('artistkey');
    			if (_self.artistlist[artistkey]) {
    				var artist_info = _self.artistlist[artistkey];
    				if (artist_info.photoimage_profile) {
    					var artist_url = g360.user_photo_thum_url(artist_info.email) + '?open&ver=' + artist_info.photoimage_profile_version;
    					
    					$main_artist_img.attr('src', artist_url);
    					gsap.set($main_artist_img, {opacity:0});
    					$main_artist_img.imagesLoaded(function(){
    						gsap.killTweensOf($main_artist_img);
    						gsap.fromTo($main_artist_img, {opacity:0}, {opacity:1, delay:0.2, duration:0.1});
    					});
    				}
    			}    			
    		});   		
    	}
    	
    	// 작가 상세페이지
    	$list.find('li').on('click', function(){
    		var artistkey = $(this).data('artistkey');
    		window.before_scroll = $('html').scrollTop();
    		_self.showArtistDetail(artistkey);
    	});
    	
		// 작가상세 페이지 닫기
    	$(window).off('keydown.artistclose').on('keydown.artistclose', function(e){
    		if ($('#art_detail_layer').is(':visible')) return;
    		if ($('.blockui').is(':visible')) return;
    		
			if (e.keyCode == 27) {
	    		// 방명록이 열려있는 경우 방명록 닫기
	    		if ($('#visitor_layer').hasClass('show')) {
	    			$('#btn_main_visitor').click();
	    			return;
	    		}
				if ($('#artist_detail_layer').is(':visible')){
					_self.closeArtistDetail();
				}
			}
    	});
    	
    	$('#btn_artist_back').on('click', function(){
    		_self.closeArtistDetail();
    		return false;
    	});
    	
    	// 작가리스트 셋팅
    	this.allArtistList();

	},
	"allArtistList" : function(){
		var _self = this;
		var $list = $('#all_artist_list');
		
		$.each(this.info.artistlist, function(){
    		var artist_name = $.trim(this.name);
    		var artist_name_eng = $.trim(this.name_eng);
    		if (artist_name == artist_name_eng) artist_name_eng = '';
    		
    		var img_url = '';

    		if (this.photoimage_profile) {
    			img_url = g360.user_photo_thum_url(this.email) + '?open&ver=' + this.photoimage_profile_version;
    		} else {
    			img_url = this.last_art_src;
    		}
    		
    		var _html = 
    			'<li class="list_box" data-artistkey="' + this.artistkey + '">' +
    			'	<div class="box">' +
    			'		<div class="pic" style="background-image:url(' + img_url + ')"></div>' +
    			'		<b class="name">' + artist_name + (artist_name_eng != '' ? ' / ' + artist_name_eng : '') + '</b>' +
    			'		<span class="here click"></span>' +
    			'	</div>' +
    			'</li>';
   			$list.append(_html);
    	});
		
		// 작가상세에서 전체 참여작가 버튼 클릭시 표시
		$('#quick').on('click', function(){
			$('.all_artist').addClass('show');
			$('body').addClass('overflow-hidden');
			$('.blockui').addClass('artist-detail').show();
			
			// Hear 표시
			$list.find('.here').addClass('click');
			$list.find('.box.on').removeClass('on');
			
			var $cur_li = $list.find('.list_box[data-artistkey="' + _self.cur_artistkey + '"]');
			$cur_li.find('.box').addClass('on');
			$cur_li.find('.here').removeClass('click');
			
			// 스크롤바 이동
			gsap.to('#all_artist_list', {duration:0.5, scrollTo:{y:$('.box.on').get(0)}});
		});
		
		// 작가 클릭
		$list.find('li').on('click', function(e){
			_self.showArtistDetail($(this).data('artistkey'));
			_self.closeAllArtistList();
		});
		// 닫기
		$('#btn_all_artist_close').on('click', function(){
			_self.closeAllArtistList();
			return false;
		});
		
	},
	"closeAllArtistList": function(){
		$('.all_artist').removeClass('show');
		$('body').removeClass('overflow-hidden');
		$('.blockui').removeClass('artist-detail').hide();
	},
	"changeFontSize" : function($el, h) {
		// 폰트 사이즈 초기화
		$el.css('font-size', '');
		
		var fs = $el.css('font-size');
		if (!fs) return;
		
		var cnt = 0;
		
		// 높이가 설정값 이하로 나오도록 폰트 사이즈 조정
		while ($el.height() > h) {
			cnt++;
			if (cnt > 100) break;
			
			var fs = parseInt($el.css('font-size')) - 1;
			if (fs < 12) break;
			
			
			$el.css('font-size', fs + 'px');
		}
	},
	"selectArtist" : function(artistkey) {
		var _self = this;
		var $list_text = $('#artist_info_text_list');
		var artistinfo = _self.artistlist[artistkey];
		var tmpkey = artistkey;
		
		// displayArtistKey : 현재 표시중인 artist
		// reqArtiskey : 변환 요청한 artist
		
		if (_self.displayArtistkey == artistkey) return;
		
		_self.reqArtistkey = artistkey;
		
		var img_src = '';
		
		if (artistinfo.photoimage_profile) {
			img_src = g360.user_photo_color_url(artistinfo.email) + '?open&ver=' + artistinfo.photoimage_profile_version;
		} else {
			img_src = artistinfo.last_art_src;
		}
		
		var artistOriImg = new Image();
		artistOriImg.artistkey = artistkey;
		artistOriImg.onload = function(){
			// 로딩 완료 시점에 이벤트 객체와 요청했던 키가 같아야만 뿌려준다.
			if (this.artistkey != _self.reqArtistkey) return;
			
			$('.artist-detail-img').css('background-image', 'url(' + this.src + ')');
			
			var before_li = $list_text.find('.artist-' + _self.displayArtistkey);
			before_li.find('.artist-info-ename').removeClass('fadeInLeftSmall');
			before_li.find('.artist-info-name').removeClass('fadeInLeftSmall');
			before_li.find('.artist-info-content').removeClass('fadeInLeftSmall');
			before_li.find('.btn-artist-detail').removeClass('fadeInLeftSmall');
			//before_li.css('z-index', '0');
			$list_text.find('li').css('z-index', '0');
			
			var after_li = $list_text.find('.artist-' + artistkey);
			after_li.find('.artist-info-ename').addClass('fadeInLeftSmall');
			after_li.find('.artist-info-name').addClass('fadeInLeftSmall');
			after_li.find('.artist-info-content').addClass('fadeInLeftSmall');
			after_li.find('.btn-artist-detail').addClass('fadeInLeftSmall');
			after_li.css('z-index', '1');
			
			_self.displayArtistkey = artistkey;
		}
		artistOriImg.src = img_src;
		
		
		
		// 배경이미지 셋팅
		//var artist_ori_img = g360.user_photo_color_url(artistinfo.email) + '?open&ver=' + artistinfo.photoimage_profile_version;
		//$('.artist-detail-img').css('background-image', 'url(' + artist_ori_img + ')');
		
		
	},
	
	"setDbook" : function(){
		
		var _self = this;
		$("#dbook").hide();
		$('#nav_dbook').hide();
		$('#m_nav_dbook').hide();
		
			
		// D-book 설정되어 있는지 체크하여 처리
		var dbook_info = this.info.info;
		if (!dbook_info.dbook_filename) return;
		/*
		var $page_wrap = $('.dbook-page-wrap');
		if (!dbook_info.dbook_filename) {	
			// DBook을 사용하지 않는 경우 샘플 Dbook 뿌려줌
			if (!g360.isM() && g360.UserInfo && g360.UserInfo.email == window.owner){
			//if (window.showdbook == 'T') {
				$page_wrap.find('img').remove();
				$('#dbook_page_0').attr('src', '/img/rental/dbook_front.jpg');
				for (var i=1 ; i<4 ; i++) {
					delay += 80;
					$page_wrap.append($('<img src="/img/rental/dbook_content_0' + i + '.jpg' + '" class="wow animate__fadeInRight animate__animated" data-wow-delay="' + delay + 'ms">'));
				}
				$('#dbook_detail_view').hide();
				$("#dbook").show();
			}
			return;	
		}
		*/
		
		var email = this.info.email;
		var dbook_url = g360.dbook_path(email, dbook_info.dbook_filename);
		var thum_path = '/artimage/' + email + '/dbook/dbook_images/' + this.info.dockey;
		
		// 상세페이지 3개 표시
		$('#dbook_pages').empty();
		var cnt = dbook_info.dbook_page_count;
		for (var i=0 ; i<cnt ; i++) {
			if (i>2) break;
			$('#dbook_pages').append($('<p><img src="' + thum_path + '/' + i + '.png?open&ver=' + dbook_info.dbook_version + '"></p>'));
		}

		var image_array = new Array();
		for (var k = 0; k < cnt; k++){
			var obj = new Object();
			obj.src = thum_path + "/" + k + ".png?open&ver=" + dbook_info.dbook_version;
			obj.thumb = thum_path + "/thumbnail/" + k + ".png?open&ver=" + dbook_info.dbook_version ;
			image_array.push(obj);
		}
		
		$(".flipbook-overlay").empty();
		if (typeof(rs.info.dbookurl) != "undefined" && rs.info.dbookurl != ""){
			
		}else{
			$("#dbook_detail_view").off().show();
			$("#dbook_detail_view").flipBook({
				pages:image_array,			
				lightBox:true,
				lightBoxFullscreen:false,	
				thumbnailsOnStart:false,
				deeplinkingPrefix:"book1_",
				
			//	lightboxStartPage: 0,
				viewMode: 'webgl',
				shadows:true,
				shadowOpacity:0.2,
				pageHardness:1.2,
				coverHardness:1.2,
				pageRoughness:1,
				pageMetalness:0,
				pageSegmentsW:6,
				antialias:false,
				pan:0,
				tilt:-0,
				panMax:20,
				panMin:-20,
				tiltMax:0,
				tiltMin:-60,
				rotateCameraOnMouseDrag:true,
				aspectRatio:2, 
				currentPage:{"enabled":true,"title":"Current page","vAlign":"top","hAlign":"left","order":""},
				btnFirst:{"enabled":true,"title":"First Page","vAlign":"","hAlign":"","order":"","icon":"fa-angle-double-left","icon2":"first_page"},			
				btnPrev:{"enabled":false,"title":"Previous Page","vAlign":"","hAlign":"","order":"","icon":"fa-chevron-left","icon2":"chevron_left"},
				btnNext:{"enabled":false,"title":"Next Page","vAlign":"","hAlign":"","order":"","icon":"fa-chevron-right","icon2":"chevron_right"},
				btnLast:{"enabled":true,"title":"Last Page","vAlign":"","hAlign":"","order":"","icon":"fa-angle-double-right","icon2":"last_page"},
				btnAutoplay:{"enabled":false,"title":"Autoplay","vAlign":"","hAlign":"","order":"","icon":"fa-play","iconAlt":"fa-pause","icon2":"play_arrow","iconAlt2":"pause"},
				btnZoomIn:{"enabled":false,"title":"Zoom in","vAlign":"","hAlign":"","order":"","icon":"fa-plus","icon2":"zoom_in"},
				btnZoomOut:{"enabled":false,"title":"Zoom out","vAlign":"","hAlign":"","order":"","icon":"fa-minus","icon2":"zoom_out"},
				btnToc:{"enabled":false,"title":"Table of Contents","vAlign":"","hAlign":"","order":"","icon":"fa-list-ol","icon2":"toc"},
				btnThumbs:{"enabled":true,"title":"Pages","vAlign":"","hAlign":"","order":"","icon":"fa-th-large","icon2":"view_module"},
				btnShare:{"enabled":false,"title":"Share","vAlign":"","hAlign":"","order":"","icon":"fa-share-alt","icon2":"share"},
				btnPrint:{"enabled":false,"title":"Print","vAlign":"","hAlign":"","order":"","icon":"fa-print","icon2":"print"},
				btnDownloadPages:{"enabled":false,"title":"Download pages","vAlign":"","hAlign":"","order":"","icon":"fa-download","icon2":"file_download"},
				btnDownloadPdf:{"enabled":false, "url":"https:\/\/www.gallery360.co.kr\/test\/deploy\/download1.pdf"},
				btnSound:{"enabled":true,"title":"Sound","vAlign":"","hAlign":"","order":"","icon":"fa-volume-up","iconAlt":"fa-volume-off","icon2":"volume_up","iconAlt2":"volume_mute"},
				btnExpand:{"enabled":true,"title":"Toggle fullscreen","vAlign":"","hAlign":"","order":"","icon":"fa-expand","iconAlt":"fa-compress","icon2":"fullscreen","iconAlt2":"fullscreen_exit"},
				btnSelect:{"enabled":false,"title":"Select tool","vAlign":"","hAlign":"","order":"","icon":"fas fa-i-cursor","icon2":"text_format"},
				btnSearch:{"enabled":false},
				btnBookmark:{"enabled":false,"title":"Bookmark","vAlign":"","hAlign":"","order":"","icon":"fas fa-bookmark","icon2":"bookmark"},			
				layout:1,
				skin:"dark",
				icons:"font awesome",
				useFontAwesome5:true,
				skinColor:"",
				skinBackground:"",
				backgroundColor: 'rgb(016, 016, 016)',
				backgroundTransparent:false
		      });
		}
		
			
		
		$("#dbook_detail_view").on("click", function(){
			if (typeof(rs.info.dbookurl) != "undefined" && rs.info.dbookurl != ""){
				var url = rs.info.dbookurl;
				window.open(url);
						
				
			}else{
				g360.FullScreen_Open();
				var xscroll = $(window).scrollTop();			
				window.rs.changeTop = xscroll + 120;
			}
			return false;
		});
		
		$('#nav_dbook').show();
		$('#m_nav_dbook').show();
		$("#dbook").show();

		
		/*
		var dbook_tl = gsap.timeline({
			scrollTrigger: {
				id: 'dbook_cover',
				trigger: '#dbook',
				start: 'top center+=150',
				toggleActions: 'play reset play reset'
			}
		});
		dbook_tl
			.from('#dbook_label', {x:-200, opacity: 0, duration: 0.6})
			.from('.dbook-dim', {x:-200, opacity: 0, duration: 0.6}, '<0.3')
			.from('#dbook_cover', {x:-200, opacity: 0, duration: 0.6}, '<')
			.from('.dbook-pages img', {x:-100, opacity: 0, stagger: 0.3, duration: 0.6}, '<0.3');
		
		
		gsap.from('.dbook-titles', {
			scrollTrigger: {
				id: 'dbook_text',
				trigger: '#dbook',
				start: 'top center+=150',
				toggleActions: 'play reset play reset'
			},
			x:200,
			opacity: 0,
			duration: 1
		});
		
		_self.addAniName('dbook_cover');
		_self.addAniName('dbook_text');
		*/
		
	},
	
	"changePosition" : function(){		
		if (window.rs.changeTop) {
			$("html, body").scrollTop(window.rs.changeTop);			
		}
		window.rs.changeTop = null; 
	},
	
	"setVisitor" : function() {
		
		var _self = this;
	    	
	    // 이벤트 바인딩을 1번만 수행하기 위한 변수 추가
		if (!_self.is_visitor_event_bind) {
			
			$('#btn_main_visitor').on('click', function(){
				
				if ($('#visitor_layer').hasClass('show')) {
					
					if ($('#review_all_list .review-item').length > 0) $('#review_all_list').cubeportfolio('destroy');
					$('#review_all_list').empty();
					$('#visitor_layer').removeClass('show');
					$('#visitor_layer_bg').removeClass('show');
					
					if (!_self.is_body_scroll_hidden) {
						$('body').removeClass('overflow-hidden');
					}
					_self.is_body_scroll_hidden = false;
										
				} else {
					
					$('#visitor_layer').addClass('show');
					$('#visitor_layer_bg').addClass('show');
					_self.loadReviewAll();
					
				}
				return false;
			});
			
			$('#visitor_layer_bg').on('click', function(){
				$('#btn_main_visitor').click();
			});
			
			// 우측 HELLO 영역 클릭
			$('.W_hello_bar').on('click', function(){
				if ($('#visitor_layer').hasClass('show')) return;
				$('#btn_main_visitor').click();
			});
			
			// 모바일 HELLO
			$('.hello_m').on('click', function(){
				$('#btn_main_visitor').click();
			});
			
			// 모바일 닫기버튼
			$('#visitor_layer .btn-close').on('click', function(){
				$('#btn_main_visitor').click();
				return false;
			});
			
			
			// 방명록 등록하기
			$('#btn_feedback_submit').on('click', function(){
				_self.registerReview();
			});
			
			$('.view_more').on('click', function(){
				$('#btn_main_visitor').click();
			});
			
			_self.is_visitor_event_bind = true;
		}
		
	},
	"reviewCarousel" : function(click_obj, review_cnt){
		var _self = this;
		
		_self.showBlockUI();
		
		var $list = $('#review_carousel');
		$list.empty();
		$list.css('opacity', 0);
		
		var idx = 0;
		var review_nth = 0;
		
		// 메인에 뿌려진 데이터에서 정보를 가져옴
		$('#review .gmbox:visible').each(function(){
			var $rev = $(this);
			var _src = $rev.css('background-image').replace(/"/g, '');
			var _content = $rev.find('.gm-memo').html();
			var _writer = $rev.find('.gmwtr-name').html();
			
			if (this == click_obj) {
				idx = review_nth;
			}
			
			
			var $item = $('<div class="item"></div>');
			var _html = 
				'<div class="review-wrap" style="background-image:' + _src + '">' +
				'	<div class="bg"></div>' +
				'	<div class="txt-wrap">' +
				'		<div class="content">' + _content + '</div>' +
				'		<div class="writer">- ' + _writer + '</div>' +
				'	</div>' +
				'</div>';
			$item.html(_html);
			$list.append($item);
			
			review_nth++;
		});
		
		// 작성 슬라이드 추가
		var $w_item = $('<div class="item write"></div>');
		_src = '/img/rental/theme_01/notebg_' + gsap.utils.random(1, 11, 1) + '.jpg';
		var _html = 
			'<div class="review-wrap" style="background-image:url(' + _src + ')">' +
			'	<div class="bg"></div>' +
			'	<div class="txt-wrap">' +
			'		<div class="content">Say Hello to the ' + g360.rental_text.rental_artist2 + '!</div>' +
			'		<div class="btn-wrapper">' +
			'			<div class="btn-write btn-rect">Leave a Message</div>' +
			(review_cnt > 7 ? '<div class="btn-allview btn-rect">See All Messages</div>' : '') +
			'		</div>' +
			'	</div>' +
			'</div>';
		
		$w_item.html(_html);
		$list.append($w_item);
		
		// 닫기
		var $btn_close = $('#review_layer .btn-close');
		$btn_close.off().on('click', function(){
			_self.hideBlockUI();
			$('#review_layer').hide();			
			$list.trigger('destroy.owl.carousel');
		});
		
		// 방명록 작성
		$w_item.find('.btn-write').on('click', function(){
			$btn_close.click();
			gsap.to(window, {duration:0.5, scrollTo:"#feedback"});
		});
		// 방명록 전체보기
		$w_item.find('.btn-allview').on('click', function(){
			$btn_close.click();
			$('#btn_review_more').click();
		});
		
		
		$('#review_layer').show();
		
		$list.owlCarousel({
			center: true,
		    items:2,
		    loop:false,
		    margin:-100,
		    onInitialized: function(){
		    	$list.append($list.find('.owl-dots'));
		    	setTimeout(function(){
		    		$list.trigger('to.owl.carousel', [idx, 0]);
		    		gsap.fromTo($list, {y:300, opacity:0}, {y:0, opacity:1});
		    	}, 100);
	        },
	        responsive: {
	            1200: {
	                items: 3
	            }	            
	        }
		});
		
		if (!g360.isMobile()) {
			$list.find('.item:not(.write) .content').mCustomScrollbar({				
				theme:"minimal-dark"
			});
		}
		
		
		
		
		
	},
	"addAniName" : function(nm){
		if ($.inArray(nm, this.ani_nm) < 0) {
			this.ani_nm.push(nm);
		}
	},
	"animationRefresh" : function() {
		$.each(this.ani_nm, function(idx, val){
			var st = ScrollTrigger.getById(val);
			if (st) {
				st.refresh();
			}
		});
	},
	"loadReviewAll" : function(artkey) {
		var _self = this;
		$('#review_all_list').empty();
		
		if ($('body').hasClass('overflow-hidden')) {
			_self.is_body_scroll_hidden = true;
		} else {
			$('body').addClass('overflow-hidden');
		}
		
		g360.history_record_rental('review_all_layer');
		
		// 방명록 불러오기
		var url = '';
		// 작가상세 페이지
		if ($('#artist_detail_layer').is(':visible') && !artkey) {
			url = "/load_memo_artist.mon?rr=" + this.info.dockey + "&em=" + this.artistlist[this.cur_artistkey].email + "&start=0&perpage=1000&ak=";
		} else {
			url = "/load_memo.mon?rr=" + this.info.dockey + "&start=0&perpage=1000&ak=";
			if (artkey) url += artkey;
		}
		
		$.ajax({
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(res){
				
				var _html = '';
				var _src, _comment, _name, _reviewkey;
				var cnt = 0;
				
				if (res.length > 1) {
					var data = res.splice(1);
					$.each(data, function(){
						// 작품에 남긴 방명록인 경우
						if (this.art_key) {
							var filekey = this.art_key;
							var folder = _self.getEmail(filekey);
							_src = "/artimage/" + folder + "/art/preview/" + filekey + ".jpg?open";
							
						} else {
							// 대관에 남긴 방명록인 경우
							_src = '/img/rental/theme_01/notebg_' + gsap.utils.random(1, 11, 1) + '.jpg';
						}
						
						_comment = this.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
						_name = this.title;
						_reviewkey = this['_id']['$oid'];
												
						_html = _self.reviewFormat(_src, _comment, _name, _reviewkey ); // 삭제 안되도록 default로 키를 넘김
						$("#review_all_list").append(_html);
						cnt++;
					});
					

					$("#review_all_list").cubeportfolio({
						layoutMode: 'grid',
						defaultFilter: '*',
						animationType: "quicksand",
						gapHorizontal: 30,
						gapVertical: 30,
						gridAdjustment: "responsive",
						mediaQueries: [{
							width: 1500,
							cols: 4,
						}, {
							width: 1100,
							cols: 4
						}, {
							width: 800,
							cols: 3,
							gapHorizontal: 10,
							gapVertical: 10
						}, {
							width: 480,
							cols: 2
						}, {
							width: 320,
							cols: 1
						}],
					});
				    
				}
			}
		});
		
		
	},
	
	"setFooter" : function() {
		var _self = this;
		
	    var copyYear = new Date().getFullYear();
	    var copyText = $('#year');
	    if (copyYear <= 2018) {
	        copyText.text(copyYear);
	    } else {
	        copyText.text('2018-' + copyYear);
	    }

		var hostinfo = _self.info.info;
		if (!hostinfo) return;
		
		$('#host_name').html('주최 : ' + hostinfo.host);
		
		
		// 푸터 정보 초기화
		$('#host_tel').parent().hide();
		$('#host_email').parent().hide();
		//$('.host-sns-wrapper').hide();
		
		$('.sns-icon').hide();
		
		/*
		$('.host-sns-facebook').removeClass('show');
		$('.host-sns-twitter').removeClass('show');
		$('.host-sns-blog').removeClass('show');
		$('.host-sns-instagram').removeClass('show');
		$('.host-sns-youtube').removeClass('show');
		*/
				
		if (hostinfo.tel) {
			$('#host_tel').html(hostinfo.tel).attr('href', 'tel:' + hostinfo.tel);
			$('#host_tel').parent().show();
		}
		if (hostinfo.email) {
			$('#host_email').html(hostinfo.email).attr('href', 'mailto:' + hostinfo.email)
			$('#host_email').parent().show();
		}
		
		// SNS 설정
		if (hostinfo.facebook) {
			$('.facebook').show();
		}
		if (hostinfo.twitter) {
			$('.twitter').show();
		}
		if (hostinfo.blog) {
			$('.blog').show();
		}
		if (hostinfo.instagram) {
			$('.instagram').show();
		}
		if (hostinfo.youtube) {
			$('.youtube').show();
		}
		
		
		
	},
	
	// 방명록 등록
	"registerReview" : function(artkey){
		var _self = this;
		
		var field = {
			name: (artkey ? 'art_review_name' : 'visitor_name'),
			msg: (artkey ? 'art_review_msg' : 'visitor_msg'),
			pass: (artkey ? 'art_review_pass' : 'visitor_pass'),
		}
		
		var usernm = $.trim($('#'+field.name).val());
		var msg = $.trim($('#'+field.msg).val());
		var pass = $('#'+field.pass).val();
		
		/*
		 * Validation Check
		 */
		if (usernm == '') {
			g360.showToastMsg('이름을 입력해주세요');
			$('#'+field.name).focus();
			return false;
		}
		if (msg == '') {
			g360.showToastMsg('내용을 입력해주세요');
			$('#'+field.msg).focus();
			return false;
		}		
		if (pass == '') {
			g360.showToastMsg('패스워드를 입력해주세요');
			$('#'+field.pass).focus();
			return false;
		}
		if ($('#'+field.pass).val().indexOf(' ') >= 0) {
			g360.showToastMsg('패스워드에는 공백을 입력할 수 없습니다');
			$('#'+field.pass).val('');
			$('#'+field.pass).focus();
			return false;
		}
		
		
		var json = {
			title : usernm,
			content : msg,
			password : pass,
			rental_roomkey : _self.info.dockey	
		} 
		
		if (artkey) {
			json.art_key = artkey;
		}
		
		var data = JSON.stringify(json);
		
		
		
		var url = "/save_memo.mon";
		$.ajax({
			type : "POST",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			data : data,
			url : url,
			success : function(res){
				if (res.result == "OK"){
					g360.showToastMsg("방명록이 등록되었습니다.", 3000);
										
					if (artkey) {
						// 작품상세에서 등록한 경우
						_self.hideReviewArea();
						_self.drawReview();
						
					} else {
						
						/*
						// 메인에서 등록한 경우
						var _src = $('#exhibition .image img').attr('src');
						var _html = _self.reviewFormat(_src, msg, usernm);
						$('#visitor_slider').trigger('add.owl.carousel', [_html, 0]);
						$('#visitor_slider').trigger('to.owl.carousel', [0, 300]);
						*/
						
						// add하는 코어 소스가 정상적으로 동작하지 않아 새로 불러와 뿌려줌
						//_self.setVisitor();
					}
					
				}else{
					g360.showToastMsg("저장시 오류가 발생하였습니다.");
					//alert("저장시 오류가 발생하였습니다.");
				}
				$('#btn_pass_cancel').click();
			},
			error : function(e){
				//g360.gAlert("Info","오류가 발생하였습니다.", "blue", "top");
			}
		});
		
		$('#'+field.name).val('');
		$('#'+field.msg).val('');
		$('#'+field.pass).val('');
	},
	
	"reviewFormat" : function(src, comment, name, reviewkey) {
		var btn_del = '';
		if (reviewkey != 'default' && reviewkey != 'art') {
			btn_del = '<div class="btn-remove" data-reviewkey="' + reviewkey + '" onclick="rs.showPassDialog(\'' + reviewkey + '\')"></div>';
		}
		
		var color_idx = gsap.utils.random(1,8,1);
				
		var res = 
		'<div class="review-item cbp-item">' +
		'	<div class="review-wrap color' + color_idx + '">' +
		'		<div class="review-img-bg" style="background-image:url(' + src + ')"></div>' +
		'		<div class="review-txt-wrap">' +
		'			<div class="review-content">' + comment.replace(/(?:\r\n|\r|\n)/g, '<br />') + '</div>' +
		btn_del +
		'			<div class="review-name">- ' + name + '</div>' +
		'		<div>' +
		'	</div>' +
		'</div>';
		return res;
	},
	
	"showPassDialog" : function(reviewkey, is_artdetail) {
		var _self = this;
		_self.showBlockUI();
		$('#password_layer').show();
		gsap.fromTo('#password_layer', {opacity:0, y:200}, {opacity:1, y:0, duration: 0.3});
		$('#visitor_password').focus();
		
		var $more_list = $('#art_review_list');
		
		$('#btn_pass_ok').off().on('click', function(){
			var pass = $('#visitor_password').val();
			if (pass == '') {
				g360.showToastMsg("패스워드를 입력해주세요.");
				return;
			}
			$.ajax({
				url : "/delete_memo.mon" + "?key=" + reviewkey + "&pw=" + pass,
				success : function(res){
					if (res.result == "OK"){
						g360.showToastMsg("선택하신 방명록이 삭제되었습니다.");
						//alert("선택하신 방명록이 삭제되었습니다.");
						$('#visitor_password').val('');
						$('#btn_pass_cancel').click();
						
						if ($more_list.length) {
							// 작품상세에서 View more 버튼 클릭하여 방명록 전체보기 한 경우
							var remove_idx = $('#art_detail_visitor .btn-remove[data-reviewkey="' + reviewkey + '"]').closest('.owl-item').index();
							$("#art_detail_visitor").trigger('remove.owl.carousel', remove_idx).trigger('refresh.owl.carousel');
							// 더 이상 리뷰가 없으면 리프레쉬
							if ($("#art_detail_visitor .owl-item").length == 0) {
								_self.drawReview();
							}
							
							var remove_obj = $more_list.find('.btn-remove[data-reviewkey="' + reviewkey + '"]').closest('.review-item');
							$more_list.cubeportfolio('remove', remove_obj);
						} else {
							if (is_artdetail) {
								var remove_idx = $('#art_detail_visitor .btn-remove[data-reviewkey="' + reviewkey + '"]').closest('.owl-item').index();
								$("#art_detail_visitor").trigger('remove.owl.carousel', remove_idx).trigger('refresh.owl.carousel');
								// 더 이상 리뷰가 없으면 리프레쉬
								if ($("#art_detail_visitor .owl-item").length == 0) {
									_self.drawReview();
								}					
							} else {
								var remove_obj = $('#visitor_layer .btn-remove[data-reviewkey="' + reviewkey + '"]').closest('.review-item');
								$('#review_all_list').cubeportfolio('remove', remove_obj);
							}
						}
						
						
					}else{
						g360.showToastMsg("패스워드가 맞지 않습니다.");
					}
				},
				error : function(e){

				}
			});
		});
		
		$('#btn_pass_cancel').off().on('click', function(){
			//_self.hideBlockUI(is_artdetail);
			_self.hideBlockUI(true);
			$('#password_layer').hide();
			$('#visitor_password').val('');
		});
		
		_self.isPassEventInit = true;
	},
	
	"showArtistDetail" : function(artistkey) {
		var _self = this;
		this.cur_artistkey = artistkey;
		
		g360.history_record_rental('btn_artist_back');
		
		// 방명록 탭 숨김
		$('#visitor_layer').removeClass('showtab');
		
		$('.W_hello_bar').on('mouseenter', function(){
			$('#visitor_layer').addClass('showtab');
		});
		$('.W_hello_bar').on('mouseleave', function(){
			$('#visitor_layer').removeClass('showtab');
		});
		
		var data = this.artistlist[artistkey];
		var sep;
		var src_artist_ori = g360.user_photo_color_url(data.email);	//오리지널 이미지
		var src_artist = g360.user_photo_profile_url(data.email);	//사이즈에 맞춰 자른 이미지
				
		// 버전 정보 추가
		src_artist_ori += (data.photoimage_profile_version ? '?open&ver=' + data.photoimage_profile_version : '');
		src_artist += (data.photoimage_profile_version_full ? '?open&ver=' + data.photoimage_profile_version_full : '');
		
		var css_url = '';
		var img_url = '';
		
		if (data.photoimage_profile_full) {
			css_url = 'url(' + src_artist + ')';
			img_url = src_artist;
		} else if (data.photoimage_profile) {
			css_url = 'url(' + src_artist_ori + ')';
			img_url = src_artist_ori;
		} else {
			css_url = 'url(' + data.last_art_src + ')'
			img_url = data.last_art_src;
		}
		
		
		$('#artist_info_name').html(data.nickname);
		$('#artist_info_ename').html('<span class="sepa">/</span>' + data.name_eng);
		if (data.nickname == data.name_eng) {$('#artist_info_ename').hide();} 

		gsap.set('#artist_pic', {opacity:0});
		gsap.set('#artist_m_pic', {opacity:0});
		$('#artist_pic').css('background-image', css_url);
		$('#artist_m_pic').attr('src', img_url);
		$('#artist_pic').imagesLoaded({background: true}, function(){
			gsap.to('#artist_pic', {opacity:1});
		});
		$('#artist_m_pic').imagesLoaded(function(){
			gsap.to('#artist_m_pic', {opacity:1});
		});
		

		// 모든 레이어 숨김 처리
		$('.tab_info li').removeClass('on selected');
		$('#artist_info_content1').hide();
		$('#artist_info_content2').hide();
		$('#artist_info_group').hide();
		$('#artist_info_education').hide();
		$('#artist_info_career').hide();
		$('#artist_info_cert').hide();
		$('#artist_info_display').hide();
		
		// 상단 버튼 이벤트
		$('.tab_info li').off();
		$('.tab_info li').on('click', function(){
			if ($(this).hasClass('selected')) return;
			
			// 작품보기인 경우 스크롤 이동
			if ($(this).attr('id') == 'btn_artist_art') {
				$(this).addClass('on');
				setTimeout(function(){ $('#btn_artist_art').removeClass('on'); }, 250);
				$('html,body').animate({scrollTop:$('#exhibit').offset().top}, 500);
				return;
			}			

			$('.tab_info li').removeClass('on selected');
			$(this).addClass('on selected');
			var btn_id = $(this).attr('id'); 
			var layer_id = btn_id.substr(btn_id.lastIndexOf('_') + 1);
			$('.txt_box p').hide();
			if (layer_id == 'content') {
				$('#artist_info_content1').show();
				$('#artist_info_content2').show();
			} else {
				$('#artist_info_' + layer_id).show();
			}
		});
		
		// hover CSS로 처리하면 작품보기에서 클릭시 hover CSS가 남기 때문에 js에서 처리함
		if (!g360.isMobile()) {
			$('.tab_info li').on('mouseenter', function(){
				$(this).addClass('on');	
			});
			$('.tab_info li').on('mouseleave', function(){
				if (!$(this).hasClass('selected')) {
					$(this).removeClass('on');					
				}
			});			
		}
		
		
		// 작가네비게이션 버튼 이벤트
		var artist_idx = $('#artist_list li[data-artistkey="' + artistkey + '"]').index();
		var $artist_prev = $('#artist_detail_layer .prev');
		var $artist_next = $('#artist_detail_layer .next');
		$artist_prev.off();
		$artist_next.off();
		
		if (g360.isMobile()) {
			//$artist_prev.removeClass('on');
			//$artist_next.removeClass('on');
		}
		// 이전 작가 버튼 
		if (artist_idx == 0) {
			$artist_prev.addClass('disable');
		} else {
			$artist_prev.removeClass('disable');
			$artist_prev.on('click', function(){
				if (g360.isMobile()) {
					$artist_prev.addClass('on');
					setTimeout(function(){$artist_prev.removeClass('on');}, 250);
				}
				var go_artistkey = $('#artist_list li:eq(' + (artist_idx-1) + ')').data('artistkey');
				_self.showArtistDetail(go_artistkey);
			});
		}
		// 다음 작가 버튼	
		if (artist_idx == (this.info.artistlist.length - 1)) {
			$artist_next.addClass('disable');
		} else {
			$artist_next.removeClass('disable');
			$artist_next.on('click', function(){
				if (g360.isMobile()) {
					$artist_next.addClass('on');
					setTimeout(function(){$artist_next.removeClass('on');}, 250);
				}
				var go_artistkey = $('#artist_list li:eq(' + (artist_idx+1) + ')').data('artistkey');
				_self.showArtistDetail(go_artistkey);
			});
		}
		
		$artist_prev.on('mouseenter', function(){
			$(this).addClass('on');	
		});
		$artist_prev.on('mouseleave', function(){
			$(this).removeClass('on');	
		});
		$artist_next.on('mouseenter', function(){
			$(this).addClass('on');	
		});
		$artist_next.on('mouseleave', function(){
			$(this).removeClass('on');	
		});
		
		
		
		// 작가소개 (소개글, 작가노트)
		$('#btn_artist_content').hide();
		$('#artist_info_content1').removeClass('pb0');
		if (data.content) {
			$('#artist_info_content1').html('<b><i class="fas fa-user-edit fa-xs pr10"></i>소개글</b><div class="detail-cont">' + g360.textToHtml_Body(data.content) + '</div>');
			$('#btn_artist_content').show();
		} else {
			$('#artist_info_content1').addClass('pb0');
			$('#artist_info_content1').html('');
		}
		if (data.content2) {
			$('#artist_info_content2').html('<b><i class="fas fa-quote-left fa-xs pr10"></i>' + g360.rental_text.content2 + '</b><div class="detail-cont">' + g360.textToHtml_Body(data.content2) + '</div>');
			$('#btn_artist_content').show();
		} else {
			$('#artist_info_content1').addClass('pb0');
			$('#artist_info_content2').html('');
		}
			
		
		// 소속 및 단체
		var group = '';
		sep = '';
		$.each(data.group, function(){
			group += sep;
			group += this.title;
			group += this.dept ? ' ' + this.dept : '';
			group += this.jobtitle ? ' ' + this.jobtitle : '';
			sep = '\n';
		});
		if (group == '') {
			$('#btn_artist_group').hide();
			group = '정보없음';
		} else {
			$('#btn_artist_group').show();
		}
		$('#artist_info_group').html('<b><i class="fas fa-users fa-xs pr10"></i>소속 및 단체</b><div class="detail-cont">' + g360.textToHtml_Body(group) + '</div>');
		
		// 학력
		var edu = '';
		sep = '';
		$.each(data.education, function(){
			edu += sep;
			edu += this.end + '  ';
			edu += this.schoolname;
			edu += this.major ? '  ' + this.major : '';
			edu += this.level ? '  ' + this.level : '';
			edu += this.status;
			sep = '\n';
		});
		if (edu == '') {
			$('#btn_artist_education').hide();
			edu = '정보없음';
		} else {
			$('#btn_artist_education').show();
		}
		$('#artist_info_education').html('<b><i class="fas fa-graduation-cap fa-xs pr10"></i>학력정보</b><div class="detail-cont">' + g360.textToHtml_Body(edu) + '</div>');
		
		// 수상경력
		var career = '';
		sep = '';
		if (!data.career || data.career.length == 0) {
			$('#btn_artist_career').hide();
			career = '정보없음';
		} else {
			career = '<table class="artist-career-table" style="width:100%;">';
			career += '<colgroup><col style="width:$width$;" /><col style="width:auto;" /></colgroup>';
			$.each(data.career, function(){
				career += '<tr>';
				career += '<td>' + this.term + '</td>';
				career += '<td>' + g360.textToHtml_Body(this.title) + '</td>';
				career += '</tr>';
				if (this.term) sep = 'T';
			});
			career += '</table>';
			career = career.replace(/\$width\$/g, (sep == 'T' ? 'auto' : '0'));
			$('#btn_artist_career').show();
		};
		$('#artist_info_career').html('<b><i class="fas fa-trophy fa-xs pr10"></i>수상경력</b><div class="detail-cont">' + career + '</div>');
		
		// 소장처 정보
		var cert = '';
		sep = '';
		if (!data.cert || data.cert.length == 0) {
			$('#btn_artist_cert').hide();
			cert = '정보없음';
		} else {
			cert = '<table class="artist-career-table">';
			//cert += '<colgroup><col style="width:$width$;" /><col style="width:auto;" /></colgroup>';
			$.each(data.cert, function(){
				cert += '<tr>';
				cert += '<td>' + g360.textToHtml_Body(this.certname) + '</td>';
				cert += '</tr>';
				if (this.term) sep = 'T';
			});
			cert += '</table>';
			//cert = cert.replace(/\$width\$/g, (sep == 'T' ? '40' : '0'));
			$('#btn_artist_cert').show();
		};
		$('#artist_info_cert').html('<b><i class="fas fa-map-marked fa-xs pr10"></i>작품 소장처</b><div class="detail-cont">' + cert + '</div>');
		
		// 전시 및 프로젝트 경력
		var display = '';
		sep = '';
		if (!data.display || data.display.length == 0) {
			$('#btn_artist_display').hide();
			display = '정보없음';
		} else {
			display = '<table class="artist-career-table">';
			display += '<colgroup><col style="width:$width$;" /><col style="width:auto;" /></colgroup>';
			$.each(data.display, function(){
				display += '<tr>';
				display += '<td>' + this.term + '</td>';
				display += '<td>' + g360.textToHtml_Body(this.title) + '</td>';
				display += '</tr>';
				if (this.term) sep = 'T';
			});
			display += '</table>';
			display = display.replace(/\$width\$/g, (sep == 'T' ? 'auto' : '0'));
			$('#btn_artist_display').show();
		};
		$('#artist_info_display').html('<b><i class="fas fa-palette fa-xs pr10"></i>전시 및 프로젝트 경력</b><div class="detail-cont">' + display + '</div>');
		
		// 작품
		var artlist = this.artistlist[artistkey].artlist;
		var $list = $('#artist_detail_art');
		var art_cnt = 0;
		var $wrap;
		$list.empty();
		
		$.each(artlist, function(idx, val){
			art_cnt++;
			
			if (art_cnt%4 == 1) {
				$wrap = $('<div class="section"></div>');
				$list.append($wrap);
			}
			
			var _email = _self.getEmail(this.filekey);
    		var _src = g360.preview_img_path(_email, this.filekey);
			var _html = 
				'<div class="art" data-artkey="' + this.filekey + '" data-artistkey="' + artistkey + '" style="background-image:url(' + _src + ')">' +
				'	<div class="inner_art">' +
				'		<div><h2>' + this.name + '</h2></div>' +
				'		<div>by.' + _self.artistlist[artistkey].name + '</div>' +
				'	</div>' +
				'</div>';
			
			var $art_obj = $(_html);
			$wrap.append($art_obj);
		});
		
		$list.find('.art').on('click', function(){
			_self.showArtDetail($(this).data('artkey'), $(this).data('artistkey'));
		});
		
				
		$('#header').addClass('black');
		$('#btn_mobile_menu').addClass('black');
		$('#artist_detail_layer').show();
		$('#main_wrap').hide();
		$('html').scrollTop(0);
		
		
		if (!g360.isMobile()) {
			$('#artist_detail_layer .txt_box').mCustomScrollbar({				
				theme:"minimal-dark",
				mouseWheelPixels: 150,
				mouseWheel:{ preventDefault: false },
				autoExpandScrollbar: true
			});
		}
		
		
		// 작가정보 첫 번째 값 뿌려주기
		var first_li = $('.tab_info li:visible:eq(0)');
		if (first_li.attr('id') != 'btn_artist_art') {
			first_li.click();
		}
		
		
	},
	"showArtistByIndex" : function(idx){
		
	},
	"closeArtistDetail" : function(){
		// 방명록 마우스 오버 이벤트
		$('.W_hello_bar').off('mouseenter');
		$('.W_hello_bar').off('mouseleave');
		
		// 전체 작가 리스트 표시중인 경우 닫힘 처리
		this.closeAllArtistList();
		
		$('#artist_detail_layer').hide();
		$('#artist_pic').attr('src', '');
		$('#main_wrap').show();
		if (window.before_scroll) {
			$('html').scrollTop(window.before_scroll);
			window.before_scroll = null;
		}
		ScrollTrigger.refresh();
	},
	"showGroupList" : function(code){
		// 그룹 html 생성
		this.createGroupHtml(code);
		
		// 그룹 제목
		$('.grp-title').html(g360.textToHtml_Body(this.info.info.group_title));
		
		// 그룹 링크
		var $link_btn = $('<b><span class="hidden">링크 복사</span></b>');
		$link_btn.on('click', function(){
			var link_url = location.protocol + '//' + location.host + '/rental/group_list.jsp?key=' + code;
			g360.copyToClipboard(link_url);	
		});
		
		
		//$('#group_list_title').append($link_btn);
		$('.grp-title').append($link_btn);
		
		
		// 그룹 설명
		$('#group_list_comm').html(g360.textToHtml_Body(this.info.info.group_content));
		
		// 리스트 불러오기
		this.getGroupList(code);
	},
	"createGroupHtml" : function(code){
		var _self = this;
		var group_html = 
			'<div id="group_list_layer" class="group-exhibition-map grp-dark">' +
			'	<div class="grp-header">' +
			'		<div class="center-box">' +
			'			<h2 class="logo-rental-sub">GROUP EXHIBITION</h2>' +
			'			<div class="grp-search-mobile"><span></span><span></span></div>' +
			'			<div id="btn_group_close" class="close-btn"><span></span><span></span></div>' +
			'		</div>' +
			'	</div>' +
			'	<div class="grp-list-wrap">' +
			'		<div class="center-box">' +
			'			<div class="grp-title-box">' +
			'				<h3 id="group_list_title" class="grp-title animate__animated animate__fadeInUp"></h3>' +
			'				<p id="group_list_comm" class="grp-detail animate__animated animate__fadeInUp"></p>' +
			'			</div>' +
						
			'			<div class="grp-search">' +
			'				<h3 class="grp-title"></h3>' +
			'				<b class="grp-total-view">누적 관람객 수 : <span id="group_viewcount"></span></b>' +
			'				<form class="group-search-box">' +
			'					<div>' +
			'						<div class="group-search-input">' +
			'							<input id="rental_search_txt" type="search" placeholder="검색어를 입력해 주세요">' +
			'							<button id="btn_rental_search_reset" type="reset" value="erase"><span></span><span></span></button>' +
			'						</div>' +
			'						<button id="btn_rental_search" type="button" value="search"></button>' +
			'					</div>' +
			'				</form>' +
			'			</div>' +
		
			'			<div id="group_list" class="grp-events"></div>' +
			'		</div>' +
			'	</div>' +
			'</div>';
		$('body').append(group_html);
		
		/*
		 * 이벤트 바인딩
		 */
		
		// 닫기, 모바일 닫기
		$('#btn_group_close').on('click', function(){			
			// 모바일 닫기
			var is_mobile = $('.group-search-box .center-box').length;
			if (is_mobile) {
				
				// 검색 결과창에서 닫기 누른 경우 이전으로 되돌아가기
				if (_self.is_search_result) {
					$('#rental_search_txt').val('');
					_self.getGroupList(code);
					$(this).removeClass('searchOn');
					$('.grp-search .group-search-box').hide();
	                $('.grp-search-mobile').animate({
	                    opacity: '1',
	                    left: '0'
	                });
				} else {
					if ($(this).hasClass('searchOn')) {
						// 검색창이 열린경우 검색창 닫기
						$(this).removeClass('searchOn');
						$('.grp-search .group-search-box').hide();
		                $('.grp-search-mobile').animate({
		                    opacity: '1',
		                    left: '0'
		                });
					} else {
						// 검색창이 닫힌경우 레이어 닫기
						$('body').removeClass('overflow-hidden');
						$('#group_list_layer').fadeOut(function(){
							$('#group_list_layer').remove();
							$(window).off('scroll.grp mousewheel.grp resize.grp');
						});
					}
				}
				
				
			} else {
				
				// 일반 닫기
				$('body').removeClass('overflow-hidden');
				$('#group_list_layer').fadeOut(function(){
					$('#group_list_layer').remove();
					$(window).off('scroll.grp mousewheel.grp resize.grp');
				});
				
			}
		});
		
		// 검색어 입력
		$('#rental_search_txt').on('keydown', function(e){
			if (e.keyCode == 13) {
				var qry = $.trim($('#rental_search_txt').val());
				if (qry != '') {
					_self.getGroupList(code, qry);
				}
				return false;
			}
		});
		// 검색 버튼
		$('#btn_rental_search').on('click', function(e){
			var qry = $.trim($('#rental_search_txt').val());
			if (qry != '') {
				_self.getGroupList(code, qry);
			}
		});
		
		// 검색 닫기
		$('#btn_rental_search_reset').on('click', function(){
			_self.getGroupList(code);
			$('#rental_search_txt').focus();
		});
		
		// 스크롤에 따라 상단 헤더 변경하기
		$(window).off('scroll.grp mousewheel.grp').on({
            'scroll.grp mousewheel.grp': function() {
                var searchPosition = $('.grp-search').position().top;
                var getTop = parseInt($('.grp-search').css('top').replace('px', ''), 10) - 10;               
                
                
                if (searchPosition == getTop) {
                    $('.grp-search .grp-title').slideDown(200);
                }

                if (searchPosition > getTop) {
                    $('.grp-search .grp-title').hide(200);
                }
            }
        });
		
		$(window).off('resize.grp').on('resize.grp', function() {
            if ($(window).width() <= 768) {
                $('.group-search-box>div').addClass('center-box');
            } else {
                $('.group-search-box>div').removeClass('center-box');
                $('.grp-search .group-search-box').show();
            }
        });
		
		//MOBILE 검색버튼
        $('.grp-search-mobile').on('click', function() {
            $(this).animate({
                opacity: '0',
                left: '30px'
            });
            $('.group-exhibition-map .close-btn').addClass('searchOn');
            $('.grp-search .group-search-box').fadeIn();
            $('#rental_search_txt').focus();
        });       
		
		$(window).resize();
		
		
	},
	"getGroupList" : function(code, query){
		// 그룹 리스트
		var $list = $('#group_list');
		var url = "/load_group_list.mon";
		var qry = '';
		
		if (query) {
			qry = query;
			$('#btn_rental_search_reset').show();
			$('#btn_rental_search').addClass('on');
			this.is_search_result = true;
		} else {
			$('#btn_rental_search_reset').hide();
			$('#btn_rental_search').removeClass('on');
			this.is_search_result = false;
		}
		
		var data = JSON.stringify({
			code : code,
			q_str : qry
		})
		
		var viewcount = 0;
		
		$list.empty();
		
		return $.ajax({
			type : "POST",
			dataType: "json",
			contenType : "application/json; charset=utf-8",
			data : data,
			url : url,
			success : function(res){
				if (res.length == 0) {
					if (qry != '') {
						$list.append('<div class="grp-no-result">검색 결과가 없습니다.</div>');
					} else {
						alert("그룹핑된 대관이 아닙니다.");
					}
					return;
				}
				
				// 제목정렬
//				res.sort(function(a,b){
//					 return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
//				});
				
				res.sort(function(a,b){
					var num_regex = /^(\d*)/g;
					var a_titl = parseInt(a.title.match(num_regex)[0] || "0", 10);
					var b_titl = parseInt(b.title.match(num_regex)[0] || "0", 10);
					
					var res = 0;
					if (a_titl != b_titl) {
						// 앞 번호가 숫자인 경우 
						res = (a_titl == 0 || a_titl > b_titl ? 1 : -1);
					} else {
		                // 둘 다 문자인 경우
						res = (a.title > b.title ? 1 : -1);
					}
					
					return res;

				});
				
				
				$.each(res, function(i){
					var rental_obj = this;
					//1~5까지 랜덤숫자
					var random = Math.floor( Math.random() * 5 + 1 );
					var $li = $(
						'<div class="grp-exhi-box animate__animated animate__fadeIn" style="animation-delay:0.' + random + 's">' +
					    '	<div class="grp-thumb" style="background-image: url(' + rental_obj.service_image + ')">' +
					    '	  	<a href="#">' +
					    '			<div class="grp-exhi-info">' +
					    '				<p class="grp-exhi-title">' + g360.textToHtml_Body(rental_obj.title) + '</p>' +
		                '				<p class="grp-exhi-detail">' + g360.textToHtml_Body(rental_obj.express) + '</p>' +
					    '			</div>' +
					    '			<div class="border-box"></div>' +
					    '		</a>' +
					    '	</div>' +
					    '</div>'
					);
					$li.on('click', function(){
						var open_url = location.protocol + '//' + location.host + '/v/' + rental_obj.short_url;
						window.open(open_url);
					});
					$list.append($li);
					
					if (!isNaN(rental_obj.viewcount)) {
						viewcount += rental_obj.viewcount;					
					}
				});
								
				$('#group_viewcount').text(g360.numberComma(viewcount));
				$('#group_list_layer').show();
			},
			error : function(e){
				alert("오류가 발생했습니다.");
				console.log(e);
			}
			
		});
	},
	"showGroupList_bak" : function(code) {
		var _html = '';
		
		// 그룹 제목
		$('#group_list_title').html(g360.textToHtml_Body(this.info.info.group_title));
		
		// 그룹 링크
		var $link_btn = $('<span class="btn-group-link"></span>');
		$link_btn.on('click', function(){
			var link_url = location.protocol + '//' + location.host + '/rental/group_list.jsp?key=' + code;
			g360.copyToClipboard(link_url);	
		});
		
		$('#group_list_title').append($link_btn);
		
		// 그룹 설명
		$('#group_list_comm').html(g360.textToHtml_Body(this.info.info.group_content));
		
		// 그룹 리스트
		var $list = $('#group_list');
		var url = "/load_group_list.mon";		
		var data = JSON.stringify({
			code : code
		});
		
		var viewcount = 0;
		$.ajax({
			type : "POST",
			dataType: "json",
			contenType : "application/json; charset=utf-8",
			data : data,
			url : url,
			success : function(res){

				res.sort(function(a,b){
					 return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
				});
				
				$.each(res, function(i){
					var rental_obj = this;
					var $li = $(
						'<li class="select_group-list_rental animate__animated animate__fadeIn">' +
					    '	<div class="imgbox_group-list_rental" style="background-image: url(' + rental_obj.service_image + ')">' +
					    '	  	<div class="imgbox-blank"></div>' +
					    '		<span>' +
					    '			<h4>' + g360.textToHtml_Body(rental_obj.title) + '</h4>' +
		                '			<p>' + g360.textToHtml_Body(rental_obj.express) + '</p>' +
					    '		</span>' +
					    '	</div>' +
					    '</li>'
					);
					$li.on('click', function(){
						var open_url = location.protocol + '//' + location.host + '/v/' + rental_obj.short_url;
						window.open(open_url);
					});
					$list.append($li);
					
					if (!isNaN(rental_obj.viewcount)) {
						viewcount += rental_obj.viewcount;					
					}
				});
				
				$('#group_viewcount').text(g360.numberComma(viewcount));
			},
			error : function(e){
				console.log(e);
			}
			
		});
			
		
	},
	
	"showBlockUI" : function(anim_ms){
		var _self = this;
		var $block = $('.blockui');
		if (!$block.is(':visible')) {
			$block.fadeIn(isNaN(anim_ms) ? 0 : anim_ms);
			$('body').addClass('overflow-hidden');
		}
	},
	"hideBlockUI" : function(remove_pass){
		$('.blockui').hide();
		if (!remove_pass) $('body').removeClass('overflow-hidden');
	},
	"hideLoading" : function(){
		var _self = this;
		window.is_loading_complete = true;
		
		// 로고가 다 그려졌는지 확인 후 히든 처리
		if (window.is_logo_draw_complete) {
			gsap.fromTo('.loading-text-box', {scale:1, opacity:1}, {
				scale: 0.5, 
				opacity: 0.3, 
				duration: 1,
				onComplete: function(){
					
				}
			});
			setTimeout(function(){
				$('html').scrollTop(0);
				$('.loader').fadeOut(300);
			    $('.side-menu').removeClass('opacity-0');
			    $('body').removeClass('overflow-hidden');
			    setTimeout(function(){
			    	$('#main_visual').click();
			    }, 1000);
			    _self.countShow();
			}, 200);
		}

	},
	"showLoadingTop" : function(msg){
		$('#loader_top').show();
		if (msg) {
			$('#loading_msg').text(msg);			
		}
	},
	"hideLoadingTop" : function(){
		$('#loader_top').hide();
	},
	
	
	"artDetailEvent" : function(){
		var _self = this;
		// 확대보기 이미지 다운로드 진행상황을 확인하기 위해 Image객체 함수 추가
		Image.prototype.load = function(url) {
			var thisImg = this;
			var xmlHTTP = new XMLHttpRequest();
			xmlHTTP.open('GET', url, true);
			xmlHTTP.responseType = 'arraybuffer';
			xmlHTTP.onload = function(e) {
				var blob = new Blob([this.response]);
				thisImg.src = window.URL.createObjectURL(blob);
			};
			xmlHTTP.onprogress = function(e) {
				thisImg.completedPercentage = parseInt((e.loaded / e.total) * 100);
				if (typeof(thisImg.progress) == 'function') {
					thisImg.progress(thisImg.completedPercentage, e.total);
				}
			};
			xmlHTTP.onloadstart = function() {
				thisImg.completedPercentage = 0;
			};
			xmlHTTP.send();
		};
		Image.prototype.completedPercentage = 0;
		
		
		// 확대보기
		if (_self.use_img) {
			$('.art_area, .art_m_area').on('click', function(){
				
				$('.blockui').addClass('opacity-10').show();
				
				var mz = g360.maxZindex();
				$('#art_zoom_detail').empty();
				$('#art_zoom_wrapper').css('z-index', mz+1).show();
				
				var img_url = '/artimage/' + _self.cur_art_info.email + '/art/' + _self.cur_art_info.dockey;
				img_url += '?open&ver=' + _self.cur_art_info.version;
				
				
				var loading_html = 
					'<div class="detail-loading">' +
					'	<img src="/img/BI_loading-2.gif" />' +
					'	<div class="progress-border">' +
					'		<div class="progress-bar"></div>' +
					'	</div>' +
					'	<span class="progress-text">준비중..</span>' +
					'</div>';
				
				
				var overlay = $('#art_zoom_detail');
				var loading = $(loading_html);
				
				var img_obj = new Image();
				//var $panzoom = $('<img src="' + img_url + '" style="max-width:100%;">');
				var $panzoom = $(img_obj).css('max-width', '100%');
				var $range = $("#art_zoom_header .zoom-range");
				
				function valueChanged(e){
					var a = e.value;
					var end = a*10;
					var cnt = 0;
					for (var start = 5 ; start<end ; start++) {
						cnt++;
					}
					var res = cnt / 25 * 100; // 넘어값 input값을 퍼센트로 변환
					e.style.background = 'linear-gradient(to right, #0075ff, #0075ff ' + res + '%,#efefef ' + res + '%)';
				}
				
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
					
					// input range변경값을 이벤트로 받아 백그라운드 변경 (range ui변경)
					$range.off('input.ui').on('input.ui', function(){
						valueChanged(this);
					});
					valueChanged($range.get(0));
					
					
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
					_self.zoomProc = setTimeout(function(){
						loading.remove();
						$range.show();
						$panzoom.css('margin-top', parseInt((overlay.innerHeight() - $panzoom.outerHeight()) / 2, 10));
						$panzoom.css('opacity', '1');
						init_panzoom();						
					}, 500);
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
				
				var prog_bar = loading.find('.progress-bar');
				var prog_txt = loading.find('.progress-text');
				img_obj.progress = function(per, total){
					var txt = (per >= 100 ? '처리중..' : per + '%');
					if (per >= 100) per = 99;
					prog_bar.css('width', per + '%');
					prog_txt.text(txt);
				};
				img_obj.load(img_url);
				
				$(document).off('touchmove.zoom').on('touchmove.zoom', function(e) {});
				
				g360.history_record_rental("btn_art_zoom_close");
				return false;
			});
		}
		
		
		$('#btn_art_zoom_close').off('click').on('click', function(){
			$('.blockui').removeClass('opacity-10').hide();
			//$('body').removeClass('overflow-hidden');
			$('#art_zoom_wrapper').hide();

			// 메모리 릴리즈
			window.URL.revokeObjectURL($('#art_zoom_detail img').get(0).src)
			$('#art_zoom_detail').empty();
			
			$(window).off('resize.panzoom_resize');
			$(document).off('touchmove.zoom');
		});
		
		var $btn_wrap = $('#art_detail_layer .media');
		
		// 3D
		$btn_wrap.find('.btn_3d').on('click', function(){
			if ($('#art3d_layer iframe').attr('src') == '') {
				$('#art3d_layer iframe').attr('src', _self.d3_url);
			}
			$('#art3d_layer').show();
		});
		// 3D 닫기
		$('#art3d_layer .btn-close').on('click', function(){
			$('#art3d_layer').hide();
		});
		
		// 도슨트 플레이
		$btn_wrap.find('.btn_sound').on('click', function(){
			try {
				if ($(this).hasClass('on')) {
					if ($(this).hasClass('pause')) {
						_self.audio.play();
						_self.getAudioTime();
						if (g360.time_interval) clearInterval(g360.time_interval);
						g360.time_interval = null;
						g360.time_interval = setInterval(function(){_self.getAudioTime();}, 1000);
						$(this).removeClass('pause');
					} else {
						_self.audio.pause();
						if (g360.time_interval) clearInterval(g360.time_interval);
						g360.time_interval = null;
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
		$btn_wrap.find('.btn_video').on('click', function(){
			// 오디오 재생중이면 중지
			_self.stopAudio();
			
			var _email = _self.cur_art_info.art_mp4_filename.substring(0, _self.cur_art_info.art_mp4_filename.lastIndexOf('_'));
			var video_src = g360.video_path(_email, _self.cur_art_info.art_mp4_filename);
			g360.showVideo(video_src);
		});
		
		// 유튜브 플레이
		$btn_wrap.find('.btn_youtube').on('click', function(){
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
		$btn_wrap.find('.btn_portfolio').on('click', function(){
			var url = g360.portfolio_path(_self.cur_art_info.email, _self.cur_art_info.art_portfolio);
			window.open(url);
		});
		
		// 작가상세보기 클릭
		$('.btn-author').on('click', function(){
			$('#btn_art_close').click();
			if (!window.before_scroll) {
				window.before_scroll = $('html').scrollTop();				
			}
			var artistkey = _self.artistlist_byemail[_self.cur_art_info.email].artistkey;
			_self.showArtistDetail(artistkey);
		});
		
		// 방명록 표시
		$('.btn-gb-write').on('click', function(){
			_self.showReviewArea();
		});
				
		// 방명록 닫기
		$('#btn_art_review_close').on('click', function(){
			_self.hideReviewArea();
		});
		
		// 방명록 작성
		$('#btn_art_review_submit').on('click', function(){
			_self.registerReview(_self.cur_art_info.dockey);
		});
		
		// 방명록 더보기
		$('#btn_review_more').on('click', function(){
			_self.showArtReview();
		});
		
	},
	// 방명록 작성 영역 표시
	"showReviewArea" : function(){
		$('#art_review_name').val('');
		$('#art_review_pass').val('');
		$('#art_review_msg').val('');
		$('#art_review_layer').addClass('show');
		$('#art_review_name').focus();
	},
	"hideReviewArea" : function(){
		$('#art_review_name').val('');
		$('#art_review_pass').val('');
		$('#art_review_msg').val('');
		$('#art_review_layer').removeClass('show');
	},
	"showArtReview" : function(){
		var _self = this;
		var _html = 
			'<div class="art-review-layer">' +
			'	<button class="btn-popup-close" style="position:fixed;"></button>' +
			'	<div class="art-review-wrap">' +
			
			'		<div id="art_review_list"></div>' +
			'	</div>' +
			'</div>';
		var $layer = $(_html);
		$('.art-detail-inner').css('overflow-y', 'hidden');
		$('body').append($layer);
		$layer.on('click', function(e){
			if (e.target == this) {
				_self.hideArtReview();	
			}
		});
		$layer.find('.btn-popup-close').on('click', function(){
			_self.hideArtReview();
		});
		this.getArtReview();
	},	
	"hideArtReview" : function(){
		$('.art-review-layer').remove();
		$('.art-detail-inner').css('overflow-y', 'auto');
		
	},
	"getArtReview": function(){
		var $list = $('#art_review_list');
		// 방명록 불러오기
		var url = "/load_memo.mon?rr=" + this.info.dockey + "&ak=" + this.cur_art_info.dockey + "&start=0&perpage=1000";
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
						var reviewkey = this['_id']['$oid'];
						_html = 
							'<div class="review-item cbp-item">' +
							'	<div class="review-wrap">' +
							'		<div class="review-txt-wrap">' +
							'			<p class="review-content">' + this.content.replace(/(?:\r\n|\r|\n)/g, '<br />') + '</p>' +
							'			<div class="btn-remove" data-reviewkey="' + reviewkey + '" onclick="rs.showPassDialog(\'' + reviewkey + '\', true)"></div>' +
							'			<span class="author-name">- ' + this.title + '</span>' +
							'		</div>' +
							'	</div>' +
							'</div>';
							
						
						$list.append(_html);
					});
					
					
					$list.cubeportfolio({
						layoutMode: 'grid',
						defaultFilter: '*',
						animationType: "quicksand",
						gapHorizontal: 30,
						gapVertical: 30,
						gridAdjustment: "responsive",
						mediaQueries: [{
							width: 1500,
							cols: 4,
						}, {
							width: 1100,
							cols: 4
						}, {
							width: 800,
							cols: 3,
							gapHorizontal: 10,
							gapVertical: 10
						}, {
							width: 480,
							cols: 2
						}, {
							width: 320,
							cols: 1
						}],
					});
				    
				    
				}
			}
		});
	},
	
	"stopAudio" : function(){
		var _self = this;
		var $btn_wrap = $('#art_detail_layer .media');
		if ($btn_wrap.find('.btn_sound').hasClass('on')) {
			if ($btn_wrap.find('.btn_sound').hasClass('pause')) {
				
			} else {
				_self.audio.pause();
				if (g360.time_interval) clearInterval(g360.time_interval);
				g360.time_interval = null;
				$btn_wrap.find('.btn_sound').addClass('pause');
			}
		}
	},
	
	"getAudioTime": function(){
		var _self = this;
		var total = parseInt(_self.audio.duration);
		var remain = _self.audio.duration - _self.audio.currentTime;
		remain = parseInt(remain);
		var m = parseInt(remain / 60);
		var s = remain - m * 60;
		var $btn_wrap = $('#art_detail_layer .media');
		
		$btn_wrap.find('.remain-time').text('-' + m + ':' + (s < 10 ?'0'+s:s));
	},
	
	"showVoteLayer": function(){
		var _self = this;
		
		var html =
			'<div class="vote-wrap">' +
			'	<div id="btn_vote_close" class="vote-close"><span></span><span></span></div>' +
			'	<h1>투표하기</h1>' +
			'	<div class="vote-tab">' +
			'		<div id="vote_mail" class="vote-panel">' +
			'			<p>투표를 위해 이메일 주소를 입력해 주세요.</p>' +
			'			<input type="email" id="vote_email" placeholder="eg) gallery360@gallery360.co.kr">' +
			'			<p class="noti-vote"></p>' +
			'			<a id="btn_otp_send" class="vote-tab-btn">다음 단계</a>' +
			'		</div>' +
		
			'		<div id="vote_verify" class="vote-panel" style="display:none;">' +
			'			<p><b class="findpw-user"></b>로 인증번호를 전송하였습니다. 받으신 인증번호를 입력하여 투표를 완료해 주세요.</p>' +
			'			<input type="number" id="vote_otp" placeholder="인증번호" min="0" max="999999">' +
			'			<p class="noti-vote"></p>' +
			'			<a id="btn_vote_send" class="vote-tab-btn">투표하기</a>' +
			'			<b id="btn_otp_resend" class="resend-code">인증번호 재전송하기</b>' +
			'		</div>' +
		
			'		<div id="vote_cert" class="vote-panel" style="display:none;">' +
			'			<p>투표가 완료되었습니다!</p>' +
			'			<div id="btn_vote_ok" class="vote-finish">확인</div>' +
			'		</div>' +
		
			'	</div>' +
			'</div>';
		
		var $vote_layer = $(html).appendTo('body');

		rs.showBlockUI();
		$vote_layer.addClass('show');
		
		
		// 닫기, 확인
		$('#btn_vote_close, #btn_vote_ok').on('click', function(){
			_self.hideVoteLayer();
		});
		
		
		// 투표하기 OTP발송
		$('#btn_otp_send').on('click', function(){
			if ($(this).hasClass('process')) return;
			
			$('#vote_email').val($.trim($('#vote_email').val()));
			var vote_email = $('#vote_email').val();

			var $info = $(this).closest('.vote-panel').find('.noti-vote');
			$info.text('');
			
			if (vote_email == '') {
				$info.text('이메일 주소를 입력하세요.');
				$('#vote_email').focus();				
				return;
			}
			
			if (!g360.validateEmail(vote_email)) {
				$info.text('올바른 이메일형식이 아닙니다.');
				return;
			}
			
			var data = JSON.stringify({
				rental_key : rs.info.dockey,
				art_key : _self.cur_art_info.dockey,
				artist : g360.textToHtml(_self.cur_art_info.art_artist),
				title : g360.textToHtml(_self.cur_art_info.art_title),
				email : vote_email
			});
			
			var url = g360.root_path + "/vote_mail.mon";
			
			$.ajax({
				type: "POST",
				data: data,
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				beforeSend: function(){
					$('#btn_otp_send').addClass('process');
				},
				url: url,
				success: function(res){
					if (res.result == 'over count') {
						$info.text('최대 투표 횟수를 초과하였습니다.');
						$('#btn_otp_send').removeClass('process');
						return;
					} else if (res.result == 'already vote') {
						$info.text('이미 투표한 작품입니다.');
						$('#btn_otp_send').removeClass('process');
						return;
					} else if (res.result == 'F') {
						$info.text('오류가 발생했습니다.');
						$('#btn_otp_send').removeClass('process');
						return;
					} 
					
					// 정상 발송인 경우
					$vote_layer.find('.findpw-user').text(vote_email);
					$('#vote_mail').hide();
					$('#vote_verify').show();
				}
			});
		});
		
		$('#vote_email').on('keydown', function(e){
			var $info = $(this).closest('.vote-panel').find('.noti-vote');
			$info.text('');
			
			if (e.keyCode == 13) {
				$('#btn_otp_send').click();
			}
		});
		
		
		// 투표하기
		$('#btn_vote_send').on('click', function(){
			var vote_email = $('#vote_email').val();
			var $info = $(this).closest('.vote-panel').find('.noti-vote');
			$info.text('');
			
			var code = $('#vote_otp').val();
			
			if (code == '') {
				$info.text('인증번호를 입력하세요.');
				$('#vote_otp').focus();
				return;
			}
			
			var data = JSON.stringify({
				rental_key : rs.info.dockey,
				art_key : _self.cur_art_info.dockey,
				email : vote_email,
				sec : code
			});			
			
			var url = g360.root_path + "/vote_process.mon";
			
			$.ajax({
				type: "POST",
				data: data,
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				url: url,
				success: function(res){							
					if (res.result == 'miss sec') {
						$info.text('유효하지 않은 인증번호입니다.');
						return;
					} else if (res.result == 'T') {
						// 정상 처리된 경우
						$('#vote_verify').hide();
						$('#vote_cert').show();
					}
				}
			});
		});
		
		
		$('#vote_otp').on('keydown', function(e){
			var $info = $(this).closest('.vote-panel').find('.noti-vote');
			$info.text('');
			
			if (e.keyCode == 13) {
				$('#btn_vote_send').click();
			}
		});
		
		
		// 인증번호 재전송하기
		$('#btn_otp_resend').on('click', function(){
			if ($(this).hasClass('process')) {
				return;
			}

			$(this).addClass('process').css('opacity','0.3');
			
			var vote_email = $('#vote_email').val();
			var data = JSON.stringify({
				rental_key : rs.info.dockey,
				art_key : _self.cur_art_info.dockey,
				artist : g360.textToHtml(_self.cur_art_info.art_artist),
				title : g360.textToHtml(_self.cur_art_info.art_title),
				email : vote_email
			});
			
			var url = g360.root_path + "/vote_mail.mon";
			
			$.ajax({
				type: "POST",
				data: data,
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				url: url,
				success: function(res){							
					if (res.result == 'T') {
						g360.showToastMsg('인증번호를 재전송하였습니다', 3000);
					} else {
						g360.showToastMsg('전송중 오류가 발생했습니다', 3000);
					}
					
					setTimeout(function(){
						$('#btn_otp_resend').removeClass('process').css('opacity','1');
					}, 4000);
				}
			});
		});		
	},
	"hideVoteLayer": function(){
		var $vote_layer = $('.vote-wrap');
		
		//g360.showToastMsg('문의글이 등록되었습니다.', 3000);
		rs.hideBlockUI(true);
		$vote_layer.remove();
	}
}


if (document.addEventListener) {
    document.addEventListener('webkitfullscreenchange', exitHandler, false);
    document.addEventListener('mozfullscreenchange', exitHandler, false);
    document.addEventListener('fullscreenchange', exitHandler, false);
    document.addEventListener('MSFullscreenChange', exitHandler, false);
}



function exitHandler() {
    if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
    	//console.log("exitHandler")
    	//console.log($(document).find("[data-name=btnClose]"));
    	$(document).find("[data-name=btnClose]").click();
    	
    	//$(".flipbook-overlay").hide();
    	//window.location.hash="";
    }
}