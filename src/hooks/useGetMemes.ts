import { useState } from "react";
import { useRef, useCallback } from "react";
import { customDebounce } from "../utils";

export const useGetMemes = () => {
  const [memes, setMemes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const pageNumberRef = useRef(0);
  const [searchText, setSearchText] = useState("");
  const [numberOfColumn, setNumberOfColumn] = useState(1);

  const getMeme = async ({ pageNumber, search }) => {
    try {
      const url = search
        ? `https://meme-api.com/gimme/${search}/20`
        : "https://meme-api.com/gimme/20";
      setIsLoading(true);
      const result = await fetch(url);
      if (result?.ok) {
        const data = await result.json();
        if (pageNumber === 0) {
          setMemes(data?.memes);
        } else {
          setMemes((prev) => [...prev, ...data?.memes]);
        }
        pageNumberRef.current += 1;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnEndReached = () => {
    !isLoading && getMeme({ pageNumber: pageNumberRef.current, search: "" });
  };

  //   const callSearchWithDebounce = useCallback(
  //     customDebounce(
  //       () => ,
  //       1000
  //     ),
  //     []
  //   );

  const handleOnTextInputChange = (text: string) => {
    setSearchText(text);
    pageNumberRef.current = 0;
    setMemes([]);
    // callSearchWithDebounce();
    getMeme({ pageNumber: pageNumberRef.current, search: text });
  };

  const handleToggleNumberOfColumn = () => {
    setNumberOfColumn((prev) => (prev == 1 ? 2 : 1));
  };

  const filterNSFWMemes = () => {
    const nsfwFilteredMemes = memes?.filter((item) => item?.nsfw === true);
    setMemes(nsfwFilteredMemes);
  };

  const handleRetry = () => {
    pageNumberRef.current = 0;
    setMemes([]);
    setSearchText("");
    getMeme({ pageNumber: 0, search: "" });
  };

  return {
    getMeme,
    isLoading,
    memes,
    handleOnEndReached,
    handleOnTextInputChange,
    handleToggleNumberOfColumn,
    numberOfColumn,
    filterNSFWMemes,
    handleRetry,
  };
};
