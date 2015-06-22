(function(){
	window.onload = function(){
		$("#send_btn").click(sendNotification);
	}

	function sendNotification(){
		$.ajax({
	        url: '/send_notification',
	        type: 'POST',
	        dataType: 'json',
	        success: sendSuccessCallback,
	        error: sendFailCallback
	    });
	}

	function sendSuccessCallback(data){
		window.location.href = data.url;
	}

	function sendFailCallback(jqXHR, textStatus, errorThrown){
		console.log("sendFailed");
	}

})();