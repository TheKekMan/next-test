import MainLayout from "../src/components/layout/MainLayout";
import Head from "next/head";
import React, { useState } from "react";
import BarVisualizer from "../src/components/charts/BarVisualizer";

export default function Music() {
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [isStop, setIsStop] = useState(true);
  const handleStop = () => {
    setIsStop((prev) => !prev);
  };

  const handleFile = (e) => {
    const content = e.target.result;
    setAudioBuffer(content);
    setFileSelected(true);
    handleStop();
  };

  const handleAudioSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    if (file.type.includes("audio")) {
      reader.onloadend = handleFile;
      reader.readAsArrayBuffer(file);
    } else {
      e.target.value = null;
      alert("File must be audio");
    }
  };
  return (
    <MainLayout>
      <Head>
        <title> Music page </title>
      </Head>
      <h1>Audio Visualizer</h1>
      <div className="App">
        {fileSelected && !isStop ? null : (
          <input type={"file"} onChange={handleAudioSelected} />
        )}
        <div>
          {audioBuffer && !isStop ? (
            <BarVisualizer audioBuffer={audioBuffer} handleStop={handleStop} />
          ) : (
            <span> Choose audio</span>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
