'use client';

import { MantineProvider } from '@mantine/core';

interface MantineProviderWrapperProps {
  children: React.ReactNode;
}

export const MantineProviderWrapper: React.FC<MantineProviderWrapperProps> = ({ children }) => {
  return (
    <MantineProvider defaultColorScheme="dark">
      {children}
    </MantineProvider>
  );
};
