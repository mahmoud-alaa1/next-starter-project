import { queryClient } from "@/lib/react-query/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { X } from "lucide-react";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const testConflit = 20;
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
