import React, { useEffect } from 'react'
import ToastMessage from 'components/ToastMessage'
import { useStore } from 'storeContext'
import AddCard from '../components/AddCard'
import CategoryBar from '../components/CategoryBar'
import Card from '../components/Card'
import { observer } from 'mobx-react-lite'
import { AiTwotoneEdit } from 'react-icons/ai';
import { runInAction } from 'mobx'

function Dashboard() {

    const { IsAddCard, editcard, cards, categories } = useStore()


    const EditCardHandler = () => {


        if (editcard.status) {
            runInAction(() => {
                editcard.status = false;
                editcard.card = null;
                IsAddCard = false;
            })
        }else{
            editcard.status = true;
        }

    }

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
export default observer(Dashboard)