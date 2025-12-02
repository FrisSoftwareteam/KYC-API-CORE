import { RouteError } from '@/components/error/ErrorElement';
import { lazyImport } from '@/utils/lazyImports';
import { Outlet, RouteObject } from 'react-router-dom';

import Layout from '../features/layout/Layout';
import { ProtectedRoutes } from './protected';
import { Permissions } from '@/data/permission';

const { Home } = lazyImport(() => import('../features/overview/Home'), 'Home');
const { Agents } = lazyImport(
  () => import('../features/agents/Agents'),
  'Agents'
);
const { AgentById } = lazyImport(
  () => import('../features/agents/view-by-id/AgentById'),
  'AgentById'
);
const { Settings } = lazyImport(
  () => import('../features/settings/Settings'),
  'Settings'
);
const { Verifications } = lazyImport(
  () => import('../features/verifications/Verifications'),
  'Verifications'
);

const { VerificationDetails } = lazyImport(
  () =>
    import(
      '../features/verifications/verification-details/VerificationDetails'
    ),
  'VerificationDetails'
);

export const LandingPageRouteList: RouteObject[] = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: 'agents',
    element: (
      <ProtectedRoutes permission={Permissions.CAN_MANAGE_AGENTS}>
        <Agents />
      </ProtectedRoutes>
    ),
  },
  {
    path: 'agents/:id',
    element: <AgentById />,
  },

  {
    path: 'settings',
    element: <Settings />,
  },

  {
    path: 'verifications',
    element: <Verifications />,
  },
  {
    path: 'verifications/:id',
    element: (
      <ProtectedRoutes permission={Permissions.CAN_MANAGE_TASK}>
        <VerificationDetails />
      </ProtectedRoutes>
    ),
    // element: <VerificationDetails />,
  },
];

const LandingPageRouteOutlet = (
  <Layout>
    <Outlet />
  </Layout>
);
export const LandingPageRoutes: RouteObject = {
  path: '',
  element: LandingPageRouteOutlet,
  errorElement: <RouteError />,
  children: LandingPageRouteList,
};
