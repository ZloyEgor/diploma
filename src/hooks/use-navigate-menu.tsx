import { useLocation, useNavigate } from 'react-router-dom';
import { MenuItem } from '../types/menu-item.ts';

export type NavigateMenuItem = MenuItem & {
  to: string;
};

export const useNavigateMenu = (items: NavigateMenuItem[]): MenuItem[] => {
  const navigate = useNavigate();

  const location = useLocation();

  // @ts-ignore
  return items.map(({ to, onClick, ...rest }) => ({
    ...rest,
    onClick: (...args) => {
      onClick?.(...args);
      navigate({ pathname: to, search: location.search });
    },
  }));
};
