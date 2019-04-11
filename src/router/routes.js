export const _import = file => resolve => require([`@/views/${file}`], resolve)

export default [
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: '/home',
    name: 'Home',
    component: _import('home/Home'),
    meta: {
      title: '首页',
      keepAlive: true
    }
  },
  {
    path: '*',
    component: resolve => require(['@/components/error/error-notfound'], resolve)
  }
]
