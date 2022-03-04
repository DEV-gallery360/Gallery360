


function gTopMainFunction(){	
	gTopMain = this;
	
	gTopMain.talk_start = 0 ;
	gTopMain.talk_perpage = 15;
	gTopMain.talk_totalcount = 0;
	
	gTopMain.query = "";
}

var gTopMain = null;

gTopMainFunction.prototype = {		

	"init" : function(){
		var _self = this;
		
		// 로그인 창을 최상위에 띄우는 이벤트 처리
		$('#exampleModalCenter').on('shown.bs.modal', function(e) {
			var mz = g360.maxZindex();
			var backdrop = $(this).data()['bs.modal']._backdrop;
			$(backdrop).css('z-index', mz+1); // 모달창 바깥 배경
			$(this).css('z-index', mz+2);
		});
		
		$('#exampleModalCenter').on('hide.bs.modal', function(e) {
			// 콜백 처리를 위한 변수 초기화
			g360.loginCallback = null;			
		});
		
	
		/*
		$("body").click(function(e){
			if (!$("#talk360_main, #talk360_dis").has(e.target).length){
				if (e.target.id != "btn_talk360" && e.target.id !="detail_btn_close" && e.target.id !="detail_popup"   ){
			//		$("#talk360_main").fadeOut();
				}				
			}
		});
		*/

		if (g360.UserInfo != null){
			g360.login_hide();
			if (g360.UserInfo.id == ""){
				$("#exampleInputEmail1").val(cs);
			}			

		}else{
			g360.login_show();
		}
		
		$("#360_talk_alram_list").on("click", function(event){
			$("#talk360_dis").mCustomScrollbar('destroy');
			$("#talk360_dis").empty();
			
			gTopMain.talk_start = 0;
			gTopMain.alram_list();
			
			gTopMain.scroll_init();
		});
		
		
		$("#360_talk_main").on("click", function(event){
			$("#talk360_dis").mCustomScrollbar('destroy');
			$("#talk360_dis").empty();
			
			gTopMain.talk_start = 0;
			gTopMain.loadTalk();
			
	
			gTopMain.scroll_init();
		});
		
		
		gTopMain.load_searchid_content();
		
		
		var cs = g360.getCookie("isLogin");
		if (cs != ""){
			$("#customCheck2").prop("checked", "checked");			
		}
		$("#exampleInputPassword1").val("");
		///////////////////////////////////////////////////////////////////////////////////////////////////
		
		
		///////////////////// 모바일 GNB 메뉴 클릭 ///////////////////////////////////////////////////////////////
		
		// GNB Sub메뉴
		$('#navbarText').on('mouseenter', function(e){
			if ($(e.target).hasClass('gnb-sub-bg')) return;
			$(this).addClass('active');
		});
		$('#navbarText').on('mouseleave', function(e){
			
			$(this).removeClass('active');
		});
		
		// 모바일 마이페이지
		$('.user-profile-m').on('click', function(){
			if (g360.UserInfo.gubun == 'normal'){
				// 일반 타입은 모바일 마이페이지 지원
				$('#mngMypage_client').click();
				_self.mobile_menu_close();
			} else {
				// 일반 이외 타입은 모바일 마이페이지 지원 안함
				// $('#mngMypage').click();
			}
			return false;
		});
		
		$("#m_gnb_home").on("click", function(event){
			
			g360.goHome();
			//	$("#body_content").fadeIn(500);
			g360.scroll_Top();
			g360.body_scroll_show();
			
			_self.mobile_menu_close();
			return false;
		});
		
		
		
		
		$("#m_gnb_vrgallery").on("click", function(event){
//			g360.history_record("m_gnb_vrgallery");
//			_self.navBtnAction('vrgallery');			
//			_self.mobile_menu_close();
			$(this).parent().toggleClass('active');			
			return false;
		});
		
		
		$("#m_gnb_art").on("click", function(event){
//			g360.history_record("m_gnb_art");
//			_self.navBtnAction('art');			
//			_self.mobile_menu_close();
			$(this).parent().toggleClass('active');
			return false;
		});
		
		$("#m_gnb_artist").on("click", function(event){
			g360.history_record("m_gnb_artist");
			_self.navBtnAction('artist');			
			_self.mobile_menu_close();
			return false;
		});
		
		
		$("#m_gnb_recommend").on("click", function(event){
			g360.history_record("m_gnb_recommend");
			_self.navBtnAction('recommand');
			_self.mobile_menu_close();
			return false;
		});
		
		$("#m_gnb_news").on("click", function(event){
			g360.history_record("m_gnb_news");
			_self.navBtnAction('news');
			_self.mobile_menu_close();
			return false;
		});
		
		$("#m_gnb_guide").on("click", function(event){
			g360.history_record("m_gnb_guide");
			_self.navBtnAction('service');
			_self.mobile_menu_close();
			return false;
		});
		
		
		$("#m_gnb_rental").on("click", function(event){
//			g360.history_record("m_gnb_rental");
//			_self.navBtnAction('rental');
//			_self.mobile_menu_close();
			$(this).parent().toggleClass('active');
			return false;
		});
		
		$("#m_gnb_ai").on("click", function(event){
			g360.history_record("m_gnb_ai");
			_self.navBtnAction('ai');
			_self.mobile_menu_close();
			return false;
		});
		
		
		$("#m_gnb_tech").on("click", function(event){
			$(this).parent().toggleClass('active');
			return false;
		});
		$("#m_gnb_aboutus").on("click", function(event){
			$(this).parent().toggleClass('active');
			return false;
		});
		
		
		$("#m_gnb_company_profile").on("click", function(event){
//			gTopMain.navBtnAction('company');
//			_self.mobile_menu_close();
			$(this).parent().toggleClass('active');
			return false;
		});
		
		
		$("#btn_cart_mobile").on("click", function(event){
			if (g360.login_check()) {
				g360.history_record("btn_cart_mobile");
				_self.navBtnAction('cart');
				_self.mobile_menu_close();
			} else {
				g360.login_window_max();
				$("#p_login").click();
				_self.mobile_menu_close();
			}
			return false;
		});
		
		$("#btn_favorite_mobile").on("click", function(event){
			if (g360.login_check()) {
				g360.history_record("btn_favorite_mobile");
				_self.navBtnAction('favorite');
				_self.mobile_menu_close();
			} else {
				g360.login_window_max();
				$("#p_login").click();
				_self.mobile_menu_close();
			}
			return false;
		});
		
		
		
		$("#m_login").on("click", function(event){
			g360.login_window_max();
			$("#p_login").click();
			_self.mobile_menu_close();
			return false;
		});
		
		$("#m_addMember").on("click", function(event){
			g360.LoadPage("body_content", g360.root_path + "/main/member/userReg.jsp");
			_self.mobile_menu_close();
			$('html').scrollTop(0);
			return false;
		});
		
		$("#m_logout").on("click", function(event){
			loginFC.logout();
			return false;
		});
		
		$("#btn_requestArt_mobile").on("click", function(event){
			if (g360.login_check()){
				if (!typeof(g360.UserInfo.smskey) == "undefined" || g360.UserInfo.smskey == ""){
					g360.gAlert("Info",g360.g_lang.Main_top_Alert_1, "blue", "top");
					//gTopMain.navBtnAction('account');
					return false;
				}else{
					g360.history_record("btn_requestArt_mobile");
					g360.LoadPage("body_content", g360.root_path + "/client/art_request/art_recommand.jsp");
					_self.mobile_menu_close();
					return false;
				}
			}else{
				g360.login_window_max();
				$("#p_login").click();
			}
			
		});
		
		
		$("#btn_uploadArt_mobile").on("click", function(event){
			
			g360.history_record("btn_uploadArt_mobile");
		
			g360.body_scroll_show();
			if (g360.login_check()){
			
				if (!typeof(g360.UserInfo.smskey) == "undefined" || g360.UserInfo.smskey == ""){
	
					g360.gAlert("Error", g360.g_lang.Main_top_Alert_2, "red", "left");
					gTopMain.navBtnAction('account');
				}else{
					$("#body_content").hide();
					g360.LoadPage("body_content", g360.root_path + "/partner/art_upload/art_upload.jsp");
					$("#loginOK2").click();
				}

			//	return false;
			}else{
				g360.login_window_max();
				$("#p_login").click();
			}
			
			
			
		//	g360.LoadPage("body_content", g360.root_path + "/partner/art_upload/art_upload.jsp");
			_self.mobile_menu_close();
			//	g360.LoadPage("body_content", g360.root_path + "/service/upload.jsp");
			return false;
		});
		
		
		
		$("#m_go_vr_gallery").on("click", function(event){
	
			_self.navBtnAction('partner_vrgallery');
			_self.mobile_menu_close();
			return false;
		});
		
		$("#m_go_profile").on("click", function(event){
			//g360.LoadPage("body_content", g360.root_path + "/partner/profile/profile.jsp");
			_self.navBtnAction("profile");
			_self.mobile_menu_close();
			return false;
		});
		
		
		$("#m_go_artstorage").on("click", function(event){			
			_self.navBtnAction('artProjectlist');
			_self.mobile_menu_close();
			return false;
		});
		
		$("#m_go_artproject").on("click", function(event){			
			_self.navBtnAction('project');
			_self.mobile_menu_close();
			return false;
		});
		
		$("#m_go_account").on("click", function(event){			
			_self.navBtnAction('account');
			_self.mobile_menu_close();
			return false;
		});
		
		$("#m_go_mypage").on("click", function(event){			
			_self.navBtnAction('mypage');
			_self.mobile_menu_close();
			return false;
		});
		
		
		$("#m_go_mypage_client").on("click", function(event){
			
			g360.history_record("btn_menu_cmypage");
			
			
			_self.navBtnAction('mngMypage_client');
			_self.mobile_menu_close();
			return false;
		});
		
		
		$("#m_go_account_client").on("click", function(event){
			_self.navBtnAction('account_client');
			_self.mobile_menu_close();
			return false;
		});
		
		$("#m_go_buy_client").on("click", function(event){
			_self.navBtnAction('puchase_client');
			_self.mobile_menu_close();
			return false;
		});
		
		$("#m_go_artproject_client").on("click", function(event){
			_self.navBtnAction('artProject_client');
			_self.mobile_menu_close();
			return false;
		});
		
		$("#m_go_artstorage_client").on("click", function(event){
			_self.navBtnAction('storage_client');
			_self.mobile_menu_close();
			return false;
		});
		
		
		
		///////////////////// 모바일 GNS 메뉴 클릭 ////////////////////////////////////////////////////////////////
		
		
		
		
		
		//////////////////// GNB 메뉴 클릭 ////////////////////////////////////////////////////////////////////
		$("#btn_gnb_vrgallery").on("click", function(event){
			//VR갤러리
			g360.history_record("btn_gnb_vrgallery");
			g360.save_history_now('vr');
			_self.navBtnAction('vrgallery');
			return false;
		});
		$('#sub_vrgallery, #m_sub_vrgallery').on('click', function(){
			//작가전시
			g360.history_record("btn_gnb_vrgallery");
			g360.save_history_now('vr');
			_self.navBtnAction('vrgallery');
			_self.mobile_menu_close();
			return false;
		});
		$('#sub_vrarchive, #m_sub_vrarchive').on('click', function(){
			// 이음피음, 메이커스빌 아카이브 소식지 연결
			$('#navbarText').removeClass('active');
			g360.save_history_now('vr_archive');
			g360.showNewsDetail(141);
			_self.mobile_menu_close(true);
			return false;
		});
		
		
		
		
		
		$("#btn_gnb_art").on("click", function(event){
			//작품
			g360.history_record("btn_gnb_art");
			g360.save_history_now('art');
			_self.navBtnAction('art');
			return false;
		});
		$('#sub_art, #m_sub_art').on("click", function(event){
			//작품구매
			g360.history_record("btn_gnb_art");
			g360.save_history_now('art');
			_self.navBtnAction('art');
			_self.mobile_menu_close();
			return false;
		});
		$('#sub_ai, #m_sub_ai').on("click", function(event){
			g360.save_history_now('art_ai');
			_self.mobile_menu_close();
			
			//AI 추천
			if (g360.login_check()){
				g360.load_Curie();
			} else {
				g360.loginCallback = function() {
					g360.load_Curie();
				}
				$('#p_login').click();
			}
			return false;
		});
		$('#sub_style, #m_sub_style').on('click', function(){
			$('#navbarText').removeClass('active');
			g360.save_history_now('art_style');
			ms.showSpace();
			_self.mobile_menu_close(true);
			return false;
		});
		
		
		
		
		$("#btn_gnb_artist").on("click", function(event){
			//작가
			g360.history_record("btn_gnb_artist");
			g360.save_history_now('artist');
			
			_self.navBtnAction('artist');
			return false;
		});
		
		$("#btn_gnb_recommand").on("click", function(event){
			//추천
			g360.history_record("btn_gnb_recommand");
			_self.navBtnAction('recommand');
			return false;
		});
		
		$("#btn_gnb_news").on("click", function(event){
			//news
			g360.history_record("btn_gnb_news");
			_self.navBtnAction('news');
			return false;
		});
		
		
		$("#btn_gnb_service").on("click", function(event){
			//서비스 소개
			g360.history_record("btn_gnb_service");
			_self.navBtnAction('service');
			return false;
		});
		
		
		$("#btn_gnb_rental").on("click", function(event){
			//대관 서비스
		
			g360.history_record("btn_gnb_rental");
			g360.save_history_now('rental');
			_self.navBtnAction('rental');
			return false;
		});
		$("#sub_rental_guide, #m_sub_rental_guide").on("click", function(event){
			//대관 서비스 가이드
			g360.history_record("btn_gnb_rental");
			g360.save_history_now('rental');
			_self.navBtnAction('rental');
			_self.mobile_menu_close();
			return false;
		});
		$("#sub_rental_ing, #m_sub_rental_ing").on("click", function(event){
			//진행중인 전시
			g360.save_history_now('rental_ing');
			_self.navBtnAction('rentallist');
			_self.mobile_menu_close();
			return false;
		});
		$("#sub_rental_rec, #m_sub_rental_rec").on("click", function(event){
			//진행중인 전시
			g360.save_history_now('rental_rec');
			_self.navBtnAction('rentalrec');
			_self.mobile_menu_close();
			return false;
		});
		$("#sub_rental_price, #m_sub_rental_price").on("click", function(event){
			//서비스 요금
			g360.save_history_now('rental_price');
			_self.navBtnAction('rentalprice');
			_self.mobile_menu_close();
			return false;
		});
		
		// GNB Tech
		$('#btn_gnb_tech').on('click', function(){
			g360.save_history_now('tech_dbook');
			$('#navbarText').removeClass('active');
			g360.showNewsDetail(65);
			_self.mobile_menu_close(true);
			return false;
		});
		$('#sub_tech_dbook, #m_sub_tech_dbook').on('click', function(){
			g360.save_history_now('tech_dbook');
			$('#navbarText').removeClass('active');
			g360.showNewsDetail(65);
			_self.mobile_menu_close(true);
			return false;
		});
		$('#sub_tech_ai, #m_sub_tech_ai').on('click', function(){
			g360.save_history_now('tech_painter');
			$('#navbarText').removeClass('active');
			g360.popup_aipainter_start();
			_self.mobile_menu_close(true);
			return false;
		});
		$('#sub_tech_aiart, #m_sub_tech_aiart').on('click', function(){
			g360.save_history_now('tech_ai');
			$('#navbarText').removeClass('active');
			g360.history_record("sub_tech_aiart");
			_self.navBtnAction('ai');
			_self.mobile_menu_close();
			return false;
		});
		
		
		//GNB About US
		$('#btn_gnb_aboutus').on('click', function(){
			g360.history_record("sub_au_company");
			g360.save_history_now('au');
			_self.navBtnAction('company')
			return false;
		});
		$('#sub_au_company, #m_sub_au_company').on('click', function(){
			g360.history_record("sub_au_company");
			g360.save_history_now('au');
			_self.navBtnAction('company');
			_self.mobile_menu_close();
			return false;
		});
		$('#sub_au_service, #m_sub_au_service').on('click', function(){
			g360.history_record("sub_au_service");
			g360.save_history_now('au_service');
			_self.navBtnAction('service');
			_self.mobile_menu_close();
			return false;
		});
		$('#sub_au_notice, #m_sub_au_notice').on('click', function(){
			g360.history_record("sub_au_notice");
			g360.save_history_now('au_notice');
			_self.navBtnAction('notice');
			_self.mobile_menu_close();
			return false;
		});
		$('#sub_au_news, #m_sub_au_news').on('click', function(){
			g360.history_record("sub_au_news");
			g360.save_history_now('au_news');
			_self.navBtnAction('news');
			_self.mobile_menu_close();
			return false;
		});
		$("#sub_au_help, #m_sub_au_help").on("click", function(event){
			// 헬프센터를 카카오톡 채널로 연결
			g360.save_history_now('au_help');
			window.open('https://pf.kakao.com/_tAWTT/chat');
			return false;
		});
		
		
		
		
		$("#btn_gnb_rental_land").on("click", function(event){
			//대관 서비스
		
			g360.history_record("btn_gnb_rental_land");
			_self.navBtnAction('rental_land');
			return false;
		});
		
		
		$("#btn_gnb_ai").on("click", function(event){
			//AI 미술관
		
			g360.history_record("btn_gnb_ai");
			_self.navBtnAction('ai');
			return false;
		});
		
		
		
		
		$("#btn_gnb_cart").on("click", function(evnet){
			
			g360.history_record("btn_gnb_cart");
			if (g360.login_check()){
				_self.navBtnAction('cart');
				return false;
			}else{
				g360.login_window_max();
				$("#p_login").click();
			}
			
		});
		
		$("#btn_gnb_favorite").on("click", function(event){
			g360.history_record("btn_gnb_favorite");
			if (g360.login_check()){
				_self.navBtnAction('favorite');
				return false;
			}else{
				g360.login_window_max();
				$("#p_login").click();
			}

		});
		
		$("#btn_talk360").on("click", function(event){
			if (g360.login_check()){
				gTopMain.talk360_show();
			}else{
				g360.login_window_max();
				$("#p_login").click();
			}
			
		});
		
		$("#main_user_image").on("click", function(event){
		
			$("#talk360_main").fadeOut();			
		});
		
		$("#main_user_image2").on("click", function(event){
		
			$("#talk360_main").fadeOut();			
		});
		
		$("#main_top_search").on("click", function(event){
		
			$("#talk360_main").fadeOut();
			
			$("#main_search_query").val("");
			
			//$(":input[name=sxquery]").focus();
			
			//event.preventDefault();
			//$("#main_search_query").focus();
			//return false;
		});
		
				
		$("#mngMypage").on("click", function(event){
			g360.history_record("mngMypage");
			_self.navBtnAction('mypage');
			return false;
		});
		
		$("#mngProfie").on("click", function(event){
			g360.history_record("mngProfie");
			_self.navBtnAction('profile');
			return false;
		});		

		$("#mngAccount").on("click", function(event){
			g360.history_record("mngAccount");
			_self.navBtnAction('account');
			return false;
		});
		$("#mngArtproject").on("click", function(event){
			
			if (!typeof(g360.UserInfo.smskey) == "undefined" || g360.UserInfo.smskey == ""){
				
				g360.gAlert("Error",g360.g_lang.Main_top_Alert_3, "red", "left");
				gTopMain.navBtnAction('account');
			}else{
				g360.history_record("mngArtproject");
				_self.navBtnAction('project');
				return false;
			}
			

		});
		$("#mngArtprojectList").on("click", function(event){
			g360.history_record("mngArtprojectList");
			_self.navBtnAction('artProjectlist');
			return false;
		});
		$("#mngMypage_client").on("click", function(event){
					
			_self.navBtnAction('mngMypage_client');
			return false;
		});
		
		
		
		
		
		$("#mngMyAccount_client").on("click", function(event){
			_self.navBtnAction('account_client');
			return false;
		});
		$("#mngMypuchase_client").on("click", function(event){
			_self.navBtnAction('puchase_client');
			return false;
		});
		$("#mngArtproject_client").on("click", function(event){
			_self.navBtnAction('artProject_client');
			return false;
		});
		$("#mngMyStorage_client").on("click", function(event){
			_self.navBtnAction('storage_client');
			return false;
		});
        

	
		////////////////// GNB 메뉴 클릭 종료 ////////////////////////////////////////////////////////////////////
		
		$("#mainhome").on("click", function(event){
			//location.reload();
			//return false;
//			if (g360.login_check()){
//				$("#body_content").hide();
				g360.goHome();
			//	$("#body_content").fadeIn(500);
				g360.scroll_Top();
				g360.body_scroll_show();
//			}else{
//				g360.login_window_max();
//				$("#p_login").click();
//				return;
//			}
			
		
		});
		
		
		$("#main_login").on("click", function(event){
			//로그인 버튼 클릭한 경우			
			loginFC.login();
			g360.body_scroll_show();
			return false;
		});
		
		
		
		
		
		$("#_loginout_btn").on("click", function(event){
			
			loginFC.logout();
		});
		
		$("#_loginout_btn2").on("click", function(event){
			
			loginFC.logout();
		});
		
		$("#btn_uploadArt").on("click", function(event){
			
			g360.history_record("btn_uploadArt");
			g360.body_scroll_show();
			if (g360.login_check()){
			
				if (!typeof(g360.UserInfo.smskey) == "undefined" || g360.UserInfo.smskey == ""){
					
					g360.gAlert("Error",g360.g_lang.Main_top_Alert_2, "red", "left");
					gTopMain.navBtnAction('account');
				}else{
					$("#body_content").hide();
					g360.LoadPage("body_content", g360.root_path + "/partner/art_upload/art_upload.jsp");
					$("#loginOK2").click();
				}

				return false;
			}else{
				g360.login_window_max();
				$("#p_login").click();
			}

		});
		

		
		$("#btn_requestArt").on("click", function(event){
			

			
			if (g360.login_check()){
				
				g360.history_record("btn_requestArt");
				
				if (!typeof(g360.UserInfo.smskey) == "undefined" || g360.UserInfo.smskey == ""){
					
					g360.gAlert("Error",g360.g_lang.Main_top_Alert_4, "red", "left");
					gTopMain.navBtnAction('account_client');
				}else{
			//		$("#body_content").hide();
					g360.LoadPage("body_content", g360.root_path + "/client/art_request/art_recommand.jsp");
					$("#loginOK2").click();
				}

				return false;
				
				
			}else{
				g360.login_window_max();
				$("#p_login").click();
			}

		});
		
		
		$("#invoiceSearch").on("click", function(event){
			//일반 유저가 작품요청을 클릭한 경우
			window.open(g360.root_path + "/jsp/service/invoiceTest.jsp")
			return false;
		});
				
		
		$("#reguser").on("click", function(event){
			$("#loginPop_Close").click();
			g360.LoadPage("body_content", g360.root_path + "/main/member/userReg.jsp");
			return false;
		});
		
		$("#addMember").on("click", function(event){
			g360.LoadPage("body_content", g360.root_path + "/main/member/userReg.jsp");
			return false;
		});
		
		

		
		$("#searchid").on("click", function(event){
			gTopMain.change_style1();
			gTopMain.load_searchid_content();
			$("#exampleModalCenter").hide();
			
			var mz = g360.maxZindex();
			$("#exampleModalCenter2").css('z-index', mz+1).show();
			
			return false;
		});
		
		
		$("#searchpw").on("click", function(event){
			gTopMain.change_style2();
			gTopMain.load_searchpw_content();
			$("#exampleModalCenter").hide();
			
			var mz = g360.maxZindex();
			$("#exampleModalCenter2").css('z-index', mz+1).show();
			
			return false;
		});
		
		$("#xpopCloseBtn").on("click", function(event){
			$("#loginPop_Close").click();
			$("#exampleModalCenter2").hide();
		});
		
		$("#searchidnextbtn").on("click", function(event){
			gTopMain.load_searchid_next();		
		});
		
		$("#goto_search_id").on("click", function(event){
			gTopMain.change_style1();
			gTopMain.load_searchid_content();
		});
		
		
		$("#goto_search_pw").on("click", function(event){
			gTopMain.change_style2();
			gTopMain.load_searchpw_content();
		});
		
		// 모바일 메뉴버튼 클릭
		$(".m-menu").click(function(){
			$('body').toggleClass('hidden-scroll');
		    $(".mobile-menu-nav-wrap").toggleClass("active");
		    $(".wrapper").toggleClass("active");
		    $(".m-navi-bg").toggleClass("active");


		});
		$(".m-navi-bg").click(function(){

			gTopMain.mobile_menu_close();
		});
		
		
		$("#go_vr_gallery").on("click", function(event){

			
			_self.navBtnAction('partner_vrgallery');
			return false;
		});
		
		$("#btn_rental").on("click", function(event){
			_self.navBtnAction("rentalmng");
		});
		
		
		$("#go_adminpage").on("click", function(event){		
			_self.navBtnAction('go_admin');
			return false;
		});
		

		$("#go_adminpage2").on("click", function(event){	
			_self.navBtnAction('go_admin');
			return false;
		});
		
		$("#go_adminpage22").on("click", function(event){	
			_self.navBtnAction('go_admin2');
			return false;
		});
		
		$("#go_adminpage222").on("click", function(event){	
			_self.navBtnAction('go_admin2');
			return false;
		});
		
		$("#go_adminpage3").on("click", function(event){	
			_self.navBtnAction('go_admin');
			_self.mobile_menu_close();
			return false;
		});

		
		
		
		
		$("#btn_main_search").on("click", function(event){
			$("#search_bg").click();
			
			g360.body_scroll_show();
			
			g360.LoadPage("body_content", g360.root_path + "/main/search/main_search.jsp");
			
			$("#sq1").show();
			$("#search_query_delete").show();
			$("#sq2").hide();
			
			$("#loginOK2").click();
			return false;
		});
		
		
		$("#main_search_query").bind("keypress", function(e){
			if (e.keyCode == 13){
				var query = $.trim($("#main_search_query").val().replace(/\s+/g, ' '));
				if (query == ""){
					g360.gAlert("Error",g360.g_lang.Main_top_Alert_5, "red", "left");
					return false;
				}
				$("#search_bg").click();
				g360.LoadPage("body_content", g360.root_path + "/main/search/main_search.jsp");
				return false;
			}
		});
		
		$("#talk_send").on("click" , function(event){
			gTopMain.sendTalk();
		});
		
		$("#talk_text").bind("keypress", function(e){
			if (e.keyCode == 13){
				gTopMain.sendTalk();
				return false;
			}
		});
		
		
		$("#talk_search").bind("keypress", function(e){
			if (e.keyCode == 13){
				var query = $("#talk_search").val();

				gTopMain.query = query;
				$("#talk360_dis").mCustomScrollbar('destroy');
				$("#talk360_dis").empty();
				gTopMain.talk_start = 0;
				
				gTopMain.loadTalk();
			}
		});
		
		
	
		
		///////////////////////////// 채팅 멘션 ////////////////////////////
		//gTopMain.get_userdata_mention();
		
		
		$("#chat_admin").on("click", function(event){
			
			var isx = false;
			$(".mention_list li").each(function(){
				var ix = $(this);
				if (ix.get(0).id.indexOf("li-mention-gallery360-spl-gmail-sp-com") > -1){
					isx = true;
				}
			});
			
			
			if (!isx){
				var html = "<li id='li-mention-gallery360-spl-gmail-sp-com'><span>갤러리360</span>";
				html 	+= "	<button id='gallery360-spl-gmail-sp-com' name='del-mention' class='btn' onclick=\"gTopMain.btnDelete('li-mention-gallery360-spl-gmail-sp-com')\" style='position:inherit'>삭제</button>";
				html 	+= "</li>";
				$(".mention_list").append(html);
			}
			

			
//			var obb = new Object();
//			obb.avatar = "/artimage/gallery360@gmail.com/photo/gallery360@gmail.com";
//			obb.dept = "gallery360@gmail.com";
//			obb.display = "갤러리 360 / 관리자";
//			obb.email = "gallery360@gmail.co";
//			obb.id = "gallery360-spl-gmail-spl-com";
//			obb.name = "갤러리360";
//			obb.type = "normal";
//			obb.value = "갤러리360";
//			
//			$.fn.mentionsInput.addMention(obb);
				
		});
		
	
		
		///////////////////////////////////////////////////////////////
		
		
		gTopMain.g_lang();
	},
	
	"g_lang" : function(){

		// - GNB
		$(".g_nav").css("padding", "0px");
		
		$(".g_lang_VR_Gallery").text(g360.g_lang.VR_Gallery);
		$(".g_lang_Art").text(g360.g_lang.Art);
		$(".g_lang_Artist").text(g360.g_lang.Artist);
		$(".g_lang_VR_Rental").text(g360.g_lang.VR_Rental);
		
		
		$(".g_lang_Artist_Exhibition").text(g360.g_lang.Artist_Exhibition);
		$(".g_lang_Archive").text(g360.g_lang.Archive);
		
		$(".g_lang_Buy_Art").text(g360.g_lang.Buy_Art);
		$(".g_lang_AI_Recommendation").text(g360.g_lang.AI_Recommendation);
		
		$(".g_lang_VR_Exhibit_Guide").text(g360.g_lang.VR_Exhibit_Guide);
		$(".g_lang_VR_Exhibit_List").text(g360.g_lang.VR_Exhibit_List);
		$(".g_lang_Recommended_Exhibit").text(g360.g_lang.Recommended_Exhibit);
		$(".g_lang_Usage_Fee").text(g360.g_lang.Usage_Fee);
		
		$(".g_lang_Make_AI_Arts").text(g360.g_lang.Make_AI_Arts);
		
		$(".g_lang_Company_Introduction").text(g360.g_lang.Company_Introduction);
		$(".g_lang_Service_Guide").text(g360.g_lang.Service_Guide);
		$(".g_lang_Notice").text(g360.g_lang.Notice);
		$(".g_lang_News").text(g360.g_lang.News);
		
		// - 버튼
		$(".g_lang_Request_Arts").css("width","120px");
		$(".g_lang_Upload_Arts").css("width","120px");
		
		$(".g_lang_Request_Arts").text(g360.g_lang.Request_Arts);
		$(".g_lang_Upload_Arts").text(g360.g_lang.Upload_Arts);
		$(".g_lang_Setting_VR_Rental").text(g360.g_lang.Setting_VR_Rental);
		
		
		$(".g_lang_Login").text(g360.g_lang.Login);
		$(".g_lang_Sign_Up").text(g360.g_lang.Sign_Up);
		$(".g_lang_My_Page").text(g360.g_lang.My_Page);
		$(".g_lang_Account_Settings").text(g360.g_lang.Account_Settings);
		$(".g_lang_Arts_Purchase_details").text(g360.g_lang.Arts_Purchase_details);
		$(".g_lang_Arts_Project").text(g360.g_lang.Arts_Project);
		$(".g_lang_Purchased_Arts").text(g360.g_lang.Purchased_Arts);
		
		$(".g_lang_Sign_Out").text(g360.g_lang.Sign_Out);
		
		$(".g_lang_Profile").text(g360.g_lang.Profile);
		$(".g_lang_Art_List").text(g360.g_lang.Art_List);
		
		$(".g_lang_Integrated_Search").attr("placeholder",g360.g_lang.Integrated_Search);
		
		// - 로그인
		$(".g_lang_Login_Id").attr("placeholder",g360.g_lang.Login_Id);
		$(".g_lang_Login_PW").attr("placeholder",g360.g_lang.Login_PW);
		$(".g_lang_Login_Id_Save").text(g360.g_lang.Login_Id_Save);
		
		$(".g_lang_Find_ID").text(g360.g_lang.Find_ID);
		$(".g_lang_Find_PW").text(g360.g_lang.Find_PW);
		
		$(".g_lang_Login_Google").text(g360.g_lang.Login_Google);
		$(".g_lang_Login_Kakao").text(g360.g_lang.Login_Kakao);
		
		// - 아이디 / 비번 찾기
		$(".g_lang_Find_IDPW").text(g360.g_lang.Find_IDPW);
		
	},
	
	/*
	 * mention 입력할때 필요한 데이터를 미리 가져온다
	 */
	"get_userdata_mention" : function(){
		$('#talk_text').mentionsInput({
			onDataRequest:function (mode, query, callback) {
				var url = g360.root_path + "/agUserDataMention.mon?key=" + encodeURIComponent(query);
				url += "&" + new Date().getTime();
				//console.log(url);
				$.ajax({
					method : "GET",
					url : url,
					dataType : "json"
				}).done(function(res){
					var data = res;
				
					data = _.filter(data, function(item) { return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1 });
					console.log(data);
					callback.call(this, data);
				}).fail(function(){
					g360.error_alert();
				});
			}
		});
	},
	
	"btnDelete" : function(id){
		//$("#li-mention-gallery360-spl-gmail-sp-com").remove();
		$("#"+id).remove();
	},
	
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	"sendArt" : function(msg, readers, opt, filename, express){
		var xdata = new Object();
		xdata.msg = msg;
		xdata.readers = readers;
		xdata.imagepath = filename;
		xdata.imagetype = opt;
		xdata.express = express;
		
		var data = JSON.stringify(xdata);
		
		var url = g360.root_path + "/talksave.mon";
		$.ajax({
			type : "POST",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			data : data,
			success : function(res){
				if (res.result == "OK"){
					g360.gAlert("Info",g360.g_lang.Main_top_Alert_6, "blue", "top");

				}
			},
			error : function(e){
				g360.error_alert();
			}
		})
		
	},
	
	"sendTalk" : function(){
		var msg = $("#talk_text").val();
			
		var dx = $(".mention_list li");
		var reader = "";
		if (dx.length > 0){
			for (var i = 0 ; i < dx.length; i++){
				var spl = dx[i];
				var ddx = spl.id.replace(/-sp-/gi, ".").replace("-spl-","@").replace("li-mention-","");
				if (reader == ""){
					reader = ddx;
				}else{
					reader = reader + " " + ddx;
				}
			}
		}
		
		if (reader == ""){
			g360.gAlert("Info",g360.g_lang.Main_top_Alert_7+" <br>ex) @박희수", "blue", "top");
			return false;
		}
		
		var xdata = new Object();
		xdata.msg = msg;
		xdata.readers = g360.UserInfo.email + " " + reader;
		xdata.express = "";
		xdata.imagepath = "";
		xdata.imagetype = "";
		
		var data = JSON.stringify(xdata);
		
		if (msg == ""){
			g360.gAlert("Error",g360.g_lang.Main_top_Alert_8, "red", "left");
			return false;
		}
		
		
		var url = g360.root_path + "/talksave.mon";
		$.ajax({
			type : "POST",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			data : data,
			success : function(res){
				if (res.result == "OK"){
				
					gTopMain.drawTalk(res.doc, "direct", res.doc.id);
					
					$("#talk_text").val("");
				}
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	"alram_list" : function(){
		var url = g360.root_path + "/loadTalk_alram.mon?start="+gTopMain.talk_start+"&perpage="+gTopMain.talk_perpage+"&"+new Date().getTime();
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(res){
			
				var data = res.hits.hits;				
				gTopMain.talk_totalcount = res.hits.total;
				
				for (var i = 0; i < data.length; i++){
					var sp = data[i];
					var sid = sp._id;
					gTopMain.drawTalk(sp._source, "", sid);
				}
				
			//	gTopMain.talk_scroll();
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	
	
	

	
	
	
	"show_reply" : function(id, readers, search_uniquekey){
	
		var cnt = $("#reply_" + search_uniquekey).length;
		if (cnt == 0){
			var url = g360.root_path + "/load_reply_list.mon?id=" + id+"&"+new Date().getTime();
			$.ajax({
				type : "Get",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				success : function(data){
					var totalcount = data.hits.total;
					var list = data.hits.hits;
					
					var html = "<div class='talk_chat' id='reply_"+search_uniquekey+"'>";
					html += "<ul id='reply_ul_" + search_uniquekey + "'>";
				
					var photourl = g360.user_photo_url(g360.UserInfo.email);				
					
					for (var i = totalcount-1 ; i >= 0 ; i--){
						var spl = list[i]._source;
						var oid = list[i]._id;
						var sphotourl = g360.user_photo_url(spl.email);
						html += "	<li id='li_"+oid+"'>";
						html += "		<div class='talk_thm'><img src='"+sphotourl+"' onerror=\"g360.user_photo_url_none_draw(this)\" /></div>";
						html += "		<div class='balloon'>";
						html += " 			<p><span>"+spl.nickname+"</span>"+spl.msg.autoLink({target:"_blank"})+"</p>";
						if (spl.email == g360.UserInfo.email){
							html += "           <button class='btn btn_reply_delete' onclick=\"gTopMain.reply_delete('"+oid+"', '" +search_uniquekey+ "')\">"+g360.g_lang.Delete+"</button>"
						}
						
						html += " 			<div>";
					//	html += "				<button class='btn btn_talk_reply'>답글달기</button>";
					
						html += "				<span class='reply_date'>"+g360.date_term(spl.date)+"</span>";
						html += "			</div>";
						html += "		</div>";
						html += "	</li>";
						
					}
					
					html += "</ul>";
					html += "	<div class='talk_comment'>";
					html += "		<div class='talk_thm'><img src='"+photourl+"' onerror=\"g360.user_photo_url_none_draw(this)\" /></div>";
					html += "		<input type='text' onkeypress=\"gTopMain.reply_enter(this, event, '"+readers+"', '" +search_uniquekey+ "')\" placeholder='"+g360.g_lang.Add_Comment+"' />";
					html += "	</div>";
					html += "</div>";
					
					$("#li_" + id).append(html);
					
									
				},
				error : function(e){
					g360.error_alert();
				}
			})
		}else{		
		//	$("#reply_" + search_uniquekey).empty();
			$("#reply_" + search_uniquekey).remove();
		}
		
		
		
		
	},
	
	
	
	
	
	
	"reply_draw" : function(obj, opt, id, search_uniquekey){
	
		var spl = obj;
		var sphotourl = g360.user_photo_url(g360.UserInfo.email);
		var html = "";
		

		html += "	<li id='li_"+id+"'>";
		html += "		<div class='talk_thm'><img src='"+sphotourl+"' onerror=\"g360.user_photo_url_none_draw(this)\" /></div>";
		html += "		<div class='balloon'>";
		html += " 			<p><span>"+spl.nickname+"</span>"+spl.msg.autoLink({target:"_blank"})+"</p>";
		
		if (obj.email == g360.UserInfo.email){
			html += "           <button class='btn btn_reply_delete' onclick=\"gTopMain.reply_delete('"+id+"', '" +search_uniquekey+ "')\">"+g360.g_lang.Delete+"</button>"
		}
		
		
		html += " 			<div>";
	//	html += "				<button class='btn btn_talk_reply'>답글달기</button>";
		html += "				<span class='reply_date'>"+g360.date_term(spl.date)+"</span>";
		html += "			</div>";
		html += "		</div>";
		html += "	</li>";
		
		
		$("#reply_ul_"+search_uniquekey).prepend(html);
		
		
		var ccnt = $("#reply_count_" + search_uniquekey).text();
		$("#reply_count_" + search_uniquekey).text(parseInt(ccnt) + 1);
	},
	
	
	"reply_enter" : function(obj, event, readers, search_uniquekey){
		if (event.keyCode == 13){	
			
			var xdata = new Object();
			xdata.msg = $(obj).val();
			xdata.readers = g360.UserInfo.email + " " + readers;
			xdata.original_key = search_uniquekey;
			
			var data = JSON.stringify(xdata);
			
			if (xdata.msg == ""){
				alert(g360.g_lang.Main_top_Alert_8);
				return false;
			}
			
			
			var url = g360.root_path + "/reply_save.mon";
			$.ajax({
				type : "POST",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				url : url,
				data : data,
				success : function(res){
					if (res.result == "OK"){
					
						gTopMain.reply_draw(res.doc, "direct", res.doc.id, search_uniquekey);
					
									
						
						$(obj).val("");
					}
				},
				error : function(e){
					g360.error_alert();
				}
			})

		}
	},
	
	
	"talk_del" : function(id){
		var url = g360.root_path + "/talk_delete.mon?id=" + id;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				if (data.result == "OK"){
					$("#li_" + id).remove();
				}
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	"reply_delete" : function(id, pid){
		var url = g360.root_path + "/reply_delete.mon?id=" + id+"&pid=" + pid;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				if (data.result == "OK"){
					$("#li_" + id).remove();
					
					var rcount = $("#reply_count_"+pid).text();
					var cnt = parseInt(rcount) -1;
					$("#reply_count_"+pid).text(cnt);
					
				}
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	"addlike" : function(id){
		var url = g360.root_path + "/talk_add_like.mon";
		var data = JSON.stringify({
			id : id
		});
		
		$.ajax({
			type : "POST",
			url : url,
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			success : function(res){
				if (res.result == "OK"){
					var curcnt = $("#count_"+id).text();
					$("#count_"+id).text(parseInt(curcnt) + 1);
					
				}
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	"talk360_show" : function(){
		
		if ($("#talk360_main").css("display") == "none"){
			$("#talk360_main").fadeIn();
						
			$("#talk360_dis").mCustomScrollbar('destroy');
			$("#talk360_dis").empty();
			gTopMain.talk_start = 0;
			gTopMain.query = "";
			
			
			var mz = g360.maxZindex();
			
			$("#header").css("z-index", parseInt(mz) + 1);
			
			$("#talk360_main").css("z-index", parseInt(mz) + 2);
			
			
			
			gTopMain.loadTalk();

			
			gTopMain.scroll_init();
			
		}else{
			
			var ov1 = $("#detail_rec_header").get(0).className;
			if (ov1.indexOf("active") > -1){
				var zi = $("#detail_rec_header").css("z-index");
				$("#header").css("z-index", parseInt(zi) -1);
			}
			
			var ov2 = $("#detail_full_header").get(0).className;
			if (ov2.indexOf("active") > -1){
				var zi = $("#detail_full_header").css("z-index");
				$("#header").css("z-index", parseInt(zi) -1);
			}
			
			
			$("#talk360_main").fadeOut();
			$(".mention_list").empty();
			
		}
		
	},

	
	"loadTalk" : function(){
		
		var url = g360.root_path + "/loadTalk.mon?query="+encodeURIComponent(gTopMain.query)+"&start="+gTopMain.talk_start+"&perpage="+gTopMain.talk_perpage+"&"+new Date().getTime();
		
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			async : false,
			success : function(res){

				
				var data = res.hits.hits;
				
				gTopMain.talk_totalcount = res.hits.total;
				
				for (var i = 0; i < data.length; i++){
					var sp = data[i];
					var sid = sp._id;
				
					gTopMain.drawTalk(sp._source, "", sid);
				}
				
			//	gTopMain.talk_scroll();
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	
	
	"drawTalk" : function(data, opt, search_uniquekey){
		
		
		
			var talkpan = $("#talk360_dis");
			
			var dategubun = data.sortdate.substring(0,8);
			var name = data.nickname;
			var msg = g360.TextToHtml(data.msg);
			var date = g360.date_term(data.date);
			var email = data.email;
			var readers = data.readers;
			var express = data.express;
			
			var likecount = 0;
			if (typeof(data.likecount) != "undefined"){
				likecount = data.likecount;
			}
			
//			var comment = data.re;
			
			var comment_count = data.replycount ;
			if (typeof(comment_count) == "undefined"){
				comment_count = 0;
			}
			
			var type = data.imagetype;

			
			//해당 날짜 구분선이 있는지 확인한다.
			var datecnt = $("#talk_" + dategubun);
			if (datecnt.length == 0){
				var obj = "<div class='talk_date' style='margin-top:7px' id='talk_"+dategubun+"'><span>"+data.date.substring(0,10)+"</span></div>";
				obj += "<ul class='talk_alarm talk_section' id='talk_ul_"+dategubun+"'></ul>"
				
				
				if (gTopMain.talk_totalcount == 0){
					talkpan.prepend(obj);
				}else{
					talkpan.append(obj);
				}
				
			//	
			}
			
			
			var html = "";
			
			
			
			if (data.imagetype == "request"){
				html += "<li>";
				html += "	<dl>";
				html += "		<dt><div class='icon_green icon'><img src='/img/icon-invite-a-friend.svg' alt='' /></div></dt>";
				html += "		<dd>"+data.nickname+"<span>"+date+"</span></dd>";
				html += "	</dl>";
				html += "	<p>"+data.msg+"</p>";
				html += "</li>";
			}else if (data.imagetype == "recommand"){
				html += "<li>";
				html += "	<dl>";
				html += "		<dt><div class='icon_blue icon'><img src='/img/icon-invite-a-friend.svg' alt='' /></div></dt>";
				html += "		<dd>"+data.nickname+"<span>"+date+"</span></dd>";
				html += "	</dl>";
				html += "	<p>"+data.msg+"</p>";
				html += "</li>";
			}else if (data.imagetype == "invoice"){
				html += "<li>";
				html += "	<dl>";
				html += "		<dt><div class='icon_violet icon'><img src='/img/icon-mp-shipped.svg' alt='' /></div></dt>";
				html += "		<dd>"+data.nickname+"<span>"+date+"</span></dd>";
				html += "	</dl>";
				html += "	<p>"+data.msg+"</p>";
				html += "</li>";	
				
				
			}else{
				html += "<li id='li_"+search_uniquekey+"' style='position:relative'>";
				html += "	<dl>";
				var photourl = g360.user_photo_url(email);
						
				html += "		<dt><div class='talk_thm'><img src='"+photourl+"' onerror=\"g360.user_photo_url_none_draw(this)\" /></div></dt>";
				html += "		<dd>"+name+"<span>"+date+"</span></dd>";
				html += "	</dl>";
				html += "	<p>"+msg.autoLink({target:"_blank"})+"</p>";
				
				if (type == "vr"){

					var spl = data.imagepath.split("-spl-");
					var img_src = "/vr/vr/vrgallery/"+data.email+"/"+spl[0]+"/pano_f.jpg";
					
					html += "	<div class='talk_art'>";
					html += "		<span>[VR갤러리 소개] "+express+"</span>";
					html += "		<div class='talk_art_thm'  >";
					html += "			<img style='cursor:pointer' onclick=\"g360.showVRDetail('"+spl[0]+"')\" src='"+img_src+"' />";
					html += "			<img  src='/img/img_play.png' onclick=\"g360.showVRDetail('"+spl[0]+"')\" style='width:45px;hieght:45px;cursor:pointer;position:absolute;left:100px;top:200px' />";
				//	html += "			<img src='../img/thumbnail-theme-05.jpg' alt='' />";
					html += "		</div>";
					
					
					html += "	</div>";
				}else if (type == "art"){
				
					//$("#detail_popup").css("z-index", 1000005);
					
					var img_src = g360.preview_img_path(email, data.imagepath);    //"/vr/vr_data_"+spl[1]+"/"+spl[0]+"/pano_f.jpg";
					
					html += "	<div class='talk_art'>";
					html += "		<span>[작품 소개] "+express+"</span>";
					html += "		<div class='talk_art_thm'  >";
					html += "			<img style='cursor:pointer' onclick=\"g360.showArtDetail('"+data.imagepath+"')\" src='"+img_src+"' />";
				//	html += "			<img src='/img/img_play.png' style='width:42px;hieght:42px;cursor:pointer;position:absolute;left:70px;top:200px' />";
				//	html += "			<img src='../img/thumbnail-theme-05.jpg' alt='' />";
					html += "		</div>";
					html += "	</div>";
				}
				

				html += "	<div class='talk_count'>";
				html += "		<span><button class='btn btn_talk_reply' onclick=\"gTopMain.show_reply('"+search_uniquekey+"', '" +readers+ "', '" +search_uniquekey+ "')\">"+g360.g_lang.Comment+"</button><span id='reply_count_"+search_uniquekey+"'>"+comment_count+"</span></span>";
				html += "		<span><button class='btn btn_talk_like' onclick=\"gTopMain.addlike('"+search_uniquekey+"')\">"+g360.g_lang.Like+"</button><span id='count_"+search_uniquekey+"'>"+likecount+"</span></span>";
				
				if (data.email == g360.UserInfo.email){
					html += "		<span><button class='btn btn_talk_delete' onclick=\"gTopMain.talk_del('"+search_uniquekey+"')\"></button></span>";
				}
				
				html += "	</div>";
				html += "</li>";
			}
			
			
			if (opt == "direct"){
				$("#talk_ul_" + dategubun).prepend(html);
			}else{
				$("#talk_ul_" + dategubun).append(html);
			}
			
			
			
			//<div class="talk_date"><span>2018.09.04</span></div>
		},
	
	
	
	
	
	"scroll_init" : function(){
		
		var mousespeed = "200";
		
		
		$('#talk360_dis').mCustomScrollbar({				
			theme:"minimal-dark",
			mouseWheelPixels: mousespeed,
			callbacks:{
				onTotalScroll   :function(){
					
					
					gTopMain.talk_start = parseInt(gTopMain.talk_start) + parseInt(gTopMain.talk_perpage);
					
					if (parseInt(gTopMain.talk_totalcount) < parseInt(gTopMain.talk_start)){
						
					}else{
						//info("가장 밑으로 내려왔다... 다음 데이터 불러와야 한다....")
						gTopMain.loadTalk();
					}
					
             	}
         	},
         	advanced:{
         		updateOnContentResize: true
         	}      
		});
	},
	
	
	
	
	"talk_scroll" : function(){
		
			
		//	$("#talk360_dis").mCustomScrollbar('destroy');

			
			var mousespeed = "200";
				
			
			$('#talk360_dis').mCustomScrollbar({				
				theme:"minimal-dark",
				mouseWheelPixels: mousespeed,
				callbacks:{
					onTotalScroll   :function(){
				
						
//						gTopMain.talk_start = parseInt(gTopMain.talk_start) + parseInt(gTopMain.talk_perpage);
//						
//						if (parseInt(gTopMain.talk_totalcount) < parseInt(gTopMain.talk_start)){
//							
//						}else{
//							//info("가장 밑으로 내려왔다... 다음 데이터 불러와야 한다....")
//							gTopMain.loadTalk();
//						}
						
	             	}
	         	},
	         	advanced:{
	         		updateOnContentResize: true
	         	}      
			});
		},

	
	"talk360_show_only_open2" : function(content){
//		var cnt = $("#reply_" + search_uniquekey).length;
//		console.log("cnt :" + cnt)
		
		
			//webpush로 들어오는 경우 접혀 있으면 자동으로 펼친다....
				//if ($("#talk360_main").css("display") == "none"){
					$("#talk360_main").fadeIn();
								
//					$("#talk360_dis").mCustomScrollbar('destroy');
//					$("#talk360_dis").empty();
//					gTopMain.talk_start = 0;
//					
//					gTopMain.loadTalk();		
					
//					var json = JSON.parse(content);
//					console.log(json);
//					console.log(json.readers);
//					//'"+search_uniquekey+"', '" +readers+ "', '" +search_uniquekey+ "'
//					gTopMain.show_reply(json.sid, json.readers, json.sid);
					
			//	}			
			},
		
	
	"talk360_show_only_open" : function(content){

		
	
		//webpush로 들어오는 경우 접혀 있으면 자동으로 펼친다....
			//if ($("#talk360_main").css("display") == "none"){
				$("#talk360_main").fadeIn();
							
				$("#talk360_dis").mCustomScrollbar('destroy');
				$("#talk360_dis").empty();
				gTopMain.talk_start = 0;
				gTopMain.query = "";
				
				gTopMain.loadTalk();		
				
//				var json = JSON.parse(content);
//				console.log(json);
//				console.log(json.readers);
//				//'"+search_uniquekey+"', '" +readers+ "', '" +search_uniquekey+ "'
//				gTopMain.show_reply(json.sid, json.readers, json.sid);
				
		//	}			
		},
	
	
	
	
	
	
	"mobile_menu_close" : function(no_scroll){
		if ($('.mobile-menu-nav-wrap').hasClass('active')){
			if (!no_scroll)	$('body').removeClass('hidden-scroll');
			$(".mobile-menu-nav-wrap").removeClass("active");
			$(".wrapper").removeClass("active");
			$(".m-navi-bg").removeClass("active");
			$('.m-menu-wrap .has-sub').removeClass('active');			
		}
	},
	
	"change_style1" : function(){
		$("#goto_search_id").attr("class","on");
		$("#goto_search_pw").removeClass();
	},
	
	"change_style2" : function(){
		$("#goto_search_pw").attr("class","on");
		$("#goto_search_id").removeClass();
	},
	
	"load_searchid_next" : function(data){
		var html = "";

		html += '  <div class="message">';
		html += '	<p>';
		html += g360.g_lang.Find_ID_4;
		//html += '		<strong>'+id+'</strong>';

		//tr, td

		if(data.rental!=null){
			html += '<span class="find_email">' + g360.g_lang.Find_ID_5 + data.rental+'</span><br>';
		}
		if(data.art!=null){
			html += '<span class="find_email">'+ g360.g_lang.Find_ID_6 + data.art+'</span><br>';
		}
		if(data.curator!=null){
			html += '<span class="find_email">'+ g360.g_lang.Find_ID_7 + data.curator+'</span><br>';
		}
		if(data.normal!=null){
			html += '<span class="find_email">'+ g360.g_lang.Find_ID_8 + data.normal+'</span><br>';
		}
		
		html += '	</p>';
		//	html += '		<span>(가입일:2019-09-29)</span>';
		html += ' </div>';
		html += ' <button class="btn btn_black btn_login" onclick="gTopMain.gotoLogin()"><em>'+g360.g_lang.Login+'</em></button>';
		html += '</div>';
	  
	  $("#searchid_content").html(html);
	},
	
	
	"load_searchid_content" : function(){
		var html = "";
		html += '<h3>';
		html += g360.g_lang.Find_ID_1;
		html += '	<span>'+g360.g_lang.Find_ID_2+'<br /><p>&nbsp;</p></span>';
		html += '</h3>';
		html += '<div class="div_table noline">';
//		html += '	<dl>';
//		html += '		<dt>이름</dt>';
//		html += '		<dd><input type="text" class="txt"></dd>';
//		html += '	</dl>';
//		html += '	<dl>';
//		html += '		<dt>유선전화</dt>';
//		html += '		<dd class="cell_3">';
//		html += '			<span><select class="selectbox"><option>010</option><select></span>';
//		html += ' 			<span><input type="text" class="txt"></span>';
//		html += '			<span><input type="text" class="txt"></span>';
//		html += '		</dd>';
//		html += '	</dl>';
		html += '	<dl>';
//		html += '	<dt>인증번호</dt>';
		html += '	<dd class="cell_2">';
//		html += '	<span><input type="text" class="txt"></span>';
		html += '	<button class="btn btn_black btn_auth" style="width:calc((100%))" onclick="gTopMain.sms_approval(1)"><em>'+g360.g_lang.Find_ID_3+'</em></button>';
//		html += '	<p>휴대폰으로 전송된 인증번호를 입력 후 인증버튼을 눌러주세요.</p>';
		html += '	</dd>';
		html += '	</dl>';
		html += '</div>';
		html += '<button class="btn btn_ghost btn_next" style="display:none" onclick="gTopMain.load_searchid_next();"><em>'+g360.g_lang.Next+'</em></button>';
		$("#searchid_content").html(html);
	},
	
	
	
	"sms_approval" : function(opt){
		
		IMP.certification({
			company : "갤러리360",
		    merchant_uid : 'merchant_' + new Date().getTime() //본인인증과 연관된 가맹점 내부 주문번호가 있다면 넘겨주세요
		}, function(rsp) {
			
		    if ( rsp.success ) {        
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
						
				 			if (opt == "1"){
				 				//내가 smskey로 로그인 아이디 찾아 온다.
				 				var uurl = g360.root_path + "/smskey_login_check.mon?key=" + res.unique_key + "&" + new Date().getTime();
				 				
				 				$.ajax({
				 					Type : "GET",
				 					dataType : "json",
				 					contentType : "application/json; charset=utf-8",
				 					url : uurl,
				 					success : function(data){
				 						
				 						if (data.result == "T"){
				 							//gCACL.info_edit(res.name, res.gender, res.unique_key);
				 							
				 							gTopMain.load_searchid_next(data);
				 							
				 							
				 						}else{
				 							g360.gAlert("Error",g360.g_lang.Main_top_Alert_9, "red", "left");
				 							return false;
				 						}
				 					},
				 					error : function(e){
				 						g360.error_alert();
				 					}
				 				})
				 			}else{
				 				//내가 smskey로 로그인 아이디 찾아 온다.
				 				var uid = $("#check_loginid").val();
				 				if (uid == ""){
				 					g360.gAlert("Error",g360.g_lang.Main_top_Alert_10, "red", "left");
				 					return false;
				 				}
				 				var key = res.unique_key;
	
				 				var uurl = g360.root_path + "/smskey_login_check2.mon?id="+uid+"&key=" + res.unique_key + "&" + new Date().getTime();
				 				$.ajax({
				 					Type : "GET",
				 					dataType : "json",
				 					contentType : "application/json; charset=utf-8",
				 					url : uurl,
				 					success : function(data){
				 					
				 						if (data.result == "T"){
				 							//gCACL.info_edit(res.name, res.gender, res.unique_key);
				 							//gTopMain.load_searchid_next(data.id);
				 							gTopMain.load_searchpw_next1(key, uid);
				 						}else{
				 							g360.gAlert("Error",g360.g_lang.Main_top_Alert_11, "red", "left");
				 							return false;
				 						}
				 					},
				 					error : function(e){
				 						g360.error_alert();
				 					}
				 				})
				 			}
			 				
				 				
				 		
				 			
				 		}
				 	//	curl -H "Content-Type: application/json" 
				 	//    https://api.iamport.kr/certifications/{imp_uid}
				 });
		        	
		    } else {
		    	 // 인증취소 또는 인증실패
		        var msg = '인증에 실패하였습니다.';
		        msg += '에러내용 : ' + rsp.error_msg;
		        g360.gAlert("Error",msg, "red", "left");
		    }
		});
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	"load_searchpw_content" : function(){
		var html = "";
		html += '<h3>';
		html += g360.g_lang.Find_ID_1;
		html += '<span>'+g360.g_lang.Find_ID_9+'</span>';
		html += '</h3>';
		html += '<div class="div_table noline">';
		html += '<dl>';
		html += '	<dt>'+g360.g_lang.ID+'</dt>';
		html += '	<dd><input type="text" id="check_loginid" class="txt"></dd>';
		html += '</dl>';
		
		html += '<br>';
		
//		html += '<dl>';
//		html += '	<dt>유선전화</dt>';
//		html += '	<dd class="cell_3">';
//		html += '	<span>';
//		html += '		<select class="selectbox"><option>010</option><select></span>';
//		html += '		<span><input type="text" class="txt"></span>';
//		html += '		<span><input type="text" class="txt"></span>';
//		html += '	</dd>';
//		html += '</dl>';
		html += '	<dl>';
//		html += '	<dt>인증번호</dt>';
		html += '	<dd class="cell_2">';
//		html += '	<span><input type="text" class="txt"></span>';
		html += '	<button class="btn btn_black btn_auth" style="width:calc((100%))" onclick="gTopMain.sms_approval(2)"><em>'+g360.g_lang.Find_ID_3+'</em></button>';
//		html += '	<p>휴대폰으로 전송된 인증번호를 입력 후 인증버튼을 눌러주세요.</p>';
		html += '	</dd>';
		html += '	</dl>';
		html += '</div>';
//		html += '<button class="btn btn_ghost btn_next" onclick="gTopMain.load_searchpw_next1();"><em>다음</em></button>'

		$("#searchid_content").html(html);
		
	},
	
	"load_searchpw_next1" : function(key,uid){
		
		var html = "";
		html += '<h3>';
		html += g360.g_lang.Find_ID_10;
		html += '	<span>'+g360.g_lang.Find_ID_11+'</span>';
		html += '</h3>';
		html += '<div class="div_table noline">';
		html += '<dl>';
		html += '	<dt style="width:144px">'+g360.g_lang.Find_ID_12+'</dt>';
		html += '	<dd><input type="password" class="txt" id="pw1"></dd>';
		html += '</dl>';
		html += '<dl>';
		html += '	<dt style="width:144px">'+g360.g_lang.Find_ID_13+'</dt>';
		html += '	<dd><input type="password" class="txt" id="pw2"></dd>';
		html += '</dl>';
		html += '</div>';
		html += "<button class='btn btn_black btn_pw_change' onclick=\"gTopMain.load_searchpw_next2('"+key+"','"+uid+"');\"><em>"+g360.g_lang.Change_PW+"</em></button>";
		
		$("#searchid_content").html(html);
	},
	
	"load_searchpw_next2" : function(key,uid){
		//비밀번호 변경한다.
		
		var pw1 = $("#pw1").val();
		var pw2 = $("#pw2").val();
		if (pw1 != pw2){
			g360.gAlert("Error",g360.g_lang.Main_top_Alert_12, "red", "left");
			return false;
		}
		

		if (g360.paswordcheck(pw1)){				
		}else{
			return false;
		}
		
		var pw = pw1;
		var id = key;
		
		var url = g360.root_path + "/changepw.mon";		
		
		var data = JSON.stringify({
			id : id,
			pw : pw,
			email : uid
		});
		
		$.ajax({
			type : "POST",
			data : data,
			dataType : "json",
			contentType : "application/json, charset=utf-8",
			url : url,
			success : function(res){
				
				//정상 처리시 페이지 이동한다.
				var html = "";
				html += '<div class="message">';
				html += '	<p>'+g360.g_lang.Find_ID_14+'</p>';
				html += '</div>';
				html += '<button class="btn btn_black btn_login" onclick="gTopMain.gotoLogin()"><em>'+g360.g_lang.Login+'</em></button>';
				
				$("#searchid_content").html(html);
			},
			error : function(err){
				g360.gAlert("Error",g360.g_lang.Main_top_Alert_13, "red", "left");
			}
		})
		
		
		

		
	},
	
	
	"gotoLogin" : function(){
		$("#exampleModalCenter2").hide();
		$("#exampleModalCenter").show();
	},
	
	"closeXpopup" : function(){
		$("#loginPop_Close").click();
		$("#exampleModalCenter2").hide();
	},
	
	
	
	"_naverlogin" : function(){		
		$('#naverIdLogin_loginButton img').click();
	},
	
	"goto_client_artproject" : function(){
		gTopMain.navBtnAction('artProject_client');
		return false;
	},
		
	"navBtnAction" : function(menu){
		var _url = g360.root_path;
		
		$('#navbarText').removeClass('active');
		

		// 특정 메뉴 내공간 버튼 숨김 처리
		var target_menu = '|news|rental|rentalmng|rentallist|rentalrec|rentalprice|go_admin|';
		var no_scroll_move = false;
		
		if (target_menu.indexOf('|' + menu + '|') >= 0) {
			$('#main_space_icon').hide();
			$('#main_curie_icon').hide();
		} else {
			$('#main_space_icon').show();
			$('#main_curie_icon').show();
		}
		
		switch (menu) {
			case 'vrgallery':
				_url += '/main/vr_gallery/main_vrgallery.jsp';
				break;
			case 'rental':
				_url += '/main/rental/rental.jsp';
				break;
			case 'rentallist':
				_url += '/main/rental/rental.jsp?key=list';
				break;
			case 'rentalrec':
				no_scroll_move = true;
				_url += '/main/rental/rental.jsp?key=recommend';
				break;
			case 'rentalprice':
				no_scroll_move = true;
				_url += '/main/rental/rental.jsp?key=price';
				break;
			case 'rental_land':
				_url += '/main/rental/rental_land.jsp';
				break;
			case 'ai':
				_url += '/main/AI/ai.jsp';
				break;
			case 'partner_vrgallery':
				_url += '/partner/vr_gallery/vr_main.jsp';
				break;
			case "art":
				_url += '/main/art/main_art.jsp';
				break;
			case "artist":
				_url += '/main/artist/main_artist.jsp';
				break;
			case "recommand":
				_url += '/main/recommend/main_recommand.jsp';
				break;
			case "news":
				_url += '/main/news/main_news.jsp';
				break;
			case "service":
				_url += '/main/service/main_service.jsp';
				break;
			case "cart":
				_url += '/main/cart/main_cart.jsp';
				break;
			case "favorite":
				_url += '/main/favorite/main_favorite.jsp';
				break;
			case "mypage":
				_url += '/partner/mypage/mypage.jsp';
				break;
			case "profile":
				_url += '/partner/profile/profile.jsp';
				break;
			case "profile_artist" : 
				_url += '/partner/profile/profile.jsp?callfrom=artist';
				break;
			case "account":
				
				if (g360.UserInfo.gubun == "rental"){
					_url += '/rental/account/account.jsp';
				}else{
					_url += '/partner/account/account.jsp';
				}
				
				break;
			case "project":
				_url += '/partner/artProject/artProject.jsp';
				break;
			case "artProjectlist":
				_url += '/partner/artProjectlist/artProjectlist.jsp';
				break;
				
				
			case "mngMypage_client":				
				g360.history_record("btn_menu_cmypage");
				
				_url += '/client/mypage/mypage.jsp';
				break;
			case "account_client":
				g360.history_record("btn_menu_caclist");
				
				_url += '/client/aclist/aclist.jsp';
				break;
			case "puchase_client":
				g360.history_record("btn_menu_cpurchase");
				_url += '/client/purchase/purchase.jsp';
				break;
			case "artProject_client":
				g360.history_record("btn_menu_cartproject");
				
				_url += '/client/artProject/artProject.jsp';
				break;
			case "storage_client":
				
				g360.history_record("btn_menu_cstorage");
				
				_url += '/client/storage/storage.jsp';
				break;
				
				
			case "go_admin":
				_url += '/admin_new/admin_new.jsp';
			//	gTopMain.gallery_admin_page();
				break;
			case "go_admin2":
				_url += '/admin_new/admin_new_rental.jsp';
			//	gTopMain.gallery_admin_page();
				break;
			case "company":
				_url += '/admin_new/company.jsp';
			//	gTopMain.gallery_admin_page();
				break;
			case "alliance":
				_url += '/admin_new/alliance.jsp?opt=compose';
				break;
			case "recruit":
				_url += '/admin_new/bbs_recruit.jsp';
				break;
			case "clientbbs":
				_url += '/admin_new/bbs_clientbbs.jsp';
				break;
			case "faq":
				_url += '/admin_new/bbs_faq.jsp';
				break;
			case "onetoone":
				_url += '/admin_new/bbs_onetoone.jsp';
				break;
			case "notice":
				_url += '/admin_new/bbs_notice.jsp';
				break;
			case "privacy":
				_url += '/admin_new/privacy.jsp';				
				break;
			case "terms":
				_url += '/admin_new/terms.jsp';
				break;
			case "license":
				gTopMain.licenseCheck();
				break;
			case  "ascro":
				gTopMain.ascropopup();
				break;
				
			case "rentalmng":
				//rental text 옵션 처리를 위해서 기존에 옵션을 선택한 상태라면 해당 옵션 값으로 텍스트 정보를 불러와서 세팅한다.
				//rentalmng.jsp에서 처리하도록 변경함
				
				/*
				var ttx = g360.UserInfo.type;
				
				if (!ttx || ttx == ""){
					ttx = "1";
				}
				
			//	if (g360.UserInfo.type != ""){
					//기존에 rental text옵션을 선택한 사용자 이다.
					
					var url = g360.root_path + "/rental_text_check.mon?id="+ttx;
					$.ajax({
						type : "GET",
						dataType : "json",
						contentType : "application/json; charset=utf-8",
						url : url,
						async : false,
						success : function(res){
							g360.rental_text = res;
												
						},
						error : function(e){
							g360.error_alert();
						}
					})
			//	}
				*/
				
				// IE에서는 대관관리 예외처리
				if (g360.isIEBrowser()) {
					g360.gAlert("Error", g360.g_lang["Info_Rental_Mng_IE"], "red", "left");
					return;
				}
				
				var isAdmin = g360.UserInfo.role;
				if (isAdmin == "admin"){
					_url += '/rental/rentalmng.jsp';
				}else{
					//debugger;
							
					var rental_use = g360.UserInfo.rental_use;
					if (rental_use == "T"){				
						var read_guide = g360.UserInfo.read_guide;
						if (read_guide == "T"){
							_url += '/rental/rentalmng.jsp';
						}else{
							//대관서비스 가이드 화면을 표시한다.
							g360.body_scroll_hide();
							//g360.show_rental_guide();
							
							$("#rental_guide").load("/rental/guide.html",function(){ 
								
								$("#rental_guide").fadeIn(); 
							});
												
							
							return false;
						}
						
					}else{		
						//gTopMain.showPrice(1);
					//	g360.gConfirm('서비스 요금제 가입을 하셔야 합니다.<br>가입화면으로 이동하시겠습니까?', function(){
							_url += '/rental/account/account.jsp?ty=approval';
							g360.LoadPage("body_content", _url);
					//	});				
						return false;
					}			
							
				}
				
				break;
				
			case  "signup_rental":
				_url += '/main/member/userRegRental.jsp';
				break;
		}
		
		
	
		if (menu == "privacy" || menu == "terms"){
			g360.open_subwin(_url, "1250", "800", false, "info", false);
			
		}else{
			if ($('#detail_popup').is(':visible')) {
				$('#detail_btn_close').click();
			}

		//	$("#body_content").hide();
			$("#loginOK2").click();
			g360.LoadPage("body_content", _url);
		//	$("#body_content").fadeIn(500);
			
			if (no_scroll_move) {
				// 스크롤 이동되면 안되는 메뉴들				
			} else {
				g360.scroll_Top();								
			}
			
			
			g360.body_scroll_show();
		}
		
		
		
		return false;
		
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
	
	
	
	"gallery_admin_page" : function(){
		var url = g360.root_path + "/admin/admin.jsp";
	//	g360.LoadPage("body_content", url);
		
		
		$("#loginOK2").click();
		g360.LoadPage("body_content", url);
	//	$("#body_content").fadeIn(500);
		g360.scroll_Top();
		g360.body_scroll_show();
		
		return false;
		
		
//	//	$("#art_purchase_popup").show();
//		
//		
//		g360.popup_open("xadminlayer");
//		//$("#vrgallery_popup_title").val("관리자 페이지");
//		
//		$("#xadminlayer_wrapper").css("background-color", "white");
//		$("#xadminlayer_background").css("z-index", "1000");
//		$("#xadminlayer_wrapper").css("z-index", "100002");
//		$("#xadminlayer").css("left", "0px");
//		$("#xadminlayer").css("top", "0px");
//		
//		g360.scroll_Top();
//		g360.popuup_close_and_body_show_scroll = false;
		

//		window.open(url, "");
		
		
//	//	var url = g360.root_path + "/main/art/art_purchase.jsp?call_from=main";
//		g360.LoadPage("purchase_popup_detail", url);
//	//	$("#art_purchase_popup").show();
//		g360.popup_open("art_purchase_popup");
//		
//		$("#art_purchase_popup_wrapper").css("background-color", "white");
//		$("#art_purchase_popup_background").css("z-index", "10000");
//		$("#art_purchase_popup_wrapper").css("z-index", "1000002");
//		$("#art_purchase_popup").css("left", "0px");
//		$("#art_purchase_popup").css("top", "0px");
//		
//		g360.scroll_Top();
//		g360.body_scroll_show();
//		
//		g360.popuup_close_and_body_show_scroll = false;
		
		
					
	//	return false;
	},
	
	
	"mobile_login_display" : function(){
		
		//일반 사용자 로그인 - 일반 사용자는 모바일 마이페이지 서비스
		if (g360.UserInfo.gubun == 'normal'){
			$('.user-profile-m').addClass('normal-user');
		} else {
			$('.user-profile-m').removeClass('normal-user');
		}
		
		
		$("#m_userinfo2").hide();
		$("#m_userinfo").show();
		$("#m_login_name").text(g360.UserInfo.nickname);
		$("#m_login").hide();
		$("#m_addMember").hide();
		$("#m_logout").show();
		
		$("#btn_requestArt_mobile").show();
		$("#btn_uploadArt_mobile").hide();
		
	},
	
	"mobile_logout_display" : function(){
		$("#m_userinfo").hide();
		$("#m_login_name").val("");
		$("#m_login").show();
		$("#m_addMember").show();
		$("#m_logout").hide();
		
	},
	
	
	
	"mobile_login_display2" : function(){
		
		$("#m_userinfo").hide();
		$("#m_userinfo2").show();
		$("#m_login_name2").text(g360.UserInfo.nickname);
		$("#m_login").hide();
		$("#m_addMember").hide();
		$("#m_logout").show();
		
		$("#btn_requestArt_mobile").hide();
		
		if (g360.UserInfo.gubun != "rental"){
			$("#btn_uploadArt_mobile").show();
		}else{
			$("#btn_uploadArt_mobile").hide();
		}
		
	},
	
	"mobile_logout_display2" : function(){
		$("#m_userinfo2").hide();
		$("#m_login_name2").val("");
		$("#m_login").show();
		$("#m_addMember").show();
		$("#m_logout").hide();
	},
	
	"gotoHome" : function(){
		g360.goHome();hide
	}
	
	
}

