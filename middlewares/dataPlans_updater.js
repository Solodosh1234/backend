const planStore = require('../dataList_store.js');
const axios = require('axios')
require('dotenv').config()
const ebill_baseurl = process.env.EBILL_BASEURL

let expiryTime = null

const getPlan= async ()=>{
  try {
     await planStore.set('dataPlans',{})
     
     axios.get(`${ebill_baseurl}/api/v2/variations/data`).then( async (result)=>{
    const data = result.data.data
    
    const mtndatas = data.filter(mtndata=>(mtndata.service_id == 'mtn'))
    const glodatas = data.filter(glodata=>(glodata.service_id == 'glo'))
    const airteldatas = data.filter(airteldata=>(airteldata.service_id== 'airtel'))
    const ninedatas = data.filter(ninedata=>(ninedata.service_id == '9mobile'))
    
    
    const available_mtn_plan = mtndatas.filter(mtnPlan=>mtnPlan.availability =='Available')
    const avaliable_glo_plan = glodatas.filter(gloPlan=>gloPlan.availability =='Available')
    const available_airtel_plan = airteldatas.filter(airtelPlan=>airtelPlan.availability =='Available')
    const available_nine_plan = ninedatas.filter(nine_mobile=>nine_mobile.availability =='Available')
    
    
    await planStore.update('dataPlans','mtn',available_mtn_plan)
    await planStore.update('dataPlans','glo',avaliable_glo_plan  )
    await planStore.update('dataPlans','airtel',available_airtel_plan)
    await planStore.update('dataPlans','nineMobile',available_nine_plan)
    
    return expiryTime = Date.now() + 3600 *1000
    
  })
  } catch (err) {
    console.error('Error:', err);
    
  }
 
}

const renew = function(){ 
  setInterval(async () => {
  await getPlan()
}, 1000 * 7000)
}

renew()

const updater = async (req,res,next)=>{
    try {
    if (!expiryTime || expiryTime - Date.now() < 10 * 60 * 1000) {
      await getPlan();
      return next()
    }
    next();
  } catch (err) {
    res.status(500).json({'error':err})
    console.error('Error:', err);
  }
}

module.exports = {updater,getPlan}