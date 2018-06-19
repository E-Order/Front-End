Vue.component('orderList',{

   data() {
      return {
        // tableData: [{
        //   id: 1,
        //   deskId: 1,
        //   date: '2016-05-02',
        //   orderAmount: '300',
        //   payStatus: '已支付',
        //   orderStatus: '进行中'
        // }, {
        //   id: '2',
        //   deskId: '2',
        //   date: '2016-05-04',
        //   orderAmount: '300',
        //   payStatus: '未支付',
        //   orderStatus: '进行中'
        // }, {
        //   id: '3',
        //   deskId: '3',
        //   date: '2016-05-01',
        //   orderAmount: '300',
        //   payStatus: '已支付',
        //   orderStatus: '已完结'
        // }, {
        //   id: '4',
        //   deskId: '4',
        //   date: '2016-05-03',
        //   orderAmount: '300',
        //   payStatus: '未支付',
        //   orderStatus: '已取消'
        // }],
        tableData: [],
        length: 0,
        cur_page: 1,
        page_size: 10,
        url : 'https://private-5e210-ordermeal.apiary-mock.com/eorder/buyer/seller/list',
        ToChangepayStatus: false,
        idx: -1,
        Todelete: false,
        Tofinish: false
      }
    },
    created() {
        this.getData();
    },
    methods: {
        getDetail(i) {
             axios.get("https://private-5e210-ordermeal.apiary-mock.com/eorder/seller/order/detail", {params:{
                orderId: this.tableData[i].orderId
            }}).then((res) => {
                Vue.set(this.tableData[i],'orderDetailList',res.data.data.orderDetailList)
            }).catch((error) => {
                console.log(error);
            });
        },
        getData() {
            axios.get(this.url, {params:{
                page: this.cur_page,
                size: this.page_size
            }}).then((res) => {

                this.tableData = res.data.data;

                for (var i = 0; i < this.tableData.length; i++) {
                	Vue.set(this.tableData[i],'index',i);
                    this.getDetail(i);
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        // showDetail(index, row){
        //     axios.get("https://private-5e210-ordermeal.apiary-mock.com/eorder/seller/order/detail", {params:{
        //         orderId: row.orderId
        //     }}).then((res) => {
        //         this.tableData[index] = Object.assign({}, res.data.data);
        //         //this.$set(this.tableData[i],'orderDetailList',res.data.data.orderDetailList)
        //     }).catch((error) => {
        //         console.log(error);
        //     });
        //     console.log(row);
        // },
        filterpayStatus(value, row) {
            return row.payStatus === value;
        },
        filterorderStatus(value, row) {
            return row.orderStatus === value;
        },
        handlePay(index, row) {
            this.idx = row.index;
            this.ToChangepayStatus = true;
            console.log(index)
        },
        changepayStatus() {
            this.tableData[this.idx].payStatus = 1;
            this.ToChangepayStatus = false;
        },
        handleDelete(index, row) {
            this.idx = row.index;
            this.Todelete = true;
        },
        deleteOrder() {
            axios.post("https://private-5e210-ordermeal.apiary-mock.com/eorder/seller/order/cancel",
                {
                    orderId: this.tableData[this.idx].orderId
                }
            ).then((res) => {
                //console.log(res);
                // this.tableData.splice(this.idx, 1);
                this.tableData[this.idx].orderStatus = 2;
                this.$message.success('成功');
                this.Todelete = false;
            }).catch((error) => {
                console.log(error);
            });
        },
        handleFinish(index, row) {
            this.idx = row.index;
            this.Tofinish = true;
        },
        finishOrder() {
            axios.post("https://private-5e210-ordermeal.apiary-mock.com/eorder/seller/order/finish",
                {
                    orderId: this.tableData[this.idx].orderId
                }
            ).then((res) => {
                this.tableData[this.idx].orderStatus = 1;
                this.Tofinish = false;
            }).catch((error) => {
                console.log(error);
            });
        },
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },
        handleSizeChange(val) {
            this.page_size = val;
        }
    },


    template:`
    <div class="orderList">
	    <div class="crumbs">
	            <el-breadcrumb separator="/">
	                <el-breadcrumb-item><i class="el-icon-tickets"></i> 订单列表</el-breadcrumb-item>
	            </el-breadcrumb>
	     </div>

	    <el-table
	    :data="tableData"
	    style="width: 100%">
	    <el-table-column
	      type="expand">
	     <template slot-scope="props">
	        <el-form label-position="left" inline class="demo-table-expand">
	          <el-form-item v-for="(item,index) in props.row.orderDetailList" :key="index">
	            <span>{{ item.productName }}   * {{ item.productQuantity }} = {{item.productPrice}}</span>
	          </el-form-item>
	        </el-form>
	    </template>
	    </el-table-column>
	    <el-table-column
	      prop="orderId"
	      label="订单号"
	      sortable
	      width="120"
	     >
	    </el-table-column>
	      <el-table-column
	      prop="deskId"
	      label="桌号"
	      sortable
	      width="100">
	    </el-table-column>
	    <el-table-column
	      prop="updateTime"
	      label="日期"
	      sortable
	      width="120">
	    </el-table-column>
	    <el-table-column
	      prop="orderAmount"
	      label="总金额"
	      width="100">
	    </el-table-column>
	    <el-table-column
	      prop="payStatus"
	      label="支付状态"
	      width="100"
	      :filters="[{ text: '已支付', value: 1 }, { text: '未支付', value: 0 }]"
	      :filter-method="filterpayStatus"
	      filter-placement="bottom-end">
	      <template slot-scope="scope">
	        <el-tag
	          type="primary"
	          v-if="scope.row.payStatus === 1"
	          disable-transitions>已支付</el-tag>
	        <el-tag
	          type="success"
	          v-else-if="scope.row.payStatus === 0"
	          disable-transitions>未支付</el-tag>
	      </template>
	    </el-table-column>
	    <el-table-column
	      prop="orderStatus"
	      label="订单状态"
	      width="100"
	      :filters="[{ text: '进行中', value: 0 }, { text: '已完结', value: 1 }, { text: '已取消', value: 2 }]"
	      :filter-method="filterorderStatus"
	      filter-placement="bottom-end">
	      <template slot-scope="scope">
	        <el-tag
	          type="info"
	          v-if="scope.row.orderStatus === 1"
	          disable-transitions>已完结</el-tag>
	        <el-tag
	          type="danger"
	          v-else-if="scope.row.orderStatus === 2"
	          disable-transitions>已取消</el-tag>
	        <el-tag
	          type="success"
	          v-else-if="scope.row.orderStatus === 0"
	          disable-transitions>进行中</el-tag>
	      </template>
	    </el-table-column>
	    <el-table-column label="操作">
	      <template slot-scope="scope">
	        <el-button
	          size="mini"
	          :disabled="scope.row.payStatus === 1"
	          @click="handlePay(scope.$index, scope.row)">已支付</el-button>
	        <el-button
	          size="mini"
	          type="danger"
	          v-if="scope.row.orderStatus === 0"
	          @click="handleDelete(scope.$index, scope.row)">取消订单</el-button>
	        <el-button
	          size="mini"
	          type="info"
	          v-else
	          disabled
	          @click="handleDelete(scope.$index, scope.row)">取消订单</el-button>
	        <el-button
	          size="mini"
	          type="success"
	          round
	          v-if="scope.row.orderStatus === 0"
	          @click="handleFinish(scope.$index, scope.row)">完成</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	    <div class="pagination">
	        <el-pagination 
	            @size-change="handleSizeChange"
	            @current-change="handleCurrentChange"
	            :page-sizes="[10, 20, 30, 40]"
	            :page-size="10"
	            layout="total, sizes, prev, pager, next, jumper"
	            :total="400">
	        </el-pagination>
	    </div>
	          <!-- 支付提示框 -->
	        <el-dialog title="提示" :visible.sync="ToChangepayStatus" width="300px" center>
	            <div class="del-dialog-cnt">修改支付状态后不可更改，是否确定订单已支付？</div>
	            <span slot="footer" class="dialog-footer">
	                <el-button @click="ToChangepayStatus = false">取 消</el-button>
	                <el-button type="primary" @click="changepayStatus">确 定</el-button>
	            </span>
	        </el-dialog>
	         <!-- 取消提示框 -->
	        <el-dialog title="提示" :visible.sync="Todelete" width="300px" center>
	            <div class="del-dialog-cnt">取消订单后不可更改，是否确定取消订单？</div>
	            <span slot="footer" class="dialog-footer">
	                <el-button @click="Todelete = false">取 消</el-button>
	                <el-button type="primary" @click="deleteOrder">确 定</el-button>
	            </span>
	        </el-dialog>
	          <!-- 完成提示框 -->
	        <el-dialog title="提示" :visible.sync="Tofinish" width="300px" center>
	            <div class="del-dialog-cnt">确认订单完成后不可更改，是否确定完成订单？</div>
	            <span slot="footer" class="dialog-footer">
	                <el-button @click="Tofinish = false">取 消</el-button>
	                <el-button type="primary" @click="finishOrder">确 定</el-button>
	            </span>
	        </el-dialog>
	</div>
    `
});