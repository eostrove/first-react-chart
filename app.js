//import DataFrame from 'pandas-js';
//import Chart from "chart.js/auto"

// SWITCH STUFF HERE //
//var employeeLabel = [], employeeSalaryData = [], employeeAgeData = []
var dateData = [], appointmentData = [], doctorData = []
// , nurseData = [], maintenanceData = []

async function dummyChart() {
  await getDummyData()

const ctx = document.getElementById('myChart').getContext('2d');

const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: employeeLabel,
        datasets: [{
            label: 'Employee Salary',
            backgroundColor: 'blue',
            borderColor: 'rgb(255, 99, 132)',
            data: employeeSalaryData
        },
        {
          label: 'Employee Age',
          backgroundColor: 'pink',
          borderColor: 'rgb(255, 99, 132)',
          data: employeeAgeData
        }
      ]
    },

    // Configuration options go here
    options: {
      tooltips: {
        mode: 'index'
      }
    }
})}



async function dummyChart2() {
  await getPatientTrafficData()

const ctx = document.getElementById('myChart').getContext('2d');



const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: dateData,
        datasets: [{
            label: 'Daily appointments',
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.05,
            data: appointmentData,
        },
        {
          label: 'Number doctors',
          fill: false,
          backgroundColor: 'rgb(255, 204, 153)',
          borderColor: 'rgb(255, 204, 153)',
          tension: 0.05,
          data: doctorData,
      },
      ]
    },

    // Configuration options go here
    options: {
      curve: false,
      responsive: true,
      legend: {
        position: 'bottom',
      },
      scales: {
          yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Number of appointments',
              },
              ticks: {
                  beginAtZero: true,
                  steps: 5,
                  stepValue: 2,
              }
          }],
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Date',
            },
            ticks: {
                beginAtZero: true,
                steps: 5,
                stepValue: 2,
            }
        }]
      }
  }
})

console.log("chartdate: ", dateData)
console.log("patient: ", appointmentData)
}



//Fetch Data from API

async function getDummyData() {
  const apiUrl = "http://dummy.restapiexample.com/api/v1/employees"

  const response = await fetch(apiUrl)
  const barChatData = await response.json()
  console.log("Chart data: ", barChatData);
  
  const salary = barChatData.data.map((x) => x.employee_salary)
  console.log("salary: ", salary)
  const age = barChatData.data.map((x) => x.employee_age)
  const name = barChatData.data.map((x) => x.employee_name)

 employeeSalaryData = salary
 employeeAgeData = age
 employeeLabel = name
}

async function getPatientTrafficData() {

  // const getRoomData = async () => {
    const response = await fetch("http://localhost:8020/account/users/1");
    const data = await response.json()

    const roomResponse = await fetch(`http://localhost:8020/internal/urgentcare/${data.pk}/rooms/`);
    const roomData = await roomResponse.json();

    const date = roomData.map((x) => x.date)
    const list_of_tuples = roomData.map((x) => ({
          date: x.date,
          doctor: x.doctor
        }));
    // another way to use a map function
    // const list_of_tuples = roomData.map(function(item) {
    //   return {
    //     date: item.date,
    //     doctor: item.doctor,
    //     patient: item.patientVO,
    //   };
    // });

    // store number of appointments/day in object d
    let d = {}
    for (let i in list_of_tuples) {
      let item = list_of_tuples[i]
      const itemdate = item.date
      if (itemdate in d) {
         d[itemdate] += 1
      } else {
        d[itemdate] = 1
      }
    }

    // store number of unique doctor pks/day in object p
    let p = {}
    for (let i in list_of_tuples) {
      let item = list_of_tuples[i];
      if (item.date in p) {
        p[item.date].add(item.doctor);
      } else {
        p[item.date] = new Set([item.doctor]);
      }
    }
    

    // convert d object to a list and save date and appointment count as 2 different constants
    const d_list = Object.entries(d);
    d_list.sort(function(a,b){return a[0].localeCompare(b[0])});
    const chartDate = d_list.map((x) => x[0])
    const numberAppointments = d_list.map((x) => x[1])


    // convert p object to a list and save doctor count as a constant
    const doctorCount = Object.entries(p)
    doctorCount.sort(function(a,b){return a[0].localeCompare(b[0])});
    // commenting out saving date for doctor
    // const doctor_labels = doctorCount.map((x) => x[0])
    // console.log("doctor_labels: ", doctor_labels);
    const unqiueDailyDoctors = doctorCount.map((x) => (x[1].size))

    // save constants to vars for chart
    dateData = chartDate;
    appointmentData = numberAppointments;
    doctorData = unqiueDailyDoctors;
}


// SWITCH STUFF HERE //
//dummyChart()
dummyChart2();