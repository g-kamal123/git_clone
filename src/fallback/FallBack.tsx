import React, { FC } from 'react'

const Fallback:FC<any>=(props)=> {
    console.log(props)
  return (
    <>
    <h4>Something Went wrong!</h4>
    <details style={{cursor:'pointer'}}>{`${props.error}`}</details>
    </>
  )
}

export default Fallback