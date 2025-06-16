"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserFromStorage } from "@/redux/store/userSlice";

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserFromStorage());
  }, [dispatch]);

  return <>{children}</>;
};

export default AppInitializer;
