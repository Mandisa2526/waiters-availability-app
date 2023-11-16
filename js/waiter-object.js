
export default function WaitersAvailabilityFactor(query) {
    let errorMessage = "";
    let successMessage ='';
    

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
    async function deleteAllWaiters(){
        query.deleteAllWaiters;
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

    function getUser(username) {
        return query.getWaitersId(username);
    }

    function getError() {
        return errorMessage;
    }
    function reset(){
        successMessage = 'Successfully Cleared';
        errorMessage;
    }

    return {  
        reset,  
        getError,
        addUser,
        getUser,
        saveDays,
        adminLogIn,
        getDaysAndUser,
        deleteAllWaiters

    }
}