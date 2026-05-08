import { FaGithub, FaLinkedin } from "react-icons/fa";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function ProfileLinks() {
  return (
    <section className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="outline" size="sm" asChild>
        <a href="https://github.com/NetKamaa" target="_blank" rel="noreferrer">
          <FaGithub className="h-4 w-4" />
          GitHub
        </a>
      </Button>

      <Avatar size="lg" className="border shadow-sm">
        <AvatarImage
          src="https://github.com/NetKamaa.png"
          alt="NetKamaa avatar"
        />
        <AvatarFallback>PV</AvatarFallback>
      </Avatar>

      <Button variant="outline" size="sm" asChild>
        <a
          href="https://www.linkedin.com/in/pavel-doroshkevich-3518183a3/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin className="h-4 w-4" />
          LinkedIn
        </a>
      </Button>
    </section>
  );
}
