import { component } from '../../utils/component.tsx';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import style from './layout.module.scss';
import { Console } from '../console';

const { Header, Footer, Sider, Content } = Layout;

export const AppLayout = component(() => (
  <Layout>
    <Sider width="15%">Sider</Sider>
    <Layout className={style.container}>
      <Header className={style.header}>Схема запроса</Header>
      <Content className={style.content}>
        <Outlet />
      </Content>
      <Footer className={style.footer}>
        <Console />
      </Footer>
    </Layout>
  </Layout>
));
