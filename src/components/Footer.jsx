

const Footer = () => {
    return (
        <div className="flex mt-5 text-center justify-center items-center text-white absolute bottom-7">
            <p className="font-montserrat">
                2024 &copy; onmissionzero
            </p>
            <a
                href="https://github.com/onmissionzero"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 flex items-center
                transition duration-300 ease-in-out
                transform hover:scale-125"
            >
                <img 
                    src="/github-mark-white.svg"
                    alt="GitHub Logo"
                    width="20" 
                    height="20" 
                    className=""
                />
            </a>
        </div>
    );
}

export default Footer;