
function loginSNS_Naver(){
	_this = this;
}

loginSNS_Naver.prototype = {
	

	"requser" : function(email, id, name, site){
		if (email != ""){
		//	location.href = root +"/reguserSNS.do?email="+email+"&id="+id+"&name="+encodeURIComponent(name) + "&site=" + site;
			
			$("#email").val(email);
			$("#id").val(id);
			$("#name").val(name);
			$("#site").val(site);
			$("#form2").submit();
		}else{
			location.href = root +"/reguser.do";
		}
		
	},
	
	
	"login" : function(){
		var id = $("#txt_id");
        var pw = $("#txt_pw");
    
        if(id.val() == ""){
            g360.gAlert("Error","아이디를 입력 해주세요.", "red", "left");
            id.focus();
            return false;
        }
        
        if(pw.val() == ""){
            g360.gAlert("Error","비밀번호를 입력 해주세요.", "red", "left");
            pw.focus();
            return false;
        }
        
        // rsa 암호화
      //  var rsa = new RSAKey();
      //  rsa.setPublic($('#RSAModulus').val(),$('#RSAExponent').val());
        
     //   $("#USER_ID").val(rsa.encrypt(id.val()));
     //   $("#USER_PW").val(rsa.encrypt(pw.val()));
        
        
        $("#USER_ID").val(id.val());
        $("#USER_PW").val(pw.val());
        
        id.val("");
        pw.val("");
 
        $("#loginSNS").submit();
       // return true;
	},
	
	
	"check_register" : function(email, site, name, id){
		var url = root + "/check_register.mon?id=" + id;
		
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json, charset=utf-8",
			url : url,
			success : function(data){
				debugger;
				if (data.result == "NO"){
					//등록된 사용자가 아니라 회원가입 창으로 이동해야 한다.
					loginFC_Naver.requser(email, id, name, site);
					
				}else{
					//기존에 등록된 사용자로 바로 로그인 처리한다.
					$("#txt_id").val(email);
			        $("#txt_pw").val(id);
					loginFC_Naver.login();
				}
			},
			error : function(e){
				g360.error_alert();
			}
		})
			
	}
	
}



var loginFC_Naver = new loginSNS_Naver();
  
