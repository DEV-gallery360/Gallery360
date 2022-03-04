
function gClientACL(){	
	gCACL = this;
	gCACL.userinfo = "";
	
	gCACL.userimagepath = "";

}

gClientACL.prototype = {		

	"init" : function(){
		var _self = this;	
		
		gCACL.load_user_info().then(function(){
			// 프로필 사진 편집
			$("#client_edit_user_image").on("click", function(){
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
								g360.gAlert('',g360. g_lang.Upload_Errors);
							} else {
								g360.photo_image_change();
								var url = g360.user_photo_url(g360.UserInfo.email) + "?open&ver=" + new Date().getTime();
								$("#client_user_photo").attr("src", url);
							}
							clearTimeout(_self.timeout_id);
							g360.loadingbar_close();
						}
					}
					g360.readFileImage(this, options);
				});
				$('#layer_image_file').click();
			});
			
			
		});
		
		
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
			
			gCACL.empty_class_on();
			$(this).addClass("on");
			
			var id = event.currentTarget.id;
			if (id == "client_account_basic"){
				g360.history_record("client_account_basic");
				g360.LoadPage("body_content", g360.root_path + "/client/aclist/aclist.jsp?page_type=sub");
			}else if (id == "client_account_bank"){
				g360.history_record("client_account_bank");
				g360.LoadPage("body_content", g360.root_path + "/client/aclist/bank.jsp?page_type=sub");
			}else if (id == "client_account_password"){
				g360.history_record("client_account_password");
				gCACL.goto_password_change();
			}else if (id == "client_account_alram"){
				g360.history_record("client_account_alram");
				g360.LoadPage("body_content", g360.root_path + "/client/aclist/alram.jsp?page_type=sub");
			}else if (id == "client_account_expire"){
				g360.history_record("client_account_expire");
				g360.LoadPage("body_content", g360.root_path + "/client/aclist/expire.jsp?page_type=sub");
			}
			
		});
		
		$('.sub_header_title').on('click', function(){
			$('.sub_common').removeClass('sub_show');
			$('html').scrollTop(0);
		});
		
		_self.g_lang();
	},

	"g_lang" : function(){
		
		$(".g_lang_Mypage1").html(g360.g_lang.Mypage1);
		$(".g_lang_Mypage2").html(g360.g_lang.Mypage2);
		$(".g_lang_Mypage3").html(g360.g_lang.Mypage3);
		$(".g_lang_Mypage4").html(g360.g_lang.Mypage4);
		$(".g_lang_Mypage5").html(g360.g_lang.Mypage5);
		
		$(".g_lang_Basic_info_management").html(g360.g_lang.Basic_info_management);
		$(".g_lang_Back").html(g360.g_lang.Back);
		
		$(".g_lang_Basic_info_management").html(g360.g_lang.Basic_info_management);
		$(".g_lang_Account_Management").html(g360.g_lang.Account_Management);
		$(".g_lang_Change_PW").html(g360.g_lang.Change_PW);
		$(".g_lang_Account_Withdrawal").html(g360.g_lang.Account_Withdrawal);
		
		$(".g_lang_Basic_Information").html(g360.g_lang.Basic_Information);
		$(".g_lang_Name").html(g360.g_lang.Name);
		$(".g_lang_Nickname").html(g360.g_lang.Nickname);
		$(".g_lang_Phone_Number").html(g360.g_lang.Phone_Number);
		$(".g_lang_Date_of_birth").html(g360.g_lang.Date_of_birth);
		$(".g_lang_Wireline_Number").html(g360.g_lang.Wireline_Number);
		$(".g_lang_Address").html(g360.g_lang.Address);
		$(".g_lang_Find_Address").html(g360.g_lang.Find_Address);
		$(".g_lang_Update1").html(g360.g_lang.Update1);
		
		$(".g_lang_Mypage20").html(g360.g_lang.Mypage20);
		
		$(".g_lang_Phone_certification1").html(g360.g_lang.Phone_certification1);
		$(".g_lang_Phone_certification2").html(g360.g_lang.Phone_certification2);
		$(".g_lang_Phone_certification3").html(g360.g_lang.Phone_certification3);
		
		//==================================
		
		$(".g_lang_Register").html(g360.g_lang.Register);
		$(".g_lang_Bank_1").html(g360.g_lang.Bank_1);
		$(".g_lang_Bank_2").html(g360.g_lang.Bank_2);
		$(".g_lang_Bank_3").html(g360.g_lang.Bank_3);
		$(".g_lang_Bank_4").html(g360.g_lang.Bank_4);
		
		//==================================
		
		$(".g_lang_Change_PW").html(g360.g_lang.Change_PW);
		$(".g_lang_Ch_PW1").html(g360.g_lang.Ch_PW1);
		$(".g_lang_Ch_PW2").html(g360.g_lang.Ch_PW2);
		$(".g_lang_Email").html(g360.g_lang.Email);
		$(".g_lang_Login_PW").html(g360.g_lang.Login_PW);
		
		//==================================
		
		$(".g_lang_Account_Withdrawal").html(g360.g_lang.Account_Withdrawal);
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
				gCACL.userinfo = data;
				gCACL.setUserInfo();
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"setUserInfo" : function(){
	
		var nickname = gCACL.userinfo.nickname;
		var email = gCACL.userinfo.email;
		$("#client_user_nickname").html("<strong>"+g360.g_lang.Nickname+"</strong>" + nickname + "");
		$("#client_user_email").html("<strong>"+g360.g_lang.Email+"</strong>" + email + "");
		var gubun = gCACL.userinfo.gubun;
		var tx = (gubun == "art" ? g360.g_lang.Artist : gubun== "curator" ? g360.g_lang.Art_consultant : g360.g_lang.General_User);
		$("#client_user_type").html("<strong>"+g360.g_lang.Type+"</strong>" + tx + "");
		
		if (typeof(gCACL.userinfo.smskey) != "undefined" && gCACL.userinfo.smskey != ""){
			gCACL.info_edit(gCACL.userinfo.name, gCACL.userinfo.gender, gCACL.userinfo.smskey, gCACL.userinfo.mobile);
		}
		
	
		if (typeof(gCACL.userinfo.photoimage) != "undefined" && gCACL.userinfo.photoimage != ""){
		//	var url = g360.user_photo_url(gCACL.userinfo.email);
		
			
			var url = g360.user_photo_url(g360.UserInfo.email) + "?open&ver=" + new Date().getTime();
			$("#client_user_photo").attr("src", url);
			$("#client_user_photo").attr("onerror", "g360.user_photo_url_none_draw(this)");
		}else{
			var url = g360.user_photo_url_none();
			$("#client_user_photo").attr("src", url);
		}

		
				
	},
	
	"empty_class_on" : function(){
		$(".sub_common_content.account_setting aside ul li").each(function(evnet){
			$(this).removeClass("on");
		});
	},
	
	"goto_password_change" : function(){
		
		if (g360.UserInfo.site == ""){
			g360.LoadPage("body_content", g360.root_path + "/client/aclist/password.jsp?page_type=sub");
			return false;
		}else{
			g360.gAlert("Error",g360.g_lang.Mypage_Alert7, "red", "left");
			return false;
		}

	},


	"sms_approval" : function(){

//		gCACL.info_edit("김윤기", "male");
//		return false;
		
		IMP.certification({
			company : "갤러리360",
		    merchant_uid : 'merchant_' + new Date().getTime() //본인인증과 연관된 가맹점 내부 주문번호가 있다면 넘겨주세요
		}, function(rsp) {
			
		    if ( rsp.success ) {
		    	 // 인증성공
//		        console.log(rsp.imp_uid);
//		        console.log(rsp.merchant_uid);
		        
		        $.ajax({
						type : 'POST',
						url : g360.root_path + '/sms_confirm.mon',
						dataType : 'json',
						data : ({
							imp_uid : rsp.imp_uid
						})
				 }).done(function(rsp) {
				 		/// 이후 Business Logic 처리하시면 됩니다.
				 		
				 		var res = rsp.response;
				 		if (res.certified){
		
				 			
				 			if (gCACL.userinfo.smskey != ""){
				 				if (typeof(gCACL.userinfo.smskey) == "undefined" || gCACL.userinfo.smskey == res.unique_key){
				 					gCACL.info_edit(res.name, res.gender, res.unique_key, res.phone);
				 				}else{
				 					g360.gAlert("Error",g360.g_lang.Mypage_Alert8, "red", "left");
				 				}
				 			}else{
				 				//내가 smskey가 없을 경우 최초 등록일 때는 해당 키로 사용하는 사람이 있는지 체크해서 있으면 중복 등록 못하게 한다.
				 				var uurl = g360.root_path + "/smskey_dupl_check.mon?key=" + res.unique_key + "&" + new Date().getTime();
				 				$.ajax({
				 					Type : "GET",
				 					dataType : "json",
				 					contentType : "application/json; charset=utf-8",
				 					url : uurl,
				 					success : function(data){
				 					
				 						if (data.result == "F"){
				 							gCACL.info_edit(res.name, res.gender, res.unique_key, res.phone);
				 							gPA.userinfo_save();
				 						}else{
				 							g360.gAlert("Info",g360.g_lang.Mypage_Alert9, "blue", "top");
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
		        msg += '에러내용 : ' + rsp.error_msg;
		        g360.gAlert("Error",msg , "red", "left");
		    }
		});
	},
	
	
	"bankInit" : function(){
		
		//기존 저장된 계좌 정보를 가져와서 초기화 해준다.
		gCACL.load_bank_account();
		
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
						g360.gAlert("Info", g360.g_lang.Mypage_Alert11 , "blue", "top");
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
						html += "		<h3>"+g360.g_lang.Mypage_Alert12+"</h3>";
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
						html += "				<tr>";
						html += "					<td colspan='2'>";
						html += "						<div class='btn_area bottom_area'>";
						//html += "							<button class='btn btn_gray btn_cancel'>취소</button>";
						html += "							<button class='btn btn_violet btn_ok' onclick=\"gCACL.changepw()\">"+g360.g_lang.Request_for_change+"</button>";
						html += "						</div>";
						html += "					</td>";
						html += "				</tr>";
						html += "			</tbody>";
						html += "		</table>";
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
						gCACL.goto_password_change();
					}
					
				},
				error : function(e){
					g360.error_alert();
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
					text : "확인",
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
					text : "취소"
				}
			}
		});	
	
	},
	
	
	"info_edit" : function(name, gender, smskey, mobile){
		
		var html = "";
		
		var ptype = (gCACL.userinfo.gubun == "art" ? g360.g_lang.Artist : gCACL.userinfo.gubun == "curator" ? g360.g_lang.Art_consultant : g360.g_lang.General_User);
		
		var nickname = gCACL.userinfo.nickname;
		var birth = (typeof(gCACL.userinfo.birth) != "undefined" ? gCACL.userinfo.birth : "");
	//	var mobile = (typeof(gCACL.userinfo.mobile) != "undefined" ? gCACL.userinfo.mobile : "");
		var tel1 = (typeof(gCACL.userinfo.tel1) != "undefined" ? gCACL.userinfo.tel1 : "");
		var tel2 = (typeof(gCACL.userinfo.tel2) != "undefined" ? gCACL.userinfo.tel2 : "");
		var tel3 = (typeof(gCACL.userinfo.tel3) != "undefined" ? gCACL.userinfo.tel3 : "");
		var address1 = (typeof(gCACL.userinfo.first_address) != "undefined" ? gCACL.userinfo.first_address : "");
		var address2 = (typeof(gCACL.userinfo.second_address) != "undefined" ? gCACL.userinfo.second_address : "");
	//	var smskey = (typeof(gCACL.userinfo.smskey) != "undefined" ? gCACL.userinfo.smskey : "");
		
		html +="<table>";
		html +="	<tbody>";
		html +="		<tr style='display:none;'>";
		html +="			<th><span>형태</span></th>";
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
		html +="		<tr style='display:none;'>";
		html +="			<th><span>성별</span></th>";
		html +="			<td><input type='text' id='gender' value='"+gender+"' class='txt' disabled /></td>";
		html +="		</tr>";
		
		html +="		<tr>";
		html +="			<th><span class='essential'>"+g360.g_lang.Nickname+"</span></th>";
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
		html +=" 					<button class='btn btn_violet btn_ok' onclick=\"gCACL.userinfo_save()\">"+g360.g_lang.Update1+"</button>";
		html +="				</div>";
		
		html +="			</td>";
		html +="		</tr>";
		
		html +="	</tbody>";
		html +="</table>";
		
		html += "<input type='hidden'  value='"+ smskey+"'  id='smskey'  />";
		
		$("#client_profile_info_edit").html(html);
		
		
		$(".dropdown-menu .dropdown-item").on("click", function(event){			
			//gMakeVR.music = event.currentTarget.id;
			$("#gubun_select_box").text(event.currentTarget.text);
		});	
		
	},
	
	"userinfo_save" : function(){		
		
		var name = $("#name").val();
		var smskey = $("#smskey").val();
		var nickname = $.trim($("#account_nickname").val());
		var gender = $("#gender").val();
		var gg = $("#gubun_select_box").text();

		//nickname을 필수 요소로 설정
		if (nickname == '') {
			g360.gAlert_focus("Error",g360.g_lang.Mypage_Alert6, "red", "left", 'account_nickname');
			return;
		} else {
			$("#account_nickname").val(nickname);
		}
		
		gg = $.trim(gg);
		var gubun = "";
		if (gg == "작가"){
			gubun = "art";
		}else if (gg == "아트 컨설턴트"){
			gubun = "curator";
		}else if (gg == "일반사용자"){
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
		
		var photoimage = gCACL.userimagepath;
		
		var xjson = new Object();
		xjson.name = name;
		xjson.smskey = smskey;
		xjson.nickname = nickname;
		xjson.gender = gender;
		xjson.gubun = gubun;
		xjson.birth = birth;
		xjson.mobile = mobile;
		xjson.tel1 = tel1;
		xjson.tel2 = tel2;
		xjson.tel3 = tel3;
		xjson.first_address = first_address;
		xjson.second_address = second_address;
		
		if (photoimage != ""){
			xjson.photoimage = photoimage;
		}
		
		var data = JSON.stringify(xjson);

		
		g360.UserInfo.smskey = smskey;
		
		
		
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

								g360.gAlert("Info",g360.g_lang.Mypage_Alert19, "blue", "top");
											
								//g360.photo_image_change();
								g360.UserInfo.nickname = nickname;
								
								g360.LoadPage("body_content", g360.root_path + "/client/aclist/aclist.jsp");
								return false;
							}else{
								g360.error_alert();
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
	}
	
}

