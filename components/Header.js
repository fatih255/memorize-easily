import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import Navbar from './Navbar'

export default observer(Header)

function Header() {
    return (
        <div>
            <Head>
                <title>Memorize Easily</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
        </div>
    )
}
