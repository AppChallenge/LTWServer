(function(){
	var CAN_USE_LOCALSTORAGE = canUseLocalStorage();

	window.onload = function(){
		$("#login_btn").click(function(){
			$.ajax({
				url: '/api/users/login',
				type: 'POST',
		        dataType: 'json',
				data: {
					"email": $("#email").val(),
					"password": $("#password").val()
				},
				success: loginSucess,
				error: loginFail
			})
		});
	}

	function loginSucess(data){
		if (CAN_USE_LOCALSTORAGE) {
			localStorage.accessToken = data.id;
			localStorage.userId = data.userId;
		}else{
			
		}
		window.location.href = "profile.html";
	}

	function loginFail(jqXHR, textStatus, errorThrown){
		console.log("loginFail");
		console.dir(jqXHR);
		console.dir(textStatus);
	}

	function canUseLocalStorage(){
		if(typeof(Storage) !== "undefined") {
			return true;
		}else{
			return false;
		}
	}

})();