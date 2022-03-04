
				
function _webpush(push_server){		
	//push_server = "http://dev01.gallery360.co.kr:26101";
	
	//this.push_server = "${initParam['push_server']}";
	
	//this.push_server = "https://gweb01.gallery360.co.kr:26101/";
	//alert(this.push_server)
	
	//push_server = "dev01.gallery360.co.kr:26101";
	
	push_server = "https://www.gallery360.co.kr/push/";
	
	console.log("push_server : " + push_server);

	this.socket = io.connect(push_server, {
		'reconnect':true,
		'reconnection delay': 500,
		'max reconnection attempts': 50,
		'path': '/push/socket.io'
	});
	
	this.connected = false;
	this.RETRY_INTERVAL = 5000;
	this.timeout;
	this.isnormal = "F";
}


_webpush.prototype ={
	"init_webpush" : function(){		
		
		_wp.socket.on('connect', function(){
			
			if (g360.UserInfo != null){
				var emailaddress = g360.UserInfo.email;		
				_wp.socket.emit('adduser', emailaddress);
			}				
		});	
		
		_wp.socket.on('disconnect', function(data){
			console.log("disconnect");
		});		
		
		

		_wp.socket.on('talk', function(content){
			var json = JSON.parse(content);
//			var ty = json.type;			
//			var suj = decodeURIComponent(json.subject);			
			console.log("talk", json);	
			
			if (g360.login_check()){
				var style = $("#talk360_main").css("display");

				if (style == "none"){
					//$("#talk360_main").fadeIn();
					
					$("#talk360_dis").mCustomScrollbar('destroy');
					$("#talk360_dis").empty();
					gTopMain.talk_start = 0;
					gTopMain.query = "";
					
					setTimeout("gTopMain.loadTalk(); $('#talk360_main').fadeIn();", 1000);
					
					//setTimeout("gTopMain.talk360_show()", 1000);
				}else{
					gTopMain.drawTalk(json, "direct", json.sid);
				}
				
				gTopMain.talk_scroll();
				gTopMain.talk360_show_only_open2();
			}
			
		});	
		
		_wp.socket.on('reply', function(content){
			var json = JSON.parse(content);
//				var ty = json.type;			
//				var suj = decodeURIComponent(json.subject);			
			console.log("reply", json);	
			
			if (g360.login_check()){
				//답변을 하면 해당 문건이 제일 위로 와야 하기 때문에 다시 불러 온다.
				setTimeout("gTopMain.talk360_show_only_open('"+content+"')", 300);
			}
						
		});	
		
		
		_wp.socket.on('talkdelete', function(content){
			var json = JSON.parse(content);

			if (g360.login_check()){
				try{
					if (json.sender != g360.UserInfo.email){
						$("#li_" + json.sid).remove();
					}else{
						console.log("동일인이다")
					}
					
				}catch(e){}
			}

			console.log("talkdelete", json);
		});
		
		_wp.socket.on('replydelete', function(content){
			var json = JSON.parse(content);
			if (g360.login_check()){
				try{
					if (json.sender != g360.UserInfo.email){
						$("#li_" + json.sid).remove();
						
						var rcount = $("#reply_count_"+json.pid).text();
						var cnt = parseInt(rcount) -1;
						$("#reply_count_"+json.pid).text(cnt);
					}else{
						console.log("동일인이다")
					}
					
				}catch(e){}
			}
			
			console.log("replydelete", json);
		});

	}	
}


//_wp = new _webpush();
//_wp.init_webpush();		//로그인을 하면 webpush서버에 접속한다.