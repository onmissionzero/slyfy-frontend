import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useProfile from '../contexts/profile';

const CallbackHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateProfile } = useProfile();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userProfile = {
      error: params.get('error') || null,
      pfp_url: params.get('pfp_url') || null,
      display_name: params.get('display_name') || null,
    };
    if(userProfile.error) {
      navigate('/error');
    }
    if (userProfile.pfp_url && userProfile.display_name) {
      updateProfile(userProfile);
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [location.search, navigate, updateProfile]);

  return <div>Processing...</div>;
};

export default CallbackHandler;
