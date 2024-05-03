export const formatDate = (date: Date) => {
  return new Date(date).toISOString().split('T')[0];
};

export const formatStringForDb = (value: string | undefined) => {
  if (!value || !value.trim().length) return null;

  return value.trim().toLowerCase();
};
