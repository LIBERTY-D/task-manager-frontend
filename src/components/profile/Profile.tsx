import { useState } from "react";
import { ContactInformation } from "./contact-information/ContactInformation";
import { PersonalInformation } from "./personal-information/PersonalInformation";
import "./profile.css"
import { UpdateModal } from "./UpdateModal";

export const Profile = () => {
  const [show,setShow] =  useState<boolean>(false)

  const showProfModal = ()=>{
         setShow(_=>{
             return true
         })
  }
  
const closeModal=()=>{
    setShow(false)
  
}
  return (
    <main className="main-content-profile">
      <h1>Profile</h1>
      {show &&   <UpdateModal closeModal={closeModal}/>}
      <div className="profile">
        <PersonalInformation showProfModal={showProfModal}/>
        <ContactInformation showProfModal={showProfModal}/>
      </div>
    </main>
  );
};


