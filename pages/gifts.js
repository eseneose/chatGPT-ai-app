import Head from "next/head";
import React from "react";
import { useState } from "react";
import styles from "./index.module.css";
import { useSpeechSynthesis } from "react-speech-kit";

export default function Home() {
  

  
 
 
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const { speak } = useSpeechSynthesis();

  async function onSubmit(event) {
    event.preventDefault();

    if (loading) {
      return;
    }
    setLoading(true);
    setResult("");
    const response = await fetch("/api/generate-gifts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({prompt}),
    });
    const data = await response.json();
    speak({ text: data.result });
    setResult(data.result.replaceAll("\n", "<br />"));
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
        
       
        <form onSubmit={onSubmit}>
           <input
            type="text"
            name="hobbies"
            placeholder="Enter your prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <input type="submit" value="Submit" />
        </form>
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
