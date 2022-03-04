
function gCategoryThema(){
	this.top_id = 'theme';
}

gCategoryThema.prototype = {		

	"init" : function(id){
		var _self = this;
		window.popup_ids.push(this.top_id);
		this.call_id = id;
		this.loadRecData(id);
		this._eventBind();
	},
	
	xClose: function(){
		var _self = this;
		$("#detail_background").fadeOut();
		$('#detail_rec_header').removeClass('active');
		$('#detail_rec_popup').removeClass('pushmenu-open').empty();
		g360.hideFullBodyScroll();
		g360.showBodyScroll();
	},
	
	_eventBind: function(){
		var _self = this;
		
		// ESC 키 입력시 닫기 처리
		$(document).off('keydown.popup_rec_close').on('keydown.popup_rec_close', function(e){
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
		$('#detail_rec_header').off('click').on('click', function(){
			_self.xClose();
		});
		
		// 작품 상세보기
		$('#rec_detail_artlist').on('click', function(e){
			// 작품 선택
			if (e.target.tagName == 'IMG' && $(e.target).hasClass('detail-preview')) {
				var img_id = $(e.target).data('artId');
				g360.showArtDetail(img_id);
			}
		});
	},
	
	loadRecData: function(){
		var _self = this;
		var _url = g360.root_path + '/recommand_read.mon?id=' + this.call_id;
		$.ajax({
			url: _url,
			success: function(data){
				var $list = $('#rec_detail_artlist');
				var art = data.select_item[0];
				$('#rmd_detail_title').html(/*'<em>주제</em>' + */g360.TextToHtml(data.title) + ' <span>' + data.tag + '</span>');
				$('.rmd-top-img').css('background-image', 'url("' + g360.preview_img_path(art.email, art.dockey) + '")');
				$('#rec_detail_art_count').text(data.select_item.length + '개 작품');
				
				if (data.curator_recommand && data.content) {
					$('#detail_rec_popup .rmd_visual').after($(g360.textToHtml(data.content)));
				}
				
				$.each(data.select_item, function(idx, val){
					_self._appendPictureEl($list, this);
				});
				$list.masonry();
				
				$list.imagesLoaded(function(){					
					$list.masonry('layout');			
				});
								
			},
			error: function(){
				
			}
		});
	},
	_appendPictureEl:function($wrapper, data_info){
		if (data_info.totalcount != undefined) return;
		var _url = g360.art_img_path(data_info.email, data_info.dockey);
		var _thumb = g360.preview_img_path(data_info.email, data_info.dockey);
		
		var $div = $('<div class="grid-item col-lg-3 col-md-4 col-sm-4 col-6"></div>');
		var $fig = $('<figure></figure>');
		var $img = $('<img class="detail-preview" draggable="false">')
				.attr('src', _thumb)
				.data('artId', data_info.dockey)
				.data('url', _url)
				.data('width', parseInt(data_info.width) * 10)
				.data('height', parseInt(data_info.height) * 10)
				.data('ho', data_info.hosu)
				.data('artist', data_info.email);
		
		var $figcap = $('<figcaption></figcaption>')
					.append('<h2>' + data_info.title + '</h2>')
					.append('<p>' + data_info.name + '</p>')
					.append('<p class="text-muted">' + data_info.height + ' x ' + data_info.width + 'cm ' + (data_info.art_hosu != null ? '(' + data_info.art_hosu + '호)' : "" ) + '</p>');
			
		var $cost = "";
		if (typeof(data_info.opt) != "undefined" && data_info.opt == "none"){
			$cost = $('<div class="cost-area"></div>')
			.append('<h2>가격문의</h2>');
		}else{
			var art_price = '';
			if (!data_info.art_ck1 && data_info.art_ck2) {
				// 이미지 구매만 있는 경우 이미지 가격으로 표시
				art_price = parseInt(data_info.price) * g360.image_sales_rate;
				art_price = g360.numberComma(art_price);
			} else {
				art_price = g360.numberComma(data_info.price);
			}
			$cost = $('<div class="cost-area"></div>')
			.append('<h2>₩ ' + art_price + '</h2>');
		}
//		var $cost = $('<div class="cost-area"></div>')
//					.append('<h2>₩ ' + g360.numberComma(data_info.price) + '</h2>');
		
		$fig.append($img).append($figcap).append($cost).appendTo($div);
		$wrapper.append($div);
	}
}

