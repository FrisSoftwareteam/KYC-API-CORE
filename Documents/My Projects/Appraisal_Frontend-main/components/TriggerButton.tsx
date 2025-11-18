import React from "react";
import { Button } from "./ui/button";
import { useGetAnswerId } from "@/zustand/store";
import { OvalUserProfile } from "./ovalProfile";
const TriggerButton = ({ name, id, email }: any) => {
  // console.log(name);

  const { getAnsId } = useGetAnswerId();

  const OnButton = () => {
    //console.log("query", name);
    getAnsId(id, email);
  };
  return (
    <div>
      {/* <Button onClick={OnButton}>{name}</Button> */}
      <OvalUserProfile username={name} avatarUrl="" onClick={OnButton} />
    </div>
  );
};

export default TriggerButton;
