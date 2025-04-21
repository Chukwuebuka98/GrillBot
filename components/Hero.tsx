import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HeroContent from './HeroContent';
import { isAuthenticated } from '@/lib/actions/auth.action';

export const Hero = async () => {
  const isUserAuthenticated = await isAuthenticated();
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <HeroContent />
          {!isUserAuthenticated ? (
            <div className="flex flex-row gap-3">
              <Button size="lg" className="btn-primary">
                <Link href="/sign-in">Get Started</Link>
              </Button>
              <Button size="lg" className="btn-primary">
                <Link href="/sign-in">Sign Up</Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-row gap-3">
              <Button size="lg" className="btn-primary">
                <Link href="/interview">Start an Interview</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
