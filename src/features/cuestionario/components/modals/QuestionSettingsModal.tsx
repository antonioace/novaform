import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Switch,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import { FormQuestion } from '../../context/CuestionarioContext';

interface QuestionSettingsModalProps {
  open: boolean;
  onClose: () => void;
  question: FormQuestion | null;
  onSave: (settings: Partial<FormQuestion>) => void;
}

const QuestionSettingsModal: React.FC<QuestionSettingsModalProps> = ({
  open,
  onClose,
  question,
  onSave,
}) => {
  const [settings, setSettings] = useState({
    required: question?.required || false,
    description: question?.description || '',
    validationRules: [] as string[],
    conditionalLogic: false,
    randomizeOptions: false,
    allowOther: false,
    multipleAnswers: false,
  });

  const [validationRule, setValidationRule] = useState('');

  const handleSave = () => {
    onSave({
      required: settings.required,
      description: settings.description,
    });
    onClose();
  };

  const addValidationRule = () => {
    if (validationRule.trim()) {
      setSettings(prev => ({
        ...prev,
        validationRules: [...(prev.validationRules as string[]), validationRule.trim()]
      }));
      setValidationRule('');
    }
  };

  const removeValidationRule = (index: number) => {
    setSettings(prev => ({
      ...prev,
      validationRules: (prev.validationRules as string[]).filter((_, i) => i !== index)
    }));
  };

  if (!question) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        className: "max-h-[90vh]"
      }}
    >
      <DialogTitle className="flex justify-between items-center border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Configuración de Pregunta
        </h2>
        <IconButton onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FiX className="w-5 h-5" />
        </IconButton>
      </DialogTitle>
      
      <DialogContent className="p-6 space-y-6">
        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción de la pregunta
          </label>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Añade una descripción para ayudar a los usuarios a entender la pregunta..."
            value={settings.description}
            onChange={(e) => setSettings(prev => ({ ...prev, description: e.target.value }))}
            variant="outlined"
            size="small"
          />
        </div>

        {/* Configuraciones básicas */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Configuraciones básicas</h3>
          
          <FormControlLabel
            control={
              <Switch
                checked={settings.required}
                onChange={(e) => setSettings(prev => ({ ...prev, required: e.target.checked }))}
                color="primary"
              />
            }
            label="Respuesta requerida"
          />

          <FormControlLabel
            control={
              <Switch
                checked={settings.allowOther}
                onChange={(e) => setSettings(prev => ({ ...prev, allowOther: e.target.checked }))}
                color="primary"
              />
            }
            label="Permitir opción 'Otro'"
          />

          <FormControlLabel
            control={
              <Switch
                checked={settings.randomizeOptions}
                onChange={(e) => setSettings(prev => ({ ...prev, randomizeOptions: e.target.checked }))}
                color="primary"
              />
            }
            label="Aleatorizar orden de opciones"
          />
        </div>

        {/* Validaciones */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Validaciones</h3>
          
          <div className="flex gap-2 mb-3">
            <TextField
              placeholder="Ej: Mínimo 10 caracteres, formato email, etc."
              value={validationRule}
              onChange={(e) => setValidationRule(e.target.value)}
              size="small"
              className="flex-1"
            />
            <Button
              onClick={addValidationRule}
              variant="outlined"
              startIcon={<FiPlus className="w-4 h-4" />}
              disabled={!validationRule.trim()}
            >
              Añadir
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {(settings.validationRules as string[]).map((rule, index) => (
              <Chip
                key={index}
                label={rule}
                onDelete={() => removeValidationRule(index)}
                deleteIcon={<FiTrash2 className="w-4 h-4" />}
                variant="outlined"
                color="primary"
              />
            ))}
          </div>
        </div>

        {/* Lógica condicional */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Lógica avanzada</h3>
          
          <FormControlLabel
            control={
              <Switch
                checked={settings.conditionalLogic}
                onChange={(e) => setSettings(prev => ({ ...prev, conditionalLogic: e.target.checked }))}
                color="primary"
              />
            }
            label="Habilitar lógica condicional"
          />

          {settings.conditionalLogic && (
            <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 mb-3">
                Configura cuándo mostrar esta pregunta basado en respuestas anteriores
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <FormControl size="small" fullWidth>
                  <InputLabel>Pregunta</InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="q1">Pregunta 1</MenuItem>
                    <MenuItem value="q2">Pregunta 2</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" fullWidth>
                  <InputLabel>Condición</InputLabel>
                  <Select defaultValue="equals">
                    <MenuItem value="equals">Es igual a</MenuItem>
                    <MenuItem value="contains">Contiene</MenuItem>
                    <MenuItem value="not_equals">No es igual a</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  size="small"
                  placeholder="Valor"
                  fullWidth
                />
              </div>
            </div>
          )}
        </div>

        {/* Vista previa */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Vista previa</h4>
          <div className="text-sm text-gray-600">
            <p><strong>Título:</strong> {question.title}</p>
            {settings.description && (
              <p><strong>Descripción:</strong> {settings.description}</p>
            )}
            <p><strong>Requerida:</strong> {settings.required ? 'Sí' : 'No'}</p>
            <p><strong>Elementos:</strong> {question.elements.length}</p>
          </div>
        </div>
      </DialogContent>

      <DialogActions className="px-6 py-4 border-t border-gray-200">
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Guardar cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionSettingsModal; 