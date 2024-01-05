import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

const CatSelect = ({ setState, browseAll }) => {
  const [thirdChoice, setThirdChoice] = useState();
  const [select, setSelect] = useState({
    first: "",
    second: "",
    third: "",
  });

  // select value
  const wemen = [
    {
      id: "clothing",
      name: "Clothing",
      items: [
        { name: "Tops", id: "Tops" },
        { name: "Dresses", id: "Dresses" },
        { name: "Pants", id: "Pants" },
        { name: "Denim", id: "Denim" },
        { name: "Sweaters", id: "Sweaters" },
        { name: "T-Shirts", id: "T-Shirts" },
        { name: "Jackets", id: "Jackets" },
        { name: "Activewear", id: "Activewear" },
        ...(browseAll ? [{ name: "Browse All", id: "BrowseAll" }] : []),
      ],
    },
    {
      id: "accessories",
      name: "Accessories",
      items: [
        { name: "Watches", id: "Watches" },
        { name: "Wallets", id: "Wallets" },
        { name: "Bags", id: "Bags" },
        { name: "Sunglasses", id: "Sunglasses" },
        { name: "Hats", id: "Hats" },
        { name: "Belts", id: "Belts" },
        ...(browseAll ? [{ name: "Browse All", id: "BrowseAll" }] : []),
      ],
    },
  ];

  const men = [
    {
      id: "clothing",
      name: "Clothing",
      items: [
        { name: "Tops", id: "TopsM" },
        { name: "Pants", id: "PantsM" },
        { name: "Sweaters", id: "SweatersM" },
        { name: "T-Shirts", id: "T-ShirtsM" },
        { name: "Jackets", id: "JacketsM" },
        ...(browseAll ? [{ name: "Browse All", id: "BrowseAll" }] : []),
      ],
    },
    {
      id: "accessories",
      name: "Accessories",
      items: [
        { name: "Watches", id: "WatchesM" },
        { name: "Wallets", id: "WalletsM" },
        { name: "Bags", id: "Bags" },
        { name: "Sunglasses", id: "SunglassesM" },
        { name: "Hats", id: "HatsM" },
        { name: "Belts", id: "BeltsM" },
        ...(browseAll ? [{ name: "Browse All", id: "BrowseAll" }] : []),
      ],
    },
  ];

  // end select value
  const handleSelectChange = (val, name) => {
    setSelect({ ...select, [name]: val });
  };
  useEffect(() => {
    // rdit dak le 3 eme choix 5awi 7it bdlna le choix bax mayw93x error
    setThirdChoice("");
    if (select.first && select.second) {
      if (select.first == "men") {
        if (select.second == "clothing") {
          setThirdChoice(men[0].items);
        }
        if (select.second == "accessories") {
          setThirdChoice(men[1].items);
        }
      }
      if (select.first == "women") {
        if (select.second == "clothing") {
          setThirdChoice(wemen[0].items);
        }
        if (select.second == "accessories") {
          setThirdChoice(wemen[1].items);
        }
      }
    }
    setState(select);
  }, [select]);
  return (
    <>
      <div className="w-[80%] px-5">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            First Level Category
          </InputLabel>
          <Select
            value={select.first}
            label="First Level Category"
            onChange={(e) => handleSelectChange(e.target.value, "first")}
          >
            <MenuItem value="men">Men</MenuItem>
            <MenuItem value="women">Women</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="w-full px-5">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Second Level Category
          </InputLabel>
          <Select
            value={select.second}
            label="Second Level Category"
            onChange={(e) => handleSelectChange(e.target.value, "second")}
          >
            {select.first !== "" &&
              men.map((m, i) => (
                <MenuItem value={m.id} key={i}>
                  {m.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      <div className="w-full px-5">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Third Level Category
          </InputLabel>
          <Select
            value={select.third}
            onChange={(e) => handleSelectChange(e.target.value, "third")}
          >
            {thirdChoice &&
              thirdChoice.map((m, i) => (
                <MenuItem value={m.id} key={i}>
                  {m.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default CatSelect;
