import Client from "../utils/axios";
import { LS } from "../utils";

const AuthService = {
  login: (email, password) => {
    return Client.post("/voter/login", {
      email,
      password,
    }).then((response) => {
      if (response.data.accessToken) {
        LS.set("role", response.data.role);
        LS.set("jwt", response.data.accessToken);
      }
      return response.data;
    });
  },
  electionLogin: (email, password) => {
    return Client.post("/election/login", {
      email,
      password,
    }).then((response) => {
      if (response.data.accessToken) {
        LS.set("role", response.data.role);
        LS.set("jwt", response.data.accessToken);
      }
      return response.data;
    });
  },
  register: ({ email, password, full_name, dob, uvc, constituency_id }) => {
    return Client.post("/voter/register", {
      email,
      password,
      full_name,
      dob,
      uvc,
      constituency_id,
    });
  },
  logout: () => {
    LS.remove("jwt");
    LS.remove("role");
  },
};

export default AuthService;
