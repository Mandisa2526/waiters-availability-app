
export default function WaitersAvailabilityFactor(query) {
    let userInput = "";
    let errorMessage = "";
    //let letters = /^[A-Za-z]+$/;


    async function addUser(name) {
        if (!name) {
            errorMessage = "Please check the instructions above!";
        }else {
            errorMessage = undefined;
        }
        if (!errorMessage) {
            errorMessage = await query.addWaiter(name);
        }
    }

    async function saveDays(name, days) {
        query.saveDays(name, days)
    }

    function getUser(){
        return userInput
    }
   
    function getError(){
        return errorMessage;
    }

    return {
        getError,
        addUser,
        getUser,
        saveDays
        
    }
}