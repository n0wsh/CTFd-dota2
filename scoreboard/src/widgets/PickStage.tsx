import { Team } from "@/server/teams";

import { AgentPick } from "@/components/AgentPick";
import { useAgentPicks } from "@/hooks/useAgentPicks";

export type PickStageInitialData = {
  teams: Team[];
  agentPicks: Record<string, string>;
};

const colors = [
  "#3273fd",
  "#65febf",
  "#be02bc",
  "#f2f00d",
  "#ff6903",
  "#f784bb",
  "#a0b444",
  "#64d4f1",
  "#028121",
  "#a26805",
];

export function PickStageWidget({
  initialData: { teams, agentPicks: initialAgentPicks },
}: {
  initialData: PickStageInitialData;
}) {
  const { agentPicks } = useAgentPicks({ initialAgentPicks });
  return (
    <div className="w-screen h-screen bg-heropick bg-cover backdrop-blur-xl">
      <div className="w-full h-full bg-white/5 backdrop-blur-sm flex items-center justify-center">
        <div className="p-5 grid grid-cols-10 gap-6">
          {teams.map((team, index) => (
            <AgentPick
              key={team.name}
              team={team}
              color={colors[index]}
              agent={agentPicks[team.name] ?? null}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
