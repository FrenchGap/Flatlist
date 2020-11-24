<template>
  <v-card
    elevation="5"
    class="mx-auto"
  >
    <v-system-bar
      color="black"
      dark
    >
      <v-icon>mdi-menu</v-icon>
      <span>Menu</span>
    </v-system-bar>
    <v-list dense>
      <v-list-item
        v-for="(item, i) in menuItemsList"
        :key="i"
        :to="{ name: item.route }"
        exact
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-if="$store.state.User.admin"
        :to="{ name: 'Admin' }"
        exact
      >
        <v-list-item-icon>
          <v-icon >mdi-account-supervisor-circle</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Admin</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "NavHub",
  data() {
    return {
      menuItemsList: [
        { "icon": "mdi-format-list-bulleted", "text": "Lists", "route": "Home" },
        { "icon": "mdi-chart-timeline-variant", "text": "Activity", "route": "Activity" },
        { "icon": "mdi-account-group", "text": "Members", "route": "Members" },
      ]
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style>

</style>