import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getCountries, getUserDetails, getUserPosts } from "../services/api";
import PostPopup from "./PostPopup";
import Clock from "./Clock";
import "../styles/userProfile.styles.css";
import routes from "../constants/routes";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = await getUserDetails(userId);
        const userPosts = await getUserPosts(userId);

        setUser(userDetails);
        setPosts(userPosts);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    getCountries()
      .then(setCountries)
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const openPostPopup = (post) => {
    setSelectedPost(post);
  };

  const closePostPopup = () => {
    setSelectedPost(null);
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-header">
        <Link to={routes.userDirectory} className="back-button">
          Back
        </Link>
        <div className="header-controls">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="country-dropdown"
          >
            <option value="" disabled>
              Select country
            </option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <Clock selectedCountry={selectedCountry} />
        </div>
      </div>

      <h1>Profile Page</h1>
      <div className="user-information">
        <div>
          <p>{user.name}</p>
          <p>
            {user.username} | {user.company?.catchPhrase}
          </p>
        </div>
        <div>
          <p>
            {user.address?.suite}, {user.address?.street}, {user.address?.city},{" "}
            {user.address?.zipcode}
          </p>
          <p>
            {user.email} | {user.phone}
          </p>
        </div>
      </div>

      <div className="user-posts">
        {posts.map((post, index) => (
          <div
            key={post.id}
            onClick={() => openPostPopup(post)}
            className="post"
          >
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>

      {selectedPost && (
        <PostPopup post={selectedPost} onClose={closePostPopup} />
      )}
    </div>
  );
};

export default UserProfile;
