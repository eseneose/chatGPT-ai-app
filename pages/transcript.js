// import { useRef, useState } from "react";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import { useSpeechSynthesis } from "react-speech-kit";
// import  "regenerator-runtime";
// import microPhoneIcon from "./microphone.svg";

// export default function Home() {
//     const [loading, setLoading] = useState(false);
//     const [result, setResult] = useState("");
//   const { transcript, resetTranscript } = useSpeechRecognition();
//   const [isListening, setIsListening] = useState(false);
//   const microphoneRef = useRef(null);
//   const { speak } = useSpeechSynthesis();
//   if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//     return (
//       <div className="mircophone-container">
//         Browser is not Support Speech Recognition.
//       </div>
//     );
//   }

//   async function submit(prompt) {
    
//     if (loading) {
//       return;
//     }
//     setLoading(true);
//     setResult("");
//     const response = await fetch("/api/generate-gifts", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({prompt}),
//     });
//     const data = await response.json();
   
//     setResult(data.result.replaceAll("\n", "<br />"));
//     setLoading(false);
//      speak({ text: data.result });
//   }
//   const handleListing = () => {
//     setIsListening(true);
//     microphoneRef.current.classList.add("listening");
//     SpeechRecognition.startListening({
//       continuous: true,
//     });
//   };
//   const stopHandle = () => {
//     setIsListening(false);
//     microphoneRef.current.classList.remove("listening");
//     SpeechRecognition.stopListening();
//     console.log(transcript)
//     submit(transcript)
//   };
//   const handleReset = () => {
//    // stopHandle();
//     resetTranscript();
//   };
//   return (
//     <div className="microphone-wrapper">
//       <div className="mircophone-container">
//         <div
//           className="microphone-icon-container"
//           ref={microphoneRef}
//           onClick={handleListing}
//         >
//           <img src={microPhoneIcon} className="microphone-icon" />
//         </div>
//         <div className="microphone-status">
//           {isListening ? "Listening........." : "Click to start Listening"}
//         </div>
//         {isListening && (
//           <button className="microphone-stop btn" onClick={stopHandle}>
//             Stop
//           </button>
//         )}
//       </div>
//       {transcript && (
//         <div className="microphone-result-container">
//           <div className="microphone-result-text">{transcript}</div>
//           <button className="microphone-reset btn" onClick={handleReset}>
//             Reset
//           </button>
//         </div>
//       )}

//         <div
//           //className={styles.result}
//           dangerouslySetInnerHTML={{ __html: result }}
//         />
//     </div>
    

    
//   );
// }