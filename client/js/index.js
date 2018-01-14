var transTable = new Vue({
    el: '#transactions-records',
    data: {
      transactions: []
    },
    methods: {
        getData: function() {
            var url = "http://localhost:4000/test"
            return fetch(url)
                .then(response => response.json())
                .then(data => this.transactions = data)
                .catch(err => alert(err.message));
        },
    },
});

transTable.getData().then(() => console.log(transTable.transactions)).catch(err => alert(err.message));
