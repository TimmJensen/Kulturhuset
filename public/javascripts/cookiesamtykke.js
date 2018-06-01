var CookieInformerBooklet = CookieInformerBooklet || {};
var CookieInformerBooklet = {
	config: {
		title: "Accept af cookies",
		text: 'Websitet anvender cookies til at huske dine indstillinger og statistik. Denne information deles med tredjepart. <a href="LINK-TIL-PRIVATLIVSPOLITIK" target="_blank">Læs mere >> </a>',
		buttonText: "Cookies"
	},
	init: function (e) {
		jQuery.extend(this.config, e);
		if (this.getCookie() == "hidden") {
			return;
		}
		this.createElements();
		this.bindEvents();
	},
	createElements: function () {
		this.$container = jQuery("<div />", {
			id: "cookieInformerBooklet"
		}).css({
			bottom: "0",
			height: "1px",
			left: "0",
			overflow: "visible",
			position: "fixed",
			right: "0",
			zIndex: "11001"
		});
		this.$button = jQuery("<div />", {
			text: "Ok",
			"class": "cookie-button"
		}).css({
			backgroundColor: "#FAFAFA",
			borderColor: "#93948c",
			borderRadius: "5px 5px 0 0",
			borderStyle: "solid solid none",
			borderWidth: "1px 1px medium",
			bottom: "0",
			boxShadow: "0 0 6px #bbbbbb",
			color: "#444444",
			cursor: "pointer",
			display: "block",
			height: "24px",
			lineHeight: "24px",
			opacity: "0.9",
			padding: "0 14px",
			position: "absolute",
			right: "76px",
			zIndex: "2",
			transition: "all 0.3s linear"
		}).hover(function () {
			jQuery(this).css({
				borderColor: "#44b2f0",
				boxShadow: "0 0 6px white"
			});
		}, function () {
			jQuery(this).css({
				borderColor: "#93948c",
				boxShadow: "0 0 6px #bbbbbb"
			});
		});
		this.$content = jQuery("<div />", {
			"class": "content"
		}).css({
			backgroundColor: "#FFFFFF",
			borderColor: "#999999",
			borderRadius: "0 0 0 0",
			borderStyle: "solid solid none",
			borderWidth: "4px 0px medium",
			bottom: "0",
			color: "#444444",
			display: "block",
			left: "0px",
			opacity: "0.9",
			padding: "0px 0px 20px 25px",
			position: "absolute",
			right: "0px",
			zIndex: "1"
		});
		this.$contentTitle = jQuery("<h3 />", {
			text: this.config.title
		});
		this.$contentText = jQuery("<p />").css({
			paddingLeft: "20px",
			background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPCAYAAAACsSQRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE5N0I5QzZCRjVBMzExRTFBMERCOUY5NUU2NjEwQTQ2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE5N0I5QzZDRjVBMzExRTFBMERCOUY5NUU2NjEwQTQ2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTk3QjlDNjlGNUEzMTFFMUEwREI5Rjk1RTY2MTBBNDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTk3QjlDNkFGNUEzMTFFMUEwREI5Rjk1RTY2MTBBNDYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6LMfT1AAACPklEQVR42oyTS09TURCAv9sWaHlYKF2ACBITAywMieGChCBqTDQRly5NTPQfGLas/An4P3hYnukrJIDiAoKxsDDBwG2w0NJ3b9vbezzc+Fh4USeZM+ecmXxz5mRGEUIcAl5sRNd1wuEwqqri9/u5RDKKhOTkptnO+3ZmhnQqhVAUXk9N4XG77cLyDrkYdp73m5uUTZPn09N09Q2wHAhc9hLDYXdbrVYJBdcYnHzGQtyk98ET9vZ2SclX2YktJBIM0nrtOlprJ1qmwueah5ujdwnMzf4fpFgssv1hC9+9p6RyNV5019NSNTAG73MU1zg+Ovo3ZCXwDl//ILuKj2KliscJCiZbWQfd449YnJ/7O+Rc1hyLxRDDj9k/0znIm8wcVlhP1mRZJU5uDJMqljiQMZdCluZnab09RrTo4VvJoKPBwZs+NyM+J4mySeTUwDs+yWpgwR4S1zS+xuPE+yeInRXI1gQFqXUyomZC2hBoWZ2d9gH0hkZ2Pm7/CVlZmMWtPmQp6aBQNUlXBXkJsTrXFJzLc0meIydlzDuThNdWMGUf/YJEQyG+nKXZ6FCJJQucy6yJsrBAkkdG2oQuSEp7nNNZdPZSau9iIxr9DQmuLtMzMoGmOOls8eBvbqTH24RmNvByXxDM1dHb1mjdX73SRKIG7UMTrEeCFsR1oeroGNsbIV4N56nUXJZDuehnIUs4AVWmqpfzI344XIrJaewTt4ZGLIbyc4qzmQwuYeJwKPxLJJuK/CdvW5s1xd8FGADRcRHOeCqahwAAAABJRU5ErkJggg==) center left no-repeat"
		}).html(this.config.text);
		this.$content.append(this.$contentTitle).append(this.$contentText);
		this.$container.appendTo("body").append(this.$button).append(this.$content);
	},
	bindEvents: function () {
		this.$button.click(this.setCookie);
	},
	setCookie: function () {
		var e = "CookieInformerBooklet",
			t = "hidden",
			n = 20 * 365;
		if (n) {
			var r = new Date();
			r.setTime(r.getTime() + n * 24 * 60 * 60 * 1e3);
			var i = "; expires=" + r.toGMTString();
		} else var i = "";
		document.cookie = e + "=" + t + i + "; path=/";
		CookieInformerBooklet.$container.fadeOut(function () {
			jQuery(this).remove();
		});
	},
	getCookie: function () {
		var e = "CookieInformerBooklet";
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(e + "=");
			if (c_start != -1) {
				c_start = c_start + e.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) {
					c_end = document.cookie.length;
				}
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	}
};
(function () {
	function r() {
		jQuery(document).ready(function () {
			var e = {
				title: "",
				text: 'Websitet anvender cookies til at huske dine indstillinger og statistik. Denne information deles med tredjepart. <a href="LINK-TIL-PRIVATLIVSPOLITIK" target="_blank">Læs mere >> </a>',
				buttonText: "Cookies"
			};
			CookieInformerBooklet.init(e);
		});
	}

	function i(e, t) {
		if ("undefined" === typeof e) {
			throw new Error("compareVersion needs at least one parameter.");
		}
		t = t || $.fn.jquery;
		if (e == t) {
			return 0;
		}
		var n = s(e);
		var r = s(t);
		var i = Math.max(n.length, r.length);
		for (var o = 0; o < i; o++) {
			n[o] = n[o] || 0;
			r[o] = r[o] || 0;
			if (n[o] == r[o]) {
				continue;
			}
			return n[o] > r[o] ? 1 : 0;
		}
		return 0;
	}

	function s(e) {
		return $.map(e.split("."), function (e) {
			return parseInt(e, 10);
		});
	}
	var e = "1.5.1";
	if (window.jQuery === undefined || i(e, window.jQuery.fn.jquery)) {
		var t = false;
		var n = document.createElement("script");
		n.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + e + "/jquery.min.js";
		n.onload = n.onreadystatechange = function () {
			if (!t && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				t = true;
				r();
			}
		};
		document.getElementsByTagName("head")[0].appendChild(n);
	} else {
		r();
	}
})();