import NextIntlProvider from "./NextIntlProvider";
import ToasterProvider from "./ToasterProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlProvider>
      {children}
      <ToasterProvider />
    </NextIntlProvider>
  );
}
