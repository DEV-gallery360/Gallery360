$(document).ready(function(){

});

var g360 = null;                       //gallery360.common.js
var gTopFC = null;                     //gTop.js
var gReqWork = null;                   //request_work.js
var gArtUpload = null;                 //art_upload.js
var gVRGallery = null;

var gTopMain = null; 					//Main 상단 페이지 

var IMP = window.IMP; // 생략가능


function gallery360(root_path, userinfo){
	_this = this;	

	//this.domain = 'https://www.gallery360.co.kr'; //운영서버 하드코딩 (추후 빈값으로 변경)
	this.domain = ''; //운영서버 하드코딩 (추후 빈값으로 변경)
	this.lang = 'ko';
	try{
		this.email = "";
		this.nickname = "";
		this.UserInfo = userinfo;
		
		this.root_path = root_path;
		
		this.sound_path = "";
		
		this.filedownload_mod = "";
		this.filedownload_email = "";
		this.filedownload_filename = "";
		this.filedownload_filekey = "";
		
		
		this.totalcount = 0;
		this.perpage = 5;
		this.cPage = 1;
		
		this.cart_list = new Array();
		
		this.fa_id = "";
		
		this.popuup_close_and_body_show_scroll = false;
		
		this.image_sales_rate = 0.1;
		this.importkey = "";
		
		
		this.artproject_project1_sales_info = "";
		
		this.history = false;
		this.curAIPainterimg = "";
		
		this.isPopupVROpen = "F";
		this.cardapprovalmax = 2000000;
		this.cardapprovaldis = "200만원";
		
		this.is_disp_tooltip = true; //작품 움직임 여부를 전역으로 처리
		
		this.main_title = 'Gallery360';
		
		this.rental_use_count = 0;
		this.rental_km_count = 0;    //카톡과 메일 발송 카운트.
		
		this.save_history = true;    //클릭 로그를 기록한다.
		
		this.double_check = false;
		
	}catch(e){}
	
}

gallery360.prototype = {
		
	"load_init" : function(call_type){
		
		g360.history_record("main");
		
		g360.goHome(call_type);
	//	this.slider_fnc();
		
		$("#addSearch").off("keypress").on("keypress", function(e){
			if (e.keyCode == 13){
				g360.cPage = 1;
				g360.getAddr(1);
				return false;
			}
		});
		
		$("#manual_action_list li").off("click").on("click", function(event){
			
			$("#manual_action_list li").each(function(){
				$(this).removeClass("on");
			});
			var targetid = event.currentTarget.id;
			$("#" + targetid).addClass("on");
			
			$("#video_manual").remove();
			
			var mp4_filename = "";
			if (targetid == "art_manual1"){				
				mp4_filename = "art_1.mp4";		    //회원가입	
			}else if (targetid == "art_manual2"){
				mp4_filename = "art_2.mp4";	    //작품들옥(작가)
			}else if (targetid == "art_manual3"){
				mp4_filename = "art_3.mp4";		    //관리작가등록(아트컨설턴트)
			}else if (targetid == "art_manual4"){
				mp4_filename = "art_4.mp4";	        //VR갤러리 만들기
			}else if (targetid == "art_manual5"){
				mp4_filename = "art_5.mp4";	        //아트프로젝트
			}
			
			var dom = "<video id = 'video_manual' src='https://www.gallery360.co.kr/artimage/manual/"+mp4_filename+"' style='width:100%;  border:1px solid gray' controls></video>";
			$("#video_manual_dis").append(dom);
			$("#video_manual")[0].play();
			return false;
		});
		
		
		$("#manual_action_list_normal li").off("click").on("click", function(event){
			
			$("#manual_action_list_normal li").each(function(){
				$(this).removeClass("on");
			});
			var targetid = event.currentTarget.id;
			$("#" + targetid).addClass("on");
			
			
			$("#video_manual_normal").remove();
			
			var mp4_filename = "";
			if (targetid == "art_manual_noraml_1"){
				mp4_filename = "normal_1.mp4 ";    //회원가입				
			}else if (targetid == "art_manual_noraml_2"){
				mp4_filename = "normal_2.mp4";     //구매가이드	
			}else if (targetid == "art_manual_noraml_3"){
				mp4_filename = "normal_3.mp4";    //VR갤러리 감상방법				    
			}else if (targetid == "art_manual_noraml_4"){
				mp4_filename = "normal_4.mp4";   //인공지능 큐리				   
			}else if (targetid == "art_manual_noraml_5"){
				mp4_filename = "normal_5.mp4";   //내공간에 작품 걸어보기				    
			}else if (targetid == "art_manual_noraml_6"){
				mp4_filename = "normal_6.mp4";   //아트프로젝트				  
			}
			
			var dom = "<video id = 'video_manual_normal' src='https://www.gallery360.co.kr/artimage/manual/"+mp4_filename+"' style='width:100%;  border:1px solid gray' controls></video>";
			$("#video_manual_normal_dis").append(dom);
			
			
			$("#video_manual_normal")[0].play();
			return false;
		});
				
	
		
		g360.init_text_load();
	},
	
	"init_text_load" : function(){
		// ko, us
		var lang = 'ko';
				
		// 1. 사용자가 설정한 언어
		var user_lang = localStorage.getItem('g360_lang');
		if (user_lang) {
			lang = user_lang == 'ko' ? 'ko' : 'us';
		} else {
			// 2. 브라우저 언어
			var browser_lang = navigator.language;
			if (browser_lang) {
				browser_lang = navigator.language.toLowerCase().substring(0,2);
				lang = browser_lang == 'ko' ? 'ko' : 'us';
			}
		}

		var c_lang = lang + '.json';

		this.lang = lang;
		
		var url = g360.root_path + "/resource/lang/" + c_lang + "?ver=220215";
		//console.log("test url : "+url);
		$.ajax({
			type : "GET",
			url : url,
			async : false,
			contentType : "application/json; charset=utf-8",
			success : function(res){	
				//한,영 언어변경
				g360.g_lang = res;
				
				$("#art_zoom_wrapper .zoom-title").html(g360.g_lang.Zoom_In_Out);
//				var url2 = g360.root_path + "/rental_text_check.mon?id="+g360.UserInfo.type+"_"+g360.in_lang.Lang;
//				$.ajax({
//					type : "GET",
//					url : url2,
//					contentType : "application/json; charset=utf-8",
//					success : function(res){
//						
//						console.log("res");
//						console.log(g360.in_lang.Lang);
//						
//						//타입 언어변경 
//						g360.in_lang_ex = res;	
//						console.log(g360.in_lang_ex);
//						//언어 세팅
//						g360.init_text_setting();
//						
//						if(call_type){
//							call_type("ok");
//						}
//					}
//				})
				
			},
			error : function(e){
				console.log("에러발생");
				g360.error_alert();
			}
		});
	},
	
	"load_init2" : function(){
		
		g360.history_record("main");
		
		g360.goHome3();

	//	this.slider_fnc();
		
		$("#addSearch").off("keypress").on("keypress", function(e){
			if (e.keyCode == 13){
				g360.cPage = 1;
				g360.getAddr(1);
				return false;
			}
		});
		
		$("#manual_action_list li").off("click").on("click", function(event){
			
			$("#manual_action_list li").each(function(){
				$(this).removeClass("on");
			});
			var targetid = event.currentTarget.id;
			$("#" + targetid).addClass("on");
			
			$("#video_manual").remove();
			
			var mp4_filename = "";
			if (targetid == "art_manual1"){				
				mp4_filename = "art_1.mp4";		    //회원가입	
			}else if (targetid == "art_manual2"){
				mp4_filename = "art_2.mp4";	    //작품들옥(작가)
			}else if (targetid == "art_manual3"){
				mp4_filename = "art_3.mp4";		    //관리작가등록(아트컨설턴트)
			}else if (targetid == "art_manual4"){
				mp4_filename = "art_4.mp4";	        //VR갤러리 만들기
			}else if (targetid == "art_manual5"){
				mp4_filename = "art_5.mp4";	        //아트프로젝트
			}
			
			var dom = "<video id = 'video_manual' src='https://www.gallery360.co.kr/artimage/manual/"+mp4_filename+"' style='width:100%;  border:1px solid gray' controls></video>";
			$("#video_manual_dis").append(dom);
			$("#video_manual")[0].play();
			return false;
		});
		
		
		$("#manual_action_list_normal li").off("click").on("click", function(event){
			
			$("#manual_action_list_normal li").each(function(){
				$(this).removeClass("on");
			});
			var targetid = event.currentTarget.id;
			$("#" + targetid).addClass("on");
			
			
			$("#video_manual_normal").remove();
			
			var mp4_filename = "";
			if (targetid == "art_manual_noraml_1"){
				mp4_filename = "normal_1.mp4 ";    //회원가입				
			}else if (targetid == "art_manual_noraml_2"){
				mp4_filename = "normal_2.mp4";     //구매가이드	
			}else if (targetid == "art_manual_noraml_3"){
				mp4_filename = "normal_3.mp4";    //VR갤러리 감상방법				    
			}else if (targetid == "art_manual_noraml_4"){
				mp4_filename = "normal_4.mp4";   //인공지능 큐리				   
			}else if (targetid == "art_manual_noraml_5"){
				mp4_filename = "normal_5.mp4";   //내공간에 작품 걸어보기				    
			}else if (targetid == "art_manual_noraml_6"){
				mp4_filename = "normal_6.mp4";   //아트프로젝트				  
			}
			
			var dom = "<video id = 'video_manual_normal' src='https://www.gallery360.co.kr/artimage/manual/"+mp4_filename+"' style='width:100%;  border:1px solid gray' controls></video>";
			$("#video_manual_normal_dis").append(dom);
			
			
			$("#video_manual_normal")[0].play();
			return false;
		});
				
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	"zipcode_search" :function(){
		g360.getAddr(1);
		return false;
	},
	
	
	"getAddr" : function(cPage){
		// AJAX 주소 검색 요청
		var query = $("input[name=zipsearchname]").val();
		
		g360.cPage = cPage;
		
		
		var start = (parseInt(g360.perpage) * (parseInt(g360.cPage))) - (parseInt(g360.perpage) - 1);
		start = parseInt(start) -1 ;		
		var perpage = g360.perpage;
	
		$.ajax({
			url: g360.root_path + "/addressapi.gu?keyword="+encodeURIComponent(query)+"&currentPage="+cPage+"&countPerPage="+g360.perpage	// 주소검색 OPEN API URL
			,type:"get"
			,dataType:"json"											// 크로스도메인으로 인한 jsonp 이용, 검색결과형식 JSON 
			,contentType : "application/json, charset=utf-8"
			,success:function(jsonStr){									// jsonStr : 주소 검색 결과 JSON 데이터	
			
				
				
				$("#list").html("");									// 결과 출력 영역 초기화
				var errCode = jsonStr.results.common.errorCode;
				var errDesc = jsonStr.results.common.errorMessage;
				if(errCode != "0"){ 
					g360.gAlert("Error",errCode+"="+errDesc, "red", "left");
				}else{
					if(jsonStr!= null){
						//debugger;
						g360.makeListjson(jsonStr);							// 결과 JSON 데이터 파싱 및 출력
					}
				}
			}
			,error: function(xhr,status, error){
														// AJAX 호출 에러
				g360.gAlert("Error",g360.g_lang.Error_Occurred, "red", "left");
			}
		});
	},
	
	
	"ok" : function(str){
		//debugger;
//				if (typeof(opener.gPA) != "undefined"){
//					opener.gPA.set_address(str);
//				}
//				if (typeof(opener.gCACL) != "undefined"){
//					opener.gCACL.set_address(str);
//				}
//				
//				top.close();
		
		if (g360.fa_id == ""){
			$("#first_address").val(str);
		}else{
			$("#"+g360.fa_id).val(str);
		}
		
		g360.close_popup('zip_code_search');
	},
		
		
	"makeListjson" : function(jsonStr){
		var htmlStr = "";
		
		var totalcount = jsonStr.results.common.totalCount;
		g360.totalcount = totalcount;
		
		var spl = jsonStr.results.juso;
	
//				htmlStr += "총건수 : " + totalcount;
//				htmlStr += "<br>=====================================";
//				htmlStr += "<table>";
		
		htmlStr += "<ul>";
		for (var i = 0 ; i < spl.length; i++){
			var juso = spl[i];
		
			htmlStr += "<li onclick=\"g360.ok('"+juso.jibunAddr+"')\">";
			htmlStr += "	<span>"+juso.zipNo+" <!--<em>(110-825)</em>--></span>";
			htmlStr += "	<dl>";
			htmlStr += "		<dt>"+g360.g_lang.Road_Name+"</dt>";
			htmlStr += "		<dd>"+juso.roadAddr+"</dd>";
			htmlStr += "	</dl>";
			htmlStr += "	<dl>";
			htmlStr += "		<dt>"+g360.g_lang.Road_Number+"</dt>";
			htmlStr += "		<dd>"+juso.jibunAddr+"</dd>";
			htmlStr += "	</dl>";
			htmlStr += "</li>";
		
		//	htmlStr += "<tr><td style='cursor:pointer' onclick=\"aSearch.ok('"+juso.jibunAddr+"')\">" + juso.jibunAddr + "</td></tr>";
		}
		htmlStr += "</ul>";
		// 결과 HTML을 FORM의 결과 출력 DIV에 삽입
		$("#zip_code_result").html(htmlStr);
		
		g360.search_paging(g360.cPage);
		
		
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	"save_sound_path" : function(path){
		//VR갤러가 띄워져서 도슨트 음성을 play시킬때 실행되는 파일 key를 넘겨준다.
		g360.sound_path = path;
	},
		
	
	
	"popup_VR" : function(title, key, templatecode){
		g360.isPopupVROpen = "T";
		
		//도슨트 파일 음성 값을 초기화 시킨다.	
		g360.history_record("vr_show_close");g360.history_record("vr_show_close");
		
		g360.sound_path = ""
		//조회수를 1 올린다.
		g360.add_read_count(key);
		
		g360.body_scroll_hide();
		g360.scroll_Top();
		
		try{
			gVrGallery.scrollTop = $(document).scrollTop();
		}catch(e){}			
		
		var url = g360.root_path + "/main/vr_gallery/gallery360_popup.jsp?key=" + key;

		g360.LoadPage("vr_show", url);    //index.jsp파일에 레이어가 존재해서 어디서도 같이 사용 할 수 있다.

		
		var inx = g360.maxZindex();
		
		$("#vr_popup").css("z-index", parseInt(inx) + 1);
		
		$("#vrgallery_popup_title").html(title);
		$("#vr_popup").show();
		$("#vr_popup").fadeIn();
		
	},
	
	
	"popup_VR_rental" : function(title, key, templatecode, bgmusic){
		
		
		g360.bgmusic = bgmusic;
		
		
		g360.isPopupVROpen = "T";
		
		//도슨트 파일 음성 값을 초기화 시킨다.	
		g360.history_record("vr_show_close");g360.history_record("vr_show_close");
		
		g360.sound_path = ""
		//조회수를 1 올린다.
		g360.add_read_count(key);
		
		g360.body_scroll_hide();
		g360.scroll_Top();
		
		try{
			gVrGallery.scrollTop = $(document).scrollTop();
		}catch(e){}			
		
		var url = g360.root_path + "/rental/gallery360_popup.jsp?key=" + key;

		g360.LoadPage("vr_show", url);    //index.jsp파일에 레이어가 존재해서 어디서도 같이 사용 할 수 있다.

		
		var inx = g360.maxZindex();
		
		$("#vr_popup").css("z-index", parseInt(inx) + 1);
		
		$("#vrgallery_popup_title").html(title);
		$("#vr_popup").show();
		$("#vr_popup").fadeIn();
		
	},
	
	
	
	
	"manual_close" : function(opt){
		g360.body_scroll_show();
		$("#site_manual_" + opt).popup('hide');
		$("#site_manual_" + opt).fadeOut(10);
		
		if (opt == "art"){
			$("#video_manual").remove();
		}else{
			$("#video_manual_normal").remove();
		}
		
	},
	
	
	"popup_manual" : function(opt){
		
		//도슨트 파일 음성 값을 초기화 시킨다.			
		g360.body_scroll_hide();
		g360.scroll_Top();
		
		try{
			gVrGallery.scrollTop = $(document).scrollTop();
		}catch(e){}			
		
		
		if (opt == "art_upload"){
			$("#art_manual1").click();
		}else if (opt == "vrgallery_create"){
			$("#art_manual2").click();
		}else if (opt == "artproject"){
			$("#art_manual3").click();
		}else if (opt == "userinfo"){
			$("#art_manual4").click();
		}
		

		var inx = g360.maxZindex();
		
		$("#site_manual_art").css("z-index", parseInt(inx) + 1);
		$("#site_manual_art").show();
		$("#site_manual_art").fadeIn();
		
	},
	
	"popup_manual_normal" : function(opt){
		
		//도슨트 파일 음성 값을 초기화 시킨다.		
		
		g360.body_scroll_hide();
		g360.scroll_Top();
		
		try{
			gVrGallery.scrollTop = $(document).scrollTop();
		}catch(e){}			
		
				
		if (opt == "art_recommend"){
			$("#art_manual_noraml_1").click();
		}else if (opt == "art_make"){
			$("#art_manual_noraml_2").click();
		}else if (opt == "art_purchase"){
			$("#art_manual_noraml_3").click();
		}else if (opt == "art_project"){
			$("#art_manual_noraml_3").click();
		}else if (opt == "curie"){
			$("#art_manual_noraml_4").click();
		}else if (opt == "myspace"){
			$("#art_manual_noraml_5").click();
		}else if (opt == "360talk"){
			$("#art_manual_noraml_6").click();
		}
		

		var inx = g360.maxZindex();
		
		$("#site_manual_normal").css("z-index", parseInt(inx) + 1);
		$("#site_manual_normal").show();
		$("#site_manual_normal").fadeIn();
		
	},
	
	
	
	
	
	
	
	
	
	"add_read_count" : function(key){
		var url = g360.root_path + "/vrgallery_read_count_add.mon?key="+key;
		$.ajax({
			type : "GET",
			datatype : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
			
				if (data.result == "OK"){
					return false;
				}else{
					
				}
			},
			error : function(err){
				g360.gAlert("Error",g360.g_lang.Adding_views_Alert, "red", "left");
			}
		})
	},
	
	
	"offsound" : function(){
		
		if (typeof(__pano1) != "undefined"){
			__pano1.krpano1.call("stopsound("+g360.sound_path+")");
		}		
	},
	
	"offsound_bg" : function(){
		if (typeof(__pano1) != "undefined"){
			__pano1.krpano1.call("stopsound(bgsnd)");
		}		
	},
	
	
	
	"vr_popup_close" : function(){
		
		$(".account_wrap").css("width", "80%");
		$("#vr_popup").css("background-color", "black");
		g360.isPopupVROpen = "F";
		
		$("#vr_popup").fadeOut();
		
		//배경음악이 있을 경우 중지 시킨다.
		g360.offsound_bg();			
		//도슨트 음성이 있을 경우 중지 시킨다.
		g360.offsound();
		
		g360.body_scroll_show();
		
		//창을 닫을 때 기존에 표시된 VR갤러리 화면을 제거한다.
		$("#vr_show").empty();
		try{
			g360.scroll_position(gVrGallery.scrollTop);
		}catch(e){}
		

		
	},
	
	
	"popup_VR_sample" : function(title, key, templatecode){
		
		//도슨트 파일 음성 값을 초기화 시킨다.		
		g360.sound_path = ""
		
		g360.body_scroll_hide();
		g360.scroll_Top();
		
	//	gVrGallery.scrollTop = $(document).scrollTop();
		
		var url = "/vr/template/" + templatecode + "/gallery360.jsp?key="+key+"&category="+templatecode+"&height=750px";
	//	gVrGallery.offsound();
	//	g360.offsound();
		g360.LoadPage("vr_show", url);    //index.jsp파일에 레이어가 존재해서 어디서도 같이 사용 할 수 있다.
		
		$("#vrgallery_popup_title").html(title);
		$("#vr_popup").show();
		$("#vr_popup").fadeIn();
		
	},
	
	"goHomeX" : function(){
//		if (g360.login_check()){
//			$("#body_content").hide();
			g360.goHome();
		//	$("#body_content").fadeIn(500);
			g360.scroll_Top();
			g360.body_scroll_show();
//		}else{
//			g360.login_window_max();
//			$("#p_login").click();
//			return;
//		}
	},
	

	"goHome" : function(call_type){

			g360.LoadPage_Top("top_content", g360.root_path + "/main/main_top.jsp", call_type);
			g360.LoadPage_Content("body_content", g360.root_path + "/main/main_content.jsp");  //최초 로딩시만 이 함수를 사용하고 GNB클릭시는 그냥 LoadPage를 호출해야 한다.
	},
	
	
	"goHome3" : function(){
		
		g360.LoadPage_Top("top_content", g360.root_path + "/main/main_top.jsp");
		g360.LoadPage_Content("body_content", g360.root_path + "/main/main_content.jsp");  //최초 로딩시만 이 함수를 사용하고 GNB클릭시는 그냥 LoadPage를 호출해야 한다.
	},
	
	"goHome2" : function(){
		location.href = "/";
	},
	
	"slider_fnc" : function(){

		$('.main-slider').bxSlider({
			slideMargin: 0,
			speed:1000,
			auto:true,
			controls:false,
			pager:true
		});

		$('.vr-slider').bxSlider({
			slideMargin: 0,
			speed:1000,
			auto:true,
			controls:false,
			pager:true
		});


		$('.list-slider').bxSlider({
			slideWidth: 580,
			minSlides: 1,
			maxSlides: 2,
			moveSlides: 1,
			slideMargin: 20,
			speed:1000,
			auto:true,
			controls:true,
			pager:true
		});


		$('.act-slider').slick({
		  dots: true,
		  infinite: true,
		  speed: 1000,
		  slidesToShow: 1,
		  centerMode: true,
		  variableWidth: true
		});
		$('.com-slider').slick({
		  dots: false,
		  infinite: true,
		  speed: 1000,
		  slidesToShow: 1,
		  centerMode: true,
		  variableWidth: true
		});
	},
	
	"LoadPage_Top" : function(id, url, call_type){
		$("#" + id).load(url, function(response, status, xhr){
			// call_type이 있는 경우 상단 페이지 로딩 후에 메뉴 이동되야 하므로 index.jsp에서 호출하던 showMenu를 여기로 옮김
			if (call_type) {
				g360.showMenu(call_type);
			}
			if (status == "error"){
				var msg = "Site Error : "; 
				g360.gAlert("Error",msg + xhr.status + " " + xhr.statusText, "red", "left");
			}
		});
	},
	
	"LoadPage" : function(id, url){
		//$("#"+id).contents().remove();
		$("#bottom_content").hide();
		$("#"+id).load(url, function(response, status, xhr){
			if (status == "error"){
				var msg = "Site Error : "; 
				g360.gAlert("Error",msg + xhr.status + " " + xhr.statusText, "red", "left");
			}else if (status == "success"){
				$("#"+id).show();
				$("#bottom_content").show();
			}
		});
	},
	
	
	"LoadPage_member" : function(id, url, email, nickname, siteid, site){
		//$("#"+id).contents().remove();
	
		$("#"+id).load(url, function(response, status, xhr){
			if (status == "error"){
				var msg = "Site Error : "; 
				g360.gAlert("Error",msg + xhr.status + " " + xhr.statusText, "red", "left");
			}else if (status == "success"){
				
				///////////// 이메일을 직접 입력하는 형태로 수정한다./////////
				$("#email1").hide();
				$("#golbangi").hide();
				$("#email2").attr("class", "size_half1");
				$("#email_select").attr("class", "size_half2");
				$("#email2").show();
				//////////////////////////////
				
						
				$("#txt_nickname").val(nickname);
				
				////////////// SNS 가입신청시  닉네임만 변경할 수 있다.///////////////////
				$("#email2").attr("disabled", "disabled");	
				$("#txt_pw1").attr("disabled", "disabled");
				$("#txt_pw2").attr("disabled", "disabled");
				
				$("input[name=site]").attr("disabled", "disabled");
				$("input[name=id]").attr("disabled", "disabled");
				$("#email_select").attr("disabled", "disabled");
				$("#email_select").val("direct");
				/////////////////////////////////////////////////
				
				$("#email2").val(email);	
				$("#txt_pw1").val(siteid);
				$("#txt_pw2").val(siteid);
				
				$("input[name=site]").val(site);
				$("input[name=id]").val(siteid);
				
				
				
			}
		});
	},
	
	
	"LoadPage_Content" : function(id, url){
		$("#"+id).load(url, function(response, status, xhr){
			if (status == "error"){
				var msg = "Site Error : "; 
				g360.gAlert("Error",msg + xhr.status + " " + xhr.statusText, "red", "left");
			}else if (status == "success"){
				g360.LoadPage("bottom_content", g360.root_path + "/main/main_bottom.jsp");
			}
		});
	},
	
	
	"LoadPage_Content2" : function(id, url){
		$("#"+id).load(url, function(response, status, xhr){
			if (status == "error"){
				var msg = "Site Error : "; 
				g360.gAlert("Error",msg + xhr.status + " " + xhr.statusText, "red", "left");
			}else if (status == "success"){
				
			}
		});
	},
	
	
	"LoadPage2" : function(obj, url){
		obj.load(url, function(response, status, xhr){
			if (status == "error"){
				var msg = "Site Error : "; 
				g360.gAlert("Error",msg + xhr.status + " " + xhr.statusText, "red", "left");
			}
		})
	},
	
	"cal" : function(email, id, name, site){
		//네이버 계정으로 로그인 할때 등록되지 않은 사용자의 경우 회원가입할 수 있도록 보내주는 함수

		loginFC.reguser(email, id, name, site);
	},
	
	"logout" : function(){
		location.href = g360.root_path + "/logout.do";	
	},
	
	"login" : function(){
		location.href = g360.root_path  + "/login.html";
	},
	
	"pageloading" : function(opt){
		//opt값에 따라 페이지를 이동시킨다.
		if (opt == "normal"){
			
		}else if (opt == "art"){
			
		}else if (opt == "curator"){
			
		}
	},
	
	"goto_reg" : function(type){
		var url = g360.root_path + "/main/member/member.jsp";
		if (type) url += '?type=' + type;
		g360.LoadPage("body_content", url);
	},
	
	"member_client_click" : function(){
		
		$("#member_client").attr("class","box on");
		$("#member_art").attr("class","box");
		$("#member_curator").attr("class","box");
		$("#member_rental").attr("class","box");
		$("#txt_nick").text(g360.g_lang.Nickname);
		$("#txt_nickname").attr("placeholder",g360.g_lang.Mypage_Alert6);
		
		$("#recommand_email_dis").hide();
		
	},
	
	"member_art_click" : function(){
		$("#member_client").attr("class","box");
		$("#member_art").attr("class","box on");
		$("#member_curator").attr("class","box");
		$("#member_rental").attr("class","box");
		
		$("#txt_nick").text(g360.g_lang.Name2);
		$("#txt_nickname").attr("placeholder",g360.g_lang.Common_Alert1);
		
		$("#recommand_email_dis").hide();
		
	},
	
	"member_curator_click" : function(){
		$("#member_curator").attr("class","box on");
		$("#member_client").attr("class","box");
		$("#member_art").attr("class","box");
		$("#member_rental").attr("class","box");
		$("#txt_nick").text(g360.g_lang.Name2);
		$("#txt_nickname").attr("placeholder",g360.g_lang.Common_Alert1);
		
		$("#recommand_email_dis").hide();
	},
	
	"member_rental_click" : function(){
		$("#member_curator").attr("class","box");
		$("#member_client").attr("class","box");
		$("#member_art").attr("class","box");
		$("#member_rental").attr("class","box on");
		$("#txt_nick").text(g);
		$("#txt_nickname").attr("placeholder", g360.g_lang.Mypage_Alert6);
		
		$("#recommand_email_dis").show();
	},
	
	//기존 회원 chk5,chk6,chk7,chk8 변경
/*
	"aaaaa_update" : function(){
		$.ajax({
			type : "GET",
			url: g360.root_path+"/aaaaa_update.mon",
			dataType:"json",
			contentType : "application/json; charset=utf-8",
			success : function(data){
				alert(data.ok);//true
			},
			error: function(e){
				alert("실패ㅜㅜ");
			}
		})
	},*/
	
	"reg_user" : function(){
		
		var email1 = $("#email1").val();
		var email2 = $("#email2").val();
		var email_select = $("#email_select").val();
		var txt_nickname = $("#txt_nickname").val();
		var txt_pw1 = $("#txt_pw1").val();
		var txt_pw2 = $("#txt_pw2").val();
		
		//var recommand_email = $("#recommand_email").val();

		var m1 = $("#member_client").get(0).className;
		var m2 = $("#member_art").get(0).className;
		var m3 = $("#member_curator").get(0).className;
		var m4 = $("#member_rental").get(0).className;
		
		var site = $("#site").val();
		var id = $("#id").val();
		
		var joinreason = $(".que_select").val();
		var joinreason_content = "";

		if(joinreason=="0"){
			joinreason = "";
		}
		if(joinreason=="5"){
			joinreason_content = $("#etc_join_reason").val();
		}
		
		
		if (site != ""){
			//특정 사이트 로그인으로 Validation 체크 하지 않는다.
			email = email2 ;
		}else{
			var email = "";
			if (email_select == "direct"){
				email = email2;
			}else{
				if (email_select.indexOf("선택해 주세요.") > -1){
					email = email1 ;
				}else{
					email = email1 + "@" + email_select;
				}
				
			}
			
		
			var chk_br = email.includes(' ');
			var vali_email = g360.validateEmail(email);
			
			if(chk_br){
				g360.gAlert("Error", g360.g_lang.Email_Alert1 , "red", "left");
				return false;
			}else if(vali_email==false){
				g360.gAlert("Error", g360.g_lang.Email_Alert2 , "red", "left");
				return false;
			}
			
			
			var spl = email.split("@");			
			if (spl[0] != "" && spl[1] != ""){		
				//중복확인 버튼
				if(!g360.double_check){
					g360.gAlert("Error", g360.g_lang.Email_Alert3 , "red", "left");
					return false;
				}
				
				if (spl.length < 2){
					g360.gAlert("Error", g360.g_lang.Email_Alert4 , "red", "left");
					return false;
				}
			}else{
				g360.gAlert("Error", g360.g_lang.Email_Alert5 , "red", "left");
				return false;
			}			
			
			
			if (txt_pw1 != txt_pw2){
				g360.gAlert("Error", g360.g_lang.Password_Alert1 , "red", "left");
				return false;
			}		
			
			
			if (g360.paswordcheck(txt_pw2)){				
			}else{
				return false;
			}
		}
		
		var gu = "";
		if (m1.indexOf("on") > -1){
			gu = "normal";
		}else if (m2.indexOf("on") > -1){
			gu = "art";	
		}else if (m4.indexOf("on") > -1){
			gu = "rental";		
		}else{
			gu = "curator";
		}
		//debugger;
		console.log(gu);
		txt_nickname = $.trim(txt_nickname);
		if(txt_nickname==""){
			if(gu=="normal"||gu=="rental"){
				g360.gAlert("Error", g360.g_lang.Mypage_Alert6 , "red", "left");
				return false;
			}else if(gu=="art"||gu=="curator"){
				g360.gAlert("Error", g360.g_lang.Common_Alert1 , "red", "left");
				return false;
			}
			
		}
		
		
		
		//체크박스 체크 여부 확인
		//필수
		var ck2 = $("#chk2").get(0).checked;
		var ck3 = $("#chk3").get(0).checked;
		/*var ck4 = $("#chk4").get(0).checked;*/
		
		//선택
		//마케팅
		var ck5 = $("#chk5").get(0).checked;
		//이메일(ck6), 문자(ck7), 전화(ck8)
		var ck6 = $("#chk6").get(0).checked;
		var ck7 = $("#chk7").get(0).checked;
		var ck8 = $("#chk8").get(0).checked;
		
		
		if (ck2 && ck3){
		//	alert("모두 체크 했습니다.");
		}else{
			//g360.gAlert("Error", "동의 사항에 동의 하셔야 합니다.", "red", "left");
			alert("동의 사항에 동의 하셔야 합니다.");
			return false;
		}
		
		
		
		
		IMP.certification({
			company : "갤러리360",
		    merchant_uid : 'merchant_' + new Date().getTime() //본인인증과 연관된 가맹점 내부 주문번호가 있다면 넘겨주세요
		}, function(rsp) {

		    if ( rsp.success ) {
		    	 // 인증성공
		        
		        $.ajax({
						type : 'POST',
						url : g360.root_path + '/sms_confirm.mon',
						dataType : 'json',
						data : ({
							imp_uid : rsp.imp_uid
						})
				 }).done(function(rsp) {
				 		// 이후 Business Logic 처리하시면 됩니다.
				 		
				 		var res = rsp.response;
				 		if (res.certified){
				 							
				 				
				 				//내가 smskey가 없을 경우 최초 등록일 때는 해당 키로 사용하는 사람이 있는지 체크해서 있으면 중복 등록 못하게 한다.
				 				var uurl = g360.root_path + "/smskey_dupl_check.mon?key=" + res.unique_key + "&" + new Date().getTime();
				 				$.ajax({
				 					Type : "GET",
				 					dataType : "json",
				 					contentType : "application/json; charset=utf-8",
				 					url : uurl,
				 					success : function(data){
				 						if (data.result == "F"){
				 							//gPA.info_edit(res.name, res.gender, res.unique_key, res.phone);
				 							
				 							//번호 및 대관타입 중복확인 (gubun:rental / mobile:res.phone)
				 							//해당 번호는 이미 '대관서비스'에 가입되어 있습니다. 
				 							
				 							var data2 = JSON.stringify({
				 								
				 								mobile : res.phone,
				 								gubun : gu
				 								
				 							});
				 							
				 							$.ajax({
				 								type : "POST",
				 								data : data2,
				 								dataType : "json",
				 								contentType : "application/json; charset=utf-8",
				 								url : g360.root_path + "/reguser_before.mon",
				 								success : function(res11){
				 									//F - 해당번호 존재 안함 / T - 이미 번호존재 (해당가입유형으로 이미 등록한 아이디가 있습니다.)
				 									
				 									if(res11.result=="F"){
				 										
					 									//console.log(res);
					 									//console.log(res.phone);
					 									//console.log(res.gender);
					 									
						 								//확인이후 정보등록
						 								var data = JSON.stringify({
						 									email : email,
						 									pw : txt_pw1,
						 									nickname : txt_nickname,
						 									gubun : gu,
						 									site : site,
						 									id : id,
						 									chk2 : ck2,
						 									chk3 : ck3,
						 									chk5 : ck5,
						 									chk6 : ck6,
						 									chk7 : ck7,
						 									chk8 : ck8,
						 									//recommand_email : recommand_email,
						 									
						 									name : res.name,
						 									gender : res.gender,
						 									smskey : res.unique_key,
						 									mobile : res.phone,
						 									
						 									joinreason : joinreason,
						 									joinreason_content : joinreason_content
						 									
						 									
						 								});
						 								
						 								
						 								
						 								var url = g360.root_path + "/reguser.mon";
						 								
						 								
						 								///////////////////////////////////////////////////
						 								
						 								
						 								
						 								$.ajax({
						 									type : "Post",
						 									data : data,
						 									dataType : "json",
						 									contentType : "application/json; charset=utf-8",
						 									url : url,
						 									success : function(res){
						 										
						 										if (res.result == "EXISTNICKNAME"){
						 											g360.gAlert("Error", g360.g_lang.Common_Alert2 , "red", "left");
						 										}else if (res.result == "NO"){
						 											g360.gAlert("Error", g360.g_lang.Common_Alert3 , "red", "left");
						 										}else{
						 											//	var jx = JSON.stringify(res);
						 											if (site == ""){
						 												g360.gAlert("Info", g360.g_lang.Common_Alert4_1 +" (" + res.email + ") "+g360.g_lang.Common_Alert4_2, "blue", "top");		
						 											}else{
						 												g360.gAlert("Info",res.email + g360.g_lang.Common_Alert5 , "blue", "top");		
						 											}
						 											
						 											$("#mainhome").click();
						 										}
						 										
						 									},
						 									error : function(err){
						 										g360.gAlert("Error", g360.g_lang.Common_Alert6 , "red", "left");
						 									}
						 								});
				 										
				 									}else{
				 										g360.gAlert("Error", g360.g_lang.Common_Alert7 , "red", "left");
							 							return false;
				 									}

				 								},
				 								error : function(err){
	 												g360.gAlert("Error", g360.g_lang.Common_Alert8 , "red", "left");
	 											}

				 								
				 							});
				 							
				 							
				 											
				 							
				 						}else{
				 							g360.gAlert("Error", g360.g_lang.Mypage_Alert9 , "red", "left");
				 							return false;
				 						}
				 					},
				 					error : function(e){
				 						g360.error_alert();
				 					}
				 				})		 				
					 			
				 			}				 			
				 		
				 });
		        	
		    } else {
		    	 // 인증취소 또는 인증실패
		        var msg = '인증에 실패하였습니다.';
		        msg += '에러내용 : ' + rsp.error_msg;
		        g360.gAlert("Error", msg , "red", "left");
		    }
		});
		
		
		
		
		
		
		
		
	
	},
	
	"scroll_Top" : function(){
		$("html, body").animate({ scrollTop: 0 }, "fast");
	},
	
	"scroll_position" : function(to){
		$("html, body").animate({ scrollTop: to }, "fast");
	},
	
	"selectemail" : function(obj){
		
		if (obj.value == "direct"){
			$("#email1").hide();
			$("#golbangi").hide();
			$("#email2").show();
		}else{
			if (obj.value != "선택해 주세요."){
				var str = $("#email1").val();
				var inx = str.indexOf("@");
				if (inx > -1){
					var dis = str.substring(0, inx);
					$("#email1").val(dis);
				}
			}
			$("#email2").attr("class", "size_half1");
			$("#email1").show();
			$("#golbangi").show();
			$("#email2").hide();
		}
	},
	
	"check_all" : function(obj){
		if (obj.checked){
			$("#chk2").prop("checked", "checked");
			$("#chk3").prop("checked", "checked");
			$("#chk5").prop("checked", "checked");
			
			//#ch5-side
			$("#chk6").prop("checked", "checked");
			$("#chk7").prop("checked", "checked");
			$("#chk8").prop("checked", "checked");
		}else{
			$("#chk2").prop("checked", false);
			$("#chk3").prop("checked", false);
			$("#chk5").prop("checked", false);

			//#ch5-side
			$("#chk6").prop("checked", false);
			$("#chk7").prop("checked", false);
			$("#chk8").prop("checked", false);
		}

	},

	"check_side" : function(obj){
		
		if (obj.checked){
			$("#chk6").prop("checked", "checked");
			$("#chk7").prop("checked", "checked");
			$("#chk8").prop("checked", "checked");						
		}else{
			$("#chk6").prop("checked", false);
			$("#chk7").prop("checked", false);
			$("#chk8").prop("checked", false);			
		}
		
	},
	
	"isM" : function(){
		var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
		return isMobile
	},
	
	
	"photo_image_change" : function(){
		
		var url = g360.user_photo_url(g360.UserInfo.email) + "?open&ver=" + new Date().getTime();
		g360.UserInfo.photoimage = g360.UserInfo.email;
		
		var gubun = g360.UserInfo.gubun;
		var url2 = g360.user_photo_url_none(gubun);
		var bgimg = "url('"+url+"'), url('" +url2+ "')";
				
		$("#main_user_image").css("background-image", bgimg);
		$("#main_user_image2").css("background-image", bgimg);
		
		$("#r_main_user_image").css("background-image", bgimg);
		$("#r_main_user_image2").css("background-image", bgimg);
		
		$("#mobile_user_img").css("background-image", bgimg);
		$("#mobile_user_img2").css("background-image", bgimg);
	},
	
	
	"login_hide" : function(){
		//정상적으로 로그인 되었을 경우
		
		if (typeof(g360.UserInfo.photoimage) != "undefined"){
			var url = g360.user_photo_url(g360.UserInfo.email) + "?open&ver=" + new Date().getTime();
			
			var gubun = g360.UserInfo.gubun;
			var url2 = g360.user_photo_url_none(gubun);
			var bgimg = "url('"+url+"'), url('" +url2+ "')";
			$("#main_user_image").css("background-image", bgimg);
			$("#main_user_image2").css("background-image", bgimg);
			
			$("#r_main_user_image").css("background-image", bgimg);
			$("#r_main_user_image2").css("background-image", bgimg);
			
			$("#mobile_user_img").css("background-image", bgimg);
			$("#mobile_user_img2").css("background-image", bgimg);

		}else{
			
			var gubun = g360.UserInfo.gubun;
			var res = g360.user_photo_url_none(gubun);
			var bgimg = "url('"+res+"')";
			var bgimg2 = "url('"+res.replace(".svg","2.svg")+"')";
			
			$("#main_user_image").css("background-image", bgimg2);
			$("#main_user_image2").css("background-image", bgimg2);
			
			$("#r_main_user_image").css("background-image", bgimg);
			$("#r_main_user_image2").css("background-image", bgimg);
			
			$("#mobile_user_img").css("background-image", bgimg2);
			$("#mobile_user_img2").css("background-image", bgimg2);
			
		//	$("#main_user_image2").attr("src", res);
			$("#main_user_image2").attr("onerror", "g360.user_photo_url_none_draw(this)");
			
		}
		
		
		if (g360.UserInfo.gubun == "normal"){
			$("#btn_requestArt").show();
			$("#btn_uploadArt").hide();
			
			$("#uname").html(g360.UserInfo.nickname);
			$("#uemail").html(g360.UserInfo.email);
			
			$("#login").hide();
			$("#addMember").hide();
			$("#loginOK").show();
			
			//모바일 일반 사용자 정상 로그인 표시
			gTopMain.mobile_login_display();
			
		}else if (g360.UserInfo.gubun == "rental"){
			$("#btn_requestArt").hide();
			$("#btn_rental").show();
			
			$("#uname2").html(g360.UserInfo.nickname);
			$("#uemail2").html(g360.UserInfo.email);
			
			$("#login").hide();
			$("#addMember").hide();
			$("#loginOK2").show();
			
			
			$("#mngMypage").hide();
			$("#mngProfie").hide();
			$("#mngArtproject").hide();
			$("#mngArtprojectList").hide();
			$("#go_vr_gallery").hide();
			$("#go_adminpage").hide();
			
		
					
			
			
			
			//모바일 일반 사용자 정상 로그인 표시
			gTopMain.mobile_login_display2();
		}else{
			$("#btn_requestArt").hide();
			$("#btn_uploadArt").show();
			
			$("#uname2").html(g360.UserInfo.nickname);
			$("#uemail2").html(g360.UserInfo.email);
			
			$("#login").hide();
			$("#addMember").hide();
			$("#loginOK2").show();
			
			//모바일 일반 사용자 정상 로그인 표시
			gTopMain.mobile_login_display2();
		}
	
		
		var role = g360.UserInfo.role;
		if (role == "admin"){
			$("#go_adminpage").show();
			$("#go_adminpage2").show();   //일반인으로 회원가입한 사용자가 관리자일 경우 버튼 보여준다.
			$("#go_adminpage3").show();
			
			$("#btn_rental").show();
			
			$("#go_adminpage22").show();
			$("#go_adminpage222").show();
			
		}else{
			$("#go_adminpage").hide();
			$("#go_adminpage2").hide();
			$("#go_adminpage3").hide();
			$("#go_adminpage22").hide();
			$("#go_adminpage222").hide();
			
			if (g360.UserInfo.gubun != "rental"){
				$("#btn_rental").hide();				
			}
			
			if (g360.UserInfo.gubun == "rental"){
				$("#m_userinfo2").hide();
			}
			
			
			
		}
		
		// 콜백함수 셋팅된 경우 호출
		if (typeof(this.loginCallback) == 'function') {
			this.loginCallback();
		}
		
		// 콜백 함수 초기화
		this.loginCallback = null;

	},
	
	"login_check" : function(){
		
		//현재 로그인 되어 있는지 판단한다.
		var isAccess = "F";
		
		if (g360.UserInfo != null) {			
			var url = g360.root_path + "/access_check.mon";
			$.ajax({
				type : "GET",
				dataType : "json",
				async : false,
				cache : false,
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(data){
					
					if (data.access == "YES"){
						isAccess = "T";
					}else{
						alert(g360.g_lang.Relogin_Alert);
					}
				},
				error : function(e){
					g360.error_alert();
				}
			})
		}
		
		if (isAccess == "T"){
			return true;
		}else{
			return false;
		}
	},
	
	"login_show" : function(){
		//로그아웃 클릭시 화면 처리
	
		$("#btn_requestArt").show();
		$("#btn_uploadArt").hide();
		
		$("#login").show();
		$("#addMember").show();
		$("#loginOK").hide();
		$("#loginOK2").hide();
	},
	
	"error_alert" : function(){
		g360.gAlert("Error", g360.g_lang.Error_Alert , "red", "left");
		
	},
	
	"body_scroll_show" : function(){
		//$("body").removeClass("hidden-scroll");
		this.showBodyScroll();
	},
	
	"body_scroll_hide" : function(){
		$("body").addClass("hidden-scroll");
	},
	
	
	"common_alert" : function(title, message, width){		
		// 호출 하는 방법
			if (typeof width == "undefined"){
				width = "300px";
			}
	
			$('<div title="' + title + '" style="width:400px">' + message + '</div>').dialog({
			      modal: true,
			      width : width,
				  show: {effect: "fade", duration: 500 },
				  hide: { effect: 'fade', duration: 400 },
			      buttons: {
			        Ok: function() {
			          $( this ).dialog( "close" );
			        }
			      }
			});		
		},
		
	
			
	"common_confirm" : function (title, message){
		//호출하는 방법
		//	$.when(kJS.common_confirm("Confirm", "999999999999999")).then(
		//  	function(status) {
		//    		if (status == "Yes") {
		//    		}
		//  	}
		//	);	
		
		var def = $.Deferred();

		$('<div title="' + title + '">' + message + '</div>').dialog({
		    modal: true,
		    title: title,
		    resizable: false,
		    bgiframe: false,
		    show: {effect: "fade", duration: 500 },
		    hide: { effect: 'fade', duration: 400 },
		    buttons: {
		        Yes: function () {
		            $(this).dialog("close");
		            def.resolve("Yes");
		        },
		        No: function () {
		            $(this).dialog("close");
		            def.resolve("No");
		        }
		    }
		});
		return def.promise();
	},
	
	"layer_popup" : function(html){
		$("#basic_popup").show();
		$("#basic_popup").html(html);
		$("#basic_popup").popup({
			onclose: function(){					
			}
		});			
		$("#basic_popup").popup("show");
		$("#basic_popup").position({
			of: $(window)
		})
	},
	
	"g360Popup" : function(html){
		$("#g360Popup_layer").show();
		$("#g360Popup_layer").html(html);
		$("#g360Popup_layer").popup({
			onclose: function(){					
			}
		});			
		$("#g360Popup_layer").popup("show");
		$("#g360Popup_layer").position({
			of: $(window)
		})
	},
	
	"validateEmail" : function(sEmail){
		
		var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		if (filter.test(sEmail)) {
		return true;
		}
		else {
		return false;
		}
	},
	
	"id_double_check" : function(){
		
		var email1 = $("#email1").val(); //id
		var email2 = $("#email_select option:selected").val(); //주소
		var email3 = "";
		
		
		if(email2=="direct"){
			
			email3 = $("#email2").val();
			email3 = $.trim(email3);
			
			var vali_email = g360.validateEmail(email3);
			
			if(email3==""){
				g360.gAlert("Error", g360.g_lang.Email_Alert0 , "red", "left");
				return false;
			}else if(vali_email==false){
				g360.gAlert("Error", g360.g_lang.Email_Alert1 , "red", "left");
				return false;
			}
			
		}else if(email2=="not"){
			g360.gAlert("Error", g360.g_lang.Email_Alert6 , "red", "left");
			return false;
			
		}else{			
			//
			
			email3 = email1+"@"+email2;
			email1 = $.trim(email1);
			
			var vali_email = g360.validateEmail(email3);
			
			if(email1==""){
				g360.gAlert("Error",g360.g_lang.Email_Alert0, "red", "left");
				return false;
			}else if(vali_email==false){
				g360.gAlert("Error",g360.g_lang.Email_Alert2, "red", "left");
				return false;
			}
			
		}
		
		
		g360.double_check = true;
		
		//console.log(email3)
		
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : g360.root_path + "/id_double_check.mon?email="+email3,
			success : function(data){
				g360.gAlert("Info",data.result, "blue", "top");
				
				if(data.result=="사용가능한 이메일입니다."){
					$("#sub_email").hide();
					
				}else if(data.result=="회원 탈퇴 후 30일 이후에 사용가능합니다."){
					$("#sub_email").show();
					$("#sub_email").text(g360.g_lang.SignUp_Alert6);
					$("#sub_email").css({'font-size':'12px', 'color':'red'});
					
				}else if(data.result=="이미 존재하는 이메일 입니다. 다른 이메일로 변경해주세요."){
					$("#sub_email").show();
					$("#sub_email").text(g360.g_lang.SignUp_Alert7);
					$("#sub_email").css({'font-size':'12px', 'color':'red'});
				}
			},
			error : function(e){
				g360.error_alert();
			}
			
		})
	},
	
	
	"reg_popup" : function(opt, obj){
		$(obj).css("background", "black").css("color", "white");
		
		if (opt == "1"){
			var url = g360.root_path + "/admin_new/terms.jsp"
			g360.layer_popup_url2(url, opt);
		}else if (opt == "2"){
			var url = g360.root_path + "/admin_new/privacy.jsp"
			g360.layer_popup_url2(url, opt);
		}
		
		return false;
		
	},
	
	
	
	
	"layer_popup_url" : function(url){
		
		g360.LoadPage("basic_popup", url);
	
	//	$("#basic_popup").html(html);
		$("#basic_popup").popup({
			onclose: function(){					
			}
		});			
		
		var inx = g360.maxZindex();
		$("#basic_popup").popup("show");
		$("#basic_popup").position({
			of: $(window)
		}).css("z-index", parseInt(inx) + 1);
	},
	
	
	
	"layer_popup_url2" : function(url, opt){
		

		g360.body_scroll_hide();
	//	g360.LoadPage("show_content", url);    //index.jsp파일에 레이어가 존재해서 어디서도 같이 사용 할 수 있다.
		
		
		$("#show_content").load(url, function(response, status, xhr){
			if (status == "error"){
				var msg = "Site Error : "; 
				g360.gAlert("Error", msg + xhr.status + " " + xhr.statusText , "red", "left");
			
			}else if (status == "success"){
				
				$("#basic_popup2").popup({
					blur: false,
					onclose: function(){
						$('#show_content').scrollTop(0);
						g360.body_scroll_show();
					},
					position: {my:'center', at:'center', of:window}
				});
				$("#basic_popup2").popup('show');

				if (opt == "1"){
					$("#popup2_title").text(g360.g_lang.Footer_5);
					$("#terms_top").css("margin-top", "0px");
					$("#terms_top_title").hide();
				}else{
					$("#popup2_title").text(g360.g_lang.Footer_4);
					$("#privacy_top").css("margin-top", "0px");
					$("#privacy_top_title").hide();
				}				
						
				var inx = g360.maxZindex();
				$("#basic_popup2_background").css("z-index", parseInt(inx) + 1);
				$("#basic_popup2_wrapper").css("z-index", parseInt(inx) + 2);
				$("#basic_popup2").css("z-index", parseInt(inx) + 3);
				
			//	$("#basic_popup2").css("z-index", parseInt(inx) + 1);
			}
		});
	},
	
	"layer_popup2" : function(){
		$("#basic_popup").popup({
			onclose: function(){					
			}
		});
		
		$("#basic_popup").popup("show");
		$("#basic_popup").position({
			of: $(window)
		})
	},
	
	"layer_popup_hide" : function(){
		$("#basic_popup").popup("hide");
	},
	
	"layer_popup_movie" : function(html){
		$("#basic_popup").html(html);
		$("#basic_popup").popup({
			onclose: function(){
				var video = $("#move_area");
				if (video != null){
					if (video.played) video.pause();
				}
			}
		})
	},
	
	
	"setCookie" : function(c_name, value, exdays){
		var exdate=new Date();

		exdate.setDate(exdate.getDate() + exdays);

		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());

		document.cookie=c_name + "=" + c_value;
	},
	
	
	"getCookie" : function(c_name){
		var i,x,y,ARRcookies=document.cookie.split(";");

		for (i=0;i<ARRcookies.length;i++)

		{

		  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));

		  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);

		  x=x.replace(/^\s+|\s+$/g,"");

		  if (x==c_name)

			{

			return unescape(y);

			}

		  }
	},
	
	
	"paswordcheck" : function(str){

		var pattern1 = /[0-9]/;		//숫자 포함 여부 판단
		var pattern2 = /[a-zA-Z]/;  //영문 포함 여부 판단
		var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/;  //특수 문자 포함 여부 판단.
		
		if(!pattern1.test(str) || !pattern2.test(str) || !pattern3.test(str) || str.length < 8) { 
			g360.gAlert("Error", g360.g_lang.SignUp_Alert8 , "red", "left");
			return false; 
		} else { 
			return true; 
		} 
	},
	
	"iso_date_convert" : function(dx){
		var date = new Date(dx);
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var dt = date.getDate();

		if (dt < 10) {
		  dt = '0' + dt;
		}
		if (month < 10) {
		  month = '0' + month;
		}
		
		return year + "-" + month + "-" + dt ;

		
	},
	
	"comma" : function(num){
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	
	
	"TextToHtml" : function(str){
		if (!str) return '';
		str = str.replace(/&lt;/gi,"<").replace(/&gt;/gi,">");
		str = str.replace(/&#40;/gi,"(").replace(/&#41;/gi,")");
		str = str.replace(/&\#39;/gi,"'");
		return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
	},
	
	"TextToHtml_Body" : function(str){
		if (!str) return '';
		str = str.replace(/&lt;/gi,"<").replace(/&gt;/gi,">");
		str = str.replace(/&#40;/gi,"(").replace(/&#41;/gi,")");
		str = str.replace(/&\#39;/gi,"'");
		str = str.replace(/ /gi,"&nbsp;");
		return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
	},
	
	"textToHtml" : function(str){
		if (!str) return '';
		str = str.replace(/&lt;/gi,"<").replace(/&gt;/gi,">");
		str = str.replace(/&#40;/gi,"(").replace(/&#41;/gi,")");
		str = str.replace(/&\#39;/gi,"'");
		return str;
	},
	
	"textToHtml_Body" : function(str){
		if (!str) return '';
		//&lt; &gt;를 변환하면 html로 인식되므로 주석처리함
		//str = str.replace(/&lt;/gi,"<").replace(/&gt;/gi,">");
		str = str.replace(/&#40;/gi,"(").replace(/&#41;/gi,")");
		str = str.replace(/&\#39;/gi,"'");
		str = str.replace(/  /gi," &nbsp;");
		return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
	},	
	
	"wrap_calendar" : function(id, targetid){
		$("#"+ id).datepicker(
				{
	                dateFormat: 'yy-mm-dd' //Input Display Format 변경
	                ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
	                ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시
	                ,changeYear: true //콤보박스에서 년 선택 가능
	                ,changeMonth: true //콤보박스에서 월 선택 가능                
	            //   ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
	            //    ,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
	           //    ,buttonImageOnly: true //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
	            //    ,buttonText: "선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
	                ,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
	                ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
	                ,monthNames: [g360.g_lang.January, g360.g_lang.February, g360.g_lang.March, g360.g_lang.April, g360.g_lang.May, g360.g_lang.June, g360.g_lang.July, g360.g_lang.August, g360.g_lang.September, g360.g_lang.October, g360.g_lang.November, g360.g_lang.December] //달력의 월 부분 Tooltip 텍스트
	                ,dayNamesMin: [g360.g_lang.Sun, g360.g_lang.Mon, g360.g_lang.Tues, g360.g_lang.Wednes, g360.g_lang.Thurs, g360.g_lang.Fri, g360.g_lang.Satur] //달력의 요일 부분 텍스트
	                ,dayNames: [g360.g_lang.Sunday, g360.g_lang.Monday, g360.g_lang.Tuesday, g360.g_lang.Wednesday, g360.g_lang.Thursday,g360.g_lang.Friday, g360.g_lang.Saturday] //달력의 요일 부분 Tooltip 텍스트			
				,
				 onSelect: function( newText ){
		              $("#" + targetid).text("‘" + newText + "’");
		         }
	            }
	           
		)
	},
	
	
	"setWon" : function(pWon){
		 var won  = (pWon+"").replace(/,/g, "");
		    var arrWon  = ["", "만", "억", "조", "경", "해", "자", "양", "구", "간", "정"];
		    var changeWon = "";
		    var pattern = /(-?[0-9]+)([0-9]{4})/;
		    while(pattern.test(won)) {                   
		        won = won.replace(pattern,"$1,$2");
		    }
		    var arrCnt = won.split(",").length-1;
		    for(var ii=0; ii<won.split(",").length; ii++) {
		        if(arrWon[arrCnt] == undefined) {
		            g360.gAlert("Error", g360.g_lang.SignUp_Alert9 , "red", "left");
		            break;
		        }
		  var tmpwon=0;
		  for(i=0;i<won.split(",")[ii].length;i++){
		   var num1 = won.split(",")[ii].substring(i,i+1);
		   tmpwon = tmpwon+Number(num1);
		  }
		  if(tmpwon > 0){
		    changeWon += won.split(",")[ii]+arrWon[arrCnt]; //55억0000만0000원 이런 형태 방지 0000 다 짤라 버린다
		  }
		        arrCnt--;
		    }
		    
		 changeWon += "원";
		 return changeWon;
	},
		

	"open_artist_info" : function(email){
				
		
		var html = "";
		
		html += "<div class='layer_account art_project client'>";
		html += "	<div class='layer_content bg_white wrap_flex' style='text-align:left'>";
		html += "		<div class='layer_content_header'>";
		html += "			<h2>"+g360.g_lang.Partners32+"</h2>";
		html += "			<button class='btn btn_account_close' onclick=\"g360.close_popup('basic_popup')\">"+g360.g_lang.Close+"</button>";
		html += "		</div>";
		html += "		<div class='left sub_common_content mypage wrap_col'>";
		html += "			<div class='person'>";
		html += "				<div><img id='p_u_image'  /></div>";
		html += "			<dl>";
		html += "				<dt id='pname'></dt>";
		html += "				<dd id='pemail'></dd>";
		html += "			</dl>";
		html += "		</div>";
		html += "		<div class='wrap_person_info'>";
		html += "			<article class='career term'>";
		html += "				<div>";
		html += "					<h3>"+g360.g_lang.Group+"</h3>";
		html += "					<ul id='pgroup'>";
	//	html += "						<li>아트 유니온 그룹</li>";
		html += "					</ul>";
		html += "				</div>";
		html += "				<div>";
		html += "					<h3>"+g360.g_lang.Educational_Info+"</h3>";
		html += "					<ul id='peducation'>";
//			html += "						<li>홍익대학교 / 미술교육 학과</li>";
//			html += "						<li>Ontario College of Art ,Canada / FineArt</li>";
//			html += "						<li>홍익대학교 / 서양학과</li>";
		html += "					</ul>";
		html += "				</div>";
		html += "			</article>";
		html += "		</div>";
		html += "	</div>";
		html += "	<div class='right wrap_col'>";
		html += "		<div class='group_section'>";
		html += "			<!--<div class='group_header type3 fixheight_s'>";
		html += "				<h3>"+g360.g_lang.Evaluation_Info+"</h3>";
		html += "			</div>-->";
		html += "			<div class='wrap_group evaluation_infograph wrap_flex'>";
		html += "				<div class='wrap_col bg_white' style='padding:10px'>";
		html += "					<dl class='ei_title'>";
		html += "						<dt>"+g360.g_lang.Completed_project+"</dt>";
		html += "						<dd id='score_count'></dd>";
		html += "					</dl>";
		html += "					<div class='evaluation_detail'>";
		html += "						<h4>"+g360.g_lang.Detail_Evaluation+"</h4>";
		html += "						<div>";
		html += "							<dl>";
		html += "								<dt>"+g360.g_lang.labels1+"</dt>";
		html += "								<dd id='score1'></dd>";
		html += "							</dl>";
		html += "							<dl>";
		html += "								<dt>"+g360.g_lang.labels2+"</dt>";
		html += "								<dd id='score2'></dd>";
		html += "							</dl>";
		html += "							<dl>";
		html += "								<dt>"+g360.g_lang.labels3+"</dt>";
		html += "								<dd id='score3'></dd>";
		html += "							</dl>";
		html += "							<dl>";
		html += "								<dt>"+g360.g_lang.labels4+"</dt>";
		html += "								<dd id='score4'></dd>";
		html += "							</dl>";
		html += "							<dl>";
		html += "								<dt>"+g360.g_lang.labels5+"</dt>";
		html += "								<dd id='score5'></dd>";
		html += "							</dl>";
		html += "						</div>";
		html += "					</div>";
		html += "					<div class='evaluation_average'>";
		html += "						<div style='width:293px'><canvas id='canvas'></canvas></div>";
		html += "					</div>";
		html += "				</div>";
		html += "				<div class='wrap_col bg_white'  style='padding:10px'>";
		html += "					<dl class='ei_title'>";
		html += "						<dt>"+g360.g_lang.Average_score+"</dt>";
		html += "						<dd>";
		html += "							<div class='star'  id='profile_score_dis'>";
		html += "								<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "								<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "								<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "								<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "								<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "								<span id='score_avarage'></span>";
		html += "							</div>";
		html += "						</dd>";
		html += "					</dl>";
		html += "					<div class='evaluation_distribute'>";
		html += "						<h4>"+g360.g_lang.Rating_distribution+"</h4>";
		html += "						<ul class='stat_list'>";
		html += "							<li>";
		html += "								<div class='star' id='profile_score_dis1'>";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<span  id='score_dis1'></span>";
		html += "								</div>";
		html += "								<div class='bar_graph'><div class='bar' id='score_dis1_bar' style='width:0%'></div></div>";
		html += "							</li>";
		html += "							<li>";
		html += "								<div class='star' id='profile_score_dis2'>";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<span  id='score_dis2'></span>";
		html += "								</div>";
		html += "								<div class='bar_graph'><div class='bar' id='score_dis2_bar' style='width:0%'></div></div>";
		html += "							</li>";
		html += "							<li>";
		html += "								<div class='star' id='profile_score_dis3'>";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<span  id='score_dis3'></span>";
		html += "								</div>";
		html += "								<div class='bar_graph'><div class='bar' id='score_dis3_bar' style='width:0%'></div></div>";
		html += "							</li>";
		html += "							<li>";
		html += "								<div class='star' id='profile_score_dis4'>";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<span  id='score_dis4'></span>";
		html += "								</div>";
		html += "								<div class='bar_graph'><div class='bar' id='score_dis4_bar' style='width:0%'></div></div>";
		html += "							</li>";
		html += "							<li>";
		html += "								<div class='star' id='profile_score_dis5'>";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<img src='/img/account/star-r-disable.svg' alt='' />";
		html += "									<span  id='score_dis5'></span>";
		html += "								</div>";
		html += "								<div class='bar_graph'><div class='bar' id='score_dis5_bar' style='width:0%'></div></div>";
		html += "							</li>";
		html += "						</ul>";
		html += "					</div>";
		html += "				</div>";
		html += "			</div>";
		html += "			<div class='wrap_group project_infograph'  style='padding:10px'>";
		html += "				<div class='wrap_flex'>";
		html += "					<div class='wrap_col bg_white'>";
		html += "						<h4>"+g360.g_lang.Detail_Evaluation+"</h4>";
		html += "						<div class='pj_detail'>";
		html += "							<div style='width:293px'><canvas id='canvas2'></canvas></div>";
		html += "						</div>";
		html += "					</div>";
		html += "					<div class='wrap_col bg_white'>";
		html += "						<div class='pj_price' style='padding:10px'>";
		html += "							<h4 id='pall'>"+g360.g_lang.Average_amount+"</h4>";
		html += "							<div>";
		html += "								<dl>";
		html += "									<dt>"+g360.g_lang.Average_price+"</dt>";
		html += "									<dd id='pr1'></dd>";
		html += "								</dl>";
		html += "								<dl>";
		html += "									<dt>"+g360.g_lang.Lowest_price+"</dt>";
		html += "									<dd id='pr2'></dd>";
		html += "								</dl>";
		html += "								<dl>";
		html += "									<dt>"+g360.g_lang.Highest_price+"</dt>";
		html += "									<dd id='pr3'></dd>";
		html += "								</dl>";
		html += "							</div>";
		html += "							<div class='pj_bar'>";
		html += "								<ul>";
		html += "									<li id='pbar1'></li>";
		html += "									<li id='pbar2'></li>";
		html += "									<li id='pbar3'></li>";
		html += "								</ul>";
		html += "							</div>";
		html += "						</div>";
		html += "					</div>";
		html += "					<div class='wrap_col bg_white'>";
		html += "						<div class='pj_period' style='padding:10px'>";
		html += "							<h4>"+g360.g_lang.Project_average_period+"</h4>";
		html += "							<div>";
		html += "								<dl>";
		html += "									<dt>"+g360.g_lang.Average_period+"</dt>";
		html += "									<dd id='tp1'></dd>";
		html += "								</dl>";
		html += "								<dl>";
		html += "									<dt>"+g360.g_lang.Shortest_period+"</dt>";
		html += "									<dd  id='tp2'></dd>";
		html += "								</dl>";
		html += "								<dl>";
		html += "									<dt>"+g360.g_lang.Longest_period+"</dt>";
		html += "									<dd  id='tp3'></dd>";
		html += "								</dl>";
		html += "							</div>";
		html += "							<div class='pj_bar'>";
		html += "								<ul>";
		html += "									<li id='tbar1'></li>";
		html += "									<li id='tbar2'></li>";
		html += "									<li id='tbar3'></li>";
		html += "								</ul>";
		html += "							</div>";
		html += "						</div>";
		html += "					</div>";
		html += "				</div>";
		html += "			</div>";
		html += "		</div>";
		html += "	</div>";
		html += "</div>";
		html += "</div>";
		
		
		g360.layer_popup(html);
		g360.popup_score(email);
		
	},
	
	
	"popup_score" : function(email){
		
		var url = g360.root_path + "/search_userinfo_one.mon?email="+email;
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				
//					if (data.gubun == "art"){
//						$("#profile_category").text("작가");
//					}else if (data.gubun == "curator"){
//						$("#profile_category").text("큐레이터");
//					}
				
				$("#pname").text(data.name);
				$("#pemail").text(data.email);
				
				if (typeof(data.photoimage) != "undefined" || g360.UserInfo.photoimage != ""){
					var url = g360.user_photo_url(data.email);
					$("#p_u_image").attr("src", url);
					$("#p_u_image").attr("onerror", "g360.user_photo_url_none_draw(this)");
				}else{
					var url = "/img/noimage.svg";
					$("#p_u_image").attr("src", url);
				}
				
				if (typeof(data.group) != "undefined"){
					$("#pgroup").append("<li>"+data.group[0].title+"</li>");
				}
				
				
				if (typeof(data.education) != "undefined"){
					for (var i = 0 ; i < data.education.length; i++){
						$("#peducation").append("<li>"+data.education[i].schoolname + "/" + data.education[i].major +"</li>");
					}
				}
				
				
				
				var score = data.score;
				var totalscore = 0;
				var rtotal = 0;
				var sctotal = 0;
				
				if (typeof(score) != "undefined"){
					var totalscore = parseInt(score.score1) + parseInt(score.score2) + parseInt(score.score3) + parseInt(score.score4) +parseInt(score.score5);
					var rtotal = parseInt(totalscore) / 5;
					var sctotal = Math.ceil(rtotal);
				}
				
				
				var bun=1;
				$("#profile_score_dis img").each(function(index){				
					if (bun <= sctotal){
						$(this).attr("src", $(this).attr("src").replace("disable","focus"));
					}
					bun++;
				});
				
				var ss1 = 0;
				var ss2 = 0;
				var ss3 = 0;
				var ss4 = 0;
				var ss5 = 0;
				
				if (typeof(score) != "undefined"){
					ss1 = (parseInt(score.score1) * 2) * 10;
					$("#score_dis1_bar").css("width", ss1+"%");
					ss2 = (parseInt(score.score2) * 2) * 10;
					$("#score_dis2_bar").css("width", ss2+"%");
					ss3 = (parseInt(score.score3) * 2) * 10;
					$("#score_dis3_bar").css("width", ss3+"%");
					ss4 = (parseInt(score.score4) * 2) * 10;
					$("#score_dis4_bar").css("width", ss4+"%");
					ss5 = (parseInt(score.score5) * 2) * 10;
					$("#score_dis5_bar").css("width", ss5+"%");
					
					$("#score_dis1").text(score.score1+g360.g_lang.Score);
					$("#score_dis2").text(score.score2+g360.g_lang.Score);
					$("#score_dis3").text(score.score3+g360.g_lang.Score);
					$("#score_dis4").text(score.score4+g360.g_lang.Score);
					$("#score_dis5").text(score.score5+g360.g_lang.Score);
					
					
					$("#score1").text(ss1+g360.g_lang.Score);
					$("#score2").text(ss2+g360.g_lang.Score);
					$("#score3").text(ss3+g360.g_lang.Score);
					$("#score4").text(ss4+g360.g_lang.Score);
					$("#score5").text(ss5+g360.g_lang.Score);
				}else{
					$("#score_dis1_bar").css("width", "0%");
					$("#score_dis2_bar").css("width", "0%");
					$("#score_dis3_bar").css("width", "0%");
					$("#score_dis4_bar").css("width", "0%");
					$("#score_dis5_bar").css("width", "0%");
					
					$("#score_dis1").text("0"+g360.g_lang.Score);
					$("#score_dis2").text("0"+g360.g_lang.Score);
					$("#score_dis3").text("0"+g360.g_lang.Score);
					$("#score_dis4").text("0"+g360.g_lang.Score);
					$("#score_dis5").text("0"+g360.g_lang.Score);
					
					
					$("#score1").text("0"+g360.g_lang.Score);
					$("#score2").text("0"+g360.g_lang.Score);
					$("#score3").text("0"+g360.g_lang.Score);
					$("#score4").text("0"+g360.g_lang.Score);
					$("#score5").text("0"+g360.g_lang.Score);
				}
				

				if (typeof(score) != "undefined"){
					var bun=1;
					$("#profile_score_dis1 img").each(function(index){				
						if (bun <= score.score1){
							$(this).attr("src", $(this).attr("src").replace("disable","focus"));
						}		
						bun++;
					});
					
					var bun=1;
					$("#profile_score_dis2 img").each(function(index){				
						if (bun <= score.score2){
							$(this).attr("src", $(this).attr("src").replace("disable","focus"));
						}		
						bun++;
					});
					
					var bun=1;
					$("#profile_score_dis3 img").each(function(index){				
						if (bun <= score.score3){
							$(this).attr("src", $(this).attr("src").replace("disable","focus"));
						}		
						bun++;
					});
					
					var bun=1;
					$("#profile_score_dis4 img").each(function(index){				
						if (bun <= score.score4){
							$(this).attr("src", $(this).attr("src").replace("disable","focus"));
						}		
						bun++;
					});
					
					var bun=1;
					$("#profile_score_dis5 img").each(function(index){				
						if (bun <= score.score5){
							$(this).attr("src", $(this).attr("src").replace("disable","focus"));
						}		
						bun++;
					});
				}
				
				
				
				
				
				
				//4.3 / 평가32개
				$("#score_avarage").text(rtotal + g360.g_lang.Score);
				
				$("#score_count").text(data.project_totalcount + g360.g_lang.Artist_Mypage7);
				
				$("#profile_artcount").text(data.saved_art_totalcount + g360.g_lang.Artist_Mypage7);
				
		
				config.data.datasets[0].data[0] = ss1;
				config.data.datasets[0].data[1] = ss2;
				config.data.datasets[0].data[2] = ss3;
				config.data.datasets[0].data[3] = ss4;
				config.data.datasets[0].data[4] = ss5;
				
				window.myRadar = new Chart(document.getElementById('canvas'), config);
				
				//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				
				var project_average_price = 0;
				var project_average_term = 0;
				var project_max_price = 0;
				var project_max_term = 0;
				var project_min_price = 0;
				var project_min_term = 0 ;
				var project_total_price = 0;
				var info = "";
				
				if (typeof(data.project_info) != "undefined"){
					info = data.project_info;
					project_total_price = info.project_total_price * 10000;
					project_max_price = info.project_max_price * 10000;
					project_min_price = info.project_min_price * 10000;
					project_average_price = info.project_average_price * 10000;
					
					project_max_term = info.project_max_term;
					project_min_term = info.project_min_term;
					project_average_term = info.project_average_term;	
					
					
					$("#pr1").text(g360.comma(g360.setWon(project_average_price)));
					$("#pr2").text(g360.comma(g360.setWon(project_min_price)));
					$("#pr3").text(g360.comma(g360.setWon(project_max_price)));
					$("#pall").text(g360.g_lang.Accumulated_Amount + g360.comma(g360.setWon(project_total_price)));
					
					$("#pbar1").text(g360.comma(g360.setWon(project_min_price)));
					$("#pbar2").text(g360.comma(g360.setWon(project_average_price)));
					$("#pbar3").text(g360.comma(g360.setWon(project_max_price)));
					
					$("#tp1").text(info.project_average_term + g360.g_lang.Partners22);
					$("#tp2").text(info.project_min_term + g360.g_lang.Partners22);
					$("#tp3").text(info.project_max_term + g360.g_lang.Partners22);
					
					$("#tbar1").text(info.project_min_term+g360.g_lang.Partners22);
					$("#tbar2").text(info.project_average_term+g360.g_lang.Partners22);
					$("#tbar3").text(info.project_max_term+g360.g_lang.Partners22);
					
					
					config2.data.datasets[0].data[0] = data.project_type1_totalcount;
					config2.data.datasets[0].data[1] = data.project_type2_totalcount;
					config2.data.datasets[0].data[2] = data.project_type3_totalcount;
					var ctx = document.getElementById('canvas2').getContext('2d');
					window.myDoughnut = new Chart(ctx, config2);
					
				}
				
				
				
				
									
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	
	
	
	
	
	
	
	
		
	"dateDiff3" : function(check_in, check_out){
	    var firstDate = new Date(check_in.replace('-' , '/'));
	    var secondDate = new Date(check_out.replace('-' , '/'));    
	    var diffDays = Math.abs((firstDate.getTime() - secondDate.getTime()) / 86400000);
	    return diffDays;
	},
	
	
	
	
	"dateDiff" : function(_date1, _date2){
		
	    var diffDate_1 = _date1 instanceof Date ? _date1 : new Date(_date1);
	    var diffDate_2 = _date2 instanceof Date ? _date2 : new Date(_date2);
	 
	    diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
	    diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());
	 
	    var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
	    diff = Math.ceil(diff / (1000 * 3600 * 24));
	 
	    return diff;
	},
	
	
	
			
	"filedownload" : function(){

		var mod = g360.filedownload_mod;
		var email = g360.filedownload_email;
		var filename = g360.filedownload_filename;
		filename = encodeURIComponent(filename);
		
		var url = g360.root_path + "/DownloadFile?mod="+mod+"&file="+filename+"&email="+email;
		location.href = url;
	},
	
	"preview_img" : function(filename, email, mod){
		
		
		$("#image_title").text("Image Viewer");
		
		g360.body_scroll_hide();
		var url = "";
		if (filename.substring(0,3) == "ai_"){
			//AI페인터로 요청한 경우
			filename = filename.substring(3, filename.length);
			url = "/artimage/" + email + "/artRequest_AI/result/"+filename+"_out.jpg";
		}else{
			url = "/artimage/" + email + "/"+mod+"/" + filename;
		}
		
		
	//	var url = "/artimage/" + email + "/"+mod+"/" + filename;
		
		$("#popup_file_download").show();
		g360.filedownload_mod = mod;
		g360.filedownload_email = email;
		g360.filedownload_filename = filename;
		
		$("#preview_image_src").attr("src",url);
		$("#preview_image_src").css("max-height", "750px");
		
	//	g360.body_scroll_hide();
		$("#image_preview").show();			
		////////////////////////////////////////////////////////////////////
		$("#image_preview").popup({
			onclose: function(){		
				g360.body_scroll_show();
			}
		});
		
		var inx = g360.maxZindex();
		$("#image_preview").css("z-index", parseInt(inx) + 1);
		
		$("#image_preview").popup('show');		
		$('#image_preview').position({
		    of: $(window)
		});
		
		
		
	},
	
	"preview_img_direct" : function(url, email, mod){
		
		$("#popup_file_download2").show();
		
		g360.history_record("preview_img_close");g360.history_record("preview_img_close");
		
		//이미지 URL을 직접 넘겨서 표시한다.
		$("#image_title").text("Image Viewer");
		
		g360.body_scroll_hide();
					
		g360.filedownload_mod = mod;
		g360.filedownload_email = email;
		
		$("#popup_file_download").hide();
		$("#preview_image_src").attr("src",url);
		$("#preview_image_src").css("max-height", "750px");
		
	//	g360.body_scroll_hide();
		//$("#image_preview").show();			
		////////////////////////////////////////////////////////////////////
		$("#image_preview").popup({
			onclose: function(){			
				g360.body_scroll_show();
			}
		});
		
		
		var inx = g360.maxZindex();
		$("#image_preview").css("z-index", parseInt(inx) + 1);
		
		
		$("#image_preview").popup('show');		
		/*
		$('#image_preview').position({
		    of: $(window)
		});
		*/
		
		
		
	},
	
	
	
	"preview_img_direct2" : function(url, email, filekey){
		$("#popup_file_download2").show();
		
		g360.history_record("popup_file_close");g360.history_record("popup_file_close");
		
		//이미지 URL을 직접 넘겨서 표시한다.
		$("#image_title2").text("Image Viewer");
					
		g360.filedownload_url = url;
		g360.filedownload_email = email;
		g360.filedownload_filekey = filekey;
		
		g360.body_scroll_hide();
		
		// 이미지 깜빡임 해결
		var $el = $('#image_preview2');
		$('#preview_image_src2').remove();
		
		var $img = $('<img id="preview_image_src2">');
		$img.attr("src",url);
	//	$img.css("max-height", "750px");
		$img.css("max-height", "95%");
		
		var url2 = url.replace("_water.png",".jpg");
		$img.attr("onerror", "g360.no_image_url('"+url2+"', this)");
		
		$el.find('.img_content').append($img);
		
		var mz = g360.maxZindex();
		$('#image_preview2_background').css('z-index', mz + 1);
		$('#image_preview2_wrapper').css('z-index', mz + 2);
		
		
	//	g360.body_scroll_hide();
		//$("#image_preview2").show();			
		////////////////////////////////////////////////////////////////////
		$("#image_preview2").popup({
			onclose: function(){	
				g360.body_scroll_show();
			}
		});
		
		var inx = g360.maxZindex();
		$("#image_preview2").css("z-index", parseInt(inx) + 1);
		
		$("#image_preview2").popup('show');
		/*
		$('#image_preview2').position({
		    of: $(window)
		});
		*/
		
		
		
	},
	
	
	"ai_painter_view_count_add" : function(key){
		var url = g360.root_path + "/ai_painter_view_count_add.mon";
		var data = JSON.stringify({
			key : key
		});
		
		$.ajax({
			type : "POST",
			dataType : "json",
			contentType : "appliation/json; charset=utf-8",
			data : data,
			url : url,
			success : function(data){
				//
			}
		})
	},
	
	
	"preview_img_direct3" : function(opt, url, email, filekey, request_upload_img, request_select_img){
		
		
		$("#popup_file_download2").hide();
		
		g360.ai_painter_view_count_add(filekey);
		
		g360.history_record("popup_file_close");g360.history_record("popup_file_close");
		
		//이미지 URL을 직접 넘겨서 표시한다.
		$("#image_title2").text("Image Viewer");
					
		g360.filedownload_url = url;
		g360.filedownload_email = email;
		g360.filedownload_filekey = filekey;
		
		g360.body_scroll_hide();
		
		// 이미지 깜빡임 해결
		var $el = $('#image_preview2');
		$('#preview_image_src2').remove();
		
		var $img = $('<img id="preview_image_src2">');
		$img.attr("src",url);
	//	$img.css("max-height", "750px");
		$img.css("max-height", "95%");
		
		var url2 = url.replace("_water.png",".jpg");
		$img.attr("onerror", "g360.no_image_url('"+url2+"', this)");
		
			
        if (opt == "Y"){
        	var source_path = g360.domain + "/artimage/" + email + "/artRequest_AI/expand/" + request_upload_img + "_small.jpg";
    		var t_path = g360.domain + "/artimage/ai_sample/" + request_select_img + "_small.jpg";
    	//	var html = "<div id='ai_target2' style='background-image:url("+t_path+")'></div>";
         //   html += "<div id='ai_source2' style='background-image:url("+source_path+")'></div>";
            
        	$el.find('.img_content').append($img); //.append(html);
        }else{
        	$el.find('.img_content').append($img);
        }
		
		
		
		var mz = g360.maxZindex();
		$('#image_preview2_background').css('z-index', mz + 1);
		$('#image_preview2_wrapper').css('z-index', mz + 2);
		
		
	//	g360.body_scroll_hide();
		//$("#image_preview2").show();			
		////////////////////////////////////////////////////////////////////
		$("#image_preview2").popup({
			onclose: function(){	
				$(".img_content div").remove();
				g360.body_scroll_show();
			}
		});
		
		var inx = g360.maxZindex();
		$("#image_preview2").css("z-index", parseInt(inx) + 1);
		
		$("#image_preview2").popup('show');
		/*
		$('#image_preview2').position({
		    of: $(window)
		});
		*/
		
		
		
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	 "curie_art_request" : function(dockey) {
		 // 로그인 되어 있는지 체크
		
		 if (g360.login_check()){
			if (!typeof(g360.UserInfo.smskey) == "undefined" || g360.UserInfo.smskey == ""){
				
				if ( $(window).width() <= 800) {
					// 윈도우 사이즈가 800보다 작으면 입력 불가능
					g360.gAlert("Info", g360.g_lang.Curie_Art_Alert1 , "blue", "top");
				} else {
					g360.gAlert("Error", g360.g_lang.Curie_Art_Alert2 , "red", "left");
					gTopMain.navBtnAction('account_client');
					
					if ( $('#curie_layer').is(':visible') ) {
						// 큐리에서 여는 경우 큐리화면 닫아야 함
						g360.close_popup('image_preview2');
						g360.close_popup('aipainter_start');
						gCurie.hideCurie();
					} else if ( $('#my_space_layer').is(':visible') ) {
						// 내 공간 작품 걸어보기에서 요청한 경우
						ms.hideSpace();
					}
				}
				
				return;
			}
		} else {
			g360.login_window_max();
			$("#p_login").click();
			return;
		}
		 
		
		if ( $('#curie_layer').is(':visible') ) {
			// 큐리에서 오픈한 경우
			g360.close_popup('image_preview2');
			g360.close_popup('aipainter_start');
			gCurie.hideCurie();
			g360.LoadPage_Content("body_content", g360.root_path + "/client/art_request/art_request.jsp?di=" + (dockey?dockey:gCurie.show_key));
		}else if ($('#btn_ai_write').is(':visible')){
			g360.close_popup('image_preview2');
			g360.LoadPage_Content("body_content", g360.root_path + "/client/art_request/art_request.jsp?di=" + (dockey?dockey:g360.filedownload_filekey));
		} else if ( $('#my_space_layer').is(':visible') ) {
			// 내 공간 작품 걸어보기기에서 요청한 경우
			ms.hideSpace();
			g360.LoadPage_Content("body_content", g360.root_path + "/client/art_request/art_request.jsp?di=" + dockey);
		} else if (typeof(gArtRequest) != 'undefined') {
			// 작품제작 요청에서 오픈한 경우
			gArtRequest.select_art_request_image();
		//	gArtRequest.select_art_request_image_direct(dockey);
		} else {
			g360.close_popup('aipainter_start');
			g360.LoadPage_Content("body_content", g360.root_path + "/client/art_request/art_request.jsp?di=" + dockey);
		}
	},
		
	
	"curie_intro_show" : function(){
		//이미지 URL을 직접 넘겨서 표시한다.
	//	$("#image_title3").text("Gallery360 인공지능 Curie");
					
//			g360.filedownload_url = url;
//			g360.filedownload_email = email;
//			g360.filedownload_filekey = filekey;
		
//			$("#popup_file_download2").hide();
//			$("#popup_file_close").hide();
		
		$("#preview_image_src3").attr("src","img/curie/curie.gif");
		
	//	$("#preview_image_src3").attr("src","img/curie/ZGf5D.gif");
	//	$("#preview_image_src4").attr("src","img/curie/d80b5e69091c368164d9238c59e1427e.gif");
	//	$("#preview_image_src5").attr("src","img/curie/5b6695fa-c8dd-4d3b-95e3-6510f8ff1e76.gif");
	//	$("#preview_image_src6").attr("src","img/curie/1_1uIttjuEz_Ry7EghgQnHkA.gif");
		
	//	g360.body_scroll_hide();
		$("#image_preview3").show();
		$("#image_preview3").fadeIn(100);			
		////////////////////////////////////////////////////////////////////
		$("#image_preview3").popup({
			onclose: function(){					
			}
		});
		
		var inx = g360.maxZindex();
		$("#image_preview3").css("z-index", parseInt(inx) + 1)
		
		$("#image_preview3").popup('show');		
		$('#image_preview3').position({
		    of: $(window)
		});		
		
	},
	
	
	
	"load_Curie" : function(){

			if (g360.login_check()){
				
	//			g360.curie_intro_show();				
	//			setTimeout("g360.close_popup2('image_preview3')", 2500);
				
				//curie_header
				g360.history_record("curie_header");g360.history_record("curie_header");
				
				//g360.scroll_Top();
				g360.body_scroll_hide();
				var url = g360.root_path + "/main/recommend/curie_recommand.jsp";
				$('#curie_header').addClass('active');
				$("#curie_wrapper").load(url, function(response, status, xhr){
					if (status == "error"){
						var msg = "Site Error : "; 
						g360.gAlert("Error", msg + xhr.status + " " + xhr.statusText , "red", "left");
					}
				});
				//g360.LoadPage_Content("body_content", url);
			}else{
				g360.login_window_max();
				$("#p_login").click();
				return false;
			}

		},
	
	
	
	"login_window_max" : function(){
		// main_top.js에 로그인창을 최상위로 띄우는 이벤트 처리해 놓음
		/*
		var inx = g360.maxZindex();
		$(".modal-backdrop").css("z-index", parseInt(inx) + 1)
		$("#exampleModalCenter").css("z-index", parseInt(inx) + 10);
		*/
		return;
		
	},
	
	
	"zip_code_popup" : function(){
		g360.fa_id = "";
			
		g360.body_scroll_hide();
		
		$("#zip_code_search").popup({
			blur: false,
			onclose: function(){
				g360.body_scroll_show();
			},
			position: {my:'center', at:'center', of:window}
		});
		$("#zip_code_search").popup('show');
	},
	
	
	"zip_code_popup2" : function(first_address){
		g360.fa_id = first_address;
		
				
		var inx = g360.maxZindex();
		
		
		$("#zip_code_search").show();						
		$("#zip_code_search").popup({
			onclose: function(){					
			}
		});
		
		
		
		$("#zip_code_search_background").css("z-index", parseInt(inx) + 5)
		$("#zip_code_search_wrapper").css("z-index", parseInt(inx) + 10)
		$("#zip_code_search").css("z-index", parseInt(inx) + 20);
		
		$("#zip_code_search").popup('show');		
		$('#zip_code_search').position({
		    of: $(window)
		});
	},

	"close_popup" : function(id){
		if (id == 'aipainter_start') {
			$('#aipainter_start').popup('hide');
			return;
		}
		
	//	$("#preview_image_src").attr("src", "");
	//	g360.body_scroll_show();
		
		$(".img_content div").remove();
		
		var $el = $("#" + id);
		$el.popup('hide');
		
		// 파일 미리 보기인 경우 이미지 경로 초기화..
		if (id == 'image_preview'|| id == 'image_preview2') {
			$el.find('.img_content img').attr('src', '');
		}
	},
	
	"close_popup2" : function(id){
		
	//	$("#preview_image_src2").attr("src", "");
	//	g360.body_scroll_show();			
		$("#"+id).popup('hide');
		$("#" + id).fadeOut(1000);
	},
	
	"popup_open" : function(id){

		if(id == "art_purchase_popup"){
			$("#vrgallery_popup_title2").text(g360.g_lang.Art_Purchase_Popup);
		}
		
		$("#" + id).show();	
		$("#"+id).popup({
			onclose: function(){					
			}
		});
		
		
		var inx = g360.maxZindex();
		$("#" + id + "_background").css("z-index", parseInt(inx) + 1);
		$("#" + id + "_wrapper").css("z-index", parseInt(inx) + 2);
		$("#" + id).css("z-index", parseInt(inx) + 3);
		
		
		$("#"+id).popup('show');		
		$("#" + id).position({
		    of: $(window)
		});
	},
	
	"popup_close" : function(id){
		
		$("#" + id).hide();					
		$("#"+id).popup('hide');
						
		g360.body_scroll_show();
	
		if (g360.popuup_close_and_body_show_scroll){
			//팝업창을 닫고 body에 다시 Scroll를 생기게 하는 경우는 해당 값에  true를 주고 호출한다.
			$("body").removeClass("hidden-scroll");
			g360.scroll_Top();
		}
	},
	
	
	
	
	
	"loadingbar_open" : function(msg){
	
		
		// 이미 띄워져있는 상태면 텍스트만 변경 처리
		if ($('#loadingbar').is(':visible')) {
			if (msg) {
				$("#loading_message").text(msg);
				return;
			}
		}
		
		var mz = this.maxZindex();
		
		
		$("#loading_message").text(msg);
		$("#loadingbar").show();			
		$("#loadingbar").popup({
			onclose: function(){					
			},
			blur: false,
			escape: false,
			opacity : 0.83
		});
			
		
		$("#loadingbar").popup('show');		
		$("#loadingbar").position({
		    of: $(window)
		});

		$('#loadingbar_background').css('z-index', ++mz);
		$('#loadingbar_wrapper').css('z-index', ++mz);
		
		//$('#loadingbar_background').css('opacity',0.9);
	},
	
	"loadingbar_close" : function(){
		$("#loadingbar").hide();		
		$("#loadingbar").popup('hide');
	},
	
	
	
	"layer_popup_hide" : function(){
		$("#image_preview").popup('hide');
	},
	
	"preview_img_request" : function(filename, email){
		$("#image_title").text(filename);
		var url = "/artimage/" + email + "/artRequest/" + filename;
		
		g360.filedownload_mod = "artRequest";
		g360.filedownload_email = email;
		g360.filedownload_filename = filename;
		
		$("#preview_image_src").attr("src",url);
		
		g360.body_scroll_hide();
		$("#image_preview").show();
	},
	
	
	"file_size_setting" : function(fileSize){
	
		var fixed = true;		
	    var str

	    //MB 단위 이상일때 MB 단위로 환산
	    if (fileSize >= 1024 * 1024 * 1024) {
	        fileSize = fileSize / (1024 * 1024 * 1024);
	        fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
	        str = g360.numberComma(fileSize) + ' G';
	        
	    }else if (fileSize >= 1024 * 1024) {
	        fileSize = fileSize / (1024 * 1024);
	        fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
	        str = g360.numberComma(fileSize) + ' MB';
	    }
	    //KB 단위 이상일때 KB 단위로 환산
	    else if (fileSize >= 1024) {
	        fileSize = fileSize / 1024;
	        fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
	        str = g360.numberComma(fileSize) + ' KB';
	    }
	    //KB 단위보다 작을때 byte 단위로 환산
	    else {
	        fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
	        str = g360.numberComma(fileSize) + ' byte';
	    }
	    return str;

		
		
	},
	
	
	"numberComma" : function(x) {
		return (x == null || isNaN(x)) ? '' : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	
	
	"open_search_address" : function(){
		var _url = g360.root_path + "/service/addSearch.jsp";
		g360.open_subwin(_url , '800', '600', 'yes', '', 'yes')
	},
	
	"user_photo_url" : function(email){
	//	var url = "/artimage/" + email + "/photo/" + filename;
		var url = this.domain + "/artimage/" + email + "/photo/" + email;
		return url;
	},
	
	"user_photo_url_none" : function(gubun){
		var url = "";
		
		if (!gubun) gubun = g360.UserInfo.gubun;
		
		if (gubun == "normal"){
			url = this.domain + "/img/member/avatar-non-profile.svg";
		}else if (gubun == "curator" || gubun == "rental"){
			url = this.domain + "/img/member/avatar-non-profile-curater.svg";
		}else if (gubun == "art"){
			url = this.domain + "/img/member/avatar-non-profile-artist.svg";
		}			
		return url;
	},
	
	"user_photo_thum_url" : function(email){
		var url = this.domain + "/artimage/" + email + "/photo/" + email;
		return url;		
	},
	
	// 작가 리스트, 메인에서 뿌려줌
	"user_photo_gray_url" : function(email){
		//if (typeof(email) != "undefined"){
			var url = this.domain + "/artimage/" + email + "/photo_list/" + email + "_gray.jpg";
			return url;
		//}else{
		//	return "";
		//}
		
	},
	
	// 작품상세에서 뿌려줌
	"user_photo_color_url" : function(email){
		var url = this.domain + "/artimage/" + email + "/photo_list/" + email;
		return url;		
	},
	
	//작가사진
	"artist_detail_photo_url" : function(email){
		var url = this.domain + "/artimage/" + email + "/photo/" + email;
		return url;		
	},
	
	// 작가 상세에서 뿌려줌
	"user_photo_profile_url" : function(email){
		//if (typeof(email) != "undefined"){
			var url = this.domain + "/artimage/" + email + "/photo_profile/" + email;
			return url;
		//}else{
		//	return "";
		//}
		
	},
	
	// 작가 상세에서 뿌려줌
	"user_photo_profile_gray_url" : function(email){
		//if (typeof(email) != "undefined"){
			var url = this.domain + "/artimage/" + email + "/photo_profile/" + email + "_gray.jpg";
			return url;
		//}else{
		//	return "";
		//}
		
	},
	
	
	"date_term" : function(dat, disdate){
		var old = new Date (dat);
		var now = new Date();			
		var gap = now.getTime() - old.getTime();
		var min_gap = gap / 1000 /60;
		
		if (min_gap < 0){
			min_gap = 0;
		}

		if (parseInt(min_gap) > 60){
			var hour_gap = gap / 1000 /60 / 60;

			if (parseInt(hour_gap) > 60){
				return g360.iso_date_convert(dat);
			}else{
				return parseInt(hour_gap) + ""  + "시간전";
			}
			
		}else{
			return parseInt(min_gap) + ""  + "분전";
		}
	}, 
	
	
	"user_photo_url_none_draw" : function(image){
	//	debugger;
		var gubun = g360.UserInfo.gubun;
		
		var url = "";
		if (gubun == "normal"){
			url = this.domain + "/img/member/avatar-non-profile.svg";
		}else if (gubun == "curator" || gubun == "rental"){
			url = this.domain + "/img/member/avatar-non-profile-curater.svg";
		}else if (gubun == "art"){
			url = this.domain + "/img/member/avatar-non-profile-artist.svg";
		}			

		if (image) {
			image.onerror = "";
			image.src = g360.root_path +  url;
		}
		
		return true;
	},
	
	
	"no_photo_draw" : function(image){
		//   onerror=\"g360.no_photo_draw(this)\"  <== 이미지 소스 다음에 이 소스를 추가한다.
		image.onerror = "";
		image.src = g360.root_path + "/img/noperson.png";
		return true;
	},
	
	
	"no_photo_draw2" : function(image){
		//해상도가 높은 이미지 없음 파일을 사용한다....
		//   onerror=\"g360.no_photo_draw(this)\"  <== 이미지 소스 다음에 이 소스를 추가한다.
		image.onerror = "";
		image.src = g360.root_path + "/img/noperson.png";
		return true;
	},
	
	"no_image_url" : function(url, image){
		image.onerror = "";
		image.src = url;
		return true;
	},
	
	"open_subwin" : function(url, width, height, scrollbars, win_name, resizable){
		var opt_scrollbars = (scrollbars == null)?"yes":scrollbars;
		var opt_resizable = (resizable == null)?"yes":resizable;
		var window_name = (win_name == null)?"subwin":win_name;
		//var winFeature = set_center(width, height) + ",menubar=no,resizable=no ,scrollbars="+opt_scrollbars;
		var winFeature = g360.set_center(width, height) + ",menubar=no,resizable="+opt_resizable+",scrollbars="+opt_scrollbars;
		var subwin = window.open(url, window_name, winFeature);
		return subwin;
	},
	
	"set_center" : function(win_width, win_height){
		winx = Math.ceil((screen.availWidth - win_width) / 2);
		winy = Math.ceil((screen.availHeight - win_height) / 2);
		return "left=" + winx + ",top=" + winy + ",width=" + win_width + ",height=" + win_height;
	},
	
	
	"preview_artproject_img_path" : function(email, dockey){
		var url = this.domain + "/artimage/" + email + "/artproject/preview/" + dockey + ".jpg";
		return url;
	},
	
	
	"myspace_img_path" : function(email, filename){
		return '/artimage/' + email + '/myspace/mobile/' + filename + '.jpg';
	},
	
	"myspace_thumbnail_img_path" : function(email, filename){
		return '/artimage/' + email + '/myspace/thumbnail/' + filename + '.jpg';
	},

	
	"thumbnail_img_path" : function(email, dockey){
		var url = this.domain + "/artimage/" + email + "/art/thumbnail/" + dockey + ".jpg";
		return url;
	},
	
	"preview_img_path" : function(email, dockey, version){
		var ver = (isNaN(version) ? new Date().getTime() : version);
		var url = this.domain + "/artimage/" + email + "/art/preview/" + dockey + ".jpg?open&ver="+ver;
		return url;
	},
	
	// 공간에 걸어 제안하기 할 때 참조함 (테스트용)
	"preview_img_path2" : function(email, dockey){
		
		var url = "/artimage/" + email + "/art/preview/" + dockey + ".jpg";
		return url;
	},
	
	"portfolio_path" : function(email, filekey){
		var url = this.domain + "/book/dbook.jsp?key=/artimage/" + email + "/art_portfolio/" + filekey;
		return url;
	},
	
	"dbook_path" : function(email, filekey){
		var url = this.domain + "/book/dbook.jsp?key=/artimage/" + email + "/dbook/" + filekey;
		return url;
	},
	
	"audio_path" : function(email, filekey){
		var url = this.domain + "/artimage/" + email + "/art_mp3/" + filekey;
		return url;
	},
	
	"video_path" : function(email, filekey){
		var url = this.domain + "/artimage/" + email + "/art_mp4/" + filekey;
		return url;
	},
	
	
	"mobile_img_path" : function(email, dockey){
		var url = this.domain + "/artimage/" + email + "/art/mobile/" + dockey + ".jpg";
		return url;
	},
	
	"art_img_path" : function(email, dockey){
		var url = this.domain + "/artimage/" + email + "/art/" + dockey;
		return url;
	},
	
	"art_img_thumbnail_path" : function(email, dockey){
		var url = this.domain + "/artimage/" + email + "/art/thumbnail/" + dockey + ".jpg";
		return url;
	},
	
	"art_expand_img_path" : function(email, dockey){
		var url = this.domain + "/artimage/" + email + "/art/expand/" + dockey + '.jpg';
		return url;
	},
	
	"vr_img_path" : function(templatecode, key){
		
		var url = this.domain + "/vr/vr_data_"+templatecode+"/"+key+"/pano_f.jpg";
		//var url = this.domain + "/vr/vr/vrgallery/"
		
		return url;
	},
	
	
	"vr_img_path_new" : function(key){	
				
		var email = g360.check_email(key);
		var url = this.domain + "/vr/vr/vrgallery/" + email + "/" + key + "/pano_f.jpg";
		
		return url;
	},
	
	"check_email" : function(key){
		var email = "";
		var spl = key.split("@");
		var ssp = spl[0].indexOf("_");
		var spx = key.split("_");
		if (ssp > -1){
			email = spx[0] + "_" + spx[1];
		}else{
			email = spx[0];
		}
		return email;
	},
	
	"news_expand_img_path" : function(email, filename){
		var url = this.domain + "/artimage/" + email + "/news/expand/" + filename + ".jpg";
		return url;
	},
	
	"news_preview_img_path" : function(email, filename){
		var url = this.domain + "/artimage/" + email + "/news/preview/" + filename + ".jpg";
		return url;
	},
	
	
	"artProject_preview_img_path" : function(email, filename){
	
		var url = "";
		if (filename.substring(0,3) == "ai_"){
			//AI페인터로 요청한 경우
			filename = filename.substring(3, filename.length);
			url = "/artimage/" + email + "/artRequest_AI/result/"+filename+"_out.jpg";
		}else{
			url = "/artimage/" + email + "/artRequest/mobile/" + filename + ".jpg";	
		}
		
		return url;
	},
	
	"showVideo" : function(video_src, show_body_scroll){
		var mz = this.maxZindex();
		var $video = $('#video_layer');
		$('#video_header').addClass('active').css('z-index', ++mz);
		$video.find('.youtube_wrapper').hide();
		$video.css('z-index', ++mz).show();
		$video.find('video').attr('src', video_src);
		$video.find('video').show();
		$video.find('video')[0].play();
		
		$('#video_header').off('click').on('click', function(){
			$video.find('video').attr('src', '');
			$video.hide();
			$('#video_header').removeClass('active');
			if (show_body_scroll) {
				$('body').removeClass('overflow-hidden');
			}
		});
	},
	
	"showYoutube" : function(src){
		var mz = this.maxZindex();
		$('#video_header').addClass('active').css('z-index', ++mz);
		$('#video_layer').find('.youtube_wrapper').show();
		$('#video_layer').find('video').hide();
		$('#video_layer').css('z-index', ++mz).show();
		$('#video_layer').find('iframe').attr('src', src);
		
		$('#video_header').off('click').on('click', function(){
			$('#video_layer').find('iframe').attr('src', 'about:blank');
			$('#video_layer').hide();
			$('#video_header').removeClass('active');
		});
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/////////////////////////// 리스트 페이징 시작 //////////////////////////////////////////////////////////////
	"search_paging" : function(page){
		var alldocuments = g360.totalcount;
		if (alldocuments % g360.perpage > 0 & alldocuments % g360.perpage < g360.perpage/2 ){
			allPage = Number(Math.round(alldocuments/g360.perpage)) + 1;
		}else{
			allPage = Number(Math.round(alldocuments/g360.perpage));
		}	

		g360.search_navigator(page);
	},
	
	"search_navigator" : function(page){
		var nav_cpage = page;

		var alldocuments = g360.totalcount;
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
				nav[0] = '<li class="p_prev"><a href="#" class="xico" onclick="javascript:g360.gotoPage(' + ((((cFrame-1)*10)-1)*g360.perpage+1) + ',' + ((cFrame-1)*10) + ');">&lt;</a></li>';
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
						nav[pIndex] = "<li><a href=# onclick='g360.gotoPage("+ (((i-1) * g360.perpage) + 1 ) + ", "+ i + ", this)'>" + i + "</a></li>";
						
					}else{
						if (i%10 == '1' ){
							nav[pIndex] = "<li><a href=# onclick='g360.gotoPage("+ (((i-1) * g360.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";	
						}else{
							nav[pIndex] = "<li><a href=# onclick='g360.gotoPage("+ (((i-1) * g360.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";
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
				nav[nav.length] = '<li class="p_next"><a href="#" class="xico" onclick="javascript:g360.gotoPage(' + ((cFrame*g360.perpage*10) + 1) + ',' + ((cFrame*10)+1) + ');">&gt;</a></li>';
			}
					
	          var navHTML = "";

			if (cFrame == 1 ){
				navHTML = '';
	          }else{
				navHTML = '<li class="p_first"><a href="#" class="xico" onclick="javascript:g360.gotoPage(1,1);">&lt;&lt;</a></li>';
	          }		    
			for( var i = 0 ; i < nav.length ; i++){	
	          	navHTML = navHTML + nav[i];
			}
					
			if (cFrame < allFrame){
				navHTML = navHTML + '<li class="p_last"><a href="#" class="xico" onclick="javascript:g360.gotoPage(' + ((allPage - 1)*g360.perpage + 1) +','+ allPage +')">&gt;&gt;</a></li>';
	        }else{
				navHTML = navHTML;
	        }
	    
			$("#zipcode_NAVIGATE").html('<div class="paging"><ul>' + navHTML + '</ul></div>');
		}
	},
	
	"gotoPage" : function(Index, PageNum, obj){
		var nav_cpage = PageNum;
		oldpage = nav_cpage;
		
		g360.getAddr(PageNum);
	},
	//////////////////////////////////////// 리스트 페이징 종료    /////////////////////////////////////////////

	
	"showMenu" : function(opt){
		//debugger;
		var _self = this;
		var tm = 100;
		if (opt == "rental"){
			//$("#btn_gnb_rental").click();
			//g360.history_record("btn_gnb_rental");			
			setTimeout(function(){
				gTopMain.navBtnAction('rental');
			}, tm);
			setTimeout(function(){
				$.force_appear();
			}, 1000);
		}else if (opt == "rentallist"){
			setTimeout(function(){
				gTopMain.navBtnAction('rentallist');
			}, tm);
			setTimeout(function(){
				$.force_appear();
			}, 1000);
		}else if (opt == "rentalprice"){
			_self.popup_rental_p();
			$("#body_content").show();
			$("#bottom_content").show();
		}else if (opt == "ai"){
			setTimeout(function(){
				gTopMain.navBtnAction('ai');
			}, tm);
		}else if (opt == "news"){
			setTimeout(function(){
				gTopMain.navBtnAction('news');
			}, tm);
		}else if (opt == "vrgallery"){
			setTimeout(function(){
				gTopMain.navBtnAction('vrgallery');
			}, tm);
		}else if (opt == "art"){
			setTimeout(function(){
				gTopMain.navBtnAction('art');
			}, tm);
		}else if (opt == "artist"){
			setTimeout(function(){
				gTopMain.navBtnAction('artist');
			}, tm);
		}else if (opt == "recommand"){
			setTimeout(function(){
				gTopMain.navBtnAction('recommand');
			}, tm);
		}else if (opt == "service"){
			setTimeout(function(){
				gTopMain.navBtnAction('service');
			}, tm);
		}else if (opt == "signup"){
			setTimeout(function(){
				$('#addMember').click();
			}, tm);
		}else if (opt == "signup_rental"){
			setTimeout(function(){
				gTopMain.navBtnAction('signup_rental');
			}, tm);
		}else if (opt == "onetoone"){
			setTimeout(function(){
				gTopMain.navBtnAction('onetoone');
			}, tm);
		}else if (opt == "notice"){
			setTimeout(function(){
				gTopMain.navBtnAction('notice');
			}, tm);
		}else if (opt == "faq"){
			setTimeout(function(){
				gTopMain.navBtnAction('faq');
			}, tm);
		}
		
		
		return false;
	},
	
	// 대관 가격표 보기
	"popup_rental_p" : function(){
		g360.history_record("vr_show_close");g360.history_record("vr_show_close");
		
		$(".account_wrap").css("width", "100%");
		$("#vr_popup").css("background-color", "white");
	
		g360.body_scroll_hide();
		g360.scroll_Top();
		
		var url = "/main/rental/price.html?open";	
		g360.LoadPage("vr_show", url);    //index.jsp파일에 레이어가 존재해서 어디서도 같이 사용 할 수 있다.
		
		$("#vrgallery_popup_title").html("대관서비스 가격표 (Service Price)");
		$("#vr_popup").show();
		$("#vr_popup").fadeIn();
	},
	
	// VR 상세보기
	"showVRDetail" : function(img_id){
		
		g360.isPopupVROpen = "T";
		g360.history_record("detail_btn_close");g360.history_record("detail_btn_close");
		
		
		var _self = this;
		if (!img_id) return;
		var url = g360.root_path + "/main/vr_gallery/main_vrgallery_detail.jsp?id="+img_id;			
		$("#detail_popup").load(url, function(response, status, xhr){
			if (status == "error"){
				var msg = "Site Error : "; 
				g360.gAlert("Error", msg + xhr.status + " " + xhr.statusText , "red", "left");
				
			}else if (status == "success"){
				
				var mz = g360.maxZindex();
				
				$("#detail_background").show();
				_self.body_scroll_hide();
				$('#mobile_detail_back').show();
				$('#detail_popup').find('.btn-detail-close').show();
				$('#detail_popup').addClass('pushmenu-open');
				
				$("#detail_background").css("z-index", ++mz);
				$('#detail_popup').css("z-index", ++mz);
				$('#mobile_detail_back').css("z-index", ++mz);
			}
		});
	},
	
	// 작품 상세보기
	"showArtDetail" : function(img_id){
		
		
		var _self = this;
		
		//중복 클릭을 제거한다.
		event.stopImmediatePropagation();
		
		//캐러셀 정지
		$('#main_art_slider').trigger('stop.owl.autoplay');
		
		g360.history_record("detail_btn_close");g360.history_record("detail_btn_close");
		
		var mz = g360.maxZindex();

		if (!img_id) return;
		var url = _self.root_path + "/main/art/main_art_detail.jsp?id="+img_id;
		$("#detail_background").stop().show();
		_self.body_scroll_hide();
		$('#mobile_detail_back').show();
		$('#detail_popup').find('.btn-detail-close').show();
		$('#detail_popup').addClass('pushmenu-open');
		
		$("#detail_background").css("z-index", ++mz);
		$('#detail_popup').css("z-index", ++mz);
		$('#mobile_detail_back').css("z-index", ++mz);
		
		var loading = setTimeout(function(){
			//$('#loadingbar').show();
			//_self.loadingbar_open('작품을 불러오는 중입니다');
		}, 200);
		
		
		$("#detail_popup").load(url, function(response, status, xhr){
			if (status == "error"){
				var msg = "Site Error : "; 
				g360.gAlert("Error", msg + xhr.status + " " + xhr.statusText , "red", "left");
			
			}
			clearTimeout(loading);
			
			_self.loadingbar_close();
		});
	},
	
	
	
	// 작가 상세보기
	"showArtistDetail" : function(email, ty){
		
		
		//detail_full_header
		g360.history_record("detail_full_header");g360.history_record("detail_full_header");
		
		var _self = this;
		if (!email) return;
		var url = g360.root_path + "/main/artist/main_artist_detail.jsp?id=" + email + (ty ? '&ty=' + ty : '');
					
		
		// 로딩완료후에 띄우지 말고 일단 화면 전환해서 띄우자
		_self.body_scroll_hide();
		$('body').addClass('full-popup-open');
		$('#detail_full_header').addClass('active');
		$('#detail_full_header h1').text(g360.g_lang.Artist_Detail);
		
		$('#detail_full_popup').find('.btn-detail-close').show();
		$('#detail_full_popup').addClass('pushmenu-open');
		var loading = setTimeout(function(){$('#loadingbar').show();}, 200);
		
		var mz = g360.maxZindex();
		$('#detail_full_header').css("z-index", parseInt(mz) + 2);
		$('#detail_full_popup').css("z-index", parseInt(mz) + 1);

		$("#detail_full_popup").load(url, function(response, status, xhr){
			if (status == "error"){
				var msg = "Site Error : "; 
				g360.gAlert("Error", msg + xhr.status + " " + xhr.statusText , "red", "left");
				
			}
			clearTimeout(loading);
			$('#loadingbar').hide();
		});
	},
	
	// 추천 상세보기
	"showRecommandDetail" : function(id, type){
		
		//detail_rec_header
		g360.history_record("detail_rec_header");g360.history_record("detail_rec_header");
		
		var _self = this;
		var url = g360.root_path + "/main/recommend/main_thema.jsp?id="+id;
		
		// 로딩완료후에 띄우지 말고 일단 화면 전환해서 띄우자
		_self.body_scroll_hide();
		$('body').addClass('full-popup-open');
		$('#detail_rec_header').addClass('active');
		$('#detail_rec_header h1').text( (type == 'curator' ? g360.g_lang.Art_consultant : g360.g_lang.By_Theme) + ' '+g360.g_lang.Artist_Mypage15);
		$('#detail_rec_popup').find('.btn-detail-close').show();
		$('#detail_rec_popup').addClass('pushmenu-open');
		var loading = setTimeout(function(){$('#loadingbar').show();}, 200);

		$("#detail_rec_popup").load(url, function(response, status, xhr){
			if (status == "error"){
				var msg = "Site Error : "; 
				g360.gAlert("Error", msg + xhr.status + " " + xhr.statusText , "red", "left");
				
			}
			clearTimeout(loading);
			$('#loadingbar').hide();
		});
	},
	
	// 큐레이터 추천 더보기
	"showCuratorRecList" : function(){
		var _self = this;
		var url = g360.root_path + "/main/recommend/main_curator_recommand_list.jsp";
		
		// 로딩완료후에 띄우지 말고 일단 화면 전환해서 띄우자
		_self.body_scroll_hide();
		$('body').addClass('full-popup-open');
		$('#detail_category_header').addClass('active');
		$('#detail_category_header h1').text(g360.g_lang.Art_Consult_Recomm);
		$('#detail_category_popup').find('.btn-detail-close').show();
		$('#detail_category_popup').addClass('pushmenu-open');
		var loading = setTimeout(function(){$('#loadingbar').show();}, 200);

		$("#detail_category_popup").load(url, function(response, status, xhr){
			if (status == "error"){
				var msg = "Site Error : "; 
				g360.gAlert("Error", msg + xhr.status + " " + xhr.statusText , "red", "left");
				
			}
			clearTimeout(loading);
			$('#loadingbar').hide();
		});
	},
	
	// 분류별 상세보기
	"showCategoryDetail" : function(id){
		
		
		g360.history_record("detail_category_header");g360.history_record("detail_category_header");
		
		var _self = this;
		var url = g360.root_path + "/main/recommend/main_category_thema.jsp?id="+id;
		
		// 로딩완료후에 띄우지 말고 일단 화면 전환해서 띄우자
		_self.body_scroll_hide();
		$('body').addClass('full-popup-open');
		$('#detail_category_header').addClass('active');
		$('#detail_category_header h1').text(g360.g_lang.Themes_by_Category);
		$('#detail_category_popup').find('.btn-detail-close').show();
		$('#detail_category_popup').addClass('pushmenu-open');
		var loading = setTimeout(function(){$('#loadingbar').show();}, 200);

		$("#detail_category_popup").load(url, function(response, status, xhr){
			if (status == "error"){
				var msg = "Site Error : "; 
				g360.gAlert("Error", msg + xhr.status + " " + xhr.statusText , "red", "left");
				
			}
			clearTimeout(loading);
			$('#loadingbar').hide();
		});
	},
	
	// 작가 상세보기
	"showNewsDetail" : function(bun, title){
		
		
		//detail_full_header
		
		g360.history_record("detail_full_header");g360.history_record("detail_full_header");
		
		var _self = this;
		if (!bun) return;
		var url = g360.root_path + "/main/news/main_news_detail.jsp?bun=" + bun;
		
		// 로딩완료후에 띄우지 말고 일단 화면 전환해서 띄우자
		_self.body_scroll_hide();
		$('body').addClass('full-popup-open');
		$('#detail_full_header').addClass('active');
		$('#detail_full_header h1').text(title ? title : '상세보기');
		$('#detail_full_popup').find('.btn-detail-close').show();
		$('#detail_full_popup').addClass('pushmenu-open');
		var loading = setTimeout(function(){$('#loadingbar').show();}, 200);

		$("#detail_full_popup").load(url, function(response, status, xhr){
			if (status == "error"){
				var msg = "Site Error : "; 
				g360.gAlert("Error", msg + xhr.status + " " + xhr.statusText , "red", "left");
				
			}
			clearTimeout(loading);
			$('#loadingbar').hide();
		});
	},
	
	// 마이컬렉션 추가/삭제
	"setMyCollection" : function(dockey, is_del, callback){
		var _self = this;
		if (_self.login_check()) {
			$.ajax({
				url : _self.root_path + '/add_mycollection.mon?dockey=' + dockey + '&mod=' + (is_del ? 'delete' : 'add'),
				success : function(data) {
					if (typeof(callback) == 'function') {
						callback(data);
					}
				}
			});
		} else {
			g360.login_window_max();
			$("#p_login").click();
		}
	},
	
	// VR갤러리 작품상세 페이지에서 마이컬렉션 추가
	"setMyCollectionFromVRDetail" : function(dockey, is_del, callback){
		var _self = this;
		if (_self.login_check()) {
			$.ajax({
				url : _self.root_path + '/add_mycollection.mon?dockey=' + dockey + '&mod=' + (is_del ? 'delete' : 'add'),
				success : function(data) {
					if (typeof(callback) == 'function') {
						callback(data);
					}
				}
			});
		} else {
			top.g360.loginCallback = function() {
				// IFRAME에서 열리기 때문에 로그인 완료시 새로고침
				location.reload();
			}
			top.g360.login_window_max();
			top.$("#p_login").click();
		}
	},
	
	// VR 컬렉션 추가/삭제
	"setVRCollection" : function(dockey, is_del, callback){
		var _self = this;
		if (_self.login_check()) {
			$.ajax({
				url : _self.root_path + '/add_vr_mycollection.mon?dockey=' + dockey + '&mod=' + (is_del ? 'delete' : 'add'),
				success : function(data) {
					if (typeof(callback) == 'function') {
						callback(data);
					}
				}
			});
		} else {
			g360.login_window_max();
			$("#p_login").click();
		}
	},
	
	// 작가 컬렉션 추가/삭제
	"setArtistCollection" : function(email, is_del, callback){
		var _self = this;
		if (_self.login_check()) {
			$.ajax({
				url : _self.root_path + '/add_mycollection_artist.mon?artist=' + email + '&mod=' + (is_del ? 'delete' : 'add'),
				success : function(data) {
					if (typeof(callback) == 'function') {
						callback(data);
					}
				}
			});
		} else {
			g360.login_window_max();
			$("#p_login").click();
		}
	},
	
	
	
	"AI_Search_Recommand" : function(showid, drawid, text, height, width, price){
		
		
		if (text.trim() == ""){
			g360.gAlert("Error", g360.g_lang.AI_Search_Alert1 , "red", "left");
			return false;
		}
		if (height == "") height =0;
		if (width == "") width = 0;
		if (price == "") price = 0;
		
		g360.loadingbar_open(g360.g_lang.AI_Search_Alert2);
		
		
		var data = JSON.stringify({
			text : text,
			height : height,
			width : width,
			price : price
		})
		
		var url = g360.root_path + "/ai_search_recommand.mon";
		$.ajax({
			type : "POST",
			dataType : "json",
			contentType : "application/json; charset=urf-8",
			data : data,
			url : url,
			success : function(data){
			
				g360.loadingbar_close();
				$("#"+showid).show();
				var html = "";
				
				var totalcount = data.hits.total;
				
				if (totalcount > 0){
					var list = data.hits.hits;
					
					for (var i = 0 ; i < list.length; i++){
						var dx = list[i]._source;
//							date: ""
//								email: "nhw@naver.com"
//								etc: "{"art_height":"45","art_width":"38","art_hosu":8,"art_artist":"남현욱","art_title":"Friends in tropical","art_price":900000}"
//								gubun: "art"
//								height: 45
//								id: "nhw@naver.com_fd58207d5f51ca98c187a1aa75c99747.5691374"
//								nickname: "남현욱"
//								price: 900000
//								sortdate: "20190102142720"
//								width: 38
						var email = dx.email;
						var fname = dx.id;
						
						var heigth = dx.height;
						var width = dx.width;
						var price = dx.price;
						
						var etc = JSON.parse(dx.etc);
						var title = etc.art_title;
						var name = etc.art_artist;
						var hosu = etc.art_hosu;
						
						var url = g360.domain + "/artimage/" + email + "/art/preview/" + fname + ".jpg";						
						
						html += "<div class='grid-item col-lg-3 col-md-4 col-sm-4 col-6 '>";
						html += "	<figure>";
						html += "		<img src='"+url+"'   onclick=\"g360.showArtDetail('"+fname.replace(".jpg","")+"')\">";
						html += "		<figcaption>";
						html += "			<h2>"+title+"</h2>";
					//	html += "			<em><img src='/img/btn-artwork-collect-normal.svg' class='btn_artwork_collect_normal'></em>";
						html += "			<p>"+name+"</p>";
						if (hosu == null){
							html += "			<p class='text-muted'>"+height+"cm x "+width+"cm</p>";
						}else{
							html += "			<p class='text-muted'>"+height+"cm x "+width+"cm("+hosu+"호)</p>";
						}
						
						html += "		</figcaption>";							
						html += "	<div class='cost-area'>";
						html += "		<h2>"+g360.comma(g360.setWon(price))+"</h2>";
						html += "	</div>";							
						html += "	</figure>";	
							
						html += "</div>"
					}
					
					
				//	$('#'+drawid).masonry('remove', $('#'+drawid).find('.grid-item'));
					
					$wraper = $("#" + drawid);
											
					$wraper.html(html);				
					
					$wraper.imagesLoaded(function(){	
						
						$wraper.masonry({
							  itemSelector: '.grid-item',
							  columnWidth: 0,
							  isAnimated: true
							});			
						
						$wraper.masonry('reloadItems');
						$wraper.masonry('layout');
						
						});		
				}else{
					$("#" + drawid).html("<dv style='width:100%; text-align:center; font-size:15px; margin-bottom:50px'>"+g360.g_lang.AI_Search_Alert3+"</div>")
				}
						
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	"AI_Recommand" : function(drawid){

		var html = "";
		
		var url = g360.root_path + "/ai_recommand.mon?opt=1";
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				for (var i = 0 ; i < data.length; i++){
					var spl = data[i];
					var inx = data[i].find.lastIndexOf("_");
					var email = data[i].find.substring(0,inx);
					var ssp = data[i].find.split("_");
				//	var email = ssp[0];
					var fname = data[i].find;
					var title = data[i].title;
					var name = data[i].name;
					var height = data[i].height;
					var width = data[i].width;
					var hosu = data[i].hosu;
					var price = data[i].price;
					
					var url = g360.domain + "/artimage/" + email + "/art/preview/" + fname ;	
					
					
					html += "<div class='item'>";			
					html += "	<div class='art-box' style='width:300px; max-height:200px; padding-top:0px' onclick=\"g360.showArtDetail('"+fname.replace(".jpg","")+"')\">";
					html += "		<img style='cursor:pointer' src='"+url+"'  >";
					html += "	</div>";
					html += "</div>";
				}
							
				
				$("#" + drawid).html(html);
				
				$("#" + drawid).owlCarousel({
					loop: true,
					nav: true,
					autoplay: true,
					autoplaySpeed: 1000,
					autoplayHoverPause: true,
					center: true,
					autoWidth: true,
					items: 4,
					responsiveRefreshRate: 100,
					responsive: {
						0:{
							items:2,
							center: true,
							margin: 0
						},
						700:{
							items:2,
							center: true,
							margin: 20
						}
					}
				});
			},
			error : function(e){
				g360.error_alert();
			}
		});
			
		
		
		
		
		
		return false;
		
		
		
		
		
		
		
		
		var url = g360.root_path + "/ai_recommand.mon?opt=1";
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
			
				
				var count = data.length;
				var tcnt = 0;
				if (count > 4){
					tcnt = 4;
				}else{
					tcnt = data.length;
				}
				
				var html = "";
				for (var i = 0 ; i < tcnt ; i++){
					var spl = data[i];
					var inx = data[i].find.lastIndexOf("_");
					var email = data[i].find.substring(0,inx);
					var ssp = data[i].find.split("_");
				//	var email = ssp[0];
					var fname = data[i].find;
					var title = data[i].title;
					var name = data[i].name;
					var height = data[i].height;
					var width = data[i].width;
					var hosu = data[i].hosu;
					var price = data[i].price;
					
					var url = g360.domain + "/artimage/" + email + "/art/preview/" + fname ;						
											
					html += "<div class='grid-item col-lg-3 col-md-4 col-sm-4 col-6 '>";
					html += "	<figure>";
					html += "		<img src='"+url+"'   onclick=\"g360.showArtDetail('"+fname.replace(".jpg","")+"')\">";
					html += "		<figcaption>";
					html += "			<h2>"+title+"</h2>";
				//	html += "			<em><img src='/img/btn-artwork-collect-normal.svg' class='btn_artwork_collect_normal'></em>";
					html += "			<p>"+name+"</p>";
					if (hosu == null){
						html += "			<p class='text-muted'>"+height+"cm x "+width+"cm</p>";
					}else{
						html += "			<p class='text-muted'>"+height+"cm x "+width+"cm("+hosu+"호)</p>";
					}
					
					html += "		</figcaption>";							
					html += "	<div class='cost-area'>";
					html += "		<h2>"+g360.comma(g360.setWon(price))+"</h2>";
					html += "	</div>";							
					html += "	</figure>";	
						
					html += "</div>"
						

					
					
//						html += "<div class='grid-item col-lg-3 col-md-4 col-sm-4 col-6 '>";
//						html += "	<figure>";
//						html += "		<a href='/art/view.html'><img src='/img/img-art-01.jpg'></a>";
//						html += "		<figcaption>";
//						html += "			<h2>하늘과 땅 24-IX-73 #320</h2>";
//						html += "	        <em><img src='/img/btn-artwork-collect-normal.svg' class='btn_artwork_collect_normal'></em>";
//						html += "	        <p>김환기 ㅣ Kim WhanKi</p>";
//						html += "	        <p class='text-muted'>263.5 x 206.5cm(000호)</p>";
//						html += "		</figcaption>";
//						html += "		<div class='cost-area'>";
//						html += "		  <h2>₩ 1,200,000</h2>";
//						html += "		</div>";
//						html += "  </figure>";
//						html += "</div>";						
				}
				$wraper = $("#" + drawid);
				
									
				$wraper.html(html);				
				
				$wraper.imagesLoaded(function(){					
					$wraper.masonry({
						  itemSelector: '.grid-item',
						  columnWidth: 0,
						  isAnimated: true
						});			
					});				
				
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	"opensearchbar" : function(){
		$("#main_top_search").click();
	},
	
	
	"open_request_art" : function(){
		if (g360.login_check()){
			if (g360.UserInfo.gubun == "normal"){
				g360.LoadPage("body_content", g360.root_path + "/client/art_request/art_recommand.jsp");
				$("#loginOK2").click();
				return false;
			}else{
				g360.gAlert("Error", g360.g_lang.Art_Artist_Error1 , "red", "left");
			}

		}else{
			g360.login_window_max();
			$("#p_login").click();
		}
	},
	
	
	// html Escape처리
	"escapeHTML" : function(str) {
		return $('<div/>').text(str).html().replace(/\n|\r\n/g, '<br>');
	},
	// 전체 레이어가 열려있는지 체크함
	"hideFullBodyScroll" : function() {
		if ($('.full-popup-title').hasClass('active')) return;
		$('body').removeClass('full-popup-open');
	},
	"showBodyScroll" : function() {
		var $rec_popup = $('#detail_rec_popup');
		var $full_popup = $('#detail_full_popup');
		var $popup = $('#detail_popup');
		
		if ($('.full-popup-title').hasClass('active')) return;
		// 팝업이 없을 때만 Body 스크롤을 표시 
		if (!$rec_popup.hasClass('pushmenu-open') && !$full_popup.hasClass('pushmenu-open') && !$popup.hasClass('pushmenu-open')) {
			$("body").removeClass("hidden-scroll");
		}
	},
	
	"makeRandom" : function(length){
		return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
	},
	
		
	
	"maxZindex" : function(){
		var zIndexMax = 0;
		$("header, div").each(function(){
			if (!$(this).is(':visible')) return true;
			if ($(this).hasClass('jconfirm')) return true;	// 최상위 레이어 컨펌창 예외처리
			var z = parseInt($(this).css("z-index"));
			if (z > zIndexMax) zIndexMax = z;
		});
		return parseInt(zIndexMax);
	},
	
	"removeComma" : function(str){
		return str.replace(/\,/gi, "");
	},
	
	"save_history_now" : function(opt){
		var url = g360.root_path + "/history_save.mon?key=" + opt;
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(res){
				
			},
			error : function(e){
				
			}
		})
	},
	
	
	"history_record" : function(before){
		
		//if (g360.save_history){
		//	g360.save_history_now(before);
		//}
		
		try{

			if (g360.history == false){
				var stateObj = {before : before};
			//	history.pushState(stateObj, "", "/");
				history.pushState(stateObj, "", location.href);
			}
		}catch(e){}
		
	},
	
	"history_record_rental" : function(before){

		try{
			if (g360.history == false){
				var stateObj = {before : before};
				history.pushState(stateObj, "", location.href);
				history.pushState(stateObj, "", location.href);
			}
		}catch(e){}
		
	},
	
	"popup_aipainter_start" : function(){
		var _self = this;
		var html = "";
		
		html += "<div class='layer_wrap intro'>";
		html += "<h2 class='bg_white'>"+g360.g_lang.AIPainter+"</h2>";
		html += "	<button class='btn btn_layer_close'>"+g360.g_lang.Close+"</button>";
		html += "	<div class='curator_rmd' style='background:#fafafa;'>";
		html += "		<div id='curator_rmd_nav_btn'></div>";
		html += "		<div id='rec_sliderx' class='act-slider rmd_slider owl-carousel owl-theme' >";
		html += "			<div class='item'>";
		html += "				<div class='art-box2' style=\"background-image:url('/img/request/ai-paint-walk-through-01.png')\">";
		html += "					<p>"+g360.g_lang.Artwork_request15+"</p>";
		html += "				</div>";
		html += "			</div>";
		html += "			<div class='item'>";
		html += "				<div class='art-box2' style=\"background-image:url('/img/request/ai-paint-walk-through-02.png')\">";
		html += "					<p>"+g360.g_lang.Artwork_request16+"</p>";
		html += "				</div>";
		html += "			</div>";
		html += "			<div class='item'>";
		html += "				<div class='art-box2' style=\"background-image:url('/img/request/ai-paint-walk-through-03.png')\">";
		html += "					<p>"+g360.g_lang.Artwork_request17+"</p>";
		html += "				</div>";
		html += "			</div>";
		html += "			<div class='item'>";
		html += "				<div class='art-box2' style=\"background-image:url('/img/request/ai-paint-walk-through-04.png')\">";
		html += "					<p>"+g360.g_lang.Artwork_request18+"</p>";
		html += "				</div>";
		html += "			</div>";
		html += "			<div class='item'>";
		html += "				<div class='art-box2' style=\"background-image:url('/img/request/ai-paint-walk-through-05.png')\">";
		html += "					<p>"+g360.g_lang.Artwork_request19+"</p>";
		html += "				</div>";
		html += "			</div>";
		html += "		</div>";
		html += "	</div>";
		html += "	<div class='bottom_area bg_white'>";
		html += "		<button class='btn btn_violet btn_start' id='ai_painter_start' onclick=\"g360.aiPainter_Start();\">"+g360.g_lang.Start+"</button>";
		html += "	</div>";
		html += "</div>";
		
		$("#aipainter_start").html(html);
		
		g360.body_scroll_hide();
		$("#aipainter_start").popup({
			blur: false,
			onclose: function(){
				g360.body_scroll_show();
			},
			position: {my:'center', at:'center', of:window}
		});
		$("#aipainter_start").popup('show');
		$("#aipainter_start").find('.btn_layer_close').on('click', function(){
			$("#aipainter_start").popup('hide');
		});
		
		
		// 캐러셀 적용
		$('#rec_sliderx').owlCarousel({
			items : 1,
			loop: false,
			nav: true,
			navContainer: '#curator_rmd_nav_btn',
			navText: ['', ''],
			autoplay: false,
			responsiveRefreshRate: 100
		});
		
	},
	
	"aiPainter_Start" : function(is_first){
		var _self = this;
	
		// 로그인 체크
		if (!g360.login_check()) {
			$("#aipainter_start").popup('hide');
			g360.login_window_max();
			g360.loginCallback = function(){
				g360.aiPainter_Start(is_first);
			}
			$("#p_login").click();
			return;
		}
		
		// 최초 생성시 요청시 설명 레이어 오픈
		if (is_first) {
			_self.popup_aipainter_start();
			return;
		}
		
		var url = g360.root_path + "/template_images.mon";
		$.ajax({
			dataType : "json",
			url : url,
			success : function(data){
			
				
				var tdata = data[0];
				var userdata = data[1];
				
				var html = "";
				html += "<div class='layer'>";
				html += "	<div class='layer_wrap style'>";
				html += "		<h2 class='bg_white'>"+g360.g_lang.AIPainter+"</h2>";
				html += "		<button class='btn btn_layer_close'>"+g360.g_lang.Close+"</button>";
				html += "		<div class='layer_content bg_white'>";
				
				html += "			<div class='layer_content_b'>";
				
				html += "				<div class='content_layer_wrapper file'>";
				

				html += "<!-- 최근 업로드 이미지 시작 -->";
				html += "					<div class='wrap_latest_sh' style='max-height:none;'> <!-- wrap_latest_sh 클래스 추가 -->";
				html += "						<h3 class='ai_title_sh'>"+g360.g_lang.Curie_7+"</h3>";
				html += "							<div>";
				html += "							  <div class='latest_thumb_sh'> ";
				for (var k = 0; k < userdata.length; k++){
					var udata = userdata[k];
				//var email = udata.filename.split("_")[0];
					html += "							<div><div class='template_wrapper' id='"+udata.request_upload_img+"' style=\"background-image:url('/artimage/"+udata.email+"/artRequest_AI/expand/"+udata.request_upload_img+"_small.jpg')\"></div></div>";
				}
				html += "							</div>";
				html += "						</div>";
				html += "					</div>";
				html += "<!-- 최근 업로드 이미지 끝 -->";			
				
				

				html += "					<div class='thumb_b' id='xxpp'>";
				html += "						<form method='post' action='/FileUpload_AIPainter.gu' enctype='multipart/form-data' class='dropzone' id='Mydropzone27'>";
				html += "							<input type='hidden' name='filepath' value='artRequest_AI' />";
				html += "							<input type='hidden' name='preview' value='true' />";
				html += "						</form>";
				html += "					</div>";

				html += "				</div>";
				
				html += "				<div class='content_layer_wrapper list'>";
				html += "					<h3 class='ai_title_sh'>"+g360.g_lang.Curie_8+"</h3>";
				html += "					<ul id='ai_painter_ul'>";
			
				for (var i = 0 ; i < tdata.length; i++){
					var info = tdata[i];
					if (typeof(info.artist) == "undefined"){
						html += "					<li id='"+info.name+"'><div class='template_wrapper' style=\"background-image:url('/artimage/ai_sample/"+info.name+"_small.jpg')\"></div></li>";
					}else{
						html += "					<li id='"+info.name+"'><div class='template_wrapper' style=\"background-image:url('/artimage/ai_sample/"+info.name+"_small.jpg')\"><p>"+info.title+"</p><span>"+info.artist+"</span></div></li>";
					}
					
				}
				
				html += "					</ul>";
				html += "				</div>";
				html += "			</div>"; // layer_content_b
				
				html += "			<div class='email_area'>";
				html += "				<dl>";
				html += "					<dd>";
				html += "						<div class='custom-control custom-checkbox'>";
				html += "							<input type='checkbox' class='custom-control-input' id='ck_send_mail'>";
				html += "							<label class='custom-control-label' for='ck_send_mail'>"+g360.g_lang.Artwork_request7+"</label>";
				html += "						</div>";
				html += "						<input type='text' id='ai_emailaddress' class='txt' /> ";
				html += "					</dd>";
				html += "				</dl>";
				html += "			</div>";
				html += "		</div>";
				html += "		<div class='bottom_area bg_white'>";
				html += "			<button class='btn btn_violet' id='ai_painter_request2'>"+g360.g_lang.Artwork_request8+"</button>";
				html += "		</div>";
				html += "	</div>";
				html += "</div>";


				$("#aipainter_start").html(html);
								
				// 최근 이미지 없는 경우 처리
				if (userdata.length == 0) {
					$('#aipainter_start .wrap_latest_sh').hide();
					$('#aipainter_start .layer_content_b').addClass('no-recent-img');					
				}
				
				$('.latest_thumb_sh').owlCarousel({
					lazyLoad : true,
					items : 3,
					margin : 10,
					loop : false,
					dots : false,
					mouseDrag : true,
					touchDrag : true,
					smartSpeed : 1000,
					onlyLeftDirection: true 
				});
							
				
				
				// 팝업띄우기
				g360.body_scroll_hide();
				
				$("#aipainter_start").popup({
					blur: false,
					onclose: function(){
						g360.body_scroll_show();
					},
					position: {my:'center', at:'center', of:window}
				});
				$("#aipainter_start").popup('show');
				$("#aipainter_start").find('.btn_layer_close').on('click', function(){
					$("#aipainter_start").popup('hide');
				});
				
				
				if (g360.login_check()){
					var email = g360.UserInfo.email;
					$("#ai_emailaddress").val(email);
				}
				
				// 닫기
				$('#aipainter_start .btn_layer_close').on('click', function(){
					$('#aipainter_start').popup('hide');
				});
				
				// 템플릿 선택
				$("#ai_painter_ul li").on("click", function(e){
					
					_self.cur_tmpl_id = event.currentTarget.id;
					$("#ai_painter_ul li").removeClass('on');
					$("#" + _self.cur_tmpl_id).addClass("on");
				});
				
				
				$(".latest_thumb_sh .template_wrapper").on("click", function(e){		
					
					_self.cur_tmpl_id = event.currentTarget.id;
					
					if (g360.curAIPainterimg == _self.cur_tmpl_id){
						$(".template_wrapper").removeClass('on');
						g360.curAIPainterimg = "";
					}else{
						$(".template_wrapper").removeClass('on');
						$(this).addClass("on");
						g360.curAIPainterimg = _self.cur_tmpl_id;
					}
					
					
				});
				
				
				// 체크박스
				$('#ck_send_mail').on('click', function(){
					if ($(this).is(':checked')){
						//$('#ai_emailaddress').show();
						//받는 메일 주소 변경 불가능
					} else {
						$('#ai_emailaddress').hide();
					}
				});
				
				// 요청하기
				$("#ai_painter_request2").on("click", function(event){
					
					
					if (Mydropzone27.files.length == 0 && g360.curAIPainterimg == ""){
						g360.gAlert("Info", g360.g_lang.Artwork_request_Alert1 , "blue", "top");
						return false;
					}
					
					var check_img = $("#ai_painter_ul li.on").attr('id');
					if (!check_img){
						g360.gAlert("Info", g360.g_lang.Artwork_request_Alert2 , "blue", "top");
						return false;
					}
					g360.loadingbar_open(g360.g_lang.Artwork_request_Alert3);
					_self.ai_painter_submit();
				});
				
				// 스크롤바
				if (!_self.isMobile()){
					//$('#aipainter_start .list').mCustomScrollbar({				
					$('#aipainter_start #ai_painter_ul').mCustomScrollbar({
						theme:"minimal-dark",
						mouseWheelPixels: 400,
						mouseWheel:{ preventDefault: false },
						advanced:{
							updateOnContentResize: true
						},
						autoExpandScrollbar: true
					});			
				} else {
					$('#aipainter_start #ai_painter_ul').css({
						'overflow': 'auto',
						'padding-right' : '10px'
					});
				}
				
				_self.upload_design_set();

				
			},
			error : function(e){
				g360.error_alert();
			}
		})
				
	},
	
	"ai_painter_submit" : function(){
	
		//만약에 이전 업로드한 파일을 다시 사용한다면 실제 파일 업로드 없이 선택한 파일 정보를 그대로 사용한다.

		if (Mydropzone27.files.length > 0){
			Mydropzone27.processQueue();
		}else if (g360.curAIPainterimg != ""){
			g360.ai_request_uploadFrom(g360.curAIPainterimg);
		}else{
			g360.gAlert("Error",g360.g_lang.Artwork_request_Alert4 , "red", "left");
			return false;
		}
		
		
	},
	
	"upload_design_set" : function(){
		var _self = this;
		//Dropzone.autoDiscover = false;
		Dropzone.options.Mydropzone27 = {
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
		        dictDefaultMessage: '<p><span>'+g360.g_lang.Artwork_request13+'</span><span class="file-type">(.jpg, .gif)</span><button type="button" class="btn btn_file">'+g360.g_lang.Artwork_request14+'</button></p>',
				accept : function(file, done){
					done();
				},
				
				fallback: function(){
					g360.gAlert("Error",g360.g_lang.HangingArt_6, "red", "left");
				},
				
				init: function(){
					
					//this.hiddenFileInput.click(); //opens the file select dialogue
					
					this.on("maxfilesexceeded", function(file){
					
						this.removeFile(file);
						g360.gAlert("Error",g360.g_lang.HangingArt_7, "red", "left");
					});
					
					this.on("addedfile", function (file) {
	                    var _this = this;
	                //    gArtistInfo.file1 = file;
	                    if ($.inArray(file.type, ['image/jpeg', 'image/jpg', 'image/gif']) == -1) {
	                    	g360.gAlert("Error",g360.g_lang.Artwork_request6 , "red", "left");
	                        _this.removeFile(file);
	                    }
	                });
					
					Mydropzone27 = this; //Closer
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
						_self.ai_request_uploadFrom(res.filename);						
					}else{
						//g360.load
						g360.gAlert("Error",g360.g_lang.Art_Detail_Alert9, "red", "left");
						g360.loadingbar_close();
					}
				},
				error : function(file, response){
					g360.loadingbar_close();
					return false;
				}
			}
			
			$("#Mydropzone27").dropzone();	
			return false;
	},
	
	"ai_request_uploadFrom" : function(upload_file){
		var _self = this;
		var send_email = $.trim($("#ai_emailaddress").val());
		var ischeck = $("#ck_send_mail").is(":checked");
		var tmpl_id = $("#ai_painter_ul li.on").attr('id');
		var data = JSON.stringify({
			request_upload_img 	: upload_file,
			request_is_send_mail: ischeck,
			request_select_img	: tmpl_id,
			request_send_mail	: send_email,
			request_status		: "1"
		});
		
		//g360.loadingbar_open("Gallery360 인공지능 큐리가 작품을 제작하고 있습니다.....");
		
		$.ajax({
			type : "Post",
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : g360.root_path + "/art_request_save_ai_painter.mon",
			error : function(){
				g360.error_alert();
				g360.loadingbar_close();
			}
		}).then(function(xdata){
			//큐리서버에 호출해서 실시간 변환을 요청
			$.ajax({
				url : g360.root_path + "/call_curie_aipainter_realtime.mon?dockey="+ xdata.dockey,
				success : function(){
					_self.display_complete2(xdata.dockey, upload_file, tmpl_id);
				},
				error : function(){
					g360.error_alert();
					g360.loadingbar_close();
				}
			});			
		}, function(){
			g360.error_alert();
			g360.loadingbar_close();
		});
	},
	
	"display_complete2" : function(dockey, filename, check_img){
		var html = "";
		var inx = dockey.lastIndexOf("_");
		var email = dockey.substring(0,inx);
		//var spl = dockey.split("_");
		var url = "/artimage/"+email+"/artRequest_AI/result/"+dockey+"_out_water.png";
		
		var url1 = "/artimage/"+email+"/artRequest_AI/expand/"+filename+"_small.jpg";
		var url2 = "/artimage/ai_sample/"+check_img+"_small.jpg";
		///artimage/ygkim@gmail.com/artRequest_AI/result/ygkim@gmail.com_20190410005719_out_water_small.png
		html += "<div class='layer'>";
		html += "	<div class='layer_wrap complete'>";
		html += "	<h2 class='bg_white'>"+g360.g_lang.AIPainter+"</h2>";
		html += "	<button class='btn btn_layer_close' onclick=\"g360.close_popup('aipainter_start')\">"+g360.g_lang.Close+"</button>";
		
		
		html += "<div style=\"width:100%;padding:10px;height:calc(100% - 122px)\">";
		html += "	<div style=\"width:100%;height:100%;position:relative;\">";
		html += "		<div class=\"thm_s\">";
		html += "			<div style=\"background-image:url('" + url1 + "');\"></div>";
		html += "			<div style=\"background-image:url('" + url2 + "');\"></div>";
		html += "		</div>";
		html += "		<div class=\"thm_b\" style=\"background-image:url('" + url + "');\"></div>";
		html += "  </div>";
		html += "</div>";
		
		html += "<div>";
		html += "	<div class='bottom_area bg_white'>";
		html += "		<button class='btn btn_gray btn_painter' onclick=\"g360.aiPainter_Start()\">"+g360.g_lang.Artwork_request10+"</button>";
		html += "		<button class='btn btn_violet btn_ok' onclick=\"g360.curie_art_request('" + dockey + "')\">"+g360.g_lang.Artwork_request11+"</button>";
		html += "	</div>";
		html += "</div>";
		
		$("#aipainter_start").html(html);
		
		if (window.gCurie && window.gCurie.wrapper.is(':visible')){
			gCurie.displayNewAiPainter();
		}
		g360.loadingbar_close();
	},
	
	"isMobile": function(){
		var md=new MobileDetect(window.navigator.userAgent);
		return md.mobile();
	},
	
	"showToastMsg":function(msg, m_sec){
		var _self = this;
		
		var $msg = $('.toast-msg-wrapper');
		
		// 기존에 떠 있는 경우 삭제처리
		if ($msg.length) $msg.remove();
		
		$msg = $('<div class="toast-msg-wrapper"></div>');
		$msg.text(msg).css({
			'z-index': _self.maxZindex() + 1,
			'top': 'unset',
			'bottom': '10%'
		});
		$('body').append($msg);
		
		$msg.fadeIn();
		setTimeout(function(){
			$msg.fadeOut();
		}, (m_sec||2000));
	},
	
	// 이미지 Coppie 관련 작업
	"readFileImage":function(input, opt){
		
		//언어처리
		$("#layer_image_edit h5").text(g360.g_lang.Image_Crop_Title);
		$("#layer_image_edit #image_edit_cancel").text(g360.g_lang.Cancel);
		$("#layer_image_edit #image_edit_ok").text(g360.g_lang.OK);
		
		
		var _self = this;
		var rawImg;
		var $crop = $('#image_edit_body');
		
		var def_opt = {
			width:200,
			height:200,
			wrapper_width: 300,
			wrapper_height: 300,
			type: 'square',
			email: _self.UserInfo.email,
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
						
						var upload_promise = _self.photoUpload(data, opt.imgId, opt.email);
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
		}
		
		
		initCroppie();
	},
	
	"photoUpload" : function(upload_data, img_id, target_email){
		var _self = this;
		
		var fd = new FormData();
		fd.append('ImageId', img_id);
		fd.append('ImageBody', upload_data); //업로드를 젤 최종적으로 처리
		var res = $.ajax({
			type :'POST',
			url	:'/Photo64.gu?key='+target_email,
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
	
	// 배열 섞기
	"arrayShuffle" : function(a){
	    var j, x, i;
	    for (i = a.length - 1; i > 0; i--) {
	        j = Math.floor(Math.random() * (i + 1));
	        x = a[i];
	        a[i] = a[j];
	        a[j] = x;
	    }
	    return a;		
	},
	
	"goto_purchase_list" : function(){
		$("#mngMypuchase_client").click();
	},
	
	"gAlert" : function(title, content, type, animation, callback){
		
		type = "default";
		title = " ";
		animation = "top";
		$.alert({
			title : title,
			content : content + "<hr>",
			type : type,
			closeIcon : true,
			closeIconClass : "fa fa-close",
			columnClass : "small",
			backgroundDismiss: true,
			animation : animation,
			animateFromElement : false,
			escapeKey : true,
			animationBounce : 2,
			buttons : {
				OK : {
					keys: ['enter'],
					text : g360.g_lang.OK,		
					btnClass : "btn-"+type,
					action : function(){
						if (callback) callback();
					}
				}				
			}
		});
	},
	
	//1. gAlert_email : 기존 gAlert 메서드와 동일, 인증 메일 재발송만 추가
	//2. gAlert_email2 : 로그인창에 입력했던 이메일로 메일 재전송할지 확인창
	//3. gAlert_email3 : java로 가서 메일전송
	
	"gAlert_email" : function(title, content, type, animation, id){
		
		var callback = null;
		
		type = "default";
		title = " ";
		animation = "top";
		$.alert({
			title : title,
			content : content + "<hr>",
			type : type,
			closeIcon : true,
			closeIconClass : "fa fa-close",
			columnClass : "small",
			backgroundDismiss: true,
			animation : animation,
			animateFromElement : false,
			escapeKey : true,
			animationBounce : 2,
			buttons : {
				
				FIND : {
					text : g360.g_lang.Resend_Mail,		
					action : function(){
						if (callback) callback();
						g360.gAlert_email2(id);
					}
				},	
				OK : {
					keys: ['enter'],
					text : g360.g_lang.OK,		
					btnClass : "btn-"+type,
					action : function(){
						if (callback) callback();
					}
				}
			}
		});
	},
	
	"gAlert_email2" : function(id){
		
		var title = g360.g_lang.Resend_Mail;
		var type = "default";
		var animation = "top";
		var callback = null;
		
		var content = "<br>" + g360.g_lang.Email2_Alert1 + id + g360.g_lang.Email2_Alert2;
		
		$.alert({
			title : title,
			content : content + "<hr>",
			type : type,
			closeIcon : true,
			closeIconClass : "fa fa-close",
			columnClass : "small",
			backgroundDismiss: true,
			animation : animation,
			animateFromElement : false,
			escapeKey : true,
			animationBounce : 2,
			
			buttons : {
				OK : {
					text : g360.g_lang.OK,	
					action : function(){
						if (callback) callback();
						g360.gAlert_email3(id);
					}
				}
			}
		
		});
	},
	
	"gAlert_email3" : function(id){
		
		//id로 닉네임, password 가져온뒤 decode하기
		var data = JSON.stringify({
			uid : id
		});
		
		var url = g360.root_path + "/retry_sendEmail_1.mon";
		
		$.ajax({
			type : "POST",
			dataType : "json",
			data : data,
			contentType : "json/application; charset=utf-8",
			url : url,
			success : function(data){
				if(data.res=="not_found"){
					//존재하지 않는 이메일입니다. 회원가입 후 다시 시도해 주세요.
					g360.gAlert("Info", g360.g_lang.Email3_Alert1, "red", "left");
				}else{
					if(data.result=="OK"){
						g360.gAlert("Info",g360.g_lang.Email3_Alert2 + id + g360.g_lang.Email3_Alert3, "red", "left");								
					}
				}
			}
		});
		
	},
	
	"gAlert_focus" : function(title, content, type, animation, id){
		
		type = "default";
		title = " ";
		animation = "top";
		$.alert({
			title : title,
			content : content + "<hr>",
			type : type,
			closeIcon : true,
			closeIconClass : "fa fa-close",
			columnClass : "small",
			backgroundDismiss: true,
			animation : animation,
			animateFromElement : false,
			escapeKey : true,
			animationBounce : 2,
			buttons : {
				OK : {
					keys: ['enter'],
					text : g360.g_lang.OK,		
					btnClass : "btn-"+type,
					action : function(){						
					}
				}				
			},
			onDestroy: function () {
				if (id != "" && typeof(id) != "undefined"){
					$("#" + id).focus();
				}
				
		    },
		});
	},
	
	"gConfirm":function(msg, callback){
		$.confirm({
			title : " ",
			content : msg +"<hr>",
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
					keys: ['enter'],
					text :  g360.g_lang.OK,
					btnClass : "btn-default",
					action : function(){
						if (callback) callback();
					}
				},
				cancel : {
					keys: ['esc'],
					text : g360.g_lang.Cancel,
					btnClass : "btn-default",
					action : function(){
						
					}
				}
			}
		});	
		
	},
	
	
	
	
	"user_info_open2" : function(email, su_name, su_address, su_mobile){
		var url = g360.root_path + "/search_user_info.mon?id="+email;
		$.ajax({
			Type : "GET",
			dataType : "json",
			contentType : "json/application; charset=utf-8",
			url : url,
			cache : false,
			success : function(data){
				
		
				var address = data.first_address + " " + data.second_address;
				var mobile = data.mobile;
				var name = data.name;
				
				var html = "";
				
				//	html += "<p>Loading content asynchronously! (Lazy loading content)<br>You can preview this file table.html</a></p>";
					
					
						html += "<table class='table table-bordered table-condensed table-striped'>";
						html += "	<tr>";
						html += "	   <th>"+g360.g_lang.Name+"</th>";
						html += "      <th>"+g360.g_lang.Address+"</th>";						
						html += "      <th>"+g360.g_lang.Contact+"</th>";
						html += "   </tr>";						
						
						html += "<tr>";						
						html += "	   <td>"+name+"</td>";
						html += "      <td>"+address +"</td>";
						html += "      <td>"+mobile+"</td>";								
						html += "</tr>";		
						
						
						html += "	<tr>";
						html += "	   <th>예금주</th>";
						html += "      <th>은행명</th>";						
						html += "      <th>입금 통장 번호</th>";
						html += "   </tr>";				
						
						
						
						html += "<tr>";						
						html += "	   <td>"+data.accountName+"</td>";
						html += "      <td>"+data.bankName +"</td>";
						html += "      <td>"+data.accountNum+"</td>";								
						html += "</tr>";	
						
						
						
							html += "	<tr>";
							html += "	   <th>수신자</th>";
							html += "      <th>수신자주소</th>";						
							html += "      <th>수신자 연락처</th>";
							html += "   </tr>";				
							
							
							
							html += "<tr>";						
							html += "	   <td>"+su_name+"</td>";
							html += "      <td>"+su_address +"</td>";
							html += "      <td>"+su_mobile+"</td>";								
							html += "</tr>";		
							
								
						
						
						
						
						html += "</table>";
					
									
					
					 $.dialog({
		                title: '구매자 배송지 정보',
		                content: html,
		                animation: 'scale',
		                columnClass: 'large',
		                closeAnimation: 'scale',
		                backgroundDismiss: false,
		            });
				
	
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	"user_info_open" : function(email, isadmin){
		var url = g360.root_path + "/search_user_info.mon?id="+email;
		$.ajax({
			Type : "GET",
			dataType : "json",
			contentType : "json/application; charset=utf-8",
			url : url,
			cache : false,
			success : function(data){
				
		
				var address = data.first_address + " " + data.second_address;
				var mobile = data.mobile;
				var name = data.name;
				
				var html = "";
				
				//	html += "<p>Loading content asynchronously! (Lazy loading content)<br>You can preview this file table.html</a></p>";
					
					
						html += "<table class='table table-bordered table-condensed table-striped'>";
						html += "	<tr>";
						html += "	   <th>이름</th>";
						html += "      <th>배송지 주소</th>";						
						html += "      <th>연락처</th>";
						html += "   </tr>";						
						
						html += "<tr>";						
						html += "	   <td>"+name+"</td>";
						html += "      <td>"+address +"</td>";
						html += "      <td>"+mobile+"</td>";								
						html += "</tr>";		
						
						if (isadmin == "T"){
							html += "	<tr>";
							html += "	   <th>예금주</th>";
							html += "      <th>은행명</th>";						
							html += "      <th>입금 통장 번호</th>";
							html += "   </tr>";				
							
							
							
							html += "<tr>";						
							html += "	   <td>"+data.accountName+"</td>";
							html += "      <td>"+data.bankName +"</td>";
							html += "      <td>"+data.accountNum+"</td>";								
							html += "</tr>";		
						}
						
						
						
						html += "</table>";
					
									
					
					 $.dialog({
		                title: '구매자 배송지 정보',
		                content: html,
		                animation: 'scale',
		                columnClass: 'large',
		                closeAnimation: 'scale',
		                backgroundDismiss: false,
		            });
				
	
			},
			error : function(e){
				g360.error_alert();
			}
		})
		
		
		
	},
	
	
	"art_qu_save" : function(){
		//debugger;
		var subject = $("#q_subject").val();
		var name = $("#q_name").val();
		var email = $("#q_email").val();
		var tel = $("#q_tel").val();
		var content = $("#q_content").val();
		
		var art_code = $("#detail_art_artkey").text();
		var art_artist = $("#detail_art_artist").text();
		var art_title = $("#detail_art_title").text();
		
			
		var data = JSON.stringify({	
			subjet : subject,
			name : name,
			email : email,			
			tel : tel,
			art_code : art_code,
			art_artist : art_artist,
			art_title : art_title,
			content : content
		});
			
		
		var url = contextpath + "/art_qu_save.mon";
		$.ajax({
			type : "POST",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			data : data,
			url : url,
			success : function(data){
				if (data.result == "OK"){
					g360.gAlert("Info", "정상적으로 등록되었습니다.", "red", "left");
					g360.close_popup("art_question");
					
					$("#q_subject").val("");
					$("#q_name").val("");
					$("#q_email").val("");
					$("#q_tel").val("");
					$("#q_content").val("");
				}
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	
	"art_dbook_save" : function(){
		//debugger;
		var subject = $("#q_subject2").val();
		var name = $("#q_name2").val();
		var email = $("#q_email2").val();
		var tel = $("#q_tel2").val();
		var content = $("#q_content2").val();
		
		var art_code = $("#detail_art_artkey").text();
		var art_artist = $("#detail_art_artist").text();
		var art_title = $("#detail_art_title").text();
		
			
		var data = JSON.stringify({	
			subjet : subject,
			name : name,
			email : email,			
			tel : tel,
			art_code : art_code,
			art_artist : art_artist,
			art_title : art_title,
			content : content
		});
			
		
		var url = contextpath + "/art_dbook_save.mon";
		$.ajax({
			type : "POST",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			data : data,
			url : url,
			success : function(data){
				if (data.result == "OK"){
					g360.gAlert("Info", g360.g_lang.Dbook_Alert, "red", "left");
					g360.close_popup("art_question");
					
					$("#q_subject").val("");
					$("#q_name").val("");
					$("#q_email").val("");
					$("#q_tel").val("");
					$("#q_content").val("");
				}
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	"openinvoice_new" : function(code1, code2){
		
		if (code1 != "" && code2 != ""){
			var url = g360.root_path + "/invoiceapi.gu?ty=3&cc="+code1+"&ic="+code2;
			$.ajax({
				type : "GET",
				cache : false,
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(data){
					
					var spl = data.trackingDetails;
					var html = "";
					
				//	html += "<p>Loading content asynchronously! (Lazy loading content)<br>You can preview this file table.html</a></p>";
					
					if (typeof(spl) != "undefined"){
						
						html += "<table class='table table-bordered table-condensed table-striped'>";
						html += "	<tr>";
						html += "	   <th>순번</th>";
						html += "      <th>구분</th>";
						html += "      <th>담당자</th>";
						html += "      <th>연락처</th>";
						html += "      <th>장소</th>";
						html += "      <th>시간</th>";
						html += "   </tr>";						
						
					
						for (var i = 0 ; i < spl.length; i++){
							var info = spl[i];
							
							html += "<tr>";						
							html += "	   <td>"+(i+1)+"</td>";
							html += "      <td>"+info.kind +"</td>";
							html += "      <td>"+info.manName+"</td>";
							html += "      <td>"+info.telno+"</td>";
							html += "      <td>"+info.where+"</td>";
							html += "      <td>"+info.timeString+"</td>";								
							html += "</tr>";								
						}		
						
						html += "</table>";
					}else{
						html += "<table class='table table-bordered table-condensed table-striped'>";
						html += "	<tr>";
						html += "	   <th>"+data.msg+"</th>";
						html += "   </tr>";
						html += "</table>";
						
					}
									
					
					 $.dialog({
		                title: '배송 정보',
		                content: html,
		                animation: 'scale',
		                columnClass: 'large',
		                closeAnimation: 'scale',
		                backgroundDismiss: true,
		            });
				},
				error : function(e){
					g360.error_alert();
				}
			});
		}else{
			g360.gAlert("Error", g360.g_lang.No_Shipping_Info_Alert , "red", "left");
		}	    
	   
	},
	
	"getLinkPath":function(type, id){
		var link_url = location.protocol + "//" + location.host + "/index.jsp";
		if (type == 'link_artist_art') {
			link_url += "?ty=2&id=direct&demail=" + encodeURIComponent(id);
		} else if (type == 'link_artist_vr') {
			link_url += "?ty=3&id=direct&demail=" + encodeURIComponent(id);
		} else {
			link_url += "?ty=" + type + "&id=" + encodeURIComponent(id);
		}
		
		return link_url;
	},
	
	"goURL"  : function(url){
		window.open(url, "",null);
	},
	
	"copyToClipboard" : function(val){
	
		var textarea = document.createElement('textarea');
		textarea.value = val;

		document.body.appendChild(textarea);
		textarea.select();
		textarea.setSelectionRange(0, 9999);  // IOS에서는 Range를 설정해야 복사가 됨
		
		document.execCommand('copy');
		document.body.removeChild(textarea);
		
		g360.gAlert("Info" ,g360.g_lang.Copy_Alert , "blue", "top");
	},
	
	"show_rental_guide" : function(){
		$("#rental_guide").show();
	},
	
	"go_rental" : function(){
		
		var url = g360.root_path + "/read_guide.mon";
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				if (data.result == "OK"){
					var _url = '/rental/rentalmng.jsp';
					g360.LoadPage("body_content", _url);
					g360.scroll_Top();
					g360.body_scroll_show();
					
					$("#rental_guide").fadeOut();
					
					g360.UserInfo.read_guide = 'T';
				}else{
					g360.error_alert();
				}
			},
			error : function(e){
				g360.error_alert();
			}
		});
		
		
	},
	
	"rental_send_count" : function(){
		
		var url = g360.root_path + "/rental_use_count.mon";
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			async : false,
			success : function(data){
				
				if (data.result != "ERROR"){
				//	return data.result;
					g360.rental_km_count = data.result;
				}else{
					g360.error_alert();
				}
			},
			error : function(e){
				g360.error_alert();
			}
		});
	},
	
	"rentalOnedayTrial" : function() {
		
		// 로그인이 안되어 있으면 대관 회원가입 페이지로 이동
		if (!g360.UserInfo) {
			location.href = "/m/signup_rental";
			return;
		}
		
		if (g360.UserInfo.gubun != 'rental') {
			alert("대관 사용자인 경우만 신청 가능합니다.");
			return;
		}
		
		if (g360.UserInfo.rental_level == "Option"){
			alert("대관서비스 사용중에는 1일 체험을 사용하실수 없습니다.");
			return;
		}

		var onedayuse = g360.UserInfo.onedayservice;
		if (onedayuse == "T"){
			alert("대관 서비스 1일 체험을 이미 진행하셨습니다.\r결제 후 사용하시기 바랍니다.");
			return;
		}

		var tx = confirm("1일 대관 체험 서비스를 신청하시겠습니까?");
		if (tx){
			//최초 가입자의 경우
			var caledmonth, caledday, caledYear;
			var today = new Date();
			today.setDate(today.getDate() + (1)); 
					
			caledYear = today.getFullYear();
			 
			if( today.getMonth() < 9 ){
				 caledmonth = '0'+(today.getMonth()+1);
			}else{
				 caledmonth = today.getMonth()+1;
			}
			if( today.getDate() < 9 ){
				 caledday = '0'+today.getDate();
			}else{
				caledday = today.getDate();
			}	
			expire_date = caledYear + "-" + caledmonth + "-" + caledday;
			
			var sname = "Option";
			var one = new Object();
			one.oneday = "T";
			one.buyer_email = g360.UserInfo.email;
			one.buyer_name = g360.UserInfo.nickname;
			
					
			var data = JSON.stringify({
				service_month : 0,
				service_vr_count : 1,
				service_static : 0,
				service_message_count : 0,
				service_price : 0,
				expire_date : expire_date,
				rental_level : sname,
				pginfo : one,
				onedayservice : "T",
				email : g360.UserInfo.email
			});
			
			
			var url = "/approval_level_options.mon";
			$.ajax({
				type : "POST",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				data : data,
				url : url,
				success : function(res){

					g360.UserInfo.rental_level = sname;
					g360.UserInfo.rental_price = 0;
					g360.UserInfo.rental_count = 0;
					g360.UserInfo.rental_vr = 1;
					g360.UserInfo.rental_use = "T";
					g360.UserInfo.rental_expire_date = expire_date;
					g360.UserInfo.onedayservice = "T";
									
					alert("대관 서비스 1일 체험이 신청되었습니다.\r홈페이지 메인상단 '대관 관리' 버튼을 클릭하시고 대관서비스를 체험해 보시기 바랍니다.");

				}, 
				error : function(e){
					g360.error_alert();
				}
			});
		}
	},
	
	"signupArtist" : function(){
		if (g360.UserInfo) {
			alert('이미 가입된 사용자입니다.');
			return;
		}
		if (window.gMND) gMND.xClose();
		g360.LoadPage("body_content", g360.root_path + "/main/member/userReg.jsp?type=artist");			
	},
	
	"FullScreen_Open" : function(){
		
		var elem = document.documentElement;
		if (elem.requestFullscreen) {
		    elem.requestFullscreen();
		  } else if (elem.mozRequestFullScreen) { /* Firefox */
		    elem.mozRequestFullScreen();
		  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
		    elem.webkitRequestFullscreen();
		  } else if (elem.msRequestFullscreen) { /* IE/Edge */
		    elem.msRequestFullscreen();
		  }	
	},
	"FullScreen_Close" : function(){
		var elem = document.documentElement;
		 if (document.exitFullscreen) {
		    document.exitFullscreen();
		  } else if (document.mozCancelFullScreen) {
		    document.mozCancelFullScreen();
		  } else if (document.webkitExitFullscreen) {
		    document.webkitExitFullscreen();
		  } else if (document.msExitFullscreen) {
		    document.msExitFullscreen();
		  }
	},
	
	"showBlock" : function(){
		g360.body_scroll_hide();
		var inx = parseInt(g360.maxZindex()) + 1;
		$('#blockui').css("z-index", inx);
		$('#blockui').show();
    },
    
    "hideBlock": function(){
    	g360.body_scroll_show();
    	$('#blockui').hide();
    },
    
    
    "showSecLayer": function(){
    	loadRentalInfo('qwer123');
    	
    },
    "wrongSecCode": function(){
    	alert('코드 오류');
    },
    
    "exchange_dollar" : function(won,callback){

    	$.ajax({
  	  		url: 'https://api.manana.kr/exchange/rate/USD/KRW.json',
  	  		dataType: "json"
  	  			
  	  	}).done(function(data){

  	  		var data = data[0];
	     	var usd = data['rate'];  
	     	var dollar = won * usd;
	      	
	     	//두번째 자리에서 반올림
	     	//console.log("dollar : "+ dollar);
	     	dollar = +(Math.round(dollar + "e+2")  + "e-2");
	     	
	     	if (typeof callback == 'function') {
	     		callback(dollar)
	     	}
	      		
  	  	});
    	
//        $.get('http://api.manana.kr/exchange/rate/KRW/USD.json', function(data) {
//            var data = data[0];
//            var usd = data['rate'];               
//            var dollar = won * usd;
//            console.log("dollar : "+ dollar);
//        });
    },
    
    "transCoinPrice" : function(krw, callback){

    	var arr_krw_markets = 'KRW-ETH,USDT-ETH';
  	  	$.ajax({
  	  		url: "https://api.upbit.com/v1/ticker?markets=" +arr_krw_markets,
  	  		dataType: "json"
  	  	}).done(function(tickers){
  	  		var krw_eth = tickers[0].trade_price;
  	  		var usd_eth = tickers[1].trade_price;
  	  		
  	  		var ratio = krw_eth / krw;
  	  		var eth = (1 / ratio).toFixed(4);
  	  		
  	  		var usd_ratio = 1 / eth;
  	  		var usd = (usd_eth / usd_ratio).toFixed(2);
  	  		
  	  		if (typeof callback == 'function') {
  	  			callback(eth, usd);	
  	  		}
  	  	});
    },
    
    "transSetting" : function(){
    	var arr_krw_markets = 'KRW-ETH,USDT-ETH';
  	  	$.ajax({
  	  		url: "https://api.upbit.com/v1/ticker?markets=" +arr_krw_markets,
  	  		dataType: "json"
  	  	}).done(function(tickers){
  	  		g360.eth_exchange = tickers;

  	  	});
    },
    
    "transKRWtoARTIC" : function (krw){
    	//원화를 넘기면 ETH로 계산해서 넘겨준다.
		var krw = krw;
  		var artic = (krw / 1000000).toFixed(4);
  		
  		return artic;
    },
    
    "transKRWtoETH" : function (krw){
    	//원화를 넘기면 ETH로 계산해서 넘겨준다.
		var krw = krw;
		var tickers = g360.eth_exchange;
		var krw_eth = tickers[0].trade_price;
  		
  		
  		var ratio = krw_eth / krw;
  		var eth = (1 / ratio).toFixed(4);
  		
  		return eth;
    },
    
    "transKRWtoUSD" : function (krw){
    	//원화를 넘기면 ETH로 계산해서 넘겨준다.
		var krw = krw;
		var tickers = g360.eth_exchange;		
  		var usd_eth = tickers[1].trade_price;  	
  		
  		var usd_ratio = 1 / eth;
  		var usd = (usd_eth / usd_ratio).toFixed(2);
  		
  		return usd;
    },
    
    "ethscan" : function(tx){
    	return "https://etherscan.io/tx/" + tx;
    },
    
    "isIEBrowser" : function(){
    	var agent = navigator.userAgent.toLowerCase();
    	if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1) ) {
    		return true;
    	}else{
    		return false;
    	}
    }
	
}


window.onpopstate  = function(event){
	if (event.state != null){
		var returnPage = event.state.before;
		
		if (returnPage == "main"){
			g360.goHome();
		}else if (returnPage == 'vr_iframe'){
			_pano.krpano1.call('callwith(layer[close_freim_url_addhs], onclick)');
		}else{
			g360.history = true;
			$("#" + returnPage).click();
			g360.history = false;
		}
	}
	
};