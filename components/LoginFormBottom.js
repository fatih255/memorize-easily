import React from 'react'

export default function LoginFormBottom({ hidden }) {
    return (
        <div hidden={hidden} className="flex justify-between items-center mb-3 mt-3">
            <div className="form-group form-check">
                <input type="checkbox" className=" hover:bg-blue-200 checked:hover:bg-blue-700 form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" id="exampleCheck2" />
                <label className="form-check-label inline-block text-gray-800 hover:underline cursor-pointer select-none" htmlFor="exampleCheck2">Beni Hatırla</label>
            </div>
            <a href="#!" className="text-gray-800 hover:underline">Şifremi Unuttum</a>
        </div>
    )
}
