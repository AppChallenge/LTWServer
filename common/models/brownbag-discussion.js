module.exports = function(BrownbagDiscussion) {// register brownbag
	BrownbagDiscussion.getBrownbagDiscussionsByBrownbagId = function(brownbagId, cb){
		BrownbagDiscussion.find({
			fields: {
				id: true, postdate: true, message: true, userId: true, brownbagId: true
			},
			where: {
				brownbagId: brownbagId
			},
			include: {
				relation: "user",
				scope: {
					fields: ['id', 'email', 'username']
				}
				
			}
		}, 	
		cb);
	};
	BrownbagDiscussion.remoteMethod('getBrownbagDiscussionsByBrownbagId', {
		accepts: [
			{arg: 'brownbagId', type: 'number'}
		],
		returns: {arg: 'success', type: 'boolean'},
		http: {path:'/get-brownbag-discussions', verb: 'post'}
	});
};
