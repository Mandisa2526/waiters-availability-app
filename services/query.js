export default function Query(db){
async function insertUserName(name){
   // let days = await getDaysId();
   //${days.weekdays_id}
    await db.none(`INSERT INTO waiters(username) VALUES (1,'${name}`);
}

// function getDaysId(name) {        
//     let DaysCode = name.substring(0,2);
//     return db.oneOrNone(`SELECT weekdays_id FROM weekDays WHERE week_days = '${DaysCode}'`);
// }
    
    

    return{
       insertUserName, 
    }
}