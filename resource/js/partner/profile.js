
function gPartnerProfile(){	
	gPPF = this;
	gPPF.skill_list = "";
	gPPF.group_list = "";
	gPPF.education_list = "";
	gPPF.career_list = "";
	gPPF.cert_list = "";
	gPPF.display_list = "";
	
	gPPF.trObj = "";
	
	gPPF.totalcount = 0;
	gPPF.perpage = 5;
	gPPF.cPage = 1;
	
	gPPF.type = "";
	
	gPPF.cUserEmail = "";
	gPPF.cUserInfo = "";
	
	gPPF.opt = "";
}

gPartnerProfile.prototype = {		

	"init" : function(){
		var _self = this;	
		
	
		var gubun = g360.UserInfo.gubun;
		if (gubun == "art"){
			$("#partner_regartist").css("display","none");
			$("#partner_career").css("display","");
		}else if (gubun == "curator"){
			$("#partner_career").css("display","none");
			$("#partner_regartist").css("display","");
		}
		
	//	gPPF.read_artistinfo();
		
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
		//	return false;
			
		});
		
		$(".sub_common_content aside ul li").on("click", function(event){
		
			gPPF.empty_class_on();
			$(this).addClass("on");

			
			var id = event.currentTarget.id;
			
			
			g360.history_record(id);
			if (id == "partner_all"){
				gTopMain.navBtnAction('profile');
				return false;
			}else if (id == "partner_artistinfo"){
				gPPF.goto_artistInfo();
			}else if (id == "partner_skill"){
				gPPF.goto_skill();
			}else if (id == "partner_career"){
				gPPF.goto_career();
			}else if (id == "partner_client_score"){
				gPPF.type = "score";
				gPPF.goto_score();
			}else if (id == "partner_project_history"){
				gPPF.type = "history";
				gPPF.goto_history();
			}else if (id == "partner_user_info_manual"){
				g360.popup_manual("userinfo");
			}else if (id == "partner_regartist"){
				gPPF.goto_regartist();
			}
			
		});
		
		$("#artistinfo_edit").on("click", function(event){
			gPPF.edit_artistinfo();
		});
		
		
		$("#skill_edit").on("click", function(event){
			//alert("클릭");
			gPPF.skill_edit();
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
		
		$(".g_lang_Terms_of_use3").html(g360.g_lang.Terms_of_use3);
		$(".g_lang_Back").html(g360.g_lang.Back);
		
		$(".g_lang_About_Me").html(g360.g_lang.About_Me);
		$(".g_lang_MyInfo").html(g360.g_lang.MyInfo);
		$(".g_lang_Artist_registration").html(g360.g_lang.Artist_registration);
		$(".g_lang_Client_Rating").html(g360.g_lang.Client_Rating);
		$(".g_lang_Artwork_creating_status").html(g360.g_lang.Artwork_creating_status);
		$(".g_lang_Partners_Info").html(g360.g_lang.Partners_Info);
		$(".g_lang_Update1").html(g360.g_lang.Update1);
		
		$(".g_lang_Average_score").html(g360.g_lang.Average_score);
		$(".g_lang_Completed_project").html(g360.g_lang.Completed_project);
		$(".g_lang_Portfolio").html(g360.g_lang.Portfolio);
		
		$(".g_lang_Artist_Mypage6").html(g360.g_lang.Artist_Mypage6);
		$(".g_lang_Artist_Mypage7").html(g360.g_lang.Artist_Mypage7);
		$(".g_lang_Artist_Mypage8").html(g360.g_lang.Artist_Mypage8);
		
		$(".g_lang_Artist").html(g360.g_lang.Artist);
		$(".g_lang_Group").html(g360.g_lang.Group);
		
		$(".g_lang_Affiliation_Organization").html(g360.g_lang.Affiliation_Organization);
		$(".g_lang_Department").html(g360.g_lang.Department);
		$(".g_lang_Position").html(g360.g_lang.Position);
		
		$(".g_lang_Educational").html(g360.g_lang.Educational);
		$(".g_lang_School").html(g360.g_lang.School);
		$(".g_lang_Major").html(g360.g_lang.Major);
		$(".g_lang_Type1").html(g360.g_lang.Type1);
		$(".g_lang_Status").html(g360.g_lang.Status);
		$(".g_lang_Admission_date").html(g360.g_lang.Admission_date);
		$(".g_lang_Graduation_date").html(g360.g_lang.Graduation_date);
		
		$(".g_lang_Awards_History").html(g360.g_lang.Awards_History);
		$(".g_lang_Period").html(g360.g_lang.Period);
		$(".g_lang_Details").html(g360.g_lang.Details);
		$(".g_lang_Collection_Artswork").html(g360.g_lang.Collection_Artswork);
		$(".g_lang_Exhibit_Project").html(g360.g_lang.Exhibit_Project);
		
		$(".g_lang_Certificate").html(g360.g_lang.Certificate);
		$(".g_lang_Issuer").html(g360.g_lang.Issuer);
		$(".g_lang_Date1").html(g360.g_lang.Date1);
		
		$(".g_lang_Evaluation_Info").html(g360.g_lang.Evaluation_Info);
		$(".g_lang_Completed_project").html(g360.g_lang.Completed_project);
		
		$(".g_lang_Artist_Mypage9").html(g360.g_lang.Artist_Mypage9);
		$(".g_lang_Artist_Mypage10").html(g360.g_lang.Artist_Mypage10);
		$(".g_lang_Artist_Mypage11").html(g360.g_lang.Artist_Mypage11);
		$(".g_lang_Artist_Mypage12").html(g360.g_lang.Artist_Mypage12);
		$(".g_lang_Artist_Mypage13").html(g360.g_lang.Artist_Mypage13);
		$(".g_lang_Artist_Mypage14").html(g360.g_lang.Artist_Mypage14);
		
		$(".g_lang_Average_score").html(g360.g_lang.Average_score);
		$(".g_lang_Rating_distribution").html(g360.g_lang.Rating_distribution);
		
		//$(".g_lang_Back").html(g360.g_lang.Back);
		
		
	},
	
	"goto_artistInfo" : function(){
		g360.LoadPage("body_content", g360.root_path + "/partner/profile/artistInfo.jsp");
		return false;
	},
	
	"goto_skill" : function(){
		g360.LoadPage("body_content", g360.root_path + "/partner/profile/skill.jsp");
		return false;
	},
	
	"goto_career" : function(){
		g360.LoadPage("body_content", g360.root_path + "/partner/profile/career.jsp");
		return false;
	},
	
	"goto_score" : function(){
		
		g360.ptype  = "score";
		g360.LoadPage("body_content", g360.root_path + "/partner/profile/score.jsp");
		return false;
	},
	
	
	"goto_regartist" : function(){
		
		g360.ptype  = "regartist";
		g360.LoadPage("body_content", g360.root_path + "/partner/profile/regartist.jsp");
		return false;
	},
	
	
	"goto_history" : function(){
		
		g360.ptype  = "history";
		g360.LoadPage("body_content", g360.root_path + "/partner/profile/history.jsp");
		return false;
	},
	
	"goto_artproject_end" : function(){
		g360.LoadPage("body_content", g360.root_path + "/partner/artProject/artProject.jsp?call_mode=end");
		return false;
	},
	
	"load_profile_userinfo" : function(){
		var url = g360.root_path + "/search_userinfo_project.mon";
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
					$("#p_user_image").css('background-image', 'url(' + url + '), url(' + no_img + ')');
				}else{
					var url = "/img/noimage.svg";
					$("#p_user_image").attr("src", url);
				}
				
				
				if (data.gubun == "art"){
					$("#profile_category").text(g360.g_lang.Artist);
				}else if (data.gubun == "curator"){
					$("#profile_category").text(g360.g_lang.Art_consultant);
				}
				
				if (typeof(data.score) != "undefined"){
					var score = data.score;
					
					var totalscore = parseInt(score.score1) + parseInt(score.score2) + parseInt(score.score3) + parseInt(score.score4) +parseInt(score.score5);
					var rtotal = parseInt(totalscore) / 5;
					var sctotal = Math.ceil(rtotal);
					
					var bun=1;
					$("#profile_score img").each(function(index){
						
						if (bun <= sctotal){
							$(this).attr("src", $(this).attr("src").replace("disable","focus"));
						}
						bun++;
					})
				}
				
				
				//4.3 / 평가32개
				
				
				$("#profile_project").text(data.project_totalcount + g360.g_lang.Artist_Mypage7);
				
				$("#profile_artcount").text(data.saved_art_totalcount + g360.g_lang.Artist_Mypage8);
				
				if (typeof(data.score) != "undefined"){
					config.data.datasets[0].data[0] = score.score1;
					config.data.datasets[0].data[1] = score.score2;
					config.data.datasets[0].data[2] = score.score3;
					config.data.datasets[0].data[3] = score.score4;
					config.data.datasets[0].data[4] = score.score5;
					
					window.myRadar = new Chart(document.getElementById('canvas'), config);
					
					$("#profile_point").text(rtotal + g360.g_lang.Artist_Mypage6)
				}else{
					$("#profile_point").text("0"+g360.g_lang.Artist_Mypage6)
				}
				
				
				
				config2.data.datasets[0].data[0] = data.project_type1_totalcount;
				config2.data.datasets[0].data[1] = data.project_type2_totalcount;
				config2.data.datasets[0].data[2] = data.project_type3_totalcount;
				var ctx = document.getElementById('canvas2').getContext('2d');
				window.myDoughnut = new Chart(ctx, config2);
				
				gPPF.draw_project_complete_list(data);
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	


	
	"draw_project_complete_list" : function(data){
		
		var gubun = g360.UserInfo.gubun;
		
		if (gubun == "curator"){
			return false;
		}
		
		var html = "";
		var ddd = data.complete_project;
		
	//	if (ddd.length ==0) return false;
		
		html += "<div class='group_header type3 fixheight_s'>";
		html += "	<h3>"+g360.g_lang.Evaluation_Info+"</h3>";
		html += "	<a href='#' class='btn_more' onclick=\"gPPF.goto_artproject_end();\">"+g360.g_lang.More+"</a>";
		html += "</div>";
		
	
		for (var i = 0; i < ddd.length; i++){
			var dx = ddd[i];
			
			var score = dx.eval;
			var totalscore = parseInt(score.score1) + parseInt(score.score2) + parseInt(score.score3) + parseInt(score.score4) +parseInt(score.score5);
			var rtotal = parseInt(totalscore) / 5;
			var sctotal = Math.ceil(rtotal);
			

			
			html += "<div class='wrap_group evaluation'>";
			html += "	<div class='wrap_group_header'>";
			html += "	<h4><em class='blue_label'>"+g360.g_lang.Request_artwork+"</em>"+dx.request_title+"</h4>";
			html += "		<div class='evaluation_info'>";
			html += "			<dl>";
			html += "				<dt>"+g360.g_lang.Client+"</dt>";
			html += "				<dd>"+dx.request_nickname+"<dd>";
			html += "			</dl>";
			html += "			<dl>";
			html += "				<dt>"+g360.g_lang.Contract_date+"</dt>";
			html += "				<dd>"+g360.iso_date_convert(dx.art_ok_date)+"<dd>";
			html += "			</dl>";
			html += "		</div>";
			html += "		<div class='star'>";
			for (var k = 1; k < 6; k++){
				if (k <= sctotal){
					html += "				<img src='/img/account/star-r-focus.svg' alt='' />";
				}else{
					html += "				<img src='/img/account/star-r-disable.svg' alt='' />";
				}
			}
//			html += "			<img src='/img/account/star-r-focus.svg' alt='' />";
//			html += "			<img src='/img/account/star-r-focus.svg' alt='' />";
//			html += "			<img src='/img/account/star-r-focus.svg' alt='' />";
//			html += "			<img src='/img/account/star-r-focus.svg' alt='' />";
//			html += "			<img src='/img/account/star-r-disable.svg' alt='' />";
			html += "			<span>" + rtotal + g360.g_lang.Artist_Mypage6 + "</span>";
			html += "		</div>";
			html += "	</div>";
			html += "	<div class='contract'>";
			html += "		<table>";
			html += "			<colgroup>";
			html += "				<col class='t_th' />";
			html += "				<col />";
			html += "				<col class='t_th' />";
			html += "				<col />";
			html += "			</colgroup>";
			html += "			<tbody>";
			html += "				<tr>";
			html += "					<th>"+g360.g_lang.Request_title+"</th>";
			html += "					<td colspan='3'><strong>"+dx.request_title+"</strong></td>";
			html += "				</tr>";
			html += "				<tr>";
			html += "					<th>"+g360.g_lang.Price1s+"</th>";
			html += "					<td><strong>"+g360.comma(g360.setWon(dx.selected_price))+"</strong> </td>";
			html += "					<th>"+g360.g_lang.Period1+"</th>";
			html += "					<td><strong>"+(parseInt(dx.seleted_term)+5)+"</strong> (" + g360.g_lang.Creating_period + dx.seleted_term + g360.g_lang.ProfileSetting_1 + ")</td>";
			html += "				</tr>";
			html += "			</tbody>";
			html += "		</table>";
			html += "	</div>";
			html += "</div>";
			
		}
		
		
	
		$("#profile_project_complete_list").html(html);
	},
	
	"load_profile_main" : function(){
		var url = g360.root_path + "/search_userinfo.mon?id="+gPPF.cUserEmail;
		//url += "?" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contenttype : "application/json; charset=utf-8",
			url : url,
			cache : false,
			async : false,
			success : function(data){
				
				//닉네임 이메일 주소 등록
				$("#profile_name").html(data.nickname + " / " + data.email);
				
				//자기 소개 글 등록
				if (typeof(data.content) != "undefined"){
					txt = data.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
					$("#profile_artist_express").html(g360.TextToHtml(txt));
				}

				
				var gubun = g360.UserInfo.gubun;
				
				if (gubun == "curator"){
					$("#group_top").hide();
					$("#level_top").hide();
					$("#cert_top").hide();
					$("#career_top").hide();
					$("#display_top").hide();
					
					
				}else{

					//소속 데이터 등록
					var html = "";
					if ( (typeof (data.group) != "undefined") && data.group.length > 0){
						for (var i = 0 ; i < data.group.length; i++){
							var sp = data.group[i];				
							html += "					<tr>";
							html += "						<td>"+sp.title+"</td>";
							html += "						<td>"+sp.dept+"</td>";
							html += "						<td>"+sp.jobtitle+"</td>";
							html += "					</tr>";				
						}
						
					}
					$("#profile_group_dis").html(html);
					
					//학력 정보 등록
					var html = "";
					
					if ( (typeof (data.education) != "undefined") && data.education.length > 0){
						var lev = "";
						var stat = "";
						for (var i = 0 ; i < data.education.length; i++){
							var sp = data.education[i];
							if (typeof(sp.schoolname) != "undefined"){
								html += "					<tr id='edu_tr_"+i+"'>";
								html += "						<td id='edu_level_"+i+"' style='display:none'>"+sp.level+"</td>";
								html += "						<td id='edu_schoolname_"+i+"'>"+sp.schoolname+"</td>";
								html += "						<td id='edu_major_"+i+"'>"+sp.major+"</td>";
								
								if(g360.g_lang.Lang == "ko"){
									
									html += "						<td id='edu_level_"+i+"'>"+sp.level+"</td>";							
									html += "						<td id='edu_status_"+i+"'>"+sp.status+"</td>";
								}else{
									
									lev = sp.level; stat = sp.status;
									if(lev=="박사") lev = "Doctoral";
									if(lev=="석사") lev = "Master";
									if(lev=="학사") lev = "Bachelor";
									if(lev=="기타") lev = "etc";
									
									if(stat=="졸업") stat = "Graduated";
									if(stat=="중퇴") stat = "Drop_out";
									if(stat=="재학") stat = "Ungraduated";
									if(stat=="수료") stat = "Complete";
									
									
									html += "						<td id='edu_level_"+i+"'>"+lev+"</td>";							
									html += "						<td id='edu_status_"+i+"'>"+stat+"</td>";
								}
								
								html += "						<td id='edu_start_"+i+"'>"+sp.start+"</td>";
								html += "						<td id='edu_end_"+i+"'>"+sp.end+"</td>";							
							//	html += "						<td class='t_modify' style='text-align:right'><button class='btn btn_cell_edit'  onclick=\"gPPF.edu_tr_edit('edu_tr_"+i+"')\">수정</button></td>";
							//	html += "						<td class='t_delete' ><button class='btn btn_cell_delete'  onclick=\"gPPF.edu_tr_delete('edu_tr_"+i+"')\">삭제</button></td>";		
								html += "					</tr>";
							}
						}					
					}							
					$("#profile_education_dis").html(html);
					
					//경력 사항 등록
					var html = "";
					
					if ( (typeof (data.career) != "undefined") && data.career.length > 0){
						for (var i = 0 ; i < data.career.length; i++){
							var sp = data.career[i];
					
					html += "					<tr>";
					html += "						<td>"+sp.term+"</td>";
					html += "						<td>"+sp.title+"</td>";
					html += "					</tr>";
					
						}
						
					}
					$("#profile_career_dis").html(html);
					
					//자격증 사항 등록
					var html = "";
					
					if ( (typeof (data.cert) != "undefined") && data.cert.length > 0){
						for (var i = 0 ; i < data.cert.length; i++){
							var sp = data.cert[i];
					
					html += "					<tr>";
					html += "						<td>"+sp.certname+"</td>";
					html += "						<td>"+sp.publisher+"</td>";
					html += "						<td>"+sp.date+"</td>";
					html += "					</tr>";
					
						}
						
					}
					
					$("#profile_cert_dis").html(html);
					
					
					
					
					//전시 및 프로젝트 경력
					var html = "";
					
					if ( (typeof (data.display) != "undefined") && data.display.length > 0){
						for (var i = 0 ; i < data.display.length; i++){
							var sp = data.display[i];
					
					html += "					<tr>";
					html += "						<td>"+sp.term+"</td>";
					html += "						<td>"+sp.title+"</td>";
					html += "					</tr>";
					
						}
						
					}
					$("#profile_display_dis").html(html);
				}
				

				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	
	},
	
	"empty_class_on" : function(){
		$(".sub_common_content aside ul li").each(function(evnet){
			$(this).removeClass("on");
		});
	},
	
	
	"read_artistinfo" : function(){
		var url = g360.root_path + "/artistinfo_read.mon";
		url += "?" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
		
				var txt = data.content;
				var txt2 = data.content2;
			//txt = txt.replace("\n","<br>");
				var html = "";
				
				html += "<div class='group_header type3 fixheight_m'>";
				html += "<h3>"+g360.g_lang.About_Me+"</h3>";
				html += "	<a id='artistinfo_edit' onclick=\'gPPF.edit_artistinfo()\' class='btn btn_violet btn_edit' style='color:white'>"+g360.g_lang.Edit+"</a>";
				html += "</div>";
				
				
				if (typeof(txt) != "undefined"){
					txt = txt.replace(/(?:\r\n|\r|\n)/g, '<br />');
					
					html += "<div class='wrap_group introduce term bg_white minheight'>";
					html += "<p>"+txt+"</p>";
					html += "</div>";
				}
				
				
				var gubun = g360.UserInfo.gubun;
				if (gubun != "curator"){
					html += "<div class='group_header type3 fixheight_m'>";
					html += "<h3>"+g360.g_lang.ArtistNote+"</h3>";
					html += "</div>";
					
					if (typeof(txt2) != "undefined"){
						txt2 = txt2.replace(/(?:\r\n|\r|\n)/g, '<br />');
						

						html += "<div class='wrap_group introduce term bg_white minheight'>";
						html += "<p>"+txt2+"</p>";
						html += "</div>";
					}
					
				}

				
				
				
				
			
				$("#artistinfo_section").html(html);
			//	$("#profile_dis").html(html);
				return false;

			},
			error : function(e){
				g360.error_alert();
			}
		})
		
		
	
	},
	
	
	"edit_artistinfo" : function(){
		debugger;
		var html = "";
		
		html += "<div class='group_header type3 fixheight_m'>";
		html += "	<h3>"+g360.g_lang.About_Me+"</h3>";
		html += "</div>";
		html += "<div class='wrap_group introduce term bg_white minheight'>";
		html += "	<textarea class='txt textarea' id='artistinfo_txt' placeholder='"+g360.g_lang.ProfileSetting_2+"'></textarea>";
		html += "</div>";
		
		var gubun = g360.UserInfo.gubun;
		if (gubun != "curator"){
			html += "<div class='group_header type3 fixheight_m'>";
			html += "	<h3>"+g360.g_lang.ArtistNote+"</h3>";
			html += "</div>";
			html += "<div class='wrap_group introduce term bg_white minheight'>";
			html += "	<textarea class='txt textarea' id='artistinfo_txt2' placeholder='"+g360.g_lang.ProfileSetting_3+"'></textarea>";
			
		}
		
		
		//	html += "	<span>5000자 미만</span>";
		html += "	<div class='btn_area bottom_area'>";
		html += "		<button class='btn btn_gray btn_cancel' onclick=\'gPPF.edit_cancel()\'>"+g360.g_lang.Cancel+"</button>";
		html += "		<button class='btn btn_violet btn_ok'  onclick=\'gPPF.save_artist_info()\'>"+g360.g_lang.OK2+"</button>";
		html += "	</div>";
		
		
	
		$("#artistinfo_section").html(html);
		
			
		var url = g360.root_path + "/artistinfo_read.mon";
		url += "?" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				var txt = data.result;
							
				$("#artistinfo_txt").html(data.content);
				$("#artistinfo_txt2").html(data.content2);
				return false;

			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"edit_cancel" : function(){
		
		gPPF.read_artistinfo();
		return false;
	},
	
	"save_artist_info" : function(){
		var content = $("#artistinfo_txt").val();
		var content2 = $("#artistinfo_txt2").val();
		
		var data = JSON.stringify({
			content : content,
			content2 : content2
		});
				
		var url = g360.root_path + "/artistinfo_save.mon";
		$.ajax({
			type : "Post",
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				
				if (data.result == "OK"){
					gPPF.read_artistinfo();
				}else{
					g360.error_alert();
				}			
				
				return false;

			},
			error : function(e){
				g360.error_alert();
			}
		})
		
	},
	
	"load_skill_data_to_userinfo" : function(){
		//작사 보유기술을 조회모드로 호출한다.
		var url = g360.root_path + "/search_userinfo.mon?id="+gPPF.cUserEmail;
		url += "?" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contenttype : "application/json; charset=utf-8",
			url : url,
			async : false,
			success : function(data){
			
				var res = data.skill;
				gPPF.skill_list = res;
				
				gPPF.load_skill_data(data);
				
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"save_skill" : function(){
		
		var obj = $(".t_skill_edit.t_edit.t_block tbody tr td input");
		var len = obj.length;
		var list = "";
		for (var i = 1 ; i <= len; i++){
			var title = $("#skill_title_" + i).val();
			if (title == ""){
				g360.gAlert("Info",g360.g_lang.ProfileSetting_4, "blue", "top");
				return false;
			}
			var level = $("#txt_input_set_" + i).text().replace(/\t/g, '');
			if (level == "선택"){
				g360.gAlert("Info",g360.g_lang.ProfileSetting_5, "blue", "top");
				return false;
			}
			var career = $("#txt_input_year_" + i).text().replace(/\t/g, '');
			if (career == "선택"){
				g360.gAlert("Info",g360.g_lang.ProfileSetting_6, "blue", "top");
				return false;
			}
			
			if (list == ""){
				list = title + "-spl-" + level + "-spl-" + career;
			}else{
				list = list + "-=spl=-" + title + "-spl-" + level + "-spl-" + career;
			}
		}
		var data = JSON.stringify({
			content : list
		});
		var url = g360.root_path + "/artist_skill_save.mon";
		$.ajax({
			type : "POST",
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				if (data.result == "OK"){
					//저장된 데이터를 불러와서 다시 조회 모드로 변경한다.
					gPPF.load_skill_data_to_userinfo();
				}else{
					g360.error_alert();
				}
			},
			error : function(e){
				g360.error_alert();
			}
		})
				
	},
	
	"load_skill_data" : function(data){
	
		var html = "";
		html += "<div class='group_header type3 fixheight_m'>";
		html += "<h3>"+g360.g_lang.Technology+"</h3>";
		html += "	<a class='btn btn_violet btn_edit' style='color:white' onclick=\'gPPF.skill_edit()\'>"+g360.g_lang.Edit+"</a>";
		html += "</div>";
		html += "<div class='wrap_group table_area term' style='padding-bottom:70px'>";
		html += "<div class='round_table'>";
		html += "	<table class='t_skill'>";
		html += "		<thead>";
		html += "			<tr>";
		html += "				<th>"+g360.g_lang.Field+"</th>";
		html += "				<th>"+g360.g_lang.Skill_level+"</th>";
		html += "				<th>"+g360.g_lang.Career+"</th>";
		html += "			</tr>";
		html += "		</thead>";
		html += "		<tbody id='skill_list_display'>";
		
	//	var res = data.skill;
	//	gPPF.skill_list = res;
		
		var res = gPPF.skill_list;
		if (typeof (res) != "undefined"){
			for (var i =0 ; i < res.length; i++){
				var subdata = res[i];
				html += "			<tr>";
				html += "				<td>"+subdata.title+"</td>";
				html += "				<td>"+subdata.level+"</td>";
				html += "				<td>"+subdata.career+"</td>";
				html += "			</tr>";
			}
		}	
		
		html += "		</tbody>";
		html += "	</table>";
		html += "	</div>";
		html += "</div>";
		
		$("#skill_section").html(html);
		
	},
	
	"skill_edit" : function(){
		
		//var res = gPPF.load_skill_data_to_userinfo();
		
		var html = "";
		html += "<div class='group_header type3 fixheight_m'>";
		html += "	<h3>"+g360.g_lang.Technology+"</h3>";
		html += "</div>";
		html += "<div class='wrap_group table_area term' style='padding-bottom:70px'>";
		html += "	<div class='round_table'>";
		html += "		<table class='t_skill_edit t_edit t_block'>";
		html += "			<thead>";
		html += "				<tr>";
		html += "					<th>"+g360.g_lang.Field+"</th>";
		html += "					<th>"+g360.g_lang.Skill_level+"</th>";
		html += "					<th>"+g360.g_lang.Career+"</th>";
		html += "					<th class='t_delete'></th>";
		html += "				</tr>";
		html += "			</thead>";
		
		
		html += "			<tbody id='skill_edit_list_dis'>";
		
		var obj = gPPF.skill_list;	
		if (typeof (obj) != "undefined"){
			for (var i = 0 ; i < obj.length; i++){
				var subobj = obj[i];
				
				html += "				<tr id='skill_"+(i+1)+"'>";
				html += "					<td><input type='text' value='" + subobj.title + "' id='skill_title_"+(i+1)+"' class='txt' /></td>";
				html += "					<td>";
				html += "						<div class='btn-group'>";
				html += "							<button class='bg-transparent border-0 dropdown-toggle' id='txt_input_set_"+(i+1)+"' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
				html += "							"+subobj.level+"";
				html += "							</button>";
				html += "							<div class='dropdown-menu'>";
				html += "								<a class='dropdown-item' onclick=\"gPPF.set_val(\'"+g360.g_lang.Beginner+"\', \'txt_input_set_"+(i+1)+"\')\">"+g360.g_lang.Beginner+"</a>";
				html += "								<a class='dropdown-item' onclick=\"gPPF.set_val(\'"+g360.g_lang.Intermediate+"\', \'txt_input_set_"+(i+1)+"\')\">"+g360.g_lang.Intermediate+"</a>";
				html += "								<a class='dropdown-item' onclick=\"gPPF.set_val(\'"+g360.g_lang.Advanced+"\', \'txt_input_set_"+(i+1)+"\')\">"+g360.g_lang.Advanced+"</a>";
				html += "							</div>";
				html += "						</div>";
				html += "					</td>";
				html += "					<td>";
				html += "						<div class='btn-group'>";
				html += "							<button class='bg-transparent border-0 dropdown-toggle' id='txt_input_year_"+(i+1)+"' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
				html += "							"+subobj.career+"";
				html += "							</button>";
				html += "							<div class='dropdown-menu'>";
				html += "								<a class='dropdown-item' onclick=\"gPPF.set_val(\'"+g360.g_lang.ProfileSetting_7+"\', \'txt_input_year_"+(i+1)+"\')\">"+g360.g_lang.ProfileSetting_7+"</a>";
				html += "								<a class='dropdown-item' onclick=\"gPPF.set_val(\'"+g360.g_lang.ProfileSetting_8+"\', \'txt_input_year_"+(i+1)+"\')\">"+g360.g_lang.ProfileSetting_8+"</a>";
				html += "								<a class='dropdown-item' onclick=\"gPPF.set_val(\'"+g360.g_lang.ProfileSetting_9+"\', \'txt_input_year_"+(i+1)+"\')\">"+g360.g_lang.ProfileSetting_9+"</a>";
				html += "								<a class='dropdown-item' onclick=\"gPPF.set_val(\'"+g360.g_lang.ProfileSetting_10+"\', \'txt_input_year_"+(i+1)+"\')\">"+g360.g_lang.ProfileSetting_10+"</a>";
				html += "							</div>";
				html += "						</div>";
				html += "					</td>";
				html += "					<td class='t_delete'><button class='btn btn_cell_delete'  onclick=\'gPPF.row_delete("+(i+1)+")\'>삭제</button></td>";
				html += "				</tr>";
			}
		}else{
			html += "				<tr id='skill_1'>";
			html += "					<td><input type='text'  id='skill_title_1' class='txt' /></td>";
			html += "					<td>";
			html += "						<div class='btn-group'>";
			html += "							<button class='bg-transparent border-0 dropdown-toggle' id='txt_input_set_1' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
			html += 								g360.g_lang.Choice;
			html += "							</button>";
			html += "							<div class='dropdown-menu'>";
			html += "								<a class='dropdown-item' onclick=\"gPPF.set_val(\'"+g360.g_lang.Beginner+"\', \'txt_input_set_1\')\">"+g360.g_lang.Beginner+"</a>";
			html += "								<a class='dropdown-item' onclick=\"gPPF.set_val(\'"+g360.g_lang.Intermediate+"\', \'txt_input_set_1\')\">"+g360.g_lang.Intermediate+"</a>";
			html += "								<a class='dropdown-item' onclick=\"gPPF.set_val(\'"+g360.g_lang.Advanced+"\', \'txt_input_set_1\')\">"+g360.g_lang.Advanced+"</a>";
			html += "							</div>";
			html += "						</div>";
			html += "					</td>";
			html += "					<td>";
			html += "						<div class='btn-group'>";
			html += "							<button class='bg-transparent border-0 dropdown-toggle' id='txt_input_year_1' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
			html += 								g360.g_lang.Choice;
			html += "							</button>";
			html += "							<div class='dropdown-menu'>";
			html += "								<a class='dropdown-item' onclick=\"gPPF.set_val(\'"+g360.g_lang.ProfileSetting_7+"\', \'txt_input_year_1\')\">"+g360.g_lang.ProfileSetting_7+"</a>";
			html += "								<a class='dropdown-item' onclick=\"gPPF.set_val(\'"+g360.g_lang.ProfileSetting_8+"\', \'txt_input_year_1\')\">"+g360.g_lang.ProfileSetting_8+"</a>";
			html += "								<a class='dropdown-item' onclick=\"gPPF.set_val(\'"+g360.g_lang.ProfileSetting_9+"\', \'txt_input_year_1\')\">"+g360.g_lang.ProfileSetting_9+"</a>";
			html += "								<a class='dropdown-item' onclick=\"gPPF.set_val(\'"+g360.g_lang.ProfileSetting_10+"\', \'txt_input_year_1\')\">"+g360.g_lang.ProfileSetting_10+"</a>";
			html += "							</div>";
			html += "						</div>";
			html += "					</td>";
			html += "					<td class='t_delete'><button class='btn btn_cell_delete'  onclick=\'gPPF.row_delete(1)\'>삭제</button></td>";
			html += "				</tr>";
		}
		
		
		
		html += "			</tbody>";
		
		html += "		</table>";
		html += "	</div>";
		html += "	<div class='btn_area bottom_area'>";
		html += "		<button class='btn btn_violet btn_cell_add' onclick=\'gPPF.add_skill_data();\'>"+g360.g_lang.Add+"</button>";
		html += "		<button class='btn btn_gray btn_cancel' onclick=\'gPPF.load_skill_data();\'>"+g360.g_lang.Cancel+"</button>";
		html += "		<button class='btn btn_violet btn_ok' onclick=\'gPPF.save_skill();\'>"+g360.g_lang.OK2+"</button>";
		html += "	</div>";
		html += "</div>";
		
		$("#skill_section").html(html);


	},
	
	"add_skill_data" : function(){
	
		var obj = $(".t_skill_edit.t_edit.t_block tbody tr td input");
		var i = obj.length + 1;
		var html = "";
		
		html += "				<tr id='skill_"+i+"'>";
		html += "					<td><input type='text' id='skill_title_"+ i+"' class='txt' /></td>";
		html += "					<td>";
		html += "						<div class='btn-group'>";
		html += "							<button class='bg-transparent border-0 dropdown-toggle' id='txt_input_set_"+i+"' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
		html += 								g360.g_lang.Choice;
		html += "							</button>";
		html += "							<div class='dropdown-menu'>";
		html += "								<a class='dropdown-item' onclick=\"gPPF.set_val(\'"+g360.g_lang.Beginner+"\', \'txt_input_set_"+i+"\')\">"+g360.g_lang.Beginner+"</a>";
		html += "								<a class='dropdown-item' onclick=\"gPPF.set_val(\'"+g360.g_lang.Intermediate+"\', \'txt_input_set_"+i+"\')\">"+g360.g_lang.Intermediate+"</a>";
		html += "								<a class='dropdown-item' onclick=\"gPPF.set_val(\'"+g360.g_lang.Advanced+"\', \'txt_input_set_"+i+"\')\">"+g360.g_lang.Advanced+"</a>";
		html += "							</div>";
		html += "						</div>";
		html += "					</td>";
		html += "					<td>";
		html += "						<div class='btn-group'>";
		html += "							<button class='bg-transparent border-0 dropdown-toggle' id='txt_input_year_"+i+"' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
		html += 								g360.g_lang.Choice;
		html += "							</button>";
		html += "							<div class='dropdown-menu'>";
		html += "								<a class='dropdown-item' onclick=\"gPPF.set_val(\'"+g360.g_lang.ProfileSetting_7+"\', \'txt_input_year_"+i+"\')\">"+g360.g_lang.ProfileSetting_7+"</a>";
		html += "								<a class='dropdown-item' onclick=\"gPPF.set_val(\'"+g360.g_lang.ProfileSetting_8+"\', \'txt_input_year_"+i+"\')\">"+g360.g_lang.ProfileSetting_8+"</a>";
		html += "								<a class='dropdown-item' onclick=\"gPPF.set_val(\'"+g360.g_lang.ProfileSetting_9+"\', \'txt_input_year_"+i+"\')\">"+g360.g_lang.ProfileSetting_9+"</a>";
		html += "								<a class='dropdown-item' onclick=\"gPPF.set_val(\'"+g360.g_lang.ProfileSetting_10+"\', \'txt_input_year_"+i+"\')\">"+g360.g_lang.ProfileSetting_10+"</a>";
		html += "							</div>";
		html += "						</div>";
		html += "					</td>";
		html += "					<td class='t_delete'><button class='btn btn_cell_delete' onclick=\'gPPF.row_delete('"+i+"')\'>"+g360.g_lang.Delete+"</button></td>";
		html += "				</tr>";
		
		
		$("#skill_edit_list_dis").append(html);
	},
	
	"set_val" : function(opt, id){
	
		$("#"+id).text(opt);
	},
	
	"row_delete" : function(bun){
		$("#skill_" + bun).remove();
	},
	

	"load_career_list" : function(){
		
		var url = g360.root_path + "/search_userinfo.mon?id="+gPPF.cUserEmail;
	
		$.ajax({
			type : "GET",
			dataType : "json",
			cache : false,
			contenttype : "application/json; charset=utf-8",
			url : url,
			async : false,
			success : function(data){
				
				gPPF.group_list = data.group;
				gPPF.education_list = data.education;
				gPPF.career_list = data.career;
				gPPF.cert_list = data.cert;
				gPPF.display_list = data.display;
				
				gPPF.load_career_list_draw();
				
				
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"us_to_ko" : function(res){
		var ko;
		
		if(res==g360.g_lang.PhD){
			ko = "박사";
		}else if(res==g360.g_lang.Master){
			ko = "석사";
		}else if(res==g360.g_lang.Bachelor){
			ko = "학사";
		}else if(res==g360.g_lang.Etc){
			ko = "기타";
		}
		
		if(res==g360.g_lang.Graduation){
			ko = "졸업";
		}else if(res==g360.g_lang.Dropout){
			ko = "중퇴";
		}else if(res==g360.g_lang.Undergraduate){
			ko = "재학";
		}else if(res==g360.g_lang.Completion){
			ko = "수료";
		}

		return ko;
	},
	
	"ko_to_us" : function(res){
		var us;
		
		if(res=="박사"){
			us = g360.g_lang.PhD;
		}else if(res=="석사"){
			us = g360.g_lang.Master;
		}else if(res=="학사"){
			us = g360.g_lang.Bachelor;
		}else if(res=="기타"){
			us = g360.g_lang.Etc;
		}
		
		if(res=="졸업"){
			us = g360.g_lang.Graduation;
		}else if(res=="중퇴"){
			us = g360.g_lang.Dropout;
		}else if(res=="재학"){
			us = g360.g_lang.Undergraduate;
		}else if(res=="수료"){
			us = g360.g_lang.Completion;
		}

		return us;
	},
	
	"load_career_list_draw" : function(){
		
		
		var html = gPPF.draw_career_info();		
		
		$("#career_list").html(html);
		
//		$("#xedu").tableDnD({
//			onDragClass : "myDragClass"
//		});
		
	},
	
	
	"draw_career_info" : function(){
		var html = "";
		
		//html += "<div class='group_section'>";
		html += "	<div class='group_section'>";
		html += "	<div class='group_header type3 fixheight_m'>";
		html += "		<h3>"+g360.g_lang.Group+"</h3>";
		html += "		<a class='btn btn_violet btn_edit' style='color:white' onclick=\"gPPF.edit_group()\">"+g360.g_lang.Edit+"</a>";
		html += "	</div>";
		html += "	<div class='wrap_group table_area term' id='career_edit1' >";		
		

		html += "		<div class='round_table'>";
		html += "			<table class='t_team t_float'>";
		html += "				<thead>";
		html += "					<tr>";
		html += "						<th>"+g360.g_lang.Affiliation_Organization+"</th>";
		html += "						<th>"+g360.g_lang.Department+"</th>";
		html += "						<th>"+g360.g_lang.Position+"</th>";
		html += "					</tr>";
		html += "				</thead>";
		html += "				<tbody>";
				
				
		if ( (typeof (gPPF.group_list) != "undefined") && gPPF.group_list.length > 0){
			for (var i = 0 ; i < gPPF.group_list.length; i++){
				var sp = gPPF.group_list[i];
		
		html += "					<tr>";
		html += "						<td>"+sp.title+"</td>";
		html += "						<td>"+sp.dept+"</td>";
		html += "						<td>"+sp.jobtitle+"</td>";
		html += "					</tr>";
		
			}
			
		}
				
		html += "				</tbody>";
		html += "			</table>";
		html += "		</div>";

				
		html += " 	</div>";
		html += "</div>";
		
		
		html += "<div class='group_section'>";
		html += "	<div class='group_header type3 fixheight_m'>";
		html += "		<h3>"+g360.g_lang.Educational_Info+"</h3>";
		html += "		<a  class='btn btn_violet btn_edit' style='color:white' onclick=\"gPPF.edit_education()\">"+g360.g_lang.Edit+"</a>";
		html += "	</div>";
		html += "	<div class='wrap_group table_area term' id='career_edit2'>";
		
	//	if ( (typeof (gPPF.education_list) != "undefined") && gPPF.education_list.length > 0){
			html += "		<div class='round_table'>";
			html += "			<table class='t_education t_float' id='xedu'>";
			html += "				<thead>";
			html += "					<tr>";
			html += "						<th>"+g360.g_lang.School+"</th>";
			html += "						<th>"+g360.g_lang.Major+"</th>";
		//	html += "						<th>분류</th>";
			html += "						<th>"+g360.g_lang.Status+"</th>";
			html += "						<th>"+g360.g_lang.Admission_date+"</th>";
			html += "						<th>"+g360.g_lang.Graduation_date+"</th>";
			html += "						<th class='t_modify2' style='display:none'></th>";
			html += "						<th class='t_delete2' style='display:none'></th>";
			html += "					</tr>";
			html += "				</thead>";
			html += "				<tbody id='edu_tbody'>";
			
			if ( (typeof (gPPF.education_list) != "undefined") && gPPF.education_list.length > 0){
				for (var i = 0 ; i < gPPF.education_list.length; i++){
					
					var sp = gPPF.education_list[i];
					
					if (typeof(sp.schoolname) != "undefined"){
						
						var level1 = gPPF.ko_to_us(sp.level);
						var status1 = gPPF.ko_to_us(sp.status);

						html += "					<tr id='edu_tr_"+i+"'>";
						html += "						<td id='edu_level_"+i+"' style='display:none'>"+level1+"</td>";
						html += "						<td id='edu_schoolname_"+i+"'>"+sp.schoolname+"</td>";
						html += "						<td id='edu_major_"+i+"'>"+sp.major+"</td>";
				//		html += "						<td id='edu_level_"+i+"'>"+sp.level+"</td>";
						
						html += "						<td id='edu_status_"+i+"'>"+status1+"</td>";
						html += "						<td id='edu_start_"+i+"'>"+sp.start+"</td>";
						html += "						<td id='edu_end_"+i+"'>"+sp.end+"</td>";
						
					//	html += "						<td  id='ed3' class='t_modify' style='display:none'><button class='btn btn_cell_edit'  onclick=\"gPPF.edu_tr_edit('edu_tr_"+i+"')\">수정</button></td>";
					//	html += "						<td  id='ed4' class='t_delete' style='display:none'><button class='btn btn_cell_delete'  onclick=\"gPPF.edu_tr_delete('edu_tr_"+i+"')\">삭제</button></td>";		
						
						html += "						<td  class='t_modify2' style='display:none; border-botom : 1px solid #e0e0e0'><button class='btn btn_cell_edit'  onclick=\"gPPF.edu_tr_edit('edu_tr_"+i+"')\">"+g360.g_lang.Update+"</button></td>";
						html += "						<td  class='t_delete2' style='display:none; border-botom : 1px solid #e0e0e0'><button class='btn btn_cell_delete'  onclick=\"gPPF.edu_tr_delete('edu_tr_"+i+"')\">"+g360.g_lang.Delete+"</button></td>";		
						
						
						html += "					</tr>";
					}

				}
				
			}					
			html += "				</tbody>";
			html += "			</table>";
			html += "		</div>";
	//	}		

		html += "	</div>";
		html += "</div>";
		
		
		html += "<div class='group_section'>";
		html += "	<div class='group_header type3 fixheight_m'>";
		html += "		<h3>"+g360.g_lang.ProfileSetting_11+"</h3>";
		html += "		<a  class='btn btn_violet btn_edit' style='color:white' onclick=\"gPPF.edit_career()\">"+g360.g_lang.Edit+"</a>";
		html += "	</div>";
		html += "	<div class='wrap_group table_area term' id='career_edit3'>";
		
	//	if ( (typeof (gPPF.career_list) != "undefined") && gPPF.career_list.length > 0){
			html += "		<div class='round_table'>";
			html += "			<table class='t_career' id='xcareer'>";
			html += "				<thead>";
			html += "					<tr>";
			html += "						<th>"+g360.g_lang.Period+"</th>";
			html += "						<th>"+g360.g_lang.Details+"</th>";
			html += "					</tr>";
			html += "				</thead>";
			html += "				<tbody>";
		    
			
			if ( (typeof (gPPF.career_list) != "undefined") && gPPF.career_list.length > 0){
				for (var i = 0 ; i < gPPF.career_list.length; i++){
					var sp = gPPF.career_list[i];
			
			html += "					<tr>";
			html += "						<td>"+sp.term+"</td>";
			html += "						<td>"+sp.title+"</td>";
			html += "					</tr>";
			
				}
				
			}	
			
			html += "				</tbody>";
			html += "			</table>";
			html += "		</div>";
	//	}
		
		
		
		html += "	</div>";
		html += "</div>";
		
		
		html += "<div class='group_section'>";
		html += "	<div class='group_header type3 fixheight_m'>";
		html += "		<h3>"+g360.g_lang.ProfileSetting_12+"</h3>";
		html += "		<a class='btn btn_violet btn_edit' style='color:white' onclick=\"gPPF.edit_cert()\">"+g360.g_lang.Edit+"</a>";
		html += "	</div>";
		html += "	<div class='wrap_group table_area term' id='career_edit4'>";
		
	//	if ( (typeof (gPPF.cert_list) != "undefined") && gPPF.cert_list.length > 0){
			html += "		<div class='round_table'>";
			html += "			<table class='t_certificate t_float'>";
			html += "				<thead>";
			html += "					<tr>";
			html += "						<th>"+g360.g_lang.Collection_Artswork+"</th>";
		//	html += "						<th>발행처</th>";
		//	html += "						<th>취득일자</th>";
			html += "					</tr>";
			html += "				</thead>";
			html += "				<tbody>";		
			
			if ( (typeof (gPPF.cert_list) != "undefined") && gPPF.cert_list.length > 0){
				for (var i = 0 ; i < gPPF.cert_list.length; i++){
					var sp = gPPF.cert_list[i];
			
			html += "					<tr>";
			html += "						<td>"+sp.certname+"</td>";
		//	html += "						<td>"+sp.publisher+"</td>";
		//	html += "						<td>"+sp.date+"</td>";
			html += "					</tr>";			
				}				
			}				
			
			html += "				</tbody>";
			html += "			</table>";
			html += "		</div>";
	//	}
				
		
		html += "	</div>";
		html += "</div>";
		
		
		
		
		
		html += "<div class='group_section'>";
		html += "	<div class='group_header type3 fixheight_m'>";
		html += "		<h3>"+g360.g_lang.Exhibit_Project_1+"</h3>";
		html += "		<a  class='btn btn_violet btn_edit' style='color:white' onclick=\"gPPF.edit_display()\">"+g360.g_lang.Edit+"</a>";
		html += "	</div>";
		html += "	<div class='wrap_group table_area term' id='career_edit5'>";
		
	//	if ( (typeof (gPPF.career_list) != "undefined") && gPPF.career_list.length > 0){
			html += "		<div class='round_table'>";
			html += "			<table class='t_career'>";
			html += "				<thead>";
			html += "					<tr>";
			html += "						<th>"+g360.g_lang.Period+"</th>";
			html += "						<th>"+g360.g_lang.Exhibit_Project_2+"</th>";
			html += "					</tr>";
			html += "				</thead>";
			html += "				<tbody>";
		
			
			if ( (typeof (gPPF.display_list) != "undefined") && gPPF.display_list.length > 0){
				for (var i = 0 ; i < gPPF.display_list.length; i++){
					var sp = gPPF.display_list[i];
			
			html += "					<tr>";
			html += "						<td>"+sp.term+"</td>";
			html += "						<td>"+sp.title+"</td>";
			html += "					</tr>";
			
				}
				
			}	
			
			html += "				</tbody>";
			html += "			</table>";
			html += "		</div>";
	//	}
		
		
		
		html += "	</div>";
		//html += "</div>";
		
		return html;
	},
	
	
	
	
	"delete_id" : function(id){
		$("#" + id).remove();
		
	},
	
	///////////////////////////////////////////// Group Setting ///////////////////////////////////////////////////////////////////////
	
	"edit_group" : function(){
		var html = "";
		
		html += "<div class='round_table'>";
		html += "	<table class='t_team_edit t_edit t_block' id='profile_education'>";
		html += "		<thead>";
		html += "			<tr>";
		html += "				<th>"+g360.g_lang.Affiliation_Organization+"</th>";
		html += "				<th>"+g360.g_lang.Department+"</th>";
		html += "				<th>"+g360.g_lang.Position+"</th>";
		html += "				<th class='t_delete'></th>";
		html += "			</tr>";
		html += "		</thead>";
		html += "		<tbody id='group_tbody'>";
		
			
		if (typeof (gPPF.group_list) == "undefined"){
			html += "			<tr id='group_1'>";
			html += "				<td><input type='text' id='group_title_1' class='txt' /></td>";
			html += "				<td><input type='text' id='group_dept_1' class='txt' /></td>";
			html += "				<td><input type='text' id='group_jobtitle_1' class='txt' /></td>";
			html += "				<td class='t_delete'><button class='btn btn_cell_delete' onclick=\"gPPF.delete_id('group_1')\">"+g360.g_lang.Delete+"</button></td>";
			html += "			</tr>";
		}else{
			
			for (var i = 0 ; i < gPPF.group_list.length; i++){
				var dat = gPPF.group_list[i];
				html += "			<tr id='group_"+(i+1)+"'>";
				html += "				<td><input type='text' value='"+dat.title+"' id='group_title_"+(i+1)+"' class='txt' /></td>";
				html += "				<td><input type='text' value='"+dat.dept+"'  id='group_dept_"+(i+1)+"' class='txt' /></td>";
				html += "				<td><input type='text' value='"+dat.jobtitle+"'  id='group_jobtitle_"+(i+1)+"' class='txt' /></td>";
				html += "				<td class='t_delete'><button class='btn btn_cell_delete' onclick=\"gPPF.delete_id('group_"+(i+1)+"')\">"+g360.g_lang.Delete+"</button></td>";
				html += "			</tr>";
			}	
		}			
			
		
		html += "		</tbody>";
		html += "	</table>";
		html += "</div>";
		
		html += "<div class='btn_area bottom_area'>";
		html += "	<button class='btn btn_violet btn_cell_add' onclick=\'gPPF.add_group();\'>"+g360.g_lang.Add+"</button>";
		html += "	<button class='btn btn_gray btn_cancel' onclick=\'gPPF.load_career_list();\'>"+g360.g_lang.Cancel+"</button>";
		html += "	<button class='btn btn_violet btn_ok' onclick=\'gPPF.save_group();\'>"+g360.g_lang.OK2+"</button>";
		html += "</div>";
		
		
		$("#career_edit1").html(html);
	},
	
	
	"save_group" : function(){
		
		
			var obj = $("#group_tbody tr");
			var len = obj.length;
			var list = "";
			
			$("#group_tbody tr").each(function(index){
				var i = this.id.replace("group_","");
				var title = $("#group_title_" + i).val();
				if (title == ""){
					
					g360.gAlert("Info",g360.g_lang.ProfileSetting_13, "blue", "top");
					return false;
				}
				var dept = $("#group_dept_" + i).val();
				if (dept == ""){
					
					g360.gAlert("Info",g360.g_lang.ProfileSetting_14, "blue", "top");
					return false;
				}
				var jobtitle = $("#group_jobtitle_" + i).val();
				if (jobtitle == ""){
									
					g360.gAlert("Info",g360.g_lang.ProfileSetting_15, "blue", "top");
					return false;
				}
				
				if (list == ""){
					list = title + "-spl-" + dept + "-spl-" + jobtitle;
				}else{
					list = list + "-=spl=-" + title + "-spl-" + dept + "-spl-" + jobtitle;
				}
			});
			

			var data = JSON.stringify({
				email : gPPF.cUserEmail,
				content : list
			});
			var url = g360.root_path + "/artist_group_save.mon";
			$.ajax({
				type : "POST",
				data : data,
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(data){
					if (data.result == "OK"){
						//저장된 데이터를 불러와서 다시 조회 모드로 변경한다.
						if (gPPF.cUserEmail != ""){
							gPPF.load_career_list_artist("open", gPPF.cUserEmail);
						}else{
							gPPF.load_career_list();
						}
					
					}else{
						g360.error_alert();
					}
				},
				error : function(e){
					g360.error_alert();
				}
			})
					
	},
		
	"add_group" : function(){
		var obj = $("#group_tbody tr");
		
		var i = obj.length + 1;
		
		var html = "";
		html += "			<tr id='group_"+i+"'>";
		html += "				<td><input type='text'  id='group_title_"+i+"' class='txt' /></td>";
		html += "				<td><input type='text'  id='group_dept_"+i+"' class='txt' /></td>";
		html += "				<td><input type='text'  id='group_jobtitle_"+i+"' class='txt' /></td>";
		html += "				<td class='t_delete'><button class='btn btn_cell_delete' onclick=\"gPPF.delete_id('group_"+i+"')\">"+g360.g_lang.Delete+"</button></td>";
		html += "			</tr>";
		
		$("#group_tbody").append(html);
	},

	///////////////////////////////////////////// Group Setting  END///////////////////////////////////////////////////////////////////////	
		
	
	
	
	
	///////////////////////////////////////////// education Setting ///////////////////////////////////////////////////////////////////////
	
	"edit_education" : function(){
		var html = "";
	
		$("th.t_modify2").each(function(index){
			$(this).show();
		});
		
		$("th.t_delete2").each(function(index){
			$(this).show();
		});
		
		$("td.t_modify2").each(function(index){
			$(this).show();
		});
		
		$("td.t_delete2").each(function(index){
			$(this).show();
		});
		
//		for (var i =1 ; i < 5; i++){
//			$("#ed" + i).show();
//		}
		
		$("#edu_dis").remove();
		$("#edu_edit").remove();
//		$("#edu_dis").show();
		
		html += "<div class='wrap_group term' id='edu_dis'>";
		html += "	<table class='t_education_edit t_block'>";
		html += "		<colgroup>";
		html += "			<col class='t_th' />";
		html += "			<col />";
		html += "			<col class='t_th' />";
		html += "			<col />";
		html += "		</colgroup>";
		html += "		<tbody>";
		html += "			<tr>";
		html += "				<th>"+g360.g_lang.Type1+"</th>";
		html += "				<td>";
		html += "					<div class='btn-group'>";
		html += "					<button class='bg-transparent border-0 dropdown-toggle' id='education_level' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
		html += 						g360.g_lang.PhD;
		html += "					</button>";
		html += "						<div class='dropdown-menu'>";
		html += "							<a class='dropdown-item' onclick=\"gPPF.group_change('"+g360.g_lang.PhD+"','education_level');\">"+g360.g_lang.PhD+"</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF.group_change('"+g360.g_lang.Master+"','education_level');\">"+g360.g_lang.Master+"</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF.group_change('"+g360.g_lang.Bachelor+"','education_level');\">"+g360.g_lang.Bachelor+"</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF.group_change('"+g360.g_lang.Etc+"','education_level');\">"+g360.g_lang.Etc+"</a>";
		html += "						</div>";
		html += "					</div>";
		html += "				</td>";
		html += "				<th>"+g360.g_lang.Status+"</th>";
		html += "				<td>";
		html += "					<div class='btn-group'>";
		html += "					<button class='bg-transparent border-0 dropdown-toggle' id='education_status' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
		html += 						g360.g_lang.Graduation;
		html += "					</button>";
		html += "						<div class='dropdown-menu'>";
		html += "							<a class='dropdown-item' onclick=\"gPPF.group_change('"+g360.g_lang.Graduation+"','education_status');\">"+g360.g_lang.Graduation+"</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF.group_change('"+g360.g_lang.Dropout+"','education_status');\">"+g360.g_lang.Dropout+"</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF.group_change('"+g360.g_lang.Undergraduate+"','education_status');\">"+g360.g_lang.Undergraduate+"</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF.group_change('"+g360.g_lang.Completion+"','education_status');\">"+g360.g_lang.Completion+"</a>";
		html += "						</div>";
		html += "					</div>";
		html += "				</td>";
		html += "			</tr>";
		html += "			<tr>";
		html += "				<th>"+g360.g_lang.School+"</th>";
		html += "					<td><input type='text' class='txt' id='education_schoolname'  /></td>";
		html += "				<th>"+g360.g_lang.Major+"</th>";
		html += "					<td><input type='text' class='txt' id='education_major'  /></td>";
		html += "			</tr>";
		html += "			<tr>";
		html += "				<th>"+g360.g_lang.Start1+"</th>";
		html += "					<td><input type='text' class='txt' id='education_start'  placeholder='2010.09' /></td>";
		html += "				<th>"+g360.g_lang.End1+"</th>";
		html += "				<td><input type='text' class='txt' id='education_end' placeholder='2014.03' /></td>";
		
		html += "				</tr>";
		html += "		</tbody>";
		html += "	</table>";
		html += "	<div class='btn_area bottom_area'> <!-- 연필 아이콘 버튼 클릭 시 버튼 위치 변경되어야 함 -->";
		html += "			<button class='btn btn_gray btn_cancel' onclick=\'gPPF.load_career_list();\'>"+g360.g_lang.Cancel+"</button>";
		html += "			<button class='btn btn_violet btn_ok' onclick=\"gPPF.save_education('F');\">"+g360.g_lang.OK2+"</button>";
		html += "	</div>";
		html += "</div>";

				
		$("#career_edit2").append(html);
	},
	
	
	"save_education" : function(opt){
			
			//debugger;
			var obj = $("#edu_tbody tr");
			var len = obj.length;
			var list = "";
			for (var i = 0 ; i < len; i++){
				var data = obj[i];
				var edu_level = $("#edu_level_"+i).text();
				var edu_schoolname = $("#edu_schoolname_"+i).text();
				var edu_major = $("#edu_major_"+i).text();
				var edu_status = $("#edu_status_"+i).text();
				var edu_start = $("#edu_start_"+i).text();
				var edu_end = $("#edu_end_"+i).text();
				

				edu_level = gPPF.us_to_ko(edu_level);
				edu_status = gPPF.us_to_ko(edu_status);
				
				if (edu_start == ""){
					edu_start = " ";
				}
				if (edu_end == ""){
					edu_end = " ";
				}
				
				if (list == ""){
					list = edu_level + "-spl-" + edu_status + "-spl-" + edu_schoolname + "-spl-" + edu_major + "-spl-" + edu_start + "-spl-" + edu_end ;
				}else{
					list = list + "-=spl=-" + edu_level + "-spl-" + edu_status + "-spl-" + edu_schoolname + "-spl-" + edu_major + "-spl-" + edu_start + "-spl-" + edu_end ;
				}
			}			
			
			if (opt == "F"){
				var level = $("#education_level").text();
				var status = $("#education_status").text();
				var schoolname = $("#education_schoolname").val();
				var start = $("#education_start").val();
				var end = $("#education_end").val();
				
				level = gPPF.us_to_ko(level);
				status = gPPF.us_to_ko(status);
				
				if (schoolname == ""){
					
					g360.gAlert("Info", g360.g_lang.ProfileSetting_16, "blue", "top");
					return false;
				}
				var major = $("#education_major").val();
				if (major == ""){
					
					g360.gAlert("Info", g360.g_lang.ProfileSetting_17, "blue", "top");
					return false;
				}

				if (start == ""){
					start = " ";
				}
				if (end == ""){
					end = " ";
				}
				
				if (list == ""){
					list = $.trim(level) + "-spl-" + $.trim(status) + "-spl-" + schoolname + "-spl-" + major + "-spl-" + start + "-spl-" + end ;
				}else{
					list = list + "-=spl=-" + $.trim(level) + "-spl-" + $.trim(status) + "-spl-" + schoolname + "-spl-" + major + "-spl-" + start + "-spl-" + end ;
				}
			}
			
	
			var data = JSON.stringify({
				email : gPPF.cUserEmail,
				content : list
			});
			var url = g360.root_path + "/artist_education_save.mon";
			$.ajax({
				type : "POST",
				data : data,
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(data){
					if (data.result == "OK"){
						//저장된 데이터를 불러와서 다시 조회 모드로 변경한다.
						if (gPPF.cUserEmail != ""){
							gPPF.load_career_list_artist("open", gPPF.cUserEmail);
						}else{
							gPPF.load_career_list();
						}
						
					}else{
						g360.error_alert();
					}
				},
				error : function(e){
					g360.error_alert();
				}
			})
					
	},
		
	
	
	"edu_tr_delete" : function(id){
		
		$("#" + id).remove();
			
		var obj = $("#edu_tbody tr");
		var len = obj.length;
		var list = "";
		for (var i = 0 ; i < len; i++){
			var data = obj[i];
			var bb = data.id.replace("edu_tr_","");
			if ($("#edu_schoolname_"+bb).text() != ""){
				var edu_level = $("#edu_level_"+bb).text();
				var edu_schoolname = $("#edu_schoolname_"+bb).text();
				var edu_major = $("#edu_major_"+bb).text();
				var edu_status = $("#edu_status_"+bb).text();
				var edu_start = $("#edu_start_"+bb).text();
				var edu_end = $("#edu_end_"+bb).text();
				
				if (list == ""){
					list = edu_level + "-spl-" + edu_status + "-spl-" + edu_schoolname + "-spl-" + edu_major + "-spl-" + edu_start + "-spl-" + edu_end ;
				}else{
					list = list + "-=spl=-" + edu_level + "-spl-" + edu_status + "-spl-" + edu_schoolname + "-spl-" + edu_major + "-spl-" + edu_start + "-spl-" + edu_end ;
				}
			}		
		}
	
		var data = JSON.stringify({
			email : gPPF.cUserEmail,
			content : list
		});
		var url = g360.root_path + "/artist_education_save.mon";
		$.ajax({
			type : "POST",
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				if (data.result == "OK"){
					//저장된 데이터를 불러와서 다시 조회 모드로 변경한다.
					if (gPPF.cUserEmail != ""){
						gPPF.load_career_list_artist("open", gPPF.cUserEmail);
					}else{
						gPPF.load_career_list();
					}
					
				}else{
					g360.error_alert();
				}
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"edu_tr_edit" : function(id){
	
		$("#edu_dis").remove();
		$("#edu_edit").remove();
		
		var bb = id.replace("edu_tr_","");
		var obj = new Object();
		obj.level = $("#edu_level_"+bb).text();
		obj.schoolname = $("#edu_schoolname_"+bb).text();
		obj.major = $("#edu_major_"+bb).text();
		obj.status = $("#edu_status_"+bb).text();
		obj.start = $("#edu_start_"+bb).text();
		obj.end = $("#edu_end_"+bb).text();
		
		var tr_id = "education_level_" + id;
		var tr_id2 = "education_status_" + id;
		
		var html = "";	
		html += "<div class='wrap_group term' id='edu_edit'>";
		html += "	<table class='t_education_edit t_block'>";
		html += "		<colgroup>";
		html += "			<col class='t_th' />";
		html += "			<col />";
		html += "			<col class='t_th' />";
		html += "			<col />";
		html += "		</colgroup>";
		html += "		<tbody>";
		html += "			<tr>";
		html += "				<th>"+g360.g_lang.Type1+"</th>";
		html += "				<td>";
		html += "					<div class='btn-group'>";
		html += "					<button class='bg-transparent border-0 dropdown-toggle' id='"+tr_id+"' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
		html += "					"+obj.level+"";
		html += "					</button>";
		html += "						<div class='dropdown-menu'>";
		html += "							<a class='dropdown-item' onclick=\"gPPF.group_change('"+g360.g_lang.PhD+"','"+tr_id+"');\">"+g360.g_lang.PhD+"</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF.group_change('"+g360.g_lang.Master+"','"+tr_id+"');\">"+g360.g_lang.Master+"</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF.group_change('"+g360.g_lang.Bachelor+"','"+tr_id+"');\">"+g360.g_lang.Bachelor+"</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF.group_change('"+g360.g_lang.Etc+"','"+tr_id+"');\">"+g360.g_lang.Etc+"</a>";
		html += "						</div>";
		html += "					</div>";
		html += "				</td>";
		html += "				<th>"+g360.g_lang.Status+"</th>";
		html += "				<td>";
		html += "					<div class='btn-group'>";
		html += "					<button class='bg-transparent border-0 dropdown-toggle' id='"+tr_id2+"' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
		html += "					"+obj.status+"";
		html += "					</button>";
		html += "						<div class='dropdown-menu'>";
		html += "							<a class='dropdown-item' onclick=\"gPPF.group_change('"+g360.g_lang.Graduation+"','"+tr_id2+"');\">"+g360.g_lang.Graduation+"</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF.group_change('"+g360.g_lang.Dropout+"','"+tr_id2+"');\">"+g360.g_lang.Dropout+"</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF.group_change('"+g360.g_lang.Undergraduate+"','"+tr_id2+"');\">"+g360.g_lang.Undergraduate+"</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF.group_change('"+g360.g_lang.Completion+"','"+tr_id2+"');\">"+g360.g_lang.Completion+"</a>";
		
		html += "						</div>";
		html += "					</div>";
		html += "				</td>";
		html += "			</tr>";
		html += "			<tr>";
		html += "				<th>"+g360.g_lang.School+"</th>";
		html += "					<td><input type='text' class='txt' value='"+obj.schoolname+"' id='education_schoolname_"+id+"'  /></td>";
		html += "				<th>"+g360.g_lang.Major+"</th>";
		html += "					<td><input type='text' class='txt'  value='"+obj.major+"' id='education_major_"+id+"'  /></td>";
		html += "			</tr>";
		html += "			<tr>";
		html += "				<th>"+g360.g_lang.Start1+"</th>";
		html += "					<td><input type='text' class='txt' id='education_start_"+id+"'  value='"+obj.start+"' placeholder='2010.09' /></td>";
		html += "				<th>"+g360.g_lang.End1+"</th>";
		html += "				<td><input type='text' class='txt' id='education_end_"+id+"'  value='"+obj.end+"' placeholder='2014.039' /></td>";
		
		html += "				</tr>";
		html += "		</tbody>";
		html += "	</table>";
		html += "	<div class='btn_area bottom_area'> <!-- 연필 아이콘 버튼 클릭 시 버튼 위치 변경되어야 함 -->";
		html += "			<button class='btn btn_gray btn_cancel' onclick=\'gPPF.load_career_list();\'>"+g360.g_lang.Cancel+"</button>";
		html += "			<button class='btn btn_violet btn_ok' onclick=\"gPPF.save_education_after_edit('"+bb+"', '" + id + "');\">"+g360.g_lang.OK2+"</button>";
		html += "	</div>";
		html += "</div>";

				
		$("#career_edit2").append(html);
		
		
	}, 
	
	"group_change" : function(txt, obj){
		$("#" + obj).text(txt);
	},
		
	"save_education_after_edit" : function(bun, id){
	
		var level = $("#education_level_" + id).text();
		var status = $("#education_status_"+ id).text();
		var schoolname = $("#education_schoolname_" + id).val();
		var major = $("#education_major_" + id).val();
		
		var start = $("#education_start_" + id).val();
		var end = $("#education_end_"+id).val();
		
		
		$("#edu_level_"+bun+"").text(level);
		$("#edu_status_"+bun+"").text(status);
		$("#edu_schoolname_"+bun+"").text(schoolname);
		$("#edu_major_"+bun+"").text(major);
		$("#edu_start_"+bun+"").text(start);
		$("#edu_end_"+bun+"").text(end);
		
		
		gPPF.save_education("T");
		
//		obj.level = $("#edu_level_"+bb).text();
//		obj.schoolname = $("#edu_schoolname_"+bb).text();
//		obj.major = $("#edu_major_"+bb).text();
//		obj.status = $("#edu_status_"+bb).text();
//		obj.start = $("#edu_start_"+bb).text();
//		obj.end = $("#edu_end_"+bb).text();
	},

	///////////////////////////////////////////// Education Setting  END///////////////////////////////////////////////////////////////////////	
	
	
	
	
	/////////////////////////////////////////// Career Setting ///////////////////////////////////////////////////////////////////////////////////
	
	"edit_career" : function(){
		var html = "";
		
		html += "<div class='round_table'>";
		html += "	<table class='t_career_edit t_block' id='profile_career'>";
		html += "		<thead>";
		html += "			<tr>";
		html += "				<th>"+g360.g_lang.Period+"</th>";
		html += "				<th style='width:350px'>"+g360.g_lang.Details+"</th>";
		html += "				<th style='width:80px' class='t_delete'></th>";
		html += "			</tr>";
		html += "		</thead>";
		html += "		<tbody id='career_tbody'>";
		
		if (typeof (gPPF.career_list) == "undefined"){
			html += "		<tr id='career_1'>";
			html += "			<td style='text-align:right'><input type='text' id='career_term_1' placeholder='2018.09' class='txt' style='width:250px; margin:10px 0 10px 0' /></td>";
			html += "			<td><input type='text' id='career_title_1' class='txt' /></td>";
			html += "			<td class='t_delete'><button class='btn btn_cell_delete' onclick=\"gPPF.delete_career('career_1')\">"+g360.g_lang.Delete+"</button></td>";
			html += "		</tr>";
		}else{
			
			for (var i = 0 ; i < gPPF.career_list.length; i++){
				var dat = gPPF.career_list[i];
				
		
				html += "		<tr id='career_"+(i+1)+"'>";
				html += "			<td style='text-align:right'><input type='text' value='"+dat.term+"' id='career_term_"+(i+1)+"' placeholder='2018.09' class='txt' style='width:250px; margin:10px 0 10px 0' /></td>";
				html += "			<td><input type='text' value='"+dat.title+"' id='career_title_"+(i+1)+"' class='txt' /></td>";
				html += "			<td class='t_delete'><button class='btn btn_cell_delete' onclick=\"gPPF.delete_career('career_"+(i+1)+"')\">"+g360.g_lang.Delete+"</button></td>";
				html += "		</tr>";
			}	
		}
		
		
		

		html += "	</tbody>";
		html += "</table>";
		html += "</div>";
		
		html += "<div class='btn_area bottom_area'>";
		html += "	<button class='btn btn_violet btn_cell_add' onclick=\'gPPF.add_career();\'>"+g360.g_lang.Add+"</button>";
		html += "	<button class='btn btn_gray btn_cancel' onclick=\'gPPF.load_career_list();\'>"+g360.g_lang.Cancel+"</button>";
		html += "	<button class='btn btn_violet btn_ok' onclick=\'gPPF.save_career();\'>"+g360.g_lang.OK2+"</button>";
		html += "</div>"

		
	
		
		$("#career_edit3").html(html);
		
		$("#profile_career").tableDnD({
			onDragClass: "myDragClass"
		});
	},
	
	"add_career" : function(){
		var obj = $("#profile_career tbody tr");
		var i = obj.length + 1;
		
		var html = "";
	
		html += "			<tr id='career_"+i+"'>";
		html += "			<td><input type='text' id='career_term_"+i+"' placeholder='2018.09' class='txt' style='margin:10px 0 10px 0' /></td>";
		html += "			<td><input type='text' id='career_title_"+i+"' class='txt' /></td>";
		html += "			<td class='t_delete'><button class='btn btn_cell_delete' onclick=\"gPPF.delete_career('career_"+i+"')\">"+g360.g_lang.Delete+"</button></td>";
		html += "		</tr>";
		
		$("#career_tbody").append(html);
	},
	
	"save_career" : function(){
		
		var obj = $("#profile_career tbody tr");
		var len = obj.length;
		var list = "";
		
		$("#career_tbody tr").each(function(index){
			var i = this.id.replace("career_","");
			var term = $("#career_term_" + i).val();
			
			if (term == ""){
				
				g360.gAlert("Info",g360.g_lang.ProfileSetting_18, "blue", "top");
				return false;
			}
			var title = $("#career_title_" + i).val();
			if (title == ""){
				
				g360.gAlert("Info", g360.g_lang.ProfileSetting_19, "blue", "top");
				return false;
			}
			
			if (list == ""){
				list = term + "-spl-" + title ;
			}else{
				list = list + "-=spl=-" + term + "-spl-" + title ;
			}
		});
		

		var data = JSON.stringify({
			email : gPPF.cUserEmail,
			content : list
		});
		var url = g360.root_path + "/artist_career_save.mon";
		$.ajax({
			type : "POST",
			data : data,
			dataType : "json",
			cache : false,
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				if (data.result == "OK"){
					//저장된 데이터를 불러와서 다시 조회 모드로 변경한다.
					if (gPPF.cUserEmail != ""){
						gPPF.load_career_list_artist("open", gPPF.cUserEmail);
					}else{
						gPPF.load_career_list();
					}
					
				}else{
					g360.error_alert();
				}
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"delete_career" : function(id){
		$("#" + id).remove();
	},
	
	
	
	
	
	
	

	/////////////////////////////////////////// cert Setting ///////////////////////////////////////////////////////////////////////////////////
	
	"edit_cert" : function(){
		
		var html = "";
		
		html += "<div class='round_table'>";
		html += "	<table class='t_certificate_edit t_block' id='profile_cert'>";
		html += "		<thead>";
		html += "			<tr>";
		html += "				<th>"+g360.g_lang.Collection_Artswork+"</th>";
	//	html += "				<th style='width:200px'>발행처</th>";
	//	html += "				<th style='width:100px'>취득 일자</th>";
		html += "				<th style='width:80px' class='t_delete'></th>";
		html += "			</tr>";
		html += "		</thead>";
		html += "		<tbody id='cert_tbody'>";
		if (typeof (gPPF.cert_list) == "undefined"){
			html += "			<tr id='cert_1'>";
			html += "				<td><input type='text' id='career_certname_1'class='txt'  style='margin:10px 0 10px 0' /></td>";
//			html += "				<td><input type='text' id='career_publisher_1'class='txt' /></td>";
//			html += "				<td><input type='text' id='career_date_1' class='txt' /></td>";
			html += "				<td class='t_delete' ><button class='btn btn_cell_delete' onclick=\"gPPF.delete_career('career_1')\">삭제</button></td>";
			html += "			</tr>";
		}else{
			for (var i = 0 ; i < gPPF.cert_list.length; i++){
				var dat = gPPF.cert_list[i];
				html += "			<tr id='cert_"+(i+1)+"'>";
				html += "				<td style='text-align:right'><input type='text' value='"+dat.certname+"' id='career_certname_"+(i+1)+"'class='txt' style='width:450px; margin:10px 0 10px 0'  /></td>";
//				html += "				<td><input type='text' value='"+dat.publisher+"' id='career_publisher_"+(i+1)+"'class='txt' /></td>";
//				html += "				<td><input type='text' value='"+dat.date+"' id='career_date_"+(i+1)+"' class='txt' /></td>";
				html += "				<td class='t_delete'><button class='btn btn_cell_delete' onclick=\"gPPF.delete_cert('cert_"+(i+1)+"')\">"+g360.g_lang.Delete+"</button></td>";
				html += "			</tr>";
			}
		}

		html += "	</table>";
		html += "</div>";
		html += "<div class='btn_area bottom_area'>";
		html += "	<button class='btn btn_violet btn_cell_add' onclick=\'gPPF.add_cert();\'>"+g360.g_lang.Add+"</button>";
		html += "	<button class='btn btn_gray btn_cancel' onclick=\'gPPF.load_career_list();\'>"+g360.g_lang.Cancel+"</button>";
		html += "	<button class='btn btn_violet btn_ok' onclick=\'gPPF.save_cert();\'>"+g360.g_lang.OK2+"</button>";
		html += "</div>";

		
		$("#career_edit4").html(html);
		
		$("#profile_cert").tableDnD({
			onDragClass: "myDragClass"
		});
		
		
	},
	
	"add_cert" : function(){
		var obj = $("#profile_cert tbody tr");
		var i = obj.length + 1;
		
		var html = "";
		
		html += "			<tr id='cert_"+i+"'>";
		html += "				<td><input type='text' id='career_certname_"+i+"'class='txt' style='margin:10px 0 10px 0' /></td>";
//		html += "				<td><input type='text' id='career_publisher_"+i+"'class='txt' /></td>";
//		html += "				<td><input type='text' id='career_date_"+i+"' placeholder='2018.11' class='txt' /></td>";
		html += "				<td class='t_delete'><button class='btn btn_cell_delete' onclick=\"gPPF.delete_cert('cert_"+i+"')\">"+g360.g_lang.Delete+"</button></td>";
		html += "			</tr>";
		
		$("#cert_tbody").append(html);
	},
	
	"save_cert" : function(){
		var obj = $("#profile_cert tbody tr");
		var len = obj.length;
		var list = "";
		
		$("#cert_tbody tr").each(function(inddex){
			//var id = this.id;
			var i = this.id.replace("cert_","");
			var certname = $("#career_certname_" + i).val();
			if (certname == ""){
				g360.gAlert("Info", g360.g_lang.ProfileSetting_20, "blue", "top");
				return false;
			}
//			var publisher = $("#career_publisher_" + i).val();
//			if (publisher == ""){
//				g360.gAlert("Info", "발행처를 입력하세요", "blue", "top");
//				return false;
//			}
//			var certdate = $("#career_date_" + i).val();
//			if (certdate == ""){
//				
//				g360.gAlert("Info", "취득일자를 입력하세요", "blue", "top");
//				return false;
//			}
			
			if (list == ""){
				list = certname; // + "-spl-" + publisher + "-spl-" + certdate;
			}else{
				list = list + "-=spl=-" + certname; // + "-spl-" + publisher + "-spl-" + certdate;
			}
		});
		

		var data = JSON.stringify({
			email : gPPF.cUserEmail,
			content : list
		});
		var url = g360.root_path + "/artist_cert_save.mon";
		$.ajax({
			type : "POST",
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				if (data.result == "OK"){
					//저장된 데이터를 불러와서 다시 조회 모드로 변경한다.
					if (gPPF.cUserEmail != ""){
						gPPF.load_career_list_artist("open", gPPF.cUserEmail);
					}else{
						gPPF.load_career_list();
					}
				
				}else{
					g360.error_alert();
				}
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"delete_cert" : function(id){
		$("#" + id).remove();
	},
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	

	/////////////////////////////////////////// Display Setting ///////////////////////////////////////////////////////////////////////////////////
	
	"edit_display" : function(){
		var html = "";
		
		html += "<div class='round_table'>";
		html += "	<table class='t_career_edit t_block' id='profile_display'>";
		html += "		<thead>";
		html += "			<tr>";
		html += "				<th>"+g360.g_lang.Period+"</th>";
		html += "				<th style='width:350px'>"+g360.g_lang.Exhibit_Project_2+" </th>";
		html += "				<th style='width:80px' class='t_delete'></th>";
		html += "			</tr>";
		html += "		</thead>";
		html += "		<tbody id='display_tbody'>";
		
		if (typeof (gPPF.display_list) == "undefined"){
			html += "		<tr id='display_1'>";
			html += "			<td><input type='text' id='display_term_1' placeholder='2018.09' class='txt' style='margin:10px 0 10px 0' /></td>";
			html += "			<td><input type='text' id='display_title_1' class='txt' /></td>";
			html += "			<td class='t_delete'><button class='btn btn_cell_delete' onclick=\"gPPF.delete_display('display_1')\">"+g360.g_lang.Delete+"</button></td>";
			html += "		</tr>";
		}else{
			
			for (var i = 0 ; i < gPPF.display_list.length; i++){
				var dat = gPPF.display_list[i];
				
		
				html += "		<tr id='display_"+(i+1)+"'>";
				html += "			<td style='text-align:right'><input type='text' value='"+dat.term+"' id='display_term_"+(i+1)+"' placeholder='2018.09' class='txt' style='width:250px; margin:10px 0 10px 0' /></td>";
				html += "			<td ><input type='text' value='"+dat.title+"' id='display_title_"+(i+1)+"' class='txt'  /></td>";
				html += "			<td class='t_delete'><button class='btn btn_cell_delete' onclick=\"gPPF.delete_display('display_"+(i+1)+"')\">"+g360.g_lang.Delete+"</button></td>";
				html += "		</tr>";
			}	
		}
		
		
		

		html += "	</tbody>";
		html += "</table>";
		html += "</div>";
		
		html += "<div class='btn_area bottom_area'>";
		html += "	<button class='btn btn_violet btn_cell_add' onclick=\'gPPF.add_display();\'>"+g360.g_lang.Add+"</button>";
		html += "	<button class='btn btn_gray btn_cancel' onclick=\'gPPF.load_career_list();\'>"+g360.g_lang.Cancel+"</button>";
		html += "	<button class='btn btn_violet btn_ok' onclick=\'gPPF.save_display();\'>"+g360.g_lang.OK2+"</button>";
		html += "</div>"

		
	
		
		$("#career_edit5").html(html);
		
		
		$("#profile_display").tableDnD({
			onDragClass: "myDragClass"
		});
		
		
	},
	
	"add_display" : function(){
		var obj = $("#profile_display tbody tr");
		var i = obj.length + 1;
		
		var html = "";
	
		html += "			<tr id='display_"+i+"'>";
		html += "			<td><input type='text' id='display_term_"+i+"' placeholder='2018.09' class='txt' style='margin:10px 0 10px 0' /></td>";
		html += "			<td><input type='text' id='display_title_"+i+"' class='txt' /></td>";
		html += "			<td class='t_delete'><button class='btn btn_cell_delete' onclick=\"gPPF.delete_display('display_"+i+"')\">"+g360.g_lang.Delete+"</button></td>";
		html += "		</tr>";
		
		$("#display_tbody").append(html);
	},
	
	"save_display" : function(){
		
		var obj = $("#profile_display tbody tr");
		var len = obj.length;
		var list = "";
		
		$("#display_tbody tr").each(function(index){
			var i = this.id.replace("display_","");
			var term = $("#display_term_" + i).val();
			
			if (term == ""){
				
				g360.gAlert("Info", g360.g_lang.ProfileSetting_18, "blue", "top");
				return false;
			}
			var title = $("#display_title_" + i).val();
			if (title == ""){
				
				g360.gAlert("Info", g360.g_lang.ProfileSetting_21 , "blue", "top");
				return false;
			}
			
			if (list == ""){
				list = term + "-spl-" + title ;
			}else{
				list = list + "-=spl=-" + term + "-spl-" + title ;
			}
		});
		

		var data = JSON.stringify({
			email : gPPF.cUserEmail,
			content : list
		});
		var url = g360.root_path + "/artist_display_save.mon";
		$.ajax({
			type : "POST",
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				if (data.result == "OK"){
					//저장된 데이터를 불러와서 다시 조회 모드로 변경한다.
					if (gPPF.cUserEmail != ""){
						gPPF.load_career_list_artist("open", gPPF.cUserEmail);
					}else{
						gPPF.load_career_list();
					}
					
				}else{
					g360.error_alert();
				}
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"delete_display" : function(id){
		$("#" + id).remove();
	},
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	"scoreInit" : function(){
		var url = g360.root_path + "/search_userinfo_project.mon";
		url += "?" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){

				
				var score = data.score;
				
				if (typeof(score) != "undefined"){
					var totalscore = parseInt(score.score1) + parseInt(score.score2) + parseInt(score.score3) + parseInt(score.score4) +parseInt(score.score5);
					var rtotal = parseInt(totalscore) / 5;
					var sctotal = Math.ceil(rtotal);
					
					
					var bun=1;
					$("#profile_score_dis img").each(function(index){				
						if (bun <= sctotal){
							$(this).attr("src", $(this).attr("src").replace("disable","focus"));
						}
						bun++;
					});
					
					
					
					var ss1 = (parseInt(score.score1) * 2) * 10;
					$("#score_dis1_bar").css("width", ss1+"%");
					var ss2 = (parseInt(score.score2) * 2) * 10;
					$("#score_dis2_bar").css("width", ss2+"%");
					var ss3 = (parseInt(score.score3) * 2) * 10;
					$("#score_dis3_bar").css("width", ss3+"%");
					var ss4 = (parseInt(score.score4) * 2) * 10;
					$("#score_dis4_bar").css("width", ss4+"%");
					var ss5 = (parseInt(score.score5) * 2) * 10;
					$("#score_dis5_bar").css("width", ss5+"%");
					
					$("#score_dis1").text(score.score1+ g360.g_lang.Artist_Mypage6);
					$("#score_dis2").text(score.score2+ g360.g_lang.Artist_Mypage6);
					$("#score_dis3").text(score.score3+ g360.g_lang.Artist_Mypage6);
					$("#score_dis4").text(score.score4+ g360.g_lang.Artist_Mypage6);
					$("#score_dis5").text(score.score5+ g360.g_lang.Artist_Mypage6);
					
					
					$("#score1").text(ss1+ g360.g_lang.Artist_Mypage6);
					$("#score2").text(ss2+ g360.g_lang.Artist_Mypage6);
					$("#score3").text(ss3+ g360.g_lang.Artist_Mypage6);
					$("#score4").text(ss4+ g360.g_lang.Artist_Mypage6);
					$("#score5").text(ss5+ g360.g_lang.Artist_Mypage6);
					
					var bun=1;
					$("#profile_score_dis1 img").each(function(index){				
						if (bun <= score.score1){
							$(this).attr("src", $(this).attr("src").replace("disable","focus"));
						}		
						bun++;
					});
					
					var bun=1;
					$("#profile_score_dis2 img").each(function(index){				
						if (bun <= score.score2){
							$(this).attr("src", $(this).attr("src").replace("disable","focus"));
						}		
						bun++;
					});
					
					var bun=1;
					$("#profile_score_dis3 img").each(function(index){				
						if (bun <= score.score3){
							$(this).attr("src", $(this).attr("src").replace("disable","focus"));
						}		
						bun++;
					});
					
					var bun=1;
					$("#profile_score_dis4 img").each(function(index){				
						if (bun <= score.score4){
							$(this).attr("src", $(this).attr("src").replace("disable","focus"));
						}		
						bun++;
					});
					
					var bun=1;
					$("#profile_score_dis5 img").each(function(index){				
						if (bun <= score.score5){
							$(this).attr("src", $(this).attr("src").replace("disable","focus"));
						}		
						bun++;
					});
					
					
					
					
					//4.3 / 평가32개
					$("#score_avarage").text(rtotal + g360.g_lang.Artist_Mypage6);
					
					$("#score_count").text(data.project_totalcount + g360.g_lang.Artist_Mypage7);
					
					$("#profile_artcount").text(data.saved_art_totalcount + g360.g_lang.Artist_Mypage8);
				}
				
				

				
				
				
				
				
//				config.data.datasets[0].data[0] = score.score1;
//				config.data.datasets[0].data[1] = score.score2;
//				config.data.datasets[0].data[2] = score.score3;
//				config.data.datasets[0].data[3] = score.score4;
//				config.data.datasets[0].data[4] = score.score5;
				
				config.data.datasets[0].data[0] = ss1;
				config.data.datasets[0].data[1] = ss2;
				config.data.datasets[0].data[2] = ss3;
				config.data.datasets[0].data[3] = ss4;
				config.data.datasets[0].data[4] = ss5;
				
				window.myRadar = new Chart(document.getElementById('canvas'), config);
				
				
//				config2.data.datasets[0].data[0] = data.project_type1_totalcount;
//				config2.data.datasets[0].data[1] = data.project_type2_totalcount;
//				config2.data.datasets[0].data[2] = data.project_type3_totalcount;
//				var ctx = document.getElementById('canvas2').getContext('2d');
//				window.myDoughnut = new Chart(ctx, config2);
				
				gPPF.load_completed_project_type2(1);
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"load_completed_project_type2" : function(page){
		gPPF.cPage = page;		
		var start = (parseInt(gPPF.perpage) * (parseInt(gPPF.cPage))) - (parseInt(gPPF.perpage) - 1);
		start = parseInt(start) -1 ;
		
		var perpage = gPPF.perpage;
		
		var url = g360.root_path + "/artProject_list.mon?start="+start+"&perpage="+perpage+"&opt=end2";
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				gPPF.draw_score_complete_list(data);
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	"draw_score_complete_list" : function(data){
		var html = "";
		
		gPPF.totalcount = data[0].totalcount;

		for (var i = 1; i < data.length; i++){
			var dx = data[i];
			
			
			var score = dx.eval;
			var totalscore = parseInt(score.score1) + parseInt(score.score2) + parseInt(score.score3) + parseInt(score.score4) +parseInt(score.score5);
			var rtotal = parseInt(totalscore) / 5;
			var sctotal = Math.ceil(rtotal);
			
			
			var bun=1;
			$("#profile_score_dis img").each(function(index){				
				if (bun <= sctotal){
					$(this).attr("src", $(this).attr("src").replace("disable","focus"));
				}
				bun++;
			});
			
			
			html += "<div class='group_section'>";
			html += "	<div class='wrap_group evaluation noborder_top'>";
			html += "		<div class='wrap_group_header'>";
			html += "			<h4><em class='blue_label'>"+g360.g_lang.Request_artwork+"</em>"+dx.request_title+"</h4>";
			html += "			<div class='evaluation_info'>";
			html += "				<dl>";
			html += "					<dt>"+g360.g_lang.Client+"</dt>";
			html += "					<dd>"+dx.request_nickname+"<dd>";
			html += "				</dl>";
			html += "				<dl>";
			html += "					<dt>"+g360.g_lang.Contract_dates+"</dt>";
			html += "					<dd>"+g360.iso_date_convert(dx.art_ok_date)+"<dd>";
			html += "				</dl>";
			html += "			</div>";
			html += "			<div class='star'>";
			for (var k = 1; k < 6; k++){
				if (k <= sctotal){
					html += "				<img src='/img/account/star-r-focus.svg' alt='' />";
				}else{
					html += "				<img src='/img/account/star-r-disable.svg' alt='' />";
				}
			}
			
			html += "				<span>"+rtotal+ g360.g_lang.Artist_Mypage6 + "</span>";
			html += "			</div>";
			html += "		</div>";
			html += "		<div class='contract'>";
			html += "			<table>";
			html += "				<colgroup>";
			html += "					<col class='t_th' />";
			html += "					<col />";
			html += "					<col class='t_th' />";
			html += "					<col />";
			html += "				</colgroup>";
			html += "				<tbody>";
			html += "					<tr>";
			html += "						<th>"+g360.g_lang.Request_title+"</th>";
			html += "						<td colspan='3'><strong>"+dx.request_title+"</strong></td>";
			html += "					</tr>";
			html += "					<tr>";
			html += "						<th>"+g360.g_lang.Price1+"</th>";
			html += "						<td><strong>"+g360.comma(g360.setWon(dx.selected_price))+"</strong> </td>";
			html += "						<th>"+g360.g_lang.Period1+"</th>";
			html += "						<td><strong>"+(parseInt(dx.seleted_term)+5)+"</strong> ("+ g360.g_lang.Creating_period +dx.seleted_term+ g360.g_lang.ProfileSetting_1 + ")</td>";
			html += "					</tr>";
			html += "				</tbody>";
			html += "			</table>";
			html += "			<div class='contract_star bg_white'> ";
			html += "				<ul class='star-list'><!-- 모바일에서 슬라이드 구현필요 --> ";
			html += "					<li>";
			html += "						<span>"+g360.g_lang.labels1+" <strong>"+ dx.eval.score1 + g360.g_lang.Artist_Mypage6 +"</strong></span>";
			html += "						<div class='star'>";
			for (var k = 1; k < 6; k++){
				if (k <= dx.eval.score1){
					html += "					<img src='/img/account/star-r-focus.svg' alt='' />";
				}else{
					html += "					<img src='/img/account/star-r-disable.svg' alt='' />";
				}
			}
			html += "						</div>";
			html += "					</li>";
			html += "					<li>";
			html += "						<span>"+g360.g_lang.Partners27+" <strong>"+ dx.eval.score2 + g360.g_lang.Artist_Mypage6 +"</strong></span>";
			html += "						<div class='star'>";
			for (var k = 1; k < 6; k++){
				if (k <= dx.eval.score2){
					html += "					<img src='/img/account/star-r-focus.svg' alt='' />";
				}else{
					html += "					<img src='/img/account/star-r-disable.svg' alt='' />";
				}
			}

			html += "						</div>";
			html += "					</li>";
			html += "					<li>";
			html += "						<span>"+g360.g_lang.Partners29+" <strong>"+ dx.eval.score3 + g360.g_lang.Artist_Mypage6 +"</strong></span>";
			html += "						<div class='star'>";
			for (var k = 1; k < 6; k++){
				if (k <= dx.eval.score3){
					html += "					<img src='/img/account/star-r-focus.svg' alt='' />";
				}else{
					html += "					<img src='/img/account/star-r-disable.svg' alt='' />";
				}
			}
			html += "						</div>";
			html += "					</li>";
			html += "					<li>";
			html += "						<span>"+g360.g_lang.Artist_Mypage12+" <strong>"+ dx.eval.score4 + g360.g_lang.Artist_Mypage6 +"</strong></span>";
			html += "						<div class='star'>";
			for (var k = 1; k < 6; k++){
				if (k <= dx.eval.score4){
					html += "					<img src='/img/account/star-r-focus.svg' alt='' />";
				}else{
					html += "					<img src='/img/account/star-r-disable.svg' alt='' />";
				}
			}
			html += "						</div>";
			html += "					</li>";
			html += "					<li>";
			html += "						<span>"+g360.g_lang.Artist_Mypage13+" <strong>"+dx.eval.score5+ g360.g_lang.Artist_Mypage6 +"</strong></span>";
			html += "						<div class='star'>";
			for (var k = 1; k < 6; k++){
				if (k <= dx.eval.score5){
					html += "					<img src='/img/account/star-r-focus.svg' alt='' />";
				}else{
					html += "					<img src='/img/account/star-r-disable.svg' alt='' />";
				}
			}

			html += "						</div>";
			html += "					</li>";
			html += "				</ul>";
			html += "			</div>";
			html += "			<div class='comment_area'>";
			html += "				<div class='comment comment_client'>";
			html += "					<div class='thm_comment'><img src='/img/account/img_author2.jpg' alt='고영훈' /></div>";
			html += "					<dl>";
			html += "						<dt><strong>"+g360.g_lang.Client+"</strong> "+dx.request_nickname+"</dt>";
			html += "						<dd>"+g360.TextToHtml(dx.eval.comment)+"</dd>";
			html += "					</dl>";
			html += "				</div>";
			
			
			html += "			</div>";
			html += "		</div>";
			html += "	</div>";
			html += "</div>";
					
			
		}
		
		if (gPPF.totalcount > 0){
			$("#NAVIGATE").show();
			gPPF.search_paging(gPPF.cPage);
		}
	
		$("#score_total_dis").html(html);
	},
	
	
	"history_list_draw2" : function(data){
		
		gPPF.totalcount = data[0].totalcount;
		
		var html = "";
		
		for (var i = 1; i < data.length; i++){
			
			var dx = data[i];
			
			
			var score = dx.eval;
			var totalscore = parseInt(score.score1) + parseInt(score.score2) + parseInt(score.score3) + parseInt(score.score4) +parseInt(score.score5);
			var rtotal = parseInt(totalscore) / 5;
			var sctotal = Math.ceil(rtotal);
			
			
			
			html += "<div class='group_section'>";
			html += "	<div class='wrap_group evaluation noborder_top'>";
			html += "		<div class='wrap_group_header'>";
			html += "			<h4><em class='blue_label'>"+g360.g_lang.Request_artwork+"</em>"+dx.request_title+"</h4>";
			html += "			<div class='evaluation_info'>";
			html += "				<dl>";
			html += "					<dt>"+g360.g_lang.Client+"</dt>";
			html += "					<dd>"+dx.request_nickname+"<dd>";
			html += "				</dl>";
			html += "				<dl>";
			html += "					<dt>"+g360.g_lang.Contract_date+"</dt>";
			html += "					<dd>"+g360.iso_date_convert(dx.art_ok_date)+"<dd>";
			html += "				</dl>";
			html += "			</div>";
			html += "			<div class='star'>";
			for (var k = 1; k < 6; k++){
				if (k <= sctotal){
					html += "				<img src='/img/account/star-r-focus.svg' alt='' />";
				}else{
					html += "				<img src='/img/account/star-r-disable.svg' alt='' />";
				}
			}

			html += "				<span>"+rtotal+ g360.g_lang.Artist_Mypage6 +"</span>";
			html += "			</div>";
			html += "		</div>";
			html += "		<div class='contract'>";
			html += "			<table>";
			html += "				<colgroup>";
			html += "					<col class='t_th' />";
			html += "					<col />";
			html += "					<col class='t_th' />";
			html += "					<col />";
			html += "				</colgroup>";
			html += "				<tbody>";
			html += "					<tr>";
			html += "						<th>"+g360.g_lang.Request_title+"</th>";
			html += "						<td colspan='3'><strong>"+dx.request_title+"</strong></td>";
			html += "					</tr>";
			html += "					<tr>";
			html += "						<th>"+g360.g_lang.Price1s+"</th>";
			html += "						<td><strong>"+g360.comma(g360.setWon(dx.selected_price* 10000))+"</strong> </td>";
			html += "						<th>"+g360.g_lang.Period1+"</th>";
			html += "						<td><strong>"+(parseInt(dx.seleted_term)+5)+"</strong> (" + g360.g_lang.Creating_period + dx.seleted_term + g360.g_lang.ProfileSetting_1 + ")</td>";
			html += "					</tr>";
			html += "				</tbody>";
			html += "			</table>";
			html += "			<div class='detail_view' style='display:none' id='history_"+i+"'>";
			html += "				<div class='contract_star bg_white'>";
			html += "					<ul class='star-list'><!-- 모바일에서 슬라이드 구현필요 --> ";
			html += "						<li>";
			html += "							<span>"+g360.g_lang.labels1+" <strong>" + dx.eval.score1 + g360.g_lang.Artist_Mypage6 +"</strong></span>";
			html += "							<div class='star'>";
			for (var k = 1; k < 6; k++){
				if (k <= dx.eval.score1){
					html += "					<img src='/img/account/star-r-focus.svg' alt='' />";
				}else{
					html += "					<img src='/img/account/star-r-disable.svg' alt='' />";
				}
			}

			html += "							</div>";
			html += "						</li>";
			html += "						<li>";
			html += "							<span>"+g360.g_lang.Partners27+" <strong>"+dx.eval.score2+ g360.g_lang.Artist_Mypage6 +"</strong></span>";
			html += "							<div class='star'>";
			for (var k = 1; k < 6; k++){
				if (k <= dx.eval.score2){
					html += "					<img src='/img/account/star-r-focus.svg' alt='' />";
				}else{
					html += "					<img src='/img/account/star-r-disable.svg' alt='' />";
				}
			}

			html += "							</div>";
			html += "						</li>";
			html += "						<li>";
			html += "							<span>"+g360.g_lang.labels3+" <strong>"+dx.eval.score3+ g360.g_lang.Artist_Mypage6 +"</strong></span>";
			html += "							<div class='star'>";
			for (var k = 1; k < 6; k++){
				if (k <= dx.eval.score3){
					html += "					<img src='/img/account/star-r-focus.svg' alt='' />";
				}else{
					html += "					<img src='/img/account/star-r-disable.svg' alt='' />";
				}
			}

			html += "							</div>";
			html += "						</li>";
			html += "						<li>";
			html += "							<span>"+g360.g_lang.labels4+" <strong>"+dx.eval.score4+ g360.g_lang.Artist_Mypage6 +"</strong></span>";
			html += "							<div class='star'>";
			for (var k = 1; k < 6; k++){
				if (k <= dx.eval.score4){
					html += "					<img src='/img/account/star-r-focus.svg' alt='' />";
				}else{
					html += "					<img src='/img/account/star-r-disable.svg' alt='' />";
				}
			}

			html += "							</div>";
			html += "						</li>";
			html += "						<li>";
			html += "							<span>"+g360.g_lang.labels5+" <strong>"+dx.eval.score5+ g360.g_lang.Artist_Mypage6 +"</strong></span>";
			html += "							<div class='star'>";
			for (var k = 1; k < 6; k++){
				if (k <= dx.eval.score5){
					html += "					<img src='/img/account/star-r-focus.svg' alt='' />";
				}else{
					html += "					<img src='/img/account/star-r-disable.svg' alt='' />";
				}
			}

	
			html += "							</div>";
			html += "						</li>";
			html += "					</ul>";
			html += "				</div>";
			html += "				<div class='comment_area'>";
			html += "					<div class='comment comment_client'>";
			
			var url = g360.user_photo_url(dx.request_email) + "?open&ver=" + new Date().getTime();
			
			html += "						<div class='thm_comment'><img src='"+url+"'  /></div>";
			html += "						<dl>";
			html += "							<dt><strong>"+g360.g_lang.Client+"</strong> "+dx.request_nickname+"</dt>";
			html += "							<dd>"+g360.TextToHtml(dx.eval.comment)+"</dd>";
			html += "						</dl>";
			html += "					</div>";
			html += "				</div>";
			
			
			
			html += "				<div class='process bg_white'>";
			html += "					<table>";
			html += "						<colgroup>";
			html += "							<col class='t_th' />";
			html += "							<col />";
			html += "						</colgroup>";
			html += "						<tbody>";
			
			if (typeof(dx.report) != "undefined"){
				var spx = dx.report;
				for (var k = 0 ; k < spx.length; k++){
					var ddx = spx[k];
					html += "		<tr>";
					html += "			<th><strong style='font-size:14px'>"+g360.g_lang.Notice_5+"  ["+ddx.rate+"%]</strong><div>"+g360.iso_date_convert(ddx.date)+" </div></th>";
					html += "			<td>";
					html += "			<div>"+g360.TextToHtml(ddx.report_memo) ;
					
					html += "			<button class='btn btn_ghost btn_add_file' onclick=\"g360.preview_img('"+ddx.uploadfilename+"','"+ddx.email+"','artproject')\">"+g360.g_lang.Partners21+"</button>";
					html += "			</div></td>";
					html += "		</tr>";
				}
			}
			
			
//			html += "							<tr>";
//			html += "								<th><strong>1주차</strong><div>2018.08.22</div></th>";
//			html += "								<td><div>캔버스 및 재료 준비 완료<br />밑그림 완료 <button class='btn btn_ghost btn_add_file'>첨부사진</button></div></td>";
//			html += "							</tr>";
//			html += "							<tr>";
//			html += "								<th><strong>2주차</strong><div>2018.08.27</div></th>";
//			html += "								<td><div>채색진행 1차 <button class='btn btn_ghost btn_add_file'>첨부사진</button></div></td>";
//			html += "							</tr>";
			html += "						</tbody>";
			html += "					</table>";
			html += "				</div>";
			html += "			</div>";
			html += "			<div class='btn_view_area'><button class='btn btn_gray btn_detail_fold' onclick=\"gPPF.expand('"+i+"', this)\">"+g360.g_lang.Open+"</button></div>";
			html += "		</div>";
			html += "	</div>";
			html += "</div>";
		}
		
		
		
		
		
		if (gPPF.totalcount > 0){
			$("#NAVIGATE").show();
			gPPF.search_paging(gPPF.cPage);
		}
		
		$("#history_list_dis2").html(html);
	},
	
	
	
	"expand" : function(bun, obj){

		var text = $(obj).get(0).textContent;
		if (text == g360.g_lang.Open){
			$("#history_" + bun).show();
			$(obj).text(g360.g_lang.Fold);
		}else{
			$("#history_" + bun).hide();
			$(obj).text(g360.g_lang.Open);
		}
	},
	
	
	
	
	
	"historyInit" : function(){
		
		var url = g360.root_path + "/search_userinfo_project.mon";
		url += "?" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				gPPF.history_list_draw(data);
			},
			error : function(e){
				g360.error_alert();
			}
		});	
		
	},
	
	"history_list_load" : function(page){
		gPPF.cPage = page;		
		var start = (parseInt(gPPF.perpage) * (parseInt(gPPF.cPage))) - (parseInt(gPPF.perpage) - 1);
		start = parseInt(start) -1 ;
		
		var perpage = gPPF.perpage;
		
		var url = g360.root_path + "/artProject_list.mon?start="+start+"&perpage="+perpage+"&opt=end2";
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				gPPF.history_list_draw2(data);
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	"history_list_draw" : function(data){
		
		
		
		
		var project_average_price = 0;
		var project_average_term = 0;
		var project_max_price = 0;
		var project_max_term = 0;
		var project_min_price = 0;
		var project_min_term = 0 ;
		var project_total_price = 0;
		
		if (typeof(data.project_info) != "undefined"){
			var info = data.project_info;
			project_total_price = info.project_total_price * 10000;
			project_max_price = info.project_max_price * 10000;
			project_min_price = info.project_min_price * 10000;
			project_average_price = info.project_average_price * 10000;
			
			project_max_term = info.project_max_term;
			project_min_term = info.project_min_term;
			project_average_term = info.project_average_term;	
			
		}
		
		var html = "";
		html += "<div class='group_header type3 fixheight_s'>";
		html += "	<h3>"+g360.g_lang.Artwork_creating_status+"</h3>";
		html += "</div>";
		html += "<div class='wrap_group project_infograph'>";
		html += "	<div class='pj_title'>";
		html += "		<dl class='ei_title'>";
		html += "			<dt>"+g360.g_lang.Completed_project+"</dt>";
		html += "			<dd>"+data.project_totalcount+g360.g_lang.Artist_Mypage7+"</dd>";
		html += "		</dl>";
		html += "		<dl class='ei_title'>";
		html += "			<dt>"+g360.g_lang.Cumulative_amount+"</dt>";

		html += "			<dd>"+g360.comma(g360.setWon(project_total_price))+"</dd>";
		html += "		</dl>";
		html += "	</div>";
		html += "	<div class='wrap_flex'>";
		html += "		<div class='wrap_col bg_white' style='padding:17px 20px'>";
	//	html += "			<h4>세부항목 평가</h4>";
		html += "			<div class='pj_detail'>";
		html += "				<div style='width:293px'><canvas id='canvas2'></canvas></div>";
		html += "			</div>";
		html += "		</div>";
		html += "		<div class='wrap_col bg_white' style='padding:17px 20px'>";
		html += "			<div class='pj_price'>";
		html += "			<h4>"+g360.g_lang.Average_amount+"</h4>";
		html += "			<div>";
		html += "				<dl>";
		html += "					<dt>"+g360.g_lang.Average_price+"</dt>";
		html += "					<dd>"+g360.comma(g360.setWon(project_average_price))+"</dd>";
		html += "				</dl>";
		html += "				<dl>";
		html += "					<dt>"+g360.g_lang.Lowest_price+"</dt>";
		html += "					<dd>"+g360.comma(g360.setWon(project_min_price))+"</dd>";
		html += "				</dl>";
		html += "				<dl>";
		html += "					<dt>"+g360.g_lang.Highest_price+"</dt>";
		html += "					<dd>"+g360.comma(g360.setWon(project_max_price))+"</dd>";
		html += "				</dl>";
		html += "			</div>";
		html += "			<div class='pj_bar'>";
		html += "				<ul>";
		html += "					<li>"+g360.comma(g360.setWon(project_min_price))+"</li>";
		html += "					<li>"+g360.comma(g360.setWon(project_average_price))+"</li>";
		html += "					<li>"+g360.comma(g360.setWon(project_max_price))+"</li>";
		html += "				</ul>";
		html += "			</div>";
		html += "		</div>";
		html += "	</div>";
		
		
		if (typeof(data.project_info) != "undefined"){
			html += "	<div class='wrap_col bg_white' style='padding:17px 20px'>";
			html += "		<div class='pj_period'>";
			html += "			<h4>"+g360.g_lang.Project_average_period+"</h4>";
			html += "			<div>";
			html += "				<dl>";
			html += "					<dt>"+g360.g_lang.Average_period+"</dt>";
			html += "					<dd>"+info.project_average_term+g360.g_lang.Partners22+"</dd>";
			html += "				</dl>";
			html += "				<dl>";
			html += "					<dt>"+g360.g_lang.Shortest_period+"</dt>";
			html += "					<dd>"+info.project_min_term+g360.g_lang.Partners22+"</dd>";
			html += "				</dl>";
			html += "				<dl>";
			html += "					<dt>"+g360.g_lang.Longest_period+"</dt>";
			html += "					<dd>"+info.project_max_term+g360.g_lang.Partners22+"</dd>";
			html += "				</dl>";
			html += "			</div>";
			html += "			<div class='pj_bar'>";
			html += "				<ul>";
			html += "					<li>"+info.project_min_term+g360.g_lang.Partners22+"</li>";
			html += "					<li>"+info.project_average_term+g360.g_lang.Partners22+"</li>";
			html += "					<li>"+info.project_max_term+g360.g_lang.Partners22+"</li>";
			html += "				</ul>";
			html += "			</div>";
			html += "		</div>";
			html += "	</div>";
		}
		

		
		
		
		html += "</div>";
		html += "</div>";
		html += "</div>";
		
		
		
		$("#history_list_dis").html(html);
		
		
		config2.data.datasets[0].data[0] = data.project_type1_totalcount;
		config2.data.datasets[0].data[1] = data.project_type2_totalcount;
		config2.data.datasets[0].data[2] = data.project_type3_totalcount;
		var ctx = document.getElementById('canvas2').getContext('2d');
		window.myDoughnut = new Chart(ctx, config2);
		
		
		
	},
	
	
	
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	"load_regartistlist" : function(){
		
		var url = g360.root_path + "/artist_reg_list.mon";
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			cache : false,
			success : function(data){
				var html = "";
				
				html += "<section class='author_register_sh'> <!-- 클래스 추가 -->";
				html += "	<div class='group_section'>";
				html += "		<div class='group_header type3 fixheight_m'>";
				html += "			<h3>"+g360.g_lang.Artist+"</h3>";
				html += "			<a href='' class='btn btn_violet btn_edit' onclick=\"gPPF.regartist_open(); return false;\">"+g360.g_lang.Register+"</a>";
				html += "		</div>";
				html += "	</div>";
				html += "	<div class='container'>";
				html += "		<div id='artist_list_wrapper' class='row pt-3'>";
				
				for (var i = 0 ; i < data.length; i++){
					var user = data[i];
					var email = user.email;
					var img = user.phtoimage;
					var bgimg = g360.user_photo_gray_url(user.email)
					var name = user.name;
					var name_eng = user.name_eng;
					
					html += "			<div class='col-lg-4 col-sm-6'>";
					html += "				<div class='artist-item-wrap'>";
					html += "					<div class='pic' data-artist-id='"+email+"' onclick=\"gPPF.open_reg_artist('"+email+"')\">";
					html += "						<div class='artist'>";
					html += "							<div class='img-cover' style=\"background-image:url('"+bgimg+"')\"></div>";
					html += "						</div>";
					html += "					</div>";
					html += "					<div class='info'>";
					html += "						<h3>"+name+"</h3>";
					html += "						<h4>"+name_eng+"</h4>";
					html += "					</div>";
					html += "				</div>";
					html += "			</div>";
				}
				
		
				html += "		</div>";
				html += "	</div>";
				html += "</section>";
				
				
				
				$("#regartist_list").html(html);
			},
			error : function(e){
				g360.error_alert();
			}
		})
		
		
	},
	
	
	
	"regartist_open" : function(){
		var email = g360.UserInfo.email;
		var bun = new Date().getTime();
		var reg_email = email + "-spl-" + bun;
		gPPF.cUserEmail = reg_email;
		gPPF.load_career_list_artist("new", reg_email);
	},
	
	"open_reg_artist" : function(email){
		gPPF.cUserEmail = email;
		gPPF.load_career_list_artist("open", email);
	},
	
	
	
	"load_career_list_artist" : function(opt, email){
		
		var url = g360.root_path + "/search_userinfo.mon?id="+gPPF.cUserEmail;
		
		$.ajax({
			type : "GET",
			dataType : "json",
			contenttype : "application/json; charset=utf-8",
			url : url,
			cache : false,
			async : false,
			success : function(data){
				
				if (data == null){
					
				}else{
					gPPF.group_list = data.group;
					gPPF.education_list = data.education;
					gPPF.career_list = data.career;
					gPPF.cert_list = data.cert;
					gPPF.display_list = data.display;
					
					gPPF.cUserInfo = data;
				}

				
				gPPF.load_career_list_draw_artist(opt);
				
				gPPF.imageEventBind();
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	"load_career_list_draw_artist" : function(opt){
		
		gPPF.opt = opt;
		
		var html = "";
		
		html += "<section>";
		html += "	<!-- start -->";
		html += "	<div class='group_section'>";
		html += "		<div class='group_header type3 fixheight_s'>";
		html += "			<h3>"+g360.g_lang.Basic_Information+"</h3>";
		html += "		</div>";
		html += "		<div class='wrap_group account_table_area bg_white'>";
		html += "			<table class='full_width_sh'>";
		html += "				<tbody>";
		html += "					<tr>";
		html += "						<th><span>"+g360.g_lang.Artist_Name2+"</span></th>";
		html += "						<td id='info_edit1'><input class='txt' type='text' id='artist_reg_name'></td>";
		html += "						<td id='info_read1'><p style='font-size: 17px; margin-top:9px' id='artist_reg_name_read'></p></td>";
		html += "					</tr>";
		html += "					<tr>";
		html += "						<th><span>"+g360.g_lang.Original_Name+"</span></th>";
		html += "						<td id='info_edit2'><input class='txt' type='text' id='artist_reg_engname'></td>";
		html += "						<td id='info_read2'><p style='font-size: 17px; margin-top:9px'  id='artist_reg_engname_read'></p></td>";
		html += "					</tr>";
		html += "					<tr>";
		html += "						<th><span>"+g360.g_lang.Artist_Introduction+"</span></th>";
		html += "						<td id='info_edit3'><textarea class='txt textarea' id ='artist_reg_content1'></textarea><span></span></td>";
		html += "						<td id='info_read3'><p style='font-size: 17px; margin-top:9px'  id='artist_reg_content1_read'></p><span></span></td>";
		html += "					</tr>";
		html += "					<tr>";
		html += "						<th><span>"+g360.g_lang.ArtistNote+"</span></th>";
		html += "						<td id='info_edit4'><textarea class='txt textarea' id='artist_reg_content2'></textarea><span></span></td>";
		html += "						<td id='info_read4'><p style='font-size: 17px; margin-top:9px' id='artist_reg_content2_read'></p><span></span></td>";
		html += "					</tr>";
		html += "				</tbody>";
		html += "			</table>";
		html += "			<div class='btn_area bottom_area full_width_sh'>";
		html += "				<button class='btn btn_gray' id='artist_list' onclick=\"gPPF.save_artist_info_list();return false\">"+g360.g_lang.List+"</button>";
		html += "				<button class='btn btn_gray' id='artist_delete' onclick=\"gPPF.save_artist_info_delete();return false\">"+g360.g_lang.Delete+"</button>";
		html += "				<button class='btn btn_violet btn_cancel' id='artist_modify' onclick=\"gPPF.save_artist_info_modify();return false\">"+g360.g_lang.Update+"</button>";
		html += "				<button class='btn btn_violet btn_ok' id='artist_reg' onclick=\"gPPF.save_artist_info_reg(); return false;\">"+g360.g_lang.Register+"</button>";
		html += "			</div>";
		html += "		</div>";
		html += "	</div>";
		
		html += "	<div class='group_section'>";
		html += "		<div class='group_header type3 fixheight_m'>";
		html += "			<h3>"+g360.g_lang.Photo_registration+"</h3>";
		html += "		</div>";
		html += "		<div class='wrap_group account_table_area bg_white'>";
		html += "			<table class='full_width_sh'>";
		html += "				<tbody>";
		html += "					<tr>";
		html += "						<th>";
		html += "							<span id='btn_profile_list_info' class='t_info_sh'>"+g360.g_lang.ProfileSetting_Alert6+"</span>";
		html += "							<div id='layer_profile_list_info' class='img_reginfo_sh' style='display:none;'>";
		html += "								<div>";
		html += "									<p>"+g360.g_lang.ProfileSetting_Alert5+"</p>";
		html += "									<img src='/img/account/img_layer_info1.jpg' alt='' />";
		html += "								</div>";
		html += "							</div>";
		html += "						</th>";
		html += "						<td>";
		html += "							<div id='artist_reg_pic' class='thm_author_info_sh'>";
		html += "								<img src='/img/account/thumb_default_author.png'>";
		html += "								<img src='/img/account/btn-edit-profile-img.svg' alt='수정' class='btn_edit_sh'>";
		html += "							</div>";
		html += "							<div style='max-width:410px;'>";
		html += "								<div id='artist_reg_img' class='account_img_artist' style='display:none;'>";
		html += "									<img src='/img/account/btn-edit-profile-img.svg' alt='수정' class='btn_edit_sh'>";
		html += "								</div>";
		html += "							</div>";
		html += "							<p class='txt_info_sh'>";
		html += 								g360.g_lang.ProfileSetting_Alert3;
		html += "							</p>";
		html += "						</td>";
		html += "					</tr>";
		html += "					<tr>";
		html += "						<th>";
		html += "							<span id='btn_profile_detail_info' class='t_info_sh'>"+g360.g_lang.ProfileSetting_Alert7+"</span>";
		html += "							<div id='layer_profile_detail_info' class='img_reginfo_sh' style='display:none;'>";
		html += "								<div>";
		html += "									<p>"+g360.g_lang.ProfileSetting_Alert4+"</p>";
		html += "									<img src='/img/account/img_layer_info2.jpg' alt='' />";
		html += "								</div>";
		html += "							</div>";
		html += "						</th>";
		html += "						<td>";
		html += "							<div id='artist_reg_pic_detail' class='thm_author_info_sh'>";
		html += "								<img src='/img/account/thumb_default_pic.png'>";
		html += "								<img src='/img/account/btn-edit-profile-img.svg' alt='수정' class='btn_edit_sh'>";
		html += "							</div>";
		html += "							<div id='artist_reg_img_detail' class='account_img_artist' style='display:none;'>";
		html += "								<img src='/img/account/btn-edit-profile-img.svg' alt='수정' class='btn_edit_sh'>";
		html += "							</div>";
//		html += "							<div class='thm_author_info_sh user_thm_sh'>";
//		html += "								<img src='../img/account/sample.jpg' alt='' /><img src='/img/account/btn-edit-profile-img.svg' alt='수정' class='btn_edit_sh'>";
//		html += "							</div>";
		html += "							<p class='txt_info_sh'>";
		html += 								g360.g_lang.ProfileSetting_Alert2;
		html += "							</p>";
		html += "						</td>";
		html += "					</tr>";
		html += "				</tbody>";
		html += "			</table>";
		html += "		</div>";
		html += "	</div>";
		
		html += "	<div>";
		
		html += gPPF.draw_career_info();	
		
		
		html += "	</div>";

		html += "</section>";

			
		$("#regartist_list").html(html);
		
		
		
		
	
		
		if (opt == "new"){
			gPPF.show_edit_field();
			$("#artist_delete").hide();
			$("#artist_modify").hide();
			$("#artist_reg").show();
			
		}else if (opt == "open"){
			
			var info = gPPF.cUserInfo;
			

			
			$("#artist_reg_name_read").text(info.name);
			$("#artist_reg_engname_read").text(info.name_eng);
			$("#artist_reg_content1_read").html(g360.TextToHtml_Body(info.content));
			$("#artist_reg_content2_read").html(g360.TextToHtml_Body(info.content2));
			
			$("#artist_reg_name").val(info.name);
			$("#artist_reg_engname").val(info.name_eng);
			$("#artist_reg_content1").val(info.content);
			$("#artist_reg_content2").val(info.content2);
			
			$("#artist_delete").show();
			$("#artist_modify").show();
			$("#artist_reg").hide();
			
			// 사진정보 뿌려주기
			if (info.photoimage_list){
				$('#artist_reg_img').show();
				$("#artist_reg_pic").hide();
				$('#artist_reg_img').css('background-image', 'url(' + g360.user_photo_color_url(info.email) + ')');
			} else {
				$('#artist_reg_img').hide();
				$('#artist_reg_pic').prev().show();
			}
			if (info.photoimage_profile){
				$('#artist_reg_img_detail').show();
				$("#artist_reg_pic_detail").hide();
				$('#artist_reg_img_detail').css('background-image', 'url(' + g360.user_photo_profile_url(info.email) + ')');
			} else {
				$('#artist_reg_img_detail').hide();
				$('#artist_reg_pic_detail').prev().show();
			}
			
			
			
			gPPF.show_dis_field();
		}
		
		
		return false;
	
	},
	
	"imageEventBind" : function(){
		var _self = this;
		
		// 작가사진 정보
		$('#btn_profile_list_info').on('click', function(){
			$('#layer_profile_list_info').toggle();
		});
		$('#btn_profile_list_info').on('mouseover', function(){
			$('#layer_profile_list_info').show();
		});
		$('#btn_profile_list_info').on('mouseout', function(){
			$('#layer_profile_list_info').hide();
		});
		
		// 상세사진 정보
		$('#btn_profile_detail_info').on('click', function(){
			$('#layer_profile_detail_info').toggle();
		});
		$('#btn_profile_detail_info').on('mouseover', function(){
			$('#layer_profile_detail_info').show();
		});
		$('#btn_profile_detail_info').on('mouseout', function(){
			$('#layer_profile_detail_info').hide();
		});
		
		// 작가 사진 편집
		$('#artist_reg_pic, #artist_reg_img').on('click', function(){
			$('#layer_image_file').off('change').on('change', function(){
				
				var options = {
					email:_self.cUserEmail,
					imgId:'img_artist',
					width:300,
					height:150,
					resultSize:{width:600},
					onUploadStart: function(data){
						_self.timeout_id = setTimeout(function(){g360.loadingbar_open(g360.g_lang.Upload_File);}, 2000);
					},
					onUploadComplete: function(res){
						if (res.result == 'ERROR') {
							alert(g360.g_lang.Upload_Error);
						} else {
							_self.changeImage(options.imgId, res.url);
						}
						clearTimeout(_self.timeout_id);
						g360.loadingbar_close();
					}
				}
				g360.readFileImage(this, options);
				
			});
			$('#layer_image_file').click();
		});		
		
		// 작가 상세 사진 편집
		$('#artist_reg_pic_detail, #artist_reg_img_detail').on('click', function(){
			$('#layer_image_file').off('change').on('change', function(){
				var options = {
					email:_self.cUserEmail,
					imgId:'img_artist_detail',
					width:300,
					height:150,
					resultSize:{width:1140},
					onUploadStart: function(data){
						_self.timeout_id = setTimeout(function(){g360.loadingbar_open(g360.g_lang.Upload_File);}, 2000);
					},
					onUploadComplete: function(res){
						if (res.result == 'ERROR') {
							alert(g360.g_lang.Upload_Error);
						} else {
							_self.changeImage(options.imgId, res.url);
						}
						clearTimeout(_self.timeout_id);
						g360.loadingbar_close();
					}
				}
				g360.readFileImage(this, options);
				
			});
			$('#layer_image_file').click();
		});
	},
	
	"changeImage" : function(img_id, url){
		var img_url = url + "?open&ver=" + new Date().getTime();
		
		if (img_id == 'img_artist') {
			$('#artist_reg_img').css('background-image', 'url(' + img_url + ')');
			$('#artist_reg_img').show();
			$('#artist_reg_pic').hide();
		} else if (img_id == 'img_artist_detail') {
			$('#artist_reg_img_detail').css('background-image', 'url(' + img_url + ')');
			$('#artist_reg_img_detail').show();
			$('#artist_reg_pic_detail').hide();
		}		
	},
	
	"save_artist_info_modify" : function(){
		//debugger;
		$("#artist_delete").hide();
		$("#artist_reg").show();
		$("#artist_modify").hide();
		
		//gPPF_Rental.opt = "edit";
		
		gPPF.show_edit_field();
	},
	
	"save_artist_info_delete" : function(){
		var url = g360.root_path + "/artist_reg_delete.mon?id=" + gPPF.cUserEmail;
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			cache : false,
			url : url,
			success : function(data){
				gPPF.load_regartistlist();
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"save_artist_info_list" : function(){
		gPPF.load_regartistlist();
	},
	
	
	"save_artist_info_reg" : function(){
		
		var name = $("#artist_reg_name").val();
		var ename = $("#artist_reg_engname").val();
		var content = $("#artist_reg_content1").val();
		var content2 = $("#artist_reg_content2").val();
		
		
		var data = JSON.stringify({
			email : gPPF.cUserEmail,
			name : name,
			nickname : gPPF.cUserInfo.nickname,
			ename : ename,
			content : content,
			content2 : content2
		});
				
		if (gPPF.opt == "new"){
			var urll = g360.root_path + "/check_nickname.mon?nickname=" + encodeURIComponent(name);
			$.ajax({
				type : "GET",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : urll,
				success : function(res){
					if (res.result == "F"){
						var url = g360.root_path + "/artistinfo_save_reg.mon";
						$.ajax({
							type : "Post",
							data : data,
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							url : url,
							success : function(xdata){
								
								if (xdata.result == "OK"){
									gPPF.read_artistinfo_reg(data);
									
									$("#artist_delete").show();
									$("#artist_modify").show();
								}else{
									g360.error_alert();
								}			
								
								return false;

							},
							error : function(e){
								g360.error_alert();
							}
						})
					}else{
						g360.gAlert("Info", g360.g_lang.ProfileSetting_Alert1 , "blue", "top");
					}
				}
			})
		}else{
			
			var url = g360.root_path + "/artistinfo_save_reg.mon";
			$.ajax({
				type : "Post",
				data : data,
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(xdata){
					
					if (xdata.result == "OK"){
						gPPF.read_artistinfo_reg(data);
						
						$("#artist_delete").show();
						$("#artist_modify").show();
					}else{
						g360.error_alert();
					}			
					
					return false;

				},
				error : function(e){
					g360.error_alert();
				}
			})		
			
		}
		
		
		
		
		
		
	},
	
	"read_artistinfo_reg" : function(data){
		gPPF.show_dis_field();
	
		
		var data = JSON.parse(data);
		
		$("#artist_reg_name_read").text(data.name);
		$("#artist_reg_engname_read").text(data.ename);
//		$("#artist_reg_content1_read").text(data.content);
//		$("#artist_reg_content2_read").text(data.content2);
		
		$("#artist_reg_content1_read").html(g360.TextToHtml_Body(data.content));
		$("#artist_reg_content2_read").html(g360.TextToHtml_Body(data.content2));
		
		$("#artist_list").show();
		$("#artist_delete").show();
		$("#artist_modify").show();
		$("#artist_reg").hide();
	},
	
	"show_dis_field" : function(){
		$("#info_read1").show();
		$("#info_read2").show();
		$("#info_read3").show();
		$("#info_read4").show();
		
		$("#info_edit1").hide();
		$("#info_edit2").hide();
		$("#info_edit3").hide();
		$("#info_edit4").hide();
	},
	
	"show_edit_field" : function(){
		
		$("#info_read1").hide();
		$("#info_read2").hide();
		$("#info_read3").hide();
		$("#info_read4").hide();
		
		$("#info_edit1").show();
		$("#info_edit2").show();
		$("#info_edit3").show();
		$("#info_edit4").show();
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	


	/////////////////////////// 리스트 페이징 시작 //////////////////////////////////////////////////////////////
	"search_paging" : function(page){
		var alldocuments = gPPF.totalcount;
		if (alldocuments % gPPF.perpage > 0 & alldocuments % gPPF.perpage < gPPF.perpage/2 ){
			allPage = Number(Math.round(alldocuments/gPPF.perpage)) + 1;
		}else{
			allPage = Number(Math.round(alldocuments/gPPF.perpage));
		}	

		gPPF.search_navigator(page);
	},
	
	"search_navigator" : function(page){
		var nav_cpage = page;

		var alldocuments = gPPF.totalcount;
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
				nav[0] = '<li class="p_prev"><a href="#" class="xico" onclick="javascript:gPPF.gotoPage(' + ((((cFrame-1)*10)-1)*gPPF.perpage+1) + ',' + ((cFrame-1)*10) + ');">'+g360.g_lang.Prev+'</a></li>';
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
						nav[pIndex] = "<li><a href=# onclick='gPPF.gotoPage("+ (((i-1) * gPPF.perpage) + 1 ) + ", "+ i + ", this)'>" + i + "</a></li>";
						
					}else{
						if (i%10 == '1' ){
							nav[pIndex] = "<li><a href=# onclick='gPPF.gotoPage("+ (((i-1) * gPPF.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";	
						}else{
							nav[pIndex] = "<li><a href=# onclick='gPPF.gotoPage("+ (((i-1) * gPPF.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";
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
				nav[nav.length] = '<li class="p_next"><a href="#" class="xico" onclick="javascript:gPPF.gotoPage(' + ((cFrame*gPPF.perpage*10) + 1) + ',' + ((cFrame*10)+1) + ');">'+g360.g_lang.Next+'</a></li>';
			}
					
	          var navHTML = "";

			if (cFrame == 1 ){
				navHTML = '';
	          }else{
				navHTML = '<li class="p_first"><a href="#" class="xico" onclick="javascript:gPPF.gotoPage(1,1);">'+g360.g_lang.First+'</a></li>';
	          }		    
			for( var i = 0 ; i < nav.length ; i++){	
	          	navHTML = navHTML + nav[i];
			}
					
			if (cFrame < allFrame){
				navHTML = navHTML + '<li class="p_last"><a href="#" class="xico" onclick="javascript:gPPF.gotoPage(' + ((allPage - 1)*gPPF.perpage + 1) +','+ allPage +')">'+g360.g_lang.Final+'</a></li>';
	        }else{
				navHTML = navHTML;
	        }
	    
			$("#NAVIGATE").html('<div class="paging"><ul>' + navHTML + '</ul></div>');
		}
	},
	
	"gotoPage" : function(Index, PageNum, obj){
		var nav_cpage = PageNum;
		oldpage = nav_cpage;
	
		if (g360.ptype == "history"){
			gPPF.history_list_load(PageNum);
		}else{
			gPPF.load_completed_project_type2(PageNum);
		}
		
	}
	//////////////////////////////////////// 리스트 페이징 종료    /////////////////////////////////////////////


	
	
	
	
	
	
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
