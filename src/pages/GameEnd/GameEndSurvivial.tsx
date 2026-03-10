import { SOUNDS } from "@/assets/sound/sounds";
import { StageTypeEnum, type IStageReward } from "@/entities/chapter/lib/chapter.model";
import { SURVIVAL_CHAPTERS } from "@/entities/chapter/lib/chapters";
import { EquipmentCard } from "@/entities/character/ui/EquipmentCard/EquipmentCard";
import { usePlayerStatsStore } from "@/entities/player/model/player-stats.store";
import { usePlayerStore } from "@/entities/player/model/player.store";
import { useSoundEffects } from "@/shared/hooks/useSoundEffects";
import usePlayerCharactersStore from "@/shared/store/PlayerCharactersStore";
import type { PlayerCharacter, PlayerCharacterState, PlayerCharacterWithState } from "@/shared/types/PlayerCharacter";
import { Icon } from "@/shared/ui/Icon/Icon";
import { ResponsiveUI } from "@/shared/ui/ResponsiveUI/ResponsiveUI";
import { useEffect, useState, type FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

export const GameEndSurvivial: FC = () => {
  const { state } = useLocation();
  const sounds = useSoundEffects(SOUNDS);
  useEffect(() => {
    if (!state) return;
    if (state.win) {
      setTimeout(() => {
        sounds.playSound('vibraphone_level_complete');
      }, 10);
    } else {
      setTimeout(() => {
        sounds.playSound('vibraphone_defeated');
      }, 10);
    }
  }, [state])

  const { setEquipment } = usePlayerCharactersStore();

  const [balances, setBalances] = usePlayerStore(
    useShallow((state) => [state.balances, state.setBalances]),
  );

  const navigate = useNavigate();

  const [reward, setReward] = useState<IStageReward | undefined>(undefined);

  useEffect(() => {
    console.log("state", state);
    if (!state) return;
    if (!state.stage) return;
    if (!state.win) return;
    const { stage } = state;

    const curStage = SURVIVAL_CHAPTERS.find((c) => c.stageNumber === stage);
    console.log("curStage", curStage);
    setReward(curStage?.rewards);

    setBalances({
      gold: balances.gold + (curStage?.rewards?.balances.gold || 0),
      gems: balances.gems + (curStage?.rewards?.balances.gems || 0),
      summons: balances.summons + (curStage?.rewards?.balances.summons || 0),
    });

    if (curStage?.rewards?.equipment) {
      setEquipment([
        ...usePlayerCharactersStore.getState().equipment,
        ...curStage?.rewards.equipment,
      ]);
    }

    usePlayerStatsStore.getState().updateMaxSurvivialDepth(1, stage);
  }, [state, setReward, setEquipment]);

  const nextStage = state.stage
    ? SURVIVAL_CHAPTERS.find((c) => c.stageNumber === state.stage + 1)
    : undefined;

  const characters: Array<PlayerCharacter | null> | undefined =
    state?.characters;
  const charactersState: Array<PlayerCharacterState | null> = state?.allies

  console.log(state)

  const goToNextStage = () => {
    if (nextStage && characters && charactersState) {
      const data: Array<PlayerCharacterWithState | undefined> =
        characters
          .map((character) => {
            if (!character) return undefined;
            const state = charactersState.find(s => s?.texture === character?.key);
            if (!state) return undefined;
            if (state.hp > 0) {
              state.hp = Math.min(Math.floor(state.hp + 0.2 * state.maxHp), state.maxHp)
            }
            return { ...character, state };
          });
      // navigate(`/game/survival/start/${nextStage.stageNumber}`);
      navigate("/game", {
        replace: true,
        state: {
          characters: data,
          stageType: StageTypeEnum.SURVIVAL,
          stage: nextStage.stageNumber,
        },
      });
    }
  };

  if (!state || !("win" in state)) {
    navigate("/");
    return null;
  }

  const goToMenu = () => {
    navigate("/");
  };

  if (state.win) {
    return (
      <ResponsiveUI>
        <div className="w-full h-full bg-black">
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-purple-900/80 via-indigo-900/60 to-black/90 p-8 relative overflow-hidden">
            {/* Victory particles background */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: "3s",
                  }}
                />
              ))}
            </div>

            {/* Victory crown icon */}
            <div className="text-9xl mb-4 text-yellow-400 animate-bounce drop-shadow-[0_0_20px_rgba(255,220,0,0.8)]">
              👑
            </div>

            <h1 className="text-7xl font-bold text-yellow-300 mb-6 text-center drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] animate-pulse">
              ПОБЕДА!
            </h1>

            <p className="text-3xl text-green-300 mb-12 text-center max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              Вы одержали великолепную победу!{" "}
              {Boolean(nextStage)
                ? "Вы можете перейти к следующему уровню!"
                : "Вы прошли режим выживания!"}
            </p>
            <p className="text-3xl text-green-300 mb-6 text-center max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              Награды:
            </p>
            <div className="flex flex-col gap-4 items-end">
              {Boolean(reward?.balances.gold) && (
                <div className="flex items-center gap-2 text-white text-3xl">
                  {reward?.balances.gold} <Icon icon="gold" />
                </div>
              )}
              {Boolean(reward?.balances.gems) && (
                <div className="flex items-center gap-2 text-white text-3xl">
                  {reward?.balances.gems} <Icon icon="gems" />
                </div>
              )}
              {Boolean(reward?.balances.summons) && (
                <div className="flex items-center gap-2 text-white text-3xl">
                  {reward?.balances.summons} <Icon icon="summons" />
                </div>
              )}
            </div>
            {reward?.equipment && (
              <div className="grid grid-cols-4 gap-4 mt-6">
                {reward.equipment.map((eq) => (
                  <EquipmentCard key={eq.id} equipment={eq} />
                ))}
              </div>
            )}

            <div
              className="px-12 mt-6 py-6 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-4xl font-bold rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-110 hover:from-green-500 hover:to-emerald-600 active:scale-95 border-4 border-green-400 shadow-2xl hover:shadow-green-500/50"
              onClick={goToMenu}
            >
              <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                В МЕНЮ
              </span>
            </div>
            {Boolean(nextStage) && (
              <div
                className="px-12 mt-6 py-6 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-4xl font-bold rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-110 hover:from-green-500 hover:to-emerald-600 active:scale-95 border-4 border-green-400 shadow-2xl hover:shadow-green-500/50"
                onClick={goToNextStage}
              >
                <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  ДАЛЬШЕ (УРОВЕНЬ {nextStage?.stageNumber})
                </span>
              </div>
            )}
          </div>
        </div>
      </ResponsiveUI>
    );
  }

  return (
    <ResponsiveUI>
      <div className="w-full h-full bg-black">
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-red-900/80 via-gray-900/70 to-black/90 p-8 relative overflow-hidden">
          {/* Defeat smoke particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-gray-500 rounded-full opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 2}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Broken sword icon */}
          <div className="text-9xl mb-8 text-red-400 drop-shadow-[0_0_20px_rgba(255,0,0,0.6)] opacity-80">
            ⚔️
          </div>

          <h1 className="text-7xl font-bold text-red-300 mb-6 text-center drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            ПОРАЖЕНИЕ
          </h1>

          <p className="text-3xl text-orange-300 mb-12 text-center max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            Битва была жестокой, но не окончательной. Каждое поражение - это урок
            на пути к величию.
          </p>

          <div
            className="px-12 py-6 bg-gradient-to-r from-red-700 to-orange-800 text-white text-4xl font-bold rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-110 hover:from-red-600 hover:to-orange-700 active:scale-95 border-4 border-red-500 shadow-2xl hover:shadow-red-500/50"
            onClick={goToMenu}
          >
            <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              В МЕНЮ
            </span>
          </div>
        </div>
      </div>
    </ResponsiveUI>
  );
};
