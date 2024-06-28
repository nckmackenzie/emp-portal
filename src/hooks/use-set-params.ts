import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface ParamsObject {
  [key: string]: string | string[];
}

export function useSetParams() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const setParams = (newParams: ParamsObject) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.keys(newParams).forEach(key => {
      const value = newParams[key];
      if (Array.isArray(value)) {
        value.forEach(v => params.append(key, v));
      } else {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
    });

    replace(`${pathname}?${params.toString()}`);
  };

  return setParams;
}
