import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SearchSensePage } from '../../pages/search-sense-page';
import { AppLayout } from '../util/app-layout';
import { GraphExample } from '../../pages/example';

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index path="/sense" element={<SearchSensePage />} />
        <Route path="*" element={<GraphExample />} />
      </Route>
      <Route path="*" element={<>404 not found</>} />
    </Routes>
  );
};
