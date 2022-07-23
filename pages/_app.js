import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { StoreProvider } from '../store'
import { userService } from 'services';
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // run auth check on route change
    router.events.on('routeChangeComplete', authCheck)



    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }
  }, []);

  async function authCheck(url) {

    // redirect to login page if accessing a private page and not logged in 
    const publicPaths = ['/login', '/'];
    const path = url.split('?')[0];
    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      });
    } else {
      userService.getRefreshToken()
      setAuthorized(true)

    }
  }





  return <StoreProvider>
    <div className="flex flex-col w-screen  ">
      <Header />
      {authorized &&
        <Component {...pageProps} />
      }
    </div>
  </StoreProvider>
}


export default MyApp
