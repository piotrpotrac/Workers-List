import React from "react";
import { useField, useFormikContext } from "formik";
import Select from "react-select";

export const MultiSelect = ({ ...props }) => {
  const con = useFormikContext();
  const { setFieldValue } = con;

  const [field] = useField(props);
  let value = null;

  if (props.options) {
    value =
      props.options.find((option) => option.value === field.value) || null;
  }

  return (
    <Select
      {...field}
      {...props}
      name={field.name}
      isSearchable="true"
      isClearable="true"
      value={value}
      onChange={(option) => {
        if (option) {
          setFieldValue(field.name, option.value);
        } else {
          setFieldValue(field.name, null);
        }
      }}
    />
  );
};

export default MultiSelect;
