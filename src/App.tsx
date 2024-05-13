import { ThemeProvider } from './components/theme-provider';
import { AppRoutes } from './components/routes';

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
