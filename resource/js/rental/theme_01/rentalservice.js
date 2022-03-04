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
	
	this.init();
}


RentalService.prototype = {
		
	"init" : function(){
		var _self = this;
		_self.artDetailEvent();
	},
	
	// 대관 타입별 텍스트를 표시한다
	"drawRentalText" : function(){
		if (!g360.rental_text) return;
		
		var rt = g360.rental_text;
		
		// gnb메뉴
		$('.rental-txt-art').text(rt.rental_art.toUpperCase());
		$('.rental-txt-visitor').text(rt.rental_visitor.toUpperCase());
		$('.rental-txt-group').text(rt.rental_group.toUpperCase());
		$('.rental-txt-count').text(rt.rental_count.toUpperCase());
		$('.rental-txt-express').text(rt.rental_express.toUpperCase());
		
		// 메인 작품 수
		$('#label_art').text(rt.rental_art_num_title);
		
		// 작가 리스트 버튼 제목
		$('#artist_list_title').text(rt.rental_artist2.toUpperCase());
		
		// 방명록 제목
		if (g360.rental_text.type == '4') {
			// 기업인 경우만 수정
			$('#review .gm-purpose').html('<span>FEEDBACK</span>');
			$('#review .gm-guest').html('<span>AND</span> <span class="gm-viewer">INQUIRIES</span>');
		}
				
		// 작가 상세
		/*
		$('.rental-txt-content2').text(rt.content2);
		$('.rental-txt-tab1').text(rt.tab1);
		$('.rental-txt-group').text(rt.group);
		$('.rental-txt-sch').text(rt.sch);
		$('.rental-txt-prize').text(rt.prize);
		$('.rental-txt-loc').text(rt.loc);
		$('.rental-txt-carr').text(rt.carr);
		
		// 작품 상세
		$('.rental-txt-tab2').text(rt.tab2);
		*/
		
		
		// 작품 상세
		$('#art_detail_info .rental-txt-artist').text(rt.rental_artist + '.');
		var tab1_nm = g360.rental_text.type == '4' ? rt.rental_art : 'About ' + rt.rental_art;
		var tab2_nm = 'About ' + rt.rental_artist;
		$('.rental-txt-tab1').text(tab1_nm);
		$('.rental-txt-tab2').text(tab2_nm);
		
		

		// 작품 상세 방명록
		var $review_title = $('#review_write_area .art-review-title');
		$review_title.text('HELLO TO ' + rt.rental_artist.toUpperCase());
	    $review_title.html($review_title.text().replace(/(\w)/g, '<span>$1</span>'));
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
		
		/*
		$('#nav_group, #m_nav_group').off().on('click', function(){
			_self.showGroupList(group_code);
			$('#group_list_layer').show();
			$('body').addClass('overflow-hidden');
			g360.history_record_rental("group_list_close");
		});
		
		$('#group_list_close').off().on('click', function(){
			$('body').removeClass('overflow-hidden');
			$('#group_list_layer').fadeOut();
			$('#group_list').empty();
		});
		*/
		
		// 새로운 그룹 페이지를 레이어로 처리
		$('#nav_group, #m_nav_group').off().on('click', function(){
			_self.showGroupList(group_code);
			$('body').addClass('overflow-hidden');
			g360.history_record_rental("group_list_close");
		});
	},
	"setVR" : function(delay) {
		
		var _self = this;			
	    
		setTimeout(function(){			
			window._pano = new Pano();
			_pano.init('vr_area', vr_key);
			$('#folded').on('click', function(){
				_self.showFullscreen();
			});
		}, delay);
	    	    
	},
	"vrLoadComplete" : function() {
		var _self = this;
		
		$('#vr_layer').addClass('show');

		var $fold = $('.folded-wrap');
		var $fold_txt = $('#folded_txt');
		$fold.on('mouseenter', function(){
			if (!$('#vr_area').hasClass('fullscreen')) {
				$fold.addClass('ani-on');
				$fold.removeClass('ani-off');
				$fold_txt.hide();				
			}
		});
		$fold.on('mouseleave', function(){
			if ($fold.hasClass('ani-on')) {
				$fold.removeClass('ani-on');
				$fold.addClass('ani-off');
				$fold_txt.show();				
			}
		});
		
		ScrollTrigger.create({
			id: 'vr',
			trigger: '#main_banner_area',
			start: 'bottom+=200 bottom',
			endTrigger: '#site_footer',
			end: 'top bottom',
			onEnter: function() {
				$fold.removeClass('ani-out');
				$fold.removeClass('no-disp');
				$fold.fadeIn();
				$fold.addClass('ani-def');				
			},
			onEnterBack: function() {
				$fold.removeClass('ani-out');
				$fold.removeClass('no-disp');
				$fold.fadeIn();
				$fold.addClass('ani-def');				
			},
			onLeave: function() {
				$fold.addClass('ani-out');
				$fold.removeClass('ani-on');
				$fold.removeClass('ani-off');
				$fold.removeClass('ani-def');
				$fold.fadeOut();
			},
			onLeaveBack: function() {
				$fold.addClass('ani-out');
				$fold.removeClass('ani-on');
				$fold.removeClass('ani-off');
				$fold.removeClass('ani-def');
				$fold.fadeOut();
			}
		});
	},
	"vrDetailBugFix" : function(){
		// VR 상세페이지에서 작품선택시 감싸고 있는 Wrapper Position값 재설정
		$('#krpano_iframe_IFRAME_HTML').parent().parent().parent().parent().addClass('ie-bugfix');
	},
	"showFullscreen" : function(){
		$('#folded').off('click');
		ScrollTrigger.getById('vr').disable();
		
		$('.folded-wrap').show();
		
		if (g360.bgmusic != ""){
			_pano.krpano1.set('layer[snd2].visible', true);			
		}
		
		_pano.krpano1.set('plugin[snd3].visible', true);
		_pano.krpano1.set('layer[skin_btn_show_icon].visible', true);
		
		// ios는 krpano 전체화면 지원되지 않음
		if (/iphone|ipad|mac os/i.test(navigator.userAgent)) {
			_pano.krpano1.set('layer[skin_btn_show_icon].visible', false);
			$('.folded-wrap').prepend($('#vr_layer'));
			//$('.vr-box').addClass('no-clip');
			$('#vr_area').addClass('ios-fullscreen');
			$('#header').hide();
			$('#btn_vr_back').show();
			$('#folded').css('visibility', 'hidden');
			$('#folded_txt').css('visibility', 'hidden');
			_pano.soundcontrol(1);
			

			$('#btn_vr_back').off().on('click', function(){
				if (g360.bgmusic != ""){
					_pano.krpano1.set('layer[snd2].visible', false);			
				}
				_pano.krpano1.set('plugin[snd3].visible', false);
				
				// VR 상세보기 화면 닫기
				_pano.krpano1.call('callwith(layer[close_freim_url_addhs], onclick)');
				$('.vr-box').append($('#vr_layer'));
				//$('.vr-box').removeClass('no-clip');
				$('#folded').css('visibility', 'visible');
				$('#folded_txt').css('visibility', 'visible');
				$('#vr_area').removeClass('ios-fullscreen');
				$('#header').show();
				$('#btn_vr_back').hide();
				_pano.soundcontrol(0);
				
				$('#folded').on('click', function(){
		    		rs.showFullscreen();
		    	});
				ScrollTrigger.getById('vr').enable();
			});
			
			return;
		}
		
		$('#vr_area').addClass('fullscreen');
		$('#main_banner_area').hide();
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
		
		var main_imgs = _self.getMainImages();
		var main_li_length = [4,5,6,7,6,3]; // 31개
		var img_idx = 0;
		var _html = '';
				
		$.each(main_li_length, function(idx, val){
			_html += '<li>'
			for (var i=1 ; i<=val ; i++) {
				_html += '<div class="img gray" style="background-image:url(' + main_imgs[img_idx] + ')"></div>';
				img_idx++;
			}
			_html += '</li>';
		});
		
		$('#main_tile_list').html(_html);
		
		if (!g360.isMobile()) {
			$('#main_tile_list li').each(function(idx, li){
				gsap.to(this, {
					scrollTrigger: {
						trigger: '#main_wrapper',
						start: 'top top',
						scrub: 0.8
					},
					ease: 'none',
					y: (idx+1)%2 == 0 ? 200 : -200
				});
			});
		}

		// 메인 타일 이미지를 랜덤으로 표시
		$('#main_tile_list .img').each(function(){
			gsap.from(this, {
				opacity: 0,
				delay: gsap.utils.random(0.2, 2, 0.1),
				duration: 2
			});
		});

		// 색상 변경 버튼
		/*
		$('#btn_color_change').on('click', function(){
			var $btn = $(this);
			if ($btn.hasClass('white')) {
				// 흰색으로 변경
				$('#exhibition').addClass('white');
				$('#gallery').addClass('white');
				$btn.removeClass('white');
			} else {
				// 검은색으로 변경
				$('#exhibition').removeClass('white');
				$('#gallery').removeClass('white');
				$btn.addClass('white');
			}
		});
		gsap.to('#btn_color_change', {
			scrollTrigger:{
				trigger: '#gallery',
				start: 'top bottom-=50',
				end: 'bottom bottom-=50',
				toggleActions: 'play reverse play reverse'
			},
			ease: 'none',
			x: 1,
			duration: 0.2
		});
		*/	
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
	},
	
	"setExhibitionInfo" : function() {
		// --------- 전시회 정보 ---------
		var wrap = $('#exhibition');
		var title = wrap.find('.exhi-title');
		var content = wrap.find('.exhi-content');
		title.html(this.info.title.replace(/_{3}/g, "<br>"));
		content.html(this.info.express.replace(/\r\n|\n/g, '<br/>'));
		
		// 전시소개 글이 없을 경우 내용 숨김 처리
		if ($.trim(this.info.express) == '') {
			wrap.hide();
			return;
		}
		
		gsap.to('#exhibition .background', {
			scrollTrigger: {
				trigger: '#exhibition',
				start: 'bottom bottom',
				end: 'bottom center',
				scrub: true
			},
			scaleX: 0.85,
			transformOrigin: "center center",
			ease: "none"
		});
		
		gsap.from('.exhi-title', {
			scrollTrigger: {
				trigger: '.exhi-title',
				start: 'top bottom-=100px',
				end: '+=200px',
				scrub: true
			},
			y: 80,
			opacity: 0
		});
		gsap.from('.title-underline', {
			scrollTrigger: {
				trigger: '.exhi-title',
				start: 'top bottom-=250px',
				end: '+=200px',
				scrub: true
			},
			width: 0,
			opacity: 0
		});
		gsap.from('.exhi-content', {
			scrollTrigger: {
				trigger: '.exhi-content-container',
				start: 'top bottom-=100px',
				toggleActions: 'play none none reverse',
			},
			y: 100,
			opacity: 0,
			duration: 1
		});
		
		
	},
	
	"sortImageList" : function() {
		var _self = this;
		
		// 작가가 1명 이상인 경우 이미지 리스트를 소트한다.
		if (this.info.artistlist.length == 1) {
			return;
		}
		
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
			$.each(artistkey[this.artistkey], function(){
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
    	
    	
    	// imagelist 셋팅   	
    	var $list = $('#art_list');
    	var style_cnt = 0;
    	$.each(this.info.imagelist, function(idx, val){
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
    		
    		style_cnt++;
    		
    		if (style_cnt > 10) {
    			style_cnt = 1;
    		}
    		
    		var style_nm = 'style-' + style_cnt;
    		if (_self.info.imagelist.length-1 == idx) {
    			style_nm = 'style-last';
    		}
    		
    		
    		var _html = 
    			'<div class="grid-item ' + style_nm + '" data-artkey="' + this.filekey + '" data-artistkey="' + artistkey + '">' +
    	        '	<img class="art-img" draggable="false" src="' + _src + '">' +
    	        '	<div class="artist-info-wrap">' +
    	        '		<div class="info-wrap">' +
    		    '   		<div class="info-title">' + this.name + '</div>' +
    		    '    		<div class="info-artist">' + artist_name + '</div>' +
    		    '			<div class="btn-more btn-rect">MORE</div>' +        		
    	        '		</div>' +
    	        '	</div>' +
            	'</div>';
    		$list.append(_html);
    	});
    	
    	
    	// 이미지가 로딩완료된 후
    	$list.imagesLoaded( function() {
    		var $filter = $('#artist_name');
    		
    		$('#art_list .art-img').each(function(){
    			var $img_wrap = $(this).parent();
        		var $img_text = $(this).next();
        		var artistkey = $img_wrap.data('artistkey');
        		gsap.to([this, $img_text], {
    	    		scrollTrigger:{
    	    			trigger: this,
    	    			start: 'top+=30 bottom',
        				toggleActions: 'play reverse play reverse'
    	    		},
    	    		scale: 1,
    	    		opacity: 1,
    	    		duration: 1.5
    	    	});
        		
        		
        		// 아티스트 필터링에 현재 보고있는 작가 표시
        		gsap.to($img_wrap, {
        			scrollTrigger:{
    	    			trigger: $img_wrap,
    	    			start: 'top center',
    	    			end:'bottom-=100 center',
        				onEnter: function() {
        					var $artist = $filter.find('span[data-artistkey="' + artistkey + '"]');
        					if ($artist.length) {
        						$filter.find('.on').removeClass('on');
        						$artist.addClass('on');
        					}
        				},
        				onEnterBack: function() {
        					var $artist = $filter.find('span[data-artistkey="' + artistkey + '"]');
        					if ($artist.length) {
        						$filter.find('.on').removeClass('on');
        						$artist.addClass('on');
        					}
        				}
    	    		},
        		});
        		
    	    });
    		
    		_self.animationRefresh();
    		_self.setArtistList();
    		_self.hideLoading();
    	});
    	    
    	// IE에서 grid row를 설정하기 위한 처리
    	$('.gallery-grid .grid-item').each(function(idx, obj){
    		var row_cnt = idx + 1;
    		$(this).css('-ms-grid-row', row_cnt.toString());
    	});
    	
    	$('.grid-item').on('click', function(){
    		var img_obj = $(this).find('.art-img');
    		// 클릭 시 화면 중앙으로 이동 처리
    		_self.showArtDetail(img_obj, $(this).data('artkey'), $(this).data('artistkey'));
    	});
	},
	
	"showArtDetail": function(img, artkey, artistkey){
    	var _self = this;
		var $img = $(img);
		
		// 디테일인 상태
		if ($img.parent().hasClass('detail')) {
			return;
		}
				
		// 애니메이션 수행중이면 완료 처리 
		if (gsap.isTweening(img)) {
			$.each(gsap.getTweensOf(img), function(){
				this.progress(1);
			});
		}
		
		g360.history_record_rental("btn_art_close");
		
		var img_pos = _self.getArtPosition(img);
		
		
		$img.parent().addClass('detail z-index-10');
		
		// PC용
		var $wrap = $('#art_detail_wrapper');
		var $inner = $wrap.find('.inner');
		
		// 모바일용
		var $m_cont = $('#m_art_detail_wrapper');
		var $m_front = $m_cont.find('.front-img');
		var $m_back = $m_cont.find('.back-img');
		var $m_wrap = $m_cont.find('.ratio-wrap');
		var $m_inner = $m_cont.find('.ratio');
		
		$inner.css('background-image', 'url(' + $img.get(0).src + ')');
		$m_front.css('background-image', 'url(' + $img.get(0).src + ')');
		$m_back.css('background-image', 'url(' + $img.get(0).src + ')');
		
		// 백그라운드 처리 (이미지 클릭 애니메이션 동안에 백그라운드를 block처리함)
		/*
		if (window.art_block) {
			window.art_block.progress(1);
		}
		window.art_block = gsap.timeline();
		window.art_block.to('.art-block', {
			autoAlpha: 1,
			onReverseComplete: function() {
				$img.parent().removeClass('z-index-10');
			}
		});
		*/
		
		$('.art-block').addClass('show');
		
		
		if (window.art_detail_tl) {
			window.art_detail_tl.kill();
		}

		// 열기전 초기화
		gsap.set('#art_detail_subject', {opacity:0});
		gsap.set('#art_detail_size', {opacity:0});
		gsap.set('#art_detail_layer .info-wrap', {opacity:0});
		gsap.set('#art_detail_layer .tab-container', {opacity:0});
		gsap.set('#art_detail_layer .artist-img', {opacity:0});
		gsap.set('#detail_gm_show', {y:100});

		var $btn_wrap = $('#art_detail_layer .btn-header');
		$btn_wrap.find('.btn_3d').hide();
		$btn_wrap.find('.btn_sound').hide();
		$btn_wrap.find('.btn_video').hide();
		$btn_wrap.find('.btn_youtube').hide();
		$btn_wrap.find('.btn_portfolio').hide();
		
		gsap.to(img, {
			id: "imgDetailZoom",
			scale: img_pos.scale,
			x: img_pos.x,
			y: img_pos.y,
			duration: 0.3,
			overwrite: 'auto',
			onComplete: function(){
				$('body').addClass('overflow-hidden');
				// 이미지를 최상위 엘리먼트로 복사하여 fixed로 표시 (다른 z-index 이슈 해결)
				var obj_rect = $img.get(0).getBoundingClientRect();

				$wrap.css({
					'width': (obj_rect.width / window.innerWidth * 2 * 100) + '%'
				});
				
				$inner.css({
					'padding-top': (obj_rect.height / obj_rect.width * 100) + '%'
				});
				
				// 모바일용
				$m_inner.css({
					'padding-top': (obj_rect.height / obj_rect.width * 100) + '%'
				});
				
				$('#art_detail_layer').show();
				$('.text-container').scrollTop(0);
				$img.parent().removeClass('z-index-10');
				
				_self.getArtInfo(img, artkey, artistkey);
			}
		});
		
		


	},
	"getArtPosition": function(img){
		// 이미지를 화면 좌측으로 확대처리
		var $img = $(img);
		
		if (window.matchMedia('(min-width:1200px)').matches) {
			// 좌우
			var padding = 50;
	    	var max_w = (window.innerWidth / 2) - (padding * 2); // 최대 viewport의 절반
	    	var max_h = window.innerHeight - (padding * 2);
	    	
			var $img_w = $img.width();
			var $img_h = $img.height();
			var $img_rect = $img.get(0).getBoundingClientRect();
			var $img_posX = $img_rect.left;
			var $img_posY = $img_rect.top;
			
			var scaleX = max_w / $img_w;
			var scaleY = max_h / $img_h;
			var after_scale = Math.min(scaleX, scaleY);
			var after_width = $img_w * after_scale;
			var after_height = $img_h * after_scale;

			// 스케일된 후 줄어들거나 늘어난 x값을 계산
			var gapX = ($img_w - after_width) / 2;
			var gapY = ($img_h - after_height) / 2;
			
			// 스케일된 후 줄어들거나 늘어난 x값을 계산
			var after_posX = ((window.innerWidth / 2) - after_width) / 2; // 좌측 화면의 가운데 X값 찾기
			var after_posY = (window.innerHeight - after_height) / 2; // 좌측 화면의 가운데 Y값 찾기
			
			var after_transX = $img_posX * -1 - gapX + after_posX;
			var after_transY = $img_posY * -1 - gapY + after_posY;
		} else {
			// 상하 (가로 100% 기준으로 맞춤)
			var padding = 0;
	    	var max_w = window.innerWidth; // 최대 viewport의 절반
	    	var max_h = 500;
	    	var add_scale = 0.8;
	    	
			var $img_w = $img.width();
			var $img_h = $img.height();
			var $img_rect = $img.get(0).getBoundingClientRect();
			var $img_posX = $img_rect.left;
			var $img_posY = $img_rect.top;
			
			var scaleX = max_w / $img_w;
			var scaleY = max_h / $img_h;
			var after_scale = Math.min(scaleX, scaleY);
			
			var after_width = $img_w * after_scale;
			var after_height = $img_h * after_scale;
			after_scale = after_scale * add_scale;
			 

			// 스케일된 후 줄어들거나 늘어난 x값을 계산
			var gapX = ($img_w - after_width) / 2;
			var gapY = ($img_h - after_height) / 2;
			
			var after_posX = (window.innerWidth - after_width) / 2; // 좌측 화면의 가운데 X값 찾기
			var after_posY = 0;
			
			var after_transX = $img_posX * -1 - gapX + after_posX;
			var after_transY = $img_posY * -1 - gapY + after_posY;
			

			if (/iphone|ipad/i.test(navigator.userAgent)) {
				// ios는 스크롤이 영역을 차지하지 않아 빼주지 않아도 됨
			} else {
				// 모바일에서 스크롤 값 빼준다
				after_transX -= 3;				
			}

		}
		
		return {scale:after_scale, x:after_transX, y:after_transY};
	},
	"closeArtDetail": function(){
		
	},
	"getArtInfo" : function(img, id, artistkey){
		var _self = this;
		$.ajax({
			url: '/select_art_info_rental.mon?dockey=' + id,
			success: function(data){
				_self.cur_art_info = data;
				_self.drawArtInfo(data, artistkey);
				
				var $img = $(img);
								
				// 버튼 헤더 Sticky 스크롤 관련 이벤트 처리
				var btn_sticky = ScrollTrigger.create({
					id: 'btn_sticky',
					scroller: '.text-container',
					trigger: '.btn-header',
					start: 'top top',
					endTrigger: '.flex-item',
					end: 'bottom top',
					toggleClass: 'bg-fill',
					pin: true,
					pinSpacing: false,
					pinType: 'fixed' 
				});
				var tab_sticky = ScrollTrigger.create({
					id: 'tab_sticky',
					scroller: '.text-container',
					trigger: '.art-detail-tab',
					start: 'top top+=' + $('.btn-header').height(),
					endTrigger: '.flex-item',
					end: 'bottom top',
					toggleClass: 'bg-fill',
					pin: true,
					pinSpacing: false,
					pinType: 'fixed'
				});
				
				
				// 닫기 처리 (이미지 다시 제자리로 돌리기)
				var $btn_close = $('#art_detail_layer .btn-close');
				$btn_close.on('click', function(){
					$btn_close.off();
					
					// 이미지 확대중인 경우 (종료 처리)
					var zoom_tl = gsap.getById('imgDetailZoom');
					if (zoom_tl) {
						zoom_tl.kill();
					}
					
					if (window.art_detail_tl) {
						window.art_detail_tl.kill();
					}
					
					if ($('#art_review_layer').is(':visible')){
						_self.hideArtReview();
					}
					
					$('#art_detail_layer').hide();
					$('#review_write_area').hide();
					$('#art_detail_info').show();
					
					btn_sticky.kill();
					tab_sticky.kill();
					$('.art-block').removeClass('show');
					$('body').removeClass('overflow-hidden');
					
					gsap.to($img, {
	        			scale: 1,
	        			x: 0,
	        			y: 0,
	        			duration: 0.3,
	        			onComplete: function(){
	        				$img.parent().removeClass('detail');
	        			}
	        		});
					
					if (_self.cur_art_info.art_mp3_filename) {
						_self.stopAudio();
						$(_self.audio).attr('src', '');
					}
					
					$(window).off('keydown.artclose');
					
				});
				
				// ESC 이벤트
				$(window).off('keydown.artclose').on('keydown.artclose', function(e){
					if ($('#video_layer').is(':visible')) return;
					if ($('.blockui').is(':visible')) return;					
					if (e.keyCode == 27) {
						// 방명록 관련 애니메이션 수행중이면 리턴 처리
						if ($('#art_review_layer').is(':visible')){
							if (_self.show_art_review_tl && _self.show_art_review_tl.isActive()) return;
							if (_self.hide_art_review_tl && _self.hide_art_review_tl.isActive()) return;
							_self.hideArtReview();
							return;
						}
						$btn_close.click();
					}
				});
				
			} 
		});
	},
	"drawArtInfo": function(data, artistkey){
		var _self = this;
		var $wrapper = $('#art_detail_layer');

		if (window.art_detail_tl) {
			window.art_detail_tl.kill();		
		}		
		
		
		var genre = data.art_genre_etc ? data.art_genre.replace(/기타/g, '') + data.art_genre_etc : data.art_genre;
		var source = data.art_source_etc ? data.art_source.replace(/기타/g, '') + data.art_source_etc : data.art_source;
		var img_src = g360.preview_img_path(data.email, data.dockey);
		var size = "";

		if (data.art_mp3_filename) {
			$wrapper.find('.remain-time').text('');
			$wrapper.find('.btn_sound').removeClass('on pause').show();
			
			
			var _email = data.art_mp3_filename.substring(0, data.art_mp3_filename.lastIndexOf('_'));
			var audio_src = g360.audio_path(_email, data.art_mp3_filename);
			var $audio = $('.btn_sound audio');
			$audio.attr('src', audio_src);
			
			_self.audio = $audio.get(0);
			
			// 종료시 이벤트
			$audio.on('ended', function(){
				if (g360.time_interval) clearInterval(g360.time_interval);
				g360.time_interval = null;
				$wrapper.find('.btn_sound').removeClass('on');
				$wrapper.find('.remain-time').text('');
			});
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
		$wrapper.find('#art_detail_size').hide();
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
			
			$wrapper.find('#art_detail_size').text(size).show();
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
		$wrapper.find('.info-author').text('').closest('dl').hide();
		$wrapper.find('.info-year').text('').closest('dl').hide();
		$wrapper.find('.info-genre').text('').closest('dl').hide();
		$wrapper.find('.info-material').text('').closest('dl').hide();
		
		if (data.art_artist && data.art_artist != '') {
			$wrapper.find('.info-author').text(g360.TextToHtml(data.art_artist));
			$wrapper.find('.info-author').closest('dl').show();
		}
		if (data.art_date_year && data.art_date_year != '') {
			$wrapper.find('.info-year').text(data.art_date_year);
			$wrapper.find('.info-year').closest('dl').show();
		}
		if (genre != '' && g360.rental_text.art_jang) {
			$wrapper.find('.info-genre').text(g360.TextToHtml(genre));
			$wrapper.find('.info-genre').closest('dl').show();
		}
		if (source != '' && g360.rental_text.art_material) {
			$wrapper.find('.info-material').text(g360.TextToHtml(source));
			$wrapper.find('.info-material').closest('dl').show();
		}
		
		// 작품소개
		var $art_info = $('#art_detail_art_info');
		$art_info.empty().hide();
		$art_info.html(g360.textToHtml_Body(data.art_express));
		
		//구매하기, 문의하기 버튼 추가, 투표하기 버튼 추가
		var vote_use = (rs.info.info.vote_use == 'T' && !isNaN(rs.info.info.vote_count) ? true : false);
		
		if ( data.sale_url || (data.purchase_req == 'Y') || vote_use) {
			var $btn_art_wrap = $('<div class="btn-art-wrap"></div>');
			$art_info.append($btn_art_wrap);

			
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
		
		// 작가소개
		var $artist_info = $('#art_detail_artist_info');
		$artist_info.empty().hide();
		_self.drawArtistInfo(artistkey);
		
		// 탭 표시
		$wrapper.find('.art-detail-tab li').hide();
		if ($.trim($art_info.text()) != '') {
			$wrapper.find('.art-detail-tab li:eq(0)').show();
		}
		if ($.trim($artist_info.text()) != '') {
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
		} else if ($.trim($artist_info.text()) != '') {
			_self.clickDetailTab('artist');
		}
		
		
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
				
				
		
		window.art_detail_tl = gsap.timeline();
		art_detail_tl
			.fromTo('#art_detail_subject', {y:100, opacity:0}, {y:0, opacity:1, duration:0.5, overwrite:'auto'})
			.fromTo('#art_detail_layer .artist-img', {opacity:0}, {opacity:0.8, duration:1, overwrite:'auto'}, '<0.2')
			.fromTo('#art_detail_size', {y:100, opacity:0}, {y:0, opacity:1, duration:0.5, overwrite:'auto'}, '<')
			.fromTo('#art_detail_layer .info-wrap', {y:60, opacity:0}, {y:0, opacity:1, duration:0.5, overwrite:'auto'}, '<0.2')
			.fromTo('#detail_gm_show', {y:100}, {y:0, duration:0.5, overwrite:'auto'}, '<')
			.fromTo('#art_detail_layer .tab-container', {opacity:0}, {opacity:1, duration:0.5, overwrite:'auto'}, '<0.2');
			
		
		// 방명록 카운트 가져오기
		this.getReviewCount();
			
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
		
    	var artistkey = {};
    	var $layer = $('.artist-list-layer');
    	var $filter = $('#artist_name');
    	var cnt = 0;
    	$.each(this.info.artistlist, function(){
    		artistkey[this.email] = this.artistkey;
    		var _html = (cnt > 0 ? ' / ' : '') + '<span data-artistkey="' + this.artistkey + '">' + $.trim(this.name) + '</span>';
   			$filter.append(_html);
   			cnt++;
    	});
    	
    	// 작가가 1명인 경우 필터 표시할 필요 없음
    	if (this.info.artistlist.length == 1) {
    		return;
    	}
    	
    	
    	$filter.find('span').on('click', function(){
    		var sel_artist = $(this).data('artistkey');
    		var $art = $('#gallery').find('.grid-item[data-artistkey="' + sel_artist + '"]:eq(0)');
    		$('body').removeClass('overflow-hidden');
    		
    		// 전체화면으로 띄워져있는 경우 레이어 닫기 처리
    		if ($layer.hasClass('full')) {
    			$layer.find('.btn-close-rotate').click();
    		}
    		
    		if ($art.length) {
    			var _top = $art.offset().top;

    			// 화면 가운데로 이동
    			_top = _top - (window.innerHeight / 2) + ($art.height() / 2);
    			
    			$('html, body').stop().animate({
    		        scrollTop: _top
    		    }, 700);
    		}
    	});
		
		var r_line = gsap.to('.outbox-line', {
			rotate: 360, 
			repeat: -1, 
			duration: 3, 
			ease: 'none'
		});
		
		var over = gsap.to('.outbox', {
			width: 125,
			height: 30,
			ease: 'none',
			duration: 0.2,
			onComplete: function() {
				$('.artist-list-layer').css('opacity', 1);
				$('.inbox').hide();
			},
			onReverseComplete: function(){
				r_line.play();
			}
		}).pause();
		
		var click = gsap.to('.outbox', { 
			width: 290,
			height: _self.getArtistLayerHeight(),
			ease: 'none',
			duration: 0.2,
			onComplete: function() {
				
			},
			onReverseComplete: function(){
				$('.artist-list-layer').css('opacity', 0);
				$('.artist-list-layer').removeClass('show');
				$('.inbox').show();
				over.reverse(-1, false);
			}
		}).pause();
		
		var $layer = $('.artist-list-layer');
		
		$('#btn_artist_list').on('mouseenter', function(){
			if ($layer.hasClass('show')) return;
			if (!window.matchMedia('(min-width:1024px)').matches) return;
			r_line.progress(1);
			r_line.pause();
			over.play();
		});
		
		$('#btn_artist_list').on('mouseleave', function(){
			if ($layer.hasClass('show')) return;
			if (!window.matchMedia('(min-width:1024px)').matches) return;
			$layer.css('opacity', 0);
			$layer.removeClass('show');
			$('.inbox').show();
			over.reverse();
		});
		
		// 작가 리스트
		$('#btn_artist_list').on('click', function(){
			if ($layer.hasClass('show')) return;
			
			if (!window.matchMedia('(min-width:768px)').matches) {
				
				// 모바일에서는 전체로
				$('body').append($layer).addClass('overflow-hidden');
				$layer.addClass('full show');
				gsap.fromTo($layer, {opacity:0}, {opacity:1, duration:0.2, ease:'none'});
				r_line.pause();
				
			} else {
				
				// 마우스 오버 이벤트 처리
				r_line.progress(1);
				r_line.pause();
				over.play();
				over.progress(1);
				
				// 클릭 이벤트 처리
				$layer.addClass('show');
				click.play();
				
			}
		});
		// 닫기
		$('.btn-close-rotate').on('click', function(){
			if ($layer.hasClass('full')){
				gsap.fromTo($layer, {opacity:1}, {
					opacity: 0, 
					duration: 0.2, 
					ease: 'none', 
					onComplete: function(){
						$layer.removeClass('full show');
						$('#btn_artist_list .outbox').append($layer);
						$('body').removeClass('overflow-hidden');
						r_line.resume();
					}
				});
			} else {
				click.reverse();				
			}
			return false;
		});
		
		
		// 스크롤에 따라 버튼 표시
		gsap.fromTo('#btn_artist_list', {opacity: 0, autoAlpha:0}, {
			scrollTrigger:{
				trigger: '#gallery',
				start: 'top bottom-=220',
				end: 'bottom bottom-=50',
				toggleActions: 'play reverse play reverse'
			},
			onReverseComplete: function(){
				// 숨겨질 때 레이어 닫아줘야 함
				if ($layer.hasClass('show')) {
					gsap.set('#btn_artist_list', {opacity:0, autoAlpha:0}); 
					//$('.btn-close-rotate').click();
				}
			},
			ease: 'none',
			opacity: 1,
			autoAlpha: 1,
			duration: 0.5
		});
		
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
		
		$('#dbook_cover').attr('src', thum_path + '/0.png?open&ver=' + dbook_info.dbook_version);
		//$('#dbook_exhi_title').html("'" + _self.info.title + "'");
		
		var cnt = dbook_info.dbook_page_count;

		
		// 상세페이지 2개 표시
		$('#dbook_pages').empty();
		for (var i=1 ; i<=cnt ; i++) {
			if (i>2) break;
			$('#dbook_pages').append($('<img src="' + thum_path + '/' + i + '.png?open&ver=' + dbook_info.dbook_version + '">'));
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
						
				return false;
			}else{
				g360.FullScreen_Open();
				var xscroll = $(window).scrollTop();			
				window.rs.changeTop = xscroll + 120;
			}

		});
		
		$('#nav_dbook').show();
		$('#m_nav_dbook').show();
		$("#dbook").show();
		
		/*
		gsap.from('#dbook_cover', {
			scrollTrigger: {
				id: 'dbook_cover',
				trigger: '#dbook',
				start: 'top center+=150',
				toggleActions: 'play reset play reset',
				markers: true
			},
			x:-200,
			opacity: 0,
			duration: 1
		});
		*/
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
		
	},
	
	"changePosition" : function(){		
		if (window.rs.changeTop) {
			$("html, body").scrollTop(window.rs.changeTop);			
		}
		window.rs.changeTop = null; 
	},
	
	"setVisitor" : function() {
		
		var _self = this;
		var $list = $('.gm-wrap');
		$list.find('.gmbox').remove();
		
		// 리뷰 글 불러오기
		var url = "/load_memo.mon?rr=" + this.info.dockey + "&ak=&start=0&perpage=7";
		$.ajax({
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(res){
				
				var _html = '';
				var _src, _comment, _name, _reviewkey;
				var cnt = 0;
				var total = 0;
				var is_default = false;
							
				
				total = res[0].totalcount;
				// 7개 이하인 경우 더보기 버튼 숨김
				if (total <= 7) {$('.gm-more').hide();}
				
				var data = res.splice(1);
				var size_class = '';
				
				
				// 7개까지만 표시해줘야 함
				for (var i=0; i<7 ; i++) {
					var cdata = data[i];
					var nth = i+1;
					_html = '';
					
					switch (nth) {
					case 2:
					case 4:
						size_class = 'gmsml';
						break;
					case 6:
						size_class = 'gmlge';
						break;
					default:
						size_class = 'gmmdm';
					}
					
					
					if (cdata) {
						if (cdata.art_key) {
							// 작품에 남긴 방명록
							var filekey = cdata.art_key;
							var folder = _self.getEmail(filekey);
							_src = '/artimage/' + folder + '/art/preview/' + filekey + '.jpg?open';
						} else {
							// 대관에 남긴 방명록
							_src = '/img/rental/theme_01/notebg_' + gsap.utils.random(1, 11, 1) + '.jpg';
							
						}
						
						_comment = cdata.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
						_name = cdata.title;
						_reviewkey = cdata['_id']['$oid'];							
						
						
						_html = 
							'<div id="gm0' + nth + '" class="gmbox ' + size_class + '" style="background-image:url(' + _src + ')">' +
							'	<div class="gmtxt-bg">' +
							'		<div class="gmtxt">' +
							'			<p class="gm-memo">' + _comment + '</p>' +
							'			<p class="gm-writer">- <span class="gmwtr-name">' + _name + '</span></p>' +
							'		</div>' +
							'	</div>' +
							'</div>';
						
					} else {
						if (!is_default) {
							// 방명록이 없으면 기본 이미지를 뿌려준다
							_src = '/img/rental/theme_01/notebg_' + gsap.utils.random(1, 11, 1) + '.jpg';
							_comment = '대관 서비스 오픈을 진심으로 축하드립니다.';
							_name = 'Gallery360';
							_html = 
								'<div id="gm0' + nth + '" class="gmbox ' + size_class + '" style="background-image:url(' + _src + ')">' +
								'	<div class="gmtxt-bg">' +
								'		<div class="gmtxt">' +
								'			<p class="gm-memo">' + _comment + '</p>' +
								'			<p class="gm-writer">- <span class="gmwtr-name">' + _name + '</span></p>' +
								'		</div>' +
								'	</div>' +
								'</div>';								
							
							is_default = true;
						} else {
							/*
							// 껍데기만 표시하기
							_src = '/img/rental/theme_01/notebg_' + gsap.utils.random(1, 11, 1) + '.jpg';
							_html = 
								'<div id="gm0' + nth + '" class="gmbox empty ' + size_class + '" style="background-image:url(' + _src + ')">' +
								'	<div class="gmtxt-bg">' +
								'		<div class="gmtxt">' +
								'			<p class="gm-memo"></p>' +
								'			<p class="gm-writer"><span class="gmwtr-name"></span></p>' +
								'		</div>' +
								'	</div>' +
								'</div>';
							*/
						}
					}
					
					if (_html != '') {
						$list.append(_html);						
					}
				}
					
				
				// 방명록 클릭시 캐러셀로 상세보기
				$('#review .gmbox').on('click', function(){
					_self.reviewCarousel(this, total);
				});
				
				// 애니메이션 작업
				var _du = 0.8;
				var tl = gsap.timeline({
					scrollTrigger:{
						id: 'review',
						trigger: '#review',
						start: 'top bottom',
						
						onEnter: function(){
							$('.gm-wrap>div').addClass('ez');
					        $('.gm-purpose span,.gm-guest span').addClass('tu');
					        $('.gm-more').addClass('mu');
					        
					        
					        _self.review_ani = setTimeout(function(){
					        	$('.gmbox').removeClass('ez').addClass('oz');
					        }, 2000);
						},
						
						onLeaveBack: function(){
							clearTimeout(_self.review_ani);
							$('.gm-wrap>div').removeClass('ez');
							$('.gmbox').removeClass('oz');
					        $('.gm-purpose span,.gm-guest span').removeClass('tu');
					        $('.gm-more').removeClass('mu');
						},
						//toggleActions: 'play none none reverse'
					}
				});
				_self.addAniName('review');
				
			},
			error : function(e){
				
			}
		});
		
		
		
		
		
		var $title = $('.feedback-title');
	    $title.html($title.text().replace(/(\w)/g, '<span>$1</span>'));
	    
	    
	    gsap.fromTo('.feedback-title span', {opacity:0, scale:5, y:200}, {
			scrollTrigger:{
				id: 'feedback',
				trigger: '#feedback',
				start: 'top bottom-=130',
				toggleActions: 'play reset play reset'
			},
			scale: 1,
	    	y: 0,
	    	opacity: 1, 
	    	stagger: 0.1,
	    	duration: 0.3
		});
	    _self.addAniName('feedback');

	    	
	    // 이벤트 바인딩을 1번만 수행하기 위한 변수 추가
		if (!_self.is_visitor_event_bind) {
			
			$('#btn_review_more').on('click', function(){
				_self.loadReviewAll();
			});
			
			//$('#review_all_layer .btn-popup-close').on('click', function(){
			$('#review_all_layer').on('click', function(){	// 레이어를 클릭하면 닫히도록 변경
				$('#review_all_list').cubeportfolio('destroy');
				$('#review_all_layer').hide();
				if (!_self.is_body_scroll_hidden) {
					$('body').removeClass('overflow-hidden');
				}
				_self.is_body_scroll_hidden = false;
			});
			
			$('#review_all_list').on('click', function(){
				return false;
			});
			
			// 방명록 등록하기
			$('#btn_feedback_submit').on('click', function(){
				_self.registerReview();
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
		$('#review_all_layer').show();
		
		if ($('body').hasClass('overflow-hidden')) {
			_self.is_body_scroll_hidden = true;
		} else {
			$('body').addClass('overflow-hidden');
		}
		
		g360.history_record_rental('review_all_layer');
		
		// 방명록 불러오기
		var url = "/load_memo.mon?rr=" + this.info.dockey + "&start=0&perpage=1000&ak=";
		if (artkey) url += artkey;
		$.ajax({
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(res){
				
				$("#review_all_list").empty();
				
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
				        gapHorizontal: 0,
				        gapVertical: 0,
				        gridAdjustment: "responsive",
				        mediaQueries: [{
				            width: 1500,
				            cols: 4,
				        }, {
				            width: 1100,
				            cols: 4
				        }, {
				            width: 800,
				            cols: 3
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
		$('.host-sns-wrapper').hide();
		$('.host-sns-facebook').removeClass('show');
		$('.host-sns-twitter').removeClass('show');
		$('.host-sns-blog').removeClass('show');
		$('.host-sns-instagram').removeClass('show');
		$('.host-sns-youtube').removeClass('show');
				
		
		if (hostinfo.tel) {
			$('#host_tel').html(hostinfo.tel);
			$('#host_tel').parent().show();
		}
		if (hostinfo.email) {
			$('#host_email').html(hostinfo.email);
			$('#host_email').parent().show();
		}
		
		// SNS 설정
		var flag = false;
		if (hostinfo.facebook) {
			$('.host-sns-facebook').addClass('show');
			flag = true;
		}
		if (hostinfo.twitter) {
			$('.host-sns-twitter').addClass('show');
			flag = true;
		}
		if (hostinfo.blog) {
			$('.host-sns-blog').addClass('show');
			flag = true;
		}
		if (hostinfo.instagram) {
			$('.host-sns-instagram').addClass('show');
			flag = true;
		}
		if (hostinfo.youtube) {
			$('.host-sns-youtube').addClass('show');
			flag = true;
		}
		if (flag) {
			$('.host-sns-label').show();
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
						_self.getReviewCount();
						
						// 메인도 처리함
						_self.setVisitor();
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
				
		var res = 
		'<div class="review-item cbp-item">' +
		'	<div class="review-wrap">' +
		'		<div class="review-img-bg" style="background-image:url(' + src + ')"></div>' +
		'		<div class="review-bg"></div>' +
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
		$('#visitor_password').focus();
		

		
		$('#btn_pass_ok').off().on('click', function(){
			var pass = $('#visitor_password').val();
			
			$.ajax({
				url : "/delete_memo.mon" + "?key=" + reviewkey + "&pw=" + pass,
				success : function(res){
					if (res.result == "OK"){
						g360.showToastMsg("선택하신 방명록이 삭제되었습니다.");
						//alert("선택하신 방명록이 삭제되었습니다.");
						$('#visitor_password').val('');
						$('#btn_pass_cancel').click();
						
						
						if (is_artdetail) {
							_self.getReviewCount();
							$('.btn-remove[data-reviewkey="' + reviewkey + '"]').closest('.art-review').remove();
						} else {
							var remove_obj = $('#review_all_layer .btn-remove[data-reviewkey="' + reviewkey + '"]').closest('.review-item');
							$('#review_all_list').cubeportfolio('remove', remove_obj);
						}
						
						_self.setVisitor();
						
					}else{
						g360.showToastMsg("패스워드가 맞지 않습니다.");
						//alert("패스워드가 맞지 앖습니다.");
					}
				},
				error : function(e){

				}
			});
		});
		
		$('#btn_pass_cancel').off().on('click', function(){
			_self.hideBlockUI(is_artdetail);
			$('#password_layer').hide();
			$('#visitor_password').val('');
		});
		
		_self.isPassEventInit = true;
	},
	
	"showArtistDetail" : function(artistkey) {
		var _self = this;
		
		var data = this.artistlist[artistkey];
		var sep;
		var src_artist_ori = g360.user_photo_color_url(data.email);	//오리지널 이미지
		var src_artist = g360.user_photo_profile_url(data.email);	//사이즈에 맞춰 자른 이미지
				
		// 버전 정보 추가
		src_artist_ori += (data.photoimage_profile_version ? '?open&ver=' + data.photoimage_profile_version : '');
		src_artist += (data.photoimage_profile_version_full ? '?open&ver=' + data.photoimage_profile_version_full : '');
		
		var css_url = '';
		
		if (data.photoimage_profile_full) {
			css_url = 'url(' + src_artist + ')';
		} else if (data.photoimage_profile) {
			css_url = 'url(' + src_artist_ori + ')';
		} else {
			css_url = 'url(' + data.last_art_src + ')'
		}
		
		//$('#artist_pic_wrapper').css('background-image', 'url(' + src_artist + '),url(' + src_artist_ori + ')');
		$('#artist_pic_wrapper').css('background-image', css_url);
		$('#artist_info_name').html(data.nickname);
		$('#artist_info_ename').html(data.name_eng);
		$('#artist_info_birth').html(data.birth);
		$('#artist_info_content1 p').html(g360.textToHtml_Body(data.content));
		if (data.content2) {
			$('#artist_info_content2 p').html(g360.textToHtml_Body(data.content2));
			$('#artist_info_content2').show();
		} else {
			$('#artist_info_content2').hide();
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
			$('#artist_info_group').hide();
			group = '정보없음';
		} else {
			$('#artist_info_group').show();
		}
		$('#artist_info_group p').html(g360.textToHtml_Body(group));
		
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
			$('#artist_info_education').hide();
			edu = '정보없음';
		} else {
			$('#artist_info_education').show();
		}
		$('#artist_info_education p').html(g360.textToHtml_Body(edu));
		
		// 경력
		var career = '';
		sep = '';
		if (!data.career || data.career.length == 0) {
			$('#artist_info_career').hide();
			career = '정보없음';
		} else {
			career = '<table class="artist-career-table" style="width:100%;">';
			career += '<colgroup><col style="width:$width$px;" /><col style="width:auto;" /></colgroup>';
			$.each(data.career, function(){
				career += '<tr>';
				career += '<td style="width:80px">' + this.term + '</td>';
				career += '<td>' + g360.textToHtml_Body(this.title) + '</td>';
				career += '</tr>';
				if (this.term) sep = 'T';
			});
			career += '</table>';
			career = career.replace(/\$width\$/g, (sep == 'T' ? '40' : '0'));
			$('#artist_info_career').show();
		};
		$('#artist_info_career p').html(career);
		
		// 소장처 정보
		var cert = '';
		sep = '';
		if (!data.cert || data.cert.length == 0) {
			$('#artist_info_cert').hide();
			cert = '정보없음';
		} else {
			cert = '<table class="artist-career-table">';
			cert += '<colgroup><col style="width:$width$px;" /><col style="width:auto;" /></colgroup>';
			$.each(data.cert, function(){
				cert += '<tr>';
				cert += '<td>' + g360.textToHtml_Body(this.certname) + '</td>';
				cert += '</tr>';
				if (this.term) sep = 'T';
			});
			cert += '</table>';
			cert = cert.replace(/\$width\$/g, (sep == 'T' ? '40' : '0'));
			$('#artist_info_cert').show();
		};
		$('#artist_info_cert p').html(cert);
		
		// 전시 및 프로젝트 경력
		var display = '';
		sep = '';
		if (!data.display || data.display.length == 0) {
			$('#artist_info_display').hide();
			display = '정보없음';
		} else {
			display = '<table class="artist-career-table">';
			display += '<colgroup><col style="width:$width$px;" /><col style="width:auto;" /></colgroup>';
			$.each(data.display, function(){
				display += '<tr>';
				display += '<td style="width:80px">' + this.term + '</td>';
				display += '<td>' + g360.textToHtml_Body(this.title) + '</td>';
				display += '</tr>';
				if (this.term) sep = 'T';
			});
			display += '</table>';
			display = display.replace(/\$width\$/g, (sep == 'T' ? '40' : '0'));
			$('#artist_info_display').show();
		};
		$('#artist_info_display p').html(display);
		

		// 애니메이션 효과 때문에 스크롤처리에 timeout 설정
		setTimeout(function(){
			$('.artist-view-section').scrollTop(0);
		}, 100);
		
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
			gsap.fromTo('.loading-letters', {scale:1, opacity:1}, {
				scale: 0, 
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
			$('#art_detail_wrapper, #m_art_detail_wrapper .front-img').on('click', function(){
				
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
		
		var $btn_wrap = $('#art_detail_layer .media-icon-wrap');
		
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
		
		// 방명록 보기
		$('#detail_gm_show').on('click', function(){
			_self.showArtReview();
		});
		
		// 방명록 닫기
		$('#art_review_block').on('click', function(){
			_self.hideArtReview();
		});
		
		// 방명록 작성 취소
		$('#btn_art_review_cancel').on('click', function(){
			_self.hideReviewArea();
		});
		
		// 방명록 작성
		$('#btn_art_review_submit').on('click', function(){
			_self.registerReview(_self.cur_art_info.dockey);
		});
		
	},
	// 방명록 작성 영역 표시
	"showReviewArea" : function(){
		$('#art_review_name').val('');
		$('#art_review_pass').val('');
		$('#art_review_msg').val('');
		$('#art_detail_info').hide();
		$('#review_write_area').show();
		
		gsap.fromTo('.art-review-title span', {opacity:0, scale:3, y:80}, {
			scale: 1,
	    	y: 0,
	    	opacity: 1, 
	    	stagger: 0.06,
	    	duration: 0.2
		});
	},
	"hideReviewArea" : function(){
		$('#art_review_name').val('');
		$('#art_review_pass').val('');
		$('#art_review_msg').val('');
		$('#review_write_area').hide();
		$('#art_detail_info').show();
		var btn_sticky = ScrollTrigger.getById('btn_sticky');
		var tab_sticky = ScrollTrigger.getById('tab_sticky');
		btn_sticky.refresh();
		tab_sticky.refresh();
	},
	
	"showArtReview" : function(){
		$('#art_review_layer').show();
		$('#review_cnt_badge').hide();
		this.show_art_review_tl = gsap.timeline();
		this.show_art_review_tl.fromTo('#art_review_layer', {opacity:0}, {opacity:1, duration:0.3})
			//.fromTo('.art-review-container', {yPercent:100}, {yPercent:0, duration:0.3}, '<')  
			.fromTo('#detail_gm_show', {yPercent:0}, {yPercent:100, duration:0.3}, '<');
		
		this.getArtReview();
	},
	
	"hideArtReview" : function(){
		// 수행중인 경우 취소 처리		
		this.hide_art_review_tl = gsap.timeline({
			onComplete: function(){
				$('#art_review_layer').hide();
				//$('.art-review-container').empty();
			}
		});
		this.hide_art_review_tl.to('#art_review_layer', {opacity:0, duration:0.2})
			.to('.art-review-container', {yPercent:100, duration:0.2}, '<')  
			.to('#detail_gm_show', {yPercent:0, duration:0.2});
		
		
		if ($('#review_cnt_badge').length > 0) {
			$('#review_cnt_badge').show();
			this.hide_art_review_tl.fromTo('#review_cnt_badge', {scale:0.3}, {scale:1});
		}
		  
	},
	
	"getArtReview" : function(){
		var _self = this;
		
		$('.art-review-mobile').empty();
		$('.art-review-container').empty();
		
		var $btn_inner_close = $('<div class="btn-inner-close"><span></span><span></span><div class="label">Close</div></div>');
		var $btn_inner_write = $('<div class="btn-inner-write"><div class="ico-write"></div><div class="label">Leave a Message</div></div>');
		$('.art-review-container').append($btn_inner_close);
		$('.art-review-container').append($btn_inner_write);
		
		// 방명록 불러오기
		var url = "/load_memo.mon?rr=" + this.info.dockey + "&ak=" + this.cur_art_info.dockey + "&start=0&perpage=100";
		$.ajax({
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(res){
				var $slide = $('<div id="art_review_slide" class="art-review-slide owl-carousel">');
				$('.art-review-container').append($slide);
				
				var $m_layer = $('.art-review-mobile');
				var $btn_close = $('#btn_review_mobile_close, .btn-inner-close');
				$btn_close.off().on('click', function(){
					_self.hideArtReview();
				});
				
				
				var $m_block = $('<div class="art-review-block"></div>');
				// 모바일 백그라운드 클릭시 닫기 처리
				$m_layer.append($m_block);
				$m_block.on('click', function(){
					_self.hideArtReview();
				});
				
				
				var disp_cnt = 5;
				var _html = '';
				var _src, _comment, _name, _reviewkey;
				var cnt = 0;
				var total_cnt = 0;

				var style_num = 0;
				if (res.length > 0) {
					total_cnt = res[0].totalcount;
					var data = res.splice(1);
					data.push({'artkey':'default', 'title':'default'});
					
					$.each(data, function(){
						if (!this.title) return true;
						cnt++;
						
						/*
						// 최대 14개까지 표시
						if (cnt > 15) {
							return false;
						}
						*/
						
						// 색상표는 11개까지 있음
						style_num++;
						if (style_num > 11) style_num = 1;
						
						// 캐러셀 하나당 5개씩 표시함
						if (cnt % disp_cnt == 1) {
							$slide.append('<div class="item"></div>');
						}
						
						var $wrap = $('#art_review_slide').find('.item').last();
						var review = '';
						
						if (this.artkey == 'default') {
							// 방명록 기본 정보를 표시
							//_comment = '<div>작품 관람은 어떠셨나요?</div><div style="margin-top:5px;">감상평을 방명록으로 남겨보세요!</div>';
							_comment = '<div>Say Hello to ' + g360.rental_text.rental_artist + '!</div>';
							
							review = 
								'<div class="art-review write style-' + style_num + '">' +
								'	<div class="art-review-txt-wrap">' +
								'		<div class="art-review-content">' + _comment + '</div>' +
								'		<div class="art-review-btn">'+
								'			<div><div class="btn-review-write btn-rect">Leave a Message</div></div>' +
								//(total_cnt > 14 ? '<div><div class="btn-rect btn-art-review-detail">방명록 더보기</div></div>' : '') +
								'		</div>' +
								'	</div>' +
								'</div>';
						} else {
							_comment = this.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
							_name = this.title;
							_reviewkey = this['_id']['$oid'];
							
							review =  
								'<div class="art-review style-' + style_num + '">' +
								'	<div class="art-review-txt-wrap">' +
								'		<div class="art-review-content">' + _comment + '</div>' +
								'		<div class="btn-remove" data-reviewkey="' + _reviewkey + '"></div>' +
								'		<div class="art-review-name">- ' + _name + '</div>' +
								'	</div>' +
								'</div>';
						}						
						
						$wrap.append(review);
						
						// 모바일 별도 표시
						$m_layer.append(review);
					});
					
					
					// 방명록 남기기
					$('.btn-review-write').on('click', function(){
						_self.hideArtReview();
						_self.showReviewArea();						
					});
					
					// 방명록 남기기 (플로팅 버튼)
					$('.btn-art-review-write, .btn-inner-write').off().on('click', function(){
						_self.hideArtReview();
						_self.showReviewArea();
					});
					
					// 방명록 삭제
					$('.btn-remove').on('click', function(){
						_self.showPassDialog($(this).data('reviewkey'), true);
					});
					
					$('#art_review_layer').scrollTop(0);
				}
				
				// 방명록 스크롤 처리
				if (!g360.isMobile()) {
					$slide.find('.art-review-content').mCustomScrollbar({				
						theme:"minimal-dark"
					});
				}
				

				$slide.owlCarousel({
			        items: 1,
			        loop: false,
			        margin: 0,
			        dots: true,
			        nav: true,
			        dotsEach: true,
			        onInitialized: function(){
			        	var review_tl = gsap.timeline();
			        	review_tl.fromTo('.art-review-container', {yPercent:100}, {yPercent:0, duration:0.5})
			        				.fromTo('.btn-inner-write', {yPercent:100, opacity:0}, {yPercent:0, opacity:1, duration:0.3, clearProps:'y'})
			        				.fromTo('.btn-inner-close', {yPercent:100, opacity:0}, {yPercent:0, opacity:1, duration:0.3, clearProps:'y'});
			        	
			        	
			        	
			        	// 모바일
			        	$slide.find('.art-review').on('click, mouseenter', function(){
			        		if ($(this).hasClass('active')) return;
			        		$slide.find('.art-review').removeClass('active');
			        		$(this).addClass('active');
			        	});
			        	
			        	$slide.find('.art-review').on('mouseleave', function(){
			        		$(this).removeClass('active');
			        	});
			        }
			    });
				
			},
			error : function(e){
				
			}
		});
	},
	
	"stopAudio" : function(){
		var _self = this;
		var $btn_wrap = $('#art_detail_layer .media-icon-wrap');
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
		var $btn_wrap = $('#art_detail_layer .media-icon-wrap');
		
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