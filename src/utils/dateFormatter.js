
export function timestampToFormatFr(timestamp) {
  const date = new Date(timestamp);
  return `Le ${date.toLocaleString('fr-FR')}`;
}