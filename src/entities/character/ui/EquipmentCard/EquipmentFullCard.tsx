import type { Icons } from "@/shared/icons";
import type { Character } from "@/shared/types/character";
import { Icon } from "@/shared/ui/Icon/Icon";
import { getRarityColor } from "../../lib/getRarityColor";
import { EquipmentCard } from "./EquipmentCard";
import {
  calculateEquipmentPower,
  calculateEquipmentUpgradeStats,
} from "@/shared/types/develop";
import { Avatars } from "@/shared/avatars";
import { useNavigate } from "react-router-dom";

export interface IEquipmentFullCardProps {
  equipment?: Character.Equipment;
  onClick?: () => void;
  size?: number;
  iconSize?: number;
  withStats?: boolean;
  className?: string;
  withEquipedCharacter?: string;
  isWithUpgradeStats?: boolean;
  withEquipedCharacterFull?: Pick<
    Character.Character,
    "key" | "name" | "rarity" | "id"
  >;
  withDescription?: boolean;
}

export const EquipmentFullCard = ({
  equipment,
  onClick,
  size = 120,
  iconSize = 80,
  withStats,
  className,
  withEquipedCharacter,
  withEquipedCharacterFull,
  isWithUpgradeStats,
  withDescription,
}: IEquipmentFullCardProps) => {
  const navigate = useNavigate();

  const power = equipment ? calculateEquipmentPower(equipment) : 0;

  const newStats = equipment ? calculateEquipmentUpgradeStats(equipment) : null;

  const newPower = newStats ? calculateEquipmentPower(newStats) : null;

  return (
    <div
      className={`bg-gray-600/50 backdrop-blur-sm rounded-xl p-6 border cursor-pointer border-amber-800/20 relative ${className}`}
      onClick={onClick}
    >
      <div className="flex gap-8 items-start justify-between flex-wrap">
        <EquipmentCard
          withLevel
          equipment={equipment}
          size={size}
          iconSize={iconSize}
        />
        {equipment && (
          <div style={{ flex: "1 0" }}>
            <p
              className="text-white font-bold text-4xl mb-4"
              style={{ color: getRarityColor(equipment?.rarity) }}
            >
              {equipment?.name}
            </p>
            <p className="text-white font-bold text-4xl mb-4">
              МОЩЬ:{" "}
              <div className="text-amber-400 inline-block">
                {power}{" "}
                {isWithUpgradeStats && newPower && power !== newPower && (
                  <span className="inline-block ml-auto text-green-600">
                    {">"} {newPower}
                  </span>
                )}
              </div>
            </p>
          </div>
        )}
        {equipment && withStats && (
          <div
            className="grid grid-cols-2 border-t-2 border-amber-200/20 h-full pt-4"
            style={{ flex: "0 0 100%" }}
          >
            <div
              className="text-white text-3xl text-left mb-2"
              style={{
                gridColumn: "1 / -1",
              }}
            >
              <span className="text-4xl mr-2">Уровень:</span>{" "}
              <b>{equipment?.level || 0}</b>
              {isWithUpgradeStats &&
                newStats &&
                newStats.level !== equipment.level && (
                  <>
                    {" "}
                    <span className="inline-block ml-auto text-green-600">
                      {">"} {newStats.level}
                    </span>
                  </>
                )}
            </div>
            <div className="flex flex-col gap-2 text-white text-2xl text-left">
              <div>
                <span className="text-xl mr-2">ОЗ:</span>{" "}
                <b>{equipment?.stats.maxHp || 0}</b>
                {isWithUpgradeStats &&
                  newStats &&
                  newStats.stats.maxHp !== equipment.stats.maxHp && (
                    <>
                      {" "}
                      <span className="inline-block ml-auto text-green-600">
                        {">"} {newStats.stats.maxHp}
                      </span>
                    </>
                  )}
              </div>
              <div>
                <span className="text-xl mr-2">АТК:</span>{" "}
                <b>{equipment?.stats.attack || 0}</b>
                {isWithUpgradeStats &&
                  newStats &&
                  newStats.stats.attack !== equipment.stats.attack && (
                    <>
                      {" "}
                      <span className="inline-block ml-auto text-green-600">
                        {">"} {newStats.stats.attack}
                      </span>
                    </>
                  )}
              </div>
              <div>
                <span className="text-xl mr-2">Защита:</span>{" "}
                <b>{equipment?.stats.defense || 0}</b>
                {isWithUpgradeStats &&
                  newStats &&
                  newStats.stats.defense !== equipment.stats.defense && (
                    <>
                      {" "}
                      <span className="inline-block ml-auto text-green-600">
                        {">"} {newStats.stats.defense}
                      </span>
                    </>
                  )}
              </div>
              <div>
                <span className="text-xl mr-2">Уклонение:</span>{" "}
                <b>{Math.floor(equipment?.stats.dodge || 0) * 100}%</b>
                {isWithUpgradeStats &&
                  newStats &&
                  newStats.stats.dodge !== equipment.stats.dodge && (
                    <>
                      {" "}
                      <span className="inline-block ml-auto text-green-600">
                        {">"} {Math.floor((newStats.stats.dodge || 0) * 100)}%
                      </span>
                    </>
                  )}
              </div>
            </div>
            <div className="flex flex-col gap-2 text-white text-2xl text-left">
              <div>
                <span className="text-xl mr-2">Скорость:</span>{" "}
                <b>{equipment?.stats.speed || 0}</b>
                {isWithUpgradeStats &&
                  newStats &&
                  newStats.stats.speed !== equipment.stats.speed && (
                    <>
                      {" "}
                      <span className="inline-block ml-auto text-green-600">
                        {">"} {Math.floor(newStats.stats.speed || 0)}
                      </span>
                    </>
                  )}
              </div>
              <div>
                <span className="text-xl mr-2">Крит шанс:</span>{" "}
                <b>{Math.floor((equipment?.stats.critChance || 0) * 100)}%</b>
                {isWithUpgradeStats &&
                  newStats &&
                  newStats.stats.critChance !== equipment.stats.critChance && (
                    <>
                      {" "}
                      <span className="inline-block ml-auto text-green-600">
                        {">"}{" "}
                        {Math.floor((newStats.stats.critChance || 0) * 100)}%
                      </span>
                    </>
                  )}
              </div>
              <div>
                <span className="text-xl mr-2">Крит урон:</span>{" "}
                <b>{Math.floor((equipment?.stats.critDamage || 0) * 100)}%</b>
                {isWithUpgradeStats &&
                  newStats &&
                  newStats.stats.critDamage !== equipment.stats.critDamage && (
                    <>
                      {" "}
                      <span className="inline-block ml-auto text-green-600">
                        {">"}{" "}
                        {Math.floor((newStats.stats.critDamage || 0) * 100)}%
                      </span>
                    </>
                  )}
              </div>
              <div>
                <span className="text-xl mr-2">Точность:</span>{" "}
                <b>{Math.floor((equipment?.stats.accuracy || 0) * 100)}%</b>
                {isWithUpgradeStats &&
                  newStats &&
                  newStats.stats.accuracy !== equipment.stats.accuracy && (
                    <>
                      {" "}
                      <span className="inline-block ml-auto text-green-600">
                        {">"} {Math.floor((newStats.stats.accuracy || 0) * 100)}
                        %
                      </span>
                    </>
                  )}
              </div>
            </div>
          </div>
        )}
        {equipment && withDescription && (
          <div
            className="grid grid-cols-2 border-t-2 border-amber-200/20 h-full pt-4"
            style={{ flex: "0 0 100%" }}
          >
            <p className="text-left text-xl text-white">
              {equipment.description}
            </p>
          </div>
        )}
      </div>
      {withEquipedCharacter && (
        <img
          src={withEquipedCharacter}
          alt="Equiped Character"
          className="absolute bottom-0 right-0 size-[70px]"
          style={{
            borderTopLeftRadius: "10px",
          }}
        />
      )}
      {withEquipedCharacterFull && (
        <div
          className="flex items-center gap-2 flex-wrap cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            navigate(`/my-characters/${withEquipedCharacterFull.id}`);
          }}
        >
          <span className="text-white text-md">Экипировано:</span>
          <div className="flex items-center gap-2">
            <span
              className="text-white text-xl text-shadow-[0px_0px_4px_rgba(0,0,0,0.5)]"
              style={{ color: getRarityColor(withEquipedCharacterFull.rarity) }}
            >
              {withEquipedCharacterFull.name}
            </span>
            <img
              src={
                Avatars[withEquipedCharacterFull.key as keyof typeof Avatars]
              }
              alt={withEquipedCharacterFull.name}
              className="size-[40px] object-cover rounded-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};
