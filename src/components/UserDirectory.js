import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUsers, getUserPosts } from "../services/api";
import routes from "../constants/routes";
import "../styles/userDirectory.styles.css";

const UserDirectory = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then(async (data) => {
        const promises = data.map(async (user) => {
          const posts = await getUserPosts(user.id);
          return { ...user, postCount: posts.length };
        });

        const usersWithPostCount = await Promise.all(promises);
        setUsers(usersWithPostCount);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div>
      <h1>Directory</h1>
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <Link to={`${routes.userProfile.replace(":userId", user.id)}`}>
            <p className="user-name">{user.name}</p>
            <p className="post-count">Posts: {user.postCount}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UserDirectory;
