import github from "./assets/github.svg";
import linkedin from "./assets/linkedin-round-line.svg";
import twitter from "./assets/twitter-round.svg";

export const Footer = () => {
  return (
    <footer>
      <div>Created by Adithya Mallya</div>
      <a href="https://github.com/SlaYpoint" rel="noreferrer" target="_blank">
        <img className="icon" src={github} alt="github" />
      </a>
      <a
        href="linkedin.com/in/adithya-mallya-54438417a"
        rel="noreferrer"
        target="_blank"
      >
        <img className="icon" src={linkedin} alt="linkedin" />
      </a>
      <a href="https://twitter.com/mallyaAdi" rel="noreferrer" target="_blank">
        <img className="icon" src={twitter} alt="twitter" />
      </a>
    </footer>
  );
};
