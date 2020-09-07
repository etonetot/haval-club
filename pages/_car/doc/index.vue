<template>
    <div>
            <v-card>
                <v-layout row wrap>
                        <v-flex xs12 md5> 
                            <v-card-text> 
                                <v-treeview ref="treeview" :items="chapters" v-model="treeSelected" selectable open-on-click :open="opened">
                                </v-treeview>
                            </v-card-text>               
                        </v-flex>
                        <v-divider vertical></v-divider>
                        <v-flex xs12 md6>  
                            <v-card-text>
                                <v-list >
                                    <v-scroll-x-transition group hide-on-leave>
                                        <v-list-item
                                                v-for="(item, ind) in docsVisible" :key="item.id"
                                                :class="{odd : ind%2==0}"
                                                :to="item.id.toString()" append >
                                            <v-list-item-avatar>
                                                <v-icon>{{getIcon(item.content)}}</v-icon>
                                            </v-list-item-avatar>

                                            <v-list-item-content>
                                                <span class="subheading">{{ item.docname }}</span>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-scroll-x-transition>
                                </v-list >
                            </v-card-text>
                    </v-flex>
                </v-layout>
        </v-card>
    </div>
</template>




<script>
    import config from '@/config.js'

    export default {
        components: {
        },

        head () {
            return {
                    title: this.$store.state.curCarData.modelname + " - Документация",
            }
        },
    
        data() {
            return {
                arrChecked: true,
                treeSelected: [],
                opened: []
            }
        },

        computed: {
            config() {
                return config;
            },
            chapters(){
                return this.$store.state.doc.chapters;
            },
            docs(){
                return this.$store.state.doc.docs;
            },
            docsVisible(){
                return this.docs.filter(item=>{
                    return this.treeSelected.includes(item.chapter1) ||
                           this.treeSelected.includes(item.chapter2) || 
                           this.treeSelected.includes(item.chapter3);
                })
            },

        },

        methods: {
            getIcon(content){
                return "fa-file";
            },    
            openAll(){
                this.$refs.treeview.updateAll(true);
            }
        },

        mounted(){
            this.treeSelected = [];
            this.chapters.forEach(item => this.treeSelected.push(item.id) );
            this.$nextTick(function(){
                this.$refs.treeview.updateAll(true);
            });
        },

        async fetch ({store, params}) {
            await store.dispatch('doc/LOAD_DOCS', params.car);
        },

    }
</script>


<style>
    .odd{
       background-color: #eee; 
    }
</style>
