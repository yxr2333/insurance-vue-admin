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
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '控制台', icon: 'dashboard' }
    }]
  },
  {
    path: '/info',
    component: Layout,
    name: 'Info',
    meta: {
      title: '数据管理',
      icon: 'peoples'
    },
    children: [
      {
        path: 'userControl',
        component: () => import('@/views/user'),
        name: 'Control',
        meta: {
          title: '用户管理',
          icon: 'el-icon-user'
        }
      },
      {
        path: 'productControl',
        component: () => import('@/views/product'),
        name: 'Product',
        meta: {
          title: '保险产品管理',
          icon: 'el-icon-shopping-cart-2'
        }
      },
      // {
      //   path: 'permissionControl',
      //   component: () => import('@/views/permission'),
      //   name: 'Permission',
      //   meta: {
      //     title: '权限信息管理',
      //     icon: 'el-icon-star-on'
      //   }
      // },
      // {
      //   path: 'roleControl',
      //   component: () => import('@/views/role'),
      //   name: 'Role',
      //   meta: {
      //     title: '用户角色管理',
      //     icon: 'el-icon-s-check'
      //   }
      // },
      {
        path: 'carouselControl',
        component: () => import('@/views/carousel'),
        name: 'Carousel',
        meta: {
          title: '轮播图信息管理',
          icon: 'el-icon-s-data'
        },
      },
      {
        path: 'categoryControl',
        component: () => import('@/views/category'),
        name: "Category",
        meta: {
          title: '保险分类管理',
          icon: 'el-icon-notebook-2'
        }
      }
    ]
  },
  {
    path: '/mail',
    component: Layout,
    name: 'Mail',
    meta: {
      title: '邮件管理',
      icon: 'email'
    },
    children: [
      {
        path: 'send',
        component: () => import('@/views/mail'),
        name: 'Mail',
        meta: {
          title: '发送邮件',
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
      title: '服务器管理',
      icon: 'el-icon-edit'
    },
    children: [
      {
        path: 'connect',
        component: () => import('@/views/ssh'),
        name: 'SSH',
        meta: {
          title: '连接服务器终端',
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
      title: '任务管理',
      icon: 'el-icon-s-opportunity'
    },
    children: [
      {
        path: 'cron',
        component: () => import('@/views/cron'),
        name: 'Cron',
        meta: {
          title: '定时任务',
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
