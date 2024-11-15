import { memo } from "react";
import { Input } from "@/components/ui/input";
import { LuSearch as Search } from "react-icons/lu";

interface SearchBarProps {
  wrapperClasses?: string;
  inputClasses?: string;

  placeholder: string;
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function RawSearchBar({
  placeholder,
  inputValue,
  handleInputChange,
  wrapperClasses = "",
  inputClasses = ""
}: SearchBarProps) {
  return (
    <div
      className={`relative w-4/5
     md:w-3/5 mx-auto ${wrapperClasses}`}
    >
      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        className={`pl-10 bg-app-primary/50 border border-app-primary text-white  focus:ring-sky-600 focus:border-sky-600 ${inputClasses}`}
      />
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
    </div>
  );
}

const SearchBar = memo(RawSearchBar);

export default SearchBar;
