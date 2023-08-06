const url = "http://localhost:3000/api/createtests";
const { createApp } = Vue
      
createApp({    
  data() {
    return {
        sc_name:'',
        code:'',
        description:'',
        instructions:'',
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
     var tempJson = {sc_name: this.sc_name, code: this.code, description: this.description,  instructions: this.instructions};
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
     this.sc_name=""
     this.code=""
  
     
     this.description=""
     this.instructions=""
     


     
        })
        .catch((error) => {
          console.log(error);
        });
        }
     }
    
        
  
  
}).mount('#app')