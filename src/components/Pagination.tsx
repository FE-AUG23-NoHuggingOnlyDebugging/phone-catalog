const Pagination = () => {
  const previous = '<';
  const next = '>';

  return (
    <div>
      <button>{previous}</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>{next}</button>
    </div>
  );
};

export default Pagination;
