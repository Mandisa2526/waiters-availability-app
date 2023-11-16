//import WaitersAvailabilityFactor from "waiter-object.js";
export default function Query(db) {
     
    async function addWaiter(name) {
        console.log("insert user", name)
        await db.none(`insert into waiter(username) values('${name}');`);
    }
    //Join tables
    function selectDaysAndUser() {
      return db.any('SELECT week_day.week_day,waiter.username FROM waiter INNER JOIN waiter_week_day ON waiter_week_day.waiter_id = id INNER JOIN week_day ON week_day.id = waiter_week_day.week_day_id;') 
    } 

    async function saveDays(name, days) {
        console.log("saveDays", name, days)
        let user = await getWaitersId(name);
        let weekDaysId = await getWeekDayId(days)
        let inserts = weekDaysId.map(day => `INSERT INTO waiter_week_day(waiter_id, week_day_id) VALUES (${user.id}, ${day.id});`).reduce((insert1, insert2) => insert1 + insert2);
        await db.none(inserts);
    }

    function getWaitersId(username) {
        return db.oneOrNone(`SELECT id FROM waiter WHERE username = '${username}'`);
    }

    function getWeekDayId(weekDays) {
        console.log("getWeekDayId", weekDays);
        let days = weekDays.map(weekDay => `'${weekDay}'`)
        .reduce((weekDay1, weekDay2) => `${weekDay1},  ${weekDay2}`)
        return db.many(`SELECT id FROM week_day WHERE week_day IN (${days}) `);
    }
    async function deleteAllWaiters(){
        await db.none('DELETE FROM waiter_week_day where 1=1');
        await db.none('DELETE FROM waiter where 1=1');

    }

    return {
        addWaiter,
        saveDays,
        selectDaysAndUser,
        getWaitersId,
        getWeekDayId,
        deleteAllWaiters

    }
}