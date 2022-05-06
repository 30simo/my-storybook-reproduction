import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MultilineField } from "./MultilineField";
import { FormProvider, useForm } from "react-hook-form";
import { LabelledArrayField } from "./LabelledArrayField";

export default {
  title: "MultilineField",
  component: MultilineField,
} as ComponentMeta<typeof MultilineField>;

const defaultProps = {
  arrayName: "fieldArray",
  renderChild: (field: Record<"key", string>, index: number) => (
    <LabelledArrayField
      field={field}
      index={index}
      fieldName={"field"}
      arrayName={"fieldArray"}
    />
  ),
};

const EmptyTemplate: ComponentStory<typeof MultilineField> = (args) => {
  const form = useForm({
    defaultValues: { fieldArray: [] },
  });
  return (
    <FormProvider {...form}>
      <MultilineField {...defaultProps} {...args} />
    </FormProvider>
  );
};

const Template: ComponentStory<typeof MultilineField> = (args) => {
  const form = useForm({
    defaultValues: { fieldArray: [{ field: "Hello" }, { field: "World" }] },
  });
  return (
    <FormProvider {...form}>
      <MultilineField {...defaultProps} {...args} />
    </FormProvider>
  );
};

// When trying to interact with the story using the buttons...

// ...the story works fine as long as the array is empty
export const Empty = EmptyTemplate.bind({});

// ...the story starts looping if the arrays is NOT empty
export const Default = Template.bind({});
