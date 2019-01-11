import {createElement} from "react";
import {render} from "react-dom";

import {Settings} from "./settings.components";
import {ErrorAlert} from "./erroralert.components";
import {state} from "./settings.observables";

const root = document.getElementById("root");

state.subscribe({
  next: s => render(<Settings {...s} />, root),
  error: (err: Error) => render(<ErrorAlert error={err} />, root)
});