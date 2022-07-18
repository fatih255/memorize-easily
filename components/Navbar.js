import { useState, useEffect } from 'react';


import { userService } from 'services';
import NavLink from './NavLink';

export default Navbar;

function Navbar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        userService.logout();
    }

    // only show nav when logged in
    //if (!user) return null;

    return (
        <nav className="bg-white border-gray-200 md:px-16 sm:px-4 py-8 rounded dark:bg-gray-800">
            <div className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium items-center">
                <NavLink href="/" exact className="block py-2 pr-4 pl-3 text-black  rounded md:bg-transparent md:text-black-700 md:p-0 dark:text-black">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Memorize Easily</span>
                </NavLink>
                <div className="flex justify-end w-full gap-8">
                    <NavLink href="/" exact className="block py-2 pr-4 pl-3 text-black rounded md:bg-transparent md:text-black-700 md:p-0 dark:text-white">Anasayfa</NavLink>
                    {user ? [
                        <NavLink key="1" href="/dasboard" exact className="block py-2 pr-4 pl-3 text-black rounded md:bg-transparent md:text-black-700 md:p-0 dark:text-white">Panel</NavLink>,
                        <a key="2" href="" onClick={logout} className="cursor-pointer">Çıkış</a>]
                        :
                        <NavLink href="/login" exact className="block py-2 pr-4 pl-3 text-black rounded md:bg-transparent md:text-black-700 md:p-0 dark:text-white">Giriş Yap</NavLink>}
                </div>
            </div>
        </nav>

    );
}