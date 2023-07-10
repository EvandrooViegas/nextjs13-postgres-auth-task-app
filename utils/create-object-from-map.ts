import sortObjectByKey from "./sort-object-by-key"
const createObjectFromMap = <K, V>(map:Map<K, V>) => {
  return Object.create(map, {
    set: {
      value: function (key: any, value: V ) {
        return map.set(
          typeof key === "object" ? JSON.stringify(sortObjectByKey(key)) : key,
          value
        );
      }
    },
    get: {
      value: function (key: any) {
        return map.get(
          typeof key === "object" ? JSON.stringify(sortObjectByKey(key)) : key,
        );
      }
    },
  });
}
export default createObjectFromMap