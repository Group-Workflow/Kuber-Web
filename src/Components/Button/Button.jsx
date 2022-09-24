import React from 'react'
import Ripple from '../Ripple/Ripple'
import './Button.css'

export const Button = (props) => {
    const { children } = props
    return (
        <button {...props}>
            {children}
            < Ripple />
        </button >
    )
}

export const FormButton = (props) => {
    const { children, className } = props
    return <Button {...props} className={`Button FormButton ${className}`}>{children}</Button>
}