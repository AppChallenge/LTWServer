(function(){
	var CAN_USE_LOCALSTORAGE = canUseLocalStorage();
	var ACCESS_TOKEN = localStorage.accessToken;
	var USER_ID = localStorage.userId;

	window.onload = function(){
		showBrownbags();
		$("#send_btn").click(sendNotification);
		$("#starttimepicker").datetimepicker();
		$("#endtimepicker").datetimepicker();
		$("#save_as_draft").click(saveAsDraft);
		$("#create").click(createBrownbag);
	}

	function saveAsDraft(){
		var title = $("#title").val();
		var status = "draft";
		var starttime = $("#starttimepicker input").val();
		var endtime = $("#endtimepicker input").val();
		var location = $("#location").val();
		var description = $("#description").val();
		$.ajax({
			url: '/api/board-brownbags?access_token=' + ACCESS_TOKEN,
			type: 'POST',
			dataType: 'json',
			data: {
				"title": title,
				"description": description,
				"starttime": starttime,
				"endtime": endtime,
				"location": location,
				"status": status
			},
			success: saveAsDraftSuccessCallback,
	        error: saveAsDraftFailCallback
		});
	}

	function saveAsDraftSuccessCallback(data){
		hideNewBrownbagDialog();
		refreshTable();
	}

	function saveAsDraftFailCallback(jqXHR, textStatus, errorThrown){
		console.log("saveAsDraftFailCallback")
	}

	function refreshTable(){
		$(".bb_item").remove();
		showBrownbags();
	}

	function createBrownbag(){
		var title = $("#title").val();
		var status = "active";
		var starttime = $("#starttimepicker input").val();
		var endtime = $("#endtimepicker input").val();
		var location = $("#location").val();
		var description = $("#description").val();
		$.ajax({
			url: '/api/board-brownbags?access_token=' + ACCESS_TOKEN,
			type: 'POST',
			dataType: 'json',
			data: {
				"title": title,
				"description": description,
				"starttime": starttime,
				"endtime": endtime,
				"location": location,
				"status": status
			},
			success: createBrownbagSuccessCallback,
	        error: createBrownbagFailCallback
		});
	}

	function createBrownbagSuccessCallback(data){
		hideNewBrownbagDialog();
		refreshTable();
		sendNotification(data);
	}

	function createBrownbagFailCallback(jqXHR, textStatus, errorThrown){

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

	function showNewBrownbagDialog(){
		$('#new_brownbag_model').modal('show')
	}

	function hideNewBrownbagDialog(){
		$('#new_brownbag_model').modal('hide')
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
			$("#brownbags").append("<tr class='bb_item'>" 
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

	function sendNotification(data){
		var title = data.title;
		var description = data.description;
		
		$.ajax({
	        url: '/send_notification',
	        type: 'POST',
	        dataType: 'json',
	        data: {
	        	"title": title,
	        	"text": description
	        },
	        success: sendSuccessCallback,
	        error: sendFailCallback
	    });
	}

	function sendSuccessCallback(result){
		refreshTable();
		console.log(result);
	}

	function sendFailCallback(jqXHR, textStatus, errorThrown){
		console.log("sendFailed");
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
	}

	function canUseLocalStorage(){
		if(typeof(Storage) !== "undefined") {
			return true;
		}else{
			return false;
		}
	}

})();