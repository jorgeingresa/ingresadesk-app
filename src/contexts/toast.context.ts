import { createContext, SyntheticEvent, MouseEvent, useMemo, useState } from 'react';

type ToastContextValue = {
  showError: (e: Error | string) => void;
}

export const ToastContext = createContext<ToastContextValue>({
  showError: () => 0,
})

export const useToastContext = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<Error|string>();

  const toastContextValue: ToastContextValue = useMemo(() => ({
    showError: (e: Error | string) => {
      setError(e);
      setOpen(true);
    }
  }), []);

  const snackbarProps = useMemo(() => ({
    open,
    onClose(event: Event | SyntheticEvent<any, Event>, reason?: string) {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    }
  }), [open]);

  return {
    error,
    toastContextValue,
    snackbarProps,
  };
}
