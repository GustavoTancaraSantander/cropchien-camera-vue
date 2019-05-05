<template>
	<v-container grid-list-xs>
		<v-layout row wrap>
			<v-flex v-for="(dog, index) in dogs" :key="dog.id" xs12 md6 xl3 pa-3>
				<v-card @click="$router.push({name: 'details', params: { id:dog.id, dogProp:dogs[index] }})">
					<v-img
					height="170"
					:src="dog.url"
					aspect-ratio= "2.75"
					></v-img>
					<v-card-title primary-title style="padding-top: 12px">
						<div>
							<h3 class="headline">{{ dog.comment }}</h3>
							<div class="subtitle">{{ dog.info}}</div>
						</div>
					</v-card-title>
				</v-card>
			</v-flex>
		</v-layout>
        <v-btn  @click="$router.push({ name: 'post'})" color="red" dark fixed bottom fab right >
            <v-icon>add</v-icon>
        </v-btn>
        
	</v-container>
</template>

<script>
import { firebaseApp } from "../configFirebase.js";
	export default {
		data() {
			return {
				dogs:[]
			}
		},
		
        mounted() {
            firebaseApp.firestore().collection('dogs').orderBy('createdAt', 'desc')
                .onSnapshot(snapshot => {
                    this.dogs = []
                    snapshot.forEach((dog) => {
                        this.dogs.push({
                            id: dog.id,
                            url: dog.data().url,
                            comment: dog.data().comment,
                            info: dog.data().info
                        })
                    })
                });
        },
	}
</script>

<style scoped>

</style>