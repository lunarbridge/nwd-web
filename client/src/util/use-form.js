// https://upmostly.com/tutorials/using-custom-react-hooks-simplify-forms/
import { useState } from 'react';

export const useForm = (callback) => {
    const [values, setValues] = useState({});

    const handleSubmit = (event) => {
        // prevents the default action of the event (refreshing the page after the event has been called)
        if (event) event.preventDefault();
        callback();
    };

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({...values, [event.target.name]: event.target.value}));
    };

    return {
        handleChange,
        handleSubmit,
        values,
    }
};