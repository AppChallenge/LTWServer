module.exports = function(BoardBrownbag) {
	BoardBrownbag.listBrownbags = function(cb){
		BoardBrownbag.find({
			fields: {
				title: true, description: true, starttime: true, endtime: true, location: true, status: true, id: true
			},
			include: {
			    relation: 'brownbag-registrations',
			    scope: { // further filter the brownbag-registrations object
			    	where: {role: "speaker"},
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
