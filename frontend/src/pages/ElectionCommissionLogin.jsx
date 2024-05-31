import { useState } from "react";
import AuthService from "../auth/service";
import { useNavigate } from "react-router-dom";

const ElectionCommissionLogin = () => {
  const [email, setEmail] = useState("");
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

    AuthService.electionLogin(email, password)
      .then(() => {
        return redirect("/");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-header">Election Commission Login</h2>;
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

export default ElectionCommissionLogin;
