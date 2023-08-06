const url = "http://localhost:3000/api/registerpatient";
const { createApp } = Vue
      
createApp({    
  data() {
    return {
        name:'',
        email:'',
        password:'',
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
     var tempJson = {name: this.name, email: this.email,  password: this.password};
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
     this.name=""
     this.email=""
     this.password=""
     


     
        })
        .catch((error) => {
          console.log(error);
        });
        }
     }
    
        
  
  
}).mount('#app')