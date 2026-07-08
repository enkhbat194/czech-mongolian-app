import AppErrorBoundary from './components/diagnostics/AppErrorBoundary';
import Layout from './components/Layout/Layout';
import './index.css';

function App() {
  return (
    <AppErrorBoundary>
      <Layout />
    </AppErrorBoundary>
  );
}

export default App;
