import { Grid} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/authContext";
import CategogorySettings from "../components/tables/CategogorySettings";
import File from "../components/fileUploader/File";

const Settings = () => {
  const auth = useContext(authContext);
  const [images, setImages] = useState();
  const [imageChange, setChanged] = useState(false);


  useEffect(() => {
    const getImage = async () => {
      try {
        const res = await auth?.getNews();
        await setImages(res.imageURls);
        return setChanged(false);
      } catch (err) {
        console.log(err);
      }
    };
    getImage();
  }, []);




  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <h1 className="font-bold text-red-400 text-3xl"> Add News : </h1>
          <File setState={setImages} initial={images} imageChange={imageChange} setChanged={setChanged} isSetting={true}/>
        </Grid>
        <Grid item xs={12}>
          <CategogorySettings />
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
