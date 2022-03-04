
function gRentalApprovalList(){	
	gRAL = this;
	
	gRAL.totalcount = 0;
	gRAL.perpage = 10;
	gRAL.start = 0;
	gRAL.cPage = 1;
	
	gRAL.ty = "all";
	gRAL.sel_id = "";
	
	
}

gRentalApprovalList.prototype = {		

	"init" : function(){
		var _self = this;	
		
		gRAL.load_logdata(1);
		
		$(".sub_common_content.account_setting aside ul li").on("click", function(event){
			
			if ($(this).hasClass('on')) return;
			
			$(".sub_common_content.account_setting aside ul li").removeClass('on');
			$(this).addClass("on");
			
			var id = event.currentTarget.id;
			
			g360.history_record(id);
			if (id == "account_basic"){
				g360.LoadPage("body_content", g360.root_path + "/rental/account/account.jsp");
				return false;
			}else if (id == "account_password"){
				gPA.goto_password_change();
			}else if (id == "account_expire"){
				g360.LoadPage("body_content", g360.root_path + "/rental/account/expire.jsp");
				return false;
			}else if (id == "account_alram"){
				g360.LoadPage("body_content", g360.root_path + "/rental/account/estimate.jsp?month=1");
				return false;
			}else if (id == "account_kamail"){
				g360.LoadPage("body_content", g360.root_path + "/rental/account/sendLog.jsp");
				return false;
			}else if (id == "account_approval_list"){
				g360.LoadPage("body_content", g360.root_path + "/rental/account/approval_list.jsp");
				return false;
			}
			
		});
		
		
		// 거래명세서
		$("#app1").on("click", function(){
			//alert("에러 데이터만 가져오기");			
			var res = gRAL.select_id();
			if (res == ""){
				alert("출력할 결제 내역을 선택하세요");
				return false;
			}
			
			//console.log("_id?????"+res);
			
			//선택한 항목의 결재 내역을 가져온다.
			var url = g360.root_path + "/tax_info2.mon?id="+res;
			$.ajax({
				type: "GET",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(res){
					var list = res.data;
					//console.log("service_month: "+list.service_month);
					//console.log("service_vr_count: "+list.service_vr_count);
					
					//hidden써서 메인에다가 꾸려주기?
					html="";
					html+="<input type='hidden' class='hidden_number_of_rentals' value='"+list.service_vr_count+"'>";
					html+="<input type='hidden' class='hidden_term' value='"+list.service_month+"'>";
					$('#pdf_info').html(html);

					var newWindow = window.open('/rental/account/trading_statement_PDF.jsp','trading_statement','width=750,height=900');
					
				},
				error : function(e){
					alert(e.message);
				}
			});
			
		});
		
		$("#app2").on("click", function(){
			var res = gRAL.select_id();
			gRAL.sel_id = res;
			if (res == ""){
				alert("증빙자료 발생 요청할 결제 내역을 선택하세요");
				return false;
			}
			
			g360.showBlock();
			
			var inx = parseInt(g360.maxZindex()) + 1;
			$('#request_approval_form').css("z-index", inx);
			$("#request_approval_form").show();
			
		});
		
		//세금계산서
		$("#app2_1").on("click", function(){
			var res = gRAL.select_id();
			gRAL.sel_id = res;
			if (res == ""){
				alert("세금계산서 요청할 결제 내역을 선택하세요");
				return false;
			}
			
			g360.showBlock();
			
			var inx = parseInt(g360.maxZindex()) + 1;
			$('#tax-invoice').css("z-index", inx);
			$("#tax-invoice").show();
			
		});
		
		//현금영수증
		$("#app2_2").on("click", function(){
			var res = gRAL.select_id();
			gRAL.sel_id = res;
			if (res == ""){
				alert("현금영수증 요청할 결제 내역을 선택하세요");
				return false;
			}
			
			g360.showBlock();
			
			var inx = parseInt(g360.maxZindex()) + 1;
			$('#cash-receipt').css("z-index", inx);
			$("#cash-receipt").show();
			
		});

		//닫기 버튼
		$(".close_svcmgmt_popup").on("click", function(e){
			
			g360.hideBlock();
			$("#request_approval_form").hide();
			$("#tax-invoice").hide();
			$("#cash-receipt").hide();
			
		});
		
		
		/**제출*/
		//세금계산서
		$("#tax-invoice > #svc_form_apply").on("click", function(e){
			var myDropzone = Dropzone.forElement("#file_upload_approval2");
			if (myDropzone.files.length == 0){
				g360.gAlert("Error", "사업자등록증 파일을 등록해 주세요" , "red", "left");
				return false;
			}
			
			var inv_organ_name = $("#inv_organ_name").val();
			var inv_corpo_number = $("#inv_corpo_number").val();
			var inv_email_addr = $("#inv_email_addr").val();
			
			if (inv_organ_name == ""){
				g360.gAlert("Error", "요청기관명을 입력해주세요" , "red", "left");
				$("#inv_organ_name").focus();
				return false;
			}				
			if (inv_corpo_number == ""){
				g360.gAlert("Error", "사업자등록증 번호를 입력해주세요" , "red", "left");
				$("#inv_corpo_number").focus();
				return false;
			}				
			if (inv_email_addr == ""){
				g360.gAlert("Error", "이메일주소를 입력해주세요" , "red", "left");
				$("#inv_email_addr").focus();
				return false;
			}
			
			
		    myDropzone.processQueue();
		});
		
		//현금영수증
		$("#cash-receipt > #svc_form_apply").on("click", function(e){
			var rec_corpo_number = $("#rec_corpo_number").val();
			var rec_mob_number = $("#rec_mob_number").val();
			
			if (rec_corpo_number == ""){
				g360.gAlert("Error", "사업자등록번호를 입력해주세요" , "red", "left");
				$("#rec_corpo_number").focus();
				return false;
			}
			
			if (rec_mob_number == ""){
				g360.gAlert("Error", "휴대폰번호를 입력해주세요" , "red", "left");
				$("#rec_mob_number").focus();
				return false;
			}
			
			
			var data = JSON.stringify({
				rec_corpo_number : rec_corpo_number,
				rec_mob_number : rec_mob_number,
				inv_email_addr : g360.UserInfo.email,
				xmemox : g360.UserInfo.nickname,
				select_id : gRAL.sel_id,
				type : "2"
			});
			
			var url = g360.root_path + "/save_approval_info.mon";
			$.ajax({
				type : "POST",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				data : data,
				url : url,
				success : function(res){
					if (res.result == "OK"){
						g360.gAlert("Error", "정상적으로 요청되었습니다." , "red", "left");
						$(".close_svcmgmt_popup").click();
					}
				},
				error : function(e){
					alert(e.message);
				}
			})
		});
		
		
/*		$("#svc_form_apply").on("click", function(e){
			//세금게산서 인지 , 현금 영수증인지 확인 한다.
			
			var rs = $("input[name='document_type']:checked").attr('id');
			if (rs == "spxx1"){
				//세금게산서 등록
				
				var myDropzone = Dropzone.forElement("#file_upload_approval2");
				if (myDropzone.files.length == 0){
					g360.gAlert("Error", "사업자등록증 이미지를 선택해 주세요" , "red", "left");
					return false;
				}
				
				var inv_organ_name = $("#inv_organ_name").val();
				var inv_corpo_number = $("#inv_corpo_number").val();
				var inv_email_addr = $("#inv_email_addr").val();
				
				if (inv_organ_name == ""){
					g360.gAlert("Error", "요청기관명을 입력해주세요" , "red", "left");
					$("#inv_organ_name").focus();
					return false;
				}				
				if (inv_corpo_number == ""){
					g360.gAlert("Error", "사업자등록증 번호를 입력해주세요" , "red", "left");
					$("#inv_corpo_number").focus();
					return false;
				}				
				if (inv_email_addr == ""){
					g360.gAlert("Error", "이메일주소를 입력해주세요" , "red", "left");
					$("#inv_email_addr").focus();
					return false;
				}
				
				
			    myDropzone.processQueue();
			       
			}else if (rs == "spxx2"){
				//현금영수증 등록
				
				var rec_corpo_number = $("#rec_corpo_number").val();
				var rec_mob_number = $("#rec_mob_number").val();
				
				if (rec_corpo_number == ""){
					g360.gAlert("Error", "사업자등록번호를 입력해주세요" , "red", "left");
					$("#rec_corpo_number").focus();
					return false;
				}
				
				if (rec_mob_number == ""){
					g360.gAlert("Error", "휴대폰번호를 입력해주세요" , "red", "left");
					$("#rec_mob_number").focus();
					return false;
				}
				
				
				var data = JSON.stringify({
					rec_corpo_number : rec_corpo_number,
					rec_mob_number : rec_mob_number,
					inv_email_addr : g360.UserInfo.email,
					xmemox : g360.UserInfo.nickname,
					select_id : gRAL.sel_id,
					type : "2"
				});
				
				var url = g360.root_path + "/save_approval_info.mon";
				$.ajax({
					type : "POST",
					dataType : "json",
					contentType : "application/json; charset=utf-8",
					data : data,
					url : url,
					success : function(res){
						if (res.result == "OK"){
							g360.gAlert("Error", "정상적으로 요청되었습니다." , "red", "left");
							$(".close_svcmgmt_popup").click();
						}
					},
					error : function(e){
						alert(e.message);
					}
				})
				
			}				
		});*/
		

		$("#file_upload_approval2").dropzone({
			maxFiles : 1,
			//acceptedFiles: ".jpeg,.jpg,.gif,.png",
			uploadMutiple : false,
			autoProcessQueue : false,
			addRemoveLinks : true,
			clickable : "#file_upload_approval2",
			dictDefaultMessage: "사업자 등록증 파일을 선택해 주세요",
		//	previewsContainer: "#hidden_upload", 
			url : "/FileUpload_Approval_File.gu",
			init : function(){
//				this.on("addedfile", function(file){
//					
//					if ( (file.type != "image/png") && (file.type != "image/jpg") && (file.type != "image/jpeg") && (file.type != "image/gif")){
//						g360.gAlert("Error", "이미지 파일만 업로드 할 수 있습니다." , "red", "left");
//					}
//					
//				});
//				
				this.on("complete", function(file){
					console.log("complete");
					this.removeAllFiles(true);
				});
				
				this.on("queuecomplete", function(file){
					console.log("queuecomplete");
				});
			},
			
			uploadprogress : function(fie, progress, bytesSent){
				console.log("uploadprogress : " + progress);
			},
			success : function(file, response){
				console.log("success");
				
				var isOK = JSON.parse(response).result;
				if (isOK == "OK"){
					var res = JSON.parse(response);
					gRAL.res = res;
					
					var inv_organ_name = $("#inv_organ_name").val();
					var inv_corpo_number = $("#inv_corpo_number").val();
					var inv_email_addr = $("#inv_email_addr").val();
					var xmemox = $("#xmemox").val();
					
					var data = JSON.stringify({
						inv_organ_name : inv_organ_name,
						inv_corpo_number : inv_corpo_number,
						inv_email_addr : inv_email_addr,
						xmemox : xmemox,
						res : res,
						select_id : gRAL.sel_id,
						type : "1"
					});
					
					var url = g360.root_path + "/save_approval_info.mon";
					$.ajax({
						type : "POST",
						dataType : "json",
						contentType : "application/json; charset=utf-8",
						data : data,
						url : url,
						success : function(res){
							if (res.result == "OK"){
								g360.gAlert("Error", "정상적으로 요청되었습니다." , "red", "left");
								$(".close_svcmgmt_popup").click();
							}
						},
						error : function(e){
							alert(e.message);
						}
					})
				}
				
				
			}
		});	
		
		
		
		
		
		
		
		
		
		
		
		$("#spxx1").on("click", function(e){
			//세금계산서를 작성하겠다는 의도 현금영수증을 disabled 처리해야 한다.
			$("#rec_corpo_number").attr("disabled", true);
			$("#rec_mob_number").attr("disabled", true);
			
			$("#inv_organ_name").attr("disabled", false);
			$("#inv_corpo_number").attr("disabled", false);
			$("#inv_email_addr").attr("disabled", false);
			$("#xmemox").attr("disabled", false);
			$("#inv_buss_licence").show();
			$("#file_upload_approval2").show();
			
		});
		
		$("#spxx2").on("click", function(e){
			//현금영수증을 작성하겠다는 의도 세금계산서를 disabled 처리해야 한다.
			$("#rec_corpo_number").attr("disabled", false);
			$("#rec_mob_number").attr("disabled", false);
			
			$("#inv_organ_name").attr("disabled", true);
			$("#inv_corpo_number").attr("disabled", true);
			$("#inv_email_addr").attr("disabled", true);
			$("#xmemox").attr("disabled", true);
			$("#inv_buss_licence").hide();
			$("#file_upload_approval2").hide();
		});
		
			
	},
	
	"select_id" : function(){
		var sel_id = "";
		$(".xcombo").each(function(e){
			if ($(this).is(":checked")){
				sel_id = $(this).val();	
				
			}
		});
		return sel_id;
	},
	
	"showPrice" : function(month){
		
		var url = '/main/rental/estimate.jsp?open';
		if (month) {
			url += '&month=' + month;
		}
		
		var w = screen.width >= 800 ? 900 : screen.width;
		var h = screen.height - 200;		
		
		window.open(url,'gallery360_rental_price','height=' + h + ',width=' + w + 'fullscreen=yes')
	},
	

	
	"empty_class_on" : function(){
		$(".sub_common_content.account_setting aside ul li").each(function(evnet){
			$(this).removeClass("on");
		});
	},
	
	"goto_password_change" : function(){
		
		if (g360.UserInfo.site == ""){
			g360.LoadPage("body_content", g360.root_path + "/rental/account/password.jsp");
			return false;
		}else{
			g360.gAlert("Error","SNS계정으로 로그인한 사용자는 패스워드를 변경할 수 없습니다.", "red", "left");
			return false;
		}

	},
	
	
	
	
	"load_logdata" : function(cPage){
		
	
		gRAL.cPage = cPage;
		var start = (parseInt(gRAL.perpage) * (parseInt(gRAL.cPage))) - (parseInt(gRAL.perpage) - 1);
		start = parseInt(start) -1 ;
		
			
		var url = g360.root_path + "/load_rental_approval_list.mon?start="+start+"&perpage="+gRAL.perpage + "&ty=" + gRAL.ty;

		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json, charset=utf-8",
			url : url,
			success : function(data){
								
				gRAL.list_draw_log(data);
				gRAL.search_paging(gRAL.cPage);
				
			},
			error : function(e){
				g360.gAlert("Info","데이터 로딩시 오류가 발생하였습니다.", "blue", "top");
			}
		})
	},
		
	
	"list_draw_log" : function(data){
		//debugger;
		/*
		expire_date: "2021-04-14"
		pginfo:
			apply_num: "43695526"
			bank_name: null
			buyer_addr: ""
			buyer_email: "spacemc773@gmail.com"
			buyer_name: ""
			buyer_postcode: ""
			buyer_tel: ""
			card_name: "삼성카드"
			card_number: "536142100027"
			card_quota: 0
			currency: "KRW"
			custom_data: null
			imp_uid: "imp_249678206917"
			merchant_uid: "merchant_1607612629962_2081294379"
			name: "대관서비스 올인원 결재"
			paid_amount: 330000
			paid_at: 1607612728
			pay_method: "card"
			pg_provider: "html5_inicis"
			pg_tid: "StdpayCARDMOIgall36020201211000526320279"
			pg_type: "payment"
			receipt_url: "https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/mCmReceipt_head.jsp?noTid=StdpayCARDMOIgall36020201211000526320279&noMethod=1"
			status: "paid"
			success: true
		
		rental_level: "Option"
		service_message_count: 1000
		service_month: "2"
		service_price: "330000"
		service_static: "T"
		service_vr_count: "1"
		*/
		
		var list = data;
		var totalcount = list[0].totalcount;
		gRAL.totalcount = totalcount;
		
//	$("#tocnt").html("(총 : " + g360.comma(totalcount) + "명)");
	
		var html = "";			
		
		html += "<table >";
		html += "<thead >";
		html += "	<tr>";
		html += "		<td style='height:40px; font-size:14px; text-align:center; width:50px'></td>";
		html += "		<td style='width:100px; height:40px; font-size:14px; text-align:center'>요금제</td>";
		html += "		<td style='width:80px; font-size:14px; text-align:center'>대관개수</td>";
		html += "		<td style='width:80px; font-size:14px; text-align:center'>계약기간</td>";
		html += "		<td style='width:150px; font-size:14px; text-align:center'>거래일자/시작일</td>";
		/*html += "		<td style='width:150px; font-size:14px; text-align:center'>종료일</td>";*/
		html += "		<td style='width:100px; font-size:14px; text-align:center'>결제수단</td>";
		html += "		<td style='width:170px; font-size:14px; text-align:center'>요금(VAT포함)</td>";

		html += "	<tr>";
		html += "</thead>";
		
		html += "<tbody style='font-size:14px'>";
		for (var i = 1;  i < data.length; i++){
			
			var info = data[i];			
			var title = "";
			
			//console.log("결제수단 "+info.pginfo.pay_method);
			
			if (typeof(info.pginfo.oneday) != "undefined"){
				if (info.pginfo.oneday == "T"){
					title = "일일 체험";
				}
			}else{
				if (info.rental_level == "Option"){
					title = "All-in-One";
				}
			}
			
			
			var rental_count = info.service_vr_count;
			var rental_term = info.service_month;
			var rental_start = "";
			if (typeof(info.pginfo.paid_at) != "undefined"){
				rental_start = gRAL.Unix_timestamp(info.pginfo.paid_at);
			}else{
				rental_start = "";
			}
			
			var rental_expire = info.expire_date;
			
			var rental_price = "";
			if (typeof(info.pginfo.paid_amount) != "undefined"){
				rental_price = gRAL.comma(info.pginfo.paid_amount);
			}else{
				rental_price = 0;
			}
		
			var card_name = "";
			if (typeof(info.pginfo.card_nam) != "undefined"){
				card_name = info.pginfo.card_name;
			}else{
				card_name = "";
			}
			
			var id = info._id.$oid;
			
			var recp_url = "";
			if (typeof(info.pginfo.receipt_url) != "undefined"){
				recp_url = info.pginfo.receipt_url;
			}else{
				recp_url = "";
			}
			
			
			
			
			html += "<tr>";
			html += "<td style='height:40px; padding-left:5px; text-align:center;'><input type='radio' class='xcombo' style='cursor:pointer' name='svc_choice' value='"+id+"'/></td>";
			html += "<td style='height:40px; padding-left:5px; text-align:center'>"+title+"</td>";
			html += "<td style='padding-left:5px; text-align:center'>"+rental_count+"</td>";
			html += "<td style='padding-left:5px; text-align:center'>"+rental_term+"</td>";
			
			html += "<td style='text-align:center; '>"+rental_start+"</td>";			
			/*html += "<td style='text-align:center;'>"+rental_expire+"</td>";*/
			
			
			//html += "<td style='text-align:center'>"+card_name+"</td>";
			
			//결제수단
			if(typeof(info.pginfo.pay_method)=="undefined"){
				html += "<td style='text-align:center'></td>";
			}else{
				var pay_method = info.pginfo.pay_method;
				
				if(pay_method=="card"){
					html += "<td style='text-align:center'>"+info.pginfo.card_name+"(" + info.pginfo.card_number +")</td>";	
				}else if(pay_method=="cash"){
					//html += "<td style='text-align:center'>계좌이체(" + info.pginfo.com_reg_num +")</td>";
					html += "<td style='text-align:center'>계좌이체</td>";
				}else if(pay_method=="naver_store"){
					html += "<td style='text-align:center'>네이버 스토어</td>";
				}
			}
			
			
			if (typeof(info.pginfo.receipt_url) != "undefined"){
				html += "<td style='text-align:center'>"+rental_price+" <button type='button' class='recepit_show'  data='"+recp_url+"' onclick='gRAL.show_rep(this)'>영수증</button></td>";
			}else{
				html += "<td style='text-align:center'>"+rental_price+"</td>";
			}
			
			html += "</tr>";
			
			
			
			
		}
		html += "</tbody>";
		html += "</table>";
		
			
		
		$("#logdis").html(html);
		
		
	},
	
	"show_rep" : function(obj){
		
		var url = $(obj).attr("data");
		var w = 420;
		var h = 530;		
		
		g360.open_subwin(url, w, h, '', 'gallery360_rental_recept', '');
		//window.open(url,'gallery360_rental_recept','height=' + h + ',width=' + w + 'fullscreen=yes')
	},
	
	"Unix_timestamp" : function(t){
		var date = new Date(t*1000);
		var year = date.getFullYear();
		var month = "0" + (date.getMonth()+1);
		var day = "0" + date.getDate();
		var hour = "0" + date.getHours();
		var minute = "0" + date.getMinutes();
		var second = "0" + date.getSeconds();
		return year + "-" + month.substr(-2) + "-" + day.substr(-2);
	},
	
	"comma" : function(num){
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},

	/////////////////////////// 리스트 페이징 시작 //////////////////////////////////////////////////////////////
	"search_paging" : function(page){
		
		var alldocuments = gRAL.totalcount;
		if (alldocuments % gRAL.perpage > 0 & alldocuments % gRAL.perpage < gRAL.perpage/2 ){
			allPage = Number(Math.round(alldocuments/gRAL.perpage)) + 1;
		}else{
			allPage = Number(Math.round(alldocuments/gRAL.perpage));
		}	

		gRAL.search_navigator(page);
	},
	
	"search_navigator" : function(page){
		
		
		var nav_cpage = page;

		var alldocuments = gRAL.totalcount;
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
				nav[0] = '<li class="p_prev"><a href="#" class="xico" onclick="javascript:gRAL.gotoPage(' + ((((cFrame-1)*10)-1)*gRAL.perpage+1) + ',' + ((cFrame-1)*10) + ');">이전</a></li>';
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
						nav[pIndex] = "<li><a href=# onclick='gRAL.gotoPage("+ (((i-1) * gRAL.perpage) + 1 ) + ", "+ i + ", this)'>" + i + "</a></li>";
						
					}else{
						if (i%10 == '1' ){
							nav[pIndex] = "<li><a href=# onclick='gRAL.gotoPage("+ (((i-1) * gRAL.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";	
						}else{
							nav[pIndex] = "<li><a href=# onclick='gRAL.gotoPage("+ (((i-1) * gRAL.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";
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
				nav[nav.length] = '<li class="p_next"><a href="#" class="xico" onclick="javascript:gRAL.gotoPage(' + ((cFrame*gRAL.perpage*10) + 1) + ',' + ((cFrame*10)+1) + ');">다음</a></li>';
			}
					
	          var navHTML = "";

			if (cFrame == 1 ){
				navHTML = '';
	          }else{
				navHTML = '<li class="p_first"><a href="#" class="xico" onclick="javascript:gRAL.gotoPage(1,1);">처음</a></li>';
	          }		    
			for( var i = 0 ; i < nav.length ; i++){	
	          	navHTML = navHTML + nav[i];
			}
					
			if (cFrame < allFrame){
				navHTML = navHTML + '<li class="p_last"><a href="#" class="xico" onclick="javascript:gRAL.gotoPage(' + ((allPage - 1)*gRAL.perpage + 1) +','+ allPage +')">마지막</a></li>';
	        }else{
				navHTML = navHTML;
	        }
	    
			$("#NAVIGATE").html('<div class="paging"><ul>' + navHTML + '</ul></div>');
		}
	},
	
	"gotoPage" : function(Index, PageNum, obj){
		var nav_cpage = PageNum;
		oldpage = nav_cpage;
		
	//	if (gRAL.select_Groupname != ""){
	//		gRAL.load_groupdata(gRAL.select_Groupname, PageNum);
	//	}else{
			gRAL.load_logdata(PageNum);
	//	}
		
	
	
	}
	//////////////////////////////////////// 리스트 페이징 종료    /////////////////////////////////////////////

}

