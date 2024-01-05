import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import AddProduct from "../modals/AddProductModal";

const ProductsTable = ({ products, handleCounter }) => {
  const [rows, setRows] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (products?.length > 0) {
      setRows(
        products?.map((product) => ({
          id: product._id,
          title: product.title,
          totalQuantity: product.quantity,
          color: product.color,
          createdAt: new Date(product.createdAt.toString()),
          brand: product.brand,
          numRatings: product.numRatings,
          category: product.category.name,
          sizeS: product.sizes[0].quantity,
          sizeM: product.sizes[1].quantity,
          sizeL: product.sizes[2].quantity,
          price: product.price,
          detais: product?._id.toString(),
          modifier: product,
        }))
      );
    }
  }, [products]);

  //rows
  const columns = [
    { field: "id", headerName: "Product Id", width: 200 },
    { field: "title", headerName: "Product Title", width: 200 },
    { field: "brand", headerName: "Product Brand", width: 150 },
    { field: "category", headerName: "Product Category", width: 200 },
    { field: "price", headerName: "Product Price", width: 150, type: "number" },
    {
      field: "color",
      headerName: "Product Color",
      width: 100,
      renderCell: (params) => (
        <div
          className={`w-8 h-8 rounded-full`}
          style={{ backgroundColor: params.value.toLowerCase() }}
        ></div>
      ),
    },
    {
      field: "numRatings",
      headerName: "Num Ratings",
      width: 150,
      type: "number",
    },
    {
      field: "totalQuantity",
      headerName: "Total Quantity",
      width: 200,
      type: "number",
    },
    {
      field: "sizeS",
      headerName: "Size S quantity",
      width: 200,
      type: "number",
    },
    {
      field: "sizeM",
      headerName: "Size M quantity",
      width: 200,
      type: "number",
    },
    {
      field: "sizeL",
      headerName: "Size L quantity",
      width: 200,
      type: "number",
    },
    {
      field: "createdAt",
      headerName: "Product Creation",
      width: 200,
      type: "date",
    },
    {
      field: "details",
      headerName: "View Product",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <VisibilityIcon onClick={() => navigate(`/product/${params.id}`)} />
        </>
      ),
    },
    {
      field: "modifier",
      headerName: "Edit Product",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <EditIcon
            onClick={() => (handleOpen(), setSelectedProduct(params.value))}
          />
        </>
      ),
    },
  ];

  //end rows

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[2, 5, 10]}
      />
      <AddProduct
        open={open}
        handleClose={handleClose}
        handleCounter={handleCounter}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default ProductsTable;
