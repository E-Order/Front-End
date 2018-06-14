Vue.component('productList',{
	data () {
		return {
			types:null
		}
	},
	created() {
		this.fetchData()
	},
	watch: {
	    // 如果路由有变化，会再次执行该方法
	    '$route': 'fetchData'
	},
	// mounted(){
 //        this.$nextTick(()=>{
 //            var that=this;
 //            var reqbody = {
	// 		    'username':"123456"
	// 		};
	// 		$.ajax({
 //                type: "GET",
 //                url: "https://private-f835d-ordermeal.apiary-mock.com/eorder/seller/category",
 //                contentType: "application/json",
 //                data: JSON.stringify(reqbody),
 //                dataType : 'json', 
 //                success: function(result) {
 //                    this.types = new Array()
 //                    for (var i = 0; i < result.data.length; i++) {
 //                    	that.types[i] = result.data[i].categoryName
 //                    }
 //                    console.log(this.types+"1")
 //                    Vue.nextTick(function () {
 //        				console.log(this.types) // => '更新完成'
 //      				})
 //                },
 //                error: function(message) {
 //                    console.log("error")
 //                }
 //            });
 //        })
 //    }
	methods: {
	    fetchData () {
	        var reqbody = {
			    'username':"123456"
			};
			var that=this;
			$.ajax({
                type: "GET",
                url: "https://private-f835d-ordermeal.apiary-mock.com/eorder/seller/category",
                contentType: "application/json",
                data: JSON.stringify(reqbody),
                dataType : 'json', 
                success: function(result) {
                    that.types = new Array()
                    for (var i = 0; i < result.data.length; i++) {
                    	that.types[i] = result.data[i].categoryName
                    }
                    console.log(that.types+"1")
                    Vue.nextTick(function () {
        				console.log(that.types) // => '更新完成'
      				})
                },
                error: function(message) {
                    console.log("error")
                }
            });
	      
	    }
    },
	template: `
		<el-card class="box-card">
			<div slot="header" class="clearfix">
			    <span>菜品种类</span>
			    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
			</div>
			
	        <div v-for="type in types" class="text item">
	            <i class="el-icon-view"></i>
			    {{type }}
			</div>
		</el-card>
	`
});