export const mapToState =(state)=>{
    return {
        ...state
    }
}

export const mapToDispatch =(dispatch)=>{
    return{
        printProfile:(data)=>dispatch({
            type:'getData',
            payload:data
        }),
        setUser:(data)=>dispatch({
            type:'user',
            payload:data
        })
    }
}