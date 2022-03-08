
function gClientMyPage(){	
	gCMP = this;
	
	gCMP.data = "";
}

gClientMyPage.prototype = {		

	"init" : function(){
		var _self = this;	

		gCMP.delivery_list_count();
		gCMP.load_delivery_info();
		gCMP.load_user_info();

		
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
		
		$("#client_edit").on("click", function(event){
			gTopMain.navBtnAction('account_client');
			return false;
		});
		
		$("#client_purchase").on("click", function(event){

			gTopMain.navBtnAction('puchase_client');
			return false;
		});
		
		$("#client_mycollection").on("click", function(event){
			gTopMain.navBtnAction('favorite');
			return false;
		});
		
		$("#client_artproject").on("click", function(event){
			gTopMain.navBtnAction('artProject_client');
			return false;
		});
		
		$("#client_sale").on("click", function(event){
			gTopMain.navBtnAction('storage_client');
			return false;
		});
		
		$("#mypage_tab_favorite li").on("click", function(event){
			$("#mypage_tab_favorite li").each(function(index){
				$(this).removeClass("on");
			});
			
			$(this).addClass("on");
		
			if ($(this)[0].id == "mypage_t1"){
				gCMP.draw_favorite_list_art(gCMP.data);
			}else{
				gCMP.draw_favorite_list_vr(gCMP.data);
			}
		});
		
		
		$("#mypage_artproject_tab li").on("click", function(event){
			$("#mypage_artproject_tab li").each(function(index){
				$(this).removeClass("on");
			});
			
			$(this).addClass("on");
		
			if ($(this)[0].id == "mypage_t3"){
				gCMP.draw_myproject("client_support");
			}else if ($(this)[0].id == "mypage_t4"){
				gCMP.draw_myproject("client_ing");
			}else{
				gCMP.draw_myproject("client_end");
			}
		});
		
		_self.g_lang();
	},
	
	"g_lang" : function(){
		
		$(".g_lang_Mypage1").html(g360.g_lang.Mypage1);
		$(".g_lang_Mypage2").html(g360.g_lang.Mypage2);
		$(".g_lang_Mypage3").html(g360.g_lang.Mypage3);
		$(".g_lang_Mypage4").html(g360.g_lang.Mypage4);
		$(".g_lang_Mypage5").html(g360.g_lang.Mypage5);
		
		$(".g_lang_Mypage6").html(g360.g_lang.Mypage6);
		$(".g_lang_Mypage7").html(g360.g_lang.Mypage7);
		$(".g_lang_Mypage8").html(g360.g_lang.Mypage8);
		$(".g_lang_Mypage9").html(g360.g_lang.Mypage9);
		$(".g_lang_Mypage10").html(g360.g_lang.Mypage10);
		$(".g_lang_Mypage11").html(g360.g_lang.Mypage11);
		$(".g_lang_Mypage12").html(g360.g_lang.Mypage12);
		$(".g_lang_Mypage13").html(g360.g_lang.Mypage13);
		
		$(".g_lang_Mypage14").html(g360.g_lang.Mypage14);
		$(".g_lang_Mypage15").html(g360.g_lang.Mypage15);
		$(".g_lang_Mypage16").html(g360.g_lang.Mypage16);
		$(".g_lang_Mypage17").html(g360.g_lang.Mypage17);
		$(".g_lang_Mypage18").html(g360.g_lang.Mypage18);
		$(".g_lang_Mypage19").html(g360.g_lang.Mypage19);

		$(".g_lang_Payment").html(g360.g_lang.Payment);
		$(".g_lang_Ready_to_ship").html(g360.g_lang.Ready_to_ship);
		$(".g_lang_Shipping").html(g360.g_lang.Shipping);
		$(".g_lang_Delivery_completed").html(g360.g_lang.Delivery_completed);
		$(".g_lang_Getting_ready").html(g360.g_lang.Getting_ready);
		
		$(".g_lang_See_more").html(g360.g_lang.See_more);
		$(".g_lang_Shipping_Fee").html(g360.g_lang.Shipping_Fee);
		$(".g_lang_MyCollection").html(g360.g_lang.MyCollection);
		
		$("#client_edit>img").attr("src", g360.g_lang.Edit_Button);
		//$(".g_lang_").html(g360.g_lang.);

	},
	
	"load_delivery_info" : function(){
		
		
		var url = g360.root_path + "/delivery_list.mon?start=0&perpage=3";
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
			
				var html = "";
				var s1_count = 0;
				var s2_count = 0;
				var s3_count = 0;
				
							
				for (var i = 1 ; i < data.length ; i++){
					var spl = data[i];
					html += "<tr>";
					
					if (spl.approval_type == "radio5"){
						html += "	<td class='t_date m_view'>";
						html += "		<div>"+g360.iso_date_convert(spl.date)+"</div>";
						var tx = g360.ethscan(spl.id);
						html += "		<a style='cursor:pointer;' title='Contact Address'  onclick=\"window.open('"+tx+"')\">"+spl.id.replace("merchant_","").substring(0,10)+"...</a>";
						//html += "		<a href='#'>"+spl.code+"</a>";
						html += "	</td>";
					}else{
						html += "	<td class='t_date m_view'>";
						html += "		<div>"+g360.iso_date_convert(spl.date)+"</div>";
						html += "		<a style='cursor:pointer;' title='배송 진행 상태 상세보기'  onclick=\"g360.openinvoice_new('"+spl.delivery_code+"','"+spl.code+"')\">"+spl.id.replace("merchant_","")+"</a>";
						//html += "		<a href='#'>"+spl.code+"</a>";
						html += "	</td>";
					}
			
					html += "	<td class='t_art'>";
					html += "		<a href='#'>";
					var url = g360.thumbnail_img_path(spl.email, spl.dockey);
					html += "			<div class='thm_cart'><img src='"+url+"' /></div>";
					html += "			<ul class='cart_info'>";
					html += "				<li class='i_subject'>"+spl.art_title+"</li>";
					html += "				<li class='i_name'>"+spl.art_artist+"</li>";
					if (spl.art_hosu == null){
						html += "				<li class='i_size'>"+spl.art_height+" x "+spl.art_width+"cm</li>";
					}else{
						html += "				<li class='i_size'>"+spl.art_height+" x "+spl.art_width+"cm("+spl.art_hosu+"호)</li>";
					}
					
					html += "				<li class='i_price'>"+g360.comma(g360.setWon(spl.art_price))+"</li>";
					html += "			</ul>";
					html += "		</a>";	
					html += "	</td>";
					html += "	<td class='t_price'>"+g360.comma(g360.setWon(spl.art_price))+"</td>";
					
					if (spl.sales_type == "image"){
						html += "	<td class='t_delivery_charge'>이미지구매</td>";
					}else{
						html += "	<td class='t_delivery_charge'>"+g360.comma(g360.setWon(spl.shipping_fee))+"</td>";
					}
					
					
					if (spl.status == "3"){
						s3_count++;
						html += "	<td class='t_status preparing'><span>"+g360.g_lang.Delivery_completed+"</span></td>";
					}else if (spl.status == "2"){
						s2_count++;
						html += "	<td class='t_status preparing'><span>"+g360.g_lang.Shipping+"</span></td>";
					}else{
						s1_count++;
						html += "	<td class='t_status preparing'><span>"+g360.g_lang.Getting_ready+"</span></td>";
					}
					
					html += "</tr>";
				}
				
				if (html == '') {
					html = '<tr><td colspan="5" style="text-align:center;border-bottom:none;">'+g360.g_lang.Mypage_Alert1+'</td></tr>'
				}
			
				$("#mypage_delivery_dis").html(html);
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
		
		
		
	},
	
	
	"delivery_list_count" : function(){
		var url = g360.root_path + "/delivery_list_count.mon";
		url += "?" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
			
				$("#delivery_totalcount").text(data.totalcount);
				$("#delivery1_totalcount").text(data.delivery_status1);
				$("#delivery2_totalcount").text(data.delivery_status2);
				$("#delivery3_totalcount").text(data.delivery_status3);
				
							
			},
			error : function(e){
				g360.error_alert();
			}
		})
		
	},
	
	
	"load_user_info" : function(){
		var url = g360.root_path + "/search_userinfo_client.mon";
		url += "?" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
								
				if (typeof(data.photoimage) != "undefined"){
					var url = g360.user_photo_url(data.email);
					$("#client_profile_user_image").attr("src", url);
					$("#client_profile_user_image").attr("onerror", "g360.user_photo_url_none_draw(this)");
				}else{
					var url = g360.user_photo_url_none();
					$("#client_profile_user_image").attr("src", url);
				
				}

				
				$("#client_email").text(data.email);
				$("#client_name").text(data.nickname + " / " + g360.g_lang.General_User);
				
								
				//4.3 / 평가32개			
				$("#project_client_ing_totalcount").text(data.project_client_ing_totalcount + g360.g_lang.Artist_Mypage7);
				$("#project_client_support_totalcount").text(data.project_client_support_totalcount + g360.g_lang.Artist_Mypage7);
				$("#project_client_end_totalcount").text(data.project_client_end_totalcount + g360.g_lang.Artist_Mypage7);
				$("#project_client_ing_totalcount2").text(data.project_client_ing_totalcount);
				$("#project_client_support_totalcount2").text(data.project_client_support_totalcount);
				$("#project_client_end_totalcount2").text(data.project_client_end_totalcount);
				
				$("#mypage_art_favorite_count").text(data.art_favorite_count);
				$("#mypage_vr_favorite_count").text(data.vr_favorite_count);
				
				
				gCMP.data = data;
				
				//관심 프로젝트 표시하기
				gCMP.draw_favorite_list_art(data);
			
				//내 아트프로젝트 표시하기
				gCMP.draw_myproject("client_support");
				
				//구매작품 표시하기
				gCMP.complete_project_list("client_complete");
				
						
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"draw_favorite_list_art" : function(data){
		var art_favorite_list = data.art_favorite_list;
		var html = "";
		
		html += "<ul class='img_list'>";
		for (var i = 0 ; i < art_favorite_list.length; i++){
			var dx = art_favorite_list[i];
		
			html += "<li onclick=\"g360.showArtDetail('"+dx.dockey+"');\">";
			html += "	<a>";
			var img_url = g360.preview_img_path(dx.email, dx.dockey);
			html += "		<div><span><img src='"+img_url+"'  /></span></div>";
			html += "		<dl>";
			html += "			<dd>"+dx.art_artist+"</dd>";			
			html += "			<dd>"+dx.art_title+"</dd>";
			if (dx.art_hosu == null){
				html += "			<dd>"+dx.art_height+"x"+dx.art_width+"cm </dd>";
			}else{
				html += "			<dd>"+dx.art_height+"x"+dx.art_width+"cm ("+dx.art_hosu+"호)</dd>";
			}
			
			html += "		</dl>";
			html += "	</a>";
			html += "</li>";		
			
		}
		if (art_favorite_list.length == 0) {
			html += '<li class="no_list_li">'+g360.g_lang.Mypage_Alert3+'</li>';
		}
		html += "</ul>";
		$("#mypage_my_favorite_list").html(html);
	},
	
	
	"draw_favorite_list_vr" : function(data){
		
		
		var vr_favorite_list = data.vr_favorite_list;
		var html = "";
		html += "<ul class='img_list' style='display:flex;'>";

		for (var r = 0 ; r < vr_favorite_list.length; r++){
			var vl = vr_favorite_list[r];
							
		//	var img_src = "/vr/vr_data_"+vl.roomkey+"/"+vl.dockey+"/pano_f.jpg";	
			
			var img_src = g360.vr_img_path_new(vl.dockey);
			html += "<div class='col-md-4 col-sm-6'>";
			html += "	<div class='vr-item-wrap'  >";
			html += "		<div class='pic' style='cursor:pointer' onclick=\"g360.popup_VR('"+vl.title+"','"+vl.dockey+"','"+vl.templatecode+"');\">";
			html += "			<img src='"+img_src+"' alt='' >";
			html += "		 </div>";
			html += "		 <div class='infoxx'>";
//			if (vl.show == "T"){
//				html += "			<h3>"+vl.title+" <span>전시 중</span></h3>";
//			}else{
//				html += "			<h3>"+vl.title+" </h3>";
//			}
			html += "			<h4 style='font-size:15px;margin-top:10px;margin-bottom:5px'>"+vl.title+" </h4>";
		//	html += "			<h4>"+vl.express+"</h4>";
			html += "			 <div class='like-area'>";
			html += "				 <span style='font-size:12px'><img src='/img/icon-vr-view-count-b.svg' class='icon_vr_view-count_b' > "+vl.read+"</span>";
			html += "				 <span style='font-size:12px'><img src='/img/icon-vr-collect-count-b.svg' class='icon_vr_collect-count_b'  >"+vl.like+"</span>";
			html += "			 </div>";
			html += "		</div>";
			html += "	</div>";
			html += "</div>";					
		}
		
		if (vr_favorite_list.length == 0) {
			//html += '<li style="width: 100%;height: 30px;line-height: 30px;font-size: 14px;text-align: center;"><span>즐겨찾기된 VR갤러리가 없습니다</span></li>';
			html += '<li class="no_list_li"><span>즐겨찾기된 VR갤러리가 없습니다</span></li>';
		}
		
		html += "</ul>";
		$("#mypage_my_favorite_list").html(html);
	},
	
	"draw_myproject" : function(key){
		

		var url = g360.root_path + "/artProject_list.mon?start=0&perpage=3&opt=" + key;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				var fax = data;
				var html = "";
				for (var k = 1; k < fax.length; k++){
					
					var fa = fax[k];
					var sug = fa.suggest;
					
					var ty = (fa.request_type == "1") ? g360.g_lang.Square : 
						(fa.request_type == "2") ? g360.g_lang.Horizontal : 
						(fa.request_type == "3") ? g360.g_lang.Vertical : 
						(fa.request_type == "4") ? g360.g_lang.Circle : 
						(fa.request_type == "5") ? g360.g_lang.Set : 
						(fa.request_type == "6") ? g360.g_lang.Install_Art : 
						(fa.request_type == "7") ? g360.g_lang.Media : "";
					
					
					html += "<div class='wrap_group_header'>";
					html += "	<h4>";
					if (fa.request_subform == "1"){
						html += "		<em class='green_label'>"+g360.g_lang.Request_recommendation+"</em>"+fa.request_title+"";
					}else{
						html += "		<em class='blue_label'>"+g360.g_lang.Request_for_artwork+"</em>"+fa.request_title+"";
					}
					
					html += "		<div class='wrap_group_date'><span>"+g360.g_lang.Registration_date+"</span>"+g360.iso_date_convert(fa.date)+"</div>";
					html += "	</h4>";
					html += "	<div class='wrap_group_invite'><img src='/img/account/icon-invite-a-friend.svg' alt='' />총 "+ (typeof(fa.suggest) == "undefined" ? 0 : sug.length)+"명 지원";
				//	html += "		<button class='btn btn_like on'>좋아요</button>";
					html += "	</div>";
					html += "	<div class='evaluation_info'>";
					html += "		<ul>";
				//	html += "			<li class='ei_file'>첨부파일</li>";
					
					if (typeof(fa.request_file_name) != "undefined"){
						//html += "						<li class='ei_file' style='cursor:pointer; color:#ffc107; background-color:#867954' onclick=\"g360.preview_img('"+sp.request_file_name+"','"+sp.request_email+"','artRequest')\">첨부파일</li>";
						var url = "/artimage/" + fa.request_email + "/artRequest/mobile/" + fa.request_file_name + ".jpg";				
						html += "                      <div style='float:left; cursor:pointer' onclick=\"g360.preview_img('"+fa.request_file_name+"','"+fa.request_email+"','artRequest')\">";
						html += "						<img style='width:80px; height:80px; margin-right:10px' src='"+url+"'></div>";
					}else{
						html += "						<li class='ei_file disabled'>"+g360.g_lang.Attachments+"</li>";
					}
					
			
					html += "						<li class='ei_type'><span>"+g360.g_lang.Form+"</span>"+ty+"</li>";
					html += "						<li class='ei_size'><span>"+g360.g_lang.Size1+"</span>"+fa.request_width+"cm x "+fa.request_height+"cm</li>";
					if(g360.g_lang.Lang == "ko"){
						html += "						<li class='ei_price'><span>"+g360.g_lang.Request_amount+"</span>"+g360.comma(g360.setWon(fa.request_price* 10000))+"</li>";						
					}else {
						html += "						<li class='ei_price'><span>"+g360.g_lang.Request_amount+"</span>￦"+g360.comma(fa.request_price* 10000)+"</li>";
					}
					html += "						<li class='ei_date'><span>"+g360.g_lang.Delivery_request_date+"</span>"+fa.request_date+"</li>";
					
					html += "		</ul>";
					html += "	</div>";
					html += "</div>";
				
				}
				
				if (html == '') {
					html += '<div class="no_list">'+g360.g_lang.Mypage_Alert2+'</div>';
				}
				$("#client_atist_project_dis").html(html);
				
			}
		});
		
		
			
	},
	
	"complete_project_list" : function(){
		var url = g360.root_path + "/artProject_list.mon?start=0&perpage=3&opt=client_complete";
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
							
				var ia = data;
				
				var html2 = "";
				for (var p=1; p < ia.length; p++){
					var ias = ia[p];			
					
				//	var url = "/artimage/"+ias.art_ok+"/art/preview/"+ias.art_select_dockey+".jpg";
					var url = "";
					
					if (ias.request_subform == "1"){
						url = "/artimage/" + ias.art_ok + "/art/preview/" + ias.art_select_dockey + ".jpg";
						html2 += "<li onclick=\"g360.preview_img('"+ias.art_select_dockey+"','"+ias.art_ok+"','art')\">";
						
						html2 += "	<a>";
						html2 += "		<div><span><img src='"+url+"' alt='' /></span></div>";
						html2 += "		<dl>";
						html2 += "			<dd>"+ias.art_nickname+"</dd>";
//						html2 += "			<dd>"+ias.art_title+"</dd>";
//						html2 += "			<dd>"+ias.art_height+"x"+ias.art_width+"cm ("+ias.art_hosu+"호)</dd>";
						html2 += "		</dl>";
						html2 += "	</a>";
						html2 += "</li>";
						
					}else{
					
						var rp = ias.report[ias.report.length-1];
						url = "/artimage/" + ias.art_ok + "/artproject/preview/" + rp.uploadfilename + ".jpg";
						html2 += "<li onclick=\"g360.preview_img('"+rp.uploadfilename +"','"+ias.art_ok+"','art')\">";
						
						html2 += "	<a>";
						html2 += "		<div><span><img src='"+url+"' alt='' /></span></div>";
						html2 += "		<dl>";
						html2 += "			<dd>"+ias.art_nickname+"</dd>";
						html2 += "			<dd>"+ias.request_title+"</dd>";
						if (ias.request_hosu == null){
							html2 += "			<dd>"+ias.request_height+"x"+ias.request_width+"cm </dd>";
						}else{
							html2 += "			<dd>"+ias.request_height+"x"+ias.request_width+"cm ("+ias.request_hosu+"호)</dd>";
						}
						
						html2 += "		</dl>";
						html2 += "	</a>";
						html2 += "</li>";
					}
					
					
					

				}		
				
				if (html2 == '') {
					html2 += '<li class="no_list_li">'+g360.g_lang.Mypage_Alert4+'</li>';
				}
				
				$("#client_img_list_dis").html(html2);
			
				
			}, 
			error : function(e){
				g360.error_alert();
			}
		});
	}
	
}

