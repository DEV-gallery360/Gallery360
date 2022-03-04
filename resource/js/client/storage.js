
function gClientStorage(){	
	gCST = this;
	
	gCST.totalcount = 0;
	gCST.start = 0;
	gCST.perpage = 10;
	gCST.isloading_complete = true;
	gCST.overloading = false;
	
	gCST.curTab = "1";
}

gClientStorage.prototype = {		

	"init" : function(){
		
		$("#popup_file_download").text(g360.g_lang.Download);
		
		var _self = this;	
		
		
		//내가 구매한 작품 리스트를 보여준다.
		//gCST.load_purchase_artlist();
		
		$(".sub_header_tab li").on("click", function(event){

//			//기존 선택된 항목을 모두 지운다.
			$(".sub_header_tab li").each(function(index){
				$(this).removeClass("on");
			});
//			
			var id = event.currentTarget.id;
			$("#" + id).addClass("on");
			
			if (id == "btn_menu_cmypage"){
				gTopMain.navBtnAction('mngMypage_client');
			}else if (id == "btn_menu_caclist"){
				gTopMain.navBtnAction('account_client');
			}else if (id == "btn_menu_cpurchase"){
				gTopMain.navBtnAction('puchase_client');
			}else if (id == "btn_menu_cartproject"){
				gTopMain.navBtnAction('artProject_client');
			}else if (id == "btn_menu_cstorage"){
				gTopMain.navBtnAction('storage_client');
			}
			return false;
			
		});
		
		$(".sub_common_content.account_setting aside ul li").on("click", function(event){
			
			gCST.empty_class_on();
			$(this).addClass("on");
			
			var id = event.currentTarget.id;
			if (id == "client_account_basic"){
				g360.LoadPage("body_content", g360.root_path + "/client/aclist/aclist.jsp");
				return false;
			}else if (id == "client_account_bank"){
				g360.LoadPage("body_content", g360.root_path + "/client/aclist/bank.jsp");
				return false;
			}else if (id == "client_account_password"){
				gCST.goto_password_change();
			}else if (id == "client_account_alram"){
				g360.LoadPage("body_content", g360.root_path + "/client/aclist/alram.jsp");
				return false;
			}else if (id == "client_account_expire"){
				g360.LoadPage("body_content", g360.root_path + "/client/aclist/expire.jsp");
				return false;
			}
			
		});
		
		
		$(".group_header_tab li").on("click", function(event){
			
			var id = event.currentTarget.id;
			
			if (id == "project_storage"){
				g360.history_record("project_storage");
				$("#normal_storage").removeClass("on");
				$("#project_storage").addClass("on");
				
				gCST.curTab = "1";
			
				
			}else if (id == "normal_storage"){
				g360.history_record("normal_storage");
				$("#project_storage").removeClass("on");
				$("#normal_storage").addClass("on");
				
				gCST.curTab = "2";
			}
			gCST.start = 0;
			
			$('#gallery_columns').empty();
			
			gCST.load_art_list(0, "init");
			
		});
		
		
		
		var window_scrolled;

		$(window).scroll(function() {
			//console.log($("#xartproject_list_div").length);
			if ($("#xartproject_list_div").length > 0){
			    window_scrolled = ($(document).height()/100)*90;

			    if($(window).scrollTop() + $(window).height() >= window_scrolled) {
			    //	console.log(window_scrolled);
			    //	gPAProjectlist.isloading_complete = false;
			    	if (!gCST.overloading){
			    		gCST.load_add_art();
			    	}
			    	
			    }
			}

		});
		
		this.g_lang();
	},
	
	"g_lang" : function(){

		$(".g_lang_Mypage1").html(g360.g_lang.Mypage1);
		$(".g_lang_Mypage2").html(g360.g_lang.Mypage2);
		$(".g_lang_Mypage3").html(g360.g_lang.Mypage3);
		$(".g_lang_Mypage4").html(g360.g_lang.Mypage4);
		$(".g_lang_Mypage5").html(g360.g_lang.Mypage5);
		
		$(".g_lang_Purchased_Artwork1").html(g360.g_lang.Purchased_Artwork1);
		$(".g_lang_Purchased_Artwork2").html(g360.g_lang.Purchased_Artwork2);
		
	},

	"empty_class_on" : function(){
		$(".sub_common_content.account_setting aside ul li").each(function(evnet){
			$(this).removeClass("on");
		});
	},
	
	"goto_password_change" : function(){
		
		if (g360.UserInfo.site == ""){
			g360.LoadPage("body_content", g360.root_path + "/client/aclist/password.jsp");
			return false;
		}else{
			g360.gAlert("Error",g360.g_lang.Purchased_Artwork3, "red", "left");
			return false;
		}
	
	},
	
	"load_purchase_artlist" : function(){
		
	},

	
	"load_data" : function(id){
		gCST.start = 0;		
		$('#gallery_columns').masonry('remove', $('#gallery_columns').find('.grid-item'));
		gCST.load_art_list(gCST.start, "init");
		
		
	},
	
	"load_add_art" : function(){
		if (gCST.isloading_complete){
			var bun = parseInt(gCST.start) + parseInt(gCST.perpage);
			gCST.start = bun;
			gCST.load_art_list(bun, "add");
		}

	},
	
	
	"load_art_list" : function(bun, opt){
		
		if (gCST.isloading_complete){
			gCST.isloading_complete = false;
			var start = bun;

		//	var url = g360.root_path + "/load_save_image_info_option.mon?start="+start+"&perpage="+gCST.perpage+"&option=all";
			var url = g360.root_path + "/artProject_list.mon?start="+start+"&perpage="+gCST.perpage+"&opt=client_complete&tab="+gCST.curTab;
			url += "&" + new Date().getTime();
			$.ajax({
				type : "GET",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(data){
				//	$('#gallery_columns').masonry();
				//	g360.body_scroll_hide();
					
				
					
					if (data.length == 0){
						gCST.overloading = true;
					}
					
					gCST.totalcount = data[0].totalcount;
										
					if (opt == "init"){
						$('#gallery_columns').css('opacity', 0);
						$("#artproject_list_div").scrollTop(0);
						$('#gallery_columns').masonry();
					}
					
					if (data.length > 1){						
						for (var i = 1 ; i < data.length; i++){
							if (gCST.curTab == "1"){
								gCST.draw_art_list2(data[i], opt);
							}else{
								gCST.draw_art_list3(data[i], opt);
							}
							
						}
					}

					
					// 이미지 로딩이 완료되면 화면에 표시
					$('#gallery_columns').imagesLoaded(function(){	
						$('#gallery_columns').css('opacity', 1);
					//	$('#gallery_columns').masonry();
						
						$("#gallery_columns").masonry('reloadItems');
						$("#gallery_columns").masonry('layout');
						
						gCST.isloading_complete = true;
					//	g360.body_scroll_show();
					});
					
					
					
				},
				error : function(e){
					g360.error_alert();
				}
			})
		}
		
	},
	
	
	
	
	"draw_art_list2":function(data_info, opt){
		
		var $wrapper = $('#gallery_columns');
		
		var html = "";
		var img = data_info;
	
		
		
		var title = img.request_title ;
//		var size = img.art_width + "cm x" + img.art_height +"cm (" + img.art_hosu +"호)";
		
		var price = 0;
		if (data_info.request_subform == "1"){
			//작품 추천 프로젝트는 금액을 그대로 사용한다.
			price = g360.comma(g360.setWon(img.selected_price)) ;
		}else{
			price = g360.comma(g360.setWon(img.selected_price * 10000)) ;
		}
		
		var artist = img.art_nickname;		
		var dkey = "";
		
		html += "<div class='grid-item col-lg-3 col-md-4 col-sm-4 col-6 ' id='"+img.sortdate+"'>";
		html += "	<figure>";
		if (img.request_subform == "1"){
			var imgURL = g360.preview_img_path(img.art_ok, img.art_select_dockey);
			html += "		<a onclick=\"g360.preview_img('"+img.dockey+"','"+img.art_ok+"','art')\"><img src='"+imgURL+"'></a>";
		}else{
			var rp = img.report[img.report.length-1];
			
			//var imgURL = "http://www.gallery360.co.kr/artimage/" + img.art_ok + "/artproject/preview/" + rp.uploadfilename + ".jpg";
			var imgURL = g360.preview_artproject_img_path(img.art_ok, rp.uploadfilename);
			html += "		<a onclick=\"g360.preview_img('"+rp.uploadfilename+"','"+img.art_ok+"','artRequest')\"><img src='"+imgURL+"'></a>";
		}
		
		html += "			<figcaption>";		
		html += "				<h2 class='art_title'>"+title+"</h2>  <!-- 라벨 있을때 클래스 추가 -->";
		html += "				<em><img src='/img/btn-artwork-collect-normal.svg' class='btn_artwork_collect_normal'></em>";
		html += "					<p>"+artist+"</p>";
//		html += "					<p class='text-muted'>"+size+"</p>";
		html += "				</figcaption>";
		html += "		<div class='cost-area'>";
		html += "			<h2>₩"+price+"</h2>";
		html += "		</div>";
		html += "	</figure>";
		html += "</div>";		
		
		$div = $(html);	
		
	//	$fig.append($img).append($figcap).appendTo($div);
		
		$wrapper.append($div).masonry('appended', $div);
	},
	
	
	"draw_art_list3":function(data_info, opt){
	
		var $wrapper = $('#gallery_columns');

		var html = "";
		var img = data_info;
	
			var imgURL = g360.preview_img_path(img.email, img.dockey);
		
		
		var title = img.art_title ;
//		var size = img.art_width + "cm x" + img.art_height +"cm (" + img.art_hosu +"호)";
		var price = g360.comma(g360.setWon(img.art_price)) ;
		var artist = img.art_artist;		
		var dkey = "";
		
		html += "<div class='grid-item col-lg-3 col-md-4 col-sm-4 col-6 ' id='"+img.id+"'>";
		html += "	<figure>";
		html += "		<a onclick=\"g360.showArtDetail('"+img.dockey+"')\"><img src='"+imgURL+"'></a>";
		html += "			<figcaption>";		
		html += "				<h2 class='art_title'>"+title+"</h2>  <!-- 라벨 있을때 클래스 추가 -->";
		html += "				<em><img src='/img/btn-artwork-collect-normal.svg' class='btn_artwork_collect_normal'></em>";
		html += "					<p>"+artist+"</p>";
//		html += "					<p class='text-muted'>"+size+"</p>";
		html += "				</figcaption>";
		html += "		<div class='cost-area'>";
		html += "			<h2>₩"+price+"</h2>";
		html += "		</div>";
		html += "	</figure>";
		html += "</div>";		
		
		$div = $(html);	
		
	//	$fig.append($img).append($figcap).appendTo($div);
		
		$wrapper.append($div).masonry('appended', $div);
	}
}

