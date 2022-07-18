import React, { useEffect, useRef } from 'react'




const BaseClass = 'outline-none outline-2 outline-dashed text-xl  rounded-md px-2 py-2  '
const componentClasses = {
    afterResponse: {
        error: ' outline-red-500 placeholder:text-red-500 text-red-500 ' + BaseClass,
        success: ' outline-emerald-400 placeholder:text-emerald-500 text-emerald-500 ' + BaseClass,
    },
    default: ' outline-indigo-100 placeholder:text-gray-300' + BaseClass,
    button: 'w-full   text-xl font-normal cursor-pointer hover:transition-all box-border hover:text-emerald-600 outline-dashed hover:bg-white hover:outline-2 hover:outline-emerald-600 bg-emerald-600 text-white  px-6 py-2 rounded-md',
}




function Form({ items, keyUpBind, validations, contentClass, button: { name, submitEvent }, resetAfterSuccessSubmit }) {

    let fieldRefs = []
    let valueObject = {}



    const addCardHandler = () => {
        let validateFields = { isEmptyAll: true, isFilledAll: false, validationMessage: [], emptyFields: [] };

        items.map(({ fieldName }, index) => {
            //if empty field
            if (fieldRefs[fieldName].current.value === '') {
                fieldRefs[fieldName].current.className = componentClasses.afterResponse.error + componentClasses.afterResponse.default
                validateFields.emptyFields.push(fieldName)
                validations !== undefined && (validateFields.validationMessage[fieldName] = validations.isEmptyField[index])
            }
            if (fieldRefs[fieldName].current.value !== '') {
                fieldRefs[fieldName].current.className = componentClasses.afterResponse.success + componentClasses.afterResponse.default
            }
        })

        validateFields.isEmptyAll = validateFields.emptyFields.length === items.length
        validateFields.isFilledAll = validateFields.emptyFields.length === 0
        validations !== undefined && validateFields.isEmptyAll && (validateFields.validationMessage['isEmptyAll'] = validations.isEmptyAll)

        submitEvent({
            validate: validateFields,
            value: Object.assign({}, Object.keys(fieldRefs).map(key => {
                return { name: key, value: fieldRefs[key].current.value }
            }))
        })


        if (validateFields.isFilledAll && resetAfterSuccessSubmit) {
            if (resetAfterSuccessSubmit?.delay) {
                setTimeout(() => {
                    Object.values(fieldRefs).map(ref => { ref.current.value = ''; ref.current.className = componentClasses.default })
                }, resetAfterSuccessSubmit?.delay)
            } else {
                Object.values(fieldRefs).map(ref => { ref.current.value = ''; ref.current.className = componentClasses.default })
            }

        }

    }

    const Item = (props) => {

        const ItemRef = useRef()
        fieldRefs[props.fieldName] = ItemRef;


        useEffect(() => {
            const keyuphandler = (e) => {
                ItemRef.current.className = componentClasses.default
                valueObject[props.fieldName] = e.target.value
                keyUpBind(valueObject)
            }

            if (ItemRef.current !== null) {
                ItemRef.current.addEventListener('keyup', keyuphandler)

                if (props?.defaultValue !== undefined) {
                    ItemRef.current.value = props.defaultValue
                }
            }

            return () => {
                ItemRef.current && ItemRef.current?.removeEventListener('keyup', keyuphandler)
            }

        }, [])

        return <textarea ref={ItemRef} key={props.index} className={componentClasses.default} placeholder={props.placeholder} />
    }

    return (
        <div className={contentClass}>
            {
                items.map((item, index) => {
                    return <Item key={index} {...item} />
                })
            }
            <input onClick={addCardHandler} className={componentClasses.button} type="button" value={name} />
        </div>
    )
}

export default Form
