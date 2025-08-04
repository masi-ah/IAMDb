import { useState, useEffect, useRef } from "react";


const Microphone = ({isListening, setIsListening, setSearchQuery}) => {
  const recognitionRef = useRef(null);
}

useEffect(() => {
  if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
    toast.error("Your browser does not support speech recognition.");
    return;
  }
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognitionRef.current = SpeechRecognition();
  recognitionRef.current.continuous = false;
  recognitionRef.current.lang = "en-US";

  recognitionRef.current.onstart = () => {
    setIsListening(true);
    toast.loading("Listening...", { id: "listening"})
  };

   recognitionRef.current.onend = () => {
    setIsListening(false);
    toast.dismiss("Listening");
  };

  recognitionRef.current.onresult = (event) => {
    const transcript = event.result[0][0].transcript;
    setSearchQuery(transcript);
    toast.success(`You said: "${transcript}"`);
  };
  
}, [setIsListening, setSearchQuery]);
