'use client'

import TextField from "@mui/material/TextField";
import FormError from "@/app/_Components/Forms/FormError/FormError";
import { FormikErrors, FormikTouched } from "formik";

interface IFormTextField<T> {
  id: string;
  name: keyof T;
  label: string;
  type?: string;
  formik: {
    values: T;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    touched: FormikTouched<T>;
    errors: FormikErrors<T>;
  };
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  dismissedErrors: Record<keyof T, boolean>;
  setDismissedErrors: React.Dispatch<React.SetStateAction<Record<keyof T, boolean>>>;
  sx?: object;
}

export default function MuiMyFormTextField<T>({
  id,
  name,
  label,
  type = "text",
  formik,
  handleBlur,
  dismissedErrors,
  setDismissedErrors,
  sx = { width: "75%", backgroundColor: "secondary.main" },
}: IFormTextField<T>) {
  const fieldName = name as string;
  const error = !!formik.errors[name] && formik.touched[name] && !dismissedErrors[name];

  return (
    <TextField
      id={id}
      name={fieldName}
      label={label}
      type={type}
      variant="filled"
      sx={sx}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={handleBlur}
      error={error}
      helperText={
        error && (
          <FormError
            errorMessage={formik.errors[name] as string}
            onClose={() =>
              setDismissedErrors((prev) => ({
                ...prev,
                [name]: true,
              }))
            }
          />
        )
      }
      InputProps={{
        style: { fontSize: "1.25rem" },
      }}
      InputLabelProps={{
        style: { fontSize: "1.25rem" },
      }}
    />
  );
}
