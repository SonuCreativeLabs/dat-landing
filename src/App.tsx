import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from './components/Layout';

const queryClient = new QueryClient();

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Something went wrong</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{error.message}</p>
        </div>
        <div className="mt-5">
          <button
            onClick={() => window.location.reload()}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Layout>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin/*" element={<Admin />} />
                <Route path="/login" element={<Login />} />
              </Routes>
              <Toaster position="top-right" />
            </Router>
          </ErrorBoundary>
        </QueryClientProvider>
      </HelmetProvider>
    </Layout>
  );
}

export default App;