import Topbar from "./Topbar";
import Userbody from "./Userbody";
import React, { FC } from "react";
import { errorBoundary } from "./Search1";

const User:FC = (props) => {
  return (
    <>
      <Topbar />
      <Userbody />
    </>
  );
};

export default errorBoundary(User);
