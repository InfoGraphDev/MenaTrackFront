import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Automatically execute the query (true by default)
      enabled: true,

      // Provide initial data for a query
      initialData: undefined,

      // Time (in ms) the query data is considered fresh. Set to 24 hours or will do automatic refetch.
      staleTime: 24 * 60 * 60 * 1000,

      // Refetch on window focus (true by default)
      refetchOnWindowFocus: false,

      // Interval (in ms) for refetching the query
      refetchInterval: false,

      // Continue refetching when the window is not in focus
      refetchIntervalInBackground: false,

      // How many times to retry a failed query
      retry: 3,

      // Delay (in ms) between retry attempts
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Time (in ms) unused query data remains in cache. Set to 24 hours.
      cacheTime: 24 * 60 * 60 * 1000,

      // Keep previous data while fetching new data
      keepPreviousData: false,

      // Specify if the query should refetch on reconnect (true by default)
      refetchOnReconnect: true,

      // Specify if the query should be retried on mount if it had failed previously (true by default)
      retryOnMount: true,

      // Structural sharing can help reduce memory and improve performance
      structuralSharing: true,
    },
  },
});

export default queryClient;
