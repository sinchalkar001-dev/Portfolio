import { Fragment } from "react";
import { cx } from "../lib/hooks";
import { reveal } from "../lib/reveal";

// A heading whose words rise out of the line, one after another, when it is scrolled to.
// The words stay ordinary text with ordinary spaces between them, so the heading wraps,
// reads aloud and copies like any other.
export default function RiseWords({ as: Tag = "h2", text, className, ...props }) {
  return (
    <Tag ref={reveal} className={cx("rise-words", className)} {...props}>
      <Words text={text} />
    </Tag>
  );
}

// The words on their own, for a parent that is already `rise-words`.
export function Words({ text }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      <span data-word style={{ "--i": i }}>
        <span>{word}</span>
      </span>
    </Fragment>
  ));
}
