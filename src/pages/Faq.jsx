import { Link } from "react-router-dom";
import FaqItem from "../components/FaqItem";
import Header from "../components/Header";
import useProfile from "../contexts/profile";
import Seo from "../components/Seo";

function Faq() {
  const { profile } = useProfile();

  const faqs = [
    {
      question: "Why does this not work for me?",
      answer: (
        <>
         If the app isn&apos;t working for you, it&apos;s likely because you&apos;re not on the whitelist. Contact the developer on{" "}
          <a href="https://discord.com/invite/6YyMRZSq" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Discord
          </a>.
        </>
      )
    },
    {
      question: "What is the whitelist?",
      answer: (
        <>
          Due to how Spotify works (compliance with developer policy), the app is in <a href="https://developer.spotify.com/documentation/web-api/concepts/quota-modes" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            development mode
          </a>. There can only be so many people accessing the app (testers) that the developer has to approve.
        </>
      )
    }
  ];

  return (
    <>
    <Seo
      title="FAQ | Slyfy"
      description="Read the Frequently Asked Questions."
      image="https://example.com/path/to/image.jpg"
      url="/faq"
    />
    <div className="min-h-screen text-white font-palanquin w-full overflow-hidden">
      <section className="flex flex-col items-center">
        {profile ? (
          <Header />
        ) : (
          <Link
            to="/"
            className="mt-10 rounded-lg transition-width ease-in-out duration-300 hover:w-full w-40"
          >
            <p className="border-2 border-[#363636] font-medium rounded-lg px-3 py-2 leading-none text-center transition-colors duration-300 ease-in-out hover:border-[#ffffff]">
              Go Back Home
            </p>
          </Link>
        )}
        
        <div className="p-4 mt-8 w-full">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="h-[calc(100vh-16rem)] overflow-y-auto p-4 rounded-lg">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                question={`${index + 1}. ${faq.question}`}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

export default Faq;
