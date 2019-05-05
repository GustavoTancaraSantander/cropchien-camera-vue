<template>
	<v-container grid-list-xs>
		<v-layout row wrap>
			<v-flex >
				Post commin soon... {{key}}
				<div id="spinner_container">
					<v-progress-circular 
						v-if="loading" 
						:size="100" 
						indeterminate 
						color="primary"  
						class="spinner"
						:rotate="-90"
					></v-progress-circular>
				
				</div>
				<img :src="this.dogURL">
				<v-container grid-list-lg>
					<!-- https://vuetifyjs.com/en/framework/grid#layout-playground -->
					<v-layout row wrap>
						<v-flex xs12>
							<v-text-field
								v-model="title"
								name="title"
								label="Deescribe me"
								id="title"
							></v-text-field>
							<v-text-field
								v-model="author"
								name="author"
								label="Author"
								id="author"
								hint="your name"
							></v-text-field>
							<v-btn round color="primary" @click="post()">POST A DOG</v-btn>
						</v-flex>
					</v-layout>
				</v-container>
			</v-flex>
		</v-layout>	
	</v-container>
</template>

<script>
import axios from 'axios';
import postDog from './mixins/postDog.js'
	export default {
		data() {
			return {
				key: 'Post Wlcome',
				dogURL: null,
				title: '',
				author: '',
				loading: true,
				
				// interval: {},
        		// value: 20
			}
		},
	/* 	beforeDestroy () {
			clearInterval(this.interval)
		}, */
		mounted () {
			axios.get('https://dog.ceo/api/breed/appenzeller/images/random')
				.then(response => {
					if (response.data.status) {
						console.log(response.data.status); // ok
						this.dogURL = response.data.message
						this.loading = false
					} else {
						console.log("erro Getting image");// fail		
					}
				})
			/* this.interval = setInterval(() => {
				if (this.value === 100) {
					return (this.value = 0)
				}
				this.value += 20
			}, 100)	 */
		},
		methods: {
			post() {
				postDog(this.dogURL, this.title, this.author)
			}
		}
		
	}
</script>

<style scoped>
	img {
    max-width: 100%;
    height: auto;
    width: auto\9;
		/* ie8 */
	}
	#spinner_container{
		text-align: center;
	}
	.spinner{
		margin:auto;
		margin: 4rem;
	}
</style>