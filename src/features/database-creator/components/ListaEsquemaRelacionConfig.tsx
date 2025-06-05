import React from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdOutlineTableChart,
  MdLink,
} from "react-icons/md";
import { ColeccionConfig, RelacionConfig } from "./ColeccionesConfig";

interface ListaEsquemaRelacionConfigProps {
  relacion: RelacionConfig;
  editarRelacion: (id: string, data: RelacionConfig) => void;
  colecciones: ColeccionConfig[];
}

const ListaEsquemaRelacionConfig: React.FC<ListaEsquemaRelacionConfigProps> = ({
  relacion,
  editarRelacion,
  colecciones,
}) => {
  const [open, setOpen] = React.useState(false);
  const [cardinalidad, setCardinalidad] = React.useState(
    relacion?.data?.cardinality || "one-to-one"
  );

  const onClickOpen = () => {
    setOpen(!open);
  };

  const handleCardinalidadChange = (
    nuevaCardinalidad:
      | "one-to-one"
      | "one-to-many"
      | "many-to-one"
      | "many-to-many"
  ) => {
    setCardinalidad(nuevaCardinalidad);
    editarRelacion(relacion.id, {
      ...relacion,
      data: {
        ...relacion.data,
        cardinality: nuevaCardinalidad,
      },
    });
  };
  const coleccionByIdPrimary = colecciones?.find(
    (coleccion) => coleccion.id === relacion?.data?.primaryTable
  );
  const coleccionByIdReferenced = colecciones?.find(
    (coleccion) => coleccion.id === relacion?.data?.referencedTable
  );
  const fieldByIdPrimary = coleccionByIdPrimary?.data?.fields?.find(
    (field) => field.id === relacion?.data?.primaryField
  );
  const fieldByIdReferenced = coleccionByIdReferenced?.data?.fields?.find(
    (field) => field.id === relacion?.data?.referencedField
  );

  return (
    <div className="w-full border-b border-b-[#eeeeee] py-1 flex flex-col">
      <div className="flex items-center justify-between px-2 pt-2 pb-1">
        <span className="text-xs font-semibold text-[#232323] flex items-center gap-2">
          <MdLink className="text-lg text-[#b0b0b0]" />
          Relación: {coleccionByIdPrimary?.data?.name} →{" "}
          {coleccionByIdReferenced?.data?.name}
        </span>
        <span
          className="text-[#b0b0b0] text-xs cursor-pointer"
          onClick={onClickOpen}
        >
          {open ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
        </span>
      </div>
      {open && (
        <div className="flex flex-col gap-2 flex-1 p-2">
          <div className="flex items-center gap-2">
            <MdOutlineTableChart className="text-base text-[#b0b0b0]" />
            <span className="text-xs font-semibold">Tabla primaria:</span>
            <span className="text-xs">{coleccionByIdPrimary?.data?.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="ml-6 text-xs font-semibold">Campo primario:</span>
            <span className="text-xs">{fieldByIdPrimary?.name}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <MdOutlineTableChart className="text-base text-[#b0b0b0]" />
            <span className="text-xs font-semibold">Tabla referenciada:</span>
            <span className="text-xs">
              {coleccionByIdReferenced?.data?.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="ml-6 text-xs font-semibold">
              Campo referenciado:
            </span>
            <span className="text-xs">{fieldByIdReferenced?.name}</span>
          </div>
          <div className="flex gap-2 mt-2 flex-col">
            <span className="text-xs font-semibold">Cardinalidad:</span>
            <select
              value={cardinalidad}
              onChange={(e) =>
                handleCardinalidadChange(
                  e.target.value as
                    | "one-to-one"
                    | "one-to-many"
                    | "many-to-one"
                    | "many-to-many"
                )
              }
              className="text-xs border border-[#eeeeee] rounded px-2 py-1"
            >
              <option value="one-to-one">Uno a Uno (1:1)</option>
              <option value="one-to-many">Uno a Muchos (1:N)</option>
              <option value="many-to-one">Muchos a Uno (N:1)</option>
              <option value="many-to-many">Muchos a Muchos (N:N)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaEsquemaRelacionConfig;
