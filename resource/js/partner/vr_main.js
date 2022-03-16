
function gVrGalleryMain(){	
	gVrGallery = this;
	
	gVrGallery.scrollTop = "";
	gVrGallery.type = "all"; //현재 선택된 메뉴 값
	
	gVrGallery.totalcount = 0;
	gVrGallery.perpage = 9;
	gVrGallery.cPage = 1;
	
}

gVrGalleryMain.prototype = {		

	"init" : function(){
		var _self = this;	
		
		gVrGallery.load_VRRoom("all", 1);
		
		$(".sub_header_tab li").on("click", function(event){

//			//기존 선택된 항목을 모두 지운다.
			$(".sub_header_tab li").each(function(index){
				$(this).removeClass("on");
			});
			
			var id = event.currentTarget.id;
			$("#" + id).addClass("on");
			
			g360.history_record(id);
			
			if (id == "btn_menu_mypage"){
				gTopMain.navBtnAction('mypage');
			}else if (id == "btn_menu_profile"){
				gTopMain.navBtnAction('profile');
			}else if (id == "btn_menu_account"){
				gTopMain.navBtnAction('account');
			}else if (id == "btn_menu_artproject"){
				gTopMain.navBtnAction('project');
			}else if (id == "btn_menu_artprojectlist"){
				gTopMain.navBtnAction('artProjectlist');
			}else if (id == "btn_menu_vrgallery"){
				gTopMain.navBtnAction('partner_vrgallery');
			}
			return false;
			
		});
		
		
		
		$("#all_gallery").on("click", function(event){
			g360.history_record("all_gallery");
			$("#all_gallery").addClass("on");
			$("#ex_gallery").removeClass("on");
			
			gVrGallery.load_VRRoom("all", 1);
			gVrGallery.type = "all";
			
		});
		
		$("#ex_gallery").on("click", function(event){
			g360.history_record("ex_gallery");
			$("#all_gallery").removeClass("on");
			$("#ex_gallery").addClass("on");
			
			gVrGallery.load_VRRoom("show",1);
			gVrGallery.type = "show";
		});
		
		$("#make_vr_gallery").on("click", function(event){
			g360.LoadPage("body_content", g360.root_path + "/partner/vr_gallery/make_vr_gallery.jsp");
			return false;
		});
		
		$("#vr_show_close").on("click", function(event){
	
			$("#vr_popup").fadeOut();
			
			//배경음악이 있을 경우 중지 시킨다.
			gVrGallery.offsound();			
			//도슨트 음성이 있을 경우 중지 시킨다.
			g360.offsound();
			
			g360.body_scroll_show();
			
			//창을 닫을 때 기존에 표시된 VR갤러리 화면을 제거한다.
			$("#vr_show").empty();
			
			g360.scroll_position(gVrGallery.scrollTop);
		});
		
		this.g_lang();
	},
	
	"g_lang" : function(){
		
		$(".g_lang_Mypage1").html(g360.g_lang.Mypage1);
		$(".g_lang_Artist_Mypage1").html(g360.g_lang.Artist_Mypage1);
		$(".g_lang_Artist_Mypage2").html(g360.g_lang.Artist_Mypage2);
		$(".g_lang_Artist_Mypage3").html(g360.g_lang.Artist_Mypage3);
		$(".g_lang_Artist_Mypage4").html(g360.g_lang.Artist_Mypage4);
		$(".g_lang_Artist_Mypage5").html(g360.g_lang.Artist_Mypage5);

		$(".g_lang_All_Gallery1").html(g360.g_lang.All_Gallery1);
		$(".g_lang_Gallery_on_display1").html(g360.g_lang.Gallery_on_display1);
		$(".g_lang_Make_VR_Gallery").html(g360.g_lang.Make_VR_Gallery);
		
	},
	
	"load_VRRoom" : function(type, cPage){
		
		
		gVrGallery.cPage = cPage;
		
			
		var start = (parseInt(gVrGallery.perpage) * (parseInt(gVrGallery.cPage))) - (parseInt(gVrGallery.perpage) - 1);
		start = parseInt(start) -1 ;
		
		var perpage = gVrGallery.perpage;
		var url = contextpath + "/load_VRRoom.mon?start="+start+"&perpage="+perpage+"&ty="+type;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "Get",
			datatype : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
			
				var html = "";
				
				
				gVrGallery.totalcount = data[0].totalcount;
				
				
				for (var i =1 ; i < data.length; i++){
					var title = data[i].title;
					var vr_title = g360.textToHtml(data[i].title).replace(/'/g, '\\\'').replace(/\r|\n/g, '');
					var key = data[i].dockey;
					var templatecode = data[i].roomkey;
					
					var read = data[i].read;
					var like = data[i].like;
					
					var express = data[i].express;
					var show = data[i].show;
					
					var img_src = "/vrgallery/"+data[i].email+"/"+key+"/pano_f.jpg?t="+new Date().getTime();
					
					html += "<div class='col-md-4 col-sm-6'>";
					html += "	<div class='vr-item-wrap'>";
					html += "		<div class='pic' style='cursor:pointer' onclick=\"g360.popup_VR('"+vr_title+"','"+key+"','"+templatecode+"');\">";
					html += "			<img src='"+img_src+"' >";
					html += "		 </div>";
					html += "		 <div class='info'>";
					if (show == "T"){
						html += "			<h3>"+title+"<span>"+g360.g_lang.OnDisplay+"</span></h3>";
					}else{
						html += "			<h3>"+title+"</h3>";
					}
					
					html += "			<h4>"+g360.TextToHtml(express)+"</h4>";
					html += "    		 <div class='like-area'>";
					html += "				 <span><img src='/img/icon-vr-view-count-b.svg' class='icon_vr_view-count_b'>"+read+"</span>";
					html += "				 <span onclick=\"gVrGallery.add_like_count('"+key+"',this)\"><img src='/img/icon-vr-collect-count-b.svg' class='icon_vr_collect-count_b' style='cursor:pointer'  >"+like+"</span>";
					
					html += "				 <div class='btn-group'>";
					html += "					<button class='bg-transparent border-0 dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
					html += "					<img style='cursor:pointer' src='/img/account/btn-overflow-h-normal.svg' />";
					html += "					</button>";
					html += "						<div class='dropdown-menu'>";
					
					if (show == "T"){
						html += "						<a class='dropdown-item' onclick=\"gVrGallery.vChange('"+key+"','F')\"><img src='/img/account/icon-overflow-close-exhibition.svg' />"+g360.g_lang.End_exhibit+"</a>";
					}else{						
						html += "						<a class='dropdown-item' onclick=\"gVrGallery.vChange('"+key+"','T')\"><img src='/img/account/icon-overflow-exhibition-open.svg' />"+g360.g_lang.Open_exhibit+"</a>";
					}
										
					html += "							<a class='dropdown-item' onclick=\"gVrGallery.vEdit('"+key+"','"+templatecode+"')\"><img src='/img/account/icon-overflow-edit-sales-info.svg' /> "+g360.g_lang.Update+"</a>";
					
					html += "							<a class='dropdown-item' onclick=\"gVrGallery.vDelete('"+key+"')\"><img src='/img/account/icon-overflow-delete-art.svg' /> "+g360.g_lang.Delete+"</a>";
														
			//		html += "							<a class='dropdown-item' onclick=\"gVrGallery.vSend360Talk('"+key+"','"+templatecode+"','"+title+"','"+express+"')\"><img src='/img/account/icon-overflow-promo-exhibition.svg' />360Talk 공유</a>";
										
					html += "					</div>";
					html += "				</div>";
					
					html += "			 </div>";
					html += "		</div>";
					html += "	</div>";
					html += "</div>";					
								
				}
				
			
							
				$("#gallery_list_sub").html(html);
				
				
				gVrGallery.search_paging(gVrGallery.cPage);
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"vEdit" : function(key, code){
		g360.LoadPage("body_content", g360.root_path + "/partner/vr_gallery/make_vr_gallery.jsp?mode=modify&key="+key+"&code=" + code);
		return false;
		
	},
	"vChange" : function(key, show){
		//VR갤러리를 홈페이지에 개시 할 수 있게 오픈한다.

		if (show == "T"){
//			 var op = confirm("생성된 VR갤러리를 홈페이지에 오픈하시겠습니까?");
//			 if (op){
//			 }else{
//				 return false;
//			 }		
			 $.confirm({
					title : " ",
					content : g360.g_lang.VRGallery1,
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
								var url = contextpath + "/vrgallery_change_mode.mon?key="+key+"&show="+show;
								url += "&" + new Date().getTime();
								$.ajax({
									type : "Get",
									datatype : "json",
									contentType : "application/json; charset=utf-8",
									url : url,
									success : function(data){
										var res = data.result;
										if (res == "OK"){
											//정상적으로 변경되었습니다.
											gVrGallery.load_VRRoom("all", gVrGallery.cPage);
										}
									}, 
									error : function(err){
										
										g360.gAlert("Info", g360.g_lang.VRGallery2, "blue", "top");
									}
								});		
							}
						},
						moreButtons : {
							text : g360.g_lang.Cancel
						}
					}
				});	
		}else if(show == "F"){
//			var op = confirm("홈페이지에 등록된 VR갤러리를 등록 취소 하시겠습니까?");
//			 if (op){
//			 }else{
//				 return false;
//			 }		
			
			g360.gConfirm(g360.g_lang.VRGallery3, function(){
				var url = contextpath + "/vrgallery_change_mode.mon?key="+key+"&show="+show;
				url += "&" + new Date().getTime();
				$.ajax({
					type : "Get",
					datatype : "json",
					contentType : "application/json; charset=utf-8",
					url : url,
					success : function(data){
						var res = data.result;
						if (res == "OK"){
							//정상적으로 변경되었습니다.
							gVrGallery.load_VRRoom("all", gVrGallery.cPage);
						}
					}, 
					error : function(err){
						
						g360.gAlert("Info", g360.g_lang.VRGallery4 , "blue", "top");
					}
				});		
			});
			
		}
		
		

	},
	
	"vDelete" : function(key){
		g360.gConfirm( g360.g_lang.VRGallery8 , function(){
			var url = contextpath + "/vrgallery_room_delete.mon?key="+key;
			url += "&" + new Date().getTime();
			$.ajax({
				type : "GET",
				datatype : "json",
				cotenntType : "application/json; charset=utf-8",
				url : url,
				success : function(data){
					if (data.result == "OK"){
						gVrGallery.load_VRRoom("all",gVrGallery.cPage);
					}else{
						g360.gAlert("Info", g360.g_lang.VRGallery4 , "blue", "top");
					}
				},
				error : function(err){
					g360.gAlert("Info", g360.g_lang.VRGallery4 , "blue", "top");
				}
			});
		});
	},
	
	"vSend360Talk" : function(key, templatecode, title, express){
		
		var msg = title;
		
		//var img_src = "/vr/vr_data_"+templatecode+"/"+key+"/pano_f.jpg";
		key = key + "-spl-" + templatecode
		
		
		gTopMain.sendArt(msg, "-spl-all-spl-", "vr", key, express);
		
		return false;
		
		var url = contextpath + "/vrgallery_send_360talk.mon?key="+key;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "Get",
			datatype : "json",
			contentType : "application/json; charset=urf-8",
			url : url,
			success : function(data){
				
				if (data.result == "OK"){
					
					g360.gAlert("Info",  g360.g_lang.VRGallery5 , "blue", "top");
				}else{
				
					g360.gAlert("Info",  g360.g_lang.VRGallery6 , "blue", "top");
				}
			},
			error : function(err){
				
				g360.gAlert("Info",  g360.g_lang.VRGallery6 , "blue", "top");
			}
		})
	},
	
	"add_read_count" : function(key){
		var url = contextpath + "/vrgallery_read_count_add.mon?key="+key;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			datatype : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
			
				if (data.result == "OK"){
					return false;
				}else{
					
				}
			},
			error : function(err){
				
				g360.gAlert("Info", g360.g_lang.VRGallery7 , "blue", "top");
			}
		})
	},
	
	"add_like_count" : function(key, obj){
				
		var url = contextpath + "/vrgallery_like_count_add.mon?key="+key;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			datatype : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
			
				if (data.result == "OK"){
					return false;
				}else{
					
				}
			},
			error : function(err){
				g360.gAlert("Info", g360.g_lang.VRGallery7 , "blue", "top");
			}
		})
	},
	
	
	
	

	
	
	"offsound" : function(){
		if (typeof(__pano1) != "undefined"){
			__pano1.krpano1.call("stopsound(bgsnd)");
		}		
	},
	
	
	"cancel_all" : function(){		
		
		g360.LoadPage("body_content", g360.root_path + "/partner/art_upload/art_upload.jsp");
		return false;
		
		
	},
	
	
	
	
	
	
	
	
	
	
	
/////////////////////////// 리스트 페이징 시작 //////////////////////////////////////////////////////////////
	"search_paging" : function(page){
		var alldocuments = gVrGallery.totalcount;
		if (alldocuments % gVrGallery.perpage > 0 & alldocuments % gVrGallery.perpage < gVrGallery.perpage/2 ){
			allPage = Number(Math.round(alldocuments/gVrGallery.perpage)) + 1;
		}else{
			allPage = Number(Math.round(alldocuments/gVrGallery.perpage));
		}	

		gVrGallery.search_navigator(page);
	},
	
	"search_navigator" : function(page){
		var nav_cpage = page;

		var alldocuments = gVrGallery.totalcount;
		if (alldocuments == 0){
			alldocuments = 1;
			nav_cpage=1;
			allPage = 1;
	     	}

		if (alldocuments != 0) {
			if (allPage % 10 > 0 & allPage % 10 < 5 ) {
				var allFrame = Number(Math.round(allPage/10)) + 1;
			}else{
				var allFrame = Number(Math.round(allPage/10))	;
			}

			if (nav_cpage % 10 > 0 & nav_cpage % 10 < 5 ){
				var cFrame = Number(Math.round(nav_cpage/10)) + 1;
			}else{
				var cFrame = Number(Math.round(nav_cpage/10));
			}

			var nav = new Array();	
		
			if (cFrame == 1 ){
				nav[0] = '';
			}else{
				nav[0] = '<li class="p_prev"><a href="#" class="xico" onclick="javascript:gVrGallery.gotoPage(' + ((((cFrame-1)*10)-1)*gVrGallery.perpage+1) + ',' + ((cFrame-1)*10) + ');">'+g360.g_lang.Prev+'</a></li>';
			}
			var pIndex = 1;
			var startPage = ((cFrame-1) * 10) + 1;	
			
			for (var i = startPage; i < startPage + 10; i++){
				if (i == nav_cpage){
					if (i == '1'){
						nav[pIndex] = '<li class="on"><a href="#">' + i + '</a></li>';
					}else{
						if (i%10 == '1' ){
							nav[pIndex] = '<li class="on"><a href="#">' + i + '</a></li>';
						}else{
							nav[pIndex] = '<li class="on"><a href="#">' + i + '</a></li>';
						}						
					}
				}else{
					if (i == '1'){
						nav[pIndex] = "<li><a href=# onclick='gVrGallery.gotoPage("+ (((i-1) * gVrGallery.perpage) + 1 ) + ", "+ i + ", this)'>" + i + "</a></li>";
						
					}else{
						if (i%10 == '1' ){
							nav[pIndex] = "<li><a href=# onclick='gVrGallery.gotoPage("+ (((i-1) * gVrGallery.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";	
						}else{
							nav[pIndex] = "<li><a href=# onclick='gVrGallery.gotoPage("+ (((i-1) * gVrGallery.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";
						}
					}
				}				

				if (i == allPage) {
					//nav[pIndex + 1] = '<td width="30" height="15" align="right"></td>';
					break;
				}
				pIndex++;				
			}
			
			if (cFrame < allFrame){
				nav[nav.length] = '<li class="p_next"><a href="#" class="xico" onclick="javascript:gVrGallery.gotoPage(' + ((cFrame*gVrGallery.perpage*10) + 1) + ',' + ((cFrame*10)+1) + ');">'+g360.g_lang.Next+'</a></li>';
			}
					
	          var navHTML = "";

			if (cFrame == 1 ){
				navHTML = '';
	          }else{
				navHTML = '<li class="p_first"><a href="#" class="xico" onclick="javascript:gVrGallery.gotoPage(1,1);">'+g360.g_lang.First+'</a></li>';
	          }		    
			for( var i = 0 ; i < nav.length ; i++){	
	          	navHTML = navHTML + nav[i];
			}
					
			if (cFrame < allFrame){
				navHTML = navHTML + '<li class="p_last"><a href="#" class="xico" onclick="javascript:gVrGallery.gotoPage(' + ((allPage - 1)*gVrGallery.perpage + 1) +','+ allPage +')">'+g360.g_lang.Final+'</a></li>';
	        }else{
				navHTML = navHTML;
	        }
	     
			$("#NAVIGATE").html('<div class="paging"><ul>' + navHTML + '</ul></div>');
		}
	},
	
	"gotoPage" : function(Index, PageNum, obj){
		var nav_cpage = PageNum;
		oldpage = nav_cpage;
		
		gVrGallery.load_VRRoom(gVrGallery.type, PageNum);
	}
	//////////////////////////////////////// 리스트 페이징 종료    /////////////////////////////////////////////
	
	
	
	
	
}

