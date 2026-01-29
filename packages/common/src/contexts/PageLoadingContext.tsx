import {
  createContext,
  type FC,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

type PageLoadingContextValue = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

const PageLoadingContext = createContext<PageLoadingContextValue | undefined>(
  undefined
);

export const PageLoadingProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);

  const value = useMemo(() => ({ loading, setLoading }), [loading]);

  return (
    <PageLoadingContext.Provider value={value}>
      {children}
    </PageLoadingContext.Provider>
  );
};

export function usePageLoading() {
  const ctx = useContext(PageLoadingContext);
  if (!ctx) {
    throw new Error('usePageLoading must be used inside PageLoadingProvider');
  }
  return ctx;
}
