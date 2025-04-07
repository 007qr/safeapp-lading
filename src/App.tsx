import { For, type Component } from "solid-js";

import BigCard from "./components/BigCard";
import Card from "./components/Card";
import ThreeStepCard from "./components/ThreeStepCard";
import Connect from "./components/icons/Connect";
import TestimonialCard from "./components/TestimonialCard";
import Logo from "./components/icons/Logo";
import Carousel, { CarouselItem } from "./components/Carousel";

// Type for carousel item props
type CarouselItemProps = {
  onNext: () => void;
};

// Styled testimonial text component
const StyledText = () => {
  return (
    <h1 class="text-[#A5A5A5] text-[40px] font-medium leading-[120%] tracking-[-2%] max-lg:text-[33px] max-lg:w-[218px]">
      "...helped me <span class="text-[#1d1d1f] max-lg:opacity-100 max-lg:text-[#f5f5f5]">recover $5K</span> worth
      of Chargebacks"
    </h1>
  );
}

const App: Component = () => {
  // Define carousel card items
  const cardItems: CarouselItem[] = [
    // Hero card
    ({ onNext }: CarouselItemProps) => (
      <Card
        backgroundType="img"
        src="/bg.webp"
        title="Win Your Chargebacks Automatically."
        subTitle="AI-powered automation that fights disputes for you. Stop losing revenue and save time"
        nextButton={true}
        onNextClick={onNext}
      />
    ),
    
    // How it works card
    ({ onNext }: CarouselItemProps) => (
      <ThreeStepCard
        altText="How it works"
        steps={[
          {
            id: 1,
            title: "Connect",
            subTitle: "Simply connect your stripe, Shopify or other payment providers",
            icon: <Connect />,
          },
          {
            id: 2,
            title: "Respond",
            subTitle: "We automatically respond to your customer",
            icon: "",
          },
          {
            id: 3,
            title: "Win",
            subTitle: "You win",
            icon: "",
          },
        ]}
        nextButton={true}
        onNextClick={onNext}
      />
    ),

    // Testimonial card
    ({ onNext }: CarouselItemProps) => (
      <TestimonialCard
        text={StyledText}
        gifSrc="/giphy.gif"
        videoSrc="/templ-placeholder.webm"
        personName="Devyn Green"
        companyName="Adbuy.ai"
        onNextClick={onNext}
      />
    ),

    // Final card
    () => (
      <BigCard
        title="We've won loads of Chargebacks. We'll win yours too."
      />
    ),
  ];

  // Helper function to render carousel items in mobile view
  const renderItem = (item: CarouselItem) => {
    if (typeof item === "function") {
      return item({ onNext: () => {} });
    }
    return item;
  };

  return (
    <>
      {/* Desktop Version */}
      <div
        class="flex flex-col gap-[60px] bg-[#F5F5F5] w-full max-lg:hidden"
        id="container"
      >
        <div class="p-[40px]">
          <Logo />
        </div>
        <div class="relative pb-12 overflow-hidden">
          <Carousel>{cardItems}</Carousel>
        </div>
      </div>
      
      {/* Mobile Version */}
      <div class="lg:hidden flex flex-col pt-[100px] bg-[#f5f5f5] pb-12">
        <div class="pb-[60px] mx-auto">
          <Logo />
        </div>

        <div class="flex flex-col px-[24px] gap-[48px] items-center">
          <For each={cardItems}>
            {(cardItem) => renderItem(cardItem)}
          </For>
        </div>
      </div>
    </>
  );
};

export default App;