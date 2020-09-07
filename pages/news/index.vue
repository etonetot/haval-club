<template>
    <div class="my-3">
        <news-list :items="newsList" @pageChanged="pageChanged"></news-list>
    </div>
</template>

<script>
    import config from '@/config.js'
    
    export default {
        components: {
            NewsList: () => import('@/components/NewsList'),
        },

        head () {
            return {
                    title: 'Новости о Haval',
            }
        },

        data() {
            return {
            }
        },

        computed: {
            newsList(){
                return this.$store.state.news.allnews;
            },
            
        },

        methods: {
            pageChanged(page) {
                //this.$router.push({ name: 'allnews', params: page==1 ? undefined : { page: page } })
            }

        },

        async fetch ({store, params}) {
            await store.dispatch('news/LOAD_ALLNEWS');
        },
    
    }
</script>

<style>
</style>
