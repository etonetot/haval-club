import axios from 'axios';
import config from '@/config.js';



export const state = () => ({
  sales: [],
});


export const mutations = {
    SET_SALES : (state, {data}) => {
      //console.log("SET_SALES", data);
      state.sales = data;
    },
};

export const actions = {
    async LOAD_SALES ({ state, commit, rootState }, _car) {
      const response = await axios.get(config.httpserver + config.apivendor + _car + '/getsales')
      commit('SET_SALES', response);
    },
};

