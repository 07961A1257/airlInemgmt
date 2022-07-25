import * as React from 'react';
// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'passenger list',
    path: '/passenger-list',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'ancillary services',
    path: '/ancillary-services',
    icon: getIcon('icons8:services')
  },
  {
    title: 'check in',
    path: '/check-in',
    icon: getIcon('icon-park-outline:check-in')
  },
  {
    title: 'in flight',
    path: '/in-flight',
    icon: getIcon('tabler:plane-inflight')
  }
  // {
  //   title: 'logout',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill')
  // }
];

export default navConfig;
