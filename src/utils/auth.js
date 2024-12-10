import { ROLE } from "../constant/role";

const isUser = localStorage.getItem('role') === ROLE.USER;
const isAdmin = localStorage.getItem('role') === ROLE.ADMIN;

export {
    isAdmin,
    isUser
}