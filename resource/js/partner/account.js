
function gPartnerAccount(){	
	gPA = this;
	gPA.userinfo = "";
	
	gPA.userimagepath = "";
	gPA.userimagepath_profile = "";
	this.timeout_id;
}

gPartnerAccount.prototype = {		

	"init" : function(){
		var _self = this;	
		
		gPA.load_user_info().then(function(){
			// 프로필 사진 편집
			$("#edit_user_image").on("click", function(){
				$('#layer_image_file').off('change').on('change', function(){
					var options = {
						imgId:'img_profile',
						width:200,
						height:200,
						type:'circle',
						onUploadStart: function(data){
							_self.timeout_id = setTimeout(function(){g360.loadingbar_open(g360.g_lang.Upload_File);}, 2000);
						},
						onUploadComplete: function(res){
							if (res.result == 'ERROR') {
								g360.gAlert(g360.g_lang.Upload_Error);
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
			$('#user_photo').on('click', function(){
				$("#edit_user_image").click();
			});
		});
					

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
		
		
		$(".sub_common_content.account_setting aside ul li").on("click", function(event){
			
			gPA.empty_class_on();
			$(this).addClass("on");
			
			var id = event.currentTarget.id;
			
			g360.history_record(id);
			if (id == "account_basic"){
				g360.LoadPage("body_content", g360.root_path + "/partner/account/account.jsp");
				return false;
			}else if (id == "account_bank"){
				g360.LoadPage("body_content", g360.root_path + "/partner/account/bank.jsp");
				return false;
			}else if (id == "account_password"){
				gPA.goto_password_change();
			}else if (id == "account_alram"){
				g360.LoadPage("body_content", g360.root_path + "/partner/account/alram.jsp");
				return false;
			}else if (id == "account_expire"){
				g360.LoadPage("body_content", g360.root_path + "/partner/account/expire.jsp");
				return false;
			}
			
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
		
		$(".g_lang_Edit_basic_info").html(g360.g_lang.Edit_basic_info);
		$(".g_lang_Back").html(g360.g_lang.Back);
		
		$(".g_lang_Account_Management").html(g360.g_lang.Account_Management);
		$(".g_lang_Change_PW").html(g360.g_lang.Change_PW);
		$(".g_lang_Account_Withdrawal").html(g360.g_lang.Account_Withdrawal);
		
		$(".g_lang_Mypage20").html(g360.g_lang.Mypage20);
		$(".g_lang_Basic_Information").html(g360.g_lang.Basic_Information);
		
		$(".g_lang_Phone_certification1").html(g360.g_lang.Phone_certification1);
		$(".g_lang_Phone_certification2").html(g360.g_lang.Phone_certification2);
		$(".g_lang_Phone_certification3").html(g360.g_lang.Phone_certification3);
		$(".g_lang_Phone_certification4").html(g360.g_lang.Phone_certification4);
		
		$(".g_lang_Bank_1").html(g360.g_lang.Bank_1);
		$(".g_lang_Bank_2").html(g360.g_lang.Bank_2);
		$(".g_lang_Bank_3").html(g360.g_lang.Bank_3);
		$(".g_lang_Bank_4").html(g360.g_lang.Bank_4);
		
		$(".g_lang_Name").html(g360.g_lang.Name);
		$(".g_lang_Register").html(g360.g_lang.Register);
		
		$(".g_lang_Mypage_Alert12").html(g360.g_lang.Mypage_Alert12);
		$(".g_lang_Email").html(g360.g_lang.Email);
		$(".g_lang_Password").html(g360.g_lang.Password);
		$(".g_lang_Ch_PW2").html(g360.g_lang.Ch_PW2);
		
		$(".g_lang_Withdrawal1").html(g360.g_lang.Withdrawal1);
		$(".g_lang_Withdrawal2").html(g360.g_lang.Withdrawal2);
		$(".g_lang_Withdrawal3").html(g360.g_lang.Withdrawal3);
		$(".g_lang_Withdrawal4").html(g360.g_lang.Withdrawal4);
		
		$(".g_lang_Withdrawal4_1").html(g360.g_lang.Withdrawal4_1);
		$(".g_lang_Withdrawal4_2").html(g360.g_lang.Withdrawal4_2);
		$(".g_lang_Withdrawal4_3").html(g360.g_lang.Withdrawal4_3);
		$(".g_lang_Withdrawal4_4").html(g360.g_lang.Withdrawal4_4);
		$(".g_lang_Withdrawal4_5").html(g360.g_lang.Withdrawal4_5);
		$(".g_lang_Withdrawal4_6").html(g360.g_lang.Withdrawal4_6);
		$(".g_lang_Withdrawal4_7").html(g360.g_lang.Withdrawal4_7);
		$(".g_lang_Withdrawal4_8").html(g360.g_lang.Withdrawal4_8);
		$(".g_lang_Withdrawal4_9").html(g360.g_lang.Withdrawal4_9);
		$(".g_lang_Withdrawal4_10").html(g360.g_lang.Withdrawal4_10);
		
		$(".g_lang_Withdrawal5").html(g360.g_lang.Withdrawal5);
		$(".g_lang_Withdrawal6").html(g360.g_lang.Withdrawal6);
		$(".g_lang_Withdrawal7").html(g360.g_lang.Withdrawal7);

		$("#zip_code_search h2").html(g360.g_lang.Find_postal_code);
		$("#addSearch").attr("placeholder",g360.g_lang.Find_postal_code2);
		
	},
	
	
	"load_user_info" : function(){
		var url = g360.root_path + "/search_userinfo.mon";
		url += "?" + new Date().getTime();
		return $.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				gPA.userinfo = data;
				gPA.setUserInfo();
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"setUserInfo" : function(){
	
		var nickname = gPA.userinfo.nickname;
		var email = gPA.userinfo.email;
		$("#user_nickname").html("<strong>"+g360.g_lang.Nickname+"</strong>" + nickname + "");
		$("#user_email").html("<strong>"+g360.g_lang.Email+"</strong>" + email + "");
		var gubun = gPA.userinfo.gubun;
		var tx = (gubun == "art" ? g360.g_lang.Artist : gubun== "curator" ? g360.g_lang.Art_consultant : g360.g_lang.General_User);
		$("#user_type").html("<strong>"+g360.g_lang.Partner_type+"</strong>" + tx + "");
		
		
	
		if (typeof(gPA.userinfo.smskey) != "undefined" && gPA.userinfo.smskey != ""){
				gPA.info_edit(gPA.userinfo.name, gPA.userinfo.gender, gPA.userinfo.smskey, gPA.userinfo.mobile);
		}
	
		
		// 이미지 없는 경우 URL
		var gubun = g360.UserInfo.gubun;
		var no_img_url = "";
		if (gubun == "normal"){
			no_img_url = "/img/member/avatar-non-profile.svg";
		}else if (gubun == "curator"){
			no_img_url = "/img/member/avatar-non-profile-curater.svg";
		}else if (gubun == "art"){
			no_img_url = "/img/member/avatar-non-profile-artist.svg";
		}			
		
		var img_url = '';
		if (gPA.userinfo.photoimage){
			img_url = g360.user_photo_url(gPA.userinfo.email);
			img_url += (gPA.userinfo.photoimage_version ? '?open&ver=' + gPA.userinfo.photoimage_version : '');
		}
		
		$('#user_photo').css('background-image', 'url("' + img_url + '"), url("' + no_img_url + '")');
	},
	
	
	"goto_password_change" : function(){
		
		if (g360.UserInfo.site == ""){
			g360.LoadPage("body_content", g360.root_path + "/partner/account/password.jsp");
			return false;
		}else{
			g360.gAlert("Error",g360.g_lang.Mypage_Alert7, "red", "left");
			return false;
		}

	},
	
	"bankInit" : function(){
		
		//기존 저장된 계좌 정보를 가져와서 초기화 해준다.
		gPA.load_bank_account();
		
		$("#bankSave").on("click", function(event){
			var data = JSON.stringify({
				bankName : $("#bankName").val(),
				accountName : $("#accountName").val(),
				accountNum : $("#accountNum").val()
			});
			
			var url = g360.root_path + "/saveBankAccount.mon";
			$.ajax({
				type : "POST",
				data : data,
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(data){
					if (data.result == "OK"){
						g360.gAlert("Info",g360.g_lang.Mypage_Alert11, "blue", "top");
					}else{
						g360.error_alert();
					}					
				},
				error : function(e){
					g360.error_alert();
				}
			})
			
		});
	},
	
	"load_bank_account" : function(){
		
		var url = g360.root_path + "/load_bank_account.mon";
		url += "?" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				if (data.result == "OK"){
					var bankName = data.bankName;
					var accountName = data.accountName;
					var accountNum = data.accountNum;
					
					$("#bankName").val(bankName);
					$("#accountName").val(accountName);
					$("#accountNum").val(accountNum);
					return false;					
				}
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"passwordInit" : function(){
		
		$("#pw_email").val(g360.UserInfo.email);
		$("#pw_pw").val("");
		
		$("#pwchange").on("click", function(evnet){
			var data = JSON.stringify({
				id : $("#pw_email").val(),
				pw : $("#pw_pw").val()
			})
			url = g360.root_path + "/pCheck.mon";
			$.ajax({
				type : "POST",
				data : data,
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(data){
					
					if (data.result == "OK"){
						var html = "";
						html += "<div class='group_section'>";
						html += "	<div class='group_header type3 autoheight noborder_top'>";
						html += "		<h3>"+g360.g_lang.Ch_PW1+"</h3>";
						html += "	</div>";
						html += "	<div class='wrap_group account_table_area bg_white'>";
						html += "		<table>";
						html += "			<tbody>";
						html += "				<tr>";
						html += "					<th><span>"+g360.g_lang.New_password+"</span></th>";
						html += "					<td>";
						html += "						<input type='password' id='newpw1' class='txt' />";
						html += "						<span>"+g360.g_lang.Mypage_Alert13+"</span>";
						html += "					</td>";
						html += "				</tr>";
						html += "				<tr>";
						html += "					<th><span>"+g360.g_lang.New_password_confirmation+"</span></th>";
						html += "					<td>";
						html += "						<input type='password' id='newpw2' class='txt' />";
						html += "						<span>"+g360.g_lang.Mypage_Alert14+"</span>";
						html += "					</td>";
						html += "				</tr>";
						html += "			</tbody>";
						html += "		</table>";
						html += "		<div class='btn_area bottom_area'>";
					//	html += "			<button class='btn btn_gray btn_cancel'>취소</button>";
						html += "			<button class='btn btn_violet btn_ok' onclick=\"gPA.changepw()\">"+g360.g_lang.Request_for_change+"</button>";
						html += "		</div>";
						html += "	</div>";
						html += "</div>";

						$("#pw_change_mode").html(html);
					}else{
						g360.gAlert("Error",g360.g_lang.Mypage_Alert15, "red", "left");
					}
					
					
					
					
				},
				error : function(e){
					g360.error_alert();
				}
			})
		});
	},
	
	
	
	"changepw" : function(){
		
		var pw1 = $("#newpw1").val();
		var pw2 = $("#newpw2").val();
		
		if (pw1 != pw2){
			g360.gAlert("Error",g360.g_lang.Mypage_Alert16, "red", "left");
			return false;
		}
		
		var data = JSON.stringify({
			pw : pw1
		});
		if (g360.paswordcheck(pw1)){
			var url = g360.root_path + "/cpw.mon";
			$.ajax({
				type : "POST",
				data : data,
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(data){
					if (data.result == "OK"){
						g360.gAlert("Info",g360.g_lang.Mypage_Alert17, "blue", "top");
						gPA.goto_password_change();
					}
					
				},
				error : function(e){
					alert(g360.g_lang.AccountSetting_1);
				}
			})
		}
	},
	
	"member_expire" : function(){
				
		$.confirm({
			title : " ",
			content : g360.g_lang.Mypage_Alert18,
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
						var url = g360.root_path + "/expire_member.mon";
						url += "?" + new Date().getTime();
						$.ajax({
							type : "GET",
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							url : url,
							success : function(data){
								if (data.result == "OK"){
									g360.gAlert("Info",g360.g_lang.Mypage_Alert5, "blue", "top");
									loginFC.logout();
								}else{
									g360.error_alert();
								}
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
	
	"empty_class_on" : function(){
		$(".sub_common_content.account_setting aside ul li").each(function(evnet){
			$(this).removeClass("on");
		});
	},
	
	
	"sms_approval" : function(){
		
//		gPA.info_edit("김윤기", "male");
//		return false;

		IMP.certification({
			company : g360.g_lang.Gallery360,
		    merchant_uid : 'merchant_' + new Date().getTime() //본인인증과 연관된 가맹점 내부 주문번호가 있다면 넘겨주세요
		}, function(rsp) {

		    if ( rsp.success ) {
		    	 // 인증성공
		        
		        $.ajax({
						type : 'POST',
						url : g360.root_path + '/sms_confirm.mon',
						dataType : 'json',
						data : ({
							imp_uid : rsp.imp_uid
						})
				 }).done(function(rsp) {
				 		// 이후 Business Logic 처리하시면 됩니다.
				 		
				 		var res = rsp.response;
				 		if (res.certified){
				 			if (gPA.userinfo.smskey != ""){
				 				
				 				if (typeof(gPA.userinfo.smskey) == "undefined" || gPA.userinfo.smskey == res.unique_key){
				 					gPA.info_edit(res.name, res.gender, res.unique_key, res.phone);
				 				}else{
				 					g360.gAlert("Error",g360.g_lang.Mypage_Alert8, "red", "left");
				 				}
				 			}else{
				 				//gPA.info_edit(res.name, res.gender, res.unique_key);
				 				
				 				//내가 smskey가 없을 경우 최초 등록일 때는 해당 키로 사용하는 사람이 있는지 체크해서 있으면 중복 등록 못하게 한다.
				 				var uurl = g360.root_path + "/smskey_dupl_check.mon?key=" + res.unique_key + "&" + new Date().getTime();
				 				$.ajax({
				 					Type : "GET",
				 					dataType : "json",
				 					contentType : "application/json; charset=utf-8",
				 					url : uurl,
				 					success : function(data){
				 						if (data.result == "F"){
				 							gPA.info_edit(res.name, res.gender, res.unique_key, res.phone);
				 							gPA.userinfo_save();
				 						}else{
				 							g360.gAlert("Error",g360.g_lang.Mypage_Alert9, "red", "left");
				 							return false;
				 						}
				 					},
				 					error : function(e){
				 						g360.error_alert();
				 					}
				 				})		 				
					 			
				 			}
				 			
				 		}
				 	//	curl -H "Content-Type: application/json" 
				 	//    https://api.iamport.kr/certifications/{imp_uid}
				 });
		        	
		    } else {
		    	 // 인증취소 또는 인증실패
		        var msg = g360.g_lang.Mypage_Alert10;
		        msg += 'Error : ' + rsp.error_msg;
		        g360.gAlert("Error", msg , "red", "left");
		    }
		});
	},
	
	
	"info_edit" : function(name, gender, smskey, mobile){
		var _self = this;
		
		var html = "";
		
		var ptype = (gPA.userinfo.gubun == "art" ? g360.g_lang.Artist : gPA.userinfo.gubun == "curator" ? g360.g_lang.Art_consultant : g360.g_lang.General_User);
		
		var nickname = gPA.userinfo.nickname;
		var birth = (typeof(gPA.userinfo.birth) != "undefined" ? gPA.userinfo.birth : "");
		var name_eng = (typeof(gPA.userinfo.name_eng) != "undefined" ? gPA.userinfo.name_eng : "");
	//	var mobile = (typeof(gPA.userinfo.mobile) != "undefined" ? gPA.userinfo.mobile : "");
		var tel1 = (typeof(gPA.userinfo.tel1) != "undefined" ? gPA.userinfo.tel1 : "");
		var tel2 = (typeof(gPA.userinfo.tel2) != "undefined" ? gPA.userinfo.tel2 : "");
		var tel3 = (typeof(gPA.userinfo.tel3) != "undefined" ? gPA.userinfo.tel3 : "");
		var address1 = (typeof(gPA.userinfo.first_address) != "undefined" ? gPA.userinfo.first_address : "");
		var address2 = (typeof(gPA.userinfo.second_address) != "undefined" ? gPA.userinfo.second_address : "");
	//	var smskey = (typeof(gPA.userinfo.smskey) != "undefined" ? gPA.userinfo.smskey : "");
		
		html +="<table>";
		html +="	<tbody>";
		
		html +="		<tr>";
		html +="			<th><span>"+g360.g_lang.Type2+"</span></th>";
		html +="			<td>";
		html +="				<div class='btn-group'>";
		html +="					<button id='gubun_select_box' disabled style='cursor:pointer' class='bg-transparent border-0 dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
		html +="						"+ptype;
		html +="					</button>";
		html +="					<div class='dropdown-menu'>";
		html +="						<a class='dropdown-item' >"+g360.g_lang.Artist+"</a>";
		html +="						<a class='dropdown-item' >"+g360.g_lang.Art_consultant+"</a>";
		html +="						<a class='dropdown-item' >"+g360.g_lang.General_User+"</a>";
		html +="					</div>";
		html +="				</div>";
		html +="			</td>";
		html +="		</tr>";
		
		html +="		<tr>";
		html +="			<th><span>"+g360.g_lang.Name+"</span></th>";
		html +="			<td><input type='text' id='name' value='"+name+"' class='txt' disabled /></td>";
		html +="		</tr>";
		html +="		<tr>";
		html +="			<th><span>"+g360.g_lang.Gender+"</span></th>";
		html +="			<td><input type='text' id='gender' value='"+gender+"' class='txt' disabled /></td>";
		html +="		</tr>";
		
		html +="		<tr>";
		html +="			<th><span>"+g360.g_lang.English_name+"</span></th>";
		html +="			<td><input type='text' id='name_eng' value='"+name_eng+"' class='txt' /></td>";
		html +="		</tr>";
		
		html +="		<tr>";
		html +="			<th>";
		html +="				<span class='t_info_sh'>"+g360.g_lang.Photo+"<button id='btn_profile_list_info' class='btn btn_info_sh'>"+g360.g_lang.Info+"</button></span>";
		html +="				<div id='layer_profile_list_info' class='img_reginfo_sh' style='display:none;'>";
		html +="					<div>";
		html +="						<p>"+g360.g_lang.ProfileSetting_Alert5+"</p>";
		html +="						<img src='/img/account/img_layer_info1.jpg' alt='' />";
		html +="					</div>";
		html +="				</div>";
		html +="			</th>";
		
		html +="			<td>";
		html +="				<div class='thm_author_info_sh' style='display:none'><img src='/img/account/thumb_default_author.png' /><img src='/img/account/btn-edit-profile-img.svg' alt='수정' class='btn_edit_sh'></div>";
		html +="				<div id='account_img_artist' class='account_img_artist'><img src='/img/account/btn-edit-profile-img.svg' alt='수정' class='btn_edit_sh'></div>";
		html +="				<p class='txt_info_sh'>"+g360.g_lang.AccountSetting_2+"</p>";
		html +="			</td>";
		html +="		</tr>";
		
		
		html +="		<tr>";
		html +="			<th>";
		html +="				<span class='t_info_sh'>"+g360.g_lang.Intro_photo+"<button id='btn_profile_detail_info' class='btn btn_info_sh'>"+g360.g_lang.Info+"</button></span>";
		html +="				<div id='layer_profile_detail_info' class='img_reginfo_sh' style='display:none;'>";
		html +="					<div>";
		html +="						<p>"+g360.g_lang.ProfileSetting_Alert4+"</p>";
		html +="						<img src='/img/account/img_layer_info2.jpg' alt='' />";
		html +="					</div>";
		html +="				</div>";
		html +="			</th>";

		html +="			<td>";
		html +="				<div class='thm_author_info_sh' style='display:none;'><img src='/img/account/thumb_default_pic.png' /><img src='/img/account/btn-edit-profile-img.svg' alt='수정' class='btn_edit_sh'></div>";
		html +="				<div id='account_img_artist_detail' class='account_img_artist'><img src='/img/account/btn-edit-profile-img.svg' alt='수정' class='btn_edit_sh'></div>";
		html +="				<p class='txt_info_sh'>"+g360.g_lang.AccountSetting_3+"</p>";
		html +="			</td>";
		html +="		</tr>";
		
		html +="		<tr>";
		html +="			<th><span>"+g360.g_lang.Artist_Name3+"</span></th>";
		html +="			<td><input type='text' id='account_nickname' value='"+ nickname+"' class='txt' /></td>";
		html +="		</tr>";
		html +="		<tr>";
		html +="			<th><span>"+g360.g_lang.Phone_Number+"</span></th>";
		html +="			<td>";
		html +="				<input type='text' id='mobile' value='"+ mobile+"' class='txt txt_m_num' disabled placeholder='ex) 01034210981' />";
//		html +="				<button class='btn btn_ghost btn_num_change'>번호변경</button>";
		html +="			</td>";
		html +="		</tr>";
		
		html +="		<tr>";
		html +="			<th><span>"+g360.g_lang.Date_of_birth+"</span></th>";
		html +="			<td><input type='text' id='birth' value='"+ birth+"' class='txt' placeholder='ex) 1971-01-20' /></td>";
		html +="			</td>";
		html +="		</tr>";

		html +="		<tr>";
		html +="			<th>"+g360.g_lang.Wireline_Number+"</th>";
		html +="			<td class='t_tel'>";
		html +="				<input type='text'  value='"+ tel1+"' class='txt' id='tel1' /> - <input type='text'  value='"+ tel2+"' class='txt' id='tel2' /> - <input type='text'  value='"+ tel3+"' class='txt' id='tel3' />";
		html +="			</td>";
		html +="		</tr>";
		html +="		<tr>";
		html +="			<th>"+g360.g_lang.Address+"</th>";
		html +="			<td>";
		html +="				<input type='text' class='txt txt_address'  value='"+ address1+"' id='first_address' style='width: calc(100% - 101px)' disabled/>";
		html +="				<button class='btn btn_ghost btn_find_address' style='font-size:small' onclick=\"g360.zip_code_popup();\">"+g360.g_lang.Find_Address+"</button>";
		html +="				<input type='text'  value='"+ address2+"' class='txt' id='second_address' />";
		html +="			</td>";
		html +="		</tr>";
		
		html +="		<tr>";
		html +="			<td colspan='2'>";
		html +="				<div class='btn_area bottom_area'>";
	//	html +="					<button class='btn btn_gray btn_cancel'>취소</button>";
		html +=" 					<button class='btn btn_violet btn_ok' onclick=\"gPA.userinfo_save()\">"+g360.g_lang.Update1+"</button>";
		html +="				</div>";
		
		html +="			</td>";
		html +="		</tr>";
		
		html +="	</tbody>";
		html +="</table>";
		
		html += "<input type='hidden'  value='"+ smskey+"'  id='smskey'  />";
		
		$("#profile_info_edit").html(html);
		
		
		
		// 사진정보 뿌려주기
		if (_self.userinfo.photoimage_list){
			var photo_list_url = g360.user_photo_color_url(_self.userinfo.email);
			photo_list_url += (_self.userinfo.photo_list_version ? '?open&ver=' + _self.userinfo.photo_list_version : '');
			$('#account_img_artist').css('background-image', 'url(' + photo_list_url + ')');
		} else {
			$('#account_img_artist').hide();
			$('#account_img_artist').prev().show();
		}
		if (_self.userinfo.photoimage_profile){
			var photo_profile_url = g360.user_photo_profile_url(_self.userinfo.email);
			photo_profile_url += (_self.userinfo.photo_profile_version ? '?open&ver=' + _self.userinfo.photo_profile_version : '');
			$('#account_img_artist_detail').css('background-image', 'url(' + photo_profile_url + ')');
		} else {
			$('#account_img_artist_detail').hide();
			$('#account_img_artist_detail').prev().show();
		}
		
		
		// 작가 사진 편집
		$('#account_img_artist').on('click', function(){
			$('#layer_image_file').off('change').on('change', function(){
				var options = {
					imgId:'img_artist',
					width:300,
					height:150,
					resultSize:{width:1180},
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
		$('#account_img_artist').prev().on('click', function(){
			$('#account_img_artist').click();
			return false;
		});
		
		
		// 작가 상세 사진 편집
		$('#account_img_artist_detail').on('click', function(){
			$('#layer_image_file').off('change').on('change', function(){
				var options = {
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
		$('#account_img_artist_detail').prev().on('click', function(){
			$('#account_img_artist_detail').click();
			return false;
		});
		
		
		$(".dropdown-menu .dropdown-item").on("click", function(event){			
			//gMakeVR.music = event.currentTarget.id;
			$("#gubun_select_box").text(event.currentTarget.text);
		});
		
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
				
	},
	
	
	
	
	"userinfo_save" : function(){
		//debugger;
		var name = $("#name").val();
		var name_eng = $("#name_eng").val();
		var smskey = $("#smskey").val();
		var nickname = $("#account_nickname").val();
		var gender = $("#gender").val();
		var gg = $("#gubun_select_box").text();
		gg = $.trim(gg);
		var gubun = "";
		if (gg == g360.g_lang.Artist){
			gubun = "art";
		}else if (gg == g360.g_lang.Art_consultant){
			gubun = "curator";
		}else if (gg == g360.g_lang.General_User){
			gubun = "normal";
		}
		var gubun = gubun;
		var birth = $("#birth").val();
		var mobile = $("#mobile").val();
		var tel1 = $("#tel1").val();
		var tel2 = $("#tel2").val();
		var tel3 = $("#tel3").val();
		var first_address = $("#first_address").val();
		var second_address = $("#second_address").val();
		
//		var photoimage = gPA.userimagepath;
//		var photoimage_profile = gPA.userimagepath_profile;
		
//		var data = JSON.stringify({
//			name : name,
//			smskey : smskey,
//			photoimage : photoimage,
//			nickname : nickname,
//			gender : gender,
//			gubun : gubun,
//			birth : birth,
//			mobile : mobile,
//			tel1 : tel1,
//			tel2 : tel2,
//			tel3 : tel3,
//			first_address : first_address,
//			second_address : second_address
//		});
		
		
		var xjson = new Object();
		xjson.name = name;
		xjson.name_eng = name_eng;
		xjson.smskey = smskey;
		xjson.nickname = nickname;
		xjson.curnickname = g360.UserInfo.nickname;
		xjson.gender = gender;
		xjson.gubun = gubun;
		xjson.birth = birth;
		xjson.mobile = mobile;
		xjson.tel1 = tel1;
		xjson.tel2 = tel2;
		xjson.tel3 = tel3;
		xjson.first_address = first_address;
		xjson.second_address = second_address;
		
		//저장후 바로 작품 등록을 할 수 있도록 키값을 설정해 준다.
		g360.UserInfo.smskey = smskey;
		
//		if (photoimage != ""){
//			xjson.photoimage = photoimage;
//		}
//		
//		if (photoimage_profile != ""){
//			xjson.photoimage_profile = photoimage_profile;
//		}
		
		var data = JSON.stringify(xjson);
		
		
		var urll = g360.root_path + "/check_nickname.mon?nickname=" + encodeURIComponent(nickname);
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : urll,
			success : function(res){
				if (res.result == "F"){
					var url = g360.root_path + "/user_info_update.mon";
					$.ajax({
						type : "POST",
						data : data,
						datatype : "json",
						contentType : "application/json; charset=utf-8",
						url : url,
						success : function(data){
							if (data.result == "OK"){
								
								g360.gAlert("Info", g360.g_lang.Mypage_Alert19 , "blue", "top");
								
								g360.UserInfo.smskey = smskey;
								g360.photo_image_change();
								g360.UserInfo.nickname = nickname;
								gTopMain.navBtnAction('account');
							}else{
								g360.gAlert("Error",data.msg, "red", "left");
							
							}
							
						},
						error : function(e){
							g360.error_alert();
						}
					})
				}else{
					g360.gAlert("",g360.g_lang.Mypage_Alert20);
				}
			}
		});
		
		
		
	},
	
	"set_address" : function(str){
		
		$("#first_address").val(str);
	},
	
	"changeImage" : function(img_id, url){
		
		var img_url = url + "?open&ver=" + new Date().getTime();
		
		if (img_id == 'img_profile') {
			// 프로파일 관련 이미지 변경
			var no_img = g360.user_photo_url_none(g360.UserInfo.gubun);
			$('#user_photo').css('background-image', 'url(' + img_url + '), url(' + no_img + ')');
			
			// 기타 영역 이미지 수정
			g360.photo_image_change();
		} else if (img_id == 'img_artist') {
			$('#account_img_artist').css('background-image', 'url(' + img_url + ')');
			$('#account_img_artist').show();
			$('#account_img_artist').prev().hide();
		} else if (img_id == 'img_artist_detail') {
			$('#account_img_artist_detail').css('background-image', 'url(' + img_url + ')');
			$('#account_img_artist_detail').show();
			$('#account_img_artist_detail').prev().hide();
		}
	}
	
	
}

