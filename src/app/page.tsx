'use client';

import React, { useState } from 'react';

// const Home = () => {
//   const [hasError, setHasError] = useState(false);

//   if (hasError) {
//     throw new Error('This is a test error!');
//   }

//   const throwError = () => {
//     setHasError(true);
//   };

//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <h2>Click the button to trigger an error:</h2>
//         <button onClick={throwError}>Trigger Error</button>
//       </main>
//     </div>
//   );
// };

// export default Home;


import { observer } from "mobx-react-lite";
import { useStore } from '../context/StoreProvider';
import AuthStatus from '../components/login/AuthStatus';

const HomePage = observer(() => {
  const { store } = useStore();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>MobX Counter: {store.selectedItem}</h1>
      <button onClick={() => store.toggleSidebar()}>Increment</button>
      <button onClick={() => store.toggleSidebar()}>Decrement</button>
      <AuthStatus />
    </div>
  );
});

export default HomePage;



