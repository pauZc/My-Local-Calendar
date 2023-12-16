let ACTIVITIES = new Array()
let LOCATIONS = new Array()
let CALENDAR = new Array()
const form = document.getElementById('Form')
const activity = document.getElementById('activity')
const date = document.getElementById('date')
const color = document.getElementById('color')

document.addEventListener("DOMContentLoaded", function(event) {
    const _january = new Date('1/1/2024')
   handleMonth(_january)
   let _activities = localStorage.getItem('activities');
   _activities = JSON.parse(_activities)
    if(_activities!=null && _activities!=undefined){
        _activities.forEach(activity => {
            activity.date = new Date(activity.date)
            DisplayActivity(activity)
        });
    }
    ACTIVITIES = _activities
})
date.addEventListener('change', ()=>{
    const selectedDate = date.valueAsDate
    const duedate = new Date('1-31-2024')
    if(!compareDates(new Date(selectedDate), duedate))
    {
        date.value =''
        alert('Please select a date related of January')
    }
})
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    let newactivity = new Activity({
            name: activity.value,
            date: new Date(date.valueAsDate),
            color: color.value
        })

    ACTIVITIES.push(newactivity)
    localStorage.setItem('activities', JSON.stringify(ACTIVITIES))
    DisplayActivity(newactivity)
})

function DisplayActivity(activity){
    const activityId = activity.date.toDateString().replaceAll(' ','')
    let name = activity.name.replaceAll(' ','')
    name = name.replace(/[^a-zA-Z ]/g, "")
    $(`#${activityId}`).append(`<div id='${name}-${activityId}' class='animated-square'>
                                    <label>${activity.name}</label>
                                </div>`)
    const cuadrito = document.getElementById(`${name}-${activityId}`)
    setTimeout(function () {
        cuadrito.style.background = activity.color
        cuadrito.style.opacity = '1';
        cuadrito.style.transform = 'scale(1)';
      }, 700);
 
  }

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
  
    // Create an array to store the dates of the month
    const monthDates = [];
  
    // Populate the array with dates of the month
    for (let i = firstDayOfMonth.getDate(); i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(year, month, i);
      monthDates.push(date);
    }
  
    return {
      monthDates
    };
  }
 const handleMonth = (date) => {
    const monthInfo = getMonthInfo(date)
    printTable(monthInfo)
    const month = date.getMonth()+1
    getHolidays(month, 2024)
 }

const compareDates = (date, duedate) => {
    if (date > duedate) {
    return false
    } else if (date1 < date2) {
    return true
    } else {
    return false
    }
}