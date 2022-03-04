
function gClientArtProject(){	
	gCAPJ = this;
	
	
	gCAPJ.totalcount = 0;
	gCAPJ.perpage = 10;
	gCAPJ.cPage = 1;
	
	gCAPJ.project =  new Object();
	gCAPJ.opt = "";
	
	
	gCAPJ.data = "";
	gCAPJ.open_detail_dockey = "";
}

gClientArtProject.prototype = {		

	"init" : function(){
		var _self = this;	
		
		$(".sub_header_tab li").on("click", function(event){

			// 기존 선택된 항목을 모두 지운다.
			$(".sub_header_tab li").removeClass("on");
			
			var id = event.currentTarget.id;
			$(this).addClass("on");
			
			gCAPJ.cPage = 1;
			gCAPJ.totalcount = 0;
			
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
		
		
		$("#proj_memnu1 li").on("click", function(event){
			$("#proj_memnu1 li").removeClass("on");
			$(this).addClass("on");
			return false;
		});
		
		$("#proj_memnu4 li").on("click", function(event){
			$("#proj_memnu1 li").removeClass("on");
			$(this).addClass("on");
			return false;
		});
		
		$("#proj_menu1_exp").on("click", function(event){
			
			gCAPJ.empty_class_on();		
			
			var cls = $(this).get(0).className;
			if (cls.indexOf("on") > -1){
				$(this).removeClass("on");
				$("#proj_memnu1").show();
				$("#proj_memnu1").fadeIn();

			}else{
				$(this).addClass("on");
				$("#proj_memnu1").fadeOut(100);
			}
			$("#proj_menu1").addClass("on");
			
		});
		
		// 종료된 작품 보기
		$("#proj_menu4").on("click", function(event){
			$("#proj_menu4_exp").click();
		});
		$("#proj_menu4_exp").on("click", function(event){
			
			//gCAPJ.empty_class_on();		

			if ($(this).hasClass('on')){
				$(this).removeClass("on");
				$("#proj_memnu4").slideDown(100);	
			}else{
				$(this).addClass("on");
				$("#proj_memnu4").slideUp(100);
			}
			return false;
			//$("#proj_menu4").addClass("on");
			//$("#project_eval_wait").click();
		});
		
		$("#proj_menu2").on("click", function(event){
			g360.history_record("proj_menu2");
			
			gCAPJ.empty_class_on();	
			$(this).addClass("on");
			gCAPJ.opt = "client_support";
			gCAPJ.load_project_list(1);
			$('.sub_header_title h2').text($(this).text());
		});
		
		$("#proj_menu3").on("click", function(event){
			g360.history_record("proj_menu3");
			gCAPJ.empty_class_on();	
			$(this).addClass("on");
			gCAPJ.opt = "client_ing";
			gCAPJ.load_project_list(1);
			$('.sub_header_title h2').text($(this).text());
		});
		
		$("#project_eval_wait").on("click", function(event){
			g360.history_record("project_eval_wait");
			gCAPJ.empty_class_on();	
			$(this).addClass("on");
			gCAPJ.opt = "client_evaling";
			gCAPJ.load_project_list(1);
			$('.sub_header_title h2').text($(this).text());
		});
		
		$("#project_complete").on("click", function(event){
			g360.history_record("project_complete");
			gCAPJ.empty_class_on();
			$(this).addClass("on");
			gCAPJ.opt = "client_end";
			gCAPJ.load_project_list(1);
			$('.sub_header_title h2').text($(this).text());
		});

		// 뒤로가기
		$('.sub_header_title').on('click', function(){
			gCAPJ.empty_class_on();
			$('.sub_common').removeClass('sub_show');
			$('html').scrollTop(0);
		});
		
		
		_self.g_lang();
	},
	
	"g_lang" : function(){
		
		$(".g_lang_Partners_Support_Status").html(g360.g_lang.Partners_Support_Status);
		$(".g_lang_Back").html(g360.g_lang.Back);
		$(".g_lang_Partners1").html(g360.g_lang.Partners1);
		$(".g_lang_Partners2").html(g360.g_lang.Partners2);
		$(".g_lang_Partners3").html(g360.g_lang.Partners3);
		$(".g_lang_Partners4").html(g360.g_lang.Partners4);
		$(".g_lang_Partners5").html(g360.g_lang.Partners5);
		
		$(".g_lang_Mypage1").html(g360.g_lang.Mypage1);
		$(".g_lang_Mypage2").html(g360.g_lang.Mypage2);
		$(".g_lang_Mypage3").html(g360.g_lang.Mypage3);
		$(".g_lang_Mypage4").html(g360.g_lang.Mypage4);
		$(".g_lang_Mypage5").html(g360.g_lang.Mypage5);
		
		
	},
	
	"click_menu" : function(){
		return;
		$("#proj_menu4_exp").click();
		$("#project_eval_wait").click();
	},
	
	
	
	
	"bankinfo2" : function(opt){
		$.confirm({
            title: '무통장 입금 정보',
            content: '계좌번호 : 기업은행 (625-032889-04-010) <br> 예금주명 : 갤러리360(주) <br> 입금 후 입금확인 버튼을 클릭해 주세요<hr>',
            icon: 'fa fa-question-circle',
            animation: 'scale',
            closeAnimation: 'scale',
            opacity: 0.5,
            buttons: {
                'confirm': {
                    text: '입금확인',
                    btnClass: 'btn-blue',
                    action: function(){
                    	gCAPJ.input_nobank(opt);
                    	
                    }
                },               
//                "프로젝트 취소": {
//                    text: '프로젝트 취소',
//                    action: function(){
//                    	gCAPJ.project_delete();
//                        $.alert('you clicked on <strong>something else</strong>');
//                    }
//                 },   
                 
                 "취소": {
                     text: '취소'                    
                  },   
            }
        });		
	},
	
	"input_nobank" : function(dockey){
		//작품제작 상태값 설명 : 필드명 : nobank_status : 1(미입금), 2(입금확인요청), 3(관리자 입금 확인)
		//alert(dockey);
		var url = g360.root_path + "/input_nobank.mon?id="+dockey;
		$.ajax({
			Type : "GET",
			cache : false,
			url : url,
			dataType : "json",
			contentType :"application/json; charset=utf-8",
			success : function(data){
			
				gCAPJ.load_project_list(gCAPJ.cPage);
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	
	
	"load_project_list" : function(page, is_first){
		var html = "";
		
		if (!is_first) {
			$('.sub_common').addClass('sub_show');
		}
		
		
		gCAPJ.cPage = page;		
		var start = (parseInt(gCAPJ.perpage) * (parseInt(gCAPJ.cPage))) - (parseInt(gCAPJ.perpage) - 1);
		start = parseInt(start) -1 ;
		
		var perpage = gCAPJ.perpage;
		
		var url = g360.root_path + "/artProject_list.mon?start="+start+"&perpage="+perpage+"&opt="+gCAPJ.opt;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				gCAPJ.load_project_draw(data);
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	"load_project_draw" : function(data){
		
		
		gCAPJ.totalcount = data[0].totalcount;
		var cnt = "'"+gCAPJ.totalcount + g360.g_lang.Artist_Mypage8 + "'";
		$("#art_list_totalcount").html(cnt)
		var html = "";

		var recommend_count = 0;
		var rowcount = 0;
		
		
		
		for (var i = 1 ; i < data.length; i++){
			
			
			rowcount++;
			
			var sp = data[i];
			var ddd = sp.suggest;
			var suggest_count = 0;
			if (typeof (ddd) != "undefined"){
				suggest_count = ddd.length;
			}
			
			gCAPJ.project[sp.dockey] = sp;
			
			var ty = (sp.request_type == "1") ? g360.g_lang.Square : 
				(sp.request_type == "2") ? g360.g_lang.Horizontal : 
				(sp.request_type == "3") ? g360.g_lang.Vertical : 
				(sp.request_type == "4") ? g360.g_lang.Circle : 
				(sp.request_type == "5") ? g360.g_lang.Set : 
				(sp.request_type == "6") ? g360.g_lang.Install_Art : 
				(sp.request_type == "7") ? g360.g_lang.Media : "";
			
			var open_project_option = (gCAPJ.opt == "all") ? "T" : 
				(gCAPJ.opt == "recommend") ? "T" : 
				(gCAPJ.opt == "product") ? "T" : 
				(gCAPJ.opt == "favorite") ? "T" : 
					"F";
			
			var art_type = "";
			if (sp.request_subform == "1"){
				art_type = "<em class='green_label'>"+g360.g_lang.Request_recommendation+"</em>"
			}else{
				art_type = "<em class='blue_label'>"+g360.g_lang.Request_for_artwork+"</em>"
			}
			
			if (gCAPJ.opt == "client_ing"){
				//작품 제작 요청시에만 처리한다. type : 2일 경우
				
				var date1 = g360.iso_date_convert(sp.art_ok_date);  //계약일 클라이언트가 승인한 날짜
				
				var ss = sp.suggest;
				var select_suggest = new Object();
				for (var u = 0 ; u < ss.length; u++){
					var tt = ss[u];
					if (tt.email == sp.art_ok ){
						select_suggest = tt;
					}
				}
			
				var price = "";
				
				price = g360.comma(g360.setWon(select_suggest.price.replace(",","")* 10000));
				
				
				var complete_date = select_suggest.date;
				var term = select_suggest.art_product_term;
				var ok_date = sp.art_ok_date;
										
				var sday = new Date(ok_date);
				sday.setDate(sday.getDate() + (parseInt(term)+5)); //15일 더하여 setting
				var year = sday.getFullYear();
			//	var month = sday.getMonth() + 1;
				
				var month = "00" + (sday.getMonth() + 1);
				month = month.substr(month.length - 2);    //IE브라우저의 경우 월이 한자리 이면 인식 하지 못한다.
				
				var day = sday.getDate();
				var afterday = year + "-" + month + "-" + day;
				
				var stoday = new Date();
				var today = stoday.getFullYear() + "-" + (parseInt(stoday.getMonth()) + 1) + "-" + stoday.getDate();
				
				
				var ddx = new Date(afterday);
				var ddx = new Date(sday);
				var ddx2 = new Date();				
			
				var xyz = g360.dateDiff(ddx, ddx2) -1 ;
			//	var xyz = g360.dateDiff3(ddx, ddx2) -1 ;
			
	
				html += "<section>";
				html += "	<div class='group_section' style='margin-top:10px; overflow-x:hidden'>";
				html += "		<div class='wrap_group evaluation noborder_top'>";
				html += "			<div class='wrap_group_header'>";
				
				var url = g360.artProject_preview_img_path(sp.request_email, sp.request_file_name);
				html += "                      <div style='float:left; cursor:pointer' onclick=\"g360.preview_img('"+sp.request_file_name+"','"+sp.request_email+"','artRequest')\">";
				html += "						<img style='width:120px; height:120px; margin-right:10px' src='"+url+"'></div>";
				
				
				html += "				<h4>"+art_type + sp.request_title  +  "</h4>";
				html += "				<div class='evaluation_info' style='float:left;position:absolute;padding-left:135px'>";
				html += "					<dl>";
				html += "						<dt>"+g360.g_lang.Partners6+"</dt>";
				html += "						<dd>"+sp.request_nickname+"<dd>";
				html += "					</dl>";
				html += "					<dl>";
				html += "						<dt>"+g360.g_lang.Partners7+"</dt>";
				html += "						<dd>"+date1+"<dd>";
				html += "					</dl>";			
				html += "				</div>";
				
				
			
				html += "				<div class='evaluation_info' style='float:left;position:absolute;top:80px; padding-left:135px'>";
				if (sp.pay_method == "nobank"){
					//무통장 입금일 경우
					if (sp.nobank_status == "2"){
						html += "					<dl>";
						html += "						<dt style='color:blue'>";
						html += 						g360.g_lang.Partners8;
						html += "						</dt>";
						html += "					</dl>";
					}else if (sp.nobank_status == "3"){
						html += "					<dl>";
						html += "						<dt style='color:red'>";
						html +=  						g360.g_lang.Partners9;
						html += "						</dt>";
						html += "					</dl>";
					}else{
						html += "					<dl>";
						html += "						<dt>";
						html += "							<button class='btn btn_fold' onclick=\"gCAPJ.bankinfo2('"+sp.dockey+"'); return false;\">"+g360.g_lang.Partners10+"</button> "+g360.g_lang.Partners10;
						html += "						</dt>";
						html += "					</dl>";
					}

				}else{
					//가상통장 일 경우
					
				}
				
				html += "				</div>";
							
				
				
				html += "				<div class='d_day'>";
				html += 				xyz+g360.g_lang.Partners12;
				html += "				</div>";
				html += "			</div>";
				html += "			<div class='contract'>";
				html += "				<table>";
				html += "					<colgroup>";
				html += "						<col class='t_th' style='width:130px' />";
				html += "						<col />";
				html += "						<col class='t_th' style='width:130px' />";
				html += "						<col />";
				html += "					</colgroup>";
				html += "					<tbody>";
				html += "						<tr>";
				html += "							<th>"+g360.g_lang.Partners13+"</th>";
				html += "							<td colspan='3'><strong>"+sp.request_title+"</strong></td>";
				html += "						</tr>";
				html += "						<tr>";
				html += "							<th>"+g360.g_lang.Partners14+"</th>";
				html += "							<td><strong>"+price+"</strong> </td>";
				html += "							<th>"+g360.g_lang.Partners15+"</th>";
				html += "							<td><strong>"+(parseInt(term)+5)+g360.g_lang.Partners22+"</strong> ("+ g360.g_lang.Partners16 + term + g360.g_lang.Partners17 + ")</td>";
				html += "						</tr>";
				html += "						<tr>";
				html += "							<th>"+g360.g_lang.Partners18+"</th>";
				html += "							<td><span>"+afterday+"</span></td>";
				html += "							<th>"+g360.g_lang.Partners19+"</th>";
				html += "							<td><span>"+sp.art_rate+g360.g_lang.Partners20+"</span></td>";
				html += "						</tr>";
				html += "					</tbody>";
				html += "				</table>";
				
				html += "				<div class='process bg_white'>";
				html += "					<table>";
				html += "						<colgroup>";
				html += "							<col class='t_th' style='width:130px' />";
				html += "							<col />";
				html += "						</colgroup>";
				html += "						<tbody id=\"report_"+i+"\" >";
				
				if (typeof(sp.report) != "undefined"){
					var spx = sp.report;
					for (var k = 0 ; k < spx.length; k++){
						var ddx = spx[k];
						html += "		<tr>";
						html += "			<th><strong style='font-size:14px'>"+g360.g_lang.Notice_5+"  ["+ddx.rate+"%]</strong><div>"+g360.iso_date_convert(ddx.date)+" </div></th>";
						html += "			<td>";
						html += "			<div>"+g360.TextToHtml(ddx.report_memo) ;
						
						html += "			<button class='btn btn_ghost btn_add_file' onclick=\"g360.preview_img('"+ddx.uploadfilename+"','"+ddx.email+"','artproject')\">"+g360.g_lang.Partners21+"</button>";
						html += "			</div></td>";
						html += "		</tr>";
					}
				}
				
			
				html += "						</tbody>";
				html += "					</table>";
				html += "				</div>";
				
				
				
				html += "				<div class='btn_view_area'><button class='btn btn_gray btn_detail_view' onclick=\"gCAPJ.collapse('"+i+"', this)\">진행사항 접기</button></div>";
				html += "			</div>";
				html += "		</div>";
				html += "	</div>";
				
	
				
				html += "</section>";

			}else if (gCAPJ.opt == "client_evaling"){
				
				//작품 제작 요청시에만 처리한다. type : 2일 경우
				
				var date1 = g360.iso_date_convert(sp.art_ok_date);  //계약일 클라이언트가 승인한 날짜
				
				var ss = sp.suggest;
				var select_suggest = new Object();
				for (var u = 0 ; u < ss.length; u++){
					var tt = ss[u];
					if (tt.email == sp.art_ok ){
						select_suggest = tt;
					}
				}
			
				var price = "";
				
				price = g360.comma(g360.setWon(select_suggest.price.replace(",","")* 10000));
				
				
				var complete_date = select_suggest.date;
				var term = select_suggest.art_product_term;
				var ok_date = sp.art_ok_date;
										
				var sday = new Date(ok_date);
				sday.setDate(sday.getDate() + (parseInt(term)+5)); //15일 더하여 setting
				var year = sday.getFullYear();
			//	var month = sday.getMonth() + 1;
				
				var month = "00" + (sday.getMonth() + 1);
				month = month.substr(month.length - 2);    //IE브라우저의 경우 월이 한자리 이면 인식 하지 못한다.
				
				var day = sday.getDate();
				var afterday = year + "-" + month + "-" + day;
				
				var stoday = new Date();
				var today = stoday.getFullYear() + "-" + (parseInt(stoday.getMonth()) + 1) + "-" + stoday.getDate();
				
				
				var ddx = new Date(afterday);
				var ddx2 = new Date();				
				var xyz = g360.dateDiff(ddx, ddx2) -1 ;
			
	
			//	var html = "";
				html += "<section>";
				
				
				html += "	<div class='group_section' style='overflow:hidden'>";
			//	html += "	<div class='group_section' >";
				
				html += "		<div class='wrap_group evaluation noborder_top'>";
				html += "			<div class='wrap_group_header'>";
//				html += "				<button class='btn btn_gray btn_contract_view'>계약서 보기</button>";
				
				var url = g360.artProject_preview_img_path(sp.request_email, sp.request_file_name);
				html += "                      <div style='float:left; cursor:pointer' onclick=\"g360.preview_img('"+sp.request_file_name+"','"+sp.request_email+"','artRequest')\">";
				html += "						<img style='width:120px; height:120px; margin-right:10px' src='"+url+"'></div>";
				
				html += "				<h4>"+art_type + sp.request_title  +  "</h4>";
				html += "				<div class='evaluation_info' style='float:left;position:absolute;padding-left:135px'>";
				html += "					<dl>";
				html += "						<dt>"+g360.g_lang.Partners6+"</dt>";
				html += "						<dd>" + sp.art_nickname+"<dd>";
				html += "					</dl>";
				html += "					<dl>";
				html += "						<dt>"+g360.g_lang.Partners7+"</dt>";
				html += "						<dd>"+date1+"<dd>";
				html += "					</dl>";
				html += "				</div>";
//				html += "				<div class='d_day'>";
//				html += "					0일";
//				html += "				</div>";
				html += "			</div>";
				html += "			<div class='contract'>";
				html += "				<table>";
				html += "					<colgroup>";
				html += "						<col class='t_th' />";
				html += "						<col />";
				html += "						<col class='t_th' />";
				html += "						<col />";
				html += "					</colgroup>";
				html += "					<tbody>";
				html += "						<tr>";
				html += "							<th>"+g360.g_lang.Partners13+"</th>";
				html += "							<td colspan='3'><strong>"+sp.request_title+"</strong></td>";
				html += "						</tr>";
				html += "						<tr>";
				html += "							<th>"+g360.g_lang.Partners14+"</th>";
				html += "							<td><strong>"+price+"</strong> </td>";
				html += "							<th>"+g360.g_lang.Partners15+"</th>";
				html += "							<td><strong>"+(parseInt(term)+5)+g360.g_lang.Partners22+"</strong> ("+g360.g_lang.Partners16 + term + g360.g_lang.Partners17 + ")</td>";
				html += "						</tr>";
				html += "					</tbody>";
				html += "				</table>";
				
				
				html += "				<div class='process bg_white'>";
				html += "					<table>";
				html += "						<colgroup>";
				html += "							<col class='t_th' style='width:130px' />";
				html += "							<col />";
				html += "						</colgroup>";
				html += "						<tbody id=\"report_"+i+"\" >";
				
				if (typeof(sp.report) != "undefined"){
					var spx = sp.report;
					for (var k = 0 ; k < spx.length; k++){
						var ddx = spx[k];
						html += "		<tr>";
						html += "			<th><strong style='font-size:14px'>"+g360.g_lang.Notice_5+"  ["+ddx.rate+"%]</strong><div>"+g360.iso_date_convert(ddx.date)+" </div></th>";
						html += "			<td>";
						html += "			<div>"+g360.TextToHtml(ddx.report_memo) ;
						
						html += "			<button class='btn btn_ghost btn_add_file' onclick=\"g360.preview_img('"+ddx.uploadfilename+"','"+ddx.email+"','artproject')\">"+g360.g_lang.Partners21+"</button>";
						html += "			</div></td>";
						html += "		</tr>";
					}
				}
				
			
				html += "						</tbody>";
				html += "					</table>";
				html += "				</div>";
				
				
				
				
				html += "				<div class='evaluation_area bg_white'>";
			
				var pimg_url = g360.user_photo_url(sp.art_ok);
				
				html += "					<div class='thm_person'><img src='"+pimg_url+"' onerror=\"g360.user_photo_url_none_draw(this)\"></div>";
				html += "					<p>";
				html += "						<strong>"+g360.g_lang.Partners23+"‘"+sp.art_nickname+"’"+g360.g_lang.Partners24+"</strong>";
				html += 						g360.g_lang.Partners25;
				html += "					</p>";
			//	html += "					<button class='btn btn_violet btn_evaluation'>평가하기</button>";
						
				html += "					<div class='evaluation_write'>";
											
				
				html += "						<ul class='star_list' id='star_check_"+i+"'>";
				html += "							<li>";
				html += "								<div class='star' id='score1'>";
				html += "									<span>"+g360.g_lang.labels1+"</span>";
				html += "									<img src='/img/account/star-r-disable.svg' id='s1_1' >";
				html += "									<img src='/img/account/star-r-disable.svg' id='s1_2'  >";
				html += "									<img src='/img/account/star-r-disable.svg' id='s1_3'  >";
				html += "									<img src='/img/account/star-r-disable.svg' id='s1_4'  >";
				html += "									<img src='/img/account/star-r-disable.svg' id='s1_5'  >";
				html += "									<strong>5점</strong>";
				html += "								</div>";
				html += "							</li>";
				html += "							<li>";
				html += "								<div class='star' id='score2'>";
				html += "									<span>"+g360.g_lang.labels4+"</span>";
				html += "									<img src='/img/account/star-r-disable.svg'  id='s2_1' >";
				html += "									<img src='/img/account/star-r-disable.svg'  id='s2_2' >";
				html += "									<img src='/img/account/star-r-disable.svg'  id='s2_3' >";
				html += "									<img src='/img/account/star-r-disable.svg'  id='s2_4' >";
				html += "									<img src='/img/account/star-r-disable.svg'  id='s2_5' >";
				html += "									<strong>4점</strong>";
				html += "								</div>";
				html += "							</li>";
				html += "							<li>";
				html += "								<div class='star' id='score3'>";
				html += "									<span>"+g360.g_lang.Partners27+"</span>";
				html += "									<img src='/img/account/star-r-disable.svg'  id='s3_1' >";
				html += "									<img src='/img/account/star-r-disable.svg'  id='s3_2' >";
				html += "									<img src='/img/account/star-r-disable.svg'  id='s3_3' >";
				html += "									<img src='/img/account/star-r-disable.svg'  id='s3_4' >";
				html += "									<img src='/img/account/star-r-disable.svg'  id='s3_5' >";
				html += "									<strong>3점</strong>";
				html += "								</div>";
				html += "							</li>";
				html += "							<li>";
				html += "								<div class='star' id='score4'>";
				html += "									<span>"+g360.g_lang.Partners28+"</span>";
				html += "									<img src='/img/account/star-r-disable.svg'  id='s4_1' >";
				html += "									<img src='/img/account/star-r-disable.svg'  id='s4_2' >";
				html += "									<img src='/img/account/star-r-disable.svg'  id='s4_3' >";
				html += "									<img src='/img/account/star-r-disable.svg'  id='s4_4' >";
				html += "									<img src='/img/account/star-r-disable.svg'  id='s4_5' >";
				html += "									<strong>2점</strong>";
				html += "								</div>";
				html += "							</li>";
				html += "							<li>";
				html += "								<div class='star' id='score5'>";
				html += "									<span>"+g360.g_lang.Partners29+"</span>";
				html += "									<img src='/img/account/star-r-disable.svg'  id='s5_1' >";
				html += "									<img src='/img/account/star-r-disable.svg'  id='s5_2' >";
				html += "									<img src='/img/account/star-r-disable.svg'  id='s5_3' >";
				html += "									<img src='/img/account/star-r-disable.svg'  id='s5_4' >";
				html += "									<img src='/img/account/star-r-disable.svg'  id='s5_5' >";
				html += "									<strong>1점</strong>";
				html += "								</div>";
				html += "							</li>";
				html += "						</ul>";
				
				html += "						<div class='write_area term'>";
				html += "							<h5>"+g360.g_lang.Partners30+"</h5>";
				html += "							<div class='num'></div>";
				html += "							<textarea class='txt textarea' style='height:126px' id='comment_"+i+"'></textarea>";
				html += "								<div class='btn_area'>";
			//	html += "									<button class='btn btn_gray btn_cancel'>취소</button>";
				html += "									<button class='btn btn_violet btn_ok' onclick=\"gCAPJ.evalComplete('"+sp.dockey+"','"+i+"','"+sp.art_ok+"')\">"+g360.g_lang.Partners26+"</button>";
				html += "								</div>";
				html += "						</div>";
				
//				html += "						<div class='write_area term'>";
//				html += "							<p>먼저 좋은 작품 감사드립니다. 진행하는동안 과정을 사진으로 보여주셔서 안심되었고 요구사항도 잘 이해하시어 반영해주셔서 좋았습니다. 다음에도 이화수 작가님과 함께 하고 싶습니다.<br />수고많으셨습니다.</p>";
//				html += "						</div>";
				
				
				html += "					</div>";
				html += "				</div>";
				html += "			</div>";
				html += "		</div>";
				html += "	</div>";
				
		
						
			}else if (gCAPJ.opt == "client_end" && sp.request_subform == "2"){
				var date1 = g360.iso_date_convert(sp.art_ok_date);  //계약일 클라이언트가 승인한 날짜
				
				var ss = sp.suggest;
				var select_suggest = new Object();
				for (var u = 0 ; u < ss.length; u++){
					var tt = ss[u];
					if (tt.email == sp.art_ok ){
						select_suggest = tt;
					}
				}
			
				var price = "";
				
				price = g360.comma(g360.setWon(select_suggest.price.replace(",","")* 10000));
				
				
				var complete_date = select_suggest.date;
				var term = select_suggest.art_product_term;
				var ok_date = sp.art_ok_date;
										
				var sday = new Date(ok_date);
				sday.setDate(sday.getDate() + (parseInt(term)+5)); //15일 더하여 setting
				var year = sday.getFullYear();
			//	var month = sday.getMonth() + 1;
				
				var month = "00" + (sday.getMonth() + 1);
				month = month.substr(month.length - 2);    //IE브라우저의 경우 월이 한자리 이면 인식 하지 못한다.
				
				var day = sday.getDate();
				var afterday = year + "-" + month + "-" + day;
				
				var stoday = new Date();
				var today = stoday.getFullYear() + "-" + (parseInt(stoday.getMonth()) + 1) + "-" + stoday.getDate();
				
				
				var ddx = new Date(afterday);
				var ddx2 = new Date();				
				var xyz = g360.dateDiff(ddx, ddx2) -1 ;
			
				var evaluation = sp.eval;
				
	
			//	var html = "";
				html += "<section>";
				html += "	<div class='group_section' style='overflow:hidden'>";
				html += "		<div class='wrap_group evaluation noborder_top'>";
				html += "			<div class='wrap_group_header'>";
//				html += "				<button class='btn btn_gray btn_contract_view'>계약서 보기</button>";
				
				var url = g360.artProject_preview_img_path(sp.request_email, sp.request_file_name);
				html += "                      <div style='float:left; cursor:pointer' onclick=\"g360.preview_img('"+sp.request_file_name+"','"+sp.request_email+"','artRequest')\">";
				html += "						<img style='width:120px; height:120px; margin-right:10px' src='"+url+"'></div>";
				
				
				html += "				<h4>"+art_type + sp.request_title  +  "</h4>";
				html += "				<div class='evaluation_info'  style='float:left;position:absolute;padding-left:135px'>";
				html += "					<dl>";
				html += "						<dt>"+g360.g_lang.Partners6+"</dt>";
				html += "						<dd>" + sp.art_nickname+"<dd>";
				html += "					</dl>";
				html += "					<dl>";
				html += "						<dt>"+g360.g_lang.Partners7+"</dt>";
				html += "						<dd>"+date1+"<dd>";
				html += "					</dl>";
				html += "				</div>";
//				html += "				<div class='d_day'>";
//				html += "					0일";
//				html += "				</div>";
				html += "			</div>";
				html += "			<div class='contract'>";
				html += "				<table>";
				html += "					<colgroup>";
				html += "						<col class='t_th' />";
				html += "						<col />";
				html += "						<col class='t_th' />";
				html += "						<col />";
				html += "					</colgroup>";
				html += "					<tbody>";
				html += "						<tr>";
				html += "							<th>"+g360.g_lang.Partners13+"</th>";
				html += "							<td colspan='3'><strong>"+sp.request_title+"</strong></td>";
				html += "						</tr>";
				html += "						<tr>";
				html += "							<th>"+g360.g_lang.Partners14+"</th>";
				html += "							<td><strong>"+price+"</strong> </td>";
				html += "							<th>"+g360.g_lang.Partners15+"</th>";
				html += "							<td><strong>"+(parseInt(term)+5)+g360.g_lang.Partner22+"</strong> (" + g360.g_lang.Partners16 + term + g360.g_lang.Partners17+")</td>";
				html += "						</tr>";
				html += "					</tbody>";
				html += "				</table>";
				
				
				html += "				<div class='process bg_white'>";
				html += "					<table>";
				html += "						<colgroup>";
				html += "							<col class='t_th' style='width:130px' />";
				html += "							<col />";
				html += "						</colgroup>";
				html += "						<tbody id=\"report_"+i+"\" >";
				
				if (typeof(sp.report) != "undefined"){
					var spx = sp.report;
					for (var k = 0 ; k < spx.length; k++){
						var ddx = spx[k];
						html += "		<tr>";
						html += "			<th><strong style='font-size:14px'>"+g360.g_lang.Notice_5+"  ["+ddx.rate+"%]</strong><div>"+g360.iso_date_convert(ddx.date)+" </div></th>";
						html += "			<td>";
						html += "			<div>"+g360.TextToHtml(ddx.report_memo) ;
						
						html += "			<button class='btn btn_ghost btn_add_file' onclick=\"g360.preview_img('"+ddx.uploadfilename+"','"+ddx.email+"','artproject')\">"+g360.g_lang.Partners21+"</button>";
						html += "			</div></td>";
						html += "		</tr>";
					}
				}
				
			
				html += "						</tbody>";
				html += "					</table>";
				html += "				</div>";
				
				
				
				
				
				html += "				<div class='evaluation_area bg_white'>";
				html += "					<div class='evaluation_write'>";
											
				
				html += "						<ul class='star_list' id='star_check_"+i+"'>";
				html += "							<li>";
				html += "								<div class='star' id='score1'>";
				html += "									<span>"+g360.g_lang.labels1+"</span>";

				
				for (var r = 1; r <= 5; r++){
					if (r <= parseInt(evaluation.score1)){
						html += "									<img src='/img/account/star-r-focus.svg' >";
					}else{
						html += "									<img src='/img/account/star-r-disable.svg' >";
					}
				}
				
				
				html += "									<strong>"+evaluation.score1+"점</strong>";
				html += "								</div>";
				html += "							</li>";
				html += "							<li>";
				html += "								<div class='star' id='score2'>";
				html += "									<span>"+g360.g_lang.labels4+"</span>";
				for (var r = 1; r <= 5; r++){
					if (r <= parseInt(evaluation.score2)){
						html += "									<img src='/img/account/star-r-focus.svg' >";
					}else{
						html += "									<img src='/img/account/star-r-disable.svg' >";
					}
				}
				html += "									<strong>"+evaluation.score1+"점</strong>";
				html += "								</div>";
				html += "							</li>";
				html += "							<li>";
				html += "								<div class='star' id='score3'>";
				html += "									<span>"+g360.g_lang.Partners27+"</span>";
				for (var r = 1; r <= 5; r++){
					if (r <= parseInt(evaluation.score3)){
						html += "									<img src='/img/account/star-r-focus.svg' >";
					}else{
						html += "									<img src='/img/account/star-r-disable.svg' >";
					}
				}
				html += "									<strong>"+evaluation.score1+"점</strong>";
				html += "								</div>";
				html += "							</li>";
				html += "							<li>";
				html += "								<div class='star' id='score4'>";
				html += "									<span>"+g360.g_lang.Partners28+"</span>";
				for (var r = 1; r <= 5; r++){
					if (r <= parseInt(evaluation.score4)){
						html += "									<img src='/img/account/star-r-focus.svg' >";
					}else{
						html += "									<img src='/img/account/star-r-disable.svg' >";
					}
				}
				html += "									<strong>"+evaluation.score1+"점</strong>";
				html += "								</div>";
				html += "							</li>";
				html += "							<li>";
				html += "								<div class='star' id='score5'>";
				html += "									<span>"+g360.g_lang.Partners29+"</span>";
				for (var r = 1; r <= 5; r++){
					if (r <= parseInt(evaluation.score5)){
						html += "									<img src='/img/account/star-r-focus.svg' >";
					}else{
						html += "									<img src='/img/account/star-r-disable.svg' >";
					}
				}
				html += "									<strong>"+evaluation.score1+"점</strong>";
				html += "								</div>";
				html += "							</li>";
				html += "						</ul>";
				
				html += "						<div class='write_area term'>";
				html += "							<p>"+g360.TextToHtml(evaluation.comment)+"</p>";
				html += "						</div>";
				
				
				html += "					</div>";
				html += "				</div>";
							
				html += "			</div>";
				html += "		</div>";
				html += "	</div>";
			
				
			}else{
				
				html += "<div class='group_section' id='group_section_dis_"+i+"'>";
				html += "	<div class='wrap_group evaluation noborder_top'>";
				html += "		<div class='wrap_group_header'  >";
				
				
				//request_subform : 1 - 작품 추천 요청 / request_subform : 2 - 작품 제작 요청
				//request_status : 1 - 진행중 -지원가능/ 2 - 완료 - 지원마감 / 3 - 평가 대기중  / 4 - 프로젝트 전체 완료
				
				if (sp.request_subform == "1"){
					if (open_project_option == "T"){
						html += "			<h4 onclick=\"gPAProject.open_project('"+sp.dockey+"')\" style='cursor:pointer'><em class='green_label'>"+g360.g_lang.Request_recommendation+"</em>";
					}else{
						html += "			<h4 ><em class='green_label'>"+g360.g_lang.Request_recommendation+"</em>";
					}
					
				}else{
					recommend_count ++;
					if (open_project_option == "T"){
						html += "			<h4 onclick=\"gPAProject.open_project('"+sp.dockey+"')\" style='cursor:pointer'><em class='blue_label'>"+g360.g_lang.Request_for_artwork+"</em>";
					}else{
						html += "			<h4 ><em class='blue_label'>"+g360.g_lang.Request_for_artwork+"</em>";
					}
					
				}
				html += 	sp.request_title + " <div class='wrap_group_date'><span>"+g360.g_lang.Registration_date+" : </span>"+g360.iso_date_convert(sp.date)+"</div></h4>";
				
				
				html += "			<div class='wrap_group_invite'><img src='/img/account/icon-invite-a-friend.svg' />"+ g360.g_lang.Total_Apply1 + suggest_count+ g360.g_lang.Total_Apply2 + "</div>";
				html += "				<div class='evaluation_info'>";
				html += "					<ul>";
				
	
				if (typeof(sp.request_file_name) != "undefined"){
					//html += "						<li class='ei_file' style='cursor:pointer; color:#ffc107; background-color:#867954' onclick=\"g360.preview_img('"+sp.request_file_name+"','"+sp.request_email+"','artRequest')\">첨부파일</li>";
				//	var url = "/artimage/" + sp.request_email + "/artRequest/mobile/" + sp.request_file_name + ".jpg";		
					var url = g360.artProject_preview_img_path(sp.request_email, sp.request_file_name);
					html += "                      <div style='float:left; cursor:pointer' onclick=\"g360.preview_img('"+sp.request_file_name+"','"+sp.request_email+"','artRequest')\">";
					html += "						<img style='width:120px; height:120px; margin-right:10px' src='"+url+"'></div>";
					
				}else if (typeof(sp.request_selectimg_path) != "undefined" && sp.request_selectimg_path != ""){
					var url = sp.request_selectimg_path;
					html += "                      <div style='float:left; cursor:pointer' onclick=\"g360.preview_img_direct('"+sp.request_selectimg_path+"','"+sp.request_email+"','artRequest')\">";
					if (url != '') {
						html += "						<img style='width:120px; height:120px; margin-right:10px' src='"+url+"'>";
					}
					html += "					   </div>";	
					
					
				}else{
					html += "						<li class='ei_file disabled'>"+g360.g_lang.Attachments+"</li>";
				}
				

				
				
				html += "						<li class='ei_type'><span>"+g360.g_lang.Form+"</span>"+ty+"</li>";
				html += "						<li class='ei_size'><span>"+g360.g_lang.Size1+"</span>"+sp.request_width+"cm x "+sp.request_height+"cm</li>";
				
				if(g360.g_lang.Lang == "ko"){
					html += "						<li class='ei_price'><span>"+g360.g_lang.Request_amount+"</span>"+g360.comma(g360.setWon(sp.request_price* 10000))+"</li>";						
				}else {
					html += "						<li class='ei_price'><span>"+g360.g_lang.Request_amount+"</span>￦"+g360.comma(sp.request_price* 10000)+"</li>";
				}
				//html += "						<li class='ei_price'><span>"+g360.g_lang.Request_amount+"</span>"+g360.comma(g360.setWon(sp.request_price* 10000))+"</li>";
				
				html += "						<li class='ei_date'><span>"+g360.g_lang.Delivery_request_date+"</span>"+sp.request_date+"</li>";
				html += "					</ul>";
				html += "				</div>";			
				html += "			</div>";
				
				
				
				
				
				
		
				if (typeof(sp.suggest) == "undefined" || sp.suggest.length ==0){
					html += "     		<div class='support' >"
					html += "				<div class='btn_area' >";
					html += "					<button class='btn btn_fold' onclick=\"gCAPJ.project_edit('"+sp.dockey+"', '" +sp.request_subform+ "')\">"+g360.g_lang.Update+"</button>";
					html += "					<button class='btn btn_detail' onclick=\"gCAPJ.project_delete('"+sp.dockey+"')\">"+g360.g_lang.Delete+"</button>";
					html += "				</div>";
					html += "			</div>";
				}
				

				
					
				
				
				
				
				
				
				
				html += "			<div class='wrap_group term introduce'>";
				html += "				<p>"+g360.TextToHtml(sp.request_memo)+"</p>";
				html += "			</div>";
				
				
		

				
				
				if (suggest_count > 0){
					
					html += "			<div class='wrap_group support' id='wgs_"+i+"'>";
					html += "			<div class='group_header type3 autoheight'>";
					html += "				<h3>"+g360.g_lang.Partners31+"</h3>";
					html += "			</div>";
					
					
					for (var y = 0 ; y < ddd.length; y++){
						var sd = ddd[y];
						
						html += "			<div class='partners term bg_white'>";
						
						var img_url = g360.user_photo_url(sd.email);
					//	html += "				<div class='thm'><img src='"+img_url+"' onerror=\"g360.user_photo_url_none_draw(this)\"></div>";
						
						html += "				<div class='thm' style='background-image: url("+img_url+");background-position: center; background-size: cover;' >";
						//<img src='"+img_url+"' onerror=\"g360.user_photo_url_none_draw(this)\">
						html += "</div>";
						
						html += "				<div class='partners_name'>";
						
						
						
						if (sd.gubun == "art"){
							html += "					"+sd.nickname+" <div><span style='cursor:pointer' onclick=\"g360.showArtistDetail('"+sd.email+"')\">"+g360.g_lang.Artist+"</span>";
						}else{
							html += "					"+sd.nickname+" <div><span>"+g360.g_lang.Art_consultant+"</span>";
						}
						
						html += "					<span style='cursor:pointer' onclick=\"g360.open_artist_info('"+sd.email+"')\"><a>"+g360.g_lang.Partners32+"</a></span></div>";
						html += "				</div>";
						html += "				<div class='evaluation_info'>";
						html += "					<ul>";
						

						if (sp.request_subform == "1"){
							if (sp.request_status == "4"){
							//	if (sp.art_ok == sd.email){	
								if (sp.ownerkey == sd.ownerkey){
								//	html += "						<li class='ei_price'><span>계약금액</span>"+g360.comma(g360.setWon(sp.selected_price * 10000))+"</li>";
									html += "						<li class='ei_price'><span>"+g360.g_lang.Partners33+"</span>"+g360.comma(g360.setWon(sp.selected_price))+"</li>";
								//	html += "						<li class='ei_price'><span>계약금액</span>"+g360.comma(g360.setWon(sdata.price))+"</li>";
									
								}else{
									html += "						<li class='ei_price'><span>"+g360.g_lang.Partners34+"</span></li>";
								}
							}else if (sp.request_status == "1"){
								
								if (sd.suggest_image_list != ""){
								//	var spx = eval(sd.suggest_image_list);
									var spx = JSON.parse(sd.suggest_image_list);
									if (spx.length == 1){
										var sdata = spx[0];										
										html += "						<li class='ei_price' id='pric_"+i +"_"+ y+"'><span>"+g360.g_lang.Partners34+"</span>"+g360.comma(g360.setWon(sdata.price))+"</li>";
									}else{
										html += "						<li class='ei_price' id='pric_"+i +"_"+ y+"'><span>"+g360.g_lang.Partners34+"</span></li>";
									}
								}else{
									html += "						<li class='ei_price' id='pric_"+i +"_"+ y+"'><span>"+g360.g_lang.Partners34+"</span></li>";
								}
								
								
							}else{
								html += "						<li class='ei_price'><span>"+g360.g_lang.Partners34+"</span>"+g360.comma(g360.setWon(sp.selected_price* 10000))+"</li>";
							}
							
							html += "						<li class='ei_date'><span>"+g360.g_lang.Partners35+"</span>"+sd.date+"</li>";
						}else{
							if (sp.request_status == "4"){
								html += "						<li class='ei_price'><span>"+g360.g_lang.Partners33+"</span>"+g360.comma(g360.setWon(sd.price.replace(/\,/gi,"")* 10000))+"</li>";
							}else{
								html += "						<li class='ei_price'><span>"+g360.g_lang.Partners34+"</span>"+g360.comma(g360.setWon(sd.price.replace(/\,/gi,"")* 10000))+"</li>";
							}
							
							html += "						<li class='ei_date'><span>"+g360.g_lang.Partners36+"</span>"+sd.art_product_term+"일</li>";
						}
						
						html += "					</ul>";
						html += "				</div>";
						
					
						if (typeof(sp.art_ok) == "undefined" || sp.art_ok == ""){
							
							html += "				<button class='btn btn_violet btn_select' onclick=\"gCAPJ.art_ok('"+sp.dockey+"','"+sd.email+"','"+sd.nickname+"','"+sp.request_subform+"', '" +i+ "','"+sd.price+"','"+sd.art_product_term+"', '" +sd.ownerkey+ "')\">"+g360.g_lang.Choice+"</button>";
						}else{
							
							if (sp.request_subform == "2"){
								if (sp.art_ok == sd.email){								
									html += "				<button class='btn btn_green btn_select' >"+g360.g_lang.Adopted+"</button>";
								}else{
									html += "				<button class='btn btn_disabled btn_select' >"+g360.g_lang.Not_adopted+"</button>";
								}
							}else{
								//작품 제작 채택 , 미채택 표시하기
//								var ssspp = eval(sd.suggest_image_list);
//								var xhtml = "<button class='btn btn_disabled btn_select' >미채택</button>";
//								for (var u = 0 ; u < ssspp.length; u++){
//									if (ssspp[u].dockey == sp.art_select_dockey){
//										xhtml = "				<button class='btn btn_blue btn_select' >채택</button>";
//									}
//								}
								var xhtml = "";
								if (sp.ownerkey == sd.ownerkey){
									xhtml = "				<button class='btn btn_blue btn_select' >"+g360.g_lang.Adopted+"</button>";
								}else{
									xhtml = "<button class='btn btn_disabled btn_select' >"+g360.g_lang.Not_adopted+"</button>";
								}
								
								html += xhtml;
							}
							
						}
						
					
						html += "			</div>";
						
						
						html += "			<div class='partners_detail' style='display:none'>";
						html += "				<p class='term'>"+g360.TextToHtml(sd.suggest_memo)+"</p>";
						
//						var list = "";
//						if (sp.request_subform == "1"){
//							list = sd.suggest_image_list;
//						}else{
//							list = sp.suggest;
//						}
						
						if (sd.suggest_image_list != ""){
					//	if (list != ""){
							html += "				<div class='rmd_art term bg_white' id='img_div_"+i+"'>";							
							html += "					<ul class='img_list' id='img_list_"+y+"'>";
							var spx = eval(sd.suggest_image_list);
						//	var spx = eval(list);
							for (var k = 0 ; k < spx.length; k++){
								
								var sdata = spx[k];
							//	var em = sdata.dockey.split("_")[0];
								var inx = sdata.dockey.lastIndexOf("_");
								var em = sdata.dockey.substring(0,inx);
								
							
								var url = "/artimage/"+em+"/art/preview/"+sdata.dockey+".jpg";
								if (typeof(sdata.myspace_url) != "undefined" && sdata.myspace_url != ""){
									url = sdata.myspace_url;									
								}
								
								
								
								html += "						<li data='"+sdata.dockey+"' data3='"+sd.ownerkey+"' data2='"+sdata.price+"' onclick=\"gCAPJ.select_art('"+sdata.dockey+"', this, '"+i+"', '"+y+"')\">";
							//	html += "							<a href='#'>";
								html += "								<div > ";
								html += "									<span><img src='"+url+"'/></span>";
								html += "								</div>";
								html += "								<dl style='margin-top:0px' onclick=\"g360.showArtDetail_OnlyView('"+sdata.dockey+"'); return false;\">";
								html += "									<dd>"+sdata.artist+"</dd>";
								html += "									<dd>"+sdata.title+"</dd>";
								html += "									<dd>"+sdata.size+"</dd>";
								html += "									<dd>"+g360.comma(g360.setWon(sdata.price))+"</dd>";
								html += "									<dd></dd>";
								html += "								</dl>";
							//	html += "							</a>";
								html += "						</li>";
								
							}
							html += "					</ul>";
							
							html += "				</div>";
						}				
						html += "			</div>";
						
					}
					
				
					html += "			<div class='btn_area' id='xBtn_dis_"+i+"'>";
					html += "				<button class='btn btn_fold on' onclick=\"gCAPJ.open_short('"+i+"', this)\">"+g360.g_lang.Quick_View+"</button>";
					
					if (sp.request_subform == "1"){
						html += "				<button class='btn btn_detail' onclick=\"gCAPJ.open_detail('"+i+"', this, '"+sp.ownerkey+"', '"+sdata.dockey+"')\">"+g360.g_lang.View_Details+"</button>";
					}else{
						html += "				<button class='btn btn_detail' onclick=\"gCAPJ.open_detail('"+i+"', this, '"+sp.ownerkey+"', '"+sp.dockey+"')\">"+g360.g_lang.View_Details+"</button>";
					}
					
					html += "			</div>";
					html += "		</div>";
					html += "	</div>";
				}	
				
				html += "		</div>";		
				html += "	</div>";
				html += "</div>";
			}
				
				
				
		}
			
			
			
		
			
			
			
				
			
			
		
		
		if (gCAPJ.totalcount > 0){
			$("#NAVIGATE").show();
			gCAPJ.search_paging(gCAPJ.cPage);
			
		}else{
			
			$("#NAVIGATE").hide();
			var text = "";
			if (gCAPJ.opt == "client_support"){
				text = g360.g_lang.Partners_Alert_1;
			}else if (gCAPJ.opt == "client_ing"){
				text = g360.g_lang.Partners_Alert_2;
			}else if (gCAPJ.opt == "client_evaling"){
				text = g360.g_lang.Partners_Alert_3;
			}else if (gCAPJ.opt == "client_end"){
				text = g360.g_lang.Partners_Alert_4;
			}
			
			
			var html = "<div style='border:1px solid gray; margin-top:15px; padding-top:40px; height:100px'>"+text+"</div>";
			
		}
		

		$("#artProject_list").html(html);
		
		
		
		if (gCAPJ.opt == "client_evaling"){
			
			for (var u = 1 ; u <= rowcount; u++){
				$("#star_check_"+u+" li div img").on("click", function(event){
										
					var gid = event.currentTarget.id;					
					var pbun = $(this).get(0).parentElement.parentElement.parentElement.id.replace("star_check_","");
					var tobj = "star_check_" + pbun;
									
					var ssp = gid.split("_");
					var sp1 = ssp[1];
					
					for (t = 1 ; t <=5; t++){
						var img = $("#"+tobj + " #" + ssp[0] + "_" + t).attr("src");
						$("#"+tobj + " #" + ssp[0] + "_" + t).attr("src", img.replace("focus", "disable"));
					}
					
					for (k = 1 ; k <= sp1 ; k++){
						var img = $("#"+tobj + " #" + ssp[0] + "_" + k).attr("src");
						$("#"+tobj + " #" + ssp[0] + "_" + k).attr("src", img.replace("disable", "focus"));
					}
					
//					var img = $(this).attr("src");
//					if (img.indexOf("disable") > -1){
//						 $(this).attr("src", img.replace("disable", "focus"));
//					}else{
//						$(this).attr("src", img.replace("focus", "disable"));
//					}							
				});
			}			
		}
		
		
		
	},
	
	
	"project_delete" : function(dockey){
		
		$.confirm({
			title : g360.g_lang.Partners37,
			content : g360.g_lang.Partners38,
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
						var url = g360.root_path + "/project_delete.mon?id=" + dockey;
						$.ajax({
							type : "GET",
							url : url,
							cache : false,
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							success : function(data){
								if (data.result == "OK"){
									gCAPJ.load_project_list(gCAPJ.cPage);
								}else{
									g360.error_alert();
								}
							},
							error : function(e){
								g360.error_alert();
							}
						});
					}
				},
//				cancel : function(){						
//				},
				moreButtons : {
					text : g360.g_lang.Cancel
				}
			}
		});
		
		
		
		
	},
	
	"project_edit" : function(dockey, ty){
		//alert("작업중입니다.");
		
		if (ty == "1"){
			//작품 추천 양식 수정
			g360.LoadPage("body_content", g360.root_path + "/client/art_request/art_recommand.jsp?opt=edit&key="+dockey);
		}else{
			//작품 제작 요청 수정
			g360.LoadPage("body_content", g360.root_path + "/client/art_request/art_request.jsp?opt=edit&key="+dockey);
		}
		
	},
	
	
	
	"select_art" : function(dockey, obj, bun, bb){
		
		$("#wgs_"+ bun +" div div ul li").each(function(index){
			$(this).removeClass("on");
		});
			
		var price = "<span>"+g360.g_lang.Partners34+"</span>" + g360.comma(g360.setWon($(obj).attr("data2")));
		$("#pric_"+ bun + "_" +  bb).html(price);
	
		$(obj).addClass("on");
	},
	
	
	
	"evalComplete" : function(dockey, bun, email){
		
		$.confirm({
			title : g360.g_lang.Partner39,
			content : g360.g_lang.Partner40,
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
						
						var xxp = "star_check_" + bun;
						
						var score1 = 0;
						$("#" + xxp + " #score1 img").each(function(index){
							var img = $(this).attr('src');
							if (img.indexOf("focus") > -1){
								score1 ++;
							}
						})
						
						var score2 = 0;
						$("#" + xxp + " #score2 img").each(function(index){
							var img = $(this).attr('src');
							if (img.indexOf("focus") > -1){
								score2 ++;
							}
						})
						
						var score3 = 0;
						$("#" + xxp + " #score3 img").each(function(index){
							var img = $(this).attr('src');
							if (img.indexOf("focus") > -1){
								score3 ++;
							}
						})
						
						var score4 = 0;
						$("#" + xxp + " #score4 img").each(function(index){
							var img = $(this).attr('src');
							if (img.indexOf("focus") > -1){
								score4 ++;
							}
						})
						
						var score5 = 0;
						$("#" + xxp + " #score5 img").each(function(index){
							var img = $(this).attr('src');
							if (img.indexOf("focus") > -1){
								score5 ++;
							}
						})
						
						var tscore = parseInt(score1) +  parseInt(score2) +  parseInt(score3) +  parseInt(score4) +  parseInt(score5);
						if (tscore == 0){
							g360.gAlert("Info", g360.g_lang.Partners_Alert_5, "blue", "top");
						}else{
							var comment = $("#comment_"+bun).val();
							
							var data = JSON.stringify({
								score1 : score1,
								score2 : score2,
								score3 : score3,
								score4 : score4,
								score5 : score5,
								comment : comment,
								dockey : dockey,
								email : email
							});
							
							var url = g360.root_path + "/client_eval_submit.mon";
							$.ajax({
								type : "POST",
								dataType : "json",
								contentType : "application/json; charset=utf-8",
								data : data,
								url : url,
								success : function(data){
									gCAPJ.opt = "client_evaling";
									gCAPJ.load_project_list(gCAPJ.cPage);
								},
								error : function(e){
									g360.error_alert();
								}
							})
						}
					
						
					}
				},
				"취소" : function(){						
					
				}
			}
		});	
		
		
		
		
		
	},
	
	
	"open_detail" : function(id, obj, art_select_dockey, dockey){
	
		gCAPJ.open_detail_dockey = dockey;
		
		$("#group_section_dis_"+id+" .partners_detail").each(function(index){
			$(this).show();
		});		
		
		$("#xBtn_dis_" + id +" button").each(function(index){
			$(this).removeClass("on");
		});
		$(obj).addClass("on")
		

//		if (art_select_dockey != "undefined"){
//			//이미 채택된 상태에서 상세 조회한경우 선택된 작품에 체크 표시 해줘야 한다.		
//			var arr = $("#img_list_" + (parseInt(id) -1 )).get(0).children;
//			for (var i = 0 ; i < arr.length; i++){
//				$(arr[i]).removeClass("on");
//				if ($(arr[i]).attr("data") == art_select_dockey){
//					$(arr[i]).addClass("on");
//				}
//			}		
//		}
	
		$("#wgs_"+id+" .img_list li").each(function(index){
			var data3 = $(this).attr("data3");
			var data = $(this).attr("data");
			if (data3 == art_select_dockey){
				if (gCAPJ.open_detail_dockey == data){
					$(this).addClass("on");
				}
				
			}
		});
		

		
		
		
	},
	
	"open_short" : function(id, obj){
		$("#group_section_dis_"+id+" .partners_detail").each(function(index){
			$(this).hide();
		});
		
		
		$("#xBtn_dis_" + id +" button").each(function(index){
			$(this).removeClass("on");
		});
		
		$(obj).addClass("on");
	},
	
	
	"art_ok_approval_after" : function(){
	
		//최종 선택한 작품에 대해서 키값을 입력해줘야 마지막에 최종 선택된 작품이 무엇인지 알수 있다.
		if (gCAPJ.data == ""){
			//작품 제작요청을 결재 완료한 경우
			gCAPJ.load_project_list(gCAPJ.cPage);
		}else{
			//작품 추천을 선택해서 결재한 경우
			var id  = gCAPJ.data.id;
			var email = gCAPJ.data.email;
			var nickname = gCAPJ.data.nickname;
			var formtype = gCAPJ.data.formtype;
			var bun = gCAPJ.data.bun;
			var price = gCAPJ.data.price;
			var term = gCAPJ.data.term;
			
			var selectArt_dockey = "";
			var selectArt_price = "";
			
			bun = parseInt(bun) ;
			
			
			var cnt = $("#wgs_"+bun + " li").length;
			
			$("#wgs_"+bun + " li").each(function(index){
				var obj = $(this);
				if (obj.get(0).className == "on"){
					selectArt_dockey = obj.attr("data");
					selectArt_price  = obj.attr("data2");
				}
				
			});
			
		//	if (typeof(bun) != "undefined"){
//			var obj = $("#img_list_"+bun).get(0).children;	
//			if (obj.length > 1){		
//				for (var i  = 0 ; i < obj.length; i++){
//					
//					if (obj[i].className == "on"){
//						selectArt_dockey = $(obj[i]).attr("data");
//						selectArt_price  = $(obj[i]).attr("data2");
//					}
//				}
//			}else{
//				//$(obj[0]).addClass("on");
//				if (obj[0].className == "on"){
//					selectArt_dockey = $(obj[0]).attr("data");
//					selectArt_price  = $(obj[0]).attr("data2");
//				}
//
//			}	
//			
			if (selectArt_dockey == ""){
				g360.gAlert("Error", g360.g_lang.Partners_Alert_6, "red", "left");

				return false;
			}else{
				var url = g360.root_path + "/art_ok_purchase.mon?id="+id+"&email="+email + "&selected_art="+selectArt_dockey+"&price="+selectArt_price + "&nickname="+ encodeURIComponent(nickname);
				
				$.ajax({
					type : "GET",
					dataType : "json",
					cache : false,
					contentType : "application/json; charset=utf-8",
					url : url,
					success : function(data){
			
						gCAPJ.load_project_list(gCAPJ.cPage);
					},
					error : function(e){
						g360.error_alert();
					}
				});
			}
			
						
				
		}
		
			
			
	//}	
				

		
			
		
		
	},
	
	
	
	"art_ok" : function(id, email, nickname, formtype, bun, price, term, ownerkey){

	
		price = price.replace(/\,/gi,"");
		
		if (formtype == 1){
		
			var selectArt_dockey = "";
			
			/*
			var obj = $("#img_list_"+bun).get(0).children;
			if (obj.length > 1){
				for (var i  = 0 ; i < obj.length; i++){
					if (obj[i].className == "on"){
						selectArt_dockey = $(obj[i]).attr("data");
					}
				}
			}else{
				selectArt_dockey = $(obj[0]).attr("data");
			}
			*/
			
			var cnt = $("#wgs_"+bun + " li").length;
			
			$("#wgs_"+bun + " li").each(function(index){
				var obj = $(this);
				if (obj.get(0).className == "on"){
					selectArt_dockey = obj.attr("data");
				}
				
			});
			
			
		
			if (selectArt_dockey == ""){
				g360.gAlert("Error", g360.g_lang.Partners_Alert_7, "red", "left");
				return false;
			}
			
			if (!typeof(g360.UserInfo.smskey) == "undefined" || g360.UserInfo.smskey == ""){
				g360.gAlert("Error", g360.g_lang.Partners_Alert_8, "red", "left");
				gTopMain.navBtnAction('account');
				
			}else{
				$.ajax({
					
					url: g360.root_path + '/select_art_info.mon?dockey=' + selectArt_dockey,
					success: function(data){
						
						//구매하기를 위해서 받은 정보를 g360.cart_list 에 추가한다.
						g360.cart_list = new Array();
						g360.cart_list.push(data);
						////////////////////////////////////////
						
						var dd = new Object();
						dd.id = id;
						dd.email = email;
						dd.nickname = nickname;
						dd.formtype = formtype;
						dd.bun = bun;
						dd.price = price;
						dd.term = term;
						dd.shipping_fee = data.shipping_fee;
						dd.shipping_type = data.shipping_type;
						dd.shipping_type_etc = data.shipping_type_etc;
						dd.ownerkey = ownerkey;
						
						gCAPJ.data = dd;
						g360.artproject_project1_sales_info = dd;
						
						//전자결재 창을 바로 띄운다.
						var url = g360.root_path + "/main/art/art_purchase.jsp?call_from=artProject&project_opt=1";
						g360.LoadPage("purchase_popup_detail", url);
						g360.popup_open("art_purchase_popup");			
						$("#art_purchase_popup_wrapper").css("background-color", "white");
						
						var inx = g360.maxZindex();
						g360.body_scroll_hide();
						
						$("#art_purchase_popup_background").css("z-index", parseInt(inx) + 1);
						$("#art_purchase_popup_wrapper").css("z-index", parseInt(inx) + 2);
						$("#art_purchase_popup").css("left", "0px");
						$("#art_purchase_popup").css("top", "0px");			
						g360.scroll_Top();
						
					} 
				});
			}
			
			
				
			
			
			
		}else{
	
			
			//현재 선택한 id값을 
			
			$.confirm({
				title : g360.g_lang.Partners41,
				content : g360.g_lang.Partners42,
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
							$.ajax({
								url: g360.root_path + '/select_art_info_request.mon?dockey=' + id,
								success: function(data){
								
									//구매하기를 위해서 받은 정보를 g360.cart_list 에 추가한다.
									data.suggest_price = price;
									data.suggest_email = email;
									data.suggest_nickname = nickname;
									data.suggest_term = term;
									data.suggest_id = id;
									data.ownerkey = ownerkey;
									g360.cart_list = new Array();
									g360.cart_list.push(data);
									
									
									var url = g360.root_path + "/main/art/art_purchase.jsp?call_from=artProject&project_opt=2";
									g360.LoadPage("purchase_popup_detail", url);
								//	$("#art_purchase_popup").show();
									g360.popup_open("art_purchase_popup");
									
									$("#art_purchase_popup_wrapper").css("background-color", "white");
									
									var inx = g360.maxZindex();
									$("#art_purchase_popup_background").css("z-index", parseInt(inx) + 1);
									$("#art_purchase_popup_wrapper").css("z-index", parseInt(inx) + 2);
									$("#art_purchase_popup").css("left", "0px");
									$("#art_purchase_popup").css("top", "0px");
									
									g360.scroll_Top();
									g360.body_scroll_hide();
									
									g360.popuup_close_and_body_show_scroll = false;
												
									return false;
									
								} 
							});
						}
					},
					moreButtons : {
						text : g360.g_lang.Cancel
					}
				}
			});	

			
			
			
			
		
			
			
			
			
			
			return false;
//			var url = g360.root_path + "/art_ok.mon?id="+id+"&email="+email+ "&nickname=" + encodeURIComponent(nickname) + "&price="+price+"&term="+term;
//			url += "&" + new Date().getTime();
//			$.ajax({
//				type : "GET",
//				dataType : "json",
//				contentType : "application/json; charset=utf-8",
//				url : url,
//				success : function(data){
//					
//					gCAPJ.load_project_list(gCAPJ.cPage);
//				},
//				error : function(e){
//					g360.error_alert();
//				}
//			})
		}
		
	
		
	},
	
	"collapse" : function(id, obj){

		if (obj.textContent.indexOf("보기") > -1){
			$(obj).text("진행사항 접기");
			$("#report_" + id).show();
		}else{
			$(obj).text("진행사항 보기");
			$("#report_" + id).hide();
			
		}
		
	},
	
	

	
	
	"empty_class_on" : function(){
		$(".sub_common_content.art_project aside ul li").removeClass("on");
		//$("#proj_memnu1").hide();		
		//$("#proj_memnu4").hide();

		//$("#proj_menu1_exp").addClass("on");
		//$("#proj_menu4_exp").addClass("on");
		
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
/////////////////////////// 리스트 페이징 시작 //////////////////////////////////////////////////////////////
	"search_paging" : function(page){
		var alldocuments = gCAPJ.totalcount;
		if (alldocuments % gCAPJ.perpage > 0 & alldocuments % gCAPJ.perpage < gCAPJ.perpage/2 ){
			allPage = Number(Math.round(alldocuments/gCAPJ.perpage)) + 1;
		}else{
			allPage = Number(Math.round(alldocuments/gCAPJ.perpage));
		}	

		gCAPJ.search_navigator(page);
	},
	
	"search_navigator" : function(page){
		var nav_cpage = page;

		var alldocuments = gCAPJ.totalcount;
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
				nav[0] = '<li class="p_prev"><a href="#" class="xico" onclick="javascript:gCAPJ.gotoPage(' + ((((cFrame-1)*10)-1)*gCAPJ.perpage+1) + ',' + ((cFrame-1)*10) + ');">이전</a></li>';
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
						nav[pIndex] = "<li><a href=# onclick='gCAPJ.gotoPage("+ (((i-1) * gCAPJ.perpage) + 1 ) + ", "+ i + ", this)'>" + i + "</a></li>";
						
					}else{
						if (i%10 == '1' ){
							nav[pIndex] = "<li><a href=# onclick='gCAPJ.gotoPage("+ (((i-1) * gCAPJ.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";	
						}else{
							nav[pIndex] = "<li><a href=# onclick='gCAPJ.gotoPage("+ (((i-1) * gCAPJ.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";
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
				nav[nav.length] = '<li class="p_next"><a href="#" class="xico" onclick="javascript:gCAPJ.gotoPage(' + ((cFrame*gCAPJ.perpage*10) + 1) + ',' + ((cFrame*10)+1) + ');">다음</a></li>';
			}
					
	          var navHTML = "";

			if (cFrame == 1 ){
				navHTML = '';
	          }else{
				navHTML = '<li class="p_first"><a href="#" class="xico" onclick="javascript:gCAPJ.gotoPage(1,1);">처음</a></li>';
	          }		    
			for( var i = 0 ; i < nav.length ; i++){	
	          	navHTML = navHTML + nav[i];
			}
					
			if (cFrame < allFrame){
				navHTML = navHTML + '<li class="p_last"><a href="#" class="xico" onclick="javascript:gCAPJ.gotoPage(' + ((allPage - 1)*gCAPJ.perpage + 1) +','+ allPage +')">마지막</a></li>';
	        }else{
				navHTML = navHTML;
	        }
	     
			$("#NAVIGATE").html('<div class="paging"><ul>' + navHTML + '</ul></div>');
		}
	},
	
	"gotoPage" : function(Index, PageNum, obj){
		var nav_cpage = PageNum;
		oldpage = nav_cpage;
		
		gCAPJ.load_project_list(PageNum);
	}
	//////////////////////////////////////// 리스트 페이징 종료    /////////////////////////////////////////////
	
}

