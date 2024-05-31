import { useEffect, useState } from "react";
import AuthService from "../auth/service";
import { useNavigate } from "react-router-dom";
import Client from "../utils/axios";

const VoterRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [fullName, setFullName] = useState("");
  const [constituencies, setConstituencies] = useState([]);
  const [constituencyId, setConstituencyId] = useState("");
  const [uvc, setUvc] = useState("");
  const [error, setError] = useState(null);

  const redirect = useNavigate();

  useEffect(() => {
    Client.get("/constituencies").then((response) => {
      setConstituencies(response.data);
    });
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDobChange = (event) => {
    setDob(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleConstituencyIdChange = (event) => {
    setConstituencyId(event.target.value);
  };

  const handleUvcChange = (event) => {
    setUvc(event.target.value);
  };

  const handleRegistration = (e) => {
    e.preventDefault();

    AuthService.register({
      email,
      password,
      dob,
      full_name: fullName,
      constituency_id: constituencyId,
      uvc,
    })
      .then(() => {
        return redirect("/?registered=true");
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.response);
      });
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-header">Voter Registration</h2>

      <form className="form-container" onSubmit={handleRegistration}>
        <div className="field-block">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            onChange={handleEmailChange}
          />
        </div>
        <div className="field-block">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={handlePasswordChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="field-block">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            placeholder="Date of Birth"
            required
            onChange={handleDobChange}
          />
        </div>

        <div className="field-block">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Full Name"
            required
            onChange={handleFullNameChange}
          />
        </div>

        <div className="field-block">
          <label htmlFor="constituencyId">Constituency</label>
          <select
            id="constituencyId"
            onChange={handleConstituencyIdChange}
            required
          >
            <option value="">Select a constituency</option>
            {constituencies.map((constituency) => (
              <option
                key={constituency.constituency_id}
                value={constituency.constituency_id}
              >
                {constituency.constituency_name}
              </option>
            ))}
          </select>
        </div>

        <div className="field-block">
          <label htmlFor="uvc">Unique Voter Code</label>
          <input
            type="text"
            id="uvc"
            placeholder="Unique Voter Code"
            required
            onChange={handleUvcChange}
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button className="form-btn">Register</button>
      </form>
    </div>
  );
};

export default VoterRegistration;
