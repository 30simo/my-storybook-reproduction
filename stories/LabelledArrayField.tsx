import "setimmediate";
import React, { ReactElement } from "react";
import {
  FieldArrayPath,
  FieldArrayWithId,
  FieldError,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { TextField } from "@mui/material";
import get from "lodash/get";

export type EnhancedArrayFieldProps = {
  arrayName: string;
  fieldName: string;
  field: Partial<
    FieldArrayWithId<FieldValues, FieldArrayPath<FieldValues>, string>
  >;
  index: number;
};
export function useEnhancedArrayField({
  arrayName,
  field,
  fieldName,
  index,
}: EnhancedArrayFieldProps) {
  const {
    formState: { errors },
  } = useFormContext();

  const name = `${arrayName}[${index}].${fieldName}`;
  const defaultValue = get(field, fieldName);
  const error: FieldError = get(errors, [arrayName, index, fieldName]);

  return { name, defaultValue, error };
}

export type LabelledArrayFieldProps = EnhancedArrayFieldProps;
export const LabelledArrayField = ({
  arrayName,
  fieldName,
  field,
  index,
}: LabelledArrayFieldProps): ReactElement => {
  const { register } = useFormContext();
  const { error, defaultValue, name } = useEnhancedArrayField({
    arrayName,
    fieldName,
    field,
    index,
  });
  const { ref } = register(name);

  return (
    <TextField
      inputRef={ref} // Removing either this line...
      error={!!error} // ...or this line, allows the story to function normally
      defaultValue={defaultValue}
    />
  );
};
