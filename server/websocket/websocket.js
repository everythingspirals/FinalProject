import SocketIO     from 'socket.io';
import TweetsWS      from './tweets-ws';
import _ from 'lodash';

class WebSocket {

    //instance functions
    constructor() {
        this.connectedUsers = [];
        this.sockets = [];
    }

    init(server) {

        this.io = new SocketIO(server);
        console.log('created new socket io instance');

        this.io.on('connection', (socket) => {
            let name = socket.handshake.query.name;
            let currentUser = {
                id: socket.id,
                name: name
            };

            console.log('Connection established ', currentUser);

            this.handleConnect(currentUser, socket);
            this.disconnect(currentUser, socket);

            let tweets = new TweetsWS(socket);
            tweets.init();
        });
    }

    handleConnect(currentUser, socket) {
        if (_.find(this.connectedUsers, (u) => { return u.id === currentUser.id; })) {
            console.log('User has connected but they already exist in connected users');

            socket.disconnect();
        }
        else {
            console.log('User has connected');
            this.sockets[currentUser.id] = socket;
            this.connectedUsers.push(currentUser);
        }
    }

    disconnect(currentUser, socket) {
        socket.on('disconnect', () => {
            _.remove(this.connectedUsers, (user) => {
                return user.id === currentUser.id;
            });
        });
    }

    //static methods
    broadcast(type, data) {
        this.io.emit(type, data);
    }
}

let ws = new WebSocket();
export default ws;
