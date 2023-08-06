const url = "http://localhost:3000/api/readambulancev2";
const { createApp } = Vue
      
createApp({    
  data() {
    return {
       
        results:[]
    }
},
    mounted() {
        axios.get(url).then(response => {
            this.results = response.data
        })
    }
          
        
  
  
}).mount('#app')