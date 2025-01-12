import React from 'react';

const ErrorBoundaryFallback = ({ error }: { error: Error }) => (
  <div
    style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#f44336',
      color: 'white',
      padding: '16px',
      borderRadius: '8px',
      zIndex: 1000,
      textAlign: 'center',
      width: '80%',
      maxWidth: '500px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    }}
  >
    <h1>Something went wrong!</h1>
    <p>{error.message}</p>
    <button
      onClick={() => window.location.reload()}
      style={{ background: 'white', color: '#f44336', padding: '8px 16px', border: 'none', borderRadius: '4px' }}
    >
      Reload
    </button>
  </div>
);

export default ErrorBoundaryFallback;

