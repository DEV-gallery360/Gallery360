/**
 * 
 */

function SYlending_new(){
	newlen = this;
	newlen.cUserEmail = "";
	newlen.beforeEmail = "";
}

SYlending_new.prototype = {
		
		"init" : function(){
			//데이터 불러오기
			console.clear();
			newlen.load();
		},

		"load" : function(){
			$("#lending_info").show();
			$("#lending_regist").css("display","none");
			
			var url = g360.root_path + "/loadAll_lending2.mon";

			var html = "";

			
		
			$.ajax({
				url : url,
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				success : function(res){
					
					$('#lending_info_tb').html("");
					
					for(var i=0; i<(res.length); i++){

				    	var category = res[i].category;
				    	var lending_name = res[i].lending_name;	
				    	var organizer_name = res[i].organizer_name;
				    	var short_url = res[i].short_url;
				    	var image = res[i].dockey+".jpg";
				    	
				    	var link = "/artimage/lending/new/image/";
						
				    	var $tr = $("<tr class='c_"+i+"'>");
				    	$tr.data('img', res[i].dockey);
				    	$tr.append(
				    		`
				    		<td class='info_category'>${category}</td>
				    		<td class='info_lending_name'>${lending_name}</td>
				    		<td class='info_organizer_name'>${organizer_name}</td>
				    		<td class='info_short_url'><a href=${short_url} target='_blank' >${short_url}</a></td>
				    		<td><img src="`+link+image+`" style='width:100px;'></td>
				    		<td>${image}</td>
				    	
				    		<td><button class='btn btn-danger' onclick='newlen.lending_delete(${i})'>삭제</button></td>
				    		<td><button class='btn btn-info' onclick='newlen.lending_update(${i})'>수정</button></td>
				    		`
				    	);
				    	$('#lending_info_tb').append($tr);	
				    }
				    
					
				},
				error : function(e){
					console.log("현재 대관 anyone 부분에서 '등록된 대관 정보'가 없습니다.")
				}
			});
		},
		
		"lending_delete" : function(index){
			//console.log(index);
			
			var dockey = $(".c_"+index).data('img');
			console.log(dockey);
			
			var result = confirm("정말로 해당 대관내용을 삭제하시겠습니까?");
			
			if(result){
				var url = g360.root_path + "/delete_lending2.mon?dockey="+dockey;

		 		$.ajax({
					type : "GET",
					url : url,
					success : function(res){
						
						//console.log(res.result); 
						if(res.result=="OK"){
							alert("삭제가 완료되었습니다.");
							newlen.load();						
						}else{
							alert("ERROR발생");
						}
						
					},
					error : function(e){
						alert("ERROR!(lending_delete) : " + e);
					}
				
				}); 

			} 
			
		},
		
		//작성 양식
		"lending_reg_form" : function(){
			
			html+="<button class='b_btn' onclick='newlen.load()' style='margin-top:10px; cursor:pointer;'>목록</button>";
			html+="<br>";
			html+="카테고리값 : <input type='text' class='category'/>";
			html+="<br><br>";
			html+="대관명 : <input type='text' class='lending_name'/>";
			html+="<br><br>";
			html+="주최자 : <input type='text'  class='organizer_name'/>";
			html+="<br><br>";
			html+="short_URL : <input type='text' size='34' class='short_url'/>";
			html+="<br><br>";
			
			//이미지 + 동영상
			html+= "<div id='imgvdo1'>";
			html+="<div class='imgvdo2'>  이미지 : <form  method='post' action='/FileUpload_Art.gu' enctype='multipart/form-data' class='dropzone dropzone-area' id='Mydropzone1'>";
	        html+="    <div class='dz-message'>image</div>";
	        html+="    <input type='hidden' name='filepath' value='ch_image' />";
	        html+="</form>  </div>";
	        html+="<div class='imgvdo2'>  동영상 : <form  method='post' action='/FileUpload_Art.gu' enctype='multipart/form-data' class='dropzone dropzone-area' id='Mydropzone2'>";
	        html+="    <div class='dz-message'>vedio</div>";
	        html+="    <input type='hidden' name='filepath' value='ch_vedio' />";
	        html+="</form>  </div>";
			html+= "</div>";
	        
			html+="<br>";
			html+="<button class='btn btn-danger' onclick='newlen.lending_uploadFile();' style='margin:20px 0'>전송</button>";  
		     
			$('#lending_regist').html(html);	
			

			newlen.dropzone1();
			
		},
		
		
		//작성
		"lending_regist" : function(index){
			
			newlen.makeKey();
			
			$("#lending_info").hide();
			$("#lending_regist").show();
			html="";
			html+="<h1 class='len_title'>랜딩 추천 Registration</h1>";
			//내용
			newlen.lending_reg_form();

		},
		
		//수정
		"lending_update" : function(index){

			newlen.makeKey();
			var dockey = $(".c_"+index).data('img');
			newlen.beforeEmail = dockey;
			
			$("#lending_info").hide();
			$("#lending_regist").show();
			html="";
			html+="<h1 class='len_title'>랜딩 추천 Update</h1>";
			html+="<input type='hidden' class='hidden_index' value='"+index+"'>";
			
			//lending 작성 양식
			newlen.lending_reg_form();
			
			//이전정보 불러오기 (dockey)
			
			$(".category").val($(".c_"+index).children(".info_category").text());
			$(".lending_name").val($(".c_"+index).children(".info_lending_name").text());
			$(".organizer_name").val($(".c_"+index).children(".info_organizer_name").text());
			$(".short_url").val($(".c_"+index).children(".info_short_url").text());

			newlen.file_preview_dropzone1(dockey);
		},
		
		//키값 생성
		"makeKey" : function(){
			//작성 : key값 - email+시간
			var email = g360.UserInfo.email;
			var bun = new Date().getTime();
			var reg_email = email + "-spl-" + bun;
			newlen.cUserEmail = reg_email;
			
		},
		
		//전송버튼
		"lending_uploadFile" : function(){
			
			if($(".len_title").text()=="랜딩 추천 Registration"){
				
				console.log("cUserEmail : "+newlen.cUserEmail);
				//dropzone
				Mydropzone1.options.url = g360.root_path + "/FileUpload_newRecommend.gu?key="+newlen.cUserEmail+"&ofile=image";	
				Mydropzone2.options.url = g360.root_path + "/FileUpload_newRecommend.gu?key="+newlen.cUserEmail+"&ofile=mp4"; 	
				
				if (Mydropzone1.files.length > 0) {
					if(Mydropzone2.files.length > 0) Mydropzone1.processQueue();					
					else alert("동영상 파일을 삽입해 주세요");
				}
				else {
					alert("이미지 파일을 삽입해 주세요");
				}
				
			}else if($(".len_title").text()=="랜딩 추천 Update"){
				
				//이미지, 동영상 둘 다 필수값이다.
				Mydropzone1.options.url = g360.root_path + "/FileUpload_newRecommend.gu?key="+newlen.beforeEmail+"&ofile=image";	
				Mydropzone2.options.url = g360.root_path + "/FileUpload_newRecommend.gu?key="+newlen.beforeEmail+"&ofile=mp4"; 	
				
				//해당 파일 수정시 파일 덮어쓰기
				if (Mydropzone1.files.length > 0) {
					Mydropzone1.processQueue();					
				}
				else if (Mydropzone2.files.length > 0) {
					Mydropzone2.processQueue();			
				}else{
					newlen.uploadForm();
				}
				
				
				
				
		    }
		},
	
		"uploadForm" : function(){
			
			var category = "", lending_name = "", organizer_name = "", short_url = "";
			
			category = $('.category').val();
			lending_name = $('.lending_name').val();
			organizer_name = $('.organizer_name').val();
			short_url = $('.short_url').val();
			

			if($(".len_title").text()=="랜딩 추천 Registration"){
				
				var data = JSON.stringify({
					dockey: newlen.cUserEmail,
					confirm: "reg",
					category, lending_name, organizer_name, short_url 
				});

		    }else if($(".len_title").text()=="랜딩 추천 Update"){

		    	var data = JSON.stringify({
					dockey: newlen.beforeEmail,
					confirm: "update",
					category, lending_name, organizer_name, short_url 
				});
				
		    }
			
			
			$.ajax({
				url: g360.root_path + "/regist_lending2.mon",
				dataType : "json",
				contenttype : "application/json; charset=utf-8",
				data: data,
				type: 'POST',
				success: function(res){
					
					if(res.result=="OK"){
						alert("업로드 성공!!");
						newlen.load();						
					}else{
						alert("ERROR발생 - java");
					}
					
				}
			});  
			

	        function validImageType(files) {
				  var result = ([ 'image/jpeg',
				                    'image/png',
				                    'image/jpg' ].indexOf(files.type) > -1);
				  return result;
			};
			
		},
		
		"file_preview_dropzone1" : function(data){
		
			if (data!= ""){
				 var mockFile = { name: data, type: "image/jpg" , dockey : data };       
				 newlen.art_url = "/artimage/lending/new/image/"+data+".jpg";
				 Mydropzone1.options.addedfile.call(Mydropzone1, mockFile);
				 Mydropzone1.options.thumbnail.call(Mydropzone1, mockFile, newlen.art_url);
				 mockFile.previewElement.classList.add('dz-success');
				 mockFile.previewElement.classList.add('dz-complete');

				 $("#Mydropzone1").find(".dz-size").remove();
			}
			
			
			if (data!= ""){
				 var mockFile = { name: data, type: "video/mp4" , dockey : data};
				 Mydropzone2.options.addedfile.call(Mydropzone2, mockFile);
				 mockFile.previewElement.classList.add('dz-success');
				 mockFile.previewElement.classList.add('dz-complete');

				 $("#Mydropzone2").find(".dz-size").remove();
			}
			
			
		},
		
		"dropzone1" : function(){
			

				//이미지
				Dropzone.options.Mydropzone1 = {
					maxFilesize: 50,  //메가단위(50MB)
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
			        parallelUploads: 1,
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
		                    newlen.file1 = file;
		                    if ($.inArray(file.type, ['image/jpeg', 'image/jpg', 'image/png', 'image/tif', 'image/tiff']) == -1) {
		                       	g360.gAlert("Error", "업로드 가능 파일 형식이 아닙니다." , "red", "left");
		                        _this.removeFile(file);
		                    }
		                    
		                    var ms = parseFloat((file.size / (1024*1024)).toFixed(2));
		                    if (ms > this.options.maxFilesize){	                    	
		                    	g360.gAlert("Error", "업로드 가능 사이즈를 초과하였습니다." , "red", "left");
		                        _this.removeFile(file);
		                    }
		                });
						
						
						
						
						Mydropzone1 = this; //Closer
					},				
					
					removedfile : function(file){
						 var fileRef;
	                     return (fileRef = file.previewElement) != null ? 
		                 fileRef.parentNode.removeChild(file.previewElement) : void 0;
			        },
					success : function(file, response){
						
						var isOK = JSON.parse(response).result;
						
						if (isOK == "OK"){
							
							if (Mydropzone2.files.length > 0){
								Mydropzone2.processQueue();
							}else{
								newlen.uploadForm();
							}
							
						}else{
							this.removeFile(file);
							g360.gAlert("Error", "파일 업로드 중 오류가 발생하였습니다." , "red", "left");
							g360.loadingbar_close();
						}			
						
						
					},
					error : function(file, response){
						return false;
					}
				}
				
				$("#Mydropzone1").dropzone();	
				
				//================================
				
				// 동영상
				Dropzone.options.Mydropzone2 = {
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
				        parallelUploads: 1,
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
			                    newlen.file2 = file;
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
								
							
							
							Mydropzone2 = this; //Closer
						},				
						
						removedfile : function(file){
					
							var fileRef;
							return (fileRef = file.previewElement) != null ? 
							fileRef.parentNode.removeChild(file.previewElement) : void 0;
							
				        },
						success : function(file, response){
							

							var isOK = JSON.parse(response).result;
							if (isOK == "OK"){
								
								//정보 삽입
								newlen.uploadForm();
								
							}else{

								g360.gAlert("Error", "파일 업로드 중 오류가 발생하였습니다." , "red", "left");
							}					
						},
						error : function(file, response){
							return false;
						}
					}
					
					$("#Mydropzone2").dropzone();	
				

			
		}

		
	}