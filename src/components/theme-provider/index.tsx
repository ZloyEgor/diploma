import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { component } from '../../utils/component.tsx';
import { WithChildren } from '../../utils/props.ts';
import { BrowserRouter as Router } from 'react-router-dom';

export const ThemeProvider = component<WithChildren>(({ children }) => {
  const queryClient = new QueryClient();

  return (
    <Router>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Router>
  );
});
