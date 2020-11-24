<template>
  <v-card
    elevation="5"
  >
    <v-system-bar
      color="black"
      dark
    >
      <v-icon>mdi-format-list-bulleted</v-icon>
      <span>Available Lists</span>
    </v-system-bar>
    <v-card-text>
      <v-list two-line dense>
        <v-list-item
          v-for="item in listItems"
          :key="item.id"
          :to="{ name: 'List', params: { id: item.id } }"
        >
          <v-list-item-avatar>
            <v-icon dark class="black">mdi-silverware-fork-knife</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              icon
            >

            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ListTable",
  data() {
    return {
      listItems: [
        {
          "id": 1,
          "name": "Flat Shopping",
          "description": "Shopping list for the flat, general stuff"
        }
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