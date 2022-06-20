import React, { useState } from "react";

import Router from "next/router";
import { SearchByOperationId } from "../libs/api";
import {MdSearch} from "@react-icons/all-files/md/MdSearch";
import toast from "react-hot-toast";

function SearchModel() {
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState();

  const Search = async () => {
      setIsLoading(true);
      const {status,data} = await SearchByOperationId(id);

      if (status === 200) {
          await Router.push(
              {
                  pathname: "/result",
                  query: {id},
              },
              "/"
          );

      }
      if (status == 204){
          setIsLoading(false);
          return toast.error("رقم العملية غير صحيح!")
      }

  }
  return (
    <div className="flex flex-wrap items-center justify-around w-full sm:max-w-4xl" dir="ltr">
      <div className="relative w-full mt-4 shadow-xl">
        <input
            disabled={isLoading}
          value={id}
          onChange={(e) => setId(e.target.value.trim())}
          type="text"
          className="w-full px-10 text-gray-500 border border-gray-600  rounded-lg h-14 focus:shadow focus:outline-none bg-gray-900"
          placeholder="NXXXXXXX"
        />
        <div className="absolute  rounded-full right-2 top-4 bottom-0">
          <button
              type={"button"}
            disabled={isLoading}
            onClick={Search}

            className=" text-white bg-transparent rounded-lg font-bold disabled:cursor-not-allowed  "
          >
            <MdSearch size={28}/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchModel;
