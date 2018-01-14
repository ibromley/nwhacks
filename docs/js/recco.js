var suggestion = new Vue({
    el: '#recco_form',
    data: {
       valid: false,
       name: "",
       lat: 0,
       lon: 0
    },
    methods: {
    },
});

var cards = new Vue({
    el: "#item-cards",
    data: {
      reccoList: []
    },
    methods: {
      updateReccoList: function() {
          var url = `http://localhost:4000/testrecco?name=${this.name}&lat=${this.lat}&lon=${this.lon}`;
          return fetch(url)
              .then(response => response.json())
              .then(data => this.reccoList = data)
              .catch(err => alert(err.message));
      },
    },
});