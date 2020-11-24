<template>
  <v-layout fill-height>
    <v-container>
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <v-card
            elevation="5"
            width="400"
          >
            <v-card-title>Login</v-card-title>
            <v-card-text>
              <v-form
                ref="loginform"
                v-model="formValid"
              >
                <v-text-field
                  v-model="user_email"
                  type="email"
                  outlined
                  label="Email"
                  append-icon="mdi-email"
                  :rules="emailRules"
                ></v-text-field>
                <v-text-field
                  v-model="user_password"
                  type="password"
                  outlined
                  label="Password"
                  append-icon="mdi-key"
                  :rules="passwordRules"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                outlined
                :to="{ name: 'Register' }"
                exact
              >
                Register
                <v-icon right>mdi-account-plus</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                outlined
                color="success"
                :disabled="!formValid"
                @click="validate"
              >
                Login
                <v-icon right>mdi-login</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'Loginpage',
  data() {
    return {
      formValid: false,
      user_email: "",
      user_password: "",
      
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || "Enter a valid email"
      ],
      passwordRules: [v => !!v || "Password is required"],
    }
  },
  mounted() {

  },
  methods: {
    validate() {
      if (this.$refs.loginform.validate()) {
        this.$store.dispatch('AppState/setLoading', true);
        this.loginUser()
        .then((response) => {
          if (response) {
            this.$router.push({ name: 'Home' });
          }
          this.$store.dispatch('AppState/setLoading');
        });
      }
    },

    async loginUser() {
      let params = {
        'email': this.user_email,
        'password': this.user_password
      }
      let response = await Axios.post(`${process.env.VUE_APP_API_URL}/login`, params)
      .then((response) => {
        this.$store.dispatch('Auth/setAuthenticated');
        this.$store.dispatch('Auth/setToken', response.data.token);
        this.$store.dispatch('User/setUser', response.data.user);
        return true;
      })
      .catch(() => {
        this.user_email = null
        this.user_password = null
        return false;
      });
      return response;
    }
  }
}
</script>

<style>

</style>