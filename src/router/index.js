import Vue from "vue";
import VueRouter from "vue-router";

// Admin
import Admin from "../views/admin/Admin.vue";
import Admin_Dashboard from "../views/admin/Dashboard.vue";

//Supplier
import Supplier from "../views/supplier/Supplier.vue";
import Supplier_Dashboard from "../views/supplier/Dashboard.vue";

/* Remove These Routes in Production Mode Before Deployment  */
// Example Pages - For Developer Purposes Only
import Example_Form from "../../templates/Example_Form.vue";
import Grid_System from "../../templates/Grid_System.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home"
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
        component: Admin_Dashboard
      }
    ]
  },

  //supplier route
  {
    path: "/supplier",
    name: "supplier",
    component: Supplier,
    children: [
      {
        path: "",
        name: "default",
        component: Supplier_Dashboard
      }
    ]
  },

  // Development Perposes Only - Remove these routes before final Production Deployment
  {
    path: "/dev",
    name: "admin",
    component: Admin,
    children: [
      {
        path: "example_form",
        name: "form page",
        component: Example_Form
      },
      {
        path: "grid_system",
        name: "grid page",
        component: Grid_System
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
