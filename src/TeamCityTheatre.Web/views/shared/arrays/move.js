/**
 * Swaps two elements in an array by index
 * @param oldIndex the old index
 * @param newIndex the new index
 * @param array the array of elements
 */
export var move = function (oldIndex, newIndex, array) {
    if (oldIndex < 0)
        throw new Error("Invalid old index: cannot be lower than 0");
    if (newIndex < 0)
        throw new Error("Invalid new index: cannot be lower than 0");
    if (oldIndex >= array.length)
        throw new Error("Invalid old index: cannot be higher than " + array.length);
    if (newIndex >= array.length)
        throw new Error("Invalid new index: cannot be higher than " + array.length);
    var smallestIndex = Math.min(oldIndex, newIndex);
    var biggestIndex = Math.max(oldIndex, newIndex);
    return array.map(function (element, index) {
        if (index < smallestIndex || index > biggestIndex)
            return element; // not affected by move
        if (index === newIndex)
            return array[oldIndex]; // the actual move
        return newIndex > oldIndex
            ? array[index + 1]
            : array[index - 1];
    });
};
