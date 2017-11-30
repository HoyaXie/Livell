/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		if(!checkEmail(loginInfo.account)) {
			return callback('The email is not valid');
		}
		if(loginInfo.password.length < 6) {
			return callback('The password is not valid');
		}
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		var authed = users.some(function(user) {
			return loginInfo.account == user.account && loginInfo.password == user.password;
		});

		mui.ajax({
			url: ServeURL('AppLogin'), //跨域URL
			data: loginInfo,
			async: false,
			type: "GET",
			dataType: "json",
			timeout: 5000, //超时时间设置为5秒；
			success: function(data) {
				if(data.status == 'success') {
//					plus.storage.setItem('userid', data.UserId);
					return owner.createState(loginInfo.account,data.UserId,data.TimeZone,data.NickName, callback);
				} else {
					return callback(data.message);
				}
			},
			error: function(xhr, type, errorThrown) {
				return callback(errorThrown);
			}
		});
	};

	owner.createState = function(_account,_userId,_timeZone,_nickName, callback) {
		var state = owner.getState();
		state.account = _account;
		state.userId = _userId;
		state.timeZone = _timeZone;
		state.nickName = _nickName;
		state.token = "livellzxcasdqwe123";
		owner.setState(state);
		return callback();
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return(email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if(!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
}(mui, window.app = {}));