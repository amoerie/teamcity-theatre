import {Observable} from 'rxjs/Observable';

const isProduction: boolean = process && process.env && process.env.NODE_ENV === "production";
const debug = function <T>(this: Observable<T>, name: string) {
  if (isProduction)
    return this;

  return this
    .do({
      next: (value: T) => {
        console.group("Next     : " + name);
        console.dir(value);
        console.groupEnd();
      },
      error: (error: Error) => {
        console.group("Error    : " + name);
        console.dir(error);
        console.groupEnd();
      },
      complete: () => console.log("Complete : " + name)
    });
};

Observable.prototype.debug = debug;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    debug: typeof debug;
  }
}