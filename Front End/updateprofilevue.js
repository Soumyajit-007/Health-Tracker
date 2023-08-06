const url = "http://localhost:3000/api/updatepatients";
const url2 = "http://localhost:3000/api/readonepatient?id="
const { createApp } = Vue
      
createApp({    
  data() {
    id: null 
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
          const urlParams = new URLSearchParams(window.location.search)
          this.id = urlParams.get('id')
    
            axios.get(url2+this.id).then(response => {
                this.name = response.data.name
                this.email = response.data.email
                this.phone = response.data.phone
                this.address = response.data.address
                this.lat = response.data.lat
                this.lng = response.data.lng
                this.dob = response.data.dob
                this.gender = response.data.gender
                this.password = response.data.password

            })
        },
        beforeDestroy() {
     
        },


 methods: {
     submitForm(){
     var tempJson = {id: this.id,name: this.name,email: this.email, phone: this.phone, address: this.address, lat: this.lat, lng: this.lng, gender: this.gender,  password: this.password, dob: this.dob};
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