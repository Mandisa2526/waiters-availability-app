export default function WaitersAvailabilityFactory() {
    let userInput = "";
    let errorMessage = "";
    let letters = /^[A-Za-z]+$/;

    function setError(name) {
        if (!name) {
            errorMessage = "Please check the instructions";
        }else {
            errorMessage = undefined;
        }
    }

    function setUserName(name) {
        if (name && name.match(letters)) {
            userInput = name;
        } else {
            userInput = undefined
        }

    }
    function getError(){
        return errorMessage;
    }

    function getUsername() {
        if (userInput) {
            return `${userInput}`;
        }
    }


    return {
        getError,
        setError,
        getUsername,
        setUserName,
        
    }
}