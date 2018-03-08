const Clarifai = require ("clarifai")


const app = new Clarifai.App({
  apiKey: "f50e8bee695e4e6cb793e2634a06d248"
});

const handleApiCall = (req, res) => {
app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data)
	})
	.catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
		.catch(err => res.status(400).son('unable to get entries'))
}

module.exports = {
	handleApiCall,
	handleImage
}