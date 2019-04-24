const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// get
router.get('/', async (req, res) => {
	const posts = await loadPostsCollection();
	res.send(await posts.find({}).toArray());
});

// add post
router.post('/', async (req, res) => {
	const posts = await loadPostsCollection();
	await posts.insertOne({
		text: req.body.text,
		createdAt: new Date()
	});
	res.status(201).send();
});
// del post

router.delete('/:id', async (req, res) => {
	const posts = await loadPostsCollection();
	posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
	res.status(201).send();
});

async function loadPostsCollection() {
	const client = await mongodb.MongoClient.connect(
		'mongodb+srv://user:19941110@cluster0-luzqb.azure.mongodb.net/test?retryWrites=true',
		{ useNewUrlParser: true }
	);
	// const client = await mongodb.MongoClient.connect(
	// 	'mongodb://localhost:27017',
	// 	{ useNewUrlParser: true }
	// );
	return client.db('vue_express').collection('posts');
}

module.exports = router;
