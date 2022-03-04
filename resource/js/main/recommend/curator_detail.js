
function gCurator_Detail(){	
	gCDetail = this;
}

gCurator_Detail.prototype = {		

	"init" : function(){
		var _self = this;
		
		$("#go_to_curator_list").on("click", function(event){
			g360.LoadPage("body_content", g360.root_path + "/main/recommend/main_curator_recommand_list.jsp");
			return false;
		});
	
		
	}
}

