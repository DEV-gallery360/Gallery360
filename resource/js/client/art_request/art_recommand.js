
function gArtRecommandMain(){	
	gArtRecommand = this;
	
	gArtRecommand.space_reg_key = '';
	gArtRecommand.space_reg_filename = '';
	gArtRecommand.space_reg_name = '';
	gArtRecommand.space_reg_size = '';
	gArtRecommand.shape_type = '';
	
	gArtRecommand.last_select_img_path = '';
	gArtRecommand.last_select_img_size = '';
	gArtRecommand.prepend_id = "x";
	
	gArtRecommand.open_type = "new";   //new 신규 작성일 경우 , edit 편집일 경우
	gArtRecommand.edit_dockey = "";
}

gArtRecommandMain.prototype = {		

	"init" : function(){
		if(g360.g_lang.Lang != "ko"){
			//$("#art_price .r_label").css('width', '107px !important');
			$('.r_label').attr('style', 'width: 120px; !important');
			$('.r_label').text("x 10,000 KRW");
		}
		
		var _self = this;
		g360.scroll_Top();
		
		$("#art_req").on("click", function(event){
			g360.history_record("art_req");
			
			g360.LoadPage("body_content", g360.root_path + "/client/art_request/art_request.jsp");
			return false;
		});
		
		
		$("#art_recom").on("click", function(event){
			g360.history_record("art_recom");
			
			g360.LoadPage("body_content", g360.root_path + "/client/art_request/art_recommand.jsp");
			return false;
		});
		
		$("#art_request_submit").on("click", function(event){
						
			if (!g360.login_check()) {
				g360.login_window_max();
				$("#p_login").click();
				return;
			}
			
			gArtRecommand.uploadForm();
		});
		
		
		$("#art_request_auto_recommend").on("click", function(event){
			gArtRecommand.AI_Search_Query();
			return false;
		});
	
		
		
		$(".btn-group.flex-line.svg-30 .btn.btn-outline-w-b").on("click", function(){
			var uu = $(".btn-group.flex-line.svg-30 .btn.btn-outline-w-b.active");
			for (var i = 0 ; i < uu.length; i++){
				$(uu[i]).removeClass("active");
			}
			
			if (this.className.indexOf("active") >-1){
				$(this).removeClass("active");
			}else{
				$(this).addClass("active");
			}
		})
		
		
		$("#art_price").blur(function(){
			var price = parseInt($(this).val().replace(/,/gi,"")) * 10000;
			if(g360.g_lang.Lang == "ko"){
				price = g360.comma(g360.setWon(price));				
			}else{
				price = g360.comma(price);
				price = "￦ "+price;
			}
			
			$("#art_price_dis2").text("‘"+price+"’");
		});
		
		$("#art_price").keyup(function(event){
			if(event.which >= 37 && event.which <= 40) return;
			  // format number
			  $(this).val(function(index, value) {
			    return value
			    .replace(/\D/g, "")
			    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
			    ;
			  });
			
		});
		
		
		g360.wrap_calendar("req_date", "select_date_req");
		
		

		/**
		 * 내 공간 등록
		 */
		$('#' + _self.prepend_id + 'btn_space_reg').on('click', function() {
			if ($('#' + _self.prepend_id + 'space_reg_wrapper').is(':visible')) {return;}
			if (g360.login_check()) {
				$('#' + _self.prepend_id + 'space_reg_img').css('background-image', '');
				$('#' + _self.prepend_id + 'space_reg_img').addClass('no-img');
				$('#' + _self.prepend_id + 'space_reg_name').val('');
				$('#' + _self.prepend_id + 'space_reg_size').val('');
				$('#' + _self.prepend_id + 'space_reg_wrapper').show();				
			} else {
				g360.login_window_max();
				$("#p_login").click();
			}
		});
		
		/**
		 * 내 공간 등록 - (사진 선택)
		 */
		$('#' + _self.prepend_id + 'space_reg_img').on('click', function(){
			// 작가 사진 편집
			$('#layer_image_file').off('change').on('change', function(){
				var options = {
					imgId:'img_myspace',
					width:300,
					height:180,
					resultSize:{width:1050},
					resultType:'base64',
					uploadWaiting:true, // 바로 업로드 되지 않도록 설정
					onUploadStart: function(data){
						_self.timeout_id = setTimeout(function(){g360.loadingbar_open(g360.g_lang.Art_Detail_Alert0);}, 2000);
					},
					onUploadComplete: function(res){
						_self.space_reg_image_base64 = res;
						
						$('#' + _self.prepend_id + 'space_reg_img').css('background-image', 'url(' + res + ')');
						$('#' + _self.prepend_id + 'space_reg_img').removeClass('no-img');
						
						clearTimeout(_self.timeout_id);
						g360.loadingbar_close();
					}
				}
				g360.readFileImage(this, options);
				
			});
			$('#layer_image_file').click();
		});
		
		// 내 공간 등록 (저장)
		$('#' + _self.prepend_id + 'btn_space_reg_save').on('click', function(){
			// validation 체크
			var _name = $.trim($('#' + _self.prepend_id + 'space_reg_name').val()).replace(/\s+/g, ' ');
			var _size = $('#' + _self.prepend_id + 'space_reg_size').val().replace(/\s*/g, '');
			$('#' + _self.prepend_id + 'space_reg_name').val(_name);
			$('#' + _self.prepend_id + 'space_reg_size').val(_size);
			
			if (_name.replace(/\s*/g, '') == '') {
				g360.gAlert("Error",g360.g_lang.Art_Detail_Alert3, "red", "left");
				$('#' + _self.prepend_id + 'space_reg_name').focus();
				return false;
			}
			
			if (_name.length > 10) {
				g360.gAlert("Error",g360.g_lang.Art_Detail_Alert4, "red", "left");
				$('#' + _self.prepend_id + 'space_reg_name').focus();
				return false;
			}
			
			// 사진넓이
			if (/[^\d]/g.test(_size)) {
				g360.gAlert("Error",g360.g_lang.Art_Detail_Alert5, "red", "left");
				$('#' + _self.prepend_id + 'space_reg_size').focus();
				return false;
			}
			
			// 유효범위 지정
			var _size_int = parseInt(_size, 10);
			if (_size_int < 100 || _size_int > 2000) {
				g360.gAlert("Error",g360.g_lang.Art_Detail_Alert6, "red", "left");
				$('#' + _self.prepend_id + 'space_reg_size').focus();
				return false;
			}
			
			// 이미지 선택되었는지 체크
			if ($('#' + _self.prepend_id + 'space_reg_img').hasClass('no-img')) {
				g360.gAlert("Error",g360.g_lang.Art_Detail_Alert7, "red", "left", function(){
					$('#' + _self.prepend_id + 'space_reg_img').click();
				});
				return false;
			} 
					
			// 업로드 로직 수행
			g360.loadingbar_open(g360.g_lang.HangingArt_26);
			
			var bodytext = _self.space_reg_image_base64.replace("data:image/jpeg;base64,","");
			var data = JSON.stringify({
				ImageId : 'myspace',
				ImageBody : bodytext
			});
			
			
			var res = $.ajax({
				type :'POST',
				url	:'/ImageUploadBase64.gu?key='+g360.UserInfo.email,
				data : data ,
				dataType:'json',
				contentType : "application/json; charset=utf-8"
			}).then(function success(data){
				
				if (data.result == "OK" && data.filename){
					_self.space_reg_filename = data.filename;
					_self.space_reg_key = ((new Date()).getTime()).toString(16);
					_self.space_reg_name = _name;
					_self.space_reg_size = _size;
					_self.addMyspace();						
				}else{
					g360.gAlert("Error",g360.g_lang.Art_Detail_Alert9, "red", "left");
				}
				g360.loadingbar_close();
			}, function fail(data){
				g360.gAlert("Error",g360.g_lang.Art_Detail_Alert9, "red", "left");
				g360.loadingbar_close();
			});
		});
		
		/**
		 * 내 공간 등록 - (취소)
		 */
		$('#' + _self.prepend_id + 'btn_space_reg_cancel').on('click', function(){
			$('#' + _self.prepend_id + 'space_reg_name').val('');
			$('#' + _self.prepend_id + 'space_reg_size').val('');
			_self.space_reg_key = '';
			_self.space_reg_filename = '';
			_self.space_reg_name = '';
			_self.space_reg_size = '';
			$('#' + _self.prepend_id + 'space_reg_wrapper').hide();
		});
		
		
		$('#xmy_request_template').owlCarousel({
		    dots: ($("#xmy_request_template .item").length > 1) ? true: false,
		    loop:($("#xmy_request_template .item").length > 1) ? true: false,
			nav: true,
			navContainer: '#xmy_request_template_nav',
			navText: ['', ''],
		//	dots: false,
			autoWidth: true,
			margin: 9,
			//mouseDrag: false,
			slideBy: 3,
			items: 5,
			onlyLeftDirection: true,

		});
			
		// 형태
		$('#request_shape_wrapper .dropdown-item').on('click', function() {
			var $this = $(this);
			$this.closest('.dropdown-menu').removeClass('show');
			if ($this.hasClass('active')) return false;
			
			$('#request_shape_wrapper .dropdown-item').removeClass('active');
			$(this).addClass('active');
			$('#btn_request_shape').text($this.text());
			var _type = $this.data('shape');
			_self.shape_type = _type;
			
			// 사이즈 로딩
			_self._sizeLoad();
			$('#btn_request_size').removeClass('disabled');
			
			// 사이즈가 선택되어 있던 경우에는 액자 형태 변경
			if (_self.size_type != null) {
				$('#request_size_wrapper').find('a[data-ho="' + _self.size_type + '"]').click();
				//_self._displaySize();
			}
			return false;
		});
		/////////////////////////////////////////////////////////////////////
		
		$("#art_recommend_manual_menu").on("click", function(event){
			
			
			g360.popup_manual_normal("art_recommend");
			return false;
		});
		
		gArtRecommand.init_myspace();
		
		g360.AI_Recommand("recommand_rec_slider");
	
		this.g_lang();
	},
	
	"g_lang" : function(){
		
		$(".g_lang_Mypage17").html(g360.g_lang.Mypage17);
		$(".g_lang_Artwork_Recom1").html(g360.g_lang.Artwork_Recom1);
		$(".g_lang_Artwork_Recom2").html(g360.g_lang.Artwork_Recom2);
		$(".g_lang_Artwork_Recom3").html(g360.g_lang.Artwork_Recom3);
		
		$(".g_lang_Artwork_Recom4").attr("placeholder",g360.g_lang.Artwork_Recom4);
		$(".g_lang_Artwork_Recom5").attr("placeholder",g360.g_lang.Artwork_Recom5);
		
		$(".g_lang_Name_of_space").html(g360.g_lang.Name_of_space);
		$(".g_lang_Width_of_space").html(g360.g_lang.Width_of_space);
		
		$(".g_lang_Save").html(g360.g_lang.Save);
		$(".g_lang_Cancel").html(g360.g_lang.Cancel);
		$(".g_lang_Shape").html(g360.g_lang.Shape);
		$(".g_lang_Square").html(g360.g_lang.Square);
		$(".g_lang_Horizontal").html(g360.g_lang.Horizontal);
		$(".g_lang_Vertical").html(g360.g_lang.Vertical);
		$(".g_lang_Size1").html(g360.g_lang.Size1);
		
		$(".g_lang_Artwork_Recom6").html(g360.g_lang.Artwork_Recom6);
		$(".g_lang_Artwork_Recom7").html(g360.g_lang.Artwork_Recom7);
		$(".g_lang_Artwork_Recom7_1").html(g360.g_lang.Artwork_Recom7_1);
		$(".g_lang_Artwork_Recom7_2").html(g360.g_lang.Artwork_Recom7_2);
		
		$(".g_lang_Artwork_Recom8").html(g360.g_lang.Artwork_Recom8);
		$(".g_lang_Artwork_Recom8_1").html(g360.g_lang.Artwork_Recom8_1);
		$(".g_lang_Artwork_Recom8_2").html(g360.g_lang.Artwork_Recom8_2);
		
		$(".g_lang_Artwork_Recom9").html(g360.g_lang.Artwork_Recom9);
		$(".g_lang_Artwork_Recom10").html(g360.g_lang.Artwork_Recom10);
		$(".g_lang_Artwork_Recom11").html(g360.g_lang.Artwork_Recom11);
		$(".g_lang_Artwork_Recom12").html(g360.g_lang.Artwork_Recom12);
		
		$(".g_lang_MySpace").html(g360.g_lang.MySpace);
		$(".g_lang_Register").html(g360.g_lang.Register);
		$("#req_date").attr("value",g360.g_lang.Artwork_Recom13);
		
	},
	
	
	
	"edit_init" : function(id){
		var _self = this;
		gArtRecommand.edit_dockey = id;
		var url = g360.root_path + "/select_project_info.mon?id=" + id;
		$.ajax({
			type : "GET",
			cache : false,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				
				
				$("#req0").val(g360.textToHtml(data.request_title));
				$("#req1").val(g360.textToHtml(data.request_memo));
				$("#art_price").val(data.request_price);
				
				var ty = data.request_type;
				if (ty == "1"){
					$("#btn_request_shape:first-child").text(g360.g_lang.Square);
					_self.shape_type = "square";
				}else if (ty == "2"){
					$("#btn_request_shape:first-child").text(g360.g_lang.Horizontal);
					_self.shape_type = "horizontal";
				}else if (ty == "3"){
					$("#btn_request_shape:first-child").text(g360.g_lang.Vertical);
					_self.shape_type = "vertical";
				}
				
				$("#btn_request_size:first-child").text(data.request_hosu + "호");
				_self.size_type = data.request_hosu;
				
				$("#req_date").val(data.request_date);
				
				
				
				gArtRecommand.last_select_img_path = data.request_selectimg_path;
				gArtRecommand.last_select_img_size = data.request_selectimg_size;
				
//				if (data.request_selectimg_path != ""){
//					var info = {
//							id : "xdis_img",
//							size : data.request_selectimg_size,
//							url : data.request_selectimg_path
//						};
//					gArtRecommand._imageLoad(info);
//				}
				
				
				//$("$req_select_img")
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	
	
	
	
	
	
	
	
	
	
	"AI_Search_Query" : function(){
		var drawid = "auto_recommand";
		var text = $("#req0").val() + " " + $("#req1").val();
		var height = $("#art_height").val();
		var width = $("#art_width").val();
		var price = $("#art_price").val();
		
		showid = "recommand_draw_top";
		g360.AI_Search_Recommand(showid, drawid, text, height, width, price);
	},
	

    
    "dropzoneExists" : function(selector){
    	 var elements = $(selector).find('.dz-clickable');
         return elements.length > 0;
    },
	
	
	//내공간 이미지 등록하기 (DB저장)
	"addMyspace" :function(){
		var _self = this;
		gArtRecommand.space_reg_key = ((new Date()).getTime()).toString(16);
		
	
		var data = JSON.stringify({
			space_key : gArtRecommand.space_reg_key,
			space_name : gArtRecommand.space_reg_name,
			space_size : gArtRecommand.space_reg_size,
			filename : gArtRecommand.space_reg_filename,
		});
		
		
		var url = g360.root_path + "/myspace_image_upload.mon";
		$.ajax({
			type : "Post",
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				var new_space = gArtRecommand._xgetTmplHtml({
					space_key	: gArtRecommand.space_reg_key,
					filename : gArtRecommand.space_reg_filename,
					space_name: gArtRecommand.space_reg_name,
					space_size: gArtRecommand.space_reg_size
				});
				$('#xmy_request_template').trigger('add.owl.carousel', [new_space, 0]).trigger('refresh.owl.carousel').trigger('to.owl.carousel', [0, 10]);
				
				// 초기화
				$('#' + _self.prepend_id + 'space_reg_name').val('');
				$('#' + _self.prepend_id + 'space_reg_size').val('');
				gArtRecommand.space_reg_key = '';
				gArtRecommand.space_reg_filename = '';
				gArtRecommand.space_reg_name = '';
				gArtRecommand.space_reg_size = '';
				
				
				$('#xspace_reg_wrapper').hide();				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	
	
	
	"init_myspace" : function(){
		var _self = this;
		var url = g360.root_path + "/myspace_image_list.mon";
		url += "?" + new Date().getTime();
		$.ajax({
			type : "Get",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				
				var _idx = -1;
				
				for (var i = data.length-1 ; i >= 0 ; i--){
					var space_info = data[i];
					var _html = "";
					_html += gArtRecommand._xgetTmplHtml(space_info);				
					_idx++;
					
					//console.log(_html);

					$('#xmy_request_template').trigger('add.owl.carousel', [_html, _idx]).trigger('refresh.owl.carousel');
				}		
				
				
				//gArtRecommand.select_img($('#xmy_request_template').find('.space_tmpl:eq(0)')); //.click();
				//$('#xmy_request_template').find('.myroom:last').addClass('mylast');
			},
			error : function(e){
				g360.error_alert();
			}
		});
		
		
		this.bg_wrap = $('#request_bg_wrapper');
		this.bg_wrap.append('<canvas id="request_bg_canvas"></canvas>');
		
		//this.canvas = new fabric.Canvas('request_bg_canvas');
		//this.canvas.hoverCursor = 'default';
		//this.canvas.selection = false;
		
		this.canvas = new fabric.Canvas('request_bg_canvas', {
			selection : false,
			hoverCursor : 'default',
			allowTouchScrolling : true
		});
		
		// 모바일에서 터치 스크롤이 동작되도록 처리
		this.canvas.on('mouse:down', function(e){
			var active_obj = _self.canvas.getActiveObject();
			if (active_obj) {
				_self.canvas.allowTouchScrolling = false;
			}
		});
		this.canvas.on('mouse:up', function(e){
			_self.canvas.allowTouchScrolling = true;
		});
		
		
		// 윈도우 사이즈 변경시 처리
		$(window).off('resize.recommand.myspace').on('resize.recommand.myspace', function(){
			clearTimeout(_self.resize_id);
			_self.resize_id = setTimeout(function(){_self._refreshSpace();}, 500);
		});
	},
	
	"_xgetTmplHtml" : function(space_info, i){
		var _html = "";
		var _url = g360.myspace_img_path(g360.UserInfo.email, space_info.filename);
		var _thumb = g360.myspace_thumbnail_img_path(g360.UserInfo.email, space_info.filename);
		var _html = '<div class="xspace_tmpl item myroom"' +
			' data-space-id="' + space_info.space_key + '"' +
			' data-space-size="' + space_info.space_size + '"' +
			' data-space-url="' + _url + '" onclick=\"gArtRecommand.select_img(this); return false;\">' +
			'<img src="' + _thumb + '"><span><em>' + space_info.space_name + '</em>' +
			"<button type='button' onclick=\"gArtRecommand.xmyspace_delete('"+space_info.space_key+"');\" class='btn btn_thm_delete2 ico'>삭제</button>" +
			'</span>' +
			'</div>';
		
		return _html;
	},
	
	"select_img" : function(obj){
		
		var _self = this;
		var $this = $(obj);
		if ($this.hasClass('on')) {
			// 선택이 취소되어야 한다(TODO);
			$this.removeClass('on');
			$("#pic_xroom").hide();
			_self.last_select_img_path = '';
			_self.last_select_img_size = '';
			return;
		}
		
		
		var space_info = _self.getSpaceInfo($this);
		
		// 이전 선택된 공간 처리
		if (_self.selectedSpaceId != null) {
			var _before_el = $('#xmy_request_template').find('[data-space-id="' + _self.selectedSpaceId + '"]');
			if (_before_el.length) {
				_before_el.removeClass('on');
			}
		}
		
		// 선택된 공간 처리
		_self.selectedSpaceId = space_info.id;
		$this.addClass('on');
		$("#pic_xroom").show();
		$('#pic_xsize').text(space_info.size + 'cm');
		
		_self.space_size = space_info.size;
		_self.last_select_img_path = space_info.url;
		_self.last_select_img_size = space_info.size;
		
		// URL 불러오기
		_self._imageLoad(space_info);
		
		
		//선택한 이미지가 기존에 선택된 상태이명 선택 취소한다.
		
		/*
		$('#xmy_request_template').find('.xspace_tmpl').each(function(index){
			if ($(obj).attr("data-space-id") !=  $(this).attr("data-space-id")){
				$(this).removeClass("on");
			}			
		});
		
		var sel = obj.className;
		if (sel.indexOf("on") > -1){
			$(obj).removeClass("on");
			$("#pic_xroom").hide();
			$("#pci_ximg").attr("src", "");
			$("#pic_xsize").text("mm");
			
			gArtRecommand.last_select_img_path = '';
			gArtRecommand.last_select_img_size = '';
		}else{
			
			$(obj).addClass("on");
			$("#pic_xroom").show();
			
			var img_url = $(obj).attr("data-space-url");
			var size = $(obj).attr("data-space-size");
			
			$("#pci_ximg").attr("src", img_url);
			$("#pic_xsize").text(size + "mm");
			
			gArtRecommand.last_select_img_path = img_url;
			gArtRecommand.last_select_img_size = size;
		}
		
		*/
		return false;
		
	
	},
	
	"xmyspace_delete" : function(id){
		var e = event || window.event;
		e.stopPropagation();
		e.preventDefault ? e.preventDefault() : (e.returnValue = false);
		
		g360.gConfirm(g360.g_lang.Art_Detail_Alert2, function(){
			var url = g360.root_path + "/myspace_image_remove.mon?space_key=" + id;
			url += "&" + new Date().getTime();
			$.ajax({
				type : "GET",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(data){
					var _idx = $('#xmy_request_template').find('.myroom[data-space-id="' + id + '"]').parent('.owl-item').index();
					$('#xmy_request_template').trigger('remove.owl.carousel', _idx).trigger('refresh.owl.carousel');
				},
				error : function(e){
					g360.error_alert();
				}
			})
		});
	},
	
	
	
	
	"uploadForm" : function(){
		var _self = this;	
		
		
		/*
		var sh = $("#type_select .btn.btn-outline-w-b.active");
		for (var j = 0 ; j < sh.length; j++){
			var sx = sh[j].attributes.data.nodeValue;
			if (request_type == ""){
				request_type = sx;
			}else{
				request_type += " " + sx;
			}
		}
		*/
		
		var request_title = $.trim($("#req0").val());
		var request_memo = $.trim($("#req1").val());
		var request_price =  $.trim($("#art_price").val());
		var request_date =  $.trim($("#req_date").val());    ///$("#select_date_req").text().replace(/\'/gi,"");
	
		var request_email = g360.UserInfo.email;
		var request_nickname = g360.UserInfo.nickname;
		
		
		
		//Validation 체크
		if (request_title == '') {

			g360.gAlert_focus("Error",g360.g_lang.Artwork_request_Alert6, "red", "left", "req0");
			return;
		}
		if (request_memo == '') {

			g360.gAlert_focus("Error",g360.g_lang.Artwork_request_Alert7, "red", "left","req1");
			return;
		}
		if (!_self.shape_type) {

			g360.gAlert("Error",g360.g_lang.Artwork_request_Alert8, "red", "left");
			return;
		}
		if (!_self.size_type) {
			g360.gAlert("Error",g360.g_lang.Artwork_request_Alert11, "red", "left");
			return;
		}
		if (request_price == '') {	
			g360.gAlert_focus("Error",g360.g_lang.Artwork_request_Alert12, "red", "left", "art_price");
			return;
		}
		if (isNaN(request_price.replace(/,/g, ''))) {
			g360.gAlert_focus("Error",g360.g_lang.Artwork_request_Alert13, "red", "left","art_price");
			return;
		}
		if (request_date == '배송 날짜 선택') {
			g360.gAlert("Error",g360.g_lang.Artwork_request_Alert14, "red", "left");
			return;
		}
		
		var request_type = (_self.shape_type == 'square' ? '1' : _self.shape_type == 'horizontal' ? '2' : '3');
		var request_width = Math.round((FRAME_SIZE[_self.size_type][request_type == '1' ? 'S' : 'F'][request_type == '3' ? 'h' : 'w']) / 10);
		var request_height = Math.round((FRAME_SIZE[_self.size_type][request_type == '1' ? 'S' : 'F'][request_type == '3' ? 'w' : 'h']) / 10);
		var request_hosu = _self.size_type;
		
	
	
		var data = "";
		if (gArtRecommand.open_type == "edit"){
			data = JSON.stringify({
				request_title : request_title,
				request_type : request_type,
				request_memo : request_memo,
				request_width : request_width,
				request_height : request_height,
				request_price : parseInt(request_price.replace(/,/gi,"")),
				request_date : request_date,
			
				request_selectimg_path : gArtRecommand.last_select_img_path,
				request_selectimg_size : gArtRecommand.last_select_img_size,
			
				request_hosu : request_hosu,
				edit_dockey : gArtRecommand.edit_dockey,
				mode : "edit"
			
			});
		}else{
			data = JSON.stringify({
				request_title : request_title,
				request_type : request_type,
				request_memo : request_memo,
				request_width : request_width,
				request_height : request_height,
				request_price : parseInt(request_price.replace(/,/gi,"")),
				request_date : request_date,
				request_email : request_email,
				request_nickname : request_nickname,
				request_selectimg_path : gArtRecommand.last_select_img_path,
				request_selectimg_size : gArtRecommand.last_select_img_size,
			
				request_hosu : request_hosu,
				request_status : "1",
				request_subform : "1",      //1 : 추천 요청  / 2 : 제작요청
				mode : "new"
			});
		}
		
//		var data = JSON.stringify({
//			request_title : request_title,
//			request_type : request_type,
//			request_memo : request_memo,
//			request_width : request_width,
//			request_height : request_height,
//			request_price : parseInt(request_price.replace(/,/gi,"")),
//			request_date : request_date,
//			request_email : request_email,
//			request_nickname : request_nickname,
//			request_selectimg_path : gArtRecommand.last_select_img_path,
//			request_selectimg_size : gArtRecommand.last_select_img_size,
//		
//			request_hosu : request_hosu,
//			request_status : "1",
//			request_subform : "1"      //1 : 추천 요청  / 2 : 제작요청
//		});
		
		var url = g360.root_path + "/art_request_save.mon";
		$.ajax({
			type : "Post",
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){

				g360.gAlert("Info",g360.g_lang.Artwork_request_Alert15, "blue", "top");
				$('#btn_requestArt').click();
				//gArtRecommand.empty_fields();
			//	_this.draw_init();
			},
			error : function(e){
				g360.error_alert();
				
			}
		})
		
		
		
	},
	
	"empty_fields" : function(){
		
		var uu = $(".btn-group.flex-line.svg-30 .btn.btn-outline-w-b.active");
		for (var i = 0 ; i < uu.length; i++){
			$(uu[i]).removeClass("active");
		}
		
		$("#req1").val("");
		$("#req0").val("");
		$("#art_width").val("");
		$("#art_height").val("");
		$("#art_price").val("");
		$("#select_date_req").text("");
		$("#req_date").val(g360.g_lang.Artwork_Recom13);
		
		$('#xmy_request_template').find('.xspace_tmpl').each(function(index){
			
				$(this).removeClass("on");
						
		});

	},
	
	"cancel_all" : function(){
		
		
		g360.LoadPage("body_content", g360.root_path + "/partner/art_upload/art_upload.jsp");
		return false;
		/*
		var uu = $(".btn-group.flex-line .btn.btn-outline-w-b.active"); 
		for (var i = 0 ; i < uu.length; i++){
			$(uu[i]).removeClass("active");
		}
		
		var uu = $(".btn-group.flex-line.svg-30 .btn.btn-outline-w-b.active");
		for (var i = 0 ; i < uu.length; i++){
			$(uu[i]).removeClass("active");
		}
		
		var uu = $(".btn-group.flex-line.svg-60 .btn.btn-outline-w-b.active");
		for (var i = 0 ; i < uu.length; i++){
			$(uu[i]).removeClass("active");
		}
		
		$("#chk1").prop("checked", false);
		$("#chk2").prop("checked", false);
		
		$("#a_title").val("");
		$("#art_year_select").val("");
		$("#art_s1").val("");
		$("#art_s2").val("");
		$("#art_s3").val("");
		$("#art_s4").val("");
		$("#art_s5").val("");
		$("#art_s6").val("");
		$("#art_s7").val("");
		$("#art_s8").val("");
		$("#a_artist").val("");
		$("#art_s9").val("");
		
		$("#radio1").prop("checked",true);
		*/
		
	},
	
	_sizeLoad: function(){
		var _self = this;
		var _html = '';
		
		function _makeHtml(ho, w, h) {
			w = Math.round(w / 10);
			h = Math.round(h / 10);
			var html = '';
			if(g360.g_lang.Lang == "ko"){
				html = '<a class="dropdown-item" href="#" data-ho="' + ho + '" data-ho_en ="h' + h + 'cm x w' + w + 'cm">' + ho + '호 (h' + h + 'cm x w' + w + 'cm)</a>';
			}else{
				html = '<a class="dropdown-item" href="#" data-ho="' + ho + '" data-ho_en ="h' + h + 'cm x w' + w + 'cm"> h' + h + 'cm x w' + w + 'cm </a>';
			}
				
			return html;
		}
		
		$.each(FRAME_SIZE, function(_key, _val) {
			if (_self.shape_type == 'square') {
				// 정방형
				if (this.S != null) {
					_html += _makeHtml(_key, this.S.w, this.S.h);
				}
			} else if (_self.shape_type == 'horizontal') {
				// 가로형
				_html += _makeHtml(_key, this.F.w, this.F.h);
			} else {
				// 세로형
				_html += _makeHtml(_key, this.F.h, this.F.w);
			}
		});
		
		
		var $menu_layer =  $('#request_size_wrapper');
		var $menu = $menu_layer.find('.dropdown-menu');
		$menu.html(_html);
		$menu_layer.find('.dropdown-toggle').dropdown();
		
		// 액자 선택
		$menu.on('click', 'a', function(){
			$menu.removeClass('show');
			if ($(this).hasClass('active')) return false;
			
			$menu.find('a').removeClass('active');
			$(this).addClass('active');
			var ho = $(this).data('ho');
			var ho_en = $(this).data('ho_en');
			var _shape, _w, _h;
			_self.size_type = ho;
			_self._createFrame();

			$('#request_size_text').text(g360.g_lang.Artwork_Recom6_1+' \'' + $('#btn_request_shape').text() + ' ' + $(this).text() + '\' '+g360.g_lang.Artwork_Recom6_2);

			if(g360.g_lang.Lang == "ko"){
				$('#request_size_text_m').text($(this).text().split(' (')[1].replace(/[()]/g, ''));
				$('#btn_request_size').text(ho+'호');				
			}else{
				$('#btn_request_size').text(ho_en);
			}
			return false;
		});
		
		$menu.on('mouseover', 'a', function(){
			if ($(this).hasClass('active')) return;
			if (_self.picture) return;
			
			$menu.find('a').removeClass('active');
			$(this).addClass('active');
			var ho = $(this).data('ho');
			var ho_en = $(this).data('ho_en');
			_self.size_type = ho;
			_self._createFrame();
			
			$('#request_size_text').text(g360.g_lang.Artwork_Recom6_1+' \'' + $('#btn_request_shape').text() + ' ' + $(this).text() + '\' '+g360.g_lang.Artwork_Recom6_2);
			
			if(g360.g_lang.Lang == "ko"){
				$('#request_size_text_m').text($(this).text().split(' (')[1].replace(/[()]/g, ''));
				$('#btn_request_size').text(ho+'호');				
			}else{
				$('#btn_request_size').text(ho_en);
			}
			
					
		});
	},
	_getPixelPerMm: function(){
		var _self = this;
		var size_mm = _self.space_size * 10;
		return _self.canvas.width / size_mm;
	},
	_createFrame: function() {
		var _self = this;
		if (_self.selectedSpaceId == null) return;
		if (!_self.shape_type || !_self.shape_type) return;
		
		var _w, _h, ho = _self.size_type;
		if (_self.shape_type == 'square') {
			_w = FRAME_SIZE[ho]['S'].w;
			_h = FRAME_SIZE[ho]['S'].h;
		} else if (_self.shape_type == 'horizontal') {
			_w = FRAME_SIZE[ho]['F'].w;
			_h = FRAME_SIZE[ho]['F'].h;
		} else {
			_w = FRAME_SIZE[ho]['F'].h;
			_h = FRAME_SIZE[ho]['F'].w;
		}
		var frame_size = {
			width:_w,
			height:_h,
		};
		
		
		var _1mm = _self._getPixelPerMm(),
			_width = Math.round(frame_size.width * _1mm),  
			_height = Math.round(frame_size.height * _1mm);
		
		if (_self.picture_frame == null) {
			var _top = (_self.canvas.height - _height) / 3; // 세로는 3분의 1지점
			var _left = (_self.canvas.width - _width) / 2; // 가로는 중앙
			_self.picture_frame = new fabric.Rect({
		       left			: frame_size.left ? frame_size.left : _left,
		       top			: frame_size.top ? frame_size.top : _top,
		       width		: _width,
		       height		: _height,
		       hasControls	: false,
		       hasBorders	: false,
		       hoverCursor	: 'move',
		       fill			: 'rgba(1,1,1,.2)',
		       stroke		: '#191919',
		       strokeWidth	: 3,
		       noScaleCache	: false,
		       objectCaching: false
			});
		    _self.canvas.add(_self.picture_frame);
		    _self.canvas.renderAll();
		} else {
			var _duration = 300;
			var ori_width = _self.picture_frame.width;
			var ori_height = _self.picture_frame.height;
			var ori_top = _self.picture_frame.top;
			var ori_left = _self.picture_frame.left;
			_self.picture_frame.animate('width', _width, {
				duration: _duration,
				onChange: function() {
					_self.picture_frame.left = ori_left + ((ori_width - _self.picture_frame.width) / 2); 
					_self.canvas.renderAll();
				}
			});
			_self.picture_frame.animate('height', _height, {
				duration: _duration,
				onChange: function() {				
					_self.picture_frame.top = ori_top + ((ori_height - _self.picture_frame.height) / 2); 
					_self.canvas.renderAll();
				}
			});
		}
	},
	_displaySize: function(){
		var _self = this;
		var ho = _self.size_type;
		var _w, _h;
		if (_self.shape_type == 'square') {
			_w = FRAME_SIZE[ho]['S'].w;
			_h = FRAME_SIZE[ho]['S'].h;
		} else if (_self.shape_type == 'horizontal') {
			_w = FRAME_SIZE[ho]['F'].w;
			_h = FRAME_SIZE[ho]['F'].h;
		} else {
			_w = FRAME_SIZE[ho]['F'].h;
			_h = FRAME_SIZE[ho]['F'].w;
		}
		console.log(_h + 'cm X ' + _w + 'cm');
	},
	getSpaceInfo:function(el){
		return {
			id : el.data('space-id'),
			size : el.data('space-size'),
			url : el.data('space-url')
		};
	},
	// 배경 이미지 캔버스에 로딩
	_imageLoad:function(info, callback){
		
		var _self = this;
		var img = new Image;
		img.src = info.url;
		img.onload = function() {
			_self.bg_img = new fabric.Image(img);
			_self.bg_img.selectable = false;
			
			var _bg_w = Math.ceil(_self.bg_wrap.width());
			_self._bg_scale = _bg_w / img.width;
			var _bg_h = Math.ceil(img.height * _self._bg_scale);
			
			// wrapper 사이즈 설정
			//_self.bg_wrap.width(_bg_w);
			//_self.bg_wrap.height(_bg_h);
			var _calc_h = $(window).height() - (_self.bg_wrap.position().top + 20 + 20 + 85);
			//_self.bg_wrap.height(_calc_h);
			_self.bg_wrap.height(_bg_h);
			_self.bg_img.scale(_self._bg_scale);
					
			
			//_self.canvas.clear();
			//_self.group = null;
			_self.canvas.setDimensions({
	            width: _bg_w,
	            height: _bg_h
	        });
			
			_self.canvas.setBackgroundImage(_self.bg_img);			
			_self._createFrame();
			
			if (callback) callback();
		}		
	},
	_refreshSpace:function(){
		var _self = this;
		
		if ($('#request_bg_wrapper').length == 0) return;
		var before_width = _self.canvas.width;
		var elBg = $('.xspace_tmpl.on', '#xmy_request_template');
		var space_info = _self.getSpaceInfo(elBg);
		
		_self._removePictureFrame();
		_self._imageLoad(space_info);
	},
	_removePictureFrame: function(){
		var _self = this;
		if (_self.picture_frame) {
			_self.canvas.remove(_self.picture_frame);
			_self.picture_frame = null;
		}
	},
}

