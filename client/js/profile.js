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
		$(".editbb_btn").click(showBrownbagDetail);
	}

	function showBrownbagDetail(eventObj){
		console.log(eventObj);
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
		$("#brownbags_table").bootstrapTable('refresh', {
            url: '/api/board-brownbags?access_token=' + ACCESS_TOKEN
        });
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
		// $.ajax({
		// 	url: '/api/board-brownbags?access_token=' + ACCESS_TOKEN,
		// 	type: 'GET',
		// 	dataType: 'json',
		// 	success: getBrownbagSuccessCallback,
	 //        error: getBrownbagFailCallback
		// });

		$('#brownbags_table').bootstrapTable({
            method: 'get',
            url: '/api/board-brownbags?access_token=' + ACCESS_TOKEN,
            cache: false,
            height: 500,
            striped: true,
            pagination: true,
            pageSize: 50,
            pageList: [10, 25, 50, 100, 200],
            search: true,
            showColumns: true,
            showRefresh: true,
            minimumCountColumns: 2,
            clickToSelect: true,
            columns: [{
                field: 'id',
                title: 'ID',
                align: 'right',
                valign: 'bottom',
                sortable: true
            }, {
                field: 'title',
                title: 'Title',
                align: 'center',
                valign: 'middle',
                sortable: true,
            }, {
                field: 'starttime',
                title: 'Start Time',
                align: 'left',
                valign: 'top',
                sortable: true,
            }, {
                field: 'endtime',
                title: 'End Time',
                align: 'left',
                valign: 'top',
                sortable: true,
            }, {
                field: 'location',
                title: 'Location',
                align: 'left',
                valign: 'top',
                sortable: true,
            }, {
                field: 'status',
                title: 'Status',
                align: 'left',
                valign: 'top',
            }, {
                field: 'operate',
                title: 'Item Operate',
                align: 'center',
                valign: 'middle',
                clickToSelect: false,
                formatter: operateFormatter,
                events: operateEvents
            }]
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
				+ "<td class='bb_id'>" + id.toString() +"</td>" 
				+ "<td>" + title + "</td>" 
				+ "<td>" + starttime + "</td>"
				+ "<td>" + endtime + "</td>"
				+ "<td>" + location + "</td>"
				+ "<td>" + status + "</td>"
				+ "<td><button type='button' class='btn btn-primary btn-small editbb_btn'>Edit</button></td>"
				+ "</tr>");
		};
		$(".editbb_btn").click(showBrownbagDetail);
	}

	function getBrownbagFailCallback(jqXHR, textStatus, errorThrown){
		console.log("get brownbag failed");
	}

	function sendNotification(data){
		var title = data.title;
		var description = data.description;
		var id = data.id;
		
		$.ajax({
	        url: '/send_notification',
	        type: 'POST',
	        dataType: 'json',
	        data: {
	        	"id": id,
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

	function operateFormatter(value, row, index) {
        return [
            '<a class="like" href="javascript:void(0)" title="Like">',
                '<i class="glyphicon glyphicon-heart"></i>',
            '</a>',
            '<a class="edit ml10" href="javascript:void(0)" title="Edit">',
                '<i class="glyphicon glyphicon-edit"></i>',
            '</a>',
            '<a class="remove ml10" href="javascript:void(0)" title="Remove">',
                '<i class="glyphicon glyphicon-remove"></i>',
            '</a>'
        ].join('');
    }

    window.operateEvents = {
        'click .like': function (e, value, row, index) {
            alert('You click like icon, row: ' + JSON.stringify(row));
            console.log(value, row, index);
        },
        'click .edit': function (e, value, row, index) {
            alert('You click edit icon, row: ' + JSON.stringify(row));
            console.log(value, row, index);
            showBrownbagDetail(row);
        },
        'click .remove': function (e, value, row, index) {
            alert('You click remove icon, row: ' + JSON.stringify(row));
            console.log(value, row, index);
            removeBrownbag(row.id);
        }
    };

    function removeBrownbag(id){
    	$.ajax({
	        url: '/api/board-brownbags/'+id.toString()+"?access_token=" + ACCESS_TOKEN,
	        type: 'DELETE',
	        dataType: 'json',
	        success: removeBrownbagSuccessCallback,
	        error: removeBrownbagFailCallback
	    })
    }

    function removeBrownbagSuccessCallback(data){
    	refreshTable();
    }

    function removeBrownbagFailCallback(){
    	console.log("remove fail");
    }

})();