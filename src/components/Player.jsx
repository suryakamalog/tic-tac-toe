import { useState } from "react";

const Player = ({ name, symbol, isActive, changePlayerName}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  const handleOnClick = () => {
    setIsEditing((editing) => !editing);

    if(isEditing) {
      changePlayerName(symbol, playerName)
    }
  };

  const handleOnSubmit = (value) => {
    setPlayerName(value);
  };
  return (
    <li className={isActive ? 'active': undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            required
            onChange={(e) => handleOnSubmit(e.target.value)}
            defaultValue={name}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleOnClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
