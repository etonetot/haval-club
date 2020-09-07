import config from '@/config.js';
import axios from 'axios';


export const state = () => ({
    cars:[],
})


export const mutations = {
    SET_CARS : (state, payload) => {
      //console.log("CARS_LOADED", payload.length);
      state.cars = payload;
      state.cars.forEach(item => {
         let a = item.href.split('/');
         if (item.href[0]=='/')
            a.shift();
         if (config.removeExtraPathItem)
            a.shift();
         if (config.removeExtraPathItem2)
            a.shift();
         if (item.href[item.href.length-1]=='/')
            a.pop();
         item.hrefCar = a[a.length-1]; 
         item.href = a.join("/");
         
         //console.log(item.href);
      });

    },

}

export const actions = {

    async LOAD_CARS ({ state, commit, rootState } ) {
      //console.log( config.httpserver + config.apivendor + 'getcars');
      const response = await axios.get(config.httpserver + config.apivendor + 'getcars')
      commit('SET_CARS', response.data);
    },



}
