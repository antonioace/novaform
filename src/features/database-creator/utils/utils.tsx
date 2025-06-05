import {
  ColeccionConfig,
  RelacionConfig,
} from "../components/ColeccionesConfig";

export const DefaultData: {
    nodes: ColeccionConfig[];
    edges: RelacionConfig[];
  } = {
    nodes: [
      {
        id: "tabla_usuarios",
        type: "CustomNodeDatabase",
        position: { x: 100, y: 100 },
        data: {
          id: "tabla_usuarios",
          name: "usuarios",
          fields: [
            { id: "id_usuario", name: "id", type: "INTEGER", required: true },
            { id: "username", name: "username", type: "TEXT", required: true },
            { id: "email", name: "email", type: "TEXT", required: true },
            { id: "password", name: "password", type: "TEXT", required: true }
          ]
        }
      },
      {
        id: "tabla_roles",
        type: "CustomNodeDatabase",
        position: { x: 400, y: 100 },
        data: {
          id: "tabla_roles",
          name: "roles",
          fields: [
            { id: "id_rol", name: "id", type: "INTEGER", required: true },
            { id: "name", name: "name", type: "TEXT", required: true },
            { id: "description", name: "description", type: "TEXT", required: false }
          ]
        }
      },
      {
        id: "tabla_permisos",
        type: "CustomNodeDatabase",
        position: { x: 700, y: 100 },
        data: {
          id: "tabla_permisos",
          name: "permisos",
          fields: [
            { id: "id_permiso", name: "id", type: "INTEGER", required: true },
            { id: "code", name: "code", type: "TEXT", required: true },
            { id: "description", name: "description", type: "TEXT", required: false }
          ]
        }
      },
      {
        id: "tabla_usuario_rol",
        type: "CustomNodeDatabase",
        position: { x: 250, y: 300 },
        data: {
          id: "tabla_usuario_rol",
          name: "usuario_rol",
          fields: [
            { id: "id_usuario_fk", name: "usuario_id", type: "INTEGER", required: true },
            { id: "id_rol_fk", name: "rol_id", type: "INTEGER", required: true }
          ]
        }
      },
      {
        id: "tabla_rol_permiso",
        type: "CustomNodeDatabase",
        position: { x: 550, y: 300 },
        data: {
          id: "tabla_rol_permiso",
          name: "rol_permiso",
          fields: [
            { id: "id_rol_ref", name: "rol_id", type: "INTEGER", required: true },
            { id: "id_permiso_ref", name: "permiso_id", type: "INTEGER", required: true }
          ]
        }
      }
    ],
    edges: [
      {
        id: "xy-edge__tabla_usuariossource_id_usuario-tabla_usuario_roltarget_id_usuario_fk",
        source: "tabla_usuarios",
        sourceHandle: "source_id_usuario",
        target: "tabla_usuario_rol",
        targetHandle: "target_id_usuario_fk",
        type: "CustomEdgeButton",
        data: {
          primaryTable: "tabla_usuarios",
          primaryField: "id_usuario",
          referencedTable: "tabla_usuario_rol",
          referencedField: "id_usuario_fk",
          cardinality: "one-to-many"
        }
      },
      {
        id: "xy-edge__tabla_rolessource_id_rol-tabla_usuario_roltarget_id_rol_fk",
        source: "tabla_roles",
        sourceHandle: "source_id_rol",
        target: "tabla_usuario_rol",
        targetHandle: "target_id_rol_fk",
        type: "CustomEdgeButton",
        data: {
          primaryTable: "tabla_roles",
          primaryField: "id_rol",
          referencedTable: "tabla_usuario_rol",
          referencedField: "id_rol_fk",
          cardinality: "one-to-many"
        }
      },
      {
        id: "xy-edge__tabla_rolessource_id_rol-tabla_rol_permisotarget_id_rol_ref",
        source: "tabla_roles",
        sourceHandle: "source_id_rol",
        target: "tabla_rol_permiso",
        targetHandle: "target_id_rol_ref",
        type: "CustomEdgeButton",
        data: {
          primaryTable: "tabla_roles",
          primaryField: "id_rol",
          referencedTable: "tabla_rol_permiso",
          referencedField: "id_rol_ref",
          cardinality: "one-to-many"
        }
      },
      {
        id: "xy-edge__tabla_permisossource_id_permiso-tabla_rol_permisotarget_id_permiso_ref",
        source: "tabla_permisos",
        sourceHandle: "source_id_permiso",
        target: "tabla_rol_permiso",
        targetHandle: "target_id_permiso_ref",
        type: "CustomEdgeButton",
        data: {
          primaryTable: "tabla_permisos",
          primaryField: "id_permiso",
          referencedTable: "tabla_rol_permiso",
          referencedField: "id_permiso_ref",
          cardinality: "one-to-many"
        }
      }
    ]
  };
  export const CAMPOS_DEFAULT = [
    {
      id: "createdAt",
      name: "createdAt",
      type: "timestamp"
    },
    {
      id: "updatedAt", 
      name: "updatedAt",
      type: "timestamp"
    },
    {
      id: "status",
      name: "status",
      type: "boolean"
    }
  ]