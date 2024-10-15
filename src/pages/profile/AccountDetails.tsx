/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCurrentToken } from "@/redux/fetures/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";

const AccountDetails = () => {

  const token:any=useAppSelector(useCurrentToken)
  const user:any=verifyToken(token)
  return (
    <div>
      <h1>Hello , AccountDetails !</h1>
      <h1>Email : {user.email}</h1>
    </div>
  );
};

export default AccountDetails;
