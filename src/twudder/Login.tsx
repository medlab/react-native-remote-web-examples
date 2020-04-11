import React, { useState } from "react";
import { MooAccount } from "./Account";
import MooBox from "./MooBox";
import { authenticate, createAccount } from "./twudderResources";

const Login = ({
  onAuthenticated,
}: {
  onAuthenticated: (account: MooAccount) => void;
}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const onSubmitLoginForm = async () => {
    setSubmitting(true);

    if (isLogin) {
      if (username === "" || password === "") {
        return;
      }
      const result = await authenticate(username, password);
      if (result) {
        onAuthenticated(result);
      } else {
        setSubmitting(false);
      }
    } else {
      if (
        username === "" ||
        password === "" ||
        confPassword === "" ||
        name === "" ||
        confPassword !== password
      ) {
        return;
      }

      try {
        const acc = {
          username: username.trim(),
          name: name.trim(),
        };
        await createAccount(acc, password);
        onAuthenticated(acc);
      } catch {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="login" onClick={(e) => e.stopPropagation()}>
      <MooBox>
        <div className="login-inner">
          <div className="toggle-wrapper">
            <div
              className={`toggle ${isLogin ? "" : "active"}`}
              onClick={() => setIsLogin(false)}
            >
              Sign up
            </div>
            <div className="spacer"></div>
            <div
              className={`toggle ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Log in
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitLoginForm();
            }}
          >
            {!isLogin ? (
              <>
                <div className="input-wrapper">
                  <input
                    placeholder="name"
                    className="moo-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="login-padding" />
              </>
            ) : (
              <></>
            )}

            <div className="input-wrapper">
              <input
                placeholder="@username"
                className="moo-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login-padding" />
            <div className="input-wrapper">
              <input
                placeholder="password"
                type="password"
                className="moo-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!isLogin ? (
              <>
                <div className="login-padding" />
                <div className="input-wrapper">
                  <input
                    placeholder="confirm password"
                    type="password"
                    className="moo-input"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
            <div className="login-padding" />
            <button
              type="submit"
              className="login-button"
              {...(submitting && { disabled: true })}
            >
              {isLogin ? "Rejoin the Udderverse" : "Join the Udderverse"}
            </button>
          </form>
        </div>
      </MooBox>
    </div>
  );
};

export default Login;
