function Curie(){
	this.wrapper = $('#curie_wrapper');
	this.load_def;
	this.gap = 40;
	this.ai_painter = {
		initialize : false,
		start : 0,
		perpage : 20,
		complete : false
	},
	this.share_id = null;
	this.share_key = null;
}

Curie.prototype = {
	"init" : function(){
		var _self = this;
		
		g360.loadingbar_open(g360.g_lang.Curie0);
		
		_self.load_def = $.Deferred();
		_self.load_def.always(function(){
			_self.eventBind();
			
			// 추천 작품이 10개 미만인 레이어에 no-img 클래스 추가
			_self.wrapper.find('.curie_thm div img[src=""]').closest('a').addClass('no-img');
		});
		
		_self.loadCurieRecommand();
		
		this.g_lang();
	},
	
	"g_lang": function(){

		$(".g_lang_Curie_1").html(g360.g_lang.Curie_1);
		$(".g_lang_Curie_2").html(g360.g_lang.Curie_2);
		$(".g_lang_Curie_3").html(g360.g_lang.Curie_3);
		$(".g_lang_Curie_4").html(g360.g_lang.Curie_4);
		$(".g_lang_Curie_5").html(g360.g_lang.Curie_5);
		
		$(".g_lang_Share").html(g360.g_lang.Share);
		$(".g_lang_Close").html(g360.g_lang.Close);
		
		$(".g_lang_Facebook").html(g360.g_lang.Facebook);
		$(".g_lang_Kakaotalk").html(g360.g_lang.Kakaotalk);
		$(".g_lang_Naver").html(g360.g_lang.Naver);
		$(".g_lang_Band").html(g360.g_lang.Band);
		$(".g_lang_Twitter").html(g360.g_lang.Twitter);
		$(".g_lang_Link").html(g360.g_lang.Link);
		$(".g_lang_Homepage_Open").html(g360.g_lang.Homepage_Open);
		
		$(".g_lang_Curie_Recommend_1").html(g360.g_lang.Curie_Recommend_1);
		$(".g_lang_Curie_Recommend_2").html(g360.g_lang.Curie_Recommend_2);
		$(".g_lang_Curie_Recommend_3").html(g360.g_lang.Curie_Recommend_3);
		$(".g_lang_Curie_Recommend_4").html(g360.g_lang.Curie_Recommend_4);
		
		$(".g_lang_Curie").html(g360.g_lang.Curie_title);
		// AI Painter
		// > gallery360.common.js > "popup_aipainter_start", "aiPainter_Start"
		
		
	},
	
	"hideCurie" : function(){
		var _self = this;
		$('#curie_header').removeClass('active');
		$('#curie_layer').hide();
		$('#curie_detail_layer').hide();
		$('#curie_detail_wrapper').empty();
		g360.showBodyScroll();
		
		// 오디오 재생중인 경우 중지
		if (g360.time_interval) {
			clearInterval(g360.time_interval);
		}
	},
	"eventBind" : function(){
		var _self = this;
		
		function chgActive(num){
			
			_self.wrapper.find('.curie_paging li').removeClass('on');
			_self.wrapper.find('.curie_paging li').eq(num).addClass('on');
			_self.wrapper.find('.curie_tab li').removeClass('on');
			_self.wrapper.find('.curie_tab li').eq(num).addClass('on');
			_self.wrapper.find('.curie_title div').removeClass('on');
			_self.wrapper.find('.curie_title div').eq(num).addClass('on');
			if(num == 3){
				if (!_self.ai_painter.initialize) {
					_self.initAiPainter();
				}
				_self.wrapper.find('.curie_aipainter').show().addClass('on');
				_self.wrapper.find('.btn_curie_aipainter').addClass('on');
				_self.wrapper.find('.curie_slide').addClass('hidden');
				_self.wrapper.find('.logo_aipainter_sh').show();
			}else{
				_self.wrapper.find('.curie_slide').removeClass('hidden');
				_self.wrapper.find('.curie_aipainter').removeClass('on').hide();
				_self.wrapper.find('.btn_curie_aipainter').removeClass('on');
				_self.wrapper.find('.logo_aipainter_sh').hide();
			}
			$('#curie_layer').scrollTop(0);
			
						
		}
		function nextSlide(){
			_self.wrapper.find('.curie_slide .curie_thm').each(function(idx){
				var $this = $(this);
				var delay = idx*_self.gap;
				setTimeout(function() {
					$this.trigger('next.owl.carousel');
				}, delay);
			});
			//var index = _self.wrapper.find('.owl-dot.active').index();
			var index = _self.wrapper.find('.curie_paging li.on').index();
			index++;
			if (index > 3) index = 0;
			
			chgActive(index);
		}
		function prevSlide(){
			_self.wrapper.find('.curie_slide .curie_thm').each(function(idx){
				var $this = $(this);
				var delay = idx*_self.gap;
				setTimeout(function() {
					$this.trigger('prev.owl.carousel');
				}, delay);
			});
			//var index = _self.wrapper.find('.owl-dot.active').index();
			var index = _self.wrapper.find('.curie_paging li.on').index();
			index--;
			if (index < 0) index = 3;
			chgActive(index);
		}
		
		_self.wrapper.find('.curie_thm').owlCarousel({
			//lazyLoad : true,
			items : 1,
			loop : true,
			dots : true,
			mouseDrag : false,
			touchDrag : false,
			smartSpeed : 1000,
			margin : 1,
			onInitialized : function(){
				g360.loadingbar_close();
				$('#curie_layer').show();
			}
		});
		
		
		// 왼쪽 메뉴 탭
		_self.wrapper.find('.curie_tab li').click(function(){
			_self.wrapper.find('.curie_slide .curie_thm').each(function(e){
				var delay = e*_self.gap;
				setTimeout(function() {
					_self.wrapper.find('.curie_slide .curie_thm').eq(e).trigger('to.owl.carousel', index);
				}, delay);
			});
			var index = $(this).index();
			chgActive(index);
			return false;
		});
		
		// 하단 페이지 네비게이션
		_self.wrapper.find('.curie_paging li').on('click', function(){
			if ($(this).hasClass('on')) return;
			_self.wrapper.find('.curie_slide .curie_thm').each(function(e){
				var delay = e*_self.gap;
				setTimeout(function() {
					_self.wrapper.find('.curie_slide .curie_thm').eq(e).trigger('to.owl.carousel', index);
				}, delay);
			});
			var index = $(this).index();
			chgActive(index);
			
		});
		_self.wrapper.find('.curie_next').click(function(){
			nextSlide();
		});
		_self.wrapper.find('.curie_prev').click(function(){
			prevSlide();
		});
		
		// 닫기
		$('#curie_header').off().on('click',function(){
			_self.hideCurie();
		});
		
		
		/*
		 * 공유하기 레이어
		 */
		$(document).off('mousedown.curie.share').on('mousedown.curie.share', function(e){
			if ($('#curie_share_layer').is(':visible')) {
				if ($(e.target).closest('#curie_share_layer').length == 0) {
					$('#curie_share_layer').hide();
				}
			}
		});
		// 닫기
		$('#curie_share_layer .btn_share_close_sh').on('click', function(){
			$('#curie_share_layer').hide();
		});
		// 공유하기 버튼
		$('#curie_share_layer .btn_share').on('click', function(){
			var share_type = $(this).data('type');
			_self.share_menu(share_type);
		});
	},
	
	"loadCurieRecommand" : function(){
		var _self = this;
		var req1 = _self.curieRecommand(1);	// 패턴별
		var req2 = _self.curieRecommand(2);	// 가격별
		var req3 = _self.curieRecommand(3);	// 크기별
		var dummy = $.Deferred();
		
		// 최소 1.5초 로딩
		setTimeout(function(){dummy.resolve();}, 1500);

		$.when(req1, req2, req3/*, dummy*/).then(function(){
			_self.load_def.resolve();
		});
	},
	
	"curieRecommand" : function(opt){
		
		var _self = this;
		var url = g360.root_path + "/ai_recommand.mon?opt="+opt;
		return $.ajax({
			url : url,
			dataType : "json",
			success : function(data){
				var opt_idx = opt - 1;
				
				// 10개까지 표시
				$.each(data, function(idx, val){
					if (idx >= 10) return false;
				
					var inx = this.find.lastIndexOf("_");
					var email = this.find.substring(0,inx);
				//	var email = this.find.split("_")[0];
					var fname = this.find;
					var img_id = fname.replace(".jpg","");
					var imgsrc = g360.domain + "/artimage/" + email + "/art/preview/" + fname ;
					imgsrc = imgsrc + "?open&ver=" + this.version;
					var $dest = _self.wrapper.find('.curie_thm').eq(idx).find('div:eq(' + opt_idx + ')');
					
					$dest.find('img').attr('src', imgsrc);
					$dest.find('p').text(g360.TextToHtml(this.title));
					$dest.find('span').text(g360.TextToHtml(this.name));
					$dest.on('click', function(){
						var detail_url = g360.root_path + "/main/recommend/curie_recommand_detail.jsp?id="+img_id;
						$('#curie_detail_wrapper').load(detail_url, function(){
							g360.history_record("curie_historyback");g360.history_record("curie_historyback");
							$('#curie_detail_layer').fadeIn();
						});
					});
				});
				

			}
		});
	},
	
	"initAiPainter" : function(){
		
		var _self = this;
		var $list = _self.wrapper.find('.layer_content');
				
		// 무한 스크롤 
		this.search_controller = new ScrollMagic.Controller();
		this.search_scene = new ScrollMagic.Scene({triggerElement:'#curie_ai_list_loader', triggerHook:'onEnter', offset:-300}).addTo(_self.search_controller);
		this.search_scene.on('enter', function(e) {
			var $loader = $('#curie_ai_list_loader');
			if (_self.ai_painter.complete) return;
			if (!$loader.hasClass('first') && !$loader.hasClass('active')) {
				//console.log('curie art loading scroll');
				$loader.addClass('active');
				_self.loadAiPainter();
			}
		}); 
		
		if(!g360.isMobile()){ 
			$list.mCustomScrollbar({				
				theme:"minimal-dark",
				mouseWheelPixels: 400,
				//autoHideScrollbar: false,
				mouseWheel:{ preventDefault: false },
	         	advanced:{
	         		updateOnContentResize: true
	         	}      
			});
		}		
		
		_self.loadAiPainter().always(function(){
			// AI페인터 사용 이벤트
			_self.wrapper.find('.btn_curie_aipainter').on('click', function(){
				if(_self.ai_painter.start == 0){
					g360.aiPainter_Start(true);
				}else{
					g360.aiPainter_Start();
				}
			});
			
			// 로딩된 리스트가 없으면 자동으로 AI페인터 사용 레이어 표시
			if (_self.ai_painter.start == 0) {
				g360.aiPainter_Start(true);
			}
		});
	},
	
	"loadAiPainter" : function(){
		var _self = this;
		var url = g360.root_path + "/AIPainterList.mon?start="+_self.ai_painter.start+"&perpage="+_self.ai_painter.perpage;
		var $list = $('#curie_ai_list');
		return $.ajax({
			url : url,
			dataType : "json",
			success : function(data){
				var $loader = $('#curie_ai_list_loader');
				var html = "";
				$.each(data, function(idx, val){
					if (idx == 0) return true;
					
					var email = this.email;
					var rfilename = this.request_upload_img;
					var tfilename = this.request_select_img;
					var sfilename = this.dockey;
					var xfi = sfilename.replace("@","_").replace(".","_");
					var keyid = this._id.$oid;
					
					var sourcepath = g360.domain + "/artimage/" + email + "/artRequest_AI/expand/" + rfilename + ".jpg";
					var sourcepath_small = g360.domain + "/artimage/" + email + "/artRequest_AI/expand/" + rfilename + "_small.jpg";
					var targetpath = g360.domain + "/artimage/ai_sample/" + tfilename + ".jpg";
					var targetpath_small = g360.domain + "/artimage/ai_sample/" + tfilename + "_small.jpg";
					var resultpath = g360.domain + "/artimage/" + email + "/artRequest_AI/result/" + sfilename + "_out.jpg";
					var resultpath_water_full = g360.domain + "/artimage/" + email + "/artRequest_AI/result/" + sfilename + "_out_water.png";
					
					var resultpath_water_small = g360.domain + "/artimage/" + email + "/artRequest_AI/result/" + sfilename + "_out_water_small.png";
					
					var $li = $('<li/>');
					var $s_img = $('<div class="thm_s"/>')
							.append('<span onclick="g360.preview_img_direct(\'' + sourcepath +'\', \'' + email + '\', \'f\')" style="background-image:url(\'' + sourcepath_small + '\')"></span>')
							.append('<span onclick="g360.preview_img_direct(\'' + targetpath +'\', \'' + email + '\', \'f\')" style="background-image:url(\'' + targetpath_small + '\')"></span>')

					var $l_img = $('<div class="thm_b"></div>').css('background-image', 'url("' + resultpath_water_small + '")');
					$l_img.append('<button class="btn btn_content_share_sh" data1=\''+keyid+'\' data2=\''+sfilename+'\'>'+g360.g_lang.Share1+'</button>');	// 공유하기
					$l_img.append('<button class="btn btn_content_delete">'+g360.g_lang.Delete+'</button>');	// 삭제하기
					
					// 이미지에 이벤트 걸어주기
					$l_img.on('click', function(){
						_self.show_key = sfilename;
						g360.preview_img_direct2(resultpath_water_full, email, sfilename);
					});
					$l_img.find('.btn_content_share_sh').on('click', function(){
						
						_self.share_id = keyid;
						_self.share_key = sfilename;
						$('#curie_share_layer').show().position({
							my: 'right top',
							at: 'right bottom+2',
							of: this
						});
						return false;
					});
					$l_img.find('.btn_content_delete').on('click', function(e){
						_self.delete_item(sfilename, e);
						return false;
					});
					
					
					$li.append($s_img);
					$li.append($l_img);
					
					$list.append($li);
				});
				
				if (data.length > 1) _self.ai_painter.start += (data.length-1);
				if ((data.length-1) < _self.ai_painter.perpage) {
					_self.ai_painter.complete = true;
				}
				
				$loader.removeClass('first');
				$loader.removeClass('active');
			},
			error : function(er){
				g360.error_alert();
			}
		});
	},
	
	"displayNewAiPainter":function(data){
		var _self = this;
		var url = g360.root_path + "/AIPainterList.mon?start=0&perpage=1";
		var $list = $('#curie_ai_list');
		$.ajax({
			url : url,
			dataType : "json",
			success : function(data){
				var $loader = $('#curie_ai_list_loader');
				var html = "";
				$.each(data, function(idx, val){
					if (idx == 0) return true;
					
					var email = this.email;
					var rfilename = this.request_upload_img;
					var tfilename = this.request_select_img;
					var sfilename = this.dockey;
					var xfi = sfilename.replace("@","_").replace(".","_");
					var keyid = this._id.$oid;
					
					var sourcepath = g360.domain + "/artimage/" + email + "/artRequest_AI/expand/" + rfilename + ".jpg";
					var sourcepath_small = g360.domain + "/artimage/" + email + "/artRequest_AI/expand/" + rfilename + "_small.jpg";
					var targetpath = g360.domain + "/artimage/ai_sample/" + tfilename + ".jpg";
					var targetpath_small = g360.domain + "/artimage/ai_sample/" + tfilename + "_small.jpg";
					var resultpath = g360.domain + "/artimage/" + email + "/artRequest_AI/result/" + sfilename + "_out.jpg";
					var resultpath_water_full = g360.domain + "/artimage/" + email + "/artRequest_AI/result/" + sfilename + "_out_water.png";
					
					var resultpath_water_small = g360.domain + "/artimage/" + email + "/artRequest_AI/result/" + sfilename + "_out_water_small.png";
					
					var $li = $('<li/>');
					var $s_img = $('<div class="thm_s"/>')
							.append('<span onclick="g360.preview_img_direct(\'' + sourcepath +'\', \'' + email + '\', \'f\')" style="background-image:url(\'' + sourcepath_small + '\')"></span>')
							.append('<span onclick="g360.preview_img_direct(\'' + targetpath +'\', \'' + email + '\', \'f\')" style="background-image:url(\'' + targetpath_small + '\')"></span>')

					var $l_img = $('<div class="thm_b"></div>').css('background-image', 'url("' + resultpath_water_small + '")');
					$l_img.append('<button class="btn btn_content_share_sh" data1=\''+keyid+'\' data2=\''+sfilename+'\'>공유</button>');	// 공유하기
					$l_img.append('<button class="btn btn_content_delete">삭제</button>');	// 삭제하기
					
					// 이미지에 이벤트 걸어주기
					$l_img.on('click', function(){
						_self.show_key = sfilename;
						g360.preview_img_direct2(resultpath_water_full, email, sfilename);
					});
					$l_img.find('.btn_content_share_sh').on('click', function(){
						
						_self.share_id = keyid;
						_self.share_key = sfilename;
						$('#curie_share_layer').show().position({
							my: 'right top',
							at: 'right bottom+2',
							of: this
						});
						return false;
					});
					$l_img.find('.btn_content_delete').on('click', function(e){
						_self.delete_item(sfilename, e);
						return false;
					});
					
					
					$li.append($s_img);
					$li.append($l_img);
					
					$list.find('#curie_share_layer').after($li);
				});
				
				_self.ai_painter.start++;
			},
			error : function(er){
				g360.error_alert();
			}
		});
	},
	
	"delete_item" : function(id, e){
	
		
		$.confirm({
			title : " ",
			content : g360.g_lang.Curie_Alert1,
			type : "default",  
			closeIcon : true,
			closeIconClass : "fa fa-close",
			columnClass : "small",  
			animation : "top", 
			animateFromElement : false,
			closeAnimation : "scale",
			animationBounce : 1,	
			backgroundDismiss: false,
			escapeKey : false,
			buttons : {		
				confirm : {
					text : g360.g_lang.OK,
					btnClass : "btn-default",
					action : function(){
						var _self = this;
						var url = g360.root_path + "/AIPainter_Delete.mon?id="+id;
						$.ajax({
							dataType : "json",
							url : url,
							success : function(data){
								var $li = $(e.target).closest('li').remove();
								if (!_self.ai_painter.complete) _self.ai_painter.start = _self.ai_painter.start - 1;				
							},
							error : function(e){
								g360.error_alert();
							}
						})
					}
				},
				moreButtons : {
					text : g360.g_lang.Cancel
				}
			}
		});	
		
		
	},
	
	//"share_menu" : function(opt, key, email, filename){
	"share_menu" : function(opt){
		
		//var _self = this;
		
		$('#curie_share_layer .btn_share_close_sh').click();
		
		var url = "https://www.gallery360.co.kr/sharesns.mon?key=" + gCurie.share_id;
		
		var url_default_ks = "https://story.kakao.com/share?url="; 
		var url_default_fb = "https://www.facebook.com/sharer/sharer.php?u="; 
		var url_default_tw_txt = "https://twitter.com/intent/tweet?text="; 
		var url_default_tw_url = "&url="; 
		var url_default_band = "http://band.us/plugin/share?body="; 
		var url_route_band = "&route="; 
		var url_default_naver = "http://share.naver.com/web/shareView.nhn?url="; 
		var title_default_naver = "&title="; 
		var url_this_page = url; 
		var title_this_page = "Gallery360 AI Painter"; 

		var callurl = "";
		if (opt == "facebook"){
			callurl = url_default_fb + url_this_page; 			
			
		}else if (opt == "twitter"){
			callurl = url_default_tw_txt + document.title + url_default_tw_url + url_this_page; 
		}else if (opt == "band"){
			callurl = url_default_band + encodeURI(url_this_page)+ '%0A' + encodeURI(title_this_page)+'%0A' + '&route=tistory.com'; 
		}else if (opt == "naver"){
			callurl = url_default_naver + encodeURI(url_this_page) + title_default_naver + encodeURI(title_this_page);			
		}else if (opt == "kakaotalk"){
			gCurie.shareKakao(gCurie.share_id, gCurie.share_key);
			return false;
		}else if (opt == "link"){
			gCurie.copyToClipboard(url);
			g360.gAlert("Info", g360.g_lang.HangingArt_19 , "blue", "top");
			return false;
		}else if (opt == "homepage_link"){
			var url = g360.root_path + "/update_open_homepage.mon?key=" + gCurie.share_id;
			$.ajax({
				type : "GET",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(res){
					if (res.result == "OK"){
						g360.gAlert("Info",g360.g_lang.Curie_Alert2, "blue", "top");
					}else{
						g360.gAlert("Info",g360.g_lang.Curie_Alert3, "blue", "top");
					}
					return false;
				},
				error : function(e){
					g360.error_alert();
				}
			})
			
		}

		if (opt != "homepage_link"){
			window.open(callurl, '', 'scrollbars=no, width=600, height=600'); return false;
		}

		//window.open(callurl, '', 'scrollbars=no, width=600, height=600'); return false;
			
	},
	
	"copyToClipboard" : function(val){
		 var t = document.createElement("textarea");
		  document.body.appendChild(t);
		  t.value = val;
		  t.select();
		  document.execCommand('copy');
		  document.body.removeChild(t);
	},
	

	"shareKakao" : function(key, dockey){

	//	var email = dockey.split("_")[0];
		var inx = dockey.lastIndexOf("_");
		var email = dockey.substring(0,inx);

		var uuu = "https://www.gallery360.co.kr/artimage/"+email+"/artRequest_AI/result/"+dockey+"_out_water_small.png"
		var uu = "https://www.gallery360.co.kr/sharesns.mon?key="+key;
		
		Kakao.Link.sendDefault({
		  objectType: 'feed',
		  content: {
			title: g360.g_lang.Curie_6,
			description: '',
			imageUrl: uuu,
			link: {
			  webUrl: uu,
			  mobileWebUrl: uu
			}
		  },
		  buttons: [
			{
			  title: 'Gallery360 AI Painter',
			  link: {
				mobileWebUrl: uu,
				webUrl: uu
			  }
			}  
		  ]
		});
	}
	
	
	
}