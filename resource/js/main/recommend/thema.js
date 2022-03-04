
function gThema(){
	this.top_id = 'category_theme';
}

gThema.prototype = {		

	"init" : function(id){
		var _self = this;
		window.popup_ids.push(this.top_id);
		this.query = id;
		this.loadThemeList();
		this._eventBind();
		
		var txt = "추천 태그 : #" + id.replace(/-spl-/gi, " #");
		$("#query_dis").text(txt);
	},
	
	xClose: function(){
		var _self = this;
		$("#detail_background").fadeOut();
		$('#detail_category_header').removeClass('active');
		$('#detail_category_popup').removeClass('pushmenu-open').empty();
		g360.hideFullBodyScroll();
		g360.showBodyScroll();
		_self._destroy();
	},
	
	_eventBind: function(){
		var _self = this;
		
		// ESC 키 입력시 닫기 처리
		$(document).off('keydown.popup_category_close').on('keydown.popup_category_close', function(e){
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
		$('#detail_category_header').off('click').on('click', function(){
			_self.xClose();
		});
		
		
		// 테마별 추천 상세보기
		$("#rmd_category_list").on("click", function(e){
			var $target = $(e.target);
			if ($target.closest('li').length) $target = $target.closest('li');
			var id = $target.data('bun');
			if (!id) return false;
			g360.showRecommandDetail(id);
		});
		
	},
	_destroy: function(){
		$(document).off('keydown.popup_category_close');
	},
	
	loadThemeList: function(){
		var _self = this;
		var _url = g360.root_path + '/recommand_tag_search.mon';
		$.ajax({
			type: 'POST',
			url: _url,
			contentType : "application/json; charset=utf-8",
			data: JSON.stringify({q:_self.query}),
			success: function(data){
				var cnt = 0;
				$.each(data, function(idx, val){
					if (this.select_item.length == 0) return true;
					var $el = $(
						'<li data-bun="' + this.bun + '">' +
						'  <div class="category-theme-img"></div>' +
						'  <dl>' +
						'    <dd></dd>' +
						'    <dd>' + this.title + '</dd>' +
						'    <dd>' + this.tag + '</dd>' +
						'  </dl>' +
						'  </div>' +
						'</li>'
					);
					var art = this.select_item[0];
					$el.find('.category-theme-img').css('background-image', 'url("' + g360.preview_img_path(art.email, art.dockey) + '")');
					$('#rmd_category_list').append($el);
					cnt++;
				});

				$('#rmd_category_cnt').text(cnt + '개의 테마');
			},
			error: function(){
				
			}
			
		});
	}
	
}

