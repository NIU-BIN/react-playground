import { strToU8, compressSync, decompressSync, zlibSync, unzlibSync, strFromU8 } from "fflate";

export const getFileLanguage = (fileName: string) => {
  const suffix = fileName.split(".").pop() || "";
  if (["js", "jsx"].includes(suffix)) return "javascript";
  if (["ts", "tsx"].includes(suffix)) return "typescript";
  if (["json"].includes(suffix)) return "json";
  if (["css"].includes(suffix)) return "css";
  return "javascript";
};

type DebounceFunc<T extends (...args: any) => any> = (...args: Parameters<T>) => void;

export function debounce<T extends (...args: any) => any>(func: T, delay = 500): DebounceFunc<T> {
  let timeout: NodeJS.Timeout | null = null;

  const debounced: DebounceFunc<T> = (...args) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };

  return debounced;
}

export function compress(code: string): string {
  const buf = strToU8(code);
  const zipped = zlibSync(buf, { level: 9 });
  const str = strFromU8(zipped, true);
  return btoa(str);
}

export function uncompress(str: string): string {
  const binary = atob(str);
  const buf = strToU8(binary, true);
  const unzipped = unzlibSync(buf);
  const origText = strFromU8(unzipped);
  return origText;
}
