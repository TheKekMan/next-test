import MainLayout from "../src/components/layout/MainLayout";
import Head from "next/head";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);

export default function About() {
  const [musicArray, setMusicArray] = useState<number[]>();
  const canvasRef = useRef(null),
    buttonRef = useRef(null);

  const audioVisualizerLogic = () => {
    const context = new window.AudioContext(),
      source = context.createBufferSource();

    fetch("music.mp3")
      .then((response) => {
        return response.arrayBuffer();
      })
      .then((response) => {
        context.decodeAudioData(response, (buffer) => {
          source.buffer = buffer;
          source.connect(context.destination);
          // auto play
          source.start(0);
        });
      });

    let audio: HTMLAudioElement, canvas, muteButton;
    audio = new Audio(source.toString());
    canvas = canvasRef.current;
    muteButton = buttonRef.current;

    //mute or play on click
    const mutePlay = () => {
      context.state === "running" ? context.suspend() : context.resume();
    };
    muteButton.onclick = () => mutePlay();

    //config audio analyzer
    const analyser = context.createAnalyser();
    source.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount,
      dataArray = new Uint8Array(bufferLength);

    //core logic for the visualizer
    const timeouts = [];
    const renderFrame = () => {
      requestAnimationFrame(renderFrame);
      setMusicArray(Array.from(dataArray));
      analyser.getByteFrequencyData(dataArray);
    };
    //Clears the accumulating timeouts.
    setTimeout(() => {
      for (let i = 0; i < timeouts.length; i++) {
        return clearTimeout(timeouts[i]);
      }
    }, 53);
    renderFrame();
  };

  const options = {
    animation: {
      duration: 100,
    },
    easing: "linear",
    responsive: true,
    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };
  const emptyArray = new Array(128);
  const colorArray = new Array();
  const labels = emptyArray.fill(" ", 0, 128);
  let barHeight;
  for (let i = 0; i < 128; i++) {
    barHeight = 200;
    let r = barHeight + 22 * (i / 128),
      g = 222 * (i / 128),
      b = 47;
    colorArray.push("rgb(" + r + "," + g + "," + b + ")");
  }
  const data = {
    labels,
    datasets: [
      {
        data: musicArray,
        fill: 1,
        borderColor: "#c62828",
        backgroundColor: colorArray,
        tension: 0.3,
        pointHoverRadius: 8,
        pointRadius: 4,
        pointStyle: "rectRot",
        pointBorderColor: "white",
      },
    ],
  };

  useEffect(() => {
    audioVisualizerLogic();
  }, []);
  return (
    <MainLayout>
      <Head>
        <title> About Page </title>
      </Head>
      <h1>About</h1>
      <div className="App">
        <header className="App-header">
          <h1>React Audio Visualizer</h1>
        </header>
        <span className="hint">(Click page to start/stop)</span>
        <main className="main">
          <button
            className="contextButton"
            style={{ height: "80vh", width: "100vw" }}
            ref={buttonRef}
          >
            <Bar data={data} options={options} />
          </button>
        </main>
      </div>
    </MainLayout>
  );
}
