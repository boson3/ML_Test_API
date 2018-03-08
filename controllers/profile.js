const handleProfile = (res, req, db) => {
	const { id } = req.params;
	db.select('*').from('users').where({id})
		.then(user => {
			if(user.length){
			res.json(user[0])
		} else{
		 res.status(400).json('NOT HERE BEEZ')
		}
	})
	.catch(err => res.status(400).json("SIKE"))
}

module.exports = {
	handleProfile : handleProfile
}