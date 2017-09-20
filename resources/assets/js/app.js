
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
import 'v-toaster/dist/v-toaster.css'
Vue.use(VueChatScroll) //Vuescroll plugin que permite mejorar el scrolling

import Toaster from 'v-toaster'
Vue.use(Toaster, {timeout: 5000}) //Plugin de notificacion

//Creamos el componente message con la siguiente plantilla message.vue
Vue.component('message', require('./components/message.vue'));

const app = new Vue({
    el: '#app' ,
    data : {
    	message : '',
    	chat : {
    		message: [], 
            user : [],
            color : [],
            time : []
    	},
        typing : '',
        numberOfUsers : 0,
    },
    watch : {

        //Un watcher para la propiedad message para detectar cuando alguien escribe
        message(){
            Echo.private('chat')
            .whisper('typing', {
                name: this.message
            });
        }

    },
    methods : {
    	
        /**
         * [send Metodo utilizado para enviar mensajes del servidor]
         */
        send(){

    		//Valida que no se envien mensajes en blanco
    		if(this.message.length > 0 ){

              //Si yo envio un mensaje es verde
              this.chat.color.push("success"); 
              //Genera un push historico de mensajes en la cajita del usuario
              this.chat.message.push(this.message);
              //Como el mensaje fue enviado por mi coloco el historico en user[]
              this.chat.user.push("Tú");
              //Coloco la hora
              this.chat.time.push(this.getTime());
              
              //Axios permite hacer un post asincronico usando promesas
              axios.post('/chat/send', {
                message : this.message, //Envia el mensaje string
                chat : this.ChatEvent// Envia el objeto tipo Chat
              })
              .then(response => {
                 this.message = ""; //Coloco el input en blanco 
              })
              .catch(error => {
                 console.log(error);
              });
    		}
    	},

        /**
         * [getTime Retorna hora militar y minutos]
         * @return {[string]} [Horas y minutos formateados]
         */
        getTime(){
            let time = new Date();
            return time.getHours() + ':' + time.getMinutes();
        },

        /**
         * [getOldMessages Obtiene todos los mensajes en session]
         * @return {[Json Array]}
         */
        getOldMessages(){
            axios.post('/chat/getOldMessage' )
              .then(response => {
                 if(response.data != ''){
                    this.chat = response.data;
                 }
              })
              .catch(error => {
                 console.log(error);
              });
        }

    },
    /**
     * [mounted Se ejecuta cuando el componente fue montado con exito]
     */
    mounted() {

        //Cargo mensajes antiguos grabados en session
        this.getOldMessages();

        //Mantiene una comunicacion activa con el canal privado
        Echo.private('chat')
        .listen('ChatEvent', (e) => {

            //Si yo recibo un mensaje es amarillo
            this.chat.color.push("warning"); 

            //Utilizando dontBroadcastToCurrentUser() en el evento
            //Evito que mis propios mensajes sean broadcasteados
            this.chat.message.push(e.message);

            //Si se recibe un mensaje se recibe el nombre de usuario
            this.chat.user.push(e.user);

            //Coloco la hora
            this.chat.time.push(this.getTime());

            /**
             * [chat Actualiza el objeto de session con el mensaje recibido]
             */
            axios.post('/chat/saveToSession',{
                chat : this.chat,
            } )
              .then(response => {
              })
              .catch(error => {
                 console.log(error);
              });
        })

        //Verifica si algun cliente esta escribiendo algo
        .listenForWhisper('typing', (e) => {
            if(e.name != ''){
                this.typing = "Alguien esta escribiendo...";
            }else{
                this.typing = '';
            }
        });

        Echo.join('chat')
        .here((users) => {
            this.numberOfUsers = users.length;
        })
        .joining((user) => {
            this.$toaster.success(user.name + 'se ha unido al chat');
            this.numberOfUsers += 1;
        })
        .leaving((user) => {
            this.$toaster.warning(user.name + 'ha abandonado el chat');
            this.numberOfUsers -= 1;
        });
    }
});
