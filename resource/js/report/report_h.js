$(document).ready(function(){
	
	//$("#report_init").click();
	//setTimeout(Rjs.draw_init(), function(){
		
	//}, 3000);
});

$(function() {					
	

	$("#xp").daterangepicker({
		singleDatePicker: false,
		showDropdowns: true,
		startDate : moment().subtract(2, 'month'),
		endDate : moment(),
	});
	
	

	// reportrange
	function cb(start, end) {	
	
		Rjs.search_draw(start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD"))
	//	$("#xp").val(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
	//	$("#xp").val(start.format('YYYY-MM-DD') + ' - ' + end.format('MMMM D, YYYY'));
	}
	

	$(".reportrange").daterangepicker({
		"buttonClasses": "button button-rounded button-mini m-0",
		"applyClass": "button-color",
		"cancelClass": "button-light",
		ranges: {
		 //  'Today': [moment(), moment()],
		 //  'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
		 //  'Last 7 Days': [moment().subtract(6, 'days'), moment()],
		 //  'Last 30 Days': [moment().subtract(29, 'days'), moment()],
		   'This Month': [moment().startOf('month'), moment().endOf('month')],
		//   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
		   'Last Month': [moment().subtract(1, 'month').startOf('day'),moment()],
		   'Last 6Month': [moment().subtract(6, 'month').startOf('day'),moment()],
		   'This Year': [moment().startOf('year'), moment().endOf('year')],
		   'Last Year': [moment().subtract(1, 'years').startOf('day'),  moment()]
		}
	}, cb);
});




function ReportJS(){
	this.start = 0;
	this.perpage = 10;
	this.totalcount = 0;
	this.cPage = 0;
	this.key = "";
	
}


ReportJS.prototype = {	
	"init" : function(opt){
		Rjs.key = opt;
		Rjs.__event_handler();	
		Rjs.draw_init();
				
	},
	
	"draw_init" : function(){
		Rjs.__init_load();
	},
	
	"__init_load" : function(){
	//	alert(Rjs.key);
	//	debugger;
		var url = "/ReportView_init.action";
		
		var query = "hmail";
	//	var query = Rjs.key;
		var data = JSON.stringify({			
			q : query
		});
		
		$.ajax({
			type : "POST",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			data : data,
			url : url,
			success : function(data){
				
			
				var dx = eval(data.data);

			
				Rjs.draw_head(JSON.parse(dx[6]));
				Rjs.draw_head_last_update(JSON.parse(dx[7]));
			
				google.charts.setOnLoadCallback(function(){
					Rjs.draw_graph1(JSON.parse(dx[1]));
				});
				
				google.charts.setOnLoadCallback(function(){
					Rjs.draw_graph2(JSON.parse(dx[4]));
				});
				
				google.charts.setOnLoadCallback(function(){
					Rjs.draw_graph3(JSON.parse(dx[2]));
				});
				
				google.charts.setOnLoadCallback(function(){
					Rjs.draw_graph4(JSON.parse(dx[5]));
				});
				
				google.charts.setOnLoadCallback(function(){
					Rjs.draw_graph5(JSON.parse(dx[3]));
				});
				
				google.charts.setOnLoadCallback(function(){
					Rjs.draw_graph6(JSON.parse(dx[4]));
				});
				
			},
			error : function(e){
				alert(e);
			}
		})	
	},
	
	"draw_head" : function(data){
		
		var info = data.reports[0].data.totals[0].values;
		
		var pageview = info[0];
		var users = info[1];
		var avgSession = info[2];
		var session = info[3];
		
		$("#u1").html(Rjs.comma(users));
		$("#u2").html(Rjs.comma(pageview));
		$("#u3").html(Rjs.comma(session));
		$("#u4").html(Rjs.comma(parseInt(avgSession)) + "sec");
		
	},
	
	"draw_head_last_update" : function(data){
		
		var html = "Last Update : " + data.lastupdate;
		$("#ldate").html(html);
	},
	
	
	
	"search_draw" : function(start, end){
		
		Rjs.loadingbar_open("Loading statistical data");
						
		var sd = start;
		var ed = end;
		//var query = "id9syZD5";
	//	var query = "/";
		var query = Rjs.key;
		var me = $("#report_me").val();
		var di = $("#report_di").val();
		var ty = "web";
		
		query = query.replace("%40","@");
		
				
		var url = "/ReportView.action";
		
		var data = JSON.stringify({
			sd : sd,
			ed : ed,
			q : query,
			met : me,
			dim : di,
			ty : ty
		});
		
		$.ajax({
			type : "POST",
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			data : data,
			url : url,
			success : function(data){
				var dx = data;

				
				Rjs.draw_head(JSON.parse(dx[6]));
				
				Rjs.draw_head_last_update(JSON.parse(dx[7]));
			
				google.charts.setOnLoadCallback(function(){
					Rjs.draw_graph1(JSON.parse(dx[1]));
				});
				
				google.charts.setOnLoadCallback(function(){
					Rjs.draw_graph2(JSON.parse(dx[4]));
				});
				
				google.charts.setOnLoadCallback(function(){
					Rjs.draw_graph3(JSON.parse(dx[2]));
				});
				
				google.charts.setOnLoadCallback(function(){
					Rjs.draw_graph4(JSON.parse(dx[5]));
				});
				
				google.charts.setOnLoadCallback(function(){
					Rjs.draw_graph5(JSON.parse(dx[3]));
				});
				
				google.charts.setOnLoadCallback(function(){
					Rjs.draw_graph6(JSON.parse(dx[4]));
				});
				
				
				Rjs.loadingbar_close();
				
			},
			error : function(e){
				alert(e);
			}
		})
	},
	
	
	
	
	"__event_handler" : function(){
		
		$("#report_init").on("click", function(){
			Rjs.draw_init();
		});
		
		$("#report_view").on("click", function(){
			
			$("#graph1").html("");
			$("#graph2").html("");
			$("#graph3").html("");
			$("#graph4").html("");
			$("#graph5").html("");
			$("#graph6").html("");
			
			$("#report_dis").html("");
			$("#report_dis1").html("");
			$("#report_dis2").html("");
			$("#report_dis3").html("");
			
			
			var sd = $("#report_startdate").val();
			var ed = $("#report_enddate").val();
			var query = $("#report_query").val();
			var me = $("#report_me").val();
			var di = $("#report_di").val();
			var ty = $("#report_ty").val();
			
			query = query.replace("%40","@");
			
					
			var url = "/ReportView.action";
			
			var data = JSON.stringify({
				sd : sd,
				ed : ed,
				q : query,
				met : me,
				dim : di,
				ty : ty
			});
			
			$.ajax({
				type : "POST",
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				data : data,
				url : url,
				success : function(data){
					var dx = eval(data.data);

					
					Rjs.draw_head(JSON.parse(dx[6]));
				
					google.charts.setOnLoadCallback(function(){
						Rjs.draw_graph1(JSON.parse(dx[1]));
					});
					
					google.charts.setOnLoadCallback(function(){
						Rjs.draw_graph2(JSON.parse(dx[4]));
					});
					
					google.charts.setOnLoadCallback(function(){
						Rjs.draw_graph3(JSON.parse(dx[2]));
					});
					
					google.charts.setOnLoadCallback(function(){
						Rjs.draw_graph4(JSON.parse(dx[5]));
					});
					
					google.charts.setOnLoadCallback(function(){
						Rjs.draw_graph5(JSON.parse(dx[3]));
					});
					
					google.charts.setOnLoadCallback(function(){
						Rjs.draw_graph6(JSON.parse(dx[4]));
					});
					
				},
				error : function(e){
					alert(e);
				}
			})			
		});
	},

	
	"draw_graph1" : function(data){
		//debugger;
		var dis1 = "";
		var dis2 = "";
		var data1 = 0;
		var data2 = 0;
		
		if (typeof(data.reports[0].data.rows) != "undefined"){
			dis1 = data.reports[0].data.rows[0].dimensions[0];
			data1 = parseInt(data.reports[0].data.rows[0].metrics[0].values[0]);
			
			if (typeof(data.reports[0].data.rows[1]) != "undefined"){
				dis2 = data.reports[0].data.rows[1].dimensions[0];
				data2 = parseInt(data.reports[0].data.rows[1].metrics[0].values[0]);
			}
		}
		
		var data = new google.visualization.DataTable();
        data.addColumn('string', '성별');
        data.addColumn('number', '접속수');
        data.addRows([
          [dis1, data1],
          [dis2, data2]
        ]);
		
        var options = {
	//      title: '성별 접속수',
	      width : '100%',
	      height : '300px',
	  //    backgroundColor: {'fill': '#f3f3f3','opacity': 100},
	      chartArea : {left: '0px', top: '0px', width : '100%', height: '300px'},
	      legend : {position:'bottom', alignment : "center"},
	      animation : {startup: true, duration : 10, easing: 'linear'},
	      pieHole: 0.4
	    };
	
	    var chart = new google.visualization.PieChart(document.getElementById('graph1'));
	    chart.draw(data, options);
	    
	  //반응형 그래프 출력 - 반응형 그래프를 원하지 않을 시 제거하거나 주석처리 하세요.
	    window.addEventListener('resize', function() { chart.draw(data, options); }, false);


	
	    
	    $("#graph1").show();
	},
	
	"draw_graph2" : function(xdata){
		
		 var data = new google.visualization.DataTable();
         data.addColumn('string', 'Country');
         data.addColumn('number', 'PageView');
         
         if (typeof(xdata.reports[0].data.rows) != "undefined"){
        	 var count = xdata.reports[0].data.rows.length;
             for (var i = 0 ; i < count ; i++){
            	var country = xdata.reports[0].data.rows[i].dimensions[0];
            	var value = parseInt(xdata.reports[0].data.rows[i].metrics[0].values[0]);
            	data.addRow([country, value]);
             }		 
    		 
             var options = {
            	title: '국가별 조회수',
                legend : {position:'bottom', alignment : "center"},
                animation : {startup: true, duration : 1000, easing: 'linear'}
             };
             var chart = new google.visualization.GeoChart(document.getElementById('graph2'));
             chart.draw(data, options);
             
             //반응형 그래프 출력 - 반응형 그래프를 원하지 않을 시 제거하거나 주석처리 하세요.
             window.addEventListener('resize', function() { chart.draw(data, options); }, false);
             $("#graph2").show();
         }else{
        	 $("#graph2").hide();
         }
         
        
		
	},
	
	"draw_graph3" : function(xdata){
	
		var data = new google.visualization.DataTable();
        data.addColumn('string', 'date');
        data.addColumn('number', 'PageView');
        data.addColumn('number', 'Session');
       
        if (typeof(xdata.reports[0].data.rows) != "undefined"){
            var count = xdata.reports[0].data.rows.length;
            
            for (var i = (count-1) ; i >= 0 ; i--){
            	var date = xdata.reports[0].data.rows[i].dimensions[0];
            	var rdate = date.substring(0,4) + "-" + date.substring(4,6) + "-" + date.substring(6,8);
            	var value = parseInt(xdata.reports[0].data.rows[i].metrics[0].values[0]);
            	var value2 = parseInt(xdata.reports[0].data.rows[i].metrics[0].values[1]);
            	data.addRow([rdate, value, value2]);
            }		 
            

  	      
    		 
            var options = {
            //	title: '날짜별 조회수',
            //	curveType: 'function',
  	            width : '100%',
  	  	        height : '300px',
  	  	    //    backgroundColor: {'fill': '#f3f3f3','opacity': 100},
  	  	        chartArea : {left: '0px', top: '0px', width:'90%', height: '300px'},
           	    legend : {position:'bottom', alignment : "center"},
           	    animation : {startup: true, duration : 1000, easing: 'linear'}
            };
            var chart = new google.visualization.LineChart(document.getElementById('graph3'));
            chart.draw(data, options);
            
            //반응형 그래프 출력 - 반응형 그래프를 원하지 않을 시 제거하거나 주석처리 하세요.
    	    window.addEventListener('resize', function() { chart.draw(data, options); }, false);
            $("#graph3").show();
        }

        
       
		
	},
	
	
	"draw_graph4" : function(xdata){
		//debugger;
		var data = new google.visualization.DataTable();
        data.addColumn('string', 'age');
        data.addColumn('number', 'male');
        data.addColumn('number', 'female');
        
        if (typeof(xdata.reports[0].data.rows) != "undefined"){
        	 var count = xdata.reports[0].data.rows.length;
             var txx = "";
             for (var i = 0 ; i < count ; i++){
             	var xx = xdata.reports[0].data.rows[i].dimensions[0];
             	
             	if (txx != xx){
             		var male = Rjs.search_data(xx, "male", xdata);
                 	var female = Rjs.search_data(xx, "female", xdata);
                 	
                 	data.addRow([xx, male, female]);
             	}
             	
             	
             	txx = xx;
             }		 
     		 
             var options = {
             //	title: '날짜별 조회수',
             //	curveType: 'function',
             	isStacked : true,
            	    legend : {position:'bottom', alignment : "center"},
            	    animation : {startup: true, duration : 3000, easing: 'linear'}
             };
             var chart = new google.visualization.BarChart(document.getElementById('graph4'));
             chart.draw(data, options);
             
             //반응형 그래프 출력 - 반응형 그래프를 원하지 않을 시 제거하거나 주석처리 하세요.
     	    	window.addEventListener('resize', function() { chart.draw(data, options); }, false);
     	    
             $("#graph4").show();
        }
       
		
	},
	
	"search_data" : function(val, gubun, xdata){
		var count = xdata.reports[0].data.rows.length;
		var res = 0;
        for (var i = 0 ; i < count ; i++){
        	var xx1 = xdata.reports[0].data.rows[i].dimensions[0];
        	var xx2 = xdata.reports[0].data.rows[i].dimensions[1];
        	var value = parseInt(xdata.reports[0].data.rows[i].metrics[0].values[0]);
        	if (xx1 == val){
        		if (xx2 == gubun){
        			return value;
        			break;
        		}
        	}
        }	        
        return res;
	},
	
	
	
	
	"draw_graph5" : function(data){
		//debugger;
		var dis1 = "";
		var dis2 = "";
		var data1 = 0;
		var data2 = 0;
		
		if (typeof(data.reports[0].data.rows) != "undefined"){
			dis1 = data.reports[0].data.rows[0].dimensions[0];
			data1 = parseInt(data.reports[0].data.rows[0].metrics[0].values[0]);
			
			if (typeof(data.reports[0].data.rows[1]) != "undefined"){
				dis2 = data.reports[0].data.rows[1].dimensions[0];
				data2 = parseInt(data.reports[0].data.rows[1].metrics[0].values[0]);
			}
		}
		
		
//		var dis1 = data.reports[0].data.rows[0].dimensions[0];
//		var dis2 = data.reports[0].data.rows[1].dimensions[0];
		
		
//		if (typeof(data.reports[0].data.rows) != "undefined"){
//			data1 = parseInt(data.reports[0].data.rows[0].metrics[0].values[0]);
//		}
//		
//		if (typeof(data.reports[0].data.rows) != "undefined"){
//			data2 = parseInt(data.reports[0].data.rows[1].metrics[0].values[0]);
//		}
//		var data1 = parseInt(data.reports[0].data.rows[0].metrics[0].values[0]);
//		var data2 = parseInt(data.reports[0].data.rows[1].metrics[0].values[0]);
		
		var data = new google.visualization.DataTable();
        data.addColumn('string', '기기별');
        data.addColumn('number', '접속수');
        data.addRows([
          [dis1, data1],
          [dis2, data2]
        ]);
		
        var options = {
	   //   title: '기기별 접속수',
	      legend : {position:'bottom', alignment : "center"},
	      animation : {startup: true, duration : 3000, easing: 'linear'},
	      pieHole: 0.4
	    };
	
	    var chart = new google.visualization.PieChart(document.getElementById('graph5'));
	    chart.draw(data, options);	
	    
	    //반응형 그래프 출력 - 반응형 그래프를 원하지 않을 시 제거하거나 주석처리 하세요.
	    window.addEventListener('resize', function() { chart.draw(data, options); }, false);
	    
	    $("#graph5").show();
	},
	
	
	
	
	"draw_graph6" : function(xdata){
		
		var data = new google.visualization.DataTable();
        data.addColumn('string', 'Country');
        data.addColumn('number', 'PageView');
        
        if (typeof(xdata.reports[0].data.rows) != "undefined"){
        	
        	var list = xdata.reports[0].data.rows;
        	
        	var html = "";
        	html += "<table class='t-country'>";
        	html += "<tr>";
        	html += "<th></th>";
        	html += "<th>Country</th>";
        	html += "<th>Users</th>";
        	html += "<th>Pageviews</th>";
        	
        	
        	for (var i = 0 ; i < list.length; i++){
        		var info = list[i];
        		var city = info.dimensions[0];
        		var pageview = info.metrics[0].values[0];
        		var user = info.metrics[0].values[1];
        		var avgSession = info.metrics[0].values[2];
        		
        		html += "<tr>";
        		html += "<td>"+(i+1)+"</td>";
        		html += "<td>"+city+"</td>";
        		html += "<td>"+Rjs.comma(user)+"</td>";
        		html += "<td>"+Rjs.comma(pageview)+"</td>";
        		html += "</tr>";
        	}
        	

        	 $("#graph6").html(html);
        	
//        	 var count = xdata.reports[0].data.rows.length;
//             for (var i = 0 ; i < count ; i++){
//             	var country = xdata.reports[0].data.rows[i].dimensions[0];
//             	var value = parseInt(xdata.reports[0].data.rows[i].metrics[0].values[0]);
//             	data.addRow([country, value]);
//             }		 
//             
//             var cssClassNames ={
//             		headerRow: 'headerRow',
//             	    tableRow: 'tableRow',
//             	    oddTableRow: 'oddTableRow',
//             	    selectedTableRow: 'selectedTableRow',
//             	    // hoverTableRow: 'hoverTableRow',
//             	    headerCell: 'headerCell',
//             	    tableCell: 'tableCell',
//             	    rowNumberCell: 'rowNumberCell'
//             }
//     		 
//             var options = {
//                showRowNumber : true,
//                allowHtml : true,
//                cssClassNames : cssClassNames,
//                width : '100%',
//                height : '100%'
//             };
//             var chart = new google.visualization.Table(document.getElementById('graph6'));
//             chart.draw(data, options);
//             
//             
//             //반응형 그래프 출력 - 반응형 그래프를 원하지 않을 시 제거하거나 주석처리 하세요.
//     	    window.addEventListener('resize', function() { chart.draw(data, options); }, false);
     	    
             $("#graph6").show();
        }
       
		
	},
	
	
	
	
	"list" : function(data, id){
		var columncount = data.reports[0].columnHeader.metricHeader.metricHeaderEntries;
		
		var html = "";
		html += "<table style='border:1px solid gray; margin-top:20px' cellpadding=1 cellspacing=1>";
		
		if (id == "report_dis"){
			html += "<tr><td colspan='4' style='padding-top:5px; padding-bottom:5px; color:white; background-color:gray; text-align:center'>연령별</td></tr>";
		}else if (id == "report_dis1"){
			html += "<tr><td colspan='4' style='padding-top:5px; padding-bottom:5px; color:white; background-color:gray; text-align:center'>성별</td></tr>";
		}else if (id == "report_dis2"){
			html += "<tr><td colspan='4' style='padding-top:5px; padding-bottom:5px; color:white; background-color:gray; text-align:center'>기간별</td></tr>";
		}else if (id == "report_dis3"){
			html += "<tr><td colspan='4' style='padding-top:5px; padding-bottom:5px; color:white; background-color:gray; text-align:center'>접속 기기별</td></tr>";
		}
		
		
		
		html += "<tr>";
		html += "<td style='padding:10px'></td>";
		for (var i = 0 ; i < columncount.length ; i++){
			var coltitle = columncount[i].name;
			if (coltitle == "pageviews"){
				coltitle = "조회수";
			}else if (coltitle == "users"){
				coltitle = "사용자수";
			}else if (coltitle == "avgSessionDuration"){
				coltitle = "평균 조회시간 [초]";
			}
			
			html += "<td style='padding:10px'>"+coltitle+"</td>";			
		}
		
		html += "</tr>";
		
		
		
		
		var listcount = data.reports[0].data.rows;
		if (typeof(listcount) != "undefined"){
			for (var k = 0 ; k < listcount.length ; k++){
				var row = listcount[k].dimensions;
				var me = listcount[k].metrics[0];
				
				
				
				html += "<tr>";
				var disrow = "";
				for (z = 0 ; z < row.length ; z++){
					if (disrow == ""){
						 disrow = row[z]
					}else{
						 disrow += "-" + row[z]
					}
					
				}
				html += "<td style='padding:10px'>"+disrow+"</td>";
				
				for (var y = 0 ; y < me.values.length; y++){
					html += "<td style='padding:10px; text-align:center'>"+parseInt(me.values[y])+"</td>";
				}
				
				
				html += "</tr>";
				
			}
		}
		
		
		$("#"+id).html(html);
		
		$("#"+id).show();
		
	},


	
	"comma" : function(num){
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	
	"loadingbar_open" : function(msg){
	
		
		var mz = Rjs.maxZindex();
			
		
		$("#loading_message").text(msg);
		$("#loadingbar").show();			
		$("#loadingbar").popup({
			onclose: function(){					
			},
			blur: false,
			escape: false,
			opacity : 0.83
		});
			
		
		$("#loadingbar").popup('show');		
		$("#loadingbar").position({
		    of: $(window)
		});

		$('#loadingbar_background').css('z-index', ++mz);
		$('#loadingbar_wrapper').css('z-index', ++mz);
		
		//$('#loadingbar_background').css('opacity',0.9);
	},
	
	"loadingbar_close" : function(){
		$("#loadingbar").hide();		
		$("#loadingbar").popup('hide');
	},
	
	"maxZindex" : function(){
		var zIndexMax = 0;
		$("header, div").each(function(){
			if (!$(this).is(':visible')) return true;
			if ($(this).hasClass('jconfirm')) return true;	// 최상위 레이어 컨펌창 예외처리
			var z = parseInt($(this).css("z-index"));
			if (z > zIndexMax) zIndexMax = z;
		});
		return parseInt(zIndexMax);
	},
	
	
/////////////////////////// 리스트 페이징 시작 //////////////////////////////////////////////////////////////
	"search_paging" : function(page){
		var alldocuments = Ajs.totalcount;
		if (alldocuments % Ajs.perpage > 0 & alldocuments % Ajs.perpage < Ajs.perpage/2 ){
			allPage = Number(Math.round(alldocuments/Ajs.perpage)) + 1;
		}else{
			allPage = Number(Math.round(alldocuments/Ajs.perpage));
		}	
		
		Ajs.search_navigator(page);
	},
	
	"search_navigator" : function(page){
		var nav_cpage = page;
		
		var alldocuments = Ajs.totalcount;
		if (alldocuments == 0){
			alldocuments = 1;
			nav_cpage=1;
			allPage = 1;
		}
		
		if (alldocuments != 0) {
		if (allPage % 10 > 0 & allPage % 10 < 5 ) {
			var allFrame = Number(Math.round(allPage/10)) + 1;
		}else{
			var allFrame = Number(Math.round(allPage/10))	;
		}
		
		if (nav_cpage % 10 > 0 & nav_cpage % 10 < 5 ){
			var cFrame = Number(Math.round(nav_cpage/10)) + 1;
		}else{
			var cFrame = Number(Math.round(nav_cpage/10));
		}
		
		var nav = new Array();	
	
		if (cFrame == 1 ){
			nav[0] = '';
		}else{
			nav[0] = '<li class="p_prev"><a href="#" class="xico" onclick="javascript:Ajs.gotoPage(' + ((((cFrame-1)*10)-1)*Ajs.perpage+1) + ',' + ((cFrame-1)*10) + ');">이전</a></li>';
		}
		var pIndex = 1;
		var startPage = ((cFrame-1) * 10) + 1;	
		
		for (var i = startPage; i < startPage + 10; i++){
		if (i == nav_cpage){
			if (i == '1'){
				nav[pIndex] = '<li class="on"><a href="#">' + i + '</a></li>';
			}else{
				if (i%10 == '1' ){
					nav[pIndex] = '<li class="on"><a href="#">' + i + '</a></li>';
				}else{
					nav[pIndex] = '<li class="on"><a href="#">' + i + '</a></li>';
				}						
			}
		}else{
			if (i == '1'){
				nav[pIndex] = "<li><a href=# onclick='Ajs.gotoPage("+ (((i-1) * Ajs.perpage) + 1 ) + ", "+ i + ", this)'>" + i + "</a></li>";
				
			}else{
				if (i%10 == '1' ){
					nav[pIndex] = "<li><a href=# onclick='Ajs.gotoPage("+ (((i-1) * Ajs.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";	
				}else{
					nav[pIndex] = "<li><a href=# onclick='Ajs.gotoPage("+ (((i-1) * Ajs.perpage) + 1 ) + "," + i + ", this)'>" + i + "</a></li>";
				}
			}
		}				
		
		if (i == allPage) {
			//nav[pIndex + 1] = '<td width="30" height="15" align="right"></td>';
			break;
		}
		pIndex++;				
		}
		
		if (cFrame < allFrame){
			nav[nav.length] = '<li class="p_next"><a href="#" class="xico" onclick="javascript:Ajs.gotoPage(' + ((cFrame*Ajs.perpage*10) + 1) + ',' + ((cFrame*10)+1) + ');">다음</a></li>';
		}
			
		var navHTML = "";
		
		if (cFrame == 1 ){
			navHTML = '';
		}else{
			navHTML = '<li class="p_first"><a href="#" class="xico" onclick="javascript:Ajs.gotoPage(1,1);">처음</a></li>';
		}		    
		for( var i = 0 ; i < nav.length ; i++){	
			navHTML = navHTML + nav[i];
		}
			
		if (cFrame < allFrame){
			navHTML = navHTML + '<li class="p_last"><a href="#" class="xico" onclick="javascript:Ajs.gotoPage(' + ((allPage - 1)*Ajs.perpage + 1) +','+ allPage +')">마지막</a></li>';
		}else{
			navHTML = navHTML;
		}
		
		
		
		$("#NAVIGATE").html('<div class="paging"><ul>' + navHTML + '</ul></div>');
		
		
		}
	},
	
	"gotoPage" : function(Index, PageNum, obj){
		var nav_cpage = PageNum;
		oldpage = nav_cpage;
		
		Ajs.cPage = PageNum;

		Ajs.list();
		
		
	}
	//////////////////////////////////////// 리스트 페이징 종료    /////////////////////////////////////////////

	



}