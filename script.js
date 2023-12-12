let TEAM = new Array()
let LOCATIONS = new Array()
let CALENDAR = new Array()
const form = document.getElementById('Team-form')
const teamPlayer = document.getElementById('teamPlayer')
const role = document.getElementById('role')
const date = document.getElementById('date')
const color = document.getElementById('color')

const month = document.getElementById('month')
const year = 2024

document.addEventListener("DOMContentLoaded", function(event) {
    const january = new Date('1/1/2024')
   handleMonth()
   
})

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    if(!LOCATIONS.includes(jobLocation.value))
        LOCATIONS.push(jobLocation.value)

    let member = new Team_Member({
            name: teamPlayer.value.trim(),
            jobLocation: jobLocation.value,
            role: role.value,
            color: color.value
        })

    TEAM.push(member)

    // setTimeout(function () {
    //     // Make the square visible and scale it up
    //     cuadrito.style.opacity = '1';
    //     cuadrito.style.transform = 'scale(1)';
    //   }, 1000);
    // });
})

function printTable(monthInfo){
    const tbody = $('tbody')
    let content = '<tr>'
        for (let i = 0; i < monthInfo.monthDates.length; i++) {
            const day = monthInfo.monthDates[i]
            let holiday = undefined
           if(CALENDAR.length > 0){
                 holiday = CALENDAR.find(h => h.toDateString() === day.toDateString())
           }
            if(day.getDay() == 0){//Sunday
                content +='<tr>'
            }
            //first day of the month
            if( day == monthInfo.monthDates[0] ){
                for (let index = 0; index < day.getDay(); index++) {
                    content += '<td></td>'
                }
            }
                content += `<td id="${day.toDateString().replaceAll(' ','')}">
                                <label class="dayNo">${day.getDate()}</label>`
                if(holiday != undefined){
                    content += `<div class="holiday"><label>${holiday.description}</label></div>`
                }
                content += `</td>`
                           
            
                //last day
                if(day == monthInfo.monthDates[monthInfo.monthDates.length-1]){
                    const remainderDays = 6 - day.getDay()
                    for (let index = 0; index < remainderDays; index++) {
                        content += '<td></td>'
                    }
                    content +='</tr>'
                    break;
                }
            
            if(day.getDay() == 6){//Saturday
                content +='</tr>'
            }
        }
    
    tbody.append(content);
    
}

async function getHolidays(month, year){
    try {
        const url = `https://calendarific.com/api/v2/holidays?&api_key=${API_KEY}&country=US&year=${year}&month=${month}&type=national`
        const response = await fetch(url)
        const result = await response.json()
        result.response.holidays.forEach(holiday => {
            const _date =  new Date(`${holiday.date.datetime.month}-${holiday.date.datetime.day}-${holiday.date.datetime.year}`)
            CALENDAR.push({
                date: _date,
                description: holiday.name
            })
            $(`#${_date.toDateString().replaceAll(' ','')}`).append( `<div class="holiday"><label>${holiday.name}</label></div>`)
        })
    } catch (error) {
        console.log(`getHolidays ${error}`)
    }
}

function getMonthInfo(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
  
    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month, 1);
  
    // Get the last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0);
  
    // Calculate the number of weeks in the month
    const numberOfWeeks = Math.ceil((lastDayOfMonth.getDate() + firstDayOfMonth.getDay()) / 7);
  
    // Create an array to store the dates of the month
    const monthDates = [];
  
    // Populate the array with dates of the month
    for (let i = firstDayOfMonth.getDate(); i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(year, month, i);
      monthDates.push(date);
    }
  
    return {
      monthDates,
      numberOfWeeks,
    };
  }
 const handleMonth = () => {
    const monthInfo = getMonthInfo(new Date(`${month.value}-1-${year}`))
    printTable(monthInfo)
    getHolidays(month.value, year)
 }
 $('#month').on('change', () => handleMonth())

