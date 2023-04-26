import { observer } from "mobx-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";

type params = {
    token:string;
} 
export default observer(function AccountVerified({token}:params){

  const navigate = useNavigate();
  const {userStore} = useStore();
  useEffect(()=>{
    userStore.verifyAccount(token);
  },[userStore]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Add logic to verify the account using the verificationCode
    // and navigate to the home page if successful
    navigate("/");
  };


  return (
    <div className="min-h-screen flex  justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Your account is verified successfully
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <p className="text-lg text-gray-700">
            You can log into the site now!
          </p>
        </div>
      </div>
    </div>
  );


}
)
