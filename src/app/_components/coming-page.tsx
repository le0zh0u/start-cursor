import AboutContent from "@/components/about/about-content";
import { Button } from "@/components/ui/button";

const ComingPage = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="flex flex-col items-start gap-6 text-start">
          <h3 className="my-6 text-pretty text-3xl font-semibold md:text-4xl lg:max-w-3xl lg:text-5xl">
            This page will come soon. 😊
          </h3>
          <AboutContent />
        </div>
      </div>
    </section>
  );
};

export default ComingPage;
