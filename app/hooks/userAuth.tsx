import { useSelector } from "react-redux";

export default function UserAuth() {
  const { user } = useSelector((state: any) => state.auth);
  console.log("User Checking", user);
  
  
  if (user) {
    return true;
  } else {
    return false;
  }
}
