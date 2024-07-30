import useProfile from "../contexts/profile";

const Profile = () => {

    const { display_name, id, pfp_url } = useProfile();
    return(
        <div className="flex justify-between items-center w-full text-white font-montserrat
        bg-[#121212] px-4 h-16 rounded-b-lg">
            <h2 className="">Hello, {display_name}</h2>
            <h1 className="font-bold text-3xl">Slyfy</h1>
            <img
            src={pfp_url}
            alt="Profile Picture"
            className="w-11 h-11 rounded-full cursor-pointer"
            />
        </div>
    );
}

export default Profile;