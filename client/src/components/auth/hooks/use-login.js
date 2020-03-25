import { Cytomine, User } from "cytomine-client";

import { useForm } from "../../../util";
import { saveCurrentUser } from "../../../util";

export const useLogin = (props) => {
  const login = () => {
    const loginRequest = async() => {
      await Cytomine.instance.login(values.username, values.password);
      const me = await User.fetchCurrent();

      saveCurrentUser({
        id: me.id,
        username: me.username,
        publicKey: me.publicKey
      });

      props.history.push("/projects");
    }

    loginRequest();
  }

  const { values, handleChange, handleSubmit } = useForm(login);

  return {
    login,
    handleChange,
    handleSubmit
  }
}