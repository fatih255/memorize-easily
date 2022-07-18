import React, { useContext } from "react";
import { CardStore } from "./CardStore";


const StoreContext = React.createContext(new CardStore())

const StoreProvider = ({ store, children }) => {
    return <StoreContext.Provider value={store} >{children}</StoreContext.Provider>
}

const useStore = () => {
    return useContext(StoreContext);
}

export { StoreProvider, useStore }