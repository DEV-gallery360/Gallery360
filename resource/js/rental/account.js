
function gPartnerAccount(){	
	gPA = this;
	gPA.userinfo = "";
	
	gPA.userimagepath = "";
	gPA.userimagepath_profile = "";
	this.timeout_id;
	gPA.month = 0;
	gPA.rental_count = 0;
	gPA.service_total_price = 0;
	gPA.service_tp = 0;
}

gPartnerAccount.prototype = {		

	"init" : function(){
		var _self = this;	
		
		
		/* 
		 * Rental imgId 처리
		 * 
		 * img_artist
		 * 대관 Artist 영역 작은사진 저장경로: photo
		 * 
		 * img_artist_detail
		 * 대관관리 작가 리스트 저장경로: photo_list
		 * 
		 * img_profile
		 * 대관 작가 상세사진 저장경로: photo_profile
		 */
		
		gPA.load_user_info().then(function(){
			// 프로필 사진 편집
			$("#edit_user_image").on("click", function(){
				$('#layer_image_file').off('change').on('change', function(){
					var options = {
						imgId:'img_artist',
						width:200,
						height:200,
						type:'circle',
						onUploadStart: function(data){
							_self.timeout_id = setTimeout(function(){g360.loadingbar_open('파일을 업로드중 입니다...');}, 2000);
						},
						onUploadComplete: function(res){
							if (res.result == 'ERROR') {
								g360.gAlert('업로드중 오류가 발생했습니다.');
							} else {
								//_self.changeImage(options.imgId, res.url);
								//렌탈 사용자는 일반 사용자와 프로필 사진 처리가 다름
								_self.changeImage("img_profile", res.url);
							}
							clearTimeout(_self.timeout_id);
							g360.loadingbar_close();
						}
					}
					gPA.readFileImage(this, options);
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
				g360.LoadPage("body_content", g360.root_path + "/rental/account/account.jsp");
				return false;
			
			}else if (id == "account_password"){
				gPA.goto_password_change();
			
			}else if (id == "account_expire"){
				g360.LoadPage("body_content", g360.root_path + "/rental/account/expire.jsp");
				return false;
			}else if (id == "account_alram"){
				g360.LoadPage("body_content", g360.root_path + "/rental/account/estimate.jsp?month=1");
				//gPA.showPrice(1);
				return false;
			}else if (id == "account_kamail"){
				g360.LoadPage("body_content", g360.root_path + "/rental/account/sendLog.jsp");
				return false;
			}else if (id == "account_approval_list"){
				
				g360.LoadPage("body_content", g360.root_path + "/rental/account/approval_list.jsp");
				return false;
			}
			
		});
	},
	
	
	
	"showPrice" : function(month){
		
		var url = '/main/rental/estimate.jsp?open';
		if (month) {
			url += '&month=' + month;
		}
		
		var w = screen.width >= 800 ? 900 : screen.width;
		var h = screen.height - 200;		
		
		window.open(url,'gallery360_rental_price','height=' + h + ',width=' + w + 'fullscreen=yes')
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
	//debugger;
		var nickname = gPA.userinfo.nickname;
		var email = gPA.userinfo.email;
		$("#user_nickname").html("<strong>닉네임</strong>" + nickname + "");
		$("#user_email").html("<strong>이메일</strong>" + email + "");
		var gubun = gPA.userinfo.gubun;
		var tx = (gubun == "art" ? "작가" : gubun== "curator" ? "아트 컨설턴트" : gubun== "rental" ? "대관 서비스" :"일반사용자");
		$("#user_type").html("<strong>파트너 형태</strong>" + tx + "");
		
		
	
	//	if (typeof(gPA.userinfo.smskey) != "undefined" && gPA.userinfo.smskey != ""){
				gPA.info_edit(gPA.userinfo.name, gPA.userinfo.gender, gPA.userinfo.smskey, gPA.userinfo.mobile);
	//	}
	
		
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
		
		
		
		
		g360.UserInfo.rental_level = gPA.userinfo.rental_level;
		g360.UserInfo.rental_price = gPA.userinfo.rental_price;
		g360.UserInfo.rental_count = gPA.userinfo.rental_count;
		g360.UserInfo.rental_vr = gPA.userinfo.rental_vr;
		g360.UserInfo.rental_use = gPA.userinfo.rental_use;
		g360.UserInfo.rental_use_count = gPA.userinfo.rental_use_count;
		
	},
	
	
	"goto_password_change" : function(){
		
		if (g360.UserInfo.site == ""){
			g360.LoadPage("body_content", g360.root_path + "/rental/account/password.jsp");
			return false;
		}else{
			g360.gAlert("Error","SNS계정으로 로그인한 사용자는 패스워드를 변경할 수 없습니다.", "red", "left");
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
						g360.gAlert("Info","정상적으로 등록되었습니다.", "blue", "top");
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
						html += "		<h3>비밀번호 변경 <span>*개인정보 보호를 위해 주기적으로 비밀번호를 변경해주세요.</span></h3>";
						html += "	</div>";
						html += "	<div class='wrap_group account_table_area bg_white'>";
						html += "		<table>";
						html += "			<tbody>";
						html += "				<tr>";
						html += "					<th><span>새 비밀번호</span></th>";
						html += "					<td>";
						html += "						<input type='password' id='newpw1' class='txt' />";
						html += "						<span>비밀번호는 8자 이상, 특수문자를 포함하여 입력해주세요.</span>";
						html += "					</td>";
						html += "				</tr>";
						html += "				<tr>";
						html += "					<th><span>새 비밀번호 확인</span></th>";
						html += "					<td>";
						html += "						<input type='password' id='newpw2' class='txt' />";
						html += "						<span>동일한 비밀번호를 한번 더 입력해주세요.</span>";
						html += "					</td>";
						html += "				</tr>";
						html += "			</tbody>";
						html += "		</table>";
						html += "		<div class='btn_area bottom_area'>";
					//	html += "			<button class='btn btn_gray btn_cancel'>취소</button>";
						html += "			<button class='btn btn_violet btn_ok' onclick=\"gPA.changepw()\">변경 요청</button>";
						html += "		</div>";
						html += "	</div>";
						html += "</div>";

						$("#pw_change_mode").html(html);
					}else{
						g360.gAlert("Error","아이디와 비밀번호가 맞지 않습니다. 다시 시도해 주세요.", "red", "left");
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
			g360.gAlert("Error","비밀번호가 동일하지 않습니다.", "red", "left");
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
						g360.gAlert("Info","비밀번호가 정상적으로 변경되었습니다.", "blue", "top");
						gPA.goto_password_change();
					}
					
				},
				error : function(e){
					alert("요청중 오류가 발생하였습니다. \n관리자에게 문의하시기 바랍니다.");
				}
			})
		}
	},
	
	"member_expire" : function(){
				
		$.confirm({
			title : " ",
			content : "정말 탈퇴하시겠습니까?<hr>",
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
									g360.gAlert("Info","사용자 계정이 탈퇴 처리 되었습니다.", "blue", "top");
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
	
	"empty_class_on" : function(){
		$(".sub_common_content.account_setting aside ul li").each(function(evnet){
			$(this).removeClass("on");
		});
	},
	
	
	"sms_approval" : function(){
		
//		gPA.info_edit("김윤기", "male");
//		return false;

		IMP.certification({
			company : "갤러리360",
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
				 					g360.gAlert("Error","최초 가입 정보와 다른 인증 key입니다. 관리자에게 문의해 주시기 바랍니다.", "red", "left");
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
				 							g360.gAlert("Error","기존에 등록되어 있어 사용할 수 없습니다.", "red", "left");
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
		        var msg = '인증에 실패하였습니다.';
		        msg += '에러내용 : ' + rsp.error_msg;
		        g360.gAlert("Error", msg , "red", "left");
		    }
		});
	},
	
	
	"info_edit" : function(name, gender, smskey, mobile){
		var _self = this;
		
		var html = "";
		
		var ptype = (gPA.userinfo.gubun == "art" ? "작가" : gPA.userinfo.gubun == "curator" ? "아트 컨설턴트" : gPA.userinfo.gubun == "rental" ? "대관 사용자" : "일반사용자");
		
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
		
		name = (typeof(name) != "undefined" ? name : "");
		gender = (typeof(gender) != "undefined" ? gender : "");
		
		html +="<table>";
		html +="	<tbody>";
		
		html +="		<tr>";
		html +="			<th><span>형태</span></th>";
		html +="			<td>";
		html +="				<div class='btn-group'>";
		html +="					<button id='gubun_select_box' disabled style='cursor:pointer' class='bg-transparent border-0 dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
		html +="						"+ptype;
		html +="					</button>";
		html +="					<div class='dropdown-menu'>";
		html +="						<a class='dropdown-item' >작가</a>";
		html +="						<a class='dropdown-item' >아트 컨설턴트</a>";
		html +="						<a class='dropdown-item' >일반사용자</a>";
		html +="						<a class='dropdown-item' >대관사용자</a>";
		html +="					</div>";
		html +="				</div>";
		html +="			</td>";
		html +="		</tr>";
		
		html +="		<tr>";
		html +="			<th><span>이름</span></th>";
		html +="			<td><input type='text' id='name' value='"+name+"' class='txt' disabled /></td>";
		html +="		</tr>";
		html +="		<tr>";
		html +="			<th><span>성별</span></th>";
		html +="			<td><input type='text' id='gender' value='"+gender+"' class='txt' disabled /></td>";
		html +="		</tr>";
		
		html +="		<tr>";
		html +="			<th><span>영문명</span></th>";
		html +="			<td><input type='text' id='name_eng' value='"+name_eng+"' class='txt' /></td>";
		html +="		</tr>";
		
//		html +="		<tr>";
//		html +="			<th>";
//		html +="				<span class='t_info_sh'>사진<button id='btn_profile_list_info' class='btn btn_info_sh'>정보</button></span>";
//		html +="				<div id='layer_profile_list_info' class='img_reginfo_sh' style='display:none;'>";
//		html +="					<div>";
//		html +="						<p>상단메뉴 <strong>'작가'</strong> 클릭 시 노출되는 작가 사진 입니다.</p>";
//		html +="						<img src='/img/account/img_layer_info1.jpg' alt='' />";
//		html +="					</div>";
//		html +="				</div>";
//		html +="			</th>";
//		
//		html +="			<td>";
//		html +="				<div class='thm_author_info_sh' style='display:none'><img src='/img/account/thumb_default_author.png' /><img src='/img/account/btn-edit-profile-img.svg' alt='수정' class='btn_edit_sh'></div>";
//		html +="				<div id='account_img_artist' class='account_img_artist'><img src='/img/account/btn-edit-profile-img.svg' alt='수정' class='btn_edit_sh'></div>";
//		html +="				<p class='txt_info_sh'>작가 사진 최적 사이즈는1180px * 470px 입니다</p>";
//		html +="			</td>";
//		html +="		</tr>";
//		
//		
//		html +="		<tr>";
//		html +="			<th>";
//		html +="				<span class='t_info_sh'>소개 사진<button id='btn_profile_detail_info' class='btn btn_info_sh'>정보</button></span>";
//		html +="				<div id='layer_profile_detail_info' class='img_reginfo_sh' style='display:none;'>";
//		html +="					<div>";
//		html +="						<p><strong>'작가 상세보기'</strong> 상단에 노출되는 대표 이미지 입니다.</p>";
//		html +="						<img src='/img/account/img_layer_info2.jpg' alt='' />";
//		html +="					</div>";
//		html +="				</div>";
//		html +="			</th>";

//		html +="			<td>";
//		html +="				<div class='thm_author_info_sh' style='display:none;'><img src='/img/account/thumb_default_pic.png' /><img src='/img/account/btn-edit-profile-img.svg' alt='수정' class='btn_edit_sh'></div>";
//		html +="				<div id='account_img_artist_detail' class='account_img_artist'><img src='/img/account/btn-edit-profile-img.svg' alt='수정' class='btn_edit_sh'></div>";
//		html +="				<p class='txt_info_sh'>소개 사진 최적 사이즈는1140px * 570px 입니다.</p>";
//		html +="			</td>";
//		html +="		</tr>";
		
		html +="		<tr>";
		html +="			<th><span>활동명</span></th>";
		html +="			<td><input type='text' id='account_nickname' value='"+ nickname+"' class='txt' /></td>";
		html +="		</tr>";
		html +="		<tr>";
		html +="			<th><span>휴대폰</span></th>";
		html +="			<td>";
		html +="				<input type='text' id='mobile' value='"+ mobile+"' class='txt txt_m_num' disabled placeholder='ex) 01034210981' />";
//		html +="				<button class='btn btn_ghost btn_num_change'>번호변경</button>";
		html +="			</td>";
		html +="		</tr>";
		
		html +="		<tr>";
		html +="			<th><span>생년월일</span></th>";
		html +="			<td><input type='text' id='birth' value='"+ birth+"' class='txt' placeholder='ex) 1971-01-20' /></td>";
		html +="			</td>";
		html +="		</tr>";

		html +="		<tr>";
		html +="			<th>유선전화</th>";
		html +="			<td class='t_tel'>";
		html +="				<input type='text'  value='"+ tel1+"' class='txt' id='tel1' /> - <input type='text'  value='"+ tel2+"' class='txt' id='tel2' /> - <input type='text'  value='"+ tel3+"' class='txt' id='tel3' />";
		html +="			</td>";
		html +="		</tr>";
		html +="		<tr>";
		html +="			<th>주소</th>";
		html +="			<td>";
		html +="				<input type='text' class='txt txt_address'  value='"+ address1+"' id='first_address' style='width: calc(100% - 101px)' disabled/>";
		html +="				<button class='btn btn_ghost btn_find_address' onclick=\"g360.zip_code_popup();\">주소찾기</button>";
		html +="				<input type='text'  value='"+ address2+"' class='txt' id='second_address' />";
		html +="			</td>";
		html +="		</tr>";
		
		html +="		<tr>";
		html +="			<td colspan='2'>";
		html +="				<div class='btn_area bottom_area'>";
	//	html +="					<button class='btn btn_gray btn_cancel'>취소</button>";
		html +=" 					<button class='btn btn_violet btn_ok' onclick=\"gPA.userinfo_save()\">수정 완료</button>";
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
				gPA.readFileImage(this, options);
				
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
				gPA.readFileImage(this, options);
				
			});
			$('#layer_image_file').click();
		});
		$('#account_img_artist_detail').prev().on('click', function(){
			$('#account_img_artist_detail').click();
			return false;
		});
		
		
//		$(".dropdown-menu .dropdown-item").on("click", function(event){			
//			//gMakeVR.music = event.currentTarget.id;
//			debugger;
//			$("#gubun_select_box").text(event.currentTarget.text);
//		});
		
		
//		$("#rental_pay .dropdown-item").on("click", function(event){
//			debugger;
//			$("#gubun_select_box1").text(event.currentTarget.text);
//		});
//		
//		$("#month_pay .dropdown-item").on("click", function(event){
//			debugger;
//			$("#gubun_select_box").text(event.currentTarget.text);
//		});
		
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
			
			// 이미지 회전 처리
			var btn_rotate = $('<button class="btn-rotate"></button>');
			btn_rotate.on('click', function(){
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
				// 세션 체크 (TODO)
				// 업로드 시작시 callback
				if (opt.onUploadStart) opt.onUploadStart();
				
				$('#image_edit_body').croppie('result', {
					type: opt.resultType, //'blob' or 'base64',
					size: opt.resultSize ? opt.resultSize : 'viewport', //viewport | original | {width, height}
					circle:opt.type == 'circle',
					format:'jpeg' //jpeg | png
					
				}).then(function(data){
					// TODO (TEST)
					/*
					var image = new Image();
				    image.src = data;

				    var w = window.open("");
				    w.document.write(image.outerHTML);
				    */
					if (opt.uploadWaiting == true) {
						if (opt.onUploadComplete) opt.onUploadComplete(data);
						$('#layer_image_edit').modal('hide');
					} else {
						
						var upload_promise = gPA.photoUpload(data, opt.imgId, opt.email);
						upload_promise.always(function(res){
							if (opt.onUploadComplete) opt.onUploadComplete(res);
							$('#layer_image_edit').modal('hide');
						});
					}
				});
			});
			

			if (input.files && input.files[0]) {
		        var reader = new FileReader();
		        reader.onload = function(e) {
		            $('#image_edit_body').addClass('ready');
		            $('#layer_image_edit').modal('show');
		            rawImg = e.target.result;
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
	
	
	
	"userinfo_save" : function(){
		//debugger;
		var name = $("#name").val();
		var name_eng = $("#name_eng").val();
		var smskey = $("#smskey").val();
		var nickname = $("#account_nickname").val();
		var gender = $("#gender").val();
		var gg = $("#gubun_select_box").text();
		gg = $.trim(gg);
		var gubun = "rental";
		
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
								
								g360.gAlert("Info", "개인정보가 정상적으로 업데이트 되었습니다." , "blue", "top");
								
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
					g360.gAlert("","동일한 닉네임이 존재합니다.<br>다른 닉네임을 입력하세요");
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
	},
	
	
	"init_approval" : function(){
		
	//	if (g360.UserInfo.role == "admin"){
	//		$("#options_approval").show();
	//	}else{
	//		$("#options_approval").hide();
	//	}
		
		
		$("#sxx2 .dropdown-menu .dropdown-item").on("click", function(event){	
			//개월수를 변경한 경우
			//gMakeVR.music = event.currentTarget.id;
			
			$("#gubun_select_box").text(event.currentTarget.text);
			gPA.month = $(event.currentTarget).attr("data");
			
						
			var tp = 0;
			if (gPA.rental_count != 0){
				if (gPA.month == 1 || gPA.month == 2){
					tp = (gPA.rental_count * gPA.month) * 15  ;
					gPA.service_tp = tp;
					gPA.service_total_price = (gPA.rental_count * gPA.month) * 150000 ;
				}else{
					tp = (gPA.rental_count * gPA.month) * 15  * 0.89;
					gPA.service_tp = tp;
					gPA.service_total_price = (gPA.rental_count * gPA.month) * 150000 * 0.89;
				}

			}
			
		//	var sum = gPA.price_check(service_month);
//			var px = 0;
//			if (gPA.month == 1){
//				px = 15;
//			}else if (gPA.month == 2){
//				px = 30;
//			}else if (gPA.month == 3){
//				px = 40;
//			}else if (gPA.month == 4){
//				
//			}
			
			
			
			$("#p_x").html(parseInt(tp) + "만원");
			
		});
		
		
		$("#sxx1 .dropdown-menu .dropdown-item").on("click", function(event){	
			//대관 건수를 변경한 경우
			//gMakeVR.music = event.currentTarget.id;
			
			$("#gubun_select_box1").text(event.currentTarget.text);
			gPA.rental_count = $(event.currentTarget).attr("data");
			
			var tp = 0;
			if (gPA.month != 0){
				
				if (gPA.month == 1 || gPA.month == 2){
					tp = (gPA.rental_count * gPA.month) * 15  ;
					gPA.service_tp = tp;
					gPA.service_total_price = (gPA.rental_count * gPA.month) * 150000 ;
				}else{
					tp = (gPA.rental_count * gPA.month) * 15 * 0.89;
					gPA.service_tp = tp;
					gPA.service_total_price = (gPA.rental_count * gPA.month) * 150000 * 0.89;
				}
				

			}
			
			
		//	var sum = gPA.price_check(service_month);
//			var px = 0;
//			if (gPA.month == 1){
//				px = 15;
//			}else if (gPA.month == 2){
//				px = 30;
//			}else if (gPA.month == 3){
//				px = 40;
//			}
			
			$("#p_x").html(parseInt(tp) + "만원");
			
		});
		
		
		
		
			
	
		
		var rental_expire_date = g360.UserInfo.rental_expire_date;
		if (typeof(rental_expire_date) != "undefined"){
			if (rental_expire_date == ""){
				$("#rental_expire_date").html("미가입");
			}else{
				$("#rental_expire_date").html(rental_expire_date + " (대관건수 : " + g360.UserInfo.rental_vr + ")");
			}
			
		}else{
			$("#rental_expire_date").html("미가입");
		}
		
		var ccount = g360.rental_send_count();
		
		if (g360.UserInfo.rental_level == "Option"){
			var tcount = g360.UserInfo.rental_count;			
			$("#rental_km_count1").html(g360.comma(g360.rental_km_count));
			$("#rental_km_count2").html("/" + g360.comma(tcount));
			
			$("#cservice").html("미가입");
			$("#ccount").html("0건");
		}else{
			$("#rental_km_count2").html("0");
			
			var level = "";
			if (g360.UserInfo.rental_level == "" || typeof(g360.UserInfo.rental_level) == "undefined"){
				level = "미가입";
			}else{
				level = g360.UserInfo.rental_level;
			}
			$("#cservice").html(level);
			
			if ( (typeof (g360.UserInfo.rental_count) == "undefined") || (g360.UserInfo.rental_count == 0)){
				$("#ccount").html("0건");
			}else{
				$("#ccount").html(g360.comma(g360.rental_km_count) + "/" + g360.comma(g360.UserInfo.rental_count)+"건");
			}
		}

		
			
		
		
		
		
		$("#s10").on("click", function(){
			//10만원을 승인한 경우
			gPA.approval("Basic", 110000, 0, 1);
		});
		
		$("#s20").on("click", function(){
			//20만원을 승인한 경우
			gPA.approval("Standard", 220000, 500, 2);
		});
		
		$("#s50").on("click", function(){
			//50만원을 승인한 경우
			gPA.approval("Premium", 550000, 1000, 5);
		});
		
		$("#s100").on("click", function(){
			//100만원을 승인한 경우
			gPA.approval("Enterprise", 1100000, 10000, 10);
		});
		
		$("#cancel_service").on("click", function(){
			gPA.cancel_service();
		});
		
		
		$("#service_one_day").on("click", function(e){
			gPA.service_request_one_day();
		});
	},
	
	
	"service_request_one_day" : function(){
		
		var onedayuse = g360.UserInfo.onedayservice;
		if (onedayuse == "T"){
			g360.gAlert("Info","대관 서비스 1일 체험을 이미 진행하셨습니다.<br>결제 후 사용하시기 바랍니다.", "blue", "top");
			return false;
		}
		
		
		$.confirm({
			title : " ",
			content : "1일 대관 체험 서비스를 신청하시겠습니까?<br>1회만 사용하실수 있습니다.<hr>",
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
						
						
						//최초 가입자의 경우
						var caledmonth, caledday, caledYear;
						var today = new Date();
						today.setDate(today.getDate() + (1)); 
								
						caledYear = today.getFullYear();
						 
						if( today.getMonth() < 9 ){
							 caledmonth = '0'+(today.getMonth()+1);
						}else{
							 caledmonth = today.getMonth()+1;
						}
						if( today.getDate() < 9 ){
							 caledday = '0'+today.getDate();
						}else{
							caledday = today.getDate();
						}	
						expire_date = caledYear + "-" + caledmonth + "-" + caledday;
						
						var sname = "Option";
						var one = new Object();
						one.oneday = "T";
						
						var data = JSON.stringify({
							service_month : 0,
							service_vr_count : 1,
							service_static : 0,
							service_message_count : 0,
							service_price : 0,
							expire_date : expire_date,
							rental_level : sname,
							pginfo : one,
							onedayservice : "T",
							email : g360.UserInfo.email
						});
				    	
				    	
				    	var url = g360.root_path + "/approval_level_options.mon";
				    	$.ajax({
				    		type : "POST",
				    		dataType : "json",
				    		contentType : "application/json; charset=utf-8",
				    		data : data,
				    		url : url,
				    		success : function(res){
				    			
				    			g360.UserInfo.rental_level = sname;
								g360.UserInfo.rental_price = 0;
								g360.UserInfo.rental_count = 0;
								g360.UserInfo.rental_vr = 1;
								g360.UserInfo.rental_use = "T";
								g360.UserInfo.rental_expire_date = expire_date;
								
												
								var ip = $("#rental_km_count1").html;
								if (ip != 0){							
								}else{
									$("#rental_km_count1").html(0);
								}
								
								$("#rental_km_count2").html("/" + "0");
								
								$("#rental_expire_date").html(expire_date);
				    			
								
								g360.gAlert("Info","대관 서비스 1일 체험에 신청되었습니다.<br>상단에 대관 관리 버튼을 클릭하시고 대관서비스를 체험해 보시기 바랍니다.", "blue", "top");
				    		}, 
				    		error : function(e){
				    			g360.error_alert();
				    		}
				    	});
												
					}
				},
				moreButtons : {
					text : "취소"
				}
			}
		});	
	},
	
	
	
	"cancel_service" : function(){
		
		
		
		var level = g360.UserInfo.rental_level;
		if (level == ""){
			g360.gAlert("Info","미가입 사용자는 서비스 해제를 사용하실수 없습니다.", "blue", "top");
			return false;
		}
		
		if (level == "Option"){
			g360.gAlert("Info","단기 요금제 가입자는 서비스 종료일에 자동 해제됩니다.", "blue", "top");
			return false;
		}
		
		$.confirm({
			title : " ",
			content : "서비스를 정말 종료 하시겠습니까?<hr>",
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
						var url = g360.root_path + "/rental_service_cancel.mon";
						
						$.ajax({
							type : "GET",
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							url : url,
							success : function(data){
								
								
								if (data.result == "OK"){
//									g360.UserInfo.rental_level = "";
//									g360.UserInfo.rental_count = 0;
//									
//									var level = "무가입 사용자";									
//									$("#cservice").html(level);				
//									$("#ccount").html("0건");								
									
									g360.gAlert("Info","서비스 종료 요청이 등록되었습니다. 이번달까지만 사용 가능하십니다.", "blue", "top");
								//	gRen.navBtnAction('main', 'art');
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
	
	"approval_level" : function(sname, price, count, vr_use){
		
	
		

		var url = g360.root_path + "/approval_level.mon";
		var data = JSON.stringify({
			sname : sname,
			price : price,
			count : count,
			vr_use : vr_use
		})
		$.ajax({
			type: "POST",
			dataType : "json",
			data : data,
			url : url,
			contentType : "application/json; charset=utf-8",
			success : function(data){
				
				g360.UserInfo.rental_level = sname;
				g360.UserInfo.rental_price = price;
				g360.UserInfo.rental_count = count;
				g360.UserInfo.rental_vr = vr_use;
				g360.UserInfo.rental_use = "T";
				
				$("#cservice").html(sname);
				$("#ccount").html(g360.comma(count)+"건");
				
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	"cal_day"  : function(end){		
	     var startDay = new Date();
	     var endDay = new Date(end);
	     var millisecondsPerDay = 1000 * 60 * 60 * 24;

	     var millisBetween = endDay.getTime() - startDay.getTime();
	     var days = millisBetween / millisecondsPerDay;

	     return Math.floor(days);
	},
	
	
	"price_check" : function(service_month){
		
		var sum = 0;
		if (service_month == "1"){
			sum = 150000 + 15000;   //부가세 10%
		}else if (service_month == "2"){
			sum = 300000 + 30000;
		}else if (service_month == "3"){
			sum = 400000 + 40000;
		}
		
		return sum;
	},
	
		
	
	"approval_option" : function(){
		
		
		if (!g360.login_check()){
			return false;
		}
//		debugger;
//		var service_month = $("#service_month").val();
//		var service_vr_count = $("#service_vr_count").val();
//		var service_static = $("#service_static").val();
//		var service_message_count = $("#service_message_count").val();

		
//		var sum = parseInt(service_vr_count) * parseInt(service_month) * 100000;
//		if (service_static == "T"){
//			//통계 서비스를 선택한 경우 한달에 10만원씩 추가한다.
//			sum = sum + (parseInt(service_month) * 100000);
//		}
//		
//		if (service_message_count != ""){
//			//메시지 카운트를 선택한 경우 1000건당 3만원 계산한다.
//			var mc = parseInt(service_message_count) / 1000;		
//			sum = sum + (mc * 30000);
//		}else{
//			service_message_count = 0;
//		}
		
		//일단 기간만 선택할 수 있게 하고 결재를 진행한다.
	
		//var service_month = $("#service_month").val();
		
		
		if (gPA.rental_count == 0){
			g360.gAlert("Info", "대관 개수를 선택하세요." , "blue", "top");
			return false;
		}
		
		if (gPA.month == 0){
			g360.gAlert("Info", "서비스 기간을 선택하세요." , "blue", "top");
			return false;
		}

		var service_month = gPA.month;
		var service_vr_count = gPA.rental_count;
		var service_static = "T";
		var service_message_count = 1000;
	//	var sum = gPA.price_check(service_month);
		var sum = gPA.service_total_price;

		

		sum = ((parseInt(gPA.service_tp) * 10000)) + (parseInt(gPA.service_tp) * 10000 * 0.1);
		if (sum > 2000000){
			sum = 2000000;
		}
		
		
//		if (service_month == 1){
//			sum = 150000 + 15000;   //부가세 10%
//		}else if (service_month == 2){
//			sum = 300000 + 30000;
//		}else if (service_month == 3){
//			sum = 400000 + 40000;
//		}

		
		//기존에 option결재를 한 상태가 아닌 경우 오늘을 기준으로 종료일을 지정하고
		//기존에 option결재 사용중인 경우 해당 종료일에서 추가한 개월만큼을 추가해서 종료일을 계산한다.
		
		
		var expire_date = "";
		var isApproval = g360.UserInfo.rental_level;
		if ((typeof(isApproval) != "undefined") && (isApproval != "")){
			if (isApproval != "Option"){
				g360.gAlert("Info", "정기 결제를 해제하셔야 옵션 결재를 진행 할 수 있습니다." , "blue", "top");
				return false;
			}
			
			if (g360.UserInfo.rental_vr != gPA.rental_count){
				g360.gAlert("Info", "서비스 기간 연장의 경우 서비스 대관건수가 동일하여야 합니다." , "blue", "top");
				return false;	
			}
			
			//기존에 Option가입자가 추가 결재할 경우 expire_date를 늘려준다.
			var ex_date = g360.UserInfo.rental_expire_date;
			var caledmonth, caledday, caledYear;
			var today = new Date(ex_date);
			today.setDate(today.getDate() + (service_month * 31)); 
					
			caledYear = today.getFullYear();
			 
			if( today.getMonth() < 9 ){
				 caledmonth = '0'+(today.getMonth()+1);
			}else{
				 caledmonth = today.getMonth()+1;
			}
			if( today.getDate() < 9 ){
				 caledday = '0'+today.getDate();
			}else{
				caledday = today.getDate();
			}	
			expire_date = caledYear + "-" + caledmonth + "-" + caledday;
			
		}else{
			//최초 가입자의 경우
			var caledmonth, caledday, caledYear;
			var today = new Date();
			today.setDate(today.getDate() + (service_month * 31)); 
					
			caledYear = today.getFullYear();
			 
			if( today.getMonth() < 9 ){
				 caledmonth = '0'+(today.getMonth()+1);
			}else{
				 caledmonth = today.getMonth()+1;
			}
			if( today.getDate() < 9 ){
				 caledday = '0'+today.getDate();
			}else{
				caledday = today.getDate();
			}	
			expire_date = caledYear + "-" + caledmonth + "-" + caledday;
		}
		
		

		var sname = "Option";	
		var meck = 'merchant_' + new Date().getTime() + "_" + g360.makeRandom(10);
		
		IMP.request_pay({
		    pg : "html5_inicis", // version 1.1.0부터 지원.  kcp.A52CY
		    pay_method : "card",     //trans : 자동이체   // : vbank : 가상계좌   // card : 카드
		    merchant_uid : meck,
		    name : "대관서비스 옵션 결제",
		    amount : sum,
		    buyer_email : g360.UserInfo.email,
		    buyer_name : g360.UserInfo.name,
		    buyer_tel : '',
		    buyer_addr : '',
		    buyer_postcode : '',
		    m_redirect_url : ''
		}, function(rsp) {
		
		    if ( rsp.success ) {
		    	//결재가 완료되면 해당 사용자 계정에 옵션 정보를 업데이트해 줘야 한다.
		    	//var rsp = {};
		    	
		    	rsp.buyer_email = userinfo.email;
		    	
		    	var data = JSON.stringify({
					service_month : service_month,
					service_vr_count : service_vr_count,
					service_static : service_static,
					service_message_count : service_message_count,
					service_price : sum,
					expire_date : expire_date,
					rental_level : sname,
					pginfo : rsp,
					email : userinfo.email
				});
		    	
		    	
		    	var url = g360.root_path + "/approval_level_options.mon";
		    	$.ajax({
		    		type : "POST",
		    		dataType : "json",
		    		contentType : "application/json; charset=utf-8",
		    		data : data,
		    		url : url,
		    		success : function(res){
		    			
		    			g360.UserInfo.rental_level = sname;
						g360.UserInfo.rental_price = sum;
						g360.UserInfo.rental_count = service_message_count;
						g360.UserInfo.rental_vr = service_vr_count;
						g360.UserInfo.rental_use = "T";
						g360.UserInfo.rental_expire_date = expire_date;
						
										
						var ip = $("#rental_km_count1").html;
						if (ip != 0){							
						}else{
							$("#rental_km_count1").html(0);
						}
						
						$("#rental_km_count2").html("/" + g360.comma(service_message_count));
						
						$("#rental_expire_date").html(expire_date);
		    			
		    		}, 
		    		error : function(e){
		    			g360.error_alert();
		    		}
		    	});
		    	
		    }
		});		
	},	
	
	
	
	
	"approval" : function(sname, price, count, vr_use){
		
		var isApproval = g360.UserInfo.rental_level;
		if ((typeof(isApproval) != "undefined") && (isApproval != "")){
			if (isApproval == "Option"){
				g360.gAlert("Info", "단기 요금제 기간이 종료되어야 결제를 진행 할 수 있습니다." , "blue", "top");
				return false;
			}
		}
		
		
		
		//이전에 등록한 VR 건수가 있는지 확인한다.
		var url = g360.root_path + "/check_before_vr_count.mon";
		$.ajax({
			type : "GET",
			dataType : "json",
			contenType : "applicatioin/json; charset=utf-8",
			url : url,
			success : function (data){
				
				var bcount = data.result;
				
				var xx = true;
				if (sname == "Basic"){
					if (bcount > 1){
						xx = false;
					}
				}else if  (sname == "Standard"){
					if (bcount > 2){
						xx = false;
					}
				}else if (sname == "Premium"){
					if (bcount > 5){
						xx = false;
					}
				}else if (sname == "Enterprise"){
					if (bcount > 10){
						xx = false;
					}
				}
				
				
				if (xx){
					var email = g360.UserInfo.email;
					var id = email.replace(/\@/gi,"_").replace(/\./gi,"_");
					
					var date = new Date();
					var now_yy = date.getFullYear();
					var now_mm = date.getMonth() + 1;
					var lastDay = ( new Date(now_yy, now_mm, 0) ).getDate();
					
					var days = gPA.cal_day(now_yy +"-" + now_mm + "-" + lastDay);
					var cal_price = 0;
					if (sname == "Basic"){
						cal_price = 3000 * days;
					}else if  (sname == "Standard"){
						cal_price = 7000 * days;
					}else if (sname == "Premium"){
						cal_price = 18000 * days;
					}else if (sname == "Enterprise"){
						cal_price = 36000 * days;
					}
					

					IMP.request_pay({
					    pg : 'html5_inicis.MOIbill360', // version 1.1.0부터 지원.
					    pay_method : 'card',
					    merchant_uid : 'merchant_' + id + "_" + new Date().getTime(),
					    customer_uid : 'gallery360_' + id,
					    amount : 0,
					    name : '주문명:빌링키 발급을 위한 결제',
					    buyer_email : g360.UserInfo.email,
					    buyer_name : g360.UserInfo.nickname
					//    buyer_tel : '010-2862-5570'
					}, function(rsp) {
					    if ( rsp.success ) {
					    	
					    	
					    	var data = JSON.stringify({
					    		card_name : rsp.card_name,
					    		customer_uid : rsp.customer_uid,
					    		imp_uid : rsp.imp_uid,
					    		paid_at : rsp.paid_at,
					    		pg_tid : rsp.pg_tid,
					    		receipt_url : rsp.receipt_url,
					    		status : rsp.status
					    	})
//					        var msg = '빌링키 발급이 완료되었습니다.';
//					        msg += '고유ID : ' + rsp.imp_uid;
//					        msg += '상점 거래ID : ' + rsp.merchant_uid;
					        
					        var url = g360.root_path + "/billingkey_save.mon";
					        $.ajax({
					        	type : "POST",
					        	dataType : "json",
					        	contentType : "application/json; charset=utf-8",
					        	url : url,
					        	data : data,
					        	success : function(res){
					        		
					        						        		
					        		gPA.approval_level(sname, price, count, vr_use);
					        		
					        //		g360.gAlert("Info", sname + "서비스에 가입 되셨습니다.<br>월말까지 일할 계산된 금액 : " + cal_price + "는 결제되었습니다." , "blue", "top");
					        		
					        		//1일치씩 계산된 금액을 별도로 결재 할수 있게 처리한다.
					        		var url = g360.root_path + "/direct_approval.mon";
					        		var dd = JSON.stringify({
					        			customer_uid : rsp.customer_uid,
					        			cal_price : cal_price,
					        			nickname : g360.UserInfo.nickname
					        		});
					        		$.ajax({
					        			type : "POST",
					        			dataType : "json",
					        			contentType : "application/json; charset=utf-8",
					        			url : url,
					        			data : dd,
					        			success : function(data){
					        				if (data.result == "OK"){
					        				
					        					g360.gAlert("Info", sname + "서비스에 가입 되셨습니다.<br>월말까지 일할 계산된 금액 : " + cal_price + "는 10분 이내 결제됩니다." , "blue", "top");
					        				}
					        			}
					        		})
					        		
					        		
					        	},
					        	error : function(e){
					        		g360.error_alert();
					        	}
					        })
					        
					    } else {
					        var msg = '빌링키 발급에 실패하였습니다.';
					        msg += '에러내용 : ' + rsp.error_msg;
					    }

					});
					
				
				}else{
					g360.gAlert("Info", "기존에 보유한 VR개수("+ bcount+"개관)가 많아 해당 서비스를 가입하실수 없습니다." , "blue", "top");
				}
				
				
				
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
		
		return false;
		
		
		
	}
		
		
		
			
	
	
	
}

