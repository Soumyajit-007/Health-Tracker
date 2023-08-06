const url = "http://localhost:3000/api/patientlogin";
const { createApp } = Vue
      
createApp({    
  data() {
    return {
        
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
     var tempJson = { email: this.email,  password: this.password};
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
     this.result = response.data;
     if(response.data.code==1){
     localStorage.setItem('userid', response.data.id);
     localStorage.setItem('email',response.data.email);
     localStorage.setItem('name',response.data.name);

     window.location.href="home.html";
     
    }

     
        })
        .catch((error) => {
          console.log(error);
        });
        }
     }
    
        
  
  
}).mount('#app')