import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'

import { fetchWrapper } from 'helpers';
import { serverRuntimeConfig } from 'next.config';
import jwt from 'jsonwebtoken';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user')));


export const userService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    register,
    login,
    logout,
    getRefreshToken,
    getAll
};

function getRefreshToken() {

    if (userService.userValue?.accessToken && userService.userValue?.refreshToken) {
        jwt.verify(userService.userValue?.accessToken, serverRuntimeConfig.accessTokenSecret, { algorithm: 'HS256' }, function (err, decoded) {
            if (err?.name === "TokenExpiredError") {

                //if the access token has expired , get new access token though refreshToken
                return fetchWrapper.post(`${baseUrl}/token`, userService.userValue).then(user => {
                    userSubject.next(user);
                    console.log(user)
                })
            }

            //if acccess token pass the jwt verify , return true because you not need to get refreshToken
            if (!err) console.log("your access token is not expired yet")
        })
        //if not have access token please login
    } else console.error("not have access token please login")

}

function login(email, password) {
    return fetchWrapper.post(`${baseUrl}/authenticate`, { email, password })
        .then(user => {
            if (!user.id) return Promise.reject(user?.message);
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));
        });
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/login');
}

function register(email, password) {
    return fetchWrapper.post(`${baseUrl}/register`, { email: email, password: password })
        .then(user => {
            if (user.isEmailExist) {
                return Promise.reject('Email already in use');
            } else {
                userSubject.next(user);
                localStorage.setItem('user', JSON.stringify(user));
                return user;
            }

        })
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}
