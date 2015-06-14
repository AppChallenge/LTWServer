module.exports = function(BrownbagRegistration) {
	// register brownbag
	BrownbagRegistration.registeBrownbag = function(brownbagId, userId, cb){
		BrownbagRegistration.create({
			"role": "register",
			"userId": userId,
			"brownbagId": brownbagId
		}, 	
		function(err, registration){
			if (err) return cb(err);
			cb(null, true);
		});
	};
	BrownbagRegistration.remoteMethod('registeBrownbag', {
		accepts: [
			{arg: 'brownbagId', type: 'number'},
			{arg: 'userId', type: 'number'},
		],
		returns: {arg: 'success', type: 'boolean'},
		http: {path:'/registe-brownbags', verb: 'post'}
	});

	// follow brownbag
	BrownbagRegistration.followBrownbag = function(brownbagId, userId, cb){
		BrownbagRegistration.create({
			"role": "follower",
			"userId": userId,
			"brownbagId": brownbagId
		}, 	
		function(err, registration){
			if (err) return cb(err);
			cb(null, true);
		});
	};
	BrownbagRegistration.remoteMethod('followBrownbag', {
		accepts: [
			{arg: 'brownbagId', type: 'number'},
			{arg: 'userId', type: 'number'},
		],
		returns: {arg: 'success', type: 'boolean'},
		http: {path:'/follow-brownbags', verb: 'post'}
	});

	// deregister brownbag
	BrownbagRegistration.deregisterBrownbag = function(brownbagId, userId, cb){
		BrownbagRegistration.find({
			fields: {
				id: true
			},
			where: {
				userId: userId,
				brownbagId: brownbagId
			}
		}, 	
		function(err, registrations){
			if (err) return cb(err);
			for (key in registrations){
				BrownbagRegistration.destroyById(registrations[key].id)
			}
			cb(null, true);
		});
	};
	BrownbagRegistration.remoteMethod('deregisterBrownbag', {
		accepts: [
			{arg: 'brownbagId', type: 'number'},
			{arg: 'userId', type: 'number'},
		],
		returns: {arg: 'success', type: 'boolean'},
		http: {path:'/deregister-brownbags', verb: 'post'}
	});
};
