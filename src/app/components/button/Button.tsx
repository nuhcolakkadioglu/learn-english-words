"use client"

interface ButtonPorps {
    children?: React.ReactNode,
    onClick?: () => void;
    className?: string
}

const Button = ({ children, onClick, className }: ButtonPorps) => {
    return (
        <button className={className} onClick={onClick}>{children}</button>
    )

}

export default Button