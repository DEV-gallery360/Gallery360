
function gMainNewsDetail(){	
	this.top_id = 'news';
}

gMainNewsDetail.prototype = {		

	"init" : function(bun){
		var _self = this;
		window.popup_ids.push(this.top_id);
		this.loading = setTimeout(function(){$('#loadingbar').show();}, 200);
		this.load_monthly_news_detail(bun);
		this._eventBind();		
	},
	
	"xClose" : function(){
		var _self = this;
		$("#detail_background").fadeOut();
		$('#detail_full_header').removeClass('active');
		$('#detail_full_popup').removeClass('pushmenu-open').empty();
		g360.hideFullBodyScroll();
		g360.showBodyScroll();
		document.title = g360.main_title;
	},
	
	"load_monthly_news_detail" : function(bun){
	
		var _self = this;
		var url = g360.root_path + "/news_detail_info.mon?bun="+bun;
		url += "&" + new Date().getTime();
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				var url = g360.news_expand_img_path(data.email, data.filename);	
				$("#news_detail_img").attr("src", url);
				$('#detail_full_header h1').html(g360.textToHtml(data.title));
				$("#news_detail_body").html(g360.textToHtml(data.content));
				clearTimeout(_self.loading);
				$('#loadingbar').hide();
				$('#news_detail_body map').imageMapResize();
			},
			error : function(e){
				g360.error_alert();
			}
		});
	},
	
	_eventBind: function(){
		var _self = this;
		// ESC 키 입력시 닫기 처리
		$(document).off('keydown.popup_full_close').on('keydown.popup_full_close', function(e){
			if (e.keyCode == 27) {
				if ($('#my_space_layer').is(':visible')) return;	// 내공간 작품걸기 레이어가 표시되고 있으면 예외처리함
				if (!$('#detail_popup').hasClass('pushmenu-open')) {
					if (window.popup_ids[window.popup_ids.length - 1] == _self.top_id) {
						_self.xClose();
						window.popup_ids.pop();
					}
				}
			}
		});
		
		// 닫기 버튼
		$('#detail_full_header').off('click').on('click', function(){
			_self.xClose();
		});
	},
	
	// 소식지 VR갤러리 지원사업 신청하기 버튼 이벤트
	"newsCustomBtn" : function(){
		if (g360.login_check()) {
			if (g360.UserInfo.gubun != 'curator') {
				g360.gAlert("Info","해당사업은 아트컨설턴트 가입대상자만 지원신청 가능합니다.", "blue", "top");
			} else {
				g360.gAlert("Info","위 신청절차안내를 확인하시고 VR갤러리를 생성해 주세요.", "blue", "top");
			}
		} else {
			$('#addMember').click();
			this.xClose();
		}
	}
	
	
	
}

