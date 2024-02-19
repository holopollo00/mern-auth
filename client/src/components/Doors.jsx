import React from "react";

export default function Doors() {
  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="shadow-lg rounded-md w-[280px] h-[250px] flex flex-col items-center">
          <img
            src="https://adoor.com.vn/wp-content/uploads/2020/07/cac-kieu-cua-chinh-dep-bang-nhom-xingfa-2-canh-03.jpg"
            alt=""
            className="w-[265px] h-[200px]"
          />
          <div className="w-full">
            <p className="ml-4">Door Modern</p>
          </div>
        </div>
        <div className="shadow-lg rounded-md w-[290px] flex flex-col items-center">
          <img
            src="https://www.tdoor.org/uploads/shops/2021_03/cua-di-3-canh-xep-truot-1.jpg"
            alt=""
            className="w-[265px] h-[200px]"
          />
          <div className="w-full">
            <p className="ml-4">Door Classic</p>
          </div>
        </div>
        <div className="shadow-lg rounded-md w-[290px] h-[250px] flex flex-col items-center">
          <img
            src="https://phongthinhdoor.com/wp-content/uploads/2022/04/13-mau-cua-nhom-kinh-chong-on-hieu-qua.jpg"
            alt=""
            className="w-[265px] h-[200px]"
          />
          <div className="w-full">
            <p className="ml-4">Door Minimalist</p>
          </div>
        </div>
      </div>
    </div>
  );
}
