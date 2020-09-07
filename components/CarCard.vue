<template>
    <div>
        <v-card class="subheading">
            <v-layout wrap class=pb-3>
                <v-flex shrink>
                    <img class="ma-1 sm4 carlogo" :src="root + curCarData.photodir + '/logo2.jpg'" width="240px"/>
                </v-flex>
                <v-flex class="pl-3 sm8">
                    <h1 class="title text-xs-center ma-2">{{curCarData.modelname}}</h1>
                    <div class="body-1" v-html="curCarData.review2"></div>

                    <price-informer rub :price="curCarData.price1" title="Цена в России: от" class="ma-1"></price-informer>
                    <price-informer :price="curCarData.chinaprice1" :priceTo="curCarData.chinaprice2" title="Цена в Китае: от" class="ma-1"></price-informer>

                </v-flex>
            </v-layout>
        </v-card>    

        <v-tabs show-arrows class="elevation-1" grow >
            <v-tab flat  v-for="item in carmenu" :key="item.name" :to="'/' + config.vendor + curCar + item.href" >
                {{item.title}}
            </v-tab>
        </v-tabs>




    </div>
</template>

<script>

    import config from '@/config.js'

    export default
    {
        components: {
            PriceInformer: () => import('@/components/PriceInformer'),
        },

        data () {
            return {
                carmenu: [
                    { name: 'props',  href:'/', title:'Технические характеристики'},
                    { name: 'photo',  href:'/photo', title:'Фотографии'},
                    { name: 'video',  href:'/video', title:'Видео'},
                    { name: 'doc',  href:'/doc', title:'Документация'},
                    { name: 'news',  href:'/news', title:'Новости'},
                    { name: 'sales',  href:'/sales', title:'Продажи'},
                ],
            }
        },

        computed: {
            config() {
                return config;
            },

            root() {
                return config.imageserver;
            },            
            curCar() {
                return this.$store.state.curCar;
            },
            curCarData(){
                return this.$store.state.curCarData;
            }
        },

    }
</script>

<style  >
    .carlogo {
        border-radius: 3px;
    }
</style>
