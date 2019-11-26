export function serialize(object: { [index: string]: string }): string {
  const params: Array<string> = [];
  return Object.keys(object)
    .reduce((accumulator: Array<string>, current: string) => {
      accumulator.push(`${current}=${encodeURIComponent(object[current]) as string}`);
      return accumulator;
    }, params)
    .join('&');
}
