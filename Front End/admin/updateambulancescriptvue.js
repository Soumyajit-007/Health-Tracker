const url = "http://localhost:3000/api/updateambulance";
const url2 = "http://localhost:3000/api/readoneambulance?id="
const { createApp } = Vue
      
createApp({    
  data() {
    id: null 
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
          const urlParams = new URLSearchParams(window.location.search)
          this.id = urlParams.get('id')
    
            axios.get(url2+this.id).then(response => {
                this.Vnumber = response.data.Vnumber
                this.type = response.data.type
                this.owner = response.data.owner
                this.address = response.data.address
                this.lat = response.data.lat
                this.lng = response.data.lng
                this.owner_phone = response.data.owner_phone
                this.hourly_rate = response.data.hourly_rate
                

            })
        },
        beforeDestroy() {
     
        },


 methods: {
     submitForm(){
     var tempJson = {id: this.id,Vnumber: this.Vnumber,type: this.type, owner: this.owner, address: this.address, lat: this.lat, lng: this.lng, owner_phone: this.owner_phone,  hourly_rate: this.hourly_rate};
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