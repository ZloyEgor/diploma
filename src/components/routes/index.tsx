import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SearchView } from '../../views/search-sense';
import { AppLayout } from '../app-layout';
import { GraphExample } from '../example';

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index path="/sense" element={<SearchView />} />
        <Route path="*" element={<GraphExample />} />
      </Route>
      <Route path="*" element={<>404 not found</>} />
    </Routes>
  );
};
