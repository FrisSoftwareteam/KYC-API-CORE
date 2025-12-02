import { lazyImport } from '@/utils/lazyImports';
import { Outlet, RouteObject } from 'react-router-dom';
import Layout from '../components/Layout';
import { RouteError } from '@/components/error/ErrorElement';
const { Login } = lazyImport(() => import('../components/Login'), 'Login');
const { Signup } = lazyImport(() => import('../components/Signup'), 'Signup');
const { CompleteRegistration } = lazyImport(
  () => import('../components/CompleteRegistration'),
  'CompleteRegistration'
);
const { ForgetPassword } = lazyImport(
  () => import('../components/ForgotPassword'),
  'ForgetPassword'
);
const { ResetPassword } = lazyImport(
  () => import('../components/ResetPassword'),
  'ResetPassword'
);

export const AuthRouteList: RouteObject[] = [
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
  {
    path: 'complete-registration',
    element: <CompleteRegistration />,
  },
  {
    path: 'forgot-password',
    element: <ForgetPassword />,
  },
  {
    path: 'reset-password',
    element: <ResetPassword />,
  },
];

const LandingPagesRouteOutlet = (
  <Layout>
    <Outlet />
  </Layout>
);
export const AuthRoutes: RouteObject = {
  path: '',
  element: LandingPagesRouteOutlet,
  errorElement: <RouteError />,
  children: AuthRouteList,
};
