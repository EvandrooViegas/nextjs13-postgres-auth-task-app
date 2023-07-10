const isCapitalized = (w:string) => /^\p{Lu}/u.test( w );

const camelCaseToSnakeCase = (word:string) => {
  const slicedWord = word.split("")
  const snakeCamelCasedWordArr = slicedWord.map(w => {
    if(isCapitalized(w)) {
      return `_${w.toLowerCase()}`
    } else return w
  })  
  return snakeCamelCasedWordArr.join("")
}

export default camelCaseToSnakeCase
