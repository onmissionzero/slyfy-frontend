import { Link, useRouteError } from "react-router-dom";

function NotFound() {
    const error = useRouteError();

    return (
        <div className="bg-black w-full h-screen flex items-center justify-center text-white font-palanquin">
            <section className="text-center">
                <p className="text-8xl p-5 font-semibold">
                    {error && error.status ? error.status : "404"}
                </p>
                <p className="text-6xl p-5 font-semibold">
                    Page Not Found
                </p>
                <Link
                    to="/"
                    className="inline-block mt-10 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
                >
                    <p className="border-2 border-[#363636] font-medium rounded-lg px-3 py-2 leading-none text-center">
                        Go Back Home
                    </p>
                </Link>
            </section>
        </div>
    );
}

export default NotFound;