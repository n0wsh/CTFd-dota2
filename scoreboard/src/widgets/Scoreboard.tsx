import Image from "next/image";
import classNames from "classnames";
import { MouseEvent, useEffect, useState } from "react";

import { ScoreboardItem } from "@/server/scoreboard";
import { SoundsManifest } from "@/server/sounds";

import agentData from "@/data/agents.json";
import { useAgentPicks } from "@/hooks/useAgentPicks";
import { useScoreboard } from "@/hooks/useScoreboard";
import axios from "axios";

export type ScoreboardInitialData = {
  agentPicks: Record<string, string>;
  scoreboard: ScoreboardItem[];
  sounds: SoundsManifest;
};

interface HeroData {
  localized_name: string;
  img: string;
}

export function ScoreboardWidget({
  endAt,
  initialData: {
    sounds,
    scoreboard: initialScoreboard,
    agentPicks: initialAgentPicks,
  },
}: {
  endAt: number;
  initialData: ScoreboardInitialData;
}) {
  const { agentPicks } = useAgentPicks({ initialAgentPicks });
  const [heroData, setHeroData] = useState<HeroData[]>([]);
  const { scoreboard } = useScoreboard({
    endAt,
    sounds,
    agentPicks,
    initialScoreboard,
  });

  // const scoreboardMock = [
  //   { name: "Anti-Mage", score: 900, solves: 3, fails: 2 },
  //   { name: "Axe", score: 800, solves: 2, fails: 2 },
  //   { name: "Bane", score: 700, solves: 1, fails: 2 },
  //   { name: "Bloodseeker", score: 600, solves: 1, fails: 2 },
  //   { name: "Crystal Maiden", score: 500, solves: 1, fails: 2 },
  //   { name: "Drow Ranger", score: 400, solves: 1, fails: 2 },
  //   { name: "Earthshaker", score: 300, solves: 1, fails: 2 },
  //   { name: "Juggernaut", score: 200, solves: 1, fails: 2 },
  //   { name: "Mirana", score: 100, solves: 1, fails: 2 },
  //   { name: "Morphling", score: 0, solves: 0, fails: 0 },
  // ];

  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log(scoreboard);
  //     try {
  //       const res = await axios.get("https://api.opendota.com/api/heroStats");

  //       setHeroData(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const requestFullscreen = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      document.body.requestFullscreen().catch(() => {});
    }
  };

  const myLoader = ({ src }: { src: string }) => {
    return src;
  };

  return (
    <div className="w-screen h-screen bg-icebox bg-cover backdrop-blur-xl">
      <div className="w-full h-full bg-white/5 backdrop-blur-sm">
        <div
          className="w-full h-full flex justify-center overflow-scroll"
          onClick={requestFullscreen}
        >
          <div className="w-3/4 bg-gray-700 bg-opacity-60">
            <div className="w-full h-8 grid grid-flow-row-dense grid-cols-5">
              <div className="h-full col-span-2 text-slate-200 bg-gray-500 bg-opacity-90 flex justify-center items-center">
                <p>TEAMS</p>
              </div>
              <div className="h-full text-yellow-600 bg-gray-500 bg-opacity-90 flex justify-center items-center">
                <Image src={"/assets/gold-icon.png"} width={16} height={16} />
                <p style={{ marginLeft: "4px" }}>GOLD</p>
              </div>
              <div className="h-full  text-gray-300 bg-gray-500 bg-opacity-90 flex justify-center items-center">
                <p>KILLS</p>
              </div>
              <div className="h-full text-red-400 bg-gray-500 bg-opacity-90 flex justify-center items-center">
                <p>DEATHS</p>
              </div>
            </div>
            {scoreboard.map((team, index) => {
              const textColor = "text-gray-200";
              return (
                <div
                  key={team.name}
                  className={classNames(
                    "w-full h-16 mt-[2px] bg-opacity-80 grid grid-flow-row-dense grid-cols-5 items-center",
                    "bg-zinc-800"
                  )}
                >
                  <div className="h-full flex flex-row items-center col-span-2">
                    <div className="w-16">
                      {team.name && heroData.length !== 0 ? (
                        <Image
                          width="100%"
                          height="100%"
                          layout="responsive"
                          objectFit="contain"
                          className="opacity-100"
                          src={
                            heroData.length !== 0
                              ? `https://api.opendota.com${
                                  heroData.find(
                                    (el, index) =>
                                      el?.localized_name === team.name
                                  )?.img
                                }`
                              : ""
                          }
                          loader={myLoader}
                          alt={`${team.name} icon`}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    <p
                      className={classNames(
                        "px-8 font-medium text-lg text-slate-300",
                        textColor
                      )}
                    >
                      {agentPicks[team.name]
                        ? `${team.name} - ${
                            agentData[
                              agentPicks[team.name] as keyof typeof agentData
                            ].name
                          }`
                        : team.name}
                    </p>
                  </div>
                  <p
                    className={classNames(
                      "opacity-100 text-center font-medium text-lg text-yellow-400",
                      textColor
                    )}
                  >
                    {scoreboard.find((listing) => listing.name === team.name)
                      ?.score ?? 0}
                  </p>
                  <p
                    className={classNames(
                      "opacity-100 text-center font-medium text-lg text-gray-300",
                      textColor
                    )}
                  >
                    {team.solves.toString().padStart(2, "0")}
                  </p>
                  <p
                    className={classNames(
                      "opacity-100 text-center font-medium text-lg",
                      textColor
                    )}
                    style={{ color: "#F87171" }}
                  >
                    {team.fails.toString().padStart(2, "0")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
