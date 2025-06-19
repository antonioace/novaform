import { useState, useEffect } from "react";
import axios from "axios";
import { ServerSideDataTable } from "@/components/table/ServerSideDataTable";
import { useNotification } from "@/contexts/NotificationContext";
import { useRouter } from "next/router";
import { Button, TextField, InputAdornment } from "@mui/material";
import { FiSearch, FiPlus, FiEdit, FiTrash } from "react-icons/fi";
import { frontendToBackendPage } from "@/features/shared";

// Definimos la interfaz para nuestros datos
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
}

export default function UsersPage() {
  const { showSuccess, showError } = useNotification();
  const router = useRouter();

  // Estados para los datos y configuración de la tabla
  const [userData, setUserData] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);

  // Estados para paginación y ordenamiento
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  // Estado para filtros
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
  });

  // Función para cargar datos de usuarios
  const loadUsers = async () => {
    try {
      setLoading(true);

      // Preparar parámetros para la API
      const params = {
        ...filters,
        page: frontendToBackendPage(page), // Conversión automática de paginación
        limit: rowsPerPage,
        sortBy: orderBy,
        sortOrder: order,
      };

      // Realizar la petición
      const response = await axios.get("/api/users", { params });

      // Actualizar estados con los datos recibidos
      setUserData(response.data.items || []);
      setTotalUsers(response.data.total || 0);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      showError("No se pudieron cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos cuando cambia algún parámetro relevante
  useEffect(() => {
    loadUsers();
  }, [page, rowsPerPage, orderBy, order, JSON.stringify(filters)]);

  // Definición de columnas
  const columns = [
    {
      id: "name",
      key: "name",
      label: "Nombre",
      width: "25%",
      sortable: true,
    },
    {
      id: "email",
      key: "email",
      label: "Email",
      width: "25%",
      sortable: true,
    },
    {
      id: "role",
      key: "role",
      label: "Rol",
      width: "15%",
      sortable: true,
    },
    {
      id: "status",
      key: "status",
      label: "Estado",
      width: "15%",
      sortable: true,
      format: (value: unknown) => {
        const status = value as "active" | "inactive";
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {status === "active" ? "Activo" : "Inactivo"}
          </span>
        );
      },
    },
    {
      id: "lastLogin",
      key: "lastLogin",
      label: "Último acceso",
      width: "20%",
      sortable: true,
      format: (value: unknown) => {
        const date = value as string;
        return new Date(date).toLocaleString("es-ES");
      },
    },
  ];

  // Acciones para cada fila
  const actions = [
    {
      icon: <FiEdit />,
      label: "Editar",
      onClick: (row: User) => {
        router.push(`/users/edit/${row.id}`);
      },
    },
    {
      icon: <FiTrash />,
      label: "Eliminar",
      onClick: async (row: User) => {
        if (confirm(`¿Estás seguro de eliminar a ${row.name}?`)) {
          try {
            await axios.delete(`/api/users/${row.id}`);
            showSuccess(`Usuario ${row.name} eliminado con éxito`);
            loadUsers(); // Recargar datos
          } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            showError("Error al eliminar el usuario");
          }
        }
      },
    },
  ];

  // Manejar cambio en el campo de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      search: e.target.value,
    });
    setPage(0); // Volver a la primera página al buscar
  };

  // Manejar cambio en el filtro de estado
  const handleStatusChange = (status: string) => {
    setFilters({
      ...filters,
      status,
    });
    setPage(0);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <Button
          variant="contained"
          startIcon={<FiPlus />}
          onClick={() => router.push("/users/new")}
          sx={{ backgroundColor: "#0a1929" }}
        >
          Nuevo Usuario
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <TextField
          placeholder="Buscar usuario..."
          variant="outlined"
          size="small"
          fullWidth
          value={filters.search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiSearch />
              </InputAdornment>
            ),
          }}
        />

        <div className="flex gap-2">
          <Button
            variant={filters.status === "all" ? "contained" : "outlined"}
            onClick={() => handleStatusChange("all")}
            size="small"
          >
            Todos
          </Button>
          <Button
            variant={filters.status === "active" ? "contained" : "outlined"}
            onClick={() => handleStatusChange("active")}
            size="small"
            color="success"
          >
            Activos
          </Button>
          <Button
            variant={filters.status === "inactive" ? "contained" : "outlined"}
            onClick={() => handleStatusChange("inactive")}
            size="small"
            color="error"
          >
            Inactivos
          </Button>
        </div>
      </div>

      {/* Tabla de usuarios con tipo genérico explícito */}
      <ServerSideDataTable<User>
        title="Lista de Usuarios"
        columns={columns}
        data={userData}
        totalItems={totalUsers}
        loading={loading}
        page={page}
        rowsPerPage={rowsPerPage}
        orderBy={orderBy}
        order={order}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
        onSortChange={(column, direction) => {
          setOrderBy(column);
          setOrder(direction);
        }}
        actions={actions}
        selectable
        onRowClick={(row) => {
          router.push(`/users/view/${row.id}`);
        }}
      />
    </div>
  );
}
