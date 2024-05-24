import { ref, onMounted } from 'vue';
import axios from 'axios';
import { URL_BASE } from './constants';

export const getClass = (class_name, refVar) => {
  axios
    .get(`${URL_BASE}get_class/`, {
      params: {
        class_name: class_name
      }
    })
    .then(response => {
      refVar.value = response.data
    })
    .catch(error => {
      console.error('Erro ao fazer a requisição:', error)
    })
}

export const getClassAndFormat = (className, refVar, classIdValue) => {
  
  axios
    .get(`${URL_BASE}get_class/`, {
      params: {
        class_name: className
      }
    })
    .then(response => {
      let output = [];
      let i = 0
      let data = response.data
      for (let key in data) {
        output.push({ [classIdValue]: data[key][classIdValue], '_id': key, 'id': i});
        i+=1
      }
      console.log(output)
      refVar.value = output
    })
    .catch(error => {
      console.error('Erro ao fazer a requisição:', error)
    })
}

