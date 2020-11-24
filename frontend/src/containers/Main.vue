<template>
  <v-app>
    <Navbar />
    <v-main transition="slide-x-transition">
      <v-layout fill-height v-if="$store.state.Auth.authenticated">
        <v-container>
          <v-row>
            <v-col cols="12" md="3">
              <NavHub />
            </v-col>
            <v-col cols="12" md="9">
              <router-view />
            </v-col>
          </v-row>
        </v-container>
      </v-layout>
      <router-view v-else />
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
import NavHub from '../components/Navigation/NavHub.vue'
import Navbar from '../components/Navigation/Navbar.vue'
export default {
  components: { Navbar, NavHub },
  name: 'MainContainer',
}
</script>

<style>

</style>