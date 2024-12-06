const getTotalPages = (totalItems, limit) => {
    let totalPages = 1;
    if (totalItems > limit) {
        if (totalItems % limit === 0) {
            totalPages = totalItems / limit;
        } else {
            totalPages = Math.floor(totalItems / limit) + 1;
            console.log('totalpage: ', totalPages);
        }
    }
    return totalPages;
}

const paginateConfig = {
    pageRangeDisplayed: 3,
    marginPagesDisplayed: 2,
    nextLabel: ">",
    previousLabel: "<",
    pageClassName: "page-item",
    pageLinkClassName: "page-link",
    previousClassName: "page-item",
    previousLinkClassName: "page-link",
    nextClassName: "page-item",
    nextLinkClassName: "page-link",
    breakLabel: "...",
    breakClassName: "page-item",
    breakLinkClassName: "page-link",
    containerClassName: "pagination",
    activeClassName: "active"
}

const getIndex = (page, limit) => {
    return (page - 1) * limit;
}

export {
    getTotalPages,
    getIndex,
    paginateConfig
}