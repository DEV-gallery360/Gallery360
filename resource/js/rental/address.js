
function gRental_Address(){	
	gRT_Address = this;
	
	gRT_Address.totalcount = 0;
	gRT_Address.perpage = 10;
	gRT_Address.start = 0;
	gRT_Address.cPage = 1;
	
	gRT_Address.select_Groupname = "";
	gRT_Address.conf_me = "";
}

gRental_Address.prototype = {		

	"init" : function(){
		var _self = this;	
		
		gRT_Address.reload();
		
		
		
        
		
		$('#dropzone_address').dropzone({
		//	url: setAjaxUrl('/fileUpload'), // 드롭다운 시 업로드 되는 URL
			addRemoveLinks: true,
			autoProcessQueue: true,
			clickable: '#upload_address',
			maxFilesize: 300, // 드롭다운 시 파일 크기
			init: function () {
				this.on('success', function (file, json) {
				// 파일이 서버에 업로드가 완료 되었 을때
				this.removeAllFiles();
				
				var res = JSON.parse(json);
				
				if (res.result == 'OK') {
					//만약에 response message 가 OK 라면
					gRT_Address.reload();
					
				} else {
					// 만약에 OK 가 아니라면???
					alert("업로드가 실패하였습니다.");
				}
			});
			this.on('addedfile', function (file) {});
			this.on('drop', function (file) {});			
			}
		});
		
		$("#download_address_sample").on("click", function(){
			location.href = "/rental/excel/address.csv";
		});

		$("#address_load_all").on("click", function(){
			//전체 데이터 로딩하기
			gRT_Address.select_Groupname = "";
			gRT_Address.reload();
			
		});
			
		$("#address_select_all").on("click", function(){
			//전체 선택
			$("input[type='checkbox']").prop("checked", true);
			
		});
		
		$("#address_deselect_all").on("click", function(){
			//전체 선택 해제
			$("input[type='checkbox']").prop("checked", false);
		});

		$("#address_delete_list").on("click", function(){
			//선택 목록 삭제
			var list = "";
			var check = false;
			$("input[name='rcheck']:checked").each(function(){
				var id = $(this).val();
				check = true;
				if (list == ""){
					list = id;
				}else{
					list += "-" + id;
				}
			});
			
			if (!check){
				g360.gAlert("Info","삭제할 데이터를 선택하세요.", "blue", "top");
				return false;
			}
			
			var data = list;
			var url = g360.root_path + "/address_delete.mon";
			$.ajax({
				type : "POST",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				data : data,
				url : url,
				success : function(data){
				
					gRT_Address.reload();
				},
				error : function(e){
					g360.gAlert("Info","그룹 데이터 로딩시 오류가 발생하였습니다.", "blue", "top");
				}
			})
			
			
			
		});
		
		$("#go_main_rental").on("click", function(){
			gRen.navBtnAction('main', 'artist');
		});
		
		$("#address_move_folder").on("click", function(){
			//선택 목록 폴더 이동
			$("input[name='rcheck']:checked").each(function(){
				var id = $(this).val();
							
				$(".group_address-book>div").removeClass("on");
				$(".group-set_wrap_addbk").addClass("on");
				
			});
		});
		
		
		$(".add-close_addbk").on("click", function(){
			$(".group_address-book>div").addClass("on");
			$(".group-set_wrap_addbk").removeClass("on");
			$("input[type='checkbox']").prop("checked", false);
		});
		
		
		
		$("#send_kakao").on("click", function(){
			var url = g360.root_path + "/send_kakao_mail.mon";
			
					
			var list = new Array();
			var inx = JSON.stringify({
				t : "p",
				name : "김윤기",
				host : "대한미술협회",
				title : "실제와 동일한 가상 전시회",
				sender : g360.UserInfo.nickname,
				mobile : "010-2862-5570",
				email : "dosa777@gmail.com"
			});
			list.push(inx);
			
			var inx = JSON.stringify({
				t : "g",
				n : "그룹1"
			});
			
			list.push(inx);
			
			var data = JSON.stringify({
				type : "2",
				short_url : "123",
				sendList : list
			});
			
			$.ajax({
				type : "POST",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				data : data,
				url : url,
				success : function(res){
					if (res.result == "OK"){
						g360.gAlert("Info","정상적으로 발송되었습니다.", "blue", "top");
					}else{
						g360.gAlert("Info","발송중 오류가 발생하였습니다.", "blue", "top");
					}
				},
				error : function(e){
					g360.gAlert("Info","발송중 오류가 발생하였습니다.", "blue", "top");
				}
			})
		});		
		
		
		$("#send_kakao_test").on("click", function(){
			var url = g360.root_path + "/send_kakao_mail_test.mon";
			
			var short_url = $("#ts0").val();
			var name = $("#ts1").val();
			var mobile = $("#ts2").val();
			var email = $("#ts3").val();
			
			if (name == ""){
				g360.gAlert("Info","수신자 이름을 선택하세요.", "blue", "top");
				return false;
			}
			
			if (name == ""){
				g360.gAlert("Info","수신자 이름을 선택하세요.", "blue", "top");
				return false;
			}
			
			
			var list = new Array();
			var inx = JSON.stringify({
				t : "p",
				name : name,
				mobile : mobile,
				email : email
			});
			list.push(inx);
			
			//debugger;
			var kakao = $("input:checkbox[id='send_chk1']").is(":checked")
			var email = $("input:checkbox[id='send_chk2']").is(":checked")
	
			var ty = "";
			if (kakao && email){
				ty = "3";
				if (mobile == ""){
					g360.gAlert("Info","전화번호를 입력하세요.", "blue", "top");
					return false;
				}
				if (email == ""){
					g360.gAlert("Info","이메일 주소를 입력하세요.", "blue", "top");
					return false;
				}
				
			}else if (kakao && !email){
				ty = "1";
				if (mobile == ""){
					g360.gAlert("Info","전화번호를 입력하세요.", "blue", "top");
					return false;
				}
			}else if (!kakao && email){
				ty = "2";
				if (email == ""){
					g360.gAlert("Info","이메일 주소를 입력하세요.", "blue", "top");
					return false;
				}
			}
			
			if (ty == ""){
				g360.gAlert("Info","발송 옵션을 선택하세요.", "blue", "top");
				return false;
			}
				
			var data = JSON.stringify({
				type : ty,
				short_url : short_url,
				sendList : list
			});
			
			$.ajax({
				type : "POST",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				data : data,
				url : url,
				success : function(res){
					
					if (res.result == "OK"){
						g360.gAlert("Info","정상적으로 발송되었습니다.", "blue", "top");
					}else{
						g360.gAlert("Info","대관서비스 1개당 테스트 발송은 3번 까지만 가능합니다.", "blue", "top");
					}
				},
				error : function(e){
					g360.gAlert("Info","발송중 오류가 발생하였습니다.", "blue", "top");
				}
			})
		});
		
		
		$("#load_rental_ing").on("click", function(){
			var url = g360.root_path + "/load_rental_info_ing.mon";
			$.ajax({
				type : "GET",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(res){
					debugger;
				},
				error : function(e){
					g360.gAlert("Info","데이터 로딩 중 오류가 발생하였습니다.", "blue", "top");
				}
			})
		});
		
		
		
		
		
		
		
		//////////////////////////// 데이터 생성을 위해서 별도로 만든다 나중에 지워라  /////////////////////////////////
		
		$("#save_memo").on("click", function(){
			//방명록 저장하기
			var data = JSON.stringify({
				title : "방명록 등록1",
				content : "전시회 잘 보고 갑니다. 감사합니다.",
				password : "123123",
				rental_roomkey : "aa@naver.com_20200613210443_IQY4WJ5",
				art_key : "123"
			});
			
			var url = g360.root_path + "/save_memo.mon";
			$.ajax({
				type : "POST",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				data : data,
				url : url,
				success : function(res){
					if (res.result == "OK"){
						alert("정상적으로 등록되었습니다.");
					}else{
						alert("저장시 오류가 발생하였습니다.");
					}
				},
				error : function(e){
					g360.gAlert("Info","오류가 발생하였습니다.", "blue", "top");
				}
			})
			
		});
		
		$("#load_memo").on("click", function(){
			//방명록 데이터 불러오기		
			var url = g360.root_path + "/load_memo.mon?rr=vrkeydata&ak=123&start=0&perpage=10";
			//rr : rental_roomkey
			//ak : art_key <== 이값이 공백일 경우 대관 전체 데이터를 로딩하고 값이 있을 경우 해당 작품의 방명록 데이터만 가져온다.
			$.ajax({
				type : "GET",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(res){
					debugger;
				},
				error : function(e){
					g360.gAlert("Info","오류가 발생하였습니다.", "blue", "top");
				}
			})
			
		});
		
		$("#save_rental_info").on("click", function(){
			//대관 서비스 등록하기
			//이 정보가 저장되면 VR 정보에서 해당 VR이 대관 서비스로 사용된다 rental_use 필드에 "T"를 업데이트 해서 대관서비스 사용을 체크한다.
			
			var data = JSON.stringify({
				vr_key : "aa@naver.com_20200613210443_IQY4WJ5",
				host : "대한민국 작가협회2",
				tel : "070-8803-0123",
				email : "gallery360@gallery360.co.kr",
				facebook : "https://facebook.com",
				twitter : "https://www.twitter.com",
				blog : "https://www.naver.com",
				instagram : "https://www.instagram.com",
				youtube : "https://www.youtube.com",
			});
			
			var url = g360.root_path + "/update_rental_info.mon";
			$.ajax({
				type : "POST",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				data : data,
				url : url,
				success : function(res){
					if (res.result == "OK"){
						alert("정상적으로 등록되었습니다.");
					}else{
						alert("저장시 오류가 발생하였습니다.");
					}
				},
				error : function(e){
					g360.gAlert("Info","오류가 발생하였습니다.", "blue", "top");
				}
			})
		});
		
		$("#load_rental_info").on("click", function(){
			//대관 서비스 불러오기 (편집시 기존 데이터 불러오기용)
			var url = g360.root_path + "/load_rental_info.mon?rr=aa@naver.com_20200613210443_IQY4WJ5";
			//rr : rental_roomkey
			//ak : art_key <== 이값이 공백일 경우 대관 전체 데이터를 로딩하고 값이 있을 경우 해당 작품의 방명록 데이터만 가져온다.
			$.ajax({
				type : "GET",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(res){
					debugger;
				},
				error : function(e){
					g360.gAlert("Info","오류가 발생하였습니다.", "blue", "top");
				}
			})
		});
		
		$("#load_rental_info_all").on("click", function(){
			//전체 대관 서비스 정보 불러오기
			var url = g360.root_path + "/load_rental_info_all.mon?rr=aa@naver.com_20200613210443_IQY4WJ5";
			//rr : rental_roomkey
			//ak : art_key <== 이값이 공백일 경우 대관 전체 데이터를 로딩하고 값이 있을 경우 해당 작품의 방명록 데이터만 가져온다.
			$.ajax({
				type : "GET",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(res){
					debugger;
				},
				error : function(e){
					g360.gAlert("Info","오류가 발생하였습니다.", "blue", "top");
				}
			})
		});
		
		$("#load_art_info").on("click", function(){
			//작품 상세 정보 불러오기
			var url = g360.root_path + "/load_art_info.mon?art_key=aa@naver.com-spl-1592036043893_7b2ee73063dc8e1cf49b245b4b378a23.174670";
			//rr : rental_roomkey
			//ak : art_key <== 이값이 공백일 경우 대관 전체 데이터를 로딩하고 값이 있을 경우 해당 작품의 방명록 데이터만 가져온다.
			$.ajax({
				type : "GET",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(res){
					debugger;
				},
				error : function(e){
					g360.gAlert("Info","오류가 발생하였습니다.", "blue", "top");
				}
			})
		});
		/////////////////////////////////////////////////////////////////////////////////////////
		
	},
	
	
	
	
	
	
	
	
	
	
	
	"all_data_load" : function(){
		//전체 데이터 로딩하기
		gRT_Address.select_Groupname = "";
		gRT_Address.reload();
	},
	
	
	"draw_group" : function(){
		var url = g360.root_path + "/address_groupname_load.mon";
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
								
				data.sort(dynamicSort("gn"));
				
				var html = "";
				var html2 = "";
				
				if (data.length > 0){
					html += "<li ><a  onclick=\"gRT_Address.all_data_load()\" style=':hover:color'>전체 목록 보기</a></li>"
				}
				
				
				for (var i = 0; i < data.length; i++){
					var name = data[i];
					if (name.gn != ""){
						//	html += "<span style='cursor:pointer' onclick=\"gRT_Address.load_groupdata('"+name.gn+"',1)\">" + name.gn + "<button onclick=\"gRT_Address.insert_group('"+name.gn+"')\">" + "그룹에 추가</button></span>";
						html += "<li ><a  onclick=\"gRT_Address.load_groupdata('"+name.gn+"',1)\" style=':hover:color'>"+name.gn+"</a></li>"
						html2 += "<li ><a onclick=\"gRT_Address.insert_group('"+name.gn+"')\">"+name.gn+"</a></li>";
					}

				}
				
				// <li><a href="#">Group1</a></li>
				$("#group_dis").html(html);
				
				
				$("#group_select").html(html2);
				
				
				//group_select
			}, 
			error : function(e){
				g360.gAlert("Info","그룹 데이터 로딩시 오류가 발생하였습니다.", "blue", "top");
			}
		})
	},
	
	
	
		
	"insert_group" : function(name){
		//선택되어 있는 사용자를 그룹에 추가한다.
		var list ="";
		list = name;
		
		gRT_Address.select_Groupname = name;
		
		var check = false;
		$("input[name='rcheck']:checked").each(function(){
			check = true;
			var id = $(this).val();
			list += "-" + id;			
		});
		
		if (!check){
			g360.gAlert("Info","이동할 데이터를 선택하세요.", "blue", "top");
			return false;
		}
		
		var url = g360.root_path + "/address_change_groupname.mon";
		var data = list;
		
		$.ajax({
			type : "POST",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			data : data,
			success : function(data){
				gRT_Address.reload();
				
				$(".group_address-book>div").addClass("on");
				$(".group-set_wrap_addbk").removeClass("on");
				$("input[type='checkbox']").prop("checked", false);
			},
			error : function(e){
				g360.gAlert("Info","데이터 변경시 오류가 발생하였습니다.", "blue", "top");
			}
		})
	},
	
	"confirm_m_e" : function(id, mobile, email){

		//이미 존재하는 mobile, email일 경우 "N"리턴
		var data = JSON.stringify({
			id : id,
			mobile : mobile,
			email : email
		});
		
		var url = g360.root_path + "/confirm_m_e.mon";
		
		var res1 = "";
		$.ajax({
			type : "POST",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			data : data,
			success : function(data){
				//N: 이미 존재 , Y: 사용가능
				gRT_Address.conf_me = data.res;
				alert("conf_me : "+gRT_Address.conf_me);
				
				if(gRT_Address.conf_me=="N"){
					g360.gAlert("Info","이미 존재하는 전화번호 또는 이메일 입니다.", "blue", "top");
					gRT_Address.conf_me="";
					return false;
				}
			}
		});
	},
	
	"address_save" : function(){

		
		if (gRT_Address.isModify == "T"){
			gRT_Address.save_modify();
			return false;
		}
		
		var name = $("#n1").val();
		var groupname = $("#n2").val();
		
		if($("#n3").prop("type")=="hidden"){

			var mobile = $("#n3_1").val()+"-"+$("#n3_2").val()+"-"+$("#n3_3").val();
			
		}else if($("#n3").prop("type")=="text"){
			
			var mobile = $("#n3").val();
		}
		
		var email = $("#n4").val();
		
		var n = $.trim(name);
		var g = $.trim(groupname);
		var m = $.trim(mobile);
		var e = $.trim(email);
		
		if(n==""&&m=="--"&&e==""){
			g360.gAlert("Info","내용을 입력하여 주세요.", "blue", "top");
			return false;
			
		}else{
			
			if(n==""){
				g360.gAlert("Info","이름을 입력하여 주세요.", "blue", "top");
				return false;
			}else{
				
				if(m=="--"&&e==""){
					g360.gAlert("Info","전화번호 또는 이메일을 입력해 주세요.", "blue", "top");
					return false;
				}else{
					
					if(m=="--"){
						m="";
					}
					
					//전화번호 이메일 중복체크 (id, mobile, email)
					//gRT_Address.confirm_m_e("",m,e);
					
					
					var data = JSON.stringify({
						name : n,
						groupname : g,
						mobile : m,
						email : e
					});
					
					var url = g360.root_path + "/address_save_one.mon";
					$.ajax({
						type : "POST",
						dataType : "json",
						contentType : "application/json; charset=utf-8",
						url : url,
						data : data,
						success : function(data){
							//F-등록불가 T-등록가능
							if (data.result1 == "F"){
								g360.gAlert("Info","이미 존재하는 전화번호 또는 이메일 입니다.", "blue", "top");
								return false;
								
							}else {
								//ERROR-등록불가 OK-등록가능
								if (data.result2 == "ERROR"){
									g360.gAlert("Info","동일한 사용자가 이미 등록되어 있습니다.", "blue", "top");
									return false;
								}else{
									
									gRT_Address.reload();
									$("#n1").val("");
									$("#n2").val("");
									
									$("#n3").val("");
									$("#n3_1").val(""); $("#n3_2").val(""); $("#n3_3").val("");
									
									$("#n4").val("");
									$("#n1").focus();
									
									////////////////////////////////
									
									$("#n3").prop("type","hidden");
									$(".n3").show();
									
									$("#n3_1").prop("type","text");
									$("#n3_2").prop("type","text");
									$("#n3_3").prop("type","text");
								}
								
							}
							
							
						},
						error : function(e){
							g360.gAlert("Info","데이터 저장시 오류가 발생하였습니다.", "blue", "top");
						}
					});
				}
				
			}
			

			
		}
		
		
	},
	
	"load_address_one" : function(id){
		
	},
	
	
	"reload" : function(){
		
	
		gRT_Address.draw_group();
	//	gRT_Address.draw_address(1);
		
		if (gRT_Address.select_Groupname != ""){
			gRT_Address.load_groupdata(gRT_Address.select_Groupname, 1);
		}else{
			gRT_Address.draw_address(1);
		}
	},
	
	
	"load_groupdata" : function (name, cPage){
		gRT_Address.select_Groupname = name;
		
		gRT_Address.cPage = cPage;
		var start = (parseInt(gRT_Address.perpage) * (parseInt(gRT_Address.cPage))) - (parseInt(gRT_Address.perpage) - 1);
		start = parseInt(start) -1 ;
		
		var url = g360.root_path + "/load_group_data.mon?start="+start+"&perpage="+gRT_Address.perpage + "&gn="+ encodeURIComponent(name);
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				
				gRT_Address.list_draw_address(data);
				
//				var list = data;
//				var totalcount = list[0].totalcount;
//				gRT_Address.totalcount = totalcount;
//				
//				var html = "";
//				html += "<table class='board-title_addbk'  style='width:100%; margin-top:30px'>";
//				html += "<thead>";
//				html += "	<tr>";
//				html += "		<th style='width:2%'></th>";
//			//	html += "		<th class='t-name_addbk'>이름<span class='array_addbk'>정렬기준</span></th>";
//				html += "		<th style='width:25%' >이름</th>";
//				html += "		<th style='width:15%'>그룹명</th>";
//				html += "		<th style='width:15%'>전화번호</th>";
//				html += "		<th style='width:25%'>이메일</th>";
//				html += "		<th style='width:200px'></th>";
//				html += "	<tr>";
//				html += "</thead>";
//				
//				for (var i = 1;  i < data.length; i++){
//					var info = data[i];					
//					html += "<tr>";
//					html += "<td ><input type='checkbox' name='rcheck' value='"+info._id.$oid+"'></td>"; 
//					html += "<td >"+info.name+"</td>";
//					html += "<td >"+info.groupname+"</td>";
//					html += "<td >"+info.mobile+"</td>";
//					html += "<td >"+info.email+"</td>";
//					html += "<td class='t-btn_addbk'>";
//					html += "   <span class='revise_addbk'>수정</span>";
//					html += "   <span class='delete_addbk'>삭제</span>";
//					html += "</td>";
//					html += "</tr>";
//				}
//				
//				html += "</table>";
//				
////				var html = "";
////				html += "<table>";
////				html += "<tr><th></th><th>이름</th><th>그룹명</th><th>전화번호</th><th>이메일</th><tr>";
////				
////				for (var i = 1;  i < data.length; i++){
////					var info = data[i];
////					html += "<tr>";
////					html += "<td><input type='checkbox' name='rcheck' value='"+info._id.$oid+"'></td>"; 
////					html += "<td>"+info.name+"</td>";
////					html += "<td>"+info.groupname+"</td>";
////					html += "<td>"+info.mobile+"</td>";
////					html += "<td>"+info.email+"</td>";
////					
////					html += "</tr>";
////				}
////				
////				html += "</table>";
//				
//				$("#address_dis").html(html);
				
				gRT_Address.search_paging(gRT_Address.cPage);
			},
			error : function(e){
				g360.gAlert("Info","데이터 로딩시 오류가 발생하였습니다.", "blue", "top");
			}
		})
	},
	
	
	"draw_address" : function(cPage){
	
		
		gRT_Address.select_Groupname = "";
		
		gRT_Address.cPage = cPage;
		var start = (parseInt(gRT_Address.perpage) * (parseInt(gRT_Address.cPage))) - (parseInt(gRT_Address.perpage) - 1);
		start = parseInt(start) -1 ;
		
	//	var perpage = $( "#pagingbox_addbk option:selected" ).text();
		//debugger;
		
		var url = g360.root_path + "/address_load.mon?start="+start+"&perpage="+gRT_Address.perpage;
	//	var url = g360.root_path + "/address_load.mon?start="+start+"&perpage="+perpage;
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json, charset=utf-8",
			url : url,
			success : function(data){
				
				
				gRT_Address.list_draw_address(data);
				gRT_Address.search_paging(gRT_Address.cPage);
				
			
//				$("address_dis").mCustomScrollbar({
//			    	theme:"light",
//					autoExpandScrollbar: true,
//					scrollButtons:{
//						enable:true
//					},
//					mouseWheelPixels : 200, // 마우스휠 속도
//					scrollInertia : 400, // 부드러운 스크롤 효과 적용
//				//	mouseWheel:{ preventDefault: false },
//					advanced:{
//						updateOnContentResize: true
//					},
//					autoHideScrollbar : false
//			    });
				
//				$("#address_dis").mCustomScrollbar({
//					scrollbarPosition : "outside"
//				});
				
				
			},
			error : function(e){
				g360.gAlert("Info","데이터 로딩시 오류가 발생하였습니다.", "blue", "top");
			}
		})
		
	},
	
	
	"list_draw_address" : function(data){
		var list = data;
		var totalcount = list[0].totalcount;
		gRT_Address.totalcount = totalcount;
		
		$("#tocnt").html("(총 : " + g360.comma(totalcount) + "명)");
	
		
		var html = "";			
		
		html += "<table class='board-title_addbk'  style='width:100%; margin-top:30px'>";
		html += "<thead>";
		html += "	<tr>";
		html += "		<th style='width:5%'></th>";
	//	html += "		<th class='t-name_addbk'>이름<span class='array_addbk'>정렬기준</span></th>";
		html += "		<th style='width:21%' >이름</th>";
		html += "		<th style='width:20%'>그룹명</th>";
		html += "		<th style='width:19%'>전화번호</th>";
		html += "		<th style='width:20%'>이메일</th>";
		html += "		<th style='width:200px'></th>";
		html += "	<tr>";
		html += "</thead>";
		
		html += "<tbody>";
		for (var i = 1;  i < data.length; i++){
			var info = data[i];					
			html += "<tr>";
			html += "<td class='t-checkbox-addbk' style='height:40px;width:5%'><input type='checkbox' name='rcheck' value='"+info._id.$oid+"'></td>"; 
			html += "<td >"+info.name+"</td>";
			html += "<td >"+info.groupname+"</td>";
			html += "<td >"+info.mobile+"</td>";
			html += "<td >"+info.email+"</td>";
			html += "<td class='t-btn_addbk' >";
			html += "   <span class='revise_addbk' onClick=\"gRT_Address.modify_one('"+info._id.$oid+"','"+info.name+"','"+info.groupname+"','"+info.mobile+"','"+info.email+"')\">수정</span>";
			html += "   <span class='delete_addbk' onClick=\"gRT_Address.delete_one('"+info._id.$oid+"')\">삭제</span>";
			html += "</td>";
			html += "</tr>";
		}
		html += "</tbody>";
		html += "</table>";
		
			
		
		$("#address_dis").html(html);
	},
	
	
	
	
	"delete_one" : function(id){
		//선택 목록 삭제
		var data = id;
		var url = g360.root_path + "/address_delete.mon";
		$.ajax({
			type : "POST",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			data : data,
			url : url,
			success : function(data){
			
				gRT_Address.reload();
			},
			error : function(e){
				g360.gAlert("Info","그룹 데이터 로딩시 오류가 발생하였습니다.", "blue", "top");
			}
		})
		
	},
	
	"modify_one" : function(id, name, groupname, mobile, email){
		//선택 목록 삭제
			
		gRT_Address.isModify = "T";
		gRT_Address.modify_id = id;
		
		var findString = "-";
		
		if(mobile.indexOf(findString) != -1) {
			//"-" 존재
			
			$("#n3").prop("type","hidden");
			
			$("#n3_1").prop("type","text");
			$("#n3_2").prop("type","text");
			$("#n3_3").prop("type","text");
			
			$(".n3").show();
			
			//mobile을 "-"기준으로 잘라서 넣기
			var arr = mobile.split("-");
			
			$("#n3_1").val(arr[0]);
			$("#n3_2").val(arr[1]);
			$("#n3_3").val(arr[2]);
			
		}else {
			//"-" 없음
			$("#n3").prop("type","text");
			
			$("#n3_1").prop("type","hidden");
			$("#n3_2").prop("type","hidden");
			$("#n3_3").prop("type","hidden");
			
			$(".n3").hide();
			
			$("#n3").val(mobile);
		}
		
		$("#n1").val(name);
		$("#n2").val(groupname);
		$("#n4").val(email);	
	},
	
	
	"save_modify" : function(){
		
		var id = gRT_Address.modify_id;
		var name = $("#n1").val();
		var groupname = $("#n2").val();
		
		var mobile = ""
		if($("#n3").prop("type")=="hidden"){

			mobile = $("#n3_1").val()+"-"+$("#n3_2").val()+"-"+$("#n3_3").val();
			
		}else if($("#n3").prop("type")=="text"){
			
			mobile = $("#n3").val();
		}
		
		mobile = $.trim(mobile);
		//만일 mobile에 -가 하나도 없다면 > 글자수가 11자일때 / 010-1111-2222  
		if(mobile.length==11&&mobile.indexOf("-")==-1){
			var arr = new Array();
			arr[0] = mobile.substr(0,3);
			arr[1] = mobile.substr(3,4);
			arr[2] = mobile.substr(7,4);
			
			mobile = arr.join('-');
		}else if(mobile == "--"){
			mobile = "";
		}
		
		var email = $("#n4").val();
		
		/////// 전화번호 이메일 중복체크
		//gRT_Address.confirm_m_e(id, mobile, email);
		

		var data = JSON.stringify({
			id : id,
			name : name,
			groupname : groupname,
			mobile : mobile,
			email : email
		});
		
		

		var url = g360.root_path + "/address_modify.mon";
		$.ajax({
			type : "POST",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			data : data,
			url : url,
			success : function(data){
			
				if(data.result1 == "F"){
					g360.gAlert("Info","이미 존재하는 전화번호 또는 이메일 입니다.", "blue", "top");
					return false;
					
				}else {

					if (data.result2 == "ERROR"){
						g360.gAlert("Info","동일한 사용자가 이미 등록되어 있습니다.", "blue", "top");
						return false;
					}else{
						gRT_Address.reload();
						gRT_Address.isModify = "F";
						
						$("#n1").val("");
						$("#n2").val("");
						
						$("#n3").val("");
						$("#n3_1").val(""); $("#n3_2").val(""); $("#n3_3").val("");
						
						$("#n4").val("");
						
					 ////////////////////////////////
						
						$("#n3").prop("type","hidden");
						$(".n3").show();
						
						$("#n3_1").prop("type","text");
						$("#n3_2").prop("type","text");
						$("#n3_3").prop("type","text");
					}
					
				}
				
			},
			error : function(e){
				g360.gAlert("Info","그룹 데이터 로딩시 오류가 발생하였습니다.", "blue", "top");
			}
		})
	

	},
	


	/////////////////////////// 리스트 페이징 시작 //////////////////////////////////////////////////////////////
	"search_paging" : function(page){
		
		var alldocuments = gRT_Address.totalcount;
		if (alldocuments % gRT_Address.perpage > 0 & alldocuments % gRT_Address.perpage < gRT_Address.perpage/2 ){
			allPage = Number(Math.round(alldocuments/gRT_Address.perpage)) + 1;
		}else{
			allPage = Number(Math.round(alldocuments/gRT_Address.perpage));
		}	

		gRT_Address.search_navigator(page);
	},
	
	"search_navigator" : function(page){
		
		
		var nav_cpage = page;

		var alldocuments = gRT_Address.totalcount;
		if (alldocuments == 0){
			alldocuments = 1;
			nav_cpage=1;
			allPage = 1;
	     	}

		if (alldocuments != 0) {
			if (allPage % 10 > 0 & allPage % 10 < 5 ) {
				var allFrame = Number(Math.round(allPage/10)) + 1;
			}else{
				var allFrame = Number(Math.round(allPage/10))	;
			}

			if (nav_cpage % 10 > 0 & nav_cpage % 10 < 5 ){
				var cFrame = Number(Math.round(nav_cpage/10)) + 1;
			}else{
				var cFrame = Number(Math.round(nav_cpage/10));
			}

			var nav = new Array();	
		
			if (cFrame == 1 ){
				nav[0] = '';
			}else{
				nav[0] = '<li class="p_prev"><a href="#" class="xico" onclick="javascript:gRT_Address.gotoPage(' + ((((cFrame-1)*10)-1)*gRT_Address.perpage+1) + ',' + ((cFrame-1)*10) + ');">&#60;</a></li>';
			}
			var pIndex = 1;
			var startPage = ((cFrame-1) * 10) + 1;	
			
			for (var i = startPage; i < startPage + 10; i++){
				if (i == nav_cpage){
					if (i == '1'){
						nav[pIndex] = '<li class="on"><a href="#">' + i + '</a></li>';
					}else{
						if (i%10 == '1' ){
							nav[pIndex] = '<li class="on"><a href="#">' + i + '</a></li>';
						}else{
							nav[pIndex] = '<li class="on"><a href="#">' + i + '</a></li>';
						}						
					}
				}else{
					if (i == '1'){
						nav[pIndex] = "<li><a href=# onclick='gRT_Address.gotoPage("+ (((i-1) * gRT_Address.perpage) + 1 ) + ", "+ i + ", this)'>" + i + "</a></li>";
						
					}else{
						if (i%10 == '1' ){
							nav[pIndex] = "<li><a href=# onclick='gRT_Address.gotoPage("+ (((i-1) * gRT_Address.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";	
						}else{
							nav[pIndex] = "<li><a href=# onclick='gRT_Address.gotoPage("+ (((i-1) * gRT_Address.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";
						}
					}
				}				

				if (i == allPage) {
					//nav[pIndex + 1] = '<td width="30" height="15" align="right"></td>';
					break;
				}
				pIndex++;				
			}
			
			if (cFrame < allFrame){
				nav[nav.length] = '<li class="p_next"><a href="#" class="xico" onclick="javascript:gRT_Address.gotoPage(' + ((cFrame*gRT_Address.perpage*10) + 1) + ',' + ((cFrame*10)+1) + ');">&#62;</a></li>';
			}
					
	          var navHTML = "";

			if (cFrame == 1 ){
				navHTML = '';
	          }else{
				navHTML = '<li class="p_first"><a href="#" class="xico" onclick="javascript:gRT_Address.gotoPage(1,1);">&#60;&#60;</a></li>';
	          }		    
			for( var i = 0 ; i < nav.length ; i++){	
	          	navHTML = navHTML + nav[i];
			}
					
			if (cFrame < allFrame){
				navHTML = navHTML + '<li class="p_last"><a href="#" class="xico" onclick="javascript:gRT_Address.gotoPage(' + ((allPage - 1)*gRT_Address.perpage + 1) +','+ allPage +')">&#62;&#62;</a></li>';
	        }else{
				navHTML = navHTML;
	        }
	    
			$("#NAVIGATE").html('<div class="paging"><ul>' + navHTML + '</ul></div>');
		}
	},
	
	"gotoPage" : function(Index, PageNum, obj){
		var nav_cpage = PageNum;
		oldpage = nav_cpage;
		
		if (gRT_Address.select_Groupname != ""){
			gRT_Address.load_groupdata(gRT_Address.select_Groupname, PageNum);
		}else{
			gRT_Address.draw_address(PageNum);
		}
		
	
	
	}
	//////////////////////////////////////// 리스트 페이징 종료    /////////////////////////////////////////////


	
	
	
	
	
	
}




function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}





























