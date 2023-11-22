import assert from "assert";
import pgPromise from 'pg-promise';
import Query from '../services/query.js';
import WaitersAvailabilityFactor from "../js/waiter-object.js";

const pgp = pgPromise();

const connectionString = "postgres://rgyjyktk:3gSnt5rJoAo9ktvrpqMENiDvZhGkY1NN@mahmud.db.elephantsql.com/rgyjyktk?ssl=true";
const db = pgp(connectionString);

let query = Query(db);

describe('Waiters Availability App factory function code test', function () {

    it('Should be able to log in admin users only', async function () {
        this.timeout(10000);
        let waiterAppObject = WaitersAvailabilityFactor(query);

        let result = waiterAppObject.adminLogIn("uname_admin","pswd28");

        assert.equal( 1, result);

    });

    it('should be able to add waiters in the URL of the home page', async function () {

        this.timeout(10000);

        let waiterAppObject = WaitersAvailabilityFactor(query);

        await waiterAppObject.addUser("Mpatho");


        assert.equal('Mpatho');

    });

    it("should be able to return error message when the registration number is not entered", async function () {
        let registrationNumberObject = RegistrationNumberFact(query);
        await registrationNumberObject.addRegistration("");
        let results = registrationNumberObject.getError();
        assert.equal( 'Please enter a registration number!', results);
    });

    it("should be able to return error message when the town filtered is not available", async function () {
        this.timeout(10000);
        let registrationNumberObject = RegistrationNumberFact(query);

        await registrationNumberObject.addRegistration("CJ 123456");

        await registrationNumberObject.getRegistrationForTown('CH');

        assert.equal('Town was not added!', registrationNumberObject.getError());

        
    });

    it('should be able to return an error message when the name is max lenght is exceeded ' , async function(){
        let registrationNumberObject = RegistrationNumberFact(query);
        await registrationNumberObject.addRegistration("CJ 123-4561");
        assert.equal('Maximum length exceeded!', registrationNumberObject.getError());     
    });

    it('should be able to return an error message when the name is min lenght is exceeded ' , async function(){
        this.timeout(10000);
        let registrationNumberObject = RegistrationNumberFact(query);

        await registrationNumberObject.addRegistration("CJ 123");

        assert.equal('Minimum length exceeded!', registrationNumberObject.getError());     
    });

    it("should be able to filter for a specific town selected", async function () {
        this.timeout(10000);
        let registrationNumberObject = RegistrationNumberFact(query);

        await registrationNumberObject.addRegistration("CJ 124-455");
        await registrationNumberObject.addRegistration("CA 123-455");
        await registrationNumberObject.addRegistration("CJ 22445");

        let results = await registrationNumberObject.getRegistrationForTown('CJ');

        assert.deepEqual([ 'CJ 124-455', 'CJ 22445' ], results);
    });

    it("should be able to return a success message when the data is cleared", async function () {
        this.timeout(10000);
        let registrationNumberObject = RegistrationNumberFact(query);

        await registrationNumberObject.addRegistration("CJ 123456");
        await registrationNumberObject.addRegistration("CA 123456");

        await registrationNumberObject.reset();

        let result = await registrationNumberObject.getSuccessMessage();

        assert.equal("Successfully Cleared", result);
    });

    after(function () {
        db.$pool.end
    });
});
describe('the Registration Number App database function/Code', function () {

    beforeEach(async function () {
        try {
            this.timeout(10000);
            // clean the tables before each test run
            await db.none("TRUNCATE TABLE week_day RESTART IDENTITY CASCADE;");
            await db.none("INSERT into week_day(id, week_day) values (1,'Monday')");
            await db.none("INSERT into week_day(id, week_day) values (2,'Tuesday')");
            await db.none("INSERT into week_day(id, week_day) values (3,'Wednesday')");
            await db.none("INSERT into week_day(id, week_day) values (4,'Thursday')");
            await db.none("INSERT into week_day(id, week_day) values (5,'Friday')");
            await db.none("INSERT into week_day(id, week_day) values (6,'Saturday')");
            await db.none("INSERT into week_day(id, week_day) values (7,'Sunday')");
    
        } catch (err) {
            console.log(err);
            throw err;
        }
    });

    it("should be able to add waiters name in the url", async function () {
       this.timeout(10000);

       await query.addWaiter("Mandisa");

        // let result = await query.getRegistrations();

        // assert.equal(1, result);
    });
    
    it("should able to add waiters and save waiter's days selected", async function () {
        this.timeout(10000);
        await query.saveDays("Mandisa");
        await query.saveDays("Monday"); 
        await query.saveDays("Tuesday");

        let result = await query.saveDays();

        assert.equal(3, result.length);

    });

    it('should test reset button', async function () {
        this.timeout(10000); // Set a longer timeout for this test
        await query.insertRegNum('CA 466789');
        await query.insertRegNum('CJ 121456');

        // Reset the query 
        await query.deleteAllUsers();

        const result = await query.getRegistrations();
        assert.equal(result.length, 0);
    });


    it("should be able to clear the registration data", async function () {
        this.timeout(10000);
        await query.insertRegNum("CA 123456");
        await query.insertRegNum("CH 123456");
        await query.insertRegNum("CJ 123456");

        await query.deleteAllUsers();

        let result = await query.getRegistrations();

        assert.equal(0, result.length);
    });
    after(function () {
        db.$pool.end
    });
});