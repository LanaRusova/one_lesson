import React from "react";
import Contact from "../Contact";
import "./style.css";

export default function ArticleList({ articles }) {
  const elem = <input type="text" />;
  const articleElements = articles.map(contact => (
    <li key={contact.id} className="article-list__li">
      <Contact contact={contact} />
    </li>
  ));
  return (
    <ul>
      {elem}
      {articleElements}
    </ul>
  );
}
