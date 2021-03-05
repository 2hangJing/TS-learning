<template>
  <img :src="'https://'+imgPrefix+'.waka.media/' + fid" @click="bindClick ? userGo(jumpCode) : ''">
</template>
<script>
let isAbsolutePath = url => /^(https?:)?\/\//.test(url);
let shortCutReg = /\/\/\b([-\w]+)\b/;
export default {
  name: "img-avatar",
  props: {
    url: {
      type: String,
      validator(value) {
        if (value) {
          return isAbsolutePath(value);
        }
        return true;
      }
    },
    fid: {
      type: String
    },
    size: {
      type: String,
      default: "sm"
    },
    bindClick: {
      type: Boolean,
      default: false
    },
    jumpCode: {
      type: Object
    }
  },
  data() {
    return {
      imgPrefix: ""
    };
  },
  mounted() {
    // 测试：http://www-test.waka.media/
    // 正式：http://www.waka.media/

    let hostname = window.location.hostname;
    this.imgPrefix = (hostname == "www.waka.media" || hostname == "www.yoho.media") ? "cdn" : "cdntest";
  },
  methods: {
    userGo(jumpCode) {
      console.log(
        "%c --Msg1--",
        "color:#fff; background:purple",
        "uid:",
        jumpCode.uid,
        "liveStatus:",
        jumpCode.liveStatus
      );
      let url,
        profile_url = "wakaweb://waka.media/profile?uid=" + jumpCode.uid,
        live_url = "wakaweb://waka.media/audio_live?uid=" + jumpCode.uid;

      url = jumpCode.liveStatus ? live_url : profile_url;

      location.href = url;
      console.log(
        "%c --Msg2--",
        "color:grey;background:orange",
        "location.href:",
        url
      );
    }
  }
};
</script>
