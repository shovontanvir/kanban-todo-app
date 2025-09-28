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

const Navbar = () => {
  const { userName } = useAuth();
  const { mutate } = useLogout();
  return (
    <NavigationMenu className="ml-auto">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{userName}</AvatarFallback>
            </Avatar>
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
