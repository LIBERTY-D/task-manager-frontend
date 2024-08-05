import { IoIosClose } from "react-icons/io";
import "../../update.css";
import { FaPlus } from "react-icons/fa";
import { FC, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useAuth } from "../../context/auth/Auth";
import { SlideTopToast } from "../slide-top-toast/SlideTopToast";
import { BytesToUrl } from '../../utils/BytesToBase64';

const post_user_url=  import.meta.env.VITE_USER_URL
const post_profile_url=  import.meta.env.VITE_PROFILE_URL


type UpdateModalType = {
  closeModal: () => void;
};

type submitType = {
  firstName: string;
  lastName: string;
  desc: string;
  profileImage: Blob | File | string;
  email: string;
};
export const UpdateModal: FC<UpdateModalType> = ({ closeModal }) => {
  
  const [data, setData] = useState<submitType>({
    firstName: "",
    lastName: "",
    desc: "",
    profileImage: "",
    email: "",
  });

  const [successOrErr, setSuccessOrErr] = useState<{ message: string; isErr: boolean; isSuccess: boolean }>({
    message: "",
    isErr: false,
    isSuccess: false
  });
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [isChoosing, setIsChoosing] = useState(false);
  const { user, updateUser } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        try {
          const refreshedUser = await axios.get(`${post_user_url}/${user.user.id}`, {
            headers: {
              Authorization: `Bearer ${user.user.token}`
            }
          });

          setData({
            firstName: refreshedUser.data.user.firstName,
            lastName: refreshedUser.data.user.lastName,
            desc: refreshedUser.data.profile.desc,
            email: refreshedUser.data.user.email,
            profileImage: refreshedUser.data.profile.profileImage
          });
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUser();
  }, [user]);

  useEffect(() => {
    const fetchUser = async () => {
      if (user && isUpdated) {
      
        try {
          const refreshedUser = await axios.get(`${post_user_url}/${user.user.id}`, {
            headers: {
              Authorization: `Bearer ${user.user.token}`
            }
          });

          updateUser({
            ...user,
            user: {
              ...user.user,
              firstName: refreshedUser.data.user.firstName,
              lastName: refreshedUser.data.user.lastName,
              profileDesc: refreshedUser.data.profile.desc,
              email: refreshedUser.data.user.email,
              profileImage: refreshedUser.data.profile.profileImage
            }
          });
          setTimeout(()=>{
            window.location.reload()
          },3000)
          console.log(refreshedUser);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUser();
  }, [isUpdated]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.target.name === "profileImg" && e.target.type === "file") {
      setIsChoosing(true);
      const file = e.target.files[0];
      setData((prevState) => ({
        ...prevState,
        profileImage: file,
      }));
    } else {
      const field = e.target.name;
      const value = e.target.value;

      setData((prevState) => {
        return { ...prevState, [field]: value };
      });
    }
  };

  const handleUpdateSubmit = async (_: React.MouseEvent<HTMLButtonElement>) => {
    if (!data.desc || !data.email || !data.firstName || !data.lastName) {
      setSuccessOrErr({
        isErr: true,
        isSuccess: false,
        message: "fields can't be empty"
      });
   
    } else {
      if (data.desc && data.desc.length > 0) {
        await updateProfileData();
      }
      await updateUserData();

      setTimeout(() => {
        setIsChoosing(false);
        setIsUpdated(true);
    
      }, 3000);
    }
  };

  const updateUserData = async () => {
    try {
      const postData = await axios.patch(`${post_user_url}/${user?.user.id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.user.token}`
        }
      });
      if (postData.status === 200) {
        setSuccessOrErr({
          isErr: false,
          isSuccess: true,
          message: "update success"
        });

        setTimeout(() => {
          setSuccessOrErr({
            isErr: false,
            isSuccess: false,
            message: ""
          });
        }, 3000);
      }
   
    } catch (err) {
      if (err instanceof AxiosError) {
        if(err.status==403){
          setSuccessOrErr({
            isErr: true,
            isSuccess: false,
            message: err.response?.data.message || "An error occurred"
          });
          setTimeout(() => {
            setSuccessOrErr({
              isErr: false,
              isSuccess: false,
              message: ""
            });
          }, 3000);
        }else if(err.status==401){
          setSuccessOrErr({
            isErr: true,
            isSuccess: false,
            message: err.response?.data.message 
          });
          setTimeout(() => {
            setSuccessOrErr({
              isErr: false,
              isSuccess: false,
              message: ""
            });
          }, 3000);
        }
   
      } else {
   
        setSuccessOrErr({
          isErr: true,
          isSuccess: false,
          message: "An unexpected error occurred"
        });
        setTimeout(() => {
          setSuccessOrErr({
            isErr: false,
            isSuccess: false,
            message: ""
          });
        }, 3000);
      }
    }
  };

  const updateProfileData = async () => {
    const formData = new FormData();
    formData.append("desc", data.desc);
    if (data.profileImage instanceof File || data.profileImage instanceof Blob) {
      formData.append("profileImg", data.profileImage);
    }

    try {
      const postData = await axios.patch(`${post_profile_url}/${user?.user.profileId}`, formData, {
        headers: {
          Authorization: `Bearer ${user?.user.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      if (postData.status === 200) {
        setSuccessOrErr({
          isErr: false,
          isSuccess: true,
          message: "update success"
        });

        setTimeout(() => {
          setSuccessOrErr({
            isErr: false,
            isSuccess: false,
            message: ""
          });
        }, 3000);
      }

    } catch (err) {
      if (err instanceof AxiosError) {
        setSuccessOrErr({
          isErr: true,
          isSuccess: false,
          message: err.message
        });
        setTimeout(() => {
          setSuccessOrErr({
            isErr: false,
            isSuccess: false,
            message: ""
          });
        }, 3000);
        console.log(err);
      } else {
       
        setSuccessOrErr({
          isErr: true,
          isSuccess: false,
          message: "An unexpected error occurred"
        });
        setTimeout(() => {
          setSuccessOrErr({
            isErr: false,
            isSuccess: false,
            message: ""
          });
        }, 3000);
      }
    }
  };

  const closeTopToast = (_: React.MouseEvent<HTMLButtonElement>) => {
    setSuccessOrErr({
      isErr: false,
      isSuccess: false,
      message: ""
    });
  };

  
  return (
    <>
    {successOrErr.isErr&&<SlideTopToast message={successOrErr.message} show={successOrErr.isErr} onClose={closeTopToast}/>}
    {successOrErr.isSuccess&&<SlideTopToast message={successOrErr.message} show={successOrErr.isSuccess} onClose={closeTopToast}/>}
    <div className="main-update">
      <span className="close-update">
        <IoIosClose onClick={closeModal} />
      </span>
      <form className="form-container-modal-update" >
        <div className="form-group image">
         {isChoosing? <img
            src={
              URL.createObjectURL(data.profileImage)} 
            
            alt="img"
          />: <img src={data.profileImage==null||data.profileImage.length==0?"/assets/blank.jpg":
            BytesToUrl(data.profileImage)}  alt="img" />}
          <label htmlFor="profileImg">
            <FaPlus className="choose-profile-img" />
          </label>

          <input
            style={{ display: "none" }}
            accept="image/*"
            type="file"
            id="profileImg"
            name="profileImg"
            
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">firstname</label>
          <input
            value={data?.firstName}
            type="text"
            id="name"
            name="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">lastName</label>
          <input
            value={data?.lastName}
            type="text"
            id="lastName"
            name="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            value={data?.email}
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="desc">desc</label>
          <textarea
            value={data?.desc}
            name="desc"
            id="desc"
            rows={10}
            cols={50}
            onChange={handleChange}
          />
        </div>

        <button type="button" className="form-submit-btn" onClick={handleUpdateSubmit}>
          update personal information
        </button>
      </form>
    </div>
    </>
  );
};
