<template>
  <img v-if="imagePrefix" :src="src" @error="onError">
</template>
<script>
  let isAbsolutePath = (url) => /^(https?:)?\/\//.test(url)
  let shortCutReg = /\/\/\b([-\w]+)\b/
  export default {
    props: {
      url: {
        type: String,
        validator (value) {
          if (value) {
            return isAbsolutePath(value)
          }
          return true
        }
      },
      fid: {
        type: String
      },
      size: {
        type: String,
        default: 'sm'
      }
    },
    computed: {
      index () {
        return this.sizeArr.indexOf(this.sizeShortcut)
      },
      src () {
        return this.url ? this.url.replace(shortCutReg, this.imagePrefix) : `//${this.imagePrefix}.micoworld.net/${this.fid}`
      },
      imagePrefix () {
        return this.sizeMapping[this.sizeShortcut]
      }
    },
    methods: {
      onError () {
        if (this.index >= 0) {
          let nextIndex = this.index + 1
          this.sizeShortcut = this.sizeArr[nextIndex]
        }
      },
      arr2obj (arr = []) {
        return arr.reduce((prev, [key, value]) => (Object.assign(prev, {[key]: value})), {})
      }
    },
    data () {
      const sizes = [
        ['sm', 'thumbnail-small'],
        ['md', 'thumbnail-middle'],
        ['lg', 'thumbnail-large'],
        ['origin', 'image']
      ]
      let matches = this.url ? this.url.match(shortCutReg) : null
      let sizeMapping = this.arr2obj(sizes)
      let sizeReverseMapping = this.arr2obj(sizes.map(([value, key]) => [key, value]))
      return {
        sizeShortcut: matches ? sizeReverseMapping[matches[1]] : this.size,
        sizeArr: sizes.map(size => size[0]),
        sizeMapping
      }
    }
  }
</script>
