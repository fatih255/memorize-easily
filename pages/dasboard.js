import React, { useEffect } from 'react'
import ToastMessage from 'components/ToastMessage'
import { useStore } from '../store'
import AddCard from '../components/AddCard'
import CategoryBar from '../components/CategoryBar'
import Card from '../components/Card'
import { AiTwotoneEdit } from 'react-icons/ai';


function Dashboard() {
    console.log('rendered app')
    const { changeEditCardState, getCategoryList, getCardList } = useStore().CardStore

    const EditCardHandler = () => {
        changeEditCardState()
    }

    useEffect(() => {
        getCategoryList()
        getCardList()
    }, [])

    return (
        <div className="w-full">
            <div onClick={EditCardHandler} className="ml-5 jus flex gap-2 items-center cursor-pointer hover:underline select-none">
                <AiTwotoneEdit className="text-blue-600 w-5 h-5" />
                <span>Kartları Düzenle</span>
            </div>
            <div className={`flex justify-between items-start flex-row`}>
                <CategoryBar />
                <Card />
                <AddCard />
            </div>
            <ToastMessage />
        </div>
    )
}
export default Dashboard