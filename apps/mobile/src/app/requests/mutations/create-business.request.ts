import 'react-native-get-random-values';

import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export const createBusiness = async (name: string, contactPhone: string) => {
    try {
        const businessId = uuidv4();
        return await axios.post('http://localhost:3333/api/businesses', {
            id: businessId,
            name: name,
            contactPhone: contactPhone,
        })
    } catch (err) {
        console.error(err)
    }
}