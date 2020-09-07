<template>
    <div>
        <v-card class="my-3 video-page">
            <v-expansion-panels v-model="panel">
                <v-expansion-panel :popout="true" v-for="(item, ind) in video" :key="item.id">
                    <v-expansion-panel-header>
                        <v-layout>
                            <v-flex :shrink="true">
                                <v-img :src="mapThumb[ind]" height="100px" width="200px" contain></v-img>
                            </v-flex>
                            <v-flex class="subheading videopanel">                        
                                {{item.title}}
                            </v-flex>
                        </v-layout>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                    <v-card>
                        <v-card-text class="ml-4">
                            <iframe v-if="panel===ind" width="640" height="360" :src="'https://www.youtube.com/embed/'+item.link" 
                                frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </v-card-text>
                    </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
               
        </v-card>  
    </div>
</template>




<script>

    import config from '@/config.js'
    import axios from 'axios';

    export default {
        components: {
        },

        head () {
            return {
                    title: this.$store.state.curCarData.modelname + " - Видео",
            }
        },

        data() {
            return {
                mapThumb: [],
                panel: [],
            }
        },

        computed: {
            config() {
                return config;
            },
            video(){
                return this.$store.state.video.video;
            },

        },

        methods: {
        },

        async fetch ({store, params}) {
            await store.dispatch('video/LOAD_VIDEO', params.car);
        },

        mounted () {
                for (let i=0 ; i<this.video.length ; i++)
                {
                    this.mapThumb.splice(i, 1, config.imagesDir + "mqdefault.jpg");

                    axios
                        .get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+this.video[i].link+"&key=AIzaSyD3dMFKCrpKTcy4dH9oRckTfVUiATm19Sk")
                        .then(request => {
                            this.mapThumb.splice(i, 1, request.data.items[0].snippet.thumbnails.high.url);
                        });

                };

        }


    }
</script>


<style scoped>
    .video-page{
        max-width: 800px;
    }

    .video-panel
    {
        align-self: center;
    }
</style>

