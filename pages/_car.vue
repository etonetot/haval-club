<template>
    <div>
        <car-card :car="cardata"></car-card>
        <div class="my-3">
           <nuxt-child></nuxt-child>
        </div>
    </div>
</template>


<script>
    import config from '@/config.js'

    export default {
        components: {
            CarCard: () => import('@/components/CarCard'),
        },

        data() {
            return {
            }
        },

        computed: {
            cardata(){
                return this.$store.state.curCarData;
            },

        },

        async fetch ({store, params, redirect, error}) {
            let self = this;
            try{
                await store.dispatch('LOAD_CARDATA', params.car);
            }
            catch (e)
            {
                store.commit('ERROR_INTERNAL', "Страница не найдена");
                error({statusCode:404, message: "Страница не найдена"});
                //redirect("/404", {statusCode:404});
            }
        },

    }
</script>


<style scoped>

</style>
