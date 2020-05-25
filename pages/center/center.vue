<template>
	<view class="center">
		<view class="logo" @click="goLogin" :hover-class="!ifLogin ? 'logo-hover' : ''">
			<image class="logo-img" :src="!!user.code ? user.avatarUrl :avatarUrl"></image>
			<view class="logo-title">
				<text class="uer-name">Hi，{{!!user.code ? user.nickName : '您未登录'}}</text>
				<text class="go-login navigat-arrow" v-if="!user.code">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item" @click="goAddress">
				<text class="list-icon">&#xe609;</text>
				<text class="list-text">地址管理</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item border-bottom" @click="goAbout">
				<text class="list-icon">&#xe603;</text>
				<text class="list-text">关于</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		data() {
			return {
				avatarUrl: '/static/logo.png',
			}
		},
		computed:{
			...mapState({
				user: state => state.user
			})
		},
		methods: {
			...mapActions(['login']),
			goLogin() {
				if (!this.ifLogin) {
					this.login().then(res=>{
						// 与自己的服务器建立连接
						console.log(res)
						uni.request({
							url: this.$serverUrl + '/api/v2/setOpenId?code=' + this.user.code,
							success: (res) => {
								console.log(res)
							},
							fail: (err) => {
								this.$api.msg('地址请求错误')
							}
						});							
					})
				}
			},
			goAbout() {
				uni.navigateTo({
					url: '/pages/about/about'
				});
			},
			goAddress() {
				if(this.user.code){
					uni.navigateTo({
						url: '/pages/address/address'
					})	
				}else{
					this.$api.msg('请先登录')
				}
			}
		}
	}
</script>

<style>
</style>
