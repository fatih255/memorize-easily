import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Button from '../components/Button'
import LoginFormBottom from '../components/LoginFormBottom'
import TextInput from '../components/TextInput'
import InputError from '../components/InputError';
import { userService } from 'services';
import { useRouter } from 'next/router';


export default function Login() {

    const router = useRouter();

    const [forLogin, setforLogin] = useState(true);


    useEffect(() => {
        // redirect to home if already logged in
        if (userService.userValue) {
            router.push('/');
        }
    }, []);

    const LoginSchema = yup.object({
        email: yup.string().email('Geçersiz Email').required('Bu Alan Zorunludur'),
        password: yup.string().required('Bu Alan Zorunludur').min(6, 'Şifre en az 6 karakterden oluşmalıdır '),
    }).required();

    const { register, handleSubmit, watch, setError, formState: { errors } } = useForm({
        resolver: yupResolver(LoginSchema)
    });

    function onSubmit({ email, password }) {
        switch (forLogin) {
            case false:
                return userService.register(email, password)
                    .then(() => {
                        // if user registered redirect dasboard with route query param 
                        // query param =  for show congratulations you are registered successfully
                        router.push({
                            pathname: '/dasboard',
                            query: { registered: 'ok' }
                        });
                    })
                    .catch(error => {
                        setError('apiError', { message: error });
                    });
            default:
                return userService.login(email, password)
                    .then(() => {
                        // get return url from query parameters or default to '/'
                        const returnUrl = router.query.returnUrl || '/';
                        router.push(returnUrl);
                    })
                    .catch(error => {
                        setError('apiError', { message: error });
                    });
        }



    }

    const changeFormStateHandler = () => {
        setforLogin(!forLogin)
    }
    return (
        <section className="flex justify-center items-center h-screen">
            <div className="px-6 w-full text-gray-800">
                <div className="flex xl:justify-center  lg:justify-between justify-center items-center flex-wrap g-6">
                    <div className="xl:ml-20 xl:w-3/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">

                        <div className="mb-10">
                            <h1 className="text-3xl text-center mb-2 text-blue-700 font-semibold w-full">Memorize Easily'e Hoşgeldiniz</h1>
                            <h1 className="text-md text-center  text-gray-500 font-normal w-full">
                                {forLogin ? 'Kolay Ezberlemek İçin Hemen Giriş Yap' : 'Kolay Ezberlemek Hızlıca Kaydol'}
                            </h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextInput {...register("email")} type="text" placeholder="Mail Adresiniz" />
                            <InputError error={errors.email} />
                            <TextInput  {...register("password", { required: true, minLength: 6 })} type="password" placeholder="Şifreniz" />
                            <InputError error={errors.password} />
                            <LoginFormBottom hidden={!forLogin} />
                            <InputError error={errors.apiError} extraclass="my-2" />
                            <div className="text-center lg:text-left mt-4">
                                <Button type="submit" text={forLogin ? 'Giriş Yap' : 'Kayıt Ol'} twcolor="blue" />
                            </div>
                        </form>
                        <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                            Bir Hesabınız Yok mu? <button onClick={changeFormStateHandler} className="text-blue-600 pl-2 hover:underline hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">
                                {forLogin ? 'Kayıt Ol' : 'Giriş Yap'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
