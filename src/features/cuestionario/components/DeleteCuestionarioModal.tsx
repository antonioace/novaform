import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { FiAlertTriangle } from 'react-icons/fi';

interface DeleteCuestionarioModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading: boolean;
  cuestionarioTitle: string;
}

export const DeleteCuestionarioModal: React.FC<DeleteCuestionarioModalProps> = ({
  open,
  onClose,
  onConfirm,
  loading,
  cuestionarioTitle,
}) => {
  const handleConfirm = async () => {
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Error al eliminar cuestionario:', error);
    }
  };

  return (
    <Dialog open={open} onClose={!loading ? onClose : undefined} maxWidth="sm" fullWidth>
      <DialogTitle className="flex items-center space-x-2">
        <FiAlertTriangle className="w-6 h-6 text-red-500" />
        <span>Confirmar eliminación</span>
      </DialogTitle>
      
      <DialogContent>
        <Typography variant="body1" className="mb-4">
          ¿Estás seguro de que deseas eliminar el cuestionario{' '}
          <strong>&quot;{cuestionarioTitle}&quot;</strong>?
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          Esta acción no se puede deshacer. Se eliminarán permanentemente:
        </Typography>
        
        <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-600">
          <li>El cuestionario y todas sus preguntas</li>
          <li>Todas las respuestas recibidas</li>
          <li>Los datos de análisis y estadísticas</li>
          <li>Enlaces compartidos quedarán inactivos</li>
        </ul>
      </DialogContent>
      
      <DialogActions className="p-4">
        <Button 
          onClick={onClose} 
          disabled={loading}
          color="inherit"
        >
          Cancelar
        </Button>
        
        <Button
          onClick={handleConfirm}
          disabled={loading}
          variant="contained"
          color="error"
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {loading ? 'Eliminando...' : 'Eliminar cuestionario'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 