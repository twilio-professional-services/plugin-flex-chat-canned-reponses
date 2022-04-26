import { useQuery } from 'react-query';
import axios from 'axios';

const getCannedReponses = async () => {
    const { data } = await axios.get('https://plugin-chat-responses-data-8720.twil.io/responses');
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