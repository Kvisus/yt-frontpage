import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import Button from "../components/Button";
import { useState } from "react";
import { useSidebar } from "../context/SidebarContext";

/**
 * Renders the page header component.
 *
 * @returns The page header component.
 */
function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      {/* Search form */}
      <PageHeaderFirtsSection hidden={showFullWidthSearch} />
      <form
        className={`gap-4 flex-grow justify-center ${
          showFullWidthSearch ? "flex" : "md:flex hidden"
        }`}
      >
        {/* Arrow left button */}
        {showFullWidthSearch && (
          <Button
            size="icon"
            className="flex-shrink-0"
            variant="ghost"
            type="button"
            onClick={() => setShowFullWidthSearch(false)}
          >
            <ArrowLeft />
          </Button>
        )}

        {/* Search input */}
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500"
          />
          <Button className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0">
            <Search />
          </Button>
        </div>

        {/* Mic button */}
        <Button size="icon" className="flex-shrink-0" type="button">
          <Mic />
        </Button>
      </form>

      {/* Right section */}
      <div
        className={`flex-shrink-0 md:gap-2 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}
      >
        {/* Full width search button */}
        <Button
          onClick={() => setShowFullWidthSearch(true)}
          size="icon"
          variant="ghost"
          className="md:hidden"
        >
          <Search />
        </Button>

        {/* Mic button */}
        <Button size="icon" variant="ghost" className="md:hidden">
          <Mic />
        </Button>

        {/* Upload button */}
        <Button size="icon" variant="ghost">
          <Upload />
        </Button>

        {/* Bell button */}
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>

        {/* User button */}
        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </div>
  );
}
export default PageHeader;

type PageHeaderFirtsSectionProps = {
  hidden?: boolean;
};

export function PageHeaderFirtsSection({
  hidden = false,
}: PageHeaderFirtsSectionProps) {
  const { toggle } = useSidebar();
  return (
    <div
      className={`gap-4 items-center flex-shrink-0 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <Button variant="ghost" size="icon" onClick={toggle}>
        <Menu />
      </Button>
      <a href="/">
        <img src={"/myTybe.svg"} alt="logo" className="h-6" />
      </a>
    </div>
  );
}
