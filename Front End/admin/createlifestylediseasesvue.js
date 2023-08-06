const url = "http://localhost:3000/api/createlife_style_diseases";
const { createApp } = Vue
      
createApp({    
  data() {
    return {
        common_name:'',
        sc_name:'',
       
        description:'',
       
        result:''
    }
},
    
    
    
        computed: {
        },
        created() {
     
        },
        mounted() {
     
        },
        beforeDestroy() {
     
        },


 methods: {
     submitForm(){
     var tempJson = {common_name: this.common_name,sc_name: this.sc_name,  description: this.description};
     console.log("tempJson====",tempJson);
     
     let headers = {
        "Content-Type": "application/json",
      };
     
     
      var apiUrl = url;
     
      axios
        .post(apiUrl, tempJson, {
          headers: headers,
        })
        .then((response) => {
     
     console.log(response);
     this.result = response.data
     this.common_name=""
     this.sc_name=""
    
  
     
     this.description=""
     
     


     
        })
        .catch((error) => {
          console.log(error);
        });
        }
     }
    
        
  
  
}).mount('#app')