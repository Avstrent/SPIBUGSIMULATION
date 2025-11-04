"use client";

import { useEffect, useRef, useState } from "react";

type Serializer<T> = (value: T) => string;
type Deserializer<T> = (value: string) => T;

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: {
    serialize?: Serializer<T>;
    deserialize?: Deserializer<T>;
    onError?: (err: unknown) => void;
  }
) {
  const serialize = options?.serialize ?? JSON.stringify;
  const deserialize = options?.deserialize ?? ((v: string) => JSON.parse(v) as T);
  const onError = options?.onError ?? (() => {});

  // Load once on mount (client only)
  const isFirst = useRef(true);
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw != null) {
        const parsed = deserialize(raw);
        setState(parsed);
      }
    } catch (err) {
      onError(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Avoid writing the initialValue before we load from storage
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    try {
      window.localStorage.setItem(key, serialize(state));
    } catch (err) {
      onError(err);
    }
  }, [key, state, serialize, onError]);

  return [state, setState] as const;
}