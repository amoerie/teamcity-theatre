import { of, combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";

const base = document.getElementsByTagName("base")[0];

const baseHrefs = of(base && base.getAttribute("href") || "/").pipe(map(decodeURIComponent));

const locations = of(window.location);

export interface Route {
  absolutePath: string;
  relativePath: string;
  relativePathSegments: string[];
}

export const routes : Observable<Route> = combineLatest(baseHrefs, locations).pipe(
  map(([ baseHref, location ]) => {
    const absolutePath = decodeURIComponent(location.pathname);
    const relativePath = absolutePath.substring(baseHref.length);
    const segments = relativePath.split('/');
    return {
      absolutePath: absolutePath,
      relativePath: relativePath,
      relativePathSegments: segments
    }
  })
);