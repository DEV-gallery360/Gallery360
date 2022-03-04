
function gPartnerProfile_Rental(){	
	gPPF_Rental = this;
	gPPF_Rental.skill_list = "";
	gPPF_Rental.group_list = "";
	gPPF_Rental.education_list = "";
	gPPF_Rental.career_list = "";
	gPPF_Rental.cert_list = "";
	gPPF_Rental.display_list = "";
	
	gPPF_Rental.trObj = "";
	
	gPPF_Rental.totalcount = 0;
	gPPF_Rental.perpage = 5;
	gPPF_Rental.cPage = 1;
	
	gPPF_Rental.type = "";
	
	gPPF_Rental.cUserEmail = "";
	gPPF_Rental.cUserInfo = "";
	
	gPPF_Rental.opt = "";
}

gPartnerProfile_Rental.prototype = {		

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
		
	//	gPPF_Rental.read_artistinfo();
		
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
		
			gPPF_Rental.empty_class_on();
			$(this).addClass("on");

			
			var id = event.currentTarget.id;
			
			
			g360.history_record(id);
			if (id == "partner_all"){
				gTopMain.navBtnAction('profile');
				return false;
			}else if (id == "partner_artistinfo"){
				gPPF_Rental.goto_artistInfo();
			}else if (id == "partner_skill"){
				gPPF_Rental.goto_skill();
			}else if (id == "partner_career"){
				gPPF_Rental.goto_career();
			}else if (id == "partner_client_score"){
				gPPF_Rental.type = "score";
				gPPF_Rental.goto_score();
			}else if (id == "partner_project_history"){
				gPPF_Rental.type = "history";
				gPPF_Rental.goto_history();
			}else if (id == "partner_user_info_manual"){
				g360.popup_manual("userinfo");
			}else if (id == "partner_regartist"){
				gPPF_Rental.goto_regartist();
			}
			
		});
		
		$("#artistinfo_edit").on("click", function(event){
			gPPF_Rental.edit_artistinfo();
		});
		
		
		$("#skill_edit").on("click", function(event){
			//alert("클릭");
			gPPF_Rental.skill_edit();
		});
	
		
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
					$("#profile_category").text("작가");
				}else if (data.gubun == "curator"){
					$("#profile_category").text("아트 컨설턴트");
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
				
				
				$("#profile_project").text(data.project_totalcount + "건");
				
				$("#profile_artcount").text(data.saved_art_totalcount + "개");
				
				if (typeof(data.score) != "undefined"){
					config.data.datasets[0].data[0] = score.score1;
					config.data.datasets[0].data[1] = score.score2;
					config.data.datasets[0].data[2] = score.score3;
					config.data.datasets[0].data[3] = score.score4;
					config.data.datasets[0].data[4] = score.score5;
					
					window.myRadar = new Chart(document.getElementById('canvas'), config);
					
					$("#profile_point").text(rtotal + "점")
				}else{
					$("#profile_point").text("0점")
				}
				
				
				
				config2.data.datasets[0].data[0] = data.project_type1_totalcount;
				config2.data.datasets[0].data[1] = data.project_type2_totalcount;
				config2.data.datasets[0].data[2] = data.project_type3_totalcount;
				var ctx = document.getElementById('canvas2').getContext('2d');
				window.myDoughnut = new Chart(ctx, config2);
				
				gPPF_Rental.draw_project_complete_list(data);
				
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
		html += "	<h3>평가 정보</h3>";
		html += "	<a href='#' class='btn_more' onclick=\"gPPF_Rental.goto_artproject_end();\">더 보기</a>";
		html += "</div>";
		
	
		for (var i = 0; i < ddd.length; i++){
			var dx = ddd[i];
			
			var score = dx.eval;
			var totalscore = parseInt(score.score1) + parseInt(score.score2) + parseInt(score.score3) + parseInt(score.score4) +parseInt(score.score5);
			var rtotal = parseInt(totalscore) / 5;
			var sctotal = Math.ceil(rtotal);
			

			
			html += "<div class='wrap_group evaluation'>";
			html += "	<div class='wrap_group_header'>";
			html += "	<h4><em class='blue_label'>작품제작요청</em>"+dx.request_title+"</h4>";
			html += "		<div class='evaluation_info'>";
			html += "			<dl>";
			html += "				<dt>클라이언트</dt>";
			html += "				<dd>"+dx.request_nickname+"<dd>";
			html += "			</dl>";
			html += "			<dl>";
			html += "				<dt>계약 체결 일시</dt>";
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
			html += "			<span>"+rtotal+"점</span>";
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
			html += "					<th>계약 명</th>";
			html += "					<td colspan='3'><strong>"+dx.request_title+"</strong></td>";
			html += "				</tr>";
			html += "				<tr>";
			html += "					<th>계약금액</th>";
			html += "					<td><strong>"+g360.comma(g360.setWon(dx.selected_price))+"</strong> </td>";
			html += "					<th>계약 기간</th>";
			html += "					<td><strong>"+(parseInt(dx.seleted_term)+5)+"</strong> (제작기간"+dx.seleted_term+"일 + 배송기간 5일)</td>";
			html += "				</tr>";
			html += "			</tbody>";
			html += "		</table>";
			html += "	</div>";
			html += "</div>";
			
		}
		
		
	
		$("#profile_project_complete_list").html(html);
	},
	
	"load_profile_main" : function(){
		var url = g360.root_path + "/search_userinfo.mon?id="+gPPF_Rental.cUserEmail;
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
						for (var i = 0 ; i < data.education.length; i++){
							var sp = data.education[i];
							if (typeof(sp.schoolname) != "undefined"){
								html += "					<tr id='edu_tr_"+i+"'>";
								html += "						<td id='edu_level_"+i+"' style='display:none'>"+sp.level+"</td>";
								html += "						<td id='edu_schoolname_"+i+"'>"+sp.schoolname+"</td>";
								html += "						<td id='edu_major_"+i+"'>"+sp.major+"</td>";
								html += "						<td id='edu_level_"+i+"'>"+sp.level+"</td>";							
								html += "						<td id='edu_status_"+i+"'>"+sp.status+"</td>";
								html += "						<td id='edu_start_"+i+"'>"+sp.start+"</td>";
								html += "						<td id='edu_end_"+i+"'>"+sp.end+"</td>";							
							//	html += "						<td class='t_modify' style='text-align:right'><button class='btn btn_cell_edit'  onclick=\"gPPF_Rental.edu_tr_edit('edu_tr_"+i+"')\">수정</button></td>";
							//	html += "						<td class='t_delete' ><button class='btn btn_cell_delete'  onclick=\"gPPF_Rental.edu_tr_delete('edu_tr_"+i+"')\">삭제</button></td>";		
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
				html += "<h3>자기 소개</h3>";
				html += "	<a id='artistinfo_edit' onclick=\'gPPF_Rental.edit_artistinfo()\' class='btn btn_violet btn_edit' style='color:white'>편집하기</a>";
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
					html += "<h3>작가 노트</h3>";
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
		var html = "";
		
		html += "<div class='group_header type3 fixheight_m'>";
		html += "	<h3>자기소개</h3>";
		html += "</div>";
		html += "<div class='wrap_group introduce term bg_white minheight'>";
		html += "	<textarea class='txt textarea' id='artistinfo_txt' placeholder='자신의 개인 소개를 작성합니다. 작가 소개 파트에 표시됩니다.'></textarea>";
		
		var gubun = g360.UserInfo.gubun;
		if (gubun != "curator"){
			html += "<div class='group_header type3 fixheight_m'>";
			html += "	<h3>작가노트</h3>";
			html += "</div>";
			html += "<div class='wrap_group introduce term bg_white minheight'>";
			html += "	<textarea class='txt textarea' id='artistinfo_txt2' placeholder='나만의 작품관을 기술합니다. 작가 소개 파트에 표시됩니다.'></textarea>";

		}
		

	//	html += "	<span>5000자 미만</span>";
		html += "	<div class='btn_area bottom_area'>";
		html += "		<button class='btn btn_gray btn_cancel' onclick=\'gPPF_Rental.edit_cancel()\'>취소</button>";
		html += "		<button class='btn btn_violet btn_ok'  onclick=\'gPPF_Rental.save_artist_info()\'>수정 완료</button>";
		html += "	</div>";
		
		
		html += "</div>";
	
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
		
		gPPF_Rental.read_artistinfo();
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
					gPPF_Rental.read_artistinfo();
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
		var url = g360.root_path + "/search_userinfo.mon?id="+gPPF_Rental.cUserEmail;
		url += "?" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contenttype : "application/json; charset=utf-8",
			url : url,
			async : false,
			success : function(data){
			
				var res = data.skill;
				gPPF_Rental.skill_list = res;
				
				gPPF_Rental.load_skill_data(data);
				
				
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
				g360.gAlert("Info","분야를 입력하세요", "blue", "top");
				return false;
			}
			var level = $("#txt_input_set_" + i).text().replace(/\t/g, '');
			if (level == "선택"){
				g360.gAlert("Info","숙련도를 선택하세요", "blue", "top");
				return false;
			}
			var career = $("#txt_input_year_" + i).text().replace(/\t/g, '');
			if (career == "선택"){
				g360.gAlert("Info","경력을 선택하세요", "blue", "top");
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
					gPPF_Rental.load_skill_data_to_userinfo();
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
		html += "<h3>보유 기술</h3>";
		html += "	<a class='btn btn_violet btn_edit' style='color:white' onclick=\'gPPF_Rental.skill_edit()\'>편집하기</a>";
		html += "</div>";
		html += "<div class='wrap_group table_area term' style='padding-bottom:70px'>";
		html += "<div class='round_table'>";
		html += "	<table class='t_skill'>";
		html += "		<thead>";
		html += "			<tr>";
		html += "				<th>분야</th>";
		html += "				<th>숙련도</th>";
		html += "				<th>경력</th>";
		html += "			</tr>";
		html += "		</thead>";
		html += "		<tbody id='skill_list_display'>";
		
	//	var res = data.skill;
	//	gPPF_Rental.skill_list = res;
		
		var res = gPPF_Rental.skill_list;
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
		
		//var res = gPPF_Rental.load_skill_data_to_userinfo();
		
		var html = "";
		html += "<div class='group_header type3 fixheight_m'>";
		html += "	<h3>보유 기술</h3>";
		html += "</div>";
		html += "<div class='wrap_group table_area term' style='padding-bottom:70px'>";
		html += "	<div class='round_table'>";
		html += "		<table class='t_skill_edit t_edit t_block'>";
		html += "			<thead>";
		html += "				<tr>";
		html += "					<th>분야</th>";
		html += "					<th>숙련도</th>";
		html += "					<th>경력</th>";
		html += "					<th class='t_delete'></th>";
		html += "				</tr>";
		html += "			</thead>";
		
		
		html += "			<tbody id='skill_edit_list_dis'>";
		
		var obj = gPPF_Rental.skill_list;	
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
				html += "								<a class='dropdown-item' onclick=\"gPPF_Rental.set_val(\'초급\', \'txt_input_set_"+(i+1)+"\')\">초급</a>";
				html += "								<a class='dropdown-item' onclick=\"gPPF_Rental.set_val(\'중급\', \'txt_input_set_"+(i+1)+"\')\">중급</a>";
				html += "								<a class='dropdown-item' onclick=\"gPPF_Rental.set_val(\'고급\', \'txt_input_set_"+(i+1)+"\')\">고급</a>";
				html += "							</div>";
				html += "						</div>";
				html += "					</td>";
				html += "					<td>";
				html += "						<div class='btn-group'>";
				html += "							<button class='bg-transparent border-0 dropdown-toggle' id='txt_input_year_"+(i+1)+"' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
				html += "							"+subobj.career+"";
				html += "							</button>";
				html += "							<div class='dropdown-menu'>";
				html += "								<a class='dropdown-item' onclick=\"gPPF_Rental.set_val(\'3년이하\', \'txt_input_year_"+(i+1)+"\')\">3년이하</a>";
				html += "								<a class='dropdown-item' onclick=\"gPPF_Rental.set_val(\'3년 이상 5년 미만\', \'txt_input_year_"+(i+1)+"\')\">3년 이상 5년 미만</a>";
				html += "								<a class='dropdown-item' onclick=\"gPPF_Rental.set_val(\'5년 이상 10년 미만\', \'txt_input_year_"+(i+1)+"\')\">5년 이상 10년 미만</a>";
				html += "								<a class='dropdown-item' onclick=\"gPPF_Rental.set_val(\'10년 이상\', \'txt_input_year_"+(i+1)+"\')\">10년 이상</a>";
				html += "							</div>";
				html += "						</div>";
				html += "					</td>";
				html += "					<td class='t_delete'><button class='btn btn_cell_delete'  onclick=\'gPPF_Rental.row_delete("+(i+1)+")\'>삭제</button></td>";
				html += "				</tr>";
			}
		}else{
			html += "				<tr id='skill_1'>";
			html += "					<td><input type='text'  id='skill_title_1' class='txt' /></td>";
			html += "					<td>";
			html += "						<div class='btn-group'>";
			html += "							<button class='bg-transparent border-0 dropdown-toggle' id='txt_input_set_1' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
			html += "							선택";
			html += "							</button>";
			html += "							<div class='dropdown-menu'>";
			html += "								<a class='dropdown-item' onclick=\"gPPF_Rental.set_val(\'초급\', \'txt_input_set_1\')\">초급</a>";
			html += "								<a class='dropdown-item' onclick=\"gPPF_Rental.set_val(\'중급\', \'txt_input_set_1\')\">중급</a>";
			html += "								<a class='dropdown-item' onclick=\"gPPF_Rental.set_val(\'고급\', \'txt_input_set_1\')\">고급</a>";
			html += "							</div>";
			html += "						</div>";
			html += "					</td>";
			html += "					<td>";
			html += "						<div class='btn-group'>";
			html += "							<button class='bg-transparent border-0 dropdown-toggle' id='txt_input_year_1' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
			html += "							선택";
			html += "							</button>";
			html += "							<div class='dropdown-menu'>";
			html += "								<a class='dropdown-item' onclick=\"gPPF_Rental.set_val(\'3년이하\', \'txt_input_year_1\')\">3년이하</a>";
			html += "								<a class='dropdown-item' onclick=\"gPPF_Rental.set_val(\'3년 이상 5년 미만\', \'txt_input_year_1\')\">3년 이상 5년 미만</a>";
			html += "								<a class='dropdown-item' onclick=\"gPPF_Rental.set_val(\'5년 이상 10년 미만\', \'txt_input_year_1\')\">5년 이상 10년 미만</a>";
			html += "								<a class='dropdown-item' onclick=\"gPPF_Rental.set_val(\'10년 이상\', \'txt_input_year_1\')\">10년 이상</a>";
			html += "							</div>";
			html += "						</div>";
			html += "					</td>";
			html += "					<td class='t_delete'><button class='btn btn_cell_delete'  onclick=\'gPPF_Rental.row_delete(1)\'>삭제</button></td>";
			html += "				</tr>";
		}
		
		
		
		html += "			</tbody>";
		
		html += "		</table>";
		html += "	</div>";
		html += "	<div class='btn_area bottom_area'>";
		html += "		<button class='btn btn_violet btn_cell_add' onclick=\'gPPF_Rental.add_skill_data();\'>추가</button>";
		html += "		<button class='btn btn_gray btn_cancel' onclick=\'gPPF_Rental.load_skill_data();\'>취소</button>";
		html += "		<button class='btn btn_violet btn_ok' onclick=\'gPPF_Rental.save_skill();\'>수정 완료</button>";
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
		html += "							선택";
		html += "							</button>";
		html += "							<div class='dropdown-menu'>";
		html += "								<a class='dropdown-item' onclick=\"gPPF_Rental.set_val(\'초급\', \'txt_input_set_"+i+"\')\">초급</a>";
		html += "								<a class='dropdown-item' onclick=\"gPPF_Rental.set_val(\'중급\', \'txt_input_set_"+i+"\')\">중급</a>";
		html += "								<a class='dropdown-item' onclick=\"gPPF_Rental.set_val(\'고급\', \'txt_input_set_"+i+"\')\">고급</a>";
		html += "							</div>";
		html += "						</div>";
		html += "					</td>";
		html += "					<td>";
		html += "						<div class='btn-group'>";
		html += "							<button class='bg-transparent border-0 dropdown-toggle' id='txt_input_year_"+i+"' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
		html += "							선택";
		html += "							</button>";
		html += "							<div class='dropdown-menu'>";
		html += "								<a class='dropdown-item' onclick=\"gPPF_Rental.set_val(\'3년이하\', \'txt_input_year_"+i+"\')\">3년이하</a>";
		html += "								<a class='dropdown-item' onclick=\"gPPF_Rental.set_val(\'3년 이상 5년 미만\', \'txt_input_year_"+i+"\')\">3년 이상 5년 미만</a>";
		html += "								<a class='dropdown-item' onclick=\"gPPF_Rental.set_val(\'5년 이상 10년 미만\', \'txt_input_year_"+i+"\')\">5년 이상 10년 미만</a>";
		html += "								<a class='dropdown-item' onclick=\"gPPF_Rental.set_val(\'10년 이상\', \'txt_input_year_"+i+"\')\">10년 이상</a>";
		html += "							</div>";
		html += "						</div>";
		html += "					</td>";
		html += "					<td class='t_delete'><button class='btn btn_cell_delete' onclick=\'gPPF_Rental.row_delete('"+i+"')\'>삭제</button></td>";
		html += "				</tr>";
		
		
		$("#skill_edit_list_dis").append(html);
	},
	
	"set_val" : function(opt, id){
	
		$("#"+id).text(opt);
	},
	
	"row_delete" : function(bun){
		$("#skill_" + bun).remove();
	},
	

	
	"load_career_list_draw" : function(){
		
		console.log("load_career_list_draw");
		var html = gPPF_Rental.draw_career_info();		
		
		$("#career_list").html(html);

	},
	
	
	"draw_career_info" : function(){
		var html = "";
		
		//html += "<div class='group_section'>";
		
		var rt = g360.rental_text;
		var isShow = "";
		if (rt.group == "") {isShow = "none"}
		
		html += "	<div class='group_section' style='display:"+isShow+"'>";
		html += "	<div class='group_header type3 fixheight_m'>";
		html += "		<h3>(선택) "+rt.group+"</h3>";
		html += "		<a class='btn btn_violet btn_edit' style='color:white' onclick=\"gPPF_Rental.edit_group()\">편집하기</a>";
		html += "	</div>";
		html += "	<div class='wrap_group table_area term' id='career_edit1' >";		
		

		html += "		<div class='round_table'>";
		html += "			<table class='t_team t_float'>";
		html += "				<thead>";
		html += "					<tr>";
		html += "						<th>소속 및 단체명</th>";
		html += "						<th>부서</th>";
		html += "						<th>직위</th>";
		html += "					</tr>";
		html += "				</thead>";
		html += "				<tbody>";
				
				
		if ( (typeof (gPPF_Rental.group_list) != "undefined") && gPPF_Rental.group_list.length > 0){
			for (var i = 0 ; i < gPPF_Rental.group_list.length; i++){
				var sp = gPPF_Rental.group_list[i];
		
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
		
		
		
		isShow = "";
		if (rt.sch == "") {isShow = "none"}
		
		html += "<div class='group_section' style='display:"+isShow+"'>";
		html += "	<div class='group_header type3 fixheight_m'>";
		html += "		<h3>(선택) "+rt.sch+"</h3>";
		html += "		<a  class='btn btn_violet btn_edit' style='color:white' onclick=\"gPPF_Rental.edit_education()\">편집하기</a>";
		html += "	</div>";
		html += "	<div class='wrap_group table_area term' id='career_edit2'>";
		
	//	if ( (typeof (gPPF_Rental.education_list) != "undefined") && gPPF_Rental.education_list.length > 0){
			html += "		<div class='round_table'>";
			html += "			<table class='t_education t_float' id='xedu'>";
			html += "				<thead>";
			html += "					<tr>";
			html += "						<th>학교명</th>";
			html += "						<th>전공</th>";
		//	html += "						<th>분류</th>";
			html += "						<th>상태</th>";
			html += "						<th>입학일</th>";
			html += "						<th>졸업일</th>";
			html += "						<th class='t_modify2' style='display:none'></th>";
			html += "						<th class='t_delete2' style='display:none'></th>";
			html += "					</tr>";
			html += "				</thead>";
			html += "				<tbody id='edu_tbody'>";
			
			if ( (typeof (gPPF_Rental.education_list) != "undefined") && gPPF_Rental.education_list.length > 0){
				for (var i = 0 ; i < gPPF_Rental.education_list.length; i++){
					var sp = gPPF_Rental.education_list[i];
					if (typeof(sp.schoolname) != "undefined"){
						html += "					<tr id='edu_tr_"+i+"'>";
						html += "						<td id='edu_level_"+i+"' style='display:none'>"+sp.level+"</td>";
						html += "						<td id='edu_schoolname_"+i+"'>"+sp.schoolname+"</td>";
						html += "						<td id='edu_major_"+i+"'>"+sp.major+"</td>";
				//		html += "						<td id='edu_level_"+i+"'>"+sp.level+"</td>";
						
						html += "						<td id='edu_status_"+i+"'>"+sp.status+"</td>";
						html += "						<td id='edu_start_"+i+"'>"+sp.start+"</td>";
						html += "						<td id='edu_end_"+i+"'>"+sp.end+"</td>";
						
					//	html += "						<td  id='ed3' class='t_modify' style='display:none'><button class='btn btn_cell_edit'  onclick=\"gPPF_Rental.edu_tr_edit('edu_tr_"+i+"')\">수정</button></td>";
					//	html += "						<td  id='ed4' class='t_delete' style='display:none'><button class='btn btn_cell_delete'  onclick=\"gPPF_Rental.edu_tr_delete('edu_tr_"+i+"')\">삭제</button></td>";		
						
						html += "						<td  class='t_modify2' style='display:none; border-botom : 1px solid #e0e0e0'><button class='btn btn_cell_edit'  onclick=\"gPPF_Rental.edu_tr_edit('edu_tr_"+i+"')\">수정</button></td>";
						html += "						<td  class='t_delete2' style='display:none; border-botom : 1px solid #e0e0e0'><button class='btn btn_cell_delete'  onclick=\"gPPF_Rental.edu_tr_delete('edu_tr_"+i+"')\">삭제</button></td>";		
						
						
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
		
		
		
		isShow = "";
		if (rt.prize == "") {isShow = "none"}
		
		html += "<div class='group_section'  style='display:"+isShow+"'>";
		html += "	<div class='group_header type3 fixheight_m'>";
		html += "		<h3>(선택) "+rt.prize+" (편집 후 Drag&Drop으로 순서를 변경 하실 수 있습니다.)</h3>";
		html += "		<a  class='btn btn_violet btn_edit' style='color:white' onclick=\"gPPF_Rental.edit_career()\">편집하기</a>";
		html += "	</div>";
		html += "	<div class='wrap_group table_area term' id='career_edit3'>";
		
	//	if ( (typeof (gPPF_Rental.career_list) != "undefined") && gPPF_Rental.career_list.length > 0){
			html += "		<div class='round_table'>";
			html += "			<table class='t_career' id='xcareer'>";
			html += "				<thead>";
			html += "					<tr>";
			html += "						<th>기간</th>";
			html += "						<th>수상 내용</th>";
			html += "					</tr>";
			html += "				</thead>";
			html += "				<tbody>";
		
			
			if ( (typeof (gPPF_Rental.career_list) != "undefined") && gPPF_Rental.career_list.length > 0){
				for (var i = 0 ; i < gPPF_Rental.career_list.length; i++){
					var sp = gPPF_Rental.career_list[i];
			
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
		
		
		
		
		isShow = "";
		if (rt.loc == "") {isShow = "none"}
		
		html += "<div class='group_section'  style='display:"+isShow+"'>";
		html += "	<div class='group_header type3 fixheight_m'>";
		html += "		<h3>(선택) "+rt.loc+" (편집 후 Drag&Drop으로 순서를 변경 하실 수 있습니다.)</h3>";
		html += "		<a class='btn btn_violet btn_edit' style='color:white' onclick=\"gPPF_Rental.edit_cert()\">편집하기</a>";
		html += "	</div>";
		html += "	<div class='wrap_group table_area term' id='career_edit4'>";
		
	//	if ( (typeof (gPPF_Rental.cert_list) != "undefined") && gPPF_Rental.cert_list.length > 0){
			html += "		<div class='round_table'>";
			html += "			<table class='t_certificate t_float'>";
			html += "				<thead>";
			html += "					<tr>";
			html += "						<th>작품 소장처</th>";
		//	html += "						<th>발행처</th>";
		//	html += "						<th>취득일자</th>";
			html += "					</tr>";
			html += "				</thead>";
			html += "				<tbody>";		
			
			if ( (typeof (gPPF_Rental.cert_list) != "undefined") && gPPF_Rental.cert_list.length > 0){
				for (var i = 0 ; i < gPPF_Rental.cert_list.length; i++){
					var sp = gPPF_Rental.cert_list[i];
			
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
		
		
		
		isShow = "";
		if (rt.carr == "") {isShow = "none"}
		
		html += "<div class='group_section'  style='display:"+isShow+"'>";
		html += "	<div class='group_header type3 fixheight_m'>";
		html += "		<h3>(선택) "+rt.carr+" (편집 후 Drag&Drop으로 순서를 변경 하실 수 있습니다.)</h3>";
		html += "		<a  class='btn btn_violet btn_edit' style='color:white' onclick=\"gPPF_Rental.edit_display()\">편집하기</a>";
		html += "	</div>";
		html += "	<div class='wrap_group table_area term' id='career_edit5'>";
		
	//	if ( (typeof (gPPF_Rental.career_list) != "undefined") && gPPF_Rental.career_list.length > 0){
			html += "		<div class='round_table'>";
			html += "			<table class='t_career'>";
			html += "				<thead>";
			html += "					<tr>";
			html += "						<th>기간</th>";
			html += "						<th>전시 및 프로젝트 내용</th>";
			html += "					</tr>";
			html += "				</thead>";
			html += "				<tbody>";
		
			
			if ( (typeof (gPPF_Rental.display_list) != "undefined") && gPPF_Rental.display_list.length > 0){
				for (var i = 0 ; i < gPPF_Rental.display_list.length; i++){
					var sp = gPPF_Rental.display_list[i];
			
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
		
		if (gPPF_Rental.cUserInfo == ""){
			g360.gAlert("Info","기본정보를 먼저 등록하셔야 합니다.", "blue", "top");
			return false;
		}
		
		
		
		var html = "";
		
		html += "<div class='round_table'>";
		html += "	<table class='t_team_edit t_edit t_block' id='profile_education'>";
		html += "		<thead>";
		html += "			<tr>";
		html += "				<th>소속 및 단체명</th>";
		html += "				<th>부서</th>";
		html += "				<th>직위</th>";
		html += "				<th class='t_delete'></th>";
		html += "			</tr>";
		html += "		</thead>";
		html += "		<tbody id='group_tbody'>";
		
			
		if (typeof (gPPF_Rental.group_list) == "undefined"){
			html += "			<tr id='group_1'>";
			html += "				<td><input type='text' id='group_title_1' class='txt' /></td>";
			html += "				<td><input type='text' id='group_dept_1' class='txt' /></td>";
			html += "				<td><input type='text' id='group_jobtitle_1' class='txt' /></td>";
			html += "				<td class='t_delete'><button class='btn btn_cell_delete' onclick=\"gPPF_Rental.delete_id('group_1')\">삭제</button></td>";
			html += "			</tr>";
		}else{
			
			for (var i = 0 ; i < gPPF_Rental.group_list.length; i++){
				var dat = gPPF_Rental.group_list[i];
				html += "			<tr id='group_"+(i+1)+"'>";
				html += "				<td><input type='text' value='"+dat.title+"' id='group_title_"+(i+1)+"' class='txt' /></td>";
				html += "				<td><input type='text' value='"+dat.dept+"'  id='group_dept_"+(i+1)+"' class='txt' /></td>";
				html += "				<td><input type='text' value='"+dat.jobtitle+"'  id='group_jobtitle_"+(i+1)+"' class='txt' /></td>";
				html += "				<td class='t_delete'><button class='btn btn_cell_delete' onclick=\"gPPF_Rental.delete_id('group_"+(i+1)+"')\">삭제</button></td>";
				html += "			</tr>";
			}	
		}			
			
		
		html += "		</tbody>";
		html += "	</table>";
		html += "</div>";
		
		html += "<div class='btn_area bottom_area'>";
		html += "	<button class='btn btn_violet btn_cell_add' onclick=\'gPPF_Rental.add_group();\'>추가</button>";
		html += "	<button class='btn btn_gray btn_cancel' onclick=\"gPPF_Rental.load_career_list('group');\">취소</button>";
		html += "	<button class='btn btn_violet btn_ok' onclick=\'gPPF_Rental.save_group();\'>수정 완료</button>";
		html += "</div>";
		
		
		$("#career_edit1").html(html);
	},
	
	
	"save_group" : function(){
		
		
			var obj = $("#group_tbody tr");
			var len = obj.length;
			var list = "";
			
			var isOK = true;
			$("#group_tbody tr").each(function(index){
				var i = this.id.replace("group_","");
				var title = $("#group_title_" + i).val();
				if (title == ""){
					
					g360.gAlert("Info","소속및 단체명을 입력하세요", "blue", "top");
					isOK = false;
				//	return false;
				}
				var dept = $("#group_dept_" + i).val();
				if (dept == ""){
					dept = " ";
//					g360.gAlert("Info","부서를 입력하세요", "blue", "top");
//					return false;
				}
				var jobtitle = $("#group_jobtitle_" + i).val();
				if (jobtitle == ""){
					jobtitle = " ";
//					g360.gAlert("Info","직위를 입력하세요", "blue", "top");
//					return false;
				}
				
				if (list == ""){
					list = title + "-spl-" + dept + "-spl-" + jobtitle;
				}else{
					list = list + "-=spl=-" + title + "-spl-" + dept + "-spl-" + jobtitle;
				}
			});
			

			if (isOK){
				var data = JSON.stringify({
					email : gPPF_Rental.cUserEmail,
					content : list
				});
				var url = g360.root_path + "/artist_group_save_rental.mon";
				$.ajax({
					type : "POST",
					data : data,
					dataType : "json",
					contentType : "application/json; charset=utf-8",
					url : url,
					success : function(data){
						if (data.result == "OK"){
							//저장된 데이터를 불러와서 다시 조회 모드로 변경한다.
							if (gPPF_Rental.cUserEmail != ""){
								gPPF_Rental.load_career_list_artist("open", gPPF_Rental.cUserEmail);
							}else{
								gPPF_Rental.load_career_list();
							}
						
						}else{
							g360.error_alert();
						}
					},
					error : function(e){
						g360.error_alert();
					}
				})
			};
			
					
	},
		
	"add_group" : function(){
		var obj = $("#group_tbody tr");
		
		var i = obj.length + 1;
		
		var html = "";
		html += "			<tr id='group_"+i+"'>";
		html += "				<td><input type='text'  id='group_title_"+i+"' class='txt' /></td>";
		html += "				<td><input type='text'  id='group_dept_"+i+"' class='txt' /></td>";
		html += "				<td><input type='text'  id='group_jobtitle_"+i+"' class='txt' /></td>";
		html += "				<td class='t_delete'><button class='btn btn_cell_delete' onclick=\"gPPF_Rental.delete_id('group_"+i+"')\">삭제</button></td>";
		html += "			</tr>";
		
		$("#group_tbody").append(html);
	},

	///////////////////////////////////////////// Group Setting  END///////////////////////////////////////////////////////////////////////	
		
	
	
	
	
	///////////////////////////////////////////// education Setting ///////////////////////////////////////////////////////////////////////
	
	"edit_education" : function(){
		if (gPPF_Rental.cUserInfo == ""){
			g360.gAlert("Info","기본정보를 먼저 등록하셔야 합니다.", "blue", "top");
			return false;
		}
		
		
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
		html += "				<th>분류</th>";
		html += "				<td>";
		html += "					<div class='btn-group'>";
		html += "					<button class='bg-transparent border-0 dropdown-toggle' id='education_level' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
		html += "					박사";
		html += "					</button>";
		html += "						<div class='dropdown-menu'>";
		html += "							<a class='dropdown-item' onclick=\"gPPF_Rental.group_change('박사','education_level');\">박사</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF_Rental.group_change('석사','education_level');\">석사</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF_Rental.group_change('학사','education_level');\">학사</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF_Rental.group_change('전문사','education_level');\">전문사</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF_Rental.group_change('기타','education_level');\">기타</a>";
		html += "						</div>";
		html += "					</div>";
		html += "				</td>";
		html += "				<th>상태</th>";
		html += "				<td>";
		html += "					<div class='btn-group'>";
		html += "					<button class='bg-transparent border-0 dropdown-toggle' id='education_status' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
		html += "					졸업";
		html += "					</button>";
		html += "						<div class='dropdown-menu'>";
		html += "							<a class='dropdown-item' onclick=\"gPPF_Rental.group_change('졸업','education_status');\">졸업</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF_Rental.group_change('중퇴','education_status');\">중퇴</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF_Rental.group_change('재학','education_status');\">재학</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF_Rental.group_change('수료','education_status');\">수료</a>";
		html += "						</div>";
		html += "					</div>";
		html += "				</td>";
		html += "			</tr>";
		html += "			<tr>";
		html += "				<th>학교명</th>";
		html += "					<td><input type='text' class='txt' id='education_schoolname'  /></td>";
		html += "				<th>전공</th>";
		html += "					<td><input type='text' class='txt' id='education_major'  /></td>";
		html += "			</tr>";
		html += "			<tr>";
		html += "				<td style='background:#f9f9f9; font-size:18px; font-weight:400'>입학일</td>";
		html += "					<td><input type='text' class='txt' id='education_start'  placeholder='2010.09' /></td>";
		html += "				<td style='background:#f9f9f9; font-size:18px; font-weight:400'>졸업일</td>";
		html += "				<td><input type='text' class='txt' id='education_end' placeholder='2014.03' /></td>";
		
		html += "				</tr>";
		html += "		</tbody>";
		html += "	</table>";
		html += "	<div class='btn_area bottom_area'> <!-- 연필 아이콘 버튼 클릭 시 버튼 위치 변경되어야 함 -->";
		html += "			<button class='btn btn_gray btn_cancel' onclick=\"gPPF_Rental.load_career_list('education');\">취소</button>";
		html += "			<button class='btn btn_violet btn_ok' onclick=\"gPPF_Rental.save_education('F');\">수정 완료</button>";
		html += "	</div>";
		html += "</div>";

				
		$("#career_edit2").append(html);
	},
	
	
	"save_education" : function(opt){
			
			
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
				
				if (schoolname == ""){
					
					g360.gAlert("Info","학교명을 입력하세요", "blue", "top");
					return false;
				}
				var major = $("#education_major").val();
				if (major == ""){
					
					g360.gAlert("Info","전공을 입력하세요", "blue", "top");
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
				email : gPPF_Rental.cUserEmail,
				content : list
			});
			var url = g360.root_path + "/artist_education_save_rental.mon";
			$.ajax({
				type : "POST",
				data : data,
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(data){
					if (data.result == "OK"){
						//저장된 데이터를 불러와서 다시 조회 모드로 변경한다.
						if (gPPF_Rental.cUserEmail != ""){
							gPPF_Rental.load_career_list_artist("open", gPPF_Rental.cUserEmail);
						}else{
							gPPF_Rental.load_career_list();
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
			email : gPPF_Rental.cUserEmail,
			content : list
		});
		var url = g360.root_path + "/artist_education_save_rental.mon";
		$.ajax({
			type : "POST",
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				if (data.result == "OK"){
					//저장된 데이터를 불러와서 다시 조회 모드로 변경한다.
					if (gPPF_Rental.cUserEmail != ""){
						gPPF_Rental.load_career_list_artist("open", gPPF_Rental.cUserEmail);
					}else{
						gPPF_Rental.load_career_list();
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
		html += "				<th>분류</th>";
		html += "				<td>";
		html += "					<div class='btn-group'>";
		html += "					<button class='bg-transparent border-0 dropdown-toggle' id='"+tr_id+"' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
		html += "					"+obj.level+"";
		html += "					</button>";
		html += "						<div class='dropdown-menu'>";
		html += "							<a class='dropdown-item' onclick=\"gPPF_Rental.group_change('박사','"+tr_id+"');\">박사</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF_Rental.group_change('석사','"+tr_id+"');\">석사</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF_Rental.group_change('학사','"+tr_id+"');\">학사</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF_Rental.group_change('전문사','"+tr_id+"');\">전문사</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF_Rental.group_change('기타','"+tr_id+"');\">기타</a>";
		html += "						</div>";
		html += "					</div>";
		html += "				</td>";
		html += "				<th>상태</th>";
		html += "				<td>";
		html += "					<div class='btn-group'>";
		html += "					<button class='bg-transparent border-0 dropdown-toggle' id='"+tr_id2+"' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
		html += "					"+obj.status+"";
		html += "					</button>";
		html += "						<div class='dropdown-menu'>";
		html += "							<a class='dropdown-item' onclick=\"gPPF_Rental.group_change('졸업','"+tr_id2+"');\">졸업</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF_Rental.group_change('중퇴','"+tr_id2+"');\">중퇴</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF_Rental.group_change('재학','"+tr_id2+"');\">재학</a>";
		html += "							<a class='dropdown-item' onclick=\"gPPF_Rental.group_change('수료','"+tr_id2+"');\">수료</a>";
		
		html += "						</div>";
		html += "					</div>";
		html += "				</td>";
		html += "			</tr>";
		html += "			<tr>";
		html += "				<th>학교명</th>";
		html += "					<td><input type='text' class='txt' value='"+obj.schoolname+"' id='education_schoolname_"+id+"'  /></td>";
		html += "				<th>전공</th>";
		html += "					<td><input type='text' class='txt'  value='"+obj.major+"' id='education_major_"+id+"'  /></td>";
		html += "			</tr>";
		html += "			<tr>";
		html += "				<th>입학일</th>";
		html += "					<td><input type='text' class='txt' id='education_start_"+id+"'  value='"+obj.start+"' placeholder='2010.09' /></td>";
		html += "				<th>졸업일</th>";
		html += "				<td><input type='text' class='txt' id='education_end_"+id+"'  value='"+obj.end+"' placeholder='2014.039' /></td>";
		
		html += "				</tr>";
		html += "		</tbody>";
		html += "	</table>";
		html += "	<div class='btn_area bottom_area'> <!-- 연필 아이콘 버튼 클릭 시 버튼 위치 변경되어야 함 -->";
		html += "			<button class='btn btn_gray btn_cancel' onclick=\"gPPF_Rental.load_career_list('education');\">취소</button>";
		html += "			<button class='btn btn_violet btn_ok' onclick=\"gPPF_Rental.save_education_after_edit('"+bb+"', '" + id + "');\">수정 완료</button>";
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
		
		
		gPPF_Rental.save_education("T");
		
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
		if (gPPF_Rental.cUserInfo == ""){
			g360.gAlert("Info","기본정보를 먼저 등록하셔야 합니다.", "blue", "top");
			return false;
		}
		
		
		
		var html = "";
		
		html += "<div class='round_table'>";
		html += "	<table class='t_career_edit t_block' id='profile_career'>";
		html += "		<thead>";
		html += "			<tr>";
		html += "				<th style='width:20px'></th>";
		html += "				<th>기간</th>";
		html += "				<th style='width:350px'>수상 내용</th>";
		html += "				<th style='width:80px' class='t_delete'></th>";
		html += "			</tr>";
		html += "		</thead>";
		html += "		<tbody id='career_tbody'>";
		
		if (typeof (gPPF_Rental.career_list) == "undefined"){
			html += "		<tr id='career_1'>";
			html += "			<td></td>";
			html += "			<td style='text-align:right'><input type='text' id='career_term_1' placeholder='2018.09' class='txt' style='width:250px; margin:10px 0 10px 0' /></td>";
			html += "			<td><input type='text' id='career_title_1' class='txt' /></td>";
			html += "			<td class='t_delete'><button class='btn btn_cell_delete' onclick=\"gPPF_Rental.delete_career('career_1')\">삭제</button></td>";
			html += "		</tr>";
		}else{
			
			for (var i = 0 ; i < gPPF_Rental.career_list.length; i++){
				var dat = gPPF_Rental.career_list[i];
						
				html += "		<tr id='career_"+(i+1)+"'>";
			//	html += "           <td><img src='/img/btn-artwork-collect-normal.svg' class='btn_artwork_collect_normal'></td>";
				html += "           <td><div style='width:20px; height:20px; background-size:100% 100%; background-image:url(/img/rental/drag.png)'></div>";
				html += "			<td style='text-align:right'><input type='text' value='"+dat.term+"' id='career_term_"+(i+1)+"' placeholder='2018.09' class='txt' style='width:250px; margin:10px 0 10px 0' /></td>";
				html += "			<td><input type='text' value='"+dat.title+"' id='career_title_"+(i+1)+"' class='txt' /></td>";
				html += "			<td class='t_delete'><button class='btn btn_cell_delete' onclick=\"gPPF_Rental.delete_career('career_"+(i+1)+"')\">삭제</button></td>";
				html += "		</tr>";
			}	
		}
		
		
		

		html += "	</tbody>";
		html += "</table>";
		html += "</div>";
		
		html += "<div class='btn_area bottom_area'>";
		html += "	<button class='btn btn_violet btn_cell_add' onclick=\'gPPF_Rental.add_career();\'>추가</button>";
		html += "	<button class='btn btn_gray btn_cancel' onclick=\"gPPF_Rental.load_career_list('career');\">취소</button>";
		html += "	<button class='btn btn_violet btn_ok' onclick=\'gPPF_Rental.save_career();\'>수정 완료</button>";
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
		html += "           <td></td>"
		html += "			<td><input type='text' id='career_term_"+i+"' placeholder='2018.09' class='txt' style='margin:10px 0 10px 0; margin-left:19px; width:250px' /></td>";
		html += "			<td><input type='text' id='career_title_"+i+"' class='txt' /></td>";
		html += "			<td class='t_delete'><button class='btn btn_cell_delete' onclick=\"gPPF_Rental.delete_career('career_"+i+"')\">삭제</button></td>";
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
				
				g360.gAlert("Info","기간을 입력하세요", "blue", "top");
				return false;
			}
			var title = $("#career_title_" + i).val();
			if (title == ""){
				
				g360.gAlert("Info", "경력사항을 입력하세요", "blue", "top");
				return false;
			}
			
			if (list == ""){
				list = term + "-spl-" + title ;
			}else{
				list = list + "-=spl=-" + term + "-spl-" + title ;
			}
		});
		

		var data = JSON.stringify({
			email : gPPF_Rental.cUserEmail,
			content : list
		});
		
		var url = g360.root_path + "/artist_career_save_rental.mon";
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
					if (gPPF_Rental.cUserEmail != ""){
						gPPF_Rental.load_career_list_artist("open", gPPF_Rental.cUserEmail);
					}else{
						gPPF_Rental.load_career_list();
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
		
		if (gPPF_Rental.cUserInfo == ""){
			g360.gAlert("Info","기본정보를 먼저 등록하셔야 합니다.", "blue", "top");
			return false;
		}
		
		
		var html = "";
		
		html += "<div class='round_table'>";
		html += "	<table class='t_certificate_edit t_block' id='profile_cert'>";
		html += "		<thead>";
		html += "			<tr>";
		html += "               <th style='width:30px'></th>"
		html += "				<th style='width:500px'>작품 소장처</th>";
	//	html += "				<th style='width:200px'>발행처</th>";
	//	html += "				<th style='width:100px'>취득 일자</th>";
		html += "				<th style='width:80px' class='t_delete'></th>";
		html += "			</tr>";
		html += "		</thead>";
		html += "		<tbody id='cert_tbody'>";
		if (typeof (gPPF_Rental.cert_list) == "undefined"){
			html += "			<tr id='cert_1'>";
			html += "               <td></td>"
			html += "				<td><input type='text' id='career_certname_1'class='txt'  style='margin:10px 0 10px 0' /></td>";
//			html += "				<td><input type='text' id='career_publisher_1'class='txt' /></td>";
//			html += "				<td><input type='text' id='career_date_1' class='txt' /></td>";
			html += "				<td class='t_delete' ><button class='btn btn_cell_delete' onclick=\"gPPF_Rental.delete_career('career_1')\">삭제</button></td>";
			html += "			</tr>";
		}else{
			for (var i = 0 ; i < gPPF_Rental.cert_list.length; i++){
				var dat = gPPF_Rental.cert_list[i];
				html += "			<tr id='cert_"+(i+1)+"'>";
				html += "          	    <td><div style='width:20px; height:20px; background-size:100% 100%; background-image:url(/img/rental/drag.png)'></div>";
				html += "				<td style='text-align:right'><input type='text' value='"+dat.certname+"' id='career_certname_"+(i+1)+"'class='txt' style='margin:10px 0 10px 0'  /></td>";
//				html += "				<td><input type='text' value='"+dat.publisher+"' id='career_publisher_"+(i+1)+"'class='txt' /></td>";
//				html += "				<td><input type='text' value='"+dat.date+"' id='career_date_"+(i+1)+"' class='txt' /></td>";
				html += "				<td class='t_delete'><button class='btn btn_cell_delete' onclick=\"gPPF_Rental.delete_cert('cert_"+(i+1)+"')\">삭제</button></td>";
				html += "			</tr>";
			}
		}

		html += "	</table>";
		html += "</div>";
		html += "<div class='btn_area bottom_area'>";
		html += "	<button class='btn btn_violet btn_cell_add' onclick=\'gPPF_Rental.add_cert();\'>추가</button>";
		html += "	<button class='btn btn_gray btn_cancel' onclick=\"gPPF_Rental.load_career_list('cert');\">취소</button>";
		html += "	<button class='btn btn_violet btn_ok' onclick=\'gPPF_Rental.save_cert();\'>수정 완료</button>";
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
		html += "               <td></td>"
		html += "				<td><input type='text' id='career_certname_"+i+"'class='txt' style='margin:10px 0 10px 0' /></td>";
//		html += "				<td><input type='text' id='career_publisher_"+i+"'class='txt' /></td>";
//		html += "				<td><input type='text' id='career_date_"+i+"' placeholder='2018.11' class='txt' /></td>";
		html += "				<td class='t_delete'><button class='btn btn_cell_delete' onclick=\"gPPF_Rental.delete_cert('cert_"+i+"')\">삭제</button></td>";
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
				g360.gAlert("Info", "작품 소장처를 입력하세요", "blue", "top");
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
			email : gPPF_Rental.cUserEmail,
			content : list
		});
		var url = g360.root_path + "/artist_cert_save_rental.mon";
		$.ajax({
			type : "POST",
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				if (data.result == "OK"){
					//저장된 데이터를 불러와서 다시 조회 모드로 변경한다.
					if (gPPF_Rental.cUserEmail != ""){
						gPPF_Rental.load_career_list_artist("open", gPPF_Rental.cUserEmail);
					}else{
						gPPF_Rental.load_career_list();
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
		if (gPPF_Rental.cUserInfo == ""){
			g360.gAlert("Info","기본정보를 먼저 등록하셔야 합니다.", "blue", "top");
			return false;
		}
		
		
		
		var html = "";
		
		html += "<div class='round_table'>";
		html += "	<table class='t_career_edit t_block' id='profile_display'>";
		html += "		<thead>";
		html += "			<tr>";
		html += "               <th style='width:30px'></th>"
		html += "				<th>기간</th>";
		html += "				<th style='width:350px'>전시 및 프로젝트 내용 </th>";
		html += "				<th style='width:80px' class='t_delete'></th>";
		html += "			</tr>";
		html += "		</thead>";
		html += "		<tbody id='display_tbody'>";
		
		if (typeof (gPPF_Rental.display_list) == "undefined"){
			html += "		<tr id='display_1'>";
			html += "           <td></td>";
			html += "			<td><input type='text' id='display_term_1' placeholder='2018.09' class='txt' style='margin:10px 0 10px 0' /></td>";
			html += "			<td><input type='text' id='display_title_1' class='txt' /></td>";
			html += "			<td class='t_delete'><button class='btn btn_cell_delete' onclick=\"gPPF_Rental.delete_display('display_1')\">삭제</button></td>";
			html += "		</tr>";
		}else{
			
			for (var i = 0 ; i < gPPF_Rental.display_list.length; i++){
				var dat = gPPF_Rental.display_list[i];
				
		
				html += "		<tr id='display_"+(i+1)+"'>";
				html += "          	<td><div style='width:20px; height:20px; background-size:100% 100%; background-image:url(/img/rental/drag.png)'></div>";
				html += "			<td style='text-align:right'><input type='text' value='"+dat.term+"' id='display_term_"+(i+1)+"' placeholder='2018.09' class='txt' style='width:250px; margin:10px 0 10px 0' /></td>";
				html += "			<td ><input type='text' value='"+dat.title+"' id='display_title_"+(i+1)+"' class='txt'  /></td>";
				html += "			<td class='t_delete'><button class='btn btn_cell_delete' onclick=\"gPPF_Rental.delete_display('display_"+(i+1)+"')\">삭제</button></td>";
				html += "		</tr>";
			}	
		}
		
		
		

		html += "	</tbody>";
		html += "</table>";
		html += "</div>";
		
		html += "<div class='btn_area bottom_area'>";
		html += "	<button class='btn btn_violet btn_cell_add' onclick=\'gPPF_Rental.add_display();\'>추가</button>";
		html += "	<button class='btn btn_gray btn_cancel' onclick=\"gPPF_Rental.load_career_list('display');\">취소</button>";
		html += "	<button class='btn btn_violet btn_ok' onclick=\'gPPF_Rental.save_display();\'>수정 완료</button>";
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
		html += "            <td></td>";
		html += "			<td><input type='text' id='display_term_"+i+"' placeholder='2018.09' class='txt' style='margin:10px 0 10px 0; margin-left:14px' /></td>";
		html += "			<td><input type='text' id='display_title_"+i+"' class='txt' /></td>";
		html += "			<td class='t_delete'><button class='btn btn_cell_delete' onclick=\"gPPF_Rental.delete_display('display_"+i+"')\">삭제</button></td>";
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
				
				g360.gAlert("Info","기간을 입력하세요", "blue", "top");
				return false;
			}
			var title = $("#display_title_" + i).val();
			if (title == ""){
				
				g360.gAlert("Info", "전시 내용을 입력하세요", "blue", "top");
				return false;
			}
			
			if (list == ""){
				list = term + "-spl-" + title ;
			}else{
				list = list + "-=spl=-" + term + "-spl-" + title ;
			}
		});
		

		var data = JSON.stringify({
			email : gPPF_Rental.cUserEmail,
			content : list
		});
		var url = g360.root_path + "/artist_display_save_rental.mon";
		$.ajax({
			type : "POST",
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				if (data.result == "OK"){
					//저장된 데이터를 불러와서 다시 조회 모드로 변경한다.
					if (gPPF_Rental.cUserEmail != ""){
						gPPF_Rental.load_career_list_artist("open", gPPF_Rental.cUserEmail);
					}else{
						gPPF_Rental.load_career_list();
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
					
					$("#score_dis1").text(score.score1+"점");
					$("#score_dis2").text(score.score2+"점");
					$("#score_dis3").text(score.score3+"점");
					$("#score_dis4").text(score.score4+"점");
					$("#score_dis5").text(score.score5+"점");
					
					
					$("#score1").text(ss1+"점");
					$("#score2").text(ss2+"점");
					$("#score3").text(ss3+"점");
					$("#score4").text(ss4+"점");
					$("#score5").text(ss5+"점");
					
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
					$("#score_avarage").text(rtotal + "점");
					
					$("#score_count").text(data.project_totalcount + "건");
					
					$("#profile_artcount").text(data.saved_art_totalcount + "개");
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
				
				gPPF_Rental.load_completed_project_type2(1);
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"load_completed_project_type2" : function(page){
		gPPF_Rental.cPage = page;		
		var start = (parseInt(gPPF_Rental.perpage) * (parseInt(gPPF_Rental.cPage))) - (parseInt(gPPF_Rental.perpage) - 1);
		start = parseInt(start) -1 ;
		
		var perpage = gPPF_Rental.perpage;
		
		var url = g360.root_path + "/artProject_list.mon?start="+start+"&perpage="+perpage+"&opt=end2";
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				gPPF_Rental.draw_score_complete_list(data);
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	"draw_score_complete_list" : function(data){
		var html = "";
		
		gPPF_Rental.totalcount = data[0].totalcount;

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
			html += "			<h4><em class='blue_label'>작품제작요청</em>"+dx.request_title+"</h4>";
			html += "			<div class='evaluation_info'>";
			html += "				<dl>";
			html += "					<dt>클라이언트</dt>";
			html += "					<dd>"+dx.request_nickname+"<dd>";
			html += "				</dl>";
			html += "				<dl>";
			html += "					<dt>계약 체결 일시</dt>";
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
			
			html += "				<span>"+rtotal+"점</span>";
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
			html += "						<th>계약 명</th>";
			html += "						<td colspan='3'><strong>"+dx.request_title+"</strong></td>";
			html += "					</tr>";
			html += "					<tr>";
			html += "						<th>계약금액</th>";
			html += "						<td><strong>"+g360.comma(g360.setWon(dx.selected_price))+"</strong> </td>";
			html += "						<th>계약 기간</th>";
			html += "						<td><strong>"+(parseInt(dx.seleted_term)+5)+"</strong> (제작기간"+dx.seleted_term+"일 + 배송기간 5일)</td>";
			html += "					</tr>";
			html += "				</tbody>";
			html += "			</table>";
			html += "			<div class='contract_star bg_white'> ";
			html += "				<ul class='star-list'><!-- 모바일에서 슬라이드 구현필요 --> ";
			html += "					<li>";
			html += "						<span>전문성 <strong>"+dx.eval.score1+"점</strong></span>";
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
			html += "						<span>사전준비 <strong>"+dx.eval.score2+"점</strong></span>";
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
			html += "						<span>의사소통 <strong>"+dx.eval.score3+"점</strong></span>";
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
			html += "						<span>일정준수 <strong>"+dx.eval.score4+"점</strong></span>";
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
			html += "						<span>적극성 <strong>"+dx.eval.score5+"점</strong></span>";
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
			html += "						<dt><strong>클라이언트</strong> "+dx.request_nickname+"</dt>";
			html += "						<dd>"+g360.TextToHtml(dx.eval.comment)+"</dd>";
			html += "					</dl>";
			html += "				</div>";
			
			
			html += "			</div>";
			html += "		</div>";
			html += "	</div>";
			html += "</div>";
					
			
		}
		
		if (gPPF_Rental.totalcount > 0){
			$("#NAVIGATE").show();
			gPPF_Rental.search_paging(gPPF_Rental.cPage);
		}
	
		$("#score_total_dis").html(html);
	},
	
	
	"history_list_draw2" : function(data){
		
		gPPF_Rental.totalcount = data[0].totalcount;
		
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
			html += "			<h4><em class='blue_label'>작품제작요청</em>"+dx.request_title+"</h4>";
			html += "			<div class='evaluation_info'>";
			html += "				<dl>";
			html += "					<dt>클라이언트</dt>";
			html += "					<dd>"+dx.request_nickname+"<dd>";
			html += "				</dl>";
			html += "				<dl>";
			html += "					<dt>계약 체결 일시</dt>";
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

			html += "				<span>"+rtotal+"점</span>";
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
			html += "						<th>계약 명</th>";
			html += "						<td colspan='3'><strong>"+dx.request_title+"</strong></td>";
			html += "					</tr>";
			html += "					<tr>";
			html += "						<th>계약금액</th>";
			html += "						<td><strong>"+g360.comma(g360.setWon(dx.selected_price* 10000))+"</strong> </td>";
			html += "						<th>계약 기간</th>";
			html += "						<td><strong>"+(parseInt(dx.seleted_term)+5)+"</strong> (제작기간"+dx.seleted_term+"일 + 배송기간 5일)</td>";
			html += "					</tr>";
			html += "				</tbody>";
			html += "			</table>";
			html += "			<div class='detail_view' style='display:none' id='history_"+i+"'>";
			html += "				<div class='contract_star bg_white'>";
			html += "					<ul class='star-list'><!-- 모바일에서 슬라이드 구현필요 --> ";
			html += "						<li>";
			html += "							<span>전문성 <strong>"+dx.eval.score1+"점</strong></span>";
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
			html += "							<span>사전준비 <strong>"+dx.eval.score2+"점</strong></span>";
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
			html += "							<span>의사소통 <strong>"+dx.eval.score3+"점</strong></span>";
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
			html += "							<span>일정준수 <strong>"+dx.eval.score4+"점</strong></span>";
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
			html += "							<span>적극성 <strong>"+dx.eval.score5+"점</strong></span>";
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
			html += "							<dt><strong>클라이언트</strong> "+dx.request_nickname+"</dt>";
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
					html += "			<th><strong style='font-size:14px'>등록일  ["+ddx.rate+"%]</strong><div>"+g360.iso_date_convert(ddx.date)+" </div></th>";
					html += "			<td>";
					html += "			<div>"+g360.TextToHtml(ddx.report_memo) ;
					
					html += "			<button class='btn btn_ghost btn_add_file' onclick=\"g360.preview_img('"+ddx.uploadfilename+"','"+ddx.email+"','artproject')\">첨부사진</button>";
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
			html += "			<div class='btn_view_area'><button class='btn btn_gray btn_detail_fold' onclick=\"gPPF_Rental.expand('"+i+"', this)\">펼치기</button></div>";
			html += "		</div>";
			html += "	</div>";
			html += "</div>";
		}
		
		
		
		
		
		if (gPPF_Rental.totalcount > 0){
			$("#NAVIGATE").show();
			gPPF_Rental.search_paging(gPPF_Rental.cPage);
		}
		
		$("#history_list_dis2").html(html);
	},
	
	
	
	"expand" : function(bun, obj){

		var text = $(obj).get(0).textContent;
		if (text == "펼치기"){
			$("#history_" + bun).show();
			$(obj).text("접기");
		}else{
			$("#history_" + bun).hide();
			$(obj).text("펼치기");
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
				gPPF_Rental.history_list_draw(data);
			},
			error : function(e){
				g360.error_alert();
			}
		});	
		
	},
	
	"history_list_load" : function(page){
		gPPF_Rental.cPage = page;		
		var start = (parseInt(gPPF_Rental.perpage) * (parseInt(gPPF_Rental.cPage))) - (parseInt(gPPF_Rental.perpage) - 1);
		start = parseInt(start) -1 ;
		
		var perpage = gPPF_Rental.perpage;
		
		var url = g360.root_path + "/artProject_list.mon?start="+start+"&perpage="+perpage+"&opt=end2";
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				gPPF_Rental.history_list_draw2(data);
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
		html += "	<h3>작품 제작 현황</h3>";
		html += "</div>";
		html += "<div class='wrap_group project_infograph'>";
		html += "	<div class='pj_title'>";
		html += "		<dl class='ei_title'>";
		html += "			<dt>진행한 프로젝트</dt>";
		html += "			<dd>"+data.project_totalcount+"건</dd>";
		html += "		</dl>";
		html += "		<dl class='ei_title'>";
		html += "			<dt>누적 프로젝트 금액</dt>";

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
		html += "			<h4>프로젝트 평균 금액</h4>";
		html += "			<div>";
		html += "				<dl>";
		html += "					<dt>평균가</dt>";
		html += "					<dd>"+g360.comma(g360.setWon(project_average_price))+"</dd>";
		html += "				</dl>";
		html += "				<dl>";
		html += "					<dt>최저가</dt>";
		html += "					<dd>"+g360.comma(g360.setWon(project_min_price))+"</dd>";
		html += "				</dl>";
		html += "				<dl>";
		html += "					<dt>최고가</dt>";
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
			html += "			<h4>프로젝트 평균 기간</h4>";
			html += "			<div>";
			html += "				<dl>";
			html += "					<dt>평균기간</dt>";
			html += "					<dd>"+info.project_average_term+"일</dd>";
			html += "				</dl>";
			html += "				<dl>";
			html += "					<dt>최단기간</dt>";
			html += "					<dd>"+info.project_min_term+"일</dd>";
			html += "				</dl>";
			html += "				<dl>";
			html += "					<dt>최장기간</dt>";
			html += "					<dd>"+info.project_max_term+"일</dd>";
			html += "				</dl>";
			html += "			</div>";
			html += "			<div class='pj_bar'>";
			html += "				<ul>";
			html += "					<li>"+info.project_min_term+"일</li>";
			html += "					<li>"+info.project_average_term+"일</li>";
			html += "					<li>"+info.project_max_term+"일</li>";
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
	
	
	
	
	
	"regartist_open" : function(){
			
		var email = g360.UserInfo.email;
		var bun = new Date().getTime();
		var reg_email = email + "-spl-" + bun;
		gPPF_Rental.cUserEmail = reg_email;
		gPPF_Rental.load_career_list_artist("new", reg_email);
	},
	
	"open_reg_artist" : function(email){

		gPPF_Rental.cUserEmail = email;
		gPPF_Rental.load_career_list_artist("open", email);
	},
	
	
	
	"load_career_list_artist" : function(opt, email){
		
		var url = g360.root_path + "/search_userinfo_rental.mon?id="+gPPF_Rental.cUserEmail;
		
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
					gPPF_Rental.group_list = data.group;
					gPPF_Rental.education_list = data.education;
					gPPF_Rental.career_list = data.career;
					gPPF_Rental.cert_list = data.cert;
					gPPF_Rental.display_list = data.display;
					
					gPPF_Rental.cUserInfo = data;
				}

				
				gPPF_Rental.load_career_list_draw_artist(opt);
				
				gPPF_Rental.imageEventBind();
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	

	"load_career_list" : function(res){
		console.log("load_career_list");
		console.log("res : "+res);
		
		if(res){
			
			if (gPPF_Rental.cUserEmail != ""){
				gPPF_Rental.load_career_list_artist("open", gPPF_Rental.cUserEmail);
			}else{
				gPPF_Rental.load_career_list();
			}
			
		}else{
			var url = g360.root_path + "/search_userinfo_rental.mon?id="+gPPF_Rental.cUserEmail;
			
			$.ajax({
				type : "GET",
				dataType : "json",
				cache : false,
				contenttype : "application/json; charset=utf-8",
				url : url,
				async : false,
				success : function(data){
					console.log(data);
					gPPF_Rental.group_list = data.group;
					gPPF_Rental.education_list = data.education;
					gPPF_Rental.career_list = data.career;
					gPPF_Rental.cert_list = data.cert;
					gPPF_Rental.display_list = data.display;
					
					gPPF_Rental.load_career_list_draw();
					
				},
				error : function(e){
					g360.error_alert();
				}
			})
		}


	},
	
	
	"load_career_list_draw_artist" : function(opt){
		
		var rt = g360.rental_text;
		$('#artist_reg_title').text(rt.tab1);
		
		gPPF_Rental.opt = opt;
		
		var html = "";
		
		html += "<section>";
		html += "	<!-- start -->";
		html += "	<div class='group_section'>";
		html += "		<div class='group_header type3 fixheight_s'>";
		html += "			<h3>기본 정보</h3>";
		html += "		</div>";
		html += "		<div class='wrap_group account_table_area bg_white' style='padding-top:10px; padding-bottom:10px'>";
		html += "			<table class='full_width_sh'>";
		html += "				<tbody>";
		
		var isShow = "";
		if (rt.name == ""){isShow = "none";}		
		html += "					<tr style='display:"+isShow+"'>";
		html += "						<th><span>"+rt.name+"</span></th>";
		html += "						<td id='info_edit1'><input class='txt' type='text' id='artist_reg_name'></td>";
		html += "						<td id='info_read1'><p style='font-size: 17px; margin-top:9px' id='artist_reg_name_read'></p></td>";
		html += "					</tr>";

		isShow = "";
		if (rt.ename == ""){isShow = "none";}
		html += "					<tr style='display:"+isShow+"'>";
		html += "						<th><span>"+rt.ename+"</span></th>";
		html += "						<td id='info_edit2'><input class='txt' type='text' id='artist_reg_engname'></td>";
		html += "						<td id='info_read2'><p style='font-size: 17px; margin-top:9px'  id='artist_reg_engname_read'></p></td>";
		html += "					</tr>";
		
		isShow = "";
		if (rt.content1 == ""){isShow = "none";}
		html += "					<tr style='display:"+isShow+"'>";
		html += "						<th><span>"+rt.content1+"</span></th>";
		html += "						<td id='info_edit3'><textarea class='txt textarea' id ='artist_reg_content1' style='height:200px'></textarea><span></span></td>";
		html += "						<td id='info_read3'><p style='font-size: 17px; margin-top:9px; word-break:break-all'  id='artist_reg_content1_read'></p><span></span></td>";
		html += "					</tr>";
		
		isShow = "";
		if (rt.content2 == ""){isShow = "none";}
		html += "					<tr style='display:"+isShow+"'>";
		html += "						<th><span>"+rt.content2+"</span></th>";
		html += "						<td id='info_edit4'><textarea class='txt textarea' id='artist_reg_content2' style='height:200px'></textarea><span></span></td>";
		html += "						<td id='info_read4'><p style='font-size: 17px; margin-top:9px; word-break:break-all' id='artist_reg_content2_read'></p><span></span></td>";
		html += "					</tr>";
		
		
		html += "				</tbody>";
		html += "			</table>";
		html += "			<div class='btn_area bottom_area full_width_sh'>";
	//	html += "				<button class='btn btn_gray' id='artist_list' onclick=\"gPPF_Rental.save_artist_info_list();return false\">목록</button>";
		html += "				<button class='btn btn_gray' id='artist_delete' onclick=\"gPPF_Rental.save_artist_info_delete();return false\">삭제</button>";
		html += "				<button class='btn btn_violet btn_cancel' id='artist_modify' onclick=\"gPPF_Rental.save_artist_info_modify();return false\">수정</button>";
		html += "				<button class='btn btn_violet btn_ok' id='artist_reg' onclick=\"gPPF_Rental.save_artist_info_reg(); return false;\">등록</button>";
		html += "			</div>";
		html += "		</div>";
		html += "	</div>";
		
		html += "	<div class='group_section'>";
		html += "		<div class='group_header type3 fixheight_m'>";
		html += "			<h3>사진 등록</h3>";
		html += "		</div>";
		html += "		<div class='wrap_group account_table_area bg_white'>";
		html += "			<table class='full_width_sh'>";
		html += "				<tbody>";
		html += "					<tr>";
		html += "						<th>";
		html += "							<span id='btn_profile_list_info' class='t_info_sh'>" + rt.tab1 + " 사진<button class='btn btn_info_sh'>정보</button></span>";
		html += "							<div id='layer_profile_list_info' class='img_reginfo_sh' style='display:none;'>";
		html += "								<div>";
		html += "									<p><strong>'대관페이지'</strong> 접속시 노출되는 사진 입니다.</p>";
		html += "									<img src='/img/account/img_layer_info1_rental.jpg' alt='' />";
		html += "								</div>";
		html += "							</div>";
		html += "						</th>";
		html += "						<td>";
		html += "							<div id='artist_reg_pic' class='thm_author_info_sh'>";
		html += "								<img src='/img/account/thumb_default_author.png'>";
		html += "								<img src='/img/account/btn-edit-profile-img.svg' alt='수정' class='btn_edit_sh'>";
		html += "							</div>";
		html += "							<div style='max-width:180px;'>";
		html += "								<div id='artist_reg_img' class='account_img_artist' style='display:none;padding-top:100%;'>";
		html += "									<img src='/img/account/btn-edit-profile-img.svg' alt='수정' class='btn_edit_sh'>";
		html += "								</div>";
		
		//이미지 삭제
		html += "								<img src='/img/account/btn-artwork-collect-focus.svg' alt='삭제' id='artist_del_img'>";	
		
		html += "							</div>";
		html += "							<p class='txt_info_sh'>";
		html += "								사진 최적 사이즈는 200px * 200px 입니다.";
		html += "							</p>";
		html += "						</td>";
		html += "					</tr>";
		
		html += "					<tr>";
		html += "						<th>";
		html += "							<span id='btn_profile_detail_info' class='t_info_sh'>소개 사진<button class='btn btn_info_sh'>정보</button></span>";
		html += "							<div id='layer_profile_detail_info' class='img_reginfo_sh' style='display:none;'>";
		html += "								<div>";
		html += "									<p><strong>'" + rt.tab1 + " 상세보기'</strong> 상단에 노출되는 대표 이미지 입니다.</p>";
		html += "									<img src='/img/account/img_layer_info2_rental.jpg' alt='' />";
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
		html += "							<p class='txt_info_sh'>";
		html += "								소개 사진 최적 사이즈는1140px * 570px 입니다.";
		html += "							</p>";
		html += "						</td>";
		html += "					</tr>";
		
		html += "				</tbody>";
		html += "			</table>";
		html += "		</div>";
		html += "	</div>";
		
		html += "	<div>";
		
		html += gPPF_Rental.draw_career_info();	
		
		
		html += "	</div>";

		html += "</section>";

			
		$("#regartist_list").html(html);
		
		
		
		
	
		
		if (opt == "new"){
			gPPF_Rental.show_edit_field();
			$("#artist_delete").hide();
			$("#artist_modify").hide();
			$("#artist_reg").show();
			
		}else if (opt == "open"){

			var info = gPPF_Rental.cUserInfo;
			

			
			$("#artist_reg_name_read").html(g360.textToHtml_Body(info.name));
			$("#artist_reg_engname_read").html(g360.textToHtml_Body(info.name_eng));
			$("#artist_reg_content1_read").html(g360.textToHtml_Body(info.content));
			$("#artist_reg_content2_read").html(g360.textToHtml_Body(info.content2));
			
			$("#artist_reg_name").val(g360.textToHtml(info.name));
			$("#artist_reg_engname").val(g360.textToHtml(info.name_eng));
			$("#artist_reg_content1").val(g360.textToHtml(info.content));
			$("#artist_reg_content2").val(g360.textToHtml(info.content2));
			
			$("#artist_delete").show();
			$("#artist_modify").show();
			$("#artist_reg").hide();
			
			// 사진정보 뿌려주기
			debugger;
			if (info.photoimage_profile){
				$('#artist_reg_img').show();
				$("#artist_reg_pic").hide();
				$('#artist_reg_img').css('background-image', 'url(' + g360.artist_detail_photo_url(info.email)+"?open&ver="+gPPF_Rental.cUserInfo.photoimage_profile_version + ')');
			} else {
				$('#artist_reg_img').hide();
				$('#artist_reg_pic').prev().show();
			}
			if (info.photoimage_profile_full){
				$('#artist_reg_img_detail').show();
				$("#artist_reg_pic_detail").hide();
				$('#artist_reg_img_detail').css('background-image', 'url(' + g360.user_photo_profile_url(info.email)+"?open&ver="+gPPF_Rental.cUserInfo.photoimage_profile_version_full + ')');
			} else {
				$('#artist_reg_img_detail').hide();
				$('#artist_reg_pic_detail').prev().show();
			}
			
			
			
			gPPF_Rental.show_dis_field();
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
		
			
			if (gPPF_Rental.cUserInfo == ""){
				g360.gAlert("Info","기본정보를 먼저 등록하셔야 합니다.", "blue", "top");
				return false;
			}
			
			
			$('#layer_image_file').off('change').on('change', function(){
				
				var options = {
					email:_self.cUserEmail,
					imgId:'img_artist',
					width:180,
					height:180,
					resultSize:{width:300},
					onUploadStart: function(data){
						_self.timeout_id = setTimeout(function(){g360.loadingbar_open('파일을 업로드중 입니다...');}, 2000);
					},
					onUploadComplete: function(res){
						if (res.result == 'ERROR') {
							alert('업로드중 오류가 발생했습니다.');
						} else {
							_self.changeImage(options.imgId, res.url);
						}
						clearTimeout(_self.timeout_id);
						g360.loadingbar_close();
					}
				}
				gPPF_Rental.readFileImage(this, options);
				
			});
			$('#layer_image_file').click();
		});		
		
		// 작가 상세 사진 편집
		$('#artist_reg_pic_detail, #artist_reg_img_detail').on('click', function(){
			
			if (gPPF_Rental.cUserInfo == ""){
				g360.gAlert("Info","기본정보를 먼저 등록하셔야 합니다.", "blue", "top");
				return false;
			}
			
			$('#layer_image_file').off('change').on('change', function(){
				var options = {
					email:_self.cUserEmail,
					imgId:'img_profile',
					width:300,
					height:150,
					resultSize:{width:1140},
					onUploadStart: function(data){
						_self.timeout_id = setTimeout(function(){g360.loadingbar_open('파일을 업로드중 입니다...');}, 2000);
					},
					onUploadComplete: function(res){
						
						if (res.result == 'ERROR') {
							alert('업로드중 오류가 발생했습니다.');
						} else {
							_self.changeImage(options.imgId, res.url);
						}
						clearTimeout(_self.timeout_id);
						g360.loadingbar_close();
					}
				}
				gPPF_Rental.readFileImage(this, options);
				
			});
			$('#layer_image_file').click();
		});
	},
	
	
	
	// 이미지 Coppie 관련 작업
	"readFileImage":function(input, opt){
		var _self = this;
		var rawImg;

		var $crop = $('#image_edit_body');
		
		var def_opt = {
			width:200,
			height:200,
			wrapper_width: 300,
			wrapper_height: 300,
			type: 'square',
			email: g360.UserInfo.email,
			uploadWaiting: false,
			resultType: 'blob'
		};
		
		opt = $.extend({}, def_opt, opt);
		
		$crop.width(opt.wrapper_width);
		$crop.height(opt.wrapper_height + 30);
		$crop.css({
			'margin-left':'auto',
			'margin-right':'auto',
			'padding-bottom':'30px'
		});
		
		function initCroppie(){
			// cropiie Setting
			$crop.croppie('destroy');
			$crop.croppie({
				viewport: {
			        width: opt.width,
			        height: opt.height,
			        type: opt.type
			    },
			    enforceBoundary: true,
			    enableOrientation: true,
			    enableExif: true
			});
			
			var img_rotate = 0;
			
			// 이미지 회전 처리
			var btn_rotate = $('<button class="btn-rotate"></button>');
			btn_rotate.on('click', function(){
				img_rotate += 90;
				if (img_rotate == 360) img_rotate = 0;
				$crop.croppie('rotate', '-90');
			});
			$crop.find('.cr-slider-wrap').append(btn_rotate);
			
			$crop.find('.cr-boundary').css('opacity', 0);
			
			//Modal 창 뜰 때 event
			$('#layer_image_edit').off('shown.bs.modal').on('shown.bs.modal', function() {
				var mz = g360.maxZindex();
				$('.modal-backdrop').css('z-index', mz+1);
				$('#layer_image_edit').css('z-index', mz+2);

				$crop.croppie('bind', {
			        url: rawImg
			    }).then(function() {
			    	$crop.find('.cr-boundary').css('opacity', 1);
			    });
			});
			
			// 취소 처리
			$('#layer_image_edit').off('hide.bs.modal').on('hide.bs.modal', function() {
				input.value = '';
			});
			
			// 등록 처리
			$('#image_edit_ok').off('click').on('click', function(){
				// 업로드 시작시 callback
				
			
				if (opt.onUploadStart) opt.onUploadStart();
				
				var crop_promise = $.Deferred();
				var orig_promise = $.Deferred();
				
				if (opt.imgId == "img_profile"){
					// 1. 크롭 이미지 업로드
					$('#image_edit_body').croppie('result', {
						type: opt.resultType, //'blob' or 'base64',
						size: opt.resultSize ? opt.resultSize : 'viewport', //viewport | original | {width, height}
						circle:opt.type == 'circle',
						format:'png' //jpeg | png
					}).then(function(data){
						/*
						// TODO (TEST)
						var image = new Image();
					    image.src = data;

					    var w = window.open("");
					    w.document.write(image.outerHTML);
					    */
						
						var upload_promise = gPPF_Rental.photoUpload(data, opt.imgId, opt.email);
						upload_promise.always(function(res){
							crop_promise.resolve(res);
							
							if (opt.onUploadComplete) opt.onUploadComplete(res);
							$('#layer_image_edit').modal('hide');
						});
					});
					
					
				}else{
					// 1. 크롭 이미지 업로드
					$('#image_edit_body').croppie('result', {
						type: opt.resultType, //'blob' or 'base64',
						size: opt.resultSize ? opt.resultSize : 'viewport', //viewport | original | {width, height}
						circle:opt.type == 'circle',
						format:'png' //jpeg | png
					}).then(function(data){
						/*
						// TODO (TEST)
						var image = new Image();
					    image.src = data;

					    var w = window.open("");
					    w.document.write(image.outerHTML);
					    */
						
						var upload_promise = gPPF_Rental.photoUpload(data, opt.imgId, opt.email);
						upload_promise.always(function(res){
							crop_promise.resolve(res);
						});
					});
					
					
						// 2. 원본 이미지 업로드
						var artistImg = new Image();
			            artistImg.src = rawImg;
			            artistImg.onload = function(){
			            	
			            	// HTML5 canvas 객체 생성
			                var canvas = document.createElement("canvas");      
			                var ctx = canvas.getContext("2d");
			                ctx.drawImage(artistImg, 0, 0);

			                var MAX_WIDTH = 1920;
			                var width = artistImg.width;
			                var height = artistImg.height;
			        		if (width > MAX_WIDTH) {
			        			height *= MAX_WIDTH / width;
			        			width = MAX_WIDTH;
			        		}
			        		
			        		canvas.width = width;
			                canvas.height = height;
			        		ctx.drawImage(artistImg, 0, 0, width, height);
			        		
			                var dataurl = canvas.toDataURL("image/jpeg");
			                var data = _self.dataURItoBlob(dataurl);
			                
			            	var upload_promise = gPPF_Rental.photoUpload(data, 'img_artist_detail', opt.email);
							upload_promise.always(function(res){
								orig_promise.resolve(res);
							});
			            }
			            
			            
			         // 3. 최종 완료시 완료 콜백 호출
						$.when(crop_promise, orig_promise).always(function(res1, res2){
							//console.log(res1);
							//console.log(res2);
							if (opt.onUploadComplete) opt.onUploadComplete(res1);
							$('#layer_image_edit').modal('hide');
						});
				}
				
			
					
					
				
				
				
				
				
			});
			

			if (input.files && input.files[0]) {
		        var reader = new FileReader();
		        reader.onload = function(e) {
		            rawImg = e.target.result;
		            $('#image_edit_body').addClass('ready');
		            $('#layer_image_edit').modal('show');
		        }
		        reader.readAsDataURL(input.files[0]);
		    } 
		}
		
		
		initCroppie();
	},
	
	"photoUpload" : function(upload_data, img_id, target_email){
		var _self = this;
		
		var fd = new FormData();
		fd.append('ImageId', img_id);
		fd.append('ImageBody', upload_data); //업로드를 젤 최종적으로 처리
		var res = $.ajax({
			type :'POST',
			url	:'/Photo64_rental.gu?key='+target_email,
			data :fd,
			dataType:'json',
			processData : false,
		    contentType : false,
		}).then(function success(data){
			// {result:"OK", url : "업로드된 URL"}
			return data;
		}, function fail(data){
			return {result:'ERROR'};
		});
		
		return res;
	},
	
	
	"dataURItoBlob" : function(dataURI){
		var byteString = atob(dataURI.split(',')[1]);
	    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
	    var ab = new ArrayBuffer(byteString.length);
	    var ia = new Uint8Array(ab);
	    for (var i = 0; i < byteString.length; i++)
	    {
	        ia[i] = byteString.charCodeAt(i);
	    }

	    var bb = new Blob([ab], { "type": mimeString });
	    return bb;
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
		} else if (img_id == 'img_profile') {
			$('#artist_reg_img_detail').css('background-image', 'url(' + img_url + ')');
			$('#artist_reg_img_detail').show();
			$('#artist_reg_pic_detail').hide();
		}				
	},
	
	"save_artist_info_modify" : function(){
		$("#artist_delete").hide();
		$("#artist_reg").show();
		$("#artist_modify").hide();
		
	
		gPPF_Rental.opt = "edit";
		
		gPPF_Rental.show_edit_field();
	},
	
	"save_artist_info_delete" : function(){
		g360.gConfirm('정말 삭제 하시겠습니까?<br> 작가 삭제 시 연관된 작품 및 VR갤러리 작품정보에 문제가 발생될 수 있습니다.', function(){
			
			var url = g360.root_path + "/artist_reg_delete_rental.mon?id=" + gPPF_Rental.cUserEmail;
			$.ajax({
				type : "GET",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				cache : false,
				url : url,
				success : function(data){
					
				//	gPPF_Rental.load_regartistlist();
				//	gRen.infiniteScroll();
//				gRen.tab = "artist";
//			  	gRen.load_art_list(0, "init");
					gRen.navBtnAction('main', 'artist');
				},
				error : function(e){
					g360.error_alert();
				}
			})

		});
		
	},
	
	"save_artist_info_list" : function(){
		gPPF_Rental.load_regartistlist();
	},
	
	
	"save_artist_info_reg" : function(){
		
		var name = $("#artist_reg_name").val();
		var ename = $("#artist_reg_engname").val();
		var content = $("#artist_reg_content1").val();
		var content2 = $("#artist_reg_content2").val();
		
		if (name == ""){
			g360.gAlert("Info","이름(활동명)은 반드시 입력하셔야 합니다.", "blue", "top");
			return false;
		}
		
		if (ename == ""){
			g360.gAlert("Info","영문명은 반드시 입력하셔야 합니다.", "blue", "top");
			return false;
		}
		
		
		var data = JSON.stringify({
			email : gPPF_Rental.cUserEmail,
			name : name,
			nickname : gPPF_Rental.cUserInfo.nickname,
			ename : ename,
			content : content,
			content2 : content2
		});
				
		if (gPPF_Rental.opt == "new"){
			var url = g360.root_path + "/artistinfo_save_reg_rental.mon";
			$.ajax({
				type : "Post",
				data : data,
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(xdata){
					
					if (xdata.result == "OK"){
						gPPF_Rental.read_artistinfo_reg(data);
						
						$("#artist_delete").show();
						$("#artist_modify").show();
						
						if (gPPF_Rental.cUserEmail != ""){
							gPPF_Rental.load_career_list_artist("open", gPPF_Rental.cUserEmail);
						}else{
							gPPF_Rental.load_career_list();
						}
						
					}else{
						g360.error_alert();
					}			
					
					return false;

				},
				error : function(e){
					g360.error_alert();
				}
			})
			
			
			
//			var urll = g360.root_path + "/check_nickname_rental.mon?nickname=" + encodeURIComponent(name);
//			$.ajax({
//				type : "GET",
//				dataType : "json",
//				contentType : "application/json; charset=utf-8",
//				url : urll,
//				success : function(res){
//					if (res.result == "F"){
//						var url = g360.root_path + "/artistinfo_save_reg_rental.mon";
//						$.ajax({
//							type : "Post",
//							data : data,
//							dataType : "json",
//							contentType : "application/json; charset=utf-8",
//							url : url,
//							success : function(xdata){
//								
//								if (xdata.result == "OK"){
//									gPPF_Rental.read_artistinfo_reg(data);
//									
//									$("#artist_delete").show();
//									$("#artist_modify").show();
//								}else{
//									g360.error_alert();
//								}			
//								
//								return false;
//
//							},
//							error : function(e){
//								g360.error_alert();
//							}
//						})
//					}else{
//						g360.gAlert("Info","동일한 닉네임이 존재합니다.<br>다른 이름을 입력하시기 바랍니다.", "blue", "top");
//					}
//				}
//			})
		}else{
			
			var url = g360.root_path + "/artistinfo_save_reg_rental.mon";
			$.ajax({
				type : "Post",
				data : data,
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(xdata){
					
					if (xdata.result == "OK"){
						gPPF_Rental.read_artistinfo_reg(data);
						
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
		gPPF_Rental.show_dis_field();
	
		
		var data = JSON.parse(data);
		
		$("#artist_reg_name_read").text(data.name);
		$("#artist_reg_engname_read").text(data.ename);
		
		var content1 = data.content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
		var content2 = data.content2.replace(/</g, '&lt;').replace(/>/g, '&gt;');		
		content1 = content1.replace(/ /gi,"&nbsp;").replace(/(?:\r\n|\r|\n)/g, '<br />');
		content2 = content2.replace(/ /gi,"&nbsp;").replace(/(?:\r\n|\r|\n)/g, '<br />');
		
		$("#artist_reg_content1_read").html(content1);
		$("#artist_reg_content2_read").html(content2);
		
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
		var alldocuments = gPPF_Rental.totalcount;
		if (alldocuments % gPPF_Rental.perpage > 0 & alldocuments % gPPF_Rental.perpage < gPPF_Rental.perpage/2 ){
			allPage = Number(Math.round(alldocuments/gPPF_Rental.perpage)) + 1;
		}else{
			allPage = Number(Math.round(alldocuments/gPPF_Rental.perpage));
		}	

		gPPF_Rental.search_navigator(page);
	},
	
	"search_navigator" : function(page){
		var nav_cpage = page;

		var alldocuments = gPPF_Rental.totalcount;
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
				nav[0] = '<li class="p_prev"><a href="#" class="xico" onclick="javascript:gPPF_Rental.gotoPage(' + ((((cFrame-1)*10)-1)*gPPF_Rental.perpage+1) + ',' + ((cFrame-1)*10) + ');">이전</a></li>';
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
						nav[pIndex] = "<li><a href=# onclick='gPPF_Rental.gotoPage("+ (((i-1) * gPPF_Rental.perpage) + 1 ) + ", "+ i + ", this)'>" + i + "</a></li>";
						
					}else{
						if (i%10 == '1' ){
							nav[pIndex] = "<li><a href=# onclick='gPPF_Rental.gotoPage("+ (((i-1) * gPPF_Rental.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";	
						}else{
							nav[pIndex] = "<li><a href=# onclick='gPPF_Rental.gotoPage("+ (((i-1) * gPPF_Rental.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";
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
				nav[nav.length] = '<li class="p_next"><a href="#" class="xico" onclick="javascript:gPPF_Rental.gotoPage(' + ((cFrame*gPPF_Rental.perpage*10) + 1) + ',' + ((cFrame*10)+1) + ');">다음</a></li>';
			}
					
	          var navHTML = "";

			if (cFrame == 1 ){
				navHTML = '';
	          }else{
				navHTML = '<li class="p_first"><a href="#" class="xico" onclick="javascript:gPPF_Rental.gotoPage(1,1);">처음</a></li>';
	          }		    
			for( var i = 0 ; i < nav.length ; i++){	
	          	navHTML = navHTML + nav[i];
			}
					
			if (cFrame < allFrame){
				navHTML = navHTML + '<li class="p_last"><a href="#" class="xico" onclick="javascript:gPPF_Rental.gotoPage(' + ((allPage - 1)*gPPF_Rental.perpage + 1) +','+ allPage +')">마지막</a></li>';
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
			gPPF_Rental.history_list_load(PageNum);
		}else{
			gPPF_Rental.load_completed_project_type2(PageNum);
		}
		
	}
	//////////////////////////////////////// 리스트 페이징 종료    /////////////////////////////////////////////


	
	
	
	
	
	
}



































var color = Chart.helpers.color;
var config = {
	type: 'radar',
	data: {
		labels: ['전문성', '만족도', '의사소통', '일정준수', '적극성'],
		datasets: [{
			label: '세부 항목 평가',
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
			'추천',
			'제작',
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
