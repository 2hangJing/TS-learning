import Vue from 'vue';
import { createStore  } from 'vuex';
import module_home from './modules/home/state';
import plugin from './plugin';

const store = createStore({
    modules: {
        module_home,
    },
    plugins: [plugin]
});

export default store;