import Vue from 'vue'
import moment from 'moment'



Vue.filter('dateFormat', function (value) { 
  if (!value) return '';
  return moment(String(value)).format('DD.MM.YYYY');
});


Vue.filter('currency', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.');
});

Vue.filter('volume', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
});


