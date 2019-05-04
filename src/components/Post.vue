<template>
	<v-container grid-list-xs>
		<v-layout row wrap>
			<v-flex xs1>
				Post commin soon... {{key}}
			</v-flex>
		</v-layout>	
	</v-container>
</template>

<script>
	export default {
		data() {
			return {
				key: 'Post Wlcome'
			}
		},
	}
</script>

<style scoped>

</style>