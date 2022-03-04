
function gClientPurchase(){	
	gCPUR = this;
	
	gCPUR.totalcount = 0;
	gCPUR.perpage = 10;
	gCPUR.cPage = 1;
}

gClientPurchase.prototype = {		

	"init" : function(){
		var _self = this;	
		
		$(".sub_header_tab li").on("click", function(event){

//			//기존 선택된 항목을 모두 지운다.
			$(".sub_header_tab li").each(function(index){
				$(this).removeClass("on");
			});
//			
			var id = event.currentTarget.id;
			$("#" + id).addClass("on");
			
			if (id == "btn_menu_cmypage"){
				gTopMain.navBtnAction('mngMypage_client');
			}else if (id == "btn_menu_caclist"){
				gTopMain.navBtnAction('account_client');
			}else if (id == "btn_menu_cpurchase"){
				gTopMain.navBtnAction('puchase_client');
			}else if (id == "btn_menu_cartproject"){
				gTopMain.navBtnAction('artProject_client');
			}else if (id == "btn_menu_cstorage"){
				gTopMain.navBtnAction('storage_client');
			}
			return false;
			
		});
		
		
		$("#client_purchase_ul li").on("click", function(event){
			$("#client_purchase_ul li").each(function(index){
				$(this).removeClass("on");
			});
			var id = event.currentTarget.id;
			$("#" + id).addClass("on");
		
			if (id == "client_purchase"){
				gCPUR.cPage = 0;
				gCPUR.delivery_list(1);
				
				g360.history_record("client_purchase");
				$('.sub_header_title h2').text($(this).text());
			}else if (id == "client_purchase_cancel"){
				gCPUR.cPage = 0;
				gCPUR.delivery_cancel_list(1);
				
				g360.history_record("client_purchase_cancel");
				$('.sub_header_title h2').text($(this).text());
				
			}else if (id == "client_purchase_image"){
				gCPUR.cPage = 0;
				gCPUR.delivery_image_list(1);
				
				g360.history_record("client_purchase_image");
				$('.sub_header_title h2').text($(this).text());
			}
			
			$('.sub_common').addClass('sub_show');
		});
		
		// 뒤로가기
		$('.sub_header_title').on('click', function(){
			$('.sub_common').removeClass('sub_show');
			$('html').scrollTop(0);
		});
		
		gCPUR.delivery_list(1);
		
		_self.g_lang();
	},
	
	"g_lang" : function(){

		$(".g_lang_Mypage1").html(g360.g_lang.Mypage1);
		$(".g_lang_Mypage2").html(g360.g_lang.Mypage2);
		$(".g_lang_Mypage3").html(g360.g_lang.Mypage3);
		$(".g_lang_Mypage4").html(g360.g_lang.Mypage4);
		$(".g_lang_Mypage5").html(g360.g_lang.Mypage5);
		
		$(".g_lang_Order_Shipping1").html(g360.g_lang.Order_Shipping1);
		$(".g_lang_Order_Shipping2").html(g360.g_lang.Order_Shipping2);
		$(".g_lang_Order_Shipping3").html(g360.g_lang.Order_Shipping3);
		
	},
	
	
	"delivery_image_list" : function(bun){
		gCPUR.cPage = bun;
		var start = (parseInt(gCPUR.perpage) * (parseInt(gCPUR.cPage))) - (parseInt(gCPUR.perpage) - 1);
		start = parseInt(start) -1 ;
		var url = g360.root_path + "/delivery_list_image.mon?start="+start+"&perpage="+gCPUR.perpage;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
			
				gCPUR.totalcount = data[0].totalcount;
				
				var html = "";
				
				html += "<div class='group_section'>";
				html += "	<div class='wrap_group noborder_top bg_white'>";
				html += "		<table class='t_cart'>";
				html += "			<thead>";
				html += "				<tr>";
			//	html += "					<th class='t_cs'>CS처리상태</th>";
			//	html += "					<th class='t_no' style='text-align:center'>주문번호</th>";
				html += "					<th class='t_buy_date' style='width:100px;'>"+g360.g_lang.Date_of_purchase+"</th>";
				html += "					<th class='t_title' style='width:250px;'>"+g360.g_lang.Artwork_Information+"</th>";
				html += "					<th class='t_price' style='text-align:center'>"+g360.g_lang.Purchase_Amount+"</th>";
				html += "					<th class='t_status' style='width:100px;'>"+g360.g_lang.Download+"</th>";
			
				html += "				</tr>";
				html += "			</thead>";
				html += "			<tbody>";
				
				
				for (var i = 1 ; i < data.length ; i++){
					var spl = data[i];
					
					html += "				<tr>";
				//	html += "					<td class='t_cs' style='text-align:center'>취소접수</td>";
				//	html += "					<td class='t_no' style='text-align:center;padding-left:10px; font-size:14px'>"+spl.id.replace("merchant_","")+"</td>";
					var ddd = spl.sortdate.substring(0,4) + "-" + spl.sortdate.substring(4,6) + "-" + spl.sortdate.substring(6,8);
					html += "					<td class='t_buy_date m_view'>"+ddd+"</td>";
					
					html += "					<td class='t_art' style='width:150px;'>";
					
					html += "		<a style='cursor:pointer' onclick=\"g360.showArtDetail('"+spl.dockey+"')\">";
					var url = g360.thumbnail_img_path(spl.email, spl.dockey);
					html += "			<div class='thm_cart' ><img src='"+url+"' /></div>";
					html += "			<ul class='cart_info'>";
					html += "				<li class='i_subject'>"+spl.art_title+"</li>";
					html += "				<li class='i_name'>"+spl.art_artist+"</li>";
					if (spl.art_hosu == null){
						html += "				<li class='i_size'>"+spl.art_height+" x "+spl.art_width+"cm</li>";
					}else{
						html += "				<li class='i_size'>"+spl.art_height+" x "+spl.art_width+"cm("+spl.art_hosu+"호)</li>";
					}
					
				//	html += "				<li class='i_price'>"+g360.comma(g360.setWon(spl.art_price))+"</li>";
					html += "			</ul>";
					html += "		</a>";	
					
					html += "					</td>";				
					
					html += "					<td class='t_price'>"+g360.comma(g360.setWon(spl.art_price))+"</td>";
					
					html += "					<td class='t_status preparing'>";
					if (spl.download_OK == "T"){
						html += " 						<button class='btn btn_gray' style='height:30px' onclick=\"gCPUR.imagedownload('"+spl.dockey+"')\">"+g360.g_lang.Download+"</button>";
					}else{
						html += 						g360.g_lang.Checking_Purchase;
					}
					
					html += "					</td>";
					

					html += "				</tr>";
				}
							
				
				
				html += "			</tbody>";
				html += "		</table>";
				html += "	</div>";
				html += "</div>";
			
				$("#purchase_dis").html(html);		
				
				$("#NAVIGATE").show();
				gCPUR.search_paging(gCPUR.cPage);	
				
				
			},
			error : function(e){
				g360.errro_alert();
			}
		});
	},
	
	
	
	
	"imagedownload" : function(key){
		var url = g360.root_path + "/FileDownload.gu?file=" + key + "&ftype=jpg";
		location.href = url;
	},
	
	
	"delivery_cancel_list" : function(bun){
		gCPUR.cPage = bun;
		var start = (parseInt(gCPUR.perpage) * (parseInt(gCPUR.cPage))) - (parseInt(gCPUR.perpage) - 1);
		start = parseInt(start) -1 ;
		var url = g360.root_path + "/delivery_cancel_list.mon?start="+start+"&perpage="+gCPUR.perpage;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				
				gCPUR.totalcount = data[0].totalcount;
				
				var html = "";
				
				html += "<div class='group_section'>";
				html += "	<div class='wrap_group noborder_top bg_white'>";
				html += "		<table class='t_cart'>";
				html += "			<thead>";
				html += "				<tr>";
			//	html += "					<th class='t_cs'>CS처리상태</th>";
				html += "					<th class='t_no'>"+g360.g_lang.Order_Number+"</th>";
				html += "					<th class='t_fin_date m_view' style='width:100px;'>"+g360.g_lang.Cancellation_Date+"</th>";
				html += "					<th class='t_title' style='width:250px;'>"+g360.g_lang.Artwork_Information+"</th>";
				//html += "					<th class='t_req_date' style='width:110px;'>접수일자</th>";
				html += "					<th class='t_status' style='width:100px;'>"+g360.g_lang.Progress+"</th>";
				html += "				</tr>";
				html += "			</thead>";
				html += "			<tbody>";
				
				
				for (var i = 1 ; i < data.length ; i++){
					var spl = data[i];
					
					html += "				<tr>";
				//	html += "					<td class='t_cs' style='text-align:center'>취소접수</td>";
					html += "					<td class='t_no' style='text-align:center;padding-left:10px; font-size:14px'>"+spl.id.replace("merchant_","")+"</td>";
					
					var cancel_complete_date = (spl.cancel_complete_date == "" ? "" : g360.iso_date_convert(spl.cancel_complete_date));
					html += "					<td class='t_fin_date m_view'>"+cancel_complete_date+"</td>";
					
					html += "					<td class='t_art'>";
					
					html += "		<a style='cursor:pointer' onclick=\"g360.showArtDetail('"+spl.dockey+"')\">";
					var url = g360.thumbnail_img_path(spl.email, spl.dockey);
					html += "			<div class='thm_cart'><img src='"+url+"' /></div>";
					html += "			<ul class='cart_info'>";
					html += "				<li class='i_subject'>"+spl.art_title+"</li>";
					html += "				<li class='i_name'>"+spl.art_artist+"</li>";
					if (spl.art_hosu == null){
						html += "				<li class='i_size'>"+spl.art_height+" x "+spl.art_width+"cm</li>";
					}else{
						html += "				<li class='i_size'>"+spl.art_height+" x "+spl.art_width+"cm("+spl.art_hosu+"호)</li>";
					}
					
					html += "				<li class='i_price'>"+g360.comma(g360.setWon(spl.art_price))+"</li>";
					html += "			</ul>";
					html += "		</a>";	
					
					html += "					</td>";
					//html += "					<td class='t_req_date' style='text-align:center'>"+g360.iso_date_convert(spl.cancel_date)+"</td>";
					
			//		if (spl.cancel_status == "1"){
			//			html += "					<td class='t_status preparing' style='text-align:center'><span>처리중</span></td>";
			//		}else if (spl.cancel_status == "2"){
						html += "					<td class='t_status preparing'><span>"+g360.g_lang.Processing_completed+"</span></td>";
			//		}
						
					html += "				</tr>";
				}
							
				
				
				html += "			</tbody>";
				html += "		</table>";
				html += "	</div>";
				html += "</div>";
			
				$("#purchase_dis").html(html);		
				
				$("#NAVIGATE").show();
				gCPUR.search_paging(gCPUR.cPage);	
				
				
			},
			error : function(e){
				g360.errro_alert();
			}
		});
	},
	
	
	
	"delivery_list" : function(bun){
	
		gCPUR.cPage = bun;
		var start = (parseInt(gCPUR.perpage) * (parseInt(gCPUR.cPage))) - (parseInt(gCPUR.perpage) - 1);
		start = parseInt(start) -1 ;
		
		var url = g360.root_path + "/delivery_list.mon?start="+start+"&perpage="+gCPUR.perpage;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
			
				
				var html = "";
				var s1_count = 0;
				var s2_count = 0;
				var s3_count = 0;
				
				gCPUR.totalcount = data[0].totalcount;
				
				
				html += "<div class='group_section'>";
				html += "	<div class='order_status partner bg_white'>";
				html += "		<ul>";
				html += "			<li>";
				html += "				<span><img src='/img/account/icon-mp-payment.svg' alt='결제대기' />"+g360.g_lang.Waiting_for_payment+"</span>";
				html += "				<strong id='delivery_c0'></strong>";
				html += "			</li>";
				html += "			<li>";
				html += "				<span><img src='/img/account/icon-mp-payment.svg' alt='결제완료' />"+g360.g_lang.Payment_finished+"</span>";
				html += "				<strong id='delivery_c1'></strong>";
				html += "			</li>";
				html += "			<li>";
				html += "				<span><img src='/img/account/icon-mp-delivery-prep.svg' alt='배송준비' />"+g360.g_lang.Ready_to_ship+"</span>";
				html += "				<strong id='delivery_c2'></strong>";
				html += "			</li>";
				html += "			<li>";
				html += "				<span><img src='/img/account/icon-mp-shipped.svg' alt='배송중' />"+g360.g_lang.Shipping+"</span>";
				html += "				<strong id='delivery_c3'></strong>";
				html += "			</li>";
				html += "			<li>";
				html += "				<span><img src='/img/account/icon-mp-delivery-comp.svg' alt='배송완료' />"+g360.g_lang.Delivery_completed+"</span>";
				html += "				<strong id='delivery_c4'></strong>";
				html += "			</li>";
				html += "			<li>";
				html += "				<dl>";
				html += "					<dt>"+g360.g_lang.Cancel+"</dt>";
				html += "					<dd id='delivery_c5'>0"+g360.g_lang.Artist_Mypage7+"</dd>";
				html += "				</dl>";
				html += "				<dl>";
				html += "					<dt>"+g360.g_lang.Return+"</dt>";
				html += "					<dd id='delivery_c6'>0"+g360.g_lang.Artist_Mypage7+"</dd>";
				html += "				</dl>";
				html += "			</li>";
				html += "		</ul>";
				html += "	</div>";
				html += "	<div class='wrap_group cart noborder_top bg_white'>";
				html += "		<table class='t_cart'>";
				html += "			<thead>";
				html += "				<tr>";
				html += "					<th class='t_date' style='font-size:14px'>"+g360.g_lang.Mypage11+"</th>";
				html += "					<th class='t_art' style='font-size:14px; width:180px; text-align:center'>"+g360.g_lang.Mypage12+"</th>";
				html += "					<th class='t_price' style='font-size:14px'>"+g360.g_lang.Mypage13+"</th>";
				html += "					<th class='t_delivery_charge' style='font-size:14px'>"+g360.g_lang.Shipping_Fee+"</th>";
				html += "					<th class='t_status' style='font-size:14px'>"+g360.g_lang.Mypage6+"</th>";
				html += "				</tr>";
				html += "			</thead>";
				html += "			<tbody id='delivery_data_list'>";
				
							
				for (var i = 1 ; i < data.length ; i++){
					var spl = data[i];
					
					html += "<tr>";
					html += "	<td class='t_date m_view' style='width:150px'>";
					html += "		<div>"+g360.iso_date_convert(spl.date)+"</div>";
					
					
					if (spl.approval_type == "radio5" || spl.approval_type == "radio6"){
						//ETH로 구매한 경우
						html += "		<a style='cursor:pointer; ' title='배송 진행 상태 상세보기' onclick=\"g360.openinvoice_new('"+spl.delivery_code+"','"+spl.code+"')\">"+spl.id.substring(0,15)+"...</a>";
						
					}else{
						html += "		<a style='cursor:pointer;' title='배송 진행 상태 상세보기' onclick=\"g360.openinvoice_new('"+spl.delivery_code+"','"+spl.code+"')\">"+spl.id.replace("merchant_","")+"</a>";
						
					}
						
				
					
					if (spl.approval_type == "radio5" ||  spl.approval_type == "radio6"){
						//ETH로 결져한 경우
						var tx = g360.ethscan(spl.id);
						html += "		<br><a style='cursor:pointer; color:blue' onclick=\"window.open('"+tx+"')\" title='Contract Address'>[Contract Address]</a>";
					}else{
						if (spl.approval_type != "radio4" && spl.approval_type != "radio3"){
							
							html += "		<a style='cursor:pointer' onclick=\"gCPUR.popup_receipt('"+spl.receipt_url+"')\" title='영수증출력'>["+g360.g_lang.Receipt_Print+"]</a>";
						}
					}
					
					
					
					html += "	</td>";
					html += "	<td class='t_art'>";
					html += "		<a style='cursor:pointer' onclick=\"g360.showArtDetail('"+spl.dockey+"')\">";
					var url = g360.thumbnail_img_path(spl.email, spl.dockey);
					html += "			<div class='thm_cart'><img src='"+url+"' /></div>";
					html += "			<ul class='cart_info'>";
					html += "				<li class='i_subject'>"+spl.art_title+"</li>";
					html += "				<li class='i_name'>"+spl.art_artist+"</li>";
					if (spl.art_hosu == null){
						html += "				<li class='i_size'>"+spl.art_height+" x "+spl.art_width+"cm</li>";
					}else{
						html += "				<li class='i_size'>"+spl.art_height+" x "+spl.art_width+"cm("+spl.art_hosu+"호)</li>";
					}
					
					html += "				<li class='i_price'>"+g360.comma(g360.setWon(spl.art_price))+"</li>";
					html += "			</ul>";
					html += "		</a>";	
					html += "	</td>";
					
					
					if (spl.approval_type == "radio5" || spl.approval_type == "radio6"){
						html += "	<td class='t_price'>"+spl.art_eth+ spl.pay_method+"</td>";
					}else{
						html += "	<td class='t_price'>"+g360.comma(g360.setWon(spl.art_price))+"</td>";
					}
					
					
					if (spl.sales_type == "image"){
						html += "	<td class='t_delivery_charge'>"+g360.g_lang.Image_Purchase+"</td>";
					}else{
						if (spl.approval_type == "radio5" || spl.approval_type == "radio6"){
							//ETH는 전체 비용을 삼품 금액에 표시해서 배송비를 별도로 표시하지 않는다.
							html += "	<td class='t_delivery_charge'>"+spl.shipping_fee_eth+ spl.pay_method + "</td>";
						}else{
							html += "	<td class='t_delivery_charge'>"+g360.comma(g360.setWon(spl.shipping_fee))+"</td>";
						}
						
					}
					
					
					if (spl.sales_type == "image"){
						if (spl.approval_type == "radio4"){
							if (spl.status_req == "Y"){
								html += "	<td class='t_status preparing'><span>입금 확인중</span></td>";
							
							}else if (spl.status == "0"){
							//	html += "	<td class='t_status preparing'><span>입금확인중</span></td>";
								html += "	<td class='t_status preparing' style='cursor:pointer;padding-left:5px' >";
								html += "		<button class='btn btn_gray' style='height:30px' onclick=\"gCPUR.bankinfo2('"+spl.dockey+"', '" + spl.sales_type + "')\">"+g360.g_lang.Deposit+"</button>";
								html += "	</td>";
							
							}else if (spl.status == "1"){
								html += "	<td class='t_status preparing'><span>"+g360.g_lang.Purchase_Complete+"</span></td>";
							}
						}else{
							html += "	<td class='t_status preparing'><span>"+g360.g_lang.Purchase_Complete+"</span></td>";
						}
						
					}else{
						if (spl.approval_type == "radio3"){
							//가상계좌일 경우
							
							
							if (spl.status_req == "Y"){
								html += "	<td class='t_status preparing'><span>"+g360.g_lang.Confirmation_of_payment+"</span></td>";
							}else if (spl.status == "0"){
								var bank = spl.vbank_holder + "-spl-" + spl.vbank_num + "-spl-" + spl.vbank_date + "-spl-" + spl.dockey;
								html += "	<td class='t_status preparing' style='cursor:pointer;padding-left:5px' >";
								html += "		<button class='btn btn_gray' id='btn_"+spl.id+"' style='height:30px' onclick=\"gCPUR.bankinfo('"+bank+"')\">"+g360.g_lang.Virtual_account_deposit+"</button>";
								html += "	</td>";
							}else if (spl.status == "3"){
								html += "	<td class='t_status preparing' style='cursor:pointer;' onclick=\"gCPUR.lastOK('"+spl.dockey+"')\">";
								html += "		<button class='btn btn_gray'>"+g360.g_lang.Purchase_Confirmation+"</button>";
								html += "	</td>";
							}else if (spl.status == "2"){
								html += "	<td class='t_status preparing'><span>"+g360.g_lang.Shipping+"</span></td>";
							}else if (spl.status == "4"){
								html += "	<td class='t_status preparing'><span>"+g360.g_lang.Final_purchase_completed+"</span></td>";
							}else if (spl.status == "5"){
								html += "	<td class='t_status preparing'><span style='color:red'>"+g360.g_lang.Final_purchase_completed+"</span></td>";
							}else if (spl.status == "1"){
								html += "	<td class='t_status preparing' style='cursor:pointer;' onclick=\"gCPUR.delivery_cancel('"+spl.dockey+"','radio3')\">";
								html += "		<button class='btn btn_gray'>"+g360.g_lang.Cancel_purchase+"</button>";
								html += "	</td>";
							}
							


						}else if (spl.approval_type == "radio4"){
							//무통장 입금인 경우
							
							if (spl.status_req == "Y"){
								html += "	<td class='t_status preparing'><span>"+g360.g_lang.Confirmation_of_payment+"</span></td>";
							}else if (spl.status == "0"){
								var bank = spl.id;
								html += "	<td class='t_status preparing' style='cursor:pointer;padding-left:5px' >";
								html += "		<button class='btn btn_gray' style='height:30px' onclick=\"gCPUR.bankinfo2('"+spl.dockey+"')\">"+g360.g_lang.Deposit+"</button>";
								html += "	</td>";
							}else if (spl.status == "3"){
								html += "	<td class='t_status preparing' style='cursor:pointer;' onclick=\"gCPUR.lastOK('"+spl.dockey+"')\">";
								html += "		<button class='btn btn_gray'>"+g360.g_lang.Purchase_Confirmation+"</button>";
								html += "	</td>";
							}else if (spl.status == "2"){
								html += "	<td class='t_status preparing'><span>"+g360.g_lang.Shipping+"</span></td>";
							}else if (spl.status == "4"){
								html += "	<td class='t_status preparing'><span>"+g360.g_lang.Final_purchase_completed+"</span></td>";
							}else if (spl.status == "5"){
								html += "	<td class='t_status preparing'><span style='color:red'>"+g360.g_lang.Final_purchase_completed+"</span></td>";
							}else if (spl.status == "1"){
								html += "	<td class='t_status preparing' style='cursor:pointer;' onclick=\"gCPUR.delivery_cancel('"+spl.dockey+"','radio4')\">";
								html += "		<button class='btn btn_gray'>"+g360.g_lang.Purchase_Cancel+"</button>";
								html += "	</td>";
							}

						}else{
							if (spl.status == "3"){
								html += "	<td class='t_status preparing' style='cursor:pointer;' onclick=\"gCPUR.lastOK('"+spl.dockey+"')\">";
								html += "		<button class='btn btn_gray'>"+g360.g_lang.Purchase_Confirmation+"</button>";
								html += "	</td>";
							}else if (spl.status == "2"){
								html += "	<td class='t_status preparing'><span>"+g360.g_lang.Shipping+"</span></td>";
							}else if (spl.status == "4"){
								html += "	<td class='t_status preparing'><span>"+g360.g_lang.Final_purchase_completed+"</span></td>";
							}else if (spl.status == "5"){
								html += "	<td class='t_status preparing'><span style='color:red'>"+g360.g_lang.Final_purchase_completed+"</span></td>";
							}else if (spl.status == "1"){
								html += "	<td class='t_status preparing' style='cursor:pointer;' onclick=\"gCPUR.delivery_cancel('"+spl.dockey+"', 'radio1')\">";
								html += "		<button class='btn btn_gray'  style='height:30px'>"+g360.g_lang.Preparing+"</button>";
								html += "	</td>";
							}
						}
					}
					
					
					
					
					
					html += "</tr>";
				}
						
				
				html += "			</tbody>";
				html += "		</table>";
				html += "	</div>";
				html += "</div>";
				
					

				
				
				$("#purchase_dis").html(html);
				
				
				
				$("#NAVIGATE").show();
				gCPUR.search_paging(gCPUR.cPage);
				
				gCPUR.delivery_list_count();
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
		
	"bankinfo" : function(opt){
		//가상계좌 취소하는 경우
	
		
	//	gPAProjectlist.selected_id = opt; //현재 선댁된 값을 송장등록 팝업창 submit시 활용하기 우해서 세팅한다.
		
		$("#xinvoice_popup2").show();
		
		var html = "";
		
		var spl = opt.split("-spl-");
	
		html += "<div class='set_info' style=''>";
		html += "	<dl>";
		html += "		<dt style='font-width:bold; width:500px' >"+g360.g_lang.Virtual_Account+" : "+spl[1]+"</dt>";

		html += "	</dl>";
		html += "		<dt style='font-width:bold; width:500px' >"+g360.g_lang.Bank_Branch+" : "+spl[0]+"</dt>";

		html += "	<dl>";
		html += "		<dt style='font-width:bold; width:500px' >"+g360.g_lang.End_Date+" : "+spl[2].substring(0,10)+"</dt>";

		html += "	</dl>";
		
		html += "	<dl>";
		html += "		<dt style='font-width:bold; width:500px' >"+g360.g_lang.Bank_Explains+"</dt>";

		html += "	</dl>";
		html += "</div>";
		html += "<div class='bottom_area' style='float:left; margin-left:10px; margin-bottom:0px'>";
		
		html += "	<button class='btn btn_violet' id='invoice_submit2' style='width:120px; font-size:small;'>"+g360.g_lang.Confirm_Request+"</button>";
		html += "	<button class='btn btn_violet' id='invoice_submit22' style='width:90px; font-size:small;'>"+g360.g_lang.Purchase_Cancel+"</button>";
		html += "	<button class='btn btn_gray' id='invoice_cancelx2' style='width:80px; font-size:small;'>"+g360.g_lang.Close+"</button>";
		html += "</div>";
		
		
		$("#xinvoice_popup2").html(html);
		
		
		
		g360.body_scroll_hide();
		
		dialog = $("#xinvoice_popup2" ).dialog({
		      autoOpen: false,
		      height: 260,
		   //   position: { my: "center-100 bottom-40", at: "center center" },
		      width: 400,
		      stack : true,
		      dialogClass: "no-titlebar",
		      modal: true,
		      resizable: false,
		      zIndex: 100000
		    });
		
		
		
		dialog.dialog( "open" );
		
		
		$("#xinvoice_popup2").css("height", "250px");
		$("#xinvoice_popup2").css("background", "white");
		
		
		
		$("#invoice_submit22").on("click", function(event){
		
			
			//기존 결재 완료된 항목을 취소한다.
			var url = g360.root_path + "/sales_cancel.mon?id=" + spl[3];    	
			url += "&" + new Date().getTime();
			$.ajax({
				type : "GET",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(res){
					
					var url = g360.root_path + "/delivery_cancel.mon?key=" + spl[3] + "&opt=radio3";
					url += "&" + new Date().getTime();
					$.ajax({
						type : "GET",
						dataType : "json",			
						contentType : "application/json; charset=utf-8",
						url : url,
						success : function(data){
							if (data.result == "OK"){
								$("#invoice_cancelx2").click();
								gCPUR.delivery_list(gCPUR.cPage);
								
							}else{
								g360.error_alert();
							}
							
						},
						error : function(e){
							g360.error_alert();
						}
					})
					
					
				},
				error : function(e){
					g360.error_alert();
				}
			})
			
			
			
			
		
		});
		
		$("#invoice_submit2").on("click", function(event){
			
			var url = g360.root_path + "/vbank_payment_request.mon?id="+spl[3];
			url += "&" + new Date().getTime();
			$.ajax({
				type : "GET",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(data){
					if (data.result == "OK"){
						gCPUR.delivery_list(gCPUR.cPage);
					}else{
						g360.error_alert();
					}			
					$("#invoice_cancelx2").click();
				},
				error : function(e){
					g360.error_alert();
				}
			})
			
//			var code = $("#t_code").val();
//			var code_text =  $("#t_code option:selected").text();
//			var num = $("#invoice_num").val();
//			
//			gPAProjectlist.invoice_save(code, code_text, num);
		});
		
		
		$("#invoice_cancelx2").on("click", function(event){
			g360.body_scroll_show();
			dialog.dialog( "close" );
		});
	
		
	//	gPAProjectlist.load_companylist();
		
	},
	
	
	
	
	
	"bankinfo2" : function(opt, sales_type){
		//	무통장 입금 관련된 팝업창
		
			$("#xinvoice_popup2").show();
			
			var html = "";
			
		//	var spl = opt.split("-spl-");
			
		
			html += "<div class='set_info' style=''>";
			html += "	<dl>";
			html += "		<dt style='font-width:bold; width:500px' >"+g360.g_lang.Bank_3+" : 기업은행 (625-032889-04-010) </dt>";

			html += "	</dl>";
			html += "		<dt style='font-width:bold; width:500px' >"+g360.g_lang.Bank_6+" : 갤러리360(주)</dt>";

			html += "	<dl>";
	//		html += "		<dt style='font-width:bold; width:500px' >종료 날짜 : "+spl[2].substring(0,10)+"</dt>";

			html += "	</dl>";
			
			html += "	<dl>";
			html += "		<dt style='font-weight:bold; width:500px; font-size:small;' >"+g360.g_lang.Bank_5+"</dt>";

			html += "	</dl>";
			html += "</div>";
			html += "<div class='bottom_area' style='float:left; margin-left:10px; margin-bottom:0px;'>";
			
			html += "	<button class='btn btn_violet' id='invoice_submit2' style='width:120px; font-size:small;'>"+g360.g_lang.Confirm_Request+"</button>";
			html += "	<button class='btn btn_violet' id='invoice_submit22' style='width:90px; font-size:small;'>"+g360.g_lang.Purchase_Cancel+"</button>";
			html += "	<button class='btn btn_gray' id='invoice_cancelx2' style='width:80px; font-size:small;'>"+g360.g_lang.Close+"</button>";
			html += "</div>";
			
			
			$("#xinvoice_popup2").html(html);
			
			
			
			g360.body_scroll_hide();
			
			dialog = $("#xinvoice_popup2" ).dialog({
			      autoOpen: false,
			      height: 260,
			   //   position: { my: "center-100 bottom-40", at: "center center" },
			      width: 400,
			      stack : true,
			      dialogClass: "no-titlebar",
			      modal: true,
			      resizable: false,
			      zIndex: 100000
			    });
			
			
			
			dialog.dialog( "open" );
			
			
			$("#xinvoice_popup2").css("height", "250px");
			$("#xinvoice_popup2").css("background", "white");
			
			
			$("#invoice_submit22").on("click", function(event){
				
				var url = g360.root_path + "/delivery_cancel.mon?key=" + opt + "&opt=radio4&sales_type="+sales_type;
				url += "&" + new Date().getTime();
				$.ajax({
					type : "GET",
					dataType : "json",			
					contentType : "application/json; charset=utf-8",
					url : url,
					success : function(data){
						if (data.result == "OK"){
							$("#invoice_cancelx2").click();
							gCPUR.delivery_list(gCPUR.cPage);
							
						}else{
							g360.error_alert();
						}
						
					},
					error : function(e){
						g360.error_alert();
					}
				})
				
			});
			
			$("#invoice_submit2").on("click", function(event){
				
				var url = g360.root_path + "/vbank_payment_request2.mon?id="+opt;
				url += "&" + new Date().getTime();
				$.ajax({
					type : "GET",
					dataType : "json",
					contentType : "application/json; charset=utf-8",
					url : url,
					success : function(data){
						if (data.result == "OK"){
							gCPUR.delivery_list(gCPUR.cPage);
						}else{
							g360.error_alert();
						}			
						$("#invoice_cancelx2").click();
					},
					error : function(e){
						g360.error_alert();
					}
				})
				
//				var code = $("#t_code").val();
//				var code_text =  $("#t_code option:selected").text();
//				var num = $("#invoice_num").val();
//				
//				gPAProjectlist.invoice_save(code, code_text, num);
			});
			
			
			$("#invoice_cancelx2").on("click", function(event){
				g360.body_scroll_show();
				dialog.dialog( "close" );
			});
		
			
		//	gPAProjectlist.load_companylist();
			
		},
	
	
	
	
	
	
	
	
	
	"delivery_list_count" : function(){
	
		var url = g360.root_path + "/delivery_list_count.mon";
		url += "?" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				
				if (data.delivery_status4 == 0){
					$("#delivery_c1").text(data.totalcount);
				}else{
					$("#delivery_c1").text(data.totalcount);
					$("#delivery_c5").text(data.delivery_status4 + g360.g_lang.Artist_Mypage7);
				}
			
				
				$("#delivery_c2").text(data.delivery_status1);
				$("#delivery_c3").text(data.delivery_status2);
				
				
				$("#delivery_c4").text(data.delivery_status3);
				$("#delivery_c0").text(data.delivery_status0);
				
							
			},
			error : function(e){
				g360.error_alert();
			}
		})
		
	},
	
	
	
	"lastOK" : function(key){
				
		$.confirm({
			title : " ",
			content : g360.g_lang.LastOK_Alert,
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
						var url = g360.root_path + "/delivery_last_ok.mon?key=" + key;
						url += "&" + new Date().getTime();
						$.ajax({
							type : "GET",
							dataType : "json",			
							contentType : "application/json; charset=utf-8",
							url : url,
							success : function(data){
								if (data.result == "OK"){
									gCPUR.delivery_list(gCPUR.cPage);
								}else{
									g360.error_alert();
								}
								
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

	
	
	
	"delivery_cancel" : function(key, opt){
		$("#xinvoice_popup2").show();
		
		var html = "";
		
		
	//	var spl = opt.split("-spl-");
	
		html += "<div class='set_info' style=''>";
		html += "	<dl>";
		html += "		<dt style='font-width:bold; width:500px;font-size: 14px;' >"+g360.g_lang.PurchaseCancel_Alert+"</dt>";

		html += "	</dl>";
		html += "</div>";
		html += "<div class='bottom_area' style='float:left; margin-left:50px; margin-bottom:0px'>";
	
		html += "	<button class='btn btn_violet' id='invoice_submit2' style='width:100px'>"+g360.g_lang.Cancel2+"</button>";
		html += "	<button class='btn btn_gray' id='invoice_cancelx2' style='width:80px'>"+g360.g_lang.Close+"</button>";
		html += "</div>";
		
		
		$("#xinvoice_popup2").html(html);
		
		
		
		g360.body_scroll_hide();
		
		dialog = $("#xinvoice_popup2" ).dialog({
		      autoOpen: false,
		      height: 150,
		   //   position: { my: "center-100 bottom-40", at: "center center" },
		      width: 350,
		      stack : true,
		      dialogClass: "no-titlebar",
		      modal: true,
		      resizable: false,
		      zIndex: 100000
		    });
		
		
		
		dialog.dialog( "open" );
		
		
		//$("#xinvoice_popup2").css("height", "210px");
		$("#xinvoice_popup2").css("background", "white");
		
		$("#invoice_submit2").on("click", function(event){
			
			if (opt == "radio4"){
				//가상계좌를 취소하는 경우
				var url = g360.root_path + "/delivery_cancel.mon?key=" + key + "&opt="+opt;
				url += "&" + new Date().getTime();
				$.ajax({
					type : "GET",
					dataType : "json",			
					contentType : "application/json; charset=utf-8",
					url : url,
					success : function(data){
						if (data.result == "OK"){
							$("#invoice_cancelx2").click();
							gCPUR.delivery_list(gCPUR.cPage);
							
						}else{
							g360.error_alert();
						}
						
					},
					error : function(e){
						g360.error_alert();
					}
				})
			}else{
				
				//기존 결재 완료된 항목을 취소한다.
    			var url = g360.root_path + "/sales_cancel.mon?id=" + key;    	
    			url += "&" + new Date().getTime();
    			$.ajax({
    				type : "GET",
    				dataType : "json",
    				contentType : "application/json; charset=utf-8",
    				url : url,
    				success : function(res){
    					
    					var url = g360.root_path + "/delivery_cancel.mon?key=" + key + "&opt="+opt;
    					url += "&" + new Date().getTime();
    					$.ajax({
    						type : "GET",
    						dataType : "json",			
    						contentType : "application/json; charset=utf-8",
    						url : url,
    						success : function(data){
    							if (data.result == "OK"){
    								$("#invoice_cancelx2").click();
    								gCPUR.delivery_list(gCPUR.cPage);
    								
    							}else{
    								g360.error_alert();
    							}
    							
    						},
    						error : function(e){
    							g360.error_alert();
    						}
    					})
    					
    				},
    				error : function(e){
    					g360.error_alert();
    				}
    			})
				
				
			
				
			}
			
		});
		
		
		$("#invoice_cancelx2").on("click", function(event){
			g360.body_scroll_show();
			dialog.dialog( "close" );
		});
	},
	
	
	"popup_receipt" : function(_url){		
		g360.open_subwin(_url , '500', '600', 'yes', '', 'yes')
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
/////////////////////////// 리스트 페이징 시작 //////////////////////////////////////////////////////////////
	"search_paging" : function(page){
		var alldocuments = gCPUR.totalcount;
		if (alldocuments % gCPUR.perpage > 0 & alldocuments % gCPUR.perpage < gCPUR.perpage/2 ){
			allPage = Number(Math.round(alldocuments/gCPUR.perpage)) + 1;
		}else{
			allPage = Number(Math.round(alldocuments/gCPUR.perpage));
		}	

		gCPUR.search_navigator(page);
	},
	
	"search_navigator" : function(page){
		var nav_cpage = page;

		var alldocuments = gCPUR.totalcount;
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
				nav[0] = '<li class="p_prev"><a href="#" class="xico" onclick="javascript:gPAProject.gotoPage(' + ((((cFrame-1)*10)-1)*gCPUR.perpage+1) + ',' + ((cFrame-1)*10) + ');">이전</a></li>';
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
						nav[pIndex] = "<li><a href=# onclick='gPAProject.gotoPage("+ (((i-1) * gCPUR.perpage) + 1 ) + ", "+ i + ", this)'>" + i + "</a></li>";
						
					}else{
						if (i%10 == '1' ){
							nav[pIndex] = "<li><a href=# onclick='gPAProject.gotoPage("+ (((i-1) * gCPUR.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";	
						}else{
							nav[pIndex] = "<li><a href=# onclick='gPAProject.gotoPage("+ (((i-1) * gCPUR.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";
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
				nav[nav.length] = '<li class="p_next"><a href="#" class="xico" onclick="javascript:gPAProject.gotoPage(' + ((cFrame*gCPUR.perpage*10) + 1) + ',' + ((cFrame*10)+1) + ');">다음</a></li>';
			}
					
	          var navHTML = "";

			if (cFrame == 1 ){
				navHTML = '';
	          }else{
				navHTML = '<li class="p_first"><a href="#" class="xico" onclick="javascript:gPAProject.gotoPage(1,1);">처음</a></li>';
	          }		    
			for( var i = 0 ; i < nav.length ; i++){	
	          	navHTML = navHTML + nav[i];
			}
					
			if (cFrame < allFrame){
				navHTML = navHTML + '<li class="p_last"><a href="#" class="xico" onclick="javascript:gPAProject.gotoPage(' + ((allPage - 1)*gCPUR.perpage + 1) +','+ allPage +')">마지막</a></li>';
	        }else{
				navHTML = navHTML;
	        }
	      
			$("#NAVIGATE").html('<div class="paging"><ul>' + navHTML + '</ul></div>');
		}
	},
	
	"gotoPage" : function(Index, PageNum, obj){
		var nav_cpage = PageNum;
		oldpage = nav_cpage;
		
		gCPUR.load_project_list(PageNum);
	}
	
	
	
	
	
	
	
	
	
	


	
}

