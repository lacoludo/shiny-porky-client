
export function timestampToFormatFr(timestamp) {
  if (timestamp) {
    const date = new Date(timestamp);
    return `Le ${date.toLocaleString('fr-FR')}`;
  }

  return 'Aucune mise à jour.'
}