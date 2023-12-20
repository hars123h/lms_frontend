import { isAuth } from "../helper/auth";

export default function UserAuth() {
  if (isAuth()) {
    return true;
  } else {
    return false;
  }
}
