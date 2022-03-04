/*
 * 호수 설정
 * F:인물형
 * P:풍경형
 * M:해경형
 * S:정방형
 */
FRAME_SIZE = {
	// 사이즈는 mm 단위
	'0' : {
		'F':{w:180, h:140},
		'P':null,
		'M':null,
		'S':null
	},
	'1' : {
		'F':{w:227, h:158},
		'P':{w:227, h:140},
		'M':{w:227, h:120},
		'S':{w:158, h:158}
	},
	'2' : {
		'F':{w:258, h:179},
		'P':{w:258, h:160},
		'M':{w:258, h:140},
		'S':{w:179, h:179}
	},
	'3' : {
		'F':{w:273, h:220},
		'P':{w:273, h:190},
		'M':{w:273, h:160},
		'S':{w:220, h:220}
	},
	'4' : {
		'F':{w:334, h:242},
		'P':{w:334, h:212},
		'M':{w:334, h:190},
		'S':{w:242, h:242}
	},
	'5' : {
		'F':{w:348, h:273},
		'P':{w:348, h:242},
		'M':{w:348, h:212},
		'S':{w:273, h:273}
	},
	'6' : {
		'F':{w:409, h:318},
		'P':{w:409, h:273},
		'M':{w:409, h:242},
		'S':{w:318, h:318}
	},
	'8' : {
		'F':{w:455, h:379},
		'P':{w:455, h:334},
		'M':{w:455, h:273},
		'S':{w:379, h:379}
	},
	'10' : {
		'F':{w:530, h:455},
		'P':{w:530, h:409},
		'M':{w:530, h:334},
		'S':{w:455, h:455}
	},
	'12' : {
		'F':{w:606, h:500},
		'P':{w:606, h:455},
		'M':{w:606, h:409},
		'S':{w:500, h:500}
	},
	'15' : {
		'F':{w:651, h:530},
		'P':{w:651, h:500},
		'M':{w:651, h:455},
		'S':{w:530, h:530}
	},
	'20' : {
		'F':{w:727, h:606},
		'P':{w:727, h:530},
		'M':{w:727, h:500},
		'S':{w:606, h:606}
	},
	'25' : {
		'F':{w:803, h:651},
		'P':{w:803, h:606},
		'M':{w:803, h:530},
		'S':{w:651, h:651}
	},
	'30' : {
		'F':{w:909, h:727},
		'P':{w:909, h:651},
		'M':{w:909, h:606},
		'S':{w:727, h:727}
	},
	'40' : {
		'F':{w:1000, h:803},
		'P':{w:1000, h:727},
		'M':{w:1000, h:651},
		'S':{w:803, h:803}
	},
	'50' : {
		'F':{w:1168, h:910},
		'P':{w:1168, h:803},
		'M':{w:1168, h:727},
		'S':{w:910, h:910}
	},
	'60' : {
		'F':{w:1303, h:970},
		'P':{w:1303, h:894},
		'M':{w:1303, h:803},
		'S':{w:970, h:970}
	},
	'80' : {
		'F':{w:1455, h:1121},
		'P':{w:1455, h:970},
		'M':{w:1455, h:894},
		'S':{w:1121, h:1121}
	},
	'100' : {
		'F':{w:1622, h:1303},
		'P':{w:1622, h:1121},
		'M':{w:1622, h:970},
		'S':{w:1303, h:1303}
	},
	'120' : {
		'F':{w:1939, h:1303},
		'P':{w:1939, h:1121},
		'M':{w:1939, h:970},
		'S':{w:1303, h:1303}
	},
	'150' : {
		'F':{w:2273, h:1818},
		'P':{w:2273, h:1621},
		'M':{w:2273, h:1455},
		'S':{w:1818, h:1818}
	},
	'200' : {
		'F':{w:2591, h:1939},
		'P':{w:2591, h:1818},
		'M':{w:2591, h:1621},
		'S':{w:1939, h:1939}
	},
	'300' : {
		'F':{w:2909, h:2182},
		'P':{w:2909, h:1970},
		'M':{w:2909, h:1818},
		'S':{w:2182, h:2182}
	},
	'500' : {
		'F':{w:3333, h:2485},
		'P':{w:3333, h:2182},
		'M':{w:3333, h:1970},
		'S':{w:2485, h:2485}
	},
}


function MySpace() {
	// 내 공간 꾸미기 레이어
	this.layer_frame = null;
	
	// 내공간 등록 관련
	this.space_reg_key = null;
	this.space_reg_name = null;
	this.space_reg_size = null;
	this.space_reg_filename = null;
	
	// 작품 불러오기 페이지 정보
	this.page_info = {
		favorite : {
			start : 0,
			perpage : 20,
			complete : false
		},
		ai : {
			start : 0,
			perpage : 50,
			complete : false
		},
		artist : {
			key : '',
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
	
	// 우측 하단 내 공간 꾸미기 아이콘
	this.space_icon = null;
	
	// 즐겨찾기 infinite scroll
	this.favo_controller = null;
	this.favo_scene = null;
	// AI 페인터 infinite scroll
	this.ai_controller = null;
	this.ai_scene = null;
	
	this.shape_type = null;
	this.size_type = null;
	this.space_size = null;
	
	this.resize_id = null;
	
	this.selectedPictureId = null;
	this.selectedSpaceId = null;
	this.load_tmpl_complete = false;	// 내공간 템플릿 로딩 완료
	
	this.bg_wrap = null;
	this.bg_img = null;
	this.canvas = null;
	this.group = null;
	this.ai_picture = null;
	this.picture = [];
	this.picture_info = [];
	this.picture_frame = null;
	this.frame_border_width = 3;
}
MySpace.prototype = {
	init: function(){
		
		if (this.layer_frame) return;
	
		this.layer_frame = $('#my_space_layer');
		this.space_icon1 = $('<div id="main_curie_icon" class="btn_main_curie" onclick="g360.load_Curie();"><img title="Gallery360 인공지능 큐리(Curie)" src="/img/deco/btn_360_curie_nodot.png"></div>');
		$('body').prepend(this.space_icon1);
		
		this.space_icon = $('<div id="main_space_icon" class="btn_main_myspace"><img title="내공간에 작품 걸어보기" src="/img/deco/btn_circle_deco.png"></div>');
		$('body').prepend(this.space_icon);
		
		this.initTemplate();
		//this.initSpaceReg();
		this.initInfiniteScroll();
		this.initAuthor();
		
		this.tooltip = $('<div class="balloon">작품을 움직여 보세요</div>');
		this.bg_wrap = $('#bg_wrapper');
		this.bg_wrap.append(this.tooltip);
		this.bg_wrap.append('<canvas id="bg_canvas"></canvas>');
		this.canvas = new fabric.Canvas('bg_canvas');
		this.canvas.hoverCursor = 'default';
		this.canvas.selection = false;
		

		// 작품 삭제 버튼
		this.deleteBtn = $('<img id="btn_deco_delete" src="/img/btn_picture_deleted.png" class="deleteBtn" style="display:none;position:absolute;cursor:pointer;width:30px;height:30px;"/>');
	    $(this.canvas.wrapperEl).append(this.deleteBtn);
	    
		// 기본값으로 먼저 뿌려줌...
		var _bg_w = Math.ceil(this.bg_wrap.width());
		var _bg_h = Math.ceil(_bg_w * 0.6);
		this.bg_wrap.height(_bg_h);
		this.canvas.setDimensions({
            width: _bg_w,
            height: _bg_h
        });
		
		this._eventBind();
		
		this.g_lang();
	},
	
	"g_lang" : function(){
		
		$(".g_lang_HangingArt_1").html(g360.g_lang.HangingArt_1);
		$(".g_lang_HangingArt_2").html(g360.g_lang.HangingArt_2);
		$(".g_lang_HangingArt_3").html(g360.g_lang.HangingArt_3);
		$(".g_lang_HangingArt_4").html(g360.g_lang.HangingArt_4);
		$(".g_lang_HangingArt_5").html(g360.g_lang.HangingArt_5);
		
		$(".g_lang_Close").html(g360.g_lang.Close);
		
		$(".g_lang_Scenery").html(g360.g_lang.Scenery);
		$(".g_lang_Character").html(g360.g_lang.Character);
		$(".g_lang_Still_Life").html(g360.g_lang.Still_Life);
		$(".g_lang_Animal").html(g360.g_lang.Animal);
		$(".g_lang_Abstract").html(g360.g_lang.Abstract);
		$(".g_lang_PopArt").html(g360.g_lang.PopArt);
		$(".g_lang_Object").html(g360.g_lang.Object);
		
		$(".g_lang_Form").html(g360.g_lang.Form);
		$(".g_lang_Square").html(g360.g_lang.Square);
		$(".g_lang_Horizontal").html(g360.g_lang.Horizontal);
		$(".g_lang_Vertical").html(g360.g_lang.Vertical);
		$(".g_lang_Circle").html(g360.g_lang.Circle);
		$(".g_lang_Size1").html(g360.g_lang.Size1);
		
		$(".g_lang_ProductionRequest").html(g360.g_lang.ProductionRequest);
		$(".g_lang_ArtworkSelection").html(g360.g_lang.ArtworkSelection);
		$(".g_lang_My_Space_Reg").html(g360.g_lang.My_Space_Reg);
		
		$(".g_lang_Facebook").html(g360.g_lang.Facebook);
		$(".g_lang_Kakaotalk").html(g360.g_lang.Kakaotalk);
		$(".g_lang_Naver").html(g360.g_lang.Naver);
		$(".g_lang_Band").html(g360.g_lang.Band);
		$(".g_lang_Twitter").html(g360.g_lang.Twitter);
		
		$(".g_lang_Name_of_space").html(g360.g_lang.Name_of_space);
		$(".g_lang_Width_of_space").html(g360.g_lang.Width_of_space);
		$(".g_lang_Save").html(g360.g_lang.Save);
		$(".g_lang_Cancel").html(g360.g_lang.Cancel);
		
		$(".g_lang_Artwork_Search").html(g360.g_lang.Artwork_Search);
		$(".g_lang_Favorites").html(g360.g_lang.Favorites);
		$(".g_lang_AI_Painter").html(g360.g_lang.AI_Painter);
		
		$(".g_lang_Prev").html(g360.g_lang.Prev);
		
		$(".g_lang_Login").html(g360.g_lang.Login);
		$(".g_lang_Sign_Up").html(g360.g_lang.Sign_Up);
		
		$(".g_lang_Theme").html(g360.g_lang.Theme);
		$(".g_lang_Form").html(g360.g_lang.Form);
		$(".g_lang_Size").html(g360.g_lang.Size);
		$(".g_lang_Info").html(g360.g_lang.Info);
		
		$(".g_lang_Nohave_Favorites").html(g360.g_lang.Nohave_Favorites);
		$(".g_lang_Nohave_AIPainter").html(g360.g_lang.Nohave_AIPainter);
		
		
		$(".g_lang_TurnOff_Setting").html(g360.g_lang.TurnOff_Setting);
		

		//deco_space.jsp
		$("#my_space_template em:eq(0)").text(g360.g_lang.My_Space1);
		$("#my_space_template em:eq(1)").text(g360.g_lang.My_Space2);
		$("#my_space_template em:eq(2)").text(g360.g_lang.My_Space3);
		$("#my_space_template em:eq(3)").text(g360.g_lang.My_Space4);
		$("#my_space_template em:eq(4)").text(g360.g_lang.My_Space5);
		$("#my_space_template em:eq(5)").text(g360.g_lang.My_Space6);
		$("#my_space_template em:eq(6)").text(g360.g_lang.My_Space7);
		$("#my_space_template em:eq(7)").text(g360.g_lang.My_Space8);
		$("#my_space_template em:eq(8)").text(g360.g_lang.My_Space9);
		$("#my_space_template em:eq(9)").text(g360.g_lang.My_Space10);
		
		//hosu
		$(".search-size button:eq(0)").text(g360.g_lang.Hosu1);
		$(".search-size button:eq(1)").text(g360.g_lang.Hosu2);
		$(".search-size button:eq(2)").text(g360.g_lang.Hosu3);
		$(".search-size button:eq(3)").text(g360.g_lang.Hosu4);
		$(".search-size button:eq(4)").text(g360.g_lang.Hosu5);
		
	},
	
	initTemplate: function() {
		var _self = this;
		$('#my_space_template').owlCarousel({
			nav: true,
			navContainer: '#my_space_template_nav',
			navText: ['', ''],
			dots: false,
			autoWidth: true,
			margin: 9,
			//mouseDrag: false,
			slideBy: 3,
			items: 5,
			onlyLeftDirection: true
		});
	},
	// 내 공간 등록
	initSpaceReg: function(){
		var _self = this;
		
		if (!_self.mySpaceDropzone){
			$('#myspaceImgReg').dropzone({
				url: '/FileUpload_Art.gu',
				maxFilesize: 100,  //100M
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
		        dictDefaultMessage: "",//"내공간 이미지를 선택해 주세요.<br>(.jpg,.png,.gif)",
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
		                $(this.element).addClass('addfile');
		            });
					
					this.on('removedfile', function(){
						$(this.element).removeClass('addfile');
					});
				},				
				
				removedfile : function(file) {
		            var name = file.upload.filename;
		            $.ajax({
		                headers: {
		                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
		                        },
		                type: 'POST',
		                url: '/removefile.gu',
		                data: {filename: name},
		                success: function (data){
		                    //console.log("File has been successfully removed!!");
		                },
		                error: function(e) {
		                    console.log(e);
		                }
		            });
		            var fileRef;
		            return (fileRef = file.previewElement) != null ? 
		            fileRef.parentNode.removeChild(file.previewElement) : void 0;
		        },
				success : function(file, response){
					var res = JSON.parse(response);
					if (res.result == "OK" && res.filename){
						_self.space_reg_filename = res.filename;
						_self.addMyspace();						
					}else{
						g360.gAlert("Error",g360.g_lang.HangingArt_8, "red", "left");
					}
					g360.loadingbar_close();
				},
				error : function(file, response){
					g360.loadingbar_close();
					return false;
					
				}
			});
			
			_self.mySpaceDropzone = $('#myspaceImgReg')[0].dropzone;
		}
	},
	initInfiniteScroll:function(){
		var _self = this;
		
		// 즐겨찾기 InfiniteScroll 적용
		this.favo_controller = new ScrollMagic.Controller({container:'#deco_tab_favorite'});
		this.favo_scene = new ScrollMagic.Scene({triggerElement:'#favo_loader', triggerHook:'onEnter', offset:-100}).addTo(_self.favo_controller);
		this.favo_scene.on('enter', function(e) {
			var $grid = $('#my_space_favorite');
			var $loader = $('#favo_loader');
			if (_self.layer_frame.get(0).style.display == 'none' ||
					$('#deco_tab_favorite').get(0).style.display == 'none') return;
			if (_self.page_info.favorite.complete) return;
			if (!$loader.hasClass('first') && !$loader.hasClass('active')) {
				//console.log('loading scroll');
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
		
		// AI페인터 InfiniteScroll 적용
		this.ai_controller = new ScrollMagic.Controller({container:'#deco_tab_ai'});
		this.ai_scene = new ScrollMagic.Scene({triggerElement:'#ai_loader', triggerHook:'onEnter', offset:-100}).addTo(_self.ai_controller);
		this.ai_scene.on('enter', function(e) {
			var $grid = $('#my_space_ai');
			var $loader = $('#ai_loader');
			if (_self.layer_frame.get(0).style.display == 'none' ||
					$('#deco_tab_ai').get(0).style.display == 'none') return;
			if (_self.page_info.ai.complete) return;
			if (!$loader.hasClass('first') && !$loader.hasClass('active')) {
				$loader.addClass('active');
				_self.getAipainterList().then(function(data){
					if (data.length > 0) {
						$.each(data, function(){_self._appendAipainterEl($grid, this);});
						
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
		this.search_controller = new ScrollMagic.Controller({container:'#deco_tab_search'});
		this.search_scene = new ScrollMagic.Scene({triggerElement:'#search_loader', triggerHook:'onEnter', offset:-100}).addTo(_self.search_controller);
		this.search_scene.on('enter', function(e) {
			var $grid = $('#search_list');
			var $loader = $('#search_loader');
			if (_self.layer_frame.get(0).style.display == 'none' ||
					$('#deco_tab_search').get(0).style.display == 'none') return;
			if (_self.page_info.search.complete) return;
			if (!$loader.hasClass('first') && !$loader.hasClass('active')) {
				//console.log('search loading scroll');
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
	//내공간 이미지 등록하기 (DB저장)
	addMyspace:function(){
		var _self = this;
		
		var data = JSON.stringify({
			space_key : _self.space_reg_key,
			space_name : _self.space_reg_name,
			space_size : _self.space_reg_size,
			filename : _self.space_reg_filename,
		});
		
		
		var url = g360.root_path + "/myspace_image_upload.mon";
		$.ajax({
			type : "Post",
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				var new_space = _self._getTmplHtml({
					key	: _self.space_reg_key,
					filename : _self.space_reg_filename,
					name: _self.space_reg_name,
					size: _self.space_reg_size
				});
				$('#my_space_template').trigger('add.owl.carousel', [new_space, 0]).trigger('refresh.owl.carousel').trigger('to.owl.carousel', [0, 10]);
				
				// 초기화
				//if (_self.mySpaceDropzone) _self.mySpaceDropzone.removeAllFiles();
				$('#space_reg_name').val('');
				$('#space_reg_size').val('');
				_self.space_reg_key = '';
				_self.space_reg_filename = '';
				_self.space_reg_name = '';
				_self.space_reg_size = '';
				
				
				$('#space_reg_wrapper').hide();
				$('#my_space_template').find('.space_tmpl:eq(0)').click();
				$('#my_space_template').find('.myroom:last').addClass('mylast');
				
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	initAuthor:function(){
		var _self = this;
		
		// 캐러셀을 새로 생성한다
		$('#author_carousel_wrapper').empty();
		$('#author_carousel_wrapper').append('<div id="my_space_author" class="art-slider owl-carousel owl-theme"></div>');
		$('#author_carousel_wrapper').append('<div id="my_space_author_nav" class="author-nav"></div>');				
		$('#my_space_author').owlCarousel({
			nav: true,
			navContainer: '#my_space_author_nav',
			navText: ['', ''],
			dots: false,
			autoWidth: true,
			margin: 6,
			slideBy: 3,
			merge: true,
			nestedItemSelector: 'item',
			onlyLeftDirection: true,
			onChanged:function(e){
				if (_self.page_info.artist.key != '' && !_self.page_info.artist.complete) {
					var $next = $('#my_space_author_nav').find('.owl-next');
					if ($next.hasClass('disabled')) {
						_self.getNextAuthorPicture();
					}
				}
			}
		});
		
		// 초기화
		this.page_info.artist.key = '';
		this.page_info.artist.start = 0;
		//this.page_info.artist.perpage = 20;
		this.page_info.artist.complete = false;
		
		// 작품 클릭 이벤트 처리
		$('#my_space_author').on('click', '.item', function(e){
			_self._selectPicture($(this).find('img'));
		});
	},
	//내공간에 등록된 이미지 가져오기
	getMyspaceList : function(){
		var _self = this;
		var url = g360.root_path + "/myspace_image_list.mon";
		url += "?" + new Date().getTime();
		return $.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				var _html = '';
				var _idx = -1;
				$.each(data, function(){
					if (!this.space_key) return true;
					var space_info = {
						key: this.space_key,
						filename: this.filename,
						name: this.space_name,
						size: this.space_size
					}
					//_html += _self._getTmplHtml(space_info);
					_html = _self._getTmplHtml(space_info);
					_idx++;
					$('#my_space_template').trigger('add.owl.carousel', [_html, _idx]).trigger('refresh.owl.carousel');
				});
				//if (_html) $('#my_space_template').prepend(_html);
				
			},
			error : function(e){
				console.log('내공간 로딩 실패');
				//alert("요청중 오류가 발생하였습니다. \n관리자에게 문의하시기 바랍니다.");
			}
		})
	},
	
	//즐겨찾기 이미지 가져오기
	getFavoriteList : function(){
		var _self = this;
		var url = g360.root_path + "/favorite_image_list.mon?start="+_self.page_info.favorite.start+"&perpage="+_self.page_info.favorite.perpage;
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
				console.log("즐겨찾기 데이터 처리중 오류가 발생하였습니다.");
			}
		})
	},
	
	//즐겨찾기 이미지 가져오기
	getAipainterList : function(){
		var _self = this;

		var url = g360.root_path + "/AIPainterList.mon?start="+_self.page_info.ai.start+"&perpage="+_self.page_info.ai.perpage;
		var url = g360.root_path + "/AIPainterList.mon?start="+_self.page_info.ai.start+"&perpage=40";
		//var url = g360.root_path + "/favorite_image_list.mon?start="+_self.page_info.ai.start+"&perpage="+_self.page_info.ai.perpage;

		return $.ajax({
			dataType : "json",
			url : url,
			success : function(data){
				if (data.length > 0) _self.page_info.ai.start += data.length;
				
				// 마지막 페이지
				if (data.length < _self.page_info.ai.perpage) {
					_self.page_info.ai.complete = true;
				}
			},
			error : function(e){
				console.log("즐겨찾기 데이터 처리중 오류가 발생하였습니다.");
			}
		})
	},
	
	
	//특정 작가의 작품 리스트 가져오기
	getArtistPicture : function(){
		var _self = this;
		var url = g360.root_path + "/load_image_for_artist.mon?start=" + _self.page_info.artist.start + "&perpage="+_self.page_info.artist.perpage+"&email="+_self.page_info.artist.key;
		return $.ajax({
			dataType : "json",
			url : url,
			success : function(data){
				if (data.length > 0) _self.page_info.artist.start += data.length - 1;
				
				// 마지막 페이지
				if ((data.length-1) < _self.page_info.artist.perpage) {
					_self.page_info.artist.complete = true;
				}
			},
			error : function(e){
				console.log("작가의 다른작품 데이터 처리중 오류가 발생하였습니다.");
			}
		})
	},
	
	//작품 검색 하기
	getSearchList : function(){
		var _self = this;
		var query = $.extend({}, _self.page_info.search.query, true);
		query.start = _self.page_info.search.start;
		query.perpage = _self.page_info.search.perpage;
		query.sort = 'date'; //최신순으로 정렬
		
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
		
		var page = $('#search_key_result .search-filter').length ? 'load_image_select_option.mon' : 'all_image_list.mon'; 
		var url = g360.root_path + "/" + page + "?sort=random&start=" + _self.page_info.search.start + "&perpage="+_self.page_info.search.perpage;		
		return $.ajax({
			type : "POST",
			data : data,
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				// 배열첫번째로 totalcount값이 내려옴
				if (data.length > 1) {
					_self.page_info.search.start += (data.length-1);
					
					// 전체 개수보다 가져온 데이터가 많으면 자른다
					if (data[0].totalcount < _self.page_info.search.start) {
						var over = _self.page_info.search.start - data[0].totalcount;
						_self.page_info.search.start -= over;
						data.splice(1, over); // 중복영역 자르기
					}
				}
				
				// 카운트 셋팅
				$('#deco_loading_cnt').html(_self.page_info.search.start);
				$('#deco_total_cnt').html(data[0].totalcount);
				
				/*
				// 마지막 페이지 체크
				if ((data.length-1) < _self.page_info.search.perpage) {
					_self.page_info.search.complete = true;
				}
				*/
				// 마지막 페이지 체크
				if (data[0].totalcount <= _self.page_info.search.start) {
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
		var $grid = $('#search_list');
		var $loader = $('#search_loader');
		
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
	removeMyspace:function(key){
		var url = g360.root_path + "/myspace_image_remove.mon?space_key=" + key;
		url += "&" + new Date().getTime();
		return $.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(data){
				//console.log(data);
			},
			error : function(e){
				g360.error_alert();
			}
		})
	},
	
	_getTmplHtml:function(space_info){
		var _url = g360.myspace_img_path(g360.UserInfo.email, space_info.filename);
		var _thumb = g360.myspace_thumbnail_img_path(g360.UserInfo.email, space_info.filename);
		
		var _html = '<div class="space_tmpl item myroom"' +
			' data-space-id="' + space_info.key + '"' +
			' data-space-size="' + space_info.size + '"' +
			' data-space-url="' + _url + '">' +
			'<img src="' + _thumb + '"><span><em>' + space_info.name + '</em><button class="btn btn_thm_delete ico">삭제</button></span>' +
			'</div>';
		
		return _html;
	},
	
	_getArtistPictureObj:function(data_info) {
		var _url = g360.preview_img_path(data_info.email, data_info.art_img_filename);
		var _thumb = g360.thumbnail_img_path(data_info.email, data_info.art_img_filename);
		_url = _url + "?open&ver=" + data_info.version;
		_thumb = _thumb + "?open&ver=" + data_info.version;
		
		var $div = $('<div class="item"></div>');
		var $img = $('<img>')
				.attr('src', _thumb)
				.data('url', _url)
				.data('id', data_info.art_img_filename)
				.data('width', parseInt(data_info.art_width) * 10)
				.data('height', parseInt(data_info.art_height) * 10)
				.data('ho', data_info.art_hosu)
				.data('artist', data_info.email)
				.appendTo($div);
		
		return $div;
	},
	
	_appendPictureEl:function($wrapper, data_info){
		if (data_info.totalcount != undefined) return;
		var _url = g360.preview_img_path(data_info.email, data_info.art_img_filename);
		var _thumb = g360.thumbnail_img_path(data_info.email, data_info.art_img_filename);
		_url = _url + "?open&ver=" + data_info.version;
		_thumb = _thumb + "?open&ver=" + data_info.version;
		
		var $div = $('<div class="grid-item my-favo col-lg-3 col-md-4 col-sm-4 col-6"></div>');
		var $fig = $('<figure></figure>');
		var $img = $('<img draggable="false" class="picture">')
				.attr('src', _thumb)
				.data('url', _url)
				.data('id', data_info.art_img_filename)
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
	
	_appendAipainterEl_test:function($wrapper, data_info){
		if (data_info.totalcount != undefined) return;
		var _url = g360.preview_img_path(data_info.email, data_info.art_img_filename);
		var _thumb = g360.thumbnail_img_path(data_info.email, data_info.art_img_filename);
		
		var $div = $('<div class="grid-item my-favo col-lg-3 col-md-4 col-sm-4 col-6"></div>');
		var $fig = $('<figure></figure>');
		var $img = $('<img draggable="false" class="ai">')
				.attr('src', _thumb)
				.data('url', _url)
				.data('id', data_info.art_img_filename);
		
		$fig.append($img).appendTo($div);
		
		$wrapper.append($div).masonry('appended', $div);
	},
	
	_appendAipainterEl:function($wrapper, data_info){
		if (data_info.totalcount != undefined) return;
		
		var _url = g360.domain + "/artimage/" + g360.UserInfo.email + "/artRequest_AI/result/" + data_info.dockey + "_out_water_small.png";
		
		var $div = $('<div class="grid-item my-favo col-lg-3 col-md-4 col-sm-4 col-6"></div>');
		var $fig = $('<figure></figure>');
		var $img = $('<img draggable="false" class="ai">')
				.attr('src', _url)
				.data('url', _url)
				.data('id', data_info.dockey);
				//.data('width', parseInt(data_info.art_width) * 10)
				//.data('height', parseInt(data_info.art_height) * 10)
				//.data('ho', data_info.art_hosu)
				//.data('artist', data_info.email);
		
		$fig.append($img).appendTo($div);
		
		$wrapper.append($div).masonry('appended', $div);
	},
	getSpaceInfo:function(el){
		return {
			id : el.data('space-id'),
			size : el.data('space-size'),
			url : el.data('space-url')
		};
	},
	loadTemplate: function() {
		var _self = this;
		
		$('#my_space_template').trigger('refresh.owl.carousel');
		if (g360.UserInfo == null) {
			var $first = $('#my_space_template').find('.space_tmpl:eq(0)');
			$first.click();
		} else {
			//if (this.load_tmpl_complete) return;

			// 개인설정된 항목이 있으면 모두 삭제
			$('#my_space_template .space_tmpl.myroom').each(function(_idx, _el) {
				$('#my_space_template').trigger('remove.owl.carousel', 0);
			});
			
			// 저장해놓은 내 공간 가져오기
			_self.getMyspaceList().always(function() {
				// Default 첫번째 공간 선택
				$('#my_space_template').trigger('to.owl.carousel', [0, 10]);
				var $first = $('#my_space_template').find('.space_tmpl:eq(0)');
				$first.click();
				$('#my_space_template').find('.myroom:last').addClass('mylast');
				
				_self.load_tmpl_complete = true;
			});
		}
	},
	loadAuthor: function() {
		$('#my_space_author').owlCarousel({
			//loop: true,
			//autoplay: true,
			//autoplayTimeout: 3000,
			//autoplaySpeed: 1000,
			//autoplayHoverPause: true,
			nav: true,
			navContainer: '#my_space_author_nav',
			navText: ['', ''],
			dots: false,
			autoWidth: true,
			margin: 6,
			slideBy: 3,
			merge: true,
			onlyLeftDirection: true
		});
	},
	// 즐겨찾기 초기 로딩
	loadFavorite: function() {
		var _self = this;
		var _html = '';
		var $grid = $('#my_space_favorite');
		var $loader = $('#favo_loader');
		if (g360.UserInfo == null) {
			// 로그인 안된 경우
			$('#deco_anonymous_favorite').show();
			$grid.removeClass('columns');
			return;
		} else {
			$('#deco_anonymous_favorite').hide();
			$grid.addClass('columns');
		}
		
		$('#btn_deco_favorite').click();
		$('#deco_tab_favorite').scrollTop(0);
		$loader.addClass('first active');
		$grid.css('opacity', 0);
		
		// 즐겨찾기 데이터 가져오기 초기화
		_self.page_info.favorite.start = 0;
		_self.page_info.favorite.perpage = 20;
		_self.page_info.favorite.complete = false;
		$grid.masonry('remove', $grid.find('.my-favo')).masonry('layout');
		
		// 즐겨찾기 데이터 가져오기
		_self.getFavoriteList().then(function(data){
			if (data[0].totalcount > 0) {
				$grid.addClass('columns');
				$('#deco_nodata_favorite').hide();
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
				$grid.removeClass('columns');
				$('#deco_nodata_favorite').show();
				$loader.removeClass('first active');
			}
		}, function() {
			$loader.hide();
		});
	},
	// AI 페인터 로딩
	loadAipainter: function() {
		var _self = this;
		var _html = '';
		var $grid = $('#my_space_ai');
		var $loader = $('#ai_loader');
		if (g360.UserInfo == null) {
			// 로그인 안된 경우
			$('#deco_anonymous_ai').show();
			$grid.removeClass('columns');
			return;
		} else {
			$('#deco_anonymous_ai').hide();
			$grid.addClass('columns');
		}
		
		$('#btn_deco_ai').click();
		$('#deco_tab_ai').scrollTop(0);
		$loader.addClass('first active');
		$grid.css('opacity', 0);
		
		// AI 페인터 데이터 가져오기 초기화
		_self.page_info.ai.start = 0;
		_self.page_info.ai.perpage = 20;
		_self.page_info.ai.complete = false;
		$grid.masonry('remove', $grid.find('.my-favo')).masonry('layout');
		
		// 즐겨찾기 데이터 가져오기
		_self.getAipainterList().then(function(data){
			console.log(data);
			if (data[0].totalcount > 0) {
				$grid.addClass('columns');
				$('#deco_nodata_ai').hide();
				$.each(data, function(){_self._appendAipainterEl($grid, this);});
				
				// 이미지 로딩이 완료되면 화면에 표시
				$grid.imagesLoaded(function(){
					_self.ai_scene.update();
					$loader.removeClass('first active');
					$grid.masonry();
					$grid.css('opacity', 1);
				});
			} else {
				// 데이터가 없는경우
				$grid.removeClass('columns');
				$('#deco_nodata_ai').show();
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
		var $grid = $('#search_list');
		var $loader = $('#search_loader');
		if (_self.load_search_complete) return;
		
		$loader.addClass('first active');
		$grid.css('opacity', 0);
		
		// 즐겨찾기 데이터 가져오기 초기화
		_self.page_info.search.start = 0;
		_self.page_info.search.perpage = 20;
		_self.page_info.search.complete = false;
		$grid.masonry('remove', $grid.find('.my-favo')).masonry('layout');
		
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
					//_self.page_info.search.perpage = 10;
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
	showSpace: function() {
		
		g360.history_record("myspace_title_header");g360.history_record("myspace_title_header");
		
		var _self = this;
		var mz = g360.maxZindex();
		$('#deco_block').css('z-index', mz+1).show();
		this.layer_frame.css('z-index', mz+2).show();
		this.layer_frame.find('.full-popup-title').addClass('active');
		this.layer_frame.find('.deco_right').removeClass('active');
		g360.body_scroll_hide();
		$('#deco_tab_search').scrollTop(0);
		
		$('#ck_multi_select').prop('checked', false);
		$('#header').css('width', 'calc(100% - 17px)');
		
		this.hideTooltip();
		this._removePictureFrame();
		this._removePicture();
		this.canvas.renderAll();
		this.loadTemplate();
		//this.loadFavorite();
		//this.initSpaceReg();
		//this.initAuthor();
		
		// 기본 작품검색 탭 클릭
		//$('#btn_deco_search').removeClass('on').click();
		$('#btn_deco_search').siblings('.on').removeClass('on');
		$('#btn_deco_search').addClass('on');
		$('#deco_tab_favorite').hide();
		$('#deco_tab_ai').hide();
		$('#deco_tab_search').show().attr('tabindex', -1).focus();
		if ( $.data($('#deco_tab_search').get(0), 'masonry') ){
			$('#deco_tab_search').masonry('layout');
		}
		$('#deco_search_cnt').show();		
		$('#btn_searchfilter_remove').click();
		
		
		
		// 공유하기 레이어 처리
		$(document).off('mousedown.deco.share').on('mousedown.deco.share', function(e){
			if ($('#deco_share_layer').is(':visible')) {
				if ($(e.target).closest('#deco_share_layer').length == 0) {
					$('#deco_share_layer').hide();
				}
			}
		});
	},
	
	showSpace_ai_tab: function() {
		
		g360.history_record("myspace_title_header");g360.history_record("myspace_title_header");
		
		var _self = this;
		var mz = g360.maxZindex();
		$('#deco_block').css('z-index', mz+1).show();
		this.layer_frame.css('z-index', mz+2).show();
		this.layer_frame.find('.full-popup-title').addClass('active');
		this.layer_frame.find('.deco_right').removeClass('active');
		g360.body_scroll_hide();
		$('#deco_tab_search').scrollTop(0);
		
		$('#ck_multi_select').prop('checked', false);
		$('#header').css('width', 'calc(100% - 17px)');
		
		this.hideTooltip();
		this._removePictureFrame();
		this._removePicture();
		this.canvas.renderAll();
		this.loadTemplate();
		//this.loadFavorite();
		//this.initSpaceReg();
		//this.initAuthor();
		
		// 기본 작품검색 탭 클릭
		//$('#btn_deco_search').removeClass('on').click();
		$('#btn_deco_search').siblings('.on').removeClass('on');
		$('#btn_deco_search').addClass('on');
		$('#deco_tab_favorite').hide();
		$('#deco_tab_ai').hide();
		$('#deco_tab_search').show().attr('tabindex', -1).focus();
		if ( $.data($('#deco_tab_search').get(0), 'masonry') ){
			$('#deco_tab_search').masonry('layout');
		}
		$('#deco_search_cnt').show();		
		$('#btn_searchfilter_remove').click();
		
		
		$('#btn_deco_ai').click();
		
		// 공유하기 레이어 처리
		$(document).off('mousedown.deco.share').on('mousedown.deco.share', function(e){
			if ($('#deco_share_layer').is(':visible')) {
				if ($(e.target).closest('#deco_share_layer').length == 0) {
					$('#deco_share_layer').hide();
				}
			}
		});
	},
	
	
	hideSpace: function() {
		$('#space_reg_wrapper').hide();
		$('#deco_block').hide();
		this.layer_frame.find('.full-popup-title').removeClass('active');
		this.layer_frame.hide();
		g360.showBodyScroll();
		$('#header').css('width', '');
		$(document).off('mousedown.deco.share');
	},
	showAuthor: function(artist_key) {
		var _self = this;

		if (_self.page_info.artist.key != artist_key) {						 
			// 작가의 작품들을 불러온다 (초기화)
			this.page_info.artist.key = artist_key;
			this.page_info.artist.start = 0;
			this.page_info.artist.perpage = 20;
			this.page_info.artist.complete = false;

			// 데이터 가져오기
			var $carousel = $('#my_space_author');
			_self.getArtistPicture().then(function(data){
				var $items = $('<div></div>');
				$.each(data, function(idx, val){
					if (this.totalcount) return true;
					$items.append(_self._getArtistPictureObj(this));
				});
				$carousel.trigger('replace.owl.carousel', $items);
				$carousel.imagesLoaded(function(){
					$carousel.trigger('refresh.owl.carousel');
				});
				// this.page_info.artist.perpage = 5;
			});
		}
		
		$('#author_wrapper').addClass('active');
		//$('.author_area', '#author_wrapper').removeClass('hidden');
	},
	getNextAuthorPicture:function(){
		var _self = this;
		// 데이터 가져오기
		var $carousel = $('#my_space_author');
		_self.getArtistPicture().then(function(data){
			$.each(data, function(){
				if (this.totalcount) return true;
				var $item = _self._getArtistPictureObj(this);
				$carousel.trigger('add.owl.carousel', $item);
			});
			$carousel.imagesLoaded(function(){
				$carousel.trigger('refresh.owl.carousel');
			});
		});
	},
	
	_eventBind:function(){
		var _self = this;
		
		// 좌측 하단 내 공간 꾸미기 아이콘
		this.space_icon.on('click', function() {
			_self.showSpace();
		});
		this.layer_frame.find('#myspace_header').on('click', function() {
			_self.hideSpace();
		});
		
		// 형태
		$('#deco_shape_wrapper .dropdown-item').on('click', function() {
			var $this = $(this);
			if ($this.hasClass('active')) return;
			
			$('#deco_shape_wrapper .dropdown-item').removeClass('active');
			$(this).addClass('active');
			$('#btn_deco_shape').text($this.text());
			var _type = $this.data('shape');
			_self.shape_type = _type;
			
			// 사이즈 로딩
			_self._sizeLoad();
			$('#btn_deco_size').removeClass('disabled');
			
			// 사이즈가 선택되어 있던 경우에는 액자 형태 변경
			if (_self.size_type != null) {
				$('#deco_size_wrapper').find('a[data-ho="' + _self.size_type + '"]').click();
			}
			
		});
		
		/**
		 * 공간 선택하기
		 */
		$(document).on('click.deco_template.picture', '#my_space_template .space_tmpl', function(e) {

			var $this = $(this);
			if ($this.hasClass('on')) return;
			
			
			var space_info = _self.getSpaceInfo($this);
			
			// 이전 선택된 공간 처리
			if (_self.selectedSpaceId != null) {
				var _before_el = $('#my_space_template').find('[data-space-id="' + _self.selectedSpaceId + '"]');
				if (_before_el.length) {
					_before_el.removeClass('on');
				}
			}
			
			// 선택된 공간 처리
			_self.selectedSpaceId = space_info.id;
			$this.addClass('on');
			$('#picture_size').text((space_info.size / 100) + 'm');
			
			_self.deleteBtn.hide();
			
			// 공간 사이즈가 변경된 경우
			if (_self.space_size != space_info.size) {
				_self.space_size = space_info.size;
				
				// 액자가 표시되어 있는 경우
				if (_self.picture_frame) {
					var _w, _h, ho = _self.size_type;
					if (_self.shape_type == 'square') {
						_w = FRAME_SIZE[ho]['S'].w;
						_h = FRAME_SIZE[ho]['S'].h;
					} else if (_self.shape_type == 'horizontal') {
						_w = FRAME_SIZE[ho]['F'].w;
						_h = FRAME_SIZE[ho]['F'].h;
					} else {
						_w = FRAME_SIZE[ho]['F'].h;
						_h = FRAME_SIZE[ho]['F'].w;
					}
					_self._createFrame({width:_w, height:_h});
				}
				
				// 그림이 표시되어 있는 경우
				if (_self.picture.length) {
					// 불러올 이미지의 scale값 구하기
					var _1mm = _self._getPixelPerMm();
					
					// 복수 선택 관련 기능 수정
					$.each(_self.picture, function(idx, val){
						var scale_x = _self.picture_info[idx].width * _1mm / _self.picture[idx].width;
						var scale_y = _self.picture_info[idx].height * _1mm / _self.picture[idx].height;
						
						_self.picture[idx].animate('scaleX', scale_x, {
							duration: 300,
							onChange: function() {
								_self.canvas.renderAll();
							}
						});
						_self.picture[idx].animate('scaleY', scale_y, {
							duration: 300,
							onChange: function() {
								_self.canvas.renderAll();
							}
						});
					});
					
				}
			}
					
			
			
			// URL 불러오기
			_self._imageLoad(space_info);
			
		});
		
		/**
		 * AI 페인터 작품제작요청
		 */
		$('#btn_deco_request').on('click', function(){
			if (_self.picture_info[0].id) g360.curie_art_request(_self.picture_info[0].id);
		});
		
		/**
		 * 장바구니 
		 */
		$('#btn_deco_cart').on('click', function(){
			_self.saveCart();
		});
		
		/**
		 * 공유하기
		 */
		$('#btn_deco_share').on('click', function(){
			$('#deco_share_layer').toggle();
		});
		$('#deco_share_layer .btn_share_close_sh').on('click', function(){
			$('#deco_share_layer').hide();
		});
		$('#deco_share_layer .btn_share').on('click', function(){
			var share_type = $(this).data('type');
			_self.shareProcess(share_type);
		});
		
		
		
		/**
		 * 내 공간 삭제
		 */
		$(document).on('click.deco_template.delete', '#my_space_template .btn_thm_delete', function(e) {
			var el_myroom = $(this).closest('.myroom').get(0);
			var _is_selected_delete = false;
			
			var _msg = '등록된 공간을 삭제할까요?';
			
			var del_key = $(this).closest('.space_tmpl').data('space-id');
			
			$.confirm({
				title : " ",
				content : _msg +"<hr>",
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
						text : "확인",
						btnClass : "btn-default",
						action : function(){
							// DB에서 삭제처리
							
							_self.removeMyspace(del_key).done(function(){
								// 엘리먼트 삭제하기
								$('#my_space_template .space_tmpl').each(function(_idx, _el) {
									if (el_myroom == this) {
										if ($(this).hasClass('on')) {
											_is_selected_delete = true;
										}
										$('#my_space_template').trigger('remove.owl.carousel', _idx).trigger('refresh.owl.carousel');
										return false;
									}
								});
								if (_is_selected_delete) {$('#my_space_template .space_tmpl:first').click();}
								$('#my_space_template .myroom:last').addClass('mylast');
							});
						}
					},
					moreButtons : {
						text : "취소"
					}
				}
			});	
						
			return false;
		});
		
		// 작품선택(모바일용)
		$('#btn_select_picture').on('click', function(){
			_self.layer_frame.find('.deco_right').addClass('active');
		});
		
		$('#btn_deco_back').on('click', function(){
			_self.layer_frame.find('.deco_right').removeClass('active');
		});
		
		/**
		 * 내 공간 등록
		 */
		$('#btn_space_reg').on('click', function() {
			if (!g360.login_check()) {
				g360.login_window_max();
				$("#p_login").click();
				return;
			}
			if ($('#space_reg_wrapper').is(':visible')) {return;}

			$('#space_reg_img').css('background-image', '');
			$('#space_reg_img').addClass('no-img');
			$('#space_reg_name').val('');
			$('#space_reg_wrapper').show();
			
		});
		
		/**
		 * 내 공간 등록 - (사진 선택)
		 */
		$('#space_reg_img').on('click', function(){
			// 작가 사진 편집
			$('#layer_image_file').off('change').on('change', function(){
				var options = {
					imgId:'img_myspace',
					width:300,
					height:180,
					resultSize:{width:1050},
					resultType:'base64',
					uploadWaiting:true, // 바로 업로드 되지 않도록 설정
					onUploadStart: function(data){
						_self.timeout_id = setTimeout(function(){g360.loadingbar_open(g360.g_lang.Art_Detail_Alert0);}, 2000);
					},
					onUploadComplete: function(res){
						_self.space_reg_image_base64 = res;
						
						$('#space_reg_img').css('background-image', 'url(' + res + ')');
						$('#space_reg_img').removeClass('no-img');
						
						clearTimeout(_self.timeout_id);
						g360.loadingbar_close();
					}
				}
				g360.readFileImage(this, options);
				
			});
			$('#layer_image_file').click();
		});
		
		/**
		 * 내 공간 등록 - (저장)
		 */
		$('#btn_space_reg_save').on('click', function(){
			// validation 체크
			var _name = $.trim($('#space_reg_name').val()).replace(/\s+/g, ' ');
			var _size = $('#space_reg_size').val().replace(/\s*/g, '');
			$('#space_reg_name').val(_name);
			$('#space_reg_size').val(_size);
			
			if (_name.replace(/\s*/g, '') == '') {
				g360.gAlert("Error",g360.g_lang.HangingArt_20, "red", "left");
				$('#space_reg_name').focus();
				return false;
			}
			
			if (_name.length > 10) {
				g360.gAlert("Error",g360.g_lang.HangingArt_21, "red", "left");
				$('#space_reg_name').focus();
				return false;
			}
			
			// 공간넓이
			if (_size == '') {
				g360.gAlert("Error",g360.g_lang.HangingArt_22, "red", "left");
				$('#space_reg_size').focus();
				return false;
			}
			
			if (/[^\d]/g.test(_size)) {
				g360.gAlert("Error",g360.g_lang.HangingArt_23, "red", "left");
				$('#space_reg_size').focus();
				return false;
			}
			
			// 유효범위 지정
			var _size_int = parseInt(_size, 10);
			if (_size_int < 100 || _size_int > 2000) {
				g360.gAlert("Error",g360.g_lang.HangingArt_24, "red", "left");
				$('#space_reg_size').focus();
				return false;
			}
			
			// 이미지 선택되었는지 체크
			if ($('#space_reg_img').hasClass('no-img')) {
				g360.gAlert("Error",g360.g_lang.HangingArt_25, "red", "left", function(){
					$('#space_reg_img').click();
				});
				return false;
			} 
			
			
			// 업로드 로직 수행
			g360.loadingbar_open(g360.g_lang.HangingArt_26);
			
			// Base64로 업로드가 되야 함 (TODO)
//			var fd = new FormData();
//			fd.append('ImageId', 'myspace');
//			fd.append('ImageBody', _self.space_reg_image_base64); 
			
			var bodytext = _self.space_reg_image_base64.replace("data:image/jpeg;base64,","");
			var data = JSON.stringify({
				ImageId : 'myspace',
				ImageBody : bodytext
			});
			
			
			var res = $.ajax({
				type :'POST',
				url	:'/ImageUploadBase64.gu?key='+g360.UserInfo.email,
				data : data ,
				dataType:'json',
				contentType : "application/json; charset=utf-8"
			}).then(function success(data){
				
				if (data.result == "OK" && data.filename){
					_self.space_reg_filename = data.filename;
					_self.space_reg_key = ((new Date()).getTime()).toString(16);
					_self.space_reg_name = _name;
					_self.space_reg_size = _size;
					_self.addMyspace();						
				}else{
					g360.gAlert("Error",g360.g_lang.HangingArt_8, "red", "left");
				}
				g360.loadingbar_close();
			}, function fail(data){
				g360.gAlert("Error",g360.g_lang.HangingArt_8, "red", "left");
				g360.loadingbar_close();
			});
		});
		
		/**
		 * 내 공간 등록 - (취소)
		 */
		$('#btn_space_reg_cancel').on('click', function(){
			//if (_self.mySpaceDropzone) _self.mySpaceDropzone.removeAllFiles();
			$('#space_reg_name').val('');
			$('#space_reg_size').val('');
			_self.space_reg_key = '';
			_self.space_reg_filename = '';
			_self.space_reg_name = '';
			_self.space_reg_size = '';
			$('#space_reg_wrapper').hide();
		});
		
		// 동일작가 다른작품 버튼 클릭
		$('#author_wrapper .btn-other').on('click', function(){
			$('.author_area', '#author_wrapper').toggleClass('hidden');
		});
		
		/**
		 * 오른쪽 탬
		 */
		// 즐겨찾기 탭 버튼
		$('#btn_deco_favorite').on('click', function(){
			if ($(this).hasClass('on')) return;
			$(this).siblings('.on').removeClass('on');
			$(this).addClass('on');
			$('#deco_tab_search').hide();
			$('#deco_tab_ai').hide();
			$('#deco_tab_favorite').show().attr('tabindex', -1).focus();
			//$('#my_space_favorite').masonry('layout');
			$('#deco_search_cnt').hide();
			_self.loadFavorite();
		});
		
		$('#btn_deco_ai').on('click', function(){
			if ($(this).hasClass('on')) return;
			$(this).siblings('.on').removeClass('on');
			$(this).addClass('on');
			$('#deco_tab_favorite').hide();
			$('#deco_tab_search').hide();
			$('#deco_tab_ai').show().attr('tabindex', -1).focus();
			$('#deco_search_cnt').hide();
			_self.loadAipainter();
		});
		
		// 작품검색 탭 버튼
		$('#btn_deco_search').on('click', function(){
			if ($(this).hasClass('on')) return;
			$(this).siblings('.on').removeClass('on');
			$(this).addClass('on');
			$('#deco_tab_favorite').hide();
			$('#deco_tab_ai').hide();
			$('#deco_tab_search').show().attr('tabindex', -1).focus();
			if ( $.data($('#deco_tab_search').get(0), 'masonry') ){
				$('#deco_tab_search').masonry('layout');
			}
			$('#deco_search_cnt').show();
			_self.loadSearch();
		});
		
		// 검색필터 버튼
		$('#deco_tab_search .parker-tb button, #deco_tab_search .m_detail_search button').on('click', function() {
			var $wrapper = $('#deco_tab_search');
			var $search = $('#deco_tab_search .search-filter-result'); 
			var search_key = $(this).data('searchKey');
			var search_text = $(this).data('searchText');
			
			if(search_text == "정방형") search_text = "Square";
			if(search_text == "가로형") search_text = "Horizontal";
			if(search_text == "세로형") search_text = "Vertical";
			if(search_text == "원형") search_text = "Circle";
			if(search_text == "셋트") search_text = "Set";
			if(search_text == "입체/설치") search_text = "Sculpture / Installation";
			if(search_text == "미디어") search_text = " Media";
			
			if(search_text == "풍경") search_text = " Scenery";
			if(search_text == "인물") search_text = " Character";
			if(search_text == "정물") search_text = " Still Life";
			if(search_text == "동물") search_text = " Animal";
			if(search_text == "추상") search_text = " Abstract";
			if(search_text == "팝아트") search_text = " Pop Art";
			if(search_text == "오브제") search_text = " Object";
			
			if(search_text == "1~10호") search_text = " ~46cm";
			if(search_text == "11~30호") search_text = " 47~73cm";
			if(search_text == "31~60호") search_text = " 74~97cm";
			if(search_text == "61~80호") search_text = " 98~112cm";
			if(search_text == "100호+") search_text = " 113cm~";
			
			var search_type = $(this).data('searchType');
			var $el = $search.find('.search-filter[data-search-key="'+search_key+'"]');
			
			var $other = $(this).closest('.m_detail_search').length > 0 ? $wrapper.find('.parker-tb') : $wrapper.find('.m_detail_search');
			var $other_btn = $other.find('button[data-search-key="'+search_key+'"]');
			
			if ($(this).hasClass('active')) {
				$el.remove();
				$other_btn.removeClass('active');
			} else {
				$('<div class="search-filter"' +
						' data-search-key="' + search_key + '"' +
						' data-search-type="' + search_type + '"' + '></div>')
					.append('<span>' + search_text + '<img src="../img/btn-aw-filter-delete.svg" class="btn_aw_filter_delete"></span>')
					.appendTo($search);
				$other_btn.addClass('active');
			}
			_self.drawSearch();
		});
		
		// 전체해제
		$('#btn_searchfilter_remove').on('click', function() {
			$('#deco_tab_search button').removeClass('active');
			$('#deco_tab_search .search-filter-result').empty();
			_self.drawSearch();
			return false;
		});
		
		// 필터 토큰
		$('#search_key_result, #m_myspace_list_search_result').on('click', function(e){
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
			var $btn_filter = $('#deco_tab_search button[data-search-key="' + _key + '"]');
			$btn_filter.removeClass('active');
			var $filters = $('#deco_tab_search .search-filter[data-search-key="'+_key+'"]');
			$filters.remove();
			//$el.remove();
			_self.drawSearch();
		});
		
		
		// 모바일 버튼 탭
		$('#m_myspace_btn_header li').on('click', function(){
			var $ul = $('#m_myspace_btn_header');
			var $this = $(this);
			if ($this.hasClass('on')) return;
			
			$ul.find('li').removeClass('on');
			$this.addClass('on');
			var wrapper = $this.data('wrapper');
			
			$ul.parent().find('.m_detail').hide();
			$ul.parent().find('.' + wrapper).show();
		});
		
		
		// 윈도우 사이즈 변경시 처리
		$(window).resize(function(){
			clearTimeout(_self.resize_id);
			_self.resize_id = setTimeout(function(){_self._refreshSpace();}, 500); 			
		});
		
		
		$('#my_space_favorite').on('click', 'img.picture', function(){
			_self._selectPicture(this);
		});
		
		$('#my_space_ai').on('click', 'img.ai', function(){
			_self._selectAiPicture(this);
		});
		
		$('#search_list').on('click', 'img.picture', function(e){
			_self._selectPicture(this);
		});
		
		// 마우스 오버시 사이즈 조절창 나타나도록...
		_self.canvas.on('mouse:over', function(e){
			if (_self.ai_picture) {
				if (e.target && e.target.aiPainter) {
					_self.ai_picture.hasControls = true;
					_self.canvas.setActiveObject(e.target, "object:selected");
					_self.canvas.renderAll();
				}
			} 
		});
		
		_self.canvas.on('mouse:out', function(e){
			if (_self.ai_picture) {
				if (e.target && e.target.aiPainter) {
					_self.ai_picture.hasControls = false;
					_self.canvas.renderAll();
				}
			}
		});
		
		
		// 작품 삭제 이벤트 처리
		_self.canvas.on('mouse:down',function(e){
			var active_obj = _self.canvas.getActiveObject();
		    if(!active_obj) {
		    	_self.deleteBtn.hide();
		    } else {
		    	if (e.target && e.target.picture) {
		    		_self.addDeleteBtn(active_obj.oCoords.tr.x, active_obj.oCoords.tr.y);
		    	}
		    }			
		});

		_self.canvas.on('object:modified',function(e){
			if (e.target && e.target.picture) {
	    		_self.addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
	    	}
		});
		_self.canvas.on('object:scaling',function(e){
			_self.deleteBtn.hide(); 
		});
		_self.canvas.on('object:moving',function(e){
			_self.deleteBtn.hide();
			g360.is_disp_tooltip = false;
			_self.hideTooltip();
		});
		_self.canvas.on('object:rotating',function(e){
			_self.deleteBtn.hide(); 
		});
		
		// 작품 삭제 버튼
		_self.deleteBtn.on('click', function(){
			var active_obj = _self.canvas.getActiveObject();
			if(!active_obj) {
				_self.deleteBtn.hide();
				return false;
			}
			
			var sel_idx;
			$.each(_self.picture, function(idx, val){
				if (active_obj == val) {
					sel_idx = idx;
					return false;
				}
			});
			if (sel_idx != undefined) {
				_self.canvas.remove(_self.picture[sel_idx]);
				_self.canvas.renderAll();
				_self.deleteBtn.hide();				
				
				// 배열 정리
				_self.picture.splice(sel_idx, 1);
				_self.picture_info.splice(sel_idx, 1);
			}
			_self.hideTooltip();
		});
		
		// 작품 삭제 이벤트 처리 끝
		
		
		// 여러작품 선택 도움말
		$('#btn_multiselect_info').on('click', function(){
			$('#layer_multiselect_info').toggle();
		});
		$('#btn_multiselect_info').on('mouseover', function(){
			$('#layer_multiselect_info').show();
		});
		$('#btn_multiselect_info').on('mouseout', function(){
			$('#layer_multiselect_info').hide();
		});
		
		
		// 즐겨찾기 로그인 하기 버튼 처리
		$('#deco_login_favorite').on('click', function(){
			// 로그인 완료시 콜백 함수 처리
			g360.loginCallback = function() {
				_self.loadFavorite();
			}
			$('#p_login').click();
		});
		
		// 회원가입 (즐겨찾기)
		$('#deco_addmember_favorite').on('click', function(){
			$('#addMember').click();
			_self.hideSpace();
		});
		
		// AI페인터 로그인 하기 버튼 처리
		$('#deco_login_ai').on('click', function(){
			// 로그인 완료시 콜백 함수 처리
			g360.loginCallback = function() {
				_self.loadAipainter();
			}
			$('#p_login').click();
		});
		
		// 회원가입 (AI)
		$('#deco_addmember_ai').on('click', function(){
			$('#addMember').click();
			_self.hideSpace();
		});
		
	},
	_refreshSpace:function(){
		var _self = this;
		if (!this.layer_frame.is(':visible')) return;
		var before_width = _self.canvas.width;
		var elBg = $('.space_tmpl.on', '#my_space_template');
		var space_info = _self.getSpaceInfo(elBg);
		
		_self.deleteBtn.hide();
		_self.hideTooltip();
		_self._imageLoad(space_info, function() {
			var _change_scale = (before_width - _self.canvas.width) / before_width;
			
			// 액자가 표시되어 있는 경우
			if (_self.picture_frame) {
				_self._removePictureFrame();
				_self.canvas.renderAll();
			}
			
			// 그림이 표시되어 있는 경우
			if (_self.picture.length) {
				// 불러올 이미지의 scale값 구하기
				var _1mm = _self._getPixelPerMm();
				
				$.each(_self.picture, function(idx, val){
					var scale_x = _self.picture_info[idx].width * _1mm / _self.picture[idx].width;
					var scale_y = _self.picture_info[idx].height * _1mm / _self.picture[idx].height;
					var _top = _self.picture[idx].top - (_self.picture[idx].top * _change_scale);
					var _left = _self.picture[idx].left - (_self.picture[idx].left * _change_scale);
					
					_self.picture[idx].left = (_left < 0 ? 0 : _left); 
					_self.picture[idx].top = (_top < 0 ? 0 : _top); 
					
					_self.picture[idx].animate('scaleX', scale_x, {
						duration: 300,
						onChange: function() {
							_self.canvas.renderAll();
						}
					});
					_self.picture[idx].animate('scaleY', scale_y, {
						duration: 300,
						onChange: function() {
							_self.canvas.renderAll();
						}
					});
				});
			}
		});
	},
	_sizeLoad: function() {
		var _self = this;
		var _html = '';
		
		function _makeHtml(ho, w, h) {
			w = Math.round(w / 10);
			h = Math.round(h / 10);
			return '<a class="dropdown-item" href="#" data-ho="' + ho + '">' + ho + '호 (' + h + 'cm * ' + w + 'cm)</a>';
		}
		
		$.each(FRAME_SIZE, function(_key, _val) {
			if (_self.shape_type == 'square') {
				// 정방형
				if (this.S != null) {
					_html += _makeHtml(_key, this.S.w, this.S.h);
				}
			} else if (_self.shape_type == 'horizontal') {
				// 가로형
				_html += _makeHtml(_key, this.F.w, this.F.h);
			} else {
				// 세로형
				_html += _makeHtml(_key, this.F.h, this.F.w);
			}
		});
		
		
		var $menu_layer =  $('#deco_size_wrapper');
		var $menu = $menu_layer.find('.dropdown-menu');
		
		//$menu.mCustomScrollbar('destroy');
		$menu.html(_html);
			
		/*
		$menu.mCustomScrollbar({
			theme:'minimal-dark',
			callbacks:{
				onScrollStart:function(){
					// 스크롤을 클릭하고 작동시킬때 레이어가 닫히지 않도록 제어
					$menu_layer.data('closable', false);
				}
			}
		});
		
		$menu_layer.on({
			"hide.bs.dropdown": function(event) {
				var hide = $(this).data('closable');
				$(this).data('closable', true);
				return hide;
			}
		})
		*/;
		$menu_layer.find('.dropdown-toggle').dropdown();
		
		// 액자 선택
		$menu.on('click', 'a', function(){
			if ($(this).hasClass('active')) return;
			
			$menu.find('a').removeClass('active');
			$(this).addClass('active');
			var ho = $(this).data('ho');
			var _shape, _w, _h;
			_self.size_type = ho;
			if (_self.shape_type == 'square') {
				_w = FRAME_SIZE[ho]['S'].w;
				_h = FRAME_SIZE[ho]['S'].h;
			} else if (_self.shape_type == 'horizontal') {
				_w = FRAME_SIZE[ho]['F'].w;
				_h = FRAME_SIZE[ho]['F'].h;
			} else {
				_w = FRAME_SIZE[ho]['F'].h;
				_h = FRAME_SIZE[ho]['F'].w;
			}
			var _info = {
				width:_w,
				height:_h,
			}
			
			/*
			if (_self.picture) {
				_info.top = _self.picture.top;
				_info.left = _self.picture.left;
			}
			*/
			
			_self._removePicture();			
			_self._createFrame(_info);
			$('#btn_deco_size').text(ho+'호');		
		});
		
		$menu.on('mouseover', 'a', function(){
			if ($(this).hasClass('active')) return;
			if (_self.picture.length) return;
			
			$menu.find('a').removeClass('active');
			$(this).addClass('active');
			var ho = $(this).data('ho');
			var _shape, _w, _h;
			_self.size_type = ho;
			if (_self.shape_type == 'square') {
				_w = FRAME_SIZE[ho]['S'].w;
				_h = FRAME_SIZE[ho]['S'].h;
			} else if (_self.shape_type == 'horizontal') {
				_w = FRAME_SIZE[ho]['F'].w;
				_h = FRAME_SIZE[ho]['F'].h;
			} else {
				_w = FRAME_SIZE[ho]['F'].h;
				_h = FRAME_SIZE[ho]['F'].w;
			}
			var _info = {
				width:_w,
				height:_h,
			}
			
			//_info.top = _self.picture.top;
			//_info.left = _self.picture.left;
			
			_self._removePicture();
			_self._createFrame(_info);
			$('#btn_deco_size').text(ho+'호');		
		});
	},
	_getPixelPerMm: function(){
		var _self = this;
		var size_mm = _self.space_size * 10;
		return _self.canvas.width / size_mm;
	},
	_createFrame: function(frame_size) {
		var _self = this;
		var _1mm = _self._getPixelPerMm(),
			_width = Math.round(frame_size.width * _1mm),  
			_height = Math.round(frame_size.height * _1mm);
		
		_self.hideTooltip();
		if (_self.picture_frame == null) {
			var _top = (_self.canvas.height - _height) / 3; // 세로는 3분의 1지점
			var _left = (_self.canvas.width - _width) / 2; // 가로는 중앙
			_self.picture_frame = new fabric.Rect({
		       left			: frame_size.left ? frame_size.left : _left,
		       top			: frame_size.top ? frame_size.top : _top,
		       width		: _width,
		       height		: _height,
		       hasControls	: false,
		       hasBorders	: false,
		       hoverCursor	: 'move',
		       fill			: 'rgba(1,1,1,.2)',
		       stroke		: '#191919',
		       strokeWidth	: 3,
		       noScaleCache	: false,
		       objectCaching: false
			});
		    _self.canvas.add(_self.picture_frame);
		    if (_self.logo_img) _self.logo_img.bringToFront();
		    _self.canvas.renderAll();
		} else {
			var _duration = 300;
			var ori_width = _self.picture_frame.width;
			var ori_height = _self.picture_frame.height;
			var ori_top = _self.picture_frame.top;
			var ori_left = _self.picture_frame.left;
			_self.picture_frame.animate('width', _width, {
				duration: _duration,
				onChange: function() {
					_self.picture_frame.left = ori_left + ((ori_width - _self.picture_frame.width) / 2); 
					_self.canvas.renderAll();
				}
			});
			_self.picture_frame.animate('height', _height, {
				duration: _duration,
				onChange: function() {				
					_self.picture_frame.top = ori_top + ((ori_height - _self.picture_frame.height) / 2); 
					_self.canvas.renderAll();
				}
			});
		}
			
	},
	// 배경 이미지 캔버스에 로딩
	_imageLoad:function(info, callback){
		var _self = this;
		var img = new Image;
		img.src = info.url;
		img.onload = function() {
			_self.bg_img = new fabric.Image(img);
			_self.bg_img.selectable = false;
			
			var _bg_w = Math.ceil(_self.bg_wrap.width());
			_self._bg_scale = _bg_w / img.width;
			var _bg_h = Math.ceil(img.height * _self._bg_scale);
			
			// wrapper 사이즈 설정
			//_self.bg_wrap.width(_bg_w);
			//_self.bg_wrap.height(_bg_h);
			var _calc_h = $(window).height() - (_self.bg_wrap.position().top + 90);
			_self.bg_wrap.height(_calc_h);
			_self.bg_img.scale(_self._bg_scale);
					
			
			//_self.canvas.clear();
			//_self.group = null;
			_self.canvas.setDimensions({
	            width: _bg_w,
	            height: _bg_h
	        });
			
			_self.canvas.setBackgroundImage(_self.bg_img);
			_self.canvas.preserveObjectStacking = true // 선택 오브젝트 순서가 뒤바뀌지 않도록 유지
			_self._insertLogo();
			
			if (callback) callback();
		}		
	},
	_insertLogo:function(){
		var _self= this;
		
		if (_self.logo_img) {
			_self.canvas.remove(_self.logo_img);
			_self.canvas.renderAll();
		}
		
		// 좌측 상단에 로고 뿌려주기
		var logo_img = new Image;
		logo_img.src = '/img/deco/deco_space_logo.png';			
		logo_img.onload = function(){
			
			var dis_width = _self.canvas.width / 5; // 캔버스의 1/5 크기로 로고 뿌려줌
			var scale = dis_width / logo_img.width;
			var dim = _self.canvas.width / 40;
			var opt = {
					width		: logo_img.width,
					height		: logo_img.height,
					scaleX		: scale,
					scaleY		: scale,
					top			: dim,
					left		: dim,
					hasControls	: false,
					hasBorders	: false
				};
				
			_self.logo_img = new fabric.Image(logo_img, opt);
			_self.logo_img.selectable = false;
			
			_self.canvas.add(_self.logo_img);
			_self.logo_img.bringToFront();
			_self.canvas.renderAll();
		}
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

		
		// 기존 프레임 삭제
		if (_self.picture_frame != null) {
			_info.left = _self.picture_frame.left;
			_info.top = _self.picture_frame.top;
			_self._removePictureFrame();
			_self.canvas.renderAll();
		}
				
		if (_self.ai_picture != null) {
			_self.canvas.remove(_self.ai_picture);
			_self.canvas.renderAll();
		}
		
		_self.deleteBtn.hide();
		
		var img = new Image();
		img.src = $(el).data('url');
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
				if (_self.isMulti()) {
					_top = (_self.canvas.height - img.height * scale_y) / 3; // 세로는 3분의 1지점
					_left = (_self.canvas.width - img.width * scale_x) / 2; // 가로는 중앙
				} else {
					if (_self.picture.length == 1) {
						// 복수 선택이 아닌 경우 기존에 하나만 뿌리고 있으면 기존 자리를 대체
						_top = _self.picture[0].top + ((_self.picture[0].getScaledHeight() - img.height * scale_y) / 2);
						_left = _self.picture[0].left + ((_self.picture[0].getScaledWidth() - img.width * scale_x) / 2);
					} else {
						_top = (_self.canvas.height - img.height * scale_y) / 3; // 세로는 3분의 1지점
						_left = (_self.canvas.width - img.width * scale_x) / 2; // 가로는 중앙
					}
				}
			}
			
			// 작품선택시 옵션
			var opt = {
				width		: img.width,
				height		: img.height,
				scaleX		: scale_x,
				scaleY		: scale_y,
				top			: (_top < 0 ? 0 : _top),
				left		: (_left < 0 ? 0 : _left),
				shadow		: {
					color: 'rgba(1,1,1,0.7)',
					//nonScaling: true,
					blur: 3 / scale_x,
					offsetX:2 / scale_x,
					offsetY:2 / scale_x
				},
				hasControls	: false,
				hasBorders	: false,
				hoverCursor	: 'move',
				picture : true
			};
			
			if (!_self.isMulti()) {
				$.each(_self.picture, function(idx, val){
					_self.canvas.remove(this);
				});
				_self.picture = [];
				_self.picture_info = [];
			}
			
			var pic_info = {
				width: _info.width,
				height: _info.height,
				id: $(el).data('id')
			};
			_self.picture_info.push(pic_info);
			
			var imgInstance = new fabric.Image(img, opt);
			_self.picture.push(imgInstance);
			
			var filter = new fabric.Image.filters.Brightness({
		  		brightness: 0.05
			});
			imgInstance.filters.push(filter);
			imgInstance.applyFilters();
			
			_self.canvas.add(imgInstance);
			if (_self.logo_img) _self.logo_img.bringToFront(); 
			_self.canvas.renderAll();
			_self.showAuthor($(el).data('artist'));
			_self.layer_frame.find('.deco_right').removeClass('active');
			_self.showTooltip(opt);
		}
		
		$('#btn_deco_request').hide();
		$('#btn_deco_cart').show();
		$('#btn_deco_share').show();
	},
	_removePicture: function() {
		var _self = this;
		_self.deleteBtn.hide();
		
		if (_self.picture.length) {
			$.each(_self.picture, function(){
				_self.canvas.remove(this);
			});
			_self.picture = [];
			_self.picture_info = [];
			$('#author_wrapper').removeClass('active');
			$('#btn_deco_cart').hide();
		}
		if (_self.ai_picture) {
			_self.canvas.remove(_self.ai_picture);
			_self.ai_picture = null;
			_self.picture_info = [];
			$('#btn_deco_request').hide();
		}
		$('#btn_deco_share').hide();
		$('#deco_share_layer').hide();
	},	
	_removePictureFrame: function(){
		var _self = this;
		if (_self.picture_frame) {
			_self.canvas.remove(_self.picture_frame);
			_self.picture_frame = null;
		}
	},
	
	
	// AI 페인터 작품 선택
	_selectAiPicture:function(el){
		var _self = this;
		
		var _info = {
			top:'',
			left:'',
			width:'',
			height:''
		};
				
		// 기존 프레임 삭제
		if (_self.picture_frame != null) {
			_info.left = _self.picture_frame.left;
			_info.top = _self.picture_frame.top;
			_self._removePictureFrame();
			_self.canvas.renderAll();
		}else if (_self.ai_picture != null) {
			_info.left = _self.ai_picture.left;
			_info.top = _self.ai_picture.top;
		}
		_self._removePicture();
		
		_self.picture_info.push({id: $(el).data('id')});
		var img = new Image;
		img.onload = function() {
			var _top;
			var _left;
						
			// 불러올 이미지의 scale값 구하기
			//var _1mm = _self._getPixelPerMm();
			//var scale = _info.width * _1mm / img.width;
			var scale_x = _self.canvas.width / 3 / img.width; // canvas의 1/3사이즈
			var scale_y = _self.canvas.height / 3 / img.height; // canvas의 1/3사이즈
			var scale = Math.min(scale_x, scale_y);
			
			if (_info.top) {
				_top = _info.top;
				_left = _info.left;
			} else {
				_top = (_self.canvas.height - img.height * scale) / 3; // 세로는 3분의 1지점
				_left = (_self.canvas.width - img.width * scale) / 2; // 가로는 중앙
			}
			
			

			var opt = {
				width		: img.width,
				height		: img.height,
				scaleX		: scale,
				scaleY		: scale,
				top			: (_top < 0 ? 0 : _top),
				left		: (_left < 0 ? 0 : _left),
				shadow		: {
					color: 'rgba(1,1,1,0.7)',
					//nonScaling: true,
					blur: 3 / scale_x,
					offsetX:2 / scale_x,
					offsetY:2 / scale_x
				},
				hasControls	: true,
				hasBorders	: false,
				hoverCursor	: 'move',
				
				hasRotatingPoint : false,
				transparentCorners : false,
				cornerColor : 'rgba(207,32,118,0.8)',
				aiPainter : true
			};
			_self.canvas.uniScaleTransform = true;
			
			_self.ai_picture = new fabric.Image(img, opt);
			_self.ai_picture.setControlsVisibility({
				mt: false,
				ml: false,
				mr: false,
				mb: false
			});
			
			var filter = new fabric.Image.filters.Brightness({
		  		brightness: 0.05
			});
			_self.ai_picture.filters.push(filter);
			_self.ai_picture.applyFilters();
			
			_self.canvas.add(_self.ai_picture);
			if (_self.logo_img) _self.logo_img.bringToFront();
			_self.canvas.renderAll();
			_self.layer_frame.find('.deco_right').removeClass('active');
		}
		img.src = $(el).data('url');
		$('#btn_deco_request').show();
		$('#btn_deco_cart').hide();
		$('#btn_deco_share').show();
	},
	
	// 참조용
	_imageLoad2:function(files){
		var _self = this;
		var file = files[0];
	    if (!file.type.match(/image.*/)) {
	    	g360.gAlert("Error",g360.g_lang.HangingArt_9, "red", "left");
	    	return;
	    }
	    var reader = new FileReader;
	    reader.onload = function(file) {
	        _self._createBgObject(file.target.result);
	    }
	    reader.readAsDataURL(file);
	},
	_createBgObject:function(imgSource){
		var _self = this;
		var img = new Image;
		
		img.onload = function() {
			_self.bg_img = new fabric.Image(img);
			_self.bg_img.selectable = false;
			
			var _bg_w = Math.ceil(_self.bg_wrap.width());
			_self._bg_scale = _bg_w / img.width;
			var _bg_h = Math.ceil(img.height * _self._bg_scale);
			
			// wrapper 사이즈 설정
			_self.bg_wrap.width(_bg_w);
			_self.bg_wrap.height(_bg_h);
			_self.bg_img.scale(_self._bg_scale);
					
			
			_self.canvas.clear();
			_self.group = null;
			$('#bg_file').val('');
			$('#btn_load_picture').hide();
			$('#picture_file').val('');
			_self.canvas.setDimensions({
	            width: _bg_w,
	            height: _bg_h
	        });
			_self.canvas.add(_self.bg_img);
			
			$('#bg_size').show();
			$('#bg_size').get(0).selectedIndex = 0;
			
			// 배경 삽입 후에 사이즈를 설정한다
			_self.setBgSize();
		}
		
		img.src = imgSource
	},
	_pictureLoad:function(files){
		var _self = this;
		var file = files[0];
	    if (!file.type.match(/image.*/)) {
	    	g360.gAlert("Error",g360.g_lang.HangingArt_9, "red", "left");
	    	return;
	    }
	    var reader = new FileReader;
	    reader.onload = function(file) {
	        _self._createPicObject(file.target.result);
	    }
	    reader.readAsDataURL(file);
	},
	saveCart:function(){
		var _self = this;
			
		if (!g360.login_check()){
			g360.login_window_max();
			$("#p_login").click();
			return;
		}
		
		
		if (g360.UserInfo.gubun != "normal"){
			g360.showToastMsg(g360.g_lang.HangingArt_10);
			return;
		}
		
			
		var ids = [];
		var req_def = [];
		
		$.each(_self.picture_info, function(idx, val) {
		    if(ids.indexOf(val.id) == -1 ) {
		    	ids.push(val.id);
		    	req_def.push($.Deferred());
		    }
		});


		$.each(ids, function(idx, val){
			_self.saveCartRequest(this, req_def[idx]);
		});
		
		// 2개 이상 장바구니 요청한 경우 최종완료되면 메세지 표시
		if (ids.length >= 2) {
			$.when.apply($, req_def).then(function(){
				g360.showToastMsg(g360.g_lang.HangingArt_11);
			});
		}

	},
	
	saveCartRequest:function(id, def){
		var _self = this;
		$.ajax({
			url: g360.root_path + '/select_art_info.mon?dockey=' + id,
			success: function(data){
				_self.cur_art_info = data;
				
				if (_self.cur_art_info.status == '3') {
					if (_self.picture.length == 1) {
						g360.showToastMsg(g360.g_lang.HangingArt_12);
					}
					return;
				}
				
				var sales_type = 'art';
						
				var cur_item = _self.cur_art_info;
				var url = g360.root_path + "/save_cart.mon";
				var cart = new Object();
				cart.unique_key = cur_item.dockey;
				cart.email = top.g360.UserInfo.email;
				cart.title = cur_item.art_title;
				cart.artist = cur_item.art_artist;
				cart.height = cur_item.art_height;
				cart.width = cur_item.art_width;
				cart.hosu = cur_item.art_hosu;
				cart.price = cur_item.art_price;
				
				cart.shipping_fee = cur_item.shipping_fee;
				cart.artist_email = cur_item.email;
				
				cart.sales_type = sales_type;
						
				
				var data = JSON.stringify(cart);
				$.ajax({
					type : "POST",
					dataType : "json",
					contentType : "application/json; charset=utf-8",
					data : data,
					url : url,
					success : function(res){
						if (_self.picture.length == 1) {
							if (res.result == "OK"){
								g360.showToastMsg(g360.g_lang.HangingArt_11);
							}else{
								g360.showToastMsg(g360.g_lang.HangingArt_13);
							}
						}
					},
					error : function(e){
						g360.showToastMsg(g360.g_lang.HangingArt_14);
					}
				}).always(function(){
					def.resolve();
				});
			},
			error : function(){
				def.resolve();
			}
		});
	},
	
	// 공유하기
	shareProcess: function(opt){
		// 업로드 처리하기
		var _self = this;
		_self.deleteBtn.hide();
		
		var picture_id = _self.picture_info[0].id;
		var picture_type = '';
		if (_self.picture.length) {
			// 일반 작품
			picture_type = 'artist';
		} else if (_self.ai_picture) {
			// AI 페인터 작품
			picture_type = 'ai';
		} else {
			// 공유대상 이미지 없음
			g360.gAlert("Info",g360.g_lang.HangingArt_15, "blue", "top");
		}		
		
		var blob = _self.dataURItoBlob(_self.canvas.toDataURL({format:'jpeg'}));
		var fd = new FormData();
		fd.append('file', blob);
						
		g360.loadingbar_open(g360.g_lang.HangingArt_16);
		
		$.ajax({
			type: 'POST',
			url: g360.root_path + '/DecoShareImageUpload.gu?type='+picture_type+"&id="+picture_id,
			data: fd,
			processData: false,
			contentType : false,		  
			success: function(data){
				var res = JSON.parse(data);
				
				//업로드된 이미지 URL 처리해야 함
				//debugger;
				var share_url = "https://www.gallery360.co.kr" + res.url; //res.url;
				//var share_url = res.url; //res.url;
				
				g360.loadingbar_close();							
				_self.share_menu(share_url, opt);
			},
			error: function(){
				setTimeout(function(){
					g360.loadingbar_close();
					g360.gAlert("Info",g360.g_lang.HangingArt_17, "blue", "top");
				}, 1000);
			}
		});
	},

	share_menu: function(url, opt){
		var _self = this;
		
		
		// 업로드 완료 후 공유하기 처리		
		var url_default_ks = "https://story.kakao.com/share?url="; 
		var url_default_fb = "https://www.facebook.com/sharer/sharer.php?u="; 
		var url_default_tw_txt = "https://twitter.com/intent/tweet?text="; 
		var url_default_tw_url = "&url="; 
		var url_default_band = "http://band.us/plugin/share?body="; 
		var url_route_band = "&route="; 
		var url_default_naver = "http://share.naver.com/web/shareView.nhn?url="; 
		var title_default_naver = "&title="; 
		var url_this_page = url; 
		var title_this_page = g360.g_lang.HangingArt_18; 

		var callurl = "";
		if (opt == "facebook"){
			callurl = url_default_fb + url_this_page; 			
			
		}else if (opt == "twitter"){
			callurl = url_default_tw_txt + document.title + url_default_tw_url + url_this_page; 
		}else if (opt == "band"){
			callurl = url_default_band + encodeURI(url_this_page)+ '%0A' + encodeURI(title_this_page)+'%0A' + '&route=tistory.com'; 
		}else if (opt == "naver"){
			callurl = url_default_naver + encodeURI(url_this_page) + title_default_naver + encodeURI(title_this_page);			
		}else if (opt == "kakaotalk"){
			_self.shareKakao(url);
			g360.loadingbar_close();
			return false;
		}else if (opt == "link"){
			g360.loadingbar_close();
			_self.copyToClipboard(url);
			g360.gAlert("Info",g360.g_lang.HangingArt_19, "blue", "top");
			return false;
		}
		g360.loadingbar_close();
		window.open(callurl, '', 'scrollbars=no, width=600, height=600'); return false;
		
		g360.loadingbar_close();
	},
	"shareKakao" : function(url){

		
		var uuu = url;
		var uu = "https://www.gallery360.co.kr";
		
		Kakao.Link.sendDefault({
		  objectType: 'feed',
		  content: {
			title: g360.g_lang.HangingArt_18,
			description: '',
			imageUrl: uuu,
			link: {
			  webUrl: uuu,
			  mobileWebUrl: uuu
			}
		  },
		  buttons: [
			{
			  title: g360.g_lang.HangingArt_18,
			  link: {
				mobileWebUrl: uuu,
				webUrl: uuu
			  }
			}  
		  ]
		});
	},
	"copyToClipboard" : function(val){
		 var t = document.createElement("textarea");
		  document.body.appendChild(t);
		  t.value = val;
		  t.select();
		  document.execCommand('copy');
		  document.body.removeChild(t);
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
	},
	isMulti:function(){
		return $('#ck_multi_select').is(':checked');
	},
	addDeleteBtn: function(x, y){
		if (!this.isMulti() && this.picture.length < 2) return;
		
		var btnLeft = x-15;
	    var btnTop = y-10;
				
		this.deleteBtn.css({
			'top' : btnTop + 'px',
			'left' : btnLeft + 'px'
		});
		this.deleteBtn.show();
	},
	showTooltip:function(opt){
		if (g360.is_disp_tooltip) {
			var _top = opt.top - 40;
			var _left = opt.left; 
			this.tooltip.css({
				top:(_top<5 ? 5 : _top),
				left:(_left<5? 5 : _left)
			});
			this.tooltip.show();
		}
	},
	hideTooltip:function(){
		this.tooltip.hide();
	}
}