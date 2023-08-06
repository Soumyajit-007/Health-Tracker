const url = "http://localhost:3000/api/createclinics";
const { createApp } = Vue
      
createApp({    
  data() {
    return {
        name:'',
        owner_name:'',
        phone:'',
        email:'',
        address:'',
        lat:'',
        lng:'',
        doe:'',
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
     var tempJson = {name: this.name, owner_name: this.owner_name,  phone: this.phone, email: this.email, address: this.address, lat: this.lat, lng: this.lng, doe: this.doe, description: this.description};
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
     this.owner_name=""
     this.phone=""
     this.email=""
     this.address=""
     this.lat=""
     this.lng=""
     this.doe=""
     this.description=""
    
     


     
        })
        .catch((error) => {
          console.log(error);
        });
        }
     }
    
        
  
  
}).mount('#app')