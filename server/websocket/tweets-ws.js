import WebSocket from './websocket';
//import { Tweet, Social, SocialReplies } from '@mtk/model';
import Tweet from '../models/tweet';

class TweetsWS {
    constructor(socket) {
        this.socket = socket;
    }

    init() {
        this.onTweet();
        console.log("Initialized tweet listener");
    }

    onTweet() {
        this.socket.on('client-message', async messageData => {
            try {
                let newTweet = await new Tweet(messageData).save();
                WebSocket.broadcast(messageData.to, newTweet);
                WebSocket.broadcast(messageData.from, newTweet);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}

export default TweetsWS;
