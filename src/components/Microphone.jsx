import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import microphoneIcone from "../assets/icons/microphone.svg";

const Microphone = ({ isListening, setIsListening, setSearchQuery, onSearch}) => {
  const recognitionRef = useRef(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      setIsSupported(false);
      toast.error("Your browser does not support speech recognition.");
      return;
    }
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      toast.loading("Listening...", { id: "listening" });
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
      toast.dismiss("listening");
    };

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);

      if (onSearch) {
        onSearch(transcript);
      }
      toast.success(`You said: "${transcript}"`, { id: "listening" });
    };

    recognitionRef.current.onerror = (event) => {
      let message = "";
      switch (event.error) {
        case "no-speech":
          message = "no speech detected. Please try again.";
          break;
        case "audio-capture":
          message = "Microphone not found. Please check your microphone.";
          break;
        case "not-allowed":
          message = "Permission denied. Please allow microphone access.";
          break;
        case "aborted":
          message = "speech recognition aborted. Please try again.";
          break;
        case "network":
          message = " network error occurred. Please check your connection.";
          break;
        default:
          message = `Speech recognition error: ${event.error}`;
      }
      toast.error(message, { id: "listening" });
      setIsListening(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current.onstart = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
      }
    };
  }, [setIsListening, setSearchQuery]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  return (
    <button
      type="button"
      onClick={isListening ? stopListening : startListening}
      disabled={!isSupported}
      className={`absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center ${!isSupported ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <div className="w-[2px] h-[24px]  bg-[#070D23] mr-[16px]"></div>
      <img
        src={microphoneIcone}
        alt="voice search"
        className={`w-[24px] h-[24px] transition-all duration-300 ${
        isListening ? "opacity-100" : "opacity-50 grayscale"
      }`}
      />
    </button>
  );
};

export default Microphone;
