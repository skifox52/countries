const Pagination = ({ count, click, currentPage }: any) => {
  const pages = []
  for (let i = 0; i < count; i++) {
    pages.push(
      <button
        key={i}
        className={currentPage == i + 1 ? "btn btn-disabled" : "btn"}
        onClick={click}
      >
        {i + 1}
      </button>
    )
  }
  return <div className="btn-group">{pages}</div>
}

export default Pagination
