declare module '*.module.css' {
  type IClassNames = {
    [className: string]: string;
  };

  const classNames: IClassNames;
  export = classNames;
}