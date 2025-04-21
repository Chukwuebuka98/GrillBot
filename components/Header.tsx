import Link from 'next/link';
import { maskEmail } from '@/utils/email';
import { NavItem } from '@/components/NavItem';
import { Button } from '@/components/ui/button';
import { MobileNavbar } from '@/components/MobileNav';
import { getEmail, isAuthenticated } from '@/lib/actions/auth.action';

export default async function Header() {
  const isUserAuthenticated = await isAuthenticated();
  const userEmail = await getEmail();
  const maskedEmail = userEmail ? maskEmail(userEmail) : null;

  return (
    <div className="w-full sticky top-0 backdrop-blur-lg">
      <header className="container  flex items-center justify-between gap-10 pt-4 px-4 pb-[16px] mx-auto">
        <Link href="/" className="flex items-center gap-3 flex-1">
          <span className="font-heading text-xl font-bold">GrillBot </span>
        </Link>
        <nav className="hidden items-center gap-10 md:flex flex-1 justify-center">
          <NavItem label="About" href="/" />
          <NavItem label="Docs" href="/" />
          <NavItem label="Blog" href="/" />
          <NavItem label="Pricing" href="/" />
        </nav>
        <div className="hidden items-center gap-2 md:flex flex-1 justify-end">
          {!isUserAuthenticated ? (
            <Button asChild className="btn-primary ">
              <Link href="/sign-in" className="cursor-pointer">
                Login
              </Link>
            </Button>
          ) : (
            // this needs to be worked on
            <p className="text-sm text-muted-foreground">{maskedEmail}</p>
          )}
        </div>
        <MobileNavbar>
          <div className="rounded-b-lg bg-background py-4 container text-foreground shadow-xl">
            <nav className="flex flex-col gap-1 pt-2">
              <NavItem label="About" href="/" />
              <NavItem label="Docs" href="/" />
              <NavItem label="Blog" href="/" />
              <NavItem label="Pricing" href="/" />
              {!isUserAuthenticated ? (
                <Button asChild size="lg" className="mt-2 w-full btn-primary">
                  <Link href="/sign-up" className="cursor-pointer">
                    Get Started
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="mt-2 w-full btn-primary">
                  <Link href="/intervew" className="cursor-pointer">
                    Start an interview
                  </Link>
                </Button>
              )}
            </nav>
          </div>
        </MobileNavbar>
      </header>
    </div>
  );
}
