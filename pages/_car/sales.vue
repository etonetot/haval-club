<template>
    <div>
        <v-card>    
            <div v-if="curCarData.has_sales_rus || curCarData.has_sales" class="salesCaption">
                <span class="title mb-4">Продажи в </span>
                <!-- <toggle-button v-model="rusCountry"
                    :labels="{checked: 'России', unchecked: 'Китае'}"
                    :switch-color="{checked: 'linear-gradient(white, white, blue, red, red)', unchecked: 'red'}"
                    :color="{checked: '#88f', unchecked: '#f88'}"
                    class="title toggleCountry" :width=120 :height=30
                /> -->
                <span v-if="curCarData.has_sales_rus && !curCarData.has_sales" class="title mb-4">
                    России
                </span>    
                <span v-else-if="!curCarData.has_sales_rus && curCarData.has_sales" class="title mb-4">
                    Китае
                </span>    
                <v-menu v-else-if="curCarData.has_sales_rus && curCarData.has_sales" offset-y transition="slide-y-transition">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" class="mt-1" dark v-on="on">
                            {{curCountry}}
                            <v-icon right>fa-caret-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list >
                        <v-list-item @click="rusCountry=true">России</v-list-item>
                        <v-list-item @click="rusCountry=false">Китае</v-list-item>
                    </v-list> 
                </v-menu>

            </div>

            <GChart v-if="sales.length" type="ColumnChart" :data="chartRows" :options="chartOptions"/>

            <v-divider></v-divider>
            
            <v-data-table 
                :headers="tableHeaders"
                :items="tableRows"
                class="elevation-1"
                hide-default-footer
                no-data-text = "Нет данных"
            >
                <!-- <template v-slot:items="{item}">
                    <td class="subheading text--blue">www{{ item.dt }}</td>
                    <td nowrap v-for="i in 12" :key="i" :class="{ 'oddSales' : i%2, 'text-xs-right': true}">{{ item["value"+(i-1).toString()] | volume }}</td>
                </template>                 -->

                <template v-slot:item.dt="{ item }">
                    <v-chip dark>{{ item.dt }}</v-chip>
                </template>                
                <template v-slot:item.total="{ item }">
                    <v-chip color="grey lighten-1" >{{ item.total }}</v-chip>
                </template>                
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
    import config from '@/config.js'
    import { GChart } from 'vue-google-charts'
    export default {
        components: {
            GChart
        },

        head () {
            return {
                    title: this.$store.state.curCarData.modelname + " - Статистика продаж",
                    meta: [
                            { hid: 'description', name: 'description', content: 'My custom description' }
                        ]                    
            }
        },

        data() {
            return {
                rusCountry: true,
                showLine: false,
                months: ['Январь', 'Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],

                // chartOptions: {
                //     hAxis: {
                //         direction:-1,
                //     },
                //     curveType2: 'bar'
                // },
    
                chartOptions: {
                    chart: {
                        title: 'Company Performance 33',
                        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                    },
                    height: 400,
                    legend: {position : 'none'} ,
                    series: {   0: { color: '#9F1102' }	},
                }
            }
        },

        computed: {
            config() {
                return config;
            },

            curCarData() {
                return this.$store.state.curCarData;
            },

            curCountry() {
                return this.rusCountry ? "России" : "Китае"
            },

            sales(){
                let arr = this.rusCountry ? this.$store.state.sales.sales.rus : this.$store.state.sales.sales.china;
                return arr ? arr : [];
            },

            chartRows(){
                let prev = this.sales[0];     
                
                let arr = [['Year', 'Sales']];
                this.sales.forEach((item, ind) => {
                    if (ind>0)    
                    {
                        for (let y=prev.year ; y<=item.year ; y++)
                        {
                            let m1 = y==prev.year ? prev.mon+1 : 1;    
                            let m2 = y==item.year ? item.mon : 13;    
                            for (let i=m1 ; i<m2 ; i++)
                                arr.push( [ i+"."+(2000+y), 0 ] );
                        }        
                        prev=item;
                    }
                    arr.push( [ item.mon+"."+(2000+item.year), item.sales ] );
                });   
                  
                return arr;   

            },

            tableHeaders(){
                let arr = [{   text: 'Год', align: 'center', sortable: false, class: "subtitle-1 font-weight-bold", value: 'dt'   }];
                this.months.forEach( (item, ind) => 
                    arr.push({   
                        text: item, 
                        align: 'center', 
                        sortable: false, 
                        class: "subtitle-1 font-weight-bold",
                        value: 'value'+ind   
                    })
                );
                arr.push({   text: 'Итого', align: 'left', sortable: false, class: "subtitle-1 font-weight-bold", value: 'total'   });
                return arr;
            },

            tableRows(){
                let years = [], yearsTotal = [];
                this.sales.forEach(item => {
                     if (years.indexOf(item.year)==-1)
                        years.push(item.year);
                     yearsTotal[item.year] = yearsTotal[item.year] ? yearsTotal[item.year]+item.sales : +item.sales;    
                });

                if (!years.length)
                    return [];

                let arr = [];
                years.forEach(year=>{
                    arr.push({ dt: year+2000 });
                });    
                
                this.sales.forEach(item=>{
                    let indYear = years.indexOf(item.year);
                    let m = "value"+(item.mon-1).toString();
                    arr[indYear][m] = item.sales;    
                });

                years.forEach((year, ind)=>{
                    arr[ind]['total'] = yearsTotal[year];    
                });    

                return arr;
             },

        },

        methods: {
        },

        mounted: function () {
            this.rusCountry = this.curCarData.has_sales_rus;
            this.showLine = true;
           
        },

        async fetch ({store, params}) {
            await store.dispatch('sales/LOAD_SALES', params.car);
        },

    }
</script>


<style>
.salesCaption {
    text-align:center;
}

.salesCaption span{
    vertical-align: -0.2em;
}
    
.toggleCountry{
    vertical-align: top;
}

.oddSales{
    background-color: #f5f5f5;
}

</style>
