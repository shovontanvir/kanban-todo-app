import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from "react-router";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import './index.css'
import App from './App'
import { AuthProvider } from './providers/AuthProvider';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  </StrictMode>,
)
