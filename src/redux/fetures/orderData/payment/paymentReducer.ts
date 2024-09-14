/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction } from 'redux';

interface PaymentState {
  loading: boolean;
  success: boolean;
  error: string | null;
  amount: number;
}

const initialState: PaymentState = {
  loading: false,
  success: false,
  error: null,
  amount: 5000, // Example: fixed amount of $50.00 (5000 cents)
};

type PaymentAction =
  | { type: 'PAYMENT_REQUEST' }
  | { type: 'PAYMENT_SUCCESS'; payload: any }
  | { type: 'PAYMENT_ERROR'; payload: string };

export const paymentReducer = (
  state = initialState,
  action: PaymentAction | AnyAction, // Now it can handle AnyAction as well
): PaymentState => {
  switch (action.type) {
    case 'PAYMENT_REQUEST':
      return { ...state, loading: true };
    case 'PAYMENT_SUCCESS':
      return { ...state, loading: false, success: true };
    case 'PAYMENT_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state; // Always return the current state for unknown actions
  }
};
