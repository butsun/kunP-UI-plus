import RegionSelect from './RegionSelect.vue';

// 导出组件
export { RegionSelect };

// 导出默认对象用于全局注册
export default {
  install: (app: any) => {
    app.component('RegionSelect', RegionSelect);
  }
};
