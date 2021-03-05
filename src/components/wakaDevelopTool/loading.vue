<!--
 * @Author: monai
 * @Date: 2020-06-28 15:50:04
 * @LastEditors: monai
 * @LastEditTime: 2021-01-22 15:09:37
--> 
<!-- loading页面 -->

<script>

// <template>
//   <div v-if="visible" class="loadingWrap">
//     <div class="ch-shade"></div>
//     <div class="ch-loading-content">
//       <div class="ch-loading-circle">
//         <div class="ch-circle1 ch-circle"></div>
//         <div class="ch-circle2 ch-circle"></div>
//         <div class="ch-circle3 ch-circle"></div>
//         <div class="ch-circle4 ch-circle"></div>
//         <div class="ch-circle5 ch-circle"></div>
//         <div class="ch-circle6 ch-circle"></div>
//         <div class="ch-circle7 ch-circle"></div>
//         <div class="ch-circle8 ch-circle"></div>
//         <div class="ch-circle9 ch-circle"></div>
//         <div class="ch-circle10 ch-circle"></div>
//         <div class="ch-circle11 ch-circle"></div>
//         <div class="ch-circle12 ch-circle"></div>
//       </div>
//     </div>
//   </div>
// </template>

import { toRefs, reactive, ref, h } from 'vue';

export default {
  name: "chLoading",
  setup(){
    let visible = ref(false);

    return ()=> h( visible ? 'div': null, { class: 'loadingWrap'}, [
      h('div', { class: 'ch-shade' }),
      h('div', { class: 'ch-loading-content' },
        h('div', { class: 'ch-loading-circle' }, 
          Array.from({length: 12}).map((...arg)=> h('div', {class: `ch-circle ch-circle${ arg[1]+1 }`}))
        )
      ),
    ]);
  }
};
</script>
<style scoped lang="scss">
// @import "../px2rem";
.ch-shade {
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 428;
}

.ch-loading-content {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 429;
  margin-left: -0.5rem;
  margin-top: -0.5rem;
}

.ch-loading-circle {
  width: 3rem;
  height: 3rem;
  position: relative;
}

.ch-loading-circle .ch-circle {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.ch-loading-circle .ch-circle:before {
  content: "";
  display: block;
  margin: 0 auto;
  width: 15%;
  height: 15%;
  background-color: #ffffff;
  border-radius: 100%;
}

.ch-loading-circle .ch-circle2 {
  transform: rotate(30deg);
}

.ch-loading-circle .ch-circle3 {
  transform: rotate(60deg);
}

.ch-loading-circle .ch-circle4 {
  transform: rotate(90deg);
}

.ch-loading-circle .ch-circle5 {
  transform: rotate(120deg);
}

.ch-loading-circle .ch-circle6 {
  transform: rotate(150deg);
}

.ch-loading-circle .ch-circle7 {
  transform: rotate(180deg);
}

.ch-loading-circle .ch-circle8 {
  transform: rotate(210deg);
}

.ch-loading-circle .ch-circle9 {
  transform: rotate(240deg);
}

.ch-loading-circle .ch-circle10 {
  transform: rotate(270deg);
}

.ch-loading-circle .ch-circle11 {
  transform: rotate(300deg);
}

.ch-loading-circle .ch-circle12 {
  transform: rotate(330deg);
}

@-webkit-keyframes ch-circleFadeDelay {
  0%,
  39%,
  100% {
    opacity: 0;
  }

  40% {
    opacity: 1;
  }
}

@keyframes ch-circleFadeDelay {
  0%,
  39%,
  100% {
    opacity: 0;
  }

  40% {
    opacity: 1;
  }
}

.ch-loading-circle .ch-circle:before {
  animation: ch-circleFadeDelay 1.2s infinite ease-in-out both;
}

.ch-loading-circle .ch-circle2:before {
  animation-delay: -1.1s;
}

.ch-loading-circle .ch-circle3:before {
  animation-delay: -1s;
}

.ch-loading-circle .ch-circle4:before {
  animation-delay: -0.9s;
}

.ch-loading-circle .ch-circle5:before {
  animation-delay: -0.8s;
}

.ch-loading-circle .ch-circle6:before {
  animation-delay: -0.7s;
}

.ch-loading-circle .ch-circle7:before {
  animation-delay: -0.6s;
}

.ch-loading-circle .ch-circle8:before {
  animation-delay: -0.5s;
}

.ch-loading-circle .ch-circle9:before {
  animation-delay: -0.4s;
}

.ch-loading-circle .ch-circle10:before {
  animation-delay: -0.3s;
}

.ch-loading-circle .ch-circle11:before {
  animation-delay: -0.2s;
}

.ch-loading-circle .ch-circle12:before {
  animation-delay: -0.1s;
}
</style>