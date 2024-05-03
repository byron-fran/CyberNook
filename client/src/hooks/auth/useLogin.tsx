import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { loginUserThunk } from "../../redux/thunks/AuthThunk"
import { useNavigate } from "react-router-dom";
import { UserType } from "../../types/auth/User";

const useLogin = (handleSubmit: Function, reset: Function) => {

    const dispatch = useAppDispatch();
    const [errorLogin, seErrorLogin] = useState('')
    const Navigate = useNavigate();

    const onSubmit = handleSubmit((data : UserType) => {
        dispatch(loginUserThunk(data))
            .then((data) => {

                if (data?.type === 'auth/login/rejected') {
                    seErrorLogin(data.payload as string)
                    return
                }
                seErrorLogin('')
                Navigate('/')
            })
            .catch(error => {
                return error
            })
        //reset
        reset()
    });

    return {
        onSubmit,
        errorLogin
    }
};

export default useLogin