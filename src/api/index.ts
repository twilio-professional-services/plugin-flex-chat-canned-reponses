import { useQuery } from 'react-query';
import axios from 'axios';

const getCannedReponses = async () => {
    const endpointURL = process.env.REACT_APP_SERVICE_FUNCTION_URL ?? '';
    const { data } = await axios.get(endpointURL);
    return data;
}

export const useResponses = () => {
    return useQuery(
        ['reponses'],
        async () => {
            const data = await getCannedReponses();
            return data;
        }
    );
};