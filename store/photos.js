import axios from 'axios';
import config from '@/config.js';


export const state = () => ({
    photos:[],
})
  

export const getters = {
    GET_CURFOLDERTITLE: state => curFolder => {
      return state.photos.length ? state.photos[curFolder].title  : '--';
    },
};



export const mutations = {
    SET_PHOTOS : (state, {data}) => {
      state.photos = data.photos;
      //console.log("SET_PHOTOS", state.photos.length);
    },

};

export const actions = {
    async LOAD_PHOTOS ( { state, commit, rootState }, _car ) {
        //console.log(config.httpserver + config.apivendor + _car + '/getphotos');
        const response = await axios.get(config.httpserver + config.apivendor + _car + '/getphotos');
        commit('SET_PHOTOS', response);
    },

};


