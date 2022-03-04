var gRen = null;

function gRental(rt){
	_this = this;
	_this.start = 0;
	_this.perpage = 20;
	_this.tab = rt;
	_this.isloading_complete = false;
	_this.selected_vrkey = "";
	_this.is_homepage_open = false;
	_this.selected_short_url = "";
	_this.rental_key = "";
	_this.rental_short_url = "";
	_this.select_slick_index = "";
	_this.selected_title = "";
	_this.selected_img = "";
	
	_this.pstart = 0;
	_this.pperpage = 20;
	_this.isloading_complete_popup = false;
	_this.total_rental_count = 0;

	_this.check_2 = "main";
	_this.txt = "";
	_this.sel_ch = "";
	_this.search_start = 0;
	
	
	_this.group_url = "";
	_this.role = "";
	
}

gRental.prototype = {		
	"init" : function(resolve){
				
		gRen.check_2 = "main";
		gRen.load_rental_service_ing();
    
	    
	    $(".scrollmagic-ret a").each(function(inx){
    		$(this).removeClass("on");
    	});
	    
	    if (gRen.tab == "artist"){
	    	$("#rental_menu1").addClass("on");
	    }else if (gRen.tab == "art"){
	    	$("#rental_menu2").addClass("on");
	    }else if (gRen.tab == "vr"){
	    	$("#rental_menu3").addClass("on");
	    }else if (gRen.tab == "dbook"){
	    	$("#rental_menu4").addClass("on");
	    }
	    
	    $(".scrollmagic-ret a").on("click", function(event){
	    	
	    	gRen.check_2 = "main";
	    	
	    	event.preventDefault();
	    	
	    	$(".scrollmagic-ret a").each(function(inx){
	    		$(this).removeClass("on");
	    	});
	    	
	    	$(this).addClass("on");
	    	
	    	gRen.isloading_complete = false;
	    	gRen.start = 0;

	    	var cid = $(this).attr("id");
	    	if (cid == "rental_menu1"){
	    		//작가를 클릭한 경우
	    		
	    		gRen.tab = "artist";
	    		
	    		//검색창 초기화
	    		$('#artist_search #list_search_txt').val("");
	    		
	    	//	$("#rental_artist").html("");
	    		
	    	//	$("#rental_artist").show();
	    	//	$("#art_list_div").hide();
	    		
	    	//	gRen.load_regartistlist();
	    		
	    		$("#rental_dis").html("");
	    		
	    		$("#rental_dis").show();
	    		$("#art_list_div").hide();
	    		
	    		$("#artist_search #refresh_1").hide();
	    	//	gRen.infiniteScroll();
	    		gRen.load_art_list(0, "init");
	    		
	    		
	    	}else if (cid == "rental_menu2"){
	    		//작품을 클릭한 경우
	    		
	    		gRen.tab = "art";
	    		
	    		//검색창 초기화
	    		$('#art_search #list_search_txt').val("");
	    		$('#sel_ch').val(1);
	    		gRen.sel_ch = $('#sel_ch').val();
	    		
	    		$("#gallery_columns").html("");
	    		
	    		$("#rental_dis").hide();
	    		$("#art_list_div").show();
	    		
	    		$("#art_search #refresh_1").hide();
	    		gRen.infiniteScroll();
	    		gRen.load_art_list(0, "init");
	    		
	    	}else if (cid == "rental_menu3"){
	    		//VR을 클릭한 경우
	    		
	    		gRen.tab = "vr";
	    		
	    		$("#gallery_columns").html("");
	    		
	    		$("#rental_dis").show();
	    		$("#art_list_div").hide();
	    		
	    	//	gRen.infiniteScroll();
	    		gRen.load_art_list(0, "init");
	    		
	    		
	    	}else if (cid == "rental_menu4"){
	    		//D-BOOK을 클릭한 경우
	    		gRen.tab = "dbook";
	    		
	    		$("#rental_dis").html("");
	    		
	    		$("#rental_dis").show();
	    		$("#art_list_div").hide();
	    		
	    	//	gRen.infiniteScroll();
	    		gRen.load_art_list(0, "init");
	    	}
	    	
	    	
	    	return false;
	    	
	    });
	    
	    
	    
	    $('#rental_share_layer .btn_share').on('click', function(){
			var share_type = $(this).data('type');
			gRen.share_menu(share_type);
		});
	   
		$('#rental_share_layer .btn_share_close_sh').on('click', function(){
			$('#rental_share_layer').hide();
		});
	    
		
		$(document).off('mousedown.rental.share').on('mousedown.rental.share', function(e){
			
			if ($('#rental_share_layer').is(':visible')) {
				if ($(e.target).closest('#rental_share_layer').length == 0) {
					$('#rental_share_layer').hide();
				}
			}
			
			if ($('#rental_fnc_layer').is(':visible')) {
				if ($(e.target).closest('#rental_fnc_layer').length == 0) {
					$('#rental_fnc_layer').hide();
				}
			}
			
		});
		
		
		
		 
		$("#rental_fnc_layer .dropdown-item").on("click", function(){
		
			var clickMenu = $(this).attr("id");
			if (clickMenu == "r1"){
				//홈페이지 공개하기		
				gRen.open_homepage_main(gRen.selected_vrkey, "T");
			}else if (clickMenu == "r1_1"){
				//홈페이지 비공개 하기
				gRen.open_homepage_main(gRen.selected_vrkey, "F");
				
			}else if (clickMenu == "r2"){
				//서비스 이미지 변경
				gRen.change_service_image(gRen.selected_vrkey);
			}else if (clickMenu == "r3"){
				//수정하기
				$('#rental_fnc_layer').hide();
				var url = g360.root_path + "/v/" + gRen.selected_short_url;
				window.open(url, null);
				return false;
				
			}else if (clickMenu == "r4"){
				//삭제하기
				gRen.delete_rental_service(gRen.selected_vrkey);
			}else if (clickMenu == "r5"){
				//통계서비스
				gRen.report_show();
			}else if(clickMenu == "r6"){
				//초대장발송

				$("#select_send_kakao_layer").show();
				g360.body_scroll_hide();
				
				
		        //주최자, 전시회명   		
				var short_url = gRen.selected_short_url;
				var data = JSON.stringify({
					short_url : short_url
				});
				
				$.ajax({
					type: "POST",
					data: data,
					dataType: "JSON",
					contentType: "application/json; charset=utf-8",
					url: g360.root_path + "/host_n_displayName.mon",
					success: function(data){
						if(data.role==="admin"){
							gRen.role = "admin";
							$(".inv-test-btn span").text("(관리자 전용)");							
						}
						
						//그룹
						if(data.code != "" && typeof(data.code) != "undefined"){
							gRen.group_url = data.code;
							$("#inv_groupId").css({"display":"flex"});
						}else{
							$("#inv_groupId").css({"display":"none"});
						}

						$('.inv-ex-host').text(g360.textToHtml(data.host));
						$('.inv-ex-title').text(g360.textToHtml(data.title));
						
						//===================================================
						
						//default설정은 개인전 
						$("#inv_grp_sep").click();
						
						//--------------------------------------
						
						gRen.new_groupName = data.group_title;
						
						//그룹전 초대 > 메일발송만 가능
						$("#inv_grp_all").on("click",function(){
							$('input:checkbox[id="inv_check_kakao"]').prop("checked", false);
							$('input:checkbox[id="inv_check_email"]').prop("checked", true);
							$('#parent_check_kakao').css({"display":"none"});
							
							//테스트발송일때
							$('.inv-ex-title').text(g360.textToHtml(data.group_title));
						});
						
						//개인전 > 다시 카톡발송 공개
						$("#inv_grp_sep").on("click",function(){
							$('#parent_check_kakao').css({"display":"inline-block"});
							
							//테스트발송일때
							$('.inv-ex-title').text(g360.textToHtml(data.title));
						});
						
					},
					error: function(e){
						g360.gAlert("Info","그룹 데이터 로딩시 오류가 발생하였습니다.", "blue", "top");
					}
					
				})
				
				//테스트 발송 횟수
				
				
				
				//그룹정보를 불러와서 추가한다. (현재 주석처리 해놓음)
				var url = g360.root_path + "/address_groupname_load.mon";
				$.ajax({
					type : "GET",
					dataType : "json",
					contentType : "application/json; charset=utf-8",
					url : url,
					success : function(data){
					//	debugger;
						
						$("#gglist").children("li").remove();
						
						data.sort(gRen.dynamicSort("gn"));
						
						var html = "";
						
						for (var i = 0; i < data.length; i++){
							var name = data[i];
						//	html += "<span style='cursor:pointer' onclick=\"gRT_Address.load_groupdata('"+name.gn+"',1)\">" + name.gn + "</span>";
							html += "<li style='cursor:pointer' onclick=\"gRen.select_groupdata('"+name.gn+"','g')\"><b>" + name.gn + "</b></li>";
						}
						
						$("#gglist").append(html);
						
					//	$("#glist_popup").mCustomScrollbar("distory");
						$("#glist_popup").mCustomScrollbar({
					    	theme:"dark",
							autoExpandScrollbar: true,
							scrollButtons:{
								enable:true
							},
							mouseWheelPixels : 200, // 마우스휠 속도
							scrollInertia : 400, // 부드러운 스크롤 효과 적용
						//	mouseWheel:{ preventDefault: false },
							advanced:{
								updateOnContentResize: true
							},
							autoHideScrollbar : false
					    });
						
					//	$("#slist_popup").mCustomScrollbar("distory");
						$("#slist_popup").mCustomScrollbar({
					    	theme:"dark",
							autoExpandScrollbar: true,
							scrollButtons:{
								enable:true
							},
							mouseWheelPixels : 200, // 마우스휠 속도
							scrollInertia : 400, // 부드러운 스크롤 효과 적용
						//	mouseWheel:{ preventDefault: false },
							advanced:{
								updateOnContentResize: true
							},
							autoHideScrollbar : false
					    });
						
						
						
					}, 
					error : function(e){
						g360.gAlert("Info","그룹 데이터 로딩시 오류가 발생하였습니다.", "blue", "top");
					}
				})
				
				
				//발송횟수
				gRen.remaining_number();
				
				return false;
			}

			//window.open(callurl, '', 'scrollbars=no, width=600, height=600'); return false;

		});
		 
		
		$('#rental_fnc_layer .btn_share').on('click', function(){
			
			var share_type = $(this).data('type');
			gRen.share_menu(share_type);
		});
	   
		$('#rental_fnc_layer .btn_share_close_sh').on('click', function(){
			$('#rental_fnc_layer').hide();
		});
				
		
		
		$("#kako_send_close").on("click", function(){
			g360.body_scroll_show();
			
			$("#select_send_kakao_layer").hide();
			
			//그룹보기
			$('.inv-cor-wrap-cover').hide();
/*			$('.inv-cor-name').text("이름");
        	
			$('#inv_correct_m').val("");
        	
        	$('#inv_correct_m_1').val("");
        	$('#inv_correct_m_2').val("");
        	$('#inv_correct_m_3').val("");
        	
        	$('#inv_correct_e').val("");
*/
			
        	//일반발송
        	$("#gslist").html("");
        	$("input:checkbox[id='inv_check_kakao']").prop("checked", false);
        	$("input:checkbox[id='inv_check_email']").prop("checked", false);
        	
        	//테스트발송
			$("#inv-test-kakao").val("");
			$("#inv-test-mail").val("");
		});
		
		
		$(".group_category_addsd").on("click", function(){
			//그룹탭을 클릭한 경우
			//$(".group_category_addsd").addClass("on");
			//$(".personal_category_addsd").removeClass("on");
			//$("#send_person").removeClass("active");
			//$("#send_group").addClass("active");
			
			//$("#glist_popup").show();
			//$("#plist_popup").hide();
		});
		
		$(".personal_category_addsd").on("click", function(){
			//개인탭을 클릭한 경우
			//$(".group_category_addsd").removeClass("on");
			//$(".personal_category_addsd").addClass("on");
			
			//$("#send_person").addClass("active");
			//$("#send_group").removeClass("active");
			
			
			//$("#glist_popup").hide();
			//$("#plist_popup").show();
			
			//$("#gplist").children("li").remove();
			
	    	gRen.isloading_complete_popup = false;
	    	gRen.pstart = 0;
	    	
			gRen.load_address_popup(0, "init");
					
		});

		//new 초대장
		$(".inv-sending-btn").on("click",function(){
			var url = g360.root_path + "/new_send_kakao_mail.mon";
			
	        var obj_length = document.getElementsByName("inv-group").length;
	        var obj_res = "";
	        
	        for (var i=0; i<obj_length; i++) {
	            if (document.getElementsByName("inv-group")[i].checked == true) {
	                obj_res = document.getElementsByName("inv-group")[i].value;
	            }
	        }
			
	        if(obj_res=="single"){
	        	gRen.group_url = "";
	        }
	        
			var kakao = $("input:checkbox[id='inv_check_kakao']").is(":checked");
			var email = $("input:checkbox[id='inv_check_email']").is(":checked");
			
			if (kakao == false && email == false){
				g360.gAlert("Info","카카오톡 또는 메일중 하나는 선택하셔야 합니다.", "blue", "top");
				return false;
			}
	
			var ty = "";
			if (kakao && email){
				ty = "3";				
			}else if (kakao && !email){
				ty = "1";				
			}else if (!kakao && email){
				ty = "2";				
			}			
			
			var list = new Array();
			$("#gslist > li").each(function(inx){
				
				//해당 li에 대한 data : string 타입
				var data = $(this).attr("data");
				
				//var은 배열 타입 ㅣ ex. ty = ["p", "김영민", "010-098-9981", "ddd@kkk.com"]; 요런 형태
				var spl = data.split("-spl-");
				
				var d_ty = spl[0];
				
				if (d_ty == "g"){
					//그룹일 경우
					var inx = JSON.stringify({
						t : "g",
						n : spl[1]
					});					
					list.push(inx);
				}else{
					//개인일 경우
					var inx = JSON.stringify({
						t : "p",
						name : spl[1],
						mobile : spl[2],
						email : spl[3]
					});
					list.push(inx);
				}
			
			});
			
			////sendList는 배열
			var data = JSON.stringify({
				group_name : gRen.new_groupName,
				gtype : gRen.group_url,
				owner : g360.UserInfo.email,
				sender : g360.UserInfo.nickname,
				type : ty,
				short_url : gRen.selected_short_url,
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

			        	$("input:checkbox[id='inv_check_kakao']").prop("checked", false);
			        	$("input:checkbox[id='inv_check_email']").prop("checked", false);					
						g360.gAlert("Info","정상적으로 등록되었습니다.<br>실제 발송은 5분 주기로 처리됩니다.", "blue", "top");
						
					}else if (res.result == "ERROR"){
			        	$("input:checkbox[id='inv_check_kakao']").prop("checked", false);
			        	$("input:checkbox[id='inv_check_email']").prop("checked", false);	
						
						g360.gAlert("Info","발송중 오류가 발생하였습니다.", "blue", "top");					
					}else{
						
			        	$("input:checkbox[id='inv_check_kakao']").prop("checked", false);
			        	$("input:checkbox[id='inv_check_email']").prop("checked", false);	
						
						var spl = res.result.split("_");
						var scount = spl[1] //발송할 수 있는 건수
						var bcount = spl[2] //이전에 발송한 건수
						var ccount = spl[3] //현재 지정된 수신자 건수
						g360.gAlert("Info","발송 할 수 있는 최대 건수를 초과하였습니다.<br>발송자를 줄이거나 서비스를 업그레이드 하셔야 합니다.<br>이번달 발송 가능 건수 : " + scount + "<br>이번달 발송한 건수 : " + bcount + "<br>현재 지정된 발신자 건수 : " + ccount, "blue", "top");
					}
					
					//발송 남은횟수 재조회
					gRen.remaining_number();
				},
				error : function(e){
					g360.gAlert("Info","발송중 오류가 발생하였습니다.", "blue", "top");
				}
			})			
			
		});
		
		
		//before 초대장
		$("#send_kakao").on("click", function(){
			var url = g360.root_path + "/send_kakao_mail.mon";
			
		
			var kakao = $("input:checkbox[id='con-kakao-checkbox_addsd']").is(":checked");
			var email = $("input:checkbox[id='con-email-checkbox_addsd']").is(":checked");
			
			if (kakao == false && email == false){
				g360.gAlert("Info","카카오톡 또는 메일중 하나는 선택하셔야 합니다.", "blue", "top");
				return false;
			}
	
			var ty = "";
			if (kakao && email){
				ty = "3";				
			}else if (kakao && !email){
				ty = "1";				
			}else if (!kakao && email){
				ty = "2";				
			}			
			
			//개인 리스트를 취합한다.
			
			var list = new Array();
			$("#gslist li").each(function(inx){
				var data = $(this).attr("data");
				var spl = data.split("-spl-");
				var ty = spl[0];
				
				if (ty == "g"){
					//그룹일 경우
					var inx = JSON.stringify({
						t : "g",
						n : spl[1]
					});					
					list.push(inx);
				}else{
					//개인일 경우
					var inx = JSON.stringify({
						t : "p",
						name : spl[1],
						mobile : spl[2],
						email : spl[3]
					});
					list.push(inx);
				}
				
			});
			
			
			
			var data = JSON.stringify({
				owner : g360.UserInfo.email,
				sender : g360.UserInfo.nickname,
				type : ty,
				short_url : gRen.selected_short_url,
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
						
						$("#con-kakao-checkbox_addsd").prop("checked", false);
						$("#con-email-checkbox_addsd").prop("checked", false);
												
						g360.gAlert("Info","정상적으로 등록되었습니다.<br>실제 발송은 5분 주기로 처리됩니다.", "blue", "top");
					}else if (res.result == "ERROR"){
						$("#con-kakao-checkbox_addsd").prop("checked", false);
						$("#con-email-checkbox_addsd").prop("checked", false);
						
						g360.gAlert("Info","발송중 오류가 발생하였습니다.", "blue", "top");					
					}else{
						
						$("#con-kakao-checkbox_addsd").prop("checked", false);
						$("#con-email-checkbox_addsd").prop("checked", false);
						
						var spl = res.result.split("_");
						var scount = spl[1] //발송할 수 있는 건수
						var bcount = spl[2] //이전에 발송한 건수
						var ccount = spl[3] //현재 지정된 수신자 건수
						g360.gAlert("Info","발송 할 수 있는 최대 건수를 초과하였습니다.<br>발송자를 줄이거나 서비스를 업그레이드 하셔야 합니다.<br>이번달 발송 가능 건수 : " + scount + "<br>이번달 발송한 건수 : " + bcount + "<br>현재 지정된 발신자 건수 : " + ccount, "blue", "top");
					}
				},
				error : function(e){
					g360.gAlert("Info","발송중 오류가 발생하였습니다.", "blue", "top");
				}
			})
		});		
		
		
		
		//new 테스트 초대장
		$(".inv-test-btn").on("click", function(){
			
			//카카오이고 그룹전일때 return false처리
			var kakao_bl = $(".top_kakao_btn").hasClass("onPre");
			var group_bl = $('#inv_grp_all').is(':checked');
			if(kakao_bl && group_bl){
				g360.gAlert("Info","그룹전 초대장은 이메일 발송만 가능합니다.", "blue", "top");
				return false;
			}
			
			
			var url = g360.root_path + "/send_kakao_mail_test.mon";
			
			var short_url = gRen.selected_short_url;
		//	var name = $("#ts1").val();
			var mobile = $("#inv-test-kakao").val(); //핸드폰 번호
			var email = $("#inv-test-mail").val();  //이메일 
			
			
			var list = new Array();
			var inx = JSON.stringify({
				t : "p",
				mobile : mobile,
				email : email
			});
			list.push(inx);
			

	        var obj_length = document.getElementsByName("inv-group").length;
	        var obj_res = "";
	        
	        for (var i=0; i<obj_length; i++) {
	            if (document.getElementsByName("inv-group")[i].checked == true) {
	                obj_res = document.getElementsByName("inv-group")[i].value;
	            }
	        }
			
	        if(obj_res=="single"){
	        	gRen.group_url = "";
	        }
			//var kakao = $("input:checkbox[id='send_chk1']").is(":checked"); //true false
			//var email = $("input:checkbox[id='send_chk2']").is(":checked"); //true false
			
			var ty = "";
			var check = $("#inv_pre_kakao").attr('style');
			
			var is_kakao = $(".top_kakao_btn").hasClass("onPre");
			
			if(is_kakao){
				//alert("카카오톡");
				ty = "1";
				if (mobile == ""){
					g360.gAlert("Info","전화번호를 입력하세요.", "blue", "top");
					return false;
				}
			}else{
				//alert("이메일");
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
				group_name : gRen.new_groupName,
				gtype : gRen.group_url,
				type : ty,
				short_url : short_url,
				sendList : list,
				role : gRen.role
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
						$('#inv-test-mail').val("");
						$('#inv-test-kakao').val("");
					}else{
						g360.gAlert("Info","대관서비스 1개당 테스트 발송은 3번 까지만 가능합니다.", "blue", "top");
					}
				},
				error : function(e){
					g360.gAlert("Info","발송중 오류가 발생하였습니다.", "blue", "top");
				}
			})
			
			
		});
			
		
		//before 테스트 초대장
/*		$("#send_kakao_test").on("click", function(){
			
			var url = g360.root_path + "/send_kakao_mail_test.mon";
		
			var short_url = gRen.selected_short_url;
		//	var name = $("#ts1").val();
			var mobile = $("#ts2").val(); //핸드폰 번호
			var email = $("#ts3").val();  //이메일 
									
			var list = new Array();
			var inx = JSON.stringify({
				t : "p",
				mobile : mobile,
				email : email
			});
			list.push(inx);
			
			
			var kakao = $("input:checkbox[id='send_chk1']").is(":checked"); //true false
			var email = $("input:checkbox[id='send_chk2']").is(":checked"); //true false
	
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
			
			
		}); */
		
		
		//PDF 업로드 클릭시
		$('#reg_btn_dbook_upload, #reg_dbook_upload_fileinfo').on('click', function(){
			$('#reg_dbook_upload_file').click();
		});
		
		$('#reg_dbook_upload_file').on('change', function(){
			var file = this.files[0];
			if (!file) return;
			
			if (file.type != 'application/pdf') {
				alert('PDF 파일을 선택해 주세요.');
				$(this).val('');
				return;
			}
			
			$('#reg_dbook_upload_fileinfo').val(file.name);
			$('#reg_dbook_upload_progress').css('width', '0');
			//$('#dbook_upload_percent').text('[ 0% ]');
		});
		
		$('#reg_btn_dbook_del').on('click', function(){
			$('#reg_dbook_upload_fileinfo').val('');
			$('#reg_dbook_upload_file').val('');			
		});
		
		// 그룹코드 생성
		$('#reg_btn_group_create').on('click', function(){
			$('#rental_blockui').show();
			
			// 컨펑창 셋팅
			$('#rental_confirm_title').text('그룹 코드 생성');
			$('#rental_confirm_comm').text('그룹명');
			$('#rental_cf_content_wrap').show();
			
			
			$('#rental_confirm_btn_ok').off().on('click', function(){
				var title = $.trim($('#rental_confirm_input').val());
				var content = $.trim($('#rental_confirm_content').val());
				
				if (title.replace(/\s*/g, '') == '') {
					alert('제목을 입력해주세요');
					$('#rental_confirm_input').focus();
					return;
				}
				
				var url = "/create_group_code.mon"
				var data = JSON.stringify({
					title : title,
					content : content
				});
				
				$.ajax({
					type : "POST",
					dataType: "json",
					contenType : "application/json; charset=utf-8",
					data : data,
					url : url,
					success : function(res){
						if (res.result == 'OK') {
							$('#reg_group_info').val(res.code + ' (' + g360.textToHtml(res.title) + ')');
							$('#reg_group_code').val(res.code);
							$('#reg_group_title').val(g360.textToHtml(res.title));
							$('#reg_group_content').val(g360.textToHtml(res.content));
							$('#reg_group_owner').val(g360.UserInfo.email);
							
							$('#reg_group_info_wrap').show();
							$('#reg_group_btn_wrap').hide();
							
							$('#rental_confirm_input').val('');
							$('#rental_confirm_content').val('');							
							$('#rental_confirm_layer').hide();
							$('#rental_blockui').hide();
						} else {
							alert('코드 생성중 오류가 발생했습니다.');
						}						
					},
					error : function(e){
						alert('코드 생성중 오류가 발생했습니다.');
					}
				});
				
			});
			$('#rental_confirm_layer').show();
			$('#rental_confirm_input').focus();
		});
		
		// 그룹코드 검색
		$('#reg_btn_group_search').on('click', function(){
			$('#rental_blockui').show();
			
			// 컨펌창 셋팅
			$('#rental_confirm_title').text('그룹 코드 검색');
			$('#rental_confirm_comm').text('그룹 코드를 입력해주세요.');
			$('#rental_cf_content_wrap').hide();
			
			$('#rental_confirm_btn_ok').off().on('click', function(){
				var code = $.trim($('#rental_confirm_input').val());
				
				if (code.replace(/\s*/g, '') == '') {
					alert('그룹 코드를 입력해주세요');
					$('#rental_confirm_input').focus();
					return;
				}
				
				var url = "/search_rental_code.mon";
				var data = JSON.stringify({
					code : code
				});
				
				$.ajax({
					type : "POST",
					dataType: "json",
					contenType : "application/json; charset=utf-8",
					data : data,
					url : url,
					success : function(res){
						if (res.result == 'OK') {
							$('#reg_group_info').val(code + ' (' + g360.textToHtml(res.group_title) + ')');
							$('#reg_group_code').val(code);
							$('#reg_group_title').val(g360.textToHtml(res.group_title));
							$('#reg_group_content').val(g360.textToHtml(res.group_content));
							if (res.group_owner) {
								$('#reg_group_owner').val(res.group_owner);
							} else {
								$('#reg_group_owner').val('');
							}
							
							$('#reg_group_info_wrap').show();
							$('#reg_group_btn_wrap').hide();
							
							$('#rental_confirm_input').val('');
							$('#rental_confirm_layer').hide();
							$('#rental_blockui').hide();
						} else {
							alert('존재하지 않는 그룹 코드 입니다.');
						}		
					},
					error : function(e){
						alert(e);
					}
					
				});
			});
			$('#rental_confirm_layer').show();
			$('#rental_confirm_input').focus();
		});
		
		// 그룹코드 삭제
		$('#reg_btn_group_del').on('click', function(){
			$('#reg_group_info').val('');
			$('#reg_group_code').val('');
			$('#reg_group_title').val('');
			$('#reg_group_content').val('');
			$('#reg_group_owner').val('');
			$('#reg_group_btn_wrap').show();
			$('#reg_group_info_wrap').hide();
		});
		
		// 그룹편집
		$('#reg_btn_group_edit').on('click', function(){
			
			var owner = $('#reg_group_owner').val();
			
			if (owner != '') {
				if (g360.UserInfo.email != owner) {
					alert('그룹 소유주만 편집가능합니다.');
					return;
				}				
			} else {
				// 편집 기능 추가전에 저장한 사용자는 owner비교 안하고 편집 가능하도록 한다
			}
			
			$('#rental_blockui').show();
			
			// 컨펑창 셋팅
			$('#rental_confirm_title').text('그룹 정보 편집');
			$('#rental_confirm_comm').text('그룹명');
			$('#rental_cf_content_wrap').show();
			
			$('#rental_confirm_input').val($('#reg_group_title').val());
			$('#rental_confirm_content').val($('#reg_group_content').val());
			
			$('#rental_confirm_btn_ok').off().on('click', function(){
				
				var title = $.trim($('#rental_confirm_input').val());
				var content = $.trim($('#rental_confirm_content').val());
				
				if (title.replace(/\s*/g, '') == '') {
					alert('제목을 입력해주세요');
					$('#rental_confirm_input').focus();
					return;
				}
				
				
				var url = "/update_group_code.mon"
				var data = JSON.stringify({
					code : $('#reg_group_code').val(),
					title : title,
					content: content
				});
				
				$.ajax({
					type : "POST",
					dataType: "json",
					contenType : "application/json; charset=utf-8",
					data : data,
					url : url,
					success : function(res){
						if (res.result == 'OK') {
							$('#reg_group_info').val(res.code + ' (' + g360.textToHtml(res.title) + ')');
							$('#reg_group_title').val(g360.textToHtml(res.title));
							$('#reg_group_content').val(g360.textToHtml(res.content));
							
							
							$('#rental_confirm_input').val('');
							$('#rental_confirm_content').val('');
							$('#rental_confirm_layer').hide();
							$('#rental_blockui').hide();
						} else {
							alert('그룹 편집 중 오류가 발생했습니다.');
						}						
					},
					error : function(e){
						alert('그룹 편집 중 오류가 발생했습니다.');
					}
				});
				
			});
			$('#rental_confirm_layer').show();
			$('#rental_confirm_input').focus();
		});
		
		// 컨펌창 취소 버튼
		$('#rental_confirm_btn_cancel').on('click', function(){
			$('#rental_blockui').hide();
			$('#rental_confirm_input').val('');
			$('#rental_confirm_content').val('');
			$('#rental_confirm_layer').hide();
		});
	
		
		
// ------------------------------------------------------------------------------------

//		<작가>
		
		//검색클릭
		$('#artist_search #sekbun').on('click',function(e){
			
			var txt = $('#artist_search #list_search_txt').val();
			gRen.txt =  $.trim(txt);
			//console.log(txt);
			
			//빈 내용 검색시 효과 x
			var t1 = gRen.txt; 
			var t2 = gRen.blank_check(t1);
			if(t2==0){
				return;
			}
			
			gRen.search_start = 0;
			gRen.isloading_complete = false; //true일때 load_add_art에서 반복멈춤
			
			gRen.check_2="search";
			
			$("#rental_dis").html("");
    		
			//gRen.infiniteScroll();
			gRen.search_dis(txt,"init");
			
		});

		//엔터(Enter)
		$('#artist_search #list_search_txt').on('keydown', function(e){
			var txt = $(this).val();
			
			if (e.keyCode == 13) {
				gRen.txt =  $.trim(txt);
			
				//빈 내용 검색시 효과 x
				var t1 = gRen.txt; 
				var t2 = gRen.blank_check(t1);
				if(t2==0){
					return;
				}
				
				gRen.search_start = 0;
				gRen.isloading_complete = false;
				
				gRen.check_2="search";
					
				$("#rental_dis").html("");
	    		
				//gRen.infiniteScroll();
				gRen.search_dis(txt,"init");
			}
		});		
		
		
		
// ------------------------------------------------------------------------------------		
		
//		<작품>
		
		//검색클릭
		$('#art_search #sekbun').on('click',function(e){
			
			var txt = $('#art_search #list_search_txt').val();
			gRen.txt =  $.trim(txt);
			
			//빈 내용 검색시 효과 x
			var t1 = gRen.txt; 
			gRen.blank_check(t1);
			
			gRen.search_start = 0;
			gRen.isloading_complete = false; //true일때 load_add_art에서 반복멈춤
			
			gRen.check_2="search";
			
			gRen.infiniteScroll();
			gRen.search_dis(txt,"init");
			
		});

		//엔터(Enter)
		$('#art_search #list_search_txt').on('keydown', function(e){
			var txt = $(this).val();
			
			if (e.keyCode == 13) {
				gRen.txt =  $.trim(txt);
			
				//빈 내용 검색시 효과 x
				var t1 = gRen.txt; 
				var t2 = gRen.blank_check(t1);
				if(t2==0){
					return;
				}
				
				gRen.search_start = 0;
				gRen.isloading_complete = false;
				
				gRen.check_2="search";
					
				gRen.infiniteScroll();
				gRen.search_dis(txt,"init");
			}
		});
	
		//이전으로 (작품버튼 누른거랑 동일한 효과를 주면된다.)
		//작가
		$("#artist_search #refresh_1").on('click',function(e){
			
			gRen.tab = "artist";
			
			//검색창 초기화
    		$('#artist_search #list_search_txt').val("");
    		
    		$("#rental_dis").html("");
    		
    		$("#rental_dis").show();
    		$("#art_list_div").hide();
    		
    		$(this).addClass("on");
			gRen.isloading_complete = false;
			gRen.start = 0;
    		
    		gRen.check_2 = "main";
			//x버튼 숨기기
			$("#artist_search #refresh_1").hide();    		
    		gRen.load_art_list(0, "init");
			
		});

		//작품
		$("#art_search #refresh_1").on('click',function(e){
			
    		gRen.tab = "art";
    		
    		$("#gallery_columns").html("");
    		
    		$("#rental_dis").hide();
    		$("#art_list_div").show();
    		
        	// -------------------------------------------------	
        	
//    		$(".scrollmagic-ret a").each(function(inx){
//	    		$(this).removeClass("on");
//	    	});
//	    	
	    	$(this).addClass("on");
	    	
	    	gRen.isloading_complete = false;
	    	gRen.start = 0;
    		
    	   // -------------------------------------------------	
	    	gRen.check_2 = "main";
	    	
    		gRen.infiniteScroll();
    		
    		//검색창 초기화
    		$('#list_search_txt').val("");
    		$('#sel_ch').val(1);
    		gRen.sel_ch = $('#sel_ch').val();
    		//x버튼 숨기기
    		$("#art_search #refresh_1").hide();
    		
    		gRen.load_art_list(0, "init");
			
		});
		
		
		
		//작품클릭시 검색창o , vr갤러리클릭시 검색창x
		$('#rental_menu3').on('click',function(e){
			$("#art_search").hide();
			//$("#artAndvrCount").css("margin-bottom","10px");
		});
		$('#rental_menu2').on('click',function(e){
			$("#art_search").show();
			//$("#artAndvrCount").css("margin-bottom","0px");
		});
		
		//select box
		$('#sel_ch').change(function(){
			gRen.sel_ch = $('#sel_ch').val();
		})
		
		
// ------------------------------------------------------------------------------------		
		if(resolve){
			resolve("ok");
		}				
		
	},
	
	"blank_check" : function(txt){
		if(txt==""){
			return 0;
		}
	},
	
	"search_dis" : function(txt,opt){

		if(gRen.sel_ch==""){
			gRen.sel_ch="1"; //1은 제목
		}
		
		//alert("텍스트 : "+txt);
		//alert("셀렉트 : "+gRen.sel_ch);
		//alert(gRen.tab);
		
		var url = g360.root_path + "/search_rentalmng.mon?start="+gRen.search_start+"&perpage="+gRen.perpage+"&search="+gRen.txt;
		
		if (gRen.tab == "artist"){
			url += "&sel_ch="+0+"&tab=" + gRen.tab; 
		}else if (gRen.tab == "art"){
			url += "&sel_ch="+gRen.sel_ch+"&tab=" + gRen.tab;
		}
		url += "&" + new Date().getTime(); 
		
		
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				
				if (gRen.tab == "art"){				
		    		
					if (data.length == 1){
						gRen.isloading_complete = true;
					}
					
					if (opt == "init"){
					
						$("#gallery_columns").html("");
			    		
			    		$("#rental_dis").hide();
			    		$("#art_list_div").show();
			    		
			    		
						$('#gallery_columns').css('opacity', 0);
						$("#art_list_div").scrollTop(0);
						$('#gallery_columns').masonry();
					}
					
					for (var i = 1 ; i < data.length; i++){
						var data_info = data[i];
						gRen.draw_art_list2(data_info, opt);
					
					}

				}else if (gRen.tab == "artist"){							
					
					if ((data.length == 0) || (data.length < gRen.perpage)){
						gRen.isloading_complete = true;
					}						
					
					if (opt == "init"){
						
						var $wrapper = $('#rental_dis');
						
						var html = "";
						html += "<div id='rental_users' style='height:100%' class='tab1-ret tabon-ret'>";
						html += "	<div class='container' style='height:100%' id='rental_users_dis'>";
						html += "		<div id='artist_list_wrapper' style='height:100%; margin-bottom:30px' class='row pt-3'>";						
						
						html += "		</div>";
						html += "	</div>";
						html += "</div>";
						
						$wrapper.html(html);
						
					}
					
					var count = data[0].totalcount;
					$("#artist_list_count").html("총 <span style='font-weight: 600;'>"+count+"</span> 건");
					//$("#artist_list_wrapper").html("");
					
					$("#artist_search #refresh_1").show();
					
					if(count==0){
						
						var html = `<div class='img_no_result'><img src="/img/img_no_result.svg"><div class='img_no_result_txt'>죄송합니다.<br>검색하신 이미지를 찾을 수 없습니다.</div></div>`;
						//$('#artist_list_wrapper').html(`<div >이미지를 찾을 수 없습니다.</div>`);
						$('#artist_list_wrapper').html(html);
					}
					
					gRen.draw_art_list4(data, opt);
					
				}
				
				
				
				
				if (gRen.tab == "art"){

					var count = data[0].totalcount;
					$("#artAndvrCount").html("<div id='count_res'>총 <span style='font-weight: 600;'>"+count+"</span> 건</div>");
					
					if(count==0){
						var html = `<div class='img_no_result'><img src="/img/img_no_result.svg"><div class='img_no_result_txt'>죄송합니다.<br>검색하신 이미지를 찾을 수 없습니다.</div></div>`;
						$('#gallery_columns').html(html);
					}
					
					$("#art_search #refresh_1").show();
					
					// 이미지 로딩이 완료되면 화면에 표시
					$('#gallery_columns').imagesLoaded(function(){	
						$('#gallery_columns').css('opacity', 1);
					//	$('#gallery_columns').masonry();
						
					//	$("#gallery_columns").masonry('reloadItems');
						$("#gallery_columns").masonry('layout');
						
					//	gPAProjectlist.isloading_complete = true;
					//	g360.body_scroll_show();
						$('#favo_loader_patner').removeClass('first active');
					});
					
					$("#gallery_columns").masonry('reloadItems');
					
					
				}
				
			},
			error : function(e){
				
				var count = data[0].totalcount;
				if(count==0){
					alert("이미지를 찾을 수 없습니다.");
				}
			}
		});
		
		

	},
	
	"mouse_over" : function(name){
	
		/*if(name.length>7){
			console.log(name);	
			console.log($(this));
		}*/
	},
	
	"load_address_popup" : function(bun, opt){
	
		var start = bun;
		gRen.pstart = start;
		
		var url = g360.root_path + "/address_load_all.mon?start="+start+"&perpage="+gRen.pperpage;
		//var url = g360.root_path + "/address_load.mon";
		
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json, charset=utf-8",
			url : url,
			success : function(data){
				
				var list = data;
				
				
				var totalcount = list[0].totalcount;
				gRen.totalcount_popup = totalcount;
				
				if (data.length == 1){
					gRen.isloading_complete_popup = true;
				}
				if (opt == "init"){
					if (totalcount < gRen.pperpage){
						gRen.isloading_complete_popup = true;
					}
				}
				
				
				
				var html = "";
				
				for (var i = 1;  i < data.length; i++){
					var info = data[i];
				//	html += "<li>" + info.name + "(" + info.mobile + ")" + "</li>";
					var id = info._id.$oid;
					
					//개인창
						html += "<li class='inv-info' style='cursor:pointer' onclick=\"gRen.select_persondata('"+id+"','"+info.name+"','"+info.mobile+"','"+info.email+"','p')\">" 
						//+"<b onmouseover=\"gRen.mouse_over('"+info.name+"');\">"+info.name+"</b>"
						+"<b title='"+info.name+"'>"+info.name+"</b>"
						//+"<b data-tooltip-text='"+info.name+"'>"+info.name+"</b>"
						+"<ul class='inv-detail'>"
						+"<li class='inv-detail-mb'>"+info.mobile+"</li>"
						+"<li class='inv-detail-mail'>"+info.email+"</li>"
						+"</ul>"+"</li>";

					
					//html += "<li style='cursor:pointer' onclick=\"gRen.select_persondata('"+id+"','"+info.name+"','"+info.mobile+"','"+info.email+"','p')\"><b>" + info.name + "(" + info.mobile + ")" + "</b></li>";
					
					
//			 	  <li class="inv-info"><b>개인</b>
//                    <ul class="inv-detail">
//                        <li class="inv-detail-mb">010-0000-0000</li>
//                        <li class="inv-detail-mail">gallery360@gallery360.co.kr</li>
//                    </ul>
//                </li>
//
//                <li class="inv-info"><b>개인휴대폰</b>
//                    <ul class="inv-detail">
//                        <li class="inv-detail-mb">010-0000-0000</li>
//                    </ul>
//                </li>
//                <li class="inv-info"><b>개인이메일</b>
//                    <ul class="inv-detail">
//                        <li class="inv-detail-mail">gallery360@gallery360.co.kr</li>
//                    </ul>
//                </li>
					
						
						
				}				
				//debugger;
				$("#gplist").html(html);
			//	$("#gplist").css("overflow", "hidden");
				
			//	$("#gplist").html(html);	
				
			//	if (opt != "init"){
			//		$("#gplist").mCustomScrollbar("distory");
			//	}
					
					$("#inv_send_person").mCustomScrollbar({
				    	theme:"minimal-dark",
						autoExpandScrollbar: true,
						scrollButtons:{
							enable:true
						},
						mouseWheelPixels : 200, // 마우스휠 속도
						scrollInertia : 400, // 부드러운 스크롤 효과 적용
					//	mouseWheel:{ preventDefault: false },
						advanced:{
							updateOnContentResize: true
						},
						autoHideScrollbar : false,
						callbacks : {
							onTotalScroll: function(){							
								if (!gRen.isloading_complete_popup){
									var bun = parseInt(gRen.pstart) + parseInt(gRen.pperpage);
									gRen.load_address_popup(bun, "");
								}
							},
							onTotalScrollOffset: 10,
							alwaysTriggerOffsets:true
						}
				    });			
					
			//	}
				
				
				
				//---------------------
				

			},
			error : function(e){
				g360.gAlert("Info","데이터 로딩시 오류가 발생하였습니다.", "blue", "top");
			}
		})
	},
	
	
	
	"select_persondata" : function(id, name, mobile, email, type){
		var val = type + "-spl-" + name + "-spl-" + mobile + "-spl-" + email;
		
		var cnt =  $("#gslist").find("[data2="+id+"]");
		if (cnt.length > 0){
			g360.gAlert("Info","기존에 선택된 사용자입니다.", "blue", "top");
			return false;
		}
		

		//선택목록창
		var html = "<li class='personal_addsd inv-rx-info inv-rx-per' data='"+val+"' data2='"+id+"'>"
		//+"<b data-tooltip-text='"+name+"'>"+name+"</b>"
		+"<b title='"+name+"'>"+name+"</b>"
		+"<ul class='inv-rx-detail inv-rx-both'>"
			+"<li class='inv-detail-mb'>"+mobile+"</li>"
			+"<li class='inv-detail-mail'>"+email+"</li>"
		+"</ul>"
		+"<div class='inv-rx-del del-list_addsd' onClick=\"gRen.list_delete_person('"+id+"')\"><span></span><span></span></div>"
		+"</li>";
		
		//var html = "<li class='personal_addsd' data='"+val+"' data2='"+id+"'>"+name + "(" + mobile + ")" + "<span class='del-list_addsd' onClick=\"gRen.list_delete_person('"+id+"')\"> 삭제</span></li>";
		
		$("#gslist").append(html);
	},
	
	"select_groupdata" : function(gname, type){
		//<li class="gruop_addsd">Group1<span class="del-list_addsd">삭제</span></li>
		var val = type + "-spl-" + gname;
				
		var cnt =  $("#gslist").find("[data2="+gname+"]");
		if (cnt.length > 0){
			g360.gAlert("Info","기존에 선택된 그룹입니다.", "blue", "top");
			return false;
		}
		

		
		var html = "<li class='gruop_addsd inv-rx-info inv-rx-grp' data='"+val+"' data2='"+gname+"'>"
		+"<b>"+gname+"</b>"
		+"<span class='inv-grp-detail' onClick=\"gRen.list_group_focus('"+gname+"')\">그룹 보기</span>"
		+"<div class='inv-rx-del del-list_addsd' onClick=\"gRen.list_delete('"+gname+"')\"><span></span><span></span></div>" 
		+"</li>";
		
		//var html = "<li class='gruop_addsd' data='"+val+"' data2='"+gname+"'>"+gname
		//+"<span class='del-list_addsd' onClick=\"gRen.list_delete('"+gname+"')\"> 삭제</span>"
		//+"</li>";
		
		$("#gslist").append(html);
	},	
	
	//그룹보기
	"list_group_focus" : function(gname){
		
		var url = g360.root_path+ "/invitation_new_group_data.mon?gname="+gname;
		var data = null;
		var html = "";

		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url:url,
			success:function(res){
				for(var i=0; i<res.length; i++){
					data = res[i];
					
					if(data.email==""){
						data.email="&ensp;";
					}else if(data.mobile==""){
						data.mobile="&ensp;";
					}
					
					
					//수정 : onclick으로 이벤트 주면 된다.
					html += `
					<tr class='inv-cor-person' style='cursor: default;'>
						<td class='inv-tname' title='${data.name}'>${data.name}</td>
						<td class='inv-tmb'>${data.mobile}</td>
						<td class='inv-tmail'>${data.email}</td>
						<td class='inv-cor-btn'><span class='inv-correction' onClick='gRen.list_group_focus_update("${data._id.$oid}","${data.name}","${data.mobile}","${data.email}","${data.groupname}")'>수정</span></td>
					</tr>`;

				}
				
				//그룹보기 누르면 그룹수정 초기화
				$('.inv-cor-name').text("이름");
	        	$('#inv_correct_m').val("");
	        	$('#inv_correct_m_1').val("");
	        	$('#inv_correct_m_2').val("");
	        	$('#inv_correct_m_3').val("");
	        	$('#inv_correct_e').val("");
				
				$('.inv-cor-wrap-cover').show();
				$('.inv-cor-grp > tbody').html(html);
			},
			
			error: function(e){
				g360.gAlert("Info","데이터 로딩 중 오류가 발생하였습니다.", "blue", "top");
			}
		})
		
	},
	
	"list_group_focus_update" : function(id,name,mobile,email,gname){
		
		
		
		var findString = "-";
		
		if(mobile.indexOf(findString) != -1) {
			//"-" 존재
			
			$("#inv_correct_m").prop("type","hidden");
			
			$("#inv_correct_m_1").prop("type","text");
			$("#inv_correct_m_2").prop("type","text");
			$("#inv_correct_m_3").prop("type","text");
			
			$(".inv_m").show();
			
			//mobile을 "-"기준으로 잘라서 넣기
			var arr = mobile.split("-");
			
			$("#inv_correct_m_1").val(arr[0]);
			$("#inv_correct_m_2").val(arr[1]);
			$("#inv_correct_m_3").val(arr[2]);
			
			//css 변경
/*			$(".inv-cor-mb").css("width","160px");
			$(".inv-cor-mb").css("margin-right","15px");
			$(".inv-cor-mail").css("margin-right","0px");*/
			
			
		}else {
			//"-" 없음
			$("#inv_correct_m").prop("type","tel");
			
			$("#inv_correct_m_1").prop("type","hidden");
			$("#inv_correct_m_2").prop("type","hidden");
			$("#inv_correct_m_3").prop("type","hidden");
			
			$(".inv_m").hide();
			
			$('#inv_correct_m').val(mobile);
			
			//css 변경
/*			$(".inv-cor-mb").css("width","100px");
			$(".inv-cor-mb").css("margin-right","20px");
			$(".inv-cor-mail").css("margin-right","10px");*/
			
		}
		
		
		
		
		$('.inv-cor-name').text(name);
		$( '.inv-cor-name' ).attr( 'title', name );
		
		$('#inv_correct_e').val(email);
		
		$('#inv_correct_id').text(id);
		$('#inv_correct_gname').text(gname);
	},
	
	"list_group_focus_update_ok" : function(){

		// 핸드폰 정보 받아오기
		var mobile = "";
		if($("#inv_correct_m").prop("type")=="hidden"){

			mobile = $("#inv_correct_m_1").val()+"-"+$("#inv_correct_m_2").val()+"-"+$("#inv_correct_m_3").val();
			
		}else{
			
			mobile = $("#inv_correct_m").val();
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
		
		var name = $('.inv-cor-name').text();
		/*var mobile = $('#inv_correct_m').val();*/
		var email = $('#inv_correct_e').val();
		var id = $('#inv_correct_id').text();
		var groupname = $('#inv_correct_gname').text();
		
		
		//수정할 대상 선택
		if(name=="이름"){	
			g360.gAlert("Info","수정할 대상을 선택해주세요.", "blue", "top");
			return false;
		}
		
		var data = JSON.stringify({
			id : id , 
			mobile : mobile,
			email : email
		})
		
		var url = g360.root_path + "/list_group_focus_update_ok.mon";
		
		$.ajax({
			type : "POST",
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(res){
				
				if(res.result1=="F"){
					g360.gAlert("Info","이미 존재하는 전화번호 또는 이메일 입니다.", "blue", "top");
					return false;
					
				}else{
					
					if(res.result2=="OK"){
						
						g360.gAlert("Info","수정이 완료되었습니다.", "blue", "top");
						gRen.list_group_focus(groupname);
						$('.inv-cor-name').text("이름");
			        	$('#inv_correct_e').val("");
			        	
			        	
			        	//$('#inv_correct_m').val("");
			        	///여기 값 수정
						
						$("#inv_correct_m").prop("type","hidden");
						
						$("#inv_correct_m_1").prop("type","text");
						$("#inv_correct_m_2").prop("type","text");
						$("#inv_correct_m_3").prop("type","text");
						
						$(".inv_m").show();
						
						$("#inv_correct_m_1").val("");
						$("#inv_correct_m_2").val("");
						$("#inv_correct_m_3").val("");
						
						//css 변경
	/*					$(".inv-cor-mb").css("width","127px");
						$(".inv-cor-mb").css("margin-right","15px");
						$(".inv-cor-mail").css("margin-right","0px");*/
						
			        	
					}else{
						g360.gAlert("Info","오류가 발생하였습니다.(ERROR:500)", "blue", "top");
					}
				}
				
				
			},
			error : function(e){
				g360.gAlert("Info","데이터 로딩 중 오류가 발생하였습니다.", "blue", "top");
			}
			
		})
		
		
	},
	
	"list_delete_person" : function(id){
		$("#gslist").find("[data2='"+id+"']").remove();
	},
	
	
	"change_service_image" : function(key){
		//alert("key : " + key);
		
		
		
		$('#layer_image_file').off('change').on('change', function(){
			
			var options = {
				key : key,
				email: g360.UserInfo.email,
				imgId:'rental_servie_img',
				width:300,
				height:150,
				resultSize:{width:600},
				onUploadStart: function(data){
					gRen.timeout_id = setTimeout(function(){g360.loadingbar_open('파일을 업로드중 입니다...');}, 2000);
				},
				onUploadComplete: function(res){
					if (res.result == 'ERROR') {
						alert('업로드중 오류가 발생했습니다.');
					} else {
						gRen.changeImage(options.imgId, res.url, key);
					}
					clearTimeout(gRen.timeout_id);
					g360.loadingbar_close();
				}
			}
			gRen.readFileImage(this, options);
			
		});
		$('#layer_image_file').click();
		
	},
	
	"delete_rental_service" : function(key){
		g360.gConfirm('대관 서비스를 삭제 하시겠습니까?', function(){
			var dockey = key.replace(/@/gi,"_").replace(/\./gi,"_");
			var url = g360.root_path + "/delete_rental_service.mon?key=" + key;
			$.ajax({
				type : "GET",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(res){
					if (res.result == "OK"){
						
						$("#ridf1").html(res.count+"개관");
						$("#ridf2").html(g360.UserInfo.rental_vr+"개관");					
												
						/*$("#rental_xtaotal").html("(" + res.count + "/" + g360.UserInfo.rental_vr + ")");*/
						
						var currentSlide = $('.slick').slick('slickCurrentSlide');
						$('.slick').slick('slickRemove', gRen.selected_slick_index);
						$('.slick').slick("refresh");
						
					//	gRen.load_rental_service_ing();
						$("#rental_fnc_layer").hide();
						
						
					}
				},
				error : function(e){
					g360.error_alert();
				}
			})
		});
		
		
	},
	
	
	"open_homepage_main" : function(key, opt){
		var url = g360.root_path + "/open_homepage_main.mon?key=" + key + "&opt=" + opt;
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(res){
				if (res.result == "OK"){
					
					var obj = $("#img_" + gRen.selected_vrkey.replace(/@/gi,"_").replace(/\./gi,"_"));
					console.log(obj);
					if (obj.attr("data") == "T"){
						obj.attr("data","F");
					}else{
						obj.attr("data", "T");
					}
					
					
				//	gRen.load_rental_service_ing();
					$("#rental_fnc_layer").hide();
				}
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"report_show" : function(){
		var key = gRen.selected_short_url;
		
		$("#rental_fnc_layer").hide();
		var url = g360.root_path + "/Report/r.jsp?ty="+key;
		window.open(url, null);
	},
	
	
	
	
	
	
	
	
	
	
	
	
	"changeImage" : function(img_id, url, key){

		
		key = key.replace(/@/gi,"_").replace(/\./gi,"_");
		url = url + "?open&v=" + new Date().getTime();
		$("#img_"+key).attr("src",url);
		$("#img_"+key).css('background', 'url(' + url + ')');

		

	},
	
	
	// 이미지 Coppie 관련 작업
	"readFileImage":function(input, opt){
		
		var _self = this;
		var rawImg;
		var $crop = $('#image_edit_body');
		
		var def_opt = {
			width:200,
			height:200,
			wrapper_width: 300,
			wrapper_height: 300,
			type: 'square',
			email: g360.UserInfo.email,
			uploadWaiting: false,
			resultType: 'blob'
		};
		
		opt = $.extend({}, def_opt, opt);
		
		$crop.width(opt.wrapper_width);
		$crop.height(opt.wrapper_height + 30);
		$crop.css({
			'margin-left':'auto',
			'margin-right':'auto',
			'padding-bottom':'30px'
		});
		
		function initCroppie(){
			// cropiie Setting
			$crop.croppie('destroy');
			$crop.croppie({
				viewport: {
			        width: opt.width,
			        height: opt.height,
			        type: opt.type
			    },
			    enforceBoundary: true,
			    enableOrientation: true,
			    enableExif: true
			});
			
			// 이미지 회전 처리
			var btn_rotate = $('<button class="btn-rotate"></button>');
			btn_rotate.on('click', function(){
				$crop.croppie('rotate', '-90');
			});
			$crop.find('.cr-slider-wrap').append(btn_rotate);
			
			$crop.find('.cr-boundary').css('opacity', 0);
			
			//Modal 창 뜰 때 event
			$('#layer_image_edit').off('shown.bs.modal').on('shown.bs.modal', function() {
				var mz = g360.maxZindex();
				$('.modal-backdrop').css('z-index', mz+1);
				$('#layer_image_edit').css('z-index', mz+2);

				$crop.croppie('bind', {
			        url: rawImg
			    }).then(function() {
			    	$crop.find('.cr-boundary').css('opacity', 1);
			    });
			});
			
			// 취소 처리
			$('#layer_image_edit').off('hide.bs.modal').on('hide.bs.modal', function() {
				input.value = '';
			});
			
			// 등록 처리
			$('#image_edit_ok').off('click').on('click', function(){
				// 세션 체크 (TODO)				
							
				// 업로드 시작시 callback
				if (opt.onUploadStart) opt.onUploadStart();
				
				$('#image_edit_body').croppie('result', {
					type: opt.resultType, //'blob' or 'base64',
					size: opt.resultSize ? opt.resultSize : 'viewport', //viewport | original | {width, height}
					circle:opt.type == 'circle',
					format:'jpeg' //jpeg | png
					
				}).then(function(data){
					// TODO (TEST)
					/*
					var image = new Image();
				    image.src = data;

				    var w = window.open("");
				    w.document.write(image.outerHTML);
				    */
					if (opt.uploadWaiting == true) {
						if (opt.onUploadComplete) opt.onUploadComplete(data);
						$('#layer_image_edit').modal('hide');
					} else {						
						var upload_promise = gRen.photoUpload(data, opt.imgId, opt.email, opt.key);
						upload_promise.always(function(res){
							if (opt.onUploadComplete) opt.onUploadComplete(res);
							$('#layer_image_edit').modal('hide');
						});
					}
				});
			});
			

			if (input.files && input.files[0]) {
		        var reader = new FileReader();
		        reader.onload = function(e) {
		            $('#image_edit_body').addClass('ready');
		            $('#layer_image_edit').modal('show');
		            rawImg = e.target.result;
		        }
		        reader.readAsDataURL(input.files[0]);
		    } 
			
			
			$("#image_edit_body .cr-vp-square").css("height", "200px");
		}
		
		
		initCroppie();
	},
	
	
	"photoUpload" : function(upload_data, img_id, target_email, key){
		
		var _self = this;
		
		var fd = new FormData();
		fd.append('ImageId', key);
		fd.append('ImageBody', upload_data); //업로드를 젤 최종적으로 처리
		var res = $.ajax({
			type :'POST',
			url	:'/Photo64_rental_service.gu?key='+target_email,
			data :fd,
			dataType:'json',
			processData : false,
		    contentType : false,
		}).then(function success(data){
			// {result:"OK", url : "업로드된 URL"}
			
			return data;
		}, function fail(data){
			return {result:'ERROR'};
		});
		
		return res;
	},
	
	
	
	
	
	
	
	
	"load_rental_service_ing" : function(){
		
		//console.log(g360.UserInfo.email);
		
		var data = JSON.stringify({
			email : g360.UserInfo.email
		});
		
		$.ajax({
			type : "POST",
			dataType : "json",
			data : data,
			contentType : "application/json; charset=utf-8",
			//url : g360.root_path + "/rental_xexpired.mon",
			url : g360.root_path + "rental_xuser_search_query.mon",
			success : function(res){
				//서비스 종료일
				$("#ridf3").text(res.rental_expire_date);
			},
			error : function(e){
				alert("에러발생");
			}
		});
		
		var url = g360.root_path + "/load_rental_info_ing.mon";
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(res){
				
				var isAdmin = g360.UserInfo.role;
				if (isAdmin == "admin"){
					$("#rental_Address").show();
		    		$("#send_kko").show();
				}else{
					var level = g360.UserInfo.rental_level;
			    	if (level == "" || level == "Basic"){
			    		$("#send_kko").hide();
			    		$("#rental_Address").hide();
			    	}else{
			    		$("#rental_Address").show();
			    		$("#send_kko").show();
			    	}
				}
				
									
				var list = res;
				var totalcnt = res[0].totalcount;
				var ucount = 0 ;
				if (typeof(totalcnt) == "undefined"){
					totalcnt = 0;
				}
				
				if (typeof(g360.UserInfo.rental_vr) == "undefined"){
					ucount = 0;
				}else{
					ucount = g360.UserInfo.rental_vr;
				}
			
				$("#ridf1").html(totalcnt+"개관");
				$("#ridf2").html(ucount+"개관");
				
				/*$("#rental_xtaotal").html("(" + totalcnt + "/" + ucount + ")");*/
				
		//		totalcnt = 10;
				
				var html = "";
				for (var i = 1; i <= totalcnt; i++){
					var info = res[i];
					var title = info.title;
					var id = info.dockey.replace(/@/gi,"_").replace(/\./gi,"_");
					var short_url = info.short_url;
					
					var host = "";
					if ( (typeof(info.info) != "undefined") && (info.info.host != "")){
						host = info.info.host;
					}else{
						host = info.nickname;
					}
					
					var is_open_homepage = "";
					
					if ((typeof(info.open_homepage) != "undefined") && (info.open_homepage == "T")){
						is_open_homepage = "T";
					}else{
						is_open_homepage = "F";
					}
					
					var image_url = "";
					
					if ( (typeof(info.service_image) != "undefined") && (info.service_image != "")){
						image_url = info.service_image;
					}else{
						var filekey = null;
						
						if (info.imagelist[0].filekey) {
							filekey = info.imagelist[0].filekey;
						} else {
							// 커스텀 VR 사용자인 경우 첫번째 작품 filekey를 가져온다						
							$.each(info.imagelist, function(){
								if (filekey) return false;
								$.each(this, function(){
									if (filekey) return false;
									$.each(this, function(){
										filekey = this.filekey;
										return false;
									});
								});
							});
						}
						
						//var folder = filekey.split("_")[0];
						var folder = filekey.substring(0, filekey.lastIndexOf("_"));
						//https://www.gallery360.co.kr/artimage/kmsdaisy@naver.com/art/preview/kmsdaisy@naver.com_bd35d0924bd6bd049325a730921642ab.5580527.jpg?open&ver=1582102246513
						image_url = "/artimage/" + folder + "/art/preview/" + filekey + ".jpg";
					}
					
					image_url = image_url + "?open&ver=" + new Date().getTime();
					html += "<li>";
					html += "<div class='show-list-area-ret'>";
					html += "	<div id='img_"+id+"' class='rental-list-img' data='"+is_open_homepage+"' data2='"+short_url+"' src='"+image_url+"' style='width:384px; height:242px; background:url(" + image_url + ");background-size:cover;background-position:center;'></div>";
					html += "	<div class='info-show-area-ret'>";
					html += "		<div class='title-area-ret'>";
					html += "			<h2 title='"+title+"'>"+title+"</h2>";
					html += "			<p>주최: "+host+"</p>";
					html += "		</div>";
					html += "		<div class='button-area-ret' data='"+info.dockey+"' data2='"+short_url+"'>";
					html += "			<span class='share-button-ret'>공유</span>";
					html += "			<span class='revision-button-ret'>수정</span> ";
					html += "		</div>";
					html += "	 </div>";
					html += "</div>";
					html += " </li>";
					

				}				
				
				
			//	$(".slick").slick("unslick");
			//	$(".slick").unslick();
										
			//	$(".slick").slick("slickRemove");
				
			//	$("#rental_ing_list").html("");
				$("#rental_ing_list").html(html);
				
			//	if (totalcnt > 3){
					gRen.setting_slick();
			//	}
				
				
				$(".share-button-ret").on("click", function(){
			    	
			    	gRen.selected_short_url = $(this).parent().attr("data2");
			    	gRen.selected_title = $(this).parent().parent().find("h2").html();
			    	gRen.selected_img = $(this).parent().parent().parent().find(".rental-list-img").attr("src");
			    	
			    	var isAdmin = g360.UserInfo.role;
			    	if (isAdmin == "admin"){
			    		$("#rental_Address").show();
			    		$("#send_kko").show();
			    	}else{
			    		var level = g360.UserInfo.rental_level;
				    	if (level == "" || level == "Basic"){
				    		$("#send_kko").hide();
				    		$("#rental_Address").hide();
				    	}else{
				    		$("#rental_Address").show();
				    		$("#send_kko").show();
				    	}
			    	}
			    	
			    	
			    	//etc_rental.jsp > id="rental_share_layer"
			    	$('#rental_share_layer').show().position({
			    		my: 'right top',
			    		at: 'right bottom+2',
			    		of: this
			    	});
			    	return false;
			    });
				
				
				
				$(".revision-button-ret").on("click", function(){		 					
					
					var isAdmin = g360.UserInfo.role;
					if (isAdmin == "admin"){
						$("#r5").show();
					}else{
						var level = g360.UserInfo.rental_level;
						if (level == "Premium" || level == "Enterprise" || level == "Option"){
							$("#r5").show();
						}else{
							$("#r5").hide();
						}
					}						
					
					gRen.selected_vrkey = $(this).parent().attr("data");
					gRen.selected_short_url = $(this).parent().attr("data2");
					
					gRen.selected_slick_index = $(this).parent().parent().parent().parent().attr("data-slick-index");
					
					var key = gRen.selected_vrkey.replace(/@/gi,"_").replace(/\./gi,"_");
					var is_open = $("#img_"+key).attr("data");					
					
					if (is_open == "F"){					
						$("#r1").show();
						$("#r1_1").hide();
					}else{
						$("#r1").hide();
						$("#r1_1").show();
					}							
					
					$('#rental_fnc_layer').show().position({
						my: 'right top',
						at: 'right bottom+2',
						of: this
					});
					return false;
				});			

				
				
				$(".show-list-area-ret .rental-list-img").on("click", function(){
					var key = $(this).attr("data2");
					gRen.navBtnAction("openrental", key);
					
				});
				
				
			},
			error : function(e){
				g360.gAlert("Info","데이터 로딩 중 오류가 발생하였습니다.", "blue", "top");
			}
		});
	},
	
	
	
	"setting_slick" : function(){
		//$(".slick").slick('destory');
		
	//	$(".slick").unslick();
		
	//	debugger;
	//	$(".slick").slick("slickRemove", null, null, true);
		
	//	$(".slick").slick({ settings: "unslick"});
		$(".slick").slick({
	        autoplay:false,
	        dots: false,
	        infinite: true,
	        speed: 1500,
	        slidesToShow: 3,
	        slidesToScroll: 3,

	      });
		
		
		
	///	$(".slick").slick("reinit");
	    
	    $('.left_click-ret').click(function(){
	        $('.list-slider_rental').slick('slickPrev');
	    });

	    $('.right_click-ret').click(function(){
	        $('.list-slider_rental').slick('slickNext');
	    });
	},
	
	
	
	
	"share_menu" : function(opt){
		
		//var _self = this;
		
		$('#rental_share_layer .btn_share_close_sh').click();
		
		
		
		var url = "https://www.gallery360.co.kr/v/" + gRen.selected_short_url;
		
		var url_default_ks = "https://story.kakao.com/share?url="; 
		var url_default_fb = "https://www.facebook.com/sharer/sharer.php?u="; 
		var url_default_tw_txt = "https://twitter.com/intent/tweet?text="; 
		var url_default_tw_url = "&url="; 
		var url_default_band = "http://band.us/plugin/share?body="; 
		var url_route_band = "&route="; 
		var url_default_naver = "http://share.naver.com/web/shareView.nhn?url="; 
		var title_default_naver = "&title="; 
		var url_this_page = url; 
		var title_this_page = gRen.selected_title; 

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
			//gCurie.shareKakao(gCurie.share_id, gCurie.share_key);
			gRen.shareKakao(url);
			return false;
		}else if (opt == "link"){
			gRen.copyToClipboard(url);
			g360.gAlert("Info","클립보드에 URL이 복사되었습니다. Ctrl+V로 붙여넣기 하세요", "blue", "top");
			return false;
		}else if (opt == "send_kakao"){
/*			
			$("#select_send_kakao_layer").show();
			g360.body_scroll_hide();
			
			
	        //주최자, 전시회명   		
			var short_url = gRen.selected_short_url;
			var data = JSON.stringify({
				short_url : short_url
			});
			
			$.ajax({
				type: "POST",
				data: data,
				dataType: "JSON",
				contentType: "application/json; charset=utf-8",
				url: g360.root_path + "/host_n_displayName.mon",
				success: function(data){
					
					$('.inv-ex-host').text(data.host);
					$('.inv-ex-title').text(g360.textToHtml(data.title));
				},
				error: function(e){
					g360.gAlert("Info","그룹 데이터 로딩시 오류가 발생하였습니다.", "blue", "top");
				}
				
			})
			
			//테스트 발송 횟수
			
			
			
			//그룹정보를 불러와서 추가한다. (현재 주석처리 해놓음)
			var url = g360.root_path + "/address_groupname_load.mon";
			$.ajax({
				type : "GET",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(data){
				//	debugger;
					
					$("#gglist").children("li").remove();
					
					data.sort(gRen.dynamicSort("gn"));
					
					var html = "";
					
					for (var i = 0; i < data.length; i++){
						var name = data[i];
					//	html += "<span style='cursor:pointer' onclick=\"gRT_Address.load_groupdata('"+name.gn+"',1)\">" + name.gn + "</span>";
						html += "<li style='cursor:pointer' onclick=\"gRen.select_groupdata('"+name.gn+"','g')\"><b>" + name.gn + "</b></li>";
					}
					
					$("#gglist").append(html);
					
				//	$("#glist_popup").mCustomScrollbar("distory");
					$("#glist_popup").mCustomScrollbar({
				    	theme:"dark",
						autoExpandScrollbar: true,
						scrollButtons:{
							enable:true
						},
						mouseWheelPixels : 200, // 마우스휠 속도
						scrollInertia : 400, // 부드러운 스크롤 효과 적용
					//	mouseWheel:{ preventDefault: false },
						advanced:{
							updateOnContentResize: true
						},
						autoHideScrollbar : false
				    });
					
				//	$("#slist_popup").mCustomScrollbar("distory");
					$("#slist_popup").mCustomScrollbar({
				    	theme:"dark",
						autoExpandScrollbar: true,
						scrollButtons:{
							enable:true
						},
						mouseWheelPixels : 200, // 마우스휠 속도
						scrollInertia : 400, // 부드러운 스크롤 효과 적용
					//	mouseWheel:{ preventDefault: false },
						advanced:{
							updateOnContentResize: true
						},
						autoHideScrollbar : false
				    });
					
					
					
				}, 
				error : function(e){
					g360.gAlert("Info","그룹 데이터 로딩시 오류가 발생하였습니다.", "blue", "top");
				}
			})
			
			
			//발송횟수
			gRen.remaining_number();
			
			return false;
			
			*/
		}

		window.open(callurl, '', 'scrollbars=no, width=600, height=600'); return false;
			
	},
	
	"remaining_number" : function(){
		
		$("#user_r_count").text(g360.UserInfo.rental_count);
		
		var url = g360.root_path+"/remaining_number.mon";
		
		$.ajax({
			type : "GET",
			url : url,
			dataType: "json",
			contentType :  "application/json; charset=utf-8",
			success : function(data){
				$(".remaining_number").text(data.result);
			},
			error: function(e){
				g360.gAlert("Info","초대장 남은횟수를 불러오지 못하였습니다.", "blue", "top");
			}

		})
		
	},
	
	"list_delete" : function(gname){
		
		$("#gslist").find("[data2='"+gname+"']").remove();
	},
	
	"dynamicSort" : function(property) {
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
	},


	
	
	"copyToClipboard" : function(val){
		 var t = document.createElement("textarea");
		  document.body.appendChild(t);
		  t.value = val;
		  t.select();
		  document.execCommand('copy');
		  document.body.removeChild(t);
	},
	

	"shareKakao" : function(url){

	//	var email = dockey.split("_")[0];
	//	var inx = dockey.lastIndexOf("_");
	//	var email = dockey.substring(0,inx);

//		var uuu = "https://www.gallery360.co.kr/artimage/"+email+"/artRequest_AI/result/"+dockey+"_out_water_small.png"		
//		var uu = "https://www.gallery360.co.kr/sharesns.mon?key="+key;
		
		var uuu = "https://www.gallery360.co.kr" + gRen.selected_img;
		var uu = url;
		
		Kakao.Link.sendDefault({
		  objectType: 'feed',
		  content: {
			title: gRen.selected_title,
			description: '',
			imageUrl: uuu,
			link: {
			  webUrl: uu,
			  mobileWebUrl: uu
			}
		  },
		  buttons: [
			{
			  title: '전시회 입장',
			  link: {
				mobileWebUrl: uu,
				webUrl: uu
			  }
			}  
		  ]
		});
	},
	
	

	"myFunction" : function(){
		document.getElementById("myDropdown").classList.toggle("show");
	},
	
	
	"select_vr_for_rental" : function(){
		
		var isAdmin = g360.UserInfo.role;
		if (isAdmin == "admin"){
			
		}else{
//			var vr_avaliable_count = g360.UserInfo.rental_vr;
//			var cur_count = g360.UserInfo.rental_use_count;
//			
//			if (vr_avaliable_count <= cur_count){			
//				g360.gAlert("Info","등록 가능한 대관수("+vr_avaliable_count+")가 초과하였습니다.<br>'게정설정 >> 서비스 결재 메뉴'에서 요금제를 업그레이드 하시기 바랍니다.", "blue", "top");
//				return false;
//			}
		}
		
		
		
		var url = g360.root_path + "/load_vr_before_rental.mon";
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				
				
				var html = "";
				
				html += "<div class='warpper_tp-vr'>";
				html += "<div class='dim_tp-vr' style='background-color:#2f2f2f'></div>";
				html += "<div class='contaier_tp-vr' >";
				html += "	 <div class='list-wrap_tp-vr' id='xpy' style='height:800px; width:90%; '>";
				html += "		 <ul style='height:800px ; overflow :hidden; text-align:left' id='xxpx'>";		
				
				var image_url = "";
				for (var i = 0 ; i < data.length; i++){
					var info = data[i];
				
					html += "			 <li class='select-tp-vr' data='"+info.dockey+"' data2='"+info.short_url+"'>";
					html += "				<div class='title-area_tp-vr' style='width:296px'>";
					
					
				//	if ( (typeof(info.service_image) != "undefined") && (info.service_image != "")){
				//		image_url = info.service_image;
				//	}else{
				//		if (typeof(info.imagelist[0]) != "undefined"){
				//			var filekey = info.imagelist[0].filekey;
				//			var folder = filekey.split("_")[0];
				//			image_url = "/artimage/" + folder + "/art/preview/" + filekey + ".jpg?open?ver=" + new Date().getTime();
				//		}

				//	}
						
					
					image_url = "/vrgallery/" + info.email + "/" +  info.dockey + "/pano_f.jpg?t=" + new Date().getTime();
					
					///vrgallery/aa1231@daum.net/aa1231@daum.net_20200711170250_CDUE8KL/pano_f.jpg?t=1594456857488
									
					
					html += "					<img  src='"+image_url+"' style='min-height:290px; min-width:296px'>";
					html += "					<div class='title-bg'>";
					html += "					 	<p>"+info.title+"</p>";
					html += "					</div>";
					html += "			</li>";
					
				}

					
				
				html += "		</ul>";
				html += "	</div>";
				html += "</div>";
				html += "</div>";
				html += "";
				html += "";
				html += "";
				html += "";
				
				
		        $("#vr_show_rental").html(html);       
		        
		        
		        $(".select-tp-vr").on("click", function(){
		        	
		        	$(".select-tp-vr").removeClass("on");
		        	
		        	$(this).addClass("on");
		        	
		        	var dockey = $(this).attr("data");
		        	gRen.rental_key = $(this).attr("data");
		        	gRen.rental_short_url = $(this).attr("data2");
		        	gRen.input_rental_info();
		        });
		        
		        
		        $("#xxpx").mCustomScrollbar({
			    	theme:"light",
					autoExpandScrollbar: true,
					scrollButtons:{
						enable:true
					},
					mouseWheelPixels : 200, // 마우스휠 속도
					scrollInertia : 400, // 부드러운 스크롤 효과 적용
				//	mouseWheel:{ preventDefault: false },
					advanced:{
						updateOnContentResize: true
					},
					autoHideScrollbar : false
			    });
		        
		        
		 
		    		
				g360.body_scroll_hide();
				g360.scroll_Top();
				
//		    		try{
//		    			gVrGallery.scrollTop = $(document).scrollTop();
//		    		}catch(e){}			
				
				//var url = g360.root_path + "/main/vr_gallery/gallery360_popup.jsp?key=" + key;

				//g360.LoadPage("vr_show_rental", url);    //index.jsp파일에 레이어가 존재해서 어디서도 같이 사용 할 수 있다.
				
				var inx = g360.maxZindex();
				
				$("#select_vr_layer").css("z-index", parseInt(inx) + 1);
				
				var bar = "<span style='width:6px; height:23px; background-color:#6f43d5; display: inline-block; margin-right:13px; position:relative; top:3px'></span>";
				
				$("#vrgallery_popup_title_rental").html(bar + "대관할 VR갤러리 선택 - <span>STEP1</span>");
				$("#select_vr_layer").show();
				$("#select_vr_layer").fadeIn();
			}, 
			error : function(e){
				g360.error_alert();
			}
		});
		
		
    		
    	
	},
	


	
	
	"input_rental_info" : function(){
		var bar = "<span style='width:6px; height:23px; background-color:#6f43d5; display: inline-block; margin-right:13px; position:relative; top:3px'></span>";
		
		$("#vrgallery_popup_title_rental2").html(bar + "전시 주최자 정보 입력 - <span>STEP2</span>");
		
		//대관 타입 설정
		$('input:radio[name="rental_type_setting"]:radio[value="' + g360.UserInfo.type + '"]').prop('checked', true);
		
		//투표 기능
		$('input:radio[name="vote"]:radio[value="F"]').prop('checked', true);
		$(".vote_detail").css("visibility","hidden");
		//보안 코드
		$('input:radio[name="secret_code"]:radio[value="F"]').prop('checked', true);
		$(".secret_code_detail").css("visibility","hidden");
		
		$("#select_vr_layer2").show();
		
		$("#select_vr_layer").hide();
		
		
		
		$('input:radio[name="vote"]').on('change', function(){
			if($('input:radio[name="vote"]:checked').val()=="T"){
				$(".vote_detail").css("visibility","visible");
			}else{
				$(".vote_detail").css("visibility","hidden");
			}
		});
		
		$('input:radio[name="secret_code"]').on('change', function(){
			if($('input:radio[name="secret_code"]:checked').val()=="T"){
				$(".secret_code_detail").css("visibility","visible");
			}else{
				$(".secret_code_detail").css("visibility","hidden");
			}
		});
		
	},
	
	
	"input_rental_info222" : function(){

		$("#vrgallery_popup_title_rental3").html("배경이미지 선택");
		
		
		$("#select_vr_layer3").show();
		
		$("#select_vr_layer").hide();
		
	},
	
	"dbook_upload_check" : function(){
		var _self = this;
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var num = /[^\d\-]/;
			
		if ($("#host").val() == ""){
			g360.gAlert("Info","주최자 및 단체명 정보는 반드시 입력하셔야합니다.", "blue", "top");
			$("#host").focus();
			return false;
		}
		
		if ($("#tel").val() == ""){
			g360.gAlert("Info","대표번호 정보는 반드시 입력하셔야합니다.", "blue", "top");
			$("#tel").focus();
			return false;
			
		}else if(num.test($("#tel").val())){
			g360.gAlert("Info","대표번호를 올바르게 입력해 주세요.", "blue", "top");
			$("#tel").focus();
			return false;
		}
		
		if ($("#email").val() == ""){
			g360.gAlert("Info","이메일 정보는 반드시 입력하셔야합니다.", "blue", "top");
			$("#email").focus();
			return false;
			
		}else if(!re.test($("#email").val())){
			g360.gAlert("Info","올바른 이메일 주소를 입력하세요.", "blue", "top");
			$("#email").focus();
			return false;
		}
		
		if($('input:radio[name="secret_code"]:checked').val()=="T"){
			var v = $.trim($(".secret_code_input").val());
			if(v==""){
				g360.gAlert("Info","보안코드를 입력해주세요.", "blue", "top");
				$(".secret_code_input").focus();
				return false;
			} 
		}
		///////////////////////////////////////////////////////////////////////////////////////////////
		
		
		// DBook 업로드 안한 경우
		if (!$('#reg_dbook_upload_file').get(0).files || !$('#reg_dbook_upload_file').get(0).files[0]) {
			_self.save_info();
			return;
		}
		
		//PDF 파일 선택한 경우 업로드
		if (_self.upload_status == 'ing') {
			return;
		}
		
		_self.upload_status = 'ing';
		var file = $('#reg_dbook_upload_file').get(0).files[0];
		var fd = new FormData();		
		fd.append('key', gRen.rental_key);
		fd.append('file', file, file.name);
		
		$.ajax({
			type: 'POST',
			data: fd,
			url: '/FileUpload_Rental_PDF.gu',
			contentType : false,
			processData: false,
			beforeSend: function(){
				g360.loadingbar_open('D-Book 업로드 중 (0%)');
			},
			xhr: function() {
				var xhr = $.ajaxSettings.xhr();
				xhr.upload.onprogress = function(e) { // 진행상황 표시
					var percent = Math.floor(e.loaded * 100 / e.total);
					var text_info = '';
					$('#reg_dbook_upload_progress').css('width', percent + '%');
					
					if (percent == 100) {
						text_info = 'D-Book 생성 중 ...';
					} else {
						text_info = 'D-Book 업로드 중 (' + percent + '%)';
					}
					g360.loadingbar_open(text_info);
				};
				return xhr;
			},
			success: function(data) {
				return data;
			},
			error: function(data){
				return data;
			}
		}).then(
			function(data){
				var res = JSON.parse(data);
				if (res.result == 'OK') {
					res.ori_filename = file.name;
					res.version = (new Date()).getTime();
					_self.save_info(res);
				} else {
					alert('D-Book 생성 중 오류가 발생했습니다.');
					$('#reg_dbook_upload_progress').css('width', '0');
					g360.loadingbar_close();
				}
				_self.upload_status = '';
			},
			function(data){
				_self.upload_status = '';
				alert('PDF 업로드 중 오류가 발생했습니다.');
				$('#reg_dbook_upload_progress').css('width', '0');
				g360.loadingbar_close();
			}
		);

	},
	
	"save_info" : function(dbook_info){
		
		// 값이 없으면 ""
		var date1 = $("#date1").val(); 
		var date2 = $("#date2").val();
		
		var sec_use = $('input:radio[name="secret_code"]:checked').val();
		var sec = "";
		
		if(sec_use=="T"){
			sec = $.trim($(".secret_code_input").val());
		}
		
		var vote_use = $('input:radio[name="vote"]:checked').val();
		var vote_count = "";
		
		if(vote_use=="T"){
			vote_count = $(".vote_detail select").val();
		}
		
		var json_data = {
				vr_key 			: gRen.rental_key,
				host 			: $("#host").val(),
				tel 			: $("#tel").val(),
				email 			: $("#email").val(),
				
				start_date		: date1,
				end_date		: date2,
				
				facebook 		: $("#facebook").val(),
				twitter 		: $("#twitter").val(),
				blog 			: $("#blog").val(),
				instagram 		: $("#instagram").val(),
				youtube 		: $("#youtube").val(),
				group_code 		: $("#reg_group_code").val(),
				group_title 	: $("#reg_group_title").val(),
				group_content 	: $("#reg_group_content").val(),

				sec_use			: sec_use,
				sec				: sec,
				vote_use		: vote_use,
				vote_count		: vote_count,
				
				//sec			: $("#reg_sec_code").val(),

				open_homepage 	: $('input:radio[name="homepage_public"]:checked').val(),
				marketing_agreement : $('input:radio[name="marketing_agreement"]:checked').val(),
				rental_type		: $('input:radio[name="rental_type_setting"]:checked').val(),
				type 			: "add"
			}
		
		
		if (dbook_info) {
			json_data.dbook_page_count = dbook_info.count;
			json_data.dbook_filename = dbook_info.filename;
			json_data.dbook_ori_filename = dbook_info.ori_filename;
			json_data.dbook_version = dbook_info.version;
			
		}
		
		var data = JSON.stringify(json_data);
		
		var url = g360.root_path + "/update_rental_info.mon";
		
		$.ajax({
			type : "POST",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			data : data,
			url : url,
			beforeSend: function(){
				g360.loadingbar_open('대관 생성 중 ...');
			},
			success : function(res){
				if (res.result == "OK"){			
					
					g360.UserInfo.rental_use_count = g360.UserInfo.rental_use_count + 1;
				//	gRen.load_rental_service_ing();
					
					$("#btn_rental").click();
					
					$("#host").val("");
					$("#tel").val("");
					$("#email").val("");
					
					$("#date1").val("");
					$("#date2").val("");
					
					$("#facebook").val("");
					$("#twitter").val("");
					$("#blog").val("");
					$("#instagram").val("");
					$("#youtube").val("");
					$("#reg_dbook_upload_fileinfo").val("");
					$("#reg_dbook_upload_file").val("");
					$("#reg_dbook_upload_progress").css('width', '0%');
					$('input:radio[value="T"]').prop('checked', true);
					$('input:radio[name="rental_type_setting"]:radio[value="' + g360.UserInfo.type + '"]').prop('checked', true);
					$("reg_sec_code").val("");
					
					$("#select_vr_layer2").fadeOut();
					g360.body_scroll_show();
					var url = g360.root_path + "/v/" + gRen.rental_short_url;
					window.open(url, null);
				}else{
					g360.gAlert("Info","오류가 발생하였습니다.", "blue", "top");
				}
			},
			error : function(e){
				g360.gAlert("Info","오류가 발생하였습니다.", "blue", "top");
			}
		}).always(function(){
			g360.loadingbar_close();
		});
	},
	
	
	
	
	"vr_popup_close" : function(){
		$("#select_vr_layer").hide();
		g360.body_scroll_show();
	},
	
	"vr_popup_close2" : function(){
		$("#select_vr_layer2").hide();
		$("#select_vr_layer").show();
		$(".select-tp-vr").removeClass("on");
		//g360.body_scroll_show();
	},
	
	
	"vr_popup_close3" : function(){
		$("#select_vr_layer3").hide();
		
	},
	
	"navBtnAction" : function(opt, ty){
		
		var _url = "";
	//	debugger;
		if (opt == "vr"){
			
			var isAdmin = g360.UserInfo.role;
			if (isAdmin == "admin"){
				_url = "/rental/make_vr_gallery.jsp";
				gRen.load_page(_url);
			}else{
				//debugger;
				var url = g360.root_path + "/load_VRRoom_rental_count.mon";
				$.ajax({
					type : "GET",
					dataType : "json",
					contentType : "application/json; charset=utf-8",
					url : url,
					success : function(res){
												
						var reg_vr_count = res.count;
						var rental_count = parseInt(g360.UserInfo.rental_vr);
						
						if (reg_vr_count >= rental_count){
							g360.gAlert("Info","등록할 수 있는 VR개수를 초과하셨습니다.<br>등록된 VR을 삭제하거나 서비스를 업그레이드 하셔야 합니다.", "blue", "top");
						}else{
							/*
							if (g360.UserInfo.custom == "T"){
								_url = "/rental/make_vr_gallery_custom.jsp";
								gRen.load_page(_url);
							}else{
								_url = "/rental/make_vr_gallery.jsp";
								gRen.load_page(_url);
							}
							*/
							_url = "/rental/make_vr_gallery.jsp";
							gRen.load_page(_url);
						}	

						
						return false;
					},
					error : function(e){
						g360.error_alert();
					}
				});
			}

		}else{
			if (opt == "artist"){
				_url = "/rental/regartist.jsp";
			}else if (opt == "art"){
				_url = "/rental/art_upload.jsp";
					
			}else if (opt == "dbook"){
				_url = "/rental/makeDBook.jsp";
			}else if (opt == "address"){
				_url = "/rental/address.jsp";
				
			//	$("#select_vr_layer3").show();
			//	return false;
				
			}else if (opt == "main"){
				_url = "/rental/rentalmng.jsp?rt="+ty;
			}else if (opt == "service"){
			//	alert("대관서비스 준비중");
				gRen.select_vr_for_rental();
				return false;
			}else if (opt == "openrental"){
				var url = g360.root_path + "/v/" + ty;
				window.open(url, null);
				return false;
			}else if (opt == "approval"){
				_url += '/rental/account/account.jsp?ty=approval';
				g360.LoadPage("body_content", _url);
				return false;
			}
				
			gRen.load_page(_url);
		}
		
		
		
	},
	
	"reg_vr_count" : function(){
		var url = g360.root_path + "/load_VRRoom_rental_count.mon";
		$.ajax({
			type : "GET",
			async : false,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(res){
				return res;
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"go_profile_rental" : function(email){	
		g360.LoadPage("body_content", g360.root_path + "/rental/regartist.jsp?opt="+email);
	},
	
	
	"load_page" : function(_url){
		g360.LoadPage("body_content", g360.root_path + _url);
	},
	
	
	"infiniteScroll" :function(){
		
		var _self = this;
		// 작품검색 InfiniteScroll 적용
		this.search_controller = new ScrollMagic.Controller();
		this.search_scene = new ScrollMagic.Scene({triggerElement:'#favo_loader_patner', triggerHook:'onEnter', offset:-100}).addTo(_self.search_controller);
		this.search_scene.on('enter', function(e) {
			var $grid = $('#gallery_columns');
			var $loader = $('#favo_loader_patner');
		
			//먼저 이게 둘다 false여야한다.
//			console.log($loader.hasClass('first'));
//			console.log($loader.hasClass('active'));

			//	if (gPAProjectlist.isloading_complete) return;
			if (!$loader.hasClass('first') && !$loader.hasClass('active')) {
				//console.log('main art loading scroll');
				$loader.addClass('active');
				
				gRen.load_add_art();					
			}
		});
	},
	
	
	"load_add_art" : function(){
		
		//console.log("check");
		//console.log(gRen.isloading_complete); //검색할때 true
		//console.log(gRen.start);
		//console.log(gRen.perpage);
		
		if (gRen.tab != "dbook"){
			
			if (!gRen.isloading_complete){
				
				if(gRen.check_2=="main"){
					var bun = parseInt(gRen.start) + parseInt(gRen.perpage);
					gRen.start = bun;
					gRen.load_art_list(bun, "add");		
					
				}else if(gRen.check_2=="search"){
					var bun = parseInt(gRen.search_start) + parseInt(gRen.perpage);
					gRen.search_start = bun;
					gRen.search_dis(bun, "add");	
					
				}
				
				
			}else{
				var $loader = $('#favo_loader_patner');
				$loader.removeClass('first active');
			}
			
		}
		

	},	
	
	
	"load_art_list" : function(bun, opt){
		
		// 작가쪽 검색 show / hide 기능
			if(gRen.tab == "artist"){		
				 $("#artist_list_count").show();
				 $("#artist_search").show();	
			}else if(gRen.tab=="art"||gRen.tab == "vr"||gRen.tab == "dbook"){
				 $("#artist_list_count").hide();
				 $("#artist_search").hide();	
			}
			
			$('#artist_search #sel_ch option:first').text(g360.rental_text.tab1);
			$('#art_search #sel_ch option:last').text(g360.rental_text.tab1);
			
			if(g360.rental_text.tab1=="기업정보"){
				$('#art_search #sel_ch option:first').text("제품이름");
			}
			
			//화면에 표시될 텍스트를 처리한다. /////////////////////////////////////////////////////////////
			$("#rental_menu1").text(g360.rental_text.tab1);
			$("#rental_menu2").text(g360.rental_text.tab2);
		
			$("#rental_btn_1").text(g360.rental_text.btn1);
			$("#rental_btn_2").text(g360.rental_text.btn2);
			///////////////////////////////////////////////////////////////////////////////////////
			
			var $grid = $('#gallery_columns');
			var $loader = $('#favo_loader_patner');
			//if (_self.load_search_complete) return;
			
			$loader.addClass('first active');
	//		$grid.css('opacity', 0);
			
		
			var start = bun;
			var option = gRen.tab;
			var url = "";
			
			if (gRen.tab == "art"){
				url = g360.root_path + "/load_save_image_info_option_rental.mon?start="+start+"&perpage="+gRen.perpage;
			}else if (gRen.tab == "vr"){
				url = g360.root_path + "/load_VRRoom_rental.mon?start="+start+"&perpage="+gRen.perpage;
			}else if (gRen.tab == "artist"){
				url = g360.root_path + "/artist_reg_list_rental.mon?start="+start+"&perpage="+gRen.perpage;
			}else if (gRen.tab == "dbook"){
				url = g360.root_path + "/artist_reg_list_rental.mon?start="+start+"&perpage="+gRen.perpage;
			}
			
			url += "&" + new Date().getTime(); 
					
			$.ajax({
				type : "GET",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(data){
				//	$('#gallery_columns').masonry();
				//	g360.body_scroll_hide();
					
					//console.log(data);
					//var i = data.length;

					//art & vr count
/*					var count_res = data[i-1].count_res;
					console.log("작품 총 갯수 : "+count_res); //undefined
*/					
					if (gRen.tab == "art" || gRen.tab == "vr"){				
			    		
						if (data.length == 0){
							gRen.isloading_complete = true;
						}
						
						if (opt == "init"){
							$("#gallery_columns").html("");
				    		
				    		$("#rental_dis").hide();
				    		$("#art_list_div").show();
				    		
				    		
							$('#gallery_columns').css('opacity', 0);
							$("#art_list_div").scrollTop(0);
							$('#gallery_columns').masonry();
						}
						
						for (var i = 0 ; i < data.length; i++){
							var data_info = data[i];
							
							if (gRen.tab == "art"){ //art
								gRen.draw_art_list2(data_info, opt);
								
							}else{ //vr
								gRen.draw_art_list3(data_info, opt);
								
							}
							
						}
						
						
					}else{
						if (gRen.tab == "dbook"){
							gRen.draw_art_list5(data, opt);
						}else if (gRen.tab == "artist"){							
							
							if ((data.length == 0) || (data.length < gRen.perpage)){
								gRen.isloading_complete = true;
							}						
							
							
							if (opt == "init"){
								
								var $wrapper = $('#rental_dis');
								
								var html = "";
								html += "<div id='rental_users' style='height:100%' class='tab1-ret tabon-ret'>";
								html += "	<div class='container' style='height:100%' id='rental_users_dis'>";
							//  html += "		<div id='artist_list_count' class='all_img_count'></div>";
								html += "		<div id='artist_list_wrapper' style='height:100%; margin-bottom:30px' class='row pt-3'>";						
								
								html += "		</div>";
								html += "	</div>";
								html += "</div>";
								
								$wrapper.html(html);
								
								//////////////////////
								
								url = g360.root_path + "/artAndvrCount.mon?kind=artist";
								url += "&" + new Date().getTime(); 
								
								$.ajax({
									type : "GET",
									dataType : "json",
									contentType : "application/json; charset=utf-8",
									url : url,
									data : data,
									success : function(data){
										var count = data.count;
										$("#artist_list_count").html("총 <span style='font-weight: 600;'>"+count+"</span> 건");
									},
									error : function(e){
										
									}
								});
							}
							
							gRen.draw_art_list4(data, opt);
//						}else if (gRen.tab == "vr"){
//							if ((data.length == 0) || (data.length < gRen.perpage)){
//								gRen.isloading_complete = true;
//							}		
//							
//							gRen.draw_art_list3(data, opt);					
						}
					}
					
					

				
					//페이지에 따른 나눠서 가져오는게 아닌 총 갯수가 필요 
					
					if (gRen.tab == "art" || gRen.tab == "vr"){
						var kind = "";
						
						if(gRen.tab == "art"){
							kind = "art";
						}else{
							kind = "vr";
						}
						
						url = g360.root_path + "/artAndvrCount.mon?kind="+kind;
						url += "&" + new Date().getTime(); 
						
						$.ajax({
							type : "GET",
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							url : url,
							data : data,
							success : function(data){
								var count = data.count;
								$("#artAndvrCount").html("<div id='count_res'>총 <span style='font-weight: 600;'>"+count+"</span> 건</div>");
							},
							error : function(e){
								
							}
						});
						
						
						// 이미지 로딩이 완료되면 화면에 표시
						$('#gallery_columns').imagesLoaded(function(){	

							$('#gallery_columns').css('opacity', 1);
						//	$('#gallery_columns').masonry();
							
						//	$("#gallery_columns").masonry('reloadItems');
							$("#gallery_columns").masonry('layout');
							
						//	gPAProjectlist.isloading_complete = true;
						//	g360.body_scroll_show();
							$('#favo_loader_patner').removeClass('first active');

						});
						
						$("#gallery_columns").masonry('reloadItems');
						
						
					}
					

				},
				error : function(e){
					g360.error_alert();
				}
			})
	//	}
		
	},
	
	"draw_art_list2":function(data, opt){ //art
		//debugger;
		var $wrapper = $('#gallery_columns');
		
		var html = "";
		
	//	html += "<div id='artist_ret' class='tab2-ret tabon-ret'>";
		
		
		
	//	for (var i = 0 ; i < data.length; i++){
			var img = data;
			
			var imgURL = g360.domain + "/artimage/" + img.email + "/art/preview/" + img.art_img_filename + ".jpg?open&ver="+img.version;
			var title = img.art_title;
			
			var size = ""
			
			if (img.art_hosu == null){
				var size = img.art_height + "cm x" + img.art_width +"cm";
			}else{
				var size = img.art_height + "cm x" + img.art_width +"cm (" + img.art_hosu +"호)";
			}
			
			var size_html = '';
			if (img.art_height && img.art_width) {
				size_html = '<p class="text-muted">' + size + '</p>';
			}
			
			
			var price = g360.comma(g360.setWon(img.art_price));
			var artist = img.art_artist;
			var express = size;
			var dkey = "";
			
		
    	
			
			html += "<div class='grid-item col-lg-3 col-md-4 col-sm-4 col-6 ' id='"+img.sortdate+"'>";
			html += "	<figure>";
		//	html += "		<a onclick=\"g360.showArtDetail('"+img.art_img_filename+"')\"><img src='"+imgURL+"'></a>";
			html += "		<a onclick=\"gRen.art_modify('"+img.dockey+"')\"><img src='"+imgURL+"'></a>";
			html += "			<figcaption>";
						
			html += "				<h2 class='art_title'>"+title+"</h2>  <!-- 라벨 있을때 클래스 추가 -->";
			html += "				<em><img src='/img/btn-artwork-collect-normal.svg' class='btn_artwork_collect_normal'></em>";
			html += "					<p style='margin-right: 15px;'>"+artist+"</p>";
			
			//html += "					<p class='text-muted'>"+size+"</p>";
			html +=	size_html;
			
			html += "					<div class='archive'>";
			html += "						<div class='btn-group'> <!-- 버튼 추가 -->";
			html += "							<button class='bg-transparent border-0 dropdown-toggle' id='dropdownMenu2' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
			html += "							<img src='/img/account/btn-overflow-h-normal.svg' alt='더보기' style='cursor:pointer'/>";
			html += "							</button>";
		
			html += "							<div class='dropdown-menu dropdown-menu-right' aria-labelledby='dropdownMenu2'>";//		
			
			html += "								<a class='dropdown-item' onclick=\"gRen.art_modify('"+img.dockey+"')\">";
			html += "								<img src='/img/account/icon-overflow-edit-sales-info.svg' alt=''  /> 수정</a>";
			
			html += "								<a id='"+img.sortdate+"_opt' class='dropdown-item' onclick=\"gRen.art_delete('"+img.dockey+"')\">";
			html += "								<img src='/img/account/icon-overflow-delete-art.svg' alt=''  /> 삭제</a>";					
			html += "				    		</div>";
			html += "				    	</div>";
			html += "				    </div>";
			
			
			html += "			</figcaption>";

			html += "	</figure>";
			html += "</div>";
			
			

//		}
		

//		html += "</div>";
//		$wrapper.html(html);

		$div = $(html);
		$wrapper.append($div).masonry('appended', $div);
		
	},
	
	
	"art_delete" : function(dockey){
		
		$.confirm({
			title : " ",
			//content : "정말 삭제 하시겠습니까?<br>작품 삭제 시 VR갤러리 내의 작품 정보도 삭제됩니다.<hr>",
			content : "정말 삭제 하시겠습니까?<br>작품 삭제 시 해당 작품과 연관된 VR갤러리에 문제가 발생될 수 있습니다.<hr>",
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
						var url = g360.root_path + "/art_image_remove_rental.mon?dockey="+dockey;
						url += "&" + new Date().getTime();
						$.ajax({
							type : "GET",
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							url : url,
							success : function(data){
								gRen.navBtnAction('main', 'art');
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
	
	
	
//	"draw_art_list3_backup":function(data, opt){
//		
//		var $wrapper = $('#rental_dis');
//	
//		var html = "";
//		
//		html += "<div id='rental_vr' style='height:100%' class='tab3-ret tabon-ret'>";
//		html += "	<div style='height:100%; overflow:inherit' class='container-vr-ret'>";
//		
//		
//		for (var i = 0; i < data.length; i++){
//			var data_info = data[i];
//			
//			var title = data_info.title;
//			var vr_title = g360.textToHtml(data_info.title).replace(/'/g, '\\\'').replace(/\r|\n/g, '');
//			var key = data_info.dockey;
//			var templatecode = data_info.roomkey;
//			
//			var read = data_info.read;
//			var like = data_info.like;
//			
//			var express = data_info.express;
//			var show = data_info.show;
//			
//			var img_src = "/vrgallery/"+data_info.email+"/"+key+"/pano_f.jpg?t="+new Date().getTime();
//			
//			
//			html += "<div class='vrlist-ret'>";
//			html += "	<img style='cursor:pointer' onclick=\"g360.popup_VR_rental('"+vr_title+"','"+key+"','"+templatecode+"');\" src='"+img_src+"' />";
//			html += "   <div class='vrinfo-ret'>";
//			html += "	   <h3>&lsqb;VR전시&rsqb; "+title+"</h3>";
//			html += "      <p>"+data_info.nickname+"</p>";
//			html += "      <div class='button-area-ret'>";
//			html += "			<span class='share-button-ret'>공유</span>";
//			html += "			<span class='revision-button-ret'>수정</span>";
//			html += "	   </div>";
//			html += "	</div>";
//			html += "</div>";
//			
//		}
//	
//		
//			
//
//			
//			
//	
////			html += "<div class='col-md-4 col-sm-6'>";
////			html += "	<div class='vr-item-wrap'>";
////			html += "		<div class='pic' style='cursor:pointer' onclick=\"g360.popup_VR('"+vr_title+"','"+key+"','"+templatecode+"');\">";
////			html += "			<img src='"+img_src+"' >";
////			html += "		 </div>";
////			html += "		 <div class='info'>";
////			if (show == "T"){
////				html += "			<h3>"+title+"<span>전시 중</span></h3>";
////			}else{
////				html += "			<h3>"+title+"</h3>";
////			}
////			
////			html += "			<h4>"+g360.TextToHtml(express)+"</h4>";
////			html += "    		 <div class='like-area'>";
////		//	html += "				 <span><img src='/img/icon-vr-view-count-b.svg' class='icon_vr_view-count_b'>"+read+"</span>";
////		//	html += "				 <span onclick=\"gVrGallery.add_like_count('"+key+"',this)\"><img src='/img/icon-vr-collect-count-b.svg' class='icon_vr_collect-count_b' style='cursor:pointer'  >"+like+"</span>";
////			
////			html += "				 <div class='btn-group'>";
////			html += "					<button class='bg-transparent border-0 dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
////			html += "					<img style='cursor:pointer' src='/img/account/btn-overflow-h-normal.svg' />";
////			html += "					</button>";
////			html += "						<div class='dropdown-menu'>";
////			
//////			if (show == "T"){
//////				html += "						<a class='dropdown-item' onclick=\"gVrGallery.vChange('"+key+"','F')\"><img src='/img/account/icon-overflow-close-exhibition.svg' />전시 종료하기</a>";
//////			}else{						
//////				html += "						<a class='dropdown-item' onclick=\"gVrGallery.vChange('"+key+"','T')\"><img src='/img/account/icon-overflow-exhibition-open.svg' />전시 오픈하기</a>";
//////			}
////								
////			html += "							<a class='dropdown-item' onclick=\"gRen.vEdit('"+key+"','"+templatecode+"')\"><img src='/img/account/icon-overflow-edit-sales-info.svg' /> 수정하기</a>";
////			
////			html += "							<a class='dropdown-item' onclick=\"gRen.vDelete('"+key+"')\"><img src='/img/account/icon-overflow-delete-art.svg' /> 삭제 하기</a>";
////												
////	//		html += "							<a class='dropdown-item' onclick=\"gVrGallery.vSend360Talk('"+key+"','"+templatecode+"','"+title+"','"+express+"')\"><img src='/img/account/icon-overflow-promo-exhibition.svg' />360Talk 공유</a>";
////								
////			html += "					</div>";
////			html += "				</div>";
////			
////			html += "			 </div>";
////			html += "		</div>";
////			html += "	</div>";
////			html += "</div>";					
//						
//		html += "	</div>";
//		html += "</div>";
//		
//		
//		$div = $(html);
//		$wrapper.html(html);
//		
//		
//		
//		 $("#rental_vr").mCustomScrollbar({
//		    	theme:"minimal-dark",
//				autoExpandScrollbar: true,
//				scrollButtons:{
//					enable:true
//				},
//				mouseWheelPixels : 200, // 마우스휠 속도
//				scrollInertia : 400, // 부드러운 스크롤 효과 적용
//			//	mouseWheel:{ preventDefault: false },
//				advanced:{
//					updateOnContentResize: true
//				},
//				autoHideScrollbar : false,
//				callbacks : {
//					onTotalScroll: function(){
//					
//						if (!gRen.isloading_complete){
//							var bun = parseInt(gRen.start) + parseInt(gRen.perpage);
//							gRen.load_art_list(bun, "init");
//						}
//
//					},
//					onTotalScrollOffset: 10,
//					alwaysTriggerOffsets:true
//				}
//		    });
//		
//		
//		
//		
//	//	$fig.append($img).append($figcap).appendTo($div);
//		
//	//	$wrapper.append($div).masonry('appended', $div);
//	},
//	
	
	
	
	
	
	
	"draw_art_list3":function(data, opt){ //vr
		
		var $wrapper = $('#gallery_columns');
	
		var html = "";
		
		var is_custom = (!(data.imagelist.length > 0 && data.imagelist[0].filekey) ? true : false);

			var data_info = data;
			
			var title = data_info.title;
			var vr_title = g360.textToHtml(data_info.title).replace(/'/g, '\\\'').replace(/\r|\n/g, '');
			var key = data_info.dockey;
			var templatecode = data_info.roomkey;
			
			var read = data_info.read;
			var like = data_info.like;
			
			var express = data_info.express;
			var show = data_info.show;
			
		
			var short_url = data_info.short_url;
			
					
			var img_src = "/vrgallery/"+data_info.email+"/"+key+"/pano_f.jpg?t="+new Date().getTime();
			
			
			html += "<div class='col-md-4 col-sm-6'>";
			html += "	<div class='vr-item-wrap'>";
			html += "		<div class='pic' style='cursor:pointer' onclick=\"g360.popup_VR_rental('"+vr_title+"','"+key+"','"+templatecode+"', '"+data_info.bgmusic+"');\">";
			html += "			<img src='"+img_src+"' >";
			html += "		 </div>";
			html += "		 <div class='info'>";
			if (show == "T"){
				html += "			<h3>"+title+"<span>전시 중</span></h3>";
			}else{
				html += "			<h3 style='white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0;'>"+title+"</h3>";
			}
			
			html += "			<h4 style='height:80px; overflow:hidden; padding-right:20px;'>"+g360.TextToHtml(express)+"</h4>";
			html += "    		 <div class='like-area'>";
		//	html += "				 <span><img src='/img/icon-vr-view-count-b.svg' class='icon_vr_view-count_b'>"+read+"</span>";
		//	html += "				 <span onclick=\"gVrGallery.add_like_count('"+key+"',this)\"><img src='/img/icon-vr-collect-count-b.svg' class='icon_vr_collect-count_b' style='cursor:pointer'  >"+like+"</span>";
			
			html += "				 <div class='btn-group' style='right:0px; top:-37px;'>";
			html += "					<button class='bg-transparent border-0 dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' style='margin:auto;'>";
			html += "					<img style='cursor:pointer' src='/img/account/btn-overflow-h-normal.svg' />";
			html += "					</button>";
			html += "						<div class='dropdown-menu' style='width:155px'>";
			
//			if (show == "T"){
//				html += "						<a class='dropdown-item' onclick=\"gVrGallery.vChange('"+key+"','F')\"><img src='/img/account/icon-overflow-close-exhibition.svg' />전시 종료하기</a>";
//			}else{						
//				html += "						<a class='dropdown-item' onclick=\"gVrGallery.vChange('"+key+"','T')\"><img src='/img/account/icon-overflow-exhibition-open.svg' />전시 오픈하기</a>";
//			}
								
			html += "							<a class='dropdown-item' onclick=\"gRen.vEdit('"+key+"','"+templatecode+"', " + is_custom + ")\"><img src='/img/account/icon-overflow-edit-sales-info.svg' /> 수정하기</a>";
			
			html += "							<a class='dropdown-item' onclick=\"gRen.vDelete('"+key+"')\"><img src='/img/account/icon-overflow-delete-art.svg' /> 삭제 하기</a>";
			
			html += "							<a class='dropdown-item' onclick=\"gRen.link_copy('"+key+"','"+short_url+"')\"><img src='/img/account/icon-artproj-insp-normal.svg' />링크URL 복사</a>";
												
	//		html += "							<a class='dropdown-item' onclick=\"gVrGallery.vSend360Talk('"+key+"','"+templatecode+"','"+title+"','"+express+"')\"><img src='/img/account/icon-overflow-promo-exhibition.svg' />360Talk 공유</a>";
								
			html += "					</div>";
			html += "				</div>";
			
			html += "			 </div>";
			html += "		</div>";
			html += "	</div>";
			html += "</div>";					
						
		
		
		$div = $(html);	
		
		$wrapper.append($div).masonry('appended', $div);
	},
	
	
	
	"link_copy" : function(key,short_url){
		
		var data = JSON.stringify({
			dockey : key
		});
		
		$.ajax({
			type: "POST",
			data: data,
			dataType: "JSON",
			contentType: "application/json; charset=utf-8",
			url: g360.root_path + "/confirm_link_copy.mon",
			success: function(data){
				
				var res = data.res;
				if(res=="Y"){
					
					var link_url = location.protocol + "//" + location.host + "/vroom/" + short_url;	
					gRen.copyToClipboard(link_url);
					g360.gAlert("Info","클립보드에 URL이 복사되었습니다. Ctrl+V로 붙여넣기 하세요", "blue", "top");
			
				}else{
					
					g360.gAlert("Info","④ 대관등록을 하시면 링크 복사가 가능합니다", "blue", "top");
					
				}
			},
			error: function(e){
				
			}
			
		})
		
	},
	
	
	"draw_art_list4":function(data, opt){
		
		var $wrapper = $('#artist_list_wrapper');
	
//		var html = "";
		
//		html += "<div id='rental_users' style='height:100%' class='tab1-ret tabon-ret'>";
//		html += "	<div class='container' style='height:100%' id='rental_users_dis'>";
//		html += "		<div id='artist_list_wrapper' style='height:100%' class='row pt-3'>";
		
		for (var i = 0 ; i < data.length; i++){
			
			if(i==0 && gRen.check_2=="search"){
				continue;
			}
			var html = "";
			
			var user = data[i];
			var email = user.email;
			var img = user.phtoimage;
			
		
			var bgimg = g360.user_photo_gray_url(user.email);
			bgimg = bgimg + "?open&ver=" + user.photoimage_version; //new Date().getTime();
			//var bgimg = g360.user_photo_profile_url(user.email)
			
			var name = user.name;
			var name_eng = user.name_eng;
			var id = email.replace("@","_");
			
			html += "			<div class='col-lg-4 col-sm-6'>";			
			html += "				<div class='artist-item-wrap ret-hover'>";
			html += "					<div class='pic' data-artist-id='"+email+"' onclick=\"gRen.go_profile_rental('"+email+"')\">";
			html += "						<div class='artist_rental' style='height:100%; top:0'>";
			html += "							<div class='img-cover' style=\"background-size:cover; bakground-repeat:no-repeat; background-position:center; background-image:url('"+bgimg+"')\"></div>";
			html += "						</div>";
			html += "					</div>";		
		//	html += "					<span class='revision-button-ret_rental' style='z-index:10000' >수정</span>";
			
			
			
			
			html += "					<div class='info' style='margin-bottom:20px'>";
			html += "						<h3>"+name+"</h3>";
			html += "						<h4>"+name_eng+"</h4>";
			
			
			html += "					<div class='archive' >";
			html += "						<div class='btn-group'> <!-- 버튼 추가 -->";
			html += "							<button class='bg-transparent border-0 dropdown-toggle' type='button' id='dropdownMenu1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
			html += "								<img src='/img/account/btn-overflow-h-normal.svg' alt='더보기' style='cursor:pointer'/>";
			html += "							</button>";		
			html += "							<div class='dropdown-menu dropdown-menu-right' aria-labelledby='dropdownMenu1'>";//			
			html += "								<a class='dropdown-item' onclick=\"gRen.go_profile_rental('"+email+"')\">";
			html += "								<img src='/img/account/icon-overflow-edit-sales-info.svg' alt=''  /> 수정</a>";	
			
			html += "								<a class='dropdown-item' onclick=\"gRen.artist_delete('"+email+"')\">";
			html += "								<img src='/img/account/icon-overflow-delete-art.svg' alt=''  /> 삭제</a>";
			html += "				    		</div>";
			html += "				    	</div>";
			html += "				    </div>";		
			
			html += "					</div>";
			
			html += "				</div>";		
			
			html += "			</div>";
			
			$wrapper.append(html);
			
		}	
		
//		html += "		</div>";
//		html += "	</div>";
//		html += "</div>";
				
//		$wrapper.html(html);
		
	
		
		
//		var html = "";
//		html += "<div class='layer layer-menu' style='width:96px'>";
//		html += "<ul >";
//	//	html += "	<li class='online' style='10px !important' onclick=\"gTop.status_ch('online')\">"+gap.lang.online+"</li>";
//	//	html += "	<li class='away'  onclick=\"gTop.status_ch('away')\">"+gap.lang.empty+"</li>";
//	//	html += "	<li class='deny'  onclick=\"gTop.status_ch('deny')\">"+gap.lang.donottouch+"</li>";
//		html += "</ul>";
//		html += "</div>";
//		
//		$(".revision-button-ret_rental").qtip({
//			overwrite: false,   //옵션 주지 않으면 'show is null' 오류 발생
//			content : {
//				text : html
//			},
//			show : {
//				event: 'click',
//				ready: true
//			},
//			hide : {
//				event : 'click unfocus',
//				//event : 'mouseout',
//				fixed : true
//			},
//			style : {
//				classes : 'qtip-bootstrap',
//				tip : false
//			},
//			position : {
//				my : 'top left',
//				at : 'bottom left',
//				//target : $(this)
//				adjust: {
//	              x: -80,
//	              y: 2
//				}
//			}
//		});	
		
		

		 $("#rental_users").mCustomScrollbar({
		    	theme:"minimal-dark",
				autoExpandScrollbar: true,
				scrollButtons:{
					enable:true
				},
				mouseWheelPixels : 200, // 마우스휠 속도
				scrollInertia : 400, // 부드러운 스크롤 효과 적용
			//	mouseWheel:{ preventDefault: false },
				advanced:{
					updateOnContentResize: true
				},
				autoHideScrollbar : false,
				callbacks : {
					onTotalScroll: function(){
					
						if(gRen.check_2=="search"){
							
							if (!gRen.isloading_complete){
								gRen.search_start = parseInt(gRen.search_start) + parseInt(gRen.perpage);
								gRen.search_dis(gRen.txt, "add");
							}
							
						}else{
							
							if (!gRen.isloading_complete){
								var bun = parseInt(gRen.start) + parseInt(gRen.perpage);
								gRen.start = bun;
								gRen.load_art_list(bun, "add");
							}							
						}

					},
					onTotalScrollOffset: 10,
					alwaysTriggerOffsets:true
				}
		    });
		 
		
		
		
//		$div = $(html);
//		$wrapper.append($div).masonry('appended', $div);
		
	},
	
	
	"artist_delete" : function(id){
		
		$.confirm({
			title : " ",
			content : "정말 삭제 하시겠습니까?<br>작가 삭제 시 연관된 작품 및 VR갤러리 작품정보에 문제가 발생될 수 있습니다. <hr>",
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
						var url = g360.root_path + "/artist_reg_delete_rental.mon?id=" + id;
						$.ajax({
							type : "GET",
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							cache : false,
							url : url,
							success : function(data){
								gRen.navBtnAction('main', 'artist');
							},
							error : function(e){
								g360.error_alert();
							}
						});
					}
				},
				moreButtons : {
					text : "취소"
				}
			}
		});	
		
		
		
	},
	
	
	"draw_art_list5":function(data, opt){
		
		var $wrapper = $('#rental_dis');
	
		var html = "";
		
		html += "			<div class='tab4-ret tabon-ret'>";
		html += "				<div class='container-dbook-ret'>";
		
		for (var i = 0 ; i < data.length; i++){
			var data_info = data[i];
			var user = data_info;
			var email = user.email;
			var img = user.phtoimage;
			var bgimg = g360.user_photo_gray_url(user.email)
			var name = user.name;
			var name_eng = user.name_eng;
			
			
			

			html += "					<div class='dbooklist-ret' onclick='gRen.dbopen()'>";
			html += "				        <img src='/img/rental/D-book_1.png' />";
			html += "				        <div class='dbookinfo-ret'>";
			html += "				           <h3>&lsqb;D-Book&rsqb; 추상,화합을 꿈구다 : 이선화 Lee, sunhwa 개인전</h3>";
			html += "				           <p>이선화 Lee, sunhwa</p>";
			html += "				     	</div>";
			html += "				 	</div>";
			
			
			
			
		}
		html += "				</div>";
		html += "			</div>";
				
		$wrapper.html(html);
		
//		$div = $(html);
//		$wrapper.append($div).masonry('appended', $div);
		
	},
	
	
	
	"dbopen" : function(){
		window.open("https://www.gallery360.co.kr/test/deploy/test2.html", null);
	},
	
	
	
	
	
	
	
	
	
	
	
	
//	"load_regartistlist" : function(){
//		
//		var url = g360.root_path + "/artist_reg_list_rental.mon";
//		$.ajax({
//			type : "GET",
//			dataType : "json",
//			contentType : "application/json; charset=utf-8",
//			url : url,
//			cache : false,
//			success : function(data){
//				
//				
//				var html = "";
//				
//				html += "<section class='author_register_sh'> <!-- 클래스 추가 -->";
//
//				html += "	<div class='container'>";
//				html += "		<div id='artist_list_wrapper' class='row pt-3'>";
//				
//				for (var i = 0 ; i < data.length; i++){
//					var user = data[i];
//					var email = user.email;
//					var img = user.phtoimage;
//					var bgimg = g360.user_photo_gray_url(user.email)
//					var name = user.name;
//					var name_eng = user.name_eng;
//					
//					html += "			<div class='col-lg-4 col-sm-6'>";
//					html += "				<div class='artist-item-wrap'>";
//					html += "					<div class='pic' data-artist-id='"+email+"' onclick=\"gRen.go_profile_rental('"+email+"')\">";
//					html += "						<div class='artist'>";
//					html += "							<div class='img-cover' style=\"background-image:url('"+bgimg+"')\"></div>";
//					html += "						</div>";
//					html += "					</div>";
//					html += "					<div class='info'>";
//					html += "						<h3>"+name+"</h3>";
//					html += "						<h4>"+name_eng+"</h4>";
//					html += "					</div>";
//					html += "				</div>";
//					html += "			</div>";
//				}
//				
//				
//				
//				
//				
//				
//				
//				
//				
//		
//				html += "		</div>";
//				html += "	</div>";
//				html += "</section>";
//				
//				
//				
//			
//				$("#rental_artist").html(html);
//				
//			
//			},
//			error : function(e){
//				g360.error_alert();
//			}
//		})
//		
//		
//	},
//	
//	
//	"load_VRRoom" : function(type, cPage){
//		
//		
//		gVrGallery.cPage = cPage;
//		
//			
//		var start = (parseInt(gVrGallery.perpage) * (parseInt(gVrGallery.cPage))) - (parseInt(gVrGallery.perpage) - 1);
//		start = parseInt(start) -1 ;
//		
//		var perpage = gVrGallery.perpage;
//		var url = contextpath + "/load_VRRoom.mon?start="+start+"&perpage="+perpage+"&ty="+type;
//		url += "&" + new Date().getTime();
//		$.ajax({
//			type : "Get",
//			datatype : "json",
//			contentType : "application/json; charset=utf-8",
//			url : url,
//			success : function(data){
//			
//				var html = "";
//				
//				
//				gVrGallery.totalcount = data[0].totalcount;
//				
//				
//				for (var i =1 ; i < data.length; i++){
//					
//					
//					var title = data[i].title;
//					var vr_title = g360.textToHtml(data[i].title).replace(/'/g, '\\\'').replace(/\r|\n/g, '');
//					var key = data[i].dockey;
//					var templatecode = data[i].roomkey;
//					
//					var read = data[i].read;
//					var like = data[i].like;
//					
//					var express = data[i].express;
//					var show = data[i].show;
//					
//					var img_src = "/vrgallery/"+data[i].email+"/"+key+"/pano_f.jpg?t="+new Date().getTime();
//					
//					html += "<div class='col-md-4 col-sm-6'>";
//					html += "	<div class='vr-item-wrap'>";
//					html += "		<div class='pic' style='cursor:pointer' onclick=\"g360.popup_VR('"+vr_title+"','"+key+"','"+templatecode+"');\">";
//					html += "			<img src='"+img_src+"' >";
//					html += "		 </div>";
//					html += "		 <div class='info'>";
//					if (show == "T"){
//						html += "			<h3>"+title+"<span>전시 중</span></h3>";
//					}else{
//						html += "			<h3>"+title+"</h3>";
//					}
//					
//					html += "			<h4>"+g360.TextToHtml(express)+"</h4>";
//					html += "    		 <div class='like-area'>";
//					html += "				 <span><img src='/img/icon-vr-view-count-b.svg' class='icon_vr_view-count_b'>"+read+"</span>";
//					html += "				 <span onclick=\"gVrGallery.add_like_count('"+key+"',this)\"><img src='/img/icon-vr-collect-count-b.svg' class='icon_vr_collect-count_b' style='cursor:pointer'  >"+like+"</span>";
//					
//					html += "				 <div class='btn-group'>";
//					html += "					<button class='bg-transparent border-0 dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
//					html += "					<img style='cursor:pointer' src='/img/account/btn-overflow-h-normal.svg' />";
//					html += "					</button>";
//					html += "						<div class='dropdown-menu'>";
//					
//					if (show == "T"){
//						html += "						<a class='dropdown-item' onclick=\"gVrGallery.vChange('"+key+"','F')\"><img src='/img/account/icon-overflow-close-exhibition.svg' />전시 종료하기</a>";
//					}else{						
//						html += "						<a class='dropdown-item' onclick=\"gVrGallery.vChange('"+key+"','T')\"><img src='/img/account/icon-overflow-exhibition-open.svg' />전시 오픈하기</a>";
//					}
//										
//					html += "							<a class='dropdown-item' onclick=\"gVrGallery.vEdit('"+key+"','"+templatecode+"')\"><img src='/img/account/icon-overflow-edit-sales-info.svg' /> 수정하기</a>";
//					
//					html += "							<a class='dropdown-item' onclick=\"gVrGallery.vDelete('"+key+"')\"><img src='/img/account/icon-overflow-delete-art.svg' /> 삭제 하기</a>";
//														
//			//		html += "							<a class='dropdown-item' onclick=\"gVrGallery.vSend360Talk('"+key+"','"+templatecode+"','"+title+"','"+express+"')\"><img src='/img/account/icon-overflow-promo-exhibition.svg' />360Talk 공유</a>";
//										
//					html += "					</div>";
//					html += "				</div>";
//					
//					html += "			 </div>";
//					html += "		</div>";
//					html += "	</div>";
//					html += "</div>";					
//								
//				}
//				
//			
//							
//				$("#gallery_list_sub").html(html);
//				
//				
//				gVrGallery.search_paging(gVrGallery.cPage);
//			},
//			error : function(e){
//				g360.error_alert();
//			}
//		})
//	},
//	
	
	
	
	"art_modify" : function(dockey){
		
		//partner/art_upload/art_upload.jsp
		var url = g360.root_path + "/rental/art_upload.jsp?opt=edit&dockey="+dockey;
		g360.LoadPage("body_content", url);    //index.jsp파일에 레이어가 존재해서 어디서도 같이 사용 할 수 있다.
		
		return false;
	},
	
	"vEdit" : function(key, code, is_custom){
		var page = (is_custom ? 'make_vr_gallery_custom.jsp' : 'make_vr_gallery.jsp');
		g360.LoadPage("body_content", g360.root_path + "/rental/" + page + "?mode=modify&key="+key+"&code=" + code);
		return false;
		
	},
	
	"vDelete" : function(key){
		g360.gConfirm('VR갤러리를 삭제할까요?<br>삭제시 해당 VR로 작성한 대관서비스도 삭제됩니다.', function(){
			var url = contextpath + "/vrgallery_room_delete_rental.mon?key="+key;
			url += "&" + new Date().getTime();
			$.ajax({
				type : "GET",
				datatype : "json",
				cotenntType : "application/json; charset=utf-8",
				url : url,
				success : function(data){
					if (data.result == "OK"){
						
						g360.UserInfo.rental_use_count = data.count;
						
						gRen.navBtnAction('main', 'vr');
					}else{
						g360.gAlert("Info", "VR갤러리 삭제시 오류가 발생하였습니다.", "blue", "top");
					}
				},
				error : function(err){
					g360.gAlert("Info", "VR갤러리 삭제시 오류가 발생하였습니다.", "blue", "top");
				}
			});
		});
	},
	
	"showRentalType" : function(){
		var rental_type = parseInt(g360.UserInfo.type);
		if (isNaN(rental_type)) {rental_type = 1;}	//기본 값은 일반전시
		var idx = rental_type - 1;
		
		$('#rental_type_layer .rt-btn-list li').eq(idx).click();
		$('#rental_type_layer').show();
		g360.body_scroll_hide();
	},
	
	"hideRentalType" : function(){
		$('#rental_type_layer').hide();
		g360.body_scroll_show();
	},
	
	"setRentalType" : function(rental_type){
		var _self = this;
		/**
		 * 타입별 상세 내용
		 * 1. 일반전시 (아트,사진)
		 * 2. 아이디어 및 연구발표
		 * 3. 교육/학교 (학생 작품 등)
		 * 4. 기업 (제품,솔루션 등)
		 */
		
		var url = contextpath + "/rental_my_style.mon?key="+rental_type;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			datatype : "json",
			cotenntType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
	
				
				if (data.result == "OK"){
					
					g360.UserInfo.type = rental_type;
					$("#btn_rental").click();
					
					// 완료 후 호출
					setTimeout (function(){
						g360.loadingbar_close();
						_self.hideRentalType();
					}, 500);
					
					
				}else{
					g360.gAlert("Info", "설정 등록시 오류가 발생하였습니다.", "blue", "top");
				}
			},
			error : function(err){
				g360.gAlert("Info", "설정 등록시 오류가 발생하였습니다.", "blue", "top");
			}
		});
		
		
	
	
	}
}



