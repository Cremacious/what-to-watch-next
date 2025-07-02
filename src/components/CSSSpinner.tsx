const CSSSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        <p className="text-blue-400">Loading...</p>
      </div>
    </div>
  );
};

export default CSSSpinner;
