import axios from 'axios';
import config from '@/config.js';


export const state = () => ({
  chapters: [],
  docs: [],
  curDoc: [],
});


export const mutations = {
    SET_DOCS : (state, {data}) => {
      let curlevel = 0, root = [], parent = root, cur = 0;
      data.chapters.forEach(item => {
              if (item.level>curlevel)
              {
                parent = cur;
                curlevel = item.level;
              }
              else if (item.level<curlevel)
              {
                curlevel = item.level;
                //parent = cur.parent.parent;
              }
              cur = {title: item.chaptername, name: item.chaptername, /*parent: item.level==0? 0 : parent,*/ id: item.id, checked: true};
              if (!parent.children)
                parent.children = [];
              parent.children.push(cur); 
      });

      state.docs = data.rows;
      state.chapters = root.children;
    },

    DOC_LOADED : (state, {data}) => {
      data.content = data.content.replace(/\n/g, "<br />");
      state.curDoc = data;
    },

  };


  export const actions = {
    async LOAD_DOCS ({ state, commit, rootState }, _car) {
      const response = await axios.get(config.httpserver + config.apivendor + _car + '/getdocs')
      commit('SET_DOCS', response);
    },

    async LOAD_DOC ({commit}, _id) {
      const response = await axios.get(`${config.httpserver}getdoc/?docid=${_id}`);
      commit('DOC_LOADED', response);
    },
  
};


