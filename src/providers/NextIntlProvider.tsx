import { NextIntlClientProvider } from "next-intl";

export default function NextIntlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
