import axios from 'axios';
import config from '@/config.js';


export const state = () => ({
  video:[],
});



export const mutations = {
    SET_VIDEO : (state, {data}) => {
      state.video = data;
    },

};

export const actions = {
    async LOAD_VIDEO ( { state, commit, rootState }, _car ) {
      const response = await axios.get(config.httpserver + config.apivendor + _car + '/getvideo')
      commit('SET_VIDEO', response);
    },

};


