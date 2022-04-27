function gArtDetail(){	
	this.other_cnt = 20;
	this.cur_art_info = "";
	this.prepend_id = "detail_art_";
	this.audio = null;
	this.wrapper = $('#art_view_section');
	

}

gArtDetail.prototype = {		

	"init" : function(id){
		var _self = this;
		$('#detail_popup').scrollTop(0);

		// 내공간 셋팅
		this.initMySpace();
		
		// 작품 정보 가져오기
		this.getArtInfo(id);
		
		// 이벤트 바인드
		this._eventBind();
		
		// 구글 통계 데이터 생성
		var link_path = g360.getLinkPath('link_art', id);
		gtag('config', window.gtagkey, {'page_location':link_path});
		
		this.g_lang();
	},

	"g_lang" : function(){
		
		$(".g_lang_Added_Cart").html(g360.g_lang.Added_Cart);
		$(".g_lang_Goto_MyCart").html(g360.g_lang.Goto_MyCart);
		$(".g_lang_Sound").html(g360.g_lang.Sound);
		$(".g_lang_Video").html(g360.g_lang.Video);
		$(".g_lang_Youtube").html(g360.g_lang.Youtube);
		$(".g_lang_Link").html(g360.g_lang.Link);
		
		$(".g_lang_Ethereum_1").html(g360.g_lang.Ethereum_1);
		$(".g_lang_Artist_Name").html(g360.g_lang.Artist_Name);
		$(".g_lang_Make_Year").html(g360.g_lang.Make_Year);
		$(".g_lang_Genre").html(g360.g_lang.Genre);
		$(".g_lang_Ingredient").html(g360.g_lang.Ingredient);
		$(".g_lang_Art_Code").html(g360.g_lang.Art_Code);
		$(".g_lang_Buy_Original").html(g360.g_lang.Buy_Original);
		$(".g_lang_Buy_Image").html(g360.g_lang.Buy_Image);
		$(".g_lang_Frame").html(g360.g_lang.Frame);
		$(".g_lang_Size").html(g360.g_lang.Size);
		$(".g_lang_Shipping_Fee").html(g360.g_lang.Shipping_Fee);
		$(".g_lang_Shipping_Method").html(g360.g_lang.Shipping_Method);
		$(".g_lang_Type").html(g360.g_lang.Type);
		$(".g_lang_Size1").html(g360.g_lang.Size1);
		$(".g_lang_Purchase").html(g360.g_lang.Purchase);
		$(".g_lang_MyCollection").html(g360.g_lang.MyCollection);
		$(".g_lang_Cart").html(g360.g_lang.Cart);
		$(".g_lang_Work_Inquiry").html(g360.g_lang.Work_Inquiry);
		
		$(".g_lang_Sale_Price").html(g360.g_lang.Sale_Price);
		$(".g_lang_Name_of_space").html(g360.g_lang.Name_of_space);
		$(".g_lang_Width_of_space").html(g360.g_lang.Width_of_space);
		
		$(".g_lang_Arts_Work_Detail0").html(g360.g_lang.Arts_Work_Detail0);
		$(".g_lang_Artswork_Introduction").html(g360.g_lang.Artswork_Introduction);
		$(".g_lang_Artist_Introduction").html(g360.g_lang.Artist_Introduction);
		$(".g_lang_Another_Artwork").html(g360.g_lang.Another_Artwork);
		$(".g_lang_Shipping_Information").html(g360.g_lang.Shipping_Information);
		
		$(".g_lang_VR_viewing").html(g360.g_lang.VR_viewing);
		$(".g_lang_My_Space_Reg").html(g360.g_lang.My_Space_Reg);
		$(".g_lang_Save").html(g360.g_lang.Save);
		$(".g_lang_Cancel").html(g360.g_lang.Cancel);
		$(".g_lang_Reason_Recommend").html(g360.g_lang.Reason_Recommend);
		$(".g_lang_See_Artist_Info").html(g360.g_lang.See_Artist_Info);
		$(".g_lang_Another_Artwork_by").html(g360.g_lang.Another_Artwork_by);
		$(".g_lang_See_more_artist_work").html(g360.g_lang.See_more_artist_work);
		$(".g_lang_Artwork_delivery_Info").html(g360.g_lang.Artwork_delivery_Info);
		
		$(".g_lang_Courier_delivery").html(g360.g_lang.Courier_delivery);
		$(".g_lang_Courier_delivery_1").html(g360.g_lang.Courier_delivery_1);
		$(".g_lang_Professional_delivery").html(g360.g_lang.Professional_delivery);
		$(".g_lang_Professional_delivery_1").html(g360.g_lang.Professional_delivery_1);
		$(".g_lang_Free_Shipping").html(g360.g_lang.Free_Shipping);
		$(".g_lang_Free_Shipping_1").html(g360.g_lang.Free_Shipping_1);
		$(".g_lang_Artwork_Delivery_Policy").html(g360.g_lang.Artwork_Delivery_Policy);
		$(".g_lang_Artwork_Delivery_Policy_1").html(g360.g_lang.Artwork_Delivery_Policy_1);
		$(".g_lang_Artwork_Delivery_Policy_2").html(g360.g_lang.Artwork_Delivery_Policy_2);
		
		$(".g_lang_Shipping_Fee_Info").html(g360.g_lang.Shipping_Fee_Info);
		$(".g_lang_Shipping_Fee_Info_1").html(g360.g_lang.Shipping_Fee_Info_1);
		$(".g_lang_Shipping_Fee_Info_2").html(g360.g_lang.Shipping_Fee_Info_2);
		$(".g_lang_Shipping_Fee_Info_3").html(g360.g_lang.Shipping_Fee_Info_3);
		$(".g_lang_Shipping_Fee_Info_4").html(g360.g_lang.Shipping_Fee_Info_4);
		
		$(".g_lang_Shipping_procedure").html(g360.g_lang.Shipping_procedure);
		$(".g_lang_Shipping_procedure_1").html(g360.g_lang.Shipping_procedure_1);
		$(".g_lang_Shipping_procedure_2").html(g360.g_lang.Shipping_procedure_2);
		
		$(".g_lang_Delivery_period").html(g360.g_lang.Delivery_period);
		$(".g_lang_Delivery_period_1").html(g360.g_lang.Delivery_period_1);
		$(".g_lang_Delivery_period_2").html(g360.g_lang.Delivery_period_2);
		
		$(".g_lang_Exchange_Return_Info").html(g360.g_lang.Exchange_Return_Info);
		
		$(".g_lang_Artwork_original").html(g360.g_lang.Artwork_original);
		$(".g_lang_Artwork_original_1").html(g360.g_lang.Artwork_original_1);
		$(".g_lang_Artwork_original_2").html(g360.g_lang.Artwork_original_2);
		$(".g_lang_Artwork_original_3").html(g360.g_lang.Artwork_original_3);
		
		$(".g_lang_Artwork_digital").html(g360.g_lang.Artwork_digital);
		$(".g_lang_Artwork_digital_1").html(g360.g_lang.Artwork_digital_1);
		
		$(".g_lang_Exchange_Return_not").html(g360.g_lang.Exchange_Return_not);
		
		$(".g_lang_Artwork_original_4").html(g360.g_lang.Artwork_original_4);
		$(".g_lang_Artwork_original_5").html(g360.g_lang.Artwork_original_5);
		$(".g_lang_Artwork_original_6").html(g360.g_lang.Artwork_original_6);
		$(".g_lang_Artwork_original_7").html(g360.g_lang.Artwork_original_7);
		
		$(".g_lang_Artwork_digital_2").html(g360.g_lang.Artwork_digital_2);
		$(".g_lang_Artwork_digital_3").html(g360.g_lang.Artwork_digital_3);
		
		$(".g_lang_Artwork_Precautions").html(g360.g_lang.Artwork_Precautions);
		$(".g_lang_Artwork_Precautions_1").html(g360.g_lang.Artwork_Precautions_1);
		$(".g_lang_Artwork_Precautions_2").html(g360.g_lang.Artwork_Precautions_2);
		$(".g_lang_Artwork_Precautions_3").html(g360.g_lang.Artwork_Precautions_3);
		$(".g_lang_Artwork_Precautions_4").html(g360.g_lang.Artwork_Precautions_4);
		$(".g_lang_Artwork_Precautions_5").html(g360.g_lang.Artwork_Precautions_5);
		$(".g_lang_Artwork_Precautions_6").html(g360.g_lang.Artwork_Precautions_6);

		$(".g_lang_Artist").html(g360.g_lang.Artist);
		
		$("#art_zoom_wrapper .zoom-title").html(g360.g_lang.Zoom_In_Out);
		
		
		// 작품상세 > 작품문의하기
		$("#art_question h2").html(g360.g_lang.Artwork_Inquiry_Title);
		$(".art_question_detail").html(g360.g_lang.Artwork_Inquiry_Detail);
		$("#q_subject").attr("placeholder", g360.g_lang.q_subject);
		$("#q_name").attr("placeholder", g360.g_lang.q_name);
		$("#q_email").attr("placeholder", g360.g_lang.q_email);
		$("#q_tel").attr("placeholder", g360.g_lang.q_tel);
		$("#q_content").attr("placeholder", g360.g_lang.q_content);
		$("#art_question .btn_register").html(g360.g_lang.Inquiry);
		$("#art_question .btn_cancel").html(g360.g_lang.Cancel);
		
		//deco_space.jsp
		$("#detail_art_my_space_template em:eq(0)").text(g360.g_lang.My_Space1);
		$("#detail_art_my_space_template em:eq(1)").text(g360.g_lang.My_Space2);
		$("#detail_art_my_space_template em:eq(2)").text(g360.g_lang.My_Space3);
		$("#detail_art_my_space_template em:eq(3)").text(g360.g_lang.My_Space4);
		$("#detail_art_my_space_template em:eq(4)").text(g360.g_lang.My_Space5);
		$("#detail_art_my_space_template em:eq(5)").text(g360.g_lang.My_Space6);
		$("#detail_art_my_space_template em:eq(6)").text(g360.g_lang.My_Space7);
		$("#detail_art_my_space_template em:eq(7)").text(g360.g_lang.My_Space8);
		$("#detail_art_my_space_template em:eq(8)").text(g360.g_lang.My_Space9);
		$("#detail_art_my_space_template em:eq(9)").text(g360.g_lang.My_Space10);
		
		//cart
		$(".cart-alt h2").text(g360.g_lang.Cart_Alert1);
		$(".cart-alt a").text(g360.g_lang.Cart_Alert2);
		
	},
	
	xClose:function(){
		var _self = this;
		if ($('#my_space_layer').is(':visible')) return;	// 내공간 작품걸기 레이어가 표시되고 있으면 예외처리함 
		$("#detail_background").fadeOut();
		$('#mobile_detail_back').hide();
		$('#detail_popup').removeClass('pushmenu-open').empty();
		$(window).off('resize.detail.art.preview');
		$(window).off('resize.' + _self.prepend_id + 'canvas');
		$(document).off('click.common_deco_template.picture');
		_self.stopAudio();
		g360.showBodyScroll();
		document.title = g360.main_title;
		
		//캐러셀 autoplay
		$('#main_art_slider').trigger('play.owl.autoplay');
	},
	
	/******************** 내공간 관련 코드 Start ********************/
	initMySpace: function(){
		var _self = this;
		
		this.tooltip = $('<div class="balloon">'+g360.g_lang.Move_Arts+'</div>');
		this.bg_wrap = $('#' + this.prepend_id + 'bg_wrapper');
		this.bg_wrap.append(this.tooltip);
		this.bg_wrap.append('<canvas id="' + this.prepend_id + 'bg_canvas"></canvas>');
		//this.canvas = new fabric.Canvas(this.prepend_id + 'bg_canvas');
		//this.canvas.hoverCursor = 'default';
		//this.canvas.selection = false;
		this.canvas = new fabric.Canvas(this.prepend_id + 'bg_canvas', {
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
		
		this.canvas.on('object:moving', function(e){
			g360.is_disp_tooltip = false;
			_self.hideTooltip();
		});
		
		// 기본값으로 먼저 뿌려줌...
		var _bg_w = Math.ceil(_self.bg_wrap.width());
		var _bg_h = Math.ceil(_bg_w * 0.6);
		
		_self.bg_wrap.height(_bg_h);
		_self.canvas.setDimensions({
            width: _bg_w,
            height: _bg_h
        });
		
		this.mySpaceEventBind();
		this.initTemplate();		
	},
	initTemplate: function() {
		var _self = this;
		$('#' + this.prepend_id + 'my_space_template').owlCarousel({
			nav: true,
			navContainer: '#' + this.prepend_id + 'my_space_template_nav',
			navText: ['', ''],
			dots: false,
			autoWidth: true,
			margin: 9,
			slideBy: 3,
			items: 5,
			onlyLeftDirection: true
		});
		this.loadTemplate();
	},
	getSpaceInfo:function(el){
		return {
			id : el.data('space-id'),
			size : el.data('space-size'),
			url : el.data('space-url')
		};
	},
	loadTemplate: function() {
		var _self = this;
		
		$('#' + this.prepend_id + 'my_space_template').trigger('refresh.owl.carousel');
		if (g360.UserInfo == null) {
			var $first = $('#' + this.prepend_id + 'my_space_template').find('.space_tmpl:eq(0)');
			$first.click();
		} else {
			//if (this.load_tmpl_complete) return;

			// 저장해놓은 내 공간 가져오기
			_self.getMyspaceList().always(function() {
				// Default 첫번째 공간 선택
				$('#' + _self.prepend_id + 'my_space_template').trigger('to.owl.carousel', [0, 10]);
				var $first = $('#detail_art_my_space_template').find('.space_tmpl:eq(0)');
				$first.click();
				$('#' + _self.prepend_id + 'my_space_template').find('.myroom:last').addClass('mylast');
				
				//_self.load_tmpl_complete = true;
			});
		}
	},
	//내공간에 등록된 이미지 가져오기
	getMyspaceList : function(){
		var _self = this;
		var url = g360.root_path + "/myspace_image_list.mon";
		return $.ajax({
			url : url,
			dataType : 'json',
			success : function(data){
				var _html = '';
				var _idx = -1;
				$.each(data, function(){
					if (!this.space_key) return true;
					var space_info = {
						key: this.space_key,
						filename: this.filename,
						name: this.space_name,
						size: this.space_size
					}
					_html = _self._getTmplHtml(space_info);
					_idx++;
					$('#' + _self.prepend_id + 'my_space_template').trigger('add.owl.carousel', [_html, _idx]).trigger('refresh.owl.carousel');
				});
				//if (_html) $('#my_space_template').prepend(_html);
				
			},
			error : function(e){
				console.log('내공간 로딩 실패');
				
			}
		})
	},
	_getTmplHtml:function(space_info){		
		var _url = g360.myspace_img_path(g360.UserInfo.email, space_info.filename);
		var _thumb = g360.myspace_thumbnail_img_path(g360.UserInfo.email, space_info.filename);
		var _html = '<div class="space_tmpl item myroom"' +
			' data-space-id="' + space_info.key + '"' +
			' data-space-size="' + space_info.size + '"' +
			' data-space-url="' + _url + '">' +
			'<img src="' + _thumb + '"><span><em>' + space_info.name + '</em><button class="btn btn_thm_delete ico">'+g360.g_lang.Delete+'</button></span>' +
			'</div>';
		
		return _html;
	},

	//내공간 이미지 등록하기 (DB저장)
	addMyspace:function(){
		var _self = this;
		_self.space_reg_key = ((new Date()).getTime()).toString(16);
		
		var data = JSON.stringify({
			space_key : _self.space_reg_key,
			space_name : _self.space_reg_name,
			space_size : _self.space_reg_size,
			filename : _self.space_reg_filename,
		});
		
		
		var url = g360.root_path + "/myspace_image_upload.mon";
		$.ajax({
			type : "Post",
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				var new_space = _self._getTmplHtml({
					key	: _self.space_reg_key,
					filename : _self.space_reg_filename,
					name: _self.space_reg_name,
					size: _self.space_reg_size
				});
				$('#' + _self.prepend_id + 'my_space_template').trigger('add.owl.carousel', [new_space, 0]).trigger('refresh.owl.carousel').trigger('to.owl.carousel', [0, 10]);
				
				// 초기화
				$('#' + _self.prepend_id + 'space_reg_name').val('');
				$('#' + _self.prepend_id + 'space_reg_size').val('');
				_self.space_reg_key = '';
				_self.space_reg_filename = '';
				_self.space_reg_name = '';
				_self.space_reg_size = '';
				
				
				$('#' + _self.prepend_id + 'space_reg_wrapper').hide();
				$('#' + _self.prepend_id + 'my_space_template').find('.space_tmpl:eq(0)').click();
				$('#' + _self.prepend_id + 'my_space_template').find('.myroom:last').addClass('mylast');
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	removeMyspace:function(key){
		
		var url = g360.root_path + "/myspace_image_remove.mon?space_key=" + key;
		url += "&" + new Date().getTime();
		return $.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				//console.log(data);
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	mySpaceEventBind: function(){
		var _self = this;
		
		/**
		 * 공간 선택하기
		 */
		$(document).on('click.common_deco_template.picture', '#' + _self.prepend_id + 'my_space_template .space_tmpl', function(e) {
			
			var $this = $(this);
			if ($this.hasClass('on')) return;
			
			var space_info = _self.getSpaceInfo($this);
			
			// 이전 선택된 공간 처리
			if (_self.selectedSpaceId != null) {
				var _before_el = $('#' + _self.prepend_id + 'my_space_template').find('[data-space-id="' + _self.selectedSpaceId + '"]');
				if (_before_el.length) {
					_before_el.removeClass('on');
				}
			}
			
			// 선택된 공간 처리
			_self.selectedSpaceId = space_info.id;
			$this.addClass('on');
			$('#' + _self.prepend_id + 'picture_size').text((space_info.size / 100) + 'm');
			
			// 공간 사이즈가 변경된 경우
			if (_self.space_size != space_info.size) {
				_self.space_size = space_info.size;
				

				// 그림이 표시되어 있는 경우
				if (_self.picture) {
					// 불러올 이미지의 scale값 구하기
					var _1mm = _self._getPixelPerMm();
					var scale_x = _self.picture_info.width * _1mm / _self.picture.width;
					var scale_y = _self.picture_info.height * _1mm / _self.picture.height;
					
					_self.picture.animate('scaleX', scale_x, {
						duration: 300,
						onChange: function() {
							_self.canvas.renderAll();
						}
					});
					_self.picture.animate('scaleY', scale_y, {
						duration: 300,
						onChange: function() {
							_self.canvas.renderAll();
						}
					});
				}
			}

			
			// URL 불러오기
			_self._imageLoad(space_info);
			
		});
		
		
		/**
		 * 내 공간 삭제
		 */
		$(document).off('click.art_detail.template.delete').on('click.art_detail.template.delete', '#' + _self.prepend_id + 'my_space_template .btn_thm_delete', function(e) {
			var el_myroom = $(this).closest('.myroom').get(0);
			var _is_selected_delete = false;
			
			var _msg = g360.g_lang.Art_Detail_Alert2;
			
			
			var del_key = $(this).closest('.space_tmpl').data('space-id');
			
			$.confirm({
				title : " ",
				content : _msg + "<hr>",
				type : "default",  
				closeIcon : true,
				closeIconClass : "fa fa-close",
				columnClass : "small",  
				animation : "top", 
				animateFromElement : false,
				closeAnimation : "scale",
				animationBounce : 1,	
				backgroundDismiss: false,
				escapeKey : false,
				buttons : {		
					confirm : {
						text : "확인",
						btnClass : "btn-default",
						action : function(){
							// DB에서 삭제처리
							
							
							_self.removeMyspace(del_key).done(function(){							
								// 엘리먼트 삭제하기
								$('#' + _self.prepend_id + 'my_space_template .space_tmpl').each(function(_idx, _el) {
									if (el_myroom == this) {
										if ($(this).hasClass('on')) {
											_is_selected_delete = true;
										}
										$('#' + _self.prepend_id + 'my_space_template').trigger('remove.owl.carousel', _idx).trigger('refresh.owl.carousel');
										return false;
									}
								});
								if (_is_selected_delete) {$('#' + _self.prepend_id + 'my_space_template .space_tmpl:first').click();}
								$('#' + _self.prepend_id + 'my_space_template .myroom:last').addClass('mylast');
							});
						}
					},
					moreButtons : {
						text : "취소"
					}
				}
			});	
			
			return false;
		});
		
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
		
		/**
		 * 내 공간 등록 - (저장)
		 */
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
			g360.loadingbar_open(g360.g_lang.Art_Detail_Alert8);
			
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
			//_self.dropzone.removeAllFiles();
			$('#' + _self.prepend_id + 'space_reg_name').val('');
			$('#' + _self.prepend_id + 'space_reg_size').val('');
			_self.space_reg_key = '';
			_self.space_reg_filename = '';
			_self.space_reg_name = '';
			_self.space_reg_size = '';
			$('#' + _self.prepend_id + 'space_reg_wrapper').hide();
		});
		
		// 윈도우 사이즈 변경시 처리
		$(window).on('resize.' + _self.prepend_id + 'canvas', function(){
			clearTimeout(_self.resize_id);
			_self.resize_id = setTimeout(function(){_self._refreshSpace();}, 500); 			
		});
		
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
			_self.bg_wrap.height(_bg_h);
			//var _calc_h = $(window).height() - (_self.bg_wrap.position().top + 20 + 20 + 85);
			//_self.bg_wrap.height(_calc_h);
			_self.bg_img.scale(_self._bg_scale);
					
			
			//_self.canvas.clear();
			//_self.group = null;
			_self.canvas.setDimensions({
	            width: _bg_w,
	            height: _bg_h
	        });
			
			_self.canvas.setBackgroundImage(_self.bg_img);
			
			if (callback) callback();
		}		
	},
	// 작품 선택
	_selectPicture:function(el){
		var _self = this;
		
		var _info = {
			top:'',
			left:'',
			width:'',
			height:''
		};
			
			
		
		_info.width = $(el).data('width');
		_info.height = $(el).data('height');
		
		_self.picture_info = {
			width: _info.width,
			height: _info.height
		};
		
		var img = new Image;
		img.onload = function() {
			var _top;
			var _left;
			
			
			
			// 불러올 이미지의 scale값 구하기
			var _1mm = _self._getPixelPerMm();
			var scale_x = _info.width * _1mm / img.width;
			var scale_y = _info.height * _1mm / img.height;
			
			if (_info.top) {
				_top = _info.top;
				_left = _info.left;
			} else {
				if (_self.picture != null) {
					_top = _self.picture.top + ((_self.picture.getScaledHeight() - img.height * scale_y) / 2);
					_left = _self.picture.left + ((_self.picture.getScaledWidth() - img.width * scale_x) / 2);
					_self.canvas.remove(_self.picture);
				} else {
					_top = (_self.canvas.height - img.height * scale_y) / 5; // 세로는 5분의 1지점
					_left = (_self.canvas.width - img.width * scale_x) / 2; // 가로는 중앙
				}
			}
			
			
			/*
			if (img.width * scale > _self.canvas.width ||
					img.height * scale > _self.canvas.height) {
				alert("배경 이미지의 사이즈가 작습니다");
				return;
			}
			
			
			if (_self.group) {
				top = _self.group.top;
				left = _self.group.left;
				_self.canvas.remove(_self.group);
			} else {
				// 최초 선택
				top = (_self.canvas.height - img.height * scale) / 3; // 세로는 3분의 1지점
				left = (_self.canvas.width - img.width * scale) / 2; // 가로는 중앙
			}
			
			*/

			var opt = {
				width		: img.width,
				height		: img.height,
				scaleX		: scale_x,
				scaleY		: scale_y,
				top			: (_top < 0 ? 0 : _top),
				left		: (_left < 0 ? 0 : _left),
				//stroke		: '#191919',
				//strokeWidth	: 1 / scale_x,
				shadow		: {
					color: 'rgba(1,1,1,0.7)',
					//nonScaling: true,
					blur: 3 / scale_x,
					offsetX:2 / scale_x,
					offsetY:2 / scale_x
				},
				//originX		: 'center',
				//originY		: 'center',
				hasControls	: false,
				hasBorders	: false,
				hoverCursor	: 'move'
			};
			
			
			_self.picture = new fabric.Image(img, opt);
			
			var filter = new fabric.Image.filters.Brightness({
		  		brightness: 0.05
			});
			_self.picture.filters.push(filter);
			_self.picture.applyFilters();
			
			_self.canvas.add(_self.picture);
			_self.canvas.renderAll();
			_self.showTooltip(opt);
		}
		img.src = $(el).data('url');
	},
	_refreshSpace:function(){
		var _self = this;
		//if (!this.layer_frame.is(':visible')) return;
		var before_width = _self.canvas.width;
		var elBg = $('.space_tmpl.on', '#' + _self.prepend_id + 'my_space_template');
		var space_info = _self.getSpaceInfo(elBg);
		
		_self.hideTooltip();
		_self._imageLoad(space_info, function() {
			var _change_scale = (before_width - _self.canvas.width) / before_width;
						
			// 그림이 표시되어 있는 경우
			if (_self.picture) {
				// 불러올 이미지의 scale값 구하기
				var _1mm = _self._getPixelPerMm();
				var scale_x = _self.picture_info.width * _1mm / _self.picture.width;
				var scale_y = _self.picture_info.height * _1mm / _self.picture.height;
				var _top = _self.picture.top - (_self.picture.top * _change_scale);
				var _left = _self.picture.left - (_self.picture.left * _change_scale);
				
				_self.picture.left = (_left < 0 ? 0 : _left); 
				_self.picture.top = (_top < 0 ? 0 : _top); 
				
				_self.picture.animate('scaleX', scale_x, {
					duration: 300,
					onChange: function() {
						_self.canvas.renderAll();
					}
				});
				_self.picture.animate('scaleY', scale_y, {
					duration: 300,
					onChange: function() {
						_self.canvas.renderAll();
					}
				});
			}
		});
	},
	_getPixelPerMm: function(){
		var _self = this;
		var size_mm = _self.space_size * 10;
		return _self.canvas.width / size_mm;
	},
	/******************** 내공간 관련 코드 End ********************/
	
	_eventBind: function() {
		var _self = this;
		
		$('#detail_btn_close').on('click', function(){
			_self.xClose();
		});
		
		// ESC 키 입력시 닫기 처리
		$(document).off('keydown.popup_close').on('keydown.popup_close', function(e){
			if (e.keyCode == 27 || e.keyCode == 27) {
				// VR팝업을 띄워놓은 경우
				if ($('#vr_popup').is(':visible')) {
					g360.vr_popup_close();
				} else if ($('#art_zoom_wrapper').is(':visible')) {
					$('#btn_art_zoom_close').click();
				} else {
					if ($('#detail_background').hasClass('zoom')) return;
					_self.xClose();
				}
			}
		});
		
		// 레이어 닫기
		$('#detail_background').off('click').on('click', function() {
			if ($(this).hasClass('zoom')) return;
			_self.xClose();
		});
		
		// 모바일 뒤로가기 버튼
		$('#mobile_detail_back').off('click').on('click', function(){
			_self.xClose();
			$(this).hide();
		});
		
		// 확대보기
		$('#detail_art_btn_zoom').off('click').on('click', function(){
			
			g360.history_record("btn_art_zoom_close");g360.history_record("btn_art_zoom_close");
			
			var mz = g360.maxZindex();
			var popup_index = parseInt($('#detail_popup').css('z-index'));
			$('#detail_background').addClass('zoom').css('z-index', popup_index+1);
			$('#art_zoom_detail').empty();
			$('#art_zoom_wrapper').css('z-index', mz+1).show();
			
			var img_url = g360.domain  + '/artimage/' + _self.cur_art_info.email + '/art/watermark/' + _self.cur_art_info.art_img_filename + '.jpg';
			img_url = img_url + "?open&ver="+_self.cur_art_info.version;
			
			var overlay = $('#art_zoom_detail'),
				loading = $('<img src="/img/BI_loading-2.gif" class="detail-loading">'),
				$panzoom = $('<img src="' + img_url + '" style="max-width:100%;">'),
				$range = $("#art_zoom_header .zoom-range");
				
			
			function init_panzoom() {
		        $panzoom.panzoom({
		        	$zoomRange: $range,
		            cursor: 'pointer',
		            startTransform: 'scale(1.7)',
		            minScale: 0.5,
		            maxScale: 3,
		            increment: 0.1,
		            rangeStep: 0.1
		        });
		        $panzoom.on('panzoompan', position_correction);
		        $panzoom.on('panzoomzoom', position_correction);
		        
		        
		        $(window).off('resize.panzoom_resize').on('resize.panzoom_resize', function() {
		            $panzoom.css('margin-top', parseInt((overlay.innerHeight() - $panzoom.outerHeight()) / 2, 10));
		            position_correction();
		        });
		        
		        
		        overlay.on('mousewheel', function(e) {
		            e.preventDefault();
		            var delta = e.delta || e.originalEvent.wheelDelta;
		            var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
		            $panzoom.panzoom('zoom', zoomOut);
		        });
		        
		    }
		    function position_correction() {
		        var pp = $panzoom.parent(), 
		        	p_h = pp.innerHeight(), 
		        	p_w = pp.innerWidth(), 
		        	m = $panzoom.panzoom('getMatrix'), 
		        	r = m[0], 
		        	x = m[4], 
		        	y = m[5], 
		        	h = $panzoom.height() * r, 
		        	w = $panzoom.width() * r, 
		        	t_x, 
		        	t_y;
		        if (w <= p_w) {
		            x = 0;
		        } else {
		            t_x = parseInt((w - p_w) / 2, 10);
		            if (x < -t_x) {
		                x = -t_x;
		            } else if (x > t_x) {
		                x = t_x;
		            }
		        }
		        if (h <= p_h) {
		            y = 0;
		        } else {
		            t_y = parseInt((h - p_h) / 2, 10);
		            if (y < -t_y) {
		                y = -t_y;
		            } else if (y > t_y) {
		                y = t_y;
		            }
		        }
		        $panzoom.panzoom('pan', x, y, {
		            silent: true
		        });
		    }
		    $range.hide();
		    overlay.append(loading);
		    $panzoom.css('opacity', '0');
		    $panzoom.css('transform', 'none').appendTo(overlay);
		    
		    // 구현부
		    $panzoom.on('load', function() {
		    	loading.remove();
		    	$range.show();
		    	$panzoom.css('margin-top', parseInt((overlay.innerHeight() - $panzoom.outerHeight()) / 2, 10));
		    	$panzoom.css('opacity', '1');
		    	init_panzoom();
		    });
		    $panzoom.on('error', function(){
		    	var $nothing = $('<div>'+g360.g_lang.Art_Detail_Alert10+'</div>');
		    	$nothing.css({
		    		'position': 'absolute',
		    		'top': '50%',
		    		'left': '50%',
		    		'transform': 'translate(-50%, -50%)',
		    		'color': '#fff',
		    		'font-size': '22px'
		    	});
		    	loading.remove();
		    	overlay.append($nothing);
		    });
		    
		    $(document).off('touchmove.zoom').on('touchmove.zoom', function(e) {});
		    
			return false;
		});
		
		$('#btn_art_zoom_close').off('click').on('click', function(){
			var popup_index = parseInt($('#detail_popup').css('z-index'));
			$('#detail_background').removeClass('zoom').css('z-index', popup_index - 1);
			$('#art_zoom_wrapper').hide();
			$('#art_zoom_detail').empty();
			$(window).off('resize.panzoom_resize');
			$(document).off('touchmove.zoom');
		});
		
		// 음성 플레이
		_self.wrapper.find('.btn_sound').on('click', function(){
			try {
				if ($(this).hasClass('on')) {
					if ($(this).hasClass('pause')) {
						_self.audio.play();
						_self.getAudioTime();
						g360.time_interval = setInterval(function(){_self.getAudioTime();}, 1000);
						$(this).removeClass('pause');
					} else {
						_self.audio.pause();
						if (g360.time_interval) clearInterval(g360.time_interval);
						$(this).addClass('pause');
					}
					
				} else {
					if (_self.audio.play) {
						_self.audio.play();
						_self.getAudioTime();
						g360.time_interval = setInterval(function(){_self.getAudioTime();}, 1000);
						$(this).addClass('on');
					} else {
						g360.gAlert("Error",g360.g_lang.Art_Detail_Alert11, "red", "left");
						return;
					}
				}
			}catch(ex){}
		});
		
		// 동영상 플레이
		_self.wrapper.find('.btn_video').on('click', function(){
			// 오디오 재생중이면 중지
			_self.stopAudio();
			
			var _email = _self.cur_art_info.art_mp4_filename.substring(0, _self.cur_art_info.art_mp4_filename.lastIndexOf('_'));
			var video_src = "https://www.gallery360.co.kr" + g360.video_path(_email, _self.cur_art_info.art_mp4_filename);
			
			g360.showVideo(video_src);
		});
		
		// 유튜브 플레이
		_self.wrapper.find('.btn_youtube').on('click', function(){
			// 오디오 재생중이면 중지
			_self.stopAudio();
			
			var src = _self.cur_art_info.art_yutube.replace(/youtu.be/g, 'www.youtube.com/embed');
			g360.showYoutube(src);
		});
		
		// 공유하기
		_self.wrapper.find('.btn_link').on('click', function(){
			var link_path = g360.getLinkPath('link_art', _self.cur_art_info.dockey);
			g360.copyToClipboard(link_path);
		});
		
		
		
		// 원화구매 버튼
		$('#pills-1-tab').on('click', function(){
			if (!_self.cur_art_info.art_ck1) {
				g360.gAlert("Error",g360.g_lang.Art_Detail_Alert12, "red", "left");
				return false;
			} else {
				var price = '₩ ' + g360.numberComma(_self.cur_art_info.art_price);
				var info = _self.cur_art_info;
				
				if (typeof(info.opt) != "undefined" && info.opt == "none"){
					//$('#detail_art_price').text(g360.g_lang.Ask_Price);
					$('#detail_art_price').text(g360.g_lang.Ask_Price);
					$('#eth_disp_wrap').hide();
				}else{
					$('#detail_art_price').text(price);
					g360.transCoinPrice(_self.cur_art_info.art_price, function(eth, usd){
						
						//$("#detail_art_price_eth").html(eth + 'ETH<span style="font-size:20px">($' + usd + ')</span>');	
						$("#detail_art_price_eth").html('<h1>' + eth + ' ETH</h1><span style="font-size:20px">($ ' + usd + ')</span>');
						
						//if(g360.g_lang.Lang == "us") $('#detail_art_price').text('$ '+g360.numberComma(usd));	
					});
					
					var artic = g360.transKRWtoARTIC(_self.cur_art_info.art_price);
					$("#detail_art_price_artic").html(artic + 'ARTIC<span style="font-size:20px"></span>');
					
				}
				
				
				var info = gArtD.cur_art_info;
				if (info.status == '3') {
					$('#art_sale').text(g360.g_lang.Sold_Out).prop('disabled', true);
					$('#detail_art_price').addClass('soldout');
				} else {
					$('#art_sale').text(g360.g_lang.Purchase);
				}
				
				
			}
		});
		
		// 이미지 구매 버튼
		$('#pills-2-tab').on('click', function(){
		
			if (!_self.cur_art_info.art_ck2) {
				g360.gAlert("Error",g360.g_lang.Art_Detail_Alert1, "red", "left");
				return false;
			} else {
				var pic_price = parseInt(_self.cur_art_info.art_price) * g360.image_sales_rate;
				
				var price = '₩ ' + g360.numberComma(pic_price);
				
			//	$("#detail_art_price").css("text-decoration-line", "blink");
				$('#detail_art_price').removeClass('soldout');
				
				var info = _self.cur_art_info;
				
				if (typeof(info.opt) != "undefined" && info.opt == "none"){
					$('#detail_art_price').text(g360.g_lang.Ask_Price);
					$('#eth_disp_wrap').hide();
				}else{
					
					$('#detail_art_price').text(price);
					g360.transCoinPrice(pic_price, function(eth, usd){
						//$("#detail_art_price_eth").html(eth + 'ETH<span style="font-size:20px">($' + usd + ')</span>');
						$("#detail_art_price_eth").html('<h1>' + eth + ' ETH</h1><span style="font-size:20px">($ ' + usd + ')</span>');
						//if(g360.g_lang.Lang == "us") $('#detail_art_price').text('$ '+g360.numberComma(usd));	
					});
					var artic = g360.transKRWtoARTIC(_self.cur_art_info.art_price);
					$("#detail_art_price_artic").html(artic + 'ARTIC<span style="font-size:20px"></span>');
				}
				
				$('#art_sale').text(g360.g_lang.Purchase).prop('disabled', false);
			}
		});
		
		// 마이컬렉션 담기
		$('#detail_art_btn_favo').on('click', function(){
			var _btn = this;
			var _is_del = false;
			
			if ($(_btn).hasClass('added')) {
				_is_del = true;
			} else {
				_is_del = false;
			}
			g360.setMyCollection(_self.cur_art_info.dockey, _is_del, function(data){
				if (data.result == 'OK') {
					_self.checkMyCollection(!_is_del);
				} else {
					g360.error_alert();
					console.log('Error', data);
				}
			});
		});
		
		
		// 1:1 상담하기
		$('#detail_art_btn_chat').on('click', function(){
		
//			$("#btn_talk360").click();
//			
//			var email = gArtD.cur_art_info.email.replace("@","-spl-").replace(".","-sp-");
//			
//			var html = "<li id='li-mention-"+email+"'><span>"+gArtD.cur_art_info.art_artist+"</span>";
//			html 	+= "	<button id='"+email+"' name='del-mention' class='btn' onclick=\"gTopMain.btnDelete('li-mention-"+email+"')\" style='position:inherit'>삭제</button>";
//			html 	+= "</li>";
//			$(".mention_list").append(html);
			
			
			g360.popup_open("art_question");
			return false;
			
		});
		
		
		if (!g360.isMobile()) {
			$('#detail_art_btn_chat').show();
		}
		
		
		// 카트에 담기
		$('#detail_art_btn_cart').on('click', function(){
			_self.saveCart();
		});
		
		$("#art_sale").on("click", function(evnet){
			if (g360.login_check()){
				
				gArtD.art_sale_process();
				

			}else{
				
				g360.login_window_max();
				
				$("#p_login").click();
			}
		});
		
		// 네비게이션 버튼(작품소개,작가소개,다른작품,배송안내)
		$('#detail_art_nav').on('click', 'button', function(){
			var $el = $('#detail_art_nav_' + $(this).data('type'));
			var position = $('#detail_popup').scrollTop() + $el.position().top - 10;
			$('#detail_popup').animate({scrollTop:position}, 300);
		});
		
		// 작가정보 더보기
		$('#detail_art_artist_more').on('click', function(){
			_self.xClose();
			g360.showArtistDetail(_self.cur_art_info.email);
			return false;
		});
		
		$(window).off('resize.detail.art.preview').on('resize.detail.art.preview', function(){
			setTimeout(function(){
				var $watermark = $('#detail_art_preview .watermark');
				var $more = $('#detail_art_preview .more');
				var $img = $('#detail_art_preview .preview');
				
				// 워터마크 위치 지정
				$watermark.css('top', $img.position().top + 18);
				$watermark.css('left', $img.position().left + 18);
				$watermark.css('max-width', ($img.width() - 36) + 'px');
				$watermark.show();
				
				// 돋보기 위치 지정
				var more_top = $img.position().top + $img.height() - $more.height();
				var more_left = $img.position().left + $img.width() - $more.width();
				$more.css('top', more_top);
				$more.css('left', more_left);
				$more.show();
			}, 300);
		});
		
		// 판매자 다른 작품 클릭
		$('#detail_art_other').on('click', function(e){
			var $target = $(e.target);
			if (!$target.hasClass('preview')) {
				$target = $target.find('.preview');
			}
			var img_id = $target.data('artId');
			_self.xClose();
			g360.showArtDetail(img_id);
		});
		
	},
	
	
	
	"art_sale_process" : function(){
		//debugger;
		if (g360.isMobile()){
			if (typeof(g360.UserInfo.smskey) == "undefined" || g360.UserInfo.smskey == ""){
				
				$.confirm({
					title : " ",
					content : g360.g_lang.Art_Detail_Alert13,
					type : "default",  
					closeIcon : true,
					closeIconClass : "fa fa-close",
					columnClass : "small",  
					animation : "top", 
					animateFromElement : false,
					closeAnimation : "scale",
					animationBounce : 1,	
					backgroundDismiss: false,
					escapeKey : false,
					buttons : {		
						confirm : {
							text : g360.g_lang.OK,
							btnClass : "btn-default",
							action : function(){
								gArtD.sms_approval_mobile();
							}
						},
						moreButtons : {
							text : g360.g_lang.Cancel
						}
					}
				});	
				
				
			}else{
				gArtD.art_sale_process2();
			}
		}else{
			gArtD.art_sale_process2();
		}
		
		
	},

	
	"art_sale_process2" : function(){
		
		if (g360.UserInfo.name == ""){

			g360.gAlert("Error",g360.g_lang.Art_Detail_Alert14, "red", "left");
			gTopMain.navBtnAction('account_client');
			return false;
		}else{
			
			
			if (g360.UserInfo.gubun != "normal"){
				g360.gAlert("Error",g360.g_lang.Art_Detail_Alert15, "red", "left");
				return;
			}
		
			g360.history_record("vr_show_close_xx");g360.history_record("vr_show_close_xx");
			
			var sales_type = gArtD.select_sale_type();
			
			//////////////////// 구매 정보 카트에 담기 ////////////////////////////////////
			g360.cart_list = new Array();
			gArtD.cur_art_info.sales_type = sales_type;					
			
			if (sales_type == "image"){
										
				$.confirm({
					title : g360.g_lang.Art_Detail_Alert16,
					content : g360.g_lang.Art_Detail_Alert17,
					type : "default",  
					closeIcon : true,
					closeIconClass : "fa fa-close",
					columnClass : "small",  
					animation : "top", 
					animateFromElement : false,
					closeAnimation : "scale",
					animationBounce : 1,	
					backgroundDismiss: false,
					escapeKey : false,
					buttons : {		
						confirm : {
							text : g360.g_lang.OK,
							btnClass : "btn-default",
							action : function(){		
								gArtD.cur_art_info.old_art_price = parseInt(gArtD.cur_art_info.art_price);
								
								gArtD.cur_art_info.art_price = parseInt(gArtD.cur_art_info.art_price) * g360.image_sales_rate;
								gArtD.cur_art_info.art_width = gArtD.cur_art_info.file_width;
								gArtD.cur_art_info.art_height = gArtD.cur_art_info.file_height;
								gArtD.cur_art_info.art_hosu = gArtD.cur_art_info.file_size;
								
								g360.cart_list.push(gArtD.cur_art_info);
								/////////////////////////////////////////////////////////////////////////
								
								var url = g360.root_path + "/main/art/art_purchase.jsp?call_from=main&sales_type="+sales_type;
								g360.LoadPage("purchase_popup_detail", url);
							//	$("#art_purchase_popup").show();
								g360.popup_open("art_purchase_popup");
								
								$("#art_purchase_popup_wrapper").css("background-color", "white");
								
								var inx = g360.maxZindex();
								$("#art_purchase_popup_background").css("z-index", parseInt(inx) + 1);
								$("#art_purchase_popup_wrapper").css("z-index", parseInt(inx) + 2);
								$("#art_purchase_popup").css("left", "0px");
								$("#art_purchase_popup").css("top", "0px");
								
								g360.scroll_Top();
							//	g360.body_scroll_show();
								
								g360.popuup_close_and_body_show_scroll = false;
							}
						},
						moreButtons : {
							text : "취소"
						}
					}
				});	
				

			}else{
				
				g360.cart_list.push(gArtD.cur_art_info);
				/////////////////////////////////////////////////////////////////////////
				
				var url = g360.root_path + "/main/art/art_purchase.jsp?call_from=main&sales_type="+sales_type;
				g360.LoadPage("purchase_popup_detail", url);
			//	$("#art_purchase_popup").show();
				g360.popup_open("art_purchase_popup");
				
				$("#art_purchase_popup_wrapper").css("background-color", "white");
				
				var inx = g360.maxZindex();
				$("#art_purchase_popup_background").css("z-index", parseInt(inx) + 1);
				$("#art_purchase_popup_wrapper").css("z-index", parseInt(inx) + 2);
				$("#art_purchase_popup").css("left", "0px");
				$("#art_purchase_popup").css("top", "0px");
				
				g360.scroll_Top();
			//	g360.body_scroll_show();
				
				g360.popuup_close_and_body_show_scroll = false;
			}
			
			
			
						
			return false;
		}
	},
	
	
	"sms_approval_mobile" : function(opt){
		
		IMP.certification({
			company : "갤러리360",
		    merchant_uid : 'merchant_' + new Date().getTime() //본인인증과 연관된 가맹점 내부 주문번호가 있다면 넘겨주세요
		}, function(rsp) {
			
		    if ( rsp.success ) {        
		        $.ajax({
						type : 'POST',
						url : g360.root_path + '/sms_confirm.mon',
						dataType : 'json',
						data : ({
							imp_uid : rsp.imp_uid
						})
				 }).done(function(rsp) {
				 		// 이후 Business Logic 처리하시면 됩니다.
				 	//	debugger;
				 		var res = rsp.response;
				 		if (res.certified){
				 			
				 			
				 			var name = res.name;
				 			var smskey = res.unique_key;
				 			var gender = res.gender;
				 			var mobile = res.phone;
				 			
				 			var xjson = new Object();
				 			xjson.name = name;
				 			xjson.smskey = smskey;
				 			xjson.gender = gender;
				 			xjson.gubun = "normal";				 			
				 			xjson.mobile = mobile;
				 			xjson.nickname = g360.UserInfo.nickname;
				 							 			
				 			var data = JSON.stringify(xjson);
				 			
				 			g360.UserInfo.smskey = smskey;
				 			
				 			var url = g360.root_path + "/user_info_update.mon";
				 			$.ajax({
				 				type : "POST",
				 				data : data,
				 				datatype : "json",
				 				contentType : "application/json; charset=utf-8",
				 				url : url,
				 				success : function(data){
				 					if (data.result == "OK"){
				 					//	g360.gAlert("Info","개인정보가 정상적으로 업데이트 되었습니다.", "blue", "top");				

				 						g360.UserInfo.name = name;
				 						g360.UserInfo.gubun = "normal";
				 						
				 						gArtD.art_sale_process2();
				 						
				 						return false;
				 					}else{
				 						g360.error_alert();
				 					}
				 					
				 				},
				 				error : function(e){
				 					g360.error_alert();
				 				}
				 			})
				 		}
				 });
		        	
		    } else {
		    	 // 인증취소 또는 인증실패
		        var msg = g360.g_lang.Mypage_Alert10;
		        msg += g360.g_lang.Mypage_Alert10_1 + rsp.error_msg;
		        g360.gAlert("Error",msg, "red", "left");
		    }
		});
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	"select_sale_type" : function(){
		var isactive = $("#pills-1-tab").get(0).className.indexOf("active");
		var res = "art";
		if (isactive < 0){
			res = "image";
		}
		return res;
	},
	
	checkMyCollection:function(_is_added){
		var _self = this;
		var _btn = $('#detail_art_btn_favo'),
			_img_src = (_is_added ? '../img/icon-added-mc-normal.svg' : '../img/icon-add-mc-normal.svg');
		
		$(_btn).find('img').attr('src', _img_src);
		$(_btn).find('span').text((_is_added ? '' : g360.g_lang.MyCollection));
		$(_btn)[_is_added ? 'addClass' : 'removeClass']('added');
		
		$('.columns .grid-item .mycol[data-art-id="' + _self.cur_art_info.dockey + '"]')[_is_added ? 'addClass' : 'removeClass']('added');
		
	},	
	saveCart : function(){
		var _self = this;
		if (g360.login_check()){
			
			if (_self.cur_art_info.status == '3') {
				g360.gAlert("Error",g360.g_lang.Art_Detail_Alert18, "red", "left");
				return;
			}
			
			if (g360.UserInfo.gubun != "normal"){
				g360.gAlert("Error",g360.g_lang.Art_Detail_Alert19, "red", "left");
				return;
			}
			
		
			
			var sales_type = _self.select_sale_type();
					
			var cur_item = _self.cur_art_info;
			var url = g360.root_path + "/save_cart.mon";
			var cart = new Object();
			cart.unique_key = cur_item.dockey;
			cart.email = g360.UserInfo.email;
			cart.title = cur_item.art_title;
			cart.artist = cur_item.art_artist;
			cart.height = cur_item.art_height;
			cart.width = cur_item.art_width;
			cart.hosu = cur_item.art_hosu;
			cart.price = cur_item.art_price;
			
			cart.shipping_fee = cur_item.shipping_fee;
			cart.artist_email = cur_item.email;
			
			if (typeof(cur_item.old_art_price) != "undefined" && cur_item.old_art_price != ""){
				cur_item.art_price = cur_item.old_art_price;
			}
			
			cart.sales_type = sales_type;
			if (sales_type == "image"){
				cart.price = parseInt(cur_item.art_price) *  g360.image_sales_rate;
				cart.width = cur_item.file_width;
				cart.height = cur_item.file_height;
				cart.hosu = cur_item.file_size;			
			}
			
			
			var data = JSON.stringify(cart);
			$.ajax({
				type : "POST",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				data : data,
				url : url,
				success : function(res){
					if (res.result == "OK"){
						g360.popup_open("cart_modal_new");
					}else{
						g360.gAlert("Error",g360.g_lang.Art_Detail_Alert20, "red", "left");
						
					}
					
				},
				error : function(e){
					g360.error_alert();
				}
			})
			
			
		
		}else{
			g360.login_window_max();
			$("#p_login").click();
		}
		
	},
	
	"go_my_cart" : function(){
	
		g360.popup_close("cart_modal_new");
		gTopMain.navBtnAction("cart");

		return false;
		
	},
	
	getArtInfo : function(id){
		var _self = this;
		$.ajax({
			url: g360.root_path + '/select_art_info.mon?dockey=' + id,
			success: function(data){
				//구매하기를 위해서 받은 정보를 g360.cart_list 에 추가한다.

				gArtD.cur_art_info = data;
				////////////////////////////////////////
				_self.drawArtInfo(data);
				
				var _tmp = $('<div></div>')
							.data('url', g360.preview_img_path(data.email, data.art_img_filename))
							.data('width', parseInt(data.art_width) * 10)
							.data('height', parseInt(data.art_height) * 10);
				setTimeout(function(){_self._selectPicture(_tmp);}, 200);
			} 
		});
	},
	drawArtInfo: function(info) {
		
		var _self = this;		
		var img_url;
		
		var size = "";
		
		if(info.art_genre=="조형"){
			var size = info.art_height + ' x ' + info.art_width + ' x ' + info.art_height2 + 'cm';
		}else{
			if (info.art_hosu == null || g360.g_lang.Lang == "us"){
				var size = info.art_height + ' x ' + info.art_width + 'cm';
			}else{
				var size = info.art_height + ' x ' + info.art_width + 'cm(' + info.art_hosu + '호)';
			}
		}
		
		
		var price = '₩ ' + g360.numberComma(info.art_price); 
		var $watermark = $('#detail_art_preview .watermark');
		var $more = $('#detail_art_preview .more');
		$watermark.hide();
		$more.hide();
		
		// 이미지 표시
		img_url = g360.domain + '/artimage/' + info.email + '/art/preview/' + info.art_img_filename + '.jpg?open&ver='+info.version;
		var $img = $('<img class="preview" src="' + img_url + '">');
		$img.on('click', function(){$('#detail_art_btn_zoom').click();});
		$('#detail_art_preview').prepend($img);
		
		$('#detail_art_preview').imagesLoaded(function(){
			// 워터마크 위치 지정
			$watermark.css('top', $img.position().top + 18);
			$watermark.css('left', $img.position().left + 18);
			$watermark.css('max-width', ($img.width() - 36) + 'px');
			$watermark.show();
			
			// 돋보기 위치 지정
			var more_top = $img.position().top + $img.height() - $more.height();
			var more_left = $img.position().left + $img.width() - $more.width();
			$more.css('top', more_top);
			$more.css('left', more_left);
			$more.show();
		});

		// 사운드
		if (info.art_mp3_filename) {
			var $sound = _self.wrapper.find('.btn_sound');
			var $time = _self.wrapper.find('.remain-time');
			
			$time.text('');
			$sound.show();
			
			var _email = info.art_mp3_filename.substring(0, info.art_mp3_filename.lastIndexOf('_'));
			var audio_src = g360.audio_path(_email, info.art_mp3_filename);
			var $audio = $('<audio preload="metadata"></audio>');
			$audio.attr('src', audio_src);
			
			$sound.append($audio);
			_self.audio = $audio.get(0);
			
			// 종료시 이벤트
			$audio.on('ended', function(){
				if (g360.time_interval) clearInterval(g360.time_interval);
				_self.wrapper.find('.btn_sound').removeClass('on');
				_self.wrapper.find('.remain-time').text('');
			});
			
			// 오디오 아이콘 디자인 변경
			$sound.addClass('on pause');			
			$audio.on('loadedmetadata', function(){
				_self.getAudioTime();
			});
			
		}
		// 동영상
		if (info.art_mp4_filename) {
			_self.wrapper.find('.btn_video').show();
		}
		
		// 유튜브
		if (info.art_yutube) {
			_self.wrapper.find('.btn_youtube').show();
		}		
		
		// 공유하기
		_self.wrapper.find('.btn_link').show();

		// Copylights
		$('#copyright_artist_name').text(g360.TextToHtml(info.art_artist));
		$('#copyright_artist_name_m').text(g360.TextToHtml(info.art_artist));
		
		
		var genre = info.art_genre_etc ? info.art_genre.replace(/기타/g, '') + info.art_genre_etc : info.art_genre;
		var source = info.art_source_etc ? info.art_source.replace(/기타/g, '') + info.art_source_etc : info.art_source;

		if(g360.g_lang.VR_Gallery == "VR Gallery"){
			
			genre = genre.replace('회화','Painting');
			genre = genre.replace('판화','Engraving');
			genre = genre.replace('조형','Sculpture');
			genre = genre.replace('사진','Photography');
			genre = genre.replace('디지털아트','Digital Art');
			
			source = source.replace('캔버스','Canvas');
			source = source.replace('유채','Oil paint');
			source = source.replace('아크릴','Acrylic paint');
			source = source.replace('수채','Watercolor');
		}
		
		
		source = source.replace(',',', ');
		
		
		// 이미지 정보 표시
		$('#detail_art_title').text(g360.TextToHtml(info.art_title));
		$('#detail_art_artist').text(g360.TextToHtml(info.art_artist));
		$('#detail_art_date_year').text(info.art_date_year);
		$('#detail_art_size').text(size);
		
		$('#detail_art_genre').text(g360.TextToHtml(genre));
		$('#detail_art_source').text(g360.TextToHtml(source));
		$('#detail_art_artkey').text(info.artkey || g360.g_lang.None_info1);
		
		if (typeof(info.opt) != "undefined" && info.opt == "none"){
			//가격을 표시하지 않는다. 백철극
			$("#art_options1").hide();
			
			$("#detail_art_btn_cart").hide();	
		//	$('#detail_art_price').text("가격문의");
			
		}else{
			if(g360.g_lang.Lang =="ko"){	
				$('#detail_art_price').text(price);
			}
			else if(g360.g_lang.Lang =="us"){
				$('#detail_art_price').text(price);
//				g360.exchange_dollar(info.art_price, function(dollar){
//					console.log("exchange_dollar : "+dollar);
//					$('#detail_art_price').text('$ '+g360.numberComma(dollar));					
//				});
			}
		}
		
		
		$('#detail_art_frame').text(info.art_frame ? g360.TextToHtml(info.art_frame) : g360.g_lang.None_info2);
		
		// 배송비
		if (info.shipping_fee) {
			if(g360.g_lang.Lang == "ko"){
				$('#detail_art_shipping').text(g360.numberComma(info.shipping_fee) + '원');		
				
			}else if(g360.g_lang.Lang == "us"){
				$('#detail_art_shipping').text('￦ '+g360.numberComma(info.shipping_fee));		
				
//				g360.exchange_dollar(info.shipping_fee, function(dollar){
//					$('#detail_art_shipping').text('$ '+g360.numberComma(dollar));						
//				});
			}
			
			
		} else {
			$('#detail_art_shipping').text('-');
		}
		
		var sh_ty = info.shipping_type;
		if(sh_ty == "택배"){
			sh_ty = g360.g_lang.Delivery;
		}else if(sh_ty == "전문배송"){
			sh_ty = g360.g_lang.Professional_delivery;
		}else if(sh_ty == "기타"){
			sh_ty = g360.g_lang.Etc;
		}
		
		$("#detail_art_shipping_type").text(sh_ty);
		
		
		
		
		// 판매가능 체크
		if (info.status == '3') {
			$('#art_sale').text(g360.g_lang.Sold_Out).prop('disabled', true);
			$('#detail_art_price').addClass('soldout');
		} else {
			$('#art_sale').text(g360.g_lang.Purchase);
		}
		
		if (info.art_ck1) {
			$('#pills-1-tab').click();
		} else {
			$('#pills-2-tab').click();
		}
		
		// 이미지 구매 관련
		if (!isNaN(info.file_size)) {
			var file_size = g360.file_size_setting(info.file_size); 
			$('#detail_file_dpi').text(info.file_dpi ? info.file_dpi : g360.g_lang.None_info1);
			$('#detail_file_size').text(file_size);
			$('#detail_file_type').text(info.file_type);
			$('#detail_file_pixel').text(info.file_height + ' x ' + info.file_width + 'px');
		}
		
		
		// 마이컬렉션 체크
		_self.checkMyCollection((info.myfavorite && info.myfavorite == 'T' ? true : false ));
	
		
		// VR 표시
		var vi = info.vrinfo;
		if (vi) {
		
		//	var vr_img_src = "/vr/vr_data_"+vi.templatecode+"/"+vi.dockey+"/pano_f.jpg";
			var vr_img_src = g360.vr_img_path_new(vi.dockey);
			$('#detail_art_vr').show();
			$('#detail_art_vr').css('background-image', 'url(' + vr_img_src +')');
			$('#detail_art_vr').on('click', function() {
				g360.popup_VR(vi.title, vi.dockey, vi.templatecode);
			});
		} else {
			$('#detail_art_vr').hide();
			$('#detail_art_vr').css('background-image', '');
		}
		
		
		
		var $wrapper;
		$wrapper = $('#detail_art_express').closest('.info-area');
		$wrapper.hide();
		
		// 작품 소개
		if (info.art_express) {
			$('#detail_art_express').html(g360.TextToHtml(info.art_express));
			$wrapper.show();
		}

		// 유튜브 영상
		$('#detail_art_yutube').hide();
		if (info.art_yutube) {
			var $iframe = $('<iframe frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>');
			var src = _self.cur_art_info.art_yutube.replace(/youtu.be/g, 'www.youtube.com/embed');
			$iframe.attr('src', src);
			$('#detail_art_yutube').append($iframe);
			$wrapper.show();
			$('#detail_art_yutube').show();
		}

		// 관련 이미지
		var files = info.subfile;
		$('#detail_art_subfile').hide();
		if (files) {
			$.each(files, function(idx, val){
				img_url = g360.art_img_path(info.email, this.filename);
				var $img = $('<img class="pt-4" src="' + img_url + '">');
				$('#detail_art_subfile').append($img);
			});
			$wrapper.show();
			$('#detail_art_subfile').show();
		} 
		
		// 추천 이유
		$wrapper = $('#detail_art_curator_express').closest('.info-area');
		$wrapper.hide();
		if (info.art_curator_express) {
			$('#detail_art_curator_express').html(g360.TextToHtml(info.art_curator_express));
			$wrapper.show();
		} 
		
		// 작가 정보
		
		_self.getArtistInfo(info.email);

	},
	getArtistInfo: function(email){
		var _self = this;
		
		// 작가 정보 표시
		$.ajax({
			url: g360.root_path + '/user_search.mon?email=' + email,
			success: function(data){
				_self.drawArtistInfo(data);
			} 
		});
		
		// 아트 컨설턴트의 소속 작가인 경우 아트 컨설턴트 정보 표시
		if (email.indexOf('-spl-') >= 0) {
			var curator_email = email.split('-spl-')[0]; 
			$.ajax({
				url: g360.root_path + '/user_search.mon?email=' + curator_email,
				success: function(data){
					_self.drawArtconsultantInfo(data);
				} 
			});
		}
	},
	drawArtistInfo: function(info){
		this.artist_info = info;
		var $wrapper = $('#detail_art_artist_info');
		if (info == null) {
			$wrapper.hide();
			return;
		} else {
			$wrapper.show();
		}
		
		// 작가 사진
		if (info.photoimage_list) {
			//var pic_url = g360.user_photo_url(info.email);
			//var gubun = info.gubun;
			//var url2 = g360.user_photo_url_none(gubun);
			//$('#detail_art_artist_info .artist-pic').css('background-image', 'url("' + pic_url + '"), url("' + url2 + '")');
			var pic_url = g360.user_photo_color_url(info.email);
			
			// 버전 정보 추가
			pic_url += (info.photo_list_version ? '?open&ver=' + info.photo_list_version : '');
			
			$('#detail_art_artist_info img').attr('src', pic_url);
			//$('#detail_art_artist_info .artist-pic').css('background-image', 'url("' + pic_url + '")');
			
		}
		
		
		
		// 작가 정보
		//$('#detail_art_artist_name').text(info.nickname ? info.nickname : info.name);
		//$('#detail_art_artist_birth').text(info.birth);
		$('#detail_art_artist_name').text(g360.TextToHtml(info.nickname));
		$('#detail_art_artist_content').css('height', 'calc(100% - ' + ($('#detail_art_artist_name').height()+110) + 'px)');
		if (info.content) {
			$('#detail_art_artist_content').html('<div>' + g360.TextToHtml(info.content) + '</div>');
			var wrap_height = $('#detail_art_artist_content').height();
			var content_height = $('#detail_art_artist_content div').height();
			if (content_height > wrap_height) {
				$('#detail_art_artist_content').addClass('has-more');
			}
		}
		
		// 판매자의 다른 작품
		this.getArtistPicture(info.email);
	},
	getArtistPicture: function(email){
		var _self = this;
		var url = g360.root_path + "/load_image_for_artist.mon?start=" + 0 + "&perpage=" + (_self.other_cnt + 2) + "&email=" + email;
		return $.ajax({
			url : url,
			success : function(data){
				if ($.isArray(data)) {
					if (data[0].totalcount > 0){
						_self.drawArtistPicture(data);
					}
					
				} else {
					return;
				}
			},
			error : function(e){
				//console.log("작가의 다른작품 데이터 처리중 오류가 발생하였습니다.");
				alert(g360.g_lang.Error_Alert1);
			}
		})
	},
	drawArtistPicture: function(data){
		var _self = this;
		var _cnt = 0;		
		var $wrapper = $('#detail_art_other');
		var $btn_more = $('#btn_art_show_more');
		$.each(data, function(idx, val){
			// 현재 확인중인 이미지와 겹치는 경우 예외처리
			if (this.totalcount) return true;
			if (this.art_img_filename == _self.cur_art_info.art_img_filename) return true;
			
			// 정해진 카운트만큼만 표시
			_cnt++;
			if (_cnt > _self.other_cnt) {
				// 작가 작품 정보 더 보기 버튼 표시
				$btn_more.parent().show();
				return false;
			}
			
			
			var _thumb = g360.preview_img_path(this.email, this.art_img_filename);
			_thumb = _thumb + "?open&ver=" + this.version;
			//var _thumb = g360.thumbnail_img_path(this.email, this.art_img_filename);
			var _s = this.file_width > this.file_height ? 'height' : 'width';
			var _title = this.art_title.replace(/[\t\r\n\\"']/g, '');
			var _html = '<div class="other-art"><div class="inner-a"><div class="inner-b">' +
							'<img src="' + _thumb + '" class="preview" style="' + _s + ':100%;" title="' +_title+ '" data-art-id="' + this.art_img_filename + '">' +
							'<p>' + _title + '</p>' +
						'</div></div></div>';
			$wrapper.append(_html);
		});
		
		// 작가 작품 더보기 (작가 작품이 20개 이상일때만 표시되는 버튼임)
		if ($btn_more.is(':visible')) {
			$btn_more.on('click', function(){
				var email = _self.artist_info.email;
				g360.showArtistDetail(email, '2');
			});
		}
		
		if (_cnt == 0) {
			$('#detail_art_nav_3').parent().hide();
		}
	},
	"drawArtconsultantInfo": function(info){
		var _self = this;
		var $wrap = _self.wrapper.find('.art_consultant_sh');
		var img = g360.user_photo_url(info.email);
		
		$wrap.find('img').attr('src', img);
		$wrap.show();
		
		$('#detail_art_curator_name').text(g360.TextToHtml(info.nickname));
		$('#detail_art_curator_content').text(g360.TextToHtml(info.content));
		
	},
	"stopAudio" : function(){
		var _self = this;
		if (_self.wrapper.find('.btn_sound').hasClass('on') && !_self.wrapper.find('.btn_sound').hasClass('pause')) {
			_self.audio.pause();
			if (g360.time_interval) clearInterval(g360.time_interval);
			//_self.wrapper.find('.btn_sound').removeClass('on');
			_self.wrapper.find('.btn_sound').addClass('pause');
		}
	},
	"getAudioTime": function(){
		var _self = this;
		var total = parseInt(_self.audio.duration);
		var remain = _self.audio.duration - _self.audio.currentTime;
		remain = parseInt(remain);
		var m = parseInt(remain / 60);
		var s = remain - m * 60;
		
		_self.wrapper.find('.remain-time').text('- ' + m + ':' + (s < 10 ?'0'+s:s));
	},
	"showTooltip":function(opt){
		if (g360.is_disp_tooltip) {
			var _top = opt.top - 40;
			var _left = opt.left; 
			this.tooltip.css({
				top:(_top<5 ? 5 : _top),
				left:(_left<5? 5 : _left)
			});
			this.tooltip.show();
		}
	},
	"hideTooltip":function(){
		this.tooltip.hide();
	}
}

