import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface OnboardingRedirectProps {
  children: React.ReactNode;
}

const OnboardingRedirect = ({ children }: OnboardingRedirectProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const onboardingCompleted = localStorage.getItem("onboarding_completed");
    
    // If not completed and not already on onboarding page, redirect
    if (!onboardingCompleted && location.pathname !== "/onboarding") {
      navigate("/onboarding", { replace: true });
    }
    
    setIsChecking(false);
  }, [navigate, location.pathname]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center animate-pulse">
          <span className="text-3xl">🌱</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default OnboardingRedirect;
