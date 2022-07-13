import React from "react";

export const Highlighter = ({ children, highlight }) => {
  if (!highlight) return children;
  const regexp = new RegExp(highlight, "g");
  const matches = children.match(regexp);
  console.log(matches, parts);
  var parts = children.split(new RegExp(`${highlight.replace()}`, "g"));

  for (var i = 0; i < parts.length; i++) {
    if (i !== parts.length - 1) {
      let match = matches[i];
      while (parts[i + 1] === "") {
        match += matches[++i];
      }

      parts[i] = (
        <React.Fragment key={i}>
          {parts[i]}
          <span className="highlighted">{match}</span>
        </React.Fragment>
      );
    }
  }
  return <div className="highlighter">{parts}</div>;
};
