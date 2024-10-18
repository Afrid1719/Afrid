import { getAllAdmins } from "@/models/Admin";
import { SocialLinksList } from "@/utils/social-link-list";
import Link from "next/link";

const Footer = async () => {
  const admin = (await getAllAdmins())[0];
  return (
    <footer className="text-app-tertiary body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a
          href="/"
          className="flex title-font font-semibold items-center md:justify-start justify-center"
        >
          <span className="ml-3 text-xl font-mono">Afrid</span>
        </a>
        <p className="text-sm sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-app-tertiary sm:py-2 sm:mt-0 mt-4">
          © 2024 Afrid
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start space-x-4">
          {admin.socialLinks.map((socialLink, index) => {
            const { name } = socialLink;
            const SocialIcon = SocialLinksList[name];
            return (
              <Link
                key={`${socialLink.name}-${index}`}
                href={socialLink.link}
                target="_blank"
                aria-label={`Go to my ${socialLink.name} Page`}
                className="text-app-tertiary"
              >
                {SocialIcon}
              </Link>
            );
          })}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
