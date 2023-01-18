import React, { Component } from 'react'
import Fallback from '../fallback/FallBack';

export class Errorboundary extends Component<any,any> {
  constructor(props:any) {
    super(props);
    this.state = { hasError: false,error:null,errorinfo:null };
  }

  static getDerivedStateFromError(error:any,) {
    console.log(error)
    // Update state so the next render will show the fallback UI.
    return { hasError: true,error,errorinfo:null };
  }

  componentDidCatch(error:any, errorInfo:any) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo,"erroinfo");
  }
  render() {
    console.log(this.state.hasError,'error')
   if(this.state.hasError)
   return(<Fallback error={this.state.error}/>)
   else return(this.props.children)
  }
}

export default Errorboundary