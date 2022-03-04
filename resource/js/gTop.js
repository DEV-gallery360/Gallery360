$(document).ready(function(){
	_this.init();
});

var gTopFC = null;

function gTopFunction(){
	_this = this;
}

gTopFunction.prototype = {		
	"init" : function(){
		
		
		
		
		
		$("#menu").html("현재 접속자 닉네임 : " + g360.nickname);	
		
		$("#addSearch").on("click", function(event){
			//일반 유저가 작품요청을 클릭한 경우
			window.open(g360.root_path + "/jsp/service/addSearch.jsp")
			return false;
		});
		
		$("#invoiceSearch").on("click", function(event){
			//일반 유저가 작품요청을 클릭한 경우
			window.open(g360.root_path + "/jsp/service/invoiceTest.jsp")
			return false;
		});
		
		$("#vrgallery").on("click", function(event){
			//일반 유저가 작품요청을 클릭한 경우
			window.open(g360.root_path + "/vrgallery.jsp")
			return false;
		});
		
		
		
		$("#user1").on("click", function(event){
			//일반 유저가 작품요청을 클릭한 경우
			gTopFC.load_user1();
			return false;
		});
		
		$("#cu2").on("click", function(event){
			//큐레이터가 보유작품관리 메뉴를 클릭한 경우
			try{
				var form = $("form")[0];
				var formData = new FormData(form);
				gTopFC.load_art_image_upload();
			}catch(e){
				g360.gAlert("Info","지원하지 않는 브라우저 버전입니다.", "blue", "top");
		
			}		
		});
		
		$("#cu4").on("click", function(event){
			//큐레이터가 VR갤러리 만들기를 클릭한 경우
			try{
				window.open(g360.root_path + "/jsp/vr/vrgallery.jsp")
			}catch(e){
				g360.gAlert("Info","지원하지 않는 브라우저 버전입니다.", "blue", "top");				
			}	
			
		});
	},
	
	

	
	"load_user1" : function(){
		g360.LoadPage("bottom_content", g360.root_path + "/jsp/homepage/request_work.jsp");
	},
	
	"load_art_image_upload" : function(){
		g360.LoadPage("bottom_content", g360.root_path + "/jsp/homepage/art_upload/art_upload.jsp");
	}
	
	
}



