import { useState } from "react";
import AuthService from "../auth/service";
import { useNavigate } from "react-router-dom";
import { LS } from "../utils";

const VoterLogin = () => {
  const lastLoginEmail = localStorage.getItem("lastLoginEmail");
  const [email, setEmail] = useState(lastLoginEmail || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const redirect = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    AuthService.login(email, password)
      .then(() => {
        LS.set("lastLoginEmail", email);
        return redirect("/");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-header">Voter Login</h2>

      {lastLoginEmail && (
        <div className="last-login">Last Login Email: {lastLoginEmail}</div>
      )}

      <form className="form-container" onSubmit={handleLogin}>
        <div className="field-block">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="field-block">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            required
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button className="form-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default VoterLogin;
