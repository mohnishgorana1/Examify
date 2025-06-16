import { ReactNode } from "react";

export interface SelectOption {
  label: string;
  value: string;
}

export interface ButtonType {
  SUBMIT: "Submit";
  RESET: "Reset";
}

interface FormControl {
  componentType:
    | "INPUT"
    | "FILE"
    | "TEXTAREA"
    | "SELECT"
    | "RADIO"
    | "CHECKBOX";

  name: string; // name of form control
  type?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string; // initial value for input
  required?: boolean;
  options?: SelectOption[]; // for select , radio, checkbox
}

interface CommonFormProps {
  formControls: FormControl[];
  schema: ZodType<T>;
  formData?: { [key: string]: any }; // Object for form field values
  submitButton?: ReactNode;
  resetButton?: ReactNode;
  btnClassName?: string;
  btnText?: string;
  btnType?: "SUBMIT" | "RESET";
  isButtonLoading?: boolean;
  isDisabled: boolean;

  handleFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // File input change handler
  onSubmit: (data: T) => void | Promise<void>;
  setFormData?: (data: { [key: string]: any }) => void; // Function to update form data
}
