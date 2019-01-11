import { tap } from 'rxjs/operators';
import { Observable } from "rxjs";

const isProduction: boolean = process && process.env && process.env.NODE_ENV === "production";

export const debug = <T>(name: string) => (source: Observable<T>) => isProduction ? source : source.pipe(tap({
  next(value) {
    console.group("Next     : " + name);
    console.dir(value);
    console.groupEnd();
  },
  error(err) {
    console.group("Error    : " + name);
    console.dir(err);
    console.groupEnd();
  },
  complete() {
    console.log("Complete : " + name)
  },
}));