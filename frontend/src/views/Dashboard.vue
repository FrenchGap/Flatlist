<template>
  <v-layout fill-height>
    <v-container>
      <v-row>
        <v-col cols="12" md="8">
          <ListTable />
        </v-col>
        <v-col cols="12" md="4">
          <ActivityFeed />
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import ActivityFeed from '../components/Modules/ActivityFeed.vue'
import ListTable from '../components/Modules/ListTable.vue'
export default {
  components: {
    ListTable,
    ActivityFeed
  },
  name: "Dashboard",
  data() {
    return {
      
    }
  }
}
</script>

<style>

</style>