<template>
    <div>
            <v-card>
                    <v-card-title class="headline">{{ doc.docname }}</v-card-title>
                    <p class="subheading pa-3" v-html="doc.content"></p>
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
                    title: this.doc.docname,
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
            doc() {
                return this.$store.state.doc.curDoc;
            },

        },

        methods: {
        },

        mounted(){
        },

        async fetch ({store, params}) {
            await store.dispatch('doc/LOAD_DOC', params.docid);
        },


    }
</script>



