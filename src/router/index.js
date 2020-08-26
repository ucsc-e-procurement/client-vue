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
import Admin_View_Suppliers from "../views/admin/View_Suppliers.vue";
import Admin_View_Users from "../views/admin/Users.vue";
import Admin_Products from "../views/admin/Products.vue";
import Admin_Purchase_Order from "../views/admin/Purchase_Order.vue";
import Admin_Requisitions from "../views/admin/Requisitions.vue";
import Admin_View_Requisition from "../views/admin/View_Requisition.vue";
import Add_Signature from "../views/admin/Add_Signature.vue";
import Bidding_Doc_Data_Sheet from "../views/admin/components/Bidding_Doc_Data_Sheet.vue";
import Admin_Add_User from "../views/admin/Add_User.vue";

// Head of department
import HOD from "../views/head_of_department/Head_Of_Department.vue";
import HOD_Dashboard from "../views/head_of_department/Dashboard.vue";
import HOD_New_Proc from "../views/head_of_department/New_Procurement.vue";

// Deputy Bursar
import Deputy_Bursar from "../views/deputy_bursar/DeputyBursar";
import View_Product_Requisition from "../views/deputy_bursar/ViewProductRequisition";
import Deputy_Bursar_Dashboard from "../views/deputy_bursar/Dashboard";
import Product_Requisitions from "../views/deputy_bursar/ProductRequisitions";

//Supplier
import Registration from "../views/supplier/Registration.vue";
import Supplier from "../views/supplier/Supplier.vue";
import Supplier_Dashboard from "../views/supplier/Dashboard.vue";
import Supplier_Procurements from "../views/supplier/Procurements.vue";
import Price_Schedule from "../views/supplier/PriceSchedule.vue";
import Purchases from "../views/supplier/Purchases.vue";

//Employee
import Employee from "../views/employee/Employee.vue";
import Employee_Dashboard from "../views/employee/Dashboard.vue";
import Employee_Tec_team_procurements from "../views/employee/Tec_team.vue";
// import Employee_Bid_Opening_Team from "../views/employee/Bid_Opening_Team.vue"

import Employee_spec_sheet from "../views/employee/Spec_Sheet.vue";
import Employee_Procurement from "../views/employee/Tec_team_procurment.vue"
import Employee_Tec_teams from "../views/employee/Tec_team_teams.vue"


// Director
import Director from "../views/director/Director.vue";
import Director_Dashboard from "../views/director/Dashboard.vue";
import Director_Procurements from "../views/director/Procurements.vue";
import Director_Requests from "../views/director/Requests.vue";
import Requisitions from "../views/director/Requisitions.vue";
import Director_Shopping_Procurement_Stepper from "../views/director/ProcurementStepperShopping.vue";
import Director_Direct_Procurement_Stepper from "../views/director/ProcurementStepperDirect.vue";
import AcceptRequisitionRequest from "../views/director/AcceptRequisitionRequest.vue";
import Director_Notifications from "../views/director/Notifications";
import Director_Supplier_List from "../views/director/SupplierList.vue";
import Director_Supplier_Details from "../views/director/SupplierDetails.vue";

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
  {
    path: "/registration",
    name: "Registration",
    component: Registration
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
          requiresAuth: false
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
      {
        path: "suppliers",
        name: "view all suppliers",
        component: Admin_View_Suppliers,
        props: true
      },
      {
        path: "users",
        name: "view all users",
        component: Admin_View_Users,
        props: true
      },
      {
        path: "products",
        name: "view all products",
        component: Admin_Products,
        props: true
      },
      {
        path: "purchase_order",
        name: "generate purchase order",
        component: Admin_Purchase_Order,
        props: true
      },
      {
        path: "requisitions",
        name: "view all products requisitions",
        component: Admin_Requisitions,
        props: true
      },
      {
        path: "requisition/:encodedRequisitionId",
        name: "view products requisition",
        component: Admin_View_Requisition,
        props: true
      },
      {
        path: "signature/add",
        component: Add_Signature
      },
      {
        path: "add_user",
        component: Admin_Add_User
      },
      // Developmnet Purposes Only
      { path: "test", component: Bidding_Doc_Data_Sheet },
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
        component: Director_Procurements
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
        path: "requisition/view",
        name: "d_req_accept",
        component: AcceptRequisitionRequest
      },
      {
        path: "requisitions/:id",
        name: "d_reqi",
        component: Requisitions
      },
      {
        path: "notifications",
        name: "d_notif",
        component: Director_Notifications
      },
      {
        path: "suppliers",
        name: "d_sup",
        component: Director_Supplier_List
      },
      {
        path: "suppliers/:id",
        name: "d_sup_d",
        component: Director_Supplier_Details
      }
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
    path: "/supplier",
    name: "supplier",
    component: Supplier,
    children: [
      {
        path: "",
        name: "default",
        component: Supplier_Dashboard
      },
      {
        path: "price_schedule/:procurement",
        name: "price_schedule",
        component: Price_Schedule,
        props: true
      },
      {
        path: "procurements",
        name: "procurements",
        component: Supplier_Procurements,
        children: []
      },
      {
        path: "purchases",
        name: "purchases",
        component: Purchases
      }
    ]
  },

  //employee routes
  {
    path: "/employee",
    name: "employee",
    component: Employee,
    children: [
      {
        path: "",
        name: "default",
        component: Employee_Dashboard
      },
      {
        path: "procurements",
        name: "procurements",
        component: Employee_Tec_team_procurements
      },
      {
        path: "tecteams",
        name: "tecteams",
        component: Employee_Tec_teams
      },
      // {
      //   path: "bidopeningteam",
      //   name: "bigopeningteam",
      //   component: Employee_Bid_Opening_Team
      // },
      {
        path: "specsheet",
        name: "specsheet",
        component: Employee_spec_sheet
      },
      {
        path: "tecteam/procurement/:id",
        name: "procurement",
        component: Employee_Procurement
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
        component: Director_Dashboard
      },
      {
        path: "product_requisitions",
        component: Product_Requisitions
      },
      {
        path: "view_product_requisition/:id",
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
