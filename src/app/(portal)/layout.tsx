import { ScrollArea } from '@/components/ui/scroll-area';
import Header from './_components/header';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <div className="h-full ">
    //   <Header />
    //   <main className="h-[calc(100%-4rem)] ">
    //     <ScrollArea className="container h-full">
    //       <div className="py-4 md:py-6">{children}</div>
    //     </ScrollArea>
    //   </main>
    // </div>
  );
}
