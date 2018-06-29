const Sgnin= { template: '<signinshow></signinshow>' }
const Sgnup = { template: '<signupshow></signupshow>' }
const con = { template: '<contactshow></contactshow>' }
const afterNavi = { template: '<afterNavi></afterNavi>' }
const beforeNavi = { template: '<beforeNavi></beforeNavi>' }
const order = { template: '<orderList></orderList>' }
const product = { template: '<productList></productList>' }
const settings = { template: '<settings></settings>' }
const editProduct = { template: '<editProducts></editProducts>' }
const msg = { template: '<message></message>' }

const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        naviBar: afterNavi,
        mainContent: settings,
        messages:msg
      }
    },
    {
      path: '/signin',
      components: {
        naviBar: beforeNavi,
        mainContent: Sgnin,
        messages:msg
      }
    },
    {
      path: '/signup',
      components: {
        naviBar: beforeNavi,
        mainContent: Sgnup,
        messages:msg
      }
    },
    {
      path: '/contact',
      components: {
        naviBar: beforeNavi,
        mainContent: con,
        messages:msg
      }
    },
    {
      path: '/manageOrder',
      components: {
        naviBar: afterNavi,
        mainContent: order,
        messages: msg
      }
    },
    {
      path: '/manageProduct',
      components: {
        naviBar: afterNavi,
        mainContent: product,
        messages: msg
      }
    },
    {
      path: '/manageSetting',
      components: {
        naviBar: afterNavi,
        mainContent: settings,
        messages: msg
      }
    },
    {
      path: '/manageProduct/category/:type/:name',
      name: 'editProducts',
      components: {
        naviBar: afterNavi,
        mainContent: editProduct,
        messages: msg
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

