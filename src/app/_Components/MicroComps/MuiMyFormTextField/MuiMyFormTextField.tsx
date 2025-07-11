'use client'

import TextField from "@mui/material/TextField";
import FormError from "@/app/_Components/Forms/FormError/FormError";
import { FormikErrors, FormikTouched } from "formik";

interface IFormTextField {
  id: string;
  name: keyof any;
  label: string;
  type?: string;
  formik: {
    values: any;
    handleChange: (e: React.ChangeEvent<any>) => void;
    touched: FormikTouched<any>;
    errors: FormikErrors<any>;
  };
  handleBlur: (e: React.FocusEvent<any>) => void;
  dismissedErrors: Record<string, boolean>;
  setDismissedErrors: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  sx?: object;
}

export default function MuiMyFormTextField({
  id,
  name,
  label,
  type = "text",
  formik,
  handleBlur,
  dismissedErrors,
  setDismissedErrors,
  sx = { width: "75%", backgroundColor: "secondary.main" },
}: IFormTextField) {
  const fieldName = name as string;
  const error = !!formik.errors[fieldName] && formik.touched[fieldName] && !dismissedErrors[fieldName];

  return (
    <TextField
      id={id}
      name={fieldName}
      label={label}
      type={type}
      variant="filled"
      sx={sx}
      value={formik.values[fieldName]}
      onChange={formik.handleChange}
      onBlur={handleBlur}
      error={error}
      helperText={
        error && (
          <FormError
            errorMessage={formik.errors[fieldName] as string}
            onClose={() =>
              setDismissedErrors((prev) => ({
                ...prev,
                [fieldName]: true,
              }))
            }
          />
        )
      }
      InputProps={{
        style: { fontSize: "1.25rem" }, // ✅ input text size
      }}
      InputLabelProps={{
        style: { fontSize: "1.25rem" }, // ✅ label text size
      }}
    />
  );
}

