const url = "http://localhost:3000/api/readpatientv2";
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