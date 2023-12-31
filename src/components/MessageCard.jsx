import PropTypes from "prop-types";
import { DeleteIcon } from "../Icons";
import { useEffect } from "react";

const MessageCard = ({ message, deleteMessage }) => {
  useEffect(() => {
    getDay(message.timestamp);
  }, []);

  const getTime = (timestamp) => {
    //12 hours format
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    let strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  };

  const getDay = (timestamp) => {
    let date = new Date(timestamp);
    let day = date.getDate();

    if (new Date().getDate() - day === 0) {
      return "Today";
    }

    if (new Date().getDate() - day === 1) {
      return "Yesterday";
    }

    return `${day}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div key={message.id} className="p-3 bg-zinc-100 rounded-lg message-card">
      <div className="flex gap-4">
        <div className="bg-blue-700 rounded-md p-1 px-3 text-center grid place-content-center text-white user-initials">
          <span>{message.source[0]}</span>
        </div>

        <div className="flex gap-2 items-center justify-between w-full">
          <p className="text-lg font-medium">{message.text}</p>
          <p className="text-xs text-zinc-500 message-time">
            <span>{getDay(message.timestamp)},</span>
            <span className="ml-2">{getTime(message.timestamp)}</span>
          </p>
          <button
            className="delete-btn text-red-600"
            onClick={() => deleteMessage(message.id)}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

MessageCard.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
  }).isRequired,
  deleteMessage: PropTypes.func.isRequired,
};

export default MessageCard;
