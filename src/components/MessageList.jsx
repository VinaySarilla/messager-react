import MessageCard from "./MessageCard";
import PropTypes from "prop-types";

const MessageList = ({ messages, deleteMessage }) => {
  return (
    <div className="flex flex-col gap-4 h-[85vh] overflow-scroll">
      {messages.map((message) => {
        return (
          <MessageCard
            message={message}
            key={message.id}
            deleteMessage={deleteMessage}
          />
        );
      })}
    </div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      source: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteMessage: PropTypes.func.isRequired,
};

export default MessageList;
