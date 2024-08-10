import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import useProfile from '../contexts/profile';
import Seo from "../components/Seo";

function Login() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { profile } = useProfile();

  useEffect(() => {
    if (profile) {
      navigate('/');
    }
  }, [profile, navigate]);

  const handleLogin = () => {
    window.location.replace(`${backendURL}/authorize`);
  };

  const handleFAQClick = () => {
    navigate('/faq');
  };

  return (
    <>
      <Seo
      title="Login | Slyfy"
      description="Login to Slyfy."
      image="https://raw.githubusercontent.com/onmissionzero/slyfy-frontend/main/public/opengraph-image.png"
      url="https://slyfy.vercel.app/login"
      />
      <Button text="Login" handle={handleLogin} />
      <div
        className="fixed top-4 right-4 group cursor-pointer flex items-center"
        onClick={handleFAQClick}
        title="FAQ"
      >
        <span className="mr-2 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          FAQ
        </span>
        <img
          src="/info-icon.svg"
          alt="Info Icon"
          width="20"
          height="20"
          className="transition duration-300 ease-in-out transform group-hover:scale-125"
        />
      </div>
    </>
  );
}

export default Login;
