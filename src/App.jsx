import { useEffect, useState } from "react";
import "./App.css";
import { apiService } from "./services/api-service";
import MessageList from "./components/MessageList";
import { MessageInput } from "./components/MessageInput";
import { DeleteIcon } from "./Icons";

function App() {
  const [messages, setMessages] = useState([]); // [
  const [message, setMessage] = useState("");
  const [sort, setSort] = useState("asc");
  const [deleteAll, setDeleteAll] = useState(false);

  useEffect(() => {
    setAllMessages();
  }, []);

  const setAllMessages = async () => {
    let messagesArr = await apiService.getAllMessgaes();
    setMessages(messagesArr);
  };

  const sendMessage = async () => {
    if (message === "") return;

    await apiService.postMessage(message);

    setAllMessages();
  };

  const deleteMessage = async (id) => {
    await apiService.deleteMessage(id);
    setAllMessages();
  };

  const deleteAllMessages = async () => {
    messages.forEach(async (message, i) => {
      await apiService.deleteMessage(message.id);
      if (i === messages.length - 1) {
        setTimeout(() => {
          setAllMessages();
          setDeleteAll(false);
        });
      }
    });
  };

  const sortMessages = (type) => {
    let tempMessages = [...messages];
    if (type === "asc") {
      tempMessages.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
    }
    if (type === "desc") {
      tempMessages.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
    }

    setMessages(tempMessages);
    setSort(type);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white lg:shadow-lg lg:h-screen">
      <div>
        <div className="flex items-center justify-between p-2 py-4">
          <h1
            className="text-md font-medium"
            onClick={() => sortMessages("desc")}
          >
            Messenger
          </h1>

          <div className="flex flex-col items-start gap-2">
            {/* <p className="flex items-center gap-1 text-xs px-2">
            <SortIcon /> Sort by
          </p> */}
            <div className="flex items-center rounded-lg border-[1px] border-zinc-200">
              <button
                className={`text-xs hover:bg-zinc-100 p-2 rounded-l-lg px-4 font-medium ${
                  sort === "desc" ? "bg-zinc-100" : ""
                }`}
                onClick={() => sortMessages("desc")}
              >
                Latest
              </button>
              <button
                className={`text-xs hover:bg-zinc-100 p-2 rounded-r-lg px-4 font-medium ${
                  sort === "asc" ? "bg-zinc-100" : ""
                }`}
                onClick={() => sortMessages("asc")}
              >
                Oldest
              </button>
            </div>
          </div>
          <button
            className="text-red-600 flex items-center gap-2 text-xs hover:bg-red-50 p-2 rounded-lg px-4 font-medium"
            onClick={() => setDeleteAll(true)}
          >
            <DeleteIcon /> Delete All
          </button>
        </div>

        {deleteAll && (
          <div className="flex justify-center items-center gap-2 text-sm pb-4">
            <p>Are you sure ?</p>
            <button
              className="p-2 rounded-lg bg-red-50 px-6 text-red-600 hover:bg-red-100"
              onClick={() => deleteAllMessages()}
            >
              Yes
            </button>
            <button
              className="p-2 rounded-lg bg-zinc-50 px-6 text-zinc-600 hover:bg-zinc-100"
              onClick={() => setDeleteAll(false)}
            >
              No
            </button>
          </div>
        )}
      </div>
      <MessageList
        messages={messages}
        deleteMessage={deleteMessage}
        key={messages}
      />
      <MessageInput setMessage={setMessage} sendMessage={sendMessage} />
    </div>
  );
}

export default App;
