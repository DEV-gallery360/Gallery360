
function gRecommend(){	
	gRec = this;
}

gRecommend.prototype = {		

	"init" : function(){
		var _self = this;
		
		$("#recommend_more").on("click", function(event){
			
		});
	
		
	},
	
	"xClose" : function(){
		$("#main_artist_detail").hide();
		$("#main_artist").fadeIn(500);
	}
}

