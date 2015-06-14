module.exports = function(BoardBrownbag) {
	BoardBrownbag.listBrownbags = function(cb){
		BoardBrownbag.find({
			fields: {
				title: true, description: true, starttime: true, endtime: true, location: true, status: true, id: true
			}
		}, 
		cb);
	};
	BoardBrownbag.remoteMethod('listBrownbags', {
		returns: {arg: 'brownbags', type: 'array'},
		http: {path:'/list-brownbags', verb: 'get'}
	});

	
};
