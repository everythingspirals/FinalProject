import User from '../../models/user';
import bcrypt from 'bcryptjs';

export default api => {
    //Verify User Pass so they can change their password
    api.post('/user/verify', async (req, res) => {
        let password = req.body.password;
        let username = req.body.username;
        let user = await User.findOne({username: username});

        if (user) {
            let okPassword = await bcrypt.compare(password, user.password);
            res.json({success:okPassword});
        }
        else {
            res.json({success:false});
        }
    });

    //Post
    api.post('/user/register', async (req, res) => {
        //Hash password
        let hash = await bcrypt.hash(req.body.password, 10);
        req.body.password = hash;
        try{
            let user = await new User(req.body).save();
            return res.json(user);
        }catch (err){
            return res.json({error:err});
        }
    });
};
