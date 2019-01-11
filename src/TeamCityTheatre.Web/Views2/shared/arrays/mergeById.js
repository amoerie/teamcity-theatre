/**
 *  Swaps an element of an array with an updated version, using the id to find the element
 *  If the element does not already exist in the array, it's added
 */
export var mergeById = function (updatedElement, array) {
    var clone = array.slice(0);
    var found = false;
    for (var i = 0; i < clone.length; i++) {
        if (clone[i].id === updatedElement.id) {
            found = true;
            clone[i] = updatedElement;
            break;
        }
    }
    if (!found)
        clone.push(updatedElement);
    return clone;
};
