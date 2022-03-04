
function gCuratorlist(){
	this.top_id = 'curator_list';
	this.page_info = {
		start: 0,
		perpage: 10,
		complete: false
	};
}

gCuratorlist.prototype = {		

	"init" : function(){
		
		var _self = this;
		window.popup_ids.push(this.top_id);
		this._eventBind();
		this.infiniteScroll();
		this.loadCuratorRecList();
		
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
		$("#curator_rec_list").on("click", function(e){
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
	infiniteScroll:function(){
		var _self = this;
		// 작가검색 InfiniteScroll 적용
		this.search_controller = new ScrollMagic.Controller();
		this.search_scene = new ScrollMagic.Scene({triggerElement:'#curator_rec_list_loader', triggerHook:'onEnter', offset:-100}).addTo(_self.search_controller);
		this.search_scene.on('enter', function(e) {
			var $grid = $('#curator_rec_list');
			var $loader = $('#curator_rec_list_loader');
			if (_self.page_info.complete) return;
			if (!$loader.hasClass('first') && !$loader.hasClass('active')) {
				$loader.addClass('active');
				_self.loadCuratorRecList();
			}
		});
	},
	
	loadCuratorRecList: function(){
		var _self = this;
		var _url = g360.root_path + '/load_all_recommand.mon?start=' + this.page_info.start + '&perpage=' + this.page_info.perpage + '&opt=1';
		var $loader = $('#curator_rec_list_loader');
		$.ajax({
			url: _url,
			success: function(data){
				
				var $list = $('#curator_rec_list');
				$('#curator_list_cnt').text(data[0].totalcount + '개의 아티클');
				
				if (data.length > 1) _self.page_info.start += (data.length-1);
				
				
				// 마지막 페이지 체크
				if ((data.length-1) < _self.page_info.perpage) {
					_self.page_info.complete = true;
				}
				
				$.each(data, function(idx, val){
					if (this.totalcount) return true;
					if (this.select_item.length == 0) return true;
					
					var content_text = this.content ? $('<div/>').html(this.content).text() : '';
					var $el = $(
						'<li data-bun="' + this.bun + '">' + 
						'	<div class="rmd_list_thumb"><div class="rmd_list_img"></div></div>' +
						'	<div class="rmd_info">' +
						'		<dl>' +
						'			<dt>' + this.title + '</dt>' +
						'			<dd class="rmd_writing ellipsis">' + content_text + '</dd>' +
						//'			<dd class="rmd_author"><span>글/그림</span>  큐레이터 한채연</dd>' +
						'		</dl>' +
						'	</div>' +
						'</li>'
					);
					var art = this.select_item[0];
					$el.find('.rmd_list_img').css('background-image', 'url("' + g360.preview_img_path(art.email, art.dockey) + '")');
					$list.append($el);
				});
				
				$loader.removeClass('active');
				
			},
			error: function(){
				
			}
		});
	}
}

