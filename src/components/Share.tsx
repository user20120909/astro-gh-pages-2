import { FaShare, FaCopy, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

interface Props {
  optUrl?: string;
  text: string;
}

const Share: React.FC<Props> = ({ optUrl, text }) => {
  const shareWhatsapp = () => {
    const baseUrl = window.location.origin;
    const url = optUrl ?? window.location.pathname;
    const fullUrl = `${baseUrl}${url}`;
    return window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}%0A${encodeURIComponent(
        fullUrl
      )}`,
      '_blank'
    );
  };

  const shareTwitter = () => {
    const baseUrl = window.location.origin;
    const url = optUrl ?? window.location.pathname;
    const fullUrl = `${baseUrl}${url}`;
    return window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}%0A${encodeURIComponent(fullUrl)}`,
      '_blank'
    );
  };

  const copyLink = () => {
    const baseUrl = window.location.origin;
    const url = optUrl ?? window.location.pathname;
    const fullUrl = `${baseUrl}${url}`;
    return navigator.clipboard.writeText(fullUrl);
  };

  return (
    <div className="flex w-full gap-8 px-4 justify-between my-4">
      <button
        className="flex-1 flex items-center justify-center"
        type="button"
        onClick={shareWhatsapp}
        aria-label="Share on WhatsApp"
      >
        <span className="flex items-center justify-center bg-green-500 hover:bg-green-600 rounded-full w-12 h-12 text-white transition">
          <FaWhatsapp size={24} />
        </span>
      </button>
      <button
        className="flex-1 flex items-center justify-center"
        type="button"
        onClick={shareTwitter}
        aria-label="Share on Twitter"
      >
        <span className="flex items-center justify-center bg-black hover:bg-gray-800 rounded-full w-12 h-12 text-white transition">
          <FaXTwitter size={24} />
        </span>
      </button>
      <button
        className="flex-1 flex items-center justify-center"
        type="button"
        onClick={() =>
          navigator.share({ url: optUrl ?? window.location.pathname })
        }
        aria-label="Share via menu"
      >
        <span className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-full w-12 h-12 text-white transition">
          <FaShare size={24} />
        </span>
      </button>
      <button
        className="flex-1 flex items-center justify-center"
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
      >
        <span className="flex items-center justify-center bg-gray-400 hover:bg-gray-500 rounded-full w-12 h-12 text-white transition">
          <FaCopy size={24} />
        </span>
      </button>
    </div>
  );
};

export default Share;
