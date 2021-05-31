import { useState } from 'react';

export default function useUser() {
  const getUser = () => {
    const tokenString = localStorage.getItem('user');
    const user = JSON.parse(tokenString);
    return user
  };

  const [user, setUser] = useState(getUser());

  const saveUser = user => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  return {
    setUser: saveUser,
    user
  }
}