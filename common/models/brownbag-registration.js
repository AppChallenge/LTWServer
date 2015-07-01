module.exports = function(BrownbagRegistration) {
	// speak at brownbag
	BrownbagRegistration.speakAtBrownbag = function(brownbagId, userId, cb){
		BrownbagRegistration.create({
			"role": "speaker",
			"userId": userId,
			"brownbagId": brownbagId
		}, 	
		function(err, registration){
			if (err) return cb(err);
			cb(null, true);
		});
	};
	BrownbagRegistration.remoteMethod('speakAtBrownbag', {
		accepts: [
			{arg: 'brownbagId', type: 'number'},
			{arg: 'userId', type: 'number'},
		],
		returns: {arg: 'success', type: 'boolean'},
		http: {path:'/speak-at-brownbags', verb: 'post'}
	});

	// register brownbag
	BrownbagRegistration.registerBrownbag = function(brownbagId, userId, cb){
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
	BrownbagRegistration.remoteMethod('registerBrownbag', {
		accepts: [
			{arg: 'brownbagId', type: 'number'},
			{arg: 'userId', type: 'number'},
		],
		returns: {arg: 'success', type: 'boolean'},
		http: {path:'/register-brownbags', verb: 'post'}
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
