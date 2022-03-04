function pano1(){
	_this = this;
	this.krpano1 = null;
	_this.visible = false;
	
}

var isOpen = "F";
pano1.prototype = {
	"init" : function(){		
		embedpano({
			swf : "/vr/vr/tour.swf", 		
			id : "krpanoSWFObject_" + __key, 
			xml : "/vr/vr/xml/tour_" + __key + ".xml?open&ver="+new Date().getTime(), 
			target : "pano1", 
			consolelog : false,					
			passQueryParameters : true, 		
			onready : __pano1.krpano_onready_callback
		});

	},
	
	"krpano_onready_callback" : function(krpano_interface){
		__pano1.krpano1 = krpano_interface;
			
		__pano1.krpano1.set('events.onloadcomplete', 'js(__pano1.loadComplete());');
		//setTimeout("__pano1.load_icon()", 2000);
		
		__pano1.insertCopyright();
	},
	
	"insertCopyright":function(){
		var today = new Date();   
		var year = today.getFullYear(); // 년도
		var _html = '<div class="vr_copyright">'+g360.g_lang.VR_Copyright+'<br>Copyright © 2018-'+year+' Gallery360. All Rights Reserved.</div>';
		$('#pano1').append(_html);
	},
	
	"loadComplete" : function(){
		isOpen = "T";
		
		// 로딩완료시 로드 이미지 해제
		$('#vr_load').hide();
		
		//__pano1.krpano1.get('WebVR').vr_cursor_enabled = false;
		if (g360.bgmusic != ""){
		//	__pano1.krpano1.call("playsound(bgsnd, '/vr/template/common/music/"+g360.bgmusic+"', 0); set(events[currentpano].onnewpano,null)");
			__pano1.krpano1.call("playsound(bgsnd, '"+g360.bgmusic+"', 0); set(events[currentpano].onnewpano,null)");
		}
		

		if (g360.isPopupVROpen == "F"){
			g360.offsound_bg();
		}
	},
	
	"loadpano" : function(xmlname){

		if (__pano1.visible == false){
			__pano1.visible = true;
			__pano1.load_icon();
		}else{
			__pano1.loadpano2();
		}
		
	},
	
	"xxx" : function(opt){
		alert(opt + "1111111111111111");
	}
	
	
}

var __pano1 = new pano1();

$(document).ready(function(){
	__pano1.init();
});
