declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.svg';
declare module '*.sass' {
  interface IClassNames {
    [className: string]: string;
  }

  const classNames: IClassNames;

  export = classNames;
}
