//var ServerAddress = 'http://192.168.1.3:57110/AppServer/';
var ServerAddress = 'http://app.livell.com/AppServer/';

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