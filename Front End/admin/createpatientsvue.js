const url = "http://localhost:3000/api/createpatient";
const { createApp } = Vue
      
createApp({    
  data() {
    return {
        name:'',
        email:'',
        phone:'',
        address:'',
        lat:'',
        lng:'',
        dob:'',
        gender:'',
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
     var tempJson = {name: this.name,email: this.email, phone: this.phone, address: this.address, lat: this.lat, lng: this.lng, gender: this.gender,  password: this.password, dob: this.dob};
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
     this.phone=""
     this.address=""
     this.lat=""
     this.lng=""
     this.gender=""
     this.password=""
     this.dob=""


     
        })
        .catch((error) => {
          console.log(error);
        });
        }
     }
    
        
  
  
}).mount('#app')