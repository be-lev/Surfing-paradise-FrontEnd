import axios from "axios";


export function setAuthorizationToken(token){
    if (token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // axios.interceptors.request.use(config=>{
        //     config.headers.authorization = `Bearer ${token}`;
        //     return config
        // },error =>{
        //     return Promise.reject(error)
        // })
    }else{
        delete axios.defaults.headers.common['Authorization']
    }
}