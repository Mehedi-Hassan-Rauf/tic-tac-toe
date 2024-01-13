const Tile = ({ value, index, handleVal }) => {
  return (
    <div
      key={index}
      className={`w-24 h-24 border border-cyan-500 text-cyan-500 text-3xl flex justify-center items-center`}
      onClick={() => {
        handleVal(index);
      }}
    >
      {value}
    </div>
  );
};

export default Tile;
