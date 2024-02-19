import React from "react";

export default function DecorateBricks() {
  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="shadow-lg rounded-md w-[280px] h-[250px] flex flex-col items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwDGwOw6iZFBM5kZzWU0bw94hpM08g65aKL9IDELlmizSae-8Za14NBlZ-YOKFXde9zYU&usqp=CAU"
            alt=""
            className="w-[265px] h-[200px]"
          />
          <div className="w-full">
            <p className="ml-4">Modern</p>
          </div>
        </div>
        <div className="shadow-lg rounded-md w-[290px] flex flex-col items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEATARjKVC0Q3nlLDkr0kH6kOiEeKzvV2fvKDz6POYGrikmxR8rG36FdGAgHIh-sSdzd4&usqp=CAU"
            alt=""
            className="w-[265px] h-[200px]"
          />
          <div className="w-full">
            <p className="ml-4">Classic</p>
          </div>
        </div>
        <div className="shadow-lg rounded-md w-[290px] h-[250px] flex flex-col items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5yzcnLNLrL7g340rEX621zEV5lHrlltdY0Q&usqp=CAU"
            alt=""
            className="w-[265px] h-[200px]"
          />
          <div className="w-full">
            <p className="ml-4">Minimalist</p>
          </div>
        </div>
      </div>
    </div>
  );
}
