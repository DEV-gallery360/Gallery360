
function gMakeVrGallery_Rental(){	

	gMakeVR_Rental = this;
	
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
	
	//기본 페이징
	this.bottom_start = 0;
	this.perpage = 10;
	this.bottom_complete = false;
	
	//--------------------------------
	
	// 편집시 이미지 로딩관련 처리
	this.target_cnt = 0;
	this.loaded_cnt = 0;
	
	// VR대관 1개당 개수 제한
	this.limit_cnt = 30;
	
	//검색할 내용 & select box 종류
	this.txt = "";
	this.sel_ch = "";
	
	this.gg = 0;
	this.check_1 = "main";
	
	//검색시 페이징
	this.search_dis_start = 0;
	this.search_complete = false;
	
	this.complete_2 = true;
}

gMakeVrGallery_Rental.prototype = {		

	"init" : function(){
		console.clear();
		
		// ------------------------------------
//		console.log(gMakeVR_Rental.call_key);
//		
//		var data1 = JSON.stringify({
//			dockey : gMakeVR_Rental.call_key
//		})
//		
//		$.ajax({
//			url:g360.root_path+"/get_imageList.mon",
//			type:"POST",
//			data: data1,
//			contentType: "application/json",
//			success:function(){
//				
//			},
//			error: function(){
//				alert("gMakeVR_Rental.init 에러");
//			}
//		})
		// ------------------------------------
		
		//검색창 placeholder 내용 변경
		$('#list_search_txt').attr("placeholder", "검색하실 "+g360.rental_text.tab2+"의 이름을 입력해 주세요.");
		
		$('#sel_ch').change(function(){
			gMakeVR_Rental.sel_ch = $('#sel_ch').val();
			
			if(gMakeVR_Rental.sel_ch=="1"){
				$('#list_search_txt').attr("placeholder", "검색하실 "+g360.rental_text.tab2+"의 이름을 입력해 주세요.");
			}else if(gMakeVR_Rental.sel_ch=="2"){
				$('#list_search_txt').attr("placeholder", "검색하실 "+g360.rental_text.tab1+"를(을) 입력해 주세요.");
			}
		})
		
		
		//검색클릭
		$('#sekbun').on('click',function(e){
			var txt = $('#list_search_txt').val();
			$("#refresh_1").show();
			$(".img_no_result").hide();
			gMakeVR_Rental.search_reset_1(txt);
			
		});

		//엔터(Enter)
		$('#list_search_txt').on('keydown', function(e){
			var txt = $(this).val();
			
			if (e.keyCode == 13) {	
				$("#refresh_1").show();
				$(".img_no_result").hide();
				gMakeVR_Rental.search_reset_1(txt);
			}
		});
		
		//새로고침 (전체보기)
		$("#refresh_1").on("click", function(event){
			
			gMakeVR_Rental.complete_2 = false;
			
			//검색 초기화
			$("#list_search_txt").val("");
			//내용 초기화
			$("#xcolumns").html(""); 
			$("#refresh_1").hide();
			$(".img_no_result").hide();
			
			$("#xcolumns").show();
			
			gMakeVR_Rental.bottom_complete = false;
			gMakeVR_Rental.bottom_start = 0;
			
			gMakeVR_Rental.load_saved_image_info();
			
			
		});
		
//----------------------------------------------------------------------------------------
		
		var _self = this;	
		
		if (_self.call_mode == "modify"){
			g360.loadingbar_open('VR갤러리를 불러오는 중입니다')
			_self.change_edit_mode();
			$("#vr_room_create").hide();
			$("#vr_room_modify").show();
		}else{
			_self.loadTemplateList();
			
			$("#vr_room_modify").hide();
		}
		
		//이벤트
		_self._eventBind();
	},
	
	"search_reset_1" : function(txt){ 
		
	//검색할 때 이전 프로토타입 변수들을 '초기화' 시켜주어야한다.
		console.log("search_reset_1");
		
		gMakeVR_Rental.txt = $.trim(txt);
		
		if(gMakeVR_Rental.txt==""){
			//아무것도 검색 안했을때 결과x
		}else{
			//$("#xcolumns").html(""); >> append 초기화
			
			$("#xcolumns").html(""); 
			gMakeVR_Rental.bottom_complete = false;
			gMakeVR_Rental.search_dis_start = 0;
			
			$("#xcolumns").show();
			
			gMakeVR_Rental.search_dis();				
		}
		
	},
	
	"search_dis" : function(){
		
		if(gMakeVR_Rental.sel_ch==""){
			gMakeVR_Rental.sel_ch="1"; //1은 제목
		}


		var _self = this;
		gMakeVR_Rental.check_1 = "search";
		var start = gMakeVR_Rental.search_dis_start;
		
		console.log("search_dis");
		console.log(start);
		
		var url = "/load_save_image_info_rental_search.mon?start="+start+"&perpage="+gMakeVR_Rental.perpage+"&sel_ch="+gMakeVR_Rental.sel_ch+"&search="+encodeURIComponent(gMakeVR_Rental.txt);
		url += "&" + new Date().getTime();
		
		
		//this._eventBind();
		var $loader = $('#vr_left_frame .loading_wrapper');
		$loader.addClass('active');
		
		
		
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				//debugger;
				if (start == 0){
					$('#xcolumns').css('opacity', 0);			
					$('#xcolumns').mCustomScrollbar("scrollTo","top");
//					$('#vr_left_frame').mCustomScrollbar("scrollTo","top");
//					
//					$('#mCSB_8_container').css('opacity', 0); //제한
//					$("#group-vr-list-02").scrollTop(0); //늘어남
					
					_self.set_left_image_frame_scroll();
					
				}

				console.log("검색 총갯수 : "+data[0].totalcount);
				
				if(data[0].totalcount==0){
					$("#xcolumns").hide();
					$(".img_no_result").show();
					return;
				}
				
				for (var i = 0 ; i < data.length; i++){
				//	i가 0일때
					if (data[i].totalcount) continue;
				//	0이 아닐때	
					var spl = data[i];
					gMakeVR_Rental.draw_image_display(spl, i);	
					
				}

				// 이미지 로딩이 완료되면 화면에 표시
				$('#xcolumns').imagesLoaded(function(){	
					//debugger;
					$('#xcolumns').css('opacity', 1);
					$("#xcolumns").masonry('reloadItems');
					$("#xcolumns").masonry('layout'); 
					//$("#mCSB_3_container").masonry('reloadItems');


					gMakeVR_Rental.search_dis_start = gMakeVR_Rental.search_dis_start + gMakeVR_Rental.perpage;
					
					$loader.removeClass('active');
					
					if (data.length-1 < gMakeVR_Rental.perpage) {
						gMakeVR_Rental.bottom_complete = true;
					}
								
				});
				
			},
			error : function(){
				g360.error_alert();
				$loader.removeClass('active');
			}
		})
		
		
	},
	
	_eventBind: function(){
		var _self = this;
		
		$("#back_vr_gallery_main").on("click", function(event){
			gMakeVR_Rental.bottom_start = 0;
			gRen.navBtnAction('main', 'vr');
		//	g360.LoadPage("body_content", g360.root_path + "/partner/vr_gallery/vr_main.jsp");
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
			
			
			// 개수 제한걸기
			var img_cnt = _self.getAllImageCount();
			
			
			
			if (img_cnt >= _self.limit_cnt) {
				g360.gAlert("Info","VR 1개당 " + _self.limit_cnt + "작품까지 전시가 가능합니다.", "blue", "top");
				return;
			}
			
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
			var cnt = gMakeVR_Rental.check_reg_image_count();
			
			if (cnt == 0){				
				g360.gAlert("Info","등록된 작품이 1개 이상 존재해야  VR갤러리를 생성하실 수 있습니다.", "blue", "top");
				return false;
			}
			
			
			if (gMakeVR_Rental.selectCode == ""){
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
			
			gMakeVR_Rental.load_saved_image_info();
			
			// 공간 선택
			_self.initSpace();
			$('.btn_vr_space').removeClass('on');
			$('#vr_space_f').addClass('on');
			$('#vr_space_f').click();
			
			// 스크롤이동
			var scroll = $('#vr_gallery_make2').offset().top - ($('#header').height() + $('.sub_header').height()) - 10;
			$('html').scrollTop(0);
			console.log(scroll);//136
			$('html').stop().animate({scrollTop : scroll}, 500);
		});
		
		
		
		// VR 공간 버튼
		$('.vrgallery_space .btn_vr_space').on('click', function(){
			$('.btn_vr_space').removeClass('on');
			$(this).addClass('on');
			var type = $(this).attr('id').split('_')[2];
			_self.selectTemplate(type);
		});
		
		// <,> 버튼
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
			
			
			var pictures = [];
			$.each(gMakeVR_Rental.picture, function(ty, pics){
				$.each(pics, function(key, pic){
					var jsonpic = {
						'filekey'	: pic.originalKey	
					};					
					pictures.push(jsonpic);
				});			
			});
			
			
			if (pictures.length == 0){
				g360.gAlert("", "최소 1개 이상의 작품을 전시하셔야 합니다.","","");
				return false;
			}
			
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
		
		//마지막 단계 - 생성, 수정버튼
		$("#vr_room_create").on("click", function(event){
			if (!g360.login_check()) {
				g360.login_window_max();
				$("#p_login").click();
				return;
			}
			
			
			if (g360.UserInfo.role != "admin"){
				if (g360.UserInfo.rental_vr <= g360.UserInfo.rental_use_count){
					g360.gAlert("Info","생성 가능 VR개수("+ g360.UserInfo.rental_vr +")를 초과하였습니다.<br>서비스 등급을 업그레이드 하시거나 이전 VR을 삭제 하셔야 합니다.", "blue", "top");
					return false;
				}
			}
			
			
			
			var ky = $("#vr_gallery_make3").get(0).style.display;
			if (ky != "none"){
				gMakeVR_Rental.make_VR_ROOM();
			}else{
				g360.gAlert("Info","VR갤러리 생성 프로세스를 완료하고 생성하기 버튼을 클릭해 주세요", "blue", "top");
				return false;
			}
			
		});
		
		
		$("#vr_room_modify").on("click", function(event){
			gMakeVR_Rental.modify_VR_ROOM();
		});
		
		$("#vr_room_cancel").on("click", function(event){
			g360.gConfirm("현재까지 작업된 내용은 저장되지 않습니다\n계속 진행할까요?", function(){
				gMakeVR_Rental.bottom_start = 0;
				gRen.navBtnAction('main', 'vr');
				//g360.LoadPage("body_content", g360.root_path + "/partner/vr_gallery/make_vr_gallery.jsp");
			});
			return false;
		});
		
		$("#vr_room_manual").on("click", function(evnet){
			g360.popup_manual("vrgallery_create");
			return false;
		});
		
		$(".dropdown-menu .dropdown-item").on("click", function(event){
			if (gMakeVR_Rental.music == event.currentTarget.id) return;
			
			gMakeVR_Rental.music = event.currentTarget.id;
			$("#music_select_box").text(event.currentTarget.text);
			
			var music_src = '/vr/vr/xml/add_hotspot/sound/' + gMakeVR_Rental.music;
			
			// 미리듣기 버튼 표시
			if (gMakeVR_Rental.music != '') {
				$('#vrgallery_pre_listen').removeClass('hidden');
				$('#pre_audio').attr('src', music_src);
				$('#vrgallery_pre_listen').text('배경음악 미리듣기');
			} else {
				$('#vrgallery_pre_listen').addClass('hidden');
				$('#pre_audio').attr('src', '');
			}
		});
		
		$('#vrgallery_pre_listen').on('mouseenter', function(){
			if ($('#pre_audio').attr('src') != '') {
				$('#pre_audio').get(0).play();
				$('#vrgallery_pre_listen').text('미리듣기 재생중');
			}
		});
		$('#vrgallery_pre_listen').on('mouseleave', function(){
			if ($('#pre_audio').attr('src') != '') {
				$('#pre_audio').get(0).pause();
				$('#vrgallery_pre_listen').text('일시정지');
			}			
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
		
		//_self.set_left_image_frame_scroll();
	},
		
	// 생성시 전체 템플릿 로드
	loadTemplateList: function(){
		
		
		var _self = this;
		var $list = $('#vr_gallery_template_list');
		var _url =  '/load_VRRoom_info_rental.mon?code=' + (g360.UserInfo.custom == 'T' ? g360.UserInfo.email : '');
		
		$.ajax({
			url : _url,
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
	
			_self.canvas[val].on('object:scaling',function(e){ //크기조정
				$('#deleteBtn').remove(); 
			});
			_self.canvas[val].on('object:moving',function(e){ 
				$('#deleteBtn').remove(); 
			});
			_self.canvas[val].on('object:rotating',function(e){ //회전
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
		    	$('#gallery_art_count').text(_self.getAllImageCount());
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
			
			console.log(_self.bg_wrap[type].width());
			
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
	    var btnLeft = x-15;
	    var btnTop = y-15;
	    var deleteBtn = '<img id="deleteBtn" src="../img/btn_picture_deleted.png" class="deleteBtn" style="position:absolute;top:'+btnTop+'px;left:'+btnLeft+'px;cursor:pointer;width:30px;height:30px;"/>';
	    $(canvas.wrapperEl).append(deleteBtn);
	    
	},
	"selectPicture" : function(el, info, def){
		var _self = this;
		
		$(el).closest('.grid-item').addClass('on');
				
		_self.picture_index++;
		var orikey = $(el).data('dockey');
		var dockey = $(el).data('dockey') + '_' + _self.picture_index;	// 동일한 그림을 여러개 걸 수 있으므로 Index를 부여한다
		var _width = $(el).data('width');
		var _height = $(el).data('height');
		var _imgscale = $(el).data('scale');
		var _version = $(el).data('version');
		
		
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
				if (!isNaN(_imgscale)) {
					_scale = _imgscale;
				}
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
				
				//hasControls	: false,
				
				//작품 크기 자율 조정
				hasControls	: true,
				hasRotatingPoint : false,
				transparentCorners : false,
				cornerColor : 'rgba(207,32,118,1)',
				lockUniScaling : true,
				lockScalingFlip : true,
				//minScaleLimit : 0.1,
				
				hasBorders	: false,
				hoverCursor	: 'move',
				dockey : dockey,
				originalKey : orikey,
				originalWidth : _width,
				pictureTitle : $(el).data('title') + '',
				artist : $(el).data('artist') + '',
				artistEng : $(el).data('artisteng') + '',
				version : _version
			};
			
			var filter = new fabric.Image.filters.Brightness({
		  		brightness: 0.05
			});
			
			
			if (info) {
				_self.picture[info.type][dockey] = new fabric.Image(img, opt);
				
				_self.picture[info.type][dockey].setControlsVisibility({
					mt: false,
					ml: false,
					mr: false,
					mb: false
				});
				
				//크롬에서 그림자가 표시되지 않는 문제로 필터를 추가하였으나 chrome84에서 fix되어 필터 제거함
				//필터를 하는 경우 사이즈 큰 이미지 표시할 때 짤리는 문제 생김
				//_self.picture[info.type][dockey].filters.push(filter);
				//_self.picture[info.type][dockey].applyFilters();
				_self.canvas[info.type].add(_self.picture[info.type][dockey]);
				_self.canvas[info.type].renderAll();
				
				// 편집시 데이터 불러올 때 로딩 중 이미지 표시
				_self.loaded_cnt++;
				_self.loadImageCheck();
				
				def.resolve(true);
			} else {
				_self.picture[_self.cur_type][dockey] = new fabric.Image(img, opt);
				
				_self.picture[_self.cur_type][dockey].setControlsVisibility({
					mt: false,
					ml: false,
					mr: false,
					mb: false
				});
				
				//_self.picture[_self.cur_type][dockey].filters.push(filter);
				//_self.picture[_self.cur_type][dockey].applyFilters();
				_self.canvas[_self.cur_type].add(_self.picture[_self.cur_type][dockey]);
				_self.canvas[_self.cur_type].renderAll();
				
				def.resolve(true);
			}

			// 전시된 작품 개수 표시
			$('#gallery_art_count').text(_self.getAllImageCount());
			
			
		}
		
		// 로딩중 오류나는 이미지도 카운트 처리
		img.onerror = function(){
			if (info) {
				_self.loaded_cnt++;
				_self.loadImageCheck();				
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

		var url = "/vr_info_rental.mon?key=" + _self.call_key;

		$.ajax({
			url : url,
			datatype : "json",
			success : function(data){

				var tmpl = data.vr_template;
				if (g360.UserInfo.custom == "T"){
					tmpl = data.vr_template[0];
				}
				
				var vr_info = data.vr_info;
				
				if (!tmpl || !vr_info || !vr_info.imagelist) {
					g360.loadingbar_close();
					return;
				}
				
				// 로드되야 하는 이미지 개수
				_self.target_cnt = vr_info.imagelist.length;
				
				var def = $.Deferred();
				_self.loadTemplate(tmpl, function(type){					
					//오른쪽 vr이미지 로드  > 여기서 이미지 순서체크
					_self.loadVRImage(type, vr_info.email, vr_info.imagelist, def);
					
				});
				
				// vr음악,...등등
				_self.loadVRInfo(vr_info);	

				def.then(
					function(data){
						//console.log(data);
						
						//왼쪽 이미지 로드 > loadVRInfo가 다 완료되어야만 이미지 체크표시가 생략되지 않는다.
						_self.load_saved_image_info();
						
					}	
				);
				
			},
			error : function(err){
				g360.gAlert("Info","VR갤러리 정보를 로드하는 과정에 오류가 발생하였습니다.", "blue", "top");
				g360.loadingbar_close();
			}

		});
		
		
	},
	
	
	/**
	 * ==================================================================================================
	 * 
	 * 수정시 필요한 함수
	 * 
	 *  ==================================================================================================
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
		$('#vrgallery_pre_listen').text('배경음악 미리듣기');
		
		_self.music = data.bgmusic;
		if (_self.music != ""){
			var music_text = $("#" + data.bgmusic.replace('.', '\\.')).text();
			$("#music_select_box").text(music_text);
			
			var music_src = '/vr/vr/xml/add_hotspot/sound/' + _self.music;
			
			// 미리듣기 버튼 표시
			$('#vrgallery_pre_listen').removeClass('hidden');
			$('#pre_audio').attr('src', music_src);
		} else {
			$('#vrgallery_pre_listen').addClass('hidden');
			$('#pre_audio').attr('src', '');
		}

	},
	// 이미지 표시
	"loadVRImage" : function(type, email, pics, def){
		
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
			
			var imgsrc = g360.preview_img_path(xemail, this.filekey, this.version);
			
			var $el = $('<temp/>');
			$el.data('dockey', this.filekey)
				.data('width', this.oriWidth)
				.data('scale', this.scale)
				.data('title', this.name)
				.data('artist', this.artist)
				.data('artisteng', this.artist_eng)
				.data('version', this.version)
				.attr('src', imgsrc);
			
			_self.selectPicture($el, opt, def);
		});
	},
	
	
	
	"open_vr" : function(key, templatecode){
		
	//	$("#vr_preview").empty();
		
		var url = "/vr/template_sample/" + templatecode + "/gallery360.jsp?key="+key+"&category="+templatecode+"&height=350px";
		gMakeVR_Rental.offsound();
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
	
	
	
	//스크롤 시 메서드작동
	"set_left_image_frame_scroll" : function(){
		var _self = this;
		
//		console.log("오나??");
		// 즐겨찾기 InfiniteScroll 적용
		var $grid = $('#xcolumns');
		var $loader = $('#vr_left_frame .loading_wrapper');
		this.favo_controller = new ScrollMagic.Controller();
		this.favo_scene = new ScrollMagic.Scene({triggerElement:$loader.get(0), triggerHook:'onEnter', offset:-80})		
		.addTo(_self.favo_controller);
		
		this.favo_scene.on('enter', function(e) {
			
//			//search_dis 페이지 안넘어 가는 이유.... 여기까지는 오는데..
//			console.log("오나22");
//			//둘다 false가 나와야 반복된다.
//			console.log(_self.bottom_complete);
//			console.log($loader.hasClass('active'));
			
			if (_self.bottom_complete) return;
			if ($loader.hasClass('active')) return;
			
			if(gMakeVR_Rental.check_1 == "main"){
				_self.load_saved_image_info();		
				
			}else if(gMakeVR_Rental.check_1 == "search"){
				_self.search_dis();
				
			}
			
			
		});
	},
	
	//일반 출력의 총 개수
	"check_reg_image_count" : function(){
		var url = g360.root_path + "/load_save_image_info_rental.mon?start=0&perpage=1";		
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
		
		$("#sel_ch option:nth-child(1)").text(g360.rental_text.tab2);
		$("#sel_ch option:nth-child(2)").text(g360.rental_text.tab1);
		
		var _self = this;
		var start = gMakeVR_Rental.bottom_start;
		var perpage = gMakeVR_Rental.perpage;
		gMakeVR_Rental.check_1 = "main";
		
		console.log(start);
		
		var url = g360.root_path + "/load_save_image_info_rental.mon?start="+start+"&perpage="+perpage;
		
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
					
					_self.set_left_image_frame_scroll();
				}

				console.log("기본 총 갯수 : "+data[0].totalcount);
				
				
				for (var i = 0 ; i < data.length; i++){
				//	gPAProjectlist.draw_art_list2(data[i], opt);
					if (data[i].totalcount) continue;
					var spl = data[i];
					gMakeVR_Rental.draw_image_display(spl, i);	
					
				}
				
			

				// 이미지 로딩이 완료되면 화면에 표시
				$('#xcolumns').imagesLoaded(function(){	
					console.log("imagesLoaded");
					
					$('#xcolumns').css('opacity', 1);
					//$("#xcolumns").masonry('layout');
					$("#xcolumns").masonry('reloadItems');
					$("#xcolumns").masonry('layout');
					
					gMakeVR_Rental.bottom_start = gMakeVR_Rental.bottom_start + gMakeVR_Rental.perpage;
					
					$loader.removeClass('active');
					
					if (data.length-1 < gMakeVR_Rental.perpage) {
						gMakeVR_Rental.bottom_complete = true;
					}
				});
				
				//complete말고 promise로 해볼까
				
				
			},
			error : function(){
				g360.error_alert();
				$loader.removeClass('active');
			},
			complete : function(){
				//gMakeVR_Rental.bottom_start가 0이 아닌 10일때부터  gMakeVR_Rental.picture을 불러와서 에러 발생 
				//... picture이 어디서 생성되는지 못찾겠음

//				if(gMakeVR_Rental.bottom_start==10){
//					//debugger;
//					if(gMakeVR_Rental.complete_2){
//						setTimeout(function(){
//							$("#refresh_1").click();
//						}, 100);
//					}
//				}
				
			}
		});	
		
	},
	
	"draw_image_display" : function(info,i){
		
//		gMakeVR_Rental.gg++;
//		console.log(gMakeVR_Rental.gg);
//		console.log(i);
//		console.log(info);
//		console.log("---------------");
		
		var _self = this;
		var html = "";

		var imgsrc = g360.preview_img_path(info.email, info.dockey);
		imgsrc = imgsrc + "?open&ver=" + info.version;
		
		var _width = parseInt(info.art_width) * 10;
		var _height = parseInt(info.art_height) * 10;
		var _on = '';
		
		if (isNaN(_width)) _width = 1000;
		if (isNaN(_height)) _height = 1000;
		
		// 편집일 때만 선택되어 있는 작품인지를 체크
		if (_self.call_mode == "modify"){
			if (_self.hasPicture(info.dockey) != '') {
				_on = ' on';
			}
		}
	
		var artist_name = '';
		var artist_name_eng = '';
		if (info.art_artist) artist_name = info.art_artist.replace(/"|'/g,'');
		if (info.art_artist_eng) artist_name_eng = info.art_artist_eng.replace(/"|'/g,'');
		
		
		html += "<div class='grid-item col-lg-3 col-md-4 col-sm-4 col-6" + _on + "'>";
		html += "	<figure>";
		html += "		<a ><img draggable='false' class='preview-img' src='"+imgsrc+"' data-artist='" + artist_name + "' data-artisteng='" + artist_name_eng + "' data-title='" + info.art_title.replace(/"|'/g,'') + "' data-dockey='"+info.dockey+"' data-width='"+_width+"' data-height='" +_height+ "' data-ho='" +info.art_hosu+ "' data-version='" + info.version + "'></a>";
		html += "		<figcaption>";
		html += "		  <h2>"+info.art_title+"</h2>";
		html += "		  <em><img src='../img/btn-artwork-collect-normal.svg' ></em>";
		html += "		  <p>"+info.art_artist+"</p>";
		
		if (info.art_height && info.art_width) {
			if (info.art_hosu == null){
				html += "		  <p class='text-muted'>"+info.art_height+" x "+info.art_width+"cm</p>";
			}else{
				html += "		  <p class='text-muted'>"+info.art_height+" x "+info.art_width+"cm("+info.art_hosu+"호)</p>";
			}			
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
					'name'		: pic.pictureTitle + '',
					'artist'	: pic.artist,
					'artist_eng': pic.artistEng,
		            'width'		: parseInt(pic.getScaledWidth() / _self.canvas[ty].width * 1000, 10),
		            'height'	: parseInt(pic.getScaledHeight() / _self.canvas[ty].height * 1000, 10),
		            'oriWidth'	: pic.originalWidth,
		            'oriLeft'	: pic.left,
		            'oriTop'	: pic.top,
		            'ox'		: (pic.left / _self.canvas[ty].width * 1000) - 500, 
		            'oy'		: (pic.top / _self.canvas[ty].height * 1000) - 500,
		            'scale'		: pic.scaleX,
		            'version'	: pic.version || 0
				};
				
				pictures.push(jsonpic);
			});			
		});
		
		if (pictures.length == 0){
			g360.gAlert("", "최소 1개 이상의 작품을 전시하셔야 합니다.","","");
			return false;
		}
				
		g360.loadingbar_open("VR갤러리를 수정하고 있습니다. 잠시만 기다려주세요");

		gMakeVR_Rental.title = $("#vr_room_title").val().replace(/"/g, "＂");
		gMakeVR_Rental.express = $("#vr_room_express").val();
		
		var data = JSON.stringify({
			changekey : gMakeVR_Rental.call_key,
			roomkey : gMakeVR_Rental.selectCode,
			bgmusic : gMakeVR_Rental.music,
			title : gMakeVR_Rental.title,
			express : gMakeVR_Rental.express,
			imagelist : pictures
		})
		
		var url = contextpath + "/modifyVR_rental.mon";
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
					
					var url = contextpath + "/makevr_new_rental.action?key="+gMakeVR_Rental.call_key + "&custom=" + g360.UserInfo.custom;
					
					
					$.ajax({
						datatype : "json",
						contentType : "application/json; charset=utf-8",
						url : url,
						success : function(data){		
							gMakeVR_Rental.uploadFrontImage(key, category);
						}
					})
					
				
				}
			},
			error : function(e){
				g360.gAlert("Info","VR갤러리 생성시 오류가 발생하였습니다.", "blue", "top");
			}
		})
	},

	
	
	"make_VR_ROOM" : function(){
		
		gMakeVR_Rental.title = $("#vr_room_title").val().replace(/"/g, "＂");
		gMakeVR_Rental.express = $("#vr_room_express").val();
		
		if (gMakeVR_Rental.title == ""){
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
					'name'		: pic.pictureTitle + '',
					'artist'	: pic.artist,
					'artist_eng': pic.artistEng,
		            'width'		: parseInt(pic.getScaledWidth() / _self.canvas[ty].width * 1000, 10),
		            'height'	: parseInt(pic.getScaledHeight() / _self.canvas[ty].height * 1000, 10),
		            'oriWidth'	: pic.originalWidth,
		            'oriLeft'	: pic.left,
		            'oriTop'	: pic.top,
		            'ox'		: (pic.left / _self.canvas[ty].width * 1000) - 500, 
		            'oy'		: (pic.top / _self.canvas[ty].height * 1000) - 500,
		            'scale'		: pic.scaleX,
		            'version'	: pic.version || 0
				};
				
				pictures.push(jsonpic);
			});			
		});
		
		if (pictures.length == 0){
			g360.gAlert("", "최소 1개 이상의 작품을 전시하셔야 합니다.","","");
			return false;
		}
				
		g360.loadingbar_open("VR갤러리를 생성하고 있습니다. 잠시만 기다려주세요");

		
		var data = JSON.stringify({
			roomkey : gMakeVR_Rental.selectCode,
			bgmusic : gMakeVR_Rental.music,
			title : gMakeVR_Rental.title,
			express : gMakeVR_Rental.express,
			read : 0,
			like : 0,
			imagelist : pictures
		})
		
		var url = contextpath + "/makeVR_new_rental.mon";
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
					
					
					g360.UserInfo.rental_use_count = data.count;
					
					var url = contextpath + "/makevr_new_rental.action?key="+key + "&custom=" + g360.UserInfo.custom;
					
				
					
					$.ajax({
						datatype : "json",
						contentType : "application/json; charset=utf-8",
						url : url,
						success : function(data){		
							gMakeVR_Rental.uploadFrontImage(key, category);
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
		
		//console.log(checkkey);
		//console.log(gMakeVR_Rental.picture);
		//console.log(Object.keys(gMakeVR_Rental.picture).length);
		
		
		$.each(gMakeVR_Rental.picture, function(key, val){
			//val 은 해당 vr에 걸려있는 작품들 정보 (& 위치정보)
			
//			console.log(val);
//			console.log(Object.keys(val).length);

			//각 f,b,r,l의 작품들  //this==val //key== f,b,r,l
			$.each(this, function(){
				
				if (this.originalKey == checkkey) {
					
					if (key == 'f') {
						location.push('전면');
					} else if (key == 'l') {
						location.push('좌측');
					} else if (key == 'r') {
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
				
				g360.gAlert("Info", "VR갤러리가 정상적으로 생성 되었습니다.<br>등록된 VR은 대관 메인에서 확인 하실 수 있습니다." , "blue", "top");
				
				g360.LoadPage("body_content", g360.root_path + "/rental/make_vr_gallery.jsp");
				
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
	},
	
	loadImageCheck: function(){
		// 편집인 경우 전체 이미지가 완료될때까지 로딩중인 이미지를 띄운다
		if (this.target_cnt == this.loaded_cnt) {
			g360.loadingbar_close();
			//gMakeVR_Rental.complete_1 = true;
		} else {
			g360.loadingbar_open('전시 작품을 불러오는 중입니다. ' + this.loaded_cnt + '/' + this.target_cnt);
		}				
	},
	
	// 전시된 작품 수 가져오기
	getAllImageCount: function(){
		var img_cnt = 0;
		
		$.each(this.picture, function(ty, pics){
			$.each(pics, function(key, pic){
				img_cnt++;
			});
		});
		
		return img_cnt;
	}
	
}

