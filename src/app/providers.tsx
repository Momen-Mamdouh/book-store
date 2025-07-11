"use client"
import { Provider } from "react-redux";
import reduxStore from "@/lib/redux/reduxStore";



export function ReduxProvider({children}: {children:React.ReactNode,}){
          
        return (
                <Provider store={reduxStore}>
                        {children} 
                </Provider>
        )


}