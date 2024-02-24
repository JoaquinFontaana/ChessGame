export default function Button({ handleClick, className, children }) {
    return (
        <button onClick={handleClick} className={className}>
            {children}
        </button>
    )
}