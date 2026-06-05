import ChatList from './ChatList';
import ChatTopBar from './ChatTopBar';

export default function Chat() {
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopBar />

      <ChatList />
    </div>
  );
}
