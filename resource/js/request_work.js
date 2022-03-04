$(document).ready(function(){
	gReqWork = new __Request_work();
	_this.init();
});



function __Request_work(){
	_this = this;
}

__Request_work.prototype = {		
	"init" : function(){	
		
		gReqWork.draw_init();
		
		$("#search_request").on("click", function(event){
			
			g360.gAlert("Info","요청내용을 이용해서 검색엔진에서 데이터 검색된 창을 팝업 레이어로 띄워주기", "blue", "top");
			
//			var html = "";
//			html += "요청내용을 이용해서 검색엔진에서 데이터 검색된 창을 팝업 레이어로 띄워주기";
			
			
			
//			html += "<div class=\"layer_g360\" id=\"kfile_image_popup\" title='11111111111' style='width:0px;height:0px;'>";
//			html += "<div class=\"layer_g360_wrap\" >";
//			html += "<h3>1111111111111111111111111111111111</h3>";
//			html += "<button class=\"sub_contents_btn btn_close\" onclick=\"kFC.hide_image_popup_layer();\">닫기</button>";
//			html += "요청내용을 이용해서 검색엔진에서 데이터 검색된 창을 팝업 레이어로 띄워주기";
//		//	html += "<img src=\"" + img_url + "\" style=\"max-width:100%; max-height:100%;\">"
//		//	html += "<a href=\"#\" class=\"btn_file_down\" onClick=\"kJS.downloadFile('" + ownerkey + "','" + filekey + "','" + filename + "')\">다운로드</a>"
//			html += "</div>";
//			html += "</div>";
//			
//			g360.layer_popup(html);
			
			return false;
		});
		
		$("#AI_with_request").on("click", function(event){
		
			g360.gAlert("Info","인공지능과 함께 작품 요청하는 창 띄우기", "blue", "top");
			return false;
		});
		
	},
	
	"draw_init" : function(){
		var start = 0;
		var perpage = 10;
		var url = g360.root_path + "/request_list.mon?start="+start+"&perpage="+perpage;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json, charset=utf-8",
			url : url,
			success : function(data){
				var html = "";
				for (var i = 0 ; i < data.length; i++){
					var spl = data[i];
					if (spl.request_status == "1"){
						html += "<div style='border:1px solid red; padding:10px'>[진행중]" + spl.request_memo + "/" + spl.request_price + "<br>" + spl.request_size + "/" + spl.request_date + "</div>";
					}else if (spl.request_status == "2"){
						html += "<div style='border:1px solid red; padding:10px'>[완료]" + spl.request_memo + "/" + spl.request_price + "<br>" + spl.request_size + "/" + spl.request_date + "</div>";
					}
					
				}
				
				$("#request_right").html(html);
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"saveRequest" : function(){
		if ($("textarea[name=request_memo]").val() == ""){
			
			g360.gAlert("Info","요청 내용을 입력하셔야 합니다.", "blue", "top");
			return;
		}
		if ($("input[name=request_price]").val() == ""){
			
			g360.gAlert("Info","요청 금액을 입력하셔야 합니다.", "blue", "top");
			return;
		}
		if ($("input[name=request_size]").val() == ""){
			
			g360.gAlert("Info","요청 사이즈를 입력하셔야 합니다.", "blue", "top");
			return;
		}
		if ($("input[name=request_date]").val() == ""){
			
			g360.gAlert("Info","배송 요청일을 입력하셔야 합니다.", "blue", "top");
			return;
		}
		
		//현재 접속한 사용자의 정보를 등록한다.  //서블릿에서 저장되는 시간도 등록해야 한다.

		var data = JSON.stringify({
			request_memo : $("textarea[name=request_memo]").val(),
			request_price : $("input[name=request_price]").val(),
			request_size : $("input[name=request_size]").val(),
			request_date : $("input[name=request_date]").val(),
			request_email : g360.email,
			request_nickname : g360.nickname,
			request_status : "1"
		});
		
		var url = g360.root_path + "/request_work.mon";
		$.ajax({
			type : "Post",
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				
				g360.gAlert("Info","요청하신 자료가 정상적으로 등록되었습니다.", "blue", "top");
				_this.empty_fields();
				_this.draw_init();
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"empty_fields" : function(){
		$("textarea[name=request_memo]").val("");
		$("input[name=request_price").val("");
		$("input[name=request_size").val("");
		$("input[name=request_date").val("");
	}
}



