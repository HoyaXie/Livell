var ServerAddress = 'http://192.168.1.3:57110/AppServer/';
//var ServerAddress = 'http://app.livell.com/AppServer/';

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

function Authorize() {
	var state = JSON.parse(localStorage.getItem('$state'));
	var token = state.token;
	var timestamp = LocalToUtc(new Date());
	var nonce = parseInt(1000 * Math.random());
	token = md5(token + timestamp + nonce );
	var par = {
		token : token,
		timestamp : timestamp,
		nonce : nonce
	};
	return par;
};

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

})(mui, document);