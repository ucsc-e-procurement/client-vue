import Vue from "vue";
import VueRouter from "vue-router";

// Admin
import Admin from "../views/admin/Admin.vue";
import Admin_Dashboard from "../views/admin/Dashboard.vue";

// Head of department
import HOD from "../views/head_of_department/Head_Of_Department.vue";
import HOD_Dashboard from "../views/head_of_department/Dashboard.vue";
import HOD_New_Proc from "../views/head_of_department/New_Procurement.vue";

// Deputy Bursar
import Deputy_Bursar from "../views/deputy_bursar/DeputyBursar"
import View_Product_Requisition from "../views/deputy_bursar/ViewProductRequisition"
import Deputy_Bursar_Dashboard from "../views/deputy_bursar/Dashboard"
import Product_Requisitions from "../views/deputy_bursar/ProductRequisitions"

/* Remove These Routes in Production Mode Before Deployment  */
// Example Pages - For Developer Purposes Only
import Example_Form from "../../templates/Example_Form.vue";
import Grid_System from "../../templates/Grid_System.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    // component:
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
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    children: [
      {
        path: "",
        name: "default",
        component: Admin_Dashboard,
      },
    ],
  },

  {
    path: "/hod",
    name: "head of department",
    component: HOD,
    children: [
      {
        path: "",
        name: "default",
        component: HOD_Dashboard,
      },
      {
        path: "newproc",
        name: "New Procurement",
        component: HOD_New_Proc,
      },
    ],
  },

  {
    path: "/deputy_bursar",
    name: "deputy_bursar",
    component: Deputy_Bursar,
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
],

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
  routes,
});

export default router;