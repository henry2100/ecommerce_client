export const setValues = (key: string, value: any) => {
  sessionStorage.setItem(key, value);
}

export const getValues = (key: string) => {
  return sessionStorage.getItem(key);
}

export const removeValues = (key: string) => {
  sessionStorage.removeItem(key);
}