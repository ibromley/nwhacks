
new Vue({
    el: '#item-cards',
    data: {
       name: 'Hello Vue.js!'
    },
    methods: {
        getData: function(url) {
            return fetch(url)
                .then(response => response.json())
                .then(data => this.transactions = data)
                .catch(err => alert(err.message));
        },
    },
    beforeMount(){
        this.getData()
     },


transTable.getData("http://localhost:4000/trans");
