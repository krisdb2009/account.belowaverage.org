var AUTH = '';
var ready = false;
var interval = null;
var send = function() {
	$('iframe')[0].contentWindow.postMessage(undefined, 'https://login.belowaverage.org');
};
onmessage = function(e) {
	try {
		if(!ready && e.data == 'ready') {
			clearInterval(interval);
			ready = true;
		} else if(ready && e.data.length == 32) {
			AUTH = e.data;
			$('iframe').remove();
		}
	} catch(e) {
		console.warn('Login IFRAME not ready. Trying again.');
	}
};
$(document).ready(function() {
	interval = setInterval(send, 100);
});