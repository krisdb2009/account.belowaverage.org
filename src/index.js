function adIsoToDate(adIsoString) {
	return new Date(
		adIsoString.slice(0,4)+'-'+
		adIsoString.slice(4,6)+'-'+
		adIsoString.slice(6,8)+'T'+
		adIsoString.slice(8,10)+':'+
		adIsoString.slice(10,12)+':'+
		adIsoString.slice(12,14)+
		adIsoString.slice(14)
	);
}
function adEpocToDate(dateInt) {
	return new Date((dateInt / 10000) - 11644473600000);
}
$(document).ready(function() {
	$('#logout').click(function() {
		$('#main').hide();
		$('<iframe src="https://login.belowaverage.org/#logout"></iframe>').appendTo('body').on('load', function() {
			AUTH.AUTH();
		});
	});
	$('input[ldap=whenChanged], input[ldap=whenCreated]').on('change', function() {
		$(this).val(adIsoToDate($(this).val()));
	});
	$('input[ldap=accountExpires], input[ldap=pwdLastSet], input[ldap=badPasswordTime]').on('change', function() {
		$(this).val(adEpocToDate($(this).val()));
	});
});
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
	$.ajax({
		url: 'https://api.belowaverage.org/v1/account/',
		method: 'post',
		data: {
			'AUTH': AUTH.token
		},
		dataType: 'json',
		success: function(data) {
			$.each(data, function(k) {
				var field = $('input[ldap='+k+']');
				if(field.length !== 0) {
					field.val(this[0]).trigger('change');
				}
			});
		}
	});
}