'use client'; // Ensure this is a client-side component

import React from 'react';
import { wrapWithErrorBoundary } from './withErrorBoundary';

const LayoutWithErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>; // This just renders children within the boundary
};

// Wrap the layout component with the error boundary
export default wrapWithErrorBoundary(LayoutWithErrorBoundary);

