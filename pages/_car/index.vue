<template>
    <div>
        <v-flex class="ma-2"> 
            Модельный год:
            <v-menu offset-y transition="slide-y-transition">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on">
                        {{curYear}}
                        <v-icon right>fa-caret-down</v-icon>
                    </v-btn>
                </template>
                <v-list >
                    <v-list-item v-for="item in years" :key="item" :to="curYearLink(item)">
                        {{ item }}
                    </v-list-item>
                </v-list> 
            </v-menu>
        </v-flex>    
        
        <scroll-table class="elevation-2" :cols="columns" :rows="rows"></scroll-table>
    </div>
</template>


<script>
    import config from '@/config.js'

    export default {
        components: {
            ScrollTable: () => import('@/components/PropsTable'),
        },

        head () {
            return {
                    title: this.$store.state.curCarData.modelname + " - Характеристики и цены в Китае",
            }
        },

        data() {
            return {
            }
        },

        computed: {
            columns(){
                return this.$store.state.props.cols;
            },
            rows(){
                return this.$store.state.props.rows;
            },
            years() {
                return this.$store.state.curCarData.years ? this.$store.state.curCarData.years.split(",") : [];
            },
            curYear() {
                if (this.$route.params.year) 
                {
                    if (this.years.includes(this.$route.params.year))
                        return this.$route.params.year;
                }    
                return this.years ? this.years[0] : 0;
            }
        },

        methods: {
            curYearLink(year) {
                return '/' + config.vendor + this.$route.params.car + '/props/' + (year ? year : '');
            },

        },

        async fetch ({store, params}) {
            try{
                await store.dispatch('props/LOAD_PROPS', { _car: params.car, year: params.year } );
            }catch(e)
            {}
        },

    }
</script>


<style >
</style>
