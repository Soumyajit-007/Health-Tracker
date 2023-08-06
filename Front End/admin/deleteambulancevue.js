const url = "http://localhost:3000/api/deleteambulance?id=";

const { createApp } = Vue

createApp({
	
 
    data() {

id: null

        return {
		
       result :{}
        }
    },
    mounted() {

	const urlParams = new URLSearchParams(window.location.search)
    	this.id = urlParams.get('id')

        axios.delete(url+this.id).then(response => {
            this.result = response.data
        })
    }

}).mount('#app')