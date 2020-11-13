const Koa = require("koa");
const Router = require("koa-router");

const cors = require("koa2-cors"); //跨域使用
var bodyParser = require('koa-bodyparser')
const app = new Koa();
var views = require('koa-views')
app.use(cors()); // 跨域使用
// 配置根路径以及显示的文件
app.use(views('./',{
	extension: 'html'
}))
app.use(bodyParser()); 

const router = new Router();
// 展示前端页面
router.get("/", async function(ctx){
	await ctx.render('index')
})
// GET请求示例
/**
 * 获取详情数据
 * @param {request} id 商品id
 */
const detailData = require("./mock/detail/detail.js");
router.get("/api/getdetail/:id", function (ctx, next) {
	const id = ctx.params.id;
	let res = {
		errno: 0,
		data: {
			data: [],
		},
	};
	res.data.data = detailData;
	// todo...
	ctx.body = res;
});

// POST请求示例
/**
 * 提交评论
 * @param {request} id  用户id
 * @param {request} uid 商品id
 * @param {request} msg 评论内容
 */
router.post("/api/c", function (ctx, next) {
	console.log(ctx.request.body,'ctx.request.body')
	ctx.body = [ctx.request.body]

});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
console.log("server is running at http://localhost:3000/");
