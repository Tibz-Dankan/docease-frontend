import React, { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import Peer from "peerjs";
import { useSelector } from "react-redux";
import {
  TVideoConferenceExtended,
  TVideoConferenceState,
} from "../../types/videoConference";
import { TAuthState } from "../../types/auth";
import { socketUrl } from "../../store";
import { IoVideocam, IoVideocamOff } from "react-icons/io5";
import { AiFillAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { MdCallEnd } from "react-icons/md";
import { IconContext } from "react-icons";

interface VideoConferenceProps {
  socket: Socket;
}

export const VideoConference: React.FC<VideoConferenceProps> = (props) => {
  const socket = useRef<Socket>(props.socket);
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const videoGridRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const myVideoStreamRef = useRef<MediaStream>();
  const peerRef = useRef<Peer>();

  const videoConference = useSelector(
    (state: TVideoConferenceState) => state.videoConference
  );
  const userId = useSelector((state: TAuthState) => state.auth.user?.userId)!;

  console.log("videoConference->", videoConference);

  useEffect(() => {
    // socket.current = io(socketUrl);

    const roomId = videoConference.videoConferenceId;
    if (!roomId) return;

    // Connect new user to conference call
    const connectToNewUser = (userId: string, stream: MediaStream) => {
      console.log("I call someone " + userId);
      const call = peerRef.current!.call(userId, stream);
      // const video = document.createElement("video");
      const videoElement = document.getElementById("host") as HTMLVideoElement;
      // video.setAttribute("id", "host");

      call.on("stream", (userVideoStream) => {
        // addVideoStream(video, userVideoStream);
        addVideoStream(videoElement, userVideoStream);
      });
    };

    const addVideoStream = (video: HTMLVideoElement, stream: MediaStream) => {
      // if (videoGridRef.current && myVideoStreamRef.current) {
      //   video.srcObject = stream;
      //   video.addEventListener("loadedmetadata", () => {
      //     video.play();
      //     videoGridRef.current!.append(video);
      //   });
      // }

      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
        // videoGridRef.current!.append(video);
      });
    };

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        myVideoStreamRef.current = stream;
        const videoElement = document.getElementById(
          "host"
        ) as HTMLVideoElement;
        // addVideoStream(myVideoRef.current!, stream);
        addVideoStream(videoElement, stream);

        peerRef.current = new Peer({
          // host: "/", //To be tested now
          host: "127.0.0.1",
          port: 8000,
          path: "/peerjs",
          config: {
            iceServers: [
              { url: "stun:stun01.sipphone.com" },
              { url: "stun:stun.ekiga.net" },
              { url: "stun:stunserver.org" },
              { url: "stun:stun.softjoys.com" },
              { url: "stun:stun.voiparound.com" },
              { url: "stun:stun.voipbuster.com" },
              { url: "stun:stun.voipstunt.com" },
              { url: "stun:stun.voxgratia.org" },
              { url: "stun:stun.xten.com" },
              {
                url: "turn:192.158.29.39:3478?transport=udp",
                credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
                username: "28224511:1379330808",
              },
              {
                url: "turn:192.158.29.39:3478?transport=tcp",
                credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
                username: "28224511:1379330808",
              },
            ],
          },
          debug: 3,
        });

        // current user joins the call
        peerRef.current.on("open", (id) => {
          console.log("my peerId " + id);
          const videoConf = videoConference as TVideoConferenceExtended;
          videoConf.userId = userId;
          videoConf.userPeerId = id;
          // socket.current!.emit("join-room", roomId, id, userId);
          console.log("Joining room! with videoConf->", videoConf);
          socket.current!.emit("join-room", videoConf);
        });

        // current user is being called
        peerRef.current.on("call", (call) => {
          console.log("someone call me");
          call.answer(stream);
          // const video = document.createElement("video");
          const videoElement = document.getElementById(
            "attendee"
          ) as HTMLVideoElement;
          // video.setAttribute("id", "attendee");

          call.on("stream", (userVideoStream) => {
            addVideoStream(videoElement, userVideoStream);
          });
        });

        socket.current!.on("user-connected", (userId: string) => {
          connectToNewUser(userId, stream);
        });

        // consider saving chat messages in the state(useState) on client side
        socket.current!.on(
          "createMessage",
          (message: string, userId: string) => {
            if (messagesRef.current) {
              messagesRef.current.innerHTML += `<div class="message">
                <b><i class="far fa-user-circle"></i> <span> ${
                  userId === userId ? "me" : userId
                }</span> </b>
                <span>${message}</span>
              </div>`;
            }
          }
        );
      })
      .catch((error) => console.error("Error accessing media devices:", error));

    return () => {
      // socket.current!.disconnect();
      // peerRef && peerRef?.current!.disconnect();
    };
  }, [userId]);

  const handleSend = () => {
    if (textRef.current && textRef.current.value.length !== 0) {
      socket.current!.emit("message", textRef.current.value);
      textRef.current.value = "";
    }
  };

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (
  //     e.key === "Enter" &&
  //     textRef.current &&
  //     textRef.current.value.length !== 0
  //   ) {
  //     socket.current!.emit("message", textRef.current.value);
  //     textRef.current.value = "";
  //   }
  // };

  return (
    <div className="w-full bg-green-500 min-h-[80vh]">
      <div className="flex flex-col w-full h-1/2 sm:h-[80vh] md:w-3/5">
        <div className="w-full flex-1 bg-blue-500 relative">
          <video
            className="w-full h-full bg-gray-300 rounded-md"
            id="attendee"
          ></video>
          <video
            className="w-[20%] h-[20%] absolute bottom-4
             right-4 bg-gray-300 rounded-md shadow-md"
            id="host"
          ></video>
        </div>
        <div className="px-4 py-4 flex items-center justify-between bg-blue-600">
          <div className="flex items-center justify-center gap-4">
            <span className="flex items-center justify-center">
              <IconContext.Provider value={{ size: "1.5rem", color: "#fff" }}>
                <IoVideocam />
              </IconContext.Provider>
            </span>
            {/* <span className="flex items-center justify-center">
              <IconContext.Provider
                value={{ size: "1.5rem", color: "#42968D" }}
              >
                <IoVideocamOff />
              </IconContext.Provider>
            </span> */}
            <span className="flex items-center justify-center">
              <IconContext.Provider value={{ size: "1.5rem", color: "#fff" }}>
                <AiFillAudio />
              </IconContext.Provider>
            </span>{" "}
            {/* <span className="flex items-center justify-center">
              <IconContext.Provider
                value={{ size: "1.5rem", color: "#42968D" }}
              >
                <AiOutlineAudioMuted />
              </IconContext.Provider>
            </span> */}
          </div>
          <div>
            <span
              className="w-11 h-11 flex items-center justify-center
              bg-red-600 rounded-[50%]"
            >
              <IconContext.Provider value={{ size: "1.2rem", color: "#fff" }}>
                <MdCallEnd />
              </IconContext.Provider>
            </span>
          </div>
        </div>
      </div>
      {/* <video ref={myVideoRef} muted autoPlay style={{ width: "300px" }}></video>
      <div ref={videoGridRef}></div>
      <input id="chat_message" ref={textRef} type="text" />
      <button id="send" onClick={handleSend}>
        Send
      </button>
      <div className="messages" ref={messagesRef}></div> */}
    </div>
  );
};
