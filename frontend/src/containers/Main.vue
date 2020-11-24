<template>
  <v-app>
    <Navbar />
    <v-main transition="slide-x-transition">
      <router-view />
    </v-main>
    <v-overlay
      :value="$store.state.AppState.loadingContent"
      opacity="0.8"
    >
      <v-progress-circular
        indeterminate
        color="white"
        size="100"
        width="5"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import Navbar from '../components/Navigation/Navbar.vue'
export default {
  components: { Navbar },
  name: 'MainContainer',
}
</script>

<style>

</style>