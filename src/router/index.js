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

// Head of department
import HOD from "../views/head_of_department/Head_Of_Department.vue";
import HOD_Dashboard from "../views/head_of_department/Dashboard.vue";
import HOD_New_Proc from "../views/head_of_department/New_Procurement.vue";

// Deputy Bursar
import Deputy_Bursar from "../views/deputy_bursar/DeputyBursar";
import View_Product_Requisition from "../views/deputy_bursar/ViewProductRequisition";
import Deputy_Bursar_Dashboard from "../views/deputy_bursar/Dashboard";
import Product_Requisitions from "../views/deputy_bursar/ProductRequisitions";

// Director
import Director from "../views/director/Director.vue";
import Director_Dashboard from "../views/director/Dashboard.vue";
import Director_Procurements from "../views/director/Procurements.vue";
import Director_Requests from "../views/director/Requests.vue";
import Requisitions from "../views/director/Requisitions.vue";
import Director_Shopping_Procurement_Stepper from '../views/director/ProcurementStepperShopping.vue'
import Director_Direct_Procurement_Stepper from '../views/director/ProcurementStepperDirect.vue'

/* Remove These Routes in Production Mode Before Deployment  */
// Example Pages - For Developer Purposes Only
// import Example_Form from "../../templates/Example_Form.vue";
// import Grid_System from "../../templates/Grid_System.vue";

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
      { path: "*", redirect: "/" }
    ]
  },

  // Director
  {
    path: "/director",
    name: "director",
    component: Director,
    children: [
      {
        path: "",
        name: "default",
        component: Director_Dashboard
      },
      {
        path: "procurements",
        name: "d_proc",
        component: Director_Procurements,
      },
      {
        path: "procurements/shopping/:id",
        name: "d_proc_stepper_shopping",
        component: Director_Shopping_Procurement_Stepper
      },
      {
        path: "procurements/direct/:id",
        name: "d_proc_stepper_direct",
        component: Director_Direct_Procurement_Stepper
      },
      {
        path: "requests",
        name: "d_req",
        component: Director_Requests
      },
      {
        path: "requisitions/:id",
        name: "d_reqi",
        component: Requisitions
      },
      
    ]
  },

  // Head of Department
  {
    path: "/hod",
    name: "head of department",
    component: HOD,
    children: [
      {
        path: "",
        name: "default",
        component: HOD_Dashboard
      },
      {
        path: "newproc",
        name: "New Procurement",
        component: HOD_New_Proc
      }
    ]
  },

  {
    path: "/deputy_bursar",
    name: "deputy_bursar",
    component: Deputy_Bursar,
    children: [
      {
        path: "",
        name: "default",
        component: Deputy_Bursar_Dashboard
      },
      {
        path: "/product_requisitions",
        component: Product_Requisitions
      },
      {
        path: "/view_product_requisition/:id",
        component: View_Product_Requisition,
        props: true
      }
    ]
  }
];

// Development Perposes Only - Remove these routes before final Production Deployment
//   {
//     path: "/dev",
//     name: "admin",
//     component: Admin,
//     children: [
//       {
//         path: "example_form",
//         name: "form page",
//         component: Example_Form,
//       },
//       {
//         path: "grid_system",
//         name: "grid page",
//         component: Grid_System,
//       },
//     ],
//   },
// ];

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
