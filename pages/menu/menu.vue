<template>
	<view class="index">
		<view class="grid">
			<view class="grid-c-06" v-for="item in lists" :key="item.guid">
				<view class="panel">
					<image class="card-img card-list2-img" :src="item.pic"></image>
					<text class="card-num-view card-list2-num-view">{{item.price}}￥</text>
					<view class="card-bottm row">
						<view class="car-title-view row">
							<text class="card-title card-list2-title">{{item.name}}</text>
							<text>{{ item.desc }}</text>
						</view>
						<view @click.stop="addCart(item)" class="add-cart yticon icon-jia2"></view>
					</view>
				</view>
			</view>
		</view>
		<text class="loadMore" v-if="lists.length == 0">{{ bottomText }}</text>
	</view>
</template>

<script>
	import { mapMutations, mapState } from 'vuex'
	export default {
		data() {
			return {
				refreshing: false,
				lists: [],
				fetchPageNum: 0,
				bottomText: '努力获取中...'
			}
		},
		onLoad() {
			this.getData();
			uni.getProvider({
				service: 'share',
				success: (e) => {
					let data = [];
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin'
								});
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline'
								});
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq'
								});
								break;
							default:
								break;
						}
					}
					this.providerList = data;
				},
				fail: (e) => {
					console.log('获取登录通道失败', e);
				}
			});
		},
		onPullDownRefresh() {
			console.log('下拉刷新');
			this.refreshing = true;
			this.getNowData();
		},
		onReachBottom() {
			this.getData();
		},
		computed: {
			...mapState({
				cartList: state => state.cart.cartList
			})
		},
		methods: {
			...mapMutations(['ADD_CARTLIST']),
			getNowData(){
				uni.request({
					url: this.$serverUrl + '/api/v2/getMenu?page=0' +
						'&per_page=8',
					success: (ret) => {
						let list = [],
							data = ret.data;
						for (let i = 0, length = data.length; i < length; i++) {
							var item = data[i];
							item.guid = this.newGuid() + item.id
							list.push(item);
						}
						this.lists = list;
					}
				})
			},
			getData() {
				uni.request({
					url: this.$serverUrl + '/api/v2/getMenu?page=' + (this.refreshing ? 0 : this.fetchPageNum) +
						'&per_page=8',
					success: (ret) => {
						if (ret.statusCode !== 200) {
							console.log('请求失败:', ret)
						} else {
							if (this.refreshing && ret.data[0].id === this.lists[0].id) {
								uni.showToast({
									title: '小主，已经是最新的了',
									icon: 'none',
								});
								this.refreshing = false;
								uni.stopPullDownRefresh();
								return;
							}
							let list = [],
								data = ret.data;
							for (let i = 0, length = data.length; i < length; i++) {
								var item = data[i];
								item.guid = this.newGuid() + item.id
								list.push(item);
							}
							if(list.length === 0) this.bottomText = '附近已经没有啦!';
							if (this.refreshing) {
								this.refreshing = false;
								uni.stopPullDownRefresh()
								this.lists = list;
								this.fetchPageNum = 1;
							} else {
								this.lists = this.lists.concat(list);
								this.fetchPageNum += 1;
							}
						}
					}
				});
			},
			newGuid() {
				let s4 = function() {
					return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
				}
				return (s4() + s4() + "-" + s4() + "-4" + s4().substr(0, 3) + "-" + s4() + "-" + s4() + s4() + s4()).toUpperCase();
			},
			addCart(menuItem) {
				this.ADD_CARTLIST(menuItem);
				console.log(this.cartList)
			}
		}
	}
</script>

<style>
	.grid{
		padding-top: 10px;
	}
	.add-cart{
		position: absolute;
		right: 5upx;
		bottom: 5upx;
		color: #B91212;
	}
</style>
