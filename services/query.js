export default function Query(db) {
    
    async function insertUserName(name) {
        
        await db.none(`insert into waiter(username) values(${name});`);
    }
    async function insertDay() {
        await db.none(`insert into waiter_week_day(waiter_id, week_day_id) values(1, 1)`);
    }


    return {
        insertUserName,
        insertDay
        
    }
}