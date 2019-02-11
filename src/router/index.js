import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Stats from '@/components/Stats';
import PollSummary from '@/components/PollSummary';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/stats/:doc_id',
      name: 'Stats',
      component: Stats
    },
    {
      path: '/poll-summary',
      name: 'PollSummary',
      component: PollSummary
    }
  ]
});
