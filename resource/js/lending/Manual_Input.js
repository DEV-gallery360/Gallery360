/**
 * 
 */
function SYmanual(){
	
}

SYmanual.prototype = {
		
		"init" : function(){
			
			//데이터 불러오기
			symanual.main();
			
			
			$('#email').on('keydown', function(e){
				var txt = $(this).val();
				
				if (e.keyCode == 13) {
					symanual.come_info(txt);					
				}
			});	
			
			$("input:text[numberOnly]").on("keyup", function() {
				var x = $(this).val();
				
				x = x.replace(/[^0-9]/g,'');   // 입력값이 숫자가 아니면 공백
				x = x.replace(/,/g,'');          // ,값 공백처리
				$("input:text[numberOnly]").val(x.replace(/\B(?=(\d{3})+(?!\d))/g, ",")); // 정규식을 이용해서 3자리 마다 , 추가 
			      
			});

/*			$(function(){ //실시간 적용을 보고 싶다면 function선언을 해주어야 한다.
				var comment = "* 년,월,일 사이에 '-'를 꼭 작성해 주세요.<br>";
				
	 			$('#rental_start').focus(function(){
					$('.click1 > span').html(comment);
				});			
				$('#rental_start').blur(function(){
					$('.click1 > span').html("");
				});		
				
				$('#rental_expire').focus(function(){
					$('.click2 > span').html(comment);
				}); 
				$('#rental_expire').blur(function(){
					$('.click2 > span').html("");
				}); 
			});*/
			
		},
		
		"come_info" : function(txt){
			
			var txt = txt;
			
			$.ajax({
				type : "GET",
				url :  g360.root_path + "/manual_input_come_info.mon?txt="+txt ,
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				success : function(data){
				    //내용삽입
					if(!data.res){
						alert("해당계정의 이름이 조회되지 않았습니다.");
						return false;
					}
					$("#username").val(data.res);
				},
				error: function(e){
				    alert("이메일을 다시 한 번 확인해 주세요")
				}
			})
		},
		
		"main" : function(){
			
		    html="";
		    html+="<h3 style='margin-bottom: 20px; font-weight: 500;'>대관결제 수동등록</h3>";
		//    html+="<form class='form-horizontal' >";
		    html+= "<div style='padding-bottom: 15px;'>※ 고객이 사용자 본인인증을 통해 이름, 번호등록이 완료 되어야만 수동등록이 가능합니다. </div>";
			html += "	<div class='alliance_content'>";
			html += "		<table>";
			html += "			<tbody>";
			

/*						    html+= "<tr>";
						    html+= "	<th><span>요금제</span><th>";      
						    html+= "    <td><input type='text' id='title' class='txt' value='All-in-One' style='max-width:100%; background-color:whitesmoke; !important' readonly></td>";
						    html+= "</tr>";*/
						    
							html+= "<tr>";
						    html+= "	<th><span>요금제</span></th>";      
						    html+= "	<td><input type='text' id='title' class='txt' value='All-in-One' style='background-color:whitesmoke; !important' readonly></td>";
						    html+= "</tr>";
						    
						    html+= "<tr>";
						    html+= "	<th><span>이메일</span></th>";      
						    html+= "	<td><input type='text' id='email' class='txt' placeholder='입력 후 Enter키를 누르세요' ></td>";
						    html+= "</tr>";
						    
						    html+="<tr>";
						    html+="		<th><span>사용자명</span></th>";      
						    html+="		<td><input type='text' id='username' class='txt' style=' background-color:whitesmoke; !important' placeholder='사용자명이 들어가야 전송이 가능합니다' readonly></td>";
						    html+="</tr>";
						    
						    html+="<tr>";
						    html+="		<th><span>대관개수</span></th>";        
						    html+="		<td><input type='number' id='rental_count' class='txt' size='20' maxlength='3' min='1' value='1' required></td>" 
						    html+="</tr>";
						    
						    html+="<tr>";
						    html+="		<th><span>계약기간</span></th>";       
						    html+="		<td><input type='number' id='rental_term' class='txt' size='20' maxlength='3' min='1' value='1' required></td>" 
						    html+="</tr>";
						 // ----------------------------------------------
						    html+="<tr>";
						    html+="		<th><span>렌탈타입</span></th>";       
							html+="		<td><select id='rental_type' class='txt' onclick='symanual.choice();'>";
							html+="			<option value='Basic'>Basic</option>";
							html+="			<option value='Premium'>Premium</option>";		
							html+="		</select></td>";
						    html+="</tr>";
						 // ----------------------------------------------
						    html+="<tr>";  
							html+=" 	<th><span>시작일</span></th>";
							html+= "	<td><input type='date' id='rental_start' class='txt' ></td>"
							html+="</tr>";
						    
							html+="<tr>"; 
							html+="		<th><span>종료일</span></th>";         
							html+="		<td><input type='date' id='rental_expire' class='txt' ></td>"
							html+="</tr>";
						    
							// 클릭이벤트 옵션에 주기
							html+="<tr>";
							html+="		<th><span>결제종류</span></th>";
							html+="		<td><select id='payment_type' class='txt' onclick='symanual.choice();'>"; // onclick='symanual.choice();'
							html+="			<option value='cash'>현금(계좌이체)</option>";
							html+="			<option value='naver_store'>네이버 스토어</option>";			
							html+="			<option value='card'>카드</option>";
							html+="		</select></td>";
							html+="</tr>";
							
							html+="<tr  class='card_part' style='display:none;'>";
							html+=  "<th><span>카드이름</span></th>";
							html+=  "<td><input type='text' id='card_name' class='txt' placeholder='ex) 롯데카드'></td>";
							html+="</tr>";
							
							html+="<tr  class='card_part' style='display:none;'>";
							html+=  "<th><span>카드번호</span></th>";
							html+=  "<td><input type='text' id='card_number' class='txt' placeholder='ex) 547109000073'></td>";
							html+="</tr>";
							
							
							html+="<tr class='cash_part'>";
							html+=    "<th><span>사업자등록번호</span></th>";
							html+=    "<td><input type='text' id='com_reg_num' class='txt'></td>";
							html+="</tr>";
							
							html+="<tr>";
						    html+="		<th><span>요금</span></th>";        
						  //html+="		<td><input type='text' id='rental_price' class='txt' placeholder='ex) 440550 (숫자만 입력해주세요)' onkeyup='symanual.numberWithCommas(this.value)' numberOnly></td>";
						    html+="		<td><input type='text' id='rental_price' class='txt' placeholder='ex) 440550 (숫자만 입력해주세요)' numberOnly></td>";
						    html+="</tr>";
							
						    /*html+="<tr>";
						    html+=  "<label for='username'>사용자명 :</label>&emsp;";      
						    html+=   "<input type='text' id='username' style='background-color:whitesmoke;' readonly>";
						    html+="</tr>";
						    
						    html+="<tr>";
						    html+=  "<label for='rental_count'>대관개수 :</label>&emsp;";        
						    // html+=   "<input type='text' id='rental_count' placeholder='ex) 1'>";
						    html+="<input type='number' id='rental_count' size='20' maxlength='3' min='1' value='1' required>" 
						    hhtml+="</tr>";
				
						    tml+="<tr>";
						    html+=  "<label for='rental_term'>계약기간 :</label>&emsp;";       
						    // html+= 	"<input type='text' id='rental_term' placeholder='ex) 3'>";
						    html+="<input type='number' id='rental_term' size='20' maxlength='3' min='1' value='1' required>" 
						    	html+="</tr>";
						    
						    html+="<tr>";
							//html+="<div class='form-group click1'>";
							html+=  "<span></span>";      
							html+=  "<label for='rental_start'>시작일 :</label>&emsp;";
							//html+=  "<input type='text' id='rental_start' placeholder='ex) 2020-09-20'>";
							html+= "<input type='date' id='rental_start'>"
							//html+="</div>";
							html+="</tr>";
						    
							html+="</tr>";
							//html+="<div class='form-group click2'>";
							html+=  "<span></span>";    
							html+=  "<label for='rental_expire'>종료일 :</label>&emsp;";         
							//html+=  "<input type='text' id='rental_expire' placeholder='ex) 2020-12-20'>";
							html+= "<input type='date' id='rental_expire'>"
							//html+="</div>";
							html+="</tr>";
							
							// 클릭이벤트 옵션에 주기
							html+="<tr>";
							html+=  "<label for='payment_type'>결제종류 :</label>&emsp;";
							html+=  "<select id='payment_type' onclick='symanual.choice();'>"; // onclick='symanual.choice();'
							html+=  	"<option value='cash'>현금(계좌이체)</option>";
							html+=  	"<option value='naver_store'>네이버 스토어</option>";			
							html+=  	"<option value='card'>카드</option>";
							html+=	"</select>";
							html+="</tr>";
							
							html+="<tr>";
							html+="<div class='card_part'></div>";
							html+="</tr>";
							
							html+="<tr>";
							html+="<div class='cash_part'>";
							html+=  "<div class='form-group'>";
							html+=    "<label for='com_reg_num'>사업자등록번호 :</label>&emsp;";
							html+=    "<input type='text' id='com_reg_num'>";
							html+=  "</div>";
							html+="</div>";
							html+="</tr>";
							
							html+="<tr>";
						    html+=  "<label for='rental_price'>요금 :</label>&emsp;";        
						    html+=  "<input type='text' id='rental_price' placeholder='ex) 440550'>";
						    html+="</tr>";*/
				
			html += "			</tbody>";
			html += "		</table>";
		    html += "	</div>";
		    
		    html+="<div class='form-group'>";        
		    html+=  "<div class='col-sm-offset-2 col-sm-10'>";
		    html+=    "<button class='btn btn-danger' onclick='symanual.info_upload()' style='margin:20px 0'>전송</button>";
		    html+=  "</div>";
		    html+="</div>";
		//    html+="</form>";
		    
			$('#manual_input').html(html);
			
			
		},
		
		"choice" : function(){
			
			console.log("??"+$("#payment_type option:selected").val());
			
			$(".card_part").show();
			if($("#payment_type option:selected").val()=='card'){
		
/*				html+="<div class='form-group'>";
				html+=  "<label for='card_name'>카드이름 :</label>&emsp;";
				html+=  "<input type='text' id='card_name' placeholder='ex) 롯데카드'>";
				html+="</div>";
				
				html+="<div class='form-group'>";
				html+=  "<label for='card_number'>카드번호 :</label>&emsp;";
				html+=  "<input type='text' id='card_number' placeholder='ex) 547109000073'>";
				html+="</div>";*/
				
				
				$(".cash_part").hide();
				$(".card_part").show();
				
			}else{
				
				$(".card_part").hide();
			}

			if($("#payment_type option:selected").val()=='naver_store'){
				
				$(".cash_part").hide();
			}
			
			if($("#payment_type option:selected").val()=='cash'){
				
				$(".cash_part").show();
			}

		},
		
		"info_upload" : function(){
			
			var aa = $.trim($("#username").val()) 
			if(aa==""){
				alert("이메일과 사용자명을 확인해 주세요");
				return;
			}

			var username = $('#username').val();
			var email = $('#email').val();
			var rental_count = $('#rental_count').val();
			var rental_term = $('#rental_term').val();
			
			var rental_start = $('#rental_start').val();
			var rental_expire = $('#rental_expire').val();
			
			var rental_type = $("#rental_type option:selected").val();
			var payment_type = $("#payment_type option:selected").val();
			
			var card_name = $('#card_name').val();
			var card_number = $('#card_number').val();
			var com_reg_num = $('#com_reg_num').val(); //사업자 등록 번호
			
			
			if(card_name==undefined){
				card_name = "";
				card_number = "";
			}
			
			if(com_reg_num==undefined){
				com_reg_num = "";
			}
			
			
			var rental_price = $('#rental_price').val();
			rental_price = rental_price.replace(/,/gi, '');
			
			
			//시작일
			var timestamp = + new Date(rental_start);
			timestamp = timestamp.toString().substring(0,10);

			
			
			var url = g360.root_path + "/symanual_info_upload.mon";
			var data = JSON.stringify({ 
				
				"service_vr_count":rental_count,
				"service_month":rental_term,
				"service_price":rental_price,
				"expire_date":rental_expire,
				
				"rental_level2":rental_type,
				
				"pginfo_pay_method":payment_type,
				"pginfo_buyer_name":username,
				"pginfo_buyer_email":email,
				"pginfo_card_name":card_name,
				"pginfo_card_number":card_number,
				"pginfo_com_reg_num":com_reg_num,
				"pginfo_paid_at": timestamp,				
				"pginfo_paid_amount":rental_price
				
			});

/*			console.log(username);
			console.log(payment_type);
			console.log(card_name);
			console.log(rental_price);
			*/
			
			
	 		$.ajax({
				
				type : "POST",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				data : data,
				url : url,
				success : function(res){
					
					//console.log(res.result); 
					if(res.result=="OK"){
						alert("완료되었습니다.");
						symanual.main();			
					}else{
						alert("ERROR발생");
					}
					
				},
				error : function(e){
					
					alert("ERROR!(manual_input) : " + e);
					return false;
				}
			
			}); 
		 		
			//console.log(username+email+rental_count);
			//debugger; //console만 찍으면 왜 자꾸 index로 갈까, 정보가 java까지 못간다.
			
	 		//symanual.main();
	}
		
		

		
}