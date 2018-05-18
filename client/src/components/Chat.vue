<template>
    <div >
        <div class="header">
            <div>Final Project</div>
            <div><button class="btn btn-sm btn-secondary btn-block" @click="logout">Logout</button></div>
        </div>
        <div id="container">
      <p>{{ error }}</p>
        <ul class="chat">
            <li v-for="message in messages" :key="message.id"><span>{{message.from}}: @{{message.to}} - {{message.content}}</span></li>
        </ul>
        </div>
        <div class="input">
          <form @submit.prevent="send">
            <div class="input-group">
                <input placeholder="Recipient" class="to" required v-model="to"/>
                <input type="text" class="form-control" placeholder="Message" aria-label="Recipient's username" aria-describedby="basic-addon2" required v-model="content">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="submit">Send</button>
                </div>
            </div>
          </form>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';

export default {
  name: "Chat",
  data() {
    return {
      messages: [],
      to:"",
      content:"",
      error:""
    };
  },
  created() {
     this.initUser();
     this.initSocket();
     this.getMessages();
     this.scrollToBottom();
  },
  updated() {
     this.scrollToBottom();
  },
  methods: {
    send() {
      this.socket.emit("client-message", {
        to: this.to,
        from: this.username,
        content: this.content,
        datePosted: Date.now()
      });

      this.content = "";
    },
    getMessages(){
        axios
        .get("http://localhost:1337/api/tweet/" + this.username)
        .then(response => {
          this.messages = response.data;
        })
        .catch(error => {
          this.error = "Server error";
        });
    },
    initUser(){
      this.username = localStorage.getItem("username");

      if(!this.username){
        location.href = "#/login";
      }
    },
    initSocket(){
      this.socket = io("http://localhost:1337");
      this.socket.on(this.username, this.onMessageReceived.bind(this));
    },
    onMessageReceived(message){
        console.log("Message received", message);
        this.messages.push(message);
        this.scrollToBottom();
    },
    scrollToBottom(){
      window.scrollTo(0,document.body.scrollHeight);
    },
    logout(){
      localStorage.removeItem("username");
      location.href = "#/login";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container{
  position:absolute;
  background: #333;
  width: 100%;
  height:100%;
  padding: 20px 20px 60px 20px;
}
.chat {
  margin-bottom: 50px;
  width: 100%;
  display:block;
  text-align: left;
  color: #00ff41;
  font-family: "Lucida Console";
}
.input {
  position: fixed;
  bottom: 0px;
  height: 50px;
  width: 100%;
  text-align: left;
  background: #000;
  padding:5px 8px;
  color: #00ff41;
  font-family: "Lucida Console";
  display: flex;
  align-items: center;
}

.input input {
  padding: 5px;
}

.input .message {
  width: 60%;
}

.input .to {
  min-width: 100px;
  width: 20%;
}
</style>
