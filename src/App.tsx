import React from 'react';
import AppRouter from './router'
import { Toaster } from 'react-hot-toast';
import StandardErrorBoundary from './components/atoms/ErrorBoundary';

const App = () => {
  return (
    <div className={`h-full w-full m-0 min-h-screen`}>
      <StandardErrorBoundary>
        <AppRouter />
        <Toaster />
      </StandardErrorBoundary>
    </div>
  )
}

export default App