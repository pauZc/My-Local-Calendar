let TEAM = new Array()
const form = document.getElementById('Team-form')
const teamPlayer = document.getElementById('teamPlayer')
const role = document.getElementById('role')
const jobLocation = document.getElementById('jobLocation')
const color = document.getElementById('color')

const month = document.getElementById('month')
const year = 2024

document.addEventListener("DOMContentLoaded", function(event) {
    const monthInfo = getMonthInfo(new Date())
    printTable(monthInfo)
})

form.addEventListener('submit', (e) =>{
    const monthNo = month.value
    const member = new Team_Member()
    member.name = teamPlayer.value.trim()
    member.jobLocation = jobLocation.value
    member.role = role.value
    member.color = color.value
    member.holidays(monthNo, year)

    TEAM.push(member)

})

function printTable(monthInfo){
    const tbody = $('tbody')
    let content = '<tr>'
        for (let i = 0; i < monthInfo.monthDates.length; i++) {
            const day = monthInfo.monthDates[i]
            if(day.getDay() == 0){//Sunday
                content +='<tr>'
            }
            //first day of the month
            if( day == monthInfo.monthDates[0] ){
                for (let index = 0; index < day.getDay(); index++) {
                    content += '<td></td>'
                }
            }
                content += `<td>
                                <label class="dayNo">${day.getDate()}</label>
                            </td>`
                            // <div class="holiday green"><label>Holiday: New Year</label></div>
            
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

// const handleMonth = (date) => {
// }
// month.addEventListener('change', () => handleMonth(this.value))


