var set = function (cartList) {
  localStorage.setItem("cartList", JSON.stringify(cartList));
};

var get = function () {
  const cartList = JSON.parse(localStorage.getItem("cartList"));
  if (cartList == null) {
    return [];
  }
  return cartList;
};

var setAddress = function (val) {
  localStorage.setItem("address", JSON.stringify(val));
};

var getAddress = function () {
  const addressList = JSON.parse(localStorage.getItem("address"));
  if (addressList == null) {
    return [];
  }
  return addressList;
};

export { set };

export { get };

export { setAddress };

export { getAddress };
