import { useState } from "react";

function Header({ title }) {
  return <h1>{title}</h1>;
}

export default function HomePage() {
  const [likes, setLikes] = useState(0)
  const dishes = ['Lasagna', 'Pizza', 'Pasta', 'Risotto']
  function handleClick() {
      setLikes(likes + 1)
  }
  return <div>
      <Header title="This is Epicurean Explorer" />
      <p>My first React app.</p>
      <p>Dishes available:</p>
      <ul>
          {dishes.map((name) => (
              <li key={name}>{name}</li>
          ))}
      </ul>

      <button onClick={handleClick}>Like({likes})</button>
  </div>;
}
