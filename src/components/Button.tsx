import { FaArrowRight } from 'react-icons/fa';

interface Props {
  text: string;
  href: string;
}

const Button: React.FC<Props> = ({ text, href }) => (
  <a
    href={href}
    className="flex justify-center mt-4 mb-8 text-xl"
    target={href.startsWith('http') ? '_blank' : '_self'}
    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
  >
    <b className="inline-flex items-center gap-1 align-middle">
      <span className="align-middle">{text}</span>
      <span className="flex items-center">
        <FaArrowRight />
      </span>
    </b>
  </a>
);

export default Button;
