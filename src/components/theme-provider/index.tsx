import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { component } from '../../utils/component.tsx';
import { WithChildren } from '../../utils/props.ts';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store.ts';

export const ThemeProvider = component<WithChildren>(({ children }) => {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <Router>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Router>
    </Provider>
  );
});
