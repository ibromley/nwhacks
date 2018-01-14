

var suggestion = new Vue({
    el: '#recco_form',
    data: {
       valid: false,
       name: "",
       lat: 0,
       lon: 0
    },
    methods: {
        getData: function(url) {
            var url = `https://nwhacks-transactions.herokuapp.com/testrecco?name=${this.name}&lat=${this.lat}&lon=${this.lon}`;
            return fetch(url)
                .then(response => response.json())
                .then(data => this.transactions = data)
                .catch(err => alert(err.message));
        },
        updatevalidity: function() {
            
        }
    },
});

var cards = new Vue({
    el: "#item-cards",
    data: {},
    methods: {}
});
