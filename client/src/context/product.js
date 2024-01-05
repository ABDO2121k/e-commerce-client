import axios from "axios";


export const findProducts =async (data) => {
  const {
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  }= data;
  try {
    const res =await axios.get(
      `/api/products?color=${colors}&sizes=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&pageNumber=${pageNumber}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageSize=${pageSize}`
    );
    return {products:res.data,pages:res.data.totalPages}
  } catch (err) {
    console.log(err);
  }
};



export const findProductById =async (productId) => {
    try {
      const res =await axios.get(`/api/products/id/${productId}`);
      return res.data
    } catch (err) {
      console.log(err);
    }
  };
  
