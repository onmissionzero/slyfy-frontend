import { Link } from 'react-router-dom';

function ErrorPage() {

    return (
        <div className="bg-black w-full h-screen min-h-max flex items-center justify-center">
            <section className="text-white font-palanquin text-center">
                <p className="text-8xl p-5 font-semibold"></p>
                <p className="text-6xl p-5 font-semibold">Some Error Occurred</p>
                <Link to="/" className="mt-10 inline-block rounded-lg transition duration-300 ease-in-out transform hover:scale-110">
                    <p className="border-2 border-[#363636] font-medium rounded-lg px-3 py-2 leading-none text-center">
                        Go Back Home
                    </p>
                </Link>
            </section>
        </div>
    );
}

export default ErrorPage;
