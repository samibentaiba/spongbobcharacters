import React, { useState } from "react";
import "./App.css";

// Import images from the assets folder
import SpongeBobImg from "./assets/spongebob.png";
import PatrickImg from "./assets/herospongbob.png";
import SquidwardImg from "./assets/squid.png";
import MrKrabsImg from "./assets/mr-krabs.png";
import FredImg from "./assets/Fred.png";
import DiscordModImg from "./assets/discordmod.png";
import BlueFishImg from "./assets/bluefish.png";
import PufferFishImg from "./assets/poperfish.png";
import RedImg from "./assets/red.png";

const charactersData = [
  {
    id: 1,
    name: "SpongeBob",
    description: "The optimistic sea sponge who lives in a pineapple.",
    image: SpongeBobImg,
  },
  {
    id: 2,
    name: "Patrick Star",
    description: "The lazy and lovable starfish.",
    image: PatrickImg,
  },
  {
    id: 3,
    name: "Squidward Tentacles",
    description: "The grumpy neighbor and clarinet player.",
    image: SquidwardImg,
  },
  {
    id: 4,
    name: "Mr. Krabs",
    description: "The money-loving owner of the Krusty Krab.",
    image: MrKrabsImg,
  },
  {
    id: 5,
    name: "Fred",
    description: "The iconic 'My leg!' guy from Bikini Bottom.",
    image: FredImg,
  },
  {
    id: 6,
    name: "Discord Moderator",
    description: "A hilarious background character in Bikini Bottom.",
    image: DiscordModImg,
  },
  {
    id: 7,
    name: "Blue Fish",
    description: "A common citizen of Bikini Bottom.",
    image: BlueFishImg,
  },
  {
    id: 8,
    name: "Puffer Fish",
    description: "Mrs. Puff, SpongeBob's boating teacher.",
    image: PufferFishImg,
  },
  {
    id: 9,
    name: "Red Fish",
    description: "Another background citizen of Bikini Bottom.",
    image: RedImg,
  },
];

function App() {
  const [characters, setCharacters] = useState(charactersData);
  const [editId, setEditId] = useState(null);

  const handleDelete = (id) => {
    setCharacters(characters.filter((char) => char.id !== id));
  };

  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleSave = (id, updatedCharacter) => {
    setCharacters(
      characters.map((char) =>
        char.id === id ? { ...char, ...updatedCharacter } : char
      )
    );
    setEditId(null);
  };

  return (
    <div className="dashboard">
      {characters.map((character) =>
        editId === character.id ? (
          <EditCharacter
            key={character.id}
            character={character}
            onSave={handleSave}
          />
        ) : (
          <CharacterCard
            key={character.id}
            character={character}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )
      )}
    </div>
  );
}

const CharacterCard = ({ character, onDelete, onEdit }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="character-card">
      <img
        src={character.image}
        alt={character.name}
        onClick={() => setShowDetails(!showDetails)}
      />
      {showDetails && (
        <div className="character-details">
          <h3>{character.name}</h3>
          <p>{character.description}</p>
          <button onClick={() => onEdit(character.id)}>Edit</button>
          <button onClick={() => onDelete(character.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

const EditCharacter = ({ character, onSave }) => {
  const [name, setName] = useState(character.name);
  const [description, setDescription] = useState(character.description);
  const [image, setImage] = useState(character.image);

  return (
    <div className="edit-character">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL"
      />
      <button
        onClick={() =>
          onSave(character.id, { name, description, image })
        }
      >
        Save Changes
      </button>
    </div>
  );
};

export default App;
