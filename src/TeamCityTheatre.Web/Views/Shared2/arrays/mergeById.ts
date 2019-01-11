/**
 *  Swaps an element of an array with an updated version, using the id to find the element
 *  If the element does not already exist in the array, it's added
 */
export const mergeById = <T extends { id: string }>(updatedElement: T, array: T[]) => {
  const clone : T[] = array.slice(0);
  let found = false;
  for(let i = 0; i < clone.length; i++) {
    if(clone[i].id === updatedElement.id) {
      found = true;
      clone[i] = updatedElement;
      break;
    }
  }
  if(!found)
    clone.push(updatedElement);
  return clone;
};