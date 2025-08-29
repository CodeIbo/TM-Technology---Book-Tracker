import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from './Snackbar';
import { DarkThemeProvider } from './Theme';

const queryClient = new QueryClient();

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkThemeProvider>
        <SnackbarProvider>{children}</SnackbarProvider>
      </DarkThemeProvider>
    </QueryClientProvider>
  );
}
