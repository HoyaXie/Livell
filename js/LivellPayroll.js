//var ServerAddress = 'http://192.168.1.3:57110/AppServer/';
var ServerAddress = 'http://app.livell.com/AppServer/';
//var ServerAddress = 'http://139.224.112.129/AppServer/';

function ServeURL(action) {
	return ServerAddress + action;
};

function scrollUp() {
	if(mui.os.android) {
		window.scrollTo(0, 0);
	} else if(mui.os.ios) {
		mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100); //100毫秒滚动到顶  
	}
};
//本地时间转UTC时间
function LocalToUtc(d) {
	localTime = d.getTime();
	localOffset = d.getTimezoneOffset() * 60000; //获得当地时间偏移的毫秒数 
	utc = localTime + localOffset; //utc即GMT时间 
	return utc
}

function Authorize(token) {
	var timestamp = LocalToUtc(new Date());
	var nonce = parseInt(1000 * Math.random());
	var _token = md5(token + '' + timestamp + '' + nonce);
	var par = {
		token: _token,
		timestamp: timestamp,
		nonce: nonce
	};
	return par;
};
//补0
function PrefixInteger(num, length) { 
	return(Array(length).join('0') + num).slice(-length);
};

function ChangeDateFormat(time) {
	if(time != null) {
		var date = new Date(parseInt(time.replace("/Date(", "").replace(")/", ""), 10));
		var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
		var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
		return date.getFullYear() + "/" + month + "/" + currentDate;
	}
	return "";
}

(function($, document) {
	var btn_callcustom = document.getElementsByClassName("bar-btn-callcustom")[0];
	if(btn_callcustom != null) {
		btn_callcustom.addEventListener('tap', function() {
			var btnArray = ['NO', 'YES'];
			var Phone = "502-2590936";
			$.confirm('Make sure you call livellpayroll customer service ？', 'Confirm', btnArray, function(e) {
				if(e.index == 1) {
					plus.device.dial(Phone, false);
				}
			});
		});
	};

	var _authorize = function() {
		var state = JSON.parse(localStorage.getItem('$state'));
		var token = state.token;
		var timestamp = LocalToUtc(new Date());
		var nonce = parseInt(1000 * Math.random());
		token = md5(token + timestamp + nonce);
		var par = {
			token: token,
			timestamp: timestamp,
			nonce: nonce
		};
		return par;
	};

	var Authorize = function() {
		var state = JSON.parse(localStorage.getItem('$state') || "{}");
		var timestamp = LocalToUtc(new Date());
		var nonce = parseInt(1000 * Math.random());
		var _token = md5(state.token + timestamp + nonce);
		console.log(state.token);
		alert(state.token);
		var par = {
			token: _token,
			timestamp: timestamp,
			nonce: nonce
		};
		return par;
	};

	// 对Date的扩展，将 Date 转化为指定格式的String
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
	// 例子： 
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
	// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
	Date.prototype.Format = function(fmt) { //author: meizz 
		var o = {
			"M+": this.getMonth() + 1, //月份 
			"d+": this.getDate(), //日 
			"h+": this.getHours(), //小时 
			"m+": this.getMinutes(), //分 
			"s+": this.getSeconds(), //秒 
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
			"S": this.getMilliseconds() //毫秒 
		};
		if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}

	// Extend the default Number object with a formatMoney() method:
	// usage: someVar.formatMoney(decimalPlaces, symbol, thousandsSeparator, decimalSeparator)
	// defaults: (2, "$", ",", ".")
	Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
		places = !isNaN(places = Math.abs(places)) ? places : 2;
		symbol = symbol !== undefined ? symbol : "$";
		thousand = thousand || ",";
		decimal = decimal || ".";
		var number = this,
			negative = number < 0 ? "-" : "",
			i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
			j = (j = i.length) > 3 ? j % 3 : 0;
		return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
	};

})(mui, document);