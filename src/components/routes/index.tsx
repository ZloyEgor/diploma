import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppLayout } from '../layout';
import { Example } from '../example';

export const RouterRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Example />} />
        <Route path="/test" element={'test'} />
        <Route path="*" element={<>Hello</>} />
      </Route>
    </Routes>
  );
};
