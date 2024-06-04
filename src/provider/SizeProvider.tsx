import React from 'react';
import { createContext } from 'react';
import { Box, BoxProps } from '@mui/material';
import useResizeObserver from 'use-resize-observer';

type ResizeProviderProps = {
  width: number | undefined;
  height: number | undefined;
};

export const ResizeProviderContext = createContext<ResizeProviderProps>({
  width: undefined,
  height: undefined,
});

export const SizeProvider: React.FC<BoxProps> = ({ children, ...props }) => {
  const { ref, width, height } = useResizeObserver();

  return (
    <Box ref={ref} {...props}>
      <ResizeProviderContext.Provider value={{ width, height }}>
        {children}
      </ResizeProviderContext.Provider>
    </Box>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSize = () => {
  if (!ResizeProviderContext) {
    throw new Error('useSize must be used within a SizeProvider');
  }
  return React.useContext(ResizeProviderContext);
};
