<template>
    <DisplayClass class_name="Category" 
    :key="displayClassKey" 
    @edit-item="editItem" 
    :editable="true"
    @delete-item="deleteItem"
    :deletable="true"
    />
    <!-- botao de nova atividade -->
    <button v-if="!showEditActivity && !showNewActivity" type="submit" @click="newActivity">Nova Categoria</button>
    <div v-show="showNewActivity || showEditActivity ">
      <h2>{{ formMode }}</h2>
      <form @submit.prevent="handleSubmit">
        <label for="name">Nome:</label><input type="text" id="name" v-model="formData.name" required>
        <br>
        <label for="price">Pagamento: </label> <input type="number" id="price" v-model="formData.price" step="0.01" required class="no-spin">
        <br>
        <button type="submit" id="send_form">Enviar</button>
        <button @click.prevent="cancelSubmission">Cancelar</button>
        <!-- <div v-for="(value, key) in formData" :key="key">
          - {{ key }}: {{ value }}
        </div> -->
    </form>
  </div>
  <div ref="pageBottomDiv"></div>
</template>
  
  <script setup>
  import DisplayClass from '../components/DisplayClass.vue';
  import { ref, onMounted, computed, reactive } from 'vue';
  import { getClass, getClassAndFormat, postData, getItemFromId } from '../dbInterface';
  
  // Definindo o estado do formulário
  const formData = ref({
    name: '',
    price: 0.0,
  });
  const pageBottomDiv = ref(null);
  const displayClassKey = ref(0);
  const formMode = ref('')
  const showEditActivity = ref(false)
  const showNewActivity = ref(false)
  
  const handleSubmit = () => {
    const data_type = showEditActivity.value? "edition" : "new_entry"
    const data = {type: data_type, value: formData.value}
    postData('add_category/', data, (response) => {
      if (response.data.success){
        displayClassKey.value += 1
        showNewActivity.value = false 
        showEditActivity.value = false
      }
      else {
        alert(response.data.error_msg)
      }
    })
  };
  
  const cancelSubmission = () => {
    if(!confirm("Clique 'Ok' para confirmar ação.")) return
    showNewActivity.value = false 
    showEditActivity.value = false
  }
  
  const newActivity = () => {
    formData.value = {
      name: '',
      price: 0.0,
    }
    formMode.value = "Nova Categoria"
    showEditActivity.value = false
    showNewActivity.value = true
  }
  
  const deleteItem = (itemId) => {
  if(showNewActivity.value || showEditActivity.value) {
    alert("Há uma operação em andamento. Cancele-a para continuar.")
    return
  }
  console.log("deletar item " + itemId )
  if(!confirm("Deseja deletar item?")) return
  postData('delete_entry/', {_id: itemId}, (response) => {
    if (response.data.success){
      displayClassKey.value += 1
    }
    else {
      alert(response.data.error_msg)
    }
    console.log(response)
  })
  }
  
  const editItem = (item_id) => {
    // habilitar formulario de edição
    showEditActivity.value = true
    showNewActivity.value = false
    formMode.value = "Edição de Categoria"
    getItemFromId(item_id, (response) => {
      const item = response.data;
      
      formData.value = {
        _id: item._id.split("'")[1],
        name: item.name,
        price: item.price,
      };  
      pageBottomDiv.value.scrollIntoView({ behavior: 'smooth' });    
    });
  };
  
  </script>
  
  <style scoped>
  form, h2 {
    text-align: left;
  }
  
  </style>