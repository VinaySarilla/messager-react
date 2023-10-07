import { useEffect, useRef, useState } from "react";
import MessageCard from "./MessageCard";
import PropTypes from "prop-types";
import Loader from "./Loader";

const MessageList = ({ messages, deleteMessage }) => {
  const scrollRef = useRef(null);
  const [page, setPage] = useState(1);
  const [paginatedMessages, setPaginatedMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    paginate(page);
  }, []);

  const paginate = (nextPage) => {
    console.log("paginate");
    // divide messages array into pages of 20

    let tempMessages = [...messages];

    let pagedMessages = tempMessages.splice(0, nextPage * 20);

    setPaginatedMessages(pagedMessages);
  };

  return (
    <div
      className="flex flex-col gap-4 h-[85vh] overflow-scroll p-6"
      ref={scrollRef}
      onScroll={() => {
        if (paginatedMessages.length === messages.length) return;

        if (
          scrollRef.current.scrollHeight -
            scrollRef.current.clientHeight -
            scrollRef.current.scrollTop <
          1
        ) {
          setLoading(true);

          setTimeout(() => {
            setPage(page + 1);
            paginate(page + 1);
            setLoading(false);
          }, 1500);
        }
      }}
    >
      {paginatedMessages.map((message) => {
        return (
          <MessageCard
            message={message}
            key={message.id}
            deleteMessage={deleteMessage}
          />
        );
      })}
      {loading && (
        <div className="text-blue-700 mx-auto">
          <Loader />
        </div>
      )}
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
