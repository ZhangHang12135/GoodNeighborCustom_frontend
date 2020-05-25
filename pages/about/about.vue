<template>
	<view class="about">
		<view class="content">
			<view class="qrcode">
				<image src="../../static/goodN.png" @longtap="save"></image>
			</view>
			<view class="source">
				<view class="title">Good邻居</view>
				<view class="source-list">
					<view class="source-cell">
						<text>你的家常菜馆</text>
					</view>
				</view>
			</view>
			<view class="desc">
				基于uni-app开发的社区外卖，"Good邻居"，项目已开源。
			</view>
		</view>
	</view>
</template>

<style>
	page,
	view {
		display: flex;
	}

	page {
		min-height: 100%;
		background-color: #FFFFFF;
	}

	image {
		transform: scale(0.5, 0.5);
	}

	.about {
		flex-direction: column;
		flex: 1;
	}

	.content {
		flex: 1;
		padding: 30upx;
		flex-direction: column;
		justify-content: center;
	}

	.qrcode {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.qrcode .tip {
		margin-top: 20upx;
	}

	.desc {
		margin-top: 30upx;
		display: block;
	}

	.code {
		color: #e96900;
		background-color: #f8f8f8;
	}

	button {
		width: 100%;
		margin-top: 40upx;
	}

	.version {
		height: 80upx;
		line-height: 80upx;
		justify-content: center;
		color: #ccc;
	}

	.source {
		flex-direction: column;
		color: #B91212;
		align-items: center;
	}
	.title{
		font-size: 80upx;
	}

	.source-list {
		flex-direction: column;
	}

	.link {
		color: #007AFF;
	}
</style>
