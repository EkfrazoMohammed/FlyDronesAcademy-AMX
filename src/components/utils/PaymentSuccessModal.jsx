
const SuccessModal = () => {
  
  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <div className="rounded-full h-52 w-52 flex items-center justify-center mx-auto">
          <span className="text-green-500 text-6xl">✓</span>
        </div>
        <h1 className="text-green-600 font-bold text-4xl mt-5">Success</h1>
        <p className="text-gray-600 text-lg mt-3">
          We received your purchase request;<br />
          Check your mail or confirmation mail will arrive shortly!
        </p>
       
      </div>
    </div>
  );
};

export default SuccessModal;
