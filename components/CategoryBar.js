import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../storeContext'
import DragableScroll from './DragableScroll'

function CategoryBar() {

    const { categories, selectedCategory, changeselectedCategory, IsAddCard } = useStore()

    const onClickCategoryHandler = (category) => {
        changeselectedCategory(category)
    }

    return (

        <div className={` w-1/6 transition-all duration-500  ease-in-out flex flex-col pl-5 text-center gap-4 py-5`}>
            <span className="text-xl font-semibold">Kategoriler</span>
            <DragableScroll>
                <ul className={`gap-5 flex category-list flex-col   max-h-96  justify-start px-4 py-6`}>
                    {
                        categories?.length !== 0 ? categories?.map((category, index) =>
                            <li key={index} onClick={() => onClickCategoryHandler(category)} className={`${selectedCategory === category ? 'bg-emerald-600 hover:bg-emerald-700 ' : 'bg-blue-600 hover:bg-blue-700  '} px-2 py-2 rounded-md text-white  cursor-pointer`} >
                                {category.name}
                            </li>) : null
                    }
                </ul>
            </DragableScroll>
        </div>

    )

}
export default observer(CategoryBar)