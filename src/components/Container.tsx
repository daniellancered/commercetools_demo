import { ReactNode } from 'react';

export default function Container({ children }: { children: ReactNode }) {
  return <section className="w-full sm:w-[90vw] md:w-[80vw]">{children}</section>;
}
