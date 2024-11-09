

const Footer = () => {
    return (
        <div className="m-4 flex text-center justify-center items-center text-white fixed bottom-4">
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
                    title="onmissionzero's GitHub"
                />
            </a>
        </div>
    );
}

export default Footer;
