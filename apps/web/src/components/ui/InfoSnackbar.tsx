import { Snackbar, Alert, AlertColor } from '@mui/material';
type Props = {
  message: string | null;
  onClose: () => void;
  severity?: AlertColor;
  duration?: number;
};

export function InfoSnackbar({ message, onClose, severity = 'info', duration = 1000 }: Props) {
  return (
    <Snackbar
      open={!!message}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
