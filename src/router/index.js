import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/LoginView.vue";
import store from "@/store";
import AppLayout from "@/views/AppLayout.vue";

// const authUserRole = "Admin";
const authUserRole = store.state.auth.user.role;
console.log(authUserRole);
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "appLayout",
      component: AppLayout,
      meta: {
        middleware: "auth",
        title: ``,
      },
      children: [
        {
          path: "/home",
          name: "home",
          meta: {
            middleware: "auth",
            title: `Home`,
          },
          component: () => import(`../views/${authUserRole}/HomeView.vue`),
        },
        {
          path: "/employee",
          name: "employee",
          meta: {
            middleware: "auth",
            title: `Employee`,
          },
          component: () => import("../views/employee/EmployeeView.vue"),
        },
        {
          path: "/timberCutting",
          name: "timberCutting",
          meta: {
            middleware: "auth",
            title: `Timber Cutting Management`,
          },
          component: () => import("../views/TimberCutting/HomeView.vue"),
        },
        {
          path: "/timberCuttingApplication",
          name: "timberCuttingApplication",
          meta: {
            middleware: "auth",
            title: `Timber Cutting Application`,
          },
          component: () =>
            import(`../views/Admin/TimberCuttingApplicationView.vue`),
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      meta: {
        middleware: "auth",
        title: `About`,
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        middleware: "guest",
        title: `Login`,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;

  if (to.meta.middleware === "auth" && !store.state.auth.authenticated) {
    next({ name: "login" });

    return;
  }

  if (to.meta.middleware === "guest" && store.state.auth.authenticated) {
    next({ name: "home" });

    return;
  }

  next();
});

export default router;
