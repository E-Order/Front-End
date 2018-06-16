Vue.component('productList',{
	data () {
		return {
			types:null,
			seenView:true,
			seenDelete:false,
			showText:"编辑",
			categoryId:null,
			inputs: '',
			seenAdd:false,
			isEditting:null,
			updates:''
		}
	},
	created() {
		this.fetchData()
	},
	watch: {
	    // 如果路由有变化，会再次执行该方法
	    '$route': 'fetchData'
	},
	methods: {
	    fetchData () {
	        var reqbody = {
			    // 'username':store.state.userId
			    'userId':"123456"
			};
			var that=this;
			$.ajax({
                type: "GET",
                // url: "https://www.e-order.cn:8080/eorder/seller/category/list",
                url:"https://private-f835d-ordermeal.apiary-mock.com/eorder/seller/category/list",
                contentType: "application/json",
                data: JSON.stringify(reqbody),
                dataType : 'json', 
                success: function(result) {
                    that.types = new Array()
                    that.categoryId = new Array()
                    that.isEditting = new Array()
                    for (var i = 0; i < result.data.length; i++) {
                    	that.types[i] = result.data[i].categoryName
                    	that.categoryId[i] = result.data[i].categoryId
                    	that.isEditting[i] = false
                    }
                    that.seenAdd = true
                },
                error: function(message) {
                    console.log("error")
                }
            });
	      
	    },
	    EditCategory() {
	    	if (this.seenView) {
	    		this.seenView = false
	    		this.seenDelete = true
	    		this.showText = "完成"
	    	} else {
	    		this.seenView = true
	    		this.seenDelete = false
	    		this.showText = "编辑"
	    	}
	    },
	    DeleteCategory(index) {
	    	var reqbody = {
			    // 'username':store.state.userId
			    'userId':"123456",
			    'categoryId':this.categoryId[index]
			};
			var that=this;
			that.types.splice(index, 1)
			$.ajax({
                type: "POST",
                // url: "https://www.e-order.cn:8080/eorder/seller/category/list",
                url:"https://private-f835d-ordermeal.apiary-mock.com//eorder/seller/category/delete",
                contentType: "application/json",
                data: JSON.stringify(reqbody),
                dataType : 'json', 
                success: function(result) {
                    console.log("success")
                },
                error: function(message) {
                    console.log("error")
                }
            });
	    },
	    AddCategory() {
	    	var reqbody = {
			    // 'username':store.state.userId
			    'username':"123456",
			    'categoryName':this.inputs,
			    'categoryType':this.categoryId.length
			};
			var that=this;
			that.types[that.types.length] = that.inputs
            that.inputs = ''
			$.ajax({
                type: "POST",
                // url: "https://www.e-order.cn:8080/eorder/seller/category/list",
                url:"https://private-f835d-ordermeal.apiary-mock.com//eorder/seller/category/add",
                contentType: "application/json",
                data: JSON.stringify(reqbody),
                dataType : 'json', 
                success: function(result) {
                    that.categoryId[that.categoryId.length] = result.data.categoryId
                },
                error: function(message) {
                    console.log("error")
                }
            });
	    },
	    GetDetail(index) {

	    },
	    updateCategory(index) {
		    this.isEditting[index] = true
		    var that = this
	    	Vue.nextTick(function () {
				console.log(that.isEditting[index])
			})
	    },
	    commitUpdateCategory(index) {

	    }

    },
	template: `
		<el-card class="box-card">
			<div slot="header" class="clearfix">
			    <span>菜品种类</span>
			    <el-button style="float: right; padding: 3px 0" type="text" @click="EditCategory">{{showText}}</el-button>
			</div>
			
	        <div v-for="(value, index) in types" class="text item">
	             <el-button type="warning" icon="el-icon-star-off" circle v-if="seenView" @click="GetDetail(index)"></el-button>
	            <el-button type="danger" icon="el-icon-delete" circle v-if="seenDelete" @click="DeleteCategory(index)"></el-button>
			    
			    <span v-if="!isEditting[index]">{{value}}</span>
			    <input id="updateCategories" v-model="updates" placeholder="修改类目" v-if="isEditting[index]">
			    <i class="el-icon-edit" v-if="seenView&&!isEditting[index]" @click="updateCategory(index)"></i>
			    <el-button type="primary" round v-if="!isEditting[index]" @click="commitUpdateCategory(index)">提交</el-button>
			</div>
			<el-button type="primary" icon="el-icon-edit" circle v-if="seenAdd"></el-button>
			<input id="addCategories" v-model="inputs" placeholder="请输入新类目" v-if="seenAdd">
			<el-button type="primary" round v-if="seenAdd" @click="AddCategory">提交</el-button>

		</el-card>
	`
});