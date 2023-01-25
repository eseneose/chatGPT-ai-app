import Head from "next/head";
import React from "react";
import { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useSpeechSynthesis } from "react-speech-kit";
import  "regenerator-runtime";

export default function Home() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const btn = document.querySelector('.talk');
    const content = document.querySelector('.content');

 
 
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");


  const recognition = new SpeechRecognition();

  recognition.onstart = function() {
    console.log("voice is activated");
};

recognition.onresult = function(event) {
    const current = event.resultIndex;
    console.log("results");

    const transcript = event.results[current][0].transcript;
   // start(transcript);
    content.textContent = transcript;
    readOutLoud(transcript);
};

  btn.addEventListener('click', () => {

    recognition.start();
});
 

  async function onSubmit() {

    if (loading) {
        return;
      }
    setLoading(true);
    setResult("");
    SpeechRecognition.startListening();
    console.log(transcript)
    // setPrompt(transcript);
    // console.log(prompt)
    
    // const response = await fetch("/api/generate-gifts", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({prompt}),
    // });
    // const data = await response.json();
    // speak({ text: data.result });
    // setResult(data.result.replaceAll("\n", "<br />"));
    setLoading(false);
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>PERSONAL AI ASSISTANT 💡</h3>
        
        <div>
        <button class="talk">listen</button>

        <button onClick={onSubmit}>listen</button>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
      </div>
        {/* <form onSubmit={onSubmit}>
           <input
            type="text"
            name="hobbies"
            placeholder="Enter your prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <input type="submit" value="Submit" />
        </form> */}
        {loading && (
          <div>
            <h3>Looking for the best gift ideas 💡</h3>
            <img src="/loading.webp" className={styles.loading} />
          </div>
        )}
        <div
          className={styles.result}
          dangerouslySetInnerHTML={{ __html: result }}
        />
      </main>
    </div>
  );
}
