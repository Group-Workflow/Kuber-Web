import React from "react";
import Ripple from "../Ripple/Ripple";

export const UserCard = (props) => {
  const {
    user = {
      displayName: "Loading...",
      email: "Loading...",
      photoURL: "Loading...",
      uid: null,
    },
    newChat = false,
    ...rest
  } = props;

  return (
    <div className="fl" style={{ background: "#fff" }}>
      <div
        className="p-rel fl c-p w-100"
        style={{
          background: "#fff",
          padding: ".5rem 1rem",
          overflow: "hidden",
        }}
        {...rest}
      >
        <div
          className="user-pic c-p"
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "#eee",
          }}
        ></div>
        <div
          className="user-data fl pl-1 c-p"
          style={{ width: "calc(100% - 50px)" }}
        >
          <div className="name-data w-100 fl fl-d-col fl-j-se lhinit h-100 ellipsis">
            <div className="name-item ellipsis">{user.displayName}</div>
            <div
              className="message-item ellipsis"
              style={{ fontSize: 14, color: "#ccc" }}
            >
              {newChat
                ? `Click to Start new chat with ${user.displayName}`
                : "Last message"}
            </div>
          </div>
          <div
            className="timestamp fl fl-c"
            style={{ width: 80, fontSize: 10, color: "#ccc" }}
          >
            {newChat ? "" : "2:30 PM"}
          </div>
        </div>
        <Ripple />
      </div>
    </div>
  );
};
