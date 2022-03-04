
function gArtRequestMain(){	
	this.uploadfilename = "";
	this.request_slider = "";
	
	this.start = 0;
	this.perpage = 20;
	this.totalcount = 0;
	this.complete = false;
	
	gArtRequestMain.open_type = "new";   //new 신규 작성일 경우 , edit 편집일 경우
	gArtRequestMain.edit_dockey = "";
}

gArtRequestMain.prototype = {		

	"init" : function(di){
		var _self = this;
				
		
		
	
		//달력 세팅
		g360.wrap_calendar("req_date", "select_date_req");
		
		$("#fileupload_dropzone").on("click", function(evnet){
			gArtRequest.show_upload_imag_dis();
			$("#artRequestMydropzone1").click();
		});
		
		$("#aipainter_run").on("click", function(event){
			//gArtRequest.popup_aipainter_start();
			g360.aiPainter_Start(true);
			
		});
		
		$("#aipainter_list").on("click", function(evnet){
			g360.body_scroll_hide();
			var $list = $("#aipainter_data_list_ul");
			$('#aipainter_data_list_loader').addClass('first');
			
			if (_self.start == 0) {
				// 처음 열 때 새로 셋팅
				$("#aipainter_popup").popup({
					onclose: function(){
						$('#aipainter_data_list_loader').addClass('first');
						g360.body_scroll_show();
					},
					position: {my:'center', at:'center', of:window}
				});
				_self.initScroll();
			}
			
			$list.empty();
			_self.start = 0;
			_self.complete = false;
						
			gArtRequest.popup_aipainter_list();	
				
			/*
			// 데이터가 로딩되어 있으면 레이어만 표시함
			$('#aipainter_data_list').mCustomScrollbar('scrollTo','top', {scrollInertia:0});
			$("#aipainter_popup").popup('show');
			$('#aipainter_data_list_loader').removeClass('first');
			$('#aipainter_data_list_loader').removeClass('active');
			return false;
			*/
		});
		
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
		
		$("#art_price3").blur(function(){
			var price = parseInt($(this).val().replace(/,/gi,"")) * 10000;
			
			price = g360.comma(g360.setWon(price));
			$("#art_price_dis3").text("‘"+price+"’");
		});
		
		$("#art_price3").keyup(function(event){
			  if(event.which >= 37 && event.which <= 40) return;
			  // format number
			  $(this).val(function(index, value) {
			    return value
			    .replace(/\D/g, "")
			    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
			    ;
			  });
			
		});
		
		$("#art_request_submit2").on("click", function(evnet){
			if (!g360.login_check()) {
				g360.login_window_max();
				$("#p_login").click();
				return;
			}
			gArtRequest.fileupload();
		});
		
		$("#art_request_auto_recommend2").on("click", function(event){
			gArtRequest.AI_Search_Query();
			return false;
		});
		
		
		$("#art_w").blur(function(){
			var height = $("#art_h").val();
			var width = $("#art_w").val();
			
			var stv = "(h" + height + "cm x w" + width + "cm)";
			
			
			$("#request_size_text").html(g360.g_lang.Artwork_Recom6_1+' <strong>\'' + $('#btn_request_shape').text() + ' ' + stv + '\'</strong> '+g360.g_lang.Artwork_Recom6_2);
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
			
			
			if (_type == "sel_direct"){
				$("#sel_direct_show").show();
				$('#btn_request_size').hide();
				$("#request_size_text").empty();
			}else{
				$("#sel_direct_show").hide();
				$('#btn_request_size').show();
				// 사이즈 로딩
				_self._sizeLoad();
				$('#btn_request_size').removeClass('disabled');
			}
			

			
			return false;
		});
		
		
		$("#art_make_manual_menu").on("click", function(event){
			g360.popup_manual_normal("art_make");
			return false;
		});
		
		
		g360.AI_Recommand("recommand_rec_slider2");
		

		//Dropzone.autoDiscover = false;
		Dropzone.options.artRequestMydropzone1 = {
				maxFilesize: 1000,  //100M
				maxFiles: 1,
				renameFile: function(file){
					var dt = new Date();
					var time = dt.getTime();
					return time+file.name;
				},
				acceptedFiles: ".jpeg,.jpg,.gif",
				addRemoveLinks: true,
				timeout: 500000,
				uploadMultiple: true,
				autoProcessQueue: false,
				clickable: true,
				// 병렬처리 WebConfig도 같이 수정해줘야함.
		        parallelUploads: 1,
		        dictDefaultMessage: g360.g_lang.Artwork_request5,
				accept : function(file, done){
					done();
				},
				
				fallback: function(){
					g360.gAlert("Error",g360.g_lang.HangingArt_6, "red", "left");
				},
				
				init: function(){
					
					this.on("maxfilesexceeded", function(file){
					
						this.removeFile(file);
						g360.gAlert("Error",g360.g_lang.HangingArt_7, "red", "left");
						
					});
					
					
					this.on("addedfile", function (file) {
	                    var _this = this;
	                //    gArtistInfo.file1 = file;
	                    if ($.inArray(file.type, ['image/jpeg', 'image/jpg', 'image/gif']) == -1) {
	                    	g360.gAlert("Error", g360.g_lang.Artwork_request6, "red", "left");
	                        _this.removeFile(file);
	                    }
	                });
					
					artRequestMydropzone1 = this; //Closer
				},				
				
				removedfile : function(file)
				{
				
		                var name = file.upload.filename;
		                $.ajax({
		                    headers: {
		                                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		                            },
		                    type: 'POST',
		                    url: '/removefile.gu',
		                    data: {filename: name},
		                    success: function (data){
		                        console.log("File has been successfully removed!!");
		                    },
		                    error: function(e) {
		                        console.log(e);
		                    }});
		                    var fileRef;
		                    return (fileRef = file.previewElement) != null ? 
		                    fileRef.parentNode.removeChild(file.previewElement) : void 0;
		        },
				success : function(file, response){

					
					var isOK = JSON.parse(response).result;
					if (isOK == "OK"){
						var res = JSON.parse(response);
						gArtRequest.uploadfilename = res.filename;
						gArtRequest.uploadForm();
					}else{
						g360.gAlert("Error",g360.g_lang.Art_Detail_Alert9, "red", "left");
					}					
				},
				error : function(file, response){
					return false;
				}
			}
			
			$("#artRequestMydropzone1").dropzone();	
				
		
		
		
		
		if (di != "null"){
		//	gArtRequest.di = di;
			gArtRequest.select_art_request_image_direct(di);
		}
		
		
		this.g_lang();
	},
	
	"g_lang" : function(){
		
		$(".g_lang_Mypage17").html(g360.g_lang.Mypage17);
		$(".g_lang_Artwork_Recom1").html(g360.g_lang.Artwork_Recom1);
		$(".g_lang_Artwork_Recom2").html(g360.g_lang.Artwork_Recom2);
		$(".g_lang_Artwork_Recom3").html(g360.g_lang.Artwork_Recom3);
		
		$(".g_lang_Artwork_Recom4").attr("placeholder",g360.g_lang.Artwork_Recom4);
		$(".g_lang_Artwork_Recom5").attr("placeholder",g360.g_lang.Artwork_Recom5);
		
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
		
		$(".g_lang_FileUpload").html(g360.g_lang.FileUpload);
		$(".g_lang_Artwork_request1").html(g360.g_lang.Artwork_request1);
		$(".g_lang_Artwork_request2").html(g360.g_lang.Artwork_request2);
		$(".g_lang_Artwork_request3").html(g360.g_lang.Artwork_request3);
		$(".g_lang_Artwork_request4").html(g360.g_lang.Artwork_request4);
		$(".g_lang_Shape").html(g360.g_lang.Shape);
		
		$(".g_lang_Square").html(g360.g_lang.Square);
		$(".g_lang_Horizontal").html(g360.g_lang.Horizontal);
		$(".g_lang_Vertical").html(g360.g_lang.Vertical);
		$(".g_lang_Direct_Input").html(g360.g_lang.Direct_Input);
		$(".g_lang_Height").html(g360.g_lang.Height);
		$(".g_lang_Width").html(g360.g_lang.Width);
		
		$(".g_lang_Size1").html(g360.g_lang.Size1);
		$(".g_lang_Artwork_Recom13").attr("value",g360.g_lang.Artwork_Recom13);
	},
	
	"AI_Search_Query" : function(){
		var drawid = "auto_recommand2";
		var text = $("#req0").val() + " " + $("#req1").val();
		var height = $("#art_height").val();
		var width = $("#art_width").val();
		var price = $("#art_price3").val();
		
		
		showid = "recommand_draw_top2";
		g360.AI_Search_Recommand(showid, drawid, text, height, width, price);
	},
	
	
	
	"aiPainter_Start" : function(){
		var _self = this;
		var url = g360.root_path + "/template_images.mon";
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				
				var html = "";
				html += "<div class='layer' >";
				html += "	<div class='layer_wrap style'>";
				html += "		<h2 class='bg_white'>"+g360.g_lang.AIPainter+"</h2>";
				html += "		<button class='btn btn_layer_close'>"+g360.g_lang.Close+"</button>";
				html += "		<div class='layer_content bg_white'>";
				
				html += "			<div class='layer_content_b'>";
				
				html += "				<div class='content_layer_wrapper file'>";
				//html += "					<div class='upload_file'>";			

				html += "					<div class='thumb_b' id='xxpp'>";
				html += "						<form method='post' action='/FileUpload_AIPainter.gu' enctype='multipart/form-data' class='dropzone' id='Mydropzone27'>";
				html += "							<input type='hidden' name='filepath' value='artRequest_AI' />";
				html += "							<input type='hidden' name='preview' value='true' />";
				html += "						</form>";
				html += "					</div>";
							
				//html += "					</div>";
				html += "				</div>";
				
				
			//	html += "<div class='form-row'><div class='form-group'><div class='dropzone dz-square' id='dropzone-example'></div></div></div>";
				
				html += "				<div class='content_layer_wrapper list'>";
				html += "					<ul id='ai_painter_ul'>";
				
				for (var i = 0 ; i < data.length; i++){
					var info = data[i];
					
					if (typeof(info.artist) == "undefined"){
						html += "					<li id='"+info.name+"'><div class='template_wrapper' style=\"background-image:url('/artimage/ai_sample/"+info.name+"_small.jpg')\"></div></li>";
					}else{
						html += "					<li id='"+info.name+"'><div class='template_wrapper' style=\"background-image:url('/artimage/ai_sample/"+info.name+"_small.jpg')\"><p>"+info.title+"</p><span>"+info.artist+"</span></div></li>";
					}
					
//					html += "					<li id='"+info.name+"'>";
//					html += "						<div class='template_wrapper' style=\"background-image:url('/artimage/ai_sample/"+info.name+"_small.jpg')\" >";
//					html += "						</div>";
//					html += "					</li>";
				}
				
				html += "					</ul>";
				html += "				</div>";
				html += "			</div>"; // layer_content_b
				
				html += "			<div class='email_area'>";
				html += "				<dl>";
				//html += "					<dt>스타일이 적용된 결과물을 수신 받을 이메일주소 </dt>";
				html += "					<dd>";
				html += "						<div class='custom-control custom-checkbox'>";
				html += "							<input type='checkbox' class='custom-control-input' id='ck_send_mail'>";
				html += "							<label class='custom-control-label' for='ck_send_mail'>"+g360.g_lang.Artwork_request7+"</label>";
				html += "						</div>";
				html += "						<input type='text' id='ai_emailaddress' class='txt' /> ";
				html += "					</dd>";
				html += "				</dl>";
				html += "			</div>";
				html += "		</div>";
				html += "		<div class='bottom_area bg_white'>";
				html += "			<button class='btn btn_violet' id='ai_painter_request2'>"+g360.g_lang.Artwork_request8+"</button>";
				html += "		</div>";
				html += "	</div>";
				html += "</div>";


				$("#aipainter_start").html(html);
				
				
				if (g360.login_check()){
					var email = g360.UserInfo.email;
					$("#ai_emailaddress").val(email);
				}
				
				// 닫기
				$('#aipainter_start .btn_layer_close').on('click', function(){
					$('#aipainter_start').popup('hide');
				});
				
				// 템플릿 선택
				$("#ai_painter_ul li").on("click", function(e){
					$("#ai_painter_ul li").removeClass('on');
					$(this).addClass("on");
				});
				
				// 체크박스
				$('#ck_send_mail').on('click', function(){
					if ($(this).is(':checked')){
						//$('#ai_emailaddress').show();
						//받는 메일 주소 변경 불가능
					} else {
						$('#ai_emailaddress').hide();
					}
				});
				
				// 요청하기
				$("#ai_painter_request2").on("click", function(event){
					
					if (Mydropzone27.files.length == 0){
						g360.gAlert("Error",g360.g_lang.Artwork_request_Alert1, "red", "left");
						return false;
					}
					
					var check_img = $("#ai_painter_ul li.on").attr('id');
					if (!check_img){
						g360.gAlert("Error",g360.g_lang.Artwork_request_Alert2, "red", "left");
						return false;
					}
					g360.loadingbar_open(g360.g_lang.Artwork_request_Alert3);
					_self.ai_painter_submit();
				});
				
				// 스크롤바
				$('#aipainter_start .list').mCustomScrollbar({				
					theme:"minimal-dark",
					mouseWheelPixels: 400,
					mouseWheel:{ preventDefault: false },
		         	advanced:{
		         		updateOnContentResize: true
		         	}
				});
				
				gArtRequest.upload_design_set();

				
			},
			error : function(e){
				g360.error_alert();
			}
		})
		
		
		
		
	},
	
	"ai_painter_submit" : function(){
		if (Mydropzone27.files.length > 0){
			Mydropzone27.processQueue();
		}else{
			g360.gAlert("Error",g360.g_lang.Artwork_request_Alert4, "red", "left");
			return false;
		}
	},
	
	"ai_request_uploadFrom" : function(upload_file){
		var _self = this;
		var send_email = $.trim($("#ai_emailaddress").val());
		var ischeck = $("#ck_send_mail").is(":checked");
		var tmpl_id = $("#ai_painter_ul li.on").attr('id');
		var data = JSON.stringify({
			request_upload_img 	: upload_file,
			request_is_send_mail: ischeck,
			request_select_img	: tmpl_id,
			request_send_mail	: send_email,
			request_status		: "1"
		});
		
	//	g360.loadingbar_open("Gallery360 인공지능 큐리가 작품을 제작하고 있습니다.....");
		
		$.ajax({
			type : "Post",
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : g360.root_path + "/art_request_save_ai_painter.mon",
			error : function(){
				g360.error_alert();
				g360.loadingbar_close();
			}
		}).then(function(xdata){
			//큐리서버에 호출해서 실시간 변환을 요청
			$.ajax({
				url : g360.root_path + "/call_curie_aipainter_realtime.mon?dockey="+ xdata.dockey,
				success : function(){
					_self.display_complete2(xdata.dockey, upload_file, tmpl_id);
				},
				error : function(){
					g360.error_alert();
					g360.loadingbar_close();
				}
			});
		});
	},
	
	"display_complete" : function(){
		var html = "";
		
		html += "<div class='layer'>";
		html += "	<div class='layer_wrap complete'>";
		html += "	<h2 class='bg_white'>"+g360.g_lang.AIPainter+"</h2>";
		html += "	<button class='btn btn_layer_close' onclick=\"gArtRequest.close_popup('aipainter_start')\">"+g360.g_lang.Close+"</button>";
		html += "	<div class='layer_content bg_white'>";
		html += "		<img src='../img/request/icon-ai-painter-complete.svg' alt='' />";
		html += "		<h3>"+g360.g_lang.Artwork_request12+"</h3>";
		html += "		<p>"+g360.g_lang.Artwork_request9+"</p>";
		html += "	</div>";
		html += "	<div class='bottom_area bg_white'>";
		html += "		<button class='btn btn_gray btn_painter' onclick=\"gArtRequest.aiPainter_Start()\">다시하기</button>";
		html += "		<button class='btn btn_violet btn_ok' onclick=\"gArtRequest.close_popup('aipainter_start')\">제작요청</button>";
		html += "	</div>";
		html += "</div>";
		
		$("#aipainter_start").html(html);

	},
	
	"display_complete2" : function(dockey, filename, check_img){
		
		var html = "";		
		var _self = this;

		var inx = dockey.lastIndexOf("_");
		var email = dockey.substring(0,inx);
	//	var spl = dockey.split("_");
		var url = "/artimage/"+email+"/artRequest_AI/result/"+dockey+"_out_water.png";
		
		var url1 = "/artimage/"+email+"/artRequest_AI/expand/"+filename+"_small.jpg";
		var url2 = "/artimage/ai_sample/"+check_img+"_small.jpg";
		
		g360.filedownload_url = url;
		g360.filedownload_filekey = dockey;
		
		html += "<div class='layer'>";
		html += "	<div class='layer_wrap complete'>";
		html += "	<h2 class='bg_white'>"+g360.g_lang.AIPainter+"</h2>";
		html += "	<button class='btn btn_layer_close' onclick=\"gArtRequest.close_popup('aipainter_start')\">"+g360.g_lang.Close+"</button>";
		
		
		html += "<div style=\"width:100%;padding:10px;height:calc(100% - 122px)\">";
		html += "	<div style=\"width:100%;height:100%;position:relative;\">";
		html += "		<div class=\"thm_s\">";
		html += "			<div style=\"background-image:url('" + url1 + "');\"></div>";
		html += "			<div style=\"background-image:url('" + url2 + "');\"></div>";
		html += "		</div>";
		html += "		<div class=\"thm_b\" style=\"background-image:url('" + url + "');\"></div>";
		html += "	</div>";
		html += "</div>";
		
		html += "<div>";
		html += "	<div class='bottom_area bg_white'>";
		html += "		<button class='btn btn_gray btn_painter' onclick=\"gArtRequest.aiPainter_Start()\">"+g360.g_lang.Artwork_request10+"</button>";
		html += "		<button class='btn btn_violet btn_ok' onclick=\"gArtRequest.select_art_request_image()\">"+g360.g_lang.Artwork_request11+"</button>";
		html += "	</div>";
		html += "</div>";
		
		$("#aipainter_start").html(html);
		
		g360.loadingbar_close();
	},
	
	
	"upload_design_set" : function(){
		var _self = this;
		//Dropzone.autoDiscover = false;
		Dropzone.options.Mydropzone27 = {
				maxFilesize: 1000,  //100M
				maxFiles: 1,
				renameFile: function(file){
					var dt = new Date();
					var time = dt.getTime();
					return time+file.name;
				},
				acceptedFiles: ".jpeg,.jpg,.gif",
				addRemoveLinks: true,
				timeout: 500000,
				uploadMultiple: true,
				autoProcessQueue: false,
				clickable: true,
				// 병렬처리 WebConfig도 같이 수정해줘야함.
		        parallelUploads: 1,
		        dictDefaultMessage: '<p><span>'+g360.g_lang.Artwork_request13+'</span><span class="file-type">(.jpg, .gif)</span><button type="button" class="btn btn_file">'+g360.g_lang.Artwork_request14+'</button></p>',
				accept : function(file, done){
					done();
				},
				
				fallback: function(){
					g360.gAlert("Error",g360.g_lang.HangingArt_6, "red", "left");
				},
				
				init: function(){
					
					//this.hiddenFileInput.click(); //opens the file select dialogue
					
					this.on("maxfilesexceeded", function(file){
						this.removeFile(file);
						g360.gAlert("Error",g360.g_lang.HangingArt_7, "red", "left");
					});
					
					this.on("addedfile", function (file) {
	                    var _this = this;
	                //    gArtistInfo.file1 = file;
	                    if ($.inArray(file.type, ['image/jpeg', 'image/jpg', 'image/gif']) == -1) {
	                    	g360.gAlert("Error",g360.g_lang.Artwork_request6, "red", "left");
	                        _this.removeFile(file);
	                    }
	                });
					
					Mydropzone27 = this; //Closer
				},				
				
				removedfile : function(file)
				{
				
		                var name = file.upload.filename;
		                $.ajax({
		                    headers: {
		                                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		                            },
		                    type: 'POST',
		                    url: '/removefile.gu',
		                    data: {filename: name},
		                    success: function (data){
		                        console.log("File has been successfully removed!!");
		                    },
		                    error: function(e) {
		                        console.log(e);
		                }});
	                    var fileRef;
	                    return (fileRef = file.previewElement) != null ? 
	                    fileRef.parentNode.removeChild(file.previewElement) : void 0;
		        },
				success : function(file, response){
					var isOK = JSON.parse(response).result;
					if (isOK == "OK"){
						var res = JSON.parse(response);
						_self.ai_request_uploadFrom(res.filename);						
					}else{
						//g360.load
						g360.gAlert("Error",g360.g_lang.HangingArt_8, "red", "left");
						g360.loadingbar_close();
					}
				},
				error : function(file, response){
					g360.loadingbar_close();
					return false;
				}
			}
			
			$("#Mydropzone27").dropzone();	
			return false;
	},
	
	
	"popup_aipainter_start" : function(){
		var _self = this;
		var html = "";
		
		html += "<div class='layer_wrap intro'>";
		html += "<h2 class='bg_white'>"+g360.g_lang.AIPainter+"</h2>";
		html += "	<button class='btn btn_layer_close'>"+g360.g_lang.Close+"</button>";
		html += "	<div class='curator_rmd' style='background:#fafafa;'>";
		html += "		<div id='curator_rmd_nav_btn'></div>";
		html += "		<div id='rec_sliderx' class='act-slider rmd_slider owl-carousel owl-theme' >";
		html += "			<div class='item'>";
		html += "				<div class='art-box2' style=\"background-image:url('/img/request/ai-paint-walk-through-01.png')\">";
		html += "					<p>"+g360.g_lang.Artwork_request15+"</p>";
		html += "				</div>";
		html += "			</div>";
		html += "			<div class='item'>";
		html += "				<div class='art-box2' style=\"background-image:url('/img/request/ai-paint-walk-through-02.png')\">";
		html += "					<p>"+g360.g_lang.Artwork_request16+"</p>";
		html += "				</div>";
		html += "			</div>";
		html += "			<div class='item'>";
		html += "				<div class='art-box2' style=\"background-image:url('/img/request/ai-paint-walk-through-03.png')\">";
		html += "					<p>"+g360.g_lang.Artwork_request17+"</p>";
		html += "				</div>";
		html += "			</div>";
		html += "			<div class='item'>";
		html += "				<div class='art-box2' style=\"background-image:url('/img/request/ai-paint-walk-through-04.png')\">";
		html += "					<p>"+g360.g_lang.Artwork_request18+"</p>";
		html += "				</div>";
		html += "			</div>";
		html += "			<div class='item'>";
		html += "				<div class='art-box2' style=\"background-image:url('/img/request/ai-paint-walk-through-05.png')\">";
		html += "					<p>"+g360.g_lang.Artwork_request19+"</p>";
		html += "				</div>";
		html += "			</div>";
		html += "		</div>";
		html += "	</div>";
		html += "	<div class='bottom_area bg_white'>";
		html += "		<button class='btn btn_violet btn_start' id='ai_painter_start' onclick=\"gArtRequest.aiPainter_Start();\">"+g360.g_lang.Start+"</button>";
		html += "	</div>";
		html += "</div>";
		
		$("#aipainter_start").html(html);
		
		g360.body_scroll_hide();
		$("#aipainter_start").popup({
			blur: false,
			onclose: function(){
				g360.body_scroll_show();
			},
			position: {my:'center', at:'center', of:window}
		});
		$("#aipainter_start").popup('show');
		$("#aipainter_start").find('.btn_layer_close').on('click', function(){
			$("#aipainter_start").popup('hide');
		});
		
		_self.setCarousel();
		
	},
	
		
	"setCarousel" : function() {
		$('#rec_sliderx').owlCarousel({
			items : 1,
			loop: false,
			nav: true,
			navContainer: '#curator_rmd_nav_btn',
			navText: ['', ''],
			autoplay: false,
			responsiveRefreshRate: 100
		});
	},
	
	
	
	"close_popup" : function(id){
		if (id == 'aipainter_start') {
			$('#aipainter_start').popup('hide');
			return;
		}
//		g360.close_popup(id);
//		
//		g360.showBodyScroll();
//		return false;
		
		$("#" + id).hide();
	//	gArtRequest.request_slider.destroySlider();
		
		$("#preview_image_src").attr("src", "");
	//	g360.body_scroll_show();	
		
		$("#"+id).dialog("close");
		$("#"+id).popup('hide');
		
		
		
		g360.showBodyScroll();
	},
	
	"popup_aipainter_list" : function(){
		var _self = this;
		
		var $list = $("#aipainter_data_list_ul");		
		
		var url = g360.root_path + "/AIPainterList.mon?start="+gArtRequest.start+"&perpage="+gArtRequest.perpage;
		
		$.ajax({
			dataType : "json",
			url : url,
			success : function(data){
				
				// 공유하기 처리
				var $share_layer = $('<div class="layer_share_sh" style="display:none"></div>');
				var share_html = '';
				share_html += '<h3>공유하기</h3>';
				share_html += '<button class="btn_share_close_sh">닫기</button>';
				share_html += '<dl>';
				share_html += '	<dd><button class="btn_share btn_facebook_sh" data-type="facebook">'+g360.g_lang.Facebook+'</button></dd>';
				share_html += '	<dd><button class="btn_share btn_kakaotalk_sh" data-type="kakaotalk">'+g360.g_lang.Kakaotalk+'</button></dd>';
				share_html += '	<dd><button class="btn_share btn_naver_sh" data-type="naver">'+g360.g_lang.Naver+'</button></dd>';
				share_html += '	<dd><button class="btn_share btn_band_sh" data-type="band">'+g360.g_lang.Band+'</button></dd>';
				share_html += '	<dd><button class="btn_share btn_twitter_sh" data-type="twitter">'+g360.g_lang.Twitter+'</button></dd>';
				share_html += '	<dd><button class="btn_share btn_link_sh" data-type="link">'+g360.g_lang.Link+'</button></dd>';
				share_html += '</dl>';
				$share_layer.append(share_html);
				$list.append($share_layer);
				
				/*
				 * 공유하기 레이어
				 */
				$(document).off('mousedown.request.share').on('mousedown.request.share', function(e){
					if ($share_layer.is(':visible')) {
						if ($(e.target).closest('.layer_share_sh').length == 0) {
							$share_layer.hide();
						}
					}
				});
				// 닫기
				$share_layer.find('.btn_share_close_sh').on('click', function(){
					$share_layer.hide();
				});
				// 공유하기 버튼
				$share_layer.find('.btn_share').on('click', function(){
					var share_type = $(this).data('type');
					_self.share_menu(share_type);
				});
				
				
				// 리스트처리
				var html = "";
				for (var i = 0 ; i < (data.length); i++){

					var spl = data[i];
					
					if (i == 0){
						gArtRequest.totalcount = spl.totalcount;
					}else{
						var email = spl.email;
						var rfilename = spl.request_upload_img;
						var tfilename = spl.request_select_img;
						var sfilename = spl.dockey;
						var xfi = sfilename.replace("@","_").replace(".","_");
						var keyid = spl._id.$oid;
						
						var sourcepath = g360.domain + "/artimage/" + email + "/artRequest_AI/expand/" + rfilename + ".jpg";
						var sourcepath_small = g360.domain + "/artimage/" + email + "/artRequest_AI/expand/" + rfilename + "_small.jpg";
						
						var targetpath = g360.domain + "/artimage/ai_sample/" + tfilename + ".jpg";
						var targetpath_small = g360.domain + "/artimage/ai_sample/" + tfilename + "_small.jpg";
						
						
						var resultpath = g360.domain + "/artimage/" + email + "/artRequest_AI/result/" + sfilename + "_out.jpg";
						var resultpath_water_full = g360.domain + "/artimage/" + email + "/artRequest_AI/result/" + sfilename + "_out_water.png";						
						var resultpath_water_small = g360.domain + "/artimage/" + email + "/artRequest_AI/result/" + sfilename + "_out_water_small.png";
						
						
						html = "	<li style='border:1px solid gray; overflow:inherit'>";
						html += "		<div class='thm_s'>";
						html += "			<span onclick=\"g360.preview_img_direct('" + sourcepath +"', '" + email + "', 'f')\" style=\"background-image:url('" + sourcepath_small + "')\"></span>";
						html += "			<span onclick=\"g360.preview_img_direct('" + targetpath +"', '" + email + "', 'f')\" style=\"background-image:url('" + targetpath_small + "')\"></span>";
						html += "		</div>";
						html += "		<button class='btn btn_content_share_sh'>"+g360.g_lang.Share1+"</button>";
						html += "		<div class='thm_b' onclick=\"g360.preview_img_direct2('"+resultpath_water_full+"','"+email+"','"+sfilename+"')\" style='background-image:url(\"" + resultpath_water_small + "\")'>";
						html += "		<button class='btn btn_content_delete'>"+g360.g_lang.Delete+"</button>";
						html += "		</div>";
						html += "	</li>";
						
						var $li = $(html);
						$li.find('.btn_content_delete').on('click', function(e){
							_self.delete_item(sfilename, e);
							return false;
						});
						$li.find('.btn_content_share_sh').on('click', function(e){
							_self.share_id = keyid;
							_self.share_key = sfilename;
							$share_layer.show().position({
								my: 'right top',
								at: 'right bottom+2',
								of: this
							});
							return false;
						});
						$list.append($li);
					}
				}
				
				
				
				$("#aipainter_popup").popup('show');
				
				if (data.length > 1) _self.start += (data.length-1);
				if ((data.length-1) < _self.perpage) {
					_self.complete = true;
				}
				
				$('#aipainter_data_list_loader').removeClass('first');
				$('#aipainter_data_list_loader').removeClass('active');
				
			},
			error : function(er){
				g360.error_alert();
			}
		})
		
	
		
		
	},
	
	
	"share_menu" : function(opt){
		var _self = this;				
		var url = "https://www.gallery360.co.kr/sharesns.mon?key=" + _self.share_id;
		
		var url_default_ks = "https://story.kakao.com/share?url="; 
		var url_default_fb = "https://www.facebook.com/sharer/sharer.php?u="; 
		var url_default_tw_txt = "https://twitter.com/intent/tweet?text="; 
		var url_default_tw_url = "&url="; 
		var url_default_band = "http://band.us/plugin/share?body="; 
		var url_route_band = "&route="; 
		var url_default_naver = "http://share.naver.com/web/shareView.nhn?url="; 
		var title_default_naver = "&title="; 
		var url_this_page = url; 
		var title_this_page = "Gallery360 AI Painter"; 

		var callurl = "";
		if (opt == "facebook"){
			callurl = url_default_fb + url_this_page; 			
			
		}else if (opt == "twitter"){
			callurl = url_default_tw_txt + document.title + url_default_tw_url + url_this_page; 
		}else if (opt == "band"){
			callurl = url_default_band + encodeURI(url_this_page)+ '%0A' + encodeURI(title_this_page)+'%0A' + '&route=tistory.com'; 
		}else if (opt == "naver"){
			callurl = url_default_naver + encodeURI(url_this_page) + title_default_naver + encodeURI(title_this_page);			
		}else if (opt == "kakaotalk"){
			_self.shareKakao(_self.share_id, _self.share_key);
			return false;
		}else if (opt == "link"){
			_self.copyToClipboard(url);
			g360.gAlert("Info",g360.g_lang.HangingArt_19, "blue", "top");
			return false;
		}

		window.open(callurl, '', 'scrollbars=no, width=600, height=600'); return false;
			
	},
	
	"copyToClipboard" : function(val){
		 var t = document.createElement("textarea");
		  document.body.appendChild(t);
		  t.value = val;
		  t.select();
		  document.execCommand('copy');
		  document.body.removeChild(t);
	},
	

	"shareKakao" : function(key, dockey){
	
	//	var email = dockey.split("_")[0];
		var inx = dockey.lastIndexOf("_");
		var email = dockey.substring(0,inx);

		var uuu = "https://www.gallery360.co.kr/artimage/"+email+"/artRequest_AI/result/"+dockey+"_out_water_small.png"
		var uu = "https://www.gallery360.co.kr/sharesns.mon?key="+key;
		
		Kakao.Link.sendDefault({
		  objectType: 'feed',
		  content: {
			title: g360.g_lang.Artwork_request20,
			description: '',
			imageUrl: uuu,
			link: {
			  webUrl: uu,
			  mobileWebUrl: uu
			}
		  },
		  buttons: [
			{
			  title: 'Gallery360 AI Painter',
			  link: {
				mobileWebUrl: uu,
				webUrl: uu
			  }
			}  
		  ]
		});
	},
	
	"show_upload_imag_dis" : function(){
		$("#req_select_uploadfile").attr("style", "display:''");
		$("#req_select_img").html("");
		gArtRequest.uploadfilename = "";
	},
	
	
	"select_art_request_image" : function(filekey){
		
		//debugger;
		$("#req_select_uploadfile").attr("style", "display:none");
		g360.close_popup("image_preview2");
		g360.close_popup('aipainter_popup');
		
		//var uu = g360.filedownload_url.replace("_water","");
		var uu = g360.filedownload_url;

		$("#req_select_img").html("<img src='" + uu + "' style='max-width:100%'>");
		
		gArtRequest.uploadfilename = "ai_" + g360.filedownload_filekey;
		//gArtRequest.uploadForm();
		
	},
	
	
	
	"select_art_request_image_direct" : function(filekey){
	//	debugger;
		
		$("#req_select_uploadfile").attr("style", "display:none");
		
		///artimage/ygkim@nh.com/artRequest_AI/result/ygkim@nh.com_20190218130531_out.png
	//	var spl = filekey.split("_");
		var inx = filekey.lastIndexOf("_");
		var email = filekey.substring(0,inx);
		
		var imurl = "/artimage/"+email+"/artRequest_AI/result/"+filekey+"_out_water.png"
		
	//	$("#req_select_img").html("<img src='" + g360.filedownload_url + "' style='max-width:100%'>");
		$("#req_select_img").html("<img src='" + imurl + "' style='max-width:100%'>");
		
		gArtRequest.uploadfilename = "ai_" + filekey;
		
		
	},
	
	
	
	"delete_item" : function(id, e){
		
		$.confirm({
			title : " ",
			content : g360.g_lang.Artwork_request_Alert5,
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
						var _self = this;
						var url = g360.root_path + "/AIPainter_Delete.mon?id="+id;
						$.ajax({
							dataType : "json",
							url : url,
							success : function(data){
								var $li = $(e.target).closest('li').remove();
								if (!_self.complete) _self.start = _self.start - 1;
							},
							error : function(e){
								g360.error_alert();
							}
						})
					}
				},
				moreButtons : {
					text : "취소"
				}
			}
		});	
		
		
	},
	
	
	"initScroll" : function(){
		var _self = this;
		// 무한 스크롤 
		this.search_controller = new ScrollMagic.Controller();
		this.search_scene = new ScrollMagic.Scene({triggerElement:'#aipainter_data_list_loader', triggerHook:'onEnter', offset:-300}).addTo(_self.search_controller);
		this.search_scene.on('enter', function(e) {
			var $loader = $('#aipainter_data_list_loader');
			if (_self.complete) return;
			if (!$loader.hasClass('first') && !$loader.hasClass('active')) {
				//console.log('curie art loading scroll');
				$loader.addClass('active');
				_self.popup_aipainter_list();
			}
		});
		
		
		// 커스텀 스크롤
		$('#aipainter_data_list').mCustomScrollbar({				
			theme:"minimal-dark",
			mouseWheelPixels: 400,
			mouseWheel:{ preventDefault: false },
         	advanced:{
         		updateOnContentResize: true
         	},
         	autoExpandScrollbar: true
		});
	},
	
	
	
	
	
	"fileupload" : function(){
		
		var _self = this;
		var dx = $("#req_select_uploadfile").css("display");
		if (dx == "none"){
			//AI 페인터로 선택한 경우 이미지 업로드 없이 선택된 이미지 정보를 활용해서 그냥 보낸다.
			_self.uploadForm();
		}else{
			if (artRequestMydropzone1.files.length > 0){
				var is_upload = false;
				$.each(artRequestMydropzone1.files, function(){
					if (this.status != 'success') {
						artRequestMydropzone1.processQueue();
						is_upload = true;
						return false;
					}
				});
				
				// 이미 업로드된 경우라면 파일 업로드 하지 않고 uploadForm 호출
				if (!is_upload) _self.uploadForm();
			}else{
				if (gArtRequestMain.open_type == "edit"){	
					gArtRequest.uploadForm();
				}else{
					g360.gAlert("Error",g360.g_lang.Artwork_request_Alert4, "red", "left");
					return false;
				}
			}
		}
		
		
	},
	
	
	
	
	
	"edit_init" : function(id){
		var _self = this;
		gArtRequestMain.edit_dockey = id;
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
				$("#art_price3").val(data.request_price);
				$("#art_price3").blur();
				
				gArtRequest.uploadfilename = data.request_file_name;
				
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
				
				$("#art_h").val(data.request_height);
				$("#art_w").val(data.request_width);
				
			//	$("#art_w").blur();
				var height = $("#art_h").val();
				var width = $("#art_w").val();				
				var stv = "(h" + height + "cm x w" + width + "cm)";			
				$("#request_size_text").html(g360.g_lang.Artwork_Recom6_1+' <strong>\'' + $('#btn_request_shape').text() + ' ' + stv + '\'</strong> '+g360.g_lang.Artwork_Recom6_2);
				
				
				$("#req_date").val(data.request_date);
				
				if (data.request_file_name != ""){			
					var imgtag = "";
					if (data.request_file_name.substring(0,3) == "ai_"){
						//ai페인터로 요청한 경우
						imgtag = "<img style='width:200px; float:right' src='/artimage/"+data.request_email+"/artRequest_AI/result/"+data.request_file_name.replace("ai_","")+"_out_water.png'>";
					}else{
						imgtag = "<img style='width:200px; float:right' src='/artimage/"+data.request_email+"/artRequest/mobile/"+data.request_file_name+".jpg'>";
					}					
					$("#req_pre_image").append(imgtag);
				}
				
			
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	
	
	
	
	"uploadForm" : function(){
		var _self = this;
		
		/*
		var request_type = "";
		var sh = $("#type_select2 .btn.btn-outline-w-b.active");
		for (var j = 0 ; j < sh.length; j++){
			var sx = sh[j].attributes.data.nodeValue;
			if (request_type == ""){
				request_type = sx;
			}else{
				request_type += " " + sx;
			}
		}
		*/
		
		var request_memo = $.trim($("#req1").val());
		var request_title = $.trim($("#req0").val());
		var request_price =  $.trim($("#art_price3").val());
		var request_date =  $.trim($("#req_date").val());    ///$("#select_date_req").text().replace(/\'/gi,"");
	
		var request_email = g360.UserInfo.email;
		var request_nickname = g360.UserInfo.nickname;
		
		
		var _type = $("#btn_request_shape").text();
		
		
		//Validation 체크
		if (request_title == '') {
			g360.gAlert_focus("Error",g360.g_lang.Artwork_request_Alert6, "red", "left","req0");
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
		
		var h = $("#art_h").val();
		var w = $("#art_w").val();
		if (_type == "직접입력"){

			if (h == ""){
				g360.gAlert_focus("Error",g360.g_lang.Artwork_request_Alert9, "red", "left","art_h");
				return false;
			}
			if (w == ""){
				g360.gAlert_focus("Error",g360.g_lang.Artwork_request_Alert10, "red", "left", "art_w");
				return false;
			}
		}else{
			if (!_self.size_type) {
				g360.gAlert("Error",g360.g_lang.Artwork_request_Alert11, "red", "left");
				return;
			}
		}
		
		if (request_price == '') {
			g360.gAlert_focus("Error",g360.g_lang.Artwork_request_Alert12, "red", "left", "art_price3");
			return;
		}
		if (isNaN(request_price.replace(/,/g, ''))) {
			g360.gAlert_focus("Error",g360.g_lang.Artwork_request_Alert13, "red", "left", "art_price3");
			return;
		}
		if (request_date == '배송 날짜 선택') {
			g360.gAlert("Error",g360.g_lang.Artwork_request_Alert14, "red", "left");
			return;
		}
		
		
		var request_type = (_self.shape_type == 'square' ? '1' : _self.shape_type == 'horizontal' ? '2' : _self.shape_type == 'vertical' ? '3' : "4");
		
		if (_type == "직접입력"){
			var request_width = w;
			var request_height = h;
			var request_hosu = 0;
		}else{
			var request_width = Math.round((FRAME_SIZE[_self.size_type][request_type == '1' ? 'S' : 'F'][request_type == '3' ? 'h' : 'w']) / 10);
			var request_height = Math.round((FRAME_SIZE[_self.size_type][request_type == '1' ? 'S' : 'F'][request_type == '3' ? 'w' : 'h']) / 10);
			var request_hosu = _self.size_type;
		}
		
		
	//	return false;

		var data = "";
		
		if (gArtRequestMain.open_type == "edit"){
			data = JSON.stringify({
				request_file_name : gArtRequest.uploadfilename,
				request_title : request_title,
				request_type : request_type,
				request_memo : request_memo,
				request_width : request_width,
				request_height : request_height,
				request_price : parseInt(request_price.replace(/,/gi,"")),
				request_date : request_date,				
				request_hosu : request_hosu,
				
				edit_dockey : gArtRequestMain.edit_dockey,
				mode : "edit"
			});
		}else{
			data = JSON.stringify({
				request_file_name : gArtRequest.uploadfilename,
				request_title : request_title,
				request_type : request_type,
				request_memo : request_memo,
				request_width : request_width,
				request_height : request_height,
				request_price : parseInt(request_price.replace(/,/gi,"")),
				request_date : request_date,
				request_email : request_email,
				request_nickname : request_nickname,
				request_hosu : request_hosu,
				request_status : "1",
				request_subform : "2",      //1 : 추천 요청  / 2 : 제작요청
				mode : "new"
			});
		}

		
//		var data = JSON.stringify({
//			request_file_name : gArtRequest.uploadfilename,
//			request_title : request_title,
//			request_type : request_type,
//			request_memo : request_memo,
//			request_width : request_width,
//			request_height : request_height,
//			request_price : parseInt(request_price.replace(/,/gi,"")),
//			request_date : request_date,
//			request_email : request_email,
//			request_nickname : request_nickname,
//			request_hosu : request_hosu,
//			request_status : "1",
//			request_subform : "2"      //1 : 추천 요청  / 2 : 제작요청
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

				g360.scroll_Top();
				$("#art_req").click();
			},
			error : function(e){
				g360.error_alert();
			}
		})
		
		
		
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
			return '<a class="dropdown-item" href="#" data-ho="' + ho + '">' + ho + '호 (h' + h + 'cm x w' + w + 'cm)</a>';
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
			var _shape, _w, _h;
			_self.size_type = ho;
			$('#btn_request_size').text(ho+'호');
			$('#request_size_text').html(g360.g_lang.Artwork_Recom6_1+' <strong>\'' + $('#btn_request_shape').text() + ' ' + $(this).text() + '\'</strong> '+g360.g_lang.Artwork_Recom6_2);
			return false;
		});
	},
}

