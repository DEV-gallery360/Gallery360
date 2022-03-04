
function gMainCart(){	
	gMCart = this;
	

}

gMainCart.prototype = {		

	"init" : function(){
		gMCart.ch_lang();
		
		var _self = this;
		
		gMCart.load_my_cart();
		
		
		
	
		$("#chkall").on("click", function(event){
			if($(this).is(":checked")){
				$("input[name=cxcheck]").prop("checked", true);
			}else{
				$("input[name=cxcheck]").prop("checked", false);
			}
			
		});
		
		$("#dselect_item").on("click", function(event){
			
			$("#my_cart_list input:checked").each(function(index){
				gMCart.delete_item_only($(this).attr("data"));
			});
			
		});
		
		$("#save_my_collection").on("click", function(event){
			//add_mycollection.mon?dockey=a@naver.com_e149a46d77a215b95301d83792f62dfd.42195&mod=add
			
			$("#my_cart_list input:checked").each(function(index){
				var url = g360.root_path + "/add_mycollection.mon?dockey=" + $(this).attr("data") + "&mod=add";
				url += "&" + new Date().getTime();
				$.ajax({
					type : "GET",
					dataType : "json",
					contentType : "application/json; charset=utf-8",
					url : url,
					success : function(data){
					//	deubgger;
					},
					error : function(e){
						g360.error_alert();
					}
				})
			});
			
			$("input[name=cxcheck]").prop("checked", false);
			$("input[name=chall]").prop("checked", false);
		});
		
		
		$("#art_purchase_approval").on("click", function(event){
		
			var isCheck = false;
			g360.cart_list = new Array();
			
			$("#my_cart_list input:checked").each(function(index){
			
				var url = g360.root_path + "/select_art_info.mon?dockey=" + $(this).attr("data");
				url += "&" + new Date().getTime();
				var sales_type =  $(this).attr("data3");
				$.ajax({
					type : "GET",
					dataType : "json",
					async : false,
					contentType : "application/json; charset=utf-8",
					url : url,
					success : function(data){

						data.sales_type = sales_type;
						if (sales_type == "image"){
							data.art_price = parseInt(data.art_price) *  g360.image_sales_rate;
						}
						g360.cart_list.push(data);
						
						isCheck = true;
					},
					error : function(e){
						g360.error_alert();
					}
				})
			});
			
			if (isCheck){
				var url = g360.root_path + "/main/art/art_purchase.jsp?call_from=cart";
			
				g360.LoadPage("purchase_popup_detail", url);
				g360.popup_open("art_purchase_popup");
				
				var inx = g360.maxZindex();
				
				$("#art_purchase_popup_wrapper").css("background-color", "white");
				$("#art_purchase_popup_background").css("z-index", parseInt(inx) + 1);
				$("#art_purchase_popup_wrapper").css("z-index", parseInt(inx) + 2);
				
				$("#art_purchase_popup").css("left", "0px");
				$("#art_purchase_popup").css("top", "0px");
				
				g360.scroll_Top();
				g360.body_scroll_hide();
				
				g360.popuup_close_and_body_show_scroll = true;
							
				return false;
			}else{
				g360.gAlert("Error", g360.g_lang.Cart_Alert , "red", "left");
				
				return false;
			}
			
			
		});
		
		
	},
	
	"ch_lang" : function(){
		
		$(".g_lang_Cart").text(g360.g_lang.Cart);
		$(".g_lang_Order_Info").text(g360.g_lang.Order_Info);
		$(".g_lang_ArtworkInfo").text(g360.g_lang.Mypage12);
		$(".g_lang_Shipping_Fee").text(g360.g_lang.Shipping_Fee);
		$(".g_lang_Artwork_Price").text(g360.g_lang.Artwork_Price);
		
		$(".g_lang_Delete_Selection").text(g360.g_lang.Delete_Selection);
		$(".g_lang_Add_MyCollection").text(g360.g_lang.Add_MyCollection);
		
		$(".g_lang_Payment_Info").text(g360.g_lang.Payment_Info);
		$(".g_lang_Total_works").text(g360.g_lang.Total_works);
		$(".g_lang_Shipping_Fee").text(g360.g_lang.Shipping_Fee);
		$(".g_lang_Total_amount").text(g360.g_lang.Total_amount);
		
		$(".g_lang_All_Total").text(g360.g_lang.All_Total);
		$(".g_lang_Purchase").text(g360.g_lang.Purchase);
		
		
	},
	
	"load_my_cart" : function(){
		var url = g360.root_path + "/load_cart.mon";
		url += "?" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
			
				
				var html = "";
				var totalprice = 0;
				var tp = 0;
				var totalfee = 0;
			
				for (var i = 0 ; i < data.length ; i++){
					var dx = data[i];
					html += "<tr>";
					html += "	<td class='t_check'>";
					html += "		<div class='custom-control custom-checkbox'>";
					html += "			<input type='checkbox' name='cxcheck' class='custom-control-input' data='"+dx.unique_key+"' data3='"+ dx.sales_type +"' data2='"+dx.price + "^" + dx.shipping_fee+"' id='chk_"+i+"' checked>";
					html += "			<label class='custom-control-label' for='chk_"+i+"' style='cursor:pointer'></label>";
					html += "		</div>";
					html += "	</td>";
					html += "	<td class='t_art'>";
					var img_url = g360.art_img_thumbnail_path(dx.artist_email, dx.unique_key);
					img_url = img_url + "?open&ver="+new Date().getTime();
					html += "		<div class='thm_cart' style='cursor:pointer' onclick=\"gMCart.open_art_detail('"+dx.unique_key+"')\"><img src='"+img_url+"' alt='' /></div>";
					html += "		<ul class='cart_info'>";
					html += "			<li class='i_subject'>[" + dx.sales_type + "] "+dx.title+"</li>";
					html += "			<li class='i_name'>"+dx.artist+"</li>";
					
					if (dx.sales_type == "art"){
						if (dx.hosu == null){
							html += "			<li class='i_size'>"+dx.height+" x "+dx.width+"cm</li>";
						}else{
							html += "			<li class='i_size'>"+dx.height+" x "+dx.width+"cm("+dx.hosu+"호)</li>";
						}
						
					}else{
						html += "			<li class='i_size'>"+dx.height+" x "+dx.width+"px("+g360.file_size_setting(dx.hosu)+")</li>";
					}
					
					
					html += "			<li class='i_price'>"+g360.comma(g360.setWon(dx.price))+"</li>";
					html += "		</ul>";
					html += "	</td>";
					html += "	<td class='t_price'>"+ g360.comma(g360.setWon(dx.price))+"</td>";
					var fee = 0;
					if (dx.sales_type == "art"){
						var fee = (typeof(dx.shipping_fee) == "undefined" ? 0 : dx.shipping_fee);
					}
					
					html += "	<td class='t_delivery_charge'>"+g360.comma(g360.setWon(fee))+"</td>";
					html += "	<td class='t_delete'><button class='btn btn_cart_delete' onclick=\"gMCart.delete_item('"+dx.unique_key+"')\">삭제</button></td>";
					html += "</tr>";
					
					if (dx.sales_type == "art"){
						totalprice += parseInt(dx.price);
						tp += parseInt(dx.price) + parseInt(fee);
					}else{
						totalprice += parseInt(dx.price);
						tp += parseInt(dx.price);
					}
					
					totalfee += parseInt(fee);
					
				}
				
				$("#total_art_count").text(data.length);
				if(g360.g_lang.Lang == "ko"){
					$("#total_art_price").text(g360.comma(g360.setWon(totalprice)) );
					$("#total_art_fee").text(g360.comma(g360.setWon(totalfee)) );
					$("#total_art_price_with_fee").text(g360.comma(g360.setWon(tp)));
				}else {
					$("#total_art_price").text(g360.comma("￦"+totalprice));
					$("#total_art_fee").text(g360.comma("￦"+totalfee));
					$("#total_art_price_with_fee").text("￦"+g360.comma(tp));
				}
				$("#my_cart_list").html(html);
				
				
				
				$("input[name=cxcheck]").on("click", function(event){
					gMCart.sum_calurate();
					
				});
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"sum_calurate" : function(){
	
		var p1 = 0;
		var p2 = 0;
		var p3 = 0;
		var cnt = 0; 
		$("#my_cart_list input:checked").each(function(index){
			cnt ++;
			var data = $(this).attr("data2").split("^");
			var data3 = $(this).attr("data3");
			
			p1 += parseInt(data[0]);
			if (data3 == "art"){
				p2 += (data[1] == "undefined" ? 0 : parseInt(data[1]));
				p3 += parseInt(data[0]) +  (data[1] == "undefined" ? 0 : parseInt(data[1]));
			}else{
				p2 += 0;
				p3 += parseInt(data[0]);
			}

		});
		
		
		$("#total_art_count").text(cnt);
		$("#total_art_price").text(g360.comma(g360.setWon(p1)));
		$("#total_art_fee").text(g360.comma(g360.setWon(p2)));
		$("#total_art_price_with_fee").text(g360.comma(g360.setWon(p3)));
	},
	
	"delete_item" : function(id){
	
		var url = g360.root_path + "/delete_cart.mon?key=" + id;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				if (data.result == "OK"){
					gMCart.load_my_cart();
				}
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"delete_item_only" : function(id){
	//	삭제만 하고 Refresh는 하지 않는다.
		var url = g360.root_path + "/delete_cart.mon?key=" + id;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				gMCart.load_my_cart();
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"open_art_detail" : function(dockey){
		g360.showArtDetail(dockey);
		
	}
}

