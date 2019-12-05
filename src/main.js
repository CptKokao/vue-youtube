import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";
import messagePlugin from "@/utils/message.plugin";
import "materialize-css/dist/js/materialize.min";
import Loader from "@/components/app/Loader";

// This import loads the firebase namespace.
import firebase from "firebase/app";

// These imports load individual services into the firebase namespace.
import "firebase/auth";
import "firebase/database";

Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.config.productionTip = false;
Vue.filter("date", dateFilter);
Vue.component('Loader', Loader);

firebase.initializeApp({
  apiKey: "AIzaSyAQj3N0uKpjuRzC7CCk88Ud1eSeqfdEyuw",
  authDomain: "vue-project-aeae9.firebaseapp.com",
  databaseURL: "https://vue-project-aeae9.firebaseio.com",
  projectId: "vue-project-aeae9",
  storageBucket: "vue-project-aeae9.appspot.com",
  messagingSenderId: "849389513185",
  appId: "1:849389513185:web:3f7aa91b1787082e314aa0",
  measurementId: "G-LF0SLGG785"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});


