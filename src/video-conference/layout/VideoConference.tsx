import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { useSelector } from "react-redux";
import {
  TVideoConferenceConnected,
  TVideoConferenceState,
} from "../../types/videoConference";
import { TAuthState, TUser } from "../../types/auth";
import { IoVideocam, IoVideocamOff } from "react-icons/io5";
import { AiFillAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { MdCallEnd } from "react-icons/md";
import { IconContext } from "react-icons";
// import { JoinVideoConference } from "../UI/JoinVideoConference";
import { Socket, io } from "socket.io-client";
import { generateChatRoomId } from "../../utils/generateChatRoomId";

export const VideoConference: React.FC = () => {
  const [hasMutedVideo, setHasMutedVideo] = useState<boolean>(false);
  const [hasMutedAudio, setHasMutedAudio] = useState<boolean>(false);
  const user = useSelector((state: TAuthState) => state.auth.user!);

  const videoMuteHandler = () => {
    // TODO: add actual functionality for muting and un muting
    setHasMutedVideo(() => !hasMutedVideo);
  };

  const audioMuteHandler = () => {
    // TODO: add actual functionality for muting and un muting
    setHasMutedAudio(() => !hasMutedAudio);
  };

  const videoConference = useSelector(
    (state: TVideoConferenceState) => state.videoConference
  ) as TVideoConferenceConnected;

  console.log("videoConference: ", videoConference);
  const socket = useRef<Socket | null>(io("http://localhost:8000"));
  const peer = useRef<Peer | null>(null);
  const effectRan = useRef(false);

  useEffect(() => {
    const initializeMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });

        const video = document.getElementById(
          "current-user"
        ) as HTMLVideoElement;
        addVideoStream(video, stream);

        // TODO: To dynamically cater for the production host value
        peer.current = new Peer({
          host: "127.0.0.1",
          port: 8000,
          path: "/peerjs",
          config: {
            iceServers: [
              { urls: "stun:stun01.sipphone.com" },
              { urls: "stun:stun.ekiga.net" },
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

        if (!peer.current) return;
        console.log("socket.current:::", socket.current);
        console.log("peer.current:::", peer.current);

        peer.current.on("open", (peerId) => {
          console.log("my id is" + peerId);

          if (!socket.current?.connected) return;

          const isCurrentUserHost = user.userId === videoConference.hostId;
          const peerUser: TUser = isCurrentUserHost
            ? videoConference.Attendee!
            : videoConference.Host!;

          const roomId = generateChatRoomId(user, peerUser);

          console.log("Joining video conf chat room...");
          socket.current?.emit("join-room", roomId, peerId, peerUser);
        });

        // someone call me
        peer.current.on("call", (call) => {
          console.log("someone call me");
          call.answer(stream);

          const video = document.getElementById(
            "peer-user"
          ) as HTMLVideoElement;

          call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          });
        });

        socket.current?.on("user-connected", (peerId: string) => {
          console.log("New user connected with peerId::::=>", peerId);
          connectToNewUser(peerId, stream);
        });
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    const addVideoStream = (video: HTMLVideoElement, stream: MediaStream) => {
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
    };

    // I call someone
    const connectToNewUser = (peerId: string, stream: MediaStream) => {
      console.log("I call someone" + peerId);
      const call = peer.current?.call(peerId, stream);
      if (call) {
        const video = document.getElementById("peer-user") as HTMLVideoElement;

        call.on("stream", (userVideoStream) => {
          addVideoStream(video, userVideoStream);
        });
      }
    };

    if (effectRan.current === false) {
      initializeMediaStream();
      return () => {
        effectRan.current = true;
      };
    }
  }, [user]);

  return (
    <div className="w-full bg-green-500 min-h-[80vh]">
      <div className="flex flex-col w-full h-1/2 sm:h-[80vh] md:w-3/5">
        <div className="w-full flex-1 bg-blue-500 relative">
          <video
            className="w-full h-full bg-gray-300 rounded-md"
            id="peer-user"
          ></video>
          <video
            className="w-[20%] h-[20%] absolute bottom-4
             right-4 bg-gray-300 rounded-md shadow-md"
            id="current-user"
          ></video>
        </div>
        <div className="px-4 py-4 flex items-center justify-between bg-blue-600">
          <div className="flex items-center justify-center gap-4">
            {/* {!hasJoinedConference && (
              <JoinVideoConference
                videoConferenceId={videoConference.videoConferenceId}
              />
            )} */}
            {/* TODO: to a counter when the conference starts */}
            {!hasMutedVideo && (
              <span
                className="flex items-center justify-center"
                onClick={() => videoMuteHandler()}
              >
                <IconContext.Provider value={{ size: "1.5rem", color: "#fff" }}>
                  <IoVideocam />
                </IconContext.Provider>
              </span>
            )}
            {hasMutedVideo && (
              <span
                className="flex items-center justify-center"
                onClick={() => videoMuteHandler()}
              >
                <IconContext.Provider value={{ size: "1.5rem", color: "#fff" }}>
                  <IoVideocamOff />
                </IconContext.Provider>
              </span>
            )}
            {!hasMutedAudio && (
              <span
                className="flex items-center justify-center"
                onClick={() => audioMuteHandler()}
              >
                <IconContext.Provider value={{ size: "1.5rem", color: "#fff" }}>
                  <AiFillAudio />
                </IconContext.Provider>
              </span>
            )}
            {hasMutedAudio && (
              <span
                className="flex items-center justify-center"
                onClick={() => audioMuteHandler()}
              >
                <IconContext.Provider value={{ size: "1.5rem", color: "#fff" }}>
                  <AiOutlineAudioMuted />
                </IconContext.Provider>
              </span>
            )}
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
    </div>
  );
};
