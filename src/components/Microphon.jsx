import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

const Microphone = ({isListening, setIsListening, setSearchQuery}) => {
  const recognitionRef = useRef(null);

useEffect(() => {
  if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
    toast.error("Your browser does not support speech recognition.");
    return;
  }
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognitionRef.current = new SpeechRecognition();
  recognitionRef.current.continuous = false;
  recognitionRef.current.lang = "en-US";

  recognitionRef.current.onstart = () => {
    setIsListening(true);
    toast.loading("Listening...", { id: "listening"})
  };

   recognitionRef.current.onend = () => {
    setIsListening(false);
    toast.dismiss("listening");
  };

  recognitionRef.current.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setSearchQuery(transcript);
    toast.success(`You said: "${transcript}"`);
  };
  
  recognitionRef.current.onerror = (event) => {
    let message = "";
    switch(event.error) {
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
    toast.error(message);
    setIsListening(false);
  };

  return () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }
  };
}, [setIsListening, setSearchQuery]);
};
