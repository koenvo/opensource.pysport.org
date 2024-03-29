import { useState, useCallback } from "react";
import * as qs from "query-string";
import { useRouter } from "next/router";

const setQueryStringWithoutPageReload = qsValue => {
  const newurl = window.location.protocol + "//" +
  window.location.host +
  window.location.pathname +
  qsValue;

  window.history.replaceState({ path: newurl }, "", newurl);
};

const setQueryStringValue = (
  key,
  value,
) => {
  const values = qs.parse(window.location.search);
  const newQsValue = qs.stringify({ ...values, [key]: value });
  setQueryStringWithoutPageReload(`?${newQsValue}`);
};

export const getQueryStringValue = (
  key
) => {
  const router = useRouter();
  const values = router.query;
  return values[key];
};


export function useQueryString(key, initialValue, autoUpdate=false) {
  const currentValue = getQueryStringValue(key);

  const [value, setValue] = useState(currentValue || initialValue);
  const onSetValue = useCallback(
    newValue => {
      setValue(newValue);
      setQueryStringValue(key, newValue);
    },
    [key]
  );

  if (autoUpdate && currentValue !== value)
  {
    setValue(currentValue);
  }

  return [value, onSetValue];
}
