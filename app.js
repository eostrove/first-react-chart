//import DataFrame from 'pandas-js';


// SWITCH STUFF HERE //
//var employeeLabel = [], employeeSalaryData = [], employeeAgeData = []
var dateData = [], doctorData = []
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
    type: 'bar',

    // The data for our dataset
    data: {
        labels: dateData,
        datasets: [{
            label: 'Patient',
            backgroundColor: 'blue',
            borderColor: 'rgb(255, 99, 132)',
            data: doctorData
        },
      ]
    },

    // Configuration options go here
    options: {
      tooltips: {
        mode: 'index'
      }
    }
})

console.log("chartdate: ", dateData)
console.log("patient: ", doctorData)
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
  //const [room, setRoom] = useState([])

  // const getRoomData = async () => {
    const response = await fetch("http://localhost:8020/account/users/1");
    const data = await response.json()
    console.log(data);

    const roomResponse = await fetch(`http://localhost:8020/internal/urgentcare/${data.pk}/rooms/`);
    const roomData = await roomResponse.json();
    console.log("room data: ", roomData);
    //setRoom(roomData)

    const date = roomData.map((x) => x.date)
    // const list_of_tuples = roomData.map((x) => ({
    //       date: x.date,
    //       doctor: x.doctor
    //     }));
    const list_of_tuples = roomData.map(function(item) {
      return {
        date: item.date,
        doctor: item.doctor
      };
    });
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
    const d_list = Object.entries(d);
    console.log("DA LIST: ", d_list);
    d_list.sort(function(a,b){return a[0].localeCompare(b[0])});
    //console.log("LIST AGAIN: ", test);
    const chartdate = d_list.map((x) => x[0])
    const chartpatients = d_list.map((x) => x[1])


    console.log("wtf is d: ", d)
    console.log("date: ", date);
    //const doctor = roomData.map((x) => x.doctor)
    //console.log("doctor: ", doctor);
    dateData = chartdate;
    doctorData = chartpatients;
    console.log("chartdate: ", dateData)
    console.log("patient: ", doctorData)
  // }
  // getRoomData();
}


// SWITCH STUFF HERE //
//dummyChart()
dummyChart2();