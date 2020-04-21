import React from "react";
import socket from '../../socket'

export default function JoinBlock() {
  return (
    <div className="wrapper">
      <div className="join-block">
        <input type="text" placeholder="Room ID" />
        <input type="text" placeholder="Your Name" />
        <button>Connect</button>
      </div>
    </div>
  );
}
