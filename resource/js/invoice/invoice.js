var gInvoiceFC = null;

function gInvoiceFunction(){
	_this = this;
}

gInvoiceFunction.prototype = {		
	"init" : function(){
		//최조 로딩할때 택배사 정보를 가져와서 세팅한다.
		gInvoiceFC.load_companylist();
	},
	
	"load_companylist" : function(){
		var url = contextpath + "/invoiceapi.gu?ty=1";
		url += "&" + new Date().getTime();

		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json, charset=utf-8",
			url : url,
			success : function(data){
			//	debugger;
				var sel = $("#t_code");
				for (var i = 0 ; i < data.Company.length; i++){
					var spl = data.Company[i];					
					sel.append("<option value='" + spl.Code+ "'>" + spl.Name + "</option>");	
				}
				
				//$("#request_right").html(html);
			},
			error : function(e){
				g360.gAlert("Error","데이터 연동 중 오류가 발생하였습니다.", "red", "left");
			}
		})
	},
	
	"search_invoice" : function(){
		var sval = $("#t_code").val();
		var tval = $("input[name=t_invoice]").val();
		var html = "";
		var url = contextpath + "/invoiceapi.gu?ty=3&cc="+sval+"&ic="+tval;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json, charset=utf-8",
			url : url,
			success : function(data){
				if (data.status == false){
					$("#log").html(data.msg);
				}else{
					
					html += "상품명 : " + data.itemName + "<br>";					
					html += "발신자 : " + data.senderName + "<br>";
					html += "수신자 : " + data.recipient + "<br>";
					html += "수신자 주소 : " + data.receiverAddr + "<br>";
					html += "=====================================<br>";
					html += "배송상태 : " + data.lastStateDetail.kind + "<br>";
					html += "시간  : " + data.lastStateDetail.timeString + "<br>";
					
					$("#log").html(html);
				}
			},
			error : function(e){
				g360.gAlert("Error","송장 검색시 오류가 발생하였습니다.", "red", "left");
			}
		})
	}	
}

$(document).ready(function(){
	gInvoiceFC = new gInvoiceFunction();	
	_this.init();	
});

