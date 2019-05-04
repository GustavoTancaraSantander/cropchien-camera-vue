<template>
  <v-app>
    <v-toolbar app>
      <v-btn icon v-if="$route.name !== 'home'" @click="$router.go(-1)">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      
      <v-toolbar-title>
          <span>DogFarm</span>
      </v-toolbar-title>
      <!-- <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title> -->
      <v-spacer></v-spacer>
   <!--    <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn> -->
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

export default {
  name: 'App',
  components: {
    HelloWorld , Home
  },
  data () {
    return {
      //
    }
  }
}
</script>
