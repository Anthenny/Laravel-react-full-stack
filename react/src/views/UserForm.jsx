import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUserState] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState(null);

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUserState(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (user.id) {
            axiosClient
                .put(`/user/${user.id}`.user)
                .then(() => {
                    // TODO SHOW NOTIFICATION
                    navigate("/users");
                })
                .catch((err) => {
                    const response = err.response;

                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post(`/users`.user)
                .then(() => {
                    // TODO SHOW NOTIFICATION
                    navigate("/users");
                })
                .catch((err) => {
                    const response = err.response;

                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };
    return (
        <>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}

            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}

                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}

                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            value={user.name}
                            type="text"
                            placeholder="Name"
                            onChange={(e) =>
                                setUserState({ ...user, name: e.target.value })
                            }
                        />
                        <input
                            value={user.email}
                            type="text"
                            placeholder="Email"
                            onChange={(e) =>
                                setUserState({ ...user, email: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Password"
                            onChange={(e) =>
                                setUserState({
                                    ...user,
                                    password: e.target.value,
                                })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Password confirmation"
                            onChange={(e) =>
                                setUserState({
                                    ...user,
                                    password_confirmation: e.target.value,
                                })
                            }
                        />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
};

export default UserForm;
