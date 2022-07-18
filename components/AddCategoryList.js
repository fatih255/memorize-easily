import { observer } from 'mobx-react-lite'
import React from 'react'

import { useStore } from 'storeContext'
import DragableScroll from './DragableScroll'

function AddCategoryList() {


    const { categories, selectedCategory, changeselectedCategory } = useStore()
    const onClickCategoryHandler = (category) => {
        changeselectedCategory(category)
    }

    return (categories?.length !== 0 ? <DragableScroll>
        <div className=" max-w-md py-5">
            <ul className={`flex gap-4 flex-row justify-start `}>
                {categories.map((category, index) => <li key={index} onClick={() => onClickCategoryHandler(category)} className={`${selectedCategory === category ? 'bg-emerald-600 hover:bg-emerald-700 ' : 'bg-blue-600 hover:bg-blue-700  '} px-2 py-2 rounded-md text-white  cursor-pointer ${index === 0 ? 'hidden' : ''}`} >{category.name}</li>)}
            </ul>
        </div>
    </DragableScroll> : null)
}
export default observer(AddCategoryList)