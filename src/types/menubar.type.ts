import { ReactNode } from 'react';

export type TRoute = {
  path: string;
  element: ReactNode;
};
export type TMenubarItem = {
  key: string;
  label: ReactNode;
  children?: TMenubarItem[];
};

export type TUserPath = {
  name: string;
  path?: string;
  index?: boolean;
  element?: ReactNode;
  children?: TUserPath[];
};
