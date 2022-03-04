
function Pano(){
	this.krpano1 = null;
}
Pano.prototype = {
	"init" : function(target_layer, vr_key){
		var _self = this;
		embedpano({
			swf : "/vr/vr/tour.swf", 		
			id : "krpanoSWFObject_" + vr_key, 
			xml : "/vr/vr/xml/tour_" + vr_key + ".xml", 
			target : target_layer, 
			consolelog : false,		
			passQueryParameters : true, 		
			//webglsettings:{preserveDrawingBuffer:true},
			onready : _pano.krpano_onready_callback
		});
	},
	
	"krpano_onready_callback" : function(krpano_interface){
		_pano.krpano1 = krpano_interface;
		_pano.krpano1.set('events.onloadcomplete', 'js(_pano.loadComplete());');
		_pano.krpano1.set('events.onexitfullscreen', 'js(_pano.exitFullscreen());');
		
		// 롤오버 텍스트 효과 수정
		_pano.krpano1.call('set(textstyle[STYLE1_LinkSM].font, "Noto Sans KR")');
		_pano.krpano1.call('set(textstyle[STYLE1_LinkSM].padding, "8 20 8")');
		_pano.krpano1.call('set(textstyle[STYLE1_LinkSM].yoffset, "60")');
		_pano.krpano1.call('set(textstyle[STYLE1_LinkSM].backgroundalpha, "0.8")');
		_pano.krpano1.call('set(textstyle[STYLE1_LinkSM].backgroundcolor, "0x000000")');
		
		if (g360.bgmusic != ""){
			_pano.krpano1.set('events.onenterfullscreen', 'js(_pano.soundcontrol(1));');
			//_pano.krpano1.set('events.onexitfullscreen', 'js(_pano.soundcontrol(2));');
		}

	},
	
	"loadComplete" : function(){
		_pano.krpano1.call('skin_hideskin()');	// 아이콘 표시 안되도록 처리
		_pano.krpano1.set('layer[snd2].visible', false);
		_pano.krpano1.set('plugin[snd3].visible', false);
		_pano.krpano1.set('layer[skin_btn_show_icon].visible', false);
				
		rs.isVrLoadCompleted = true;
		$('#m_nav_vr').addClass('on');
		
		if (!$('#artist_detail_layer').is(':visible')) {
			if (!$('#vr_layer').hasClass('hidden')) {
				$('#vr_layer').addClass('show');				
			}
		}
		
		if (_pano.krpano1.get('WebVR') != null) _pano.krpano1.get('WebVR').vr_cursor_enabled = false;
		
		// Fisheye Style (PC only)
		if (!window.matchMedia('(max-width:979px)').matches) {
			_pano.krpano1.set('view.distortion', 1);
			_pano.krpano1.set('autorotate.tofov', 'off');
			_pano.krpano1.set('autorotate.horizon', 'off');
			_pano.krpano1.set('view.fov', 180);
			_pano.krpano1.call('lookto(0,90)');		
		}
	},
	
	"soundcontrol" : function(opt){
		if (g360.bgmusic != "") {
			if (opt == 1){
				_pano.krpano1.call("playsound(bgsnd, '"+g360.bgmusic+"', 0); set(events[currentpano].onnewpano,null)");
				_pano.krpano1.set('layer[snd2].crop', '0|0|50|50');
			}else{
				_pano.krpano1.call("stopsound(bgsnd)");
				_pano.krpano1.set('layer[snd2].crop', '0|50|50|50');
			}
		}
	},
	
	"exitFullscreen" : function(){
		// 사운드제어
		if (g360.bgmusic != "") {
			_pano.soundcontrol(0);
			_pano.krpano1.set('layer[snd2].visible', false);			
		}
		
		_pano.krpano1.set('plugin[snd3].visible', false);
		
		// VR 상세보기 화면 닫기
		_pano.krpano1.call('callwith(layer[close_freim_url_addhs], onclick)');
		
		// 기능 아이콘 펼친 경우 숨김
		_pano.krpano1.call('skin_hideskin()');
		
		// 하단 화살표 숨김
		_pano.krpano1.set('layer[skin_btn_show_icon].visible', false);
		
		
		// Fisheye Style (PC only)
		if (!window.matchMedia('(max-width:979px)').matches) {
			_pano.krpano1.set('view.distortion', 1);
			_pano.krpano1.set('autorotate.tofov', 'off');
			_pano.krpano1.set('autorotate.horizon', 'off');
			_pano.krpano1.set('view.fov', 180);
			_pano.krpano1.call('lookto(0,90)');
		}
		
		
		
		// 모바일에서 fullscreen 하는 경우 감싸고 있는 레이어를 숨길 수가 없어 VR갤러리 보다 높은 z-index는 모두 숨김처리
		// vr_layer에 클릭 이벤트도 해제 후 다시 걸어준다
		$('#vr_layer').off('click').on('click', function(){
    		rs.showFullscreen();
    	});
		
		$('#vr_area').removeClass('fullscreen');
		$('#vr_layer').find('.vr-area-upper').show();
		$('#header').show();
		
		
		clearInterval(rs.fs_check);
	}
	
	
	
}