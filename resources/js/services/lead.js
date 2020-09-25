import axios from 'axios'

const send = async (data) => {
    return await axios.post("/api/leads", data)
        .then(response => ({success: response.status === 201 }))
        .catch(response => ({success: false, error: response.response.data}));
}

const lead = {
    send,
}
export default lead;
