import Tweet from '../../models/tweet';

export default api => {
    api.get('/tweet/:username', async (req, res) => {
        let username = req.params.username;
        let tweets = await Tweet.find({ $or:[ {'to':username}, {'from':username} ]}).limit(50).exec();
        return res.json(tweets);
    });
};
