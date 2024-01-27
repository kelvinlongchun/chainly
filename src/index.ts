type ChainMethods<T, U> = {
  [K in keyof U]: (
    ...args: U[K] extends (x: T) => (...args: infer A) => any ? A : never
  ) => Chain<T, U>;
};

type Chain<T, U> = Readonly<
  {
    value: T;
    map: (callback: (data: T) => T) => Chain<T, U>;
    trace: () => Chain<T, U>;
  } & ChainMethods<T, U>
>;

const createChain =
  <T, U>(funcs: U & Record<string, (value: T) => (...args: any) => T>) =>
  (value: T): Chain<T, U> => {
    const map = (callback: (data: T) => T) =>
      createChain(funcs)(callback(value));

    const trace = () => {
      console.log(value);
      return createChain(funcs)(value);
    };

    const chainMethods = Object.keys(funcs).reduce((acc, funcName) => {
      acc[funcName as keyof U] = (...funcsArgs) =>
        createChain<T, U>(funcs)(funcs[funcName](value)(...funcsArgs));
      return acc;
    }, {} as ChainMethods<T, U>);

    return Object.freeze({ value, trace, map, ...chainMethods });
  };

const chainly = { createChain };

export default chainly;
