<template>
	<v-container grid-list-xs>
		<v-layout column v-if="!!dog">
			<v-flex>
				<v-img :src="dog.url"/>
			</v-flex>
			<v-flex>
				<h1>{{ dog.comment }}</h1>
				<p class="subtitle">{{ dog.info }}</p>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import { firebaseApp } from '../configFirebase.js' 
	export default {
		props: {
			dogProp: {
				type: Object,
				//required: true
			},
		},
		data() {
			return {
				dog: undefined
			}
		},
		mounted () {
			if (!!this.dogProp) {
				this.dog = this.dogProp
			} else {
				console.log('dogPROP >>>', this.dogProp); // undefined
				
				const id = this.$route.params.id // watch route
				console.log('this.$route', id);
				
				firebaseApp.firestore().doc(`dogs/${id}`).get()
					.then( doc => {
						if (doc.exists) {
							this.dog = doc.data()
						} else {
							console.error('Non such document! DETAILS.VUE');
						}
					}).catch(error => {
						console.error("ERROR getting document:", error);
					});
			}
		}
	}
</script>

<style scoped>

</style>