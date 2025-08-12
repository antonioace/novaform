export enum ValidationType {
    REQUIRED = "required",
    MIN_LENGTH = "minLength",
    MAX_LENGTH = "maxLength",
    MIN_VALUE = "minValue",
    MAX_VALUE = "maxValue",
    PATTERN = "pattern",
    
}

export const LABELS_VALIDATION_TYPE={
    [ValidationType.REQUIRED]: "Requerido",
    [ValidationType.MIN_LENGTH]: "Mínimo de caracteres",
    [ValidationType.MAX_LENGTH]: "Máximo de caracteres",
    [ValidationType.MIN_VALUE]: "Mínimo de valor",
    [ValidationType.MAX_VALUE]: "Máximo de valor",
}
export interface FormValidation{
    id: string;
    idField: string;
    fieldType: string;
    validationType: ValidationType;
    validationMessage: string;
    validationRegex?: string;
    validationValue?: string;
}