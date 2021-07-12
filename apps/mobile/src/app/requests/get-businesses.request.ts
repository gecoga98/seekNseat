import axios from "axios";

export const getBusinesses = async () => {
    try {
        return await axios.get('http://localhost:3333/api/businesses', {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (e) {
        console.log(e);
    }
}