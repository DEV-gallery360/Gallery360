
//개발서버일 경우

//var google_redirect_uri = "http://www.gallery360.co.kr:8080/loginSNS.jsp";
//var naver_redirect_uri = "http://www.gallery360.co.kr:8080/login_naver.do";
//var naver_key = "mlFjFfh4f11YWaDm0fPU";
//var kakao_key = "c3a73ec71a5e7516bce4b19dda1f57c9";
//var facebook_key = "351656175375658";

//운영서버일 경우
var google_redirect_uri = "https://www.gallery360.co.kr/loginSNS.jsp";
var naver_redirect_uri = "https://www.gallery360.co.kr/login_naver.do";
//var google_redirect_uri = g360.domain + "/loginSNS.jsp";
//var naver_redirect_uri = g360.domain + "/login_naver.do";
var naver_key = "qdqbrhDMEvnNXOJJCWBq";
var kakao_key = "24a0e1a938f000b878011a0f8bbd3fdf";
var facebook_key = "351656175375658"; //"1876288322680139";


Kakao.init(kakao_key);

///// 페이스북 로그인 작업 //////////////////
window.fbAsyncInit = function() {
	FB.init({
		appId      : facebook_key,
		cookie     : false,  // enable cookies to allow the server to access 
		                    // the session
		xfbml      : true,  // parse social plugins on this page
		version    : 'v3.1' 
	});
};

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

////////////////////////////////////////

hello.init({
	google: "490919463999-an41qn4ot1ahr03hlk7khf1vrsj5k6fj.apps.googleusercontent.com",
	facebook: facebook_key
}, {rediret_uri: google_redirect_uri})


var naverLogin = new naver.LoginWithNaverId(
	{
		clientId: naver_key,
		callbackUrl: naver_redirect_uri,
		isPopup: true, /* 팝업을 통한 연동처리 여부 */
		loginButton: {color: "green", type: 3, height: 35, width:50} /* 로그인 버튼의 타입을 지정 */
	}
);
	
/* 설정정보를 초기화하고 연동을 준비 */
naverLogin.init();


loginSNS.prototype = {
	
	
	"logout" : function(){
	//	g360.logout();
	//	return;
	//	location.href = root + "/logout.do";
		var url = g360.root_path + "/logout.do";
		$.ajax({
			type : "Get",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(res){
				if (res.result == "OK"){
					
					
					g360.login_show();
					
					if (g360.UserInfo != null){
						if (g360.UserInfo.id == ""){
							var cs = g360.getCookie("isLogin");
							$("#exampleInputEmail1").val(cs);
						}else{
							var ck = $("#customCheck2").get(0).checked;
							if (ck){								
							}else{
								$("#exampleInputEmail1").val("");
							}
							$("#exampleInputPassword1").val("");
							
						}
					}
					
					if (g360.UserInfo.gubun == "normal"){
						gTopMain.mobile_logout_display();
					}else{
						gTopMain.mobile_logout_display2();
					}
					
					g360.UserInfo = null;
				
					//_wp.socket.emit('forceDisconnect');	
					
				//	g360.goHome();
					g360.goHome2();
					
				}else{
					g360.gAlert("Error", g360.g_lang.Logout_Alert1 , "red", "left");
				}
				
			},
			error : function(err){
				g360.gAlert("Error","로그아웃 중 오류가 발생하였습니다.", "red", "left");
			}
		})
			
		
	},

	"login" : function(){

		var id = $("#exampleInputEmail1");
        var pw = $("#exampleInputPassword1");
    
        if($.trim(id.val()) == ""){
            g360.gAlert("Error", g360.g_lang.Login_Alert1, "red", "left");
            id.focus();
            return false;
        }
        
        if($.trim(pw.val()) == ""){
            g360.gAlert("Error", g360.g_lang.Login_Alert2, "red", "left");
            pw.focus();
            return false;
        }
        
        // rsa 암호화
    //    var rsa = new RSAKey();
    //    rsa.setPublic($('#RSAModulus').val(),$('#RSAExponent').val());
        
   //     $("#USER_ID").val(rsa.encrypt(id.val()));
   //     $("#USER_PW").val(rsa.encrypt(pw.val()));
        
        $("#USER_ID").val(id.val());
        $("#USER_PW").val(pw.val());
        
      
        var data = JSON.stringify({
        	id : id.val(),
        	pw : pw.val()        	
        });       
        			
		var url = g360.root_path + "/login.mon";
	
		$.ajax({
			type : "Post",
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(res){
				
				if (res.result == "NOID"){
					g360.gAlert("Error", g360.g_lang.Login_Alert3, "red", "left");
				}else if (res.result == "email_no_exist"){
					g360.gAlert_email("Error", g360.g_lang.Login_Alert4 , "red", "left", id.val());
				}else if (res.result == "NOPW"){
					g360.gAlert("Error", g360.g_lang.Login_Alert5 , "red", "left");
				}else{
					
					var jx = JSON.stringify(res);
					g360.UserInfo = res;

					g360.login_hide();
					$("#loginPop_Close").click();
					
					//아이디 저장
					var ck = $("#customCheck2").get(0).checked;
					if (ck){
						g360.setCookie("isLogin", id.val(), 100);
						$("#customCheck2").prop("checked", "checked");
						
					}else{
						g360.setCookie("isLogin", "", 100);
						$("#customCheck2").prop("checked", false);
					}	
					
					
					$("#exampleInputPassword1").val("");
					$("#exampleInputEmail1").val("");
					
					$('#search_area').addClass('login');
					//g360.goHome();
					
					//webpush start................
					//_wp.socket.on('connect', function(){
					
//						var emailaddress = g360.UserInfo.email;
//						_wp.socket.emit('adduser', emailaddress);		
					//});	
					
					g360.save_history_now('login');
				}				
			},
			error : function(err){
				g360.gAlert("Error", g360.g_lang.Login_Alert6 , "red", "left");
			}
		});
				

        
        
    //    $("#loginSNS").submit();
       // return true;
	},
	
	
		

	"reguser" : function(email, id, name, site){
		
		if (email != "" && typeof(email) != "undefined"){
		//	location.href = root +"/reguserSNS.do?email="+email+"&id="+id+"&name="+encodeURIComponent(name) + "&site=" + site;
			

		//	$("#form2").submit();
			$("#loginPop_Close").click();
			
			g360.LoadPage_member("body_content", g360.root_path + "/main/member/member.jsp", email, name, id, site);
			
//			$("#email1").val(email);			
//			$("#txt_nickname").val(name);
//			
//			$("#site").val(site);
//			$("#id").val(id);
			
		
			return false;
			
		}else{
		//	location.href = root +"/reguser.do";
			
			g360.gAlert("Error", g360.g_lang.Login_Alert7 , "red", "left");
			g360.goto_reg();
		}
		
	},
	
			
	"statusChangeCallback" : function(response){
	    if (response.status === 'connected') {		      
	      FB.api('/me', function(response) {
	    	  var logininfo = "";
	    	  var name = response.name;
	    	  var id = response.id;
	    	  	logininfo +=  g360.g_lang.Login_Info + response.name + "/" + response.id;
	        	 FB.api('/me', {fields: 'email'}, function(response) {
				      	//console.log(response.email);
				      	logininfo += "/" + response.email;					      	
				   				      	
				      	loginFC.check_register(response.email, "F", name, id);
			      });
	      });
	    } else if (response.status === 'not_authorized') {
	      // 페이스북에는 로그인 되어있으나, 앱에는 로그인 되어있지 않다.
	    	g360.gAlert("Error",'Please log ' + 'into this app.', "red", "left");
	    } else {
	    	g360.gAlert("Error",'Please log ' + 'into Facebook.', "red", "left");
	    }
	},
	
	"facebookprecheck" : function(){
		if (location.protocol.toLowerCase() != "https:"){
			g360.gAlert("Error", g360.g_lang.Login_Alert8 , "red", "left");
			return false;
		}
		return true;
	},
	
	"checkLoginState" : function(){
		if (loginFC.facebookprecheck()){
			FB.getLoginStatus(function(response) {
				loginFC.statusChangeCallback(response);
		    });
		}

	},
	
	"kakaologin" : function(){
		Kakao.Auth.login({
			persistAccessToken:true,
			success : function(authObj){
				Kakao.API.request({
					url: '/v2/user/me',
			       	success: function(res) {			
			            // loginFC.check_register(res.kaccount_email, "K", res.properties['nickname'], res.id);
			             
			             //카카오 v2버전에서 리턴값의 형태가 변경됨
			       		loginFC.check_register(res.kakao_account.email, "K", res.properties['nickname'], res.id);
			       	},
			       	fail: function(err) {
			       		g360.gAlert("Error",JSON.stringify(err), "red", "left");
			       	}
				});
			},
	       	fail: function(err) {
              g360.gAlert("Error",JSON.stringify(err), "red", "left");
	       	}
		});		
	},
	

	"google_login" : function(){
		
		hello('google').login({scope: 'email'}).then(function(auth){
			hello(auth.network).api('/me').then(function(r){
				console.log(JSON.stringify(auth));
				accessToken = auth.authResponse.access_token;
				console.log(accessToken);
				hello('google').api('me').then(
					function(json){						
						console.log(JSON.stringify(json));
						name = json.name;							
						email = json.emails[0].value;					
						id = json.id;
									
						loginFC.check_register(email, "G", name, id);
					}
				);
			});
		});
	},
	
	"facebook_login" : function(){
		if (loginFC.facebookprecheck()){
			hello('facebook').login({scope: 'email'}).then(function(auth){
				hello(auth.network).api('/me').then(function(r){
					//console.log(JSON.stringify(auth));
					accessToken = auth.authResponse.access_token;
					//console.log(accessToken);
					hello('facebook').api('me').then(
						function(json){						
							console.log(JSON.stringify(json));
							name = json.name;							
							email = json.email;					
							id = json.id;
				
							loginFC.check_register(email, "F", name, id);
						}
					);
				});
			});
		}
		
	},
	
	
	"check_register" : function(email, site, name, id){
		
		var url = "/check_register.mon?id=" + id;
		url += "&" + new Date().getTime();
		
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json, charset=utf-8",
			url : url,
			success : function(data){
				
				if (data.result == "NO"){
					//등록된 사용자가 아니라 회원가입 창으로 이동해야 한다.
					loginFC.reguser(email, id, name, site);
					
				}else{
					//기존에 등록된 사용자로 바로 로그인 처리한다.
					
					
					$("#exampleInputEmail1").val(email);
			        $("#exampleInputPassword1").val(id);
					loginFC.login();
					
				}
			},
			error : function(e){
				g360.error_alert();
			}
		})
			
	}
	
}



var loginFC = new loginSNS();
function loginSNS(){
	_this = this;

}
