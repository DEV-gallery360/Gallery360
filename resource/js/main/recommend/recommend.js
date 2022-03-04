
function gRecommend(){	
	this.count = {
		curator: 5,
		theme: 4
	}
}

gRecommend.prototype = {		

	"init" : function(){
		
		var _self = this;
	//	this.curieRecommand();
		this.curatorRecommand();
		this.themeRecommand();
		this.categoryRecommand();
		this._eventBind();
		
	},
	_eventBind: function(){
		var _self = this;
		
		
		
		// 큐레이터 추천 리스트 더보기
		$("#recommend_more").on("click", function(event){
			g360.showCuratorRecList();
			//g360.LoadPage("body_content", g360.root_path + "/main/recommend/main_curator_recommand_list.jsp");
			return false;
		});
		
		// 큐레이터 추천
		$('#rec_slider').on('click', function(e){
			var $target = $(e.target);
			if ($target.closest('.item').length) $target = $target.closest('.item');
			var id = $target.data('bun');
			if (!id) return false;
			g360.showRecommandDetail(id, 'curator');
		});
		
		// 테마별 추천 상세보기
		$("#theme_rec").on("click", function(e){
			var $target = $(e.target);
			if ($target.closest('li').length) $target = $target.closest('li');
			var id = $target.data('bun');
			if (!id) return false;
			g360.showRecommandDetail(id, 'theme');
		});

		
		// 분류별 테마
		$('#rec_category_list .category-theme').on('click', function(){
			var id = $(this).parent().attr('id').split('_')[2];
			var q = $(this).parent().find('dd').text();
			var qry;
			if (id == 'all') {
				qry = 'all';
			} else {
				var tmp = q.split('#');
				var res = [];
				$.each(tmp, function(idx, val){
					val = val.replace(/^\s*|\s*$/g, '');
					if (val == '') return true;
					res.push(val);
				});
				 qry = res.join('-spl-');
			}
			g360.showCategoryDetail(encodeURIComponent(qry));
		});

	},
	// 큐리 추천
	curieRecommand: function(){
		if (g360.login_check()){
			try{
				gRec.curie_recommand(1);
				gRec.curie_recommand(2);
				gRec.curie_recommand(3);
				$("#recommand_name").text("Gallery360 인공지능 큐리(Curie)가 \""+g360.UserInfo.nickname+"\"님에게 추천 드리는 작품");
				$("#recommand_dis").show();
			}catch(e){}
		}
	},
	curie_recommand : function(opt){
		var drawkey = Object();
		var url = "/ai_recommand.mon?opt="+opt;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				var html2 = "";
			
				var $wraper = "";
				if (opt == "1"){
					$wraper = $("#similar_img1");
				}else if (opt == "2"){
					$wraper = $("#similar_img2");
				}else if (opt == "3"){
					$wraper = $("#similar_img3");
				}
	
				
				for (var i = 0 ; i < data.length ; i++){
					var ssp = data[i].find.split("_");
					var inx = data[i].find.lastIndexOf("_");
					var email = data[i].find.substring(0,inx);
					var fname = data[i].find;
					var title = data[i].title;
					var name = data[i].name;
					var height = data[i].height;
					var width = data[i].width;
					var hosu = data[i].hosu;
					var price = data[i].price;
					
					
				//	var cnt = $("#"+fname.replace("@","_"));					
				//	if (cnt.length == 0){
						var url = g360.domain + "/artimage/" + email + "/art/preview/" + fname ;						
						if (drawkey[fname] != "T"){							
							html2 += "<div class='grid-item col-lg-3 col-md-4 col-sm-4 col-6 '>";
							html2 += "	<figure>";
							html2 += "		<img src='"+url+"'   onclick=\"g360.showArtDetail('"+fname.replace(".jpg","")+"')\">";
							html2 += "		<figcaption>";
							html2 += "			<h2>"+title+"</h2>";
						//	html2 += "			<em><img src='/img/btn-artwork-collect-normal.svg' class='btn_artwork_collect_normal'></em>";
							html2 += "			<p>"+name+"</p>";
							if (hosu == null){
								html2 += "			<p class='text-muted'>"+height+"cm x "+width+"cm</p>";
							}else{
								html2 += "			<p class='text-muted'>"+height+"cm x "+width+"cm("+hosu+"호)</p>";
							}
							
							html2 += "		</figcaption>";							
							html2 += "	<div class='cost-area'>";
							html2 += "		<h2>"+g360.comma(g360.setWon(price))+"</h2>";
							html2 += "	</div>";							
							html2 += "	</figure>";	
								
							html2 += "</div>"
							

						}
				//	}
					
					drawkey[fname] = "T";
				}
				
				
				
				$wraper.html(html2);				
							
				$wraper.imagesLoaded(function(){					
					$wraper.masonry({
						  itemSelector: '.grid-item',
						  columnWidth: 0,
						  isAnimated: true
						});			
					});				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	//큐레이터 추천
	curatorRecommand: function(){
		var _self = this;
		var _url = g360.root_path + '/load_all_recommand.mon?start=0&perpage=' + this.count.curator + '&opt=1';
		$.ajax({
			url: _url,
			success: function(data){
				var $list = $('#rec_slider');
				$.each(data, function(idx, val){
					if (this.totalcount) return true;
					if (typeof(this.select_item) != "undefined"){
						if (this.select_item.length == 0) return true;
						var $el = $( 
							'<div class="item" data-bun="' + this.bun + '">' +
							'  <div class="art-box">' +
							'    <div class="art-box-title">' + this.title + '</div>' +
							'    <div class="art-box-inner"></div>' +
							'  </div>' +
							'</div>'
						);
						var art = this.select_item[0];
						$el.find('.art-box-inner').css('background-image', 'url("' + g360.preview_img_path(art.email, art.dockey) + '")');
						$list.append($el);
					}
					
				});
				
				_self.setCarousel();
			},
			error: function(){
				
			}
		});
		
	},
	setCarousel : function() {
		$('#rec_slider').owlCarousel({
			loop: true,
			nav: true,
			autoplay: false,
			autoplaySpeed: 1000,
			autoplayHoverPause: true,
			center: true,
			autoWidth: true,
			items: 2,
			responsiveRefreshRate: 100,
			responsive: {
				0:{
					items:2,
					center: true,
					margin: 0
				},
				700:{
					items:2,
					center: true,
					margin: 20
				}
			}
		});
	},
	// 테마별 추천
	themeRecommand: function(){
		var _self = this;
		var _url = g360.root_path + '/load_all_recommand.mon?start=0&perpage=' + this.count.theme + '&opt=2';
		$.ajax({
			url: _url,
			success: function(data){
				var $list = $('#theme_rec');
				$.each(data, function(idx, val){
					if (this.totalcount) return true;
					if (typeof(this.select_item) != "undefined"){
						if (this.select_item.length == 0) return true;
						var $el = $( 
							'<li data-bun="' + this.bun + '">' +
							'  <div class="theme-box-wrapper">' +
							'    <div class="theme-box-inner"></div>' +
							'    <p>' + this.title + '<span>' + this.tag + '</span></p>' +
							'  </div>' +
							'</li>'
						);
						var art = this.select_item[0];
						$el.find('.theme-box-inner').css('background-image', 'url("' + g360.preview_img_path(art.email, art.dockey) + '")');
						$list.append($el);
					}
					
				});
			},
			error: function(){
				
			}
		});
	},
	// 분류별 테마
	categoryRecommand: function(){
		var _self = this;
		var _url = g360.root_path + '/load_all_recommand_category.mon';
		$.ajax({
			url: _url,
			success: function(data){
				$.each(data, function(idx, val){
					if (this.totalcount) return false;
					$('#category_theme_' + this.bun).find('dt').text(this.title);
					$('#category_theme_' + this.bun).find('dd').html('<span>' + this.tag + '</span>');
				});
			},
			error: function(){
				
			}
		});		
	}
	
}

