// components/Loader.jsx
const Loader = ({ size = 8 }) => {
  return (
    <div className="flex justify-center items-center h-40">
      <div 
        className={`animate-spin rounded-full h-${size} w-${size} border-b-2 border-primary`}
      ></div>
    </div>
  );
};

export default Loader;