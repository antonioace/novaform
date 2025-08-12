import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { FormSelect } from '../../../../components/form/FormSelect';
import { LABELS_VALIDATION_TYPE, ValidationType } from '../../types';

function FormValidacion() {

    const methods=useFormContext()
    const fields=useFieldArray({
        control:methods.control,
        name:"validations"
    })
    const getNameField=(index:number,name:string)=>{
        return `validations.${index}.${name}`
    }
    const options=React.useMemo(()=>{
        return Object.values(ValidationType).map((type)=>({
            label:LABELS_VALIDATION_TYPE[type],
            value:type
        }))
    },[])
  return (
    <div className='flex flex-col gap-2'>
      {fields.fields.map((field,index)=>(
        <div key={field.id} className='flex flex-col gap-2'>
            <FormSelect
            fieldName={getNameField(index,"fieldType")}
            options={options}
            optionLabel='label'
            optionValue='value'
            control={methods.control}
            label='Tipo de validación'
            required
            
            />

        </div>
      ))}
    </div>
  )
}

export default FormValidacion
