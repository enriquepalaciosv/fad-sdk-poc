export const getField = (collection, key) => {
  if (!collection || !key) {
    return null;
  }
  const field = collection.find((item) => item.key === key);
  return field ? field.value : null;
};
