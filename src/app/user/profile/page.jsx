"use client"
import axios from "axios";
import { useEffect, useState } from "react";

const UserProfile = () => {
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    useEffect(() => {
        setToken(localStorage.getItem("accessToken"));
    }, [])

    useEffect(() => {
        parsingProfile();
    }, [token])

    const parsingProfile = () => {
        axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:4000/api/v1/me',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }
    return (
        <>
            {user && (
                <>
                    Nama: {user?.name}<br />
                    Email: {user?.email}<br />
                    Username: {user?.username}<br />
                </>
            )}
        </>
    );
}

export default UserProfile;