// document.addEventListener("DOMContentLoaded", () => {
//   const pages = document.querySelectorAll("#flipbook .page");

//   pages.forEach((page, index) => {
//     const topsec = document.createElement("div");
//     const bottomsec = document.createElement("div");
//     topsec.classList.add("topsec");
//     bottomsec.classList.add("bottomsec");

//     if ((index + 1) % 2 !== 0) {
//       topsec.innerHTML = `<img src="../global assets/Images/Top&Bottom/right1.webp" alt="">`;
//       bottomsec.innerHTML = `<img src="../global assets/Images/Top&Bottom/right2.webp" alt="">`;
//     } 
//     else {
//       topsec.innerHTML = `<img src="../global assets/Images/Top&Bottom/left.webp" alt="">`;
//       bottomsec.innerHTML = `<img src="../global assets/Images/Top&Bottom/left.webp" alt="">`;
//     }

//     const midsec = page.querySelector(".midsec");
//     page.insertBefore(topsec, midsec);
//     page.appendChild(bottomsec);
    
//   });
// });