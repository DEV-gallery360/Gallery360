$(document).ready(function(){	
});


function gThreeD(){
	_this = this;
}

gThreeD.prototype = {		
	"init" : function(key){
		
		var importerApp = new ImporterApp ();
		importerApp.Init ();
		// ExtensionIncludes
		//importerApp.AddExtension (new ExampleExtension ());
		// ExtensionIncludesEnd
		
		var list = new Array();
		
		
		//Key에 등록되어 있는 파일 리스트를 가져온다.
	
		var url = "/load_3d_files.mon?key=" + key;
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			url : url,
			success : function(res){
				
				var xlist = res.subfile;
				
				for (var i = 0 ; i < xlist.length; i++){
					var item = xlist[i];

					var name = _this.TextToHtml(item.filename);
					//http://localhost:8080/artimage/aa1231@daum.net-spl-1594562794022/art/preview/aa1231@daum.net-spl-1594562794022_3993151a6db0e192f3e51ccb525e09c7.15103.jpg?open&ver=1600608346587
					var f = "/artimage/" + res.email + "/art_3d/" + res.art_3d_savefolder + "/" + name;					
					list.push(f);					
				}							
				importerApp.ProcessFiles (list, true);
			},
			error : function(e){
				//app2.js 파일안에도 아래 에러 처리 코드 있음 수정 시 같이 수정해야 함
				$('#vr_load_3d').addClass('loading-fail').html('3D 파일을 불러올 수 없습니다');
			}
		});
		
		
//		list.push("testfiles/aa1231_daum.net-spl-1594562794022_310586de426d900e1540d98f81ed2b81.464590.obj");
//		list.push("testfiles/aa1231_daum.net-spl-1594562794022_5d6c59c0e5da41d8c556135234d79221.130731.JPG");
//		list.push("testfiles/aa1231_daum.net-spl-1594562794022_8835a9c4b8023e8c206413ff8eb5cd26.21891.JPG");
//		list.push("testfiles/aa1231_daum.net-spl-1594562794022_b4d34e3408d76351c58ba2e670a06194.1129.mtl");
//		list.push("testfiles/aa1231_daum.net-spl-1594562794022_bfd3c8b3c40709aabea8ae05b90f3411.34307.JPG");
		
//		list.push("testfiles/01_-_Default1noCulling.JPG");
//		list.push("testfiles/male-02-1noCulling.JPG");
//		list.push("testfiles/1129.mtl");
//		list.push("testfiles/464590.obj");
//		
//		list.push("testfiles/orig_02_-_Defaul1noCulling.JPG");
		
//		list.push("testfiles/sample1/uploads_files_1848883_full_sculpture.stl")
//		
		//importerApp.ProcessFiles (list, true);
		
		
		$("#expand_btn").on("click", function(){
			var docV = document.documentElement;
			
			if (docV.requestFullscreen){
				docV.requestFullscreen();
			}else if (docV.webkitRequestFullscreen){
				docV.webkitRequestFullscreen();
			}else if (docV.mozRequestFullScreen){
				docV.mozRequestFullScreen();
			}else if (docV.msRequestFullscreen){
				docV.msRequestFullscreen();
			}
			
			$("#expand_btn").hide();
			$("#collapse_btn").fadeIn();
		});
		
		$("#collapse_btn").on("click", function(){
			var docV = document.documentElement;
			if (document.exitFullscreen){
				document.exitFullscreen();
			}else if (document.webkitExitFullscreen){
				document.webkitExitFullscreen();
			}else if (document.mozCancelFullScreen){
				document.mozCancelFullScreen();
			}else if (document.msExitFullscreen){
				document.msExitFullscreen();
			}
			$("#collapse_btn").hide();
			$("#expand_btn").fadeIn();
			
		});
		
		
		// ESC키로 빠져나가는 경우 있으므로 이벤트 핸들러 추가
		if (document.addEventListener) {
		    document.addEventListener('webkitfullscreenchange', this.exitFullscreen, false);
		    document.addEventListener('mozfullscreenchange', this.exitFullscreen, false);
		    document.addEventListener('fullscreenchange', this.exitFullscreen, false);
		    document.addEventListener('MSFullscreenChange', this.exitFullscreen, false);
		}

	},
	
	"TextToHtml" : function(str){
		if (!str) return '';
		str = str.replace(/&lt;/gi,"<").replace(/&gt;/gi,">");
		str = str.replace(/&#40;/gi,"(").replace(/&#41;/gi,")");
		str = str.replace(/&\#39;/gi,"'");
		return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
	},
	
	"exitFullscreen" : function(){
		if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
	    	$("#collapse_btn").hide();
			$("#expand_btn").fadeIn();
	    }
	}
	
}



