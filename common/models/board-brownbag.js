
module.exports = function(BoardBrownbag) {

	// BoardBrownbag.listTag = function(cb){
	// 	BoardBrownbag.find({
	// 		fields: {id: true, tag: true}
	// 	});
	// }

	BoardBrownbag.addTag = function(tagName, brownbagId, cb){
		BoardBrownbag.updateAll(
			{id: brownbagId},
			{tag: tagName},
			cb
		);
	}

	BoardBrownbag.remoteMethod('addTag', {
			accepts: [
				{arg: 'tagName', type: 'string'},
				{arg: 'brownbagId', type: 'number'}
			],
			returns: {arg: 'info', type: 'string'},
			http: {path:'/add-tag', verb: 'post'}
		});

	BoardBrownbag.findByTag = function(tagName, cb){
		BoardBrownbag.find({
			where: {"tag": tagName}
		}, cb);
	}

	BoardBrownbag.remoteMethod('findByTag', {
		accepts: [
			{arg: 'tagName', type: 'string'}
		],
		returns: {arg: 'brownbag', type: 'array'},
		http: {path:'/find-by-tag', verb: 'get'}
	});

	BoardBrownbag.listBrownbags = function(cb){
		BoardBrownbag.find({
			fields: {
				title: true, description: true, starttime: true, endtime: true, location: true, status: true, id: true
			},
			include: {
			    relation: 'brownbag-registrations',
			    scope: { // further filter the brownbag-registrations object
			    	where: {role: {inq: ["speaker", "register"]}},
			    	include: { // include orders for the owner
			    		relation: 'user', 
			    		scope: {
			    			fields: ['id', 'email', 'username']
			    		}
			    	}
			    }
			    

			}
		},
		cb);
	};

	BoardBrownbag.remoteMethod('listBrownbags', {
		returns: {arg: 'brownbags', type: 'array'},
		http: {path:'/list-brownbags', verb: 'get'}
	});

	BoardBrownbag.getBrownbagById = function(id, cb){
		BoardBrownbag.findById(id, [], cb);
	};

	BoardBrownbag.remoteMethod('getBrownbagById', {
		accepts: [
			{arg: 'id', type: 'number'}
		],
		returns: {arg: 'brownbag', type: 'object'},
		http: {path:'/get-brownbag-by-id', verb: 'get'}
	});

	function findAndReturnSpeakers(err, instances){

		console.log("findAndReturnSpeakers");
	}
};
