import {
  SiGithub as Github,
  SiLinkedin as Linkedin,
  SiX as Twitter,
  SiFacebook as Facebook,
  SiInstagram as Instagram
} from "react-icons/si";

interface ISocialLinks {
  [key: string]: JSX.Element;
}

export const SocialLinksList: ISocialLinks = {
  Github: <Github />,
  Twitter: <Twitter />,
  LinkedIn: <Linkedin />,
  Facebook: <Facebook />,
  Instagram: <Instagram />
};
