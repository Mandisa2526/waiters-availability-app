
export default function WaitersAvailabilityFactor(query) {
    let userInput = "";
    let errorMessage = "";
    

    function adminLogIn(uname,psw){
        return (uname === "uname_admin" && psw === "pswd28") 
    }   
    async function addUser(name) {
        if (!errorMessage) {
            errorMessage = await query.addWaiter(name);
        }
    }

    async function saveDays(name, days) {
        query.saveDays(name, days)
    }
    async function getWeekDays(weekDays){
        let days = weekDays.map(weekDay => `'${weekDay}'`)
        .reduce((weekDay1, weekDay2) => `${weekDay1},  ${weekDay2}`)
        
        return days
    }
    async function getDaysAndUser() {
        let days = await query.selectDaysAndUser();
        let results  = {        };
        days.forEach(element => {
            if (!results[element.username]) {
                results[element.username] = {};
            }
            results[element.username][element.week_day] = true;
        });
        console.log(results);
        return results;
    }

    function getUser() {
        return userInput
    }

    function getError() {
        return errorMessage;
    }

    return {    
        getError,
        addUser,
        getUser,
        saveDays,
        adminLogIn,
        getDaysAndUser,
        getWeekDays

    }
}