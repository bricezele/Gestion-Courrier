import axios from "axios";

export const fetchProductApi = () => {
    return axios.get(`/api/product.json`);
};

export const fetchChatApi1 = () => {
    return axios.get(`/api/chatMember.json`);
};

export const fetchChatApi2 = () => {
    return axios.get(`/api/chat.chats.json`);
};

export const fetchEmailApi = () => {
    return axios.get(`/api/email.json`);
};

export const fetchBookmaekApi = () => {
    return axios.get(`/api/bookmark.json`);
};

export const fetchTodoApi = () => {
    return axios.get(`/api/todo.json`);
};

export const fetchTaskApi = () => {
    return axios.get(`/api/task.json`);
};

export const fetchProjectApi = () => {
    return axios.get(`/api/project.json`);
};
