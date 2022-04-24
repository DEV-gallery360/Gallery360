(function(){
var code ="l_1447s_00002d38"
document.write('<input type="hidden" id="sd_s_time" value="' + get_date('') + '" />');
document.write('<input type="hidden" id="sd_i_time" value="' + get_date('') + '" />');
function get_date(val) {
	let date;
	var now = new Date();
	if (val) {
		date = val;
	} else {
		date = now;
	}
	var year = date.getFullYear();
	var month = (date.getMonth() + 1);
	month = month >= 10 ?
		month :
		'0' + month;
	var day = date.getDate();
	day = day >= 10 ?
		day :
		'0' + day;
	var hour = date.getHours();
	hour = hour >= 10 ?
		hour :
		'0' + hour;
	var minute = date.getMinutes();
	minute = minute >= 10 ?
		minute :
		'0' + minute;
	var seconds = date.getSeconds();
	seconds = seconds >= 10 ?
		seconds :
		'0' + seconds;
	var result_date = year + '' + month + '' + day + '' + hour + '' + minute + '' +
		seconds;
	return result_date;
}

function uuid_code() {
	return (1 + Math.random() * 0xf0000 | 0)
		.toString(16)
		.substring(1);
}

function setCookie(name, value, day) {
	var date = new Date();
	date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
	document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}


function setSessionCookie(name, value, day) {
	var date = new Date();
	date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
	document.cookie = name + '=' + value + ';expires=0' + ';path=/';
}


function getCookie(cookieName) {
	var cookieValue = null;
	if (document.cookie) {
		var array = document.cookie.split((escape(cookieName) + '='));
		if (array.length >= 2) {
			var arraySub = array[1].split(';');
			cookieValue = unescape(arraySub[0]);
		}
	}
	return cookieValue;
}

var c_code;
c_code = getCookie('c_code');

if (!c_code || c_code === '연결에 실패 하였습니다') {
	var xhr = new XMLHttpRequest();
	var nd = new Date();
	var sLocation = document.location.href;
	var ref = parent.document.referrer;
	var se_ref = self.document.referrer;
	var loc_prot = document.location.protocol;
	var p_url = loc_prot + '//sdcomm.co.kr/ip_trace/index_p.php';
	var c_uuid = get_date(nd) + uuid_code();
	var p_data = {
		'site_code': code,
		'slocation': sLocation,
		'p_ref': ref,
		's_ref': se_ref
	}


	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			b_c_code = xhr.responseText;

			if (!b_c_code) {
				setCookie('c_code', c_uuid, '365');
				c_code = getCookie('c_code');
			} else {
				setCookie('c_code', b_c_code, '365');
				c_code = b_c_code;
			}
		}
	}

	xhr.open('POST', p_url, true);
	xhr.send(JSON.stringify(p_data));
}



function ma_info(chk_init) {
	// console.log("start ma_info 1:"+new Date().getTime());
	var nd = new Date();
	var s_s_save = document.getElementById('sd_s_time').value;
	var s_i_save = document.getElementById('sd_i_time').value;
	var now_t = get_date(nd);
	var seCode = uuid_code() + get_date(nd);
	var sLocation = document.location.href;
	var ref = parent.document.referrer;
	var se_ref = self.document.referrer;
	var searchParam = document.location.search;
	var loc_prot = document.location.protocol;

	var getSeCode = null;
	if (typeof sessionStorage.getItem('se_code') !== 'undefined' && sessionStorage.getItem('se_code') !== null)
		getSeCode = sessionStorage.getItem('se_code');

	var seseccc = getCookie('seseccc');
	var con_url = loc_prot + '//sdcomm.co.kr/ip_trace/index.php';
	var s_t_cal = now_t - s_s_save;
	var r_time;


	if (s_t_cal >= 0 && s_t_cal <= 10) {
		r_time = 2;
	} else if (s_t_cal >= 11 && s_t_cal <= 20) {
		r_time = 5;
	} else if (s_t_cal >= 21 && s_t_cal <= 180) {
		r_time = 20;
	} else if (s_t_cal >= 181 && s_t_cal <= 1800) {
		r_time = 60;
	} else if (s_t_cal >= 1801 && s_t_cal <= 3600) {
		r_time = 150;
	} else if (s_t_cal >= 3600) {
		return;
	} else {
		return;
	}


	if (chk_init == 0 || ((parseInt(now_t) - parseInt(s_i_save)) >= parseInt(r_time))) {

		if (getSeCode !== null) {
			var data = {
				'site_code': code,
				'slocation': sLocation,
				'p_ref': ref,
				's_ref': se_ref,
				's_search': searchParam,
				'se_code': getSeCode,
				'c_code': c_code,
				type: 'update'
			}
			var xhr = new XMLHttpRequest();
			xhr.open('POST', con_url, true);
			xhr.send(JSON.stringify(data));
			document.getElementById('sd_i_time').value = get_date('');

		} else {
			localStorage.setItem('se_code', seCode);
			sessionStorage.setItem('se_code', seCode);
			setSessionCookie('seseccc', seCode, '30')

			var data = {
				'site_code': code,
				'slocation': sLocation,
				'p_ref': ref,
				's_ref': se_ref,
				's_search': searchParam,
				'se_code': seCode,
				'c_code': c_code,
				'type': 'new'
			}
			var xhr = new XMLHttpRequest();
			xhr.open('POST', con_url, true);
			xhr.send(JSON.stringify(data));
			document.getElementById('sd_i_time').value = get_date('');
		}

	}

}
function init() {
	ma_info(1);
}
ma_info(0);
window.setInterval(init, 1000);
})();