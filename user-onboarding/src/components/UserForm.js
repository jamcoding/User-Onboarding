import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';

const UserForm = ({ touched, errors, status }) => {
    console.log("This is our status", status);
    const [users, setUsers] = useState({});

    useEffect(() => {
        status && setUsers(status);
    }, [status]);

    return (
        <div className="form">
            <Form>
                <label>
                    Name:
                    <Field type="text" name="name" placeholder="Name" />
                    {touched.name && errors.name && (
                        <p>{errors.name}</p>
                    )}
                </label>
                <label>
                    Email:
                    <Field type="email" name="email" placeholder="Email" />
                </label>
                <label>
                    Password:
                    <Field type="password" name="password" placeholder="Password" />
                </label>
                <label>
                    Terms of Service
                    <Field type="checkbox" name="terms" />
                    <span className="checkmark" />
                    {touched.terms && errors.terms && (
                        <p>{errors.terms}</p>
                    )}
                </label>
                <button>Submit</button>
            </Form>
        </div>
    )
}

export default withFormik({
    mapPropsToValues: props => ({
        name: props.name || "",
        email: props.email || "",
        password: props.password || "",
        terms: false
    }),
    validationSchema: yup.object().shape({
        name: yup.string().required("This field is required"),
        terms: yup.boolean().oneOf([true], "You must agree to the Terms of Service").required()
    }),
    handleSubmit: (values, { resetForm, setStatus }) => {
        // console.log("values", values);
        axios
            .post('https://reqres.in/api/users', values)
            .then(response => {
                console.log('response', response);
                setStatus(response.data);
                resetForm();
            })
            .catch(error => console.log('error', error));
    }
})(UserForm);
