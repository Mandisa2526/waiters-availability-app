export default function WaiterAvailabilityAppRoutes(waiterObject){
   //get route
    async function pageLoad(req, res) {
        res.render('home')
    };
    async function getDays(req, res) {
        //Show your sister which days waiters are available
        let day = await query.selectDaysAndUser();
        console.log(day);
      
        res.render('waitersAvail', {
          // variables to be passed to handlebars
          days: day,
          //errorMsg: waiterObject.getError(),
        });
    }

    async function showD(req, res) {
        //Show your sister which days waiters are available
        let result =  waiterObject.adminLogIn(req.body.uname, req.body.psw);
        if (!result) {
          req.flash('error','Only for Admin Login!')
          res.render('home')
        } else {
          req.flash('success','You have successfully logged in.')
          //   return await query.selectDaysAndUser();
          let days = await waiterObject.getDaysAndUser();
          console.log(days);
          res.render('waitersAvail',{
            days
          });

        }
        
    };
   //post to the page
    async function add(req, res) {
        res.redirect('/');
    };
   //get
    async function saveUser(req, res) {
        //Show waiters a screen where they can select the days they can work
        await waiterObject.addUser(req.params.username); 

        res.render('selectDays', {
            name: req.params.username,
        });
    }
    //posts
    async function saveDays(req, res) {
        await waiterObject.saveDays(req.params.username, req.body.days);
        if(waiterObject.addUser(req.params.username) == ''){
            req.flash('Please check the instructions above!')
            res.redirect('/')
        }
        res.render('selectDays', {
            name: req.params.username,
        });
    }

    return {
        saveUser,
        pageLoad,
        add,
        saveDays,
        getDays,
        showD
    }
}