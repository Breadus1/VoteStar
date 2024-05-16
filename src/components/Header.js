import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>Welcome to VoteForStar</h1>
      <nav>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/company-panel">
          <button>Register company</button>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
