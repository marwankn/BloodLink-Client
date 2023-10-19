import React from "react";
import ProfileForm from "../../components/ProfileForm/ProfileForm";

const ProfilePage = ({ userProfile, setUpdate, update }) => {
  return (
    <ProfileForm
      userProfile={userProfile}
      setUpdate={setUpdate}
      update={update}
    />
  );
};

export default ProfilePage;
