import { createElement } from "react";
export var ErrorAlert = function (props) {
    return (createElement("div", { className: "alert alert-error" },
        createElement("strong", null, "Error!"),
        " Can you make sense of this?",
        createElement("div", { className: "well well-lg" },
            createElement("h3", null, "Details"),
            createElement("pre", { dangerouslySetInnerHTML: { __html: JSON.stringify(props.error, null, 2) } }))));
};
