
function gMainNews(){	
	this.page_info = {
		start:0,
		perpage:12,
		complete:false
	}
}

gMainNews.prototype = {		

	"init" : function(){
		var _self = this;
						
		$("#new_letter_request").on("click", function(event){
			
			if (g360.login_check()) {
				var url = g360.root_path + "/news_letter_ok.mon";
				url += "?" + new Date().getTime();
				$.ajax({
					type : "GET",
					dataType : "json",
					contentType : "application/json; charset=utf-8",
					url : url,
					success : function(data){
						if (data.result == "OK"){
							g360.gAlert("Info",g360.g_lang.News_3, "blue", "top");
						}
					},
					error : function(e){
						g360.error_alert();
					}
				});
			} else {
				g360.login_window_max();
				$("#p_login").click();
			}
		});
		
		this.load_monthly_news();
		this.load_prev_news();
		
		
		$(window).off('scroll.news_pinter_scroll').on('scroll.news_pinter_scroll', function() {
			try{
				var $wrapper = $('#news_thum_wrapper'),
				$art = $('#this_month_news'),
				sc = $(window).scrollTop(),
				_padding_top = 70,
				_title = 80;
				var width = window.innerWidth;
				
				if (width < 1200) return false;
				
				var eleTop = $wrapper.offset().top - _padding_top + _title;
				var eleBottom = ($wrapper.height() + eleTop - _title) - $art.height();
				if (eleTop > sc && $art.css('position') == 'fixed') {
					$art.removeClass('main-content-fixed');
				}
				if (eleTop <= sc && eleBottom >= sc && $art.css('position') != 'fixed') {
					$art.addClass('main-content-fixed');
					$art.removeClass('main-content-fixed-end');
				}
				if (eleBottom <= sc && $art.css('position') == 'fixed') {
					$art.removeClass('main-content-fixed');
					$art.addClass('main-content-fixed-end');
				}
				
			}catch(e){}
			
		});
		
		this.g_lang();
		
	},
	
	"g_lang" : function(){
		$(".g_lang_News_1").html(g360.g_lang.News_1);
		$(".g_lang_News_2").html(g360.g_lang.News_2);
	},
	
	"change_Month" : function(d){
		var monthNames = ["January", "February", "March", "April", "May", "June",
		                  "July", "August", "September", "October", "November", "December"
		                ];

		return monthNames[d.getMonth()];
	},
	
	
	
	
	"load_monthly_news" : function(){
		
		var d = new Date();
		var cc = this.change_Month(d);
		var top_text = cc + " " + d.getFullYear();
		
		
		var settingDate = new Date();
		settingDate.setMonth(d.getMonth()-1); //한달 전
		var dd = this.change_Month(settingDate);
		var bottom_text = dd + " " + settingDate.getFullYear();
		var $grid = $('#main_news');
		
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : g360.root_path + "/load_monthly_news.mon?" + new Date().getTime(),
			success : function(data){

				var toplist = data[0];
				
				// 신규 표시 방식 (메인 작품 추천과 동일한 UX구현)
				if (toplist.length > 0) {
					//toplist = g360.arrayShuffle(toplist);
					$('#news_thum_wrapper').show();
					$('#news_thum_wrapper h3').text(top_text);
					var top_item = toplist[0];
					var url = g360.news_preview_img_path(top_item.email, top_item.filename);
					
					var bun = top_item.bun;
					var title = g360.TextToHtml(top_item.title);
					
					// 좌측 메인
					$('#main_news_left_img').css('background-image', 'url("' + url + '")');					
					$('#main_news_left_title').html(g360.TextToHtml(top_item.title));
					$('#main_news_left_express').html(g360.TextToHtml(top_item.summary));
					$('#main_news_left_tag').html(g360.TextToHtml(top_item.tag));
					$('#main_news_left_more, #main_news_left_img').on('click', function(){
						g360.showNewsDetail(bun, title);
					});					
					$('#main_news_left_link').on('click', function(e){
						gMN.newsLinkUrl(e, bun);
					});
					
					// 우측 소식지
					for (var i = 1 ; i < toplist.length ; i++) {
						var top_item = toplist[i];
						var _title = g360.TextToHtml(top_item.title);
						var $div = $('<div class="grid-item col-xl-6 col-lg-4 col-md-4 col-sm-4 col-6 p-mo-10" style="cursor:pointer;"/>').data('bun', top_item.bun).data('title', _title);
						var imgurl = g360.news_preview_img_path(top_item.email, top_item.filename);
						var $fig = $('<figure class="exhibit_gallery"></figure>');
						
						
						var $img_wrap = $('<div></div>');
						var $img = $('<img class="detail-preview" draggable="false">').attr('src', imgurl);
						var $btn = $("<button type='button' onclick=\"gMN.newsLinkUrl(event, '" + top_item.bun + "');\" class='btn_link'>링크</button>");
						$img_wrap.append($img).append($btn);
						
						var $figcap = $('<figcaption>').append('<h2>' + _title + '</h2>');
						$figcap.append('<span class="exhibit_content">' + g360.TextToHtml(top_item.summary) + '</span>');
						$figcap.append('<span class="exhibit_tag">' + g360.TextToHtml(top_item.tag) + '</span>');
						
						$fig.append($img_wrap).append($figcap).appendTo($div);
						$grid.append($div);

						$div.on('click', function(){
							g360.showNewsDetail($(this).data('bun'), $(this).data('title'));
						});
					}
					
				}
				
				
				return;
				
				// 기존 표시 방식
				var html = "";
				html += "<h3>"+top_text+"</h3>";
				html += "<ul>";
				
				for (var i = 0 ; i < toplist.length; i++){
					var top_item = toplist[i];
					var url = g360.news_preview_img_path(top_item.email, top_item.filename);
					var tit = top_item.title.replace(/'/g, '\\\'').replace(/\"/gi,"＂");
					tit = tit.replace(/&#39;/g, "\\'");

					html += "	<li style='cursor:pointer' onclick=\"g360.showNewsDetail('"+top_item.bun+"', '" + tit +"'); return false;\">";
					html += "		<a>";
					html += "			<div>";
					html += "				<button type='button' onclick=\"gMN.newsLinkUrl(event, '" + top_item.bun + "');\" class='btn_link'>링크</button>";
					html += "				<span><img src='"+url+"' alt='' /></span>";
					html += "			</div>";
					html += "			<dl>";
					html += "				<dd class='exhibit_sub_title'>"+top_item.title+"</dd>";
					html += "				<dd class='exhibit_content'>"+top_item.summary+"</dd>";
					html += "				<dd class='exhibit_tag'><span>"+top_item.tag+"</span></dd>";
					html += "				<dd class='exhibit_content'></dd>";
					html += "				<dd class='exhibit_tag'><span></span></dd>";
					html += "			</dl>";
					html += "		</a>";
					html += "	</li>";
				}
									
				$("#news_top").html(html);
				
			},
			error : function(e){
				g360.error_alert();
			}
		}).then(function(){
			// 이미지 로딩이 완료되면 화면에 표시
			$grid.imagesLoaded(function(){
				$grid.masonry();
			});
		});
	},
	
	"load_prev_news":function(){
		if (this.page_info.complete) return;
		
		var _self = this;
		var url = g360.root_path + "/load_monthly_news_page.mon?start=" + this.page_info.start + '&perpage=' + this.page_info.perpage;
		$.ajax({
			url : url,
			dataType : "json",
			cache : false,	
			success : function(result){
				if (result.legnth < 1) {
					_self.page_info.complete = true;
					return;	
				}
				
				var data = result[0];	//결과값이 배열안에 감싸져 있음...
				var html = '';
				for (var i=0 ; i<data.length ; i++) {
					var item = data[i];
					var url = g360.news_preview_img_path(item.email, item.filename);
					var tit = item.title.replace(/'/g, '\\\'').replace(/\"/gi,"＂").replace(/&#39;/g, "\\'");					
					
					html += "		<li style='margin-right:10px; display:inline-block; cursor:pointer; float:none; vertical-align:top;' onclick=\"g360.showNewsDetail('"+item.bun+"', '" + tit +"'); return false;\">";
					html += "			<a>";
					html += "				<div>";
					html += "					<button type='button' onclick=\"gMN.newsLinkUrl(event, '" + item.bun + "');\" class='btn_link'>링크</button>";					
					html += "					<span><img src='"+url+"'/></span>";
					html += "				</div>";
					html += "				<dl>";
					html += "					<dd class='exhibit_title'>"+item.title+"</dd>";
					//html += "					<dd class='exhibit_content'>"+item.summary+"</dd>";
					//html += "					<dd class='exhibit_tag'><span>"+item.tag+"</span></dd>";
					html += "					<dd class='exhibit_content'></dd>";
					html += "					<dd class='exhibit_tag'><span></span></dd>";
					html += "				</dl>";
					html += "			</a>";
					html += "		</li>";
				}
				
				$('#prev_news_list').append(html);
				
				// 최초 불러온 경우 무한 스크롤 적용
				if (_self.page_info.start == 0) {
					_self.infiniteScroll();
				} else {					
					$('#prev_news_list_loader').removeClass('active');
				}
				
				// 페이징 처리
				if (data.length < _self.page_info.perpage) {
					_self.page_info.complete = true;	
				} else {
					_self.page_info.start += _self.page_info.perpage;
				}
			},
			error : function(e){
				//g360.error_alert();
			}
		});
	},
	
	"infiniteScroll":function(){
		var _self = this;
		// 작품검색 InfiniteScroll 적용
		var el_loader = $('<div id="prev_news_list_loader"></div>');
		$('#prev_news_list').parent().append(el_loader);
		
		this.search_controller = new ScrollMagic.Controller();
		this.search_scene = new ScrollMagic.Scene({triggerElement:'#prev_news_list_loader', triggerHook:'onEnter', offset:-100}).addTo(_self.search_controller);
		this.search_scene.on('enter', function(e) {
			if (_self.page_info.complete) return;
			var $grid = $('#prev_news_list');
			var $loader = $('#prev_news_list_loader');
			if (!$loader.hasClass('active')) {
				$loader.addClass('active');
				_self.load_prev_news();
			}
		});
	},
	
	"newsLinkUrl":function(e, id){
		e.stopPropagation();
		var link_path = g360.getLinkPath('link_news', id);
		g360.copyToClipboard(link_path);
		
	}
}


