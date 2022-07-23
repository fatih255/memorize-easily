import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStore } from 'store';

export default observer(ToastMessage)

function ToastMessage() {

    // console.log('rendered input response')

    const toastId = React.useRef(null);

    const { useResponseMessageReset, response } = useStore().CardStore

    const notify = () => {
        if (!toast.isActive(toastId.current)) {
            toastId.current = toast(response.message, { theme: 'colored', type: response.type });
        }
    }

    toast.onChange(v => {
        if (v.status === "removed") {
            useResponseMessageReset()
        }
    })
    useEffect(() => {
        if (response?.actionName) {
            toast(response.message, { theme: 'colored', type: response.type })
        }
    }, [response])


    return (<ToastContainer autoClose={1000} limit={5} />)

}


