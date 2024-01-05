import { Divider } from "antd";
import React, { useRef, ComponentProps } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

type InfiniteLoadingProps = {
  infiniteLoading: boolean;
  moreContent: boolean;
  loadContentFunction?: () => void;
} & ComponentProps<"div">;

const InfiniteLoading: React.FC<InfiniteLoadingProps> = ({
  moreContent,
  children,
  infiniteLoading,
  loadContentFunction = () => {
    console.log("You have reached at the end of the page!");
  },
  className = "",
  ...props
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const loadMoreContent = async () => {
    if (infiniteLoading || !moreContent) return;
    try {
      loadContentFunction();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section
      ref={sectionRef}
      onScroll={() => {
        if (sectionRef.current === null) return;
        const { clientHeight, scrollHeight, scrollTop } = sectionRef.current;
        if (scrollHeight - 1 <= clientHeight + scrollTop) {
          loadMoreContent();
        }
      }}
      className="h-full overflow-scroll md:p-2 relative "
    >
      <div {...props} className={twMerge("h-max overflow-hidden ", className)}>
        {children}
      </div>
      {infiniteLoading && (
        <div className="w-full  h-16 flex items-center justify-center">
          <BiLoaderAlt color="gray" size={50} className="animate-spin" />
        </div>
      )}
      {!moreContent && (
        <div className="flex-center flex-col font-neon text-gray h-16 px-3 text-gray-400 ">
          <Divider style={{margin:0}} className="bg-gray-100" />
        </div>
      )}
    </section>
  );
};

export default InfiniteLoading;
