

Vue.component('manageIndex',{
	data () {
		return {
			
		}
	},
	created() {
		this.fetchConnection()
	},
	watch: {
	    // 如果路由有变化，会再次执行该方法
	    '$route': 'fetchData'
	},
	methods: {
	    fetchConnection() {
	    	Vue.use(VueSocketio, 'http://socketserver.com:1923');
	    }
	},
	template: `
		<div>pag</div>
	`
});