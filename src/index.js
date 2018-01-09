var auth_message = null;
window.onbeforeunload = function() {
	auth_message.abort();
};
$(document).ready(function() {
	$.post('https://api.belowaverage.org/v1/message/', {id: ''}, function(promise) {
		$('iframe').attr('src', 'https://api.belowaverage.org/login/#'+promise);
		auth_message = $.post('https://api.belowaverage.org/v1/message/', {id: promise}, function(AUTH) {
			if(AUTH.length == 32) {
				$('iframe').hide();
				$('#main').show();
			} else {
				
			}
		});
	});
});