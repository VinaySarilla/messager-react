import { useRef } from "react";
import PropTypes from "prop-types";

export const MessageInput = ({ setMessage, sendMessage }) => {
  const inputRef = useRef(null);
  return (
    <div className="absolute bottom-4 w-full left-0">
      <div className=" max-w-3xl p-4 py-2 flex items-center gap-2 mx-auto">
        <input
          className="bg-zinc-100 outline-none w-full p-2 rounded-lg text-sm placeholder:text-xs h-10"
          placeholder="Send Text Message"
          onChange={(e) => setMessage(e.target.value)}
          ref={inputRef}
        />
        <button
          className="bg-blue-700 text-white h-10 rounded-lg px-4"
          onClick={() => {
            sendMessage();
            setMessage("");
            inputRef.current.value = "";
          }}
        >
          <PaperPlaneIcon />
        </button>
      </div>
    </div>
  );
};

MessageInput.propTypes = {
  setMessage: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

const PaperPlaneIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 -rotate-12"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
      />
    </svg>
  );
};
