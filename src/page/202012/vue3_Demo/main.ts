import { createApp } 		from 'vue';
import App 		from './app.vue';
import router   from './router/index';
let app = createApp(App);

let rootDom: Element = document.createElement('div');
document.body.appendChild(rootDom);

app.use(router).mount(rootDom);
