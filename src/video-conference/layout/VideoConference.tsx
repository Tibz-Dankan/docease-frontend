import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { useSelector } from "react-redux";
import {
  TVideoConferenceConnected,
  TVideoConferenceState,
} from "../../types/videoConference";
import { TAuthState } from "../../types/auth";
import { IoVideocam, IoVideocamOff } from "react-icons/io5";
import { AiFillAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { MdCallEnd } from "react-icons/md";
import { IconContext } from "react-icons";
import { JoinVideoConference } from "../UI/JoinVideoConference";

export const VideoConference: React.FC = () => {
  const myVideoStreamRef = useRef<MediaStream>();
  const peerRef = useRef<Peer>();
  const [peerId, setPeerId] = useState<string>("");
  const [hasJoinedConference, setHasJoinedConference] =
    useState<boolean>(false);
  const [hasMutedVideo, setHasMutedVideo] = useState<boolean>(false);
  const [hasMutedAudio, setHasMutedAudio] = useState<boolean>(false);

  const joinedConferenceHandler = (hasJoined: boolean) => {
    setHasJoinedConference(() => hasJoined);
  };

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

  const userId = useSelector((state: TAuthState) => state.auth.user?.userId)!;

  console.log("videoConference: ", videoConference);

  useEffect(() => {
    const roomId = videoConference.videoConferenceId;
    if (!roomId) return;

    // Connect new user to conference call
    const connectToNewUser = (userId: string, stream: MediaStream) => {
      console.log("I call someone " + userId);
      const call = peerRef.current!.call(userId, stream);
      const videoElement = document.getElementById("host") as HTMLVideoElement;

      call.on("stream", (userVideoStream) => {
        addVideoStream(videoElement, userVideoStream);
      });
    };

    const addVideoStream = (video: HTMLVideoElement, stream: MediaStream) => {
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
    };

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        myVideoStreamRef.current = stream;
        const videoElement = document.getElementById(
          "host"
        ) as HTMLVideoElement;
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
          setPeerId(() => id);
          console.log("my peerId " + id);

          // socket.current!.emit("join-room", videoConf);
        });

        // current user is being called
        peerRef.current.on("call", (call) => {
          console.log("someone call me");
          call.answer(stream);
          const videoElement = document.getElementById(
            "attendee"
          ) as HTMLVideoElement;

          call.on("stream", (userVideoStream) => {
            addVideoStream(videoElement, userVideoStream);
          });
        });

        // // listen for joining user and them connect them to the call
        // socket.current!.on("user-connected", (userId: string) => {
        //   connectToNewUser(userId, stream);
        // });
        if (videoConference.hasConnected) {
          connectToNewUser(videoConference.connectPeerId, stream);
        }
      })
      .catch((error) => console.error("Error accessing media devices:", error));

    return () => {
      // peerRef && peerRef?.current!.disconnect();
    };
  }, [userId]);

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
            {!hasJoinedConference && (
              <JoinVideoConference
                videoConferenceId={videoConference.videoConferenceId}
                peerId={peerId}
                onJoin={joinedConferenceHandler}
              />
            )}
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
