import { AlertColor } from '@mui/material';
import { createContext } from 'react';

export type SnackbarContextType = {
  showSnackbar: (message: string, severity?: AlertColor, duration?: number) => void;
};

export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);
