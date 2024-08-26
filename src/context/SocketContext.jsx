// React에서 필요한 훅과 함수를 가져옵니다.
// createContext는 새로운 컨텍스트 객체를 생성하는 데 사용됩니다.
// useContext는 생성된 컨텍스트를 사용하여 데이터를 읽어올 수 있습니다.
// useState는 컴포넌트의 상태를 관리하고
// useEffect는 컴포넌트의 생명주기 동안 특정 로직을 실행하는 데 사용됩니다.
import { createContext, useContext, useEffect, useState } from "react";
// Recoil 라이브러리에서 useRecoilValue 훅을 가져옵니다.
// 이 훅을 사용하여 Recoil 상태에서 값을 읽습니다.
import { useRecoilValue } from "recoil";
// Recoil atom을 가져옵니다. 이 atom은 사용자의 상태를 저장하는 데 사용됩니다.
import userAtom from "../atoms/userAtom";
// Socket.IO 클라이언트 라이브러리를 가져옵니다.
// 이를 통해 서버와 실시간 통신을 할 수 있습니다.
import io from "socket.io-client";

// SocketContext라는 새로운 컨텍스트를 생성합니다.
// 초기값을 지정하지 않으면 기본적으로 undefined로 설정됩니다.
const SocketContext = createContext();

// useSocket 커스텀 훅을 정의합니다.
// 이 훅을 사용하여 컴포넌트에서 SocketContext의 값을 쉽게 사용할 수 있습니다.
export const useSocket = () => {
  // useContext를 사용하여 SocketContext의 값을 읽습니다.
  return useContext(SocketContext);
};

// SocketContextProvider 컴포넌트를 정의합니다.
// 이 컴포넌트는 자식 컴포넌트를 감싸고, 모든 자식 컴포넌트에
// 컨텍스트 값을 제공하는 역할을 합니다.
export const SocketContextProvider = ({ children }) => {
  // 소켓 객체를 관리하기 위해 상태를 정의합니다.
  const [socket, setSocket] = useState(null);

  const [onlineUsers, setOnlineUsers] = useState([]);
  // Recoil을 사용하여 사용자 정보를 가져옵니다.
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    // 사용자가 로그인한 경우에만 소켓을 생성합니다.

    // Socket.IO 클라이언트를 초기화합니다.
    const socket = io(`http://localhost:5000`, {
      query: {
        userId: user?._id, // 사용자 ID를 쿼리 파라미터로 보냅니다.
      },
    });

    // 소켓 객체를 상태에 저장합니다.
    setSocket(socket);

    // 온라인 사용자 목록을 업데이트합니다.
    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    // 컴포넌트가 언마운트될 때 소켓 연결을 닫습니다.
    return () => socket && socket.close();
  }, [user?._id]); // user._id가 변경될 때만 이 effect가 다시 실행됩니다.

  console.log("onlineUsers", onlineUsers);
  // SocketContext.Provider를 사용하여 소켓 객체를 제공하고 있습니다.
  // value prop을 통해 자식 컴포넌트에 제공할 데이터를 정의합니다.
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

// SocketContext를 기본으로 내보냅니다. 이를 통해 다른 컴포넌트에서 쉽게 import할 수 있습니다.
export default SocketContext;
