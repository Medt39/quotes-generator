import "./styles.css";
import React, { useState, useEffect } from "react";
import Generator from "./components/generator";

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState(quotes);
  const [author, setAuthor] = useState([]);
  let filteredItems = "";
  useEffect(() => {
    async function fetchingQuotes() {
      fetch("https://type.fit/api/quotes")
        .then(function (response) {
          return response.json();
        })
        .then((data) => {
          setQuotes(data);
          console.log(data);
          const author = [
            "All",
            ...new Set(
              Object.values(
                data.map((item) =>
                  item.author != null ? item.author : "Someone said"
                )
              )
            )
          ];
          setAuthor(author);
        });
    }
    fetchingQuotes();
  }, []);
  function onClick(item) {
    if (item === "All") {
      filteredItems = quotes;
    } else if (item === "Someone said") {
      filteredItems = quotes.filter((quote) => quote.author === null);
    } else {
      filteredItems = quotes.filter((quote) => quote.author === item);
    }
    setFilteredQuotes((prevItem) => filteredItems);
  }

  return (
    <main className="App">
      <div className="author-div">
        {author.map((item) => {
          return (
            <h4 key={item} onClick={() => onClick(item)}>
              {item}
            </h4>
          );
        })}
      </div>
      <Generator quotesGenerator={filteredQuotes} />
    </main>
  );
}
