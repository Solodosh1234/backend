const menu = require('../../menu.js');
const NigeriaPhone = require('validate_nigerian_phone')
const planStore = require('../../../dataList_store.js')
const userSession = require('../../../session_store.js')
const user =require('../../../models/user.js')

const PlansPerPage = 5

function getPaginatedPlan(plans=[],page) {
  if (!Array.isArray(plans)) {
    return {
      plans: [],
      hasNext: false,
      hasPrev: false
    };
  }
  
  const start = (page - 1) * PlansPerPage
  const end = start + PlansPerPage
  
  return {
    plans: plans.slice(start,end),
    hasNext: end < plans.length,
    hasPrev: page > 1
  }
}

const detectNetwork = (phoneNumber)=>{
  const mobile = new NigeriaPhone(phoneNumber)
  const network = mobile.getNetwork()
  return network
}

const getTotalPages = (plans,plansPerPage)=>{
  const total = Math.ceil(plans.length/plansPerPage)
  return total
}


const dataSelf =()=>{
  menu.state('dataSelf',{
    run: async()=>{
      const {sessionId,phoneNumber} = menu.args
      let page =  await userSession.get(sessionId).page || 1
      let network = await userSession.get(sessionId).network
      
      if (!network) {
          network = await detectNetwork(phoneNumber)
          if (!network) {
            return menu.con('Invalid network \n 0. Back')
          }
          await userSession.update(sessionId,'phone',phoneNumber)
          await userSession.update(sessionId,'network',network)
      }
      
      const dataPlans = planStore.get('dataPlans');
      const { mtn, glo, airtel, nineMobile } = dataPlans;
      let plan = []
      
      
      
      switch (network) {
        case 'mtn':
          plan = mtn
          break;
        case 'glo':
          plan = glo
          break;
        case 'airtel':
          plan = airtel
          break;
        case '9mobile':
          plan = nineMobile
          break;
      }
      if (!plan.length) {
        return menu.con('No available plan \n0. Back')
      }
      const totalPages = await getTotalPages(plan,PlansPerPage)
      
     await userSession.update(sessionId,'totalPages',totalPages)
      const { plans, hasNext, hasPrev } = await getPaginatedPlan(plan = plan.slice().sort((a, b) => a.price - b.price), page);

      let response = `Select a data plan for ${network} network. \n`;

      plans.forEach((p, i) => {
        response += `${i + 1}. ${p.data_plan} - ₦${p.price}\n`;
      });

      if (hasNext) response += '9. Next\n';
      if (hasPrev) response += '8. Previous\n';
      response += '0. Back';
      
      let message = await userSession.get(sessionId).message
      
      
      menu.con(!message? response : message + response);
    },
    
 next: {
  '9': async () => {
    const { sessionId } = menu.args;

    const session = await userSession.get(sessionId) || {};
    let page = session.page || 1;
    const totalPages = session.totalPages || 1;

    if (page < totalPages) {
      page++;
      await userSession.update(sessionId, 'page', page);
    }

    return 'dataSelf';
  },

  '8': async () => {
    const { sessionId} = menu.args;

    const session = await userSession.get(sessionId) || {};
    let page = session.page || 1;

    if (page > 1) {
      page--;
      await userSession.update(sessionId, 'page', page);
    }

    return 'dataSelf';
  },

  '*': async () => {
    const { sessionId,phoneNumber } = menu.args;

    const session = await userSession.get(sessionId) || {};
    const page = session.page || 1;
    const network = session.network;

    const dataPlans = planStore.get('dataPlans');
    let plan = [];

    switch (network) {
      case 'mtn': plan = dataPlans.mtn; break;
      case 'glo': plan = dataPlans.glo; break;
      case 'airtel': plan = dataPlans.airtel; break;
      case '9mobile': plan = dataPlans.nineMobile; break;
    }

    plan = plan.slice().sort((a, b) => a.price - b.price);

    const { plans } = getPaginatedPlan(plan, page);
    const choice = Number(menu.val);
    if (choice >= 1 && choice <= plans.length) {
      await userSession.update(sessionId, 'dataPlan', plans[choice - 1]);
      
      const validUser = await user.findOne({phoneNumber})
      const userBalance = validUser.balance
    
      const {dataPlan} = await userSession.get(sessionId)
      const userPlanPrice = dataPlan.price
    
      if (userBalance >= userPlanPrice) {
        return 'dataSelfPin'
      }
      
    await  userSession.update(sessionId,'message','Insufficient balance \n')
      return 'dataSelf'
    }
    return menu.con('Invalid choice\n0. Back');
  },
  '0':'data'
 }
 })
}
module.exports = dataSelf