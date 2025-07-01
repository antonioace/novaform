import React, { useState, useEffect } from 'react';
import { Button, TextField, InputAdornment, Chip, Box } from '@mui/material';
import { FiPlus, FiSearch, FiFilter } from 'react-icons/fi';
import { useNotification } from '../../../contexts/NotificationContext';
import CuestionarioCard, { ICuestionarioResponse } from '../components/CuestionarioCard';
import { CreateEditCuestionarioModal } from '../components/CreateEditCuestionarioModal';

// Mock data - reemplazar con datos reales de la API
const mockCuestionarios: ICuestionarioResponse[] = [
  {
    id: '1',
    title: 'Encuesta de Satisfacción del Cliente',
    description: 'Evalúa la experiencia de nuestros clientes con nuestros productos y servicios.',
    status: 'published',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    responsesCount: 45,
  },
  {
    id: '2',
    title: 'Evaluación de Empleados Q1 2024',
    description: 'Cuestionario trimestral para evaluar el desempeño y satisfacción laboral.',
    status: 'draft',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-18T16:45:00Z',
    responsesCount: 0,
  },
  {
    id: '3',
    title: 'Feedback del Producto Beta',
    description: 'Recopila comentarios sobre las nuevas funcionalidades en desarrollo.',
    status: 'closed',
    createdAt: '2024-01-05T11:00:00Z',
    updatedAt: '2024-01-25T12:00:00Z',
    responsesCount: 128,
  },
];

const CuestionarioList: React.FC = () => {
  const { showNotification } = useNotification();
  const [cuestionarios, setCuestionarios] = useState<ICuestionarioResponse[]>(mockCuestionarios);
  const [filteredCuestionarios, setFilteredCuestionarios] = useState<ICuestionarioResponse[]>(mockCuestionarios);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCuestionario, setSelectedCuestionario] = useState<ICuestionarioResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // Filtrado y búsqueda
  useEffect(() => {
    let filtered = cuestionarios;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (cuestionario) =>
          cuestionario.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cuestionario.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por estado
    if (statusFilter !== 'all') {
      filtered = filtered.filter((cuestionario) => cuestionario.status === statusFilter);
    }

    setFilteredCuestionarios(filtered);
  }, [cuestionarios, searchTerm, statusFilter]);

  const handleCreateCuestionario = async (data: Partial<ICuestionarioResponse>) => {
    setLoading(true);
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newCuestionario: ICuestionarioResponse = {
        id: Date.now().toString(),
        title: data.title!,
        description: data.description || '',
        status: data.status || 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        responsesCount: 0,
      };

      setCuestionarios(prev => [newCuestionario, ...prev]);
      showNotification('success', 'Cuestionario creado exitosamente');
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating cuestionario:', error);
      showNotification('error', 'Error al crear el cuestionario');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCuestionario = async (data: Partial<ICuestionarioResponse>) => {
    if (!selectedCuestionario) return;
    
    setLoading(true);
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCuestionarios(prev =>
        prev.map(cuestionario =>
          cuestionario.id === selectedCuestionario.id
            ? {
                ...cuestionario,
                ...data,
                updatedAt: new Date().toISOString(),
              }
            : cuestionario
        )
      );
      
      showNotification('success', 'Cuestionario actualizado exitosamente');
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating cuestionario:', error);
      showNotification('error', 'Error al actualizar el cuestionario');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCuestionario = async (id: string) => {
    setLoading(true);
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCuestionarios(prev => prev.filter(cuestionario => cuestionario.id !== id));
      showNotification('success', 'Cuestionario eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting cuestionario:', error);
      showNotification('error', 'Error al eliminar el cuestionario');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cuestionario: ICuestionarioResponse) => {
    setSelectedCuestionario(cuestionario);
    setShowEditModal(true);
  };

  const getStatusCount = (status: string) => {
    return cuestionarios.filter(c => c.status === status).length;
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Cuestionarios</h1>
          <p className="text-sm text-gray-600">
            Gestiona tus cuestionarios y encuestas
          </p>
        </div>
        
        <Button
          variant="contained"
          startIcon={<FiPlus />}
          onClick={() => setShowCreateModal(true)}
          style={{ backgroundColor: '#021642' }}
        >
          Nuevo Cuestionario
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <TextField
          placeholder="Buscar cuestionarios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiSearch className="text-gray-400" />
              </InputAdornment>
            ),
          }}
          className="flex-1"
        />
        
        <div className="flex items-center gap-2">
          <FiFilter className="text-gray-400" />
          <span className="text-sm font-medium text-gray-700 mr-2">Estado:</span>
        </div>
      </div>

      {/* Status Filter Chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Chip
          label={`Todos (${cuestionarios.length})`}
          onClick={() => setStatusFilter('all')}
          variant={statusFilter === 'all' ? 'filled' : 'outlined'}
          style={{
            backgroundColor: statusFilter === 'all' ? '#021642' : 'transparent',
            color: statusFilter === 'all' ? 'white' : '#021642',
            borderColor: '#021642',
          }}
        />
        <Chip
          label={`Borradores (${getStatusCount('draft')})`}
          onClick={() => setStatusFilter('draft')}
          variant={statusFilter === 'draft' ? 'filled' : 'outlined'}
          style={{
            backgroundColor: statusFilter === 'draft' ? '#f59e0b' : 'transparent',
            color: statusFilter === 'draft' ? 'white' : '#f59e0b',
            borderColor: '#f59e0b',
          }}
        />
        <Chip
          label={`Publicados (${getStatusCount('published')})`}
          onClick={() => setStatusFilter('published')}
          variant={statusFilter === 'published' ? 'filled' : 'outlined'}
          style={{
            backgroundColor: statusFilter === 'published' ? '#10b981' : 'transparent',
            color: statusFilter === 'published' ? 'white' : '#10b981',
            borderColor: '#10b981',
          }}
        />
        <Chip
          label={`Cerrados (${getStatusCount('closed')})`}
          onClick={() => setStatusFilter('closed')}
          variant={statusFilter === 'closed' ? 'filled' : 'outlined'}
          style={{
            backgroundColor: statusFilter === 'closed' ? '#ef4444' : 'transparent',
            color: statusFilter === 'closed' ? 'white' : '#ef4444',
            borderColor: '#ef4444',
          }}
        />
      </div>

      {/* Results */}
      <div className="mb-3">
        <p className="text-xs text-gray-500">
          Mostrando {filteredCuestionarios.length} de {cuestionarios.length} cuestionarios
        </p>
      </div>

      {/* Cuestionarios Grid */}
      {filteredCuestionarios.length === 0 ? (
        <Box className="text-center py-12">
          <div className="mb-4">
            <FiSearch className="w-16 h-16 mx-auto text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || statusFilter !== 'all' 
              ? 'No se encontraron cuestionarios' 
              : 'No hay cuestionarios aún'
            }
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter !== 'all'
              ? 'Intenta cambiar los filtros de búsqueda'
              : 'Crea tu primer cuestionario para comenzar'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <Button
              variant="contained"
              startIcon={<FiPlus />}
              onClick={() => setShowCreateModal(true)}
              style={{ backgroundColor: '#021642' }}
            >
              Crear Cuestionario
            </Button>
          )}
        </Box>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCuestionarios.map((cuestionario) => (
            <CuestionarioCard
              key={cuestionario.id}
              cuestionario={cuestionario}
              onDelete={handleDeleteCuestionario}
              onEdit={handleEdit}
              loading={loading}
            />
          ))}
        </div>
      )}

      {/* Create Modal */}
      <CreateEditCuestionarioModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateCuestionario}
        loading={loading}
        mode="create"
      />

      {/* Edit Modal */}
      <CreateEditCuestionarioModal
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedCuestionario(null);
        }}
        onSubmit={handleEditCuestionario}
        loading={loading}
        mode="edit"
        cuestionario={selectedCuestionario}
      />
    </div>
  );
};

export default CuestionarioList;
