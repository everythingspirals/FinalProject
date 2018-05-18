//Alphabetical list ...
import TweetRoute       from './v1/tweet.route';
import UserRoute        from './v1/user.route';

class ActiveRoutes {
    constructor(api) {
        TweetRoute(api);
        UserRoute(api);
    }
}

export default ActiveRoutes;
