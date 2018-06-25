Vue.component('manageIndex',{
	data () {
		return {
			a:null
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
	    	if ("WebSocket" in window)
            {
               alert("您的浏览器支持 WebSocket!");
               
               // 打开一个 web socket
               var ws = new WebSocket("ws://123.207.7.251:8080/eorder/webSocket");
                
               ws.onopen = function()
               {
                  // Web Socket 已连接上，使用 send() 方法发送数据
                  ws.send("发送数据");
                  alert("数据发送中...");
               };
                
               ws.onmessage = function (evt) 
               { 
                  var received_msg = evt.data;
                  alert("数据已接收...");
               };
                
               ws.onclose = function()
               { 
                  // 关闭 websocket
                  alert("连接已关闭..."); 
               };
            }
            
            else
            {
               // 浏览器不支持 WebSocket
               alert("您的浏览器不支持 WebSocket!");
            }
	    }
	},
	template: `
		<div>page</div>
	`
});