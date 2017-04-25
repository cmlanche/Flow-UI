/**
 * name: common
 * version: v4.0.1
 * update: 移除响应式功能
 * date: 2017-04-07
 */
define(function(require, exports, module) {
	var $ = require('jquery');
	var base = require('base');
	if (base.browser.ie < 8) {
		alert('您的浏览器版本过低，请升级或使用chrome、Firefox等高级浏览器！');
		//屏蔽ie78 console未定义错误
		if (typeof console === 'undefined') {
			console = {
				log: function() {},
				warn: function() {}
			};
		}
	}
	//返回顶部
	$('body').on('click', '.gotop', function() {
		$('html,body').stop(1).animate({
			scrollTop: '0'
		}, 300);
		return false;
	});
	//textarea扩展max-length
	$('textarea[max-length]').on('change blur keyup', function() {
		var _val = $(this).val(),
			_max = $(this).attr('max-length');
		if (_val.length > _max) {
			$(this).val(_val.substr(0, _max));
		}
	});

	//延时显示
	if (base.browser.ie < 9) {
		$('.opc0').css('filter', 'unset');
	} else {
		$('.opc0').animate({
			'opacity': '1'
		}, 160);
	}

	// placeholder
	require('placeholder');
	$('input, textarea').placeholder();
	//header
	var Dropdown = require('dropdown');
	Dropdown({
		el: '#accountDropdown',
		items: [{
			item: '个人设置',
			data: 'demo1'
		}, {
			item: '数据统计',
			data: 'demo1'
		}, {
			item: '立即更新',
			data: 'demo1'
		}],
		onclick: function(item) {
			console.log(item);
		}
	});

	$('#g-menu').find('.menu-item').each(function(i, e) {
		if ($(e).data('menu-key') && $(e).find('a').length) {
			var url = $(e).find('a').attr('href'),
				key = $(e).data('menu-key');
			url = base.url.set('active', key, url);
			$(e).find('a').attr('href', url);
		}
	});
	var Menu = require('menu');
	var mymenu = Menu({
		el: '#g-menu',
		mode: 'vertical',
		onSelect: function(key, $item) {
			if($item.find('a').length){
				window.location.href = $item.find('a').attr('href');
			}
		}
	});

	/*
	 * 输出
	 */
	module.exports = {
		demo: function() {
			var directHash = {
				"0": "重定向",
				"1": "刷新",
				"2": "历史记录"
			};
			console.log('页面来自' + directHash[window.performance.navigation.type]);
		},
		mymenu: mymenu
	};

	/*
	 * 站内公用
	 */



});