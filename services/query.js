export default function Query(db) {
    
    async function addWaiter(name) {
        console.log("insert user", name)
        await db.none(`insert into waiter(username) values('${name}');`);
    }
    
    async function saveDays(name, days) {
        console.log("saveDays", name , days)
        let user = await getWaitersId(name);
        let weekDaysId = await getWeekDayId(days)
        let inserts = weekDaysId.map( day => `INSERT INTO waiter_week_day(waiter_id, week_day_id) VALUES (${user.id}, ${day.id});`).reduce((insert1, insert2) => insert1 + insert2);
        await db.none(inserts);
    }

    function getWaitersId(username) {  
        return db.one(`SELECT id FROM waiter WHERE username = '${username}'`);
    }
    function getWeekDayId(weekDays) {
        let days = weekDays.map(weekDay => `'${weekDay}'`)
        .reduce((weekDay1, weekDay2) => `${weekDay1},  ${weekDay2}`)    
        return db.many(`SELECT id FROM week_day WHERE week_day IN (${days}) `);
    }

    return {
        addWaiter,
        saveDays
        
    }
}