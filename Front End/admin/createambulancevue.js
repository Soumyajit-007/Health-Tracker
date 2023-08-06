const url = "http://localhost:3000/api/createambulance";
const { createApp } = Vue
      
createApp({    
  data() {
    return {
        Vnumber:'',
        type:'',
        owner:'',
        address:'',
        lat:'',
        lng:'',
        owner_phone:'',
        hourly_rate:'',
        
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
     var tempJson = {Vnumber: this.Vnumber,type: this.type, owner: this.owner, address: this.address, lat: this.lat, lng: this.lng, owner_phone: this.owner_phone,  hourly_rate: this.hourly_rate};
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
     this.Vnumber=""
     this.type=""
     this.owner=""
     this.address=""
     this.lat=""
     this.lng=""
     this.owner_phone=""
     this.hourly_rate=""
     


     
        })
        .catch((error) => {
          console.log(error);
        });
        }
     }
    
        
  
  
}).mount('#app')