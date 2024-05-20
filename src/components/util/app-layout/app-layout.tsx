import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import style from './app-layout.module.scss';
import {
  NavigateMenuItem,
  useNavigateMenu,
} from '../../../hooks/use-navigate-menu.ts';

const navigateMenuItems: NavigateMenuItem[] = [
  {
    key: '1',
    label: 'Поиск понятий',
    to: '/sense',
  },
  {
    key: '2',
    label: 'Пример визуализации',
    to: '/example',
  },
];

export const AppLayout: FC = () => {
  const menuItems = useNavigateMenu(navigateMenuItems);

  return (
    <div className={style.appLayout}>
      <Layout.Header className={style.appLayoutHeader}>
        <h2>Визуализатор семантической сети</h2>
      </Layout.Header>
      <Menu
        className={style.appLayoutMenu}
        items={menuItems}
        selectable={false}
      />
      <div className={style.appLayoutOutlet}>
        <Outlet />
      </div>
    </div>
  );
};
