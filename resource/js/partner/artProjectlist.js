
function gPartnerArtProjectlist(){	
	gPAProjectlist = this;
	gPAProjectlist.start = 0;
	gPAProjectlist.perpage = 20;
	gPAProjectlist.tab = "all";
	gPAProjectlist.isloading_complete = false;
	gPAProjectlist.overloading = false;
	
	gPAProjectlist.cPage = 1;
	gPAProjectlist.totalcount = 0;
	
	gPAProjectlist.selected_id = "";
	
	
//	gPAProjectlist.mansony_init();
}

gPartnerArtProjectlist.prototype = {		

	"init" : function(){
		var _self = this;	
		
		_self.infiniteScroll();
		
		
		$(".sub_header_tab li").on("click", function(event){

//			//기존 선택된 항목을 모두 지운다.
			$(".sub_header_tab li").each(function(index){
				$(this).removeClass("on");
			});
			
			var id = event.currentTarget.id;
			$("#" + id).addClass("on");
			
			g360.history_record(id);
			
			if (id == "btn_menu_mypage"){
				gTopMain.navBtnAction('mypage');
			}else if (id == "btn_menu_profile"){
				gTopMain.navBtnAction('profile');
			}else if (id == "btn_menu_account"){
				gTopMain.navBtnAction('account');
			}else if (id == "btn_menu_artproject"){
				gTopMain.navBtnAction('project');
			}else if (id == "btn_menu_artprojectlist"){
				gTopMain.navBtnAction('artProjectlist');
			}else if (id == "btn_menu_vrgallery"){
				gTopMain.navBtnAction('partner_vrgallery');
			}
			return false;
			
			
		});
		
		this.g_lang();
	},
	
	"g_lang" : function(){
		
		$(".g_lang_Mypage1").html(g360.g_lang.Mypage1);
		$(".g_lang_Artist_Mypage1").html(g360.g_lang.Artist_Mypage1);
		$(".g_lang_Artist_Mypage2").html(g360.g_lang.Artist_Mypage2);
		$(".g_lang_Artist_Mypage3").html(g360.g_lang.Artist_Mypage3);
		$(".g_lang_Artist_Mypage4").html(g360.g_lang.Artist_Mypage4);
		$(".g_lang_Artist_Mypage5").html(g360.g_lang.Artist_Mypage5);

		$(".g_lang_ArtList1").html(g360.g_lang.ArtList1);
		$(".g_lang_ArtList2").html(g360.g_lang.ArtList2);
		$(".g_lang_ArtList3").html(g360.g_lang.ArtList3);
		$(".g_lang_ArtList4").html(g360.g_lang.ArtList4);
		$(".g_lang_ArtList5").html(g360.g_lang.ArtList5);
		$(".g_lang_ArtList6").html(g360.g_lang.ArtList6);
		
	},
	
	"artInit" : function(){
		
		$(".group_header.type1 ul li").on("click", function(event){
			
			$(".group_header.type1 ul li").each(function(event){
				$(this).removeClass("on");
			});
			
			var id = event.currentTarget.id;
			$("#" + id).addClass("on");
					
			gPAProjectlist.load_data(id);
			
		});
		
		
//		var percent = 90;
//		var window_scrolled;
//
//		$(window).scroll(function() {
//			if ($("#artproject_list_div").length > 0){
//				
//			    window_scrolled = ($(document).height()/100)*90;
//
//			    if($(window).scrollTop() + $(window).height() >= window_scrolled) {
//			    	console.log(window_scrolled);
//			    //	gPAProjectlist.isloading_complete = false;
//			    	if (!gPAProjectlist.overloading){
//			    		gPAProjectlist.load_add_art();
//			    	}
//			    	
//			    }
//			}
//
//		});
		
		
		gPAProjectlist.load_count_summary();
		
		
//		 $(window).on('scroll', function() {
//			if ($("#artproject_list_div").length > 0){//
//				var scroll =   window.scrollY  || window.pageYOffset || document.documentElement.scrollTop;
//			  //if (gPAProjectlist.start != 0){
//				var ct = parseInt(document.body.offsetHeight);
//				console.log(ct * 0.9);
//				  console.log((parseInt(window.innerHeight) + parseInt(scroll)));
//				  console.log(parseInt(document.body.offsetHeight)+1000);
//				//  if ((window.innerHeight + scroll) >= (parseInt(document.body.offsetHeight)-100)) {
//				  if ((window.innerHeight + scroll) >= ct) {
//				//	   	alert('end reached');
//					   	gPAProjectlist.load_add_art();
//					  }
//			//  }
//			  
//			}		  
//		 })

		
		
	},
	
	"load_count_summary" : function(){
		var url = g360.root_path + "/load_count_summary.mon";
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "json/applciation; charset=utf-8",
			url : url,
			cache : false,
			success : function(data){
				
				
				$("#artproject_all_cnt").text(data.cnt0);
				$("#artproject_sale_wait_cnt").text(data.cnt1);
				$("#artproject_sale_cnt").text(data.cnt2);
				$("#artproject_soldout_cnt").text(data.cnt3);
				$("#artproject_delivery_image_cnt").text(data.cnt5);

			
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	"load_data" : function(id){
		gPAProjectlist.start = 0;
		gPAProjectlist.isloading_complete = false;
		
		g360.history_record(id);
		
		if (id == "artproject_all"){
			gPAProjectlist.tab = "all";	
		}else if (id == "artproject_sale_wait"){
			gPAProjectlist.tab = "0";   //판메중인 작품만 보기
		}else if (id == "artproject_sale"){
			gPAProjectlist.tab = "2";   //판메중인 작품만 보기
		}else if (id == "artproject_soldout"){
			gPAProjectlist.tab = "3";   //판매 완료 작품만 보기
		}else if (id == "artproject_delivery"){
			gPAProjectlist.tab = "4";    //파트너가 보는 배송정보 
		}else if (id == "artproject_delivery_image"){
			gPAProjectlist.tab = "5";    //파트너가 보는 배송정보 
		}
		
				
		if (gPAProjectlist.tab == "4"){
			gPAProjectlist.cPage = 1;
			gPAProjectlist.load_art_delivery();
			
			
			
			$("#NAVIGATE").show();
			$("#art_delivery_dis").show();
			$("#gallery_columns").hide();
			
		}else if (gPAProjectlist.tab == "5"){
			//이미지 판매 내역
			gPAProjectlist.cPage = 1;
			gPAProjectlist.load_image_delivery();
						
			
			$("#NAVIGATE").show();
			$("#art_delivery_dis").show();
			$("#gallery_columns").hide();
				
			
		}else{
			gPAProjectlist.cPage = 1;
			
			$("#NAVIGATE").hide();
			$("#art_delivery_dis").hide();
			
			$("#gallery_columns").show();
			
			$('#gallery_columns').masonry('remove', $('#gallery_columns').find('.grid-item'));
			gPAProjectlist.load_art_list(gPAProjectlist.start, "init");
		}
		

		
		
	},
	
	"load_art_delivery_count" : function(){
		var url = g360.root_path + "/delivery_list_count_partner.mon";
		url += "?" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
			
			//	if (data.delivery_status6 == 0){
					$("#xdel_1").text(data.totalcount);
			//	}else{
			//		$("#xdel_1").text(data.totalcount + data.delivery_status6);   //data.delivery_status6 취소된거
			//	}
				
				$("#xdel_2").text(data.delivery_status1);
				$("#xdel_3").text(data.delivery_status2);								
				$("#xdel_4").text(data.delivery_status3);
				$("#xdel_5").text(data.delivery_status4);
				$("#xdel_6").text(data.delivery_status5 + "(" + data.delivery_status6 + ")");
				
							
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	
	
	
	"load_image_delivery" : function(){
		var option = gPAProjectlist.tab;
		
		var start = (parseInt(gPAProjectlist.perpage) * (parseInt(gPAProjectlist.cPage))) - (parseInt(gPAProjectlist.perpage) - 1);
		start = parseInt(start) -1 ;
		
	
		var url = g360.root_path + "/delivery_list_partner_image.mon?start="+start+"&perpage="+gPAProjectlist.perpage;
		url += "&" + new Date().getTime();
		

		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				

				gPAProjectlist.totalcount = data[0].totalcount;
				
				var html = "";
				
				html += "<div class='group_section'>";
				html += "	<div class='wrap_group noborder_top bg_white'>";
				html += "		<table class='t_buy'>";
				html += "			<thead>";
				html += "				<tr>";
			//	html += "					<th class='t_cs'>CS처리상태</th>";
			//	html += "					<th class='t_no' style='text-align:center'>주문번호</th>";
				html += "					<th class='t_title' style='width:250px;text-align:center'>"+g360.g_lang.Artwork_Information+"</th>";
				html += "					<th class='t_date' style='text-align:center'>"+g360.g_lang.Date_of_purchase+"</th>";
				html += "					<th class='t_fin_date' style='text-align:center'>"+g360.g_lang.Purchase_Amount+"</th>";
				html += "					<th class='t_status' style='text-align:center'>"+g360.g_lang.Buyer+"</th>";
			
				html += "				</tr>";
				html += "			</thead>";
				html += "			<tbody>";
				
				
				for (var i = 1 ; i < data.length ; i++){
					var spl = data[i];
					
					html += "				<tr style='height:100px'>";
				//	html += "					<td class='t_cs' style='text-align:center'>취소접수</td>";
				//	html += "					<td class='t_no' style='text-align:center;padding-left:10px; font-size:14px'>"+spl.id.replace("merchant_","")+"</td>";
					
					html += "					<td class='t_art' style='width:150px; padding-top:10px; padding-bottom:10px; padding-left:100px'>";
					
					html += "		<a style='cursor:pointer' onclick=\"g360.showArtDetail('"+spl.dockey+"')\">";
					var url = g360.thumbnail_img_path(spl.email, spl.dockey);
					html += "			<div class='thm_cart' ><img src='"+url+"' /></div>";
					html += "			<ul class='cart_info'>";
					html += "				<li class='i_subject'>"+spl.art_title+"</li>";
					html += "				<li class='i_name'>"+spl.art_artist+"</li>";
					if (spl.art_hosu == null){
						html += "				<li class='i_size'>"+spl.art_height+" x "+spl.art_width+"cm</li>";
					}else{
						html += "				<li class='i_size'>"+spl.art_height+" x "+spl.art_width+"cm ("+spl.art_hosu+"호)</li>";
					}
					
				//	html += "				<li class='i_price'>"+g360.comma(g360.setWon(spl.art_price))+"</li>";
					html += "			</ul>";
					html += "		</a>";	
					
					html += "					</td>";
					
					var ddd = spl.sortdate.substring(0,4) + "-" + spl.sortdate.substring(4,6) + "-" + spl.sortdate.substring(6,8);
					html += "					<td class='t_date' style='text-align:center'>"+ddd+"</td>";
					
					if (typeof(spl.art_eth) != "undefined"){
						//ETH로 결재한 경우
						html += "					<td class='t_date' style='text-align:center'>"+ spl.art_eth+"ETH</td>";
					}else{
						html += "					<td class='t_date' style='text-align:center'>"+g360.comma(g360.setWon(spl.art_price))+"</td>";
					}
					
					
					html += "					<td class='t_date' style='text-align:center'>"+ spl.buyer_email +"</td>";
					
				

					html += "				</tr>";
				}
							
				
				
				html += "			</tbody>";
				html += "		</table>";
				html += "	</div>";
				html += "</div>";
			
			
				$("#art_delivery_dis").html(html);
				$("#NAVIGATE").show();
								
				gPAProjectlist.search_paging(gPAProjectlist.cPage);		
									
				
			},
			error : function(e){
				g360.error_alert();
			}
		});
	},
	
	
	
	
	
	
	"load_art_delivery" : function(){
		var option = gPAProjectlist.tab;
		
		var start = (parseInt(gPAProjectlist.perpage) * (parseInt(gPAProjectlist.cPage))) - (parseInt(gPAProjectlist.perpage) - 1);
		start = parseInt(start) -1 ;
		
	
		var url = g360.root_path + "/delivery_list_partner.mon?start="+start+"&perpage="+gPAProjectlist.perpage;
		url += "&" + new Date().getTime();
		
	//	var url = g360.root_path + "/load_save_image_info_option.mon?start="+start+"&perpage="+gPAProjectlist.perpage+"&option="+option;
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				
				gPAProjectlist.draw_art_delivery(data);
				
				
			},
			error : function(e){
				g360.error_alert();
			}
		});
	},
	
	
	"draw_art_delivery" : function(data){
		
	
		
		var html = "";
		
		
		gPAProjectlist.totalcount = data[0].totalcount;
		
	//	alert(gPAProjectlist.totalcount)
		
			html += "<div class='sub_common_content client'>";
			html += "	<section>";
			html += "		<div class='group_section'>";
			html += "			<div class='order_status partner bg_white'> <!-- partner 클래스 추가 -->";
			html += "				<ul>";
			html += "					<li style='width:16%'>";
			html += "						<span><img src='/img/account/icon-mp-payment.svg' alt='결제' />"+g360.g_lang.Payment+"</span>";
			html += "						<strong id='xdel_1'></strong>";
			html += "					</li>";
			html += "					<li style='width:16%'>";
			html += "						<span><img src='/img/account/icon-mp-delivery-prep.svg' alt='배송준비' />"+g360.g_lang.Ready_to_ship+"</span>";
			html += "						<strong id='xdel_2'></strong>";
			html += "					</li>";
			html += "					<li style='width:16%'>";
			html += "						<span><img src='/img/account/icon-mp-shipped.svg' alt='배송중' />"+g360.g_lang.Shipping+"</span>";
			html += "						<strong id='xdel_3'></strong>";
			html += "					</li>";
			html += "					<li style='width:16%'>";
			html += "						<span><img src='/img/account/icon-mp-delivery-comp.svg' alt='배송완료' />"+g360.g_lang.Delivery_completed+"</span>";
			html += "						<strong id='xdel_4'></strong>";
			html += "					</li>";
			html += "					<li style='width:16%'>";
			html += "						<span><img src='/img/account/icon-mp-shipped.svg' alt='송금예정' />"+g360.g_lang.Remittance_scheduled+"</span>";
			html += "						<strong id='xdel_5'></strong>";
			html += "					</li>";
			html += "					<li style='width:16%'>";
			html += "						<span><img src='/img/account/icon-mp-delivery-comp.svg' alt='송금완료' />"+g360.g_lang.Remittance_completed+"</span>";
			html += "						<strong id='xdel_6'></strong>";
			html += "					</li>";
			html += "				</ul>";
			html += "			</div>";
			
			
			if (gPAProjectlist.totalcount != 0){

				html += "			<div class='wrap_group cart noborder_top bg_white'>";
				html += "				<table class='t_cart'>";
				html += "					<thead>";
				html += "						<tr>";
				html += "							<th class='t_date'>"+g360.g_lang.Mypage11+"</th>";
				html += "							<th class='t_art'>"+g360.g_lang.Mypage12+"</th>";
				html += "							<th class='t_price'>"+g360.g_lang.Mypage13+"</th>";
				html += "							<th class='t_delivery_charge'>"+g360.g_lang.Shipping_Fee+"</th>";
				html += "							<th class='t_status'>"+g360.g_lang.Mypage6+"</th>";
				html += "						</tr>";
				html += "					</thead>";
				html += "					<tbody>";
			
			
				for (var i = 1 ; i < data.length ; i++){
					var spl = data[i];
					
					
					
					
					html += "<tr>";
					
					if (spl.approval_type == "radio5" || spl.approval_type == "radio6"){
						html += "	<td class='t_date m_view'>";
						html += "		<div>"+g360.iso_date_convert(spl.date)+"</div>";
						var tx = g360.ethscan(spl.id);
						html += "		<a style='cursor:pointer' title='Contract Address'  onclick=\"window.open('"+tx+"')\"  title='배송 진행 상태 상세보기' >"+spl.id.replace("merchant_","").substring(0,25)+"...</a>";
						html += "	</td>";
					}else{
						html += "	<td class='t_date m_view'>";
						html += "		<div>"+g360.iso_date_convert(spl.date)+"</div>";
						//onclick=\"gPAProjectlist.popup_receipt('"+spl.receipt_url+"')\" <== 작품을 구매한 사용자만 영수증을 출력한다.
						html += "		<a style='cursor:pointer' title='배송 진행 상태 상세보기'  onclick=\"g360.openinvoice_new('"+spl.delivery_code+"','"+spl.code+"')\" >"+spl.id.replace("merchant_","")+"</a>";
						html += "	</td>";
					}


					
					html += "	<td class='t_art'>";
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
					
					html += "				<li class='i_price'>"+g360.comma(g360.setWon(spl.art_price))+"</li>";
					html += "			</ul>";
					html += "		</a>";	
					html += "	</td>";
					
					if (spl.approval_type == "radio5" || spl.approval_type == "radio6"){
						//ETH로 결재한 경우
						html += "	<td class='t_price'>"+spl.art_eth + spl.pay_method +"</td>";
						html += "	<td class='t_delivery_charge'>"+spl.shipping_fee_eth+ spl.pay_method + "</td>";
					}else{
						html += "	<td class='t_price'>"+g360.comma(g360.setWon(spl.art_price))+"</td>";
						html += "	<td class='t_delivery_charge'>"+g360.comma(g360.setWon(spl.shipping_fee))+"</td>";
					}
					

					if (spl.status == "3"){
						html += "	<td class='t_status preparing'><span>"+g360.g_lang.Delivery_completed+"</span></td>";
					}else if (spl.status == "2"){
						html += "	<td class='t_status preparing'><span>"+g360.g_lang.Shipping+"</span></td>";
					}else if (spl.status == "4"){
						html += "	<td class='t_status preparing'><span>"+g360.g_lang.Remittance_scheduled+"</span></td>";
					}else if (spl.status == "5"){
						html += "	<td class='t_status preparing'><span style='color:red'>"+g360.g_lang.Remittance_completed+"</span></td>";
					}else if (spl.status == "1"){
						
						if (spl.shipping_type == "전문배송" || spl.shipping_type == "기타"){
							html += "	<td class='t_status preparing' style='cursor:pointer;padding-left:15px' >";	
							html += "    	<a style='cursor:pointer;font-size: 13px;text-decoration: underline;color: #2121e0;' onclick=\"g360.user_info_open('"+spl.purchase_email+"','')\">"+g360.g_lang.ArtList10+"</a>"; 
							
							html += "		<button class='btn btn_gray' id='invoice_cancel' style='width:120px;height:40px; margin-top:3px' onclick=\"gPAProjectlist.input_invoice2('"+spl.dockey+"')\">"+g360.g_lang.ArtList11+"</button>";								
							html += "	</td>";
						}else{
							html += "	<td class='t_status preparing' style='cursor:pointer;padding-left:15px' >";
						//	html += "		<span>송장번호등록</span>";						
							html += "    	<a style='cursor:pointer;font-size: 13px;text-decoration: underline;color: #2121e0;' onclick=\"g360.user_info_open('"+spl.purchase_email+"','')\">"+g360.g_lang.ArtList10+"</a>"; 
							html += "		<button class='btn btn_gray' id='invoice_cancel' style='width:120px;height:40px; margin-top:3px' onclick=\"gPAProjectlist.input_invoice('"+spl.dockey+"')\">"+g360.g_lang.ArtList12+"</button>";					
							html += "	</td>";
						}

						

					}else if (spl.status == "cancel"){
						html += "	<td class='t_status preparing'><span style='color:blue'>"+g360.g_lang.ArtList13+"</span></td>";
					}
					
					html += "</tr>";
				}
				
				
			
				html += "					</tbody>";
				html += "				</table>";
			
			
			}
			
			html += "			</div>";
			html += "		</div>";
			html += "	</section>";
			html += "</div>";
			
			
			$("#art_delivery_dis").html(html);
			
			if (gPAProjectlist.totalcount  == 0){
				$("#xdel_1").text(0);
				$("#xdel_2").text(0);
				$("#xdel_3").text(0);								
				$("#xdel_4").text(0);
				$("#xdel_5").text(0);
				$("#xdel_6").text(0);
			}else{
				gPAProjectlist.search_paging(gPAProjectlist.cPage);		
				gPAProjectlist.load_art_delivery_count();
			}
					
		
	},
	
	
	
	"popup_receipt" : function(_url){		
		g360.open_subwin(_url , '500', '600', 'yes', '', 'yes')
	},
	
	"input_invoice2" : function(opt){
		gPAProjectlist.selected_id = opt; //현재 선댁된 값을 송장등록 팝업창 submit시 활용하기 우해서 세팅한다.
		
		$.confirm({
			title : g360.g_lang.OK,
			content : g360.g_lang.ArtList7,
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
					text : g360.g_lang.OK,
					btnClass : "btn-default",
					action : function(){
						var url = g360.root_path + "/invoce_update2.mon?id="+gPAProjectlist.selected_id;
						url += "&" + new Date().getTime();
						$.ajax({
							type : "GET",
							dataType : "json",
							conentType : "application/json; charset=utf-8",
							url : url,
							success : function(data){
								if (data.result == "OK"){
									
									
									g360.gAlert("Info",g360.g_lang.ArtList8, "blue", "top");
									
									
									gPAProjectlist.load_art_delivery();
									
									
								}else{
									g360.gAlert("Info",g360.g_lang.ArtList9, "blue", "top");
								}							

							},
							error : function(e){
								g360.error_alert();
							}
						})
					}
				},
				cancel : function(){						
					
				}
			}
		});
				
		
		
	},

	"input_invoice" : function(opt){
		
		
		gPAProjectlist.selected_id = opt; //현재 선댁된 값을 송장등록 팝업창 submit시 활용하기 우해서 세팅한다.
		
		$("#xinvoice_popup").show();
		
		var html = "";
	
		html += "<div class='set_info' style=''>";
		html += "	<dl>";
		html += "		<dt style='font-width:bold;' >"+g360.g_lang.Delivery_company+" </dt>";
		html += "		<dd>";
		html += "			<select type='text' id='t_code' class='txt' style='width:250px'></select>";
		html += "		</dd>";
		html += "	</dl>";
		html += "	<dl>";
		html += "		<dt  style='font-width:bold; '>"+g360.g_lang.Invoice_number+" </dt>";
		html += "		<dd>";
		html += "			<input type='text' id='invoice_num' class='txt'  style='width:250px'>";
		html += "		</dd>";
		html += "	</dl>";
		html += "</div>";
		html += "<div class='bottom_area' style='margin-top:100px; padding-right:0px'>";
		html += "	<button class='btn btn_gray' id='invoice_cancelx' style='width:80px'>"+g360.g_lang.Cancel+"</button>";
		html += "	<button class='btn btn_violet' id='invoice_submit' style='width:80px'>"+g360.g_lang.Register+"</button>";
		html += "</div>";
		
		
		$("#xinvoice_popup").html(html);
		
		
		g360.body_scroll_hide();
		
		dialog = $("#xinvoice_popup" ).dialog({
		      autoOpen: false,
		      height: 180,
		   //   position: { my: "center-100 bottom-40", at: "center center" },
		      width: 380,
		      stack : true,
		      dialogClass: "no-titlebar",
		      modal: true,
		      resizable: false,
		      zIndex: 10
		    });
		
		
		
		dialog.dialog( "open" );
		
		$("#invoice_submit").on("click", function(event){
			var code = $("#t_code").val();
			var code_text =  $("#t_code option:selected").text();
			var num = $("#invoice_num").val();
			
			gPAProjectlist.invoice_save(code, code_text, num);
		});
		
		
		$("#invoice_cancelx").on("click", function(event){
			g360.body_scroll_show();
			dialog.dialog( "close" );
		});
		
		
		gPAProjectlist.load_companylist();
		
	},
	
	"invoice_save" : function(code, code_text, num){
		var url = g360.root_path + "/invoiceapi.gu?ty=3&cc="+code+"&ic="+num;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json, charset=utf-8",
			url : url,
			success : function(data){
			
				if (data.status == false){
					g360.gAlert("Info",g360.g_lang.ArtList14, "blue", "top");
				}else{
					var url = g360.root_path + "/invoce_update.mon?code="+code+"&code_text="+encodeURIComponent(code_text)+"&num="+num+"&id="+gPAProjectlist.selected_id;
					url += "&" + new Date().getTime();
					$.ajax({
						type : "GET",
						dataType : "json",
						conentType : "application/json; charset=utf-8",
						url : url,
						success : function(data){
							if (data.result == "OK"){
								g360.gAlert("Info",g360.g_lang.ArtList15, "blue", "top");
								$("#invoice_cancel").click();
								
								gPAProjectlist.load_art_delivery();
								
								$("#invoice_cancelx").click();
							}else{
								g360.gAlert("Info",g360.g_lang.ArtList9, "blue", "top");
							}							

						},
						error : function(e){
							g360.error_alert();
						}
					})
					
					
				}
			},
			error : function(e){
				g360.gAlert("Info",g360.g_lang.ArtList16, "blue", "top");
			}
		})
	},
	
	"load_companylist" : function(){
		var url = contextpath + "/invoiceapi.gu?ty=1";
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json, charset=utf-8",
			url : url,
			success : function(data){
			
				var sel = $("#t_code");
				for (var i = 0 ; i < data.Company.length; i++){
					var spl = data.Company[i];					
					sel.append("<option value='" + spl.Code+ "'>" + spl.Name + "</option>");	
				}
				
				//$("#request_right").html(html);
			},
			error : function(e){
			
				g360.gAlert("Info",g360.g_lang.ArtList17, "blue", "top");
			}
		})
	},
	
	"search_invoice" : function(){
		var sval = $("#t_code").val();
		var tval = $("input[name=t_invoice]").val();
		var html = "";
		var url = contextpath + "/invoiceapi.gu?ty=3&cc="+sval+"&ic="+tval;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json, charset=utf-8",
			url : url,
			success : function(data){
				if (data.status == false){
					$("#log").html(data.msg);
				}else{
					
					html += g360.g_lang.Invoice1+ " : " + data.itemName + "<br>";					
					html += g360.g_lang.Invoice2+ " : " + data.senderName + "<br>";
					html += g360.g_lang.Invoice3+ " : " + data.recipient + "<br>";
					html += g360.g_lang.Invoice4+ " : " + data.receiverAddr + "<br>";
					html += "=====================================<br>";
					html += g360.g_lang.Invoice5+ " : " + data.lastStateDetail.kind + "<br>";
					html += g360.g_lang.Invoice6+ " : " + data.lastStateDetail.timeString + "<br>";
					
					$("#log").html(html);
				}
			},
			error : function(e){
				g360.gAlert("Info",g360.g_lang.ArtList16, "blue", "top");
			}
		})
	},	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	 
	
	"load_add_art" : function(){
		
		if (!gPAProjectlist.isloading_complete){
			var bun = parseInt(gPAProjectlist.start) + parseInt(gPAProjectlist.perpage);
			gPAProjectlist.start = bun;
			gPAProjectlist.load_art_list(bun, "add");
		}else{
			var $loader = $('#favo_loader_patner');
			$loader.removeClass('first active');
		}

	},
	
	
		
	
	"infiniteScroll" :function(){
		
		var _self = this;
		// 작품검색 InfiniteScroll 적용
		this.search_controller = new ScrollMagic.Controller();
		this.search_scene = new ScrollMagic.Scene({triggerElement:'#favo_loader_patner', triggerHook:'onEnter', offset:-100}).addTo(_self.search_controller);
		this.search_scene.on('enter', function(e) {
			var $grid = $('#gallery_columns');
			var $loader = $('#favo_loader_patner');
		
		//	if (gPAProjectlist.isloading_complete) return;
			if (!$loader.hasClass('first') && !$loader.hasClass('active')) {
				//console.log('main art loading scroll');
				$loader.addClass('active');
				
				gPAProjectlist.load_add_art();
			}
		});
		
//		$(window).off('resize.art').on('resize.art', function() {
//			if (_self.pin_scene && _self.pin_scene.destroy) {_self.pin_scene.destroy(true);}
//			
//			if ($('#art_scroll_pin_trigger').length == 0) {
//				$(window).off('resize.art');
//			} else {
//				_self.pin_scene = new ScrollMagic.Scene({
//					triggerElement:'#art_scroll_pin_trigger', 
//					triggerHook:'onLeave',
//					offset: (window.innerWidth < 1200 ? -50 : -60)
//				}).setPin('#art_search_input_wrapper', {spacerClass:'container container-spacer'}).addTo(_self.search_controller);
//			}
//		});
//		$(window).resize();
	},
	
	
	
	
	"load_art_list" : function(bun, opt){
	
	//	if (gPAProjectlist.isloading_complete){
	
		//	gPAProjectlist.isloading_complete = false;
			
			var $grid = $('#gallery_columns');
			var $loader = $('#favo_loader_patner');
			//if (_self.load_search_complete) return;
			
			$loader.addClass('first active');
	//		$grid.css('opacity', 0);
			
		
			var start = bun;
			var option = gPAProjectlist.tab;
			var url = g360.root_path + "/load_save_image_info_option.mon?start="+start+"&perpage="+gPAProjectlist.perpage+"&option="+option;
			
			url += "&" + new Date().getTime(); 
					
			$.ajax({
				type : "GET",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(data){
				//	$('#gallery_columns').masonry();
				//	g360.body_scroll_hide();
					
										
					if (data.length == 0){
						gPAProjectlist.isloading_complete = true;
					}
					
					if (opt == "init"){
						$('#gallery_columns').css('opacity', 0);
						$("#artproject_list_div").scrollTop(0);
						$('#gallery_columns').masonry();
					}
					

					for (var i = 0 ; i < data.length; i++){
						gPAProjectlist.draw_art_list2(data[i], opt);
					}
					
					// 이미지 로딩이 완료되면 화면에 표시
					$('#gallery_columns').imagesLoaded(function(){	
						$('#gallery_columns').css('opacity', 1);
					//	$('#gallery_columns').masonry();
						
					//	$("#gallery_columns").masonry('reloadItems');
						$("#gallery_columns").masonry('layout');
						
					//	gPAProjectlist.isloading_complete = true;
					//	g360.body_scroll_show();
					});
					
					
					$loader.removeClass('first active');
				},
				error : function(e){
					g360.error_alert();
				}
			})
	//	}
		
	},
	
//	"mansony_init": function(){
//		var _self = this;
//		
//	//	g360.body_scroll_hide();
//		
//		var $grid = $('#gallery_columns');
//		var $loader = $('#favo_loader');
//		var favo_controller = new ScrollMagic.Controller();  // <==특정 div를 잡아서 처리 할경우
//	//	var favo_controller = new ScrollMagic.Controller({container:$('body')[0]});
//		var favo_scene = new ScrollMagic.Scene({triggerElement:"#favo_loader", triggerHook:'onEnter', offset:-100}).addTo(favo_controller);
//		favo_scene.on('enter', function(e) {
//			alert("1");
//			//if (_self.layer_frame.get(0).style.display == 'none') return;
//			//if (_self.page_info.favorite.complete) return;
//			if (!$loader.hasClass('first') && !$loader.hasClass('active')) {
//				console.log('loading scroll');
//				$loader.addClass('active');
//				
//			//	gPAProjectlist.load_art_list(0, "init");
//				
////				_self.load_art_list().then(function(data){
////					if (data.length > 0) {
////						$.each(data, function(){_self._appendPictureEl($grid, this);});
////						
////						// 이미지 로딩이 완료되면 화면에 표시
////						$grid.imagesLoaded(function(){
////							$loader.removeClass('active');
////							$grid.masonry('layout');
////						});
////					} else {
////						$loader.removeClass('active');
////					}
////				});
//			}
//		});
//	},
	
	
//	"draw_art_list" : function(data, opt){
//		var _self = this;
//		
//		// 즐겨찾기 InfiniteScroll 적용
//		var $grid = $('#gallery_columns');
//		var $loader = $('#favo_loader');
//	//	this.favo_controller = new ScrollMagic.Controller({container:'#deco_tab_favorite'});  <==특정 div를 잡아서 처리 할경우
//		this.favo_controller = new ScrollMagic.Controller();
//		this.favo_scene = new ScrollMagic.Scene({triggerElement:'#favo_loader', triggerHook:'onEnter', offset:-100}).addTo(_self.favo_controller);
//		this.favo_scene.on('enter', function(e) {
//			//if (_self.layer_frame.get(0).style.display == 'none') return;
//			//if (_self.page_info.favorite.complete) return;
//			if (!$loader.hasClass('first') && !$loader.hasClass('active')) {
//				console.log('loading scroll');
//				$loader.addClass('active');
//				_self.load_art_list().then(function(data){
//					if (data.length > 0) {
//						$.each(data, function(){_self._appendPictureEl($grid, this);});
//						
//						// 이미지 로딩이 완료되면 화면에 표시
//						$grid.imagesLoaded(function(){
//							$loader.removeClass('active');
//							$grid.masonry('layout');
//						});
//					} else {
//						$loader.removeClass('active');
//					}
//				});
//			}
//		});
//	},
	
	
	"draw_art_list2":function(data_info, opt){
		
		var $wrapper = $('#gallery_columns');
	
		var html = "";
		var img = data_info;
	
		var imgURL = g360.domain + "/artimage/" + img.email + "/art/preview/" + img.art_img_filename + ".jpg?open&ver="+data_info.version;
		var title = img.art_title;
		
		var size = ""
			
		if(img.art_genre=="조형"){
			var size = img.art_height + ' x ' + img.art_width + ' x ' + img.art_height2 + 'cm';
		}else{
			if (img.art_hosu == null){
				var size = img.art_height + ' x ' + img.art_width + 'cm';
			}else{
				var size = img.art_height + ' x ' + img.art_width + 'cm (' + img.art_hosu + '호)';
			}
		}	
		
		var price = g360.comma(g360.setWon(img.art_price));
		var artist = img.art_artist;
		var express = size;
		var dkey = "";
		
		html += "<div class='grid-item col-lg-3 col-md-4 col-sm-4 col-6 ' id='"+img.sortdate+"'>";
		html += "	<figure>";
		html += "		<a onclick=\"g360.showArtDetail('"+img.art_img_filename+"')\"><img src='"+imgURL+"'></a>";
		html += "			<figcaption>";
		if (img.status == "1"){
			html += "				<span class='gray_label label' id='"+img.sortdate+"_status_dis' style='margin-top:5px; margin-right:5px'>"+g360.g_lang.ArtList18+"</span>";
		}else if (img.status == "2"){
			html += "				<span class='green_label label' id='"+img.sortdate+"_status_dis' style='margin-top:5px; margin-right:5px'>"+g360.g_lang.ArtList20+"</span>";
		}else if (img.status == "3"){
			html += "				<span class='red_label label'  id='"+img.sortdate+"_status_dis' style='margin-top:5px; margin-right:5px'>"+g360.g_lang.ArtList21+"</span>";
		}else if (img.status == "0"){
			html += "				<span class='green_label label'  id='"+img.sortdate+"_status_dis' style='margin-top:5px; margin-right:5px'>"+g360.g_lang.ArtList19+"</span>";
		}
		
		html += "				<h2 class='art_title'>"+title+"</h2>  <!-- 라벨 있을때 클래스 추가 -->";
		html += "				<em><img src='/img/btn-artwork-collect-normal.svg' class='btn_artwork_collect_normal'></em>";
		html += "					<p>"+artist+"</p>";
		html += "					<p class='text-muted'>"+size+"</p>";
		html += "					<div class='btn-group'> <!-- 버튼 추가 -->";
		html += "						<button class='bg-transparent border-0 dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
		html += "							<img src='/img/account/btn-overflow-h-normal.svg' alt='더보기' style='cursor:pointer'/>";
		html += "						</button>";
		html += "					<div class='dropdown-menu' >";
		
		if (img.status != "3"){
			html += "						<a class='dropdown-item' onclick=\"gPAProjectlist.art_modify('"+img.dockey+"')\"><img src='/img/account/icon-overflow-edit-sales-info.svg'  alt='' /> "+g360.g_lang.Edit_artwork+"</a>";
		}
		
		if (img.status == "1"){
			html += "						<a id='"+img.sortdate+"_opt' class='dropdown-item' onclick=\"gPAProjectlist.art_sale('"+img.dockey+"','"+img.sortdate+"' , '2'); return false;\">";
			html += "						<img src='/img/account/icon-overflow-sales1.svg' alt='' /> "+g360.g_lang.ArtList23+"</a>";
		}else if (img.status == "2" || img.status == "0"){
			html += "						<a id='"+img.sortdate+"_opt' class='dropdown-item' onclick=\"gPAProjectlist.art_sale('"+img.dockey+"','"+img.sortdate+"' , '1'); return false\">";
			html += "						<img src='/img/account/icon-overflow-nosales.svg' alt=''/> "+g360.g_lang.ArtList22+"</a>";
		}
		
		if (img.status != "3"){
			html += "						<a id='"+img.sortdate+"_opt' class='dropdown-item' onclick=\"gPAProjectlist.art_sale('"+img.dockey+"','"+img.sortdate+"' , '3'); return false\">";
			html += "						<img src='/img/account/icon-overflow-salesdone.svg' alt=''/> "+g360.g_lang.ArtList21+"</a>";
		}
		
		if (img.status == "3"){
			html += "						<a id='"+img.sortdate+"_opt' class='dropdown-item' onclick=\"gPAProjectlist.art_sale('"+img.dockey+"','"+img.sortdate+"' , 'x'); return false\">";
			html += "						<img src='/img/account/icon-overflow-sales.svg' alt=''/>"+g360.g_lang.Change_Saling+"</a>";
		}
		
		html += "						<a id='"+img.sortdate+"_opt' class='dropdown-item' onclick=\"gPAProjectlist.art_delete('"+img.dockey+"','"+img.sortdate+"')\">";
		html += "						<img src='/img/account/icon-overflow-delete-art.svg' alt=''  /> "+g360.g_lang.Delete+"</a>";
		
		
//		if (img.status == "2"){
//			html += "						<a id='"+img.sortdate+"_opt' class='dropdown-item' onclick=\"gPAProjectlist.share360talk('"+title+"','"+img.dockey+"','"+express+"')\">";
//			html += "						<img src='/img/account/icon-overflow-promo-exhibition.svg' alt=''  /> 360Talk 공유</a>";
//		}
		
		html += "					</div>";
		html += "				   </div>";
		html += "				</figcaption>";
		html += "		<div class='cost-area'>";
		html += "			<h2>₩"+price+"</h2>";
		html += "			<div class='icon-area'>";
		
		if (img.status != "3"){
			html += "				<span>";
			html += "					 <img src='/img/icon-artwork-original.svg' class='icon_artwork_original'>";
			html += "				</span>";
		}
		
		if (img.art_ck2 == true){
			html += "				<span>";
			html += "					 <img src='/img/icon-artwork-image.svg' class='icon_artwork_image'>";
			html += "				</span>";
		}

		if (typeof(img.vrinfo) != "undefined"){
			html += "				<span>";
			html += "					 <img src='/img/icon-artwork-vr.svg' class='icon_artwork_vr'>";
			html += "				</span>";
		}


		html += "			</div>";
		html += "		</div>";
		html += "	</figure>";
		html += "</div>";
		
		
		$div = $(html);
		
		
	//	$fig.append($img).append($figcap).appendTo($div);
		
		$wrapper.append($div).masonry('appended', $div);
	},
	
	"share360talk" : function(msg, filename, express){
		
		var opt = "art";
		var readers = "-spl-all-spl-";
		
		gTopMain.sendArt(msg, readers, opt, filename, express); // : function(msg, readers, opt, filename, express){
	},
	
	
	
	
	"art_delete" : function(dockey, sortdate){
		
		var url = g360.root_path + "/art_image_remove.mon?dockey="+dockey;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				$("#" + sortdate).empty();
				$('#gallery_columns').masonry();
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	"art_sale" : function(dockey,sortdate, opt){

		var url = g360.root_path + "/art_image_sale.mon?dockey="+dockey+"&opt="+opt;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				var ck = $("#" + sortdate + "_opt");
				var obj = $("#" + sortdate + "_status_dis");
				
			
				
				if (data.result == "OK"){
					if (opt == "1"){					
						if (gPAProjectlist.tab == "2"){
							$("#" + sortdate).empty();
							$('#columns').masonry();
						}else{
							obj.attr("class","gray_label label");
							obj.text(g360.g_lang.ArtList18); 
							
							ck.attr("onclick","gPAProjectlist.art_sale('"+ dockey+"','"+ sortdate+"' , '2')");
							ck.get(0).innerHTML = "<img src='/img/account/icon-overflow-sales.svg' alt='' /> "+g360.g_lang.ArtList23;
						}				
					}else if (opt == "2"){
						obj.attr("class","green_label label");
						obj.text(g360.g_lang.ArtList20);
						ck.attr("onclick","gPAProjectlist.art_sale('"+ dockey+"','"+ sortdate+"' , '1')");
						ck.get(0).innerHTML = "<img src='/img/account/icon-overflow-nosales.svg' alt='' /> "+g360.g_lang.ArtList22;
					}else if (opt == "3"){
						obj.attr("class","red_label label");
						obj.text(g360.g_lang.ArtList21);
						ck.attr("onclick","gPAProjectlist.art_sale('"+ dockey+"','"+ sortdate+"' , '2')");
						ck.get(0).innerHTML = "<img src='/img/account/icon-overflow-sales.svg' alt='' /> "+g360.g_lang.ArtList23;
					}else if (opt == "x"){
						//판매완료된 작품을 판매중으로 변형한다.
						$("#" + sortdate).empty();
						$('#columns').masonry();
					}
				}else if (data.result == "Y"){
					//이미지를 업로드 요청했는데 관리자의 요청이 필요한 경우 대기중으로 표시한다.
					obj.attr("class","green_label label");
					obj.text(g360.g_lang.ArtList19);
					ck.attr("onclick","gPAProjectlist.art_sale('"+ dockey+"','"+ sortdate+"' , '1')");
					ck.get(0).innerHTML = "<img src='/img/account/icon-overflow-nosales.svg' alt='' /> "+g360.g_lang.ArtList22;
				}
				
				gPAProjectlist.load_count_summary();
							
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	"art_modify" : function(dockey){
		
		//partner/art_upload/art_upload.jsp
		var url = g360.root_path + "/partner/art_upload/art_upload.jsp?opt=edit&dockey="+dockey;
		g360.LoadPage("body_content", url);    //index.jsp파일에 레이어가 존재해서 어디서도 같이 사용 할 수 있다.
		
		return false;
	},
	
	
	
	
	
	
	
	
	
	
	
	/////////////////////////// 리스트 페이징 시작 //////////////////////////////////////////////////////////////
	"search_paging" : function(page){
		var alldocuments = gPAProjectlist.totalcount;
		if (alldocuments % gPAProjectlist.perpage > 0 & alldocuments % gPAProjectlist.perpage < gPAProjectlist.perpage/2 ){
			allPage = Number(Math.round(alldocuments/gPAProjectlist.perpage)) + 1;
		}else{
			allPage = Number(Math.round(alldocuments/gPAProjectlist.perpage));
		}	

		gPAProjectlist.search_navigator(page);
	},
	
	"search_navigator" : function(page){
		var nav_cpage = page;

		var alldocuments = gPAProjectlist.totalcount;
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
				nav[0] = '<li class="p_prev"><a href="#" class="xico" onclick="javascript:gPAProjectlist.gotoPage(' + ((((cFrame-1)*10)-1)*gPAProjectlist.perpage+1) + ',' + ((cFrame-1)*10) + ');">'+g360.g_lang.Prev+'</a></li>';
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
						nav[pIndex] = "<li><a href=# onclick='gPAProjectlist.gotoPage("+ (((i-1) * gPAProjectlist.perpage) + 1 ) + ", "+ i + ", this)'>" + i + "</a></li>";
						
					}else{
						if (i%10 == '1' ){
							nav[pIndex] = "<li><a href=# onclick='gPAProjectlist.gotoPage("+ (((i-1) * gPAProjectlist.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";	
						}else{
							nav[pIndex] = "<li><a href=# onclick='gPAProjectlist.gotoPage("+ (((i-1) * gPAProjectlist.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";
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
				nav[nav.length] = '<li class="p_next"><a href="#" class="xico" onclick="javascript:gPAProjectlist.gotoPage(' + ((cFrame*gPAProjectlist.perpage*10) + 1) + ',' + ((cFrame*10)+1) + ');">'+g360.g_lang.Next+'</a></li>';
			}
					
	          var navHTML = "";

			if (cFrame == 1 ){
				navHTML = '';
	          }else{
				navHTML = '<li class="p_first"><a href="#" class="xico" onclick="javascript:gPAProjectlist.gotoPage(1,1);">처음</a></li>';
	          }		    
			for( var i = 0 ; i < nav.length ; i++){	
	          	navHTML = navHTML + nav[i];
			}
					
			if (cFrame < allFrame){
				navHTML = navHTML + '<li class="p_last"><a href="#" class="xico" onclick="javascript:gPAProjectlist.gotoPage(' + ((allPage - 1)*gPAProjectlist.perpage + 1) +','+ allPage +')">'+g360.g_lang.Final+'</a></li>';
	        }else{
				navHTML = navHTML;
	        }
	     
			$("#NAVIGATE").html('<div class="paging"><ul>' + navHTML + '</ul></div>');
		}
	},
	
	"gotoPage" : function(Index, PageNum, obj){
		var nav_cpage = PageNum;
		oldpage = nav_cpage;
		
		gPAProjectlist.cPage = PageNum;
		gPAProjectlist.load_art_delivery();
	}
	//////////////////////////////////////// 리스트 페이징 종료    /////////////////////////////////////////////

}

