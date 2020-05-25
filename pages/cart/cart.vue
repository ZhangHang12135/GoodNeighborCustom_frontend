<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="!code || empty===true" class="empty">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<view v-if="!code" class="empty-tips">
				空空如也
				<view class="navigator" @click="goLogin">去登陆></view>
			</view>
			<view v-else class="empty-tips">
				空空如也
			</view>
		</view>
		<view v-else>
			<!-- 列表 -->
			<view class="cart-list">
				<block v-for="(item, index) in cartList" :key="item.id">
					<view class="cart-item">
						<view class="image-wrapper">
							<image :src="item.pic" mode="aspectFill"></image>
						</view>
						<view class="item-right">
							<text class="clamp title">{{item.name}}</text>
							<text class="price">¥{{item.price}}</text>
							<text>数量：{{item.count}}</text>
						</view>
						<text class="del-btn yticon icon-fork" @click="deleteCartItem(index)"></text>
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="total-box">
					<text class="price">¥{{total}}</text>
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
	import uniNumberBox from '../../components/uni-number-box.vue'
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				allChecked: false, //全选状态  true|false
			};
		},
		watch:{
			//显示空白页
			cartList(e){
				let empty = e.length === 0 ? true: false;
				if(this.empty !== empty){
					this.empty = empty;
				}
			}
		},
		computed:{
			...mapState({
				cartList: state => state.cart.cartList,
				code: state => state.user.code
			}),
			empty () {
				return this.cartList.length == 0
			},
			total () {
				let temp = 0;
				this.cartList.forEach(item=>{
					temp += item.price * item.count;
				})
				return temp;
			}
		},
		onload(){
			this.calcTotal();
		},
		methods: {
			...mapActions(['login']),
			...mapMutations(['DEL_CARTLIST']),
			goLogin(){
				this.login().then(res=>{
					// 与自己的服务器建立连接
					uni.request({
						url: this.$serverUrl + '/api/v2/setOpenId?code=' + this.code,
						success: (res) => {
							uni.switchTab({
								url: '../menu/menu'
							})
						},
						fail: (err) => {
							this.$api.msg('登录失败')
						}
					});							
				})
			},
			//删除
			deleteCartItem(index){
				this.DEL_CARTLIST(index);
				this.calcTotal();
				uni.hideLoading();
			},
			//计算总价
			calcTotal(){
				let list = this.cartList;
				if(list.length === 0){
					this.empty = true;
					return 0;
				}
				let total = 0;
				let checked = true;
				list.forEach(item=>{
					total += item.price * item.count;
				})
				this.total = Number(total.toFixed(2));
			},
			//创建订单
			createOrder(){
				uni.navigateTo({
					url: `/pages/money/pay?total=${this.total}`
				})
			}
		}
	}
</script>

<style lang='scss'>
	view{
		display: block;
	}
	.container{
		padding-bottom: 134upx;
		width: 100%;
		/* 空白页 */
		.empty{
			position:fixed;
			left: 0;
			top:0;
			width: 100%;
			height: 100vh;
			padding-bottom:100upx;
			display:flex;
			justify-content: center;
			flex-direction: column;
			align-items:center;
			background: #fff;
			image{
				width: 240upx;
				height: 160upx;
				margin-bottom:30upx;
			}
			.empty-tips{
				display:flex;
				font-size: 26upx;
				color: #C0C4CC;
				.navigator{
					color: #fa436a;
					margin-left: 16upx;
				}
			}
		}
	}
	/* 购物车列表项 */
	.cart-item{
		display:flex;
		position:relative;
		padding:30upx 40upx;
		.image-wrapper{
			width: 200upx;
			height: 200upx;
			flex-shrink: 0;
			position:relative;
			image{
				width: 100%;
				height: 100%;
				border-radius:8upx;
			}
		}
		.item-right{
			display:flex;
			flex-direction: column;
			flex: 1;
			justify-content: space-around;
			overflow: hidden;
			position:relative;
			padding-left: 30upx;
			.title,.price{
				font-size: 30upx;
				color: #303133;
				height: 40upx;
				line-height: 40upx;
			}
			.attr{
				font-size: 26upx;
				color: #909399;
				height: 50upx;
				line-height: 50upx;
			}
			.price{
				height: 50upx;
				color: red;
				line-height:50upx;
			}
		}
		.del-btn{
			padding:4upx 10upx;
			font-size:34upx; 
			height: 50upx;
			color: #909399;
		}
	}
	/* 底部栏 */
	.action-section{
		/* #ifdef H5 */
		margin-bottom:100upx;
		/* #endif */
		position:fixed;
		left: 30upx;
		bottom:30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
		border-radius: 16upx;
		.checkbox{
			height:52upx;
			position:relative;
			image{
				width: 52upx;
				height: 100%;
				position:relative;
				z-index: 5;
			}
		}
		.clear-btn{
			position:absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: 28upx;
			color: #fff;
			background: #C0C4CC;
			border-radius:0 50px 50px 0;
			opacity: 0;
			transition: .2s;
			&.show{
				opacity: 1;
				width: 120upx;
			}
		}
		.total-box{
			flex: 1;
			display:flex;
			flex-direction: column;
			text-align:right;
			padding-right: 40upx;
			.price{
				font-size: 32upx;
				color: #303133;
			}
			.coupon{
				font-size: 24upx;
				color: #909399;
				text{
					color: #303133;
				}
			}
		}
		.confirm-btn{
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: 30upx;
			background: #B91212;
			box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72)
		}
	}
</style>
