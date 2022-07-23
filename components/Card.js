import { observer } from 'mobx-react-lite';
import React from 'react'
import { useStore } from '../store';
import { FiEdit3 } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useSpring, animated } from 'react-spring'

function Card() {


    const { cards, selectedCategory, IsAddCard, previewCard, editcard, removeCard, editingCard } = useStore().CardStore

    const [styles, api] = useSpring(() => ({ opacity: 0 }))

    api.start({ opacity: editcard?.status ? 1 : 0 })

    return (<div className={` w-1/2 flex justify-center gap-8 flex-wrap items-center mx-2 text-clip transition-all duration-500 relative`}>
        {IsAddCard ? <div className="card-container w-[15vw] h-[15vw] ">
            <div className={`front w-[15vw] h-[15vw] border-2  ${editcard.card !== null ? 'border-blue-300' : 'border-emerald-300'}`}>{previewCard.frontText}</div>
            <div className={`back w-[15vw] h-[15vw] border-2  ${editcard.card !== null ? 'border-blue-300' : 'border-emerald-300'}`}>{previewCard.backText}</div>
        </div> : null
        }

        {
            //cards.filter(card => card.categoryId === selectedCategory.id).length === 0
            cards?.slice().sort((a, b) => b.order - a.order).filter(card => {
                if (editcard.card !== null) {
                    if (selectedCategory?.name === 'Hepsi') {
                        return editcard.card !== card;
                    } else {
                        return (card.categoryId === selectedCategory?.id && editcard.card !== card)
                    }
                } else {
                    if (selectedCategory?.name === 'Hepsi') {
                        return true;
                    } else {
                        return card.categoryId === selectedCategory?.id
                    }
                }
            }).map((card, index) => <div key={index} className={`${editcard.status ? 'pulse' : 'card-container'}  w-[15vw] h-[15vw] `}>
                {

                    <animated.div style={styles} className=" flex justify-end gap-2 px-2 py-2 w-full h-full absolute  z-10 ">
                        <div className="group">
                            <FiEdit3 onClick={() => editingCard(card)} className="text-blue-500 hover:text-blue-400 w-5 h-5 cursor-pointer   editcard-icon" />
                            <div className="opacity-0 group-hover:opacity-100 group-hover:border-2 rounded-sm group-hover:border-blue-300 transition-all duration-200 ease-in-out w-full h-full absolute top-0 left-0 z-0  pointer-events-none"></div>
                        </div>
                        <div className="group">
                            <RiDeleteBinLine onClick={() => removeCard(card.id)} className="text-red-500 w-5 h-5 cursor-pointer  hover:text-red-400 removecard-icon" />
                            <div className="opacity-0 group-hover:opacity-100 group-hover:border-2 rounded-sm group-hover:border-red-300 transition-all duration-200 ease-in-out w-full h-full absolute top-0 left-0 z-0  pointer-events-none"></div>
                        </div>
                    </animated.div>
                }

                <div className={`front w-[15vw] h-[15vw]`}>{card.frontText}</div>
                <div className="back w-[15vw] h-[15vw]">{card.backText}</div>
            </div>)
        }
        <div hidden={IsAddCard || selectedCategory?.name === "Hepsi" && cards?.length !== 0 || cards?.find(card => card.categoryId === selectedCategory?.id)} className="px-4 py-2 bg-yellow-100 rounded-md">
            Bu Kategoride Kayıtlı Kart Bulunamadı <span className="font-semibold">Lütfen Kart Ekleyin</span>
        </div>
    </div>
    )
}

export default observer(Card)
