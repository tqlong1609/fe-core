import { axiosMockAdapterInstance } from "../../config/axios";
import { AuthService, AuthenticationResponse } from "../../lib";

axiosMockAdapterInstance
  .onPost(new AuthService().refreshTokenUrl)
  .reply((config) => {
    const token = config.headers?.Authorization.replace("Bearer ", "");
    if (token) {
      return [
        200,
        {
          message: "Token verified",
          token: "This is refresh token"
        } as AuthenticationResponse
      ];
    }
    else {
      return [
        401,
        {
          message: "Cannot refresh token"
        } as AuthenticationResponse
      ];
    }
  });
