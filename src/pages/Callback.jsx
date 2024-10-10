import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useProfile from '../contexts/profile';

function Callback() {
  const navigate = useNavigate();
  const { updateProfile } = useProfile();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');

    // Enhanced error handling and logging
    if (!accessToken || !refreshToken) {
      console.error('Cannot parse the tokens. Ensure they are correctly provided in the URL.');
      navigate('/error'); // Redirect to an error page or handle as needed
      return;
    }

    // Store tokens and update profile
    try {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      updateProfile({ accessToken, refreshToken });

      navigate('/'); // Redirect to the home page or appropriate route
    } catch (error) {
      console.error('Failed to store tokens or update profile:', error);
      navigate('/error'); // Redirect to an error page or handle as needed
    }
  }, [navigate, updateProfile]);

  return <div>Loading...</div>;
}

export default Callback;
