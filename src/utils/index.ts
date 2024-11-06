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
