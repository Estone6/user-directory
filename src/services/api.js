import apiEndpoints from "../constants/apiEndpoints";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const fetchData = async (url) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const fetchCountries = async () => {
  try {
    const response = await fetch(`${apiEndpoints.timezone}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const fetchCurrentTime = async (timezone) => {
  try {
    const response = await fetch(`${apiEndpoints.timezone}/${timezone}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getUsers = () => fetchData(`/${apiEndpoints.users}`);

export const getUserDetails = (userId) =>
  fetchData(`/${apiEndpoints.users}/${userId}`);

export const getUserPosts = (userId) =>
  fetchData(`/${apiEndpoints.posts}?userId=${userId}`);

export const getCurrentTime = (timezone = "UTC") => fetchCurrentTime(timezone);

export const getCountries = () => fetchCountries("/timezone");
