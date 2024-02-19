import React from "react";

export default function Windows() {
  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="shadow-lg rounded-md w-[280px] h-[250px] flex flex-col items-center">
          <img
            src="https://praemie.com/Upload/images/News/cua-so-nhom-kinh.jpg"
            alt=""
            className="w-[265px] h-[200px]"
          />
          <div className="w-full">
            <p className="ml-4">Window Classic</p>
          </div>
        </div>
        <div className="shadow-lg rounded-md w-[290px] flex flex-col items-center">
          <img
            src="https://kinhphucdat.com/wp-content/uploads/2021/01/cua-nhom-xingfa-mau-trang-5.jpg"
            alt=""
            className="w-[265px] h-[200px]"
          />
          <div className="w-full">
            <p className="ml-4">Window Modern</p>
          </div>
        </div>
        <div className="shadow-lg rounded-md w-[290px] h-[250px] flex flex-col items-center">
          <img
            src="https://havaco.vn/uploaded/Goc-tu-van/cac-loai-cua-so-dep/1-mau-cua-so-nhom-kinh-dep.jpg"
            alt=""
            className="w-[265px] h-[200px]"
          />
          <div className="w-full">
            <p className="ml-4">Window Minimalist</p>
          </div>
        </div>
      </div>
    </div>
  );
}
