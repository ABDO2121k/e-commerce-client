import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CatSelect from "../catSelect/CatSelect";
import { useContext, useEffect, useRef, useState } from "react";
import { authContext } from "../../../context/authContext";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";

const CategogorySettings = () => {
  const [select, setSelect] = useState({
    first: "",
    second: "",
    third: "",
  });
  const [catSettings, setCat] = useState();
  const auth = useContext(authContext);
  const [changed, setChanged] = useState(false);
  const drag = useRef();
  const drag2 = useRef();

  const handleDelete = (index) => {
    let t = catSettings.filter((walo, i) => i !== index);
    setCat(t);
    setChanged(!changed);
  };

  useEffect(() => {
    const getCats = async () => {
      try {
        const res = await auth?.getCatSettings();
        return setCat(res);
      } catch (err) {
        console.log(err);
        return toast.error(err);
      }
    };
    getCats();
  }, []);

  const handelSaveCarouselState = async () => {
    if (select?.first == "" || select?.second == "" || select?.third == "")
      return false;
    setCat([...catSettings, select]);
    return setSelect();
  };

  const handleSaveCarousel = async () => {
    try {
      await auth?.setCatSettings(catSettings);
      return toast.success("Carousels are updated with success");
    } catch (err) {
      console.log(err);
      return toast.error(err);
    }
  };

  const handleSort = () => {
    let newOrder = [...catSettings];
    let mbdl = newOrder[drag.current];
    newOrder[drag.current] = newOrder[drag2.current];
    newOrder[drag2.current] = mbdl;
    setCat(newOrder);
  };

  return (
    <div className="mt-10">
      <h1 className="font-bold text-red-400 text-3xl">
        Category Carousel Settings :{" "}
      </h1>
      <Grid>
        <div className="flex items-center justify-between mt-10 p-5">
          <CatSelect setState={setSelect} browseAll={true} />
          <div className="p-5 w-full">
            <button
              className="btn btn-outline btn-info"
              type="button"
              onClick={handelSaveCarouselState}
            >
              Add Category Carousel
            </button>
          </div>
        </div>
      </Grid>
      <TableContainer component={Paper} className="mt-10">
        <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className="font-bold">First level Category</TableCell>
              <TableCell align="right">Second level Category</TableCell>
              <TableCell align="right">Third level Category</TableCell>
              <TableCell align="right">Method </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {catSettings?.map((row, i) => (
              <TableRow
                draggable
                onDragStart={() => (drag.current = i)}
                onDragEnter={() => (drag2.current = i)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.first}
                </TableCell>
                <TableCell align="right">{row.second}</TableCell>
                <TableCell align="right">{row.third}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleDelete(i)}>
                    <DeleteIcon className="text-red-300" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-10 flex justify-center">
        <button
          className="btn btn-outline btn-accent"
          onClick={handleSaveCarousel}
        >
          {" "}
          Save Category Carousel
        </button>
      </div>
    </div>
  );
};

export default CategogorySettings;
