module.exports = {
  // 主题相关
  title: '我是好孩子的主页',
  description: '欢迎访问我的主页',

  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    // 增加一个自定义的 favicon(网页标签的图标)
    ['link', { rel: 'icon', href: '/logo.jpg' }],
  ],

  // 这是部署到github相关的配置
  base: '/',

  // 服务器监听配置
  host: '0.0.0.0',
  port: 80,

  // 代码块显示行号
  markdown: {
    lineNumbers: true
  },

  themeConfig: {
    // 导航栏配置
    nav:[
      {text: '博客', link: '/blog/' },
      {text: '算法和数据结构', link: '/algo-data/' },
      {text: 'Go', link: '/go/' },
      {text: '区块链', link: '/block-chain/'},
      {text: 'Github', link: 'https://github.com/wshhz'},
      {text: '关于', link: '/about/about'}
    ],

    // 侧边栏
    sidebar: {
      '/blog/': require('../blog/sidebar'),
      '/block-chain/': require('../block-chain/sidebar'),
      '/algo-data/': require('../algo-data/sidebar'),
      '/go/': require('../go/sidebar')
    }
  }
};