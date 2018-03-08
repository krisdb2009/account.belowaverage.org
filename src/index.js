AUTH.authenticated = function() {
	$('#main').show();
	$('input[type=hidden][name=AUTH]').val(AUTH.token);		
	$.ajax({
		url: 'https://api.belowaverage.org/v1/adphoto/',
		method: 'post',
		xhrFields: {
			responseType: 'blob',
		},
		data: {
			'AUTH': AUTH.token
		},
		success: function(data) {
			$('img#profile').attr('src', URL.createObjectURL(data));
		}
	});
}