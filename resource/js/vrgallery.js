$(document).ready(function(){
	gVRGallery = new __MakeVRGallery();
	_this.init();
	
	
	
	//window.open("/vr/ygkim@nh.com_20180731234515_GHBXJT4/gallery360.html")
});



function __MakeVRGallery(){
	_this = this;
}

__MakeVRGallery.prototype = {		
	"init" : function(){
		$("#makevrgallery").on("click", function(event){
			gVRGallery.makeVR();
		});		
		
		$("#sndoff").on("click", function(event){
			gVRGallery.offsound();
		});	
		
		$("select[name=tname]").change(function(){
			gVRGallery.hidden_field(this.value);
		});
		
		gVRGallery.load_VRRoom();
		
		$("#hh2").hide();
		$("#hh3").hide();
	},
	
	"offsound" : function(){
		if (typeof(__pano1) != "undefined"){
			__pano1.krpano1.call("stopsound(bgsnd)");
		}		
	},
	
	"togglesound" : function(){
		if (typeof(__pano1) != "undefined"){
			__pano1.krpano1.call("pausesoundtoggle(bgsnd)");
		}		
	},
	
	"hidden_field" : function(opt){
	
		if (opt == "s1"){
			$("#hh1").show();
			$("#hh2").hide();
			$("#hh3").hide();
		}else if (opt == "s2"){
			$("#hh1").show();
			$("#hh2").show();
			$("#hh3").hide();
		}else if (opt == "s3"){
			$("#hh1").show();
			$("#hh2").show();
			$("#hh3").show();
		}
	},
	
	"load_VRRoom" : function(){
		var start = 0;
		var perpage = 5;
		var url = contextpath + "/load_VRRoom.mon?start="+start+"&perpage="+perpage;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "Get",
			datatype : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				
				
				var html = "";
				html += "<div style='margin-bottom:10px'>";
				
				for (var i =0 ; i < data.length; i++){
					var title = data[i].title;
					var key = data[i].dockey;
					var templatecode = data[i].templatecode;
					
					html += "<span style='margin-right: 10px; border:1px solid blue; cursor:pointer' onclick=\"gVRGallery.open_vr('"+key+"','"+templatecode+"')\">";
					html += "(" + (i+1) + "번 작품)"  + title + "</span>";
					
				}
				
				html += "</div>"
							
				$("#dis").html(html);
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"open_vr" : function(key, templatecode){
		var url = "/vr/template/" + templatecode + "/gallery360.jsp?key="+key+"&category="+templatecode;
		gVRGallery.offsound();
		gVRGallery.LoadPage("gallery_preview", url);
		//http://localhost:8080/vr/template/s1/gallery360.jsp?key=ygkim@nh.com_20180812164103_DKHQHSQ&category=s1
	},

	
	"makeVR" : function(){
		
		

		var data = JSON.stringify({
			templatecode : $("select[name=tname]").val(),
			bgmusic : $("select[name=tmusic]").val(),
			title : $("input[name=title]").val(),
			f1 : $("input[name=f1]").val(),
			f2 : $("input[name=f2]").val(),
			f3 : $("input[name=f3]").val(),
			f4 : $("input[name=f4]").val(),
			f5 : $("input[name=f5]").val(),
			f6 : $("input[name=f6]").val(),
			f7 : $("input[name=f7]").val(),
			f8 : $("input[name=f8]").val(),
			f9 : $("input[name=f9]").val(),
			f10 : $("input[name=f10]").val(),
			f11 : $("input[name=f11]").val(),
			f12 : $("input[name=f12]").val(),
			f13 : $("input[name=f13]").val(),
			f14 : $("input[name=f14]").val(),
			f15 : $("input[name=f15]").val()			
		})
		
		var url = contextpath + "/makeVR.mon";
		$.ajax({
			type : "Post",
			data : data,
			datatype : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				
				if (data.result == "OK"){
					//요청문서 key를 가지고 실제 VR Gallery를 생성한다.
					var key = data.key;
					var category = data.category;
					
				
					var url = contextpath + "/makevr.action?key="+key+"&category="+category;
					url += "&" + new Date().getTime();
					$.ajax({
						type : "Get",
						datatype : "json",
						asyn : false,
						contentType : "application/json; charset=utf-8",
						url : url,
						success : function(data){
							
							
							$("input[name=key]").val(key);
							
							gVRGallery.offsound();
							gVRGallery.LoadPage("gallery_preview", "/vr/template/"+category+"/gallery360.jsp?key="+key+"&category="+category);
							
							gVRGallery.load_VRRoom();
						}
					})
					
				}
			},
			error : function(e){
				
				g360.gAlert("Info","VR갤러리 생성시 오류가 발생하였습니다.", "blue", "top");
			}
		})
		
	},
	
	"LoadPage" : function(id, url){
		$("#"+id).contents().remove();
	
		$("#"+id).load(url, function(response, status, xhr){
			if (status == "error"){
				var msg = "Site Error : "; 
				
				g360.gAlert("Info",msg + xhr.status + " " + xhr.statusText, "blue", "top");
			}else if (status == "success"){
				
			}
		});
	},
	
	
}



