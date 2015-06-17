(function(){
	window.onload = function(){
		$("#send_btn").click(sendNotification);
	}

	function sendNotification(){
		window.location.href = "/sendNotification";
	}

})();