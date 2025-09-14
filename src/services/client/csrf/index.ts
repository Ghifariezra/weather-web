import axios from "axios";

const CsrfRequest = async () => {
    const res = await axios.get(`/api/auth/csrf`, { withCredentials: true });
    return res.data;
};

export { CsrfRequest };