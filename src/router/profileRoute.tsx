import ProtactRoute from '@/components/layout/protctedRoute/ProtactRoute';
import AccountDetails from '@/pages/profile/AccountDetails';
import OrderHistory from '@/pages/profile/OrderHistory';

export const profilePath = [
  {
    name: 'Account Details',
    path: 'account-details',
    element: (
      <ProtactRoute>
        <AccountDetails />
      </ProtactRoute>
    ),
  },

  {
    name: 'Order History',
    path: 'order-history',
    element: (
      <ProtactRoute>
        <OrderHistory />
      </ProtactRoute>
    ),
  },
];
