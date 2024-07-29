

const LoginButton = ({ text, handle }) => {
    return (
        <button
        onClick={handle}
        className="bg-[#1db954] font-montserrat font-bold
        rounded-full text-2xl w-60 h-20 px-2 py-1 hover:bg-[#16873d]"
        >
            {text}
        </button>
    );
}

export default LoginButton;