import axios from "axios";


const useApi = axios.create({
    baseURL: "http://localhost:5100"
});


export const materialService = {
   
     recuperaMateriais : async () => {
        const response = await useApi.get("/RecuperaMateriais", {
            headers: {
                "Content-type": "application/json; chatset=utf-8"
            }
        });
        return response
     }
    
     


}