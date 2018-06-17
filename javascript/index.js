const Sgnin= { template: '<signinshow></signinshow>' }
const Sgnup = { template: '<signupshow></signupshow>' }
const con = { template: '<contactshow></contactshow>' }
const afterNavi = { template: '<afterNavi></afterNavi>' }
const beforeNavi = { template: '<beforeNavi></beforeNavi>' }
const order = { template: '<orderList></orderList>' }
const product = { template: '<productList></productList>' }
const settings = { template: '<settings></settings>' }
const editProduct = { template: '<editProducts></editProducts>' }


const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        naviBar: beforeNavi,
        mainContent: Sgnin
      }
    },
    {
      path: '/signin',
      components: {
        naviBar: beforeNavi,
        mainContent: Sgnin
      }
    },
    {
      path: '/signup',
      components: {
        naviBar: beforeNavi,
        mainContent: Sgnup
      }
    },
    {
      path: '/contact',
      components: {
        naviBar: beforeNavi,
        mainContent: product
      }
    },
    {
      path: '/manageOrder',
      components: {
        naviBar: afterNavi,
        mainContent: order
      }
    },
    {
      path: '/manageProduct',
      components: {
        naviBar: afterNavi,
        mainContent: product
      }
    },
    {
      path: '/manageIndex',
      components: {
        naviBar: afterNavi,
        mainContent: settings
      }
    },
    {
      path: '/manageSetting',
      components: {
        naviBar: afterNavi,
        mainContent: settings
      }
    },
    {
      path: '/manageProduct/category/:type/:name',
      name: 'editProducts',
      components: {
        naviBar: afterNavi,
        mainContent: editProduct
      }
    }
  ]
})
const store = new Vuex.Store({
    state: {
        userId:""
    },
    mutations: {
      UpdateUserId (state, str) {
        state.userId = str
      },
      ClearLogin (state) {
        state.userId = ""
      }
    }
})
new Vue({
  el: '#app',
  router,
  store
})

