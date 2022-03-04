
function gApprovalAccount(){	
	gAA = this;
	gAA.userinfo = "";
	
}

gApprovalAccount.prototype = {		

	"init" : function(){
		var _self = this;	
		
		
		$(".sub_common_content.account_setting aside ul li").on("click", function(event){
			
			gAA.empty_class_on();
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
				//g360.LoadPage("body_content", g360.root_path + "/rental/account/approval.jsp");
				gAA.showPrice(1);
				return false;
			}
			
		});
		
		$("#s10").on("click", function(){
			//10만원을 승인한 경우
			
		});
		
		$("#s20").on("click", function(){
			//20만원을 승인한 경우
			
		});
		
		$("#s50").on("click", function(){
			//50만원을 승인한 경우
			
		});
		
		$("#s100").on("click", function(){
			//100만원을 승인한 경우
			
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
	
	"approval_level" : function(sname, price, count){
		var url = g360.root_path + "/approval_level.mon";
		var data = JSON.stringify({
			sname : sname,
			price : price,
			count : count
		})
		$.ajax({
			type: "POST",
			dataType : "json",
			data : data,
			contentType : "application/json; charset=utf-8",
			success : function(data){
				debugger;
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"approval" : function(){
		debugger;
			
		var IMP = window.IMP; // 생략가능		
		IMP.init("MOIbill360"); // 'iamport' 대신 부여받은 "가맹점 식별코드"를 사용
		
		IMP.request_pay({
		    pg : 'html5_inicis', // version 1.1.0부터 지원.
		    pay_method : 'card',
		    merchant_uid : 'merchant_' + new Date().getTime(),
		    customer_uid : 'your_customer_1234123123',
		    amount : 0,
		    name : '주문명:빌링키 발급을 위한 결제',
		    buyer_email : 'dosa777@gmail.com',
		    buyer_name : '김윤기',
		    buyer_tel : '010-2862-5570'
		}, function(rsp) {
		    if ( rsp.success ) {
		        var msg = '빌링키 발급이 완료되었습니다.';
		        msg += '고유ID : ' + rsp.imp_uid;
		        msg += '상점 거래ID : ' + rsp.merchant_uid;
		    } else {
		        var msg = '빌링키 발급에 실패하였습니다.';
		        msg += '에러내용 : ' + rsp.error_msg;
		    }

		    alert(msg);
		});
		
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
				gAA.userinfo = data;
				gAA.setUserInfo();
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"empty_class_on" : function(){
		$(".sub_common_content.account_setting aside ul li").each(function(evnet){
			$(this).removeClass("on");
		});
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
	}
	
}

