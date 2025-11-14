import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"


export const getServerSideUser = async () =>{
   
    const tokenization =await cookies()
    const token = tokenization.get('user-token')?.value 

    const user = token

    if(!user){
        return null
    } else {
        return { user }
    }
}

export const deleteCookies = async () =>{

    const deleteUser = await cookies()

    return deleteUser.delete('user-token')
}
