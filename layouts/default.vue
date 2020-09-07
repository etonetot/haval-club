<template>
  <v-app >

    <v-navigation-drawer v-model="drawer" clipped app mobile-break-point="2000">
        <v-list dense>
          <v-list-item :to="hrefroot">
            <v-list-item-icon>
                  <v-icon class=ma-2>fa-car</v-icon> 
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>Модельный ряд Haval</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          
          <v-divider></v-divider>
          
          <v-list-item v-for="item in mainmenu" :key="item.title" :to="item.href" class="menuitem-car">
            <v-list-item-icon>
                <v-img :src="getCarIcon(item.title)"></v-img>
            </v-list-item-icon>              
            <v-list-item-content>
                <v-list-item-title v-text="item.title" ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item v-for="item in restmenu" :key="item.title" :to="item.href">
            <v-list-item-icon>
                  <v-icon class=ma-2>{{item.icon}}</v-icon> 
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>    
          </v-list-item>
        </v-list>
        
    </v-navigation-drawer>

    <v-app-bar app dense class="text-lg-left">

      <v-snackbar v-model="snackbar" top :timeout="6000" color="error">
            {{ snackbarText }}
            <v-btn flat @click="snackbar = false">
              <v-icon>close</v-icon>
            </v-btn>
      </v-snackbar>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-btn text :to="hrefroot" active-class="" class="logoBtn">
        <v-img :src="config.imagesDir+'logo.png'" :width="logoWidth"></v-img>
      </v-btn>

      <v-btn text fixed-tabs v-for="item in mainmenu" :key="item.title" :to="item.href" 
            class="hidden-sm-and-down"
            :small="$vuetify.breakpoint.mdAndDown"
      >
        <v-img :src="getCarIcon(item.title)" :width="$vuetify.breakpoint.mdAndDown? 20 : 40"></v-img>
        <span class="">&nbsp; {{item.title}}</span>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn text :href="item.href" v-for="item in restmenu" :key="item.title" class="hidden-xs-only">
        <v-icon class=ma-2>{{item.icon}}</v-icon> {{item.title}}
      </v-btn>

      <v-progress-circular indeterminate color="primary" v-show="loading"></v-progress-circular>
      
      
    </v-app-bar>




    <v-content>
      <v-container>

        <bread-crumps v-if="showBreadCrumbs" class="subheading"></bread-crumps>

        <nuxt />
        
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
import config from "@/config.js";

export default {
  components: {
    BreadCrumps: () => import("@/components/BreadCrumps")
  },
  data() {
    return {
      drawer: false,
      mainmenu: [
        { href: "/" + config.vendor + "f7", title: "F7" },
        { href: "/" + config.vendor + "f7x", title: "F7X" },
        { href: "/" + config.vendor + "h2", title: "H2" /*modelid:375 */ },
        { href: "/" + config.vendor + "h5", title: "H5" /*modelid:572 */ },
        { href: "/" + config.vendor + "h6", title: "H6" /*modelid:572 */ },
        { href: "/" + config.vendor + "h9", title: "H9" /*modelid:522 */ }
      ],
      restmenu: [
        { href: "/news" , title: "Новости", icon: "fa-newspaper" },
        { href: config.forumPage , title: "Форум", icon: "fa-comments" },
      ],
      
      hrefroot: "/" + config.vendor
    };
  },

  computed: {
    config() {
      return config;
    },
    curTab() {
      return this.$store.state.curTab;
    },
    loading() {
      return this.$store.state.loading;
    },
    snackbar: {
      get: function() {
        return this.$store.state.neterror;
      },
      set: function(newValue) {
        //this.$store.commit('ERROR_SHOWED');
      }
    },
    snackbarText() {
      return this.$store.state.errorText;
    },
    logoWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
          return "140px";
        case "md":
          return "180px";
        default:
          return "240px";
      }
    },
    showBreadCrumbs() {
      return !this.$store.state.neterror;
    }
  },
  methods:{
    getCarIcon(title) {
        return this.config.imagesDir+'cars/'+title+'.gif'
    }      
  }


};
</script>


<style>
/* @import "https://use.fontawesome.com/releases/v5.1.0/css/all.css"; */

.logoBtn:hover {
  /* background-color:  !important; */
}

.menuitem-car {
    padding-left: 50px;
}
</style>
