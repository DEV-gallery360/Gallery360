
function gPartnerArtProject(){	
	gPAProject = this;
	gPAProject.totalcount = 0;
	gPAProject.perpage = 10;
	gPAProject.cPage = 1;
	gPAProject.opt = "all";
	
	gPAProject.project = new Object();
	
	gPAProject.popup_start = 0;
	gPAProject.popup_perpage = 20;
	gPAProject.popup_complete = true;
	gPAProject.isPopup = "F";
	
	
	gPAProject.select_obj_list = new Array();
	gPAProject.select_item = "";
	gPAProject.cur_open_project_id = "";
	
	gPAProject.cur_request_subform = "";
	
	gPAProject.weekly_report_dockey = "";
	
	
	gPAProject.open_type = "new";
	gPAProject.edit_dockey = "";
	gPAProject.owner_key = "";
	
	gPAProject.open_detail_dockey
	
	gPAProject.cur_save_bun = 0;
	
	// 작품 불러오기 페이지 정보
	this.page_info = {
		favorite : {
			start : 0,
			perpage : 20,
			complete : false
		},
		search : {
			query : {
				thema : "",      //풍경 또는 인물
				type : "",                //가로
				hosu : "",        //10호 에서 70호까지
				price : "",     //100만원 에서 500만원 까지
	 			color : "",  //green 또는 blue 색상
	 			
	 			//thema : "풍경-spl-인물",      //풍경 또는 인물
				//type : "2",                //가로
				//hosu : "10-spl-70",        //10호 에서 70호까지
				//price : "100-spl-500",     //100만원 에서 500만원 까지
	 			//color : "green-spl-blue"  //green 또는 blue 색상
			},
			start : 0,
			perpage : 20,
			complete : false
		}		
	};
	
	// 즐겨찾기 infinite scroll
	this.favo_controller = null;
	this.favo_scene = null;
		
	this.resize_id = null;
	
	this.bg_wrap = null;
	this.bg_img = null;
	this.canvas = null;
	this.picture = null;
	this.picture_ho = null;
}

gPartnerArtProject.prototype = {		

	"init" : function(){
		var _self = this;	
		
		
		this._eventBind();
		
		//공간에 작품걸기		
		this.init_space();
		
		this.g_lang();
	},
	
	"g_lang" : function(){
		
		$(".g_lang_Mypage1").html(g360.g_lang.Mypage1);
		$(".g_lang_Artist_Mypage1").html(g360.g_lang.Artist_Mypage1);
		$(".g_lang_Artist_Mypage2").html(g360.g_lang.Artist_Mypage2);
		$(".g_lang_Artist_Mypage3").html(g360.g_lang.Artist_Mypage3);
		$(".g_lang_Artist_Mypage4").html(g360.g_lang.Artist_Mypage4);
		$(".g_lang_Artist_Mypage5").html(g360.g_lang.Artist_Mypage5);

		$(".g_lang_Terms_of_use3").html(g360.g_lang.Terms_of_use3);
		$(".g_lang_Back").html(g360.g_lang.Back);
		
		$(".g_lang_Find_project").html(g360.g_lang.Find_project);
		$(".g_lang_Terms_of_use3").html(g360.g_lang.Terms_of_use3);
		$(".g_lang_Artwork_recommend").html(g360.g_lang.Artwork_recommend);
		$(".g_lang_Artwork_creating").html(g360.g_lang.Artwork_creating);
		
		$(".g_lang_Project_of_Interest").html(g360.g_lang.Project_of_Interest);
		$(".g_lang_Application_details").html(g360.g_lang.Application_details);
		$(".g_lang_Applyforproject").html(g360.g_lang.Applyforproject);
		$(".g_lang_Closedproject").html(g360.g_lang.Closedproject);
		$(".g_lang_Project_in_progress").html(g360.g_lang.Project_in_progress);
		$(".g_lang_Finished_project").html(g360.g_lang.Finished_project);
		$(".g_lang_Partners3").html(g360.g_lang.Partners3);
		$(".g_lang_Completeproject").html(g360.g_lang.Completeproject);
		$(".g_lang_Artproject1").html(g360.g_lang.Artproject1);
		
		$(".g_lang_See_more").html(g360.g_lang.See_more);
		
		$(".g_lang_Art_List").html(g360.g_lang.Art_List);
		$(".g_lang_Complete").html(g360.g_lang.Complete);
		$(".g_lang_Close").html(g360.g_lang.Close);
		
		$(".g_lang_Scenery").html(g360.g_lang.Scenery);
		$(".g_lang_Character").html(g360.g_lang.Character);
		$(".g_lang_Still_Life").html(g360.g_lang.Still_Life);
		$(".g_lang_Animal").html(g360.g_lang.Animal);
		$(".g_lang_Abstract").html(g360.g_lang.Abstract);
		$(".g_lang_PopArt").html(g360.g_lang.PopArt);
		$(".g_lang_Object").html(g360.g_lang.Object);
		
		$(".g_lang_Square").html(g360.g_lang.Square);
		$(".g_lang_Horizontal").html(g360.g_lang.Horizontal);
		$(".g_lang_Vertical").html(g360.g_lang.Vertical);
		$(".g_lang_Circle").html(g360.g_lang.Circle);
		
		$(".g_lang_Theme").html(g360.g_lang.Theme);
		$(".g_lang_Shape").html(g360.g_lang.Shape);
		$(".g_lang_Size").html(g360.g_lang.Size);
		$(".g_lang_TurnOff_Setting").html(g360.g_lang.TurnOff_Setting);
		
		$(".g_lang_Artproject2").html(g360.g_lang.Artproject2);
		$(".g_lang_Suggest").html(g360.g_lang.Suggest);
		
		$(".g_lang_My_Artwork").html(g360.g_lang.My_Artwork);
		$(".g_lang_Search").html(g360.g_lang.Search);
		
		$(".g_lang_Prev").html(g360.g_lang.Prev);
		$(".g_lang_Proposal").html(g360.g_lang.Proposal);
	},
	
	_eventBind: function(){
		var _self = this;
		
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
		
//		$("#proj_menu1").on("click", function(event){
//			$("#proj_menu1_exp").click();
//		});
	
		$("#proj_menu1_exp").on("click", function(event){
		
			gPAProject.empty_class_on();
			
			
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
		
//		$("#proj_menu2").on("click", function(event){
//			$("#proj_menu2_exp").click();
//		});
		
		
		
		$("#proj_menu2_exp").on("click", function(event){
			
			gPAProject.empty_class_on();
			
			
			var cls = $(this).get(0).className;
			if (cls.indexOf("on") > -1){
				
				$(this).removeClass("on");
				$("#proj_memnu2").show();
				$("#proj_memnu2").fadeIn();

			}else{
				$(this).addClass("on");
				$("#proj_memnu2").fadeOut(100);
			}
			$("#proj_menu2").addClass("on");
			
		});
		
//		$("#proj_menu3").on("click", function(event){
//			$("#proj_menu3_exp").click();
//		});
		
		$("#proj_menu3_exp").on("click", function(event){
			
			gPAProject.empty_class_on();
			
			
			var cls = $(this).get(0).className;
			if (cls.indexOf("on") > -1){
				
				$(this).removeClass("on");
				$("#proj_memnu3").show();
				$("#proj_memnu3").fadeIn();

			}else{
				$(this).addClass("on");
				$("#proj_memnu3").fadeOut(100);
			}
			$("#proj_menu3").addClass("on");
			
		});
		
		
		
		
		
		
		
		$("#proj_memnu1 li").on("click", function(event){
			$("#proj_memnu1 li").each(function(index){
				$(this).removeClass("on");
			});
			$(this).addClass("on");
			return false;
		});
		
		$("#proj_memnu2 li").on("click", function(event){
			$("#proj_memnu2 li").each(function(index){
				$(this).removeClass("on");
			});
			$(this).addClass("on");
			return false;
		});
		
		$("#proj_memnu3 li").on("click", function(event){
			$("#proj_memnu3 li").each(function(index){
				$(this).removeClass("on");
			});
			$(this).addClass("on");
			return false;
		});
		
		
		$("#project_all").on("click", function(event){
			g360.history_record("project_all");
			gPAProject.opt = "all";
			
			gPAProject.init_var();
			
			gPAProject.load_project_list(1);
		});
		
		$("#project_recommend").on("click", function(event){
			g360.history_record("project_recommend");
			gPAProject.opt = "recommend";
			gPAProject.init_var();
			gPAProject.load_project_list(1);
		});
		
		$("#project_product").on("click", function(event){
			g360.history_record("project_product");
			gPAProject.opt = "product";
			gPAProject.init_var();
			gPAProject.load_project_list(1);
		});
		
		$("#project_favorite").on("click", function(event){
			g360.history_record("project_favorite");
			gPAProject.opt = "favorite";
			gPAProject.init_var();
			gPAProject.empty_class_on();
			gPAProject.load_project_list(1);
			$(this).addClass("on");
		});
		
		
		$("#project_support_ing").on("click", function(event){
			g360.history_record("project_support_ing");
			gPAProject.opt = "support_ing";
			gPAProject.init_var();
			gPAProject.load_project_list(1);
			
		});
		
		$("#project_support_end").on("click", function(evnet){
			g360.history_record("project_support_end");
			gPAProject.opt = "support_end";
			gPAProject.init_var();
			gPAProject.load_project_list(1);
		});
		
		$("#project_ing").on("click", function(event){
			g360.history_record("project_ing");
			gPAProject.opt = "ing";
			gPAProject.init_var();
			gPAProject.empty_class_on();
			gPAProject.load_project_list(1);
			$(this).addClass("on");
		});
		
		
		$("#project_eval_wait").on("click", function(evnet){
			g360.history_record("project_eval_wait");
			gPAProject.opt = "eval_wait";
			gPAProject.init_var();
			gPAProject.load_project_list(1);
		});
		
		
		$("#project_end").on("click", function(event){
			g360.history_record("project_end");
			gPAProject.opt = "end";
			gPAProject.init_var();
			gPAProject.load_project_list(1)
		});
		
		
		
		
		$("#art_popup_close").on("click", function(event){
			g360.history_record("art_popup_close");
			gPAProject.isPopup = "F";
			g360.body_scroll_show();
			$("#art_gallery_popup_preview").fadeOut();
		});
		
		
		$("#project_manual_art_menu").on("click", function(event){
			gPAProject.empty_class_on();
			g360.popup_manual("artproject");
			$(this).addClass("on");
			
		});
	},
	
	"init_var" : function(){
		gPAProject.open_type = "new";
		gPAProject.edit_dockey = "";
		gPAProject.owner_key = "";
	},
	
	"click_menu" : function(opt){
		
		$("#proj_menu"+opt+"_exp").click();
	},
	
	
	
	
	"load_project_list" : function(page){
		var html = "";
		
		gPAProject.cPage = page;		
		var start = (parseInt(gPAProject.perpage) * (parseInt(gPAProject.cPage))) - (parseInt(gPAProject.perpage) - 1);
		start = parseInt(start) -1 ;
		
		var perpage = gPAProject.perpage;
		
		var url = g360.root_path + "/artProject_list.mon?start="+start+"&perpage="+perpage+"&opt="+gPAProject.opt;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				gPAProject.load_project_draw(data);
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	"load_project_draw" : function(data){
		var html = "";
	

		gPAProject.totalcount = data[0].totalcount;
		var cnt = "'"+gPAProject.totalcount+g360.g_lang.Artist_Mypage8+"'";
		$("#art_list_totalcount").html(cnt)
		

		for (var i = 1 ; i < data.length; i++){
			var sp = data[i];
			var ddd = sp.suggest;
			var suggest_count = 0;
			if (typeof (ddd) != "undefined"){
				suggest_count = ddd.length;
			}
			gPAProject.project[sp.dockey] = sp;
			
			var ty = (sp.request_type == "1") ? g360.g_lang.Square : 
				(sp.request_type == "2") ? g360.g_lang.Horizontal : 
				(sp.request_type == "3") ? g360.g_lang.Vertical : 
				(sp.request_type == "4") ? g360.g_lang.Circle : 
				(sp.request_type == "5") ? g360.g_lang.Set : 
				(sp.request_type == "6") ? g360.g_lang.Install_Art : 
				(sp.request_type == "7") ? g360.g_lang.Media : "";
			
			var open_project_option = (gPAProject.opt == "all") ? "T" : 
				(gPAProject.opt == "recommend") ? "T" : 
				(gPAProject.opt == "product") ? "T" : 
				(gPAProject.opt == "favorite") ? "T" : 
				(gPAProject.opt == "ing") ? "T" : 
					"F";
			
			var art_type = "";
			if (sp.request_subform == "1"){
				art_type = "<em class='green_label'>"+g360.g_lang.Sales_price2+"</em>"
			}else{
				art_type = "<em class='blue_label'>"+g360.g_lang.Sales_price3+"</em>"
			}
					
			
		
			if (gPAProject.opt == "ing"){
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
				
				price = g360.comma(g360.setWon(g360.removeComma(select_suggest.price) * 10000));
				
				
				var complete_date = select_suggest.date;
				var term = select_suggest.art_product_term;
				var ok_date = sp.art_ok_date;
										
				var sday = new Date(ok_date);
				sday.setDate(sday.getDate() + (parseInt(term)+5)); //15일 더하여 setting
				var year = sday.getFullYear();
				
			
				var month = "00" + (sday.getMonth() + 1);
				month = month.substr(month.length - 2);    //IE브라우저의 경우 월이 한자리 이면 인식 하지 못한다.
				var day = sday.getDate();
				var afterday = year + "-" + month + "-" + day;
				
				var stoday = new Date();
				var today = stoday.getFullYear() + "-" + (parseInt(stoday.getMonth()) + 1) + "-" + stoday.getDate();
				
			
				var ddx = new Date(afterday);
				var ddx2 = new Date();				
				var xyz = g360.dateDiff(ddx, ddx2) -1 ;
				
	
				html += "<section>";
				html += "	<div class='group_section' style='margin-top:10px; overflow:hidden'>";
				html += "		<div class='wrap_group evaluation noborder_top'>";
				html += "			<div class='wrap_group_header'>";
				
				var url = g360.artProject_preview_img_path(sp.request_email, sp.request_file_name);
				html += "                      <div style='float:left; cursor:pointer' onclick=\"g360.preview_img('"+sp.request_file_name+"','"+sp.request_email+"','artRequest')\">";
				html += "						<img style='width:120px; height:120px; margin-right:10px' src='"+url+"'></div>";
				
				
				html += "				<h4>"+art_type + sp.request_title  +  "</h4>";
				html += "				<div class='evaluation_info' style='float:left;position:absolute;padding-left:135px'>";
				html += "					<dl>";
				html += "						<dt>"+g360.g_lang.Client+"</dt>";
				if (sp.nobank_status == "3"){
					html += "						<dd><span style='cursor:pointer;background: #6c6d6d;color: white;' onclick=\"g360.user_info_open('"+sp.request_email+"','')\">"+sp.request_nickname+ g360.g_lang.Artproject3 +"</span><dd>";
								
				}else{
					html += "						<dd>"+sp.request_nickname+"<dd>";
				}
					
				
				html += "					</dl>";
				html += "					<dl>";
				html += "						<dt>"+g360.g_lang.Contract_date+"</dt>";
				html += "						<dd>"+date1+"<dd>";
				html += "					</dl>";
				html += "				</div>";
				
		
				
				
				html += "				<div class='evaluation_info' style='float:left;position:absolute;top:80px; padding-left:135px'>";
				if (sp.pay_method == "nobank"){
					//무통장 입금일 경우
					if (sp.nobank_status == "2"){
						html += "					<dl>";
						html += "						<dt style='color:blue'>";
						html += 							g360.g_lang.Artproject7;
						html += "						</dt>";
						html += "					</dl>";
					}else if (sp.nobank_status == "3"){
						html += "					<dl>";
						html += "						<dt style='color:red'>";
						html += 							g360.g_lang.Artproject8;
						html += "						</dt>";
						html += "					</dl>";
					}else{
						html += "					<dl>";
						html += "						<dt style='color:blue'>";
						html += 							g360.g_lang.Artproject9;
						html += "						</dt>";
						html += "					</dl>";
					}

				}else{
					//가상통장 일 경우
					
				}
				
				html += "				</div>";
				
				
				
				
				
				
				
				
				
				html += "				<div class='d_day'>";
				html += "					"+xyz+g360.g_lang.Partners12;
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
				html += "							<td><strong>"+(parseInt(term)+5)+g360.g_lang.Partners22+"</strong> ("+g360.g_lang.Partners16 + term + g360.g_lang.Partners17 +")</td>";
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
				html += "						<tbody id=\"report_"+i+"\" style='display:none'>";
				
				if (typeof(sp.report) != "undefined"){
					var spx = sp.report;
					for (var k = 0 ; k < spx.length; k++){
						var ddx = spx[k];
						html += "		<tr>";
						html += "			<th><strong style='font-size:14px'>"+g360.g_lang.Notice_5+"  ["+ddx.rate+"%]</strong><div>"+g360.iso_date_convert(ddx.date)+" </div></th>";
						html += "			<td>";
						html += "			<div>"+g360.TextToHtml(ddx.report_memo) ;
						html += "			<button class='btn btn_ghost btn_add_file' style='right:110px; width:50px' onclick=\"gPAProject.report_delete('"+ddx.report_key+"','"+sp.dockey+"','"+ddx.email+"','"+ddx.uploadfilename+"')\">삭제</button>";
						html += "			<button class='btn btn_ghost btn_add_file' onclick=\"g360.preview_img('"+ddx.uploadfilename+"','"+ddx.email+"','artproject')\">"+g360.g_lang.Partners21+"</button>";
						html += "			</div></td>";
						html += "		</tr>";
					}
				}
				
				html += "							<tr>";
				html += "								<th rowspan='2'><strong style='font-size:14px'>"+g360.g_lang.Notice_5+"</strong><div id='curDate'>"+today+"</div></th>";
				html += "								<td>";
				html += "									<div>";
				html += "										<p class='notice'>"+g360.g_lang.Artproject7+"</p>";
		//		html += "										<button class='btn btn_ghost btn_add_file'>첨부사진</button>";
				html += "									</div>";
				html += "								</td>";
				html += "							</tr>";
				html += "							<tr>";
				html += "								<td>";
				
				
//				html += "									<div class='attach_img empty'> <!-- 이미지 없을때 empty 클래스 추가 -->";
//				html += "										<div><span></span></div>";
//				html += "									</div>";
				
				html += "									<div class='thumb_b' style='float:left;  padding-right:15px'>";
				html += "										<form method='post' action='/FileUpload_Art.gu' enctype='multipart/form-data' class='dropzone' id='artProjMydropzone1_"+i+"'>";
				html += "											<input type='hidden' name='filepath' value='artproject' />";
				html += "											<input type='hidden' name='thumbnail' value='true' />";
				html += "											<input type='hidden' name='width' value='100' />";
				html += "											<input type='hidden' name='height' value='70' />";
				html += "											<input type='hidden' name='preview' value='true' />";
				html += "										</form>";
				html += "									</div>";
				
				
				
				
				
				html += "									<div class='write_area'>";
				html += "										<div class=''><label class='l_label' style='margin-top:0px'>"+g360.g_lang.Artproject8+"</label>";
				html += "										<input type='text' id='project_rate_"+i+"' class='txt txt_size' /> "+g360.g_lang.Artproject9+"</div>";
				html += "										<textarea class='txt textarea' id='project_report_"+i+"' placeholder='"+g360.g_lang.Artproject10+"'></textarea>";
			//	html += "										<span class='explain'>5000자 미만</span>";
				html += "									</div>";
				html += "									<div class='btn_area bottom_area'>";
				html += "										<button class='btn btn_gray btn_cancel' onclick=\"gPAProject.weekly_report_cancel()\">"+g360.g_lang.Cancel+"</button>";
				html += "										<button class='btn btn_violet btn_ok' onclick=\"gPAProject.weekly_report_submit('"+sp.dockey+"','"+i+"')\">"+g360.g_lang_Complete+"</button>";
				html += "									</div>";
				html += "								</td>";
				html += "							</tr>";
				html += "						</tbody>";
				html += "					</table>";
				html += "				</div>";
				html += "				<div class='btn_view_area' style='z-index:0'><button class='btn btn_gray btn_detail_view' onclick=\"gPAProject.collapse('"+i+"', this)\">"+g360.g_lang.Artproject11+"</button></div>";
				html += "			</div>";
				html += "		</div>";
				html += "	</div>";
				
	
				
				html += "</section>";

				
			}else 	if ( gPAProject.opt == "end" && sp.request_subform == "2"){
				
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
				
				price = g360.comma(g360.setWon(g360.removeComma(select_suggest.price) * 10000));
				
				
				var complete_date = select_suggest.date;
				var term = select_suggest.art_product_term;
				var ok_date = sp.art_ok_date;
										
				var sday = new Date(ok_date);
				sday.setDate(sday.getDate() + (parseInt(term)+5)); //15일 더하여 setting
				var year = sday.getFullYear();
				//var month = sday.getMonth() + 1;
				
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
				html += "				<div class='evaluation_info' style='float:left;position:absolute;padding-left:135px'>";
				html += "					<dl>";
				html += "						<dt>"+g360.g_lang.Partners6+"</dt>";
			//	html += "						<dd>" + sp.art_nickname+"<dd>";
				html += "						<dd><span style='cursor:pointer;background: #6c6d6d;color: white;' onclick=\"g360.user_info_open('"+sp.request_email+"','')\">"+sp.request_nickname + g360.g_lang.Artproject3+"</span><dd>";
				html += "					</dl>";
				html += "					<dl>";
				html += "						<dt>"+g360.g_lang.Partners7+"</dt>";
				html += "						<dd>"+date1+"<dd>";
				html += "					</dl>";
				html += "				</div>";
				
				html += "				<div style='top: 40px; margin-left: 135px;  position: relative;'>";
				
				if (sp.nobank_status == "3"){
					html += "					<dl>";
					html += "						<dt style='color:blue'>";
					html += 							g360.g_lang.Artproject12;
					html += "						</dt>";
					html += "					</dl>";
				}else if (sp.nobank_status == "4"){
					html += "					<dl>";
					html += "						<dt style='color:red'>";
					html +=  							g360.g_lang.Artproject13;
					html += "						</dt>";
					html += "					</dl>";
				}
				

				html += "				</div>";
				
				
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
				html += "							<th>"+g360.g_lang.Partners33+"</th>";
				html += "							<td><strong>"+price+"</strong> </td>";
				html += "							<th>"+g360.g_lang.Period1+"</th>";
				html += "							<td><strong>"+(parseInt(term)+5)+g360.g_lang.Partners22+"</strong> ("+g360.g_lang.Partners16 + term + g360.g_lang.Partners17 +")</td>";

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
				html += "									<span>"+g360.g_lang.Artist_Mypage10+"</span>";

				for (var r = 1; r <= 5; r++){
					if (r <= parseInt(evaluation.score1)){
						html += "									<img src='/img/account/star-r-focus.svg' >";
					}else{
						html += "									<img src='/img/account/star-r-disable.svg' >";
					}
				}
				html += "									<strong>"+evaluation.score1 + g360.g_lang.Artist_Mypage6+"</strong>";
				html += "								</div>";
				html += "							</li>";
				html += "							<li>";
				html += "								<div class='star' id='score2'>";
				html += "									<span>"+g360.g_lang.Artist_Mypage12+"</span>";
				for (var r = 1; r <= 5; r++){
					if (r <= parseInt(evaluation.score2)){
						html += "									<img src='/img/account/star-r-focus.svg' >";
					}else{
						html += "									<img src='/img/account/star-r-disable.svg' >";
					}
				}
				html += "									<strong>"+evaluation.score1+g360.g_lang.Artist_Mypage6+"</strong>";
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
				html += "									<strong>"+evaluation.score1+g360.g_lang.Artist_Mypage6+"</strong>";
				html += "								</div>";
				html += "							</li>";
				html += "							<li>";
				html += "								<div class='star' id='score4'>";
				html += "									<span>"+g360.g_lang.Artist_Mypage13+"</span>";
				for (var r = 1; r <= 5; r++){
					if (r <= parseInt(evaluation.score4)){
						html += "									<img src='/img/account/star-r-focus.svg' >";
					}else{
						html += "									<img src='/img/account/star-r-disable.svg' >";
					}
				}
				html += "									<strong>"+evaluation.score1+g360.g_lang.Artist_Mypage6+"</strong>";
				html += "								</div>";
				html += "							</li>";
				html += "							<li>";
				html += "								<div class='star' id='score5'>";
				html += "									<span>"+g360.g_lang.Artist_Mypage11+"</span>";
				for (var r = 1; r <= 5; r++){
					if (r <= parseInt(evaluation.score5)){
						html += "									<img src='/img/account/star-r-focus.svg' >";
					}else{
						html += "									<img src='/img/account/star-r-disable.svg' >";
					}
				}
				html += "									<strong>"+evaluation.score1+g360.g_lang.Artist_Mypage6+"</strong>";
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
				
				
			}else if (gPAProject.opt == "support_end" && sp.request_subform == "2"){
				//작품 제작 요청 지원 마감 일 경우
				html += "<div class='group_section' id='group_section_dis_"+i+"'>";
				html += "	<div class='wrap_group evaluation noborder_top'>";
				html += "		<div class='wrap_group_header'  >";
				
				
				//request_subform : 1 - 작품 추천 요청 / request_subform : 2 - 작품 제작 요청
				//request_status : 1 - 진행중 -지원가능/ 2 - 완료 - 지원마감 / 3 - 평가 대기중  / 4 - 프로젝트 전체 완료
				
			

				html += "			<h4 ><em class='blue_label'>"+g360.g_lang.Request_artwork+"</em>";	
				
				html += 	sp.request_title + " <div class='wrap_group_date'><span style='font-size:14px'>"+g360.g_lang.Registration_date+" : </span>"+g360.iso_date_convert(sp.date)+"</div></h4>";
								
				html += "			<div class='wrap_group_invite'><img src='/img/account/icon-invite-a-friend.svg' />"+g360.g_lang.Total_Apply1 + suggest_count + g360.g_lang.Total_Apply2 + " </div>";
				html += "				<div class='evaluation_info'>";
				html += "					<ul>";
				html += "						<li class='ei_file disabled'>"+g360.g_lang.Attachments+"</li>";
				html += "						<li class='ei_type'><span>"+g360.g_lang.Shape+"</span>"+ty+"</li>";
				html += "						<li class='ei_size'><span>"+g360.g_lang.Size1+"</span>"+sp.request_height+"cm x "+sp.request_width+"cm</li>";
				html += "						<li class='ei_price'><span>"+g360.g_lang.Request_amount+"</span>"+g360.comma(g360.setWon(sp.request_price * 10000))+"</li>";
				html += "						<li class='ei_date'><span>"+g360.g_lang.Delivery_request_date+"</span>"+sp.request_date+"</li>";
				html += "					</ul>";
				html += "				</div>";
				html += "			</div>";
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
						
						if (g360.UserInfo.email == sd.email){	
							
							html += "			<div class='partners term bg_white'>";
							///
								//본인 것만 표시한다.
					
						
							
							var img_url = g360.user_photo_url(sd.email);
							//<img src='"+img_url+"' onerror=\"g360.user_photo_url_none_draw(this)\">
							html += "				<div class='thm' style='background-image: url("+img_url+");background-position: center; background-size: cover;' ></div>";
							
							
							
							html += "				<div class='partners_name'>";
							
						//	html += "					"+sd.nickname+" <div><span>"+(sd.gubun == "art" ? "작가" : "아트 컨설턴트")+"</span>";
							
							if (sd.gubun == "art"){
								html += "					"+sd.nickname+" <div><span style='cursor:pointer' onclick=\"g360.showArtistDetail('"+sd.email+"')\">작가</span>";
							}else{
								html += "					"+sd.nickname+" <div><span>"+g360.g_lang.Art_consultant+"</span>";
							}
							
							html += "					<span style='cursor:pointer' onclick=\"g360.open_artist_info('"+sd.email+"')\"><a>파트너스 정보</a></span></div>";
							html += "				</div>";
							html += "				<div class='evaluation_info'>";
							html += "					<ul>";			
						//	if (sp.art_ok == sd.email){	
						//	if (sp.ownerkey == sd.ownerkey){
							//	html += "						<li class='ei_price'><span>계약금액</span>"+g360.comma(g360.setWon(sp.selected_price* 10000))+"</li>";	
								html += "						<li class='ei_price'><span>"+g360.g_lang.Partners33+"</span>"+g360.comma(g360.setWon(sd.price.replace(",","")*10000))+"</li>";	
						//	}else{
						//		html += "						<li class='ei_price'><span>제안금액</span></li>";	
						//	}
												
							html += "						<li class='ei_date'><span>"+g360.g_lang.Partners36+"</span>"+sd.art_product_term+"</li>";				
							html += "					</ul>";
							html += "				</div>";				
								
//							//작품 제작 채택 , 미채택 표시하기
//							var ssspp = eval(sd.suggest_image_list);
//							var xhtml = "<button class='btn btn_disabled btn_select' >미채택</button>";
//							for (var u = 0 ; u < ssspp.length; u++){
//								if (ssspp[u].dockey == sp.art_select_dockey){
//									xhtml = "				<button class='btn btn_blue btn_select' >채택</button>";
//								}
//							}				
							
							var xhtml = "";
							if (sp.ownerkey == sd.ownerkey){
								xhtml = "<button class='btn btn_blue btn_select' >"+g360.g_lang.Adopted+"</button>";
							}else{
								xhtml = "<button class='btn btn_disabled btn_select' >"+g360.g_lang.Not_adopted+"</button>";
							}
							
							
							html += xhtml;					
							
							html += "			</div>";				
							
							html += "			<div class='partners_detail' style='display:none'>";
							html += "				<p class='term'>"+g360.TextToHtml(sd.suggest_memo)+"</p>";
							
//								
							html += "			</div>";
							
							
						}
						
						
						
					}
							
				
						
						
		
					html += "			<div class='btn_area' id='xBtn_dis_"+i+"'>";
					html += "				<button class='btn btn_fold on' onclick=\"gPAProject.open_short('"+i+"', this)\">"+g360.g_lang.Quick_View+"</button>";
					html += "				<button class='btn btn_detail' onclick=\"gPAProject.open_detail('"+i+"', this, '"+sp.ownerkey+"', '')\">"+g360.g_lang.View_Details+"</button>";
					html += "			</div>";
					html += "		</div>";
					html += "	</div>";
				}	
				
	
				html += "		</div>";		
				html += "	</div>";
				html += "</div>";
				
				
				
			}else 	if ( (gPAProject.opt == "end" || gPAProject.opt == "support_end") && sp.request_subform == "1"){
				
				html += "<div class='group_section' id='group_section_dis_"+i+"'>";
				html += "	<div class='wrap_group evaluation noborder_top'>";
				html += "		<div class='wrap_group_header'  >";
				
				
				//request_subform : 1 - 작품 추천 요청 / request_subform : 2 - 작품 제작 요청
				//request_status : 1 - 진행중 -지원가능/ 2 - 완료 - 지원마감 / 3 - 평가 대기중  / 4 - 프로젝트 전체 완료
				
			

				html += "			<h4 ><em class='green_label'>"+g360.g_lang.Artproject15+"</em>";	
				
				html += 	sp.request_title + " <div class='wrap_group_date'><span style='font-size:14px'>"+g360.g_lang.Registration_date+" : </span>"+g360.iso_date_convert(sp.date)+"</div></h4>";
								
				html += "			<div class='wrap_group_invite'><img src='/img/account/icon-invite-a-friend.svg' />"+g360.g_lang.Total_Apply1 + suggest_count + g360.g_lang.Total_Apply2 + " </div>";
				html += "				<div class='evaluation_info'>";
				html += "					<ul>";
				html += "						<li class='ei_file disabled'>"+g360.g_lang.Attachments+"</li>";
				html += "						<li class='ei_type'><span>"+g360.g_lang.Shape+"</span>"+ty+"</li>";
				html += "						<li class='ei_size'><span>"+g360.g_lang.Size1+"</span>"+sp.request_height+"cm x "+sp.request_width+"cm</li>";
				html += "						<li class='ei_price'><span>"+g360.g_lang.Request_amount+"</span>"+g360.comma(g360.setWon(sp.request_price * 10000))+"</li>";
				html += "						<li class='ei_date'><span>"+g360.g_lang.Delivery_request_date+"</span>"+sp.request_date+"</li>";
				
				html += "					</ul>";
				html += "				</div>";
				html += "			</div>";
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
						
						if (g360.UserInfo.email == sd.email){	
							
							html += "			<div class='partners term bg_white'>";
							///
								//본인 것만 표시한다.
								
						
							
							var img_url = g360.user_photo_url(sd.email);
							html += "				<div class='thm' style='background-image: url("+img_url+");background-position: center; background-size: cover;'></div>";
							
							
							
							html += "				<div class='partners_name'>";
							
						//	html += "					"+sd.nickname+" <div><span>"+(sd.gubun == "art" ? "작가" : "아트 컨설턴트")+"</span>";
							
							if (sd.gubun == "art"){
								html += "					"+sd.nickname+" <div><span style='cursor:pointer' onclick=\"g360.showArtistDetail('"+sd.email+"')\">"+g360.g_lang.Artist+"</span>";
							}else{
								html += "					"+sd.nickname+" <div><span>"+g360.g_lang.Art_consultant+"</span>";
							}
							
							html += "					<span style='cursor:pointer' onclick=\"g360.open_artist_info('"+sd.email+"')\"><a>"+g360.g_lang.Partners_Info+"</a></span></div>";
							html += "				</div>";
							html += "				<div class='evaluation_info'>";
							html += "					<ul>";			
						//	if (sp.art_ok == sd.email){	
							if (sp.ownerkey == sd.ownerkey){
							//	html += "						<li class='ei_price'><span>계약금액</span>"+g360.comma(g360.setWon(sp.selected_price* 10000))+"</li>";	
								html += "						<li class='ei_price'><span>"+g360.g_lang.Partners33+"</span>"+g360.comma(g360.setWon(sp.selected_price))+"</li>";	
							}else{
								html += "						<li class='ei_price'><span>"+g360.g_lang.Partners34+"</span></li>";	
							}
												
							html += "						<li class='ei_date'><span>"+g360.g_lang.Partners35+"</span>"+sd.date+"</li>";				
							html += "					</ul>";
							html += "				</div>";				
								
//							//작품 제작 채택 , 미채택 표시하기
//							var ssspp = eval(sd.suggest_image_list);
//							var xhtml = "<button class='btn btn_disabled btn_select' >미채택</button>";
//							for (var u = 0 ; u < ssspp.length; u++){
//								if (ssspp[u].dockey == sp.art_select_dockey){
//									xhtml = "				<button class='btn btn_blue btn_select' >채택</button>";
//								}
//							}				
							
							var xhtml = "";
							if (sp.ownerkey == sd.ownerkey){
								xhtml = "<button class='btn btn_blue btn_select' >"+g360.g_lang.Adopted+"</button>";
							}else{
								xhtml = "<button class='btn btn_disabled btn_select' >"+g360.g_lang.Not_adopted+"</button>";
							}
							
							
							html += xhtml;					
							
							html += "			</div>";				
							
							html += "			<div class='partners_detail' style='display:none'>";
							html += "				<p class='term'>"+g360.TextToHtml(sd.suggest_memo)+"</p>";
							
							if (sd.suggest_image_list != ""){
								html += "				<div class='rmd_art term bg_white' id='img_div_"+i+"'>";
								html += "					<ul class='img_list' id='img_list_"+y+"'>";
								
								var spx = eval(sd.suggest_image_list);
								for (var k = 0 ; k < spx.length; k++){
									var sdata = spx[k];
								//	var em = sdata.dockey.split("_")[0];
									var inx = sdata.dockey.lastIndexOf("_");
									var em = sdata.dockey.substring(0,inx);
									var url = "/artimage/"+em+"/art/preview/"+sdata.dockey+".jpg";
									
									html += "						<li data='"+sdata.dockey+"' data3='"+sd.ownerkey+"' data2='"+sdata.price+"'>";
								//	html += "							<a href='#'>";
									html += "								<div><span><img src='"+url+"'/></span></div>";
									html += "								<dl>";
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
						
						
						
					}
							
				
						
			
					html += "			<div class='btn_area' id='xBtn_dis_"+i+"'>";
					html += "				<button class='btn btn_fold on' onclick=\"gPAProject.open_short('"+i+"', this)\">"+g360.g_lang.Quick_View+"</button>";
					html += "				<button class='btn btn_detail' onclick=\"gPAProject.open_detail('"+i+"', this, '"+sp.ownerkey+"', '"+sdata.dockey+"')\">"+g360.g_lang.View_Details+"</button>";
					html += "			</div>";
					html += "		</div>";
					html += "	</div>";
				}	
				
	
				html += "		</div>";		
				html += "	</div>";
				html += "</div>";
				
				
				
				
			}else{
			
						
				html += "<div class='group_section'>";
				html += "	<div class='wrap_group evaluation noborder_top'>";
				html += "		<div class='wrap_group_header'  >";
				
				
				//request_subform : 1 - 작품 추천 요청 / request_subform : 2 - 작품 제작 요청
				//request_status : 1 - 진행중 -지원가능/ 2 - 완료 - 지원마감 / 3 - 평가 대기중  / 4 - 프로젝트 전체 완료
				
				if (sp.request_subform == "1"){
					if (open_project_option == "T"){
						html += "			<h4 onclick=\"gPAProject.open_project('"+sp.dockey+"')\" style='cursor:pointer'><em class='green_label'>"+g360.g_lang.Artproject14+"</em>";
					}else{
						html += "			<h4 ><em class='green_label'>"+g360.g_lang.Artproject15+"</em>";
					}
					
				}else{
					if (open_project_option == "T"){
						html += "			<h4 onclick=\"gPAProject.open_project('"+sp.dockey+"')\" style='cursor:pointer'><em class='blue_label'>"+g360.g_lang.Artproject16+"</em>";
					}else{
						html += "			<h4 ><em class='blue_label'>"+g360.g_lang.Artproject17+"</em>";
					}
					
				}
				html += 	sp.request_title + " <div class='wrap_group_date'><span style='font-size:14px'>"+g360.g_lang.Registration_date+" : </span>"+g360.iso_date_convert(sp.date)+"</div></h4>";
				
				
				html += "			<div class='wrap_group_invite'><img src='/img/account/icon-invite-a-friend.svg' />"+g360.g_lang.Total_Apply1 + suggest_count + g360.g_lang.Total_Apply2;
				if (sp.favo == "T"){
					html += "<button class='btn btn_like on' onclick=\"gPAProject.favorite('"+sp.dockey+"', this)\">"+g360.g_lang.Like+"</button></div>";
				}else{
					html += "<button class='btn btn_like' onclick=\"gPAProject.favorite('"+sp.dockey+"', this)\">"+g360.g_lang.Like+"</button></div>";
				}
							
				html += "				<div class='evaluation_info'>";
				html += "					<ul>";
			//	html += "						<li class='ei_file disabled'>첨부파일</li>";
				
				if (typeof(sp.request_file_name) != "undefined"){
					//html += "						<li class='ei_file' style='cursor:pointer; color:#ffc107; background-color:#867954' onclick=\"g360.preview_img('"+sp.request_file_name+"','"+sp.request_email+"','artRequest')\">첨부파일</li>";
					//var url = "/artimage/" + sp.request_email + "/artRequest/mobile/" + sp.request_file_name + ".jpg";	
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
				
				html += "						<li class='ei_type'><span>"+g360.g_lang.Shape+"</span>"+ty+"</li>";
				html += "						<li class='ei_size'><span>"+g360.g_lang.Size1+"</span>"+sp.request_height+"cm x "+sp.request_width+"cm</li>";
				html += "						<li class='ei_price'><span>"+g360.g_lang.Request_amount+"</span>"+g360.comma(g360.setWon(sp.request_price * 10000))+"</li>";
				html += "						<li class='ei_date'><span>"+g360.g_lang.Delivery_request_date+"</span>"+sp.request_date+"</li>";
				html += "					</ul>";
				html += "				</div>";
				
				
				
				
				
				html += "				<div class='evaluation_info' style='position:absolute;top: 90px;padding-left:135px;width: 500px;'>";
				if (gPAProject.opt == "eval_wait"){
						//무통장 입금일 경우
					
					
						html += "					<dl>";
						html += "						<dt>";
						html += "							<a style='cursor:pointer;font-size: 13px;text-decoration: underline;color: #2121e0;' onclick=\"g360.user_info_open('"+sp.request_email+"','')\">구매자 배송지 정보</a> ";
						html += "						</dt>";
						html += "					</dl>";
					

				}
				html += "				</div>";
				
				
				
				
				
				html += "			</div>";
				
				
				
				
				
				
				html += "			<div class='wrap_group term introduce'>";
				html += "				<p>"+g360.TextToHtml(sp.request_memo)+"</p>";
				html += "			</div>";
				html += "		</div>";
				
				if ((gPAProject.opt == "support_ing")               ){
			
					var ss = sp.suggest;
					for (var k = 0 ; k < ss.length; k++){
						var item = ss[k];
						var xemail = item.email;
						if (xemail == g360.UserInfo.email){
							html += "<div class='wrap_group support_area bg_white term'>";
							html += "	<h4>"+g360.g_lang.Application_contents+"<div class='wrap_group_date'><span style='font-size:14px'>"+g360.g_lang.Notice_5+" : </span>"+g360.iso_date_convert(item.save_date)+"</div></h4>";
							html += "	<div class='evaluation_info'>";
							html += "		<ul>";
							if (sp.request_subform == "1"){			
								html += "			<li class='ei_date'><span>"+g360.g_lang.Partners35+"</span>"+item.date+"</li>";
							}else{
								html += "			<li class='ei_price'><span>"+g360.g_lang.Partners34+"</span>"+g360.comma(g360.setWon(g360.removeComma(item.price) * 10000))+"</li>";
								html += "			<li class='ei_date'><span>"+g360.g_lang.Creating_period+"</span>"+item.art_product_term+"일</li>";
							}	
							
							
							html += "		</ul>";
							html += "	</div>";
							html += "</div>";
							
							
							html += "     		<div class='support' >"
							html += "				<div class='btn_area' >";
							
						
							var ownerkey = ss[k].ownerkey;							
							html += "					<button class='btn btn_fold' onclick=\"gPAProject.project_edit('"+sp.dockey+"','" +ownerkey+ "')\">"+g360.g_lang.Update+"</button>";							
							html += "					<button class='btn btn_detail' onclick=\"gPAProject.project_delete('"+sp.dockey+"','" +ownerkey+ "')\">"+g360.g_lang.Delete+"</button>";
							html += "				</div>";
							html += "			</div>";
							
							
							html += "<div class='wrap_group term introduce'>";
							html += "	<p class='fold'>"+g360.TextToHtml(item.suggest_memo)+"</p>";
							html += "</div>";
							
							if (sp.request_subform == "1"){			
								html += "			<div class='group_section'>";
								html += "				<div class='group_header type3 fixheight_s'>";
								html += "					<h3>"+g360.g_lang.Main_Content4+"</h3>";
								html += "				</div>";
								html += "				<div class='wrap_group rmd_art term bg_white'>";
								html += "					<ul class='img_list' id='art_img_suggest_list'>";
								
								if (item.suggest_image_list != ""){
									var arr = eval(item.suggest_image_list);
									for (var y = 0; y < arr.length; y++){
										
										var spp = arr[y];
									//	var em = spp.dockey.split("_")[0];
										var inx = spp.dockey.lastIndexOf("_");
										var em = spp.dockey.substring(0,inx);
										var kkk = spp.dockey+"_jpg";
										var url = "/artimage/"+em+"/art/preview/"+spp.dockey+".jpg";
																				
										if (typeof(spp.myspace_url) != "undefined" && spp.myspace_url != ""){
											url = spp.myspace_url;									
										}
										
										html += "<li id='select_item_"+y+"'>";
										html += "	<a onclick=\"g360.showArtDetail('"+spp.dockey+"')\">";
										html += "		<div><span><img src='"+url+"' style='width:100%; '></span></div>";
										html += "		<dl style='text-align:center'>";
										html += "			<dd>"+spp.artist+"</dd>";
										html += "			<dd>"+spp.title+"</dd>";
										html += "			<dd>"+spp.size+"</dd>";
										html += "			<dd>"+g360.comma(g360.setWon(spp.price))+"</dd>";
										html += "			<dd></dd>";
									//	html += "			<dd>"+spp.size+"<span onclick=\"gPAProject.select_item_delete('select_item_"+y+"'); return false;\">[Del]</span></dd>";
										html += "		</dl>";
										html += "	</a>";
										html += "</li>";
									}
								}
								
								html += "					</ul>";
								html += "				</div>";
								html += "			</div>";
							}
						}
					}
					
					
				}else if (sp.request_subform == "2" && gPAProject.opt == "eval_wait"){
					var ss = sp.suggest;
					
					
					
					var select_suggest = new Object();
					for (var u = 0 ; u < ss.length; u++){
						var tt = ss[u];
						if (tt.email == sp.art_ok ){
							select_suggest = tt;
						}
					}
					
					var price = "";
					
					price = g360.comma(g360.setWon(g360.removeComma(select_suggest.price) * 10000));
					
					
					var complete_date = select_suggest.date;
					var term = select_suggest.art_product_term;
					
					for (var k = 0 ; k < ss.length; k++){
						var item = ss[k];
						var xemail = item.email;
						if (xemail == g360.UserInfo.email){
//							html += "<div class='wrap_group support_area bg_white term'>";
//							html += "	<h4>지원내용<div class='wrap_group_date'><span style='font-size:14px'>등록일 : </span>"+g360.iso_date_convert(item.save_date)+"</div></h4>";
//							html += "	<div class='evaluation_info'>";
//							html += "		<ul>";
//							if (sp.request_subform == "1"){			
//								html += "			<li class='ei_date'><span>배송예정일</span>"+item.date+"</li>";
//							}else{
//								html += "			<li class='ei_price'><span>제안금액</span>"+g360.comma(g360.setWon(g360.removeComma(item.price) * 10000))+"</li>";
//								html += "			<li class='ei_date'><span>작업기간</span>"+item.art_product_term+"일</li>";
//							}	
//							
//							
//							html += "		</ul>";
//							html += "	</div>";
//							html += "</div>";
//							html += "<div class='wrap_group term introduce'>";
//							html += "	<p class='fold'>"+g360.TextToHtml(item.suggest_memo)+"</p>";
//							html += "</div>";
							
							
							
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
							html += "							<td><strong>"+(parseInt(term)+5)+ g360.g_lang.Partners22 +"</strong> ("+g360.g_lang.Partners16 + term + g360.g_lang.Partners17+")</td>";
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
							
						}
					}
				}
				
				html += "	</div>";
				html += "</div>";
			}
		}
		
		
		$("#NAVIGATE").show();
		gPAProject.search_paging(gPAProject.cPage);
		$("#artProject_list").html(html);
		
		
		if (gPAProject.opt == "ing"){
			//진행중인 보기에서 는 dropyzone.js를 실행해 줘야 한다.
			//gPAProject.draw_dropzone();
			gPAProject.draw_dropzone_dis();
		}
		
	},
	
	
	"project_edit" : function(dockey, ownerkey){
		gPAProject.edit_dockey = dockey;
		gPAProject.open_type = "edit";
		gPAProject.owner_key = ownerkey;
		
		gPAProject.open_project(dockey);
		
	},
	
	
	
	
	
	
	"project_delete" : function(dockey, ownerkey){
			
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
						var url = g360.root_path + "/project_delete_artist.mon?id=" + dockey +"&ownerkey="+ ownerkey;
						$.ajax({
							type : "GET",
							url : url,
							cache : false,
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							success : function(data){
								if (data.result == "OK"){
									gPAProject.load_project_list(gPAProject.cPage);
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
	
	
	
	"open_short" : function(id, obj){
		$("#group_section_dis_"+id+" .partners_detail").each(function(index){
			$(this).hide();
		});
		
		
		$("#xBtn_dis_" + id +" button").each(function(index){
			$(this).removeClass("on");
		});
		
		$(obj).addClass("on");
	},
	
	
	
	"open_detail" : function(id, obj, art_select_dockey, dockey){

		gPAProject.open_detail_dockey = dockey;
		
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
				if (gPAProject.open_detail_dockey == data){
					$(this).addClass("on");
				}
				
			}
		});
		

		
		
		
	},

	
	"collapse" : function(id, obj){
	
		if (obj.textContent.indexOf(g360.g_lang.Register) > -1){
			$(obj).text(g360.g_lang.Fold_Progress);
			$("#report_" + id).show();
			
			//드롭존을 동적으로 등록해 준다.
			//gPAProject.draw_dropzone_dis(id);
			
		}else{
			$(obj).text(g360.g_lang.Artproject11);
			$("#report_" + id).hide();
			
			
		}
		
	},
	
	"weekly_report_cancel" : function(){
		gPAProject.click_ing();
	},
	
	"expand" : function(id){
		$("#report_" + id).show();
	},
	
	
	
	
	
	
	
	
	"draw_dropzone_dis" : function(id){
		
		
		$('.dropzone').each(function(){
//		    var options = $(this).attr('id').split('-');
//		    var dropUrl = 'test' + options[1] + '.php';
//		    var dropMaxFiles = parseInt(options[2]);
//		    var dropParamName = 'file' + options[1];
//		    var dropMaxFileSize = parseInt(options[3]);

		    $(this).dropzone({
		    	maxFilesize: 1000,  //100M
				maxFiles: 1,
				renameFile: function(file){
					var dt = new Date();
					var time = dt.getTime();
					return time+file.name;
				},
				acceptedFiles: ".jpeg,.jpg,.gif",
				addRemoveLinks: true,
				timeout: 500000,
				uploadMultiple: true,
				autoProcessQueue: false,
				clickable: true,
				// 병렬처리 WebConfig도 같이 수정해줘야함.
		        parallelUploads: 1,
		        dictDefaultMessage: g360.g_lang.Artproject25+"<br>(.jpg,.gif)",
				accept : function(file, done){
					done();
				},
				
				fallback: function(){
					g360.gAlert("Error",g360.g_lang.HangingArt_6, "red", "left");
				},
				
				init: function(){
					this.on("maxfilesexceeded", function(file){
						this.removeFile(file);
						g360.gAlert("Error",g360.g_lang.HangingArt_7, "red", "left");
					});
					
					this.on("addedfile", function (file) {
	                    var _this = this;
	                 //   gArtistInfo.file1 = file;
	                    if ($.inArray(file.type, ['image/jpeg', 'image/jpg', 'image/gif']) == -1) {
	                    	g360.gAlert("Error", g360.g_lang.Artwork_request6 , "red", "left");
	                        _this.removeFile(file);
	                    }
	                });
					
					artProjMydropzone1 = this; //Closer
				},				
				
				removedfile : function(file)
				{
				
		                var name = file.upload.filename;
		                $.ajax({
		                    headers: {
		                                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		                            },
		                    type: 'POST',
		                    url: '/removefile.gu',
		                    data: {filename: name},
		                    success: function (data){
		                        console.log("File has been successfully removed!!");
		                    },
		                    error: function(e) {
		                        console.log(e);
		                    }});
		                    var fileRef;
		                    return (fileRef = file.previewElement) != null ? 
		                    fileRef.parentNode.removeChild(file.previewElement) : void 0;
		        },
				success : function(file, response){
					
					var isOK = JSON.parse(response).result;
					if (isOK == "OK"){
						var res = JSON.parse(response);
					
						gPAProject.report_submit(res.filename);
						
					}else{
						g360.gAlert("Error", g360.g_lang.Art_Detail_Alert9 , "red", "left");

					}					
				},
				error : function(file, response){
					return false;
				}
		    });

		});
		
		

		
	},
	
	
	"draw_dropzone" : function(){
		
		
		
		Dropzone.options.artProjMydropzone1 = {
				maxFilesize: 1000,  //100M
				maxFiles: 1,
				renameFile: function(file){
					var dt = new Date();
					var time = dt.getTime();
					return time+file.name;
				},
				acceptedFiles: ".jpeg,.jpg,.gif",
				addRemoveLinks: true,
				timeout: 500000,
				uploadMultiple: true,
				autoProcessQueue: false,
				clickable: true,
				// 병렬처리 WebConfig도 같이 수정해줘야함.
		        parallelUploads: 1,
		        dictDefaultMessage: g360.g_lang.Artproject25+"<br>(.jpg,.gif)",
				accept : function(file, done){
					done();
				},
				
				fallback: function(){
					g360.gAlert("Error",g360.g_lang.HangingArt_6, "red", "left");
				},
				
				init: function(){
					this.on("maxfilesexceeded", function(file){
						this.removeFile(file);
						g360.gAlert("Error",g360.g_lang.HangingArt_7, "red", "left");
					});
					
					this.on("addedfile", function (file) {
	                    var _this = this;
	                 //   gArtistInfo.file1 = file;
	                    if ($.inArray(file.type, ['image/jpeg', 'image/jpg', 'image/gif']) == -1) {
	                    	g360.gAlert("Error",g360.g_lang.Artwork_request6, "red", "left");
	                        _this.removeFile(file);
	                    }
	                });
					
					artProjMydropzone1 = this; //Closer
				},				
				
				removedfile : function(file)
				{
				
		                var name = file.upload.filename;
		                $.ajax({
		                    headers: {
		                                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		                            },
		                    type: 'POST',
		                    url: '/removefile.gu',
		                    data: {filename: name},
		                    success: function (data){
		                        console.log("File has been successfully removed!!");
		                    },
		                    error: function(e) {
		                        console.log(e);
		                    }});
		                    var fileRef;
		                    return (fileRef = file.previewElement) != null ? 
		                    fileRef.parentNode.removeChild(file.previewElement) : void 0;
		        },
				success : function(file, response){
					
					var isOK = JSON.parse(response).result;
					if (isOK == "OK"){
						var res = JSON.parse(response);
					
						gPAProject.report_submit(res.filename);
						
					}else{
						g360.gAlert("Error",g360.g_lang.Art_Detail_Alert9, "red", "left");

					}					
				},
				error : function(file, response){
					return false;
				}
			}
			
			$("#artProjMydropzone1").dropzone();	
	},
	
	"open_project" : function(id){
		gPAProject.select_item = "";
		var is_myspace_use = false;
		gPAProject.cur_open_project_id = id;
		
		var sp = gPAProject.project[id];
	
		
		var cnt = 0;
		if (typeof(sp.suggest) != "undefined"){
			cnt = sp.suggest.length;
		}
		
		var ty = (sp.request_type == "1") ? g360.g_lang.Square : 
			(sp.request_type == "2") ? g360.g_lang.Horizontal : 
			(sp.request_type == "3") ? g360.g_lang.Vertical : 
			(sp.request_type == "4") ? g360.g_lang.Circle : 
			(sp.request_type == "5") ? g360.g_lang.Set : 
			(sp.request_type == "6") ? g360.g_lang.Install_Art : 
			(sp.request_type == "7") ? g360.g_lang.Media : "";
		
		var html = "";
		
		html += "<div class='sub_common_content art_project project_detail'>";
		
		
			
		html += "	<section>";
		html += "		<div class='group_section'>";
		html += "			<div class='wrap_group evaluation noborder_top'>";
		html += "				<div class='wrap_group_header'>";

		
		if (sp.request_subform == "1"){
			gPAProject.cur_request_subform = "1";
			html += "			<h4><em class='green_label'>"+g360.g_lang.Artproject14+"</em>";
		}else{
			gPAProject.cur_request_subform = "2";
			html += "			<h4><em class='blue_label'>"+g360.g_lang.Artproject16+"</em>";
		}
		html += 				sp.request_title + " <div class='wrap_group_date'><span style='font-size:14px'>"+g360.g_lang.Registration_date+" : </span>"+g360.iso_date_convert(sp.date)+"</div>";
		html += "				</h4>";
		
		
		html += "					<div class='wrap_group_invite'><img src='/img/account/icon-invite-a-friend.svg' alt='' />"+g360.g_lang.Total_Apply1 + cnt + g360.g_lang.Total_Apply2;
//			html += "						<button class='btn btn_like'>좋아요</button>";
		html += "					</div>";
		html += "						<div class='evaluation_info'>";
		html += "							<ul>";
//		html += "								<li class='ei_file disabled'>첨부파일</li>";
		
		if (typeof(sp.request_file_name) != "undefined"){
			//html += "						<li class='ei_file' style='cursor:pointer; color:#ffc107; background-color:#867954' onclick=\"g360.preview_img('"+sp.request_file_name+"','"+sp.request_email+"','artRequest')\">첨부파일</li>";
		//	var url = "/artimage/" + sp.request_email + "/artRequest/mobile/" + sp.request_file_name + ".jpg";		
			var url = g360.artProject_preview_img_path(sp.request_email, sp.request_file_name);
			html += "                      <div style='float:left; cursor:pointer' onclick=\"g360.preview_img('"+sp.request_file_name+"','"+sp.request_email+"','artRequest')\">";
			html += "						<img style='width:120px; height:120px; margin-right:10px' src='"+url+"'></div>";
		}else if (typeof(sp.request_selectimg_path) != "undefined" && sp.request_selectimg_path != ""){
			is_myspace_use = true;
			var url = sp.request_selectimg_path;
			html += "                      <div style='float:left; cursor:pointer' onclick=\"g360.preview_img_direct('"+sp.request_selectimg_path+"','"+sp.request_email+"','artRequest')\">";
			html += "						<img style='width:120px; height:120px; margin-right:10px' src='"+url+"'></div>";
		}else{
			html += "						<li class='ei_file disabled'>"+g360.g_lang.Attachments+"</li>";
		}
		
		html += "								<li class='ei_type'><span>"+g360.g_lang.Shape+"</span>"+ty+"</li>";
		html += "								<li class='ei_size'><span>"+g360.g_lang.Size1+"</span>"+sp.request_height+"cm x "+sp.request_width+"cm</li>";
		html += "								<li class='ei_price'><span>"+g360.g_lang.Request_amount+"</span>"+g360.comma(g360.setWon(sp.request_price * 10000))+"</li>";
		html += "								<li class='ei_date'><span>"+g360.g_lang.Delivery_request_date+"</span>"+sp.request_date+"</li>";
		html += "							</ul>";
		html += "						</div>";
		html += "					</div>";
		html += "					<div class='wrap_group term introduce'>";
		html += "						<p>"+g360.TextToHtml(sp.request_memo)+"</p>";
		html += "					</div>";
//			html += "					<div class='btn_area'>";
//			html += "						<button class='btn btn_detail_more'>더 보기</button>";
//			html += "						<!--button class='btn btn_detail_more on'>간략 보기</button> -->";
//			html += "					</div>";
		html += "				</div>";
		html += "			</div>";
		

		if (sp.request_subform == "1"){
		}else{
			html += "			<div class='group_section'>";
			html += "				<div class='group_header type3 autoheight bg_gray'>";
			html += "					<h3>"+g360.g_lang.Artproject18+"</h3>";
			html += "				</div>";
			html += "				<div class='wrap_group term bg_white'>";
			html += "					<div class='request_area'>";
			html += "						<div class='left'><input type='text' id='input_price_art' class='txt txt_price' /><label class='r_label'>만원</label></div>";
			html += "						<p>"+g360.g_lang.Artproject19+"</p>";
			html += "					</div>";
			html += "				</div>";
			html += "			</div>";
		}			
		
		if (sp.request_subform == "1"){
			html += "			<div class='group_section'>";
			html += "				<div class='group_header type3 autoheight bg_gray'>";
			html += "					<h3>"+g360.g_lang.Artproject20+"</h3>";
			html += "				</div>";
			html += "				<div class='wrap_group term bg_white'>";
			html += "					<div class='request_area'>";
			html += "						<div class='left'><input type='text' id='send_date' value='"+g360.g_lang.Choose_delivery_date+"' class='btn btn_date'/></div>"; //<button class='btn btn_date' id='send_date'>배송가능날짜</button></div>";
			html += "						<p>"+g360.g_lang.Artproject21+"</p>";
			html += "					</div>";
			html += "				</div>";
			html += "			</div>";
		}else{
			html += "			<div class='group_section'>";
			html += "				<div class='group_header type3 autoheight bg_gray'>";
			html += "					<h3>"+g360.g_lang.Artproject22+"</h3>";
			html += "				</div>";
			html += "				<div class='wrap_group term bg_white'>";
			html += "					<div class='request_area'>";
			html += "						<div class='left'><input type='text' id='art_product_term' class='txt txt_price' /><label class='r_label'>일</label></div>";
		//	html += "						<p>입력하신 금액은 <strong id='art_price_dis'></strong> 입니다.</p>";
			html += "					</div>";
			html += "				</div>";
			html += "			</div>";
		}

			
			
			
			
			html += "			<div class='group_section'>";
			html += "				<div class='group_header type3 autoheight bg_gray'>";
			html += "					<h3>"+g360.g_lang.Artproject23+"</h3>";
			html += "				</div>";
			html += "				<div class='wrap_group bg_white'>";
			html += "					<div class='request_write'>";
		//	html += "						<h4>프로젝트 지원 합니다.</h4>";
			html += "						<textarea class='txt textarea' id='suggest_memo'></textarea>";
			html += "					</div>";
			html += "				</div>";
			html += "			</div>";
		
		if (sp.request_subform == "1"){
			html += "			<div class='group_section'>";
			html += "				<div class='group_header type3 fixheight_s'>";
			html += "					<h3>"+g360.g_lang.Main_Content4+"</h3>";
			html += "					<div class='btn_area vcenter' style='top:10px'>";
			if (is_myspace_use){
				html += "						<button class='btn btn_upload' onclick=\"gPAProject.showSpace()\" style='margin:10px; padding-left:10px '><img src='/img/account/icon-ap-artwork.svg'> "+g360.g_lang.Artproject2+"</button>";
			}
			else{
				html += "						<button class='btn btn_upload' onclick=\"gPAProject.popup_my_artlist()\"><img src='/img/account/icon-ap-artwork.svg'> "+g360.g_lang.My_Artwork+"</button>";
			}
			
			html += "					</div>";
			html += "				</div>";
			html += "				<div class='wrap_group rmd_art term bg_white'>";
			html += "					<ul class='img_list' id='art_img_suggest_list'>";

			html += "					</ul>";
			html += "				</div>";
			html += "			</div>";
		}

			html += "			<div class='btn_area bottom_area'>";
			html += "				<button class='btn btn_gray btn_cancel' onclick=\"gPAProject.suggest_cancel();\">"+g360.g_lang.Cancel+"</button>";
			html += "				<button class='btn btn_violet btn_submit' onclick=\"gPAProject.suggest_submit();\">"+g360.g_lang.Artproject24+"</button>";
			html += "			</div>";
			html += "		</section>";
			html += "	</div>";
	
		
		
		
		
		
		
		

		
		$("#NAVIGATE").hide();
		
		$("#artProject_list").html(html);
		
		$("#input_price_art").blur(function(){
			var price = $(this).val();
			price = g360.comma(g360.setWon(g360.removeComma(price)* 10000));
		
			$("#art_price_dis").text("‘"+price+"’");
	
		});
		
		$("#input_price_art").keyup(function(event){
			  if(event.which >= 37 && event.which <= 40) return;
			  // format number
			  $(this).val(function(index, value) {
			    return value
			    .replace(/\D/g, "")
			    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
			    ;
			  });
			
		});
		
		//달력그려 넣기
		g360.wrap_calendar("send_date", "send_date_dis");
		
		
		//편집 모드로 오픈한 경우 기본값을 자동 세팅한다.
		if (gPAProject.open_type == "edit"){
			//작품 제작 요청 편집과 작품 추천 편집시 각각 정보 형태데로 편집 창에 값을 세팅해 주어야 한다.
			//gPAProject.edit_dockey 값에 gPAProject.owner_key값의 정보를 읽어 온다.
			
			
			gPAProject.select_item = "";
			var url = g360.root_path + "/project_detail_info.mon?dockey=" + gPAProject.edit_dockey + "&okey=" + gPAProject.owner_key;
			$.ajax({
				type : "GET",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				cache : false,
				success : function(data){
					
					if (data.art_product_term == ""){
						//추천에 대한 제안 편집일 경우
						$("#send_date").val(data.date)
						$("#suggest_memo").val(g360.textToHtml(data.suggest_memo));
						
						//이미지 선택 리스트를 적용합니다.
						
						//var spl = eval(data.suggest_image_list);
						var spl = JSON.parse(data.suggest_image_list);
				
						
						for (var k = 0 ; k < spl.length; k++){
							var dx = spl[k];
							
							var sobj = new Object();
							sobj.dockey = dx.dockey;
							sobj.title = dx.title;
							sobj.artist = dx.artist;
							sobj.size = dx.size;
							sobj.price = dx.price;
							if (typeof(dx.myspace_filename) != "undefined"){
								sobj.myspace_filename = dx.myspace_filename;
								sobj.myspace_url = dx.myspace_url;
							}
							
							
							gPAProject.select_obj_list.push(sobj);
							
						
							gPAProject.select_item  = JSON.stringify(gPAProject.select_obj_list);
							
							var inx = dx.dockey.lastIndexOf("_");
							var xemail = dx.dockey.substring(0,inx);
							
							var select_img_src = "/artimage/"+xemail+"/art/preview/"+dx.dockey+".jpg";
							
							if (typeof(dx.myspace_url) != "undefined" && dx.myspace_url != ""){
								select_img_src = dx.myspace_url;									
							}
						
							
							var kkk = dx.dockey.replace(/\./gi,"-s-").replace("@","-spl-");
							var html = "";
							html += "<li id='select_item_"+kkk+"'  data='"+dx.dockey+"'>";
							html += "	<a href='#'>";
							html += "		<div><span><img src='"+select_img_src+"' style='width:100%; '></span></div>";
							html += "		<dl style='text-align:center'>";
							html += "			<dd>"+dx.artist+"</dd>";
							html += "			<dd>"+dx.title+"</dd>";
							html += "			<dd>"+dx.size+"<span onclick=\"gPAProject.select_item_delete('select_item_"+kkk+"'); return false;\" style='color:red'>[삭제]</span></dd>";
							
							html += "			<dd>"+dx.price+"</dd>";
							html += "			<dd></dd>";
							html += "		</dl>";
							html += "	</a>";
							html += "</li>";
							
							
							$("#art_img_suggest_list").append(html);
						}
						
						
						
						
						
					}else{
						//제작요청에 대한 편집일 경우
						$("#input_price_art").val(data.price);
						$("#input_price_art").blur();
						$("#art_product_term").val(data.art_product_term);
						$("#suggest_memo").val(data.suggest_memo);
					}

				},
				error : function(e){
					g360.error_alert();
				}
			})
			
		}
		
	},
	
	
	
	"popup_my_artlist" : function(){
		//작품 선택 팝업 창 띄운다.
		gPAProject.isPopup = "T";
		$("#art_gallery_popup_preview").show();
		
	
		if (parseInt(gPAProject.popup_start) < 1){
		
			gPAProject.set_left_image_popup_scroll();
			gPAProject.load_saved_image_info_popup();
			var hh = $(window).height();
			$("#popup_art_dis").css({"height":hh + "px"})
		}else{
			g360.body_scroll_hide();
			$("#art_popup_display").masonry('layout');
		}
		
	},
	

	"load_saved_image_info_popup" : function(){
		
		//작품중에 판매 완료 되지 않은 작품만 로딩한다....
		var start = gPAProject.popup_start;
		var perpage = gPAProject.popup_perpage;
		var url = g360.root_path + "/load_save_image_info_not_sale.mon?start="+start+"&perpage="+perpage;
		url += "&" + new Date().getTime();
		gPAProject.popup_complete = false;
		$.ajax({
			type : "GET",
			url : url,
			contentType : "application/json; charset=utf-8",
			success : function(data){
							
				if (start == 0){
					$('#art_popup_display').css('opacity', 0);
				//	$("#art_gallery_popup_preview .layer_account").scrollTop(0);
				//	$("#art_gallery_popup_preview .layer_account").css("top","400px");
					$('#art_popup_display').masonry();
					
				}
				
				for (var i = 0 ; i < data.length; i++){
				//	gPAProjectlist.draw_art_list2(data[i], opt);
					var spl = data[i];
					gPAProject.draw_image_display_popup(spl, i);	
					
				}
				
				// 이미지 로딩이 완료되면 화면에 표시
				$('#art_popup_display').imagesLoaded(function(){	
					$('#art_popup_display').css('opacity', 1);
					$("#art_popup_display").masonry('layout');					
					gPAProject.popup_start = parseInt(gPAProject.popup_start) + gPAProject.popup_perpage;
					gPAProject.popup_complete = true;
				});
			},
			error : function(){
				g360.gAlert("Error",g360.g_lang.Artproject26, "red", "left");
			}
		});		
	},
	
	"draw_image_display_popup" : function(data, i){
		var html = "";

		var info = data;
		
		var inx = info.art_img_filename.lastIndexOf("_");
		var xemail = info.art_img_filename.substring(0,inx);
		

		var imgsrc = g360.preview_img_path(xemail, info.art_img_filename);
		var key = xemail + "_" + info.MD5Value;
	
		html += "<div class='grid-item col-lg-3 col-md-4 col-sm-4 col-6' id='xp_"+(i+1)+"' data='"+key+"' data2='"+info.art_price+"' onclick='gPAProject.select_one(this)'>";
		html += "	<figure>";
		html += "		<a ><img src='"+imgsrc+"' style=' width: 100%;  object-fit: contain;' id='"+key+"' ></a>";
		html += "		<figcaption>";
		html += "		  <h2>"+info.art_title+"</h2>";
		html += "		  <em><img src='/img/btn-artwork-collect-normal.svg' ></em>";
		html += "		  <p id='artist_"+(i+1)+"'>"+info.art_artist+"</p>";
		if (info.art_hosu == null){
			html += "		  <p id='art_info_"+(i+1)+"' class='text-muted'>"+info.art_height+" x "+info.art_width+"cm</p>";
		}else{
			html += "		  <p id='art_info_"+(i+1)+"' class='text-muted'>"+info.art_height+" x "+info.art_width+"cm("+info.art_hosu+"호)</p>";
		}
		
		html += "		  <p id='art_price_"+(i+1)+"' class='text-muted'>"+ g360.comma(g360.setWon(info.art_price))+"</p>";
		
		html += "		</figcaption>";

		html += "  </figure>";
		html += "</div>";
						
		$div = $(html);
		$("#art_popup_display").append($div).masonry('appended', $div);
	
		//팝업창에 이미지도 미리 넣는다.
		//$("#vr_popup_display").append($div).masonry('appended', $div);

	},
	
	"set_left_image_popup_scroll" : function(){
		var _self = this;
		
		g360.body_scroll_hide();
		
		// 즐겨찾기 InfiniteScroll 적용
		var $grid = $('#art_popup_display');
		var $loader = $('#favo_loader');
		this.favo_controller = new ScrollMagic.Controller();
		this.favo_scene = new ScrollMagic.Scene({triggerElement:'#popup_art_dis #favo_loader', triggerHook:'onEnter', offset:-100})		
		.addTo(_self.favo_controller);
		this.favo_scene.on('enter', function(e) {
			
			if (!gPAProject.popup_complete) return;

			gPAProject.load_saved_image_info_popup();	

		});
	},
	
	
	"select_one" : function(id){
	
		var ob = $(id);
		var select_img_key = ob.find("img").attr("id");
		var select_img_src = ob.find("img").attr("src");
		var select_id = ob.attr("id").replace("xp_","");
		var price = ob.attr("data2");
	
		var title = ob.find("h2").text();
		var artist = $("#artist_"+ select_id).text();
		var size =  $("#art_info_"+ select_id).text();
		//var price = $("#art_price_"+ select_id).text();
		
		var dockey = ob.attr("data");

		var sobj = new Object();
		sobj.dockey = dockey;
		sobj.title = title;
		sobj.artist = artist;
		sobj.size = size;
		sobj.price = price;
		
	
		gPAProject.select_obj_list.push(sobj);
		
		if (gPAProject.select_item != ""){
			var arr = eval(gPAProject.select_item);
			for (var i = 0 ; i < arr.length; i++){
				var ssp = arr[i].dockey;
				if (ssp == sobj.dockey){
					g360.gAlert("Info", g360.g_lang.Artproject27 , "blue", "top");
					return false;
				}
			}
		}
		
	
		
		//이정보를 이용해서 요청자가 누가 어떤 이미지를 제안했느지 확인 할 수 있다.
	
		gPAProject.select_item  = JSON.stringify(gPAProject.select_obj_list);
		

		var kkk = dockey.replace(/\./gi,"-s-").replace("@","-spl-");
		var html = "";
		html += "<li id='select_item_"+kkk+"'>";
		html += "	<a href='#'>";
		html += "		<div><span><img src='"+select_img_src+"' style='width:100%; '></span></div>";
		html += "		<dl style='text-align:center'>";
		html += "			<dd>"+artist+"</dd>";
		html += "			<dd>"+title+"</dd>";
		html += "			<dd>"+size+"<span onclick=\"gPAProject.select_item_delete('select_item_"+kkk+"'); return false;\" style='color:red'> ["+g360.g_lang.Delete+"]</span></dd>";
		html += "			<dd>"+g360.comma(g360.setWon(price))+"</dd>";
		html += "			<dd></dd>";   //마지막에 스타일을 다른 형태로 지정해 놓아서 공백 라인을 추가한다.
		html += "		</dl>";
		html += "	</a>";
		html += "</li>";
		
//		var imgHtml = "<img src='"+select_img_src+"' style='width:100%; height:100%'>";
//		$("#seleced_img_" + opener_select_id).remove();
//		$("#vr_img_" + opener_select_id).append(imgHtml);
		
		$("#art_img_suggest_list").append(html);
		
		
		gPAProject.isPopup = "F";
		g360.body_scroll_show();
		$("#art_gallery_popup_preview").fadeOut();
		
	},
	
	"suggest_submit" : function(){
		
		var price = $("#input_price_art").val();
		var date = "";
		var art_product_term = "";
		if (gPAProject.cur_request_subform == "1"){
			date = $("#send_date").val();
			art_product_term = "";
		}else{
			date = "";
			art_product_term = $("#art_product_term").val();
		}
		
		var suggest_memo= $("#suggest_memo").val();
		var suggest_image_list = gPAProject.select_item;
	
		
		if (date == g360.g_lang.Choose_delivery_date){
			g360.gAlert("Error", g360.g_lang.Artproject28 , "red", "left");
			return false;
		}
		
		if (gPAProject.cur_request_subform == "1"){
			if (gPAProject.select_obj_list.length == 0){
				g360.gAlert("Error", g360.g_lang.Artproject29 , "red", "left");
				return false;
			}
//			if (suggest_image_list == ""){
//				alert("추천할 작품을 선택하셔야 합니다.");
//				return false;
//			}
		}

		

		
		var data = "";
		
		if (gPAProject.open_type == "edit"){
			data = JSON.stringify({
				dockey : gPAProject.edit_dockey,
				price : (gPAProject.cur_request_subform == "1") ? "" : price,
				date : date,
				art_product_term : art_product_term,
				suggest_memo : suggest_memo,
				suggest_image_list : suggest_image_list,
				mode : gPAProject.open_type,
				edit_dockey : gPAProject.edit_dockey,
				owner_key : gPAProject.owner_key
			});
		}else{
			data = JSON.stringify({
				dockey : gPAProject.cur_open_project_id,
				price : (gPAProject.cur_request_subform == "1") ? "" : price,
				date : date,
				art_product_term : art_product_term,
				suggest_memo : suggest_memo,
				suggest_image_list : suggest_image_list,
				mode : gPAProject.open_type
			});
		}
		
		var url = g360.root_path + "/save_suggest_info.mon";
		$.ajax({
			type : "POST",
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				gPAProject.suggest_cancel();
				gPAProject.select_obj_list = new Array();
				return false;
			},
			error : function(data){
				g360.error_alert();
			}
		})
		
		
		
	},
	
	
	"suggest_cancel" : function(){
				
		gPAProject.load_project_list(1);

	},
	
	"select_item_delete" : function(id){
		$("#" + id).remove();
		
		var ch = id.replace("select_item_","").replace("_jpg",".jpg");
		ch = ch.replace(/-s-/gi,".").replace("-spl-","@");
		var arr = gPAProject.select_obj_list;
		gPAProject.select_obj_list = new Array();
		
		for (var i = 0 ; i < arr.length; i++){
			var key = (typeof(arr[i].myspace_filename) == "undefined" ? arr[i].dockey : arr[i].myspace_filename);
			if (key == ch){
			}else{
				gPAProject.select_obj_list.push(arr[i]);
			}
		}
		
		gPAProject.select_item  = JSON.stringify(gPAProject.select_obj_list);
		
		return false;
	},
		

	"empty_class_on" : function(){
		$(".sub_common_content.art_project aside ul li").each(function(evnet){
			$(this).removeClass("on");
		});
		$("#proj_memnu1").hide();
		$("#proj_memnu2").hide();
		$("#proj_memnu3").hide();

		$("#proj_menu1_exp").addClass("on");
		$("#proj_menu2_exp").addClass("on");
		$("#proj_menu3_exp").addClass("on");
		
	},
	
	"favorite" : function(id, obj){
		var status = $(obj).get(0).className;
		var mode = "add";
		if (status.indexOf("on") > -1){
			mode = "delete";
		}
		
		var url = g360.root_path + "/request_project_favorite.mon?id="+id+"&mode=" + mode;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
			
				if (data.result == "OK"){
					if (mode == "add"){
						$(obj).addClass("on");
					}else{
						$(obj).removeClass("on");
					}
					
				//	alert("즐겨찾기에  정상적으로 등록되었습니다.");
				}else{
					g360.error_alert();
				}
			},
			error : function(e){
				g360.error_alert();
			}
		})	
	},
	
	"weekly_report_submit" : function(dockey, id){
		gPAProject.weekly_report_dockey = dockey;
		gPAProject.cur_save_bun = id;
	
		
		var myDropzone = Dropzone.forElement("#artProjMydropzone1_" + id);
		
		
		if (myDropzone.files.length > 0){
			myDropzone.processQueue();
		}else{			
			g360.gAlert("Info", g360.g_lang.Artproject30 , "blue", "top");
			return false;
		}		
	},
	
	"click_ing" : function(){
		gPAProject.opt = "ing";
		gPAProject.empty_class_on();
		gPAProject.load_project_list(1);
		$("#project_ing").addClass("on");
	},
	
	"report_submit" : function(imgfile){
		
		
		var bun = gPAProject.cur_save_bun;
		
		var rate = $("#project_rate_" + bun ).val();
		var report = $("#project_report_" + bun).val();
		var uploadFilename = imgfile;
		var dockey = gPAProject.weekly_report_dockey;
		var report_date = $("#curDate").text();
		
		
		var data = JSON.stringify({
			rate : rate,
			report_memo : report,
			uploadfilename : uploadFilename,
			dockey : dockey,
			report_date : report_date,
			mod : "add"
		})
		
		var url = g360.root_path + "/weekly_report_submit.mon";
		$.ajax({
			type : "POST",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			data : data,
			url : url,
			success : function(data){
				if (data.result == "OK"){
					gPAProject.click_ing();
				}else{
					g360.error_alert();
				}
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	
	},
	
	"report_delete" : function(key, dockey, email, filename){
		var url = g360.root_path + "/weekly_report_delete.mon?id="+key+"&dockey="+dockey + "&email="+email + "&filename="+filename;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				if (data.result == "OK"){
					gPAProject.click_ing();
				}else{
					g360.error_alert();
				}
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	
	

	/////////////////////////// 리스트 페이징 시작 //////////////////////////////////////////////////////////////
	"search_paging" : function(page){
		var alldocuments = gPAProject.totalcount;
		if (alldocuments % gPAProject.perpage > 0 & alldocuments % gPAProject.perpage < gPAProject.perpage/2 ){
			allPage = Number(Math.round(alldocuments/gPAProject.perpage)) + 1;
		}else{
			allPage = Number(Math.round(alldocuments/gPAProject.perpage));
		}	

		gPAProject.search_navigator(page);
	},
	
	"search_navigator" : function(page){
		var nav_cpage = page;

		var alldocuments = gPAProject.totalcount;
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
				nav[0] = '<li class="p_prev"><a href="#" class="xico" onclick="javascript:gPAProject.gotoPage(' + ((((cFrame-1)*10)-1)*gPAProject.perpage+1) + ',' + ((cFrame-1)*10) + ');">이전</a></li>';
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
						nav[pIndex] = "<li><a href=# onclick='gPAProject.gotoPage("+ (((i-1) * gPAProject.perpage) + 1 ) + ", "+ i + ", this)'>" + i + "</a></li>";
						
					}else{
						if (i%10 == '1' ){
							nav[pIndex] = "<li><a href=# onclick='gPAProject.gotoPage("+ (((i-1) * gPAProject.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";	
						}else{
							nav[pIndex] = "<li><a href=# onclick='gPAProject.gotoPage("+ (((i-1) * gPAProject.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";
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
				nav[nav.length] = '<li class="p_next"><a href="#" class="xico" onclick="javascript:gPAProject.gotoPage(' + ((cFrame*gPAProject.perpage*10) + 1) + ',' + ((cFrame*10)+1) + ');">다음</a></li>';
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
				navHTML = navHTML + '<li class="p_last"><a href="#" class="xico" onclick="javascript:gPAProject.gotoPage(' + ((allPage - 1)*gPAProject.perpage + 1) +','+ allPage +')">마지막</a></li>';
	        }else{
				navHTML = navHTML;
	        }
	    
			$("#NAVIGATE").html('<div class="paging"><ul>' + navHTML + '</ul></div>');
		}
	},
	
	"gotoPage" : function(Index, PageNum, obj){
		var nav_cpage = PageNum;
		oldpage = nav_cpage;
		
		gPAProject.load_project_list(PageNum);
	},
	//////////////////////////////////////// 리스트 페이징 종료    /////////////////////////////////////////////
	
	//공간에 작품걸어 제안하기
	init_space:function(){
		this.layer_frame = $('#project_space_layer');
		this.bg_wrap = $('#bg_wrapper', this.layer_frame);
		this.bg_wrap.append('<canvas id="project_bg_canvas"></canvas>');
		this.canvas = new fabric.Canvas('project_bg_canvas');
		this.canvas.hoverCursor = 'default';
		this.canvas.selection = false;
		
		this.initInfiniteScroll();
		this.spaceEventBind();
	},
	initInfiniteScroll:function(){

		var _self = this;
		
		// 즐겨찾기 InfiniteScroll 적용
		this.favo_controller = new ScrollMagic.Controller({container:'#project_deco_tab_favorite'});
		this.favo_scene = new ScrollMagic.Scene({triggerElement:'#project_favo_loader', triggerHook:'onEnter', offset:-100}).addTo(_self.favo_controller);
		this.favo_scene.on('enter', function(e) {
			var $grid = $('#my_space_favorite', _self.layer_frame);
			var $loader = $('#project_favo_loader');
			if (_self.layer_frame.get(0).style.display == 'none' ||
					$('#project_deco_tab_favorite', _self.layer_frame).get(0).style.display == 'none') return;
			if (_self.page_info.favorite.complete) return;
			if (!$loader.hasClass('first') && !$loader.hasClass('active')) {
				console.log('loading scroll');
				$loader.addClass('active');
				_self.getFavoriteList().then(function(data){
					if (data.length > 0) {
						$.each(data, function(){_self._appendPictureEl($grid, this);});
						
						// 이미지 로딩이 완료되면 화면에 표시
						$grid.imagesLoaded(function(){
							$loader.removeClass('active');
							$grid.masonry('layout');
						});
					} else {
						$loader.removeClass('active');
					}
				});
			}
		});
		
		
		// 작품검색 InfiniteScroll 적용
		this.search_controller = new ScrollMagic.Controller({container:'#project_deco_tab_search'});
		this.search_scene = new ScrollMagic.Scene({triggerElement:'#project_search_loader', triggerHook:'onEnter', offset:-100}).addTo(_self.search_controller);
		this.search_scene.on('enter', function(e) {
			var $grid = $('#search_list', _self.layer_frame);
			var $loader = $('#project_search_loader');
			if (_self.layer_frame.get(0).style.display == 'none' ||
					$('#project_deco_tab_search').get(0).style.display == 'none') return;
			if (_self.page_info.search.complete) return;
			if (!$loader.hasClass('first') && !$loader.hasClass('active')) {
				console.log('search loading scroll');
				$loader.addClass('active');
				_self.getSearchList().then(function(data){
					if (data.length > 1) {
						$.each(data, function(){_self._appendPictureEl($grid, this);});
						
						// 이미지 로딩이 완료되면 화면에 표시
						$grid.imagesLoaded(function(){
							$loader.removeClass('active');
							$grid.masonry('layout');
						});
					} else {
						$loader.removeClass('active');
					}
				});
			}
		});
		
	},
	//즐겨찾기 이미지 가져오기
	getFavoriteList : function(){
		var _self = this;
		var url = g360.root_path + "/all_image_list_owner_ing.mon?start="+_self.page_info.favorite.start+"&perpage="+_self.page_info.favorite.perpage;
		return $.ajax({
			dataType : "json",
			url : url,
			success : function(data){
				if (data.length > 0) _self.page_info.favorite.start += data.length;
				
				// 마지막 페이지
				if (data.length < _self.page_info.favorite.perpage) {
					_self.page_info.favorite.complete = true;
				}
			},
			error : function(e){
				console.log(g360.g_lang.Artproject31);
			}
		})
	},
	//작품 검색 하기
	getSearchList : function(){
		var _self = this;
		var query = $.extend({}, _self.page_info.search.query, true);
		query.start = _self.page_info.search.start;
		query.perpage = _self.page_info.search.perpage;
		
		var data = JSON.stringify(query);
		/*
		var data = JSON.stringify({
			thema : "풍경-spl-인물",      //풍경 또는 인물
			type : "2",                //가로
			hosu : "10-spl-70",        //10호 에서 70호까지
			price : "100-spl-500",     //100만원 에서 500만원 까지
 			color : "green-spl-blue",  //green 또는 blue 색상
			start : _self.page_info.search.start,
			perpage : _self.page_info.search.perpage
		});
		*/
		
		var page = $('#search_key_result .search-filter').length ? 'load_image_select_option_owner.mon' : 'all_image_list_owner_ing.mon'; 
		var url = g360.root_path + "/" + page + "?start=" + _self.page_info.search.start + "&perpage="+_self.page_info.search.perpage;		
		return $.ajax({
			type : "POST",
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				// 배열첫번째로 totalcount값이 내려옴
				if (data.length > 1) _self.page_info.search.start += (data.length-1);
				
				// 카운트 셋팅
				$('#deco_loading_cnt').html(_self.page_info.search.start);
				$('#deco_total_cnt').html(data[0].totalcount);
				
				
				
				
				// 마지막 페이지 체크
				if ((data.length-1) < _self.page_info.search.perpage) {
					_self.page_info.search.complete = true;
				}
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	drawSearch:function(){
		var _self = this;
		var $grid = $('#search_list', _self.layer_frame);
		var $loader = $('#project_search_loader');
		
		_self.page_info.search.start = 0;
		_self.page_info.search.perpage = 20;
		_self.page_info.search.complete = false;
		$.each(_self.page_info.search.query, function(_key, _val) {
			_self.page_info.search.query[_key] = '';
		});
		
		$loader.addClass('active');
		$grid.masonry('remove', $grid.find('.my-favo')).masonry('layout');
		
		// Query 생성
		var $filters = $('#search_key_result .search-filter');
		$filters.each(function() {
			var _key = $(this).data('searchKey');
			var _type = $(this).data('searchType');
			if (_self.page_info.search.query[_type] == '') {
				_self.page_info.search.query[_type] = _key;
			} else {
				_self.page_info.search.query[_type] += '-spl-' + _key;
			}
		});
		
		_self.getSearchList().then(function(data){
			if (data.length > 1) {
				$.each(data, function(){_self._appendPictureEl($grid, this);});
				
				// 이미지 로딩이 완료되면 화면에 표시
				$grid.imagesLoaded(function(){
					$loader.removeClass('active');
					$grid.masonry('layout');
				});
			} else {
				$loader.removeClass('active');
			}
		});
	},
	_appendPictureEl:function($wrapper, data_info){
	
		if (data_info.totalcount != undefined) return;
		//var _url = g360.preview_img_path(data_info.email, data_info.art_img_filename);
		var _url = g360.preview_img_path2(data_info.email, data_info.art_img_filename);
		var _thumb = "";
	//	if (g360.UserInfo.gubun == "curator"){
	//		_thumb = g360.thumbnail_img_path(data_info.email.split("-spl-")[0], data_info.art_img_filename);
	//	}else{
			_thumb = g360.thumbnail_img_path(data_info.email, data_info.art_img_filename);
	//	}
		
		
		var $div = $('<div class="grid-item my-favo col-lg-3 col-md-4 col-sm-4 col-6"></div>');
		var $fig = $('<figure></figure>');
		var $img = $('<img draggable="false">')
				.data('dockey', data_info.art_img_filename)
				.data('title', data_info.art_title)
				.data('price', data_info.art_price)
				.data('artistname', data_info.art_artist)
				.data('size', data_info.art_height + ' x ' + data_info.art_width + 'cm ' + (data_info.art_hosu != null ? '(' + data_info.art_hosu + '호)' : "" ) + '</p>')
				
				.attr('src', _thumb)
				.data('url', _url)
				.data('width', parseInt(data_info.art_width) * 10)
				.data('height', parseInt(data_info.art_height) * 10)
				.data('ho', data_info.art_hosu)
				.data('artist', data_info.email);
		
		var $figcap = $('<figcaption></figcaption>')
					.append('<h2>' + data_info.art_title + '</h2>')
					.append('<p>' + data_info.art_artist + '</p>')
					.append('<p class="text-muted">' + data_info.art_height + ' x ' + data_info.art_width + 'cm ' + (data_info.art_hosu != null ? '(' + data_info.art_hosu + '호)' : "" ) + '</p>');
		
		$fig.append($img).append($figcap).appendTo($div);
		
		$wrapper.append($div).masonry('appended', $div);
	},
	// 즐겨찾기 초기 로딩
	loadFavorite: function() {
		var _self = this;
		var _html = '';
		var $grid = $('#my_space_favorite', _self.layer_frame);
		var $loader = $('#project_favo_loader');
		if (g360.UserInfo == null) return;
		
		$('#btn_deco_favorite', _self.layer_frame).click();
		$('#project_deco_tab_favorite').scrollTop(0);
		$loader.addClass('first active');
		$grid.css('opacity', 0);
		
		// 즐겨찾기 데이터 가져오기 초기화
		_self.page_info.favorite.start = 0;
		_self.page_info.favorite.perpage = 20;
		_self.page_info.favorite.complete = false;
		$grid.masonry('remove', $grid.find('.my-favo')).masonry('layout');
		
		// 즐겨찾기 데이터 가져오기
		_self.getFavoriteList().then(function(data){
			if (data.length > 0) {
				$.each(data, function(){_self._appendPictureEl($grid, this);});
				
				// 이미지 로딩이 완료되면 화면에 표시
				$grid.imagesLoaded(function(){
					_self.favo_scene.update();
					$loader.removeClass('first active');
					$grid.masonry();
					$grid.css('opacity', 1);
					//_self.page_info.favorite.perpage = 10;
				});
			} else {
				$loader.removeClass('first active');
			}
		}, function() {
			$loader.hide();
		});
	},
	// 검색 초기 로딩
	loadSearch: function() {
		var _self = this;
		var _html = '';
		var $grid = $('#search_list', _self.layer_frame);
		var $loader = $('#project_search_loader');
		if (_self.load_search_complete) return;
		
		$loader.addClass('first active');
		$grid.css('opacity', 0);
		
		// 즐겨찾기 데이터 가져오기 초기화
		_self.page_info.search.start = 0;
		_self.page_info.search.perpage = 20;
		_self.page_info.search.complete = false;
		
		if ( $.data($grid.get(0), 'masonry') ) {
			$grid.masonry('remove', $grid.find('.my-favo')).masonry('layout');
		} else {
			$grid.masonry();
		}
		
		// 즐겨찾기 데이터 가져오기
		_self.getSearchList().then(function(data){
			if (data.length > 1) {
				$.each(data, function(){_self._appendPictureEl($grid, this);});
			
				// 이미지 로딩이 완료되면 화면에 표시
				$grid.imagesLoaded(function(){
					_self.search_scene.update();
					$loader.removeClass('first active');
					$grid.masonry();
					$grid.css('opacity', 1);
					_self.page_info.search.perpage = 10;
					_self.load_search_complete = true;
				});
			} else {
				$loader.removeClass('first active');
				$grid.css('opacity', 1);
			}
		}, function() {
			$loader.hide();
		});
	},
	spaceEventBind:function(){
		var _self = this;
		
		this.layer_frame.find('.btn_deco_close').on('click', function() {
			_self.hideSpace();
		});
	

		// 작품선택(모바일용)
		$('#btn_select_picture', _self.layer_frame).on('click', function(){
			_self.layer_frame.find('.deco_right').addClass('active');
		});
		
		$('#btn_deco_back', _self.layer_frame).on('click', function(){
			_self.layer_frame.find('.deco_right').removeClass('active');
		});
		
		
		/**
		 * 오른쪽 탬
		 */
		// 즐겨찾기 탭 버튼
		$('#btn_deco_favorite', _self.layer_frame).on('click', function(){
			if ($(this).hasClass('on')) return;
			$(this).siblings('.on').removeClass('on');
			$(this).addClass('on');
			$('#project_deco_tab_search', _self.layer_frame).hide();
			$('#project_deco_tab_favorite', _self.layer_frame).show().attr('tabindex', -1).focus();
			$('#my_space_favorite', _self.layer_frame).masonry('layout');
			$('#deco_search_cnt', _self.layer_frame).hide();
		});
		
		// 작품검색 탭 버튼
		$('#btn_deco_search', _self.layer_frame).on('click', function(){
			if ($(this).hasClass('on')) return;
			$(this).siblings('.on').removeClass('on');
			$(this).addClass('on');
			$('#project_deco_tab_favorite', _self.layer_frame).hide();
			$('#project_deco_tab_search', _self.layer_frame).show().attr('tabindex', -1).focus();
			if ( $.data($('#search_list', _self.layer_frame).get(0), 'masonry') ){
				$('#search_list', _self.layer_frame).masonry('layout');
			}
			$('#deco_search_cnt', _self.layer_frame).show();
			_self.loadSearch();
		});
		
		// 검색필터 버튼
		$('#project_deco_tab_search button', _self.layer_frame).on('click', function() {
			var $search = $('#search_key_result', _self.layer_frame); 
			var search_key = $(this).data('searchKey');
			var search_text = $(this).data('searchText');
			var search_type = $(this).data('searchType');
			var $el = $search.find('.search-filter[data-search-key="'+search_key+'"]');
			if ($(this).hasClass('active')) {
				$el.remove();
			} else {
				$('<div class="search-filter"' +
						' data-search-key="' + search_key + '"' +
						' data-search-type="' + search_type + '"' + '></div>')
					.append('<span>' + search_text + '<img src="../img/btn-aw-filter-delete.svg" class="btn_aw_filter_delete"></span>')
					.appendTo($search);
			}
			_self.drawSearch();
		});
		
		// 전체해제
		$('#btn_searchfilter_remove', _self.layer_frame).on('click', function() {
			$('#project_deco_tab_search button', _self.layer_frame).removeClass('active');
			$('#search_key_result', _self.layer_frame).empty();
			_self.drawSearch();
			return false;
		});
		
		// 필터 토큰
		$('#search_key_result', _self.layer_frame).on('click', function(e){
			var $el;
			if ( $(e.target).hasClass('search-filter') ) {
				$el = $(e.target);
			} else if ($(e.target).closest('.search-filter').length > 0) {
				$el = $(e.target).closest('.search-filter');
			} else {
				return;
			}
			
			// 검색필터 해제
			var _key = $el.data('searchKey');
			var $btn_filter = $('#project_deco_tab_search button[data-search-key="' + _key + '"]', _self.layer_frame);
			$btn_filter.removeClass('active');
			$el.remove();
			_self.drawSearch();
		});
		
		
		
		
		
		// 윈도우 사이즈 변경시 처리
		$(window).off('resize.project.space').on('resize.project.space', function(){
			clearTimeout(_self.resize_id);
			_self.resize_id = setTimeout(function(){_self._refreshSpace();}, 500); 			
		});
		
		
		$('#my_space_favorite', _self.layer_frame).on('click', 'img', function(){
			_self._selectPicture(this);
		});
		
		$('#search_list', _self.layer_frame).on('click', 'img', function(e){
			_self._selectPicture(this);
		});
		
		
		// 제안하기
		$('#btn_project_suggest').on('click', function(){
			if (!_self.picture) {
				g360.gAlert("Info", g360.g_lang.Select_Artwork , "blue", "top");
				return;
			}
			var blob = gPAProject.dataURItoBlob(_self.canvas.toDataURL({format:'jpeg'}));
			var fd = new FormData();
			fd.append('file', blob);
			

			$.ajax({
				type: 'POST',
				url: g360.root_path + '/ArtProjectSpaceUpload.gu',
				data: fd,
			//	dataType : "json",
			//	contentType : "application/json; charset=utf-8",
				processData: false,
				contentType : false,		  
				success: function(data){
					//이미지 정보

					
					var res = JSON.parse(data);

					var img_info = {
						dockey 	: _self.picture['imageKey'],
						title 	: _self.picture['imageTitle'],
						artist 	: _self.picture['imageArtist'],
						size 	: _self.picture['imageSize'].replace("<\/p>",""),
						price 	: _self.picture['imagePrice'],
						myspace_url : res.url,
						myspace_filename : res.filename
					};
					
					
					//하단에 내공간 작품 제안할 때 이미 선택한 작품인지 
				
					var isSelect = true;
					$("#art_img_suggest_list li").each(function(index){
						var id = $(this).get(0).id;
						var sel = $("#" + id).attr("data");
						if (sel == img_info.dockey){
							//alert("이미 선택한 작품입니다.");
							//g360.alert("")
							g360.gAlert("Info", g360.g_lang.Artproject32 , "blue", "top");
							isSelect = false;
						}
					});
					
					if (isSelect){
						gPAProject.add_select_one_with_myspace(img_info);
						gPAProject.hideSpace();
					}

				}
			});
			
		});
	},
	
	"add_select_one_with_myspace" : function(obj){
		
		gPAProject.select_obj_list.push(obj);

		gPAProject.select_item  = JSON.stringify(gPAProject.select_obj_list);
		
		
		var select_id = obj.myspace_filename.replace(".","_");
		var select_img_src = obj.myspace_url;
		var artist = obj.artist;
		var title = obj.title;
		var size = obj.size.replace("<\/p>","");
		var price = obj.price;
		
		
	
		var html = "";
		var kkk =  obj.myspace_filename.replace(/\./gi,"-s-").replace("@","-spl-");
		html += "<li id='select_item_"+kkk+"' data='"+obj.dockey+"'>";
		html += "	<a href='#'>";
		html += "		<div><span><img src='"+select_img_src+"' style='width:100%;'></span></div>";
		html += "		<dl style='text-align:center'>";
		html += "			<dd>"+artist+"</dd>";
		html += "			<dd>"+title+"</dd>";
		html += "			<dd>"+size+"<span onclick=\"gPAProject.select_item_delete('select_item_"+kkk+"'); return false;\" style='color:red'> ["+g360.g_lang.Delete+"]</span></dd>";
		html += "			<dd>"+g360.comma(g360.setWon(price))+"</dd>";
		html += "			<dd></dd>";
		html += "		</dl>";
		html += "	</a>";
		html += "</li>";
				
		$("#art_img_suggest_list").append(html);
				
	
	//	g360.body_scroll_show();
		
		
	},
	
	
	
	
	showSpace: function() {
		var _self = this;
		var mz = g360.maxZindex();
		$('#deco_block').show();
		this.layer_frame.css('z-index', mz + 1);
		this.layer_frame.show();
		this.layer_frame.find('.deco_right').removeClass('active');
		g360.body_scroll_hide();
		
		$('#header').css('width', 'calc(100% - 17px)');
		$('#my_space_favorite', this.layer_frame).masonry();
		
		this.cur_project_data = this.project[this.cur_open_project_id];
		this.loadSpaceImage();
		this._removePicture();
		this.canvas.renderAll();
		this.loadFavorite();
		
		
	},
	hideSpace: function() {
		$('#deco_block').hide();
		this.layer_frame.hide();
		g360.showBodyScroll();
		$('#header').css('width', '');
	},
	loadSpaceImage:function(){
		$('#picture_size', this.layer_frame).text(this.cur_project_data.request_selectimg_size + 'cm');
		this._imageLoad(this.cur_project_data.request_selectimg_path);
	},
	// 배경 이미지 캔버스에 로딩
	_imageLoad:function(url, callback){
		var _self = this;
		var img = new Image;
		
		img.src = url;
		img.onload = function() {
			_self.bg_img = new fabric.Image(img);
			_self.bg_img.selectable = false;
			
			var _bg_w = Math.ceil(_self.bg_wrap.width());
			_self._bg_scale = _bg_w / img.width;
			var _bg_h = Math.ceil(img.height * _self._bg_scale);
			
			// wrapper 사이즈 설정
			//_self.bg_wrap.width(_bg_w);
			//_self.bg_wrap.height(_bg_h);
			var _calc_h = $(window).height() - (_self.bg_wrap.position().top + 20 + 20 + 85);
			_self.bg_wrap.height(_calc_h);
			_self.bg_img.scale(_self._bg_scale);
					
			
			//_self.canvas.clear();
			//_self.group = null;
			_self.canvas.setDimensions({
	            width: _bg_w,
	            height: _bg_h
	        });
			
			_self.canvas.setBackgroundImage(_self.bg_img);
			
			if (callback) callback();
		}		
	},
	_refreshSpace:function(){
		var _self = this;
		if (!this.layer_frame.is(':visible')) return;
		var before_width = _self.canvas.width;
		var elBg = $('.space_tmpl.on', '#my_space_template');
		var url = this.cur_project_data.request_selectimg_path;
		
		_self._imageLoad(url, function() {
			var _change_scale = (before_width - _self.canvas.width) / before_width;

			
			// 그림이 표시되어 있는 경우
			if (_self.picture) {
				// 불러올 이미지의 scale값 구하기
				var _1mm = _self._getPixelPerMm();
				var scale_x = _self.picture_info.width * _1mm / _self.picture.width;
				var scale_y = _self.picture_info.height * _1mm / _self.picture.height;
				var _top = _self.picture.top - (_self.picture.top * _change_scale);
				var _left = _self.picture.left - (_self.picture.left * _change_scale);
				
				_self.picture.left = (_left < 0 ? 0 : _left); 
				_self.picture.top = (_top < 0 ? 0 : _top); 
				
				_self.picture.animate('scaleX', scale_x, {
					duration: 300,
					onChange: function() {
						_self.canvas.renderAll();
					}
				});
				_self.picture.animate('scaleY', scale_y, {
					duration: 300,
					onChange: function() {
						_self.canvas.renderAll();
					}
				});
			}
		});
	},
	// 작품 선택
	_selectPicture:function(el){
		var _self = this;
		
		var _info = {
			top:'',
			left:'',
			width:'',
			height:''
		};
			
			
		
		_info.width = $(el).data('width');
		_info.height = $(el).data('height');
		
		_self.picture_info = {
			width: _info.width,
			height: _info.height
		};
		
		
		var img = new Image;
		img.onload = function() {
			var _top;
			var _left;
			
			
			
			// 불러올 이미지의 scale값 구하기
			var _1mm = _self._getPixelPerMm();
			var scale_x = _info.width * _1mm / img.width;
			var scale_y = _info.height * _1mm / img.height;
			
			if (_info.top) {
				_top = _info.top;
				_left = _info.left;
			} else {
				if (_self.picture != null) {
					_top = _self.picture.top + ((_self.picture.getScaledHeight() - img.height * scale_y) / 2);
					_left = _self.picture.left + ((_self.picture.getScaledWidth() - img.width * scale_x) / 2);
					_self.canvas.remove(_self.picture);
				} else {
					_top = (_self.canvas.height - img.height * scale_y) / 3; // 세로는 3분의 1지점
					_left = (_self.canvas.width - img.width * scale_x) / 2; // 가로는 중앙
				}
			}

			var opt = {
				width		: img.width,
				height		: img.height,
				scaleX		: scale_x,
				scaleY		: scale_y,
				top			: (_top < 0 ? 0 : _top),
				left		: (_left < 0 ? 0 : _left),
				shadow		: {
					color: 'rgba(1,1,1,0.7)',
					blur: 3 / scale_x,
					offsetX:2 / scale_x,
					offsetY:2 / scale_x
				},
				hasControls	: false,
				hasBorders	: false,
				hoverCursor	: 'move',
				
				imageKey 	: $(el).data('dockey'),
				imageTitle 	: $(el).data('title'),
				imageArtist	: $(el).data('artistname'),
				imageSize 	: $(el).data('size').replace("</p>",""),
				imagePrice 	: $(el).data('price')
			};
			
			
			_self.picture = new fabric.Image(img, opt);
			_self.canvas.add(_self.picture);
			_self.canvas.renderAll();
			_self.layer_frame.find('.deco_right').removeClass('active');
		}
		img.crossOrigin = 'anonymous';
		img.src = $(el).data('url');
	},
	_removePicture: function() {
		var _self = this;
		if (_self.picture) {
			_self.canvas.remove(_self.picture);
			_self.picture = null;
			_self.picture_info = null;
		}
	},
	_getPixelPerMm: function(){
		var _self = this;
		var size_mm = _self.cur_project_data.request_selectimg_size * 10;
		return _self.canvas.width / size_mm;
	},
	dataURItoBlob: function(dataURI) {
		
	    var byteString;
	    if (dataURI.split(',')[0].indexOf('base64') >= 0)
	        byteString = atob(dataURI.split(',')[1]);
	    else
	        byteString = unescape(dataURI.split(',')[1]);

	    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

	    var ia = new Uint8Array(byteString.length);
	    for (var i = 0; i < byteString.length; i++) {
	        ia[i] = byteString.charCodeAt(i);
	    }
	    return new Blob([ia], {type:mimeString});
	}
}

