const sortObjectByKey = (obj: { [key: string]: any }): { [key: string]: any } => {
  const objKeys = Object.keys(obj);
  const sortedObjectKeys = objKeys.sort();
  const sortedObject: { [key: string]: any } = {};
  sortedObjectKeys.forEach((k) => {
    sortedObject[k] = obj[k];
  });
  return sortedObject;
};

export default sortObjectByKey;