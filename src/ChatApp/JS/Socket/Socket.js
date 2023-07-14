import { io } from "socket.io-client";
// import { getUserSession } from "../services/userService";

// const user=getUserSession().user

export const socket = io("http://localhost:3001",
// {
//     withCredentials:true,
//     query:{user}
// }
);

