(function(){
	var CAN_USE_LOCALSTORAGE = canUseLocalStorage();
	var ACCESS_TOKEN = localStorage.accessToken;
	var USER_ID = localStorage.userId;

	window.onload = function(){
		showBrownbags();
		$("#send_btn").click(sendNotification);
	}

	function showBrownbags(){
		$.ajax({
			url: '/api/board-brownbags?access_token=' + ACCESS_TOKEN,
			type: 'GET',
			dataType: 'json',
			success: getBrownbagSuccessCallback,
	        error: getBrownbagFailCallback
		});
	}

	function getBrownbagSuccessCallback(data){
		console.log("getBrownbagSuccessCallback");
		var brownbag;
		for (index in data) {
			brownbag = data[index];
			var title = brownbag.title;
			var status = brownbag.status;
			var starttime = brownbag.starttime;
			var endtime = brownbag.endtime;
			var id = brownbag.id;
			var location = brownbag.location;
			var description = brownbag.description;
			$("#brownbags").append("<tr>" 
				+ "<td>" + id.toString() +"</td>" 
				+ "<td>" + title + "</td>" 
				+ "<td>" + starttime + "</td>"
				+ "<td>" + endtime + "</td>"
				+ "<td>" + location + "</td>"
				+ "<td>" + status + "</td>"
				+ "</tr>");
		};
	}

	function getBrownbagFailCallback(jqXHR, textStatus, errorThrown){
		console.log("get brownbag failed");
	}

	function sendNotification(){
		var title = $("#title").val();
		var text = $("#text").val();
		
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

	function canUseLocalStorage(){
		if(typeof(Storage) !== "undefined") {
			return true;
		}else{
			return false;
		}
	}

})();