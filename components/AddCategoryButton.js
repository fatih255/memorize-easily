import React, { useEffect, useRef } from 'react'
import { useStore } from 'storeContext'

export default function AddCategoryButton({ disable, categoryName }) {

    const { createCategory } = useStore()

    const categoryButtonRef = useRef(null)

    const onClickHandler = () => {
        !disable && createCategory(categoryName)
    }

    useEffect(() => {

        const categorybtnMouseMove = (e) => {
            e.target.style = `--x:${e.offsetX}px; --y:${e.offsetY}px; --display:block`
        }
        const categorybtnMouseLeave = (e) => {
            e.target.style = `--display:none;`
        }

        categoryButtonRef.current.addEventListener('mousemove', categorybtnMouseMove);
        categoryButtonRef.current.addEventListener('mouseleave', categorybtnMouseLeave);

        return () => {
            categoryButtonRef.current?.removeEventListener("mousemove", categorybtnMouseMove);
            categoryButtonRef.current?.removeEventListener("mouseleave", categorybtnMouseLeave);
        }
    }, [])


    return (
        <button
            ref={categoryButtonRef}
            data-error="Kategori adı en az 2 karakterden oluşmalıdır"
            className={` ${disable ? 'addcategorybtn bg-slate-400 cursor-not-allowed' : ' hover:text-emerald-600  hover:bg-white hover:outline-2 hover:outline-emerald-600 bg-emerald-600 '} hover:transition-all box-border outline-dashed relative
    text-white  px-6 py-2 rounded-md `}
            onClick={onClickHandler}>Kategori Ekle</button>
    )
}
