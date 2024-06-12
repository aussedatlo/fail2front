import React from 'react';
import { createContext } from 'react';
import { Box, BoxProps } from '@mui/material';
import { useDebounce } from 'use-debounce';
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
  const debouncedWidth = useDebounce(width, 50)[0];
  const debouncedHeight = useDebounce(height, 50)[0];

  return (
    <Box ref={ref} {...props}>
      <ResizeProviderContext.Provider
        value={{ width: debouncedWidth, height: debouncedHeight }}
      >
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
