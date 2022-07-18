import React, { useEffect, useRef } from 'react'
import { useStore } from '../storeContext';
import { observer } from "mobx-react-lite"
import AddCategory from './AddCategory';

import Form from './Form'

const addCard = () => {


    const { previewCard, IsAddCard, changeIsAddCard, addedCard, editcard, useResponseMessage, updateCard } = useStore()



    return (
        <div className={`${IsAddCard ? 'w-1/4': ''} flex flex-col before:bg-gray-500 bg-white   justify-start items-start `}>


            <div className={`relative transition-all ease-in-out delay-0 duration-[.7s] mt-5 mr-5 gap-5  flex flex-col`}>
                <div className="">
                    <span className={`${IsAddCard ? '' : 'hidden'}  truncate text-xl  cursor-pointer hover:transition-all box-border hover:text-red-600 hover:bg-white hover:outline-2 outline-dashed hover:outline-red-600 bg-red-600 text-white w-min px-4 py-2 rounded-md`} onClick={changeIsAddCard} >X</span>
                    <input onClick={changeIsAddCard} className={`${IsAddCard ? 'hidden' : ''} mr-5 delay-900  duration-1000   text-xl font-normal cursor-pointer transition-all hover:transition-all box-border hover:text-emerald-600 outline-dashed hover:bg-white hover:outline-2 hover:outline-emerald-600 bg-emerald-600 text-white px-2 py-2 rounded-md `} type="button" value="Yeni Kart Ekle" />
                </div>
                <div className={`${IsAddCard ? '' : 'hidden'}   flex flex-col gap-3`}>
                    <AddCategory />
                    <h2 className="w-full text-xl font-semibold">{editcard.card !== null ? `Kartı Düzenle` : 'Yeni Kart Ekle'}</h2>
                    <Form
                        items={[
                            { fieldName: 'frontText', placeholder: 'Ön', defaultValue: editcard.card !== null ? editcard.card.frontText : '' },
                            { fieldName: 'backText', placeholder: 'Arka', defaultValue: editcard.card !== null ? editcard.card.backText : '' },
                        ]}
                        //validations='not-empty-all-field '
                        validations={{
                            isFilledAll: 'Tüm Alanlar Zorunludur',
                            isEmptyField: ['Kartin Ön Yazısını Girmeyi Unututunuz', 'Kartin Arka Yazısını Girmeyi Unututunuz']
                        }}
                        button={{
                            name: `${editcard.card !== null ? `Güncelle` : 'Ekle'}`,
                            submitEvent: ({ validate: { isAllEmpty, isFilledAll, validationMessage, emptyFields } }) => {

                                isAllEmpty && useResponseMessage('isAllEmpty', validationMessage['isAllEmpty'], 'error')

                                emptyFields.length > 0 && emptyFields.map(name => {
                                    useResponseMessage(name, validationMessage[name], 'error')
                                })

                                if (isFilledAll) {
                                    editcard.card !== null ? updateCard() : addedCard()

                                }
                            }
                        }}
                        keyUpBind={(value) => {
                            previewCard.edit(value)
                        }}
                        resetAfterSuccessSubmit={true}
                        contentClass='flex flex-col gap-7 w-full'
                    />
                </div>
            </div>

        </div>
    )
}

export default observer(addCard)
