import { FC } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { SearchView } from '../../views/search';

export const RouterRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<SearchView />} />
        <Route path="/test" element={'test'} />
        <Route path="*" element={<>Hello</>} />
      </Route>
    </Routes>
  );
};
