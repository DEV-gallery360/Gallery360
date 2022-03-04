
function gMakeVrGallery(){	
	gMakeVR = this;
	
	// 선택된 공간 사이즈
	this.space_size = {
		f: 600,
		l: 600,
		r: 600,
		b: 600
	};

	this.picture_index = 0;
	//this.canvas_index = 0;
	this.bg_wrap = {};
	this.bg_img = {};
	this.canvas = {};
	this._bg_scale = {};
	this.picture = {
			f: {},
			l: {},
			r: {},
			b: {}
	};
	
	this.music = "";
	this.title = "";
	this.selectCode = "";
	this.express = "";
	
	
	this.call_mode = "";
	this.call_key = "";
	this.call_code = "";
	
	this.bottom_start = 0;
	this.perpage = 10;
	this.bottom_complete = false;
}

gMakeVrGallery.prototype = {		

	"init" : function(){
		
		var _self = this;	
		
		if (_self.call_mode == "modify"){
			_self.change_edit_mode();
			$("#vr_room_create").hide();
			$("#vr_room_modify").show();
		}else{
			_self.loadTemplateList();
			
			$("#vr_room_modify").hide();
		}
		
		_self._eventBind();
	},
	
	_eventBind: function(){
		var _self = this;
		$("#back_vr_gallery_main").on("click", function(event){
			g360.LoadPage("body_content", g360.root_path + "/partner/vr_gallery/vr_main.jsp");
			return false;
		});
		
		$("#vr_preview").on("click", function(event){
			
		});
		
		// VR갤러리 만들기 도움말
		$('#btn_makevr_help').on('click', function(){
			g360.popup_manual('userinfo');
		});
		
		// 그림선택
		$('#xcolumns').on('click', function(e){
			if (!$(e.target).hasClass('preview-img')) return;
			
			var loc = _self.hasPicture($(e.target).data('dockey'));
			if (loc != '') {
				g360.gConfirm(loc + '에 이미 전시된 작품입니다.<br>중복으로 작품을 전시할까요?', function(){
					_self.selectPicture(e.target);
				});
			} else {
				_self.selectPicture(e.target);
			}
			
		});
		
		$("#choice_vr_room").on("click", function(event){
			var cnt = gMakeVR.check_reg_image_count();
			
			if (cnt == 0){
				
				g360.gAlert("Info","작품등록 >> 작품보관함에서 판매요청하기 >> 관리자 승인된 작품이 1개 이상 존재해야  VR갤러리를 생성하실 수 있습니다.", "blue", "top");
				return false;
			}
			
			
			if (gMakeVR.selectCode == ""){
				g360.gAlert("Info","갤러리를 선택하셔야 합니다.", "blue", "top");
				return false;
			}
			
			var templ = $('#vr_gallery_template_list li.on');
			_self.space_size.f = parseInt(templ.data('size-f'),10);
			_self.space_size.l = parseInt(templ.data('size-l'),10);
			_self.space_size.r = parseInt(templ.data('size-r'),10);
			_self.space_size.b = parseInt(templ.data('size-b'),10);
			
			$("#vr_gallery_make1").hide();
			$("#vr_expand_1").addClass("on");
			$("#vr_gallery_make2").show();
			$('#vr_gallery_make2_sub').show();
			
			gMakeVR.load_saved_image_info();
			
			// 공간 선택
			_self.initSpace();
			$('.btn_vr_space').removeClass('on');
			$('#vr_space_f').addClass('on');
			$('#vr_space_f').click();
			
			// 스크롤이동
			var scroll = $('#vr_gallery_make2').offset().top - ($('#header').height() + $('.sub_header').height()) - 10;
			$('html').scrollTop(0);
			$('html').stop().animate({scrollTop : scroll}, 500);
		});
		
		// VR 공간 버튼
		$('.vrgallery_space .btn_vr_space').on('click', function(){
			$('.btn_vr_space').removeClass('on');
			$(this).addClass('on');
			var type = $(this).attr('id').split('_')[2];
			_self.selectTemplate(type);
		});
		
		// VR 전면,좌측,우측,후면 네비게이션 버튼
		$('#vr_space_prev').on('click', function(){
			var idx = $('.btn_vr_space.on').index();
			idx = (idx == 0 ? 3 : idx - 1);
			$('.btn_vr_space').eq(idx).click();
		});
		$('#vr_space_next').on('click', function(){
			var idx = $('.btn_vr_space.on').index();
			idx = (idx == 3 ? 0 : idx + 1);
			$('.btn_vr_space').eq(idx).click();
		});
		
		// 작품 선택완료 버튼
		$("#vr_img_select_complete").on("click", function(event){
			$("#vr_gallery_make2_sub").hide();
			$("#vr_expand_2").addClass("on");
			$("#vr_gallery_make3").show();
			
			if (_self.call_mode != "modify") {
				$("#vr_room_create").show();				
			}
			
			// 스크롤이동
			var scroll = $('#vr_gallery_make3').offset().top - ($('#header').height() + $('.sub_header').height()) - 10;
			$('html').scrollTop(0);
			$('html').stop().animate({scrollTop : scroll}, 500);
		});
		
		
		// VR갤러리 선택
		$("#vr_expand_1").parent().on("click", function(event){
			var $btn = $(this).find('button');
			$("#vr_gallery_make1").stop();
			if ($btn.hasClass("on")){
				$btn.removeClass("on");
				$("#vr_gallery_make1").slideDown();
			}else{
				$btn.addClass("on");
				$("#vr_gallery_make1").slideUp();
			}
		});
		
		// 작품 선택
		$("#vr_expand_2").parent().on("click", function(event){
			var $btn = $(this).find('button');
			$("#vr_gallery_make2_sub").stop();
			if ($btn.hasClass("on")){
				$btn.removeClass("on");
				$("#vr_gallery_make2_sub").slideDown();
				$('#vr_room_title').focus();
			}else{
				$btn.addClass("on");
				$("#vr_gallery_make2_sub").slideUp();
			}
		});
		
		// 작품 정보 입력 (전시제목, 소개글)
		$("#vr_expand_3").parent().on("click", function(event){
			var $btn = $(this).find('button');
			$("#vr_gallery_make3_sub").stop();
			if ($btn.hasClass("on")){
				$btn.removeClass("on");
				$("#vr_gallery_make3_sub").slideDown();
			}else{
				$btn.addClass("on");
				$("#vr_gallery_make3_sub").slideUp();
			}
		});
		
		// 갤러리 템플릿 선택
		$("#vr_gallery_template_list").on("click", function(event){
			var el;
			
			if (event.target.tagName == 'LI') {
				el = event.target;
			} else if ($(event.target).closest('li').length) {
				el = $(event.target).closest('li');
			} else {
				return;
			}
			
			var curid = $(el).data('code');
			
			$("#vr_gallery_template_list li").removeClass("on");
			$(el).addClass('on');
			
			_self.selectCode = curid;

			
			$("#gallery_title").text($(el).data('title'));
			$("#gallery_title2").text($(el).data('title'));
			_self.open_vr($(el).data('roomkey'), $(el).data('code'));	
		});
		
		$("#vr_room_create").on("click", function(event){
			if (!g360.login_check()) {
				g360.login_window_max();
				$("#p_login").click();
				return;
			}
			
			var ky = $("#vr_gallery_make3").get(0).style.display;
			if (ky != "none"){
				gMakeVR.make_VR_ROOM();
			}else{
				g360.gAlert("Info","VR갤러리 생성 프로세스를 완료하고 생성하기 버튼을 클릭해 주세요", "blue", "top");
				return false;
			}
			
		});
		
		
		$("#vr_room_modify").on("click", function(event){
			gMakeVR.modify_VR_ROOM();
		});
		
		$("#vr_room_cancel").on("click", function(event){
			g360.gConfirm("현재까지 작업된 내용은 저장되지 않습니다\n계속 진행할까요?", function(){
				g360.LoadPage("body_content", g360.root_path + "/partner/vr_gallery/make_vr_gallery.jsp");
			});
			return false;
		});
		
		$("#vr_room_manual").on("click", function(evnet){
			g360.popup_manual("vrgallery_create");
			return false;
		});
		
		$(".dropdown-menu .dropdown-item").on("click", function(event){
			gMakeVR.music = event.currentTarget.id;
			$("#music_select_box").text(event.currentTarget.text);
		});
		
		// 스크롤바
		if (!g360.isMobile()){
			$('#vr_gallery_make1 .left').mCustomScrollbar({
				theme:"minimal-dark",
				mouseWheelPixels: 400,
				mouseWheel:{ preventDefault: false },
				advanced:{
					updateOnContentResize: true
				},
				autoExpandScrollbar: true
			});
			
			$('#vr_left_frame').mCustomScrollbar({
				theme:"minimal-dark",
				mouseWheelPixels: 400,
				mouseWheel:{ preventDefault: false },
				advanced:{
					updateOnContentResize: true
				},
				autoExpandScrollbar: true
			});			
		}
		
		_self.set_left_image_frame_scroll();
	},
		
	// 생성시 전체 템플릿 로드
	loadTemplateList: function(){
		var _self = this;
		var $list = $('#vr_gallery_template_list');
		$.ajax({
			url : '/load_VRRoom_info.mon',
			success : function(list){
				if (!list.length) return;
				$.each(list, function(idx, data){
					var $li = $('<li>');
					$li.data('code', data.code)
						.data('size-f', data.f)
						.data('size-l', data.l)
						.data('size-r', data.r)
						.data('size-b', data.b)
						.data('title', data.title)
						.data('roomkey', data.roomkey);
					
					var imgsrc = g360.vr_img_path(data.code, data.roomkey);
					$li.append(
						'<div class="rec-pic-area item">' +
						'	<span><img src="' + data.front_url +'">' +
						'		<div class="info-main-area">' +
	            		'			<h2>' + data.title + '</h2>' +
	            		'		</div>' +			
	            		'	</span>' +
	            		'</div>'
					);					
						
					$list.append($li);
				});
				
				// 첫번째 갤러리 자동선택
				$('#vr_gallery_template_list li:first-child').click();
			}
		});
	},
	initSpace: function(callback){
		var _self = this;
		var type = ['f', 'l', 'r', 'b'];
		
		$.each(type, function(idx, val){
			_self.bg_wrap[val] = $('#vrgallery_area_' + val);
			if (_self.bg_wrap[val].find('canvas').length) {
				_self.canvas[val].dispose();
				_self.canvas[val] = null;
				_self.bg_wrap[val].find('canvas').remove();
				_self.picture = {};
				$('#xcolumns .grid-item').removeClass('on');
			}
			_self.bg_wrap[val].append('<canvas id="vrgallery_' + val + '_canvas"></canvas>');
			_self.canvas[val] = new fabric.Canvas('vrgallery_' + val + '_canvas');
			_self.canvas[val].hoverCursor = 'default';
			_self.canvas[val].selection = false;
			_self.initTemplate(val, callback);
			
			// 작품 삭제 이벤트 처리 시작
			_self.canvas[val].on('object:selected',function(e){
			});
	
			_self.canvas[val].on('mouse:down',function(e){
				var active_obj = _self.canvas[val].getActiveObject();
			    if(!active_obj) {
			    	$('#deleteBtn').remove();
			    } else {
			    	_self.addDeleteBtn(_self.canvas[val], active_obj.oCoords.tr.x, active_obj.oCoords.tr.y);
			    }
			});
	
			_self.canvas[val].on('object:modified',function(e){
			    _self.addDeleteBtn(_self.canvas[val], e.target.oCoords.tr.x, e.target.oCoords.tr.y);
			});
	
			_self.canvas[val].on('object:scaling',function(e){
				$('#deleteBtn').remove(); 
			});
			_self.canvas[val].on('object:moving',function(e){
				$('#deleteBtn').remove(); 
			});
			_self.canvas[val].on('object:rotating',function(e){
				$('#deleteBtn').remove(); 
			});
			// 작품 삭제 이벤트 처리 끝
		});
		
		$(document).off('click.canvas.removepicture').on('click.canvas.removepicture',".deleteBtn",function(){
			var active_obj = _self.canvas[_self.cur_type].getActiveObject();
			var orikey = active_obj.originalKey;
		    if(active_obj) {
		    	_self.canvas[_self.cur_type].remove(active_obj);
		    	delete _self.picture[_self.cur_type][active_obj.dockey];
		    	$('#deleteBtn').remove();
		    }
		    
		    if (_self.hasPicture(orikey) == '') {
		    	// 같은 작품이 걸려있는게 없을 때만 클래스를 삭제처리
				$('#xcolumns img[data-dockey="' + orikey + '"]').closest('.grid-item').removeClass('on');
			}
		});
	},
	// 배경 이미지 캔버스에 로딩
	initTemplate:function(type, callback){
		var _self = this;
		var img = new Image;
		
		img.src = '/vr/template/' + _self.selectCode + '/space1/panos/pic/pano_' + type + '.jpg';
		
		img.onload = function() {
			_self.bg_img[type] = new fabric.Image(img);
			_self.bg_img[type].selectable = false;
			
			var _bg_w = Math.ceil(_self.bg_wrap[type].width());
			_self._bg_scale[type] = _bg_w / img.width;
			var _bg_h = Math.ceil(img.height * _self._bg_scale[type]);
			
			// wrapper 사이즈 설정
			//_self.bg_wrap.width(_bg_w);
			_self.bg_wrap[type].height(_bg_h);
			//var _calc_h = $(window).height() - (_self.bg_wrap.position().top + 20 + 20 + 85);
			//_self.bg_wrap.height(_calc_h);
			_self.bg_img[type].scale(_self._bg_scale[type]);
					
			
			//_self.canvas.clear();
			//_self.group = null;
			_self.canvas[type].setDimensions({
	            width: _bg_w,
	            height: _bg_h
	        });
			
			_self.canvas[type].setBackgroundImage(_self.bg_img[type]);
			_self.canvas[type].renderAll();
			
			if (callback) callback(type);
		}		
	},
	selectTemplate: function(type) {
		//this.canvas_index++;
		$('#vrgallery_area_' + type).siblings('.vrgallery_area').css('z-index', 0);
		$('#vrgallery_area_' + type).css('z-index', 1);
		this.cur_type = type;
	},
	addDeleteBtn: function(canvas, x, y){
		$("#deleteBtn").remove();
	    var btnLeft = x-10;
	    var btnTop = y-10;
	    var deleteBtn = '<img id="deleteBtn" src="../img/btn_picture_deleted.png" class="deleteBtn" style="position:absolute;top:'+btnTop+'px;left:'+btnLeft+'px;cursor:pointer;width:30px;height:30px;"/>';
	    $(canvas.wrapperEl).append(deleteBtn);
	    
	},
	selectPicture: function(el, info){
		var _self = this;
		
		$(el).closest('.grid-item').addClass('on');
				
		_self.picture_index++;
		var orikey = $(el).data('dockey');
		var dockey = $(el).data('dockey') + '_' + _self.picture_index;	// 동일한 그림을 여러개 걸 수 있으므로 Index를 부여한다
		var _width = $(el).data('width');
		var _height = $(el).data('height');
		
		var img = new Image;
		img.onload = function() {
			// 불러올 이미지의 scale값 구하기
			var _1mm = _self._getPixelPerMm(info ? info.type : '');		
			var _scale, _top, _left;
			
			_scale = _width * _1mm / img.width;
			
			if (info) {
				// 정보가 넘어오면 넘어온 정보로 셋팅
				_top = info.top;
				_left = info.left;
			} else {
				_top = (_self.canvas[_self.cur_type].height - img.height * _scale) / 3; // 세로는 3분의 1지점
				_left = (_self.canvas[_self.cur_type].width - img.width * _scale) / 2; // 가로는 중앙
			}
						
			var opt = {
				width		: img.width,
				height		: img.height,
				scaleX		: _scale,
				scaleY		: _scale,
				top			: _top,//(_top < 0 ? 0 : _top),
				left		: _left,//(_left < 0 ? 0 : _left),
				shadow		: {
					color: 'rgba(1,1,1,0.7)',
					//nonScaling: true,
					blur: 3 / _scale,
					offsetX:2 / _scale,
					offsetY:2 / _scale
				},
				hasControls	: false,
				hasBorders	: false,
				hoverCursor	: 'move',
				dockey : dockey,
				originalKey : orikey,
				originalWidth : _width,
				pictureTitle : $(el).data('title'),
				artist : $(el).data('artist')
			};
			
			var filter = new fabric.Image.filters.Brightness({
		  		brightness: 0.05
			});
			
			
			if (info) {
				_self.picture[info.type][dockey] = new fabric.Image(img, opt);
				_self.picture[info.type][dockey].filters.push(filter);
				_self.picture[info.type][dockey].applyFilters();
				_self.canvas[info.type].add(_self.picture[info.type][dockey]);
				_self.canvas[info.type].renderAll();
			} else {
				_self.picture[_self.cur_type][dockey] = new fabric.Image(img, opt);
				_self.picture[_self.cur_type][dockey].filters.push(filter);
				_self.picture[_self.cur_type][dockey].applyFilters();
				_self.canvas[_self.cur_type].add(_self.picture[_self.cur_type][dockey]);
				_self.canvas[_self.cur_type].renderAll();
			}
		}
		img.src = $(el).attr('src');
	},
	
	_getPixelPerMm: function(type){
		var _self = this;
		var size_mm = _self.space_size[type ? type : _self.cur_type] * 10;
		return _self.canvas[type ? type : _self.cur_type].width / size_mm;
	},
	
	"change_edit_mode" : function(){
		
		var _self = this;
		$("#vr_gallery_make1_top").hide();
		$("#vr_gallery_make2").fadeIn();
		$("#vr_gallery_make3").fadeIn();
		
		_self.load_saved_image_info();

		var url = "/vr_info.mon?key=" + _self.call_key;
		
		$.ajax({
			url : url,
			datatype : "json",
			success : function(data){
				var tmpl = data.vr_template;
				var vr_info = data.vr_info;
				
				if (!tmpl || !vr_info || !vr_info.imagelist) return;
				
				_self.loadTemplate(tmpl, function(type){					
					_self.loadVRImage(type, vr_info.email, vr_info.imagelist);
				});
				_self.loadVRInfo(vr_info);
				
								
			},
			error : function(err){
				g360.gAlert("Info","VR갤러리 정보를 로드하는 과정에 오류가 발생하였습니다.", "blue", "top");
			}
		})
		
		
	},
	
	/**
	 * 수정시 필요한 함수 
	 */
	// 선택된 템플릿 로딩
	loadTemplate: function(data, callback){
		var _self = this;
		_self.selectCode = data.code;
		_self.space_size.f = parseInt(data.f);
		_self.space_size.l = parseInt(data.l);
		_self.space_size.r = parseInt(data.r);
		_self.space_size.b = parseInt(data.b);
		_self.initSpace(callback);
		
		$('.btn_vr_space').removeClass('on');
		$('#vr_space_f').addClass('on');
		$('#vr_space_f').click();
	},
	// 갤러리 정보 표시
	loadVRInfo: function(data){
		
		var _self = this;
		$("#vr_room_title").val(g360.textToHtml(data.title));
		$("#vr_room_express").val(g360.textToHtml(data.express));
		
		_self.music = data.bgmusic;
		if (_self.music != ""){
			var music_text = $("#" + data.bgmusic.replace('.', '\\.')).text();
			$("#music_select_box").text(music_text);
		}

	},
	// 이미지 표시
	loadVRImage: function(type, email, pics){
		var _self = this;
		$.each(pics, function(){			            
			var opt = {};
			opt.type = (this.ath == '0' ? 'f' : this.ath == '90' ? 'r' : this.ath == '180' ? 'b' : 'l');
			
			// 타입에 맞는것만 뿌려줌
			if (opt.type != type) return true;
			opt.top = this.oriTop;
			opt.left = this.oriLeft;
			
			
			var inx = this.filekey.lastIndexOf("_");
			var xemail = this.filekey.substring(0,inx);
			
			var imgsrc = g360.preview_img_path(xemail, this.filekey);

			var $el = $('<temp/>');
			$el.data('dockey', this.filekey)
				.data('width', this.oriWidth)
				.data('title', this.name)
				.attr('src', imgsrc);
			
			_self.selectPicture($el, opt);
		});
	},
	
	
	
	"open_vr" : function(key, templatecode){
		
	//	$("#vr_preview").empty();
		
		var url = "/vr/template_sample/" + templatecode + "/gallery360.jsp?key="+key+"&category="+templatecode+"&height=350px";
		gMakeVR.offsound();
		g360.LoadPage("vr_preview", url);
		//http://localhost:8080/vr/template/s1/gallery360.jsp?key=ygkim@nh.com_20180812164103_DKHQHSQ&category=s1
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
	
	
	
	
	"set_left_image_frame_scroll" : function(){
		var _self = this;
		
		// 즐겨찾기 InfiniteScroll 적용
		var $grid = $('#xcolumns');
		var $loader = $('#vr_left_frame .loading_wrapper');
		this.favo_controller = new ScrollMagic.Controller();
		this.favo_scene = new ScrollMagic.Scene({triggerElement:$loader.get(0), triggerHook:'onEnter', offset:-80})		
		.addTo(_self.favo_controller);
		this.favo_scene.on('enter', function(e) {
			if (_self.bottom_complete) return;
			if ($loader.hasClass('active')) return;
			_self.load_saved_image_info();	
		});
	},
	
	"check_reg_image_count" : function(){
		var url = g360.root_path + "/load_save_image_info.mon?start=0&perpage=1";		
		var cnt = 0;
		$.ajax({
			type : "GET",
			url : url,
			cache : false,
			async : false,
			contentType : "application/json; charset=utf-8",
			success : function(data){
				
				cnt = data[0].totalcount;
			},			
			error : function(e){
				g360.error_alert();
			}				
		});
		
		return cnt;
	},
	
	
	"load_saved_image_info" : function(){
		var start = gMakeVR.bottom_start;
		var perpage = gMakeVR.perpage;
		var url = g360.root_path + "/load_save_image_info.mon?start="+start+"&perpage="+perpage;
		url += "&" + new Date().getTime();
		
		var $loader = $('#vr_left_frame .loading_wrapper');
		$loader.addClass('active');
		$.ajax({
			type : "GET",
			url : url,
			contentType : "application/json; charset=utf-8",
			success : function(data){
				
				if (start == 0){
					$('#xcolumns').css('opacity', 0);
					$("#vr_left_frame").scrollTop(0);
					$('#xcolumns').masonry();
					
				}
				
				for (var i = 0 ; i < data.length; i++){
				//	gPAProjectlist.draw_art_list2(data[i], opt);
					if (data[i].totalcount) continue;
					var spl = data[i];
					gMakeVR.draw_image_display(spl, i);	
					
				}
				
				// 이미지 로딩이 완료되면 화면에 표시
				$('#xcolumns').imagesLoaded(function(){	
					$('#xcolumns').css('opacity', 1);
					$("#xcolumns").masonry('layout');
														
					gMakeVR.bottom_start = gMakeVR.bottom_start + gMakeVR.perpage;
					if (data.length-1 < gMakeVR.perpage) {
						gMakeVR.bottom_complete = true;
					}
				});
				$loader.removeClass('active');
			},
			error : function(){
				g360.error_alert();
				$loader.removeClass('active');
			}
		});		
	},
	
	"draw_image_display" : function(info){
		var _self = this;
		var html = "";
		var imgsrc = g360.preview_img_path(info.email, info.dockey);
		var _width = parseInt(info.art_width) * 10;
		var _height = parseInt(info.art_height) * 10;
		var _on = '';
		
		// 편집일 때만 선택되어 있는 작품인지를 체크
		if (_self.call_mode == "modify"){
			if (_self.hasPicture(info.dockey) != '') {
				_on = ' on';
			}
		}
	
		html += "<div class='grid-item col-lg-3 col-md-4 col-sm-4 col-6" + _on + "'>";
		html += "	<figure>";
		html += "		<a ><img draggable='false' class='preview-img' src='"+imgsrc+"' data-artist='" + info.art_artist.replace(/"|'/g,'') + "' data-title='" + info.art_title.replace(/"|'/g,'') + "' data-dockey='"+info.dockey+"' data-width='"+_width+"' data-height='" +_height+ "' data-ho='" +info.art_hosu+ "'></a>";
		html += "		<figcaption>";
		html += "		  <h2>"+info.art_title+"</h2>";
		html += "		  <em><img src='../img/btn-artwork-collect-normal.svg' ></em>";
		html += "		  <p>"+info.art_artist+"</p>";
		if (info.art_hosu == null){
			html += "		  <p class='text-muted'>"+info.art_height+" x "+info.art_width+"cm</p>";
		}else{
			html += "		  <p class='text-muted'>"+info.art_height+" x "+info.art_width+"cm("+info.art_hosu+"호)</p>";
		}
		
		html += "		</figcaption>";
		html += "  </figure>";
		html += "</div>";
		
		var $div = $(html);
		$("#xcolumns").append($div).masonry('appended', $div);
	},
		
	"modify_VR_ROOM" : function(){
		
		var _self = this;
		
		var pictures = [];
		$.each(_self.picture, function(ty, pics){
			$.each(pics, function(key, pic){
				var jsonpic = {
					'filekey'	: pic.originalKey,
					'ath'		: (ty == 'f' ? '0' : ty == 'r' ? '90' : ty == 'b' ? '180' : '270'), 
					'name'		: pic.pictureTitle,
					'artist'	: pic.artist,
		            'width'		: parseInt(pic.getScaledWidth() / _self.canvas[ty].width * 1000, 10),
		            'height'	: parseInt(pic.getScaledHeight() / _self.canvas[ty].height * 1000, 10),
		            'oriWidth'	: pic.originalWidth,
		            'oriLeft'	: pic.left,
		            'oriTop'	: pic.top,
		            'ox'		: (pic.left / _self.canvas[ty].width * 1000) - 500, 
		            'oy'		: (pic.top / _self.canvas[ty].height * 1000) - 500
				};
				
				pictures.push(jsonpic);
			});			
		});
				
		g360.loadingbar_open("VR갤러리를 수정하고 있습니다. 잠시만 기다려주세요");

		gMakeVR.title = $("#vr_room_title").val();
		gMakeVR.express = $("#vr_room_express").val();
		
		var data = JSON.stringify({
			changekey : gMakeVR.call_key,
			roomkey : gMakeVR.selectCode,
			bgmusic : gMakeVR.music,
			title : gMakeVR.title,
			express : gMakeVR.express,
			imagelist : pictures
		})
		
		var url = contextpath + "/modifyVR.mon";
		$.ajax({
			type : "Post",
			data : data,
			datatype : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){

				if (data.result == "OK"){
					//요청문서 key를 가지고 실제 VR Gallery를 생성한다.
					
					//요청문서 key를 가지고 실제 VR Gallery를 생성한다.
					var key = data.key;
					var category = data.category;
					
					var url = contextpath + "/makevr_new.action?key="+gMakeVR.call_key;
					$.ajax({
						datatype : "json",
						contentType : "application/json; charset=utf-8",
						url : url,
						success : function(data){		
							gMakeVR.uploadFrontImage(key, category);
						}
					})
					
					
					
					
//					var url = contextpath + "/makevr.action?key="+gMakeVR.call_key+"&category="+gMakeVR.call_code;
//					$.ajax({
//						url : url,
//						datatype : "json",
//						contentType : "application/json; charset=utf-8",
//						success : function(data){							
//							g360.LoadPage("body_content", g360.root_path + "/partner/vr_gallery/vr_main.jsp");
//							return false;
//						}
//					})
					
				}
			},
			error : function(e){
				g360.gAlert("Info","VR갤러리 생성시 오류가 발생하였습니다.", "blue", "top");
			}
		})
	},

	
	
	"make_VR_ROOM" : function(){
		
		gMakeVR.title = $("#vr_room_title").val();
		gMakeVR.express = $("#vr_room_express").val();
		
		if (gMakeVR.title == ""){
			g360.gAlert_focus("", "VR갤러리 제목을 입력하셔야 합니다.","","","vr_room_title");
			return false;
		}
		
		var _self = this;
				
		var pictures = [];
		$.each(_self.picture, function(ty, pics){
			$.each(pics, function(key, pic){
				var jsonpic = {
					'filekey'	: pic.originalKey,
					'ath'		: (ty == 'f' ? '0' : ty == 'r' ? '90' : ty == 'b' ? '180' : '270'), 
					'name'		: pic.pictureTitle, 
		            'width'		: parseInt(pic.getScaledWidth() / _self.canvas[ty].width * 1000, 10),
		            'height'		: parseInt(pic.getScaledHeight() / _self.canvas[ty].height * 1000, 10),
		            'oriWidth'	: pic.originalWidth,
		            'oriLeft'	: pic.left,
		            'oriTop'	: pic.top,
		            'ox'		: (pic.left / _self.canvas[ty].width * 1000) - 500, 
		            'oy'		: (pic.top / _self.canvas[ty].height * 1000) - 500
				};
				
				pictures.push(jsonpic);
			});			
		});
				
		g360.loadingbar_open("VR갤러리를 생성하고 있습니다. 잠시만 기다려주세요");

		
		
		
		var data = JSON.stringify({
			roomkey : gMakeVR.selectCode,
			bgmusic : gMakeVR.music,
			title : gMakeVR.title,
			express : gMakeVR.express,
			read : 0,
			like : 0,
			imagelist : pictures
		})
		
		var url = contextpath + "/makeVR_new.mon";
		$.ajax({
			type : "Post",
			data : data,
			datatype : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				//alert(data.result);
				if (data.result == "OK"){
					//요청문서 key를 가지고 실제 VR Gallery를 생성한다.
					var key = data.key;
					var category = data.category;
					
					var url = contextpath + "/makevr_new.action?key="+key;
					$.ajax({
						datatype : "json",
						contentType : "application/json; charset=utf-8",
						url : url,
						success : function(data){		
							gMakeVR.uploadFrontImage(key, category);
						}
					})
					
				}
			},
			error : function(e){
				g360.gAlert("Info","VR갤러리 생성시 오류가 발생하였습니다.", "blue", "top");
			}
		})
	},
	
	"hasPicture" : function(checkkey){
		// 남아있는 그림이 있는지 체크해서 좌측 그림에서 on 클래스 뺴기
		var _self = this;
		var has_picture = false;
		var location = [];
		$.each(_self.picture, function(key, val){
			$.each(this, function(){
				if (this.originalKey == checkkey) {
					if (key == 'f') {
						location.push('전면');
					} else if ('l') {
						location.push('좌측');
					} else if ('r') {
						location.push('우측');
					} else {
						location.push('후면');
					}
					//has_picture = true;
					return false;
				}
			});
		});

		if (location.length > 0) {
			return location.join(',');
		} else {
			return '';
		}
		
	},
	uploadFrontImage: function(dockey, roomkey){
		var _self = this;
		var blob = _self.dataURItoBlob(_self.canvas['f'].toDataURL({format:'jpeg'}));
		var fd = new FormData();
		fd.append('file', blob);	

		$.ajax({
			type: 'POST',
			url: g360.root_path + '/VRFrontImageUpload.gu?dockey='+dockey+"&roomkey="+roomkey,
			data: fd,
		//	dataType : "json",
		//	contentType : "application/json; charset=utf-8",
			processData: false,
			contentType : false,		  
			success: function(data){
				//이미지 정보
				var res = JSON.parse(data);
				g360.loadingbar_close();							
				g360.LoadPage("body_content", g360.root_path + "/partner/vr_gallery/vr_main.jsp");
				
			}
		});
	},
	
	
	
	dataURItoBlob: function(dataURI) {
		
	    var byteString;
	    if (dataURI.split(',')[0].indexOf('base64') >= 0)
	        byteString = atob(dataURI.split(',')[1]);
	    else
	        byteString = unescape(dataURI.split(',')[1]);

	    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

	    var ia = new Uint8Array(byteString.length);
	    for (var i = 0; i < byteString.length; i++) {
	        ia[i] = byteString.charCodeAt(i);
	    }
	    return new Blob([ia], {type:mimeString});
	}
	
}

