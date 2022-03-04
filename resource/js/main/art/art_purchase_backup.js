
function gArtPurchase(){	
	gArtPur = this;
	gArtPur.userinfo = "";
	gArtPur.tprice = 0;
	gArtPur.call_from = "";
	gArtPur.call_project_opt = "";
	gArtPur.sales_type = "";
	
	gArtPur.cur_artProject_data = "";
}

gArtPurchase.prototype = {		

	"init" : function(call_from, sales_type, call_project_opt){
		var _self = this;
		//구매 신청한 작품 정보를 설정한다.

		gArtPur.call_from = call_from;
		gArtPur.sales_type = sales_type;
		gArtPur.call_project_opt = call_project_opt;
		
		gArtPur.purchase_list_draw();
		
		gArtPur.UserInfo_Set();
		
		$("#btab1").on("click", function(evnet){
			$("#btab2").removeClass("on");
			$("#btab1").addClass("on");
			
			$("#fa").val(gArtPur.userinfo.first_address);
			$("#sa").val(gArtPur.userinfo.second_address);
		});
		
		$("#btab2").on("click", function(evnet){
			$("#btab1").removeClass("on");
			$("#btab2").addClass("on");
			$("#fa").val("");
			$("#sa").val("");
		});
		
		$("#su_m1").on("click", function(evnet){
			$("#su_m1").addClass("on");
			$("#su_m2").removeClass("on");
			
			var data = gArtPur.userinfo;
			$("#su_name").val(data.name);
			$("#su_fa").val(data.first_address);
			$("#su_sa").val(data.second_address);
			$("#su_mobile").val(data.mobile);
			$("#su_tel1").val(data.tel1);
			$("#su_tel2").val(data.tel2);
			$("#su_tel3").val(data.tel3);
			$("#su_email").val(data.email);
		});
		
		$("#su_m2").on("click", function(evnet){
			$("#su_m2").addClass("on");
			$("#su_m1").removeClass("on");
			$("#su_name").val("");
			$("#su_fa").val("");
			$("#su_sa").val("");
			$("#su_mobile").val("");
			$("#su_tel1").val("");
			$("#su_tel2").val("");
			$("#su_tel3").val("");
			$("#su_email").val("");
		});
		
		
		
		
		$("#last_purchase").on("click", function(event){
			
			
			    	        
			if (!$("#chk2").is(":checked")){
			//	g360.gAlert("Error","구매동의 체크히셔야 합니다.", "red", "left");
				alert("구매동의 체크히셔야 합니다.");
				$("#chk2").focus();
				return false;
			}
			if (!$("#chk3").is(":checked")){
			//	g360.gAlert("Error","구매 서비스 이용약관에 동의하셔야 합니다.", "red", "left");
				alert("구매 서비스 이용약관에 동의하셔야 합니다.");
				$("#chk3").focus();
				return false;
			}
//			if (!$("#chk4").is(":checked")){
//			//	g360.gAlert("Error","개인정보 수집 및 이용동의 하셔야 합니다.", "red", "left");
//				alert("개인정보 수집 및 이용동의 하셔야 합니다.");
//				$("#chk4").focus();
//				return false;
//			}
			
			var obj1_bcolor = $("#reg_ck1").get(0).style.background;
			if (obj1_bcolor != "black"){
				alert("구매 서비스 이용약관 전체보기를 클릭하셔야 합니다.");
				$("#reg_ck1").focus();
				return false;
			}
			
//			var obj2_bcolor = $("#reg_ck2").get(0).style.background;
//			if (obj2_bcolor != "black"){
//				alert("개인정보 수집 및 이용동의 전체보기를 클릭하셔야 합니다.");
//				$("#reg_ck2").focus();
//				return false;
//			}
//			
			
			
			if ($("#su_name").val() == ""){
			//	g360.gAlert("Error","수취인명을 작성하셔야 합니다.", "red", "left");
				alert("수취인명을 작성하셔야 합니다.");
				$("#su_name").focus();
				return false;
			}
			
			if ($("#su_fa").val() == ""){
			//	g360.gAlert("Error","주소를 선택하셔야 합니다.", "red", "left");
				alert("주소를 선택하셔야 합니다.");
				$("#su_fa").focus();
				return false;
			}
			
			if ($("#su_sa").val() == ""){
			//	g360.gAlert("Error","상세주소를 작성하셔야 합니다.", "red", "left");
				alert("상세주소를 작성하셔야 합니다.");
				$("#su_sa").focus();
				return false;
			}
			
			if ($("#su_mobile").val() == ""){
			//	g360.gAlert("Error","수취인 연락처(휴대폰)를 등록하셔야 합니다.", "red", "left");
				alert("수취인 연락처(휴대폰)를 등록하셔야 합니다.");
				$("#su_mobile").focus();
				return false;
			}
			
			
			var data = g360.cart_list;
		//	debugger;
			
			var suj = "";
			
			if (gArtPur.call_from == "artProject"){
				
				if (data[0].request_email == null){
					suj = data[0].art_title;
				}else{
					suj = data[0].request_title;
				}
				
				gArtPur.cur_artProject_data = data[0];
			}else{
				if (data.length == 1){
					suj = data[0].art_title + " ["+data[0].art_artist+"]";
				}else{
					suj =  data[0].art_title + " ["+data[0].art_artist+"]" + " 외 " + (data.length-1) + "개";
				}
			}
			
			
			var email = $("#purchase_email").text();
			var name = $("#purchase_name").text();
			var mobile = $("#purchase_mobile").text();
			var address = $("#su_fa").val() + " " + $("#su_sa").val();
			
						
			/////////////////////////////////////////////////////////////////////////
			//////////////// 결재전에 선택한 작품들 중에 결재 완료된 것이 있는지 확인한다. ////////////////////
			var rx = "";
			for (var k = 0 ; k < g360.cart_list.length; k++){
	        	var ssp = new Object();
	        	var da = g360.cart_list[k];
	        	if (da.salse_type == "art"){
	        		ssp.dockey = da.dockey;
		        	if (rx == ""){
		        		rx = da.dockey;
		        	}else{
		        		rx += "-spl-" + da.dockey;
		        	}
	        	}	        	
	        }			        
			 var ddx = JSON.stringify({"cdata" : rx});
			
			var url = g360.root_path + "/art_sales_check.mon?call_from="+gArtPur.call_from;
			$.ajax({
				type : "POST",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				data : ddx,
				success : function(res){
				//	debugger;
					if (res.result == "ERROR"){
						var xp = res.list;
						var ti = "";
						for (var k = 0 ; k < xp.length; k++){
							if (ti == ""){
								ti = xp[k].title;
							}else{
								ti += " / " + xp[k].title;
							}
						}
											
					//	g360.gAlert("Error","작품명 [" + ti + "]는 이이 판매된 제품이라 구매하실 수 없습니다.", "red", "left");
						alert("작품명 [" + ti + "]는 이이 판매된 제품이라 구매하실 수 없습니다.")
						return false;
					}else{
						var IMP = window.IMP; // 생략가능
					
						IMP.init(g360.importkey); // 'iamport' 대신 부여받은 "가맹점 식별코드"를 사용
						
						//gArtPur.userinfo
						
						//결재 프로세스
						//대상 작품 리스트를 던져서 하나라도 구매완료된 작품이 있는지 확인하다.
						//확인 하면서 전체 스트가 구매진행중일 경우 "결재대기"로 pay_status = "T" 를 변경한다.
						//결재 완료되면 해당 작품들의 status = 3으로 변경해서 최종 완료된 것으로 처리한다.
						
						var meck = 'merchant_' + new Date().getTime() + "_" + g360.makeRandom(5);
						
						var pay_check = $('input[name="ck1"]:checked').get(0).id;
						var py_me = "";
						var pg = "html5_inicis";
						if (pay_check == "radio1"){
							py_me = "card";
						}else if (pay_check == "radio2"){
							py_me = "trans";
						}else if (pay_check == "radio3"){
							py_me = "vbank";
							pg = "danal_tpay";
						}else if (pay_check == "radio4"){
							py_me = "nobank";
							
						}
						
						
						
						
						
						
						if (pay_check == "radio4"){
							 var sale = new Object();
						        sale.purchase_name = $("#purchase_name").text();
						        sale.purchase_mobile = $("#purchase_mobile").text();
						        sale.tel1 = $("#tel1").val();
						        sale.tel2 = $("#tel2").val();
						        sale.tel3 = $("#tel3").val();
						        sale.purchase_email = $("#purchase_email").text();
						        sale.first_adderss = $("#fa").val();
						        sale.second_address = $("#sa").val();
						        sale.su_name = $("#su_name").val();
						        sale.su_fa = $("#su_fa").val();
						        sale.su_sa = $("#su_sa").val();
						        sale.su_mobile = $("#su_mobile").val();
						        sale.su_tel1 = $("#su_tel1").val();
						        sale.su_tel2 = $("#su_tel2").val();
						        sale.su_tel3 = $("#su_tel3").val();
						        sale.su_message = $("#su_message").val();
						        sale.approval_type = $('input[name="ck1"]:checked').get(0).id;
						        sale.sp_price = $("#sp_price").text();
						        sale.send_price =  $("#send_price").text();
						        
						        sale.artproject = gArtPur.call_project_opt;
						        
						        
						        sale.merchant_uid = meck;
						        sale.pay_method = py_me;
						        
						        sale.purchase_nickname = gArtPur.userinfo.nickname;
						        
						        sale.delivery_company = "";
						        sale.delivery_code = "";
						        sale.delivery_status = "0";  //0 : 결재 대기, 1 : 결재완료/배송준비    , 2: 배송중  , 3 : 배송완료
						
						        var ar = new Array();
						        //이미지 정보중에 필요한 부분만 추출한다.
						        
						        var dockey = "";
						        debugger;
						      
						        for (var k = 0 ; k < g360.cart_list.length; k++){
						        	var ssp = new Object();
						        	var da = g360.cart_list[k];
						        	ssp.dockey = da.dockey;
						        	ssp.art_artist = da.art_artist;
						        	ssp.art_height = da.art_height;
						        	ssp.art_width = da.art_width;
						        	ssp.art_price = da.art_price;
						        	ssp.email = da.email;
						        	ssp.art_title = da.art_title;
						        	ssp.art_tag = da.art_tag;
						        	ssp.art_thema = da.art_thema;
						        	ssp.art_date_year = da.art_date_year;
						        	ssp.art_hosu = da.art_hosu;
						        	ssp.shipping_fee = da.shipping_fee;  //배송비 개발되면 수정해야 한다.
						        	ssp.sales_type = da.sales_type;
						        	ssp.shipping_type = da.shipping_type;
						        	ssp.shipping_type_etc = da.shipping_type_etc;
						        	
						        	ar.push(ssp);
						        	
						        	if (gArtPur.call_from == "artProject"){
						        		dockey = da.dockey;
						        	}
						        	
						        	
						        	
						        	
						        	
						        }			        
						        sale.data = ar;		      
						     
						        sale.call_from = call_from;
						        sale.dockey = dockey;
						        
						        
						        debugger;
						        if (gArtPur.call_from == "artProject"){
						    		//작품 제작 요청을 하고 결재를 완료한 경우
						    		//debugger;
						    		var opt = gArtPur.call_project_opt;
						    		
						    		var xxp = gArtPur.cur_artProject_data;
						    		var url = "";
						    		if (opt == "1"){
						    			//작품 추천을 바로 결재하는 경우
						    			var data = g360.artproject_project1_sales_info;
						    			//debugger;
						    			url = g360.root_path + "/art_ok.mon?id="+data.id+"&email=" + data.email + "&nickname=" + encodeURIComponent(data.nickname) + "&price=" + xxp.art_price+"&term=&ownerkey=" + data.ownerkey +"&shipping_type="+encodeURIComponent(data.shipping_type) + "&pay_method="+ sale.pay_method;
						    			
						    		}else{
						    			//작품 제작을 요청한걸 결재하는 경우
						    			url = g360.root_path + "/art_ok.mon?id="+xxp.suggest_id+"&email="+xxp.suggest_email+ "&nickname=" + encodeURIComponent(xxp.suggest_nickname) + "&price="+xxp.suggest_price+"&term="+xxp.suggest_term + "&ownerkey=" + xxp.ownerkey +"&shipping_type="+encodeURIComponent(xxp.shipping_type) + "&pay_method="+ sale.pay_method;
						    		}
						    		url += "&" + new Date().getTime();
									$.ajax({
										type : "GET",
										dataType : "json",
										async : false,
										cache : false,
										contentType : "application/json; charset=utf-8",
										url : url,
										success : function(data){
											
										}
									});
						        }
						        
						        
						        
						        var url = g360.root_path + "/art_purchase_ok.mon";
						        var data = JSON.stringify(sale);
						        
						        			        
						        $.ajax({
						        	type : "POST",
						        	datatype : "json",
						        	contentType : "application/json; charset=utf-8",
						        	data : data,
						        	url : url,
						        	success : function(data){
						        	//	debugger;
						        		if (data.result == "OK"){
						        			if (gArtPur.call_from == "main"){
						        				g360.gAlert("Info","무통장 구매가 완료되었습니다.<br>구매내역은 작품 구입정보 메뉴에서 확인하실수 있습니다.", "blue", "top")
							        			g360.popup_close("art_purchase_popup");
							        		}else if (gArtPur.call_from == "artProject"){
							        		//	debugger;
							        			if (sale.artproject == "2"){
							        				//작품 제작요청한 것이기 때문에 진행중인 프로젝트 메뉴에서 확인 할수 있다.
							        				g360.gAlert("Info","작품제작요청 프로젝트 진행사항은 '진행중인 프로젝트' 메뉴에서 진행상태를 확인하실수 있습니다.", "blue", "top")
							        			}else{
							        				g360.gAlert("Info","무통장 구매가 완료되었습니다.<br>구매내역은 작품 구입정보 메뉴에서확인하실수 있습니다.", "blue", "top")
							        			}
							        			//g360.gAlert("Info","무통장 구매가 완료되었습니다.<br>구매내역은 작품 구입정보 메뉴에서 확인하실수 있습니다.", "blue", "top")
							        			g360.popup_close("art_purchase_popup");
							        			gCAPJ.art_ok_approval_after();
							        		//	debugger;
							        		//	gCAPJ.load_project_list(gCAPJ.cPage);
							        		}
						        		}else{
						        			
						        			
						        			//기존 결재 완료된 항목을 취소한다.
						        			var url = g360.root_path + "/sales_cancel.mon?id=" + meck;
						        		
						        			$.ajax({
						        				type : "GET",
						        				dataType : "json",
						        				cache : false,
						        				contentType : "application/json; charset=utf-8",
						        				url : url,
						        				success : function(res){
						        				//	g360.gAlert("Info","작품명 [" + data.list + "]는 판매완료된 작품입니다.\n결재가 취소되었습니다.", "blue", "top");
						        					alert("작품명 [" + data.list + "]는 판매완료된 작품입니다.\n결재가 취소되었습니다.");
						        					
						        				},
						        				error : function(e){
						        					g360.error_alert();
						        				}
						        			})
						        			
						        			return false;
						        		}
						        		
						        		//debugger;
						        	},
						        	error : function(e){
						        		g360.error_alert();
						        	}
						        }); 
						}else{
							
								
							
							
							
							IMP.request_pay({
							    pg : pg, // version 1.1.0부터 지원.  kcp.A52CY
							    pay_method : py_me,     //trans : 자동이체   // : vbank : 가상계좌   // card : 카드
							    merchant_uid : meck,
							    name : suj,
							    amount : gArtPur.tprice,
							    buyer_email : email,
							    buyer_name : name,
							    buyer_tel : mobile,
							    buyer_addr : address,
							    buyer_postcode : '',
							    m_redirect_url : ''
							}, function(rsp) {
							//	debugger;
							    if ( rsp.success ) {
							    	//debugger;
							    	
							    	if (gArtPur.call_from == "artProject"){
							    		//작품 제작 요청을 하고 결재를 완료한 경우
							    		//debugger;
							    		var opt = gArtPur.call_project_opt;
							    		
							    		var xxp = gArtPur.cur_artProject_data;
							    		var url = "";
							    		if (opt == "1"){
							    			//작품 추천을 바로 결재하는 경우
							    			var data = g360.artproject_project1_sales_info;
							    			//debugger;
							    			url = g360.root_path + "/art_ok.mon?id="+data.id+"&email=" + data.email + "&nickname=" + encodeURIComponent(data.nickname) + "&price=" + xxp.art_price+"&term=&ownerkey=" + data.ownerkey +"&shipping_type="+encodeURIComponent(data.shipping_type) + "&pay_method="+ sale.pay_method;
							    			
							    		}else{
							    			//작품 제작을 요청한걸 결재하는 경우
							    			url = g360.root_path + "/art_ok.mon?id="+xxp.suggest_id+"&email="+xxp.suggest_email+ "&nickname=" + encodeURIComponent(xxp.suggest_nickname) + "&price="+xxp.suggest_price+"&term="+xxp.suggest_term +"&shipping_type="+encodeURIComponent(xxp.shipping_type) + "&pay_method="+ sale.pay_method;
							    		}
							    		url += "&" + new Date().getTime();
										$.ajax({
											type : "GET",
											dataType : "json",
											contentType : "application/json; charset=utf-8",
											url : url,
											success : function(data){
											//	debugger;
												
												if (opt == "1"){
													//작품 추천 프로젝트의 경우 해당 작품을 완료 처리하고 배송관련 정보를 입력한다.
													  //해당 작품은 판매 완료 된 것으로 설정한다.
											        //art_ok_purchase.mon 참조
											        var sale = new Object();
											        sale.purchase_name = $("#purchase_name").text();
											        sale.purchase_mobile = $("#purchase_mobile").text();
											        sale.tel1 = $("#tel1").val();
											        sale.tel2 = $("#tel2").val();
											        sale.tel3 = $("#tel3").val();
											        sale.purchase_email = $("#purchase_email").text();
											        sale.first_adderss = $("#fa").val();
											        sale.second_address = $("#sa").val();
											        sale.su_name = $("#su_name").val();
											        sale.su_fa = $("#su_fa").val();
											        sale.su_sa = $("#su_sa").val();
											        sale.su_mobile = $("#su_mobile").val();
											        sale.su_tel1 = $("#su_tel1").val();
											        sale.su_tel2 = $("#su_tel2").val();
											        sale.su_tel3 = $("#su_tel3").val();
											        sale.su_message = $("#su_message").val();
											        sale.approval_type = $('input[name="ck1"]:checked').get(0).id;
											        sale.sp_price = $("#sp_price").text();
											        sale.send_price =  $("#send_price").text();
											        
											        sale.artproject = opt;
											            
											        										        
											        sale.merchant_uid = meck;
											        sale.pay_method = py_me;
											        			        
											        
											        sale.purchase_nickname = gArtPur.userinfo.nickname;
											        
											        sale.delivery_company = "";
											        sale.delivery_code = "";
											        
											        if (pay_check == "radio3"){
											        	//가상계좌일 경우 관리자가 입금 확인 해야 결재 완료로 처리된다.
											        	 sale.delivery_status = "0";  //0 : 결재 대기, 1 : 결재완료/배송준비    , 2: 배송중  , 3 : 배송완료
											        }else{
											        	 sale.delivery_status = "1";  //0 : 결재 대기, 1 : 결재완료/배송준비    , 2: 배송중  , 3 : 배송완료
											        }
											       
											
											        var ar = new Array();
											        //이미지 정보중에 필요한 부분만 추출한다.
											        for (var k = 0 ; k < g360.cart_list.length; k++){
											        	var ssp = new Object();
											        	var da = g360.cart_list[k];
											        	ssp.dockey = da.dockey;
											        	ssp.art_artist = da.art_artist;
											        	ssp.art_height = da.art_height;
											        	ssp.art_width = da.art_width;
											        	ssp.art_price = da.art_price;
											        	ssp.email = da.email;
											        	ssp.art_title = da.art_title;
											        	ssp.art_tag = da.art_tag;
											        	ssp.art_thema = da.art_thema;
											        	ssp.art_date_year = da.art_date_year;
											        	ssp.art_hosu = da.art_hosu;
											        	ssp.shipping_fee = da.shipping_fee;  //배송비 개발되면 수정해야 한다.
											        	ssp.sales_type = da.sales_type;   //작품 구매인지 이미지 구매인지 확인한다.ㄴ
											        	
											        	ssp.shipping_type = da.shipping_type;
											        	ssp.shipping_type_etc = da.shipping_type_etc;

											        	ar.push(ssp);
											        }			        
											        sale.data = ar;			        
											        sale.pginfo = rsp;  //전자결재 정보를 추가한다.
											        
											        sale.call_from = call_from;
											        
											        			        	
											        var url = g360.root_path + "/art_purchase_ok.mon";
											        var data = JSON.stringify(sale);
											        
											        			        
											        $.ajax({
											        	type : "POST",
											        	datatype : "json",
											        	contentType : "application/json; charset=utf-8",
											        	data : data,
											        	url : url,
											        	success : function(data){
											        	//	debugger;
											        		if (data.result == "OK"){
											        			if (gArtPur.call_from == "main"){
												        			g360.popup_close("art_purchase_popup");
												        		}else if (gArtPur.call_from == "artProject"){
												        		//	debugger;
												        			g360.popup_close("art_purchase_popup");
												        		//	gCAPJ.art_ok_approval_after();
												        			gCAPJ.load_project_list(gCAPJ.cPage);
												        		}
											        		}else{
											        			
											        			
											        			//기존 결재 완료된 항목을 취소한다.
											        			var url = g360.root_path + "/sales_cancel.mon?id=" + meck;
											        			url += "&" + new Date().getTime();
											        			$.ajax({
											        				type : "GET",
											        				dataType : "json",
											        				contentType : "application/json; charset=utf-8",
											        				url : url,
											        				success : function(res){

											        				//	g360.gAlert("Info","작품명 [" + data.list + "]는 판매완료된 작품입니다.<br>결재가 취소되었습니다.", "blue", "top");
											        														      
											        					alert("작품명 [" + data.list + "]는 판매완료된 작품입니다.<br>결재가 취소되었습니다.");
											        				},
											        				error : function(e){
											        					g360.error_alert();
											        				}
											        			})
											        			
											        			return false;
											        		}
											        		
											        		//debugger;
											        	},
											        	error : function(e){
											        		g360.error_alert();
											        	}
											        }); 
													
												}
												
												
												
												g360.popup_close("art_purchase_popup");
							        		
												gCAPJ.load_project_list(gCAPJ.cPage);
											},
											error : function(e){
												g360.error_alert();
											}
										})
							    		
							    	}else{
							    		 var msg = '결제가 완료되었습니다.';
									        msg += '고유ID : ' + rsp.imp_uid;
									        msg += '상점 거래ID : ' + rsp.merchant_uid;
									        msg += '결제 금액 : ' + rsp.paid_amount;
									        msg += '카드 승인번호 : ' + rsp.apply_num;
									        
									        //해당 작품은 판매 완료 된 것으로 설정한다.
									        //art_ok_purchase.mon 참조
									        var sale = new Object();
									        sale.purchase_name = $("#purchase_name").text();
									        sale.purchase_mobile = $("#purchase_mobile").text();
									        sale.tel1 = $("#tel1").val();
									        sale.tel2 = $("#tel2").val();
									        sale.tel3 = $("#tel3").val();
									        sale.purchase_email = $("#purchase_email").text();
									        sale.first_adderss = $("#fa").val();
									        sale.second_address = $("#sa").val();
									        sale.su_name = $("#su_name").val();
									        sale.su_fa = $("#su_fa").val();
									        sale.su_sa = $("#su_sa").val();
									        sale.su_mobile = $("#su_mobile").val();
									        sale.su_tel1 = $("#su_tel1").val();
									        sale.su_tel2 = $("#su_tel2").val();
									        sale.su_tel3 = $("#su_tel3").val();
									        sale.su_message = $("#su_message").val();
									        sale.approval_type = $('input[name="ck1"]:checked').get(0).id;
									        sale.sp_price = $("#sp_price").text();
									        sale.send_price =  $("#send_price").text();
									        
									        
									        sale.merchant_uid = meck;
									        sale.pay_method = py_me;
									        
									        sale.purchase_nickname = gArtPur.userinfo.nickname;
									        
									        sale.delivery_company = "";
									        sale.delivery_code = "";
									        
									        if (pay_check == "radio3"){
									        	//가상계좌일 경우 관리자가 입금 확인 해야 결재 완료로 처리된다.
									        	 sale.delivery_status = "0";  //0 : 결재 대기, 1 : 결재완료/배송준비    , 2: 배송중  , 3 : 배송완료
									        }else{
									        	 sale.delivery_status = "1";  //0 : 결재 대기, 1 : 결재완료/배송준비    , 2: 배송중  , 3 : 배송완료
									        }
									       
									
									        var ar = new Array();
									        //이미지 정보중에 필요한 부분만 추출한다.
									        for (var k = 0 ; k < g360.cart_list.length; k++){
									        	var ssp = new Object();
									        	var da = g360.cart_list[k];
									        	ssp.dockey = da.dockey;
									        	ssp.art_artist = da.art_artist;
									        	ssp.art_height = da.art_height;
									        	ssp.art_width = da.art_width;
									        	ssp.art_price = da.art_price;
									        	ssp.email = da.email;
									        	ssp.art_title = da.art_title;
									        	ssp.art_tag = da.art_tag;
									        	ssp.art_thema = da.art_thema;
									        	ssp.art_date_year = da.art_date_year;
									        	ssp.art_hosu = da.art_hosu;
									        	ssp.shipping_fee = da.shipping_fee;  //배송비 개발되면 수정해야 한다.
									        	ssp.sales_type = da.sales_type;   //작품 구매인지 이미지 구매인지 확인한다.ㄴ

									        	ar.push(ssp);
									        }			        
									        sale.data = ar;			        
									        sale.pginfo = rsp;  //전자결재 정보를 추가한다.
									        

									        
									        sale.call_from = call_from;
									        
									        			        	
									        var url = g360.root_path + "/art_purchase_ok.mon";
									        var data = JSON.stringify(sale);
									        
									        			        
									        $.ajax({
									        	type : "POST",
									        	datatype : "json",
									        	contentType : "application/json; charset=utf-8",
									        	data : data,
									        	url : url,
									        	success : function(data){
									        	//	debugger;
									        		if (data.result == "OK"){
									        			if (gArtPur.call_from == "main"){
									        				
									        				g360.gAlert("Info","결재가 완료되었습니다.<br>구매내역은 작품 구입정보 메뉴에서 확인하실수 있습니다.", "blue", "top")
										        			g360.popup_close("art_purchase_popup");
										        		}else if (gArtPur.call_from == "artProject"){
										        		//	debugger;
										        			g360.popup_close("art_purchase_popup");
										        			gCAPJ.art_ok_approval_after();
										        		}
									        		}else{
									        			
									        			
									        			//기존 결재 완료된 항목을 취소한다.
									        			var url = g360.root_path + "/sales_cancel.mon?id=" + meck;
									        			url += "&" + new Date().getTime();
									        			$.ajax({
									        				type : "GET",
									        				dataType : "json",
									        				contentType : "application/json; charset=utf-8",
									        				url : url,
									        				success : function(res){
									        				//	g360.gAlert("Info", "작품명 [" + data.list + "]는 판매완료된 작품입니다.\n결재가 취소되었습니다." , "blue", "top");
									        													  
									        					alert("작품명 [" + data.list + "]는 판매완료된 작품입니다.\n결재가 취소되었습니다.");
									        				},
									        				error : function(e){
									        					g360.error_alert();
									        				}
									        			})
									        			
									        			return false;
									        		}

									        	},
									        	error : function(e){
									        		g360.error_alert();
									        	}
									        }); 
							    	}
							    	
							       
							        
							        
							        
							    } else {
							      //  var msg = '결제에 실패하였습니다.';
							      //  msg += '에러내용 : ' + rsp.error_msg;
							        
							        var msg = rsp.error_msg;
							    //    g360.gAlert("Error",msg, "red", "left");
							        alert(msg);
							    }		    
							    
							});	
							
							
							
							
											
							
							
							
							
							
							
							
							
							
							
							
							
							
						}					
									
						
					}
				},
				error : function(e){
					g360.error_alert();
				}
			})
			//debugger;

			/////////////////////////////////////////////////////////////////////////
			
					
			
			
		});
		
	},
	
	
	
	
	"purchase_list_draw" : function(){
		debugger;
		var data = g360.cart_list;
		
		if (gArtPur.call_from == "artProject"){
			//작품 제작 요청한 경우
			var sp = data[0];
			var totalprice =  0;
			$("#purchase_count").text("1");
			
			html += "<tr>";
			html += "	<td class='t_art'>";
			
			var imgurl = "";
			if (sp.request_email == null){
				//작품 추천요청했을때 그림을 선택해서 결재하는 경우
				imgurl = g360.thumbnail_img_path(sp.email, sp.dockey);
				html += "		<div class='thm_cart'><img src='"+imgurl+"' style='min-height:90px' /></div>";
				html += "		<ul class='cart_info'>";
				html += "			<li class='i_subject'>"+sp.art_title+"</li>";
				html += "			<li class='i_name'>"+sp.art_artist+"</li>";
				if (sp.art_hosu == null){
					html += "			<li class='i_size'>"+sp.art_height+" x "+sp.art_width+"cm</li>";
				}else{
					html += "			<li class='i_size'>"+sp.art_height+" x "+sp.art_width+"cm("+sp.art_hosu+"호)</li>";
				}
				
				html += "			<li class='i_price'>"+g360.comma(g360.setWon(sp.art_price))+"</li>";
				html += "		</ul>";
				
				if (sp.shipping_fee == null){
					$("#send_price").text(0);
				}else{
					$("#send_price").text(g360.comma(sp.shipping_fee));
				}
				
				
				totalprice = sp.art_price + sp.shipping_fee;
				
			//	$("#purchase_total_price").text(g360.comma(g360.setWon(sp.art_price)));
				$("#purchase_total_price").text(g360.comma(totalprice));
				
				//var totalp = sp.art_price;   //배송비 포함해야 한다.
				gArtPur.tprice = totalprice;
				$("#total_sale_price").text(g360.comma(g360.setWon(totalprice)));
				
		//		$("#sp_price").text(g360.comma(g360.setWon(totalp)));
				
				if (gArtPur.tprice > g360.cardapprovalmax){
					$("#radio1").prop("disabled", true);
					$("#radio2").prop("disabled", true);
					$("#radio1_dis").css("text-decoration", "line-through");
					$("#radio2_dis").css("text-decoration", "line-through");
					
					$("#radio4").prop("checked", true);
				//	$("#sp_price").html(g360.comma(g360.setWon(totalp)) + "&nbsp;&nbsp;("+g360.cardapprovaldis+" 이상은 가상 계좌와 무통장 입금만 가능합니다)");
					$("#sp_price").html(g360.comma(totalprice) + "&nbsp;&nbsp;("+g360.cardapprovaldis+" 이상은 무통장 입금만 가능합니다)");
				}else{
				//	$("#sp_price").text(g360.comma(g360.setWon(totalp)));
					$("#sp_price").text(g360.comma(totalprice));
				}
				
			}else{
				//작품 제작 요청한 것을 결재하는 경우
				imgurl = g360.artProject_preview_img_path(sp.request_email, sp.request_file_name);
				html += "		<div class='thm_cart'><img src='"+imgurl+"' style='min-height:90px' /></div>";
				html += "		<ul class='cart_info'>";
				html += "			<li class='i_subject'>"+sp.request_title+"</li>";
				html += "			<li class='i_name'>"+sp.suggest_nickname+"</li>";
				if (sp.request_hosu == null){
					html += "			<li class='i_size'>"+sp.request_height+" x "+sp.request_width+"cm</li>";
				}else{
					html += "			<li class='i_size'>"+sp.request_height+" x "+sp.request_width+"cm("+sp.request_hosu+"호)</li>";
				}
				
				html += "			<li class='i_price'>"+g360.comma(g360.setWon(sp.art_price * 10000))+"</li>";
				html += "		</ul>";
				
				totalprice = (sp.suggest_price * 10000);
		//		$("#purchase_total_price").text(g360.comma(g360.setWon(sp.suggest_price * 10000)));
				$("#purchase_total_price").text(g360.comma(totalprice));

				gArtPur.tprice = totalprice;
		//		$("#total_sale_price").text(g360.comma(g360.setWon(totalp)));
				$("#total_sale_price").text(g360.comma(totalprice));
							
				
				$("#radio1").prop("disabled", true);
				$("#radio2").prop("disabled", true);
				$("#radio1_dis").css("text-decoration", "line-through");
				$("#radio2_dis").css("text-decoration", "line-through");
				
				$("#radio4").prop("checked", true);
			//	$("#sp_price").html(g360.comma(g360.setWon(gArtPur.tprice)) + "&nbsp;&nbsp;("+g360.cardapprovaldis+" 이상은 가상 계좌와 무통장 입금만 가능합니다)");
				$("#sp_price").html(g360.comma(totalprice) + "&nbsp;&nbsp;(작품 제작 요청은 무통장 입금만 가능합니다.)");
			}
 
			
			
			
			html += "	</td>";
			html += "</tr>";
			
			$("#vrgallery_popup_title2").html("작품 제작 요청");
			$("#purchase_count2").text("1점");
			
			$("#art_sales_list").show();			
			$("#purchage_list").html(html);
			
			
			
			
			

			
			
			
			
			
		}else{
		//	debugger;
			var isArtExist = false;
			var isImageExist = false;
			for (var i = 0 ; i < data.length ; i++){
				var sp = data[i];
				if (sp.sales_type == "art"){
					isArtExist = true;
				}
				if (sp.sales_type == "image"){
					isImageExist = true;
				}
			}
			
			if (!isArtExist){
				$("#sales_type_info").hide();
			}
//			
//			
//			//작품 구매 요청한 경우 또는 이미지를 구매한 경우
//			if (gArtPur.sales_type == "art"){
//				$("#art_sales_list").show();				
//			}
//			
//			if (gArtPur.sales_type == "image"){
//				$("#image_sales_list").show();				
//			}
					
			
			$("#purchase_count").text(data.length);
		//	$("#send_price").text("10,000원");   //배송비 정보에서 가져와야 한다.
		//	$("#send_price").text(g360.comma(g360.setWon(data[0].shipping_fee)));
			
			if (data[0].shipping_fee == null){
				$("#send_price").text(0);
			}else{
				$("#send_price").text(g360.comma(data[0].shipping_fee));
			}
			
			
			var html = "";	
			var html2 = "";
			var total_price = 0;
			var total_shipping_fee = 0;
			var total_price_image = 0;
			
			var artcount = 0;
			var imagecount = 0;
			
			
			for (var i = 0 ; i < data.length ; i++){
				
				var sp = data[i];
				
				if (sp.sales_type == "art"){
					$("#art_sales_list").show();
					
					html += "<tr>";
					html += "	<td class='t_art'>";
					var imgurl = g360.thumbnail_img_path(sp.email, sp.dockey);
					html += "		<div class='thm_cart'><img src='"+imgurl+"' /></div>";
					html += "		<ul class='cart_info'>";
					html += "			<li class='i_subject'>"+sp.art_title+"</li>";
					html += "			<li class='i_name'>"+sp.art_artist+"</li>";					
					if (sp.art_hosu == null){
						html += "			<li class='i_size'>"+sp.art_height+" x "+sp.art_width+"cm</li>";	
					}else{
						html += "			<li class='i_size'>"+sp.art_height+" x "+sp.art_width+"cm("+sp.art_hosu+"호)</li>";	
					}
									
					html += "			<li class='i_price'>"+g360.comma(g360.setWon(sp.art_price))+"</li>";
				//	html += "			<li class='i_price'>"+g360.comma(sp.art_price)+"</li>";
					html += "		</ul>";
					html += "	</td>";
					html += "</tr>";
					
					total_price += sp.art_price;
					
					if (sp.shipping_fee == null){
						total_shipping_fee += 0;
					}else{
						total_shipping_fee += sp.shipping_fee;
					}
					
					artcount += 1;

				}else{
					$("#image_sales_list").show();	
					html2 += "<tr>";
					html2 += "	<td class='t_art'>";
					var imgurl = g360.thumbnail_img_path(sp.email, sp.dockey);
					html2 += "		<div class='thm_cart'><img src='"+imgurl+"' /></div>";
					html2 += "		<ul class='cart_info'>";
					html2 += "			<li class='i_subject'>"+sp.art_title+"</li>";
					html2 += "			<li class='i_name'>"+sp.art_artist+"</li>";
					html2 += "			<li class='i_size'>"+sp.file_height+" x "+sp.file_width+"px ("+ g360.file_size_setting(sp.file_size)+")</li>";					
					html2 += "			<li class='i_price'>"+g360.comma(g360.setWon(sp.art_price))+"</li>";
					html2 += "		</ul>";
					html2 += "	</td>";
					html2 += "</tr>";
					

					total_price_image += sp.art_price;
					imagecount +=1;
					
				}
				

			}
			

			//단발로 계산한다.
			if (isArtExist){
				$("#purchage_list").html(html);
				
				$("#purchase_count2").text(artcount + "점");
			//	$("#purchase_total_price").text(g360.comma(g360.setWon(total_price)));
				$("#purchase_total_price").text(g360.comma(total_price));
				
				var totalp = total_price + total_shipping_fee;   //배송비 포함해야 한다.
				gArtPur.tprice += totalp;
				//$("#total_sale_price").text(g360.comma(g360.setWon(totalp)));
				$("#total_sale_price").text(g360.comma(totalp));
				
			//	$("#sp_price").text(g360.comma(g360.setWon(totalp)));
			}
			
			if (isImageExist){
				$("#purchage_list2").html(html2);
				
				$("#purchase_count22").text(imagecount + "점");
			//	$("#purchase_total_price2").text(g360.comma(g360.setWon(total_price_image)));
				$("#purchase_total_price2").text(g360.comma(total_price_image));
				
				var totalp = total_price_image ;   //배송비 포함해야 한다.
				gArtPur.tprice += totalp;
		//		$("#total_sale_price2").text(g360.comma(g360.setWon(totalp)));
				$("#total_sale_price2").text(g360.setWon(totalp));
				
			//	$("#sp_price").text(g360.comma(g360.setWon(totalp)));
			}
						
			if (gArtPur.tprice > g360.cardapprovalmax){
				$("#radio1").prop("disabled", true);
				$("#radio2").prop("disabled", true);
				$("#radio1_dis").css("text-decoration", "line-through");
				$("#radio2_dis").css("text-decoration", "line-through");
				
				$("#radio4").prop("checked", true);
			//	$("#sp_price").html(g360.comma(g360.setWon(gArtPur.tprice)) + "&nbsp;&nbsp;("+g360.cardapprovaldis+" 이상은 가상 계좌와 무통장 입금만 가능합니다)");
				$("#sp_price").html(g360.comma(gArtPur.tprice) + "&nbsp;&nbsp;("+g360.cardapprovaldis+" 이상은 무통장 입금만 가능합니다)");
			}else{
			//	$("#sp_price").text(g360.comma(g360.setWon(gArtPur.tprice)));
				$("#sp_price").text(g360.comma(gArtPur.tprice));
			}
			
			
			
		
		}
		
		
		
		
		
	},
	
	"UserInfo_Set" : function(){
		var url = g360.root_path + "/search_userinfo.mon";
		url += "?" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				//debugger;
				gArtPur.userinfo = data;
				$("#purchase_name").text(data.name);
				$("#purchase_mobile").text(data.mobile);
				$("#tel1").val(data.tel1);
				$("#tel2").val(data.tel2);
				$("#tel3").val(data.tel3);
				$("#purchase_email").text(data.email);
				
				$("#fa").val(data.first_address);
				$("#sa").val(data.second_address);
				
				$("#su_name").val(data.name);
				$("#su_fa").val(data.first_address);
				$("#su_sa").val(data.second_address);
				$("#su_mobile").val(data.mobile);
				$("#su_tel1").val(data.tel1);
				$("#su_tel2").val(data.tel2);
				$("#su_tel3").val(data.tel3);
				$("#su_email").val(data.email);
				
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	"check_all" : function(obj){
		
		if (obj.checked){
			$("#chk2").prop("checked", "checked");
			$("#chk3").prop("checked", "checked");
		//	$("#chk4").prop("checked", "checked");
			$("#chk5").prop("checked", "checked");
		}else{
			$("#chk2").prop("checked", false);
			$("#chk3").prop("checked", false);
		//	$("#chk4").prop("checked", false);
			$("#chk5").prop("checked", false);
		}

	},
	
}

