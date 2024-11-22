export function shuffleArray<T>(array: T[]): T[] {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  export function pickAndRemove<T>(array: T[], count: number): T[] {
    const pickedElements: T[] = [];
    for (let i = 0; i < count; i++) {
      if (array.length === 0) break;
      const index = Math.floor(Math.random() * array.length);
      pickedElements.push(...array.splice(index, 1));
    }
    return pickedElements;
  }

  export function getRandomElement<T>(arr: T[]): T {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}