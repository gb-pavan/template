// // src/context/ThemeContext.tsx
// import { createContext, useContext, useState, ReactNode } from 'react';
// import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
// import { useHotkeys, useLocalStorage } from '@mantine/hooks';

// interface ThemeContextProps {
//   toggleColorScheme: (value?: ColorScheme) => void;
//   colorScheme: ColorScheme;
// }

// const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// export const ThemeProvider = ({ children }: { children: ReactNode }) => {
//   const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
//     key: 'mantine-color-scheme',
//     defaultValue: 'light',
//   });

//   const toggleColorScheme = (value?: ColorScheme) =>
//     setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

//   useHotkeys([['mod+J', () => toggleColorScheme()]]); // Ctrl+J or Cmd+J to toggle theme

//   return (
//     <ThemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
//       <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
//         <MantineProvider defaultColorScheme='dark'>
//           {children}
//         </MantineProvider>
//       </ColorSchemeProvider>
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };

'use client';

import { createContext, useContext, ReactNode, useState } from 'react';
import { MantineProvider, ActionIcon, createTheme } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { IconSun, IconMoon } from '@tabler/icons-react';

interface ThemeContextProps {
  toggleColorScheme: () => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>({
    key: 'theme-mode',
    defaultValue: false,
  });

  const toggleColorScheme = () => setIsDarkMode((prev) => !prev);

  // Keyboard shortcut to toggle the theme
  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  const theme = createTheme({
    // colors: {
    //   brand: ['#F0F0F0', '#E0E0E0'], // Example custom color palette
    // },
    // primaryColor: 'brand',
    // Adjust the theme based on the mode
    components: {
      Button: {
        styles: () => ({
          root: {
            backgroundColor: isDarkMode ? '#333' : '#fff',
            color: isDarkMode ? '#fff' : '#000',
          },
        }),
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleColorScheme }}>
      <MantineProvider
        theme={theme}
      >
        {children}
      </MantineProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

