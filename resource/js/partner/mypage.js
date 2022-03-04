
function gPartnerMyPage(){	
	gPMP = this;
	

}

gPartnerMyPage.prototype = {		

	"init" : function(){
		var _self = this;	
		
		$(".sub_header_tab li").on("click", function(event){

//			//기존 선택된 항목을 모두 지운다.
			$(".sub_header_tab li").each(function(index){
				$(this).removeClass("on");
			});
//			
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
		
		$("#artist_edit").on("click", function(event){
			gTopMain.navBtnAction('account');
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
		
		$(".g_lang_Group").html(g360.g_lang.Group);
		$(".g_lang_Educational_Info").html(g360.g_lang.Educational_Info);
		$(".g_lang_Career").html(g360.g_lang.Career);
		
		$(".g_lang_Project_of_Interest").html(g360.g_lang.Project_of_Interest);
		$(".g_lang_Application_details").html(g360.g_lang.Application_details);
		$(".g_lang_Project_in_progress").html(g360.g_lang.Project_in_progress);
		$(".g_lang_Finished_project").html(g360.g_lang.Finished_project);
		
		$(".g_lang_Average_score").html(g360.g_lang.Average_score);
		$(".g_lang_Completed_project").html(g360.g_lang.Completed_project);
		$(".g_lang_Portfolio").html(g360.g_lang.Portfolio);
		$(".g_lang_More").html(g360.g_lang.More);
		
		$(".g_lang_My_Art_Project").html(g360.g_lang.My_Art_Project);
		$(".g_lang_My_Art_Project1").html(g360.g_lang.My_Art_Project1);
		$(".g_lang_My_Art_Project2").html(g360.g_lang.My_Art_Project2);
		$(".g_lang_My_Art_Project3").html(g360.g_lang.My_Art_Project3);
		$(".g_lang_My_Art_Project4").html(g360.g_lang.My_Art_Project4);
		
		$(".g_lang_Artworks_on_sale").html(g360.g_lang.Artworks_on_sale);
		$(".g_lang_Sold_artworks").html(g360.g_lang.Sold_artworks);
		$(".g_lang_Gallery_on_display").html(g360.g_lang.Gallery_on_display);
		$(".g_lang_All_gallery").html(g360.g_lang.All_gallery);
		
		$("#artist_edit>img").attr("src", g360.g_lang.Edit_Button);
	},
	
	
	"call_list" : function(opt, obj){
		gPMP.call_list_btn_empty();
		
		$(obj).addClass("on");
		
		//opt 1 : favorite / 2 : support_ing / 3 : ing / 3 : end
		
		var url = g360.root_path + "/artProject_list.mon?start=0&perpage=4&opt="+opt;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				
			
				var html = "";
				
				for (var k = 1; k < data.length; k++){
					
					var fa = data[k];
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
					html += "	<div class='wrap_group_invite'><img src='/img/account/icon-invite-a-friend.svg' alt='' />"+g360.g_lang.Total_Apply1+ (typeof(fa.suggest) == "undefined" ? 0 : sug.length) +g360.g_lang.Total_Apply2;
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
					
			
					html += "						<li class='ei_type'><span>"+g360.g_lang.Shape+"</span>"+ty+"</li>";
					html += "						<li class='ei_size'><span>"+g360.g_lang.Size1+"</span>"+fa.request_width+"cm x "+fa.request_height+"cm</li>";
					html += "						<li class='ei_price'><span>"+g360.g_lang.Request_amount+"</span>"+g360.comma(g360.setWon(fa.request_price))+"</li>";
					html += "						<li class='ei_date'><span>"+g360.g_lang.Delivery_request_date+"</span>"+fa.request_date+"</li>";
					
					html += "		</ul>";
					html += "	</div>";
					html += "</div>";
				
				}
			//	alert(html);
				
				$("#atist_project_dis").html(html);
				
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
		
		
	},
	
	"call_list_btn_empty" : function(){
		$("#project_tab_dis li").each(function(index){
			$(this).removeClass("on");
		});
	},
	
	"call_list2_empty" : function(){
		$("#img_tab_dis li").each(function(index){
			$(this).removeClass("on");
		});
	},
	
	
	"call_art_list" : function(opt, obj){
		gPMP.call_list2_empty();		
		$(obj).addClass("on");
		
		var url = g360.root_path + "/load_save_image_info_option.mon?start=0&perpage=3&option="+opt;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
												
				var html2 = "";
				for (var p=0; p < data.length; p++){
					var ias = data[p];
					
					
					var url = "/artimage/"+ias.email+"/art/preview/"+ias.dockey+".jpg";
					html2 += "<li onclick=\"g360.preview_img('"+ias.dockey+"','"+ias.email+"','art')\">";
					html2 += "	<a>";
					html2 += "		<div><span><img src='"+url+"' alt='' /></span></div>";
					html2 += "		<dl>";
					html2 += "			<dd>"+ias.art_artist+"</dd>";
					html2 += "			<dd>"+ias.art_title+"</dd>";
					if (ias.art_hosu == null){
						html2 += "			<dd>"+ias.art_height+"x"+ias.art_width+"cm</dd>";
					}else{
						html2 += "			<dd>"+ias.art_height+"x"+ias.art_width+"cm ("+ias.art_hosu+"호)</dd>";
					}
					
					html2 += "		</dl>";
					html2 += "	</a>";
					html2 += "</li>";
				}
	
				
				$("#img_list_dis").html(html2);
				
			},
			error : function(e){
				g360.error_alert();
			}
		});	
	},
	
	
	
	
	
	
	
	
	
	
	
	"call_list3_empty" : function(){
		$("#vr_tab_dis li").each(function(index){
			$(this).removeClass("on");
		});
	},
	
	"call_vr_list" : function(opt, obj){
		
		gPMP.call_list3_empty();
		
		$(obj).addClass("on");
		
		var url = g360.root_path + "/load_VRRoom.mon?start=0&perpage=3&ty="+opt;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
												
					
				var html3 = "";
				for (var r = 1 ; r < data.length; r++){
					var vl = data[r];
				
				//	var img_src = "/vr/vr_data_"+vl.templatecode+"/"+vl.dockey+"/pano_f.jpg";	
					var img_src = g360.vr_img_path_new(vl.dockey);
					html3 += "<div class='col-md-4 col-sm-6'>";
					html3 += "	<div class='vr-item-wrap' style='cursor:pointer' onclick=\"g360.popup_VR('"+vl.title+"','"+vl.dockey+"','"+vl.templatecode+"');\">";
					html3 += "		<div class='pic' style='cursor:pointer'>";
					html3 += "			<img src='"+img_src+"' alt='' >";
					html3 += "		 </div>";
					html3 += "		 <div class='info'>";
					if (vl.show == "T"){
						html3 += "			<h3>"+vl.title+" <span>"+g360.g_lang.OnDisplay+"</span></h3>";
					}else{
						html3 += "			<h3>"+vl.title+" </h3>";
					}
				//	html3 += "			<h3>"+vl.title+" <span>전시 중</span></h3>";
					html3 += "			<h4>"+vl.express+"</h4>";
					html3 += "			 <div class='like-area'>";
					html3 += "				 <span><img src='/img/icon-vr-view-count-b.svg' class='icon_vr_view-count_b'> "+vl.read+"</span>";
					html3 += "				 <span><img src='/img/icon-vr-collect-count-b.svg' class='icon_vr_collect-count_b'>"+vl.like+"</span>";
					html3 += "			 </div>";
					html3 += "		</div>";
					html3 += "	</div>";
					html3 += "</div>";					
				}
					
				
				
				$("#vr_gallery_dis").html(html3);
			},
			error : function(e){
				g360.error_alert();
			}
		});		
	},
	
	"load_user_info" : function(){
		var url = g360.root_path + "/search_userinfo_profile.mon";
		url += "?" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){			
				if (typeof(data.photoimage) != "undefined" || g360.UserInfo.photoimage != ""){
					var url = g360.user_photo_url(data.email);
					url += (data.photoimage_version ? '?open&ver=' + data.photoimage_version : '');
					var no_img = g360.user_photo_url_none(g360.UserInfo.gubun);
					$("#profile_user_image").css('background-image', 'url(' + url + '), url(' + no_img + ')');
				}else{
					var url = "/img/noimage.svg";
					$("#profile_user_image").attr("src", url);
				}

				
				$("#artist_email").text(data.email);
				
				if (data.gubun == "art"){
				//	$("#artist_typex").html("작가");
					$("#artist_name").text(g360.TextToHtml(data.nickname) + " / "+g360.g_lang.Artist);
				}else if (data.gubun == "curator"){
				//	$("#artist_typex").html("큐레이터");
					$("#artist_name").text(g360.TextToHtml(data.nickname) + " / "+g360.g_lang.Art_consultant);
				}
				
				if (typeof(data.group) != "undefined"){
					var group = data.group;
					var html = "";
					for (var y = 0 ; y < group.length; y++){
						var gp = group[y];
						html += "<li>"+gp.title+ " / " + gp.dept + " / " + gp.jobtitle + "</li>"
					}
					$("#artist_group").html(html);
				}
				
				
				if (typeof(data.education) != "undefined"){
					var edu = data.education;
					var html = "";
					for (var y = 0; y < edu.length; y++){
						var ed = edu[y];
						html +=  "<li>"+ed.schoolname+ " / " + ed.major + " / " + ed.level + "</li>";
					}
					$("#artist_edu").html(html);
				}
			
				if (typeof(data.career) != "undefined"){
					var car = data.career;
					var html = "";
					for (var y = 0; y < car.length; y++){
						var ca = car[y];
						html +=  "<li>"+ca.title+ " / " + ca.term + "</li>";
					}
					$("#artist_career").html(html);
				}
				
				
				
				
				
				
				if (typeof(data.score) != "undefined"){
					var score = data.score;
					
					var totalscore = parseInt(score.score1) + parseInt(score.score2) + parseInt(score.score3) + parseInt(score.score4) +parseInt(score.score5);
					var rtotal = parseInt(totalscore) / 5;
					var sctotal = Math.ceil(rtotal);
					
					var bun=1;
					$("#artist_score img").each(function(index){
						
						if (bun <= sctotal){
							$(this).attr("src", $(this).attr("src").replace("disable","focus"));
						}
						bun++;
					})
				}
				
				
				//4.3 / 평가32개
				
				
				$("#artist_project_count").text(data.project_totalcount + g360.g_lang.Artist_Mypage7);
				
				$("#artist_art_count").text(data.saved_all_totalcount + g360.g_lang.Artist_Mypage8);
				
				if (typeof(data.score) != "undefined"){
					config.data.datasets[0].data[0] = score.score1;
					config.data.datasets[0].data[1] = score.score2;
					config.data.datasets[0].data[2] = score.score3;
					config.data.datasets[0].data[3] = score.score4;
					config.data.datasets[0].data[4] = score.score5;
					
					window.myRadar = new Chart(document.getElementById('canvas'), config);
					
					$("#artist_average_score").text(rtotal + g360.g_lang.Artist_Mypage6)
				}else{
					$("#artist_average_score").text("0"+g360.g_lang.Artist_Mypage6)
				}
				
				
				
				config2.data.datasets[0].data[0] = data.project_type1_totalcount;
				config2.data.datasets[0].data[1] = data.project_type2_totalcount;
				config2.data.datasets[0].data[2] = data.project_type3_totalcount;
				var ctx = document.getElementById('canvas2').getContext('2d');
				window.myDoughnut = new Chart(ctx, config2);
				
				//gPPF.draw_project_complete_list(data);
				
				//관심 프로젝트 리스트 표시
				
				var fax = data.favorite_project_list;
			
				var html = "";
				for (var k = 0; k < fax.length; k++){
					
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
					html += "	<div class='wrap_group_invite'><img src='/img/account/icon-invite-a-friend.svg' alt='' />"+g360.g_lang.Total_Apply1+ (typeof(fa.suggest) == "undefined" ? 0 : sug.length) +g360.g_lang.Total_Apply2;
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
					
			
					html += "						<li class='ei_type'><span>"+g360.g_lang.Shape+"</span>"+ty+"</li>";
					html += "						<li class='ei_size'><span>"+g360.g_lang.Size1+"</span>"+fa.request_width+"cm x "+fa.request_height+"cm</li>";
					html += "						<li class='ei_price'><span>"+g360.g_lang.Request_amount+"</span>"+g360.comma(g360.setWon(fa.request_price))+"</li>";
					html += "						<li class='ei_date'><span>"+g360.g_lang.Delivery_request_date+"</span>"+fa.request_date+"</li>";
					
					html += "		</ul>";
					html += "	</div>";
					html += "</div>";
				
					
				}
			//	alert(html);
				
				$("#atist_project_dis").html(html);
				
				
				
				$("#artist_favorite_count").text(data.project_favorite_totalcount);
				$("#favorite_count").text(data.project_favorite_totalcount);
				
				$("#artist_support_ing_count").text(data.project_support_ing_totalcount);
				$("#support_ing_count").text(data.project_support_ing_totalcount);
				
				$("#artist_ing_count").text(data.project_ing_totalcount);
				$("#ing_count").text(data.project_ing_totalcount);
				
				$("#artist_end_count").text(data.project_totalcount);
				$("#end_count").text(data.project_totalcount);
				
				
				
				var ia = data.img_art_saling_list;
				
				var html2 = "";
				for (var p=0; p < ia.length; p++){
					var ias = ia[p];
					
					
					var url = "/artimage/"+ias.email+"/art/preview/"+ias.dockey+".jpg";
					html2 += "<li onclick=\"g360.preview_img('"+ias.dockey+"','"+ias.email+"','art')\">";
					html2 += "	<a>";
					html2 += "		<div><span><img src='"+url+"' alt='' /></span></div>";
					html2 += "		<dl>";
					html2 += "			<dd>"+ias.art_artist+"</dd>";
					html2 += "			<dd>"+ias.art_title+"</dd>";
					if (ias.art_hosu == null){
						html2 += "			<dd>"+ias.art_height+"x"+ias.art_width+"cm </dd>";
					}else{
						html2 += "			<dd>"+ias.art_height+"x"+ias.art_width+"cm ("+ias.art_hosu+"호)</dd>";
					}
					
					html2 += "		</dl>";
					html2 += "	</a>";
					html2 += "</li>";
				}
	
			//	g360.preview_img('ygkim@gmail.com_756d903acf564034c94d9141cf52728c.357379','ygkim@gmail.com','artRequest')
				
				
				$("#img_list_dis").html(html2);
				
				
				
				
				
				
				
				$("#img_ing").text(data.saved_art_saling_totalcount);  //전시중인 작품 개수
				$("#img_end").text(data.saved_art_totalcount);         //판매 완료된 작품 개수
				
				$("#vr_ing").text(data.vr_ing_count);  //전시중인 VR갤러리 개수
				$("#vr_all").text(data.vr_all_count);         //전체 VR 갤러리  개수
				
				
				
				var vr_list = data.vr_project_list;
				var html3 = "";
				for (var r = 0 ; r < vr_list.length; r++){
					var vl = vr_list[r];
				
				//	var img_src = "/vr/vr_data_"+vl.templatecode+"/"+vl.dockey+"/pano_f.jpg";	
					var img_src = g360.vr_img_path_new(vl.dockey);
					html3 += "<div class='col-md-4 col-sm-6'>";
					html3 += "	<div class='vr-item-wrap' style='cursor:pointer' onclick=\"g360.popup_VR('"+vl.title+"','"+vl.dockey+"','"+vl.templatecode+"');\">";
					html3 += "		<div class='pic' style='cursor:pointer'>";
					html3 += "			<img src='"+img_src+"' alt='' >";
					html3 += "		 </div>";
					html3 += "		 <div class='info'>";
								
					html3 += "			<h3>"+vl.title+" <span>"+g360.g_lang.OnDisplay+"</span></h3>";
					
					
					html3 += "			<h4>"+vl.express+"</h4>";
					html3 += "			 <div class='like-area'>";
					html3 += "				 <span><img src='/img/icon-vr-view-count-b.svg' class='icon_vr_view-count_b'> "+vl.read+"</span>";
					html3 += "				 <span><img src='/img/icon-vr-collect-count-b.svg' class='icon_vr_collect-count_b'>"+vl.like+"</span>";
					html3 += "			 </div>";
					html3 += "		</div>";
					html3 += "	</div>";
					html3 += "</div>";					
				}
				
				
				
				$("#vr_gallery_dis").html(html3);
				
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	}
	
}















var color = Chart.helpers.color;
var config = {
	type: 'radar',
	data: {
		labels: [g360.g_lang.Artist_Mypage9, g360.g_lang.Artist_Mypage10, g360.g_lang.Artist_Mypage11, g360.g_lang.Artist_Mypage12, g360.g_lang.Artist_Mypage13],
		datasets: [{
			label: g360.g_lang.Artist_Mypage14,
			backgroundColor: color(window.chartColors.purple).alpha(0.2).rgbString(),
			borderColor: window.chartColors.purple,
			pointBackgroundColor: window.chartColors.purple,
			lineTension : 0,
			pointStyle : 'line',
			data: [
				87,
				69,
				60,
				70,
				80
			]
		}]
	},
	options: {
	//	legend: {
	//		position: 'top',
	//	},
	//	title: {
	//		display: false,
		//	text: 'Chart.js Radar Chart'
	//	},
		scale: {
			ticks: {
				beginAtZero: true
			}
		},
		 layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        }
	}
};



var config2 = {
	type: 'doughnut',
	data: {
		datasets: [{
			data: [
				30,
				50,
				20,
			],
			backgroundColor: [
				window.chartColors.red,
				window.chartColors.blue,
				window.chartColors.yellow,
			],
			label: 'Dataset 1'
		}],
		labels: [
			g360.g_lang.Artist_Mypage15,
			g360.g_lang.Artist_Mypage16,
			'AI',
		]
	},
	options: {
		responsive: true,
	//	legend: {
	//		position: 'top',
	//	},
	//	title: {
	//		display: true,
	//		text: '프로젝트 작업 분포'
	//	},
		animation: {
			animateScale: true,
			animateRotate: true
		}
	}
};

