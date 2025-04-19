import { ChevronRight } from "lucide-react";
import { Link, useMatches } from "react-router-dom";
import { cn } from "@/lib/utils";

export function NavbarWithBreadcrumbs() {
  const matches = useMatches();
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb(match.data));

  return (
    <div className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center space-x-2">
        {crumbs.map((crumb, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
            <Link
              to={crumb.path}
              className={cn(
                "text-sm font-medium",
                index === crumbs.length - 1 ? "text-primary" : "text-muted-foreground hover:text-primary"
              )}
            >
              {crumb.title}
            </Link>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        {/* Add any navbar controls here */}
      </div>
    </div>
  );
}