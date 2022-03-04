
function gPartnerProject(){	
	gPProject = this;
	

}

gPartnerProject.prototype = {		

	"init" : function(){
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
		
	}
	
}

