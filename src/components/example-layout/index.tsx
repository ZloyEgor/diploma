import { component } from '../../utils/component.tsx';
import { Layout } from 'antd';
import style from './layout.module.scss';
import { Console } from '../console';
import { WithChildren } from '../../utils/props.ts';

const { Header, Footer, Sider, Content } = Layout;

export const ExampleLayout = component<WithChildren>(({ children }) => (
  <Layout>
    <Sider width="15%">Sider</Sider>
    <Layout className={style.container}>
      <Header className={style.header}>Discover database</Header>
      <Content className={style.content}>{children}</Content>
      <Footer className={style.footer}>
        <Console />
      </Footer>
    </Layout>
  </Layout>
));
