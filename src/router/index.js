import Vue from "vue";
import VueRouter from "vue-router";

// Admin
import Admin from "../views/admin/Admin.vue";
import Admin_Dashboard from "../views/admin/Dashboard.vue";

// Director
import Director from "../views/director/Director.vue";
import Director_Dashboard from "../views/director/Dashboard.vue";
import Director_Procurements from "../views/director/Procurements.vue";
import Director_Requests from "../views/director/Requests.vue";
import Requisitions from "../views/director/Requisitions.vue";
import Director_Procurement_Stepper from '../views/director/ProcurementStepper.vue'

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
        path: "procurements/:id",
        name: "d_proc_stepper",
        component: Director_Procurement_Stepper
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
