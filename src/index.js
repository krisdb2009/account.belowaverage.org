var AUTH = '';
$(document).ready(function() {
	var firstMessage = true;
	var ws = new WebSocket('wss://api.belowaverage.org/v2/message');
	ws.onopen = function() {
		ws.send('create');
	};
	ws.onmessage = function(e) {
		if(firstMessage) {
			if(e.data.length == 32) {
				firstMessage = false;
				$('iframe').attr('src', 'https://login.belowaverage.org/#'+e.data);
			}
		} else {
			if(e.data.length == 32) {
				ws.close();
				AUTH = e.data;
				$('iframe').attr('src', 'about:blank;').hide();
				$('#main').show();
			}
		}
	};
});