import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { component } from '../../utils/component.tsx';
import { WithChildren } from '../../utils/props.ts';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store.ts';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { QueryParamProvider } from 'use-query-params';

export const ThemeProvider = component<WithChildren>(({ children }) => {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <Router>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </QueryParamProvider>
      </Router>
    </Provider>
  );
});
