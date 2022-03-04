
function gArtistInfoMain_Rental(opt, dockey){	
	gArtistInfo_Rental = this;
	gArtistInfo_Rental.img_filename = "";
	gArtistInfo_Rental.mp3_filename = "";
	gArtistInfo_Rental.d3_filename = "";
	

	gArtistInfo_Rental.file1 = "";
	gArtistInfo_Rental.file2 = "";
	gArtistInfo_Rental.file3 = "";
	
	gArtistInfo_Rental.file_dpi = 0;
	gArtistInfo_Rental.file_width = 0;
	gArtistInfo_Rental.file_height = 0;
	gArtistInfo_Rental.file_size  = 0;
	gArtistInfo_Rental.file_type = "";
	gArtistInfo_Rental.MD5Value = "";
	gArtistInfo_Rental.mp3_md5 = "";
	gArtistInfo_Rental.d3_md5 = "";
	
	gArtistInfo_Rental.savefolder = "";
	
	gArtistInfo_Rental.pdf_md5 = "";
	
	gArtistInfo_Rental.call_option = opt;
	gArtistInfo_Rental.edit_dockey = dockey;
	
	gArtistInfo_Rental.subfiles = "";
	gArtistInfo_Rental.subfiles_before = "";
	gArtistInfo_Rental.subfiles_edit = new Array();
	
	gArtistInfo_Rental.mp3_md5_before = "";
	gArtistInfo_Rental.d3_md5_before = "";
	gArtistInfo_Rental.mp3_filename_before = "";
	gArtistInfo_Rental.d3_filename_before = "";
	
	gArtistInfo_Rental.pdf_before = "";
	gArtistInfo_Rental.pdf_filename_before = "";
	
	gArtistInfo_Rental.price = "";
	gArtistInfo_Rental.shipping_fee = "";
	gArtistInfo_Rental.title = "";
	
	gArtistInfo_Rental.cUserEmail = "";
	
	gArtistInfo_Rental.isSales = "1";  //1 : 임시저장 , 0 : 판매요청  , 실제 Mongo값은 status
	
	gArtistInfo_Rental.size = "";
	gArtistInfo_Rental.text1 = "";
	gArtistInfo_Rental.text2 = ""; 
		
}

gArtistInfoMain_Rental.prototype = {		

	"init" : function(){
		
		var _self = this;
		
		gArtistInfo_Rental.size = g360.rental_text.art_size;
		gArtistInfo_Rental.text1 = g360.rental_text.tab1;  //작가 , 발표자 항목
		gArtistInfo_Rental.text2 = g360.rental_text.tab2;  //작품 , 콘텐츠 항목
			
			
		//작품 등록에 대한 텍스트 문구 설정하기.............
		var rt = g360.rental_text;
		$("#exp1").text(rt.art_express);  //작품에 대한 정보는 필수 입니다.
		$("#tx1").text(rt.art_title);    //작품제목
	
		$("#a_title").attr("placeholder",rt.art_title_placeholder);    //작품제목
		if (rt.art_title == ""){$("#txt1_up").hide()}
		$("#txt2").text(rt.art_year);    //제작연도
		if (rt.art_year == ""){$("#txt2_up").hide()}
 		$("#txt3").text(rt.art_jang);    //장르
 		if (rt.art_jang == ""){$("#txt3_up").hide()}
		$("#txt4").text(rt.art_material);   //재로
		if (rt.art_material == ""){$("#txt4_up").hide()}
		$("#txt5").text(rt.art_size);      //크기
		if (rt.art_size == ""){$("#txt5_up").hide()}
		$("#txt6").text(rt.art_memo);      //작품 설명
		$("#art_s6").attr("placeholder", rt.art_memo_placeholder)
		if (rt.art_memo == ""){$("#txt6_up").hide()}
		
		$("#art_s9").attr("placeholder", gArtistInfo_Rental.text2 + "에  대해 설명한 유튜브 URL입력해 주세요. (동영상과 관련된 저작권 문제 발생시 갤러리360은 책임지지 않습니다)");
		
		/*$("#txxx1").html("1. "+gArtistInfo_Rental.text2+"이미지 <span>"+gArtistInfo_Rental.text2+"이미지는 고해상도 원본이미지로 업로드 바랍니다.</span>");*/
		$("#txxx1").html("1. "+gArtistInfo_Rental.text2+" 컨텐츠 ");
		$("#txxx2").html(gArtistInfo_Rental.text2 + "파일");
		/*$("#txxx3").html("업로드한 "+gArtistInfo_Rental.text2+"에 자동 워터마크가 적용됩니다.");*/
		$("#txxx3").html("<span>"+gArtistInfo_Rental.text2+"이미지는 고해상도 원본이미지로 업로드 바랍니다.</span>");
		
		$("#txxx4").html("2. "+gArtistInfo_Rental.text2+" 정보 <span id='exp1'>* "+gArtistInfo_Rental.text2+"에 대한 정보는 필수입니다.</span>");
		
		//$("#txxx5").html("3. "+gArtistInfo_Rental.text2+" 판매 <span id='exp2'>* "+gArtistInfo_Rental.text2+" 판매 시 아래 정보를 기입해 주세요.</span>");
		
		
		
		///////////////////////////////////////////////////////////////////
		
		$("#height1").css("display","none");
		
		
		$('html').scrollTop(0);
		
		if (g360.UserInfo.gubun == "art"){
			
			$("#a_artist").val(g360.UserInfo.name);
			$("#a_artist").prop("disabled", true);
		}else{
			//아트컨설턴트일 경우
			
		}

		//해당 ajax 먼저 실행 후, artist_select_list_add 실행
		$.ajax({
			url: g360.root_path+"/add_option_select.mon",
			type: "GET",
			contentType: "application/json",
			success: function(data){
				var html = `<option value="">버튼 선택</option>`;
				for(var i=0; i<data.length; i++){
					var info = data[i];
					html+=`<option value=${info.value}>${info.text}</option>`;
				}
				$("#txt7_up_select").html(html);
				
				gArtistInfo_Rental.artist_select_list_add();
			},
			error: function(e) {
				alert("에러발생 (add_option_check)")
			}
		});
		
		
		// ==================================================
		
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
			
//			var ck1 = $("#chk1").get(0).checked;			
//			var ck2 = $("#chk2").get(0).checked;
			
//			if (ck1 == false && ck2 == false){
//				g360.gAlert_focus("Error", "작품유형을 선택하셔야 합니다." , "red", "left", "chk1");
//				return false;
//			}
			
			var art_title = $.trim($("#a_title").val());
			if (rt.art_title != '' && art_title == '') {
				g360.gAlert_focus("Error", rt.art_title + "을 입력하셔야 합니다." , "red", "left", "a_title");
				return false;
			}  
			
			
			
			if (gArtistInfo_Rental.size != ""){
				if (art_height == ""){
					g360.gAlert_focus("Error", gArtistInfo_Rental.text2 + "의 높이값을 입력하셔야 합니다." , "red", "left", "art_s5");
					//g360.loadingbar_close();
					return false;
				}
				
				
				if (art_width == ""){
					g360.gAlert_focus("Error", gArtistInfo_Rental.text2 +"의 넓이값을 입력하셔야 합니다." , "red", "left", "art_s4");
					//g360.loadingbar_close();				
					return false;
				}
			}
			
			//string > int
			var art_height_num = art_height*=1;
			var art_width_num = art_width*=1;
			
			if(g360.UserInfo.type=="1"){
				
				if (art_height_num < 10){
					g360.gAlert_focus("Error", gArtistInfo_Rental.text2 + "의 높이값에 10이상의 값을 입력하셔야 합니다." , "red", "left", "art_s5");
					//g360.loadingbar_close();
					return false;
				}
				
				if (art_width_num <10){
					g360.gAlert_focus("Error", gArtistInfo_Rental.text2 +"의 넓이값에 10이상의 값을 입력하셔야 합니다." , "red", "left", "art_s4");
					//g360.loadingbar_close();				
					return false;
				}
				
			}
		
			
//			if (art_price == ""){
//				g360.gAlert_focus("Error", "작품의 판매가격을 입력하셔야 합니다." , "red", "left", "art_s8");
//				//g360.loadingbar_close();
//				return false;
//			}
			
			var email = $("#gubun_select_box").attr("data");					
			if (email == ""){
				g360.gAlert_focus("Error", gArtistInfo_Rental.text1 + "을(를) 선택하셔야 합니다.<br>등록된 "+gArtistInfo_Rental.text1+"가 없을 경우<br>'관리 "+gArtistInfo_Rental.text1+" 등록'을 활용하여 "+gArtistInfo_Rental.text1+"를 등록하셔야 합니다." , "red", "left", "art_s5");
				$("#gubun_select_box").focus();
				return false;
			}
			
			
			var a_url = $.trim($("#a_url").val());
			var txt7_select = $("#txt7_up_select").val();
			
			if(a_url!=""&&txt7_select==""){
				g360.gAlert_focus("Error","url 입력시 링크연결할 버튼이름을 선택해 주세요.");
				$("#txt7_up_select").focus();
				return false;
				
			}
			
		
			//작가와 큐레이터의 업로드 방식이 변경되어 여기서 실제 등록되어야 할 사용자의 email 정보를 넘기는 것으로 변경한다.
			upMydropzone1.options.url = g360.root_path + "/FileUpload_Art_Fast_Rental.gu?key="+gArtistInfo_Rental.cUserEmail+"&ofile=";			
			Mydropzone3.options.url = g360.root_path + "/FileUpload_Art_xRental.gu?key="+gArtistInfo_Rental.cUserEmail; 	
			Mydropzone4.options.url = g360.root_path + "/FileUpload_Art_xRental.gu?key="+gArtistInfo_Rental.cUserEmail; 
			xxMydropzone2.options.url = g360.root_path + "/FileUpload_Art_multi_3d.gu?key="+gArtistInfo_Rental.cUserEmail; 			
		//	Mydropzone4.options.url = g360.root_path + "/FileUpload_Art_multi.gu?key="+gArtistInfo_Rental.cUserEmail;  
			
			xxMydropzone5.options.url = g360.root_path + "/FileUpload_Art_Fast_Rental_file.gu?key="+gArtistInfo_Rental.cUserEmail;
			
			
			if (gArtistInfo_Rental.call_option == "edit"){
			//	gArtistInfo_Rental.uploadForm();
				
				
				
				upMydropzone1.options.url = g360.root_path + "/FileUpload_Art_Fast_Rental.gu?key="+gArtistInfo_Rental.cUserEmail+"&ofile=" + gArtistInfo_Rental.edit_dockey;
				
				g360.loadingbar_open(gArtistInfo_Rental.text2 +"정보를 수정 하고 있습니다. 잠시만 기다려 주세요......");
				
				if (upMydropzone1.files.length > 0){
					if(upMydropzone1.files.length)
					upMydropzone1.processQueue();
				}else if (xxMydropzone5.files.length > 0){
					xxMydropzone5.processQueue();
				}else if (xxMydropzone2.files.length > 0){
					xxMydropzone2.processQueue();
				}else if (Mydropzone3.files.length > 0){
					Mydropzone3.processQueue();
				}else if (Mydropzone4.files.length > 0){
					Mydropzone4.processQueue();
				}else{
					gArtistInfo_Rental.uploadForm();
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
					g360.loadingbar_open(gArtistInfo_Rental.text2 +" 등록 중입니다. 잠시만 기다려 주세요......");
										
					upMydropzone1.processQueue();
				}else{
					g360.gAlert("Error", "이미지 파일은 반드시 선택하셔야 합니다." , "red", "left");
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
			gArtistInfo_Rental.cancel_all();
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
		
		 $("input:radio[name=xsale]").click(function(){
		 
	        if($("input[name=xsale]:checked").val() == "Y"){
	        	$("#txt9_up").css('display','contents');
	        }else if($("input[name=xsale]:checked").val() == "N"){
	        	$("#txt9_up").css('display','none');
	        }
	    });
		 
		$("input[name='xcol']").change(function(){
			if($(this).val()=="조형"){
				$("#hosu1").css("display","none");
				$("#height1").css("display","inline");
				
				//세로, 가로
				$("#height0").text("세로");
				$("#width0").text("가로");
				//값초기화
				$("#art_s10").val("");
				
			}else{
				$("#hosu1").css("display","inline");
				$("#height1").css("display","none");
				
				//높이, 넓이
				$("#height0").text("높이");
				$("#width0").text("넓이");
				//값초기화
				$("#art_s11").val("");
			}
			
		})
		///////////////////////////////////////////////////////////////////
		
		Dropzone.options.upMydropzone1 = {
			
			maxFilesize: 50,  //100M
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
	     //   dictDefaultMessage: "작품 파일 이미지를 선택해 주세요.<br>Max size:300M(.jpg,&nbsp;.png,&nbsp;.tif)",
	     //   dictDefaultMessage: gArtistInfo_Rental.text2 +" 이미지 선택.<br>Max size : 50M<br>(.jpg,&nbsp;.png,&nbsp;.tif)",
	        dictDefaultMessage: gArtistInfo_Rental.text2 +" 이미지 선택.<br>Max size : 50M<br>(.jpg,&nbsp;.png)",
			accept : function(file, done){
				done();
			},
			
			fallback: function(){
				g360.gAlert("Error", "지원하지 않는 브라우저 입니다. 브라우저를 업그레이드 하세요" , "red", "left");
			},
			
			init: function(){
				
				upMydropzone1.edit = "F";
				
				this.on("maxfilesexceeded", function(file){
					
					upMydropzone1.edit = "T";
					this.removeFile(file);
					$("#upMydropzone1 .dz-default").hide();
					
					g360.gAlert("Error", "하나의 파일만 업로드 할 수 있습니다. 기존 업로드 파일을 삭제 하고 다시 업로드 하세요" , "red", "left");
				});
				

				
//				this.on("queuecomplete",function(data){
//					alert("dd");
//				});
				
				var _self = this;
				this.on("addedfile", function (file) {
					
					console.log(file);
					
					upMydropzone1.edit = "F";
					
                    var _this = this;
                    gArtistInfo_Rental.file1 = file;
        			//		if ($.inArray(file.type, ['image/jpeg', 'image/jpg', 'image/png', 'image/tif', 'image/tiff']) == -1) {
                    if ($.inArray(file.type, ['image/jpeg', 'image/jpg', 'image/png']) == -1) {
                       	g360.gAlert("Error", "업로드 가능 파일 형식이 아닙니다." , "red", "left");
                        _this.removeFile(file);
                    }
                    
                    var ms = parseFloat((file.size / (1024*1024)).toFixed(2));
                    if (ms > this.options.maxFilesize){	                    	
                    	g360.gAlert("Error", "업로드 가능 사이즈를 초과하였습니다." , "red", "left");
                        _this.removeFile(file);
                    }
                    
                    ///수정시 maxfilesexceeded 이미지 갯수 제한 역할
                    
                    if(gArtistInfo_Rental.call_option == "edit"){
                    	//debugger;
//                    	var length = $("#upMydropzone1 .dz-image-preview").length;
//                    	if (length > 0){
//                    		upMydropzone1.edit = "T";
//                    		_this.removeFile(file);                    		
//                    		$("#upMydropzone1 .dz-default").hide();
//                    		g360.gAlert("Error", "하나의 파일만 업로드 할 수 있습니다. 기존 업로드 파일을 삭제 하고 다시 업로드 하세요" , "red", "left");
//                    	}
                    	var fileCh = new Image;
                    	
                    	fileCh.src = g360.preview_img_path(gArtistInfo_Rental.cUserEmail,gArtistInfo_Rental.edit_dockey);
                    	//fileCh.src = g360.root_path+"/artimage/"+gArtistInfo_Rental.cUserEmail+"/art/preview/"+gArtistInfo_Rental.edit_dockey+".jpg";
                    	
                    	fileCh.onload=function(){                    	
                    		upMydropzone1.edit = "T";
                    		_this.removeFile(file);                    		
                    		$("#upMydropzone1 .dz-default").hide();
                    		g360.gAlert("Error", "하나의 파일만 업로드 할 수 있습니다. 기존 업로드 파일을 삭제 하고 다시 업로드 하세요" , "red", "left");
                    	}
                    	
                    	//$("#upMydropzone1 .dz-default").hide();
//                    	fileCh.onerror=function(){
//                    		if(this.files.length<2){
//                    			
//                    		}
//                    	}
                    }                    
                });					
				upMydropzone1 = this; //Closer
			},				
			
			removedfile : function(file)
			{
					//debugger;
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
	                    	if (upMydropzone1.edit != "T"){
	                    		$("#upMydropzone1 .dz-default").show();
	                    	}else{
	                    		upMydropzone1.edit = "F";
	                    	}
	                    	//
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
				//debugger;
				console.log(file);
				console.log(response);
				
				var isOK = JSON.parse(response).result;
				if (isOK == "OK"){
					var res = JSON.parse(response);
					
					
			
					gArtistInfo_Rental.img_filename = res.filename;
					
					gArtistInfo_Rental.file_width = res.file_width;
					gArtistInfo_Rental.file_height = res.file_height;
					gArtistInfo_Rental.file_size  = res.file_size;
					gArtistInfo_Rental.file_type = res.file_type;
					gArtistInfo_Rental.MD5Value = res.MD5Value;
					gArtistInfo_Rental.file_dpi = res.file_dpi;
				
					if (Mydropzone3.files.length > 0){
						Mydropzone3.processQueue();
					}else if (xxMydropzone2.files.length > 0){
						xxMydropzone2.processQueue();
					}else if (Mydropzone4.files.length > 0){
						Mydropzone4.processQueue();
					}else if (xxMydropzone5.files.length > 0){
						xxMydropzone5.processQueue();
					}else{
						gArtistInfo_Rental.uploadForm();
					}
							
				}else if (isOK == "fileexist"){
					
					this.removeFile(file);
					g360.gAlert("Error", "동일한 파일이 이미 존재합니다. 다른 "+gArtistInfo_Rental.text2+" 파일을 선택해 주세요." , "red", "left");
					g360.loadingbar_close();
					
				}else if(isOK == "oversize"){
					var h =  JSON.parse(response).h;
					var w =  JSON.parse(response).w;
					this.removeFile(file);
					g360.gAlert("Error", "현재 이미지파일의 가로,세로 픽셀이 "+w+"x"+h+" 입니다. 2000픽셀이하로 변환 후 올려주세요." , "red", "left");
					g360.loadingbar_close();
					
				}else{
					//var isOK = JSON.parse(response).result;
					g360.gAlert("Error", "파일 업로드 중 오류가 발생하였습니다." , "red", "left");						
					this.removeFile(file);						
					
					g360.loadingbar_close();
				}			
				
				
			},
			error : function(file, response){
				return false;
			}
		}
		
		
		$("#upMydropzone1").dropzone();	
		
		///////////////////////////////////////////////////////////////////////////////////////////////////
//		Dropzone.options.xxMydropzone2 = {
//				maxFilesize: 300,  //100M
//				maxFiles: 10,
//				renameFile: function(file){
//					var dt = new Date();
//					var time = dt.getTime();
//					return time+file.name;
//				},
//				acceptedFiles: "",
//				addRemoveLinks: true,
//				timeout: 500000,
//				uploadMultiple: true,
//				autoProcessQueue: false,
//				clickable: true,
//				// 병렬처리 WebConfig도 같이 수정해줘야함.
//		        parallelUploads: 10,
//		   //     dictDefaultMessage: "작품 설명 동영상을 선택해 주세요.<br>Max size:300M(.mp4)",
//		        dictDefaultMessage: "조형 작품 3D파일 선택.<br>Max size:300M (.obj)",
//				accept : function(file, done){
//					done();
//				},
//				
//				fallback: function(){
//					g360.gAlert("Error", "지원하지 않는 브라우저 입니다. 브라우저를 업그레이드 하세요" , "red", "left");
//				},
//				
//				init: function(){
//										
//					this.on("maxfilesexceeded", function(file){
//						this.removeFile(file);
//						g360.gAlert("Error", "하나의 파일만 업로드 할 수 있습니다. 기존 업로드 파일을 삭제 하고 다시 업로드 하세요" , "red", "left");
//					});
//					
//					this.on("addedfile", function (file) {
//	                    var _this = this;
//	                    gArtistInfo_Rental.file2 = file;
//	                   
//	                    
//	                    var extension = file.name.split('.').pop().toLowerCase();
//	                    
//	                //    if ($.inArray(extension, ['obj']) == -1) {
//	                //    	g360.gAlert("Error", "업로드 가능 파일 형식이 아닙니다." , "red", "left");
//	                //        _this.removeFile(file);
//	                //    }
//	                 
//	                    var ms = parseFloat((file.size / (1024*1024)).toFixed(2));
//	                    if (ms > this.options.maxFilesize){	                    	
//	                    	g360.gAlert("Error", "업로드 가능 사이즈를 초과하였습니다." , "red", "left");
//	                        _this.removeFile(file);
//	                    }
//	                });
//					
//					
//								
//					
//					xxMydropzone2 = this; //Closer
//				},				
//				
//				removedfile : function(file)
//				{
//					
//					var name = file.name;
//	                var email = file.email;
//	                var type = "3d";
//	                var dockey = file.dockey;
//	                $.ajax({
//	                    headers: {
//	                                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
//	                            },
//	                    type: 'POST',
//	                    url: '/removefile_dropzone.gu',
//	                    data: {filename: name, email : file.email , type: type, dockey : dockey},
//	                    success: function (data){
//	                        console.log("File has been successfully removed!!");
//	                        if (data.replace(/[\n\r]/gi,"") == "OK"){
//		                        gArtistInfo_Rental.d3_md5_before = "";                      	
//		        				gArtistInfo_Rental.d3_filename_before ="";
//	                        }
//
//	                    },
//	                    error: function(e) {
//	                        console.log(e);
//                    }});
//                    var fileRef;
//                    return (fileRef = file.previewElement) != null ? 
//                    fileRef.parentNode.removeChild(file.previewElement) : void 0;
//					
//					
//		        },
//				success : function(file, response){
//					
//
//					var isOK = JSON.parse(response).result;
//					if (isOK == "OK"){
//						var res = JSON.parse(response);
//						//gArtistInfo_Rental.uploadForm(res.filename);
//						gArtistInfo_Rental.d3_filename = res.filename;
//						gArtistInfo_Rental.d3_md5 = res.md5;
//					
//						
//						if (gArtistInfo_Rental.call_option == "edit"){
//																				
//							if (Mydropzone3.files.length > 0){
//								Mydropzone3.processQueue();
//							}else{
//								gArtistInfo_Rental.uploadForm();
//							}
//						}else{
//							
//							if (xxMydropzone5.files.length > 0){
//								xxMydropzone5.processQueue();
//							}else{
//								gArtistInfo_Rental.uploadForm();
//							}
//							
//							
//							
////							if (Mydropzone4.files.length > 0){
////								Mydropzone4.processQueue();
////							}else{
////								gArtistInfo_Rental.uploadForm();
////							}
//						}
//						
//						
//
//					
//											
//					
//						
//						
//					}else{
//
//						g360.gAlert("Error", "파일 업로드 중 오류가 발생하였습니다." , "red", "left");
//					}					
//				},
//				error : function(file, response){
//					return false;
//				}
//			}
//			
//			$("#xxMydropzone2").dropzone();	
		
		
		
		
		
		
		var completeFiles = 0;
		Dropzone.options.xxMydropzone2 = {
				maxFilesize: 50,  //100M
				maxFiles: 10,
//				renameFile: function(file){
//					var dt = new Date();
//					var time = dt.getTime();
//					return time+file.name;
//				},
				acceptedFiles: "",
				addRemoveLinks: true,
				timeout: 500000,
				uploadMultiple: true,
				
				autoProcessQueue: false,
			//	clickable: true,
			//	clickable : "#m4_preview",
			//	previewsContainer: "#m4_preview", 
				// 병렬처리 WebConfig도 같이 수정해줘야함.
		        parallelUploads: 10,
		   //     dictDefaultMessage: "작품이 전시된 이미지를 선택해 주세요.<br>(.jpg,&nbsp;.png,&nbsp;.tif)",
		        dictDefaultMessage: "3D파일 지원 포맷.<br>Max size : 50M<br>(.3ds, .obj, .stl)",
				accept : function(file, done){
					done();
				},
				
				fallback: function(){
					g360.gAlert("Error", "지원하지 않는 브라우저 입니다. 브라우저를 업그레이드 하세요" , "red", "left");
				},
				
				init: function(){
					var totalsize = 0;
					this.on("maxfilesexceeded", function(file){
						this.removeFile(file);
						this._filesexceeded = true; // 여기서 얼럿창 띄우면 여러번 뜰 수 있으므로 addedfiles 이벤트에서 처리되도록함		
					});
					this.on("addedfiles", function(file){
						
						if (this._filesexceeded) {
							g360.gAlert("Error", "최대 " + this.options.maxFiles + "개까지 업로드 할 수 있습니다." , "red", "left");
							this._filesexceeded = false;
						}
						
						
						// var ms = parseFloat((file.size / (1024*1024)).toFixed(2));
	                    
					});
					
					this.on("addedfile", function (file) {
					//	$("#m4_text").text("");
						
						totalsize = parseFloat((file.size / (1024*1024)).toFixed(2));
	                    var _this = this;
	                    
	                    
	                    if (totalsize > this.options.maxFilesize){	   
	                    	g360.gAlert("Error", file.name + "파일은 업로드 가능 사이즈를 초과하였습니다." , "red", "left");
	                        _this.removeFile(file);
	                    }
	                    
	                    
	                    gArtistInfo_Rental.file1 = file;
	                    
	                    
	               //     if ($.inArray(file.type, ['image/jpeg', 'image/jpg', 'image/png', 'image/tif', 'image/tiff']) == -1) {
	                //    	g360.gAlert("Error", "업로드 가능 파일 형식이 아닙니다." , "red", "left");
	                //        _this.removeFile(file);
	                //    }
	                    
//	                    var $el = $(this.element);
//	                    var $addBtn = $el.find('.add-btn');
//	                    if ($addBtn.length == 0) {
//	                    	$addBtn = $('<div class="add-btn"></div>');
//	                    	$addBtn.on('click', function(){$el.click();});
//	                    }
//	                    
//	                    if ($el.find('.dz-preview').length > 0) {
//	                    	$el.find('.dz-preview:last-child').after($addBtn);
//	                    } 
	                });
					
					xxMydropzone2 = this; //Closer
				},				
				
				removedfile : function(file)
				{
				
					
					
					var name = file.name;
	                var email = file.email;
	                var type = "3d";
	                var dockey = file.dockey;
	                var savefolder = file.savefolder;
	              
	               
	                $.ajax({
	                    headers: {
	                                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
	                            },
	                    type: 'POST',
	                    url: '/removefile_dropzone.gu',	                
	                    data: {filename: name, email : email, type : type, dockey : dockey , savefolder : savefolder},
	                    success: function (data){
	                        console.log("File has been successfully removed!!");
	                      
	                        
	                        var list = gArtistInfo_Rental.subfiles_before;
	                        var ttlist = new Array();
	                        for (var i = 0 ; i <list.length; i++){
	                        	var info = list[i];
	                        	if (info.filename == file.name){	                        		
	                        	}else{
	                        		ttlist.push(info);
	                        	}
	                        }
	                        
	                        gArtistInfo_Rental.subfiles_before = ttlist;
	                       
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
					var totalfilecount = xxMydropzone2.files.length;
					
					
					
					if (completeFiles == totalfilecount){
						
						
					
						var res = JSON.parse(response);
						
					
						gArtistInfo_Rental.d3_filename = "3d";
						gArtistInfo_Rental.d3_md5 = "3d_md5";
						gArtistInfo_Rental.savefolder = res.savefolder;
						
					
						
						
						if (gArtistInfo_Rental.call_option == "edit"){
							if (res.info.length > 0){
								gArtistInfo_Rental.subfiles_edit = res.info;
							}		
							
							if (Mydropzone3.files.length > 0){
								Mydropzone3.processQueue();
							}else if (Mydropzone4.files.length > 0){
								Mydropzone4.processQueue();
							}else{
								gArtistInfo_Rental.uploadForm();
							}
						}else{
							if (res.info.length > 0){							
								gArtistInfo_Rental.subfiles = res.info;	
							}
						
							if (Mydropzone4.files.length > 0){
								Mydropzone4.processQueue();
							}else if (xxMydropzone5.files.length > 0){
								xxMydropzone5.processQueue();
							}else{
							//	gArtistInfo_Rental.uploadForm();
							
								if (res.info.length > 0){							
								//	gArtistInfo_Rental.subfiles = res.info;								
									gArtistInfo_Rental.uploadForm();
									
								}else{
									g360.gAlert("Error", "파일 업로드 중 오류가 발생하였습니다." , "red", "left");
								}					
							}
							
						}
						
						
						
						
							
						
					}
					
					
					
				},
				error : function(file, response){
					return false;
				}
			}
			
			$("#xxMydropzone2").dropzone();	
		
		
		
		
		
		
		
///////////////////////////////////////////////////////////////////////////////////////////////////
		Dropzone.options.Mydropzone4 = {
				maxFilesize: 100,  //100M
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
		   //     dictDefaultMessage: "작품 설명 동영상을 선택해 주세요.<br>Max size:300M(.mp4)",
		        dictDefaultMessage: gArtistInfo_Rental.text2 + " 설명 동영상 선택.<br>Max size : 100M<br>(.mp4)",
				accept : function(file, done){
					done();
				},
				
				fallback: function(){
					g360.gAlert("Error", "지원하지 않는 브라우저 입니다. 브라우저를 업그레이드 하세요" , "red", "left");
				},
				
				init: function(){
										
					this.on("maxfilesexceeded", function(file){
						this.removeFile(file);
						g360.gAlert("Error", "하나의 파일만 업로드 할 수 있습니다. 기존 업로드 파일을 삭제 하고 다시 업로드 하세요" , "red", "left");
					});
					
					this.on("addedfile", function (file) {
	                    var _this = this;
	                    gArtistInfo_Rental.file2 = file;
	                    if ($.inArray(file.type, ['video/mp4']) == -1) {
	                    	g360.gAlert("Error", "업로드 가능 파일 형식이 아닙니다." , "red", "left");
	                        _this.removeFile(file);
	                    }
	                 
	                    var ms = parseFloat((file.size / (1024*1024)).toFixed(2));
	                    if (ms > this.options.maxFilesize){	                    	
	                    	g360.gAlert("Error", "업로드 가능 사이즈를 초과하였습니다." , "red", "left");
	                        _this.removeFile(file);
	                    }
	                });
					
					
								
					
					Mydropzone4 = this; //Closer
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
		                        gArtistInfo_Rental.mp4_md5_before = "";                      	
		        				gArtistInfo_Rental.mp4_filename_before ="";
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
						//gArtistInfo_Rental.uploadForm(res.filename);
						gArtistInfo_Rental.mp4_filename = res.mp4_filename;
						gArtistInfo_Rental.mp4_md5 = res.mp4_md5;
					
						
						if (gArtistInfo_Rental.call_option == "edit"){
																				
						//	if (xxMydropzone5.files.length > 0){
						//		xxMydropzone5.processQueue();
						//	}else{
								gArtistInfo_Rental.uploadForm();
						//	}
						}else{
							
							if (xxMydropzone5.files.length > 0){
								xxMydropzone5.processQueue();
							}else{
								gArtistInfo_Rental.uploadForm();
							}
							
							
							
//							if (Mydropzone4.files.length > 0){
//								Mydropzone4.processQueue();
//							}else{
//								gArtistInfo_Rental.uploadForm();
//							}
						}
						
						

					
											
					
						
						
					}else{

						g360.gAlert("Error", "파일 업로드 중 오류가 발생하였습니다." , "red", "left");
					}					
				},
				error : function(file, response){
					return false;
				}
			}
			
			$("#Mydropzone4").dropzone();	
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		Dropzone.options.Mydropzone3 = {
				maxFilesize: 100,  //100M
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
		   //     dictDefaultMessage: "작품 도슨트 파일을 선택해 주세요.<br>Max size:300M(.mp3, .m4a)",
		        dictDefaultMessage: "도슨트 파일 선택.<br>Max size : 100M<br>(.mp3, .m4a)",
				accept : function(file, done){
					done();
				},
				
				fallback: function(){
					g360.gAlert("Error", "지원하지 않는 브라우저 입니다. 브라우저를 업그레이드 하세요" , "red", "left");
				},
				
				init: function(){
					this.on("maxfilesexceeded", function(file){
						this.removeFile(file);
						g360.gAlert("Error", "하나의 파일만 업로드 할 수 있습니다. 기존 업로드 파일을 삭제 하고 다시 업로드 하세요" , "red", "left");
					});
					
					this.on("addedfile", function (file) {
	                    var _this = this;
	                    gArtistInfo_Rental.file3 = file;
	                    
	                    if ($.inArray(file.type, ['audio/mp3', 'audio/x-m4a', 'audio/mpeg']) == -1) {
	                    	g360.gAlert("Error", "업로드 가능 파일 형식이 아닙니다." , "red", "left");
	                        _this.removeFile(file);
	                    }
	                    
	                    var ms = parseFloat((file.size / (1024*1024)).toFixed(2));
	                    if (ms > this.options.maxFilesize){	                    	
	                    	g360.gAlert("Error", "업로드 가능 사이즈를 초과하였습니다." , "red", "left");
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
	                        	gArtistInfo_Rental.mp3_md5_before = "";                      	
		        				gArtistInfo_Rental.mp3_filename_before ="";
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
					//	gArtistInfo_Rental.uploadForm(res.filename);
						
						gArtistInfo_Rental.mp3_filename = res.mp3_filename;
						gArtistInfo_Rental.mp3_md5 = res.mp3_md5;
						
						
						if (gArtistInfo_Rental.call_option == "edit"){


							if (Mydropzone4.files.length > 0){
								Mydropzone4.processQueue();						
							}else{
								gArtistInfo_Rental.uploadForm();
							}
							
							//gArtistInfo_Rental.uploadForm();
							
							
						
						}else{
							if (xxMydropzone2.files.length > 0){
								xxMydropzone2.processQueue();
							}else if (Mydropzone4.files.length > 0){
								Mydropzone4.processQueue();
							}else if (xxMydropzone5.files.length > 0){
								xxMydropzone5.processQueue();
							}else{
								gArtistInfo_Rental.uploadForm();
							}
						}
						
					
						
					}else{
						g360.gAlert("Error", "파일 업로드 중 오류가 발생하였습니다." , "red", "left");
					}					
				},
				error : function(file, response){
					return false;
				}
			}
			
			$("#Mydropzone3").dropzone();	
		
		
		
		
		
		
		
		
		
		
		
		
		
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		


		
		
		
		///////////////////////////////////////////////////////////////////////////////////////////////////
			Dropzone.options.xxMydropzone5 = {
				maxFilesize: 50,  //100M
				maxFiles: 1,
				renameFile: function(file){
					var dt = new Date();
					var time = dt.getTime();
					return time+file.name;
				},
				acceptedFiles: ".pdf",
				addRemoveLinks: true,
				timeout: 500000,
				uploadMultiple: false,
				autoProcessQueue: false,
				clickable: true,
				// 병렬처리 WebConfig도 같이 수정해줘야함.
		        parallelUploads: 1,
		        dictDefaultMessage: "포트폴리오 PDF 파일.<br>Max size : 50M<br>(.pdf)",
				accept : function(file, done){
					done();
				},
				
				fallback: function(){
					g360.gAlert("Error", "지원하지 않는 브라우저 입니다. 브라우저를 업그레이드 하세요" , "red", "left");
				},
				
				init: function(){
										
					this.on("maxfilesexceeded", function(file){
						this.removeFile(file);
						g360.gAlert("Error", "하나의 파일만 업로드 할 수 있습니다. 기존 업로드 파일을 삭제 하고 다시 업로드 하세요" , "red", "left");
					});
					
					this.on("addedfile", function (file) {
	                    var _this = this;
	                    gArtistInfo_Rental.file2 = file;
	                   
	                    if ($.inArray(file.type, ['application/pdf']) == -1) {
	                    	g360.gAlert("Error", "업로드 가능 파일 형식이 아닙니다." , "red", "left");
	                        _this.removeFile(file);
	                    }
	                 
	                    var ms = parseFloat((file.size / (1024*1024)).toFixed(2));
	                    if (ms > this.options.maxFilesize){	                    	
	                    	g360.gAlert("Error", "업로드 가능 사이즈를 초과하였습니다." , "red", "left");
	                        _this.removeFile(file);
	                    }
	                });
					
					
								
					
					xxMydropzone5 = this; //Closer
				},				
				
				removedfile : function(file)
				{
					
					var name = file.name;
	                var email = file.email;
	                var type = "pdf";
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
		                        gArtistInfo_Rental.pdf_md5_before = "";                      	
		        				gArtistInfo_Rental.pdf_filename_before ="";
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
						//gArtistInfo_Rental.uploadForm(res.filename);
						
						gArtistInfo_Rental.pdf_filename = res.filename;
					//	gArtistInfo_Rental.pdf_filename_before = "";
						gArtistInfo_Rental.pdf_md5 = res.md5;
						
											
						if (gArtistInfo_Rental.call_option == "edit"){
																				
							if (xxMydropzone2.files.length > 0){
								xxMydropzone2.processQueue();							
							}else if (Mydropzone3.files.length > 0){
								Mydropzone3.processQueue();	
							}else if (Mydropzone4.files.length > 0){
								Mydropzone4.processQueue();		
							}else{
								gArtistInfo_Rental.uploadForm();
							}
						}else{
//							if (Mydropzone4.files.length > 0){
//								Mydropzone4.processQueue();
//							}else{
								gArtistInfo_Rental.uploadForm();
//							}
						}
						
						
						
					}else{

						g360.gAlert("Error", "파일 업로드 중 오류가 발생하였습니다." , "red", "left");
					}					
				},
				error : function(file, response){
					return false;
				}
			}
			
			$("#xxMydropzone5").dropzone();	
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	},
	
	
	"artist_select_list_add" : function(){
		//작가일 경우 본인이 들어가고 큐레이터일 경우 리스트를 검색해서 추가한다.
		
		
		var gubun = g360.UserInfo.gubun;
		
		var html = "";
		
			var url = g360.root_path + "/my_artist_list_rental.mon";
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
					
					
					if (gArtistInfo_Rental.call_option == "edit"){
						var inx = gArtistInfo_Rental.edit_dockey.lastIndexOf("_");
						var xemail = gArtistInfo_Rental.edit_dockey.substring(0,inx);
						gArtistInfo_Rental.cUserEmail = xemail;
					}
				//	
					
					html +="				<div class='btn-group'>";
					html +="					<button id='gubun_select_box' data='' data2='' style='cursor:pointer; color:gray' class='bg-transparent border-0 dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
					html +="						";
					html +="					"+gArtistInfo_Rental.text1+" 선택</button>";
					
					if (data.length == 0){
						html +="&nbsp;&nbsp;( *  <span style='color:blue; cursor:pointer; text-decoration : underline; padding: 0 5px 0 5px; ' onclick=\"gArtistInfo_Rental.go_reg_artist(); return false;\">"+gArtistInfo_Rental.text1+" 등록</span>후 사용하시기 바랍니다. )";
					}
					
					html +="					<div class='dropdown-menu'>";
					
				//	html +="						<a class='dropdown-item' data='"+email+"' data2='"+nickname+"'>"+name+"</a>";
					
					for (var i = 0 ; i < data.length; i++){
						var info = data[i];
						var email = info.email;
						var name = info.name;
						var nickname = info.nickname;
						var name_eng = info.name_eng;
						
						html +="						<a class='dropdown-item' data='"+email+"' data2='"+nickname+"' data3='"+name_eng+"'>"+nickname+"</a>";

					}
					
					html +="					</div>";
					html +="				</div>";
					
					$("#artist_select_list").html(html);
					
					
					
					$(".dropdown-menu .dropdown-item").on("click", function(event){			
						//gMakeVR.music = event.currentTarget.id;
						
						$("#gubun_select_box").text(event.currentTarget.text);
						$("#gubun_select_box").attr("data", $(event.currentTarget).attr("data"));
						$("#gubun_select_box").attr("data2", $(event.currentTarget).attr("data2"));
						$("#gubun_select_box").attr("data3", $(event.currentTarget).attr("data3"));
						
						gArtistInfo_Rental.cUserEmail = $(event.currentTarget).attr("data");
					});
					
					
					if (gArtistInfo_Rental.call_option == "edit"){
						//수정모드로 호출되었을 경우 처리
						var url = g360.root_path + "/load_image_one_rental.mon?dockey=" + gArtistInfo_Rental.edit_dockey;
						url += "&" + new Date().getTime();
						$.ajax({
							type : "Get",
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							url : url,
							success : function(data){
								
								gArtistInfo_Rental.edit_init(data);
								//파일 미리보기 정보 삽입
								gArtistInfo_Rental.subfiles_before = data.subfile;
								gArtistInfo_Rental.mp3_md5_before = data.mp3_md5;
								gArtistInfo_Rental.mp4_md5_before = data.mp4_md5;
								gArtistInfo_Rental.d3_md5_before = data.d3_md5;
								gArtistInfo_Rental.mp3_filename_before = data.art_mp3_filename;
								gArtistInfo_Rental.mp4_filename_before = data.art_mp4_filename;
								gArtistInfo_Rental.d3_filename_before = data.art_d3_filename;
								
								gArtistInfo_Rental.pdf_md5_before = data.pdf_md5;
								gArtistInfo_Rental.pdf_filename_before = data.art_portfolio;
								
								gArtistInfo_Rental.price = data.art_price;
								gArtistInfo_Rental.shipping_fee = data.shipping_fee;
								gArtistInfo_Rental.title = data.art_title;
								
								gArtistInfo_Rental.file_preview_dropzone1(data);
								
								
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
				

			
			
		
	},
	
	
	"file_preview_dropzone1" : function (data){
		if (data.art_img_filename != ""){
			 var mockFile = { name: data.art_img_filename, email : data.email , size: data.file_size, type: data.file_type , dockey : data.dockey};       
			 upMydropzone1.options.addedfile.call(upMydropzone1, mockFile);
			 upMydropzone1.options.thumbnail.call(upMydropzone1, mockFile, "/artimage/"+data.email+"/art/preview/"+data.art_img_filename+".jpg?open&ver="+data.version);
			 mockFile.previewElement.classList.add('dz-success');
			 mockFile.previewElement.classList.add('dz-complete');
		}
		
//		if (data.subfile.length > 0){
//			for (var i = 0; i < data.subfile.length; i++){
//				var info = data.subfile[i];
//				
//				//http://localhost:8080/artimage/aa@naver.com-spl-1565272569228/art/aa@naver.com-spl-1565272569228_7bba42335457ae16bfe9ef5525334ff5.76186
//				var email = info.filename.split("_")[0];
//				 var mockFile = { name: info.filename, email : email , size: info.file_size, type: info.file_type, dockey : data.dockey };       
//				 Mydropzone4.options.addedfile.call(Mydropzone4, mockFile);
//				 Mydropzone4.options.thumbnail.call(Mydropzone4, mockFile, "/artimage/"+email+"/art/"+info.filename);
//				 mockFile.previewElement.classList.add('dz-success');
//				 mockFile.previewElement.classList.add('dz-complete');
//				
//			}
//		}
		
		if (data.art_mp3_filename != "" && typeof(data.art_mp3_filename) != "undefined"){
			 var mockFile = { name: data.art_mp3_filename, email : data.email , type: "audio/mp3" , dockey : data.dockey};       
			 Mydropzone3.options.addedfile.call(Mydropzone3, mockFile);
			// Mydropzone3.options.thumbnail.call(Mydropzone3, mockFile, "/artimage/"+data.email+"/art_mp3/"+data.art_mp3_filename);
			 mockFile.previewElement.classList.add('dz-success');
			 mockFile.previewElement.classList.add('dz-complete');
			 
			 $("#Mydropzone3").find(".dz-size").remove();
		}
		
		
		if (data.art_mp4_filename != "" && typeof(data.art_mp4_filename) != "undefined"){
			 var mockFile = { name: data.art_mp4_filename, email : data.email , type: "video/mp4" , dockey : data.dockey};       
			 Mydropzone4.options.addedfile.call(Mydropzone4, mockFile);
			// Mydropzone3.options.thumbnail.call(Mydropzone3, mockFile, "/artimage/"+data.email+"/art_mp3/"+data.art_mp3_filename);
			 mockFile.previewElement.classList.add('dz-success');
			 mockFile.previewElement.classList.add('dz-complete');
			 
			 $("#Mydropzone4").find(".dz-size").remove();
		}
		
		
//		if (data.art_d3_filename != "" && typeof(data.art_d3_filename) != "undefined"){
//			 var mockFile = { name: data.art_d3_filename, email : data.email , type: "" , dockey : data.dockey};       
//			 xxMydropzone2.options.addedfile.call(xxMydropzone2, mockFile);
//			// Mydropzone3.options.thumbnail.call(Mydropzone3, mockFile, "/artimage/"+data.email+"/art_mp3/"+data.art_mp3_filename);
//			 mockFile.previewElement.classList.add('dz-success');
//			 mockFile.previewElement.classList.add('dz-complete');
//			 
//			 $("#xxMydropzone2").find(".dz-size").remove();
//		}
		
		
		if (data.art_portfolio != "" && typeof(data.art_portfolio) != "undefined"){
			 var mockFile = { name: data.art_portfolio , email : data.email , type: "application/pdf" , dockey : data.dockey};       
			 xxMydropzone5.options.addedfile.call(xxMydropzone5, mockFile);
			// Mydropzone3.options.thumbnail.call(Mydropzone3, mockFile, "/artimage/"+data.email+"/art_mp3/"+data.art_mp3_filename);
			 mockFile.previewElement.classList.add('dz-success');
			 mockFile.previewElement.classList.add('dz-complete');
			 
			 $("#xxMydropzone5").find(".dz-size").remove();
		}
		
	
		
		
		if (data.art_d3_filename != "" && typeof(data.art_d3_filename) != "undefined"){
			if (data.subfile.length > 0){
				
				
				gArtistInfo_Rental.savefolder = data.art_3d_savefolder;
				for (var i = 0; i < data.subfile.length; i++){
					var info = data.subfile[i];
	
					//http://localhost:8080/artimage/aa@naver.com-spl-1565272569228/art/aa@naver.com-spl-1565272569228_7bba42335457ae16bfe9ef5525334ff5.76186
					//var email = info.filename.split("_")[0];
					
					var email = data.email;
					var savefolder = data.art_3d_savefolder;
					var mockFile = { name: info.filename, email : email , size: info.file_size, type: info.file_type, dockey : data.dockey , savefolder : savefolder};       
					xxMydropzone2.options.addedfile.call(xxMydropzone2, mockFile);
					                                                
										
					var filex = ["jpeg","jpg","png","gif","tif"];
					if ($.inArray(info.filename.split(".").pop().toLowerCase(), filex) == -1){						
					}else{
						xxMydropzone2.options.thumbnail.call(xxMydropzone2, mockFile, "/artimage/"+email+"/art_3d/" + savefolder + "/" +info.filename);
					}
										
					mockFile.previewElement.classList.add('dz-success');
					mockFile.previewElement.classList.add('dz-complete');
					
				}
			}
		}

		
		
		
		
		$(".dz-image img").css("width", "120px").css("height", "120px");
		

	},
	
	
	"go_account_artist" : function(){
		gTopMain.navBtnAction('account');
		return false;
	},
	
	"go_reg_artist" : function(){
		gRen.navBtnAction('artist');
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
		
		gArtistInfo_Rental.subfiles_edit = new Array();
	
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
		
//		//원화 저자권 이미지 제공 여부
//		if (data.art_ck1 == true){
//			$("#chk1").prop("checked", true);
//		}
//		
//		if (data.art_ck2 == true){
//			$("#chk2").prop("checked", true);
//		}
		
	//	$("#art_file_upload_header").hide();  //파일업로드 영역 숨김
	//	$("#art_file_upload").hide();	      //파일업로드 영역 숨김
		
	//	$("#upMydropzone1").hide();
		
		//수정할 경우 원본 파일을 그대로 사용하기 위해서 업로드시 기존 파일명을 추가해서 넣어주고 파일명을 동일하게 처리한다.

		
		
		var url = g360.preview_img_path(data.email, data.dockey);
		$("#preview_img").attr("src",url);
		
		$("#art_s9").val(data.art_yutube);  //유트브 URL
		$("#art_s20").val(data.art_fuse);  //Fuse URL
		
		$("#a_title").val(g360.textToHtml(data.art_title));	 //작품 제목
		$("#art_year_select").val(data.art_date_year);    //제작 년월
		
		//$("#a_artist").val(data.art_artist)  //작가명
		
		
		
		
	//	$("#art_s1").val(data.art_genre);			//장르 선택 사항
		if (data.art_genre == "기타"){
			$("input[name=xcol][value='"+data.art_genre+"']").prop("checked",true);
			$("#xcol_etc").val(data.art_genre_etc);
		}else{
			$("input[name=xcol][value='"+data.art_genre+"']").prop("checked",true);
		}
		
		
		
		$("#art_s2").val(data.art_source);			
		
		//재료
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
		
		
		$("#art_s6").val(g360.textToHtml(data.art_express));				//작품 설명		
	//	$("#art_curator_express").val(data.art_curator_express);			//추천사유
		
		$("#shipping_fee").val(data.shipping_fee);
		
		$("#art_s7").val(data.art_tag);					//검색 태그
		
		if (data.art_sale == "radio1"){
			$("#radio1").prop("checked",true);
		}else{
			$("#radio2").prop("checked",true);
		}
		$("#art_s8").val(data.art_price);
		
		
		
		
		if (data.shipping_type == "기타"){
			$("input[name=shipping_type][value='"+data.shipping_type+"']").prop("checked",true);
			$("#shipping_type_etc").val(data.shipping_type_etc);
		}else{
			$("input[name=shipping_type][value='"+data.shipping_type+"']").prop("checked",true);
		}
		
	
		/////////////////////////////////////////////////////////////
		$("#gubun_select_box").text(g360.TextToHtml(data.art_artist));
		if (data.real_artist_email == "" || typeof(data.real_artist_email) == "undefined"){
			$("#gubun_select_box").attr("data", data.email);
		
		}else{
			$("#gubun_select_box").attr("data", data.real_artist_email);
			
		}
		

		$("#gubun_select_box").attr("data2", data.nickname);
		$("#gubun_select_box").attr("data3", data.art_artist_eng);
		$("#gubun_select_box").prop("disabled", true);
		
		////////////////////////////////////////////////////////////
		
		if(typeof(data.sale_url) != "undefined"){
			data.sale_url = $.trim(data.sale_url);
		}
		
		//링크연결 및 문의
		// - select & input
		if (data.sale_url != "" && typeof(data.sale_url) != "undefined"){
			$("#a_url").val(data.sale_url);
			$("#txt7_up_select > option[value="+data.sale_selectbox+"]").attr("selected",true);
		}else{
			$("#txt7_up_select > option[value='']").attr("selected",true);
		}
		
		//문의여부
		//console.log("data.purchase_req : "+data.purchase_req);
		
		if (data.purchase_req == "N" || typeof(data.purchase_req) == "undefined"){
			$("input[name=xsale][value='"+data.purchase_req+"']").prop("checked",true);	
			$("#txt9_up").css('display','none');
		}else if(data.purchase_req == "Y"){
			$("input[name=xsale][value='"+data.purchase_req+"']").prop("checked",true);	
			$("#txt9_up").css('display','contents');
		}
		
		
	},
	
	
	"uploadForm" : function(){
		//테마 옵션 체크
		
		
		gArtistInfo_Rental.uploadprocess();
		return;
		
		
		$.confirm({
			title : "확인",
			content : "작품을 바로 판매 요청 하시겠습니까?",
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
					text : g360.g_lang.Sales_Request,
					btnClass : "btn-default",
					action : function(){
						gArtistInfo_Rental.isSales = "0";
						gArtistInfo_Rental.uploadprocess();
					}
				},
				btn1 : {						
					text : g360.g_lang.Temporary_Save,
					btnClass : "btn-default",
					action : function(){
						gArtistInfo_Rental.isSales = "1";
						gArtistInfo_Rental.uploadprocess();
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
		
		//작품판매
		var sale_selectbox = $("#txt7_up_select option:selected").val();
		var sale_url = $.trim($("#a_url").val());
		
		if(sale_url.indexOf("https://")!=-1||sale_url.indexOf("http://")!=-1||sale_url==""){
			
		}else{
			sale_url = "http://"+sale_url;
		}
		
		var purchase_req = $('input[name=xsale]:checked').val();
		
		
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
	
//		var ck1 = $("#chk1").get(0).checked;			
//		var ck2 = $("#chk2").get(0).checked;
	
		
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
		
//		art_price =  $("#art_s8").val();
//		var shipping_fee = $("#shipping_fee").val();
//		var shipping_type = $('input[name=shipping_type]:checked').val();
//		if (shipping_type == "기타"){
//			shipping_type_etc = $("#shipping_type_etc").val();
//		}
		
		
		art_frame =  $("#art_s3").val();
		art_width =  $("#art_s4").val();
		art_height =  $("#art_s5").val();
		art_express =  $("#art_s6").val();
		art_tag =  $("#art_s7").val();
		
		art_hosu = $("#art_s10").val();
		art_height2 =  $("#art_s11").val();
	//	art_curator_express = $("#art_curator_express").val();
		
		
		///////////////
		
		
	//	var ky = $('input:radio[name="rdo1"]:checked').get(0).id;
	//	art_sale =  ky;
		
		
		var art_yutube =  $("#art_s9").val();
		var art_fuse = $("#art_s20").val();
		
		
//		var email = g360.UserInfo.email;
//		var art_artist = $("#a_artist").val();
		
		var email = $("#gubun_select_box").attr("data");
		var art_artist = $.trim($("#gubun_select_box").text());
		var art_artist_eng = $("#gubun_select_box").attr("data3");
		
		
		
		
		
		var nickname = "";
		var real_artist_email = "";
		
		

		
		nickname = $("#gubun_select_box").attr("data2");
		real_artist_email = email;
		
		
	
		var data = "";
		if (gArtistInfo_Rental.call_option == "edit"){
			var subfiles = "";
		//	var subfiles = gArtistInfo_Rental.subfiles;
		
			
			if (gArtistInfo_Rental.subfiles_edit.length > 0){
				subfiles = gArtistInfo_Rental.subfiles_edit;
			}else if (gArtistInfo_Rental.subfiles.length == 0){
				subfiles = gArtistInfo_Rental.subfiles_before;
				
			}else{			
				var tlist = new Array();
				for (var j = 0 ; j < gArtistInfo_Rental.subfiles_before.length; j++){
					tlist.push(gArtistInfo_Rental.subfiles_before[j]);
				}				
				for (var j = 0 ; j < gArtistInfo_Rental.subfiles.length; j++){
					tlist.push(gArtistInfo_Rental.subfiles[j]);
				}			
				subfiles = tlist;
			}
			
//			if (gArtistInfo_Rental.subfiles_edit.length > 0){
//				subfiles = gArtistInfo_Rental.subfiles_edit;
//			}else if (gArtistInfo_Rental.subfiles.length == 0){
//				subfiles = gArtistInfo_Rental.subfiles_before;
//			}else{			
//				var tlist = new Array();
//				for (var j = 0 ; j < gArtistInfo_Rental.subfiles_before.length; j++){
//					tlist.push(gArtistInfo_Rental.subfiles_before[j]);
//				}				
//				for (var j = 0 ; j < gArtistInfo_Rental.subfiles.length; j++){
//					tlist.push(gArtistInfo_Rental.subfiles[j]);
//				}			
//				subfiles = tlist;
//			}
			
			

			var mp3 = "";
			var mp3_filename = "";
			
			
		
			var mp3_filename = "";
			if (gArtistInfo_Rental.mp3_md5 == ""){
				mp3 = gArtistInfo_Rental.mp3_md5_before;
				mp3_filename = gArtistInfo_Rental.mp3_filename_before;
			}else{
				mp3 = gArtistInfo_Rental.mp3_md5;
				mp3_filename = gArtistInfo_Rental.mp3_filename;
			}
			
			var mp4 = "";
			var mp4_filename = "";
			var mp4_filename = "";
			if (gArtistInfo_Rental.mp4_md5 == ""){
				mp4 = gArtistInfo_Rental.mp4_md5_before;
				mp4_filename = gArtistInfo_Rental.mp4_filename_before;
			}else{
				mp4 = gArtistInfo_Rental.mp4_md5;
				mp4_filename = gArtistInfo_Rental.mp4_filename;
			}
			

			var d3 = "";
			var d3_filename = "";
			
			gArtistInfo_Rental.subfiles_edit 
			
			
			
			
			if ( gArtistInfo_Rental.subfiles_before.length == 0 && gArtistInfo_Rental.subfiles_edit.length == 0){
				//편집에서 모두 삭제한 경우
				//alert("편집하고 모두 삭제한 경우");
			}else if (gArtistInfo_Rental.subfiles_edit.length > 0){
				//편집해서 다시 올린 파일이 있는 경우
				//alert("편집하고 다시 올린 파일이 있는 경우");
				d3 = gArtistInfo_Rental.d3_md5;
				d3_filename = gArtistInfo_Rental.d3_filename;			
			}else{
				if (gArtistInfo_Rental.d3_md5 == ""){
					d3 = gArtistInfo_Rental.d3_md5_before;
					d3_filename = gArtistInfo_Rental.d3_filename_before;
				}else{
					d3 = gArtistInfo_Rental.d3_md5;
					d3_filename = gArtistInfo_Rental.d3_filename;
				}
			}
			
			
			
			
			
			
			
			var pdf = "";
			var pdf_filename = "";
			if (gArtistInfo_Rental.pdf_md5 == ""){
				pdf = gArtistInfo_Rental.pdf_md5_before;
				pdf_filename = gArtistInfo_Rental.pdf_filename_before;
			}else{
				pdf = gArtistInfo_Rental.pdf_md5;
				pdf_filename = gArtistInfo_Rental.pdf_filename;
			}
			
					
			if (gArtistInfo_Rental.img_filename != ""){
				//원본 이미지를 삭제하고 다시 추가하는 경우
			
				data = JSON.stringify({
					art_artist : art_artist,
					art_artist_eng : art_artist_eng,
					art_yutube : art_yutube,
					art_fuse : art_fuse,
					art_thema : art_thema,
					art_type : art_type,
					art_color : color_select,
			//		art_ck1 : ck1,
			//		art_ck2 : ck2,
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
//					art_curator_express : art_curator_express,
					art_tag : art_tag,
					art_sale : art_sale,
//					art_price : parseInt(art_price.replace(/,/gi,"")),			
					art_date_year : art_date_year,
//					shipping_fee : parseInt(shipping_fee.replace(/,/gi,"")),
//					shipping_type : shipping_type,
//					shipping_type_etc : shipping_type_etc,
					subfile : subfiles,
					status : gArtistInfo_Rental.isSales,
					nickname : nickname,
					real_artist_email : real_artist_email,			
									
					mp3_md5 : mp3,
					mp4_md5 : mp4,
					d3_md5 : d3,
					art_mp3_filename : mp3_filename,
					art_mp4_filename : mp4_filename,
					art_d3_filename : d3_filename,
					
					art_3d_savefolder  : gArtistInfo_Rental.savefolder,
					
					pdf_md5 : pdf,
					art_portfolio : pdf_filename,
					
					
					file_width : gArtistInfo_Rental.file_width,
					file_height : gArtistInfo_Rental.file_height,
					file_size : gArtistInfo_Rental.file_size,
					file_type : gArtistInfo_Rental.file_type,
					file_dpi : gArtistInfo_Rental.file_dpi,
					MD5Value : gArtistInfo_Rental.MD5Value,				
					art_img_filename : gArtistInfo_Rental.img_filename,
				
					dockey : gArtistInfo_Rental.edit_dockey,				
					isSales : gArtistInfo_Rental.isSales,
					
					sale_url : sale_url,
					sale_selectbox : sale_selectbox,
					purchase_req : purchase_req
					
				});
				
			}else{
			
				data = JSON.stringify({
					art_artist : art_artist,
					art_artist_eng : art_artist_eng,
					art_yutube : art_yutube,
					art_fuse : art_fuse,
					art_thema : art_thema,
					art_type : art_type,
					art_color : color_select,
				//	art_ck1 : ck1,
				//	art_ck2 : ck2,
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
		//			art_curator_express : art_curator_express,
					art_tag : art_tag,
					art_sale : art_sale,
		//			art_price : parseInt(art_price.replace(/,/gi,"")),			
					art_date_year : art_date_year,
		//			shipping_fee : parseInt(shipping_fee.replace(/,/gi,"")),
		//			shipping_type : shipping_type,
		//			shipping_type_etc : shipping_type_etc,
					subfile : subfiles,
					status : gArtistInfo_Rental.isSales,
					nickname : nickname,
					real_artist_email : real_artist_email,			
									
					mp3_md5 : mp3,
					mp4_md5 : mp4,
					d3_md5 : d3,
					art_mp3_filename : mp3_filename,
					art_mp4_filename : mp4_filename,
					art_d3_filename : d3_filename,
					
					art_3d_savefolder  : gArtistInfo_Rental.savefolder,
					
					pdf_md5 : pdf,
					art_portfolio : pdf_filename,
				
					dockey : gArtistInfo_Rental.edit_dockey,				
					isSales : gArtistInfo_Rental.isSales,

					sale_url : sale_url,
					sale_selectbox : sale_selectbox,
					purchase_req : purchase_req
					
				});
			}
			
			
		}else{
	
			var subfiles = gArtistInfo_Rental.subfiles;
			
			data = JSON.stringify({
				art_artist : art_artist,
				art_artist_eng : art_artist_eng,
				art_yutube : art_yutube,
				art_fuse : art_fuse,
				art_thema : art_thema,
				art_type : art_type,
				art_color : color_select,
			//	art_ck1 : ck1,
			//	art_ck2 : ck2,
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
		//		art_price : parseInt(art_price.replace(/,/gi,"")),			
				art_date_year : art_date_year,
				nickname : nickname,
				real_artist_email : real_artist_email,
			
				//art_date_month : art_date_month,			
		//		art_curator_express : art_curator_express,
				
				file_width : gArtistInfo_Rental.file_width,
				file_height : gArtistInfo_Rental.file_height,
				file_size : gArtistInfo_Rental.file_size,
				file_type : gArtistInfo_Rental.file_type,
				file_dpi : gArtistInfo_Rental.file_dpi,
				MD5Value : gArtistInfo_Rental.MD5Value,
				status : gArtistInfo_Rental.isSales,
				subfile : subfiles,
				art_img_filename : gArtistInfo_Rental.img_filename,
				
				mp3_md5 : gArtistInfo_Rental.mp3_md5,
				mp4_md5 : gArtistInfo_Rental.mp4_md5,
				d3_md5 : gArtistInfo_Rental.d3_md5,
				art_mp3_filename : gArtistInfo_Rental.mp3_filename,
				art_mp4_filename : gArtistInfo_Rental.mp4_filename,
				art_d3_filename : encodeURIComponent(gArtistInfo_Rental.d3_filename),
				
				art_3d_savefolder  : gArtistInfo_Rental.savefolder,
					
				
				pdf_md5 : gArtistInfo_Rental.pdf_md5,
				art_portfolio : gArtistInfo_Rental.pdf_filename,
				
		//		shipping_fee : parseInt(shipping_fee.replace(/,/gi,"")),
		//		shipping_type : shipping_type,
		//		shipping_type_etc : shipping_type_etc,
				
				dockey : email + "_" + gArtistInfo_Rental.MD5Value,
				
				sale_url : sale_url,
				sale_selectbox : sale_selectbox,
				purchase_req : purchase_req
				
			});
		}
		
		
		
		if (upMydropzone1.files.length > 0){
			var version = new Date().getTime();
			data = JSON.parse(data);
			data.version = version;
			
			data = JSON.stringify(data);
		}
	
		var url = "";
		if (gArtistInfo_Rental.call_option == "edit"){
			url = g360.root_path + "/art_upload_rental.mon?mode=edit";
		}else{
			url = g360.root_path + "/art_upload_rental.mon?mode=add";
		}
		
		
		
		

		//기존에 등록한 내용중에 가격관련된 내용이 변경되면 카트에 등록된 내용을 전체 업데이트 해줘야 한다.
		var ischange_cart_info = false;
		
//		if (gArtistInfo_Rental.price != art_price.replace(/,/gi,"")){
//			ischange_cart_info = true;
//		}
//
//		if (gArtistInfo_Rental.shipping_fee != shipping_fee.replace(/,/gi,"")){
//			ischange_cart_info = true;
//		}
		if (gArtistInfo_Rental.title != art_title){
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
				if (gArtistInfo_Rental.call_option == "edit"){

					////////
					//이미지가 있는지 확인 / 만약 dropzone1을 수정했다면..로드가 완료된후 코드실행
						debugger;
						gRen.init();
						gRen.navBtnAction('main', 'art');
						g360.gAlert("Info", gArtistInfo_Rental.text2 + "이(가) 정상적으로 수정 되었습니다." , "blue", "top");				
						
							
					//}

				}else{
				
					//g360.gAlert("Info", "작품이 정상적으로 등록 되었습니다.<br>이미지 최적화 작업시간으로 보관함에서 이미지가 바로 표시되지 않을 수 있습니다. <br>잠시 후 확인해 보시기 바랍니다." , "blue", "top");
					//g360.gAlert("Info", gArtistInfo_Rental.text2 +"이(가) 정상적으로 등록 되었습니다.<br>등록된 "+gArtistInfo_Rental.text2+"은(는) 대관 메인에서 확인 하실 수 있습니다." , "blue", "top");
					g360.gAlert("Info", "정상적으로 등록 되었습니다." , "blue", "top");

					g360.LoadPage("body_content", g360.root_path + "/rental/art_upload.jsp");
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



function base64ToFile(dataURI, origFile) {
	  console.log(dataURI);
	  console.log(origFile);
	  
	  var byteString, mimestring;

	  if(dataURI.split(',')[0].indexOf('base64') !== -1 ) {
	    byteString = atob(dataURI.split(',')[1]);
	  } else {
	    byteString = decodeURI(dataURI.split(',')[1]);
	  }

	  mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0];

	  var content = new Array();
	  for (var i = 0; i < byteString.length; i++) {
	    content[i] = byteString.charCodeAt(i);
	  }

	  var newFile = new File(
	    [new Uint8Array(content)], origFile.name, {type: mimestring}
	  );


	  // Copy props set by the dropzone in the original file

	  var origProps = [ 
	    "upload", "status", "previewElement", "previewTemplate", "accepted" 
	  ];

	  $.each(origProps, function(i, p) {
	    newFile[p] = origFile[p];
	  });

	  return newFile;
	}




