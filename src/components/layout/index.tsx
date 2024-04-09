import { component } from '../../utils/component.tsx';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import style from './layout.module.scss';

const { Header, Footer, Sider, Content } = Layout;

export const AppLayout = component(() => (
  <Layout>
    <Sider width="15%">Sider</Sider>
    <Layout>
      <Header className={style.header}>Header</Header>
      <Content className={style.content}>
        <Outlet />
      </Content>
      <Footer className={style.footer}>
        <>Footer</>
      </Footer>
    </Layout>
  </Layout>
));
