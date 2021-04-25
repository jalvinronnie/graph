import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from '../_actions/user_actions';

export default function (ComposedClass, role) {
    function RoleCheck(props) {
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();
        console.log(user);

        useEffect(() => {
            dispatch(auth()).then(async response => {
                if(response.payload.role !== role) {
                    props.history.push('/');
                }
            })
        }, [props.history, dispatch]);

        return (
            <ComposedClass {...props} user={user} />
        )
    }

    return RoleCheck;
}