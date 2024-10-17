import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import { TextArea, TextAreaProps } from "@atpradical/picopico-ui-kit";

export type ControlledTextAreaProps<T extends FieldValues> = Omit<
  TextAreaProps,
  "defaultValue" | "name" | "onBlur" | "onChange" | "value"
> &
  UseControllerProps<T>;

export const ControlledTextArea = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  errorMessage,
  name,
  rules,
  shouldUnregister,
  ...props
}: ControlledTextAreaProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  });

  return (
    <TextArea
      errorMessage={errorMessage ?? error?.message}
      {...props}
      {...field}
    />
  );
};
