import React, { ReactElement, ReactNode } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "./Button";
import { Box } from "@mui/material";

export type MultilineFieldProps = {
  arrayName: string;
  addButtonDisabled?: boolean;
  deleteButtonDisabled?: boolean;
  renderChild: (field: Record<"key", string>, index: number) => ReactNode;
};

export function MultilineField({
  arrayName,
  renderChild,
}: MultilineFieldProps): ReactElement {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: arrayName,
    keyName: "key",
  });

  return (
    <>
      <Button onClick={() => append({})} label={"Add"} />
      {fields.map((field, index) => (
        <Box key={field.key}>
          <Button onClick={() => remove(index)} label={"Remove"} />
          {renderChild(field, index)}
        </Box>
      ))}
    </>
  );
}
