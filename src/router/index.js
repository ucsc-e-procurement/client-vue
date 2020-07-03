import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

// Admin
import Admin from "../views/admin/Admin.vue";
import Admin_Dashboard from "../views/admin/Dashboard.vue";
import Admin_Procurements_Ongoing from "../views/admin/Procurements_Ongoing.vue";
import Admin_Procurements_Terminated from "../views/admin/Procurements_Terminated.vue";
import Admin_Procurements_Completed from "../views/admin/Procurements_Completed.vue";
import Admin_Pending_Approvals from "../views/admin/Pending_Approvals.vue";
import Admin_Procurement_Overview from "../views/admin/Procurement_Overview.vue";

// Director

/* Remove These Routes in Production Mode Before Deployment  */
// Example Pages - For Developer Purposes Only
import Example_Form from "../../templates/Example_Form.vue";
import Grid_System from "../../templates/Grid_System.vue";

// Login
import Login from "../views/login/Login.vue";
import Home from "../views/home/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },

  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // },

  // Admin
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    children: [
      {
        path: "",
        name: "default",
        component: Admin_Dashboard,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "ongoing_procurements",
        name: "ongoing procurements",
        component: Admin_Procurements_Ongoing
      },
      {
        path: "terminated_procurements",
        name: "terminated procurements",
        component: Admin_Procurements_Terminated
      },
      {
        path: "completed_procurements",
        name: "completed procurements",
        component: Admin_Procurements_Completed
      },
      {
        path: "pending_approvals",
        name: "pending approvals",
        component: Admin_Pending_Approvals
      },
      {
        path: "procurement_overview/:encodedProcurementId",
        name: "procurement overview",
        component: Admin_Procurement_Overview,
        props: true
      },
      // TODO Redirect to Page Not Found Or Dashborad
      { path: '*', redirect: '/' }
    ]
  },

  // Head of Department

  // Development Perposes Only - Remove these routes before final Production Deployment
  {
    path: "/dev",
    name: "admin",
    component: Admin,
    children: [
      {
        path: "example_form",
        name: "form page",
        component: Example_Form,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "grid_system",
        name: "grid page",
        component: Grid_System
      }
    ]
  },
  { path: '*', redirect: '/' }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
