export default function waiterAvailabilityApp() {
   //get route
    async function pageLoad(req, res) {
        res.render('home');
    };

   //post to the page
    async function add(req, res) {
        res.redirect('/');
    };

    return {
        pageLoad,
        add
    }
}