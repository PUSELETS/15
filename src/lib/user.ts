import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { database } from "@/app/firebase";
import { where } from "firebase/firestore";

export const getServerSideUser = async () => {
  const cookieStore = await cookies();           // ← still needed in some cases
  const token = cookieStore.get("user-token")?.value;
  // Early return - most common & clean pattern
  if (!token) {
    return null;   // ← or throw new Error("Not authenticated"), depending on your needs
  } try {
    const user = jwtDecode(token);  // now safe: token is string
    return user;
  } catch (err) {
    console.error("Invalid JWT token:", err);
    return null;
  }
};

export const sendUserToFirebase = async () => {
  const sentToFirebase = await cookies();           // ← still needed in some cases
  const token = sentToFirebase.get("user-token")?.value;
  if (!token) {
    return null;   // ← or throw new Error("Not authenticated"), depending on your needs
  }
   try {
    const user = jwtDecode(token) as any;      // now safe
    const email = user.email as string
    const email_verified = user.email_verified as string
    const picture = user.picture as string
    const name = user.name as string
    const sub = user.sub as string
    //check if user exist
    const document = await database.customer.list([where("sub", "==", sub)]);
    
    if (document.length !== 0){
      return
    } else {
      await database.customer.create({
        email, email_verified, picture, name, sub
      })
    }

    return ;

  } catch (err) {
    console.error("Data not sent to firebase:", err);
    await deleteCookies()
    return null;
  }
}

export const deleteCookies = async () => {
  const deleteUser = await cookies()
  return deleteUser.delete('user-token')
}
