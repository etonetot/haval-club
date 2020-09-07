<template>
    <div class="pagePhoto">
            <v-layout nowrap >    
                <v-flex> 
                    <v-menu offset-y transition="slide-y-transition">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark v-on="on" class="mb-1">
                                {{curFolderTitle}}
                                <v-icon right>fa-caret-down</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="item in folderlist" :key="item.folder" :to="curFolderLink(item.folder)">
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list> 
                    </v-menu>
                </v-flex>    
                    

                <v-flex class="text-right align-self-end" >
                        {{slide+1}}/{{arrCurFolderFiles.length+1}} 
                </v-flex>

            </v-layout>
                <v-carousel
                        id="carousel1"
                        :cycle="false"
                        v-model="slide"
                        class="car-carousel"
                        delimiter-icon="stop"
                >

                    <v-carousel-item v-for="(item,ind) in arrCurFolderFiles" :key="ind" :src="folderPath+item" >
                    </v-carousel-item>

                    <v-carousel-item class="last-slide" :src="folderPath+arrCurFolderFiles[0]" :key="arrCurFolderFiles.length+1">
                        <div class="pa-3">    
                            <p v-for="folder in folderlist" :key="folder.folder">
                                <router-link  :to="curFolderLink(folder.folder)">{{folder.title}}</router-link>
                            </p>
                        </div>
                    </v-carousel-item>  

                </v-carousel>

    </div>
</template>


<script>
    import config from '@/config.js'

    export default {
        components: {
        },

        head () {
            return {
                    title: this.$store.state.curCarData.modelname + " - Фотографии",
            }
        },

        breadcrumb() {
            return {
                    title: "Фотографии"+this.photos[this.curFolder].title
            }
        },

        data() {
            return {
                slide: 0,
            }
        },

        computed: {
            photos(){
                return this.$store.state.photos.photos;
            },

            arrCurFolderFiles(){
                return this.curFolder<this.photos.length ? this.photos[this.curFolder].files : [];
            },

            curFolder(){
                return this.$route.params.folder ? this.$route.params.folder : 0 ;
            },

            folderPath: function () {
                return this.photos.length ? config.imageserver + this.photos[this.curFolder].path : "";
            },

            folderlist: function() {
                let arr = [];
                for (let i=0 ; i<this.photos.length ; i++)
                    if (i!=this.curFolder)
                        arr.push({folder: this.photos[i].folder, title: this.photos[i].title})
                return arr;
            },

            curFolderTitle: function(){
                 return this.$store.getters['photos/GET_CURFOLDERTITLE'](this.curFolder);
            },

        },


        methods: {
            curFolderLink(folder) {
                return '/' + config.vendor + this.$route.params.car + '/photo/' + (folder ? folder : '');
            },

            getBreadCrumbName: function(){
                return this.photos.length ? this.photos[this.curFolder].title + ' ' : '';
            },


        },

        async fetch ({store, params}) {
            await store.dispatch('photos/LOAD_PHOTOS', params.car);
        },

    }
</script>






<style >
    .pagePhoto{
        max-width: 800px;
    }

    .car-carousel .carousel-caption
    {
        text-align:left;
        top: 20px;
        left: 10%;
        font-size: 1.5rem !important;
    }

    .car-carousel .carousel-caption a
    {
        color: red;
        text-shadow: 0 0 0;
    }


    .car-carousel .last-slide div.v-image__image
    {
        opacity: 0.25;
    }
    .car-carousel .last-slide a
    {
        opacity: 0.99;
        font-size: 2em;
        color: black;

    }

    .car-carousel .carousel-control-prev-icon, .car-carousel .carousel-control-next-icon
    {
        width: 40px;
        height: 40px;
    }


    .car-carousel .carousel-control-next
    {
        padding-left:100px;
        transition: padding 0.2s ease;
    }

    .car-carousel .carousel-control-next:hover
    {
        padding-left:0px;
    }

    .car-carousel .carousel-control-prev
    {
        padding-right:100px;
        transition: padding 0.2s ease;
    }

    .car-carousel .carousel-control-prev:hover
    {
        padding-right:0px;
    }

</style>





