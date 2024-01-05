import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { authContext } from "../../../context/authContext";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CatSelect from "../catSelect/CatSelect";
import File from "../fileUploader/File";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  maxHeight: "80vh",
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
};

const color = [
  "white",
  "black",
  "red",
  "marun",
  "being",
  "pink",
  "green",
  "yellow",
];

const AddProduct = ({ open, handleClose, handleCounter, selectedProduct }) => {
  const auth = useContext(authContext);
  // hadi hia l call back state li andwzoha l select bax ybdlna l9ima dialha fo9ma tbdl
  const [select,setSelect]=useState()
  // famille
  const [famille, setFamille] = useState();

  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([
    { name: "S", quantity: 0, check: false },
    { name: "M", quantity: 0, check: false },
    { name: "L", quantity: 0, check: false },
  ]);

  const [checkedColor, setCheckedColor] = useState("");
  // loading dia backDrop
  const [loading, setLoading] = useState(false);
  // had affiche dial l'affichage dial selects
  const [affiche, setAffiche] = useState(true);


// dial loader li anst3mloha f file.jsx
const [imageChange, setChanged] = useState(false);



  const handleCheckboxValue = (event) => {
    setCheckedColor(event.target.checked ? event.target.value : "");
  };

  // checked event :
  const handleCheckboxChange = (event) => {
    setSizes((prevSizes) =>
      prevSizes.map((size) =>
        size.name === event.target.value
          ? { ...size, check: event.target.checked }
          : size
      )
    );
  };

  const handleQuantityChange = (event) => {
    setSizes((prevSizes) =>
      prevSizes.map((size) =>
        size.name === event.target.id
          ? { ...size, quantity: parseInt(event.target.value) }
          : size
      )
    );
  };
  // end event

  // njibo lafamille
  useEffect(() => {
    const handleFetch = async () => {
      if (selectedProduct) {
        let res = await auth?.BahaWjdha(selectedProduct?.category.name);
        res.categories.push({ name: selectedProduct?.category.name });
        setFamille(res.categories);
        setImages(selectedProduct?.imageUrl);
        setAffiche(false);
        setCheckedColor(selectedProduct?.color);
        //hadi drtha 7it quantity katb9a zero 3liha an3iyt ldik lfunction li catbdl les valeurs w kata5d default
        setSizes((prevSizes) =>
          prevSizes.map((size, i) => ({
            ...size,
            quantity: parseInt(selectedProduct?.sizes?.[i]?.quantity || 0),
          }))
        );
      }
    };
    handleFetch();
  }, [selectedProduct]);
  //end famille
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const form = new FormData(e.target);
      const data = {
        imageUrl: images,
        brand: form.get("brand"),
        title: form.get("title"),
        color: checkedColor,
        discountPrice: form.get("discountPrice"),
        price: form.get("price"),
        discountPercent: parseInt(
          ((form.get("price") - form.get("discountPrice")) /
            form.get("price")) *
            100
        ),
        sizes: sizes,
        quantity: sizes.reduce((total, item) => total + item.quantity, 0),
        ...(select.first && { topLevelCategory: select.first }),
        ...(select.second && { secondLevelCategory: select.second }),
        ...(select.third && { thirdLevelCategory: select.third }),
        description: form.get("description"),
      };
      if (selectedProduct) {
        await auth?.UpdateProduct(data, selectedProduct._id);
      } else {
        await auth?.CreateProduct(data);
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }

    handleCounter();
    handleClose();
    return setLoading(false);
  };

  return (
    <div>
        {console.log("images aaa",images)}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2
            style={{ textAlign: "center" }}
            className="p-5 text-red-400 text-2xl font-bold"
          >
            {" "}
            {!selectedProduct ? "Create New Product" : "Edit Product"}
          </h2>
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12}>
                {selectedProduct && (
                  <div className=" mt-5">
                    <TextField
                      required
                      id="id"
                      name="id"
                      label="Product Id"
                      fullWidth
                      autoComplete="given-name"
                      value={selectedProduct?._id}
                      readOnly
                    />
                  </div>
                )}
                <div className="w-[70%] mt-5">
                  <TextField
                    required
                    id="title"
                    name="title"
                    label="Product Title"
                    fullWidth
                    autoComplete="given-name"
                    defaultValue={selectedProduct?.title}
                  />
                </div>
                <div className="mt-5">
                  <TextField
                    required
                    id="description"
                    name="description"
                    label="Product Description"
                    fullWidth
                    autoComplete="given-name"
                    multiline
                    rows={4}
                    defaultValue={selectedProduct?.description}
                  />
                </div>
                <div className="w-[70%] mt-5">
                  <TextField
                    required
                    id="brand"
                    name="brand"
                    label="Product Brand"
                    fullWidth
                    autoComplete="given-name"
                    defaultValue={selectedProduct?.brand}
                  />
                </div>
                <h1 className="mt-5 text-center font-bold text-lg">
                  Product Category{" "}
                </h1>

                {affiche ? (
                  <div className="mt-5 flex items-center justify-between ">
                    {/* hna select */}
                    <CatSelect setState={setSelect}/>
                    <Grid item xs={3}>
                      {selectedProduct && (
                        <IconButton
                          className="w-full absolute top-0 right-0 z-10 flex-1"
                          onClick={() => setAffiche(!affiche)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </div>
                ) : (
                  <div className="flex justify-between items-center mt-5 flex-3">
                    {famille.map((e, i) => (
                      <Grid
                        item
                        xs={3}
                        key={i}
                        className="text-center w-full text-md font-semibold"
                      >
                        {e.name}
                      </Grid>
                    ))}
                    <Grid item xs={3}>
                      {selectedProduct && (
                        <IconButton
                          className="w-full absolute top-0 right-0 z-10 flex-1"
                          onClick={() => setAffiche(!affiche)}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </div>
                )}
              </Grid>
              <Grid item xs={12}>
                <h1 className="mt-5 text-center font-bold text-lg">
                  Product Images{" "}
                </h1>
                <File setState={setImages} initial={images} imageChange={imageChange} setChanged={setChanged} isSetting={false}/>
              </Grid>
              <Grid item xs={12}>
                <h1 className="mt-5 text-center font-bold text-lg p-5">
                  Product Price{" "}
                </h1>
                <div className="flex justify-around items-center ">
                  <TextField
                    required
                    label="Discounted Price"
                    id="discountPrice"
                    name="discountPrice"
                    autoComplete="given-name"
                    type="number"
                    defaultValue={selectedProduct?.discountPrice}
                  />
                  <TextField
                    required
                    label="Price"
                    id="price"
                    name="price"
                    autoComplete="given-name"
                    type="number"
                    step="0.01"
                    defaultValue={selectedProduct?.price}
                  />
                </div>
              </Grid>

              <Grid item sx={12} className="w-full">
                <div className="w-full mt-5">
                  <h1 className="text-lg font-bold text-center">Sizes Info</h1>
                </div>
                <div className="flex justify-between items-center w-full  mt-5">
                  {sizes.map((e, i) => (
                    <div
                      key={i}
                      className="flex flex-col justify-center items-center p-5"
                    >
                      <FormControlLabel
                        control={<Checkbox value={`${e.name}`} />}
                        label={`Size ${e.name}`}
                        onChange={handleCheckboxChange}
                      />
                      {e.check && (
                        <TextField
                          label={`Size ${e.name}`}
                          id={e.name}
                          name={e.name}
                          autoComplete="given-name"
                          type="number"
                          onChange={handleQuantityChange}
                          defaultValue={selectedProduct?.sizes[i].quantity}
                          InputProps={{
                            inputProps: {
                              min: 0,
                            },
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </Grid>
              <Grid item xs={12}>
                <h1 className="mt-5 text-center font-bold text-lg p-5">
                  Product Color{" "}
                </h1>
                <div className="flex flex-wrap justify-between items-center w-full mt-5">
                  {color.map((e, i) => (
                    <div key={i} className={`w-1/2 sm:w-1/4 p-5`}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={`${e}`}
                            onClick={handleCheckboxChange}
                            checked={checkedColor == e}
                          />
                        }
                        label={`${e}`}
                        onChange={handleCheckboxValue}
                      />
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="success"
              className="m-auto"
              type="submit"
            >
              {selectedProduct ? "Edit Product" : "Create Product"}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddProduct;
