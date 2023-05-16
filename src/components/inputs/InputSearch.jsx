import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import 'regenerator-runtime';

export default function InputSearch({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter)
  const inputRef = useRef(null);

  const onClick = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 500)

  function handleClear() {
    onClick('')
    setValue('')
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      if (value && value.length > 0) {
        const valueLength = value.length;
        inputRef.current.setSelectionRange(valueLength, valueLength);
      } else {
        inputRef.current.setSelectionRange(0, 0);
      }
    }
  }, [value]);

  return (
    <div className='flex items-center justify-center w-[300px] rounded-ten bg-white drop-shadow-input-searc'>
      <div className="flex items-center justify-between w-[320px] h-[39px] px-2 py-[7px]">
        <input
          className="w-full font-nunito text-lg text-dark-slate-grey"
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
          }}
          type="text"
          ref={inputRef}
          placeholder={'Pesquisa'}
        />

        {value ? <X size={12} className="mr-2 cursor-pointer" onClick={handleClear} /> : ""}
        <Search className="cursor-pointer" size={20} onClick={() => onClick(value)} />
      </div>
    </div>
  )
}