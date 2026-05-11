export const formatCurrency = (value: number | null | undefined) =>
  value == null ? '-' : `₹${Number(value).toLocaleString('en-IN')}`;

export const formatPct = (value: number | null | undefined) =>
  value == null ? '-' : `${Number(value).toFixed(1)}%`;

export const formatNumber = (value: number | null | undefined) =>
  value == null ? '-' : Number(value).toLocaleString('en-IN');

export const truncate = (str: string | null | undefined, len = 60) =>
  str && str.length > len ? `${str.slice(0, len)}…` : str ?? '-';

export const shortCategory = (category: string | null | undefined) =>
  category ? category.split('|')[0] : '-';
