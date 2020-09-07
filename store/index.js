import axios from 'axios';
import config from '@/config.js';


export const state = () => ({
  curCar: "",
  curCarData: {},
  rate: {},
  
  loading: false,
  neterror: false,
  errorText:'',
})



export const getters = {
}


export const mutations = {

  changeCar: function(state, newCar) {
    if (state.curCar == newCar) {
      return;
    }
    //console.log("changeCar");
    state.curCar = newCar;
    
    if (state.cars.cars.length && newCar)
    {
      let carData = state.cars.cars.find( item => {
          return item.hrefCar==state.curCar 
      });
      this.commit('SET_CARDATA', carData);
    }
  
    this.commit('SET_PHOTOS', []);
    this.commit('SET_VIDEO', []);
    this.commit('SET_SALES', []);
    this.commit('SET_DOCS', {docs:[], chapters:[]});
    this.commit('SET_PROPS', {rows:[], cols:[]});
    if (state.curCar)
      this.dispatch('LOAD_CARDATA');
  },

  SET_CARDATA: function(state, {data}) {
    data.review = data.review ? data.review.replace(/\/great-wall/g, "") : "";

    state.curCarData = data;
    if ( state.curCarData==undefined )
      this.commit('ERROR_INTERNAL', "car not found");
  },

  SET_RATE: function(state, rate) {
    state.rate = rate;
  },
  SET_CAR: function(state, car) {
    state.curCar = car;
  },


  START_LOADING: (state) => {
    state.loading = true;
  },

  ERROR_LOADING: (state, error) => {
    state.loading = false;
    state.neterror = true;
    state.errorText = error;
  },

  END_LOADING: (state) => {
    state.loading = false;
  },

  ERROR_INTERNAL: (state, error) => {
    state.neterror = true;
    state.errorText = error;
  },

  ERROR_SHOWED: (state) =>{
    state.neterror = false;
  },


}




export const actions = {

  async LOAD_CARDATA ({ state, commit, rootState }, _car) {
    const response = await axios.get(config.httpserver + config.apivendor + _car + '/getcardata')
    commit('SET_CAR', _car);
    commit('SET_CARDATA', response);

  },

  LOAD_RATE ({ state, commit, rootState }) {
    axios.get(config.httpserver + 'getrate')
    .then(response => {
      commit('SET_RATE', response.data);
    })
    .catch(error => {
      console.log("ERROR", error, config.httpserver + 'getrate');
    });
  },



}
