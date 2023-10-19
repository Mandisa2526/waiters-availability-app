export default function waiterAvailabilityApp(waiterObject,database) {
   //get route
    async function pageLoad(req, res) {
        res.render('home',{
          errorMsg: waiterObject.getError(),
        });
    };

   //post to the page
    async function add(req, res) {
        let name =  req.body.name;
        waiterAvailabilityApp.setError(name);
        
        res.redirect('/');
    };

    return {
        pageLoad,
        add,
    }
}