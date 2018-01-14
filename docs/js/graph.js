var hours = []; //x-axis label
for (let i = 0; i < 24; i++) hours.push(i);

var freq = [];

var itemType = "item";
const base_url = "https://nwhacks-transactions.herokuapp.com/testfreq/?item=";

function getFrequency(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => freq = data.map((cntObj) => { return cntObj['count']; }))
        .catch(err => alert(err.message));
}

function drawChart(freq) {
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: hours,
          datasets: [{
              label: itemType,
              data: freq,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
  return myChart;
}

var myChart;
getFrequency(base_url + itemType)
  .then(() => {
    myChart = drawChart(freq);
    //console.log(freq);
  })
  .catch(err => alert(err.message));

var selectTypes = new Vue({
  el: "#select_types",
  data: {
  },
  methods: {
    updateType() {
      console.log(this.$el.value);
      let newType = this.$el.value;
      getFrequency(base_url + newType)
        .then(() => {
          console.log(freq);
          myChart.data.datasets[0].data = freq;
          myChart.update();
        })
        .catch(err => alert(err.message));
    },
  },
});
