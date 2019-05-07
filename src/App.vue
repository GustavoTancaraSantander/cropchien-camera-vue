<template>
  <v-app>
    <v-toolbar app>
		<v-btn icon v-if="$route.name !== 'home'" @click="$router.go(-1)">
			<v-icon>arrow_back</v-icon>
		</v-btn>
		
		<v-toolbar-title>
			<span>DogFarm</span>
		</v-toolbar-title>
		
			<v-spacer></v-spacer>
			
		<v-btn icon v-if="$route.name == 'post'" @click="$router.push({name:'camera'})" >
			<v-icon>camera_alt</v-icon>
		</v-btn>
	  
	  	<v-btn icon v-if="$route.name == 'home'" @click="getMessagingToken">
			  <v-icon>notifications_none</v-icon>
		</v-btn>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
      <!-- <HelloWorld/> -->
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Home from './components/Home.vue';

import { firebaseApp } from './configFirebase.js'
import axios from 'axios'
//import { messaging } from firebase;

export default {
  name: 'App',
  components: {
    HelloWorld , Home
  },
  data () {
    return {
      //
    }
  },
  mounted () {
	  this.listenTokenRefresh();
  },
  methods: {
	  getMessagingToken () {
		  firebaseApp.messaging().getToken()
		  	.then(async(token) => {
				if (token) {
					const currentMessageToken = window.localStorage.getItem('messagingToken')
					console.log('token will be UPDATED', currentMessageToken != token);
					if (currentMessageToken != token) {
						await this.saveToken(token)
					}
				} else {
					console.log('No Instance ID token available. Request permission to generate ONE.');
					this.notificationsPermisionRequest()					
				}
			})
			.catch((errr) => {
				console.error('An ERRROR occurred while retrieving token.', errr);
			}) 
	  },
	  
	  notificationsPermisionRequest () {
		  firebaseApp.messaging().requestPermission()
		  	.then((result) => {
				this.getMessagingToken()
			})
			.catch((err) => {
				console.error("Unable to get permission to notify.", err);
			});
	  },
	  listenTokenRefresh() {
		  const currentMessageToken = window.localStorage.getItem('messagingToken')
		  console.log('currentMessageToken', currentMessageToken);
		  if (!!currentMessageToken) {
			  firebaseApp.messaging().onTokenRefresh(() => {
				  firebaseApp.messaging().getToken()
					.then((token) => {
						this.saveToken(token)
					})
					.catch((err) => console.log('Unable to retrieve refreshed token ', err))
			  })
		  }	  
	  },
	  saveToken (token) {
		  console.log('token', token);
		  axios.post(`https://us-central1-ias-pwa-dogfarm.cloudfunctions.net/GeneralSubscription`, {token})
		  	.then((response) => {
				window.localStorage.setItem('messagingToken', token)
				console.log(response);
			}).catch((err) => {
				console.error('ERR in saveToken()', err);
			});
	  }
  },
}
</script>
