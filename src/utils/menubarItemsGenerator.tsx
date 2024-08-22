import { TMenubarItem, TUserPath } from '@/types';
import { NavLink } from 'react-router-dom';

export const menubaeItemGenerator = (items: TUserPath[]) => {
  const menubarItems = items.reduce((acc: TMenubarItem[], item) => {
    if ((item.path || item.index) && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map(child => ({
          key: child.name,
          label: <NavLink to={`/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }
    return acc;
  }, []);
  return menubarItems;
};
