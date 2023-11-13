import React from "react";
import "../styles/postPopup.styles.css";

const PostPopup = ({ post, onClose }) => {
  const handleClickOutside = (event) => {
    if (event.target.className === "popup-overlay") {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleClickOutside}>
      <div className="popup-content">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PostPopup;
