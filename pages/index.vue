<template>
  <v-container class="p-3">

    <v-layout row wrap v-for="st in saleStatus" :key="st.id">
      <v-flex xs12>
        <h2 v-if="carsWithStatus(st.id, st.id2).length">{{st.title}}</h2>
      </v-flex>
      <v-flex shrink v-for="item in carsWithStatus(st.id, st.id2)" :key="item.id">

      <v-hover>
        <v-card  :class="`ma-4 carcard elevation-${hover ? 5 : 2}`" slot-scope="{ hover }">
          <router-link :to="'/' + item.href + '/photo'">
            <v-img :src="root + item.photodir + '/logo2.jpg'" class="car-image">
              <div v-if="item.price1" class="car-price">
                        <span> От {{ item.price1*1000 | currency }} руб.</span> 
              </div>
            </v-img>
          </router-link>

          <v-card-title class="blue py-1">
              <router-link :to="'/' + item.href" class="white--text car-title">{{item.modelname}}</router-link>

              <v-spacer></v-spacer>

              <v-menu bottom offset-x>
                <template v-slot:activator="{ on }">
                  <v-btn dark icon v-on="on"> <v-icon>fa-bars</v-icon> </v-btn>
                </template>

                <v-list>
                  <v-list-item v-for="(button, i) in buttons" :key="i" :to="'/' + item.href + button.href">
                    <v-list-item-title >{{ button.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>


          </v-card-title>

          <!-- <price-informer rub :price="item.price1" class="text-xs-right"></price-informer> -->

        </v-card>
      </v-hover>

      </v-flex>

    </v-layout>

  </v-container>
</template>

<script>
    import config from '@/config.js'

    export default {
        name: 'Catalog',

        head () {
            return {
                    title: 'Модели Haval',
            }
        },

        components: {
            PriceInformer: () => import('@/components/PriceInformer'),
        },

        data () {
            return {

                buttons: [
                    { name: 'props',  href:'/', title:'Технические характеристики'},
                    { name: 'photo',  href:'/photo', title:'Фотографии'},
                    { name: 'video',  href:'/video', title:'Видео'},
                    { name: 'doc',  href:'/doc', title:'Документация'},
                    { name: 'news',  href:'/news', title:'Новости'},
                    { name: 'sales',  href:'/sales', title:'Продажи'},
                ],

                saleStatus:[
                    {id: "rus", id2: "rusplan", title: ""},
                    {id: "", id2: "",           title: "Модели внутреннего рынка"},
                    {id: "old", title: "Снятые с производства"},
                    {id: "con", title: "Концепты"},
                ]

            }
        },

        computed: {
            root() {
                return config.imageserver;
            }
        },

        methods: {

            carsWithStatus(status1, status2) {
                return this.$store.state.cars.cars.filter( item => item.status==status1 || item.status==status2 )
            },

        },

        async fetch ({store, params}) {
            await store.dispatch('cars/LOAD_CARS');
        },


    }
</script>

<style scoped>
  .car-title {
    
    text-decoration: none;
  }

  .car-card {
    width: 240px;
    border-radius: 5px;
  }

  .car-image {
    width: 240px;
    border-radius: 5px 5px 0px 0px;
    position: relative;      
  }

  .car-price {
      margin: 0 auto;
      position: absolute;
      right: 0;
      top: 0;  
      font-size: 0.9em;
      background-color: rgba(0,0,0, 0.5);
      color: white;
      padding: 3px 8px;
      border-radius: 0px 5px 0px 7px;
      
  }

</style>
