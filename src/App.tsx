import { ThemeProvider } from './components/theme-provider';
import { RouterRoutes } from './components/routes';

function App() {
  return (
    <ThemeProvider>
      <RouterRoutes />
    </ThemeProvider>
  );
}

export default App;
