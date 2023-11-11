import Image from "next/image";
import classNames from "classnames";

import { Team } from "@/server/teams";

import agents from "@/data/agents.json";

export function AgentPick({
  agent,
  layout = "ltr",
  team,
  color,
}: {
  layout?: "ltr" | "rtl";
  team: Team;
  agent: string | null;
  color: string;
}) {
  return (
    <div
      className={classNames(
        "flex gap-3",
        layout === "ltr" ? "flex-row" : "flex-row-reverse"
      )}
    >
      <div
        className={classNames(
          "shadow-[#000_0_0_10px_1px]",
          agent ? "border-t-4" : "border-b-4"
        )}
        style={{ borderColor: color }}
      >
        <div className="w-[118px] h-[66px] bg-[#3d4857]">
          {agent && (
            <Image
              width={100}
              height={100}
              layout="responsive"
              objectFit="contain"
              src={`/assets/agents/${agent}/icon.png`}
              alt={agent}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center text-white">
        <h2 className="text-xl font-bold">{team.name}</h2>
        <span
          className={classNames(
            "text-sm",
            !agent && "tracking-wider",
            layout === "rtl" && "text-right"
          )}
        >
          {agent ? agents[agent as keyof typeof agents].name : "Picking..."}
        </span>
      </div>
    </div>
  );
}
