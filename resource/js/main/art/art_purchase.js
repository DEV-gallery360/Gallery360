
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
		gArtPur.ch_lang();
		var _self = this;
		//구매 신청한 작품 정보를 설정한다.
		
		//이더리움 전환을 위해 환율을 가져온다.
		$('#art_purchase_popup_wrapper').css('overflow', 'auto');
		g360.transSetting();

		gArtPur.call_from = call_from;
		gArtPur.sales_type = sales_type;
		gArtPur.call_project_opt = call_project_opt;
		
		gArtPur.purchase_list_draw();
		
		gArtPur.UserInfo_Set();
		
		$("#radio5").on("click", function(e){
			
			var total_eth = 0;
			if (gArtPur.total_price_image > 0){
				//작품만 결재하는 경우
				var krw = gArtPur.total_price_image;
				var eth = g360.transKRWtoETH(krw);	
				total_eth = eth;
				$("#total_sale_price2").html(eth + "ETH");
			}
			
			if (gArtPur.total_price_art > 0){
				//작품과 이미지 동시에 결재하는 경우
				var krw = gArtPur.total_price_art;
				var eth = g360.transKRWtoETH(krw);	
				total_eth += eth;
				$("#total_sale_price").html(eth + "ETH");		
			}
			gArtPur.total_eth = total_eth;

		});
		
		$("#radio6").on("click", function(e){
			
			var total_artic = 0;
			if (gArtPur.total_price_image > 0){
				//작품만 결재하는 경우
				var krw = gArtPur.total_price_image;
				var artic = g360.transKRWtoARTIC(krw);	
				
				total_artic = artic;
				$("#total_sale_price2").html(artic + "ARTIC");
			}
			
			if (gArtPur.total_price_art > 0){
				//작품과 이미지 동시에 결재하는 경우
				var krw = gArtPur.total_price_art;
				var artic = g360.transKRWtoARTIC(krw);	
					
				total_artic += artic;
				$("#total_sale_price").html(artic + "ARTIC");		
			}
			gArtPur.total_artic = total_artic;

		});
		
		$("#radio1, #radio2, #radio4").on("click", function(e){
			if (gArtPur.total_price_image > 0){
				//작품만 결재하는 경우
				var krw = gArtPur.total_price_image;
				$("#total_sale_price2").text(g360.comma(g360.setWon(krw)));
			}
			
			if (gArtPur.total_price_art > 0){
				//작품과 이미지 동시에 결재하는 경우
				var krw = gArtPur.total_price_art;	
				if(g360.g_lang.Lang =="ko"){
					$("#total_sale_price").text(g360.comma(g360.setWon(krw)));					
				}else {
					$("#total_sale_price").text("￦"+g360.comma(krw));
				}
			}
		});
		
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
		
		$('input[name=ck1]').on('change', function(){
			if ($(this).attr('id') == 'radio5') {
				// 이더리움 선택
				
			} else {
				
			}
		});
		
		
		$("#last_purchase").on("click", function(event){
			
	
			    	        
			if (!$("#chk2").is(":checked")){
			//	g360.gAlert("Error","구매동의 체크히셔야 합니다.", "red", "left");
				alert(g360.g_lang.Art_Purchase_Alert1);
				$("#chk2").focus();
				return false;
			}
			if (!$("#chk3").is(":checked")){
			//	g360.gAlert("Error","구매 서비스 이용약관에 동의하셔야 합니다.", "red", "left");
				alert(g360.g_lang.Art_Purchase_Alert2);
				$("#chk3").focus();
				return false;
			}
//			if (!$("#chk4").is(":checked")){
//			//	g360.gAlert("Error","개인정보 수집 및 이용동의 하셔야 합니다.", "red", "left");
//				alert("개인정보 수집 및 이용동의 하셔야 합니다.");
//				$("#chk4").focus();
//				return false;
//			}
			
//			var obj1_bcolor = $("#reg_ck1").get(0).style.background;
//			if (obj1_bcolor != "black"){
//				alert("구매 서비스 이용약관 전체보기를 클릭하셔야 합니다.");
//				$("#reg_ck1").focus();
//				return false;
//			}
			
//			var obj2_bcolor = $("#reg_ck2").get(0).style.background;
//			if (obj2_bcolor != "black"){
//				alert("개인정보 수집 및 이용동의 전체보기를 클릭하셔야 합니다.");
//				$("#reg_ck2").focus();
//				return false;
//			}
//			
			
			var data = g360.cart_list;

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
			
			if (isArtExist){
				if ($("#su_name").val() == ""){
				//	g360.gAlert("Error","수취인명을 작성하셔야 합니다.", "red", "left");
					alert(g360.g_lang.Art_Purchase_Alert3);
					$("#su_name").focus();
					return false;
				}
				
				if ($("#su_fa").val() == ""){
				//	g360.gAlert("Error","주소를 선택하셔야 합니다.", "red", "left");
					alert(g360.g_lang.Art_Purchase_Alert4);
					$("#su_fa").focus();
					return false;
				}
				
				if ($("#su_sa").val() == ""){
				//	g360.gAlert("Error","상세주소를 작성하셔야 합니다.", "red", "left");
					alert(g360.g_lang.Art_Purchase_Alert5);
					$("#su_sa").focus();
					return false;
				}
				
				if ($("#su_mobile").val() == ""){
				//	g360.gAlert("Error","수취인 연락처(휴대폰)를 등록하셔야 합니다.", "red", "left");
					alert(g360.g_lang.Art_Purchase_Alert6);
					$("#su_mobile").focus();
					return false;
				}
			}else{
				
			}
			
			
		
			
			
			var data = g360.cart_list;
		
			
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
					suj =  data[0].art_title + " ["+data[0].art_artist+"]" + g360.g_lang.And_More1 + (data.length-1) + g360.g_lang.And_More2;
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
						alert(g360.g_lang.Art_Purchase_Alert7_1 + " [" + ti + "]"+g360.g_lang.Art_Purchase_Alert7_2);
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
						}else if (pay_check == "radio5"){
							py_me = "eth";
							gArtPur.ethProc();
							return;
						}else if (pay_check == "radio6"){
							py_me = "artic";
							gArtPur.articProc();
							return;
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
						
						       
						        //이미지 정보중에 필요한 부분만 추출한다.
						        
						        var dockey = "";
						      
						      
						        for (var k = 0 ; k < g360.cart_list.length; k++){
						        	 var ar = new Array();
						        	 
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
						        	
						        	if (typeof(da.owner_email) != "undefined" && da.owner_email != ""){
						        		ssp.owner_email = da.owner_email;
						        	}
						        	
						        	ar.push(ssp);
						        	
						        	sale.data = ar;	
						        	
						        	if (gArtPur.call_from == "artProject"){
						        		dockey = da.dockey;
						        	}else{
						        				
						        		
						        		sale.call_from = call_from;
							        	
							        	 var url = g360.root_path + "/art_purchase_ok.mon";
									        var data = JSON.stringify(sale);
									        
									        			        
									        $.ajax({
									        	type : "POST",
									        	datatype : "json",
									        	contentType : "application/json; charset=utf-8",
									        	data : data,
									        	async : false,
									        	url : url,
									        	success : function(data){

									        		if (data.result == "OK"){
									        			if (gArtPur.call_from == "main"){
									        				g360.gAlert("Info", g360.g_lang.Art_Purchase_Alert8, "blue", "top", g360.goto_purchase_list);
										        			g360.popup_close("art_purchase_popup");
										        		}else if (gArtPur.call_from == "artProject"){
										        		
										        			if (sale.artproject == "2"){
										        				//작품 제작요청한 것이기 때문에 진행중인 프로젝트 메뉴에서 확인 할수 있다.
										        				g360.gAlert("Info", g360.g_lang.Art_Purchase_Alert9, "blue", "top");
										        			}else{
										        				g360.gAlert("Info", g360.g_lang.Art_Purchase_Alert8, "blue", "top");
										        			}
										        			//g360.gAlert("Info","무통장 구매가 완료되었습니다.<br>구매내역은 작품 구입정보 메뉴에서 확인하실수 있습니다.", "blue", "top")
										        			g360.popup_close("art_purchase_popup");
										        			gCAPJ.art_ok_approval_after();
										        		
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
									        					alert(g360.g_lang.Art_Purchase_Alert10_1 + " [" + data.list + "]" + g360.g_lang.Art_Purchase_Alert10_2);
									        					
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
						        	
						        //	if (data.result == "OK"){
						        		
						       // 	}
						        	
						        	
						        	
						        	
						        }		
						        
						        
						        if (gArtPur.call_from == "cart"){
			        				g360.gAlert("Info",g360.g_lang.Art_Purchase_Alert8, "blue", "top")
				        			g360.popup_close("art_purchase_popup");
			        				
			        				if (gArtPur.call_from == "cart"){
			        					$("#btn_gnb_cart").click();
			        				}
					        	}
						        
						        
						        	      
						        sale.call_from = call_from;
						        sale.dockey = dockey;

						        
						
						        if (gArtPur.call_from == "artProject"){
						    		//작품 제작 요청을 하고 결재를 완료한 경우
						    		
						    		var opt = gArtPur.call_project_opt;
						    		
						    		var xxp = gArtPur.cur_artProject_data;
						    		var url = "";
						    		if (opt == "1"){
						    			//작품 추천을 바로 결재하는 경우
						    			var data = g360.artproject_project1_sales_info;
						    			
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
									
									 var url = g360.root_path + "/art_purchase_ok.mon";
								        var data = JSON.stringify(sale);
								        
								        			        
								        $.ajax({
								        	type : "POST",
								        	datatype : "json",
								        	contentType : "application/json; charset=utf-8",
								        	data : data,
								        	url : url,
								        	async : false,
								        	success : function(data){
								        	
								        		if (data.result == "OK"){
								        			if (gArtPur.call_from == "main"){
								        				g360.gAlert("Info",g360.g_lang.Art_Purchase_Alert8, "blue", "top")
									        			g360.popup_close("art_purchase_popup");
									        		}else if (gArtPur.call_from == "artProject"){
									        		
									        			if (sale.artproject == "2"){
									        				//작품 제작요청한 것이기 때문에 진행중인 프로젝트 메뉴에서 확인 할수 있다.
									        				g360.gAlert("Info",g360.g_lang.Art_Purchase_Alert9, "blue", "top")
									        			}else{
									        				g360.gAlert("Info",g360.g_lang.Art_Purchase_Alert8, "blue", "top")
									        			}
									        			//g360.gAlert("Info","무통장 구매가 완료되었습니다.<br>구매내역은 작품 구입정보 메뉴에서 확인하실수 있습니다.", "blue", "top")
									        			g360.popup_close("art_purchase_popup");
									        			gCAPJ.art_ok_approval_after();
									        		
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
								        					alert(g360.g_lang.Art_Purchase_Alert10_1 + " [" + data.list + "]" +g360.g_lang.Art_Purchase_Alert10_2 );
								        					
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
							
							    if ( rsp.success ) {
							    	
							    	
							    	if (gArtPur.call_from == "artProject"){
							    		//작품 제작 요청을 하고 결재를 완료한 경우
							    		
							    		var opt = gArtPur.call_project_opt;
							    		
							    		var xxp = gArtPur.cur_artProject_data;
							    		var url = "";
							    		if (opt == "1"){
							    			//작품 추천을 바로 결재하는 경우
							    			var data = g360.artproject_project1_sales_info;
							    			
							    			url = g360.root_path + "/art_ok.mon?id="+data.id+"&email=" + data.email + "&nickname=" + encodeURIComponent(data.nickname) + "&price=" + xxp.art_price+"&term=&ownerkey=" + data.ownerkey +"&shipping_type="+encodeURIComponent(data.shipping_type) + "&pay_method="+ py_me;
							    			
							    		}else{
							    			//작품 제작을 요청한걸 결재하는 경우
							    			url = g360.root_path + "/art_ok.mon?id="+xxp.suggest_id+"&email="+xxp.suggest_email+ "&nickname=" + encodeURIComponent(xxp.suggest_nickname) + "&price="+xxp.suggest_price+"&term="+xxp.suggest_term +"&shipping_type="+encodeURIComponent(xxp.shipping_type) + "&pay_method="+ py_me;
							    		}
							    		
										$.ajax({
											type : "GET",
											dataType : "json",
											contentType : "application/json; charset=utf-8",
											url : url,
											cache : false,
											async : false,
											success : function(data){
												
												
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
											        	
											        	if (typeof(da.owner_email) != "undefined" && da.owner_email != ""){
											        		ssp.owner_email = da.owner_email;
											        	}
											        	

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
											        	async : false,
											        	url : url,
											        	success : function(data){
											        	
											        		if (data.result == "OK"){
											        			if (gArtPur.call_from == "main"){
												        			g360.popup_close("art_purchase_popup");
												        		}else if (gArtPur.call_from == "artProject"){
												        		
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
											        														      
											        					alert(g360.g_lang.Art_Purchase_Alert10_1 + " [" + data.list + "]" + g360.g_lang.Art_Purchase_Alert10_2);
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
												
												
												
												g360.popup_close("art_purchase_popup");
							        		
												gCAPJ.load_project_list(gCAPJ.cPage);
											},
											error : function(e){
												g360.error_alert();
											}
										})
							    		
							    	}else{
							    		 var msg = g360.g_lang.msg1;
									        msg += g360.g_lang.msg2 + rsp.imp_uid;
									        msg += g360.g_lang.msg3 + rsp.merchant_uid;
									        msg += g360.g_lang.msg4 + rsp.paid_amount;
									        msg += g360.g_lang.msg5 + rsp.apply_num;
									        
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
									       
									
									       
									        //이미지 정보중에 필요한 부분만 추출한다.
									        for (var k = 0 ; k < g360.cart_list.length; k++){
									        	 var ar = new Array();
									        	 
									        	 
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
									        	
									        	
									        	if (typeof(da.owner_email) != "undefined" && da.owner_email != ""){
									        		ssp.owner_email = da.owner_email;
									        	}

									        	ar.push(ssp);
									        	
									        
									        	
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
											        	async : false,
											        	url : url,
											        	success : function(data){
											        	
											        		if (data.result == "OK"){
											        			if (gArtPur.call_from == "main"){
											        				
											        				g360.gAlert("Info", g360.g_lang.Art_Purchase_Alert12 , "blue", "top")
												        			g360.popup_close("art_purchase_popup");
												        		}else if (gArtPur.call_from == "artProject"){
												        		
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
											        				async : false,
											        				success : function(res){
											        				//	g360.gAlert("Info", "작품명 [" + data.list + "]는 판매완료된 작품입니다.\n결제가 취소되었습니다." , "blue", "top");
											        													  
											        					alert(g360.g_lang.Art_Purchase_Alert10_1 + " [" + data.list + "]" +g360.g_lang.Art_Purchase_Alert10_2);
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
									       
							    	}
							    	
							    	
							    	if (gArtPur.call_from == "cart"){
					        				g360.gAlert("Info",g360.g_lang.Art_Purchase_Alert12, "blue", "top")
						        			g360.popup_close("art_purchase_popup");
					        				
					        				if (gArtPur.call_from == "cart"){
					        					$("#btn_gnb_cart").click();
					        				}
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
			

			/////////////////////////////////////////////////////////////////////////
			
					
			
			
		});
		
	},
	
	"ch_lang" : function(){
		
		$(".g_lang_OrderPayment").text(g360.g_lang.OrderPayment);
		$(".g_lang_Orderer_Info").text(g360.g_lang.Orderer_Info);
		$(".g_lang_Orderer").text(g360.g_lang.Orderer);
		$(".g_lang_Mobile").text(g360.g_lang.Mobile);
		$(".g_lang_Telephone").text(g360.g_lang.Telephone);
		$(".g_lang_Email").text(g360.g_lang.Email);
		$(".g_lang_Delivery_Info").text(g360.g_lang.Delivery_Info);
		
		$(".g_lang_DefaultAddress").text(g360.g_lang.DefaultAddress);
		$(".g_lang_NewAddress").text(g360.g_lang.NewAddress);
		$(".g_lang_Recipient").text(g360.g_lang.Recipient);
		$(".g_lang_Address").text(g360.g_lang.Address);
		$(".g_lang_Message").text(g360.g_lang.Message);
		$(".g_lang_Payment_Info").text(g360.g_lang.Payment_Info);
		$(".g_lang_Payment_Method").text(g360.g_lang.Payment_Method);
		$(".g_lang_FindAddr").text(g360.g_lang.FindAddr);
		
		$(".g_lang_Credit_Card").text(g360.g_lang.Credit_Card);
		$(".g_lang_Bank_Transfer").text(g360.g_lang.Bank_Transfer);
		$(".g_lang_Without_Bankbook").text(g360.g_lang.Without_Bankbook);
		$(".g_lang_Ethereum").text(g360.g_lang.Ethereum);
		$(".g_lang_Apply_Coupon").text(g360.g_lang.Apply_Coupon);
		$("#event_code").attr("placeholder", g360.g_lang.CouponCode);
		$(".g_lang_Apply").text(g360.g_lang.Apply);
		$(".g_lang_All_Total").text(g360.g_lang.All_Total);
		
		$(".g_lang_jum").text(g360.g_lang.jum);
		$(".g_lang_Artwork_Order_Info").text(g360.g_lang.Artwork_Order_Info);
		$(".g_lang_Image_Order_Info").text(g360.g_lang.Image_Order_Info);
		$(".g_lang_NumberOfWorks").text(g360.g_lang.NumberOfWorks);
		$(".g_lang_Purchase_Price").text(g360.g_lang.Purchase_Price);
		$(".g_lang_Shipping_Fee").text(g360.g_lang.Shipping_Fee);
		
		$(".g_lang_Purchase_Agree1").text(g360.g_lang.Purchase_Agree1);
		$(".g_lang_Purchase_Agree2").text(g360.g_lang.Purchase_Agree2);
		
		$(".g_lang_Agree1").text(g360.g_lang.Agree1);
		$(".g_lang_Agree2").text(g360.g_lang.Agree2);
		$(".g_lang_Agree3").text(g360.g_lang.Agree3);
		$(".g_lang_Agree4").text(g360.g_lang.Agree4);
		
		$(".g_lang_ViewAll").text(g360.g_lang.Terms_of_use3);
		$(".g_lang_Purchase").text(g360.g_lang.Purchase);
		
		$("#zip_code_search h2").html(g360.g_lang.Find_postal_code);
		$("#addSearch").attr("placeholder",g360.g_lang.Find_postal_code2);
		
		//$(".g_lang_").text(g360.g_lang.);
		
		
	},
	
	"purchase_list_draw" : function(){
		
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
				if(g360.g_lang.Lang == "ko"){
					$("#total_sale_price").text(g360.comma(g360.setWon(totalprice)));
				}else{
					$("#total_sale_price").text("￦"+g360.comma(totalprice));
				}
				
				
		//		$("#sp_price").text(g360.comma(g360.setWon(totalp)));
				
				if (gArtPur.tprice > g360.cardapprovalmax){
					$("#radio1").prop("disabled", true);
					$("#radio2").prop("disabled", true);
					$("#radio1_dis").css("text-decoration", "line-through");
					$("#radio2_dis").css("text-decoration", "line-through");
					
					$("#radio4").prop("checked", true);
				//	$("#sp_price").html(g360.comma(g360.setWon(totalp)) + "&nbsp;&nbsp;("+g360.cardapprovaldis+" 이상은 가상 계좌와 무통장 입금만 가능합니다)");
					$("#sp_price").html(g360.comma(totalprice) + "&nbsp;&nbsp;("+g360.g_lang.sp_price1+g360.cardapprovaldis+g360.g_lang.sp_price2+")");
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
				$("#sp_price").html(g360.comma(totalprice) + "&nbsp;&nbsp;(" + g360.g_lang.Art_Purchase_Alert15 + ")");
			}
 
			
			
			
			html += "	</td>";
			html += "</tr>";
			
			$("#vrgallery_popup_title2").html(g360.g_lang.Artwork_Recom2);
			$("#purchase_count2").text("1"+g360.g_lang.jum);
			
			$("#art_sales_list").show();			
			$("#purchage_list").html(html);
			
			
			
			
			

			
			
			
			
			
		}else{
		
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
					
			
			
		//	$("#send_price").text("10,000원");   //배송비 정보에서 가져와야 한다.
		//	$("#send_price").text(g360.comma(g360.setWon(data[0].shipping_fee)));
			
//			if (data[0].shipping_fee == null){
//				$("#send_price").text(0);
//			}else{
//				$("#send_price").text(g360.comma(data[0].shipping_fee));
//			}
			
			
			var html = "";	
			var html2 = "";
			var total_price = 0;
			var total_shipping_fee = 0;
			var total_price_image = 0;
			
			var artcount = 0;
			var imagecount = 0;
			
			var total_price_art = 0;
		
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
					
					total_price_art += sp.art_price + sp.shipping_fee;
					
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
			
			gArtPur.total_price_art = total_price_art;
			gArtPur.total_price_image = total_price_image;
			
		//	$("#purchase_count").text(data.length);
			
			$("#purchase_count").text(artcount);
			$("#send_price").text(g360.comma(total_shipping_fee));
			

			//단발로 계산한다.
			if (isArtExist){
				$("#purchage_list").html(html);
				
				$("#purchase_count2").text(artcount + g360.g_lang.Artist_Mypage6);
			//	$("#purchase_total_price").text(g360.comma(g360.setWon(total_price)));
				$("#purchase_total_price").text(g360.comma(total_price));
				
				var totalp = total_price + total_shipping_fee;   //배송비 포함해야 한다.
				gArtPur.tprice += totalp;
				//$("#total_sale_price").text(g360.comma(g360.setWon(totalp)));
				if(g360.g_lang.Lang == "ko"){
					$("#total_sale_price").text(g360.setWon(g360.comma(totalp)));
				}else{
					$("#total_sale_price").text("￦"+g360.comma(totalp));
				}
				
				
			//	$("#sp_price").text(g360.comma(g360.setWon(totalp)));
			}
			
			if (isImageExist){
				$("#purchage_list2").html(html2);
				
				$("#purchase_count24").text(imagecount);
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
				$("#sp_price").html(g360.comma(gArtPur.tprice) + "&nbsp;&nbsp;("+g360.g_lang.sp_price1+g360.cardapprovaldis+g360.g_lang.sp_price2+")");
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
	
	"event_apply" : function(){
		
		//현재 코드를 사용해서 할인율을 구해온다.
		var ecode = $("#event_code").val();
		if (ecode == ""){
			alert(g360.g_lang.CouponCode); return false;
		}
		var url = g360.root_path + "/event_check.mon?code=" + ecode;
	//	debugger;
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			cache : false,
			success : function(data){
			//	debugger;
				var art_list = g360.cart_list;
				
				if (data.result != ""){
					var spl = data.result.split("^");
					var salerate = spl[0];
					var maxprice = spl[1];
					
					var realSale_price_total = 0;
					for (var k = 0 ; k < art_list.length; k++){
						var art_p = art_list[k].art_price;
						var maxSale_check = parseInt(art_p) * parseFloat(salerate);
						
						var realSale_price = "";
						if (maxSale_check > maxprice){
							realSale_price = maxprice
						}else{
							realSale_price = maxSale_check;
						}
						
						realSale_price_total += realSale_price;
						
						var lastprice = parseInt(art_p) - parseInt(realSale_price);
						
						art_list[k].art_price = lastprice;
						
					}
					
					
					var curTotal_price = $("#purchase_total_price").text().replace(/\,/gi,"");
					
//					var maxSale_check = parseInt(curTotal_price) * parseFloat(salerate);
//
//					var realSale_price = "";
//					if (maxSale_check > maxprice){
//						realSale_price = maxprice
//					}else{
//						realSale_price = maxSale_check;
//					}
//					
//				//	alert("할인 가격 : " + realSale_price);
//					
					var lastprice = parseInt(curTotal_price) - parseInt(realSale_price_total);
					
					$("#purchase_total_price").val(lastprice);
					//배송비
					var sendprice = $("#send_price").text().replace(/\,/gi,"");
					var totalp = parseInt(lastprice) + parseInt(sendprice);
					
					$("#total_sale_price").html(g360.comma(totalp));
					
					$("#max_price").text("("+g360.g_lang.MaximumDiscount+":" + g360.setWon(maxprice) +" / "+g360.g_lang.DiscountRate+" : "+ (parseFloat(salerate)*100 )+"%)");
					
					$("#sp_price").html(g360.comma(totalp) + "&nbsp;&nbsp;("+g360.g_lang.sp_price1+g360.cardapprovaldis+g360.g_lang.sp_price2+")");
					
					$("#saleprice_tr").show();
					
					var html = "";
					
					gArtPur.tprice = totalp;
				
					
					html += "<dl><dt>"+g360.g_lang.Payment_Principal+"</dt>";
					html += "<dd>"+g360.comma(parseInt(curTotal_price) + parseInt(sendprice))+"</dd></dl>";
					
					html += "<dl><dt>"+g360.g_lang.Discount_Amount+"</dt>";
					html += "<dd>-"+g360.comma(realSale_price_total)+"</dd></dl>";
					
					$("#saleprice").html(html);
					
				
				}else{
					alert(g360.g_lang.NotExist_CouponCode);
				}
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
		
		
		
	},
	
	"articProc" : function(){
		// MetaMask 설치여부 확인 (설치되어 있으면 로그인창, 설치되어 있지 않으면 설치 창)
	
		if (typeof(window.ethereum) !== "undefined"){
			if (!ethereum.isMetaMask) {
				alert("MetaMask로 접속하시기 바랍니다.");
				return;
			} else {
				$('#art_purchase_popup_wrapper').css('overflow', 'hidden');
				$('#art_purchase_popup_wrapper').scrollTop(0);
				//g360.body_scroll_hide();
				$("#pop2").show();
				getAccount2();
			}
		}else{
			// MetaMask 설치 페이지로 리다이렉트
			alert("MetaMask를 설치하세요");
			return;
		}
		
	
		
		async function getAccount2(){
			const accounts = await ethereum.request({method: 'eth_requestAccounts'});
			const account = accounts[0];
			
			var web3_provider = web3.currentProvider;
			web3 = new Web3(web3.currentProvider);
					
			var ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_tokens","type":"uint256"}],"name":"AdvIssue","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"uint256","name":"_tokens","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"}],"name":"ChangeManager","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"}],"name":"ChangeOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_tokens","type":"uint256"}],"name":"DevIssue","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_tokens","type":"uint256"}],"name":"EcoIssue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_date","type":"uint256"}],"name":"EndSale","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_tokens","type":"uint256"}],"name":"LegalComplianceIssue","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_tokens","type":"uint256"}],"name":"MktIssue","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_tokens","type":"uint256"}],"name":"RsvIssue","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_tokens","type":"uint256"}],"name":"SaleIssue","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_tokens","type":"uint256"}],"name":"TeamIssue","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_tokens","type":"uint256"}],"name":"TokenUnlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"advVestingBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"advVestingTimer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_time","type":"uint256"}],"name":"advisorIssue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"advisorVestingSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"advisorVestingTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"approvals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"burnToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"burnTokenSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"close","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"devIssue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"ecoIssue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endSaleTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"legalComplianceIssue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"manager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxAdvisorSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxDevSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxEcoSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxLegalComplianceSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxMktSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxReserveSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSaleSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxTeamSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxTotalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"mktIssue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"rsvIssue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"saleIssue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleTime","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"setTokenLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setTokenUnlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_time","type":"uint256"}],"name":"teamIssue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"teamVestingLockDate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"teamVestingSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"teamVestingTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tmVestingBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tmVestingTimer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenIssuedAdv","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenIssuedDev","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenIssuedEco","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenIssuedLegalCompliance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenIssuedMkt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenIssuedRsv","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenIssuedSale","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenIssuedTeam","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenLock","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTokenSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"transferManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]

			var ADDRESS = "0xE8C7A44ab69443180024128F7a79a5B470172685" //컨트랙트 주소			
			var contract = null;
			contract = new web3.eth.Contract(ABI, ADDRESS);
			
			//var art_eth = 0.01+"";
			var eth_key = "";
		//	var total_eth = parseInt(g360.transKRWtoETH(gArtPur.total_price_art)) + parseInt(g360.transKRWtoETH(gArtPur.total_price_image));
			var total_artic = parseInt(gArtPur.total_price_art) + parseInt(gArtPur.total_price_image);
			
			var art_total = 0;
			if ($("#total_sale_price").text() != ""){
				art_total = parseFloat($("#total_sale_price").text().replace("ETH",""));
			}
			var img_total = 0;
			if ($("#total_sale_price2").text() != ""){
				img_total = parseFloat($("#total_sale_price2").text().replace("ETH",""));
			}
			
			var total_artic = ((art_total * 1000000000000000000) + (img_total * 1000000000000000000)) + ""  ;					
			
			eth_key = g360.UserInfo.email + "_" + new Date().getTime();	
			
			contract.methods.transfer("0xD8663c234e5eA9D09b7d9693a6adC1EA7BBF966d",total_artic).send({from: account})
			.then(function(cnt){
				var transactionID = cnt.transactionHash;
				gArtPur.approval_payment(transactionID, "ARTIC", eth_key, cnt);
			})
			.catch(function(err){
				
				$('#art_purchase_popup_wrapper').css('overflow', 'auto');
				$("#pop2").hide();
				console.log(err);
			});
				
		}
		
	},
	
		
	"ethProc": function(){
		
		
		
		// MetaMask 설치여부 확인 (설치되어 있으면 로그인창, 설치되어 있지 않으면 설치 창)
		if (typeof(window.ethereum) !== "undefined"){
			if (!ethereum.isMetaMask) {
				alert(g360.g_lang.Art_Purchase_Alert13);
				return;
			} else {
				$('#art_purchase_popup_wrapper').css('overflow', 'hidden');
				$('#art_purchase_popup_wrapper').scrollTop(0);
				//g360.body_scroll_hide();
				$("#pop2").show();
				getAccount();
			}
		}else{
			// MetaMask 설치 페이지로 리다이렉트
			alert(g360.g_lang.Art_Purchase_Alert14);
			return;
		}
		
			

		async function getAccount(){
			const accounts = await ethereum.request({method: 'eth_requestAccounts'});
			const account = accounts[0];
			
			var web3_provider = web3.currentProvider;
			web3 = new Web3(web3.currentProvider);

			//var art_eth = 0.01+"";
			var eth_key = "";
			var total_eth = parseInt(g360.transKRWtoETH(gArtPur.total_price_art)) + parseInt(g360.transKRWtoETH(gArtPur.total_price_image));
		
			//$.getJSON("/resource/contract/ArtPurchase.json", function(data){
			//$.getJSON("/resource/contract/ArtPurchase_ropsten.json", function(data){
			$.getJSON("/resource/contract/ArtPurchaseMain.json", function(data){
				
				var artbuy_contract = TruffleContract(data);
				artbuy_contract.setProvider(web3_provider);
				artbuy_contract.deployed().then(function(instance){
					
					var art_total = 0;
					if ($("#total_sale_price").text() != ""){
						art_total = parseFloat($("#total_sale_price").text().replace("ETH",""));
					}
					var img_total = 0;
					if ($("#total_sale_price2").text() != ""){
						img_total = parseFloat($("#total_sale_price2").text().replace("ETH",""));
					}
					
					var total_eth = art_total + img_total + "";					
					
					eth_key = g360.UserInfo.email + "_" + new Date().getTime();		
					
					var res = instance.buyArt(eth_key, g360.UserInfo.email, { from: account, value: web3.utils.toWei(total_eth, "ether") }); 
					return res;
					
					
				}).then(function(rdata){
					
					var transactionID = rdata.tx;
					gArtPur.approval_payment(transactionID, "ETH", eth_key, rdata);
					
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
				        
				        
				        sale.merchant_uid = transactionID;
				        sale.pay_method = "ETH";
				        
				        sale.purchase_nickname = gArtPur.userinfo.nickname;
				        
				        sale.delivery_company = "";
				        sale.delivery_code = "";
				        
	
				        sale.delivery_status = "1";  //0 : 결재 대기, 1 : 결재완료/배송준비    , 2: 배송중  , 3 : 배송완료
				        
				       
				        
				       
				        //이미지 정보중에 필요한 부분만 추출한다.
				        for (var k = 0 ; k < g360.cart_list.length; k++){
				        	 var ar = new Array();
				        	 
				        	
				        	var ssp = new Object();
				        	var da = g360.cart_list[k];
				        	ssp.dockey = da.dockey;
				        	ssp.art_artist = da.art_artist;
				        	ssp.art_height = da.art_height;
				        	ssp.art_width = da.art_width;
				        	ssp.art_price = da.art_price;
				        	ssp.art_eth = g360.transKRWtoETH(da.art_price);
				        
				        	ssp.email = da.email;
				        	ssp.art_title = da.art_title;
				        	ssp.art_tag = da.art_tag;
				        	ssp.art_thema = da.art_thema;
				        	ssp.art_date_year = da.art_date_year;
				        	ssp.art_hosu = da.art_hosu;
				        	ssp.shipping_fee = da.shipping_fee;  //배송비 개발되면 수정해야 한다.
				        	ssp.shipping_fee_eth = g360.transKRWtoETH(da.shipping_fee);
				        	ssp.sales_type = da.sales_type;   //작품 구매인지 이미지 구매인지 확인한다.ㄴ
				        	
				        	ssp.shipping_type = da.shipping_type;
				        	ssp.shipping_type_etc = da.shipping_type_etc;
				        	
				        	ssp.eth_key = eth_key;
				        	
				        	if (typeof(da.owner_email) != "undefined" && da.owner_email != ""){
				        		ssp.owner_email = da.owner_email;
				        	}

				        	ar.push(ssp);
				        	
				        
				        	
				        	sale.data = ar;			        
						    sale.pginfo = rdata;  //전자결재 정보를 추가한다.
						  

						        
						    sale.call_from = call_from;
						        
						        			        	
						    var url = g360.root_path + "/art_purchase_ok.mon";
						    var data = JSON.stringify(sale);
						        
						        			        
						        $.ajax({
						        	type : "POST",
						        	datatype : "json",
						        	contentType : "application/json; charset=utf-8",
						        	data : data,
						        	async : false,
						        	url : url,
						        	success : function(data){
						        	
						        		if (data.result == "OK"){
						        			if (gArtPur.call_from == "main"){
						        				
						        				g360.gAlert("Info",g360.g_lang.Art_Purchase_Alert12, "blue", "top")
							        			g360.popup_close("art_purchase_popup");
							        		}else if (gArtPur.call_from == "artProject"){
							        		
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
						        				async : false,
						        				success : function(res){
						        				//	g360.gAlert("Info", "작품명 [" + data.list + "]는 판매완료된 작품입니다.\n결제가 취소되었습니다." , "blue", "top");
						        													  
						        					alert(g360.g_lang.Art_Purchase_Alert10_1 + " [" + data.list + "]" + g360.g_lang.Art_Purchase_Alert10_2);
						        				},
						        				error : function(e){
						        					g360.error_alert();
						        					$('#art_purchase_popup_wrapper').css('overflow', 'auto');
						        					$("#pop2").hide();
						        				}
						        			})
						        			
						        			return false;
						        		}

						        	},
						        	error : function(e){
						        		g360.error_alert();
						        		$('#art_purchase_popup_wrapper').css('overflow', 'auto');
										$("#pop2").hide();
						        	}
						        });         	
				        }			
				        
				        
				        if (gArtPur.call_from == "cart"){
	        				g360.gAlert("Info", g360.g_lang.Art_Purchase_Alert12, "blue", "top")
		        			g360.popup_close("art_purchase_popup");
	        				
	        				if (gArtPur.call_from == "cart"){
	        					$("#btn_gnb_cart").click();
	        				}
			    	}
					
				}).catch(function(err){
					
					$('#art_purchase_popup_wrapper').css('overflow', 'auto');
					$("#pop2").hide();
					console.log(err);
				});
			});
		}
		
		
	},
	
	"approval_payment" : function (tx, pay_type, eth_key, rdata){
		
		//여기서 내부적인 작품 구매 완료 프로세스를 추가한다.
		//alert("성공적으로 처리되었습니다");
		var transactionID = tx;
		
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
	        
	        
	        sale.merchant_uid = transactionID;
	        sale.pay_method = pay_type;
	        
	        sale.purchase_nickname = gArtPur.userinfo.nickname;
	        
	        sale.delivery_company = "";
	        sale.delivery_code = "";
	        

	        sale.delivery_status = "1";  //0 : 결재 대기, 1 : 결재완료/배송준비    , 2: 배송중  , 3 : 배송완료
	        
	       
	        
	       
	        //이미지 정보중에 필요한 부분만 추출한다.
	        for (var k = 0 ; k < g360.cart_list.length; k++){
	        	 var ar = new Array();
	        	 
	        	
	        	var ssp = new Object();
	        	var da = g360.cart_list[k];
	        	ssp.dockey = da.dockey;
	        	ssp.art_artist = da.art_artist;
	        	ssp.art_height = da.art_height;
	        	ssp.art_width = da.art_width;
	        	ssp.art_price = da.art_price;
	        	
	        	if (pay_type == "ARTIC"){
	        		ssp.art_eth = g360.transKRWtoARTIC(da.art_price);
	        		ssp.shipping_fee_eth = g360.transKRWtoARTIC(da.shipping_fee);
	        	}else{
	        		ssp.art_eth = g360.transKRWtoETH(da.art_price);
	        		ssp.shipping_fee_eth = g360.transKRWtoETH(da.shipping_fee);
	        	}
	        	
	        
	        	ssp.email = da.email;
	        	ssp.art_title = da.art_title;
	        	ssp.art_tag = da.art_tag;
	        	ssp.art_thema = da.art_thema;
	        	ssp.art_date_year = da.art_date_year;
	        	ssp.art_hosu = da.art_hosu;
	        	ssp.shipping_fee = da.shipping_fee;  //배송비 개발되면 수정해야 한다.
	        	
	        	ssp.sales_type = da.sales_type;   //작품 구매인지 이미지 구매인지 확인한다.
	        	
	        	ssp.shipping_type = da.shipping_type;
	        	ssp.shipping_type_etc = da.shipping_type_etc;
	        	
	        	ssp.eth_key = eth_key;
	        	
	        	if (typeof(da.owner_email) != "undefined" && da.owner_email != ""){
	        		ssp.owner_email = da.owner_email;
	        	}

	        	ar.push(ssp);
	        	
	        
	        	
	        	sale.data = ar;			        
			    sale.pginfo = rdata;  //전자결재 정보를 추가한다.
			  

			        
			    sale.call_from = call_from;
			        
			        			        	
			    var url = g360.root_path + "/art_purchase_ok.mon";
			    var data = JSON.stringify(sale);
			        
			        			        
			        $.ajax({
			        	type : "POST",
			        	datatype : "json",
			        	contentType : "application/json; charset=utf-8",
			        	data : data,
			        	async : false,
			        	url : url,
			        	success : function(data){
			        	
			        		if (data.result == "OK"){
			        			if (gArtPur.call_from == "main"){
			        				
			        				//g360.gAlert("Info","결제가 완료되었습니다.<br>구매내역은 작품 구입정보 메뉴에서 확인하실수 있습니다.", "blue", "top")
			        				g360.gAlert("Info", g360.g_lang.Art_Purchase_Alert12, "blue", "top")
				        			g360.popup_close("art_purchase_popup");
				        		}else if (gArtPur.call_from == "artProject"){
				        		
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
			        				async : false,
			        				success : function(res){
			        				//	g360.gAlert("Info", "작품명 [" + data.list + "]는 판매완료된 작품입니다.\n결제가 취소되었습니다." , "blue", "top");
			        													  
			        					//alert("작품명 [" + data.list + "]는 판매완료된 작품입니다.\n결제가 취소되었습니다.");
			        					alert(g360.g_lang.Art_Purchase_Alert10_1 + " [" + data.list + "]" + g360.g_lang.Art_Purchase_Alert10_2);
			        				},
			        				error : function(e){
			        					g360.error_alert();
			        					$('#art_purchase_popup_wrapper').css('overflow', 'auto');
			        					$("#pop2").hide();
			        				}
			        			})
			        			
			        			return false;
			        		}

			        	},
			        	error : function(e){
			        		g360.error_alert();
			        		$('#art_purchase_popup_wrapper').css('overflow', 'auto');
							$("#pop2").hide();
			        	}
			        });         	
	        }			
	        
	        
	        if (gArtPur.call_from == "cart"){
	        	//g360.gAlert("Info","결제가 완료되었습니다.<br>구매내역은 작품 구입정보 메뉴에서 확인하실수 있습니다.", "blue", "top")
	        	g360.gAlert("Info", g360.g_lang.Art_Purchase_Alert12, "blue", "top")
    			g360.popup_close("art_purchase_popup");
				
			if (gArtPur.call_from == "cart"){
				$("#btn_gnb_cart").click();
			}
		}
	}
	
	
}


