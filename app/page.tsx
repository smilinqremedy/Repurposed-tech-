import { Hero } from "@/components/sections/Hero";
import { LatestDrop } from "@/components/sections/LatestDrop";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { WhyRepurposed } from "@/components/sections/WhyRepurposed";
import { CustomBuildTeaser } from "@/components/sections/CustomBuildTeaser";
import { Newsletter } from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <LatestDrop />
      <BeforeAfterSection />
      <WhyRepurposed />
      <CustomBuildTeaser />
      <Newsletter />
    </div>
  );
}
