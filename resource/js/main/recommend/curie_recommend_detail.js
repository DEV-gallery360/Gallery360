function CurieDetail(){
	this.wrapper = $('#curie_detail_wrapper');
	this.cur_id = '';
	this.cur_art_data = null;
	this.audio = null;	
}

CurieDetail.prototype = {
	"init" : function(id){
		var _self = this;
		_self.cur_id = id;
		//g360.loadingbar_open();
		
		this.getArtInfo(id).always(function(){
			_self.eventBind();
			//g360.loadingbar_close();
		});
		
	},
	"getArtInfo" : function(id){		
		var _self = this;
		return $.ajax({
			url: g360.root_path + '/select_art_info.mon?dockey=' + id,
			success: function(data){
				_self.cur_art_info = data;
				
				_self.drawArtInfo(data);
				
				
				var _tmp = $('<div></div>')
							.data('url', g360.preview_img_path(data.email, data.art_img_filename))
							.data('width', parseInt(data.art_width) * 10)
							.data('height', parseInt(data.art_height) * 10);
				//setTimeout(function(){_self._selectPicture(_tmp);}, 200);
			} 
		});
	},
	"hideCurieDetail" : function(){
		var _self = this;
		$('#curie_detail_layer').hide();
		if (g360.time_interval) clearInterval(g360.time_interval);
		_self.wrapper.empty();
	},
	"eventBind" : function(){
		var _self = this;
		
		// 작품설명이 2개 이상일 때만 표시
		var is_btn_show = $('.curie_view_tab').is(':visible');
		
		
		// 작품설명
		_self.wrapper.find('.view_slider').owlCarousel({
			items : 1,
			dots : true,
			mouseDrag : is_btn_show,
			touchDrag : is_btn_show,
			smartSpeed : 200,
			margin : 20,
			autoHeight: true
		});
		
		_self.wrapper.find('.view_slider').on('changed.owl.carousel', function(e){
			_self.wrapper.find('.curie_view_tab li').removeClass('on');
			_self.wrapper.find('.curie_view_tab li:eq(' + e.page.index + ')').addClass('on');
		});
		
		_self.wrapper.find('.curie_view_tab li').click(function(){
			_self.wrapper.find('.view_slider').trigger('to.owl.carousel', $(this).index());
		});
		
		
		$('.curie .view_slider .owl-item').mCustomScrollbar({				
			theme:"minimal-dark",
			mouseWheel:{ scrollAmount: 80 },

			//mouseWheel:{ preventDefault: false },
         	advanced:{
         		updateOnContentResize: true
         	}      
		});
		
		// 목록보기
		_self.wrapper.find('.btn_curie_list').on('click', function(){
			_self.hideCurieDetail();
		});
		
		// 작품 상세보기
		_self.wrapper.find('.btn_curie_detail').on('click', function(){
			g360.showArtDetail(_self.cur_id);
		});
		
		// 음성 플레이
		_self.wrapper.find('.btn_sound').on('click', function(){
			try {
				if ($(this).hasClass('on')) {
					if ($(this).hasClass('pause')) {
						_self.audio.play();
						_self.getAudioTime();
						g360.time_interval = setInterval(function(){_self.getAudioTime();}, 1000);
						$(this).removeClass('pause');
					} else {
						_self.audio.pause();
						if (g360.time_interval) clearInterval(g360.time_interval);
						$(this).addClass('pause');
					}
					
				} else {
					if (_self.audio.play) {
						_self.audio.play();
						_self.getAudioTime();
						g360.time_interval = setInterval(function(){_self.getAudioTime();}, 1000);
						$(this).addClass('on');
					} else {
						g360.gAlert("Error","지원되지 않는 브라우져입니다", "red", "left");
						return;
					}
				}
			}catch(ex){}
		});
		
		// 동영상 플레이
		_self.wrapper.find('.btn_video').on('click', function(){
			// 오디오 재생중이면 중지
			_self.stopAudio();
			
			var _email = _self.cur_art_info.art_mp4_filename.substring(0, _self.cur_art_info.art_mp4_filename.lastIndexOf('_'));
			var video_src = "https://www.gallery360.co.kr" + g360.video_path(_email, _self.cur_art_info.art_mp4_filename);
			//video_src = "https://www.gallery360.co.kr/artimage/mblue4444@gmail.com-spl-1560342398964/art_mp4/mblue4444@gmail.com-spl-1560342398964_ac15f5c62ea54f963aafa564b237fd03.15312012";
			//video_src = "/test/art_mp4/mblue4444@gmail.com-spl-1560342398964_ac15f5c62ea54f963aafa564b237fd03";
			g360.showVideo(video_src);
		});
		
		// 유튜브 플레이
		_self.wrapper.find('.btn_youtube').on('click', function(){
			// 오디오 재생중이면 중지
			_self.stopAudio();
			
			var src = _self.cur_art_info.art_yutube.replace(/youtu.be/g, 'www.youtube.com/embed');
			g360.showYoutube(src);
		});
				
	},
	"stopAudio" : function(){
		var _self = this;
		if (_self.wrapper.find('.btn_sound').hasClass('on')) {
			_self.audio.pause();
			if (g360.time_interval) clearInterval(g360.time_interval);
			_self.wrapper.find('.btn_sound').removeClass('on');
		}
	},
	"drawArtInfo" : function(data){
		var _self = this;
		
		// 정보가 없는 경우 바로 닫아주기
		if (!data.email) {
			g360.gAlert('','판매자가 삭제한 작품입니다.');
			_self.hideCurieDetail();
		}
		var genre = data.art_genre_etc ? data.art_genre.replace(/기타/g, '') + data.art_genre_etc : data.art_genre;
		var source = data.art_source_etc ? data.art_source.replace(/기타/g, '') + data.art_source_etc : data.art_source;
		var img_src = g360.preview_img_path(data.email, data.dockey);
		var size = "";
		if (data.art_hosu == null){
			var size = data.art_height + ' x ' + data.art_width + 'cm';
		}else{
			var size = data.art_height + ' x ' + data.art_width + 'cm(' + data.art_hosu + '호)';
		}
		
		
		if (data.art_mp3_filename) {
			_self.wrapper.find('.remain-time').text('');
			_self.wrapper.find('.btn_sound').show();
			
			var _email = data.art_mp3_filename.substring(0, data.art_mp3_filename.lastIndexOf('_'));
			var audio_src = g360.audio_path(_email, data.art_mp3_filename);
			//audio_src = "/test/mblue4444@gmail.com-spl-1560342398964_dad65ea30d924796d2ecacd4ee23c2e4.231933.mp3";
			//audio_src = "https://www.gallery360.co.kr/artimage/mblue4444@gmail.com-spl-1560342398964/art_mp3/mblue4444@gmail.com-spl-1560342398964_dad65ea30d924796d2ecacd4ee23c2e4.231933";
			var $audio = $('<audio></audio>');
			$audio.attr('src', audio_src);
			
			_self.wrapper.find('.btn_sound').append($audio);
			_self.audio = $audio.get(0);
			
			// 종료시 이벤트
			$audio.on('ended', function(){
				if (g360.time_interval) clearInterval(g360.time_interval);
				_self.wrapper.find('.btn_sound').removeClass('on');
				_self.wrapper.find('.remain-time').text('');
			});
		}
		
		if (data.art_mp4_filename) {
			_self.wrapper.find('.btn_video').show();
		}
		if (data.art_yutube) {
			_self.wrapper.find('.btn_youtube').show();
		}	
		
		//_self.wrapper.find('.btn_video').show();
		
		
		_self.wrapper.find('#curie_detail_info_title').text(g360.TextToHtml(data.art_title));
		_self.wrapper.find('#curie_detail_info_title').append('<span>' + size + '</span>');
		_self.wrapper.find('.curie_info .info_author').text(g360.TextToHtml(data.art_artist));
		_self.wrapper.find('.curie_info .info_year').text(data.art_date_year);
		_self.wrapper.find('.curie_info .info_genre').text(g360.TextToHtml(genre));
		_self.wrapper.find('.curie_info .info_material').text(g360.TextToHtml(source));
		_self.wrapper.find('.curie_view_info:eq(0)').html(g360.TextToHtml(data.art_express));
		_self.wrapper.find('.curie_view_info:eq(1)').html(g360.TextToHtml(data.art_curator_express));
		_self.wrapper.find('.curie_img img').attr('src', img_src);
		
		// 작품설명이 없는 경우 클릭 버튼 숨김처리
		if (!data.art_express || !data.art_curator_express) {
			$('.curie_view_tab').hide();
		}
		
		
		_self.wrapper.find('.curie_img img').get(0).onload = function() {
			// 이미지 로딩이 느린 경우 리프레쉬 처리
			_self.wrapper.find('.view_slider').trigger('refresh.owl.carousel');
		}
	},
	
	"getAudioTime": function(){
		var _self = this;
		var total = parseInt(_self.audio.duration);
		var remain = _self.audio.duration - _self.audio.currentTime;
		remain = parseInt(remain);
		var m = parseInt(remain / 60);
		var s = remain - m * 60;
		
		_self.wrapper.find('.remain-time').text('- ' + m + ':' + (s < 10 ?'0'+s:s));
	}
}