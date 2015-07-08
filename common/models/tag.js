module.exports = function(Tag) {
	Tag.addTag = function(brownbagId, tagName, cb){
		Tag.create({
			"brownbagId": brownbagId,
			"tagname": tagName
		}, function(err, obj){
			if (err) return cb(err);
			cb(null, {"success": true});
		});
	};

	Tag.remoteMethod('addTag', {
		accepts: [
			{arg: 'brownbagId', type: 'number'},
			{arg: 'tagName', type: 'string'}
		],
		returns: {arg: 'success', type: 'Boolean'},
		http: {path:'/add-tag', verb: 'post'}
	});

};
