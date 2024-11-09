

const TopComponent = ({ top, name, type, selectedOption }) => {

  const dataToDisplay = top?.[selectedOption];

  return (
    <div className="rounded-lg m-2 mx-5 p-2 bg-[#121212] w-[50%] h-full font-semibold text-white overflow-y-scroll">
      <h4 className="m-2 p-2 font-bold text-xl">{name}</h4>
      {dataToDisplay?.length > 0 ? (
        dataToDisplay.map(item => (
          <div key={item.name} className="flex items-center m-5">
            <img
              src={item.image}
              alt={`${item.name}'s picture`}
              className="rounded-full w-10 h-10 mr-2"
            />
            <div>
              <p>{item.name}</p>
              {item.artists && item.artists.length > 0 && (
                <p>
                  {item.artists.map((artist, index) => (
                    <span key={index} className="text-[#858585]">
                      {artist}
                      {index < item.artists.length - 1 && ', '}
                    </span>
                  ))}
                </p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default TopComponent;
