<template>
    <div>
        <news-list :items="carnews" @pageChanged="pageChanged"></news-list>
    </div>
</template>


<script>
    import config from '@/config.js'
    import {mapState} from 'vuex'
 
    export default {
        components: {
            NewsList: () => import('@/components/NewsList'),
        },

        head () {
            return {
                    title: this.$store.state.curCarData.modelname + " - Новости",
            }
        },

        data() {
            return {
            }
        },

        computed: {
            config() {
                return config;
            },
            ...mapState({
                carnews: state => state.news.carnews,
            })
            //carnews(){
                //return this.$store.state.news.carnews;
            //},

        },

        methods: {
            pageChanged(page)
            {
            }
        },

        async fetch ({store, params}) {
            await store.dispatch('news/LOAD_NEWS', params.car);
        },

    }
</script>


<style scoped>

</style>
