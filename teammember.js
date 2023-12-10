class Team_Member {
    constructor(member){
        this.name = member.name
        this.role = member.role
        this.jobLocation = member.jobLocation
        this.color
        this.holidays = (month, year) => {
            const url = `https://calendarific.com/api/v2/holidays?&api_key=${API_KEY}&country=${this.jobLocation}&year=${year}&month=${month}&type=national`
            getHolidays(url)
        }
    }

}
async function getHolidays(url) {
    const response = await fetch(url)
    const result = await response.json()
    return result
}