import { query } from "express";

export default function WaiterAvailabilityAppRoutes(waiterObject) {
   //get route
    async function pageLoad(req, res) {
        res.render('home')
    };

   //post to the page
    async function add(req, res) {
        res.redirect('/');
    };

    async function saveUser(req, res) {
        //Show waiters a screen where they can select the days they can work
        await waiterObject.addUser(req.params.username);  
        res.render('selectDays', {
            name: req.params.username,
        });
    }

    async function saveDays(req, res) {
        await waiterObject.saveDays(req.params.username, req.body.days);
        res.render('selectDays', {
            name: req.params.username,
        });
    }

    return {
        saveUser,
        pageLoad,
        add,
        saveDays,
    }
}