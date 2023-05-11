import { useContext } from "react";
import { GameContext } from "../context/GameContext";

export const UserCard = () => {
  const { username, setUsername } = useContext(GameContext);

  const onChange = (ev) => {
    setUsername(ev.target.value);
  };

  return (
    <>
      <div className="user-img-container">
        <img
          src={`https://api.dicebear.com/6.x/lorelei/svg?seed=${username}`}
          alt="avatar"
        />
      </div>
      <input
        className="user-input"
        type="text"
        value={username}
        onChange={onChange}
      />
    </>
  );
};
