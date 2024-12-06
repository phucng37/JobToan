const formatToVND = (amount) => new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  }).format(amount);

export {
    formatToVND
}