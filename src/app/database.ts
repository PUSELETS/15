import { ID } from "appwrite";

import { Client, Databases } from "appwrite"

const ENDPOINT = "https://cloud.appwrite.io/v1"
const PROJECT_ID = "66f2b298000014fd6163"
const DATABASE_ID_DEV = "66f2bb02000fc3e82db0"
const COLLECTION_ID_customer_info = "6898149a000a2981b37c"
const COLLECTION_ID_product_info = "689815b4003e12e82879"
const COLLECTION_ID_sales_info = "68981fa9001e6d2f486f"

const client = new Client()
     .setEndpoint(ENDPOINT) 
     .setProject(PROJECT_ID);

const databases = new Databases(client);

export {client, databases, DATABASE_ID_DEV, COLLECTION_ID_customer_info} 


const collections = [
   {
       'databaseId':DATABASE_ID_DEV,
       'id':COLLECTION_ID_customer_info,
       'name':'customer'
   },
   {
       'databaseId':DATABASE_ID_DEV,
       'id':COLLECTION_ID_product_info,
       'name':'products'
   },{
       'databaseId':DATABASE_ID_DEV,
       'id':COLLECTION_ID_sales_info,
       'name':'sales'
   }

]

const db = {} as any

collections.forEach( col =>{
   db[col.name] = {
       create: (data:any, id = ID.unique())=> databases.createDocument( col.databaseId, col.id, id, data ),

       update: (data:any, id: string) => databases.updateDocument( col.databaseId, col.id, id, data ),

       get: (id: string) => databases.getDocument( col.databaseId, col.id, id ),

       list: (queries: any)=> databases.listDocuments( col.databaseId, col.id, queries ),

       delete: (id:string)=> databases.deleteDocument( col.databaseId, col.id, id )
    }
})



export {db}