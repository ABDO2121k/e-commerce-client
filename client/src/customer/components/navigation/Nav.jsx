import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../../../assets/logo.png";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";
import AuthModel from "../../auth/AuthModel";
import { authContext } from "../../../context/authContext";
import { toast } from "react-hot-toast";

//nav infos
const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
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
            { name: "Browse All", id: "Browse All" },
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
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", id: "TopsM" },
            { name: "Pants", id: "PantsM" },
            { name: "Sweaters", id: "SweatersM" },
            { name: "T-Shirts", id: "T-ShirtsM" },
            { name: "Jackets", id: "JacketsM" },
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
          ],
        },
      ],
    },
  ],
};
//end nav infos

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const location = useLocation();
  const auth = useContext(authContext);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open2 = Boolean(anchorEl);
  const logged = auth?.isLo;
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = (cat, sec, it) => {
    console.log(it);
    navigate(`/${cat.id}/${sec.id}/${it}`);
    setOpen(false);
  };

  const handleNavigate2 = (cat, sec, it) => {
    console.log(it);
    navigate(`/${cat}/${sec}/${it}`);
    setOpen(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleClickUser = (e) => {
    setAnchorEl(e.target);
  };

  const handleOpen = () => {
    navigate("/login");
    setOpenAuthModal(true);
  };
  const handleOpen2 = () => {
    navigate("/register");
    setOpenAuthModal(true);
  };
  const handleClose = () => {
    if (
      location.pathname == "/" ||
      location.pathname == "/register" ||
      location.pathname == "/login"
    ) {
      navigate("/");
    }
    setOpenAuthModal(false);
  };

  const handleLogout = async () => {
    try {
      navigate("/");
      toast.loading("LogginOut", { id: "logout" });
      await auth?.logout();
      return toast.success("logged out", { id: "logout" });
    } catch (err) {
      console.log("error: ", err);
      return toast.error(`loggout failed`, { id: "logout" });
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      handleClose();
      handleCloseUserMenu();
    }
    if (location.pathname == "/register" || location.pathname == "/login") {
      navigate(-1);
    }
  }, [auth]);

  return (
    <div className="bg-white z-50">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(!open)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <a className="mt-6 block font-medium text-gray-900">
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a
                                    className="-m-2 block p-2 text-gray-500"
                                    onClick={() => {
                                      handleNavigate(
                                        category,
                                        section,
                                        item.id
                                      );
                                      setOpen(!open);
                                    }}
                                  >
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6 ">
                  <div
                    className="flow-root"
                    onClick={() =>
                      handleNavigate2("BrowseAll", "BrowseAll", "BrowseAll")
                    }
                  >
                    <a className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer">
                      Browse All
                    </a>
                  </div>
                </div>
                {console.log(auth?.currentUser?.role?.toLowerCase())}
                {auth?.currentUser?.role?.toLowerCase() === "admin" && (
                  <div className="space-y-6 border-t border-gray-200 px-4 py-6 ">
                    <div className="flow-root">
                      <a
                        className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                        onClick={() => navigate("/admin")}
                      >
                        Admin page
                      </a>
                    </div>
                  </div>
                )}
                {!logged ? (
                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    <div className="flow-root">
                      <Button
                        onClick={handleOpen}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Sign in
                      </Button>
                    </div>
                    <div className="flow-root">
                      <Button
                        onClick={handleOpen2}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Create account
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Avatar
                      className="text-white m-auto"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      area-expanded={open ? "true" : undefined}
                      sx={{
                        bgcolor: deepPurple[500],
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      {auth?.currentUser?.firstName[0]}
                    </Avatar>
                    <div className="flow-root">
                      <Button
                        onClick={handleLogout}
                        className="-m-2 block p-2 font-medium text-red-900 text-center"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav aria-label="Top" className="mx-auto">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center px-11">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a>
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-10 w-10 mr-2 rounded-[50%] cursor-pointer"
                    src={logo}
                    alt=""
                    onClick={() => navigate("/")}
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-10">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a className="mt-6 block font-medium text-gray-900">
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900"
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <a
                                                  className="hover:text-gray-800 cursor-pointer"
                                                  onClick={() => {
                                                    handleNavigate(
                                                      category,
                                                      section,
                                                      item.id
                                                    );
                                                  }}
                                                >
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  <a
                    onClick={() =>
                      handleNavigate2("BrowseAll", "BrowseAll", "BrowseAll")
                    }
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
                  >
                    Brose All
                  </a>
                  {auth?.currentUser?.role?.toLowerCase() === "admin" && (
                    <a
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
                      onClick={() => navigate("/admin")}
                    >
                      Admin page
                    </a>
                  )}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                {!logged ? (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Button
                      onClick={handleOpen}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in
                    </Button>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <Button
                      onClick={handleOpen2}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Avatar
                      className="text-white"
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClickUser}
                      sx={{
                        bgcolor: deepPurple[500],
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      {auth?.currentUser?.firstName[0]}
                    </Avatar>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open2}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem onClick={() => navigate("/account/order")}>
                        OrderHistory
                      </MenuItem>
                      <MenuItem
                        onClick={handleLogout}
                        className="-m-2 block p-2 font-medium text-red-900 text-center"
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </div>
                )}
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      onClick={() => navigate("/cart")}
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500 cursor-pointer"
                      aria-hidden="true"
                    />
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <AuthModel handleClose={handleClose} open={openAuthModal} />
    </div>
  );
}
