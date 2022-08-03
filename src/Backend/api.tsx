import { Message } from "Models/Message";
import store from "Store/Store";
import { pushMessage } from "Store/Slices/MessagesSlice";

const SERVER_URL = process.env.SERVER_URL;

export const route = (route: string) => `${SERVER_URL}${route}`;

export const api = {
    error: (err) => {
        console.error(err);

        const content =
            err?.response?.data?.message ?? err.message ?? err.toString();

        const message: Message = {
            type: "error",
            message: content,
        };

        store.dispatch(pushMessage(message));
    },

    download: (res, filename: string) => {
        const raw = window.URL.createObjectURL(res.data);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = raw;
        a.download = filename;
        a.click();
    },
};
