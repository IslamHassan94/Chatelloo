import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import "./Login.css";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className='login'>
      <div className='login__container'>
        <img src='https://am3pap005files.storage.live.com/y4m7xQ1aRFKGxg92w-F0-2aE21Ps-qX2gjwXyW5LOpAQ3IhorO5WIisw_2-JqKI2NVfjsGWX4-_IHJsM8q0UeIBCNPPjw9ksRm7hzK_wXAfL_dhsOAKyeRbyJd7Soipypq9LTR3GXoqLOZZ_nCveJCqsWhCYzjj_pHGCg7FaDLLLf8J53ceiK_wWEK6jAgEDkpORjsQZ41FEVMI-KCYoUPkzoiWOs2D_D1TmJH5_oaL5GU?encodeFailures=1&width=500&height=500' />

        <div className='login__text'>
          <h1>Sign in to ChatEllo</h1>
        </div>
        <Button className='login__containerButton' onClick={signin}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
