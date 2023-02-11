import { useState } from "react";

export default function Generator({ quotesGenerator }) {
  const [author, setAuthor] = useState();
  const [text, setText] = useState();

  return (
    <>
      <button
        onClick={() => {
          let { text, author } = quotesGenerator[
            Math.floor(Math.random() * quotesGenerator.length)
          ];
          if (author === null) {
            author = "Someone said";
          }
          setAuthor((prev) => author);
          setText((prev) => text);
        }}
      >
        Generate
      </button>
      <div className="quotesDiv">
        <h1>{author}</h1>
        <p>{text}</p>
      </div>
    </>
  );
}
