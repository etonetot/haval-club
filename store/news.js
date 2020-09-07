import axios from 'axios';
import config from '@/config.js';



export const state = () => ({
    carnews: [],
    allnews: [],
    newsitem: 0,
});


export const mutations = {
    SET_NEWS : (state, {data}) => {
      //console.log("SET_DOCS", docs.length, chapters.length);
      state.carnews = data;
    },

    SET_ALLNEWS : (state, {data}) => {
      //console.log("SET_DOCS", docs.length, chapters.length);
      state.allnews = data;
    },

    SET_NEWSITEM : (state, {data}) => {
      data.content = data.content.replace(/\n/g, "<br />");
      data.content = data.content.replace(/http:\/\/chinamobil.ru\/great-wall\/haval/g, "");
      state.newsitem = data;
    },

};


export const actions = {
    async LOAD_NEWS ({ state, commit, rootState }, _car) {
      const response = await axios.get(config.httpserver + config.apivendor + _car + '/getnews')
      commit('SET_NEWS', response);
        //console.log("STORE DOC loaded "+rootState.curCar+' ' + data.rows.length + ' ' + root.children.length);
    },

    async LOAD_ALLNEWS ({ state, commit, rootState }) {
      const response = await axios.get(config.httpserver + config.apivendor + 'getnews')
      commit('SET_ALLNEWS', response);
    },

    async LOAD_NEWSITEM ({commit}, _id) {
      const response = await axios.get(`${config.httpserver}getnewsitem/?newsid=${_id}`)
      commit('SET_NEWSITEM', response);
    },
  


};
