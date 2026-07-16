export function stableShuffle(items, seedText) {
  let seed = 2166136261;
  for (let index = 0; index < seedText.length; index += 1) {
    seed = Math.imul(seed ^ seedText.charCodeAt(index), 16777619);
  }
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    seed = Math.imul(seed ^ (seed >>> 13), 2246822507) >>> 0;
    const swapIndex = seed % (index + 1);
    const swapped = result[swapIndex];
    result[swapIndex] = result[index];
    result[index] = swapped;
  }
  return result;
}
