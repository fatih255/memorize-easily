import { observer } from 'mobx-react-lite'
import React from 'react'

import { useStore } from '../store'
import AddCategoryButton from './AddCategoryButton'
import AddCategoryInput from './AddCategoryInput'
import AddCategoryList from './AddCategoryList'




function AddCategory() {

    const { selectedCategory, addCategoryNameInputText, error } = useStore().CardStore

    return (<div className="flex flex-col gap-2">
        <span className="font-semibold text-xl">Kategori Seç {![undefined, 'Hepsi'].includes(selectedCategory?.name) ?
            <small className="text-emerald-600 "> {`(${selectedCategory?.name} Seçildi)`}</small> : null}
        </span>
        <AddCategoryList />
        <div className="flex flex-row gap-6 mt-2">
            <AddCategoryInput />
            <AddCategoryButton disable={error?.category_name_length} categoryName={addCategoryNameInputText} />
        </div>
    </div>)
}

export default observer(AddCategory)