import React from 'react';

const Greeting = () => {
  const name = 'Pavan Kumar';
  const greetMessage = `Hello, ${name}! Welcome to React.`;

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>{greetMessage}</h1>
      <p>This is a simple React component.</p>
    </div>
  );
};

export default Greeting;
