$(document).ready(function(){
	gArtUpload = new __ArtUpload();
	_this.init();
});



function __ArtUpload(){
	_this = this;
}

__ArtUpload.prototype = {		
	"init" : function(){
		
		//기존에 등록된 이미지를 가져온다.
		_this.load_saved_image_info();
		///////////////////
		
		$("#imageUpload").on("click", function(event){
			_this.upload_process();
		});
		
	},
	
	"image_check" : function(){
		
	},
	
	"upload_process" : function(){
		var form = $("#__imageUpload")[0];

		var fobj = $("input[name=file1]").val().toLowerCase();
		var res1 = fobj.match(".jp");
		var res2 = fobj.match(".png");
		var res3 = fobj.match(".gif");
		var res4 = fobj.match(".bmp");
				
		if (res1 || res2 || res3 || res4){			
		}else{
			
			g360.gAlert("Info","이미지 파일만 업로드 할 수 있습니다.", "blue", "top");
			$("input[name=file1]").val("");
			return;
		}			
		
		//업로드 정보 세팅을 위해서 필드 추가 정의 //////////////////////////////
		$("input[name=art_email]").val(g360.email);
		//////////////////////////////////////////////////////
		
		
		var formData = new FormData(form);
		var url = g360.root_path + "/FileUpload.mon";
		$.ajax({
			url : url,
			processData: false,
			contentType: false,
			data: formData,
			type: "POST",
			success : function(result){

				_this.load_saved_image_info();
				gTopFC.load_art_image_upload();				
			},
			error: function(){
				
				g360.gAlert("Info","파일업로드 진행중 오류가 발생되었습니다.", "blue", "top");
			}
		});
		
		return false;
	},
	
	"load_saved_image_info" : function(){
		var start = 0;
		var perpage = 10;
		var url = g360.root_path + "/load_save_image_info.mon?start="+start+"&perpage="+perpage;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			url : url,
			contentType : "application/json; charset=utf-8",
			success : function(data){
				
				var html = "";
				for (var i =0 ; i < data.length ; i++){
					var info = data[i];
					var imgsrc = "/gallery360/upload/" + info.art_email + "/" + info.filename;
					html += "<img style='margin-left:50px' width='100' src=" + imgsrc + ">" + "  " + info.art_subject + "[" + info.art_owner_name + "]";
					html += "<br>" + info.dockey +"<br>";
							
				}
				
				$("#upload_right").html(html);
			},
			error : function(){
				
				g360.gAlert("Info","데이터 로딩중 오류가 발생하였습니다.", "blue", "top");
			}
		});
		
	}
}



