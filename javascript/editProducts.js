Vue.component('editProducts',{
	data () {
		return {
			tableData: [],
	        length: 0,
	        cur_page: 1,
	        page_size: 10,
	        url : 'https://private-5e210-ordermeal.apiary-mock.com/eorder/seller/product/list',
	        ToChangeproductStatus: false,
	        idx: -1,
	        productIds: null,
	        isEditting: null,
	        ids: '',
	        names: '',
	        form: {
		        pname: '',
		        price: '',
		        stock: '',
		        desc: ''
	        }
		}
	},
	created() {
		this.getData()
	},
	watch: {
	    // 如果路由有变化，会再次执行该方法
	    '$route': 'getData'
	},
	methods: {
        getData() {
            axios.get(this.url, {params:{
                page: this.cur_page,
                size: this.page_size,
                categoryType: this.$route.params.type
            }}).then((res) => {
                this.tableData = res.data.data;
                this.productids = new Array()
                this.isEditting = new Array()
                for (var i = 0; i < this.tableData.length; i++) {
                	this.productids[i] = this.tableData[i].productId
                	this.isEditting[i] = false
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        filterproductStatus(value, row) {
            return row.productStatus === value;
        },
        setIndex(row) {
        	for (var i = 0; i < this.productids.length; i++) {
        		if (this.productids[i] === row.productId) {
        			this.idx = i
        		}
        	}
        },
        handleOnsale(index, row) {
            this.setIndex(row)
            this.ToChangeproductStatus = true;
            this.changeproductStatus()
        },
        changeproductStatus() {
        	if (this.tableData[this.idx].productStatus === 0) {
        		this.tableData[this.idx].productStatus = 1;
        	} else {
        		this.tableData[this.idx].productStatus = 0;
        	}
            
            this.ToChangeproductStatus = false;
        },
        handleOffsale(index, row) {
        	this.setIndex(row)

            this.ToChangeproductStatus = true;
            this.changeproductStatus()
        },
        handleEditProduct(index, row) {

        	for (var i = 0; i < this.isEditting.length; i++) {
        		if (this.isEditting[i] == true) return
        	}
            this.setIndex(row)

            Vue.set(this.isEditting,this.idx,true)

            this.form.pname = row.productName
            this.form.price = row.productPrice
            this.form.stock = row.productStock
            this.form.desc = row.productDescription

        },
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },
        handleSizeChange(val) {
            this.page_size = val;
        },
        seenView(row) {
        	this.setIndex(row)
        	return this.isEditting[this.idx]
        },
        submitEditting(form,row) {
        	
        }
	    

    },
    template: `
    	<div class="productlist">
	    	<div class="crumbs">
		            <el-breadcrumb separator="/">
		                <el-breadcrumb-item><i class="el-icon-tickets"></i> {{this.$route.params.name + '商品列表'}}</el-breadcrumb-item>
		            </el-breadcrumb>
		    </div>
		    <el-table
		    	:data="tableData"
		    	style="width: 100%"
		    >
			    <el-table-column
			      	type="expand"
			      	prop="productDescription">

			      	
			    	<template slot-scope="props">
			    		
				        <el-form label-position="left" inline class="demo-table-expand">
				          {{props.row.productDescription}}
				        </el-form>
				    </template>
			    </el-table-column>
			    <el-table-column
			      	prop="productId"
			      	label="菜品编号"
			      	sortable
			      	width="120"
			    >
			    </el-table-column>
			      	<el-table-column
			      	prop="productName"
			      	label="菜品名字"
			      	sortable
			      	width="120">
			    </el-table-column>
		    	<el-table-column
		      		prop="productPrice"
		      		label="菜品价格"
		      		sortable
		      		width="120">
		    	</el-table-column>
		    	<el-table-column
		      		prop="productStock"
		      		label="菜品库存"
		      		width="120">
		    	</el-table-column>
		    	<el-table-column
				    prop="productStatus"
				    label="菜品状态"
				    width="120"
				    :filters="[{ text: '上架', value: 0 }, { text: '下架', value: 1 }]"
				    :filter-method="filterproductStatus"
				    filter-placement="bottom-end"
				>
				    <template slot-scope="scope">
			        	<el-tag type="primary" v-if="scope.row.productStatus === 1" disable-transitions>
			        		已下架
			          	</el-tag>
			        	<el-tag type="success" v-else-if="scope.row.productStatus === 0" disable-transitions>
			        		已上架
			        	</el-tag>
		            </template>
			    </el-table-column>
			    <el-table-column label="操作">
			      	<template slot-scope="scope">
				        <el-button
				          size="mini"
				          type="danger"
				          v-if="scope.row.productStatus === 0"
				          @click="handleOffsale(scope.$index, scope.row)">下架菜品</el-button>
				        <el-button
				          size="mini"
				          type="primary"
				          v-if="scope.row.productStatus === 1"
				          @click="handleOnsale(scope.$index, scope.row)">上架菜品</el-button>
				        
				          <el-popover
							  	placement="right"
							  	width="400"
							  	transition
							  	trigger="click">
							  	<el-form ref="form" :model="form" label-width="80px" >
					    		  	<el-form-item label="菜品名字">
								    	<el-input v-model="form.pname"></el-input>
								  	</el-form-item>
					    			<el-form-item label="菜品价格">
								    	<el-input v-model="form.price"></el-input>
								  	</el-form-item>
								  	<el-form-item label="菜品库存">
								    	<el-input v-model="form.stock"></el-input>
								  	</el-form-item>
								  	<el-form-item label="菜品描述">
									    <el-input type="textarea" v-model="form.desc"></el-input>
									</el-form-item>
									<el-form-item>
									    <el-button type="primary" @click="submitEditting('form',scope.row)">提交修改</el-button>
									</el-form-item>
							    </el-form>
							    <el-button
						          	size="mini"
						          	slot="reference"
						          	thisype="danger"
						          	@click="handleEditProduct(scope.$index, scope.row)">编辑菜品信息</el-button>

							</el-popover>
			        </template>
			    </el-table-column>
			    
		    </el-table>
    	</div>
    `
});