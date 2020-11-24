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
      <v-simple-table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in listItems"
            :key="item.id"
          >
            <td>{{item.name}}</td>
            <td>{{item.description}}</td>
            <td>
              <v-btn
                icon
                outlined
                color="primary"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
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