export enum ResponseStatusEnum {
  ERROR = 'error',
  SUCCESS = 'success',
  FAIL = 'failed',
  DUPLICATE_REFERENCE = 'duplicate_reference',
  INVALID_PIN = 'invalid_pin',
  PENDING = 'pending',
  NEW_DEVICE = 'new_device',
}

export type StatusType = "SUCCESSFUL" | "FAILED" | "PENDING";

export enum OTPModesEnum {
  RESET_PASSCODE = 'reset_passcode',
  NEW_DEVICE = 'new_device',
}

type InputType = 'text' | 'password' | 'number'  | 'email' | 'tel' | 'search' | 'url' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color' | 'range' | 'file' | 'hidden';

export type FormInputType = {
  type?: InputType,
  label?: string,
  name?: string,
  placeholder?: string,
  additionalClass?: string,
  borderColor?: string,
  max?: number,
  min?: number,
  value?: string,
  disabled?: boolean,
  inputRef?: React.RefObject<HTMLInputElement>,
  autoFocusInput?: boolean,
  successResponse?: string,
  validationErr?: string,
  icon?: string,
  rightIcon?: string,
  iconStyle?: string,
  darkMode?: boolean,
  fullWidth?: boolean,
  noMargin?: boolean,
  isTextArea?: boolean,
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  iconClick?: () => void,
}

type OnboardingField = {
  name: string,
  type: 'input' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'toggle' | 'checkbox-group' | 'file',
  inputType?: InputType,
  label?: string,
  required: boolean,
  value?: any,
  options?: Array<any>,
  subtext?: string
  page: number,
  data?: {
    fieldName: string,
    status: 'APPROVED' | 'PENDING' | 'PROFILED' | 'NOT_UPLOADED',
    documentType: string
  }
  notVisible?: boolean,
  disabled?: boolean,
  max?: number,
  min?: number,
  numeric?: boolean,
}

export type OnboardingStep = {
  name: string,
  subtext?: string,
  completed: boolean,
  numberOfPages: number,
  fields: {
    [key: string]: OnboardingField
  }
}

export type TableColumn = {
  label: string;
  render: (data: any) => React.ReactNode;
  onClick?: () => void;
};