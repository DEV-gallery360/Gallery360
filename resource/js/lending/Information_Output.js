/**
 * 
 */

function SYlending(){
	
}

SYlending.prototype = {
	
	"init" : function(){
		
		//데이터 불러오기
		sylending.load();
		
	},
	
	"load" : function(){
		$("#lending_info").show();
		$("#lending_regist").css("display","none");
		
		var url = g360.root_path + "/loadAll_lending.mon";

		var html = "";
		html+= "<h1>랜딩 추천 Info</h1>";
		html+= "<button class='b_btn reg_page' onclick='sylending.lending_regist()' style='margin-top:10px; cursor:pointer;'>대관 추가</button>";
		html+= "<br>";
		html+= "<table class='table'>";
		html+= "<thead><tr>";
		html+= "<th>카테고리</th><th>대관이름</th><th>대관신청자</th><th>URL</th><th>이미지</th><th></th><th></th>";
		html+= "</tr></thead>";
		
	
		$.ajax({
			url : url,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			success : function(res){
				
				var lending = res.lending;
				doc_id = res._id.$oid.toString();
				
				//console.log(lending.length);

				html+= "<tbody>";
				
			    for(var i=0; i<(lending.length); i++){

			    	var category = lending[i].category;
			    	var lending_name = lending[i].lending_name;	
			    	var organizer_name = lending[i].organizer_name;
			    	var category_en = lending[i].category_en || '';
			    	var lending_name_en = lending[i].lending_name_en || '';	
			    	var organizer_name_en = lending[i].organizer_name_en || '';
			    				    	
			    	var short_url = lending[i].short_url;
			    	var image = lending[i].image;
			    	
			    	var link = "/artimage/lending/";
					
			    	html+= "<tr class='c_"+i+"'>";
			    	html+= "<td class='info_category'>"+category+"</td>";
			    	html+= "<td class='info_lending_name'>"+lending_name+"</td>";
			    	html+= "<td class='info_organizer_name'>"+organizer_name+"</td>";
			    	
			    	html+= "<td class='info_category_en' style='display:none;'>"+category_en+"</td>";
			    	html+= "<td class='info_lending_name_en' style='display:none;'>"+lending_name_en+"</td>";
			    	html+= "<td class='info_organizer_name_en' style='display:none;'>"+organizer_name_en+"</td>";
			    	
			    	html+= "<td class='info_short_url'><a  href='"+short_url+"' target='_blank' >"+short_url+"</a></td>";
			    	html+= "<td><img src='"+link+image+"' style='width:100px;'></td>"; 
			    	 html+= "<td>"+image+"</td>";  
			    	html+= "<td><button class='btn btn-danger' onclick='sylending.lending_delete("+i+")'>삭제</button></td>";
			    	html+= "<td><button class='btn btn-info' onclick='sylending.lending_update("+i+")'>수정</button></td>";
			    	html+= "</tr>";
			    }
			    
		    	html+= "</tbody>";
				html+= "</table>";
				
				
				$('#lending_info').html(html);	
				
				//sylending.__list_event();
				
			},
			error : function(e){
				console.log("현재 대관 anyone 부분에서 '등록된 대관 정보'가 없습니다.")
			}
		});
	},
	
	"__list_event" : function(){
		//regist일 때 update일 때
		
/*		$(".reg_page").on("click",function(e){
			alert("등록1");
			sylending.lending_regist();	
			sylending.other();
			//... 같이 실행가능
		});*/
		
		
		
	},
	
/*	"lending_regist" : function(){
		
		alert("test 잘되나???? 등록2");
		
	},*/
	
	"lending_delete" : function(index){
		//console.log(index);
		
		var image = $(".c_"+index).find("img").attr('src');
		//console.log(image);
		
		image = image.split("/artimage/lending/");
		image = image[1];
		
		var result = confirm("정말로 해당 대관내용을 삭제하시겠습니까?");
		
		//console.log("doc_id: "+doc_id);
		//console.log("image: "+image);
		//console.log("index: "+index);
		
		
		if(result){
			var url = g360.root_path + "/delete_lending.mon";
			var data = JSON.stringify({ 
				"index" : index,
				"doc_id" : doc_id,
				"image" : image
			});

	 		$.ajax({
				
				type : "POST",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				data : data,
				url : url,
				success : function(res){
					
					//console.log(res.result); 
					if(res.result=="OK"){
						alert("삭제가 완료되었습니다.");
						sylending.load();						
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
		
		html+="<button class='b_btn' onclick='sylending.load()' style='margin-top:10px; cursor:pointer;'>목록</button>";
		html+="<br>";
		html+="카테고리값 : <input type='text' class='category' placeholder='한글'/> / <input type='text' class='category_en' placeholder='영문'/>";
		html+="<br><br>";
		html+="대관명 : <input type='text' class='lending_name' placeholder='한글'/> / <input type='text' class='lending_name_en' placeholder='영문'/>";
		html+="<br><br>";
		html+="주최자 : <input type='text' class='organizer_name' placeholder='한글'/> / <input type='text' class='organizer_name_en' placeholder='영문'/>";
		html+="<br><br>";
		html+="short_URL : <input type='text' size='34' class='short_url'/>";
		html+="<br><br>";
		
		html+="이미지 : <div id='preview'><img id='img1' /></div>";
		html+="<input type='file' id='FILE_TAG' accept='image/*'/>";
		html+="<br>";
		html+="<button class='btn btn-danger' onclick='sylending.lending_uploadFile();' style='margin:20px 0'>전송</button>";  
	     
		$('#lending_regist').html(html);	
		
	},
	
	//이미지 미리보기
	"image_preview" : function(){
		
		//이미지 미리보기
		$(document).ready(function() {
            $("#FILE_TAG").on("change", fileimage);
        });
        
        //onchange > input태그의 내용변경을 감지 시켜준다.	
		function fileimage(e){
			
			var files = e.target.files;
            var filesArr = Array.prototype.slice.call(files);
 
            filesArr.forEach(function(f) {
                if(!f.type.match("image.*")) {
                    alert("확장자는 이미지 확장자만 가능합니다.");
                    return;
                }
 
                var reader = new FileReader();
                reader.onload = function(e) {        
                	$("#preview > img").attr('style', "height:100px;");
                	$("#preview > img").attr("src", e.target.result);
                }
                reader.readAsDataURL(f);
            });
        
		};

		
	},
	
	//작성
	"lending_regist" : function(index){
		$("#lending_info").hide();
		$("#lending_regist").show();
		html="";
		html+="<h1 class='len_title'>랜딩 추천 Registration</h1>";
		//내용
		sylending.lending_reg_form();
		
		sylending.image_preview();

	},
	
	//수정
	"lending_update" : function(index){
		
		$("#lending_info").hide();
		$("#lending_regist").show();
		html="";
		html+="<h1 class='len_title'>랜딩 추천 Update</h1>";
		html+="<input type='hidden' class='hidden_index' value='"+index+"'>";
		sylending.lending_reg_form();
		
		//console.log("doc_id: "+doc_id);
		
		$(".category").val($(".c_"+index).children(".info_category").text());
		$(".lending_name").val($(".c_"+index).children(".info_lending_name").text());
		$(".organizer_name").val($(".c_"+index).children(".info_organizer_name").text());
		$(".category_en").val($(".c_"+index).children(".info_category_en").text());
		$(".lending_name_en").val($(".c_"+index).children(".info_lending_name_en").text());
		$(".organizer_name_en").val($(".c_"+index).children(".info_organizer_name_en").text());
		
		$(".short_url").val($(".c_"+index).children(".info_short_url").text());
		
		
		// ----------------------------------------------------------------------------------
		
		sylending.image_preview();
		
	},
	
	//전송버튼
	"lending_uploadFile" : function(){
			
		var formData = new FormData();

		if($(".len_title").text()=="랜딩 추천 Registration"){
			
			var inputFile = $("#FILE_TAG");
			var files = inputFile[0].files[0]; //File 타입
			
			if(!validImageType(files)) { 
				alert("이미지파일 형식이 아닙니다.(.jpg .jpeg .png)");
				return;
			} 

			
/*			//여기서부터 시작 ------------------------------------------
			var category= $('.category').val(); 
			var lending_name= $('.lending_name').val();
			var organizer_name= $('.organizer_name').val();
			var short_url= $('.short_url').val();
			
			var jsonArray = new Array(1);
			jsonArray.push(files);
			
			var data = JSON.stringify({ 
	
				//"uploadFile":formData,
				"uploadFile":jsonArray,
				"category":category,
				"lending_name":lending_name,
				"organizer_name":organizer_name,
				"short_url":short_url,
				
			});
			
			$.ajax({
			url: g360.root_path + "/regist_lending.mon",
			data: data,
			type: 'POST',
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			success: function(res){
				
				if(res.result=="OK"){
					alert("업로드 성공!!");
					sylending.load();						
				}else{
					alert("ERROR발생");
				}
				
			}
			});
*/
			
			formData.append('uploadFile',files);
			formData.append("category",$('.category').val());
			formData.append("lending_name",$('.lending_name').val());
			formData.append("organizer_name",$('.organizer_name').val());
			formData.append("category_en",$('.category_en').val());
			formData.append("lending_name_en",$('.lending_name_en').val());
			formData.append("organizer_name_en",$('.organizer_name_en').val());
			formData.append("short_url",$('.short_url').val());
			
			
			/* 아래 코드로 formData 값 확인가능 */
			/* for (var pair of formData.entries()) { console.log(pair[0]+ ', ' + pair[1]); }*/
			
			/* processData는 일반적으로 서버에 전달되는 데이터가 String형태로 전달된다.이를 피하기 위해 false로 설정 해주어야함 */
			/* contentType에서 파일을 보내줄 때는 multipart/form-data로 전송해야하기 때문에 false로 설정해준다.*/
			
			$.ajax({
				url: g360.root_path + "/regist_lending.mon",
				processData: false,
				contentType: false,
				data: formData,
				type: 'POST',
				success: function(res){
					
					if(res.result=="OK"){
						alert("업로드 성공!!");
						sylending.load();						
					}else{
						alert("ERROR발생");
					}
					
				}
			});  
			
	    }else if($(".len_title").text()=="랜딩 추천 Update"){
	    	
			if($("#FILE_TAG").val()!=""){
				
				var inputFile = $("#FILE_TAG");
	      		var files = inputFile[0].files[0];
				
	      		//파일 내용 변경
	      		formData.append('uploadFile',files);
	      		
			}else{
				//파일 내용 유지
				formData.append('uploadFile',"");     
			}
			
			//image 이름 추출
			var image = $(".c_"+$('.hidden_index').val()).find("img").attr('src');
			image = image.split("/artimage/lending/");
			image = image[1];
			
			//console.log(image);
			
			//formData에 값넣기
			formData.append("doc_id",doc_id);
			formData.append("index",$('.hidden_index').val());
			formData.append("category",$('.category').val());
	        formData.append("lending_name",$('.lending_name').val());
	        formData.append("organizer_name",$('.organizer_name').val());
	        formData.append("category_en",$('.category_en').val());
	        formData.append("lending_name_en",$('.lending_name_en').val());
	        formData.append("organizer_name_en",$('.organizer_name_en').val());
	        formData.append("short_url",$('.short_url').val());
	        formData.append("image",image);

	       
			$.ajax({
			 	url:  g360.root_path + "/update_lending.mon",
	            processData: false,
	            contentType: false,
	            data: formData,
	            type: 'POST',
	            success: function(result){
	            	alert("수정 성공!!");
	            	sylending.load();	
	            }	
			});
	    	
	    }
		

        function validImageType(files) {
			  var result = ([ 'image/jpeg',
			                    'image/png',
			                    'image/jpg' ].indexOf(files.type) > -1);
			  return result;
		};
	}

	
}