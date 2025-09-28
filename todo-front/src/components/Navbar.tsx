import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLogout } from "@/hooks/useLogout";
import { Bell } from "lucide-react";
import { Badge } from "./ui/badge";

interface NavbarProps {
  nearDeadlineTasks: string[];
}

const Navbar = ({ nearDeadlineTasks }: NavbarProps) => {
  const { userName } = useAuth();
  const { mutate } = useLogout();
  return (
    <NavigationMenu className="ml-auto">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <span className="flex items-center gap-2">
              <div>
                <Badge className="h-5 min-w-5 rounded-full bg-red-800 px-1 font-mono tabular-nums">
                  {nearDeadlineTasks.length}
                </Badge>
                <Bell className="w-5 h-5 mr-5" />
              </div>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{userName}</AvatarFallback>
              </Avatar>
            </span>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-black absolute !w-20 !p-0">
            <Button
              className="w-full bg-white text-black cursor-pointer"
              onClick={() => mutate()}
            >
              Logout
            </Button>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
