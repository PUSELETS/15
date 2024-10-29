import { cookies } from "next/headers"
import { verifyAuth } from "./auth"

export const getServerSideUser = async () =>{
   
    const tokenization =await cookies()
    const token = tokenization.get('user-token')?.value

    const user = token && (
        await verifyAuth(token).catch((err) => {
            console.log(err)
        })
    )

    if(!user){
        return null
    } else {
        return user
    }

    
}
