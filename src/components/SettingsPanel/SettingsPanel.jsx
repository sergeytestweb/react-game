/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef, useState } from "react";
import "./settingsPanel.scss";
import { Range, getTrackBackground } from "react-range";
import { useHotkeys } from "react-hotkeys-hook";
import phoneSound from "../../assets/mp3/bgMusic.mp3";
import volume from "../../assets/mp3/img/volume.svg";
import fullscreenSvg from "../../assets/mp3/img/fullscreen.svg";

const STEP = 0.1;
const MIN = 0;
const MAX = 100;

const Volume = () => {
  const phoneMusic = useRef(null);

  const [state, setState] = useState({
    toggled: false,
    volume: [50],
  });

  useHotkeys("m", () => setState({ ...state, volume: [0] }));

  useEffect(() => {
    const e = state.volume[0];
    phoneMusic.current.volume = e * 0.01;
    document.addEventListener("click", () => phoneMusic.current?.play());
  }, [state.volume]);

  const RenderRange = () => (
    <div>
      <Range
        values={state.volume}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => setState({ ...state, volume: values })}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: state.volume,
                  colors: ["#548BF4", "#ccc"],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              height: "15px",
              width: "15px",
              borderRadius: "50%",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          >
            <div
              style={{
                height: "5px",
                width: "5px",
                borderRadius: "50%",
                backgroundColor: isDragged ? "#548BF4" : "#CCC",
              }}
            />
          </div>
        )}
      />
    </div>
  );

  return (
    <div
      onMouseEnter={() => setState({ ...state, toggled: true })}
      onMouseLeave={() => setState({ ...state, toggled: false })}
      className="volume"
    >
      {state.toggled ? (
        RenderRange()
      ) : (
        <img width="30px" src={volume} alt="volume-icon" />
      )}
      <audio loop ref={phoneMusic} src={phoneSound} />
    </div>
  );
};

const SettingsPanel = () => {
  const [fullscreen, setFullscreen] = useState(false)

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen)
    if (!fullscreen) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <div className="settings__panel">
      <div className="settings__panel--volume">
        <Volume />
      </div>
      <div className="fullscreen" onClick={() => toggleFullscreen()}>
        <img width="30px" src={fullscreenSvg} alt="fullscreen"/>
      </div>
    </div>
  );
};

export default SettingsPanel;
