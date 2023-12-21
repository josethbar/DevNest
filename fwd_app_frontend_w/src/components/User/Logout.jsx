import React from 'react';

const Logout = ({ setCurrUser }) => {
  const logout = async (setCurrUser) => {
    try {
      const response = await fetch("http://localhost:3009/logout", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "authorization": localStorage.getItem("token")
        },
      });
      const data = await response.json();
      if (!response.ok) throw data.error;
      localStorage.removeItem('token');
      setCurrUser(null);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await logout(setCurrUser);
    // Redirige a la página de inicio de sesión o a la ubicación deseada
    // en lugar de recargar la página completa
    // window.location.reload();
    // Ejemplo de redirección a la página de inicio de sesión
    window.location.href = '/login';
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>Logout</button>
    </div>
  );
};

export default Logout;
