const initialstate ={
    userProfile:[],
    user:sessionStorage.getItem('name') || ""
}
export const profilereducer =(state=initialstate,action:{type:string,payload:any})=>{
    switch(action.type){
       case 'getData': return {...state,userProfile:action.payload};
       case 'user': return {...state,user:action.payload}
       default: return state;
    }
}