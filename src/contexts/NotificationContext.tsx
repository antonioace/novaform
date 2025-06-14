import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface NotificationContextType {
  showNotification: (severity: AlertColor, message: string) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWarn: (message: string) => void;
  showInfo: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('info');

  const handleClose = () => {
    setOpen(false);
  };

  const showNotification = (severity: AlertColor, message: string) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const showSuccess = (message: string) => showNotification('success', message);
  const showError = (message: string) => showNotification('error', message); 
  const showWarn = (message: string) => showNotification('warning', message);
  const showInfo = (message: string) => showNotification('info', message);

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        showSuccess,
        showError,
        showWarn,
        showInfo,
      }}
    >
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification debe ser usado dentro de un NotificationProvider');
  }
  return context;
}; 