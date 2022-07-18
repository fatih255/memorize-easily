import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from 'storeContext'

function AddCategoryInput() {

    const { useError, changeAddCategoryNameInputText, useErrorResetToDefault, response } = useStore()

    const onChangeHandler = (e) => {
        useErrorResetToDefault()
        changeAddCategoryNameInputText(e.target.value)
        useError('category_name_length', { condition: e.target.value.length <= 1 })
    }

    return (
        <input
            onChange={onChangeHandler}
            placeholder="Kategori Adı" type="text"
            className={`${response?.actionName == 'create_category' && response?.type === 'error' ? 'outline-red-200 placeholder:text-red-300 text-red-600' : response?.actionName == 'create_category' && response?.type === 'success' ? 'outline-emerald-300 text-emerald-500 placeholder:text-emerald-300' : 'text-gray-900 outline-gray-300'} outline-none outline-2 outline-dashed text-xl rounded-md px-2  py-2`} />
    )
}

export default observer(AddCategoryInput)