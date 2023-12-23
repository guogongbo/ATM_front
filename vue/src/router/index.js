import Vue from 'vue'
import VueRouter from 'vue-router'
import Bill from '../views/Bill.vue'
import Transfer from '../views/Transfer.vue'
import Deposit from '../views/Deposit.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/WaitView',
    meta: {
      needlogin: false
    }
  },{
    path: '/WelcomeView',
    name: 'WelcomeView',
    component: () => import('../views/atm/WelcomeView.vue'),
    meta: {
      needlogin: false
    }
  },
  {
    path: '/WaitView',
    name: 'WaitView',
    component: () => import('../views/atm/WaitView.vue'),
    meta: {
      needlogin: false
    }
  },
  {
    path: '/WaitView1',
    name: 'WaitView1',
    component: () => import('../views/atm/WaitView1.vue'),
    meta: {
      needlogin: false
    }
  },
  {
    path: '/InputPassword',
    name: 'InputPassword',
    component: () => import('../views/atm/InputPassword.vue'),
    meta: {
      needlogin: false
    }
  },
  {
    path: '/IncorrectPassword',
    name: 'IncorrectPassword',
    component: () => import('../views/atm/IncorrectPassword.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/ReturnCard',
    name: 'ReturnCard',
    component: () => import('../views/atm/ReturnCard.vue'),
    meta: {
      needlogin: false
    }
  },
  {
    path: '/OperationView',
    name: 'OperationView',
    component: () => import('../views/atm/OperationView.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/OperationWaiting',
    name: 'OperationWaiting',
    component: () => import('../views/atm/OperationWaiting.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/WithdrawView',
    name: 'WithdrawView',
    component: () => import('../views/atm/WithdrawView.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/WithdrawInput',
    name: 'WithdrawInput',
    component: () => import('../views/atm/WithdrawInput.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/WithdrawFail',
    name: 'WithdrawFail',
    component: () => import('../views/atm/WithdrawFail.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/WithdrawSuccess',
    name: 'WithdrawSuccess',
    component: () => import('../views/atm/WithdrawSuccess.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/DepositView1',
    name: 'DepositView1',
    component: () => import('../views/atm/DepositView1.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/DepositView2',
    name: 'DepositView2',
    component: () => import('../views/atm/DepositView2.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/SearchView',
    name: 'SearchView',
    component: () => import('../views/atm/SearchView.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/BalanceInquiry',
    name: 'BalanceInquiry',
    component: () => import('../views/atm/BalanceInquiry.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/TransactionDetail',
    name: 'TransactionDetail',
    component: () => import('../views/atm/TransactionDetail.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/PrintAReceipt1',
    name: 'PrintAReceipt1',
    component: () => import('../views/atm/PrintAReceipt1.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/PrintAReceipt2',
    name: 'PrintAReceipt2',
    component: () => import('../views/atm/PrintAReceipt2.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/PrintAReceipt3',
    name: 'PrintAReceipt3',
    component: () => import('../views/atm/PrintAReceipt3.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/PrintAReceipt4',
    name: 'PrintAReceipt4',
    component: () => import('../views/atm/PrintAReceipt4.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/TransferAccounts1',
    name: 'TransferAccounts1',
    component: () => import('../views/atm/TransferAccounts1.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/TransferAccounts2',
    name: 'TransferAccounts2',
    component: () => import('../views/atm/TransferAccounts2.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/TransferAccounts3',
    name: 'TransferAccounts3',
    component: () => import('../views/atm/TransferAccounts3.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/TransferAccounts4',
    name: 'TransferAccounts4',
    component: () => import('../views/atm/TransferAccounts4.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/ChangePassword',
    name: 'ChangePassword',
    component: () => import('../views/atm/ChangePassword.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/ChangePassword1',
    name: 'ChangePassword1',
    component: () => import('../views/atm/ChangePassword1.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/ChangePassword2',
    name: 'ChangePassword2',
    component: () => import('../views/atm/ChangePassword2.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/ChangePassword3',
    name: 'ChangePassword3',
    component: () => import('../views/atm/ChangePassword3.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/TransactionSuccess',
    name: 'TransactionSuccess',
    component: () => import('../views/atm/TransactionSuccess.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/TransactionSuccess1',
    name: 'TransactionSuccess1',
    component: () => import('../views/atm/TransactionSuccess1.vue'),
    meta: {
      needlogin: true
    }
  },
  {
    path: '/TakeCard',
    name: 'TakeCard',
    component: () => import('../views/atm/TakeCard.vue'),
    meta: {
      needlogin: false
    }
  }
]


// const routes = [
//   {
//     path: '/',
//     name: 'Login',
//     component: Login,
//     meta: {
//       needlogin: false
//     }
//   },
//   {
//     path: '/login',
//     name: 'Login',
//     component: Login,
//     meta: {
//       needlogin: false
//     }
//   },
//   {
//     path: '/bill',
//     name: 'Bill',
//     component: Bill,
//     meta: {
//       needlogin: true
//     }
//   },
//   {
//     path: '/transfer',
//     name: 'Transfer',
//     component: Transfer,
//     meta: {
//       needlogin: true
//     }
//   },
//   {
//     path: '/deposit',
//     name: 'Deposit',
//     component: Deposit,
//     meta: {
//       needlogin: true
//     }
//   }
// ]

const router = new VueRouter({
  //base: './',
  //mode: 'history',
  mode: 'hash',
  //base: process.env.BASE_URL,
  routes
})


export default router
