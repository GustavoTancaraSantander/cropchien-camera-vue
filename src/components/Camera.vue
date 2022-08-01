<template>
	<div class="camera-modal">
		<video ref="video" class="camera-stream"></video>
		<div class="camera-modal-container"></div>
		<v-btn  class="take-picture-button" color="pink" dark fab @click="capture" >
			<v-icon v-show="!cameraClicked">camera</v-icon>
		</v-btn>
		<v-switch label="label" v-model="front"></v-switch>
		<v-select
			:items="items"
			v-model="value"
			label="label"
		></v-select>
		<PhotoCapture v-model="imageBase64" />
	</div>
</template>

<script>
import { firebaseApp } from '../configFirebase.js'
//import postDog from './mixins/postDog.js'
import 'vue-media-recorder/src/assets/scss/main.scss'
import {PhotoCapture, VideoCapture} from 'vue-media-recorder'
	export default {
		components:{
			PhotoCapture,
			VideoCapture
		},
		data() {
			return {
				imageBase64: null,
            videoUrl: null,
				//////////
				items: [],
				value: null,
				front: false,
				mediaStream: null,
				cameraClicked: false
			}
		},
		mounted() {
			navigator.mediaDevices.enumerateDevices()
						.then((devices) => {
						devices.forEach((device) => {
							console.log(device.kind + ": " + device.label +
											" id = " + device.deviceId);
							this.items.push(device.kind+":"+ device.label)
						});
						})
						.catch((err) => {
						console.log(err.name + ": " + err.message);
						});
			if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
				navigator.mediaDevices.getUserMedia({video: { facingMode:  "user"  }})
					.then( mediaStream => {
						this.mediaStream = mediaStream
						this.$refs.video.srcObject = mediaStream
						this.$refs.video.play()
					})
					.catch(err => console.error('getUserMedia() ERROR:', err))
					
							
			}
			else if (navigator.getUserMedia) { // stardard
				navigator.getUserMedia({ video: { facingMode:  "user"  } }, (mediaStream) => {
					this.mediaStream = mediaStream
					this.$refs.video.srcObject = mediaStream
					this.$refs.video.play()
				}, errBack);	
			}
			else if (navigator.webkitGetUserMedia) {	// WebKit-prefixed
				navigator.webkitGetUserMedia({ video: { facingMode:  "user"  } }, function (mediaStream) {
					this.mediaStream = mediaStream
					this.$refs.video.srcObject = window.webkitURL.createObjectURL(mediaStream)
					this.$refs.video.play()					
				}, errBack);
			}
			else if (navigator.mozGetUserMedia) {	// Mozilla-prefixed
				navigator.mozGetUserMedia({ video: { facingMode:  "user"  } }, (mediaStream) =>{
					this.mediaStream = mediaStream
					this.$refs.video.srcObject = window.URL.createObjectURL(mediaStream)
					this.$refs.video.play()					
				}, errBack);
			}
		},
		
		methods: {
			capture () {
				this.cameraClicked = true 
				const vm = this
				const mediaStreamTrack = this.mediaStream.getVideoTracks()[0]
				const imageCapture = new window.ImageCapture(mediaStreamTrack)
				return imageCapture.takePhoto()
				.then( blob => {
					firebaseApp.storage().ref().child(`images/picture-${ new Date().getTime() }`).put(blob)
						.then( response => {
							response.ref.getDownloadURL()
							.then((pictureURL) => {
								console.log("Files available at", pictureURL);
								this.$router.push({
									name: 'post',
									params: { pictureURL }
								})							
							});
						})
				})
				.catch( err => { console.log(err); this.$router.go(-1)});
			}
		},
		
		destroyed() {
			const tracks = this.mediaStream.getTracks()
			tracks.map(track => track.stop())
		},
	}
</script>

<style scoped>
	.camera-modal {
        width: 100%;
        height: 100%;
        top: 20;
        left: 0;
        position: absolute;
        background-color: white;
        z-index: 10;
    }
    .camera-stream {
        width: 100%;
        max-height: 100%;
    }
    .camera-modal-container {
        position: absolute;
        bottom: 0;
        width: 100%;
        align-items: center;
        margin-bottom: 24px;
    }
    .take-picture-button {
        display: block;
        margin: auto;
        margin-top: 20px;
    }
</style>