import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0 };
  },
  stringifyQuery: (query) => query.toString(),
});

router.beforeEach(async (to, _from, next) => {
  // Mark route navigation start time
  window.performance?.mark(`route-${to.name}-start`);
  next();
});

router.afterEach((to) => {
  // Measure route navigation performance
  if (window.performance) {
    window.performance.mark(`route-${to.name}-end`);
    window.performance.measure(
      `route-${to.name}`,
      `route-${to.name}-start`,
      `route-${to.name}-end`,
    );
  }
});
