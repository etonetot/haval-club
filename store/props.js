import axios from 'axios';
import config from '@/config.js';


export const state = () => ({
  rows: [],
  cols: [],
})




export const mutations = {
  SET_PROPS : (state, {data}) => {

      let cols = [{
        key: 'text',
        width: 250,
        fixed: 'left',
        type: 'html',
      }];

      for (let i=0 ; i<data.varcount && i<20; i++)
            cols.push({
                key: 'text'+i,
                width: 150,
                type: 'html'
            });

      //console.log("SET_PROPS", data.rows.length, cols.length);

      state.rows = data.rows;
      state.cols = cols;
    },

}

export const actions = {
    async LOAD_PROPS ( { state, commit, rootState }, p  ) {
        //console.log(config.httpserver + config.apivendor + p._car + '/getprops', p);
        const response = await axios.get(config.httpserver + config.apivendor + p._car + '/getprops', { params: {year: p.year}} );
        commit('SET_PROPS', response);
    },

}


