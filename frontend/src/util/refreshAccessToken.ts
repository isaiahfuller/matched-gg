import { Tokens } from "../interfaces";

export default function refreshAccessToken(
  refreshToken: string,
  isLoggedIn: boolean,
  setIsLoggedIn: (arg: boolean) => void,
  setTokens: (arg: Tokens) => void,
  setPage: (arg: string) => void
) {
  const opt = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      "Content-Type": "application/json",
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    },
  };
  fetch("auth/refresh", opt)
    .then((r) => {
      if (![200, 201].includes(r.status)) {
        throw new Error(r.status + "");
      }
      return r.json();
    })
    .then((res) => {
      localStorage.setItem("tokens", JSON.stringify(res));
      setTokens(res);
      if (!isLoggedIn) {
        setIsLoggedIn(true);
      }
    })
    .catch(() => {
      setIsLoggedIn(false);
      setTokens({ access_token: "", refresh_token: "" });
      localStorage.clear();
      setPage("login");
    });
}
