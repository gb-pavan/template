import { withErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from './ErrorBoundaryFallback';

export const wrapWithErrorBoundary = (Component: React.ComponentType<{ children: React.ReactNode }>) => {
  return withErrorBoundary(Component, {
    FallbackComponent: ErrorBoundaryFallback,
    onError(error, info) {
      console.error('Caught an error:', error);
      console.error('Error details:', info);
    },
  });
};

export default wrapWithErrorBoundary;