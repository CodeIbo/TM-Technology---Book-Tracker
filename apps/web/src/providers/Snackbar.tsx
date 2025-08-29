import { AlertColor } from '@mui/material';
import { useCallback, useState, ReactNode } from 'react';

import { InfoSnackbar } from '@/components/ui/InfoSnackbar';
import { SnackbarContext } from '@/context/Snackbar';

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<AlertColor>('info');
  const [duration, setDuration] = useState<number>(6000);

  const showSnackbar = useCallback((msg: string, sev: AlertColor = 'info', dur = 6000) => {
    setMessage(msg);
    setSeverity(sev);
    setDuration(dur);
  }, []);

  const handleClose = () => setMessage(null);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <InfoSnackbar
        message={message}
        onClose={handleClose}
        severity={severity}
        duration={duration}
      />
    </SnackbarContext.Provider>
  );
}
