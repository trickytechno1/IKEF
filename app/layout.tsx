import type {Metadata} from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'IKEF Futbalo Platform | Futbala Sekcio de IKEF',
  description: 'Official digital hub for the Futbala Sekcio de IKEF (International Esperanto Football Section) connecting players, coaches, referees, and enthusiasts globally.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="eo" suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-slate-50 text-slate-900 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
