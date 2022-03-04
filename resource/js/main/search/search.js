
function gMainSearch(){	
	gMSearch = this;
	
	gMSearch.query = "";
	
	gMSearch.perpage = 8;
	gMSearch.start = 0;
	gMSearch.cPage = 1;
	gMSearch.loadingcount = 0;

	gMSearch.type = "portal";
	gMSearch.addtype = "init";  // init이면 처음 호출하기   add 이면 더보기 클릭시 추가하기
}

gMainSearch.prototype = {		

	"init" : function(){
		var _self = this;

		gMSearch.query = $.trim($("#main_search_query").val().replace(/\s+/g, ' '));
		$("#main_search_query").val('');
		
		//통합검색을 호출한다.
		gMSearch.search_fnc("main_search");
		$("#sql_text").text(gMSearch.query);
		
		$("#go_to_news").on("click", function(event){
			g360.LoadPage("body_content", g360.root_path + "/main/recommend/main_news.jsp");
			return false;
		});
		
		
		$(".sub_header_tab li").on("click", function(event){
			var id = event.currentTarget.id;
			
//			$(".sub_header_tab li").each(function(obj){
//				$(this).removeClass("on");
//			});
//			
//			var targetURL = "";
//			$("#" + id).addClass("on");
			
			gMSearch.change_mode(id);
			
			gMSearch.search_fnc(id);
			
		});
		
		$("#search_query_delete").on("click", function(event){
			$("#search_query_sub_text").val("");
			$("#sq1").hide();
			$("#sq2").show();
			$("#search_query_delete").hide();
			$("#search_query_sub_text").focus();
		});
		
		$("#search_query_sub_text").bind("keypress", function(e){
			if (e.keyCode == 13){
				var cur_tab = $(".sub_header_tab li.on").get(0).id;
				gMSearch.query = $("#search_query_sub_text").val();
				
				$("#sql_text").text(gMSearch.query);
				$("#sq1").show();
				$("#search_query_delete").show();
				$("#sq2").hide();
				
			
				gMSearch.search_fnc(cur_tab);
			}
		});
		
		
	},
	
	"change_mode" : function(id){
		$(".sub_header_tab li").each(function(obj){
			$(this).removeClass("on");
		});
		
		var targetURL = "";
		$("#" + id).addClass("on");
	},
	
	"search_fnc" : function(id){
		gMSearch.cPage = 1;
		gMSearch.loadingcount = 0;
		gMSearch.addtype = "init";
		
		if (id == "main_search"){			
			gMSearch.totalSearch();
			gMSearch.type = "portal";
		}else if (id == "main_artist"){

			gMSearch.type = "user";			
			gMSearch.artist_search();
			
		}else if (id == "main_art"){
			
			gMSearch.type = "art";			
			gMSearch.art_search();			
			
		}else if (id == "main_vrgallery"){
			gMSearch.type = "vr";
			gMSearch.vrgallery_search();
			
		}else if (id == "main_show"){
			gMSearch.type = "new";
			gMSearch.show_search();
			
		}
	},
	
	
	
	
	"totalSearch" : function(){
		//검색어에 따른 결과 값을 가져오는 프로세스를 추가한다.
		
		g360.loadingbar_open("통합 검색 중입니다. 잠시만 기다려 주세요...");
		
		gMSearch.change_mode("main_search");
		g360.scroll_Top();
		
		
		//gMSearch.query
		var url = g360.root_path + "/portal_search_public.mon?q=" + encodeURIComponent(gMSearch.query);
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			cache : false,
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
		
				
			//	try{
					var html = "";
					
					var xp = data.aggregations.by_district.buckets;
					var art_list = null;
					var vr_list = null;
					var user_list = null;
					var news_list = null;
					
					for (var k = 0; k < xp.length; k++){
						var key = xp[k].key;
						if (key == "vr"){
							vr_list = xp[k].tops;
						}else if (key == "art"){
							art_list = xp[k].tops;
						}else if (key == "user"){
							user_list = xp[k].tops;
						}else if (key == "news"){
							news_list = xp[k].tops;
						}
					}
					
					
					
					
				//	var spl = data.split("-spl-");
					
				//	var user = JSON.parse(spl[0]);
					var user = user_list;
					
					
					if (user != null){
						var user_total = user.hits.hits.length;
						var rtotal = user.hits.total;
						//작사 검색 결과 표시하기
						html += "<div class='search_content' >";
						html += "	<div class='xauthor'>";
						html += "		<h3 class='search_title'>작가 ("+rtotal+")</h3>";
						html += "		<a class='more'  onclick=\"gMSearch.artist_search()\" style='cursor:pointer'>작가 더 보기</a>";
						html += "		<div class='author_list'>";
						html += "			<ul>";
					
						for (var i = 0 ; i < user_total; i++){
							
							var res = gMSearch.draw_user(user.hits.hits[i]._source);
							html += res;
						}
						
						
						html += "			</ul>";
						html += "		</div>";
						html += "	</div>";
						html += "</div>";
					}
					
					
					
					
					/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					//통합검색 작품 표시하기
			//		var art = JSON.parse(spl[1]);
					var art = art_list;
			
					if (art != null){
						//작품 검색 결과 표시하기
						var art_total = art.hits.hits.length;
						var atotal = art.hits.total;
						
						html += "<div class='search_content'>";
						html += "	<h3 class='search_title'>작품 ("+atotal+")</h3>";
						html += "	<a class='more' onclick=\"gMSearch.art_search()\"  style='cursor:pointer'>작품 더 보기</a>";
						html += "	<div class='art'>";
						html += "		<!-- 갤러리 소스 시작 -->";
						html += "		<div id='totalsearch_columns' class='columns grid row'>";
						
						for (var j = 0 ; j < art_total; j++){
							
							var res = gMSearch.draw_art(art.hits.hits[j]._source);
							html += res;
							
							
						}			
								
						html += "		</div>";
						html += "	</div>";
						html += "</div>";
					}
					
					
					
					
					
					///////////////////////////////////////////////////////////////////////////////////////////////////////////////
					// VR갤러리 통합검색 결과 표시하기.

					//var vr = JSON.parse(spl[2]);
					var vr = vr_list;

					
					if (vr != null){
						
						var vr_total = vr.hits.hits.length;
						var vtotal = vr.hits.total;
						
						html += "<div class='search_content'>";
						html += "	<div class='vrgallery'>";
						html += "		<h3 class='search_title'>VR갤러리 ("+vtotal+")</h3>";
						html += "		<a class='more' onclick=\"gMSearch.vrgallery_search()\"  style='cursor:pointer'>VR갤러리 더 보기</a>";
						html += "		<div class='row pt-3'>";
						
						
						for (var t = 0 ; t < vr_total; t++){
							
							var res = gMSearch.draw_vr(vr.hits.hits[t]._source);
							html += res;
				
							
						}
															
						html += "		</div>";
						html += "	</div>";
						html += "</div>";
					}
					
					
					

					//소식 정보 검색 결과 표시하기
					var news = news_list;
					
					if (news != null){
						var news_total = news.hits.hits.length;
						var ntotal = news.hits.total;
						
						html += "<div class='search_content'>";
						html += "	<div class='exhibit'>";
						html += "		<h3 class='search_title'>소식 ("+ntotal+")</h3>";
						html += "		<a class='more' onclick=\"gMSearch.show_search()\" style='cursor:pointer'>소식 더 보기</a>";
						html += "		<div class='exhibit_gallery'>";
						html += "			<ul>";
						
						for (var u = 0 ; u < news_total; u++){
							var res = gMSearch.draw_news(news.hits.hits[u]._source);
							html += res;
						}
						


						html += "			</ul>";
						html += "		</div>";
						html += "	</div>";
						html += "</div>";

						
						
						
					}
					
					$("#main_search_content").html(html);
					
					
					
					gMSearch.art_mansory();
					
					
					
					
					
					g360.loadingbar_close();
			//	}catch(e){
			//		g360.loadingbar_close();
			//	}
				
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
		
		
		
		
	},
	
	
	"art_mansory" : function(){
		$('#totalsearch_columns').imagesLoaded(function(){	
			$('#totalsearch_columns').css('opacity', 1);
			$('#totalsearch_columns').masonry();
			
			$('#totalsearch_columns').masonry("destroy");
			
			
			$('#totalsearch_columns').masonry();
		//	$("#totalsearch_columns").masonry('reloadItems');
			$("#totalsearch_columns").masonry('layout');
			
		});
	},
	
	
	"draw_news" : function(data){
		
		var newsinfo = data;
		var news_etc = JSON.parse(newsinfo.etc);
		
		var photoimg = g360.news_preview_img_path(newsinfo.email, news_etc.filename);
		
		//g360.showNewsDetail('3', 'Paul Kremer\'s Float 01'); return false;
		
		var tit = news_etc.title.replace(/'/g, '\\\'').replace(/\"/gi,"＂");
		
		var html = "";
		
		html += "				<li>";
		html += "					<a >";
		html += "						<div><span style='cursor:pointer' onclick=\"g360.showNewsDetail('"+newsinfo.bun+"', '"+tit+"'); return false;\"><img src='"+photoimg+"'/></span></div>";
		html += "							<dl>";
		html += "								<dt class='exhibit_title'>"+news_etc.title+"</dt>";
		html += "									<dd class='exhibit_content'>"+newsinfo.summary+"</dd>";
		html += "									<dd class='exhibit_tag'><span>"+news_etc.tag+"</span></dd>";
		html += "							</dl>";
		html += "					</a>";
		html += "				</li>";
		
		
		return html;
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	"totalSearch_backup" : function(){
		//검색어에 따른 결과 값을 가져오는 프로세스를 추가한다.
		
		g360.loadingbar_open("통합 검색 중입니다. 잠시만 기다려 주세요...");
		
		gMSearch.change_mode("main_search");
		g360.scroll_Top();
		
		
		//gMSearch.query
		var url = g360.root_path + "/portal_search_public.mon?q=" + encodeURIComponent(gMSearch.query);
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "text",
			contentType : "application/text; charset=utf-8",
			url : url,
			success : function(data){
				
				
				var html = "";
				
				
				var spl = data.split("-spl-");
				
				var user = JSON.parse(spl[0]);
				var user_total = user.hits.hits.length;
				var rtotal = user.hits.total;
				
				if (user_total > 0){
					//작사 검색 결과 표시하기
					html += "<div class='search_content' >";
					html += "	<div class='xauthor'>";
					html += "		<h3 class='search_title'>작가 ("+rtotal+")</h3>";
					html += "		<a class='more'  onclick=\"gMSearch.artist_search()\" style='cursor:pointer'>작가 더 보기</a>";
					html += "		<div class='author_list'>";
					html += "			<ul>";
				
					for (var i = 0 ; i < user_total; i++){
						
						var res = gMSearch.draw_user(user.hits.hits[i]._source);
						html += res;
					}
					
					
					html += "			</ul>";
					html += "		</div>";
					html += "	</div>";
					html += "</div>";
				}
				
				
				
				
				/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				//통합검색 작품 표시하기
				var art = JSON.parse(spl[1]);
				var art_total = art.hits.hits.length;
				var atotal = art.hits.total;		
				if (art_total > 0){
					//작품 검색 결과 표시하기
					
					html += "<div class='search_content'>";
					html += "	<div class='art'>";
					html += "		<h3 class='search_title'>작품 ("+atotal+")</h3>";
					html += "		<a class='more' onclick=\"gMSearch.art_search()\"  style='cursor:pointer'>작품 더 보기</a>";
					html += "		<!-- 갤러리 소스 시작 -->";
					html += "		<div id='columns' class='grid row' data-masonry=\'{ 'columnWidth': 0, 'itemSelector': '.grid-item' }\'>";
					
					for (var j = 0 ; j < art_total; j++){
						
						var res = gMSearch.draw_art(art.hits.hits[j]._source);
						html += res;
						
						
					}			
							
					html += "		</div>";
					html += "	</div>";
					html += "</div>";
				}
				
				
				
				
				
				///////////////////////////////////////////////////////////////////////////////////////////////////////////////
				// VR갤러리 통합검색 결과 표시하기.

				var vr = JSON.parse(spl[2]);
				var vr_total = vr.hits.hits.length;
				var vtotal = vr.hits.total;
				
				if (vr_total > 0){
					html += "<div class='search_content'>";
					html += "	<div class='vrgallery'>";
					html += "		<h3 class='search_title'>VR갤러리 ("+vtotal+")</h3>";
					html += "		<a class='more' onclick=\"gMSearch.vrgallery_search()\"  style='cursor:pointer'>VR갤러리 더 보기</a>";
					html += "		<div class='row pt-3'>";
					
					
					for (var t = 0 ; t < vr_total; t++){
						
						var res = gMSearch.draw_vr(vr.hits.hits[t]._source);
						html += res;
			
						
					}
														
					html += "		</div>";
					html += "	</div>";
					html += "</div>";
				}
				
				
				
				
				//전시 정보 검색 결과 표시하기
				
				html += "<div class='search_content'>";
				html += "	<div class='exhibit'>";
				html += "		<h3 class='search_title'>전시</h3>";
				html += "		<a class='more' style='cursor:pointer' onclick=\"gMSearch.show_search()\">전시 더 보기</a>";
				html += "		<div class='exhibit_gallery'>";
				html += "			<ul>";
				html += "				<li>";
				html += "					<a >";
				html += "						<div><span><img src='/img/news/visual-news-02.jpg'/></span></div>";
				html += "							<dl>";
				html += "								<dt class='exhibit_title'>잠재적 유토피아</dt>";
				html += "									<dd class='exhibit_content'>본인은 잠재된 기억을 바탕으로 무의식 속에 내재된 이상향에 대한 갈망을 현실화시킨 헤테로토피아를 표현하고 있다...</dd>";
				html += "									<dd class='exhibit_tag'><span>#Art</span><span>#culture</span><span>#Exhibition</span></dd>";
				html += "							</dl>";
				html += "					</a>";
				html += "				</li>";
				html += "				<li>";
				html += "					<a >";
				html += "						<div><span><img src='/img/news/visual-news-03.jpg' /></span></div>";
				html += "							<dl>";
				html += "								<dt class='exhibit_title'><span>Paul Kremer’ Float 01</span></dt>";
				html += "									<dd class='exhibit_content'>독창성에 대한 집착을 피한다는 것. 원본 작품보다 복사물의 가치가 얼마나 낮는가의 문제는 경매의 사례로 우리가 생각해 볼... </dd>";
				html += "									<dd class='exhibit_tag'><span>#Art</span><span>#culture</span><span>#Exhibition</span></dd>";
				html += "							</dl>";
				html += "					</a>";
				html += "				</li>";
				html += "				<li>";
				html += "					<a>";
				html += "						<div><span><img src='/img/news/visual-news-04.jpg'/></span></div>";
				html += "							<dl>";
				html += "								<dt class='exhibit_title'>스탠릭 큐브릭의 2001 스페이스 오딧세이</dt>";
				html += "									<dd class='exhibit_content'>모든 시대의 가장 획지적인 공상 과학 소설 영화 중 하나로 손 꼽히며 20세기 후반의 미래에 대한 문화적 대화를 도왔다..</dd>";
				html += "									<dd class='exhibit_tag'><span>#Art</span><span>#culture</span><span>#Exhibition</span></dd>";
				html += "							</dl>";
				html += "					</a>";
				html += "				</li>";
				html += "			</ul>";
				html += "		</div>";
				html += "	</div>";
				html += "</div>";

				
				$("#main_search_content").html(html);
				
				
				g360.loadingbar_close();
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
		
		
		
		
	},
	
	"artist_search" : function(){

		gMSearch.change_mode("main_artist");
		g360.scroll_Top();
		
		var start = (parseInt(gMSearch.perpage) * (parseInt(gMSearch.cPage))) - (parseInt(gMSearch.perpage) - 1);
		start = parseInt(start) -1 ;
		
		
		var url = g360.root_path + "/portal_search_option_public.mon?opt=user&q=" + encodeURIComponent(gMSearch.query) + "&start=" + start +"&perpage=" + gMSearch.perpage;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "text",
			contentType : "application/text; charset=utf-8",
			url : url,
			success : function(data){
				
				var user = JSON.parse(data);
				var user_total = user.hits.hits.length;
				var rtotal = user.hits.total;
				
				
				gMSearch.loadingcount = parseInt(gMSearch.loadingcount) + parseInt(user_total);
				
			//	if (user_total > 0){
					var html = "";
					//작사 검색 결과 표시하기     <h3 class="search_title">검색결과 약 400개</h3>

					html += "<div class='search_content' >";
					html += "	<div class='xauthor'>";
					html += "		<h3 class='search_title'>검색결과 "+rtotal+"개</h3>";
				//	html += "		<a class='more'  onclick=\"gMSearch.artist_search()\">작가 더 보기</a>";
					html += "		<div class='author_list'>";
					html += "			<ul id='user_ul'>";
			
					for (var i = 0 ; i < user_total; i++){
						var data = user.hits.hits[i]._source;
						var res = gMSearch.draw_user(data);
						html += res;
					}
					
				
					html += "			</ul>";
					html += "		</div>";
					
					if (gMSearch.loadingcount < rtotal){
						html += "		<div class='view_more' id='btn_more_search'><button class='btn btn_ghost btn_view_more' onclick=\"gMSearch.load_more('user')\">더 보기</button></div>";
					}				
					
					html += "	</div>";
					html += "</div>";
					
					$("#main_search_content").html(html);
					

		//		}
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
		
	},
	
	
	"load_more" : function(opt){
		gMSearch.addtype = "add";
		gMSearch.cPage = parseInt(gMSearch.cPage) + 1;
		
		var start = (parseInt(gMSearch.perpage) * (parseInt(gMSearch.cPage))) - (parseInt(gMSearch.perpage) - 1);
		start = parseInt(start) -1 ;
		
		var url = "";
	//	if (opt == "user"){
		//	gMSearch.artist_search();
			url = g360.root_path + "/portal_search_option_public.mon?opt="+opt+"&q=" + encodeURIComponent(gMSearch.query) + "&start=" + start +"&perpage=" + gMSearch.perpage;
		
	//	}
			url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "text",
			contentType : "application/text; charset=utf-8",
			url : url,
			success : function(data){
				
				var info = JSON.parse(data);
				var info_total = info.hits.hits.length;
				var total = info.hits.total;
				
				
				gMSearch.loadingcount = parseInt(gMSearch.loadingcount) + parseInt(info_total);
				
				if (info_total > 0){
					var html = "";
					for (var i = 0 ; i < info_total; i++){
						var data = info.hits.hits[i]._source;
						var res = "";
						if (opt == "user"){
							res = gMSearch.draw_user(data);
						}else if (opt == "art"){
							res = gMSearch.draw_art(data);
							var $div = $(res);
							$('#totalsearch_columns').append($div).masonry('appended', $div);
						}else if (opt == "vr"){
							res = gMSearch.draw_vr(data);
						}else if (opt == "news"){
							res = gMSearch.draw_news(data);
						}
						html += res;
					}						
					
					if (opt == "user"){
						$("#user_ul").append(html);	
					}else if (opt == "art"){
						//$("#totalsearch_columns").append(html);	
						//gMSearch.art_mansory();
						$('#totalsearch_columns').imagesLoaded(function(){
							$("#totalsearch_columns").masonry('layout');							
						});
					}else if (opt == "vr"){
						$("#div_vr").append(html);
					}else if (opt == "news"){
						$("#ul_news").append(html);
					}
																	
					if (gMSearch.loadingcount >= total){
						$("#btn_more_search").hide();
					}
				}
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
		
		
		
		
	},
	
	
	"draw_user" : function(data){
		

		
		var user_info = data;
		var user_etc = JSON.parse(user_info.etc);
		
		var gray_photo = g360.user_photo_gray_url(user_info.email);
		
		var skill = user_etc[0];
		var education = user_etc[1];
		var career = user_etc[2];
		var group = user_etc[3];
		var display = user_etc[4];
		
		var html = "";
		
		var no_img = g360.user_photo_url_none('art');
//		html += "				<li style='min-height:170px'>";
//		html += "					<div class='thumb'><img style='height:170px' src='"+gray_photo+"' onerror=\"g360.no_photo_draw2(this)\" /></div>";
		html += "				<li >";
		html += "					<div class='thumb'>";
		html += "						<div style='width:100%;padding-top:100%;background-size:cover;background-position:center;background-image:url(" + gray_photo + "), url(" + no_img + ")'>";
		html += "						</div>";
		html += "					</div>";
		html += "					<div class='author_info'>";
		html += "						<h4 style='margin-bottom:10px'>"+user_info.nickname+ (user_info.name_eng ? " | " + user_info.name_eng : '') + "</h4>";
		
		if (group != null){
			if (group.length > 0){
				html += "						<dl>";
				html += "							<dt>소속</dt>";
				html += "							<dd>"+ (typeof(group[0].title) == "undefined" ? "정보없음" : group[0].title) +"</dd>";
				html += "						</dl>";
			}

		}

		if (education != null){
			if (education.length > 0){
				html += "						<dl>";
				html += "							<dt>학력</dt>";
				html += "							<dd>"+education[0].schoolname + " " + education[0].level+"</dd>";
				html += "						</dl>";
			}

		}

		if (career != null){
			if (career.length > 0){
				html += "						<dl>";
				html += "							<dt>수상</dt>";
				html += "							<dd>"+career[0].term + " " + career[0].title+"</dd>";
				html += "						</dl>";
			}

		}

		if (display != null){
			if (display.length > 0){
				html += "						<dl>";
				html += "							<dt>전시</dt>";
				html += "							<dd>"+display[0].term + " " + display[0].title+"</dd>";
				html += "						</dl>";
			}

		}

		
		html += "					</div>";
		html += "					<a class='more'  onclick=\"g360.showArtistDetail('"+user_info.email+"')\"  style='cursor:pointer'>작가정보 더보기</a>";
		return html;
		
	},
	
	
		
	
	"artist_detail" : function(key){
		//작가 정보를 가져오는 소스가 추가되어야 한다.
		
		g360.scroll_Top();
		
		var html = "";
		html += "<div class='search_content'>";
		html += "	<div class='xauthor'>";
		html += "		<h3 class='search_title'>검색결과 1개</h3>";
		html += "		<div class='author_list one_person'>";
		html += "		<ul>";
		html += "			<li>";
		html += "				<div class='thumb'><img src='/img/search/img_author1.jpg'  /></div>";
		html += "					<div class='author_info'>";
		html += "						<h4>김환기 | Kim WhanKi<span>1913~1974</span></h4>";
		html += "						<dl>";
		html += "							<dt>소속</dt>";
		html += "							<dd>김환기 미술관</dd>";
		html += "						</dl>";
		html += "						<dl>";
		html += "							<dt>학력</dt>";
		html += "							<dd>니혼대학교 미술학 학사</dd>";
		html += "						</dl>";
		html += "						<dl>";
		html += "							<dt>수상</dt>";
		html += "							<dd>1970년 제1회 한국미술대상전 대상</dd>";
		html += "						</dl>";
		html += "						<dl>";
		html += "							<dt>경력</dt>";
		html += "							<dd>1963. 한국미술협회 이사장</dd>";
		html += "						</dl>";
		html += "					</div>";
	//	html += "					<a  class='more'>작가정보 더보기</a>";
		html += "				</li>";
		html += "			</ul>";
		html += "		</div>";
		html += "	</div>";
		html += "</div>";
	
		$("#main_search_content").html(html);
	},
	
	
	
	"art_search" : function(){
		var html = "";
		
		gMSearch.change_mode("main_art");
		g360.scroll_Top();
		
		
		var start = (parseInt(gMSearch.perpage) * (parseInt(gMSearch.cPage))) - (parseInt(gMSearch.perpage) - 1);
		start = parseInt(start) -1 ;
		
		
		var url = g360.root_path + "/portal_search_option_public.mon?opt=art&q=" + encodeURIComponent(gMSearch.query) + "&start=" + start +"&perpage=" + gMSearch.perpage;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "text",
			contentType : "application/text; charset=utf-8",
			url : url,
			success : function(data){
				
				var art = JSON.parse(data);
				var art_total = art.hits.hits.length;
				var atotal = art.hits.total;
				
				
				gMSearch.loadingcount = parseInt(gMSearch.loadingcount) + parseInt(art_total);
				
				
				html += "<div class='search_content noborder'> <!-- noborder 클래스 추가 -->";
				html += "	<div class='xart'>";
				html += "		<h3 class='search_title right_title'>"+atotal+"점의 작품</h3> <!-- right_title 클래스 추가 -->";
				
				html += "		<div id='totalsearch_columns' class='columns grid row'  style='padding-top:30px !important'>";
				
				for (var i = 0 ; i < art_total; i++){
					var res = gMSearch.draw_art(art.hits.hits[i]._source);
					html += res;
				}
							

				
				html += "	</div>";
				
				if (gMSearch.loadingcount < atotal){
					html += "		<div class='view_more' id='btn_more_search'><button id='btn_more_art' class='btn btn_ghost btn_view_more' onclick=\"gMSearch.load_more('art')\">더 보기</button></div>";
				}
				
				html += "</div>";
				
				
				
				$("#main_search_content").html(html);
				
				$('#totalsearch_columns').imagesLoaded(function(){
					$("#totalsearch_columns").masonry();							
				});
			}, 
			error : function(e){
				
			}
		});
		

	},
	
	
	"draw_art" : function(data){
		
		var artinfo = data;
		var art_etc = JSON.parse(artinfo.etc);
		
		var art_price = '';
		if (!art_etc.art_ck1 && art_etc.art_ck2) {
			// 이미지 구매만 있는 경우 이미지 가격으로 표시
			art_price = parseInt(art_etc.art_price) * g360.image_sales_rate;
			art_price = g360.numberComma(art_price);
		} else {
			art_price = g360.numberComma(art_etc.art_price);
		}

		var photoimg = g360.preview_img_path(artinfo.email, artinfo.id);
		var html = "";
		html += "		  <div class='grid-item col-lg-3 col-md-4 col-sm-4 col-6 '>";
		html += "			<figure>";
		html += "				<a style='cursor:pointer' onclick=\"g360.showArtDetail('"+artinfo.id+"')\"><img src='"+photoimg+"'></a>";
		html += "				<figcaption>";
		html += "			  		<h2>"+art_etc.art_title+"</h2>";
		html += "			  		<em><img src='/img/btn-artwork-collect-normal.svg' class='btn_artwork_collect_normal'></em>";
		html += "			  		<p>"+art_etc.art_artist+"</p>";
		html += "			  		<p class='text-muted'>"+art_etc.art_height+" x "+art_etc.art_width+"cm("+art_etc.art_hosu+"호)</p>";
		html += "				</figcaption>";
		html += "				<div class='cost-area'>";
		if (typeof(artinfo.opt) != "undefined" && artinfo.opt == "none"){
			html += "			  		<h2>가격문의</h2>";
		}else{
			html += "			  		<h2>₩ "+g360.comma(g360.setWon(art_price))+"</h2>";
		}
		
		html += "			 	<div class='icon-area'>";
		html += "					<span>";
		html += "				  		<img src='/img/icon-artwork-original.svg' class='icon_artwork_original'>";
		html += "					</span>";
		html += "					<span>";
		html += "				  		<img src='/img/icon-artwork-image.svg' class='icon_artwork_image'>";
		html += "					</span>";
		html += "					<span>";
		html += "				  		<img src='/img/icon-artwork-vr.svg' class='icon_artwork_vr'>";
		html += "					</span>";
		html += "			  	</div>";
		html += "				</div>";
		html += "		  	</figure>";
		html += "		  </div>";
		
		return html;
	},
	
	
	
	
	
	
	
	
	
	
	
	
	"vrgallery_search" : function(){
		var html = "";
		
		gMSearch.change_mode("main_vrgallery");
		g360.scroll_Top();
		
		
		var start = (parseInt(gMSearch.perpage) * (parseInt(gMSearch.cPage))) - (parseInt(gMSearch.perpage) - 1);
		start = parseInt(start) -1 ;
		
		
		var url = g360.root_path + "/portal_search_option_public.mon?opt=vr&q=" + encodeURIComponent(gMSearch.query) + "&start=" + start +"&perpage=" + gMSearch.perpage;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "text",
			contentType : "application/text; charset=utf-8",
			url : url,
			success : function(data){
				
				var vr = JSON.parse(data);
				var vr_total = vr.hits.hits.length;
				var vtotal = vr.hits.total;
				
				
				gMSearch.loadingcount = parseInt(gMSearch.loadingcount) + parseInt(vr_total);
				
				
				html += "<div class='search_content noborder'> <!-- noborder 클래스 추가 -->";
				html += "	<div class='vrgallery'>";

				html += "		<h3 class='search_title right_title' style='height:30px'>"+vtotal+" 개의 VR갤러리</h3> <!-- right_title 클래스 추가 -->";
				
				html += "		<div class='row pt-3' id='div_vr' style='padding-top:30px !important'>";
				
				for (var i = 0 ; i < vr_total; i++){
					var res = gMSearch.draw_vr(vr.hits.hits[i]._source);
					html += res;
				}
				
				
				
				
				html += "	</div>";
				
				html += "		</div>";
				if (gMSearch.loadingcount < vtotal){
					html += "		<div class='view_more' id='btn_more_search'><button class='btn btn_ghost btn_view_more' onclick=\"gMSearch.load_more('vr')\">더 보기</button></div>";
				}
				
				html += "</div>";
				
				
				$("#main_search_content").html(html);
				
			}, 
			error : function(e){
				g360.error_alert();
			}
		});
		
		
		
			
		
		
	},
	
	
	"draw_vr" : function(data){
		
		var vrinfo = data;
		var vr_etc = JSON.parse(vrinfo.etc);
		
		var templatecode = vrinfo.id.split("-=spl=-")[1];
		var key = vrinfo.id.split("-=spl=-")[0]
		
		var vrpath = g360.vr_img_path_new(key);
		var html = "";
		html += "			<div class='col-md-4 col-sm-6'>";
		html += "				<div class='vr-item-wrap'>";
		html += "					<div class='pic' style='cursor:pointer'>";
		html += "						<img src='"+vrpath+"' onclick=\"g360.showVRDetail('"+key+"')\">";
		html += "					 </div>";
		html += "					 <div class='info'>";
		html += "						<h3>"+vr_etc.title+"</h3>";
		html += "						<h4>"+vrinfo.nickname+"</h4>";
		html += "					 	<div class='like-area'>";
		html += "							 <span><img src='/img/icon-vr-view-count-b.svg' class='icon_vr_view-count_b'> "+g360.comma(vr_etc.read)+"</span>";
		html += "							 <span><img src='/img/icon-vr-collect-count-b.svg' class='icon_vr_collect-count_b'> "+g360.comma(vr_etc.like)+"</span>";
		html += "						 </div>";
		html += "					</div>";
		html += "				</div>";
		html += "			</div>";				
		
		
		return html;
	},
	
	
	
	
	"show_search" : function(){
		
		var html = "";
		
		gMSearch.change_mode("main_show");
		g360.scroll_Top();
		
		
		var start = (parseInt(gMSearch.perpage) * (parseInt(gMSearch.cPage))) - (parseInt(gMSearch.perpage) - 1);
		start = parseInt(start) -1 ;
		
		
		var url = g360.root_path + "/portal_search_option_public.mon?opt=news&q=" + encodeURIComponent(gMSearch.query) + "&start=" + start +"&perpage=" + gMSearch.perpage;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "text",
			contentType : "application/text; charset=utf-8",
			url : url,
			success : function(data){
				
				
				var news = JSON.parse(data);
				var news_total = news.hits.hits.length;
				var ntotal = news.hits.total;
				
				gMSearch.loadingcount = parseInt(gMSearch.loadingcount) + parseInt(news_total);
						
				html += "<div class='search_content noborder'>";
				html += "	<div class='exhibit'>";
				html += "   	<h3 class='search_title exhibit_title'>"+ntotal+"개의 소식</h3><!-- exhibit_title 클래스 추가 -->";
				html += "		<div class='exhibit_gallery'>";
				html += "			<ul id='ul_news'>";
				
				for (var u = 0 ; u < news_total; u++){
					var res = gMSearch.draw_news(news.hits.hits[u]._source);
					html += res;
				}
				
				
				html += "			</ul>";
				html += "		</div>";
				
				if (gMSearch.loadingcount < ntotal){
					html += "		<div class='view_more' id='btn_more_search'><button class='btn btn_ghost btn_view_more' onclick=\"gMSearch.load_more('news')\">더 보기</button></div>"	
				}
				
				html += "	</div>";
				html += "</div>";
				
				
				
				
				$("#main_search_content").html(html);
				
				
			}, 
			error : function(e){
				
			}
		});
		

	}
}

