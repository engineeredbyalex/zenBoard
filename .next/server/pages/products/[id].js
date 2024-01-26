"use strict";(()=>{var e={};e.id=304,e.ids=[304],e.modules={6214:(e,t,r)=>{r.r(t),r.d(t,{config:()=>E,default:()=>B,getServerSideProps:()=>D,getStaticPaths:()=>q,getStaticProps:()=>U,reportWebVitals:()=>M,routeModule:()=>V,unstable_getServerProps:()=>R,unstable_getServerSideProps:()=>T,unstable_getStaticParams:()=>z,unstable_getStaticPaths:()=>I,unstable_getStaticProps:()=>F});var s={};r.r(s),r.d(s,{default:()=>ProductPage,getServerSideProps:()=>getServerSideProps});var i=r(7093),l=r(5244),a=r(1323),n=r(4003),c=r(9597),o=r(997),d=r(6689),x=r(1664),p=r.n(x);let u=require("styled-components");var m=r.n(u);let h="#212529",g=u.css`
  border:0;
  padding: 0px 20px;
  border-radius: 20px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight:200;
  font-size: 15px;
  text-transform:uppercase;
  transition:all ease-in-out 0.2s;
  :hover {
    transform:scale(1.05);
          }
  ${e=>e.block&&u.css`
    display: block;
    width: 100%;
  `}
  ${e=>e.white&&!e.outline&&u.css`
    background-color: #fff;
    color: #000;
  `}
  ${e=>e.white&&e.outline&&u.css`
    background-color: transparent;
    color: #fff;
    border: 2px solid #fff;
  `}
  ${e=>e.black&&!e.outline&&u.css`
    background-color: #000;
    color: #fff;
  `}
    ${e=>e.transparent&&!e.outline&&u.css`
    background-color: transparent;
    color: #fff;
  `}
  ${e=>e.black&&e.outline&&u.css`
    background-color: transparent;
    color: #000;
    border: 1px solid #000;
  `}
  ${e=>e.primary&&!e.outline&&u.css`
    background-color: ${h};
    border: 1px solid ${h};
    color:#fff;
  `}
  ${e=>e.primary&&e.outline&&u.css`
    background-color: transparent;
    border: 1px solid ${h};
    color:${h};
  `}
  ${e=>"l"===e.size&&u.css`
    font-size:1.2rem;
    padding: 10px 20px;
    svg{
      height: 20px;
    }
  `}
`,f=m().button`
  ${g}
`;function Button({children:e,...t}){return o.jsx(f,{...t,children:e})}var b=r(5675),j=r.n(b),v=r(8193);let w={src:"/_next/static/media/logoBig.2acfe612.png",height:48,width:352,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAQAAABJCSfIAAAAGklEQVR42mP45/lP85/uP8V/hv8M/qn/MwIAU+MJa7zQzNYAAAAASUVORK5CYII=",blurWidth:8,blurHeight:1};function Header(){let[e,t]=(0,d.useState)(!1);return o.jsx("div",{className:"navigation_bar",children:(0,o.jsxs)("div",{className:"w-full flex items-center justify-center h-[8vh] gap-[60px] absolute top-0",children:[o.jsx("div",{className:"w-1/2 lg:w-auto flex items-center justify-start absolute left-[30px] lg:relative",children:o.jsx("h2",{children:o.jsx(j(),{alt:"logo",width:150,src:w})})}),(0,o.jsxs)("div",{className:e?"text-white left-[0px] right-0 bottom-0 top-[20rem] flex flex-col relative lg:flex gap-[30px] items-center":"text-white hidden lg:flex gap-[30px]",children:[o.jsx("div",{className:"text-[20px] nav_item",href:"/",children:"Acasă"}),o.jsx("div",{className:"text-[20px] nav_item",href:"/products",children:"Produse"}),o.jsx("div",{className:"text-[20px] nav_item",href:"/categories",children:"Catalog"}),o.jsx("div",{className:"text-[20px] nav_item",href:"/aboutus",children:"Despre noi"})]}),(0,o.jsxs)("div",{className:e?"text-white lg:flex gap-[15px] absolute top-[80vh] ":"text-white hidden lg:flex  gap-[15px] ",children:[o.jsx(Button,{white:!0,outline:!0,children:o.jsx(p(),{href:"/cart",children:o.jsx("p",{className:" text-[16px]",children:"Coș "})})}),o.jsx(Button,{black:!0,transparent:!0,children:o.jsx(p(),{href:"/account",children:o.jsx("p",{className:"text-white text-[16px]",children:"Cont"})})})]}),o.jsx("div",{className:"cursor-pointer  lg:hidden  w-1/2 flex items-center justify-end absolute right-[30px] ",onClick:()=>t(!e),children:o.jsx(v.qTj,{size:30,color:"white"})})]})})}let N=require("mongoose");var y=r.n(N);let S=new N.Schema({title:{type:String,required:!0},description:String,price:{type:Number,required:!0},images:[{type:String}],category:{type:y().Types.ObjectId,ref:"Category"},properties:{type:Object}},{timestamps:!0}),_=N.models.Product||(0,N.model)("Product",S),P=m().img`
    max-width: 40px;
    max-height: 40px;
  `,A=m().img`
  max-width: 100%;
  max-height: 100%;
`,k=m().div`
    display: flex;
    gap: 10px;
    flex-grow: 0;
    margin-top: 10px;
  `,O=m().div`
    border: 2px solid #ccc;
    ${e=>e.active?`
      border-color: #ccc;
    `:`
      border-color: transparent;
    `}
    height: 50px;
    padding: 2px;
    cursor: pointer;
    border-radius: 5px;
  `,$=m().div`
  text-align: center;
`;function ProductImages({images:e}){let[t,r]=(0,d.useState)(e?.[0]);return(0,o.jsxs)(o.Fragment,{children:[o.jsx($,{children:o.jsx(A,{src:t})}),o.jsx(k,{children:e.map(e=>o.jsx(O,{active:e===t,onClick:()=>r(e),children:o.jsx(P,{src:e,alt:""})},e))})]})}let C=m().div`
  display: inline-block;
  margin: 10px 0;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    width: 12rem;
    ${g};

    background-color: ${e=>e.main?"#252525":"transparent"};
    border: ${e=>e.main?"none":"1px solid #252525"};
    color: ${e=>e.main?"white":"#252525"};
    pointer-events: ${e=>e.disabled?"none":"auto"}; /* Disable pointer events if disabled prop is true */

    ${e=>e.white&&`
      background-color: white;
      border: 3px solid white;
      font-weight: 500;
    `}
  }

  &:hover {
    button {
      transform: ${e=>e.disabled?"none":"scale(1.02)"};
    }
  }
`;function FlyingButton(e){return o.jsx(C,{white:e.white,main:e.main,scent:e.scent,decoration:e.decoration,disabled:e.disabled,children:o.jsx("button",{children:e.children})})}function Banner(){return o.jsx("div",{className:"absolute top-0 h-[80px] lg:h-[50px] flex items-center justify-center w-full bg-red-600",children:o.jsx(Object(function(){var e=Error("Cannot find module '../layout/Wrapper'");throw e.code="MODULE_NOT_FOUND",e}()),{children:o.jsx(Object(function(){var e=Error("Cannot find module '../layout/Center'");throw e.code="MODULE_NOT_FOUND",e}()),{children:(0,o.jsxs)("p",{className:"text-white text-[14px] lg:text-[16px] text-center  uppercase",children:["Utilizează codul ",o.jsx("b",{children:"(MB10)"})," p\xe2nă pe 15 ianuarie 2024 pentru a obține ",o.jsx("b",{children:"10% reducere"}),"."]})})})})}function ProductPage({product:e}){let[t,r]=(0,d.useState)(""),[s,i]=(0,d.useState)(""),[l,a]=(0,d.useState)(!1);return(0,d.useEffect)(()=>{e.properties?"649d792f59d007b6f857eadc"===e._id?a(!1):0===e.properties.length?a(!1):1===e.properties.length?t||s?a(!1):a(!0):t&&s?a(!1):a(!0):a(!1)},[t,s,e.properties]),(0,o.jsxs)(o.Fragment,{children:[o.jsx(Banner,{}),o.jsx(Header,{}),(0,o.jsxs)("div",{className:"flex items-center justify-center w-full flex-col mt-[10rem] min-h-[100vh]",children:[o.jsx("div",{className:"grid grid-cols-1 md:grid-cols-1 gap-8",children:(0,o.jsxs)("div",{className:"w-full flex flex-col items-center justify-center gap-[50px] lg:flex-row  lg:items-start ",children:[o.jsx("div",{className:"lg:max-w-[400px] lg:max-h-[400px] max-w-[300px] max-h-[300px] mb-[5rem]",children:o.jsx(ProductImages,{images:e.images})}),(0,o.jsxs)("div",{className:"lg:w-1/2 w-full flex flex-col items-center text-center",children:[o.jsx("h1",{className:"text-2xl md:text-3xl mb-5",children:e.title}),o.jsx("p",{children:e.description}),e.weight?(0,o.jsxs)("p",{className:"text-[18px]",children:["Gramaj ceară : ",e.weight," gr"]}):null,e.properties&&e.properties.length>0&&e.properties[0]&&(0,o.jsxs)("div",{className:"mb-4 text-center",children:[o.jsx("label",{className:"block mb-2 mt-5",children:o.jsx("p",{className:"text-2xl",children:"Selectați parfumul :"})}),o.jsx("div",{className:"flex flex-wrap gap-2 items-center justify-center"})]}),e.properties&&e.properties[1]&&e.properties[1].length>0&&(0,o.jsxs)("div",{className:"mb-4 text-center flex flex-col items-center justify-center",children:[o.jsx("label",{className:"block mb-2 mt-5 text-center",children:o.jsx("p",{className:"text-2xl",children:"Selectați decorațiunea :"})}),o.jsx("div",{className:"flex flex-wrap gap-2 items-center justify-center",children:e.properties[1].map((e,t)=>o.jsx("button",{onClick:()=>i(e),className:`px-4 py-2 border border-gray-300 rounded-full transition-all ease-in-out duration-200 hover:scale-102 ${s===e?"bg-blue-500 text-white":"bg-white"}`,children:e},t))})]}),l?(0,o.jsxs)("div",{className:"mb-4 w-full flex items-center justify-center  gap-4 ",children:[o.jsx(FlyingButton,{disabled:!0,_id:e._id,src:e.images?.[0],scent:t,decoration:s,children:"Adaugă \xeen coș"}),(0,o.jsxs)("span",{className:"text-2xl ",children:[e.price," RON"]})]}):(0,o.jsxs)("div",{className:"mb-4 w-full flex items-center justify-center  gap-4",children:[o.jsx(FlyingButton,{main:!0,_id:e._id,src:e.images?.[0],scent:t,decoration:s,children:"Adaugă \xeen coș"}),(0,o.jsxs)("span",{className:"text-2xl ",children:[e.price," RON"]})]})]})]})}),(0,o.jsxs)("div",{className:"w-full flex flex-col items-center justify-center text-center  ",children:[e.scent?o.jsx("h2",{className:"text-2xl md:text-3xl lg:text-5xl mb-10",children:"Parfumuri Maybee"}):o.jsx("h2",{className:"text-2xl md:text-3xl lg:text-5xl mb-10"}),e.scent&&Object.entries(e.scent).map(([e,t])=>(0,o.jsxs)("div",{className:"mb-6 w-full lg:w-1/2 max-h-[35rem] flex items-center justify-center flex-col bg-gray-200 rounded-2xl p-5",children:[o.jsx("h3",{className:"text-xl md:text-2xl",children:e}),o.jsx("p",{className:"text-lg max-w-full",children:t})]},e))]}),o.jsx("div",{className:"mt-10",children:o.jsx("div",{className:"flex items-center justify-center gap-8 flex-col lg:gap-[10rem] "})})]})]})}async function getServerSideProps(e){await function(){if(1===y().connection.readyState)return y().connection.asPromise();{let e=process.env.MONGODB_URI;return y().connect(e)}}();let{id:t}=e.query,r=await _.findById(t);return{props:{product:JSON.parse(JSON.stringify(r))}}}(function(){var e=Error("Cannot find module '../layout/Wrapper'");throw e.code="MODULE_NOT_FOUND",e})(),function(){var e=Error("Cannot find module '../layout/Center'");throw e.code="MODULE_NOT_FOUND",e}();let B=(0,a.l)(s,"default"),U=(0,a.l)(s,"getStaticProps"),q=(0,a.l)(s,"getStaticPaths"),D=(0,a.l)(s,"getServerSideProps"),E=(0,a.l)(s,"config"),M=(0,a.l)(s,"reportWebVitals"),F=(0,a.l)(s,"unstable_getStaticProps"),I=(0,a.l)(s,"unstable_getStaticPaths"),z=(0,a.l)(s,"unstable_getStaticParams"),R=(0,a.l)(s,"unstable_getServerProps"),T=(0,a.l)(s,"unstable_getServerSideProps"),V=new i.PagesRouteModule({definition:{kind:l.x.PAGES,page:"/products/[id]",pathname:"/products/[id]",bundlePath:"",filename:""},components:{App:c.default,Document:n.default},userland:s})},1649:e=>{e.exports=require("next-auth/react")},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{e.exports=require("react")},6405:e=>{e.exports=require("react-dom")},997:e=>{e.exports=require("react/jsx-runtime")},1017:e=>{e.exports=require("path")}};var t=require("../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),r=t.X(0,[859,450,201,263,493],()=>__webpack_exec__(6214));module.exports=r})();