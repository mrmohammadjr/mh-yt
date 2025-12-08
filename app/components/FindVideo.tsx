"use client";
import React, { useState, useEffect } from "react";
import findTitle from "../actions/findTitle";
import Image from "next/image";
import Video from "./Video";
import CoverSearch from "../assets/cover-search.jpg";
import { FaCalendar } from "react-icons/fa";
import { IoSearchCircle, IoTimeSharp } from "react-icons/io5";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  length: string;
  published_time: string;
}

const FindVideo = () => {
  const [text, setText] = useState<string>("");
  const [select, setSelect] = useState<string>("");
  const [data, setData] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showVideoList, setShowVideoList] = useState<boolean>(true);

  // تشخیص سایز صفحه
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint در Tailwind
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  async function getTitle() {
    if (!text.trim()) return;
    setIsLoading(true);
    try {
      const res = await findTitle(text);
      console.log(res.videos);
      setData(res.videos || []);
      setShowVideoList(true);
    } catch (err) {
      console.error("Error fetching videos:", err);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSelectVideo = (id: string) => {
    setSelect(id);
    if (isMobile) {
      setShowVideoList(false);
    }
  };


  const handleBackToList = () => {
    setShowVideoList(true);
  };

  return (
    <div className="mb-10 mt-10 flex justify-around w-full gap-5 relative">
      <div className="flex flex-col items-center lg:w-full max-md:w-[90%] top-0 ml-5">
        <div className="flex justify-around w-full mt-10">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Find Your Video , For Example : Python Tutorial"
            disabled={isLoading}
            className="bg-white w-full lg:text-xl max-md:text-md max-sm:text-sm px-10 py-5 border-[#660B05] border-b-4 outline-0"
          />
          <button
            onClick={getTitle}
            disabled={isLoading}
            className={`px-10 py-2 transition-all bg-[#CF0F0F] text-zinc-300 hover:bg-zinc-300 hover:text-[#CF0F0F] ${isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2 max-md:block max-sm:block lg:hidden">
                <svg
                  className="animate-spin h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                <span className="text-white">Loading...</span>
              </div>
            ) : (
              <IoSearchCircle className="text-5xl" />
            )}
          </button>
        </div>
        {isMobile && !showVideoList && (
          <button
            onClick={handleBackToList}
            className="mt-4 px-4 py-2 bg-[#CF0F0F] text-white rounded-md"
          >
            ← Back to List
          </button>
        )}

        <Video select={select} />
      </div>

      {isLoading ? (
        <div className={`bg-red-950 mt-10 w-[40%] h-40 rounded-sm mr-5 max-md:hidden max-sm:hidden lg:block`}>
          <div className="flex flex-col items-center justify-center py-10">
            <svg
              className="animate-spin h-12 w-12 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <h1 className="text-center text-2xl mt-4 text-white">Loading videos...</h1>
          </div>
        </div>
      ) : data.length === 0 ? (
        <div
          className="bg-red-950 mt-10 w-[40%] h-18 rounded-sm mr-5 hidden lg:block"
        >
          <h1 className="text-center text-2xl mt-5 text-white">No Videos</h1>
        </div>
      ) : (
        <div
          className={`flex flex-col items-center lg:mt-10 mr-5 lg:w-[40%] lg:h-[50rem] 
          max-md:h-[30rem] overflow-scroll max-md:absolute max-md:w-[70%] max-md:mt-30
          ${isMobile && !showVideoList ? "hidden" : "lg:block"}`}
        >
          {data?.map((item, index) => (
            <div
              className="bg-red-700 p-2 border-white border-b-4 w-full"
              key={item?.id || index}
            >
              <Image
                src={CoverSearch}
                alt="thumbnail"
                width={500}
                className="w-full border-2 border-white"
                height={200}
              />

              <h1 className="font-bold text-yellow-500 my-2 lg:text-2xl max-md:text-xl">{item?.title}</h1>
              <h1 className="lg:text-xl max-md:text-md max-sm:text-sm">{item?.description}</h1>
              <h1 className="lg:text-xl max-md:text-md max-sm:text-sm text-neutral-200 flex justify-start gap-2 items-center">
                <IoTimeSharp />
                {item?.length}
              </h1>
              <h1 className="lg:text-xl max-md:text-md max-sm:text-sm text-neutral-200 flex justify-start gap-2 items-center">
                <FaCalendar />
                {item?.published_time}
              </h1>
              <button
                onClick={() => handleSelectVideo(item?.id)}
                className="lg:text-xl max-md:text-md max-sm:text-sm bg-slate-500 text-white px-3 py-1 mt-2 rounded-sm cursor-pointer transition-all hover:bg-white hover:text-slate-500"
              >
                Select
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindVideo;
