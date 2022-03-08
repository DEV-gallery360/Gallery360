
function gRentalLanding() {
	this.page_info = {
		type : 1, //1:최신순, 2:닉네임순, 3:랜덤정렬
		vr : {
			start : 0,
			perpage : 24,
			complete : false
		}
	}
}

gRentalLanding.prototype = {
	"init" : function(key) {
		
		// 메인배너 동영상 표시
		$('#rental_video_wrapper').vide({
			'mp4': '/main/rental/video/3',
			'poster': '/main/rental/video/3',
	    });
		
		this.setVRCarousel();
		this.eventBind();
		

		if (key == 'list') {
			//진행중인 전시
			this.showRentalList();
			
		} else if (key == 'recommend') {
			//추천 전시
			var _top = $('.anyone-btm').offset().top;
			$('html').scrollTop(_top);		
			
		} else if (key == 'price') {
			//서비스 요금
			var _top = $('#price').offset().top;
			$('html').scrollTop(_top);

		}
		
		this.g_lang();
	},
	
	"g_lang" : function(){
		
		$(".g_lang_VR_Exhibit1").html(g360.g_lang.VR_Exhibit1);
		$(".g_lang_VR_Exhibit2").html(g360.g_lang.VR_Exhibit2);
		$(".g_lang_VR_Exhibit3").html(g360.g_lang.VR_Exhibit3);
		$(".g_lang_VR_Exhibit4").html(g360.g_lang.VR_Exhibit4);
		$(".g_lang_VR_Exhibit5").html(g360.g_lang.VR_Exhibit5);
		$(".g_lang_VR_Exhibit6").html(g360.g_lang.VR_Exhibit6);
		$(".g_lang_VR_Exhibit7").html(g360.g_lang.VR_Exhibit7);
		$(".g_lang_VR_Exhibit8").html(g360.g_lang.VR_Exhibit8);
		$(".g_lang_VR_Exhibit9").html(g360.g_lang.VR_Exhibit9);
		$(".g_lang_VR_Exhibit10").html(g360.g_lang.VR_Exhibit10);
		$(".g_lang_VR_Exhibit11").html(g360.g_lang.VR_Exhibit11);
		$(".g_lang_VR_Exhibit12").html(g360.g_lang.VR_Exhibit12);
		$(".g_lang_VR_Exhibit13").html(g360.g_lang.VR_Exhibit13);
		$(".g_lang_VR_Exhibit14").html(g360.g_lang.VR_Exhibit14);
		$(".g_lang_VR_Exhibit15").html(g360.g_lang.VR_Exhibit15);
		$(".g_lang_VR_Exhibit16").html(g360.g_lang.VR_Exhibit16);
		$(".g_lang_VR_Exhibit17").html(g360.g_lang.VR_Exhibit17);
		$(".g_lang_VR_Exhibit18").html(g360.g_lang.VR_Exhibit18);
		$(".g_lang_VR_Exhibit19").html(g360.g_lang.VR_Exhibit19);
		$(".g_lang_VR_Exhibit20").html(g360.g_lang.VR_Exhibit20);
		$(".g_lang_VR_Exhibit21").html(g360.g_lang.VR_Exhibit21);
		$(".g_lang_VR_Exhibit22").html(g360.g_lang.VR_Exhibit22);
		$(".g_lang_VR_Exhibit23").html(g360.g_lang.VR_Exhibit23);
		$(".g_lang_VR_Exhibit24").html(g360.g_lang.VR_Exhibit24);
		$(".g_lang_VR_Exhibit25").html(g360.g_lang.VR_Exhibit25);
		$(".g_lang_VR_Exhibit26").html(g360.g_lang.VR_Exhibit26);
		$(".g_lang_VR_Exhibit27").html(g360.g_lang.VR_Exhibit27);

		$(".g_lang_VR_Exhibit28").html(g360.g_lang.VR_Exhibit28);
		$(".g_lang_VR_Exhibit29").html(g360.g_lang.VR_Exhibit29);
		$(".g_lang_VR_Exhibit30").html(g360.g_lang.VR_Exhibit30);
		$(".g_lang_VR_Exhibit31").html(g360.g_lang.VR_Exhibit31);
		
		var VR_Exhibit32 = g360.g_lang.VR_Exhibit32_1 + "<br />" + g360.g_lang.VR_Exhibit32_2 + "<br />" + g360.g_lang.VR_Exhibit32_3 + "<br />" + g360.g_lang.VR_Exhibit32_4 + "<br />" + g360.g_lang.VR_Exhibit32_5 ;
		$(".g_lang_VR_Exhibit32").html(VR_Exhibit32);
		
		$(".g_lang_VR_Exhibit33").html(g360.g_lang.VR_Exhibit33);
		$(".g_lang_VR_Exhibit33_1").html(g360.g_lang.VR_Exhibit33_1);
		
		$(".g_lang_VR_Exhibit34").html(g360.g_lang.VR_Exhibit34);
		$(".g_lang_VR_Exhibit35").html(g360.g_lang.VR_Exhibit35);
		$(".g_lang_VR_Exhibit36").html(g360.g_lang.VR_Exhibit36);
		$(".g_lang_VR_Exhibit37").html(g360.g_lang.VR_Exhibit37);
		$(".g_lang_VR_Exhibit38").html(g360.g_lang.VR_Exhibit38);
		$(".g_lang_VR_Exhibit39").html(g360.g_lang.VR_Exhibit39);
		$(".g_lang_VR_Exhibit40").html(g360.g_lang.VR_Exhibit40);
		$(".g_lang_VR_Exhibit41").html(g360.g_lang.VR_Exhibit41);
		$(".g_lang_VR_Exhibit42").html(g360.g_lang.VR_Exhibit42);
		$(".g_lang_VR_Exhibit43").html(g360.g_lang.VR_Exhibit43);
		$(".g_lang_VR_Exhibit44").html(g360.g_lang.VR_Exhibit44);
		$(".g_lang_VR_Exhibit45").html(g360.g_lang.VR_Exhibit45);
		$(".g_lang_VR_Exhibit46").html(g360.g_lang.VR_Exhibit46);
		$(".g_lang_VR_Exhibit47").html(g360.g_lang.VR_Exhibit47);
		$(".g_lang_VR_Exhibit48").html(g360.g_lang.VR_Exhibit48);
		
		
		$(".g_lang_Price_1").html(g360.g_lang.Price_1);
		$(".g_lang_Price_2").html(g360.g_lang.Price_2);
		$(".g_lang_Price_3").html(g360.g_lang.Price_3);
		$(".g_lang_Price_4").html(g360.g_lang.Price_4);
		$(".g_lang_Price_5").html(g360.g_lang.Price_5);
		$(".g_lang_Price_6").html(g360.g_lang.Price_6);
		$(".g_lang_Price_7").html(g360.g_lang.Price_7);
		$(".g_lang_Price_8").html(g360.g_lang.Price_8);
		$(".g_lang_Price_9").html(g360.g_lang.Price_9);
		$(".g_lang_Price_10").html(g360.g_lang.Price_10);
		$(".g_lang_Price_11").html(g360.g_lang.Price_11);
		$(".g_lang_Price_12").html(g360.g_lang.Price_12);
		$(".g_lang_Price_13").html(g360.g_lang.Price_13);
		$(".g_lang_Price_14").html(g360.g_lang.Price_14);
		$(".g_lang_Price_15").html(g360.g_lang.Price_15);
		$(".g_lang_Price_16").html(g360.g_lang.Price_16);
		$(".g_lang_Price_17").html(g360.g_lang.Price_17);
		$(".g_lang_Price_18").html(g360.g_lang.Price_18);
		
		$(".g_lang_VR_Recommand_1").html(g360.g_lang.VR_Recommand_1);
		$(".g_lang_VR_Recommand_2").html(g360.g_lang.VR_Recommand_2);
		$(".g_lang_VR_Recommand_3").html(g360.g_lang.VR_Recommand_3);
		
	},
	
	"setVRCarousel" : function(key) {
		var _self = this;

		$.ajax({
			url: '/loadAll_lending.mon',
			success: function(res) {
				
				var vr_list = res.lending;
				
				// VR 전시관 네비 및 슬라이드 만들기
				var $nav = $('#anyone_slider_nav');
				var $slide = $('#anyone_slider');
				$.each(vr_list, function(idx){
					var _category = '';
					var _lending_name = '';
					var _organizer_name = '';
					
					if (g360.g_lang.Lang == 'kr') {
						_category = this.category;
						_lending_name = this.lending_name;
						_organizer_name = this.organizer_name;
					} else {
						_category = this.category_en || this.category;
						_lending_name = this.lending_name_en || this.lending_name;
						_organizer_name = this.organizer_name_en || this.organizer_name;
					}
					
					var $nav_item = $('<li data-slide-idx="' + idx + '">#' + _category + '</li>');
					$nav.append($nav_item);
					
					var img_url = '/artimage/lending/' + this.image;
					var _html = 
						'<div class="item" data-slide="' + idx + '">' +
						'	<div class="imgbox" style="background-image:url(\'' + img_url + '\')">' +
						'		<div class="imgghost"></div>'+
						'	</div>'+
						'	<div class="slide-text-wrap">'+
						'		<span>' + _lending_name + ' / ' + _organizer_name + '</span>'+
						'	</div>'+
						'</div>';
					var $slide_item = $(_html);			
					$slide.append($slide_item);
				});
				$nav.find('li:eq(0)').addClass('on');
				
				
				$slide.owlCarousel({
					center: true,
				    items:1,
				    loop:true,
				    margin:50,
				    responsive:{
				        1200:{
				        	items:2,
				            margin:150
				        },
				        768:{
				        	items:2,
				        	margin:100
				        }
				    },
				    onDragged: function(e){
				    	_self.time_func = setTimeout(function(){
				    		var idx = $slide.find('.center .item').data('slide');
				    		$nav.find('li').removeClass('on');
				    		$nav.find('li:eq(' + idx + ')').addClass('on');
				    	}, 100);
				    }
				});
				
				
				// nav 이벤트
				$nav.find('li').on('click', function(){
					var $this = $(this);
					if ( $this.hasClass('on') ) return;
					
					
					clearTimeout(_self.time_func);
					
					$nav.find('li').removeClass('on');
					$this.addClass('on');
					var idx = $this.data('slide-idx');
					$slide.trigger('to.owl.carousel', [idx, 500]);
				});
				
				// URL 연결
				$slide.find('.item').on('click', function(){
					if (!$(this).parent().hasClass('center')) return;
					
					var idx = $(this).data('slide');
					window.open(vr_list[idx].short_url);
				});
			}
		});
		
	},
	
	"showPrice" : function(month){
		
		var url = '/main/rental/estimate.jsp?open';
		if (month) {
			url += '&month=' + month;
		}
		
		var w = screen.width >= 800 ? 900 : screen.width;
		var h = screen.height - 200;		
		
		window.open(url,'gallery360_rental_price','height=' + h + ',width=' + w + 'fullscreen=yes')
	},
	"eventBind" : function(){
		var _self = this;
		
		// 1. 애니메이션 효과 설정
		var $cont = $('.rental-land');
		
		$.appear('.rental-land-ani');
		$cont.on('appear', '.rental-land-ani', function(){
			var $this = $(this);
			
			var ani_nm = $this.data('aniname');
			if (ani_nm) {
				$this.addClass('animate__' + ani_nm);
			}
			
			if ( $this.hasClass('vr-exhibit') ) {
				$this.addClass('ani animate__fadeIn');
			}
			
		});
		
		
		$.appear('.ani-trigger');
		$cont.on('appear', '.ani-trigger', function(){
			//$(this).addClass('ani');
			var $this = $(this).parent().find('h2');
			var ani_nm = $this.data('aniname');
			if (ani_nm) {
				$this.addClass('animate__' + ani_nm);
			}
		});
		
		$.force_appear();

		
		// 대관 리스트 보기
		$('#btn_rental_list, #btn_all_rental_list').on('click', function(){
			_self.showRentalList();
		});
		
		// 대관 가이드 자세히 보기
		$('#easy .rent-easy-btn').on('click', function(){
			// 유튜브 동영상 업데이트 필요(TODO)
			g360.showYoutube('https://www.youtube.com/embed/Rs9W6aQ3b5Q');
		});
		
		// 1개월 가격 알아보기
		$('#btn_rental_price_1').on('click', function(){
			_self.showPrice(1);
		});

		// 6개월 가격 알아보기
		$('#btn_rental_price_6').on('click', function(){
			_self.showPrice(6);
		});
		
		// 추천 링크 연결
		$('#recommand .recomm-list').on('click', function(){
			var short_url = $(this).data('short-url');
			if (short_url) {
				window.open('https://www.gallery360.co.kr/v/' + short_url);				
			}
		});
		
		
	},
	"gotoScroll" : function(id, add_mount){
		var _top = $('#'+id).offset().top;
		if (_top) {
			if (!isNaN(add_mount)) {
				_top += add_mount;
			}
			$("html,body").animate({
				scrollTop: _top
			}, 500);			
		}
	},
	
	"showRentalList" : function(){
		
		g360.body_scroll_hide();
		
		var html = 
			'<div id="rental_list_layer" class="group-list-layer">' +
			'	<div class="dim_tp-imgpick"></div>' +
			'	<div class="contaier_group-list_rental">' +
			'		<div class="gnbbar_group-list_rental">' +
			'			<div class="group-list_rental-title">' +
			'				<h2>Gallery360</h2>' +
			'				<span id="rental_list_close" class="btn-cancel_tp-vr">닫기</span>' +
			'			</div>' +
			'		</div>' +
			'		<div class="main-warp-group-list_rental">' +
			'			<div class="list-titlemm_group-list_rental">' +
			'				<h3 id="group_list_title" class="animate__animated animate__fadeInUp" style="cursor:default;">'+g360.g_lang.VR_Exhibit_List+'</h3>' +
			//'				<p id="group_list_comm" class="animate__animated animate__fadeInUp"></p>' +
			'				<div id="group_list_count" class="group-list-cnt-wrapper animate__animated animate__fadeInUp">' + 
			'					<div><img src="/img/rental_landing/icon-rental-art.png"> '+g360.g_lang.ExhibitList1+' <span class="group-list-cnt" id="group_list_cnt_art"></span> '+g360.g_lang.Artist_Mypage8_0+'</div>' +
			'					<div><img src="/img/rental_landing/icon-rental-rental.png"> '+g360.g_lang.ExhibitList2+' <span class="group-list-cnt" id="group_list_cnt_rental"></span> '+g360.g_lang.Artist_Mypage8_1+'</div>' +
			'					<div><img src="/img/rental_landing/icon-rental-people.png"> '+g360.g_lang.ExhibitList3+' <span class="group-list-cnt" id="group_list_cnt_view"></span> '+g360.g_lang.Artist_Mypage8_2+'</div>' + 
			'				</div>' +
			'			</div>' +
			'			<div class="list-wrap_group-list_rental">' +
			'				<ul id="rental_list" class="list_group-list_rental"></ul>' +
			'			</div>' +
			'			<div id="rental_list_loader"></div>' +
			'    	</div>' +
			'	</div>' +
			'</div>';
		$('body').append(html);
		
		// 닫기 버튼 처리
		$('#rental_list_close').on('click', function(){
			g360.body_scroll_show();
			$('#rental_list_layer').remove();
		});
		
		this.loadRentalList();
	},

	"infiniteScroll" : function(){
		var _self = this;
		
		// 작품검색 InfiniteScroll 적용
		this.search_controller = new ScrollMagic.Controller();
		this.search_scene = new ScrollMagic.Scene({triggerElement:'#rental_list_loader', triggerHook:'onEnter', offset:-100}).addTo(_self.search_controller);
		this.search_scene.on('enter', function(e) {
			var $grid = $('#rental_list');
			var $loader = $('#rental_list_loader');
			if (_self.page_info.vr.complete) return;
			if (!$loader.hasClass('first') && !$loader.hasClass('active')) {
				$loader.addClass('active');				
				_self.getRentalList().then(function(data){
					$.each(data.list, function(){_self._appendPictureEl($grid, this);});
					$loader.removeClass('active');
				});
			}
		});
		
	},
	"loadRentalList" : function(){
		var _self = this;
		var _html = '';
		var $grid = $('#rental_list');
		var $loader = $('#rental_list_loader');
		
		$loader.addClass('first active');
		
		// 데이터 가져오기 초기화
		_self.page_info.vr.start = 0;
		_self.page_info.vr.complete = false;
		
		// 즐겨찾기 데이터 가져오기
		_self.getRentalList().then(function(data){
			$.each(data.list, function(){_self._appendPictureEl($grid, this);});
			_self.infiniteScroll();
			_self.search_scene.update();
			$loader.removeClass('first active');
		}, function() {
			$loader.hide();
		});
	},
	"getRentalList":function(){
		var _self = this;
		var url = g360.root_path + "/load_VRRoom_rental_public.mon?start=" + _self.page_info.vr.start + "&perpage="+_self.page_info.vr.perpage+"&ty=all&sort=" + _self.page_info.type;		
		return $.ajax({
			url : url,
			success : function(data){
				// data  {count:{rental_all_count:#, rental_art_count:#, view_count:#}, list:[...], totalcount:#}
				
				// 최초에만 값을 뿌려줌
				if (_self.page_info.vr.start == 0) {
					$('#group_list_cnt_rental').text(g360.numberComma(data.count.rental_all_count));
					$('#group_list_cnt_art').text(g360.numberComma(data.count.rental_art_count));
					$('#group_list_cnt_view').text(g360.numberComma(data.count.view_count));
				}
				
				// 다음 로드될 페이지 값 셋팅
				if (data.list.length > 0) _self.page_info.vr.start += (data.list.length);
				
				// 카운트 셋팅
				//$('#vr_list_loading_cnt').html(g360.numberComma(_self.page_info.vr.start));
				$('#group_list_comm').html('총 ' + g360.numberComma(data.totalcount) + g360.g_lang.Artist_Mypage7);
				
				
				// 마지막 페이지 체크
				if ((data.list.length) < _self.page_info.vr.perpage) {
					_self.page_info.vr.complete = true;
				}
			},
			error : function(e){
				g360.error_alert();
			}
		});
	},
	"_appendPictureEl" : function($wrapper, data_info){
		
		//1~5까지 랜덤숫자
		var random = Math.floor( Math.random() * 5 + 1 );
		var html = '';
		if (data_info.open_homepage == 'T') {
			// 공개용 html
			html =
				'<li onclick="gRL.openRental(\'' + data_info.short_url + '\')" class="select_group-list_rental animate__animated animate__fadeIn" style="animation-delay:0.' + random + 's">' +
			    '	<div class="imgbox_group-list_rental" style="background-image: url(' + data_info.service_image + ')">' +
			    '	  	<div class="imgbox-blank"></div>' +
			    '		<div class="detail-text">' +
			    '			<h4>' + g360.textToHtml_Body(data_info.title) + '</h4>' +
	            '			<p>주최: ' + g360.textToHtml_Body(data_info.host) + '</p>' +
	            '			<div class="rental-view-cnt"><img src="/img/rental_landing/icon-rental-view.png">&nbsp;&nbsp;' + g360.numberComma(data_info.viewcount) + '</div>' +
			    '		</div>' +
			    '	</div>' +
			    '</li>';
		} else {
			// 비공개 html
			html =
				'<li class="select_group-list_rental private-rental animate__animated animate__fadeIn" style="animation-delay:0.' + random + 's">' +
			    '	<div class="imgbox_group-list_rental" style="background-image: url(/img/rental_landing/private-rental.jpg)">' +
			    '		<div class="imgbox-lock"></div>' +
			    '	  	<div class="imgbox-blank"></div>' +
			    '		<div class="detail-text">' +
			    '			<h4>' + g360.textToHtml_Body(data_info.title) + '</h4>' +
	            '			<div class="rental-view-cnt"><img src="/img/rental_landing/icon-rental-view.png">&nbsp;&nbsp;' + g360.numberComma(data_info.viewcount) + '</div>' +
			    '		</div>' +
			    '	</div>' +
			    '</li>';
		}
		
		
		$wrapper.append(html);
	},
	"openRental" : function(short_url){
		var url = g360.root_path + "/v/" + short_url;
		window.open(url);
	}
	
}