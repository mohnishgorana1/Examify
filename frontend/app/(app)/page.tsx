"use client";
import { setUserFromStorage } from "@/redux/store/userSlice";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function HomePage() {
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user.user);

  useEffect(() => {
    dispatch(setUserFromStorage());
  }, []);

  return <div>HomePage {user?._id}</div>;
}

export default HomePage;
