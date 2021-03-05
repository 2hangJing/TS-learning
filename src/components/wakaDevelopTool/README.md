<!--
 * @Author: monai
 * @Date: 2020-07-01 11:42:22
 * @LastEditors: monai
 * @LastEditTime: 2020-10-19 15:15:44
-->
## waka 常用组件封装

### 2020/10/19 改动
1. Vue.use 安装插件时有改动，详细看使用方法。
2. 集成了翻译文案接口、规则页接口，详细看使用方法。
3. 新 mixin 了一个 computed：RULE。
4. 旧项目重新编译时需要修改 Vue.use 安装部分，否则报错。

### 说明
wakaDevelopTool 是 waka 活动项目常用开发组件、httpclient、多语言文本等集合。

### 详细
按照 `src/components/wakaDevelopTool/index.js` 初始化顺序具体方法作用如下：

1. init_component：全局注册组件。cdnImg 组件（stable-img.vue）与 `src/components/stable-img/index.vue` 完全相同，只是注册了全局组件。
2. init_loading：全局loading挂载。loading 组件（loading.vue）与 `src/components/load/chLoading.vue` 完全相同，只是封装了安装与全局调用方法。
3. init_directive：自定义指令。目前只封装了一个客户端跳转交互 v-jump。
4. init_language：多语言初始化。
5. init_axios：axios 挂载。

### 使用方法
1. 引用与安装：
```javascript
//  引入
import wakaDevelopTool from 'publicComponents/wakaDevelopTool/index.js';
import language from 'xxx/language.json';

//  2020/10/19 改动
//  1. 传入 JSON 安装方法
Vue.use(wakaDevelopTool, {type: 'json', json: language});
//  2. 使用翻译接口安装方法
Vue.use(wakaDevelopTool, {type: 'ajax', activityId: 10000});
//  2.1 默认使用当前 URL 挂载的 lang 参数，如果想强制使用一个国家文案传入 country 字段
Vue.use(wakaDevelopTool, {type: 'ajax', activityId: 10000, country: 'TH'});
//  2.2 可以不传 type，默认值 ajax
Vue.use(wakaDevelopTool, {activityId: 10000});
```

2. 调用方法：

**v-jump**
```html
<!-- 点击跳转指令绑定，参数为 Object，包含 uid、liveStatus 两个字段 -->
<p v-jump="{uid: xx, liveStatus: xx}"></p>
```

**language**
```javascript
//  返回文本
this.TEXT;
//  返回国家
this.LANG;

//  2020/10/19 改动
//  如果使用 tyep: ajax 类型，还会返回 rule page
this.RULE;
```

**cdnImg**
```html
<!-- 点击跳转指令绑定，参数为 Object，包含 uid、liveStatus 两个字段 -->
<cdnImg :fid="xxx"></cdnImg>
```
<!-- 20201021 新增分页loading -->
**listPageLoading**
```html
<!--
    1.榜单列表 + 弹窗列表榜单 【页面含有分页需要loading处都可用】
    2.声明变量控制是否展示
    3.loading可设置颜色 【默认白色】

    **4.榜单列表外层容器需设置 position: relative;
-->
<listPageLoading v-if=" *** "></listPageLoading>

<!-- 设置分页loading颜色 -->
.ch-theLoadimg /deep/ span {
    background: #FFFFFF !important;
}
```

**loading**
```javascript
//  显示
this.$loadingShow();
//  关闭
this.$loadingClose();
```

**toast**
```javascript
//  显示
this.$toastShow();
//  关闭
this.$toastClose();

this.$toastShow();
可传入三个参数: position是toast提示框的位置(top,center.bottom),不传默认居中
                text是toast提示框的文案,不传默认SystemError
                size是toast尺寸
this.$toastShow('','',{width:'50vw',fontSize:'6vw'});

```

3. 实例参照 `/src/page/regular/weeklyCP` 项目。
