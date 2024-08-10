
const FaqItem = ({ question, answer }) => {
  return (
    <div className="mb-4 p-4 rounded-lg shadow-md border border-[#606060]">
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      <p>{answer}</p>
    </div>
  );
};

export default FaqItem;
