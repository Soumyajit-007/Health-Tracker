const url = "http://localhost:3000/api/createpatient_life_style_diseases";
const url2 = "http://localhost:3000/api/readlife_style_diseasesv2";
const { createApp } = Vue
      
createApp({    
  data() {
    return {
        options:[],
        patient_id:'',
        life_style_diseases_id:'',
        duration:'',
        result:''
    }
},
    
    
    
        computed: {
        },
        created() {
     
        },
        mounted() {
            axios.get(url2).then(response => {
                this.options = response.data
            })
        },
        beforeDestroy() {
     
        },


 methods: {
     submitForm(){
     this.patient_id = localStorage.getItem('userid')
     var tempJson = {patient_id: this.patient_id, life_style_diseases_id: this.life_style_diseases_id,  duration: this.duration};
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
     this.patient_id=""
     this.life_style_diseases_id=""
     this.duration=""
     


     
        })
        .catch((error) => {
          console.log(error);
        });
        }
     }
    
        
  
  
}).mount('#app')