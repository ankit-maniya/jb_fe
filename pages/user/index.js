import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/reducers/userReducer";

const User = () => {
  const dispatch = useDispatch();
  dispatch(fetchUser())
  return (
    <div>
      hELLO
    </div>
  );
};

export default User;
