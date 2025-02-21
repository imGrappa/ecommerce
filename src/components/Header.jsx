// import React from "react";
// import { useState } from "react";
// import { CiLight } from "react-icons/ci";
// import { MdDarkMode } from "react-icons/md";
// import { SlBasketLoaded } from "react-icons/sl";
// import { Link } from "react-router";
// import Badge from "@mui/material/Badge";
// import Stack from "@mui/material/Stack";

// function Header() {
//   const [theme, setTheme] = useState(true);

//   const changeTheme = () => {
//     const body = document.getElementById("body");
//     if (theme) {
//       body.style.backgroundColor = "#222";
//       body.style.color = "#fff";
//     } else {
//       body.style.backgroundColor = "#fff";
//       body.style.color = "#222";
//     }
//     setTheme(!theme);
//   };

//   return (
//     <>
//       <div className="md:flex justify-between items-center py-4">
//         <Link className="logo" to="/">
//           E-Commerce
//         </Link>
//         <div className="xl:max-w-[500px] w-full sm:max-w-[400px]">
//           <input
//             className="bg-[#f3f3f3;] border-none py-2 px-3 rounded-md text-sm w-full"
//             type="text"
//             placeholder="Ara..."
//           />
//         </div>
//         <div className="flex items-center gap-3">
//           <div className=" hover:text-[#f27a1a] transition-all duration-100 cursor-pointer">
//             <Stack spacing={2} direction="row">
//               <Badge
//                 badgeContent={1}
//                 color="secondary"
//                 className="flex items-center gap-1"
//               >
//                 <SlBasketLoaded className="text-xl" />
//                 <span className="inline-block text-sm ">Sepetim</span>
//               </Badge>
//             </Stack>
//           </div>
//           <div className="flex">
//             {theme ? (
//               <MdDarkMode className="text-xl" onClick={changeTheme} />
//             ) : (
//               <CiLight className="text-xl" onClick={changeTheme} />
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Header;

import React from "react";
import { useState } from "react";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { SlBasketLoaded } from "react-icons/sl";
import { Link } from "react-router";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

function Header() {
  const [theme, setTheme] = useState(true);
  const basketItems = useSelector((store) => store.basket.basketItems); // Sepetteki ürünleri al

  // Sepetteki toplam ürün sayısını hesapla
  const totalItems = basketItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const changeTheme = () => {
    const body = document.getElementById("body");
    if (theme) {
      body.style.backgroundColor = "#222";
      body.style.color = "#fff";
    } else {
      body.style.backgroundColor = "#fff";
      body.style.color = "#222";
    }
    setTheme(!theme);
  };

  return (
    <>
      <div className="md:flex justify-between items-center py-4">
        <Link className="logo" to="/">
          E-Commerce
        </Link>
        <div className="xl:max-w-[500px] w-full sm:max-w-[400px]">
          <input
            className="bg-[#f3f3f3;] border-none py-2 px-3 rounded-md text-sm w-full"
            type="text"
            placeholder="Ara..."
          />
        </div>
        <div className="flex items-center gap-3">
          <div className=" hover:text-[#f27a1a] transition-all duration-100 cursor-pointer">
            <Link to="/basket">
              <Stack spacing={2} direction="row">
                <Badge
                  badgeContent={totalItems} // Sepetteki toplam ürün sayısını göster
                  color="secondary"
                  className="flex items-center gap-1"
                >
                  <SlBasketLoaded className="text-xl" />
                  <span className="inline-block text-sm ">Sepetim</span>
                </Badge>
              </Stack>
            </Link>
          </div>
          <div className="flex">
            {theme ? (
              <MdDarkMode className="text-xl" onClick={changeTheme} />
            ) : (
              <CiLight className="text-xl" onClick={changeTheme} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
