import { TRoute, TUserPath } from '@/types';

export const routerGenerator = (Items: TUserPath[]) => {
  const router = Items.reduce((acc: TRoute[], item) => {
    if (item.path || item.index) {
      acc.push({
        path: item.path!,
        element: item.element,
      });
    }

    if (item.children) {
      item.children.forEach(child => {
        acc.push({
          path: child.path!,
          element: child.element,
        });
      });
    }

    return acc;
  }, []);
  return router;
};
