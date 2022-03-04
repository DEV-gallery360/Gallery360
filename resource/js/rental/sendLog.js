
function gSendLog(){	
	gPS = this;
	
	gPS.totalcount = 0;
	gPS.perpage = 10;
	gPS.start = 0;
	gPS.cPage = 1;
	
	gPS.ty = "all";
	
}

gSendLog.prototype = {		

	"init" : function(){
		var _self = this;	
		
		gPS.load_logdata(1);
		
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
		
		$("#load_error").on("click", function(){
			//alert("에러 데이터만 가져오기");			
			gPS.ty = "error";
			gPS.load_logdata(1);
		});
		
		$("#load_all").on("click", function(){
			gPS.ty = "all";
			gPS.load_logdata(1);
		});
		
		
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
		
		
		gPS.cPage = cPage;
		var start = (parseInt(gPS.perpage) * (parseInt(gPS.cPage))) - (parseInt(gPS.perpage) - 1);
		start = parseInt(start) -1 ;
		
			
		var url = g360.root_path + "/load_sendlog.mon?start="+start+"&perpage="+gPS.perpage + "&ty=" + gPS.ty;

		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json, charset=utf-8",
			url : url,
			success : function(data){
								
				gPS.list_draw_log(data);
				gPS.search_paging(gPS.cPage);
				
			
			},
			error : function(e){
				g360.gAlert("Info","데이터 로딩시 오류가 발생하였습니다.", "blue", "top");
			}
		})
	},
		
	
	"list_draw_log" : function(data){
		//debugger;
		/*
		email: "lee@gmail.com"
			mobile: "010-0918-1983"
			name: "이진주4"
			ow: "aa1231@daum.net"
			process: "F"
			sk: "F"
			sm: "F"
			sortdate: "20200722142529"
			state: "F"
			su: "LdAkYeGn"
			ty: "3"
		*/
		
		var list = data;
		var totalcount = list[0].totalcount;
		gPS.totalcount = totalcount;
		
//	$("#tocnt").html("(총 : " + g360.comma(totalcount) + "명)");
	
		
		var html = "";			
		
		html += "<table >";
		html += "<thead >";
		html += "	<tr>";
		html += "		<td style='height:40px; font-size:14px; text-align:center'>대상자</td>";
		html += "		<td style='width:150px; font-size:14px; text-align:center'>전화번호</td>";
		html += "		<td style='width:200px; font-size:14px; text-align:center'>이메일</td>";
		html += "		<td style='width:120px; font-size:14px; text-align:center'>카톡발송</td>";
		html += "		<td style='width:120px; font-size:14px; text-align:center'>이메일발송</td>";
		html += "		<td style='width:170px; font-size:14px; text-align:center'>요청시간</td>";

		html += "	<tr>";
		html += "</thead>";
		
		html += "<tbody style='font-size:14px'>";
		for (var i = 1;  i < data.length; i++){
			var info = data[i];			
			
			var kakaosend = "";
			var mailsend = "";
			
			
			if (info.ty == "3" || info.ty == "1"){
				if (info.process == "F"){
					kakaosend = "발송대기중";
				}else{
					if (info.state == 3){
						kakaosend = "발송완료";
					}else if (info.state == 4){
						kakaosend = "발송오류";
					}else{
						kakaosend = "발송대기중";
					}
				}
			}
			
			if (info.ty == "3" || info.ty == "2"){
				if (info.process == "F"){
					mailsend = "발송대기중";
				}else{
					mailsend = "발송완료";
				}
			}
			
			
			var dx = info.sortdate;
			var dd = dx.substring(0,4)+ "-" + dx.substring(4,6) + "-" + dx.substring(6,8) + " " + dx.substring(8,10) + ":" + dx.substring(10,12) + ":" + dx.substring(12,14)
			
			
			
			html += "<tr>";
			html += "<td style='height:40px; padding-left:5px; text-align:center'>"+info.name+"</td>";
			html += "<td style='padding-left:5px; text-align:center'>"+info.mobile+"</td>";
			html += "<td style='padding-left:5px; text-align:center'>"+info.email+"</td>";
			
			html += "<td style='text-align:center'>"+kakaosend+"</td>";			
			html += "<td style='text-align:center'>"+mailsend+"</td>";
			html += "<td style='text-align:center'>"+dd+"</td>";
			html += "</tr>";
			
			
		}
		html += "</tbody>";
		html += "</table>";
		
			
		
		$("#logdis").html(html);
		
		
	},
	

	/////////////////////////// 리스트 페이징 시작 //////////////////////////////////////////////////////////////
	"search_paging" : function(page){
		
		var alldocuments = gPS.totalcount;
		if (alldocuments % gPS.perpage > 0 & alldocuments % gPS.perpage < gPS.perpage/2 ){
			allPage = Number(Math.round(alldocuments/gPS.perpage)) + 1;
		}else{
			allPage = Number(Math.round(alldocuments/gPS.perpage));
		}	

		gPS.search_navigator(page);
	},
	
	"search_navigator" : function(page){
		
		
		var nav_cpage = page;

		var alldocuments = gPS.totalcount;
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
				nav[0] = '<li class="p_prev"><a href="#" class="xico" onclick="javascript:gPS.gotoPage(' + ((((cFrame-1)*10)-1)*gPS.perpage+1) + ',' + ((cFrame-1)*10) + ');">이전</a></li>';
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
						nav[pIndex] = "<li><a href=# onclick='gPS.gotoPage("+ (((i-1) * gPS.perpage) + 1 ) + ", "+ i + ", this)'>" + i + "</a></li>";
						
					}else{
						if (i%10 == '1' ){
							nav[pIndex] = "<li><a href=# onclick='gPS.gotoPage("+ (((i-1) * gPS.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";	
						}else{
							nav[pIndex] = "<li><a href=# onclick='gPS.gotoPage("+ (((i-1) * gPS.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";
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
				nav[nav.length] = '<li class="p_next"><a href="#" class="xico" onclick="javascript:gPS.gotoPage(' + ((cFrame*gPS.perpage*10) + 1) + ',' + ((cFrame*10)+1) + ');">다음</a></li>';
			}
					
	          var navHTML = "";

			if (cFrame == 1 ){
				navHTML = '';
	          }else{
				navHTML = '<li class="p_first"><a href="#" class="xico" onclick="javascript:gPS.gotoPage(1,1);">처음</a></li>';
	          }		    
			for( var i = 0 ; i < nav.length ; i++){	
	          	navHTML = navHTML + nav[i];
			}
					
			if (cFrame < allFrame){
				navHTML = navHTML + '<li class="p_last"><a href="#" class="xico" onclick="javascript:gPS.gotoPage(' + ((allPage - 1)*gPS.perpage + 1) +','+ allPage +')">마지막</a></li>';
	        }else{
				navHTML = navHTML;
	        }
	    
			$("#NAVIGATE").html('<div class="paging"><ul>' + navHTML + '</ul></div>');
		}
	},
	
	"gotoPage" : function(Index, PageNum, obj){
		var nav_cpage = PageNum;
		oldpage = nav_cpage;
		
	//	if (gPS.select_Groupname != ""){
	//		gPS.load_groupdata(gPS.select_Groupname, PageNum);
	//	}else{
			gPS.load_logdata(PageNum);
	//	}
		
	
	
	}
	//////////////////////////////////////// 리스트 페이징 종료    /////////////////////////////////////////////

}

