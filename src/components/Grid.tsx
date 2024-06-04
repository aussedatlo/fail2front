import { useContext, useMemo } from 'react';
import {
  Layout,
  Layouts,
  Responsive as ResponsiveGridLayout,
} from 'react-grid-layout';

import { AppContext } from '@/context/app';

type GridType = 'jail' | 'dashboard';

type GridProps = {
  children: React.ReactNode;
  type: GridType;
  width: number;
  isEditMode: boolean;
};

export const Grid: React.FC<GridProps> = ({ children, width, isEditMode }) => {
  const { layouts, isLoaded, setLayouts } = useContext(AppContext);

  const layoutEditMode: Layouts = useMemo(
    () =>
      Object.keys(layouts).reduce((acc, key) => {
        return {
          ...acc,
          [key]: layouts[key].map((layout: Layout) => ({
            ...layout,
            static: !isEditMode,
          })),
        };
      }, {}),
    [layouts, isEditMode],
  );

  const onLayoutChange = (_currentLayout: Layout[], allLayouts: Layouts) => {
    setLayouts(allLayouts);
  };

  if (!isLoaded) return null;

  return (
    <ResponsiveGridLayout
      className="layout"
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      rowHeight={30}
      layouts={layoutEditMode}
      onLayoutChange={onLayoutChange}
      width={width}
    >
      {children}
    </ResponsiveGridLayout>
  );
};
