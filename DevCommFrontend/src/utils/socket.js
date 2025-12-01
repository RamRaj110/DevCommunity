import io from 'socket.io-client';
import { BASE_URL } from './constants.js';


export const createSocketConnection = ()=>{
    if(location.hostname === "localhost"){
    return io(BASE_URL)
}else{
return io()
}
}