import { ReactNode } from 'react';

export default function Container({ children }: { children: ReactNode }) {
  return <section className="w-full max-w-[90rem] sm:w-[90vw] md:w-[80vw]">{children}</section>;
}
