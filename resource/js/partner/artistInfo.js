
function gArtistInfoMain(opt, dockey){	
	gArtistInfo = this;
	gArtistInfo.img_filename = "";
	gArtistInfo.mp3_filename = "";
	gArtistInfo.mp4_filename = "";

	
	gArtistInfo.file1 = "";
	gArtistInfo.file2 = "";
	gArtistInfo.file3 = "";
	
	gArtistInfo.file_dpi = 0;
	gArtistInfo.file_width = 0;
	gArtistInfo.file_height = 0;
	gArtistInfo.file_size  = 0;
	gArtistInfo.file_type = "";
	gArtistInfo.MD5Value = "";
	gArtistInfo.mp3_md5 = "";
	gArtistInfo.mp4_md5 = "";
	
	gArtistInfo.call_option = opt;
	gArtistInfo.edit_dockey = dockey;
	
	gArtistInfo.subfiles = "";
	gArtistInfo.subfiles_before = "";
	gArtistInfo.subfiles_edit = new Array();
	
	gArtistInfo.mp3_md5_before = "";
	gArtistInfo.mp4_md5_before = "";
	gArtistInfo.mp3_filename_before = "";
	gArtistInfo.mp4_filename_before = "";
	
	gArtistInfo.price = "";
	gArtistInfo.shipping_fee = "";
	gArtistInfo.title = "";
	
	gArtistInfo.cUserEmail = "";
	
	gArtistInfo.isSales = "1";  //1 : 임시저장 , 0 : 판매요청  , 실제 Mongo값은 status
		
}

gArtistInfoMain.prototype = {		

	"init" : function(){
		var _self = this;
		
		
		if (g360.UserInfo.gubun == "art"){
			
			$("#a_artist").val(g360.UserInfo.name);
			$("#a_artist").prop("disabled", true);
		}else{
			//아트컨설턴트일 경우
			
		}
		
		$("#height1").css("display","none");
		
		gArtistInfo.artist_select_list_add();
		
		// 작품등록하기 도움말
		$('#btn_upload_help').on('click', function(){
			g360.popup_manual('vrgallery_create');
		});
		
		// 판매가 정보
		$('#btn_price_info').on('click', function(){
			$('#layer_price_info').toggle();
		});
		$('#btn_price_info').on('mouseover', function(){
			$('#layer_price_info').show();
		});
		$('#btn_price_info').on('mouseout', function(){
			$('#layer_price_info').hide();
		});
	
		$("#art_upload_start").on("click", function(){
			//파일을 먼저 업로드 하고 정상적으로 업로드되면 실제 필드 값을 저장한다.
			
			if (!g360.login_check()) {
				g360.login_window_max();
				$("#p_login").click();
				return;
			}
			
			
			art_width =  $("#art_s4").val();
			art_height = $("#art_s5").val();			
			art_price =  $("#art_s8").val();
						
			
			//유효성 검사 대상 체크
			
			var ck1 = $("#chk1").get(0).checked;			
			var ck2 = $("#chk2").get(0).checked;
			
			if (ck1 == false && ck2 == false){
				g360.gAlert_focus("Error", g360.g_lang.Register_Artwork_Alert1 , "red", "left", "chk1");
				return false;
			}
			
			
			if (art_height == ""){
				g360.gAlert_focus("Error", g360.g_lang.Register_Artwork_Alert2 , "red", "left", "art_s5");
				//g360.loadingbar_close();
				return false;
			}
			
			
			if (art_width == ""){
				g360.gAlert_focus("Error", g360.g_lang.Register_Artwork_Alert3 , "red", "left", "art_s4");
				//g360.loadingbar_close();
				
				return false;
			}
			
			if (art_height == "0"){
				g360.gAlert_focus("Error", g360.g_lang.Register_Artwork_Alert4 , "red", "left", "art_s5");
				//g360.loadingbar_close();
				return false;
			}
			
			
			if (art_width == "0"){
				g360.gAlert_focus("Error", g360.g_lang.Register_Artwork_Alert5 , "red", "left", "art_s4");
				//g360.loadingbar_close();
				
				return false;
			}
			
			if (art_price == ""){
				g360.gAlert_focus("Error", g360.g_lang.Register_Artwork_Alert6 , "red", "left", "art_s8");
				//g360.loadingbar_close();
				return false;
			}
			
			//작품 제목 입력
			var title = $("#a_title").val();
			title = $.trim(title);
			if(title == ""){
				g360.gAlert_focus("Error", g360.g_lang.Register_Artwork_Alert7 , "red", "left", "a_title");
				return false;
			}
			
			var email = $("#gubun_select_box").attr("data");					
			if (email == ""){
				g360.gAlert_focus("Error", g360.g_lang.Register_Artwork_Alert8 , "red", "left", "art_s5");
				$("#gubun_select_box").focus();
				return false;
			}
			
			
			//작가와 큐레이터의 업로드 방식이 변경되어 여기서 실제 등록되어야 할 사용자의 email 정보를 넘기는 것으로 변경한다.
			upMydropzone1.options.url = g360.root_path + "/FileUpload_Art_Fast.gu?key="+gArtistInfo.cUserEmail+"&ofile=";			
			Mydropzone3.options.url = g360.root_path + "/FileUpload_Art.gu?key="+gArtistInfo.cUserEmail; 			
			xxMydropzone2.options.url = g360.root_path + "/FileUpload_Art.gu?key="+gArtistInfo.cUserEmail; 			
			Mydropzone4.options.url = g360.root_path + "/FileUpload_Art_multi.gu?key="+gArtistInfo.cUserEmail;   
			
			if (gArtistInfo.call_option == "edit"){
			//	gArtistInfo.uploadForm();
				
				upMydropzone1.options.url = g360.root_path + "/FileUpload_Art_Fast.gu?key="+gArtistInfo.cUserEmail+"&ofile=" + gArtistInfo.edit_dockey;
				
				g360.loadingbar_open(g360.g_lang.Register_Artwork_Alert9);
				
				if (upMydropzone1.files.length > 0){
					upMydropzone1.processQueue();
				}else if (Mydropzone4.files.length > 0){
					Mydropzone4.processQueue();
				}else if (xxMydropzone2.files.length > 0){
					xxMydropzone2.processQueue();
				}else if (Mydropzone3.files.length > 0){
					Mydropzone3.processQueue();
				}else{
					gArtistInfo.uploadForm();
					return false;
				}
				
//				if (upMydropzone1.files.length > 0){
//					g360.loadingbar_open("작품정보를 수정 하고 있습니다. 잠시만 기다려 주세요......");
//										
//					upMydropzone1.processQueue();
//				}else{
//					g360.gAlert("Error", "이미지 파일은 반드시 선택하셔야 합니다." , "red", "left");
//					return false;
//				}
				
			}else{
				
				
				if (upMydropzone1.files.length > 0){
					g360.loadingbar_open(g360.g_lang.Register_Artwork_Alert10);
										
					upMydropzone1.processQueue();
				}else{
					g360.gAlert("Error", g360.g_lang.Register_Artwork_Alert11 , "red", "left");
					return false;
				}
				
			}
									
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
		
		$(".btn-group.flex-line.svg-60 .btn.btn-outline-w-b").on("click", function(){
			var uu = $(".btn-group.flex-line.svg-60 .btn.btn-outline-w-b.active");
			for (var i = 0 ; i < uu.length; i++){
				$(uu[i]).removeClass("active");
			}
			
			if (this.className.indexOf("active") >-1){
				$(this).removeClass("active");
			}else{
				$(this).addClass("active");
			}
		})
		
		
		$("#c-pick span").on("click", function(event){
			
			if ($(this).attr("class").indexOf("active") > -1){
				//기존에 선택되어 앴는 경우 선택을 해제한다.
				$(this).removeClass("active");
			}else{
				$(this).addClass("active");
			}
		});
		
		$("#art_upload_cancel").on("click", function(event){
			gArtistInfo.cancel_all();
		});
		
		$("#art_upload_manual").on("click", function(event){
			g360.popup_manual("art_upload");
		});
		
		////////////////////////////////////////////////
		$("#art_s8").blur(function(){
			var price = $(this).val();
			price = g360.comma(g360.setWon(price));
			$("#art_price_dis22").text("‘"+price+"’");
		});
		
		$("#art_s8").keyup(function(event){
			  if(event.which >= 37 && event.which <= 40) return;
			  // format number
			  $(this).val(function(index, value) {
			    return value
			    .replace(/\D/g, "")
			    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
			    ;
			  });
			
		});
		/////////////////////////////////////////////////////////////
		
		
		$("#shipping_fee").blur(function(){
			var price = $(this).val();
			price = g360.comma(g360.setWon(price));
			$("#art_price_dis222").text("‘"+price+"’");
		});
		$("#shipping_fee").keyup(function(event){
			  if(event.which >= 37 && event.which <= 40) return;
			  // format number
			  $(this).val(function(index, value) {
			    return value
			    .replace(/\D/g, "")
			    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
			    ;
			  });
			
		});
		
		
		$("#art_s5").blur(function(event){
			
			  if( (event.which >= 48 && event.which <= 57) || event.which == 190) return;
			  // format number
			  $(this).val(function(index, value) {
				  
					  return value.replace(/[^-\.0-9]/gi, "");
				 
			    
			  });
			
		});
		
		$("#art_s4").blur(function(event){
			  if( (event.which >= 48 && event.which <= 57) || event.which == 190) return;
			  // format number
			  $(this).val(function(index, value) {
				  
					  return value.replace(/[^-\.0-9]/gi, "");
				  
			    
			  });
			
		});
		
		$("#art_s10").keyup(function(event){
			  if(event.which >= 37 && event.which <= 40) return;
			  // format number
			  $(this).val(function(index, value) {
			    return value
			    .replace(/\D/g, "")
			    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
			    ;
			  });
			
		});


		
		$("#radio8").on("click", function(event){
			$("#shipping_fee").val("20000");
			$("#shipping_fee").blur();
		});
		
		
		$("#radio10").on("click", function(event){
			$("#shipping_fee").val("100000");
			$("#shipping_fee").blur();
		});
		
		$("#radio9").on("click", function(event){
			$("#shipping_fee").val("");
			$("#shipping_fee").blur();
		});
		
		$("#radio11").on("click", function(event){
			$("#shipping_fee").val("");
			$("#shipping_fee").blur();
		});
		
		
		//조형
		$("input[name='xcol']").change(function(){
			if($(this).val()=="조형"){
				$("#hosu1").css("display","none");
				$("#height1").css("display","inline");
				
				//세로, 가로
				$("#height0").text(g360.g_lang.Height1);
				$("#width0").text(g360.g_lang.Width1);
				//값초기화
				$("#art_s10").val("");
				
			}else{
				$("#hosu1").css("display","inline");
				$("#height1").css("display","none");
				
				//높이, 넓이
				$("#height0").text(g360.g_lang.Height);
				$("#width0").text(g360.g_lang.Width);
				//값초기화
				$("#art_s11").val("");
			}
		});
		
		///////////////////////////////////////////////////////////////////
		
		
		Dropzone.options.upMydropzone1 = {
			maxFilesize: 300,  //100M
			maxFiles: 1,
			renameFile: function(file){
				var dt = new Date();
				var time = dt.getTime();
				return time+file.name;
			},
			acceptedFiles: ".jpeg,.jpg,.png,.tif,.tiff",
			addRemoveLinks: true,
			timeout: 500000,
			uploadMultiple: true,
			autoProcessQueue: false,
			clickable: true,
			// 병렬처리 WebConfig도 같이 수정해줘야함.
	        parallelUploads: 1,
			//dictDefaultMessage: "작품 파일 이미지를 선택해 주세요.<br>Maxsize:300M(.jpg,&nbsp;.png,&nbsp;.tif)",
	        dictDefaultMessage: g360.g_lang.Register_Artwork_Alert12,
			accept : function(file, done){
				done();
			},
			
			fallback: function(){
				g360.gAlert("Error", g360.g_lang.HangingArt_6 , "red", "left");
			},
			
			init: function(){
				this.on("maxfilesexceeded", function(file){
					this.removeFile(file);
					g360.gAlert("Error", g360.g_lang.HangingArt_7 , "red", "left");
				});
				
				this.on("addedfile", function (file) {
                    var _this = this;
                    gArtistInfo.file1 = file;
                    if ($.inArray(file.type, ['image/jpeg', 'image/jpg', 'image/png', 'image/tif', 'image/tiff']) == -1) {
                       	g360.gAlert("Error", g360.g_lang.Artwork_request6 , "red", "left");
                        _this.removeFile(file);
                    }
                    
                    var ms = parseFloat((file.size / (1024*1024)).toFixed(2));
                    if (ms > this.options.maxFilesize){	                    	
                    	g360.gAlert("Error", g360.g_lang.Register_Artwork_Alert15 , "red", "left");
                        _this.removeFile(file);
                    }
                });
				
				
				
				
				upMydropzone1 = this; //Closer
			},				
			
			removedfile : function(file)
			{
				
	             //   var name = file.upload.filename;
	                var name = file.name;
	                var email = file.email;
	                var type = "art";
	                var dockey = file.dockey;
	                $.ajax({
	                    headers: {
	                                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
	                            },
	                    type: 'POST',
	                    url: '/removefile_dropzone.gu',
	                    data: {filename: name, email : file.email , type : type, dockey : dockey},
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
				
				
				//d/ebugger;
				var isOK = JSON.parse(response).result;
				if (isOK == "OK"){
					var res = JSON.parse(response);
			
					gArtistInfo.img_filename = res.filename;
					
					gArtistInfo.file_width = res.file_width;
					gArtistInfo.file_height = res.file_height;
					gArtistInfo.file_size  = res.file_size;
					gArtistInfo.file_type = res.file_type;
					gArtistInfo.MD5Value = res.MD5Value;
					gArtistInfo.file_dpi = res.file_dpi;
				
					if (Mydropzone3.files.length > 0){
						console.log("테스트3");
						Mydropzone3.processQueue();
					}else if (xxMydropzone2.files.length > 0){
						console.log("테스트2");
						xxMydropzone2.processQueue();
					}else if (Mydropzone4.files.length > 0){
						console.log("테스트4");
						Mydropzone4.processQueue();
					}else{
						console.log("테스트else");
						gArtistInfo.uploadForm();
					}
							
				}else if (isOk = "fileexist"){
					
					this.removeFile(file);
					g360.gAlert("Error", g360.g_lang.Register_Artwork_Alert16 , "red", "left");
					g360.loadingbar_close();
				}else{
					this.removeFile(file);
					g360.gAlert("Error", g360.g_lang.Art_Detail_Alert9 , "red", "left");
					g360.loadingbar_close();
				}					
			},
			error : function(file, response){
				return false;
			}
		}
		
		
		$("#upMydropzone1").dropzone();	
		
		///////////////////////////////////////////////////////////////////////////////////////////////////
		Dropzone.options.xxMydropzone2 = {
				maxFilesize: 300,  //100M
				maxFiles: 1,
				renameFile: function(file){
					var dt = new Date();
					var time = dt.getTime();
					return time+file.name;
				},
				acceptedFiles: ".mp4",
				addRemoveLinks: true,
				timeout: 500000,
				uploadMultiple: true,
				autoProcessQueue: false,
				clickable: true,
				// 병렬처리 WebConfig도 같이 수정해줘야함.
		        parallelUploads: 1,
		        dictDefaultMessage: g360.g_lang.Register_Artwork_Alert14,
				accept : function(file, done){
					done();
				},
				
				fallback: function(){
					g360.gAlert("Error", g360.g_lang.HangingArt_6 , "red", "left");
				},
				
				init: function(){
										
					this.on("maxfilesexceeded", function(file){
						this.removeFile(file);
						g360.gAlert("Error", g360.g_lang.HangingArt_7 , "red", "left");
					});
					
					this.on("addedfile", function (file) {
	                    var _this = this;
	                    gArtistInfo.file2 = file;
	                    if ($.inArray(file.type, ['video/mp4']) == -1) {
	                    	g360.gAlert("Error", g360.g_lang.Artwork_request6 , "red", "left");
	                        _this.removeFile(file);
	                    }
	                 
	                    var ms = parseFloat((file.size / (1024*1024)).toFixed(2));
	                    if (ms > this.options.maxFilesize){	                    	
	                    	g360.gAlert("Error", g360.g_lang.Register_Artwork_Alert15 , "red", "left");
	                        _this.removeFile(file);
	                    }
	                });
					
					
								
					
					xxMydropzone2 = this; //Closer
				},				
				
				removedfile : function(file)
				{
					
					var name = file.name;
	                var email = file.email;
	                var type = "mp4";
	                var dockey = file.dockey;
	                $.ajax({
	                    headers: {
	                                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
	                            },
	                    type: 'POST',
	                    url: '/removefile_dropzone.gu',
	                    data: {filename: name, email : file.email , type: type, dockey : dockey},
	                    success: function (data){
	                        console.log("File has been successfully removed!!");
	                        if (data.replace(/[\n\r]/gi,"") == "OK"){
		                        gArtistInfo.mp4_md5_before = "";                      	
		        				gArtistInfo.mp4_filename_before ="";
	                        }

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
						//gArtistInfo.uploadForm(res.filename);
						gArtistInfo.mp4_filename = res.mp4_filename;
						gArtistInfo.mp4_md5 = res.mp4_md5;;
					
						
						if (gArtistInfo.call_option == "edit"){
																				
							if (Mydropzone3.files.length > 0){
								Mydropzone3.processQueue();
							}else{
								gArtistInfo.uploadForm();
							}
						}else{
							if (Mydropzone4.files.length > 0){
								Mydropzone4.processQueue();
							}else{
								gArtistInfo.uploadForm();
							}
						}
						
						

					
											
					
						
						
					}else{

						g360.gAlert("Error", g360.g_lang.Art_Detail_Alert9 , "red", "left");
					}					
				},
				error : function(file, response){
					return false;
				}
			}
			
			$("#xxMydropzone2").dropzone();	
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		Dropzone.options.Mydropzone3 = {
				maxFilesize: 300,  //100M
				maxFiles: 1,
				renameFile: function(file){
					var dt = new Date();
					var time = dt.getTime();
					return time+file.name;
				},
				acceptedFiles: ".mp3, .m4a",
				addRemoveLinks: true,
				timeout: 500000,
				uploadMultiple: true,
				autoProcessQueue: false,
				clickable: true,
				// 병렬처리 WebConfig도 같이 수정해줘야함.
		        parallelUploads: 1,
		        dictDefaultMessage: g360.g_lang.Register_Artwork_Alert13,
				accept : function(file, done){
					done();
				},
				
				fallback: function(){
					g360.gAlert("Error", g360.g_lang.HangingArt_6 , "red", "left");
				},
				
				init: function(){
					this.on("maxfilesexceeded", function(file){
						this.removeFile(file);
						g360.gAlert("Error", g360.g_lang.HangingArt_7 , "red", "left");
					});
					
					this.on("addedfile", function (file) {
	                    var _this = this;
	                    gArtistInfo.file3 = file;
	                 
	                    if ($.inArray(file.type, ['audio/mp3', 'audio/x-m4a']) == -1) {
	                    	g360.gAlert("Error", g360.g_lang.Artwork_request6 , "red", "left");
	                        _this.removeFile(file);
	                    }
	                    
	                    var ms = parseFloat((file.size / (1024*1024)).toFixed(2));
	                    if (ms > this.options.maxFilesize){	                    	
	                    	g360.gAlert("Error", g360.g_lang.Register_Artwork_Alert15 , "red", "left");
	                        _this.removeFile(file);
	                    }
	                });
					
					Mydropzone3 = this; //Closer
				},				
				
				removedfile : function(file)
				{
					var name = file.name;
	                var email = file.email;
	                var type = "mp3";
	                var dockey = file.dockey;
	                $.ajax({
	                    headers: {
	                                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
	                            },
	                    type: 'POST',
	                    url: '/removefile_dropzone.gu',
	                    data: {filename: name, email : file.email , type : type, dockey : dockey},
	                    success: function (data){
	                        console.log("File has been successfully removed!!");
	                       
	                        if (data.replace(/[\n\r]/gi,"") == "OK"){
	                        	gArtistInfo.mp3_md5_before = "";                      	
		        				gArtistInfo.mp3_filename_before ="";
	                        }
	                        
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
					//	gArtistInfo.uploadForm(res.filename);
						
						gArtistInfo.mp3_filename = res.mp3_filename;
						gArtistInfo.mp3_md5 = res.mp3_md5;
					
						
						if (gArtistInfo.call_option == "edit"){

							gArtistInfo.uploadForm();
						
						}else{
							if (xxMydropzone2.files.length > 0){
								xxMydropzone2.processQueue();
							}else if (Mydropzone4.files.length > 0){
								Mydropzone4.processQueue();
							}else{
								gArtistInfo.uploadForm();
							}
						}
						
					
						
					}else{
						g360.gAlert("Error", g360.g_lang.Art_Detail_Alert9 , "red", "left");
					}					
				},
				error : function(file, response){
					return false;
				}
			}
			
			$("#Mydropzone3").dropzone();	
		
		
		
		///////////////////////////////////////////////////////////////////////////////////////
		var completeFiles = 0;
		Dropzone.options.Mydropzone4 = {
				maxFilesize: 1000,  //100M
				maxFiles: 10,
				renameFile: function(file){
					var dt = new Date();
					var time = dt.getTime();
					return time+file.name;
				},
				acceptedFiles: ".jpeg,.jpg,.png,.tif,.tiff",
				addRemoveLinks: true,
				timeout: 500000,
				uploadMultiple: true,
				
				autoProcessQueue: false,
			//	clickable: true,
				clickable : "#m4_preview",
				previewsContainer: "#m4_preview", 
				// 병렬처리 WebConfig도 같이 수정해줘야함.
		        parallelUploads: 10,
		   //     dictDefaultMessage: "작품이 전시된 이미지를 선택해 주세요.<br>(.jpg,&nbsp;.png,&nbsp;.tif)",
				accept : function(file, done){
					done();
				},
				
				fallback: function(){
					g360.gAlert("Error", g360.g_lang.HangingArt_6 , "red", "left");
				},
				
				init: function(){
					this.on("maxfilesexceeded", function(file){
						this.removeFile(file);
						this._filesexceeded = true; // 여기서 얼럿창 띄우면 여러번 뜰 수 있으므로 addedfiles 이벤트에서 처리되도록함		
					});
					this.on("addedfiles", function(file){
						if (this._filesexceeded) {
							g360.gAlert("Error", g360.g_lang.Register_Artwork_Alert17 + this.options.maxFiles + g360.g_lang.Register_Artwork_Alert18 , "red", "left");
							this._filesexceeded = false;
						}
					});
					
					this.on("addedfile", function (file) {
						$("#m4_text").text("");
	                    var _this = this;
	                    gArtistInfo.file1 = file;
	                    if ($.inArray(file.type, ['image/jpeg', 'image/jpg', 'image/png', 'image/tif', 'image/tiff']) == -1) {
	                    	g360.gAlert("Error", g360.g_lang.Artwork_request6 , "red", "left");
	                        _this.removeFile(file);
	                    }
	                    
	                    var $el = $(this.element);
	                    var $addBtn = $el.find('.add-btn');
	                    if ($addBtn.length == 0) {
	                    	$addBtn = $('<div class="add-btn"></div>');
	                    	$addBtn.on('click', function(){$el.click();});
	                    }
	                    
	                    if ($el.find('.dz-preview').length > 0) {
	                    	$el.find('.dz-preview:last-child').after($addBtn);
	                    } 
	                });
					
					Mydropzone4 = this; //Closer
				},				
				
				removedfile : function(file)
				{
				
					
					
					var name = file.name;
	                var email = file.email;
	                var type = "subfile";
	                var dockey = file.dockey;
	                $.ajax({
	                    headers: {
	                                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
	                            },
	                    type: 'POST',
	                    url: '/removefile_dropzone.gu',
	                    data: {filename: name, email : file.email, type : type, dockey : dockey},
	                    success: function (data){
	                        console.log("File has been successfully removed!!");
	                        
	                        var list = gArtistInfo.subfiles_before;
	                        var ttlist = new Array();
	                        for (var i = 0 ; i <list.length; i++){
	                        	var info = list[i];
	                        	if (info.filename == file.name){	                        		
	                        	}else{
	                        		ttlist.push(info);
	                        	}
	                        }
	                        
	                        gArtistInfo.subfiles_before = ttlist;
	                       
	                    },
	                    error: function(e) {
	                        console.log(e);
	                    }});
	                    var fileRef;
	                    return (fileRef = file.previewElement) != null ? 
	                    fileRef.parentNode.removeChild(file.previewElement) : void 0;
	                  
		        },
				success : function(file, response){
				
					completeFiles++;
					var totalfilecount = Mydropzone4.files.length;
					
					if (completeFiles == totalfilecount){
					
						var res = JSON.parse(response);
						
						if (gArtistInfo.call_option == "edit"){
							if (res.info.length > 0){
								gArtistInfo.subfiles = res.info;
							}					
							
							if (xxMydropzone2.files.length > 0){
								xxMydropzone2.processQueue();
							}else if (Mydropzone3.files.length > 0){
								Mydropzone3.processQueue();
							}else{
								gArtistInfo.uploadForm();
							}
							
							
						}else{
							
							if (res.info.length > 0){							
								gArtistInfo.subfiles = res.info;								
								gArtistInfo.uploadForm();
								
							}else{
								g360.gAlert("Error", g360.g_lang.Art_Detail_Alert9 , "red", "left");
							}					
						}		
						
					}
					
					
					
				},
				error : function(file, response){
					return false;
				}
			}
			
			$("#Mydropzone4").dropzone();	
		
			
		 	$("#m4_preview").sortable({
		 	    items:'.dz-preview',
		 	    cursor: 'pointer',
		 	    opacity: 0.5,
		 	    containment: '#m4_preview',
		 	    distance: 20,
		 	    tolerance: 'pointer',
		 	    stop: function () {
		 	    	
		 	    	if (gArtistInfo.call_option == "edit"){
		 	    		gArtistInfo.subfiles_edit = new Array();
		 	    		 var binfo_list = gArtistInfo.subfiles_before;
		 	    		 newQueue = [];
		 	    		$('#m4_preview .dz-preview .dz-filename [data-dz-name]').each(function (count, el) {           
			 	            var name = el.innerHTML;
			 	            
			 	            for (var i = 0 ; i < binfo_list.length; i++){
			 	            	var binfo = binfo_list[i];
			 	            	if (binfo.filename === name) {
			 	            		gArtistInfo.subfiles_edit.push(binfo);
			 	                    break;
			 	                }
			 	            }

			 	      });
		 	    		
		 	    	}else{
		 	    		 var queue = Mydropzone4.getAcceptedFiles();
				 	     newQueue = [];
				 	      $('#m4_preview .dz-preview .dz-filename [data-dz-name]').each(function (count, el) {           
				 	            var name = el.innerHTML;
				 	            queue.forEach(function(file) {
				 	                if (file.name === name) {
				 	                    newQueue.push(file);
				 	                }
				 	            });
				 	      });
				 	     Mydropzone4.files = newQueue;
		 	    	}
		 	     
		 	    }
		 	});
		
		
		 	gArtistInfo.g_lang();
		
	},
	
	"g_lang" : function(){
		
		$(".g_lang_Shape").html(g360.g_lang.Shape);
		$(".g_lang_Theme").html(g360.g_lang.Theme);
		
		$(".g_lang_Scenery").html(g360.g_lang.Scenery);
		$(".g_lang_Character").html(g360.g_lang.Character);
		$(".g_lang_Still_Life").html(g360.g_lang.Still_Life);
		$(".g_lang_Animal").html(g360.g_lang.Animal);
		$(".g_lang_Abstract").html(g360.g_lang.Abstract);
		$(".g_lang_PopArt").html(g360.g_lang.PopArt);
		$(".g_lang_Object").html(g360.g_lang.Object);
		

		$(".g_lang_Square").html(g360.g_lang.Square1);
		$(".g_lang_Horizontal").html(g360.g_lang.Horizontal1);
		$(".g_lang_Vertical").html(g360.g_lang.Vertical1);
		$(".g_lang_Circle").html(g360.g_lang.Circle1);
		$(".g_lang_Set").html(g360.g_lang.Set1);
		$(".g_lang_Install_Art").html(g360.g_lang.Install_Art1);
		$(".g_lang_Media").html(g360.g_lang.Media1);
		
		$(".g_lang_Cancel").html(g360.g_lang.Cancel);
		$(".g_lang_Register").html(g360.g_lang.Register);
		$(".g_lang_Help").html(g360.g_lang.Help);
		
		$(".g_lang_Art_List").html(g360.g_lang.Art_List);
		$(".g_lang_Register_Artwork1").html(g360.g_lang.Register_Artwork1);
		$(".g_lang_Register_Artwork2").html(g360.g_lang.Register_Artwork2);
		$(".g_lang_Register_Artwork3").html(g360.g_lang.Register_Artwork3);
		$(".g_lang_Register_Artwork4").html(g360.g_lang.Register_Artwork4);
		$(".g_lang_Register_Artwork5").html(g360.g_lang.Register_Artwork5);
		$(".g_lang_Register_Artwork6").html(g360.g_lang.Register_Artwork6);
		$(".g_lang_Register_Artwork7").html(g360.g_lang.Register_Artwork7);
		$(".g_lang_Register_Artwork8").html(g360.g_lang.Register_Artwork8);
		$(".g_lang_Register_Artwork9").html(g360.g_lang.Register_Artwork9);
		$(".g_lang_Register_Artwork10").html(g360.g_lang.Register_Artwork10);
		$(".g_lang_Register_Artwork11").html(g360.g_lang.Register_Artwork11);

		$("#art_s5").attr("placeholder",g360.g_lang.Unit_cm);
		$("#art_s4").attr("placeholder",g360.g_lang.Unit_cm);
		
		$(".g_lang_Register_Artwork15").html(g360.g_lang.Register_Artwork15);
		$("#art_s6").attr("placeholder",g360.g_lang.Register_Artwork16);
		$(".g_lang_Register_Artwork17").html(g360.g_lang.Register_Artwork17);
		$("#art_curator_express").attr("placeholder",g360.g_lang.Register_Artwork18);
		$(".g_lang_Register_Artwork19").html(g360.g_lang.Register_Artwork19);
		$("#art_s7").attr("placeholder",g360.g_lang.Register_Artwork20);
		$(".g_lang_Register_Artwork21").html(g360.g_lang.Register_Artwork21);
		$(".g_lang_Register_Artwork22").html(g360.g_lang.Register_Artwork22);
		$(".g_lang_Register_Artwork23").html(g360.g_lang.Register_Artwork23);


		$(".g_lang_Color").html(g360.g_lang.Color);
		$(".g_lang_Type_of_work").html(g360.g_lang.Type_of_work);
		$(".g_lang_Original_Artwork").html(g360.g_lang.Original_Artwork);
		$(".g_lang_Copyright_image").html(g360.g_lang.Copyright_image);
		
		$("#art_s9").attr("placeholder",g360.g_lang.Register_Artwork10);
		$(".g_lang_Youtube_URL").html(g360.g_lang.Youtube_URL);
		$(".g_lang_Date").html(g360.g_lang.Date);
		$(".g_lang_Artist_Name1").html(g360.g_lang.Artist_Name1);
		$(".g_lang_Title").html(g360.g_lang.Title);
		$(".g_lang_Artswork_file").html(g360.g_lang.Artswork_file);
		
		$("#art_year_select").attr("placeholder",g360.g_lang.Register_Artwork12);
		$("#a_title").attr("placeholder",g360.g_lang.Register_Artwork13);
		$(".g_lang_Painting").html(g360.g_lang.Painting);
		$(".g_lang_Engraving").html(g360.g_lang.Engraving);
		$(".g_lang_Sculpture").html(g360.g_lang.Sculpture);
		$(".g_lang_Photo").html(g360.g_lang.Photo);
		$(".g_lang_Digital_Art").html(g360.g_lang.Digital_Art);
		$(".g_lang_Etc").html(g360.g_lang.Etc);
		
		$("#art_s3").attr("placeholder",g360.g_lang.Register_Artwork14);
		$(".g_lang_Canvas").html(g360.g_lang.Canvas);
		$(".g_lang_Oil_paint").html(g360.g_lang.Oil_paint);
		$(".g_lang_Acrylic_paint").html(g360.g_lang.Acrylic_paint);
		$(".g_lang_Watercolor").html(g360.g_lang.Watercolor);
		$(".g_lang_Ingredient").html(g360.g_lang.Ingredient);
		$(".g_lang_Genre").html(g360.g_lang.Genre);
		$(".g_lang_Frame").html(g360.g_lang.Frame);
		
		$(".g_lang_Size").html(g360.g_lang.Size);
		$(".g_lang_Height").html(g360.g_lang.Height);
		$(".g_lang_Width").html(g360.g_lang.Width);
		
		$(".g_lang_Sales_price").html(g360.g_lang.Sales_price);
		$(".g_lang_Sales_price0").html(g360.g_lang.Sales_price0);
		$(".g_lang_Sales_price1").html(g360.g_lang.Sales_price1);
		$(".g_lang_Sales_price2").html(g360.g_lang.Sales_price2);
		$(".g_lang_Sales_price3").html(g360.g_lang.Sales_price3);
		$(".g_lang_Sales_price4").html(g360.g_lang.Sales_price4);
		
		$(".g_lang_Artwork_Recom7_1").html(g360.g_lang.Artwork_Recom7_1);
		$(".g_lang_Artwork_Recom7_2").html(g360.g_lang.Artwork_Recom7_2);
		
		$(".g_lang_Shipping_Fee").html(g360.g_lang.Shipping_Fee1);
		$(".g_lang_Shipping_Method").html(g360.g_lang.Shipping_Method);
		
		$(".g_lang_Delivery").html(g360.g_lang.Delivery);
		$(".g_lang_Individual_delivery").html(g360.g_lang.Individual_delivery);
		$(".g_lang_Professional_delivery").html(g360.g_lang.Professional_delivery);
		
	},
	
	"artist_select_list_add" : function(){
		//작가일 경우 본인이 들어가고 큐레이터일 경우 리스트를 검색해서 추가한다.
		
		
		var gubun = g360.UserInfo.gubun;
		
		var html = "";
		if (gubun == "art"){
			var name = g360.UserInfo.name;
			var email = g360.UserInfo.email;
			var nickname = g360.UserInfo.nickname;
			
			html +="				<div class='btn-group'>";
			html +="					<button id='gubun_select_box' disabled data='"+email+"' data2='"+nickname+"' style='cursor:pointer' class='bg-transparent border-0 dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
			html +="						"+nickname;
			html +="					</button>";
			html +="					<div class='dropdown-menu'>";
			html +="						<a class='dropdown-item' data='"+email+"' >"+nickname+"</a>";
			html +="					</div>";
			html +="				</div>";
			
			var exp = "("+g360.g_lang.Register_Artwork_Alert19+" <span onclick=\"gArtistInfo.go_account_artist(); return false;\" style='text-decoration : underline; cursor:pointer;color:blue'>"+g360.g_lang.Register_Artwork_Alert20+"</span>"+g360.g_lang.Register_Artwork_Alert21+")";
			$("#artist_select_list").html(html + " " + exp);
			
			gArtistInfo.cUserEmail = g360.UserInfo.email;
			
			if (gArtistInfo.call_option == "edit"){
				//수정모드로 호출되었을 경우 처리
				var url = g360.root_path + "/load_image_one.mon?dockey=" + gArtistInfo.edit_dockey;
				url += "&" + new Date().getTime();
				$.ajax({
					type : "Get",
					dataType : "json",
					contentType : "application/json; charset=utf-8",
					url : url,
					success : function(data){
					
						gArtistInfo.edit_init(data);
						gArtistInfo.subfiles_before = data.subfile;
						gArtistInfo.mp3_md5_before = data.mp3_md5;
						gArtistInfo.mp4_md5_before = data.mp4_md5;
						gArtistInfo.mp3_filename_before = data.art_mp3_filename;
						gArtistInfo.mp4_filename_before = data.art_mp4_filename;
						
						gArtistInfo.price = data.art_price;
						gArtistInfo.shipping_fee = data.shipping_fee;
						gArtistInfo.title = data.art_title;
		

						gArtistInfo.file_preview_dropzone1(data);
						
						
						
					},
					error : function(e){
						g360.error_alert();
					}
				})
			}
			
		}else if (gubun == "curator"){
			var url = g360.root_path + "/my_artist_list.mon";
			$.ajax({
				type : "GET",
				dataType : "json",
				contentType : "appliction/json; charset=utf-8",
				url : url,
				cache : false,
				success : function(data){
					
					var name = g360.UserInfo.name;
					var email = g360.UserInfo.email;
					var nickname = g360.UserInfo.nickname;
					
					
					if (gArtistInfo.call_option == "edit"){
						var inx = gArtistInfo.edit_dockey.lastIndexOf("_");
						var xemail = gArtistInfo.edit_dockey.substring(0,inx);
						gArtistInfo.cUserEmail = xemail;
					}
				//	
					
					html +="				<div class='btn-group'>";
					html +="					<button id='gubun_select_box' data='' data2='' style='cursor:pointer' class='bg-transparent border-0 dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
					html +="						";
					html +="					</button> &nbsp;&nbsp;( * "+g360.g_lang.Profile_Setting+" >> <span style='color:blue; cursor:pointer; text-decoration : underline; padding: 0 5px 0 5px; ' onclick=\"gArtistInfo.go_reg_artist(); return false;\">"+g360.g_lang.Useit1+"</span>"+g360.g_lang.Useit2+" )";
					html +="					<div class='dropdown-menu'>";
					
				//	html +="						<a class='dropdown-item' data='"+email+"' data2='"+nickname+"'>"+name+"</a>";
					
					for (var i = 0 ; i < data.length; i++){
						var info = data[i];
						var email = info.email;
						var name = info.name;
						var nickname = info.nickname;
						
						html +="						<a class='dropdown-item' data='"+email+"' data2='"+nickname+"'>"+nickname+"</a>";

					}
					
					html +="					</div>";
					html +="				</div>";
					
					$("#artist_select_list").html(html);
					
					
					
					$(".dropdown-menu .dropdown-item").on("click", function(event){			
						//gMakeVR.music = event.currentTarget.id;
						
						$("#gubun_select_box").text(event.currentTarget.text);
						$("#gubun_select_box").attr("data", $(event.currentTarget).attr("data"));
						$("#gubun_select_box").attr("data2", $(event.currentTarget).attr("data2"));
						
						gArtistInfo.cUserEmail = $(event.currentTarget).attr("data");
					});
					
					
					if (gArtistInfo.call_option == "edit"){
						//수정모드로 호출되었을 경우 처리
						var url = g360.root_path + "/load_image_one.mon?dockey=" + gArtistInfo.edit_dockey;
						url += "&" + new Date().getTime();
						$.ajax({
							type : "Get",
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							url : url,
							success : function(data){
								
								gArtistInfo.edit_init(data);
								gArtistInfo.subfiles_before = data.subfile;
								gArtistInfo.mp3_md5_before = data.mp3_md5;
								gArtistInfo.mp4_md5_before = data.mp4_md5;
								gArtistInfo.mp3_filename_before = data.art_mp3_filename;
								gArtistInfo.mp4_filename_before = data.art_mp4_filename;
								
								gArtistInfo.price = data.art_price;
								gArtistInfo.shipping_fee = data.shipping_fee;
								gArtistInfo.title = data.art_title;
								
								gArtistInfo.file_preview_dropzone1(data);
								
								
							},
							error : function(e){
								g360.error_alert();
							}
						})
					}
					
					
				},
				error : function(e){
					g360.error_alert();
				}
			})
				

			
		}	
		
	},
	
	
	"file_preview_dropzone1" : function (data){
		
		if (data.art_img_filename != ""){
			 var mockFile = { name: data.art_img_filename, email : data.email , size: data.file_size, type: data.file_type , dockey : data.dockey};       
			 upMydropzone1.options.addedfile.call(upMydropzone1, mockFile);
			 upMydropzone1.options.thumbnail.call(upMydropzone1, mockFile, "/artimage/"+data.email+"/art/thumbnail/"+data.art_img_filename+".jpg");
			 mockFile.previewElement.classList.add('dz-success');
			 mockFile.previewElement.classList.add('dz-complete');
		}
		
		if (data.subfile.length > 0){
			for (var i = 0; i < data.subfile.length; i++){
				var info = data.subfile[i];
				
				//http://localhost:8080/artimage/aa@naver.com-spl-1565272569228/art/aa@naver.com-spl-1565272569228_7bba42335457ae16bfe9ef5525334ff5.76186
				var email = info.filename.split("_")[0];
				 var mockFile = { name: info.filename, email : email , size: info.file_size, type: info.file_type, dockey : data.dockey };       
				 Mydropzone4.options.addedfile.call(Mydropzone4, mockFile);
				 Mydropzone4.options.thumbnail.call(Mydropzone4, mockFile, "/artimage/"+email+"/art/"+info.filename);
				 mockFile.previewElement.classList.add('dz-success');
				 mockFile.previewElement.classList.add('dz-complete');
				
			}
		}
		
		if (data.art_mp3_filename != ""){
			 var mockFile = { name: data.art_mp3_filename, email : data.email , type: "audio/mp3" , dockey : data.dockey};       
			 Mydropzone3.options.addedfile.call(Mydropzone3, mockFile);
			// Mydropzone3.options.thumbnail.call(Mydropzone3, mockFile, "/artimage/"+data.email+"/art_mp3/"+data.art_mp3_filename);
			 mockFile.previewElement.classList.add('dz-success');
			 mockFile.previewElement.classList.add('dz-complete');
			 
			 $("#Mydropzone3").find(".dz-size").remove();
		}
		
		
		if (data.art_mp4_filename != ""){
			 var mockFile = { name: data.art_mp4_filename, email : data.email , type: "video/mp4" , dockey : data.dockey};       
			 xxMydropzone2.options.addedfile.call(xxMydropzone2, mockFile);
			// Mydropzone3.options.thumbnail.call(Mydropzone3, mockFile, "/artimage/"+data.email+"/art_mp3/"+data.art_mp3_filename);
			 mockFile.previewElement.classList.add('dz-success');
			 mockFile.previewElement.classList.add('dz-complete');
			 
			 $("#xxMydropzone2").find(".dz-size").remove();
		}
		
		
		
		
		
		$(".dz-image img").css("width", "120px").css("height", "120px");
		

	},
	
	
	"go_account_artist" : function(){
		gTopMain.navBtnAction('account');
		return false;
	},
	
	"go_reg_artist" : function(){
		gTopMain.navBtnAction('profile_artist');
		return false;
	},
	
	
	"folder" : function(obj, id){
		var classname = obj.className;
		if (classname.indexOf("on") >-1){
			$(obj).removeClass("on");
			$("#" + id).hide();
		}else{
			$(obj).addClass("on");
			$("#" + id).show();
		}
	},
	
	"edit_init" : function(data){
		gArtistInfo.subfiles_edit = new Array();
	
		if (data.subfile.length > 0){
			$("#m4_text").text("");
		}
		
		//테마 파트 세팅
		var spl = data.art_thema.split(" ");
		for (var i = 0 ; i < spl.length; i++){
			var thema = spl[i];
			$("#thema_select .btn.btn-outline-w-b").each(function(index){			
				if ($(this).text() == thema){
					$(this).addClass("active");
				}
			})
		}
	
		//형태 설정 세팅
		$("#type_select .btn.btn-outline-w-b").each(function(index){
			if ($(this).attr("data") == data.art_type){
				$(this).addClass("active");
			}
		});
		
		
		//컬러 설정 세팅
		var spp = data.art_color.split(",");
		for (var k = 0 ; k < spp.length; k++){
			var color = spp[k];
			$("#c-pick span").each(function(index){			
				if ($(this).attr("class") == color){
					$(this).addClass("active");
				}
			})
		}
		
		//원화 저자권 이미지 제공 여부
		if (data.art_ck1 == true){
			$("#chk1").prop("checked", true);
		}
		
		if (data.art_ck2 == true){
			$("#chk2").prop("checked", true);
		}
		
	//	$("#art_file_upload_header").hide();  //파일업로드 영역 숨김
	//	$("#art_file_upload").hide();	      //파일업로드 영역 숨김
		
	//	$("#upMydropzone1").hide();
		
		//수정할 경우 원본 파일을 그대로 사용하기 위해서 업로드시 기존 파일명을 추가해서 넣어주고 파일명을 동일하게 처리한다.

		
		
		var url = g360.preview_img_path(data.email, data.dockey);
		$("#preview_img").attr("src",url);
		
		$("#art_s9").val(data.art_yutube);  //유트브 URL
		
		var title_s = g360.TextToHtml(data.art_title);
		
		//$("#a_title").val(data.art_title);	 //작품 제목
		$("#a_title").val(title_s);	 //작품 제목
		
		$("#art_year_select").val(data.art_date_year);    //제작 년월
		
		//$("#a_artist").val(data.art_artist)  //작가명
		
		
		
		
	//	$("#art_s1").val(data.art_genre);			//장르 선택 사항
		if (data.art_genre == "기타"){
			$("input[name=xcol][value='"+data.art_genre+"']").prop("checked",true);
			$("#xcol_etc").val(data.art_genre_etc);
		}else{
			$("input[name=xcol][value='"+data.art_genre+"']").prop("checked",true);
		}
		
		
		
		$("#art_s2").val(data.art_source);			//재로
		
		$("input[name=zchk][value='캔버스']").prop("checked",false);
		
		var spl = data.art_source.split(",");
		for (var i = 0 ; i < spl.length; i++){
			var da = spl[i];			
			$("input[name=zchk][value='"+da+"']").prop("checked",true);
		}
		if (data.art_source_etc != ""){
			$("#zchk_etc").val(data.art_source_etc);
		}
		
		
		$("#art_s3").val(data.art_frame);			//액자
		
		$("#art_s4").val(data.art_width);			//가로 길이
		$("#art_s5").val(data.art_height);			//세로 길이
		
		
		var art_express_s = g360.TextToHtml(data.art_express);
		$("#art_s6").val(art_express_s);				//작품 설명		
		
		var art_curator_express_s = g360.TextToHtml(data.art_curator_express);
		$("#art_curator_express").val(art_curator_express_s);			//추천사유
		
		$("#shipping_fee").val(data.shipping_fee);
		
		$("#art_s7").val(data.art_tag);					//검색 태그
		
		if (data.art_sale == "radio1"){
			$("#radio1").prop("checked",true);
		}else{
			$("#radio2").prop("checked",true);
		}
		$("#art_s8").val(data.art_price);
		
		
		if (data.art_genre == "조형"){
			$("#hosu1").css("display","none");
			$("#height1").css("display","inline");
			
			$("#height0").text("세로");
			$("#width0").text("가로");
			$("#art_s11").val(data.art_height2);           //높이
			
			
		}else{
			$("#hosu1").css("display","inline");
			$("#height1").css("display","none");
			
			$("#height0").text("높이");
			$("#width0").text("넓이");
			$("#art_s10").val(data.art_hosu);           //호수
			
		}
		
		
		
		if (data.shipping_type == "기타"){
			$("input[name=shipping_type][value='"+data.shipping_type+"']").prop("checked",true);
			$("#shipping_type_etc").val(data.shipping_type_etc);
		}else{
			$("input[name=shipping_type][value='"+data.shipping_type+"']").prop("checked",true);
		}
		
	
		/////////////////////////////////////////////////////////////
		$("#gubun_select_box").text(data.art_artist);
		if (data.real_artist_email == "" || typeof(data.real_artist_email) == "undefined"){
			$("#gubun_select_box").attr("data", data.email);
		
		}else{
			$("#gubun_select_box").attr("data", data.real_artist_email);
			
		}
		$("#gubun_select_box").attr("data2", data.nickname);
		$("#gubun_select_box").prop("disabled", true);
		
		////////////////////////////////////////////////////////////
		
	},
	
	
	"uploadForm" : function(){
		//테마 옵션 체크
		
		$.confirm({
			title : g360.g_lang.OK,
			content : g360.g_lang.Register_Artwork_Alert22,
			type : "default",  
			closeIcon : false,
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
					text : g360.g_lang.Sales_Request,
					btnClass : "btn-default",
					action : function(){
						gArtistInfo.isSales = "0";
						gArtistInfo.uploadprocess();
					}
				},
				btn1 : {						
					text : g360.g_lang.Temporary_Save,
					btnClass : "btn-default",
					action : function(){
						gArtistInfo.isSales = "1";
						gArtistInfo.uploadprocess();
					}
				}
			}
		});	
		
		
			
	},
	
	
	"uploadprocess" : function(){
		var art_thema= "", art_type= "", art_size= "", art_tx= "", art_filepath= "", art_title= "", art_date = "";
		var art_genre= "", art_source= "", art_frame= "", art_width= "", art_height= "", art_express= "", art_tag= "", art_sale= "", art_price= "", art_curator_express ="";
		var art_date_year= "", art_date_month = "";
		var art_hosu = "", art_height2 = "";
		var art_color = "";
		
	
		var color_select = "";
		var color = $("#c-pick span");
		for (var i = 0 ; i < color.length; i++){
			var tx = color[i].className;
			if (tx.indexOf("active") > -1){
				tx = tx.replace(" active","");
				if (color_select == ""){
					color_select = tx;
				}else{
					color_select += "," + tx;
				}
			}

		}				
			
		
		var th = $("#thema_select .btn.btn-outline-w-b.active");
		for (var i = 0 ; i < th.length; i++){
			var tx = th[i].textContent;
			if (art_thema == ""){
				art_thema = tx;
			}else{
				art_thema += " " + tx;
			}
		}		
		
		var sh = $("#type_select .btn.btn-outline-w-b.active");
		for (var j = 0 ; j < sh.length; j++){
			var sx = sh[j].attributes.data.nodeValue;
			if (art_type == ""){
				art_type = sx;
			}else{
				art_type += " " + sx;
			}
		}
		
		var si = $("#size_select .btn.btn-outline-w-b.active");
		for (var j = 0 ; j < si.length; j++){
			var size = si[j].attributes.data.nodeValue;
			if (art_size == ""){
				art_size = size;
			}else{
				art_size += " " + size;
			}
		}
	
		var ck1 = $("#chk1").get(0).checked;			
		var ck2 = $("#chk2").get(0).checked;
	
		
		art_title = $("#a_title").val();
		art_date_year = $("#art_year_select").val();
		
//		art_genre = $("#art_s1").val();      //장르
//		art_source = $("#art_s2").val();     //재로
		
		var art_genre_etc = "";
		var art_genre = $('input[name=xcol]:checked').val();
		if (art_genre == "기타"){
			art_genre_etc = $("#xcol_etc").val();
		}
				
		var art_source = "";
		var art_source_etc = "";
		$('input[name=zchk]').each(function(index){
			
			 if ($(this).is(":checked")){
				 var obj = $(this).val();
				 if (art_source == ""){
					 art_source += obj;
				 }else{
					 art_source += ","+ obj;
				 }					 
				 
				 if (obj == "기타"){
					 art_source_etc = $("#zchk_etc").val();
				 }
			 }
		});
		
		art_price =  $("#art_s8").val();
		var shipping_fee = $("#shipping_fee").val();
		var shipping_type = $('input[name=shipping_type]:checked').val();
		if (shipping_type == "기타"){
			shipping_type_etc = $("#shipping_type_etc").val();
		}
		
		
		art_frame =  $("#art_s3").val();
		art_width =  $("#art_s4").val();
		art_height =  $("#art_s5").val();
		art_express =  $("#art_s6").val();
		art_tag =  $("#art_s7").val();
		
		art_hosu = $("#art_s10").val();
		art_height2 =  $("#art_s11").val();
		
		art_curator_express = $("#art_curator_express").val();
		
		
		///////////////
		
		
		var ky = $('input:radio[name="rdo1"]:checked').get(0).id;
		art_sale =  ky;
		
		
		var art_yutube =  $("#art_s9").val();
		
		
		
//		var email = g360.UserInfo.email;
//		var art_artist = $("#a_artist").val();
		
		var email = $("#gubun_select_box").attr("data");
		var art_artist = $.trim($("#gubun_select_box").text());
		
		
		
		
		
		
		var nickname = "";
		var real_artist_email = "";
		if (g360.UserInfo.gubun == "art"){
			nickname = g360.UserInfo.nickname;
		}else if (g360.UserInfo.gubun == "curator"){
			nickname = $("#gubun_select_box").attr("data2");
			real_artist_email = email;
		}
		

		var data = "";
		if (gArtistInfo.call_option == "edit"){
			var subfiles = "";
		
		
			
			if (gArtistInfo.subfiles_edit.length > 0){
				subfiles = gArtistInfo.subfiles_edit;
			}else if (gArtistInfo.subfiles.length == 0){
			//	subfiles = gArtistInfo.subfiles_before;
				subfiles = gArtistInfo.subfiles_before;
			}else{
			//	subfiles = gArtistInfo.subfiles;
				var tlist = new Array();
				for (var j = 0 ; j < gArtistInfo.subfiles_before.length; j++){
					tlist.push(gArtistInfo.subfiles_before[j]);
				}
				
				for (var j = 0 ; j < gArtistInfo.subfiles.length; j++){
					tlist.push(gArtistInfo.subfiles[j]);
				}
				
			//	subfiles = (gArtistInfo.subfiles_before.concat(gArtistInfo.subfiles));
			//	subfiles.push(gArtistInfo.subfiles);
				
				subfiles = tlist;
			}
			
			

			var mp3 = "";
			var mp3_filename = "";
			var mp3_filename = "";
			if (gArtistInfo.mp3_md5 == ""){
				mp3 = gArtistInfo.mp3_md5_before;
				mp3_filename = gArtistInfo.mp3_filename_before;
			}else{
				mp3 = gArtistInfo.mp3_md5;
				mp3_filename = gArtistInfo.mp3_filename;
			}
			var mp4 = "";
			var mp4_filename = "";
			if (gArtistInfo.mp4_md5 == ""){
				mp4 = gArtistInfo.mp4_md5_before;
				mp4_filename = gArtistInfo.mp4_filename_before;
			}else{
				mp4 = gArtistInfo.mp4_md5;
				mp4_filename = gArtistInfo.mp4_filename;
			}
			
			

					
			if (gArtistInfo.img_filename != ""){
				//원본 이미지를 삭제하고 다시 추가하는 경우
				
				data = JSON.stringify({
					art_artist : art_artist,
					art_yutube : art_yutube,
					art_thema : art_thema,
					art_type : art_type,
					art_color : color_select,
					art_ck1 : ck1,
					art_ck2 : ck2,
					art_title : art_title,
					art_date : art_date,
					art_genre : art_genre,
					art_genre_etc : art_genre_etc,
					art_source : art_source,
					art_source_etc : art_source_etc,
					art_frame : art_frame,
					art_width : art_width,
					art_height : art_height,
					art_hosu : parseInt(art_hosu),
					art_height2 : art_height2,
					art_express : art_express,
					art_curator_express : art_curator_express,
					art_tag : art_tag,
					art_sale : art_sale,
					art_price : parseInt(art_price.replace(/,/gi,"")),			
					art_date_year : art_date_year,
					shipping_fee : parseInt(shipping_fee.replace(/,/gi,"")),
					shipping_type : shipping_type,
					shipping_type_etc : shipping_type_etc,
					subfile : subfiles,
					status : gArtistInfo.isSales,
					nickname : nickname,
					real_artist_email : real_artist_email,			
									
					mp3_md5 : mp3,
					mp4_md5 : mp4,
					art_mp3_filename : mp3_filename,
					art_mp4_filename : mp4_filename,
					
					
					file_width : gArtistInfo.file_width,
					file_height : gArtistInfo.file_height,
					file_size : gArtistInfo.file_size,
					file_type : gArtistInfo.file_type,
					file_dpi : gArtistInfo.file_dpi,
					MD5Value : gArtistInfo.MD5Value,				
					art_img_filename : gArtistInfo.img_filename,
				
					dockey : gArtistInfo.edit_dockey,				
					isSales : gArtistInfo.isSales
				});
				
			}else{
				data = JSON.stringify({
					art_artist : art_artist,
					art_yutube : art_yutube,
					art_thema : art_thema,
					art_type : art_type,
					art_color : color_select,
					art_ck1 : ck1,
					art_ck2 : ck2,
					art_title : art_title,
					art_date : art_date,
					art_genre : art_genre,
					art_genre_etc : art_genre_etc,
					art_source : art_source,
					art_source_etc : art_source_etc,
					art_frame : art_frame,
					art_width : art_width,
					art_height : art_height,
					art_hosu : parseInt(art_hosu),
					art_height2 : art_height2,
					art_express : art_express,
					art_curator_express : art_curator_express,
					art_tag : art_tag,
					art_sale : art_sale,
					art_price : parseInt(art_price.replace(/,/gi,"")),			
					art_date_year : art_date_year,
					shipping_fee : parseInt(shipping_fee.replace(/,/gi,"")),
					shipping_type : shipping_type,
					shipping_type_etc : shipping_type_etc,
					subfile : subfiles,
					status : gArtistInfo.isSales,
					nickname : nickname,
					real_artist_email : real_artist_email,			
									
					mp3_md5 : mp3,
					mp4_md5 : mp4,
					art_mp3_filename : mp3_filename,
					art_mp4_filename : mp4_filename,
				
					dockey : gArtistInfo.edit_dockey,				
					isSales : gArtistInfo.isSales
				});
			}
			
			
		}else{
			
			var subfiles = gArtistInfo.subfiles;
			
			data = JSON.stringify({
				art_artist : art_artist,
				art_yutube : art_yutube,
				art_thema : art_thema,
				art_type : art_type,
				art_color : color_select,
				art_ck1 : ck1,
				art_ck2 : ck2,
				art_title : art_title,
				art_date : art_date,
				art_genre : art_genre,
				art_genre_etc : art_genre_etc,
				art_source : art_source,
				art_source_etc : art_source_etc,
				art_frame : art_frame,
				art_width : art_width,
				art_height : art_height,
				art_hosu : parseInt(art_hosu),
				art_height2 : art_height2,
				art_express : art_express,
				art_tag : art_tag,
				art_sale : art_sale,
				art_price : parseInt(art_price.replace(/,/gi,"")),			
				art_date_year : art_date_year,
				nickname : nickname,
				real_artist_email : real_artist_email,
			
				//art_date_month : art_date_month,			
				art_curator_express : art_curator_express,
				
				file_width : gArtistInfo.file_width,
				file_height : gArtistInfo.file_height,
				file_size : gArtistInfo.file_size,
				file_type : gArtistInfo.file_type,
				file_dpi : gArtistInfo.file_dpi,
				MD5Value : gArtistInfo.MD5Value,
				status : gArtistInfo.isSales,
				subfile : subfiles,
				art_img_filename : gArtistInfo.img_filename,
				
				mp3_md5 : gArtistInfo.mp3_md5,
				mp4_md5 : gArtistInfo.mp4_md5,
				art_mp3_filename : gArtistInfo.mp3_filename,
				art_mp4_filename : gArtistInfo.mp4_filename,
				
				shipping_fee : parseInt(shipping_fee.replace(/,/gi,"")),
				shipping_type : shipping_type,
				shipping_type_etc : shipping_type_etc,
				
				dockey : email + "_" + gArtistInfo.MD5Value,
				
				
			});
		}
		
		
		
		if (upMydropzone1.files.length > 0){
			var version = new Date().getTime();
			data = JSON.parse(data);
			data.version = version;
			
			data = JSON.stringify(data);
		}
	
		var url = "";
		if (gArtistInfo.call_option == "edit"){
			url = g360.root_path + "/art_upload.mon?mode=edit";
		}else{
			url = g360.root_path + "/art_upload.mon?mode=add";
			
				
		}
		
		
		
		

		//기존에 등록한 내용중에 가격관련된 내용이 변경되면 카트에 등록된 내용을 전체 업데이트 해줘야 한다.
		var ischange_cart_info = false;
		
		if (gArtistInfo.price != art_price.replace(/,/gi,"")){
			ischange_cart_info = true;
		}

		if (gArtistInfo.shipping_fee != shipping_fee.replace(/,/gi,"")){
			ischange_cart_info = true;
		}
		if (gArtistInfo.title != art_title){
			ischange_cart_info = true;
		}
		//////////////////////////////////////////////////////////////////////
		
		
		
		$.ajax({
			type : "Post",
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				
				g360.loadingbar_close();
				if (gArtistInfo.call_option == "edit"){

					g360.gAlert("Info", g360.g_lang.Register_Artwork_Alert23 , "blue", "top");
					if (ischange_cart_info){
						gArtistInfo.refresh_cart_info(art_price, shipping_fee, art_title, gArtistInfo.edit_dockey);
					}
					
					gTopMain.navBtnAction('artProjectlist');
				}else{
				
					//g360.gAlert("Info", "작품이 정상적으로 등록 되었습니다.<br>이미지 최적화 작업시간으로 보관함에서 이미지가 바로 표시되지 않을 수 있습니다. <br>잠시 후 확인해 보시기 바랍니다." , "blue", "top");
					g360.gAlert("Info", g360.g_lang.Register_Artwork_Alert24 , "blue", "top");
					
					g360.LoadPage("body_content", g360.root_path + "/partner/art_upload/art_upload.jsp");
				}
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	

	
	
	
	"refresh_cart_info" : function(price, shipping_fee, title, dockey){
		
		var url = g360.root_path + "/refresh_cart_info.mon";
		data = JSON.stringify({
			price : price.replace(/,/gi,""),
			shipping_fee : shipping_fee.replace(/,/gi,""),
			title : title,
			dockey : dockey
		});
		
		$.ajax({
			type : "POST",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			data : data,
			url : url,
			success : function(res){
				
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
		
	}
}

