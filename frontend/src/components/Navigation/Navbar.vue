<template>
  <div>
    <v-app-bar
      absolute
      dark
      color="transparent"
      flat
    >
      <v-toolbar-title>FlatList</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn
        outlined
        v-if="$store.state.Auth.authenticated"
        :to="{ name: 'Logout' }"
      >
        Logout
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
      <v-btn
        outlined
        v-else
        :to="{ name: 'Register' }"
        exact
      >
        Register
        <v-icon right>mdi-account-plus</v-icon>
      </v-btn>
    </v-app-bar>
    <v-img
      src="https://source.unsplash.com/collection/37710200"
      height="250"
      gradient="to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.4)"
    ></v-img>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>