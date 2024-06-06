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

export const postData = (url, data, onResponse) => {
  axios.post(URL_BASE + url, data)
          .then(response => {
            onResponse(response)
            })
          .catch(error => {
            console.error('Erro ao enviar mensagem ao servidor:', error);
          });
        }

export const getItemFromId = (item_id, onResponse) => {
  console.log("sending request for item")
  axios
  .get(`${URL_BASE}get_item_from_id/`, {
    params: {
      _id: item_id
    }
  })
  .then(response => {
    onResponse(response)
  })
  .catch(error => {
    console.error('Erro ao fazer a requisição:', error)
  })
}