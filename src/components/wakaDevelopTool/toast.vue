<template>
	<transition name='fade'>
		<div class='toast_warp' v-if="visible" @click="closeFunc">
			<p class='toast_text' :style="config">network error!{{ text }}</p>
		</div>
	</transition>
</template>
<script>

import { h, ref, reactive, watch } from 'vue';
export default {
    setup(props, { attrs, slots, emit }){
	
		let visible = ref(false), text = ref('Network Error!'), timeID = ref(-1), config = reactive({color: 'wheat', fonSize: '25px'});

		let closeFunc = ()=> visible.value = false;

		watch(visible, newValue=>{
			if(newValue){
				timeID = setTimeout(e=> visible.value = false, 2000);
			}else{
				clearTimeout(timeID);
			}
		});

		return { visible, text, config, closeFunc }
	}
}
</script>
<style lang='scss' scoped>
	.toast_warp{
		position: fixed;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0,0,0,0.3);
		z-index: 10;
		left: 0;
		top: 0;
		.toast_text{
			position: fixed;
			width: 300px;
			height: 100px;
			background-color: rgba(0,0,0,0.8);
			z-index: 10;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			text-align: center;
			line-height: 100px;
			font-size: 25px;
			color: wheat;
		}
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity 0.5s ease;
	}

	.fade-enter-from, .fade-leave-to {
		opacity: 0;
	}
</style>