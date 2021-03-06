import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [

  {
    path: '/',
    redirect: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/header',
    component: Layout,
    children: [{
      component: () => import('@/components/MenuBarHeader/index'),
      path: 'header',
      name: 'Header'
    }]
  },
  {
    path: '/dashboard',
    component: Layout,
    children: [{
      path: '',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '?????????', icon: 'dashboard' }
    }]
  },
  {
    path: '/info',
    component: Layout,
    name: 'Info',
    meta: {
      title: '????????????',
      icon: 'peoples'
    },
    children: [
      {
        path: 'userControl',
        component: () => import('@/views/user'),
        name: 'Control',
        meta: {
          title: '????????????',
          icon: 'el-icon-user'
        }
      },
      {
        path: 'productControl',
        component: () => import('@/views/product'),
        name: 'Product',
        meta: {
          title: '??????????????????',
          icon: 'el-icon-shopping-cart-2'
        }
      },
      {
        path: 'carouselControl',
        component: () => import('@/views/carousel'),
        name: 'Carousel',
        meta: {
          title: '?????????????????????',
          icon: 'el-icon-s-data'
        },
      },
      {
        path: 'categoryControl',
        component: () => import('@/views/category'),
        name: "Category",
        meta: {
          title: '??????????????????',
          icon: 'el-icon-notebook-2'
        }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    name: 'Order',
    meta: {
      title: '????????????',
      icon: 'el-icon-eleme',
    },
    children: [
      {
        path: 'control',
        component: () => import('@/views/order'),
        name: 'Control',
        meta: {
          title: '????????????',
          icon: 'el-icon-s-order'
        }
      },
      {
        path: 'audit',
        component: () => import('@/views/order/Audit'),
        name: 'Audit',
        meta: {
          title: '????????????',
          icon: 'audit'
        }
      },
      {
        path: 'deliver',
        component: () => import('@/views/order/Deliver'),
        name: 'Deliver',
        meta: {
          title: '????????????',
          icon: 'el-icon-truck'
        }
      }
    ]
  },
  {
    path: '/logger',
    component: Layout,
    name: 'Logger',
    meta: {
      title: '????????????',
      icon: 'nested'
    },
    children: [
      {
        path: 'online',
        component: () => import('@/views/logger/Online'),
        name: 'Online',
        meta: {
          title: '????????????',
          icon: 'wechat'
        }
      },
      {
        path: 'logger',
        component: () => import('@/views/logger/Logger'),
        name: 'Logger',
        meta: {
          title: '????????????',
          icon: 'documentation'
        }
      }
    ]
  },
  {
    path: '/mail',
    component: Layout,
    name: 'Mail',
    meta: {
      title: '????????????',
      icon: 'email'
    },
    children: [
      {
        path: 'send',
        component: () => import('@/views/mail'),
        name: 'Mail',
        meta: {
          title: '????????????',
          icon: 'el-icon-s-promotion'
        }
      },
      {
        path: ''
      }
    ]
  },
  {
    path: '/ssh',
    component: Layout,
    name: 'SSH',
    meta: {
      title: '???????????????',
      icon: 'el-icon-edit'
    },
    children: [
      {
        path: 'connect',
        component: () => import('@/views/ssh'),
        name: 'SSH',
        meta: {
          title: '?????????????????????',
          icon: 'el-icon-s-platform'
        },
      },
      {
        path: ''
      }
    ]
  },
  {
    path: '/job',
    component: Layout,
    name: 'Job',
    meta: {
      title: '????????????',
      icon: 'el-icon-s-opportunity'
    },
    children: [
      {
        path: 'cron',
        component: () => import('@/views/cron'),
        name: 'Cron',
        meta: {
          title: '????????????',
          icon: 'el-icon-date'
        }
      },
      {
        path: ''
      }

    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
