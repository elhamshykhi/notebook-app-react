function Button({ children, handleClick }) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-turquoise w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center"
    >
      {children}
    </button>
  );
}

export default Button;
